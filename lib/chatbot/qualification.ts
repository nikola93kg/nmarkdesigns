import { immediateDecision } from "./topic-policy";
import type { LeadService } from "./lead-contracts";
const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "dj");
export function explicitContact(message: string): boolean {
  return /kontaktiraj|pozovite me|pozovi me|posalji(?:te)? (?:mi )?ponudu|zelim (?:konkretnu )?ponudu|trazim ponudu|contact me|call me|send (?:me )?(?:a )?quote|request (?:a )?quote|i (?:want|would like) (?:a )?quote/.test(normalize(message));
}
export function shouldOfferLead(message: string, declined: boolean): boolean {
  if (immediateDecision(message) === "off_topic") return false;
  if (explicitContact(message)) return true;
  if (declined) return false;
  return /(?:treba|potreban|potrebna|zelim|hocu|planiram).{0,50}(?:sajt|prodavnic|redizajn|chatbot|aplikacij)|(?:i need|i want|we need|looking for).{0,50}(?:website|online store|redesign|chatbot|web app)|(?:moj|nas).{0,25}(?:projekat|sajt)|(?:my|our).{0,25}(?:project|website)|(?:rok|dostupnost|saradnj|availability|deadline).{0,35}(?:projek|sajt|website|redesign|shop|prodavnic)/.test(normalize(message));
}
export function suggestedService(message: string): LeadService {
  const value = normalize(message);
  if (/chatbot|chat bot/.test(value)) return "ai_chatbot";
  if (/prodavnic|e.?commerce|online store|web shop/.test(value)) return "ecommerce";
  if (/redizajn|redesign/.test(value)) return "redesign";
  if (/aplikacij|web app/.test(value)) return "web_app";
  if (/seo|pretrag|search engine/.test(value)) return "seo";
  if (/odrzavanj|maintenance|hosting/.test(value)) return "maintenance";
  if (/sajt|website/.test(value)) return "new_website";
  return "other";
}
