import { additionalServices, carePlans, websitePackages } from "../../content/pricing";
import type { Locale } from "../i18n";

export const CHAT_POLICY_VERSION = "nmark-scope-v2";
export type TopicDecision = "business" | "off_topic" | "greeting" | "clarify";
export const normalizeTopic = (value: string) => value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g,"dj");
/** Fast paths are deliberately narrow. Unknown questions get semantic classification, not keyword approval. */
export function immediateDecision(message: string): Exclude<TopicDecision,"business"> | null {
  const text=normalizeTopic(message).trim().replace(/[!?. ,]+$/g,"");
  if (/^(?:(?:cao|zdravo|zdrav[oai]|dobar dan|dobro jutro|dobro vece|hi|hello|hey|thanks|thank you|hvala)(?:\s+(?:brt|brate|there|nikola))?)$/.test(text)) return "greeting";
  if (/(?:kako (?:se )?(?:prave|pravi|napraviti|spremiti).{0,25}(?:palacink|rucak|tort)|recept za|recipe for|how (?:do i |to )?(?:make pancakes|cook)|sapunja[s]?.{0,20}macor|masturbat)/.test(text)) return "off_topic";
  return null;
}
const replies: Record<Exclude<TopicDecision,"business">,Record<Locale,string>> = {
  off_topic:{sr:"Mogu da pomognem samo oko NMark Designs, izrade i redizajna sajtova, web prodavnica, SEO-a i povezanih usluga. Ako imate pitanje o svom sajtu ili projektu, slobodno ga postavite.",en:"I can help with NMark Designs, website design and redesign, online stores, SEO and related services. Feel free to ask about your website or project."},
  greeting:{sr:"Ćao! Mogu da pomognem oko NMark Designs usluga, sajta, redizajna, web prodavnice ili početnih cena. Šta vas interesuje?",en:"Hello! I can help with NMark Designs services, websites, redesign, online stores or starting prices. What would you like to know?"},
  clarify:{sr:"Možete li da pojasnite pitanje u vezi sa NMark Designs ili svojim web projektom?",en:"Could you clarify your question about NMark Designs or your web project?"},
};
export function topicReply(decision: Exclude<TopicDecision,"business">,locale:Locale) { return replies[decision][locale]; }
export function priceFallback(locale:Locale) { return locale==="sr" ? "Ne mogu da potvrdim takvu procenu. Važeće početne cene su u cenovniku; konačna cena i rok za konkretan projekat zahtevaju procenu obima." : "I cannot confirm that estimate. The price list contains the approved starting prices; a final price and timeline require a review of your project's scope."; }
const approvedPrices=new Set([...websitePackages,...additionalServices,...carePlans].flatMap(item=>item.startingPrice===undefined?[]:[item.startingPrice]));
function amount(value:string) {
  const clean=value.replace(/[\s\u00a0]/g,"");
  const normalized=/^\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{2})?$/.test(clean) ? clean.replace(/[.,](?=\d{3}(?:\D|$))/g,"").replace(",",".") : clean.replace(",",".");
  return Number(normalized);
}
export function hasUnapprovedPrice(text:string) {
  if (/\$|\b(?:USD|dollars?)\b/i.test(text)) return true;
  const number="(\\d+(?:[., \\u00a0]\\d{2,3})*)";
  const patterns=[new RegExp(number+"\\s*(?:EUR\\b|€|evr[aou]?\\b|euros?\\b)","gi"),new RegExp("(?:€|EUR\\s+)\\s*"+number,"gi"),new RegExp("\\b(?:cena|price|cost)\\s*(?:je|is|iznosi|starts? at|kre[ćc]e od|od|from|:)\\s*"+number,"gi")];
  return patterns.some(pattern=>[...text.matchAll(pattern)].some(match=>!approvedPrices.has(amount(match[1]))));
}
/** Sentence buffering preserves incremental display while never publishing an unverified price sentence. */
export class VerifiedReply {
  private pending="";
  private rejected=false;
  constructor(private locale:Locale){}
  push(delta:string): string[] {
    if(this.rejected)return [];
    this.pending+=delta;const ready:string[]=[];
    while(true){const match=/[.!?]\s+(?=[A-ZČĆŽŠĐ])/.exec(this.pending);if(!match)break;
      const end=match.index+match[0].length;const sentence=this.pending.slice(0,end);this.pending=this.pending.slice(end);
      if(hasUnapprovedPrice(sentence)){this.rejected=true;this.pending="";break}ready.push(sentence);
    }
    return ready;
  }
  complete():string {
    if(this.rejected||hasUnapprovedPrice(this.pending)){this.pending="";return priceFallback(this.locale)}
    const tail=this.pending;this.pending="";return tail;
  }
}
