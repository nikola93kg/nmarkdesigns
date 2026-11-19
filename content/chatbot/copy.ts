import type { Localized } from "@/lib/i18n";
interface ChatCopy {
  open: string; close: string; restart: string; ai: string; welcome: string; consent: string;
  accept: string; decline: string; privacy: string; input: string; send: string; stop: string;
  retry: string; busy: string; cancelled: string; contact: string; you: string; quickActions: readonly string[];
  local: { label: string; notice: string; link: string; details: string };
  preview: { label: string; notice: string; start: string; response: string };
  errors: Record<string, string>;
}
export const chatCopy: Localized<ChatCopy> = {
  sr: {
    local: { label: "Lokalni test · pravi AI", notice: "Lokalni test: poruke se šalju OpenAI servisu i čuvaju u lokalnoj bazi. Koristite probne podatke. Ovo nije objavljena usluga.", link: "Podaci o lokalnom testiranju", details: "Ovo je obaveštenje za privatno lokalno testiranje, a ne produkciona politika privatnosti.\n\nPoruke i odabrani kontekst šalju se OpenAI servisu radi generisanja odgovora (store: false). To ne isključuje sve logove i pravila obrade provajdera. Transkripti se čuvaju u lokalnom MySQL-u i dostupni su vlasniku u admin panelu. Razgovori bez upita čuvaju se 90 dana od aktivnosti, a razgovori sa upitom 365 dana od poslednjeg upita. Kontakt podaci upita čuvaju se 365 dana. Brisanje sprovodi zadatak održavanja kada se pokrene; lokalno nije zakazan automatski. Vlasnik može i ručno obrisati zapis u admin panelu. Zbirne metrike bez identiteta ostaju. Upit se šalje samo preko zasebne forme uz potvrdu; slanje emaila je zasebno podešavanje. Ne unosite stvarne osetljive podatke ili tuđe kontakte.\n\nOdustanite bez započinjanja sesije ako ne želite ovu obradu. Za produkciju je potrebna posebno pregledana i objavljena politika privatnosti." },
    open: "Pitajte NMark asistenta", close: "Zatvori razgovor", restart: "Novi razgovor", ai: "AI asistent",
    welcome: "Zdravo! Mogu da pomognem oko izrade sajta, okvirnih cena ili izbora pravog web rešenja. Šta vas interesuje?",
    consent: "Razgovarate sa AI asistentom. Poruke se obrađuju preko OpenAI servisa i čuvaju radi obrade upita i poboljšanja usluge. Ne unosite lozinke ili osetljive podatke. Početak razgovora ne daje saglasnost za marketing.",
    accept: "Prihvatam i započinjem razgovor", decline: "Odustani", privacy: "Politika privatnosti", input: "Vaša poruka", send: "Pošalji poruku", stop: "Zaustavi odgovor", retry: "Pokušaj ponovo", busy: "Asistent odgovara…", cancelled: "Odgovor je prekinut.", contact: "Kontaktirajte Nikolu", you: "Vi",
    quickActions: ["Želim novi sajt", "Koliko košta izrada?", "Pogledaj projekte", "AI chatbot za moj biznis"],
    preview: {
      label: "Lokalni demo",
      notice: "Ovo je lokalni pregled interfejsa sa primerom odgovora. Poruke ostaju samo u ovoj kartici do osvežavanja stranice; ne šalju se AI servisu i ne čuvaju se u bazi.",
      start: "Isprobaj demo",
      response: "Ovo je primer odgovora za pregled chat interfejsa. Za vaš projekat možemo da razmotrimo namenu sajta, sadržaj i potrebne funkcionalnosti. Ispod možete pogledati portfolio; za konkretnu ponudu kontaktirajte Nikolu. Pravi AI odgovori zahtevaju podešen server i bazu.",
    },
    errors: {
      UNAVAILABLE: "Chat trenutno nije dostupan. Možete kontaktirati Nikolu direktno.",
      RATE_LIMITED: "Dostigli ste ograničenje poruka. Pokušajte kasnije ili nas kontaktirajte.",
      SESSION_EXPIRED: "Sesija je istekla. Započnite novi razgovor.",
      BUSY: "Odgovor se još obrađuje. Sačekajte pa pokušajte ponovo.",
      INVALID_INPUT: "Poruka mora imati između 1 i 2.000 karaktera.",
      STREAM_ERROR: "Odgovor nije završen. Pokušajte ponovo ili nas kontaktirajte.",
    },
  },
  en: {
    local: { label: "Local test · live AI", notice: "Local test: messages are sent to OpenAI and stored in the local database. Use sample data. This service has not been published.", link: "Local testing information", details: "This notice is for private local testing, not a production privacy policy.\n\nMessages and selected context are sent to OpenAI to generate replies (store: false). This does not eliminate all provider logs or processing rules. Transcripts are stored in local MySQL and are visible to the owner in the admin panel. Conversations without inquiries are kept for 90 days after activity; conversations with inquiries for 365 days after the latest submission. Inquiry contact data is kept for 365 days. Cleanup runs when maintenance is invoked; it is not automatically scheduled locally. The owner can also delete records manually in admin. Anonymous aggregate counts remain. Inquiries require a separate confirmed form; email delivery is separately configured. Do not enter real sensitive data or other people's contact details.\n\nCancel without starting a session if you do not want this processing. Production requires a separately reviewed and published privacy policy." },
    open: "Ask NMark Assistant", close: "Close conversation", restart: "New conversation", ai: "AI assistant",
    welcome: "Hi! I can help you explore website development, estimated starting prices, and the right solution for your project. What would you like to know?",
    consent: "You are speaking with an AI assistant. Messages are processed through OpenAI and stored to handle inquiries and improve the service. Do not enter passwords or sensitive information. Starting a chat does not consent to marketing.",
    accept: "Agree and start chatting", decline: "Cancel", privacy: "Privacy policy", input: "Your message", send: "Send message", stop: "Stop response", retry: "Try again", busy: "Assistant is replying…", cancelled: "The response was stopped.", contact: "Contact Nikola", you: "You",
    quickActions: ["I need a new website", "How much does a website cost?", "Show me your projects", "AI chatbot for my business"],
    preview: {
      label: "Local demo",
      notice: "This is a local interface preview with a sample response. Messages stay in this tab until you reload; they are not sent to an AI service or stored in a database.",
      start: "Try the demo",
      response: "This is a sample reply for reviewing the chat interface. For your project, we can discuss the website's purpose, content and required features. Explore the portfolio below or contact Nikola for a quote. Real AI replies require a configured server and database.",
    },
    errors: {
      UNAVAILABLE: "Chat is temporarily unavailable. You can contact Nikola directly.",
      RATE_LIMITED: "You have reached the message limit. Try again later or contact us.",
      SESSION_EXPIRED: "Your session has expired. Start a new conversation.",
      BUSY: "A response is still being processed. Please wait and try again.",
      INVALID_INPUT: "Your message must contain between 1 and 2,000 characters.",
      STREAM_ERROR: "The response did not finish. Try again or contact us.",
    },
  },
};
