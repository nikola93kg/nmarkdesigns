import type { Localized } from "@/lib/i18n";

export const privacySegments = { sr: "politika-privatnosti", en: "privacy-policy" } as const;

/** Text and controller details approved by the owner on 2026-11-20. */
export const privacyPublication = { approved: true, updatedOn: "2026-11-20" } as const;

interface PrivacySection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}
interface PrivacyContent {
  title: string;
  description: string;
  updated: string;
  contents: string;
  contact: string;
  sources: string;
  sections: readonly PrivacySection[];
}

export const privacyCopy: Localized<PrivacyContent> = {
  sr: {
    title: "Politika privatnosti",
    description: "Kako se obrađuju podaci prilikom posete sajtu, slanja upita i korišćenja NMark asistenta.",
    updated: "Ažurirano 20. novembra 2026.",
    contents: "Sadržaj", contact: "Pitanja o privatnosti", sources: "Dodatne informacije",
    sections: [
      { id: "rukovalac", title: "Ko je rukovalac podacima", paragraphs: [
        "Rukovalac podacima za nmarkdesigns.com i usluge predstavljene pod nazivom NMark Designs je Nikola Markovic. Kontakt lokacija: Lazarevac/Beograd, Srbija.",
        "Pitanja i zahteve u vezi s privatnošću možete poslati na info@nmarkdesigns.com.",
      ] },
      { id: "podaci", title: "Koji se podaci obrađuju", paragraphs: [
        "Kontakt forma obrađuje ime, email, opcioni broj telefona i poruku. Chatbot obrađuje tekst razgovora, odgovore, jezik, vreme aktivnosti, saglasnost i tehnički identifikator sesije. Kontakt podaci se unose u zasebnu formu za upit; ne morate ih pisati u razgovoru.",
        "Upit iz chatbota može sadržati ime, email, telefon, firmu, sajt, traženu uslugu, budžet, rok, opis projekta i način kontakta. Obavezna i opciona polja označena su u formi. Tehnički podaci obuhvataju informacije potrebne za dostavu zahteva, zaštitu od zloupotrebe, prijavu administratora i praćenje potrošnje API-ja.",
        "Ne unosite lozinke, podatke platnih kartica, zdravstvene podatke ili druge osetljive informacije, niti podatke drugih osoba koje nije potrebno navesti za vaš upit.",
      ] },
      { id: "svrhe", title: "Svrhe i pravni osnovi", paragraphs: [
        "Podaci iz upita služe za odgovor, razumevanje zahteva i pripremu ponude. Osnov je postupanje na vaš zahtev pre zaključenja ugovora. Osnov za bezbednost, sprečavanje spama i administraciju je legitimni interes za pouzdan rad sajta, uz procenu uticaja na vaša prava.",
        "Pre prve poruke prikazuje se kratko obaveštenje sa linkom ka detaljima. Slanje prve poruke predstavlja jasno označen pristanak na opisanu obradu; ne zahteva se posebno dugme za prihvatanje politike. Analitika ima zaseban izbor saglasnosti: odbijanje analitike ne sprečava slanje upita ili korišćenje chatbota. Izbor možete promeniti kroz podešavanja kolačića.",
      ] },
      { id: "ai", title: "Kako radi AI asistent", paragraphs: [
        "NMark Assistant je AI asistent, a ne lično obraćanje Nikole. Za proveru teme i sastavljanje odgovora aplikacija prosleđuje OpenAI API-ju tekst pitanja, potrebni deo prethodnog razgovora i javne informacije o NMark Designs uslugama. Razgovor se čuva i u bazi sajta radi nastavka komunikacije i obrade upita.",
        "Aplikacija ne traži trajno čuvanje odgovora kod OpenAI-ja. To ne znači odsustvo obrade ili bezbednosnih evidencija kod provajdera. Prema OpenAI dokumentaciji, API podaci se podrazumevano ne koriste za treniranje modela bez izričitog uključivanja deljenja; bezbednosne evidencije mogu se čuvati do 30 dana, uz opisane izuzetke. Obrada kod provajdera zavisi i od podešavanja deljenja podataka na nalogu.",
        "AI može pogrešiti. Odgovori nisu konačna ponuda niti automatska odluka o ugovaranju. Slanje upita zahteva zasebnu radnju. Za ponudu i proveru odgovora možete kontaktirati osobu putem kontakt forme ili emaila.",
      ] },
      { id: "primaoci", title: "Ko može imati pristup", paragraphs: [
        "Hostinger pruža hosting i MySQL infrastrukturu. OpenAI obrađuje sadržaj prosleđen radi AI odgovora. Cloudflare Turnstile proverava tehničke signale, uključujući IP adresu i podatke pregledača, radi zaštite kontakt forme od automatizovane zloupotrebe.",
        "Kontakt forma dostavlja poruku putem emaila. Ako su email obaveštenja za chatbot uključena, upit i povezani podaci mogu se preneti i u obaveštenje. Ovlašćeni administrator može pregledati razgovore i upite. Google prima analitičke podatke samo nakon izbora analitike. Linkovi ka WhatsApp-u, Instagram-u, partnerskom hostingu i drugim sajtovima vode na usluge sa sopstvenim pravilima privatnosti.",
        "Provajderi mogu obrađivati podatke izvan Srbije ili EEP-a. Informacije o obradi kod provajdera dostupne su preko linkova na kraju ovog dokumenta. Podaci ne ostaju nužno u Srbiji ili EU.",
      ] },
      { id: "cuvanje", title: "Planirani rokovi čuvanja", paragraphs: [
        "Za razgovore bez upita predviđeno je brisanje nakon 90 dana bez aktivnosti. Upiti se čuvaju 365 dana od slanja; povezani razgovor do 365 dana od poslednjeg upita. Pristup razgovoru iz pregledača preko kolačića traje do 24 sata; istek pristupa nije isto što i brisanje zapisa iz baze.",
        "Za istekle tehničke brojače, administrativne sesije i jednokratne tokene predviđen je dodatni period do sedam dana. Zbirni dnevni brojevi događaja čuvaju se dugoročno bez teksta razgovora i kontakt polja. Evidencija troškova sadrži podatke o API potrošnji, bez sadržaja razgovora i kontakata.",
        "Rokove za email prepisku i kopije upita u sandučetu, rezervne kopije, hosting dnevnike, administrativnu revizionu evidenciju i Google Analytics podatke treba dopuniti i potvrditi. Brisanje iz aplikacije ne briše automatski kopije u emailu ili kod provajdera. Navedeni rokovi predstavljaju pravila čuvanja u aplikaciji; automatsko brisanje zavisi od aktivnog rasporeda čišćenja.",
      ] },
      { id: "kolacici", title: "Kolačići i lokalno čuvanje", paragraphs: [
        "Izbor analitike čuva se u lokalnom skladištu pregledača pod nazivom nmark_consent_v2 dok se ne promeni ili obriše. Google Analytics se učitava tek nakon prihvatanja analitike. Pri odbijanju aplikacija pokušava da ukloni prethodno postavljene Google Analytics kolačiće. Odbijanje ne briše podatke koji su ranije već poslati Google-u.",
        "Kolačić __Host-nmark-chat povezuje pregledač sa prihvaćenom chat sesijom do 24 sata. Neophodni bezbednosni mehanizmi i kolačići administrativne prijave služe zaštiti i pristupu, a ne oglašavanju. Administrativna sesija traje do osam sati, a link za prijavu do deset minuta. Brisanje kolačića prekida pristup, ali ne predstavlja zahtev za brisanje razgovora.",
      ] },
      { id: "prava", title: "Vaša prava i obraćanje", paragraphs: [
        "U skladu sa primenljivim propisima možete tražiti pristup svojim podacima, ispravku, brisanje, ograničenje obrade, prenosivost kada je primenljiva i uložiti prigovor. Saglasnost možete povući za buduću obradu, bez uticaja na dopuštenost prethodne obrade. Prava i brisanje nisu bezuslovni ako postoji drugi važeći osnov čuvanja.",
        "Za pronalaženje upita može biti potrebna razumna potvrda identiteta. Ne šaljite lozinke ili kopije ličnih dokumenata bez prethodnog dogovora. Zahteve možete poslati na info@nmarkdesigns.com. Možete se obratiti Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti u Srbiji, odnosno drugom nadležnom organu kada je primenljivo.",
      ] },
      { id: "izmene", title: "Izmene dokumenta", paragraphs: [
        "Datum na vrhu označava poslednju izmenu ovog dokumenta. Promene provajdera, obrade, rokova ili funkcija zahtevaju ažuriranje obaveštenja i, kada je potrebno, novi izbor saglasnosti.",
      ] },
    ],
  },
  en: {
    title: "Privacy policy",
    description: "How information is handled when you visit this website, send an inquiry or use NMark Assistant.",
    updated: "Updated November 20, 2026.",
    contents: "Contents", contact: "Privacy questions", sources: "Further information",
    sections: [
      { id: "controller", title: "Who controls your information", paragraphs: [
        "The data controller for nmarkdesigns.com and the services presented under the name NMark Designs is Nikola Markovic. Contact location: Lazarevac/Belgrade, Serbia.",
        "Privacy questions and requests can be sent to info@nmarkdesigns.com.",
      ] },
      { id: "information", title: "Information processed", paragraphs: [
        "The contact form processes your name, email, optional telephone number and message. The chatbot processes conversation text, replies, language, activity times, consent and a technical session identifier. Contact details belong in the separate inquiry form; you do not need to put them in the conversation.",
        "A chatbot inquiry may include your name, email, telephone, company, website, service, budget, timeframe, project description and preferred contact method. Required and optional fields are identified in the form. Technical information supports request delivery, abuse prevention, administrator sign-in and API usage accounting.",
        "Please do not submit passwords, payment-card details, health information or other sensitive data, or unnecessary information about other people.",
      ] },
      { id: "purposes", title: "Purposes and legal grounds", paragraphs: [
        "Inquiry information is used to reply, understand your requirements and prepare a quote. The basis is taking steps at your request before entering a contract. The basis for security, spam prevention and administration is the legitimate interest in operating a reliable website, subject to an assessment of your rights.",
        "A short notice and link to details appear before the first message. Sending that message is the clearly identified consent action for the described processing; there is no separate policy-acceptance button. Analytics has an independent consent choice: declining analytics does not prevent inquiries or chatbot use. You can change your choice through cookie settings.",
      ] },
      { id: "ai", title: "How the AI assistant works", paragraphs: [
        "NMark Assistant is an AI assistant, rather than Nikola replying personally. To check relevance and generate an answer, the application sends the question, relevant conversation history and public NMark Designs service information to the OpenAI API. Conversations are also stored in the website database to support continuity and inquiries.",
        "The application does not request persistent response storage from OpenAI. This does not eliminate provider processing or security logs. OpenAI documents that API data is not used for model training by default unless sharing is explicitly enabled; abuse-monitoring logs may be retained for up to 30 days, with stated exceptions. Provider handling also depends on the account’s data-sharing settings.",
        "AI can make mistakes. Replies are not final quotes or automated contracting decisions. Sending an inquiry is a separate action. You can contact a person through the contact form or email to request a quote or check an answer.",
      ] },
      { id: "recipients", title: "Who may receive information", paragraphs: [
        "Hostinger provides hosting and MySQL infrastructure. OpenAI processes content sent to generate AI answers. Cloudflare Turnstile evaluates technical signals, including IP address and browser information, to protect the contact form against automated abuse.",
        "The contact form delivers your message by email. When chatbot email notifications are enabled, inquiry information and associated data may also be copied into a notification. An authorized administrator can review conversations and inquiries. Google receives analytics information only after analytics is accepted. Links to WhatsApp, Instagram, partner hosting and other websites lead to services with their own privacy terms.",
        "Providers may process information outside Serbia or the EEA. Information about provider processing is available through the links at the end of this document. Not all data necessarily remains in Serbia or the EU.",
      ] },
      { id: "retention", title: "Planned retention periods", paragraphs: [
        "Conversations without an inquiry are scheduled for deletion after 90 days without activity. Inquiries are retained for 365 days from submission; associated conversations until 365 days after the most recent inquiry. Browser access through the chat cookie lasts up to 24 hours; access expiry does not delete the database record.",
        "Expired technical counters, administrator sessions and one-time tokens have a planned grace period of up to seven days. Daily aggregate event counts are retained long term without conversation text or contact fields. Usage accounting contains API consumption metadata, without conversation content or contact details.",
        "Retention for email correspondence and inquiry copies in mailboxes, backups, hosting logs, administrator audit records and Google Analytics data remains to be specified and confirmed. Deleting an application record does not automatically remove email or provider copies. These periods are the application retention rules; automatic deletion depends on an active cleanup schedule.",
      ] },
      { id: "cookies", title: "Cookies and browser storage", paragraphs: [
        "Your analytics choice is saved in browser local storage as nmark_consent_v2 until changed or cleared. Google Analytics loads only after acceptance. When analytics is declined, the application attempts to remove existing Google Analytics cookies. Declining does not erase information already sent to Google.",
        "The __Host-nmark-chat cookie connects your browser to an accepted chat session for up to 24 hours. Essential security mechanisms and administrator sign-in cookies support protection and access rather than advertising. Administrator sessions last up to eight hours and sign-in links up to ten minutes. Clearing cookies ends access; it is not a request to delete the conversation.",
      ] },
      { id: "rights", title: "Your rights and requests", paragraphs: [
        "Subject to applicable law, you can request access, correction, deletion, restriction and portability where applicable, and object to processing. Consent can be withdrawn for future processing without affecting earlier lawful processing. Rights and deletion are subject to applicable conditions and other valid grounds for retention.",
        "Reasonable identity verification may be needed to locate an inquiry. Do not send passwords or identity-document copies without prior arrangements. Send privacy requests to info@nmarkdesigns.com. You may complain to Serbia’s Commissioner for Information of Public Importance and Personal Data Protection, or another competent authority where applicable.",
      ] },
      { id: "changes", title: "Changes to this document", paragraphs: [
        "The date above identifies the latest revision of this document. Changes to providers, processing, retention or features require an updated notice and, where necessary, a renewed consent choice.",
      ] },
    ],
  },
};

export const privacyReferences = [
  { label: { sr: "OpenAI API — obrada podataka", en: "OpenAI API — data controls" }, href: "https://developers.openai.com/api/docs/guides/your-data" },
  { label: { sr: "Hostinger — politika privatnosti", en: "Hostinger — privacy policy" }, href: "https://www.hostinger.com/legal/privacy-policy" },
  { label: { sr: "Cloudflare Turnstile — privatnost", en: "Cloudflare Turnstile — privacy" }, href: "https://www.cloudflare.com/turnstile-privacy-policy/" },
  { label: { sr: "Google — podaci sa partnerskih sajtova", en: "Google — partner sites" }, href: "https://policies.google.com/technologies/partner-sites" },
  { label: { sr: "Poverenik — zaštita podataka", en: "Serbian Commissioner — data protection" }, href: "https://poverenik.rs/zastita-podataka/kako-da-ostvarite-svoja-prava/?script=lat" },
] as const;
