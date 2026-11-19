import type { Localized } from "@/lib/i18n";
import type { LeadService } from "@/lib/chatbot/lead-contracts";
interface LeadCopy {
  offer: string; open: string; decline: string; title: string; intro: string; next: string; back: string;
  cancel: string; submit: string; submitting: string; review: string; optional: string; more: string;
  success: string; preview: string; previewSuccess: string; returnToChat: string; received: string;
  consent: string; policy: string; emailMethod: string; phoneMethod: string;
  fields: Record<"name" | "email" | "phone" | "company" | "website" | "service" | "budgetRange" | "timeframe" | "projectDescription" | "preferredContactMethod", string>;
  services: Record<LeadService, string>;
  errors: Record<string, string>;
}
export const leadCopy: Localized<LeadCopy> = {
  sr: {
    offer: "Želite konkretnu ponudu? Možete pregledati podatke i poslati upit Nikoli.", open: "Pripremi upit", decline: "Ne sada",
    title: "Vaš projekat", intro: "Dopunite ono što znate. Budžet i rok nisu obavezni.", next: "Dalje: kontakt i pregled", back: "Nazad na projekat",
    cancel: "Vrati se u razgovor", submit: "Pošalji upit", submitting: "Upit se čuva…", review: "Kontakt i pregled upita", optional: "Opciono", more: "Dodatni podaci",
    success: "Upit je primljen i sačuvan. Nikola može da vas kontaktira na osnovu navedenih podataka.",
    preview: "Demo forme: podaci ostaju u ovoj kartici. Ništa se ne šalje niti čuva u bazi.", previewSuccess: "Demo je završen. Upit nije poslat i podaci nisu sačuvani u bazi.", returnToChat: "Nastavi razgovor", received: "Upit je već primljen u ovom razgovoru.",
    consent: "Saglasan/saglasna sam da NMark Designs obradi navedene podatke i kontaktira me u vezi sa ovim upitom. Ovo nije saglasnost za marketing.", policy: "Politika privatnosti", emailMethod: "Email", phoneMethod: "Telefon",
    fields: { name: "Ime", email: "Email", phone: "Telefon", company: "Firma", website: "Postojeći sajt (https://…)", service: "Potrebna usluga", budgetRange: "Okvir budžeta ili „još ne znam“", timeframe: "Željeni rok ili „fleksibilno“", projectDescription: "Cilj i važne funkcionalnosti", preferredContactMethod: "Željeni način kontakta" },
    services: { new_website: "Novi sajt", redesign: "Redizajn", ecommerce: "Web prodavnica", web_app: "Web aplikacija", seo: "SEO", ai_chatbot: "AI chatbot", maintenance: "Održavanje", other: "Drugo / još ne znam" },
    errors: { name: "Unesite ime (2–100 karaktera).", email: "Unesite ispravnu email adresu.", phone: "Unesite ispravan broj; potreban je ako birate telefonski kontakt.", website: "Unesite potpunu http:// ili https:// adresu, bez korisničkog imena i lozinke.", privacyConsent: "Potvrdite saglasnost za obradu upita i kontakt.", INVALID_INPUT: "Proverite unete podatke i pokušajte ponovo.", UNAVAILABLE: "Upit nije potvrđen. Podaci su ostali u formi; pokušajte ponovo.", RATE_LIMITED: "Dostigli ste ograničenje upita. Pokušajte kasnije ili koristite kontakt stranicu.", SESSION_EXPIRED: "Sesija je istekla. Sačuvajte svoje podatke i započnite novi razgovor.", SUBMISSION_CONFLICT: "Upit sa ovim identifikatorom već je primljen sa drugačijim podacima. Nemojte ponovo slati; kontaktirajte Nikolu za ispravku.", field: "Proverite dužinu i format ovog podatka." },
  },
  en: {
    offer: "Would you like a tailored quote? Review your details and send an inquiry to Nikola.", open: "Prepare an inquiry", decline: "Not now",
    title: "Your project", intro: "Add what you know. Budget and timeframe are optional.", next: "Next: contact and review", back: "Back to project",
    cancel: "Back to conversation", submit: "Send inquiry", submitting: "Saving your inquiry…", review: "Contact and review", optional: "Optional", more: "Additional details",
    success: "Your inquiry has been received and saved. Nikola can contact you using the details provided.",
    preview: "Form demo: details stay in this tab. Nothing is sent or saved to a database.", previewSuccess: "Demo complete. Your inquiry was not sent or saved to a database.", returnToChat: "Continue chatting", received: "An inquiry has already been received in this conversation.",
    consent: "I agree that NMark Designs may process these details and contact me about this inquiry. This is not marketing consent.", policy: "Privacy policy", emailMethod: "Email", phoneMethod: "Phone",
    fields: { name: "Name", email: "Email", phone: "Phone", company: "Company", website: "Existing website (https://…)", service: "Service needed", budgetRange: "Budget range or ‘not sure yet’", timeframe: "Preferred timeframe or ‘flexible’", projectDescription: "Goals and important features", preferredContactMethod: "Preferred contact method" },
    services: { new_website: "New website", redesign: "Redesign", ecommerce: "Online store", web_app: "Web application", seo: "SEO", ai_chatbot: "AI chatbot", maintenance: "Maintenance", other: "Other / not sure yet" },
    errors: { name: "Enter your name (2–100 characters).", email: "Enter a valid email address.", phone: "Enter a valid number; required if you choose phone contact.", website: "Enter a complete http:// or https:// URL without a username or password.", privacyConsent: "Agree to inquiry processing and contact before sending.", INVALID_INPUT: "Check your details and try again.", UNAVAILABLE: "Receipt has not been confirmed. Your details remain in the form; try again.", RATE_LIMITED: "You have reached the inquiry limit. Try again later or use the contact page.", SESSION_EXPIRED: "Your session has expired. Keep a copy of your details and start a new conversation.", SUBMISSION_CONFLICT: "An inquiry with this identifier was already received with different details. Do not resubmit; contact Nikola to correct it.", field: "Check the length and format of this field." },
  },
};
