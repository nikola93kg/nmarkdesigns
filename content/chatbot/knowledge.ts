import { websitePackages, additionalServices, carePlans, formatWebsiteStartingPrice, formatAdditionalStartingPrice, formatCarePlanStartingPrice } from "@/content/pricing";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";
import type { ChatLink } from "@/lib/chatbot/contracts";

export interface KnowledgeEntry extends ChatLink {
  locale: Locale;
  facts: readonly string[];
  lastReviewedAt: string;
  keywords: readonly string[];
}
export const KNOWLEDGE_VERSION = "2026-11-19.4";
const reviewed = "2026-11-19";
const names = {
  sr: { pricing: "Početne cene", services: "Usluge", contact: "Kontakt sa Nikolom", portfolio: "Portfolio" },
  en: { pricing: "Starting prices", services: "Services", contact: "Contact Nikola", portfolio: "Portfolio" },
};
const selectedProjects = new Set([
  "casovi-francuskog", "coolfridgeguys", "buy-pallet-jacks", "os-dule-karaklajic",
  "ilic-enterijer", "powder-brows-vienna", "anabelabebioprema", "tripolisweets",
]);

/** Pricing values are read from the same registry as the public pricing page. */
export function knowledgeRegistry(locale: Locale): KnowledgeEntry[] {
  const copy = names[locale];
  const base = { locale, lastReviewedAt: reviewed };
  return [
    { ...base, id: "pricing", title: copy.pricing, category: "pricing", url: `${site.url}${localizedPath("pricing", locale)}`,
      description: locale === "sr" ? "Početne cene; konačna ponuda zavisi od obima." : "Starting prices; the final quote depends on scope.",
      keywords: ["cena", "cene", "košta", "kosta", "price", "cost", "budget", "budžet", "eur", "usd", "dollar", "dollars"],
      facts: [
        ...websitePackages.map((p) => `${p.id}: ${formatWebsiteStartingPrice(p.id, locale)} (starting price, not a fixed quote)`),
        ...additionalServices.map((s) => `${s.id}: ${formatAdditionalStartingPrice(s.id,locale)}${s.id === "ai-chatbot" ? "; API and infrastructure billed separately" : ""}`),
        ...carePlans.map((p) => `${p.id}: ${p.id === "custom-support" ? "by quotation" : formatCarePlanStartingPrice(p.id,locale)}`),
        "The generic redesign starting price is not an existing-shop redesign quote. New ecommerce is a different service. Existing-shop redesign has no separate approved starting tier. Never calculate a custom quote from pages/features or combine these prices. Delivery deadlines require individual scope review.",
        "Custom web applications: by quotation. No guaranteed deadlines, discounts, rankings or results.",
      ] },
    { ...base, id: "services", title: copy.services, category: "services", url: `${site.url}${localizedPath("services", locale)}`,
      description: locale === "sr" ? "Izrada i redizajn sajtova, web prodavnice, SEO, brzina, AI chatbot i održavanje." : "Websites, redesign, online stores, SEO, performance, AI chatbots and maintenance.",
      keywords: ["sajt", "website", "wordpress", "next", "seo", "chatbot", "održavanje", "maintenance"],
      facts: ["Website design/development, redesign, ecommerce, custom web development, SEO, performance optimization, AI chatbot integration, supported-site hosting and care plans."] },
    { ...base, id: "contact", title: copy.contact, category: "contact", url: `${site.url}${localizedPath("contact", locale)}`,
      description: locale === "sr" ? "Opišite projekat za konkretnu ponudu." : "Describe your project to request a quote.",
      keywords: ["ponud", "kontakt", "quote", "contact", "rok", "deadline", "sarad", "availability"],
      facts: [`Contact: Nikola Marković, ${site.email}. Contact form submission is separate from this chat. Never claim an inquiry has been sent.`] },
    { ...base, id: "portfolio", title: copy.portfolio, category: "portfolio", url: `${site.url}${localizedPath("portfolio", locale)}`,
      description: locale === "sr" ? "Odabrani projekti NMark Designs." : "Selected NMark Designs projects.",
      keywords: ["portfolio", "projekti", "projects", "radovi", "examples"], facts: [] },
    ...projects.filter((p) => selectedProjects.has(p.slug)).map((p): KnowledgeEntry => ({
      ...base, id: `project:${p.slug}`, title: p.title, category: "project",
      url: `${site.url}${localizedProjectPath(p.slug, locale)}`,
      description: p.shortDescription?.[locale] ?? p.title,
      keywords: [p.title, p.slug, ...(projectTopics[p.slug] ?? [])],
      facts: [p.shortDescription?.[locale] ?? p.title, ...(p.technologies ?? []),
        ...(p.status === "inactive" || p.status === "archived" || p.slug === "tripolisweets" ? ["Historical portfolio project; do not claim its external website is currently available."] : [])],
    })),
  ];
}
const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "dj");
const stopWords=new Set("kako what which kako koji koja koje kazite kazi please molim treba zelim hocu planiram existing postojeci sajta site website websites sajt sajtova radim imam ima neki neka nesto about with this that your have from neki sada mogu moze da li sam for the and are you can have how ima uglavnom where how why tell give make prave pravi mene meni moj nas online".split(" "));
const words=(text:string)=>normalize(text).split(/[^a-z0-9]+/).filter(word=>word.length>=3&&!stopWords.has(word));
// Explicit project facets, not accidental substrings in whole descriptions.
const projectTopics:Record<string,readonly string[]>={
  "ilic-enterijer":["stolar","stolare","stolarija","namestaj","furniture","carpentry","carpenter","kitchen"],
  "anabelabebioprema":["prodavnica","prodavnice","prodavnicu","ecommerce","e-commerce","shop","store","bebi","baby"],
  "tripolisweets":["poslasticarnica","poslasticarnicu","sweets","baklava","confectionery"],
  "powder-brows-vienna":["kozmetika","kozmeticki","beauty","pmu","brows"],
  "coolfridgeguys":["appliances","appliance","fridge","refrigerator","bela tehnika"],
  "buy-pallet-jacks":["pallet","warehouse","skladiste","paletni"],
  "casovi-francuskog":["francuski","francuskog","french","tutoring","casovi"],
  "os-dule-karaklajic":["skola","school","osnovna"],
};
function ranked(message:string,locale:Locale){
  const tokens=words(message),normalized=normalize(message);
  return knowledgeRegistry(locale).map(entry=>{
    const terms=new Set(entry.keywords.flatMap(words));
    const phrase=(value:string)=>normalize(value).replace(/[^a-z0-9]+/g," ").trim();
    const padded=` ${phrase(message)} `;
    let score=entry.category==="project"
      ? entry.keywords.reduce((sum,term)=>sum+(phrase(term)&&padded.includes(` ${phrase(term)} `)?1:0),0)
      : tokens.reduce((sum,word)=>sum+(terms.has(word)?1:0),0);
    if(entry.category==="project"&&normalized.includes(normalize(entry.title)))score+=10;
    if(entry.id==="project:ilic-enterijer"&&/\b(?:stolar\w*|namestaj\w*|furniture|carpent\w*|kitchen)\b/.test(normalized))score+=10;
    if(entry.id==="project:anabelabebioprema"&&/\b(?:prodavnic\w*|ecommerce|e-commerce|shop|store)\b/.test(normalized))score+=5;
    return {entry,score};
  }).sort((a,b)=>b.score-a.score);
}
export function selectKnowledge(message: string, locale: Locale): KnowledgeEntry[] {
  return ranked(message,locale).filter(({score,entry})=>score>0||["services","pricing","contact"].includes(entry.id)).slice(0,7).map(item=>item.entry);
}
/** Called only after scope approval. Links still need positive, explicit topic evidence. */
export function recommendedLinks(message: string, locale: Locale): ChatLink[] {
  const selected=ranked(message,locale).filter(item=>item.score>0);
  const projectLinks=selected.filter(item=>item.entry.category==="project").slice(0,2);
  const normalized=normalize(message);
  const topicIds=new Set<string>();
  if(/\b(?:cen\w*|kost\w*|price\w*|cost\w*|budget|budzet|eur|usd|dollar\w*)\b/.test(normalized))topicIds.add("pricing");
  if(/\b(?:sajt\w*|website\w*|wordpress|seo|redizajn|redesign|prodavnic\w*|ecommerce|e-commerce|chatbot|maintenance|odrzavanj\w*)\b/.test(normalized))topicIds.add("services");
  if(/\b(?:ponud\w*|kontakt\w*|quote|contact|rok|deadline|sarad\w*|availability|nikola)\b/.test(normalized))topicIds.add("contact");
  if(/\b(?:portfolio|projekti|projects|radovi|examples)\b/.test(normalized))topicIds.add("portfolio");
  const topics=knowledgeRegistry(locale).filter(entry=>topicIds.has(entry.id)).slice(0,2);
  return [...topics,...projectLinks.map(item=>item.entry)].map(({id,title,description,url,category})=>({id,title,description,url,category}));
}

export function isKnowledgeUrl(url: string, locale: Locale): boolean {
  return knowledgeRegistry(locale).some((entry) => entry.url === url);
}
