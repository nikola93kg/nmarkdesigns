import type { Localized } from "@/lib/i18n";

export const termsCopy = {
  sr: {
    description: "Uslovi korišćenja sajta nmarkdesigns.com i informacije o slanju upita i cenama.",
    sections: [
      {
        title: "O sajtu",
        text: "Nikola Marković vodi ovaj sajt pod nazivom NMark Designs. Sajt predstavlja usluge izrade, dizajna i održavanja web sajtova, prikazuje ranije projekte i omogućava slanje upita.",
      },
      {
        title: "Upiti, cene i dogovor o projektu",
        text: "Slanjem upita započinjete razgovor o projektu. Cene na sajtu su početne. Konačna cena, obim rada, rokovi i uslovi plaćanja dogovaraju se za konkretan projekat.",
      },
      {
        title: "Privatnost i kontakt",
        text: "Informacije o obradi podataka pri poseti sajtu i slanju upita nalaze se u Politici privatnosti. Za pitanja o sajtu ili saradnji koristite Kontakt stranicu.",
      },
    ],
  },
  en: {
    description: "Terms for using nmarkdesigns.com and information about project inquiries and pricing.",
    sections: [
      {
        title: "About this site",
        text: "Nikola Marković operates this site under the name NMark Designs. The site presents website design, development and maintenance services, showcases past projects and lets you send an inquiry.",
      },
      {
        title: "Inquiries, pricing and project agreements",
        text: "Sending an inquiry starts a conversation about your project. Prices shown on the site are starting prices. Final pricing, scope, schedule and payment terms are agreed for each project.",
      },
      {
        title: "Privacy and contact",
        text: "The Privacy Policy explains how data is handled when you visit the site or send an inquiry. Use the Contact page for questions about the site or working together.",
      },
    ],
  },
} satisfies Localized<{ description: string; sections: { title: string; text: string }[] }>;
