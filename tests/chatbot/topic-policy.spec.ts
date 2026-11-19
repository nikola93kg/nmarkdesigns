import { expect, test } from "@playwright/test";
import { immediateDecision, hasUnapprovedPrice, VerifiedReply, priceFallback, topicReply } from "@/lib/chatbot/topic-policy";
import { recommendedLinks } from "@/content/chatbot/knowledge";
import { shouldOfferLead } from "@/lib/chatbot/qualification";

for(const message of ["kazi mi kako se prave palacinke","da li sapunjas macora?","give me a recipe for pancakes","How to make pancakes for my website"]){
  test(`unrelated fast path has no links or offer: ${message}`,()=>{
    expect(immediateDecision(message)).toBe("off_topic");
    if(!/website/.test(message))expect(recommendedLinks(message,"sr")).toEqual([]);
    expect(shouldOfferLead(message,false)).toBe(false);
    expect(topicReply("off_topic","sr")).not.toMatch(/jaja|brasno|mleko|sampon|šampon/);
  });
}
test("greetings stay friendly; genuine project details are not rejected by keyword heuristics",()=>{
  for(const greeting of ["cao brt","Ćao!","Hello","Hvala!"])expect(immediateDecision(greeting)).toBe("greeting");
  for(const message of ["Planiram redesign WordPress sajta","sajt ima 10 stranica i uglavnom je to neka online prodavnica","I need a website for my pancake restaurant","pravim sajt sa receptima, treba mi ponuda","I need an SEO audit","10 pages","a koliko bi to kostalo?"])expect(immediateDecision(message)).toBeNull();
});
test("retrieval uses project facets instead of accidental description substrings",()=>{
  for(const message of ["kazi mi kako se prave palacinke","da li sapunjas macora?","Kako si danas?","What is the capital of France?","Tell me a joke","bela pozadina za sajt","a website in Vienna"]){
    expect(recommendedLinks(message,"sr").filter(link=>link.category==="project")).toEqual([]);
  }
  expect(recommendedLinks("Treba mi sajt za stolare","sr").filter(link=>link.category==="project").map(link=>link.id)).toEqual(["project:ilic-enterijer"]);
  expect(recommendedLinks("sajt ima 10 stranica i online prodavnicu","sr").filter(link=>link.category==="project").map(link=>link.id)).toEqual(["project:anabelabebioprema"]);
  expect(recommendedLinks("Show portfolio projects","en").some(link=>link.id==="portfolio")).toBe(true);
  expect(shouldOfferLead("rok trajanja mleka",false)).toBe(false);
});
test("prices must come from the public registry, including localized thousands separators",()=>{
  for(const text of ["Od 400 EUR.","Starting at €1,200.","Od 1.200 €.","Od 550 evra.","25 EUR / mesec","Za sajt od 10 stranica potrebna je procena.","Cena je 400."])
    expect(hasUnapprovedPrice(text),text).toBe(false);
  for(const text of ["Redizajn od 800 EUR.","The price is €800.","Cena je 800.","Cena kreće od 800.","from $400","Od 800,00 evra.","€\n800","800\nEUR"])
    expect(hasUnapprovedPrice(text),text).toBe(true);
});
test("sentence stream never emits a forbidden price, including across network chunks",()=>{
  const guard=new VerifiedReply("sr");const output=[...guard.push("Redizajn od 8"),...guard.push("00 EUR. Konačna ponuda zavisi od obima."),guard.complete()].join("");
  expect(output).not.toContain("800");expect(output).toBe(priceFallback("sr"));
  const good=new VerifiedReply("en");const safe=[...good.push("Starting at 1,"),...good.push("200 EUR. The scope needs a review."),good.complete()].join("");
  expect(safe).toBe("Starting at 1,200 EUR. The scope needs a review.");
});
