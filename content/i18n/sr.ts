import type { Dictionary } from "./types";

const sr = {
  navigation: {
    home: "Početna", portfolio: "Portfolio", services: "Usluge",
    about: "O nama", contact: "Kontakt", pricing: "Cenovnik",
  },
  accessibility: {
    skipLink: "Pređi na sadržaj",
    homeLink: "NMark Designs - početna",
    mainNavigation: "Glavna navigacija",
    mobileNavigation: "Glavna navigacija za mobilne uređaje",
    footerNavigation: "Navigacija u podnožju",
    menu: "Glavni meni",
    backToTop: "Nazad na vrh",
    languageNavigation: "Jezik sajta",
    languageLabels: { sr: "Srpski", en: "English - engleski" },
  },
  actions: {
    quote: "Zatražite ponudu",
    contact: "Kontaktirajte nas",
    allProjects: "Svi projekti",
    viewProject: "Pogledajte projekat",
  },
  footer: {
    description: "Profesionalna izrada web sajtova za male biznise, frilensere i lokalne brendove. Fokus na modernom dizajnu, brzini i osnovnoj SEO optimizaciji.",
    quickLinks: "Brzi linkovi",
    contact: "Kontakt",
    copyright: "Sva prava zadržana.",
  },
  portfolio: {
    metadata: {
      title: "Portfolio - odabrani web projekti",
      description: "Pogledajte NMark Designs web projekte za različite delatnosti, prilagođene potrebama klijenata. Istražite naše radove i kontaktirajte nas za vaš sajt.",
    },
    intro: {
      eyebrow: "Odabrani projekti",
      title: "Portfolio",
      description: "Web sajtovi za različite delatnosti i različite potrebe. Svaki projekat odražava naš pristup dizajnu i individualne potrebe klijenta.",
    },
    contactTitle: "Razgovarajmo o vašem sajtu.",
    visitWebsite: "Posetite web sajt",
  },
  about: {
    metadata: {
      title: "O nama",
      description: "Upoznajte NMark Designs i osnivača Nikolu Markovića. Individualan pristup web dizajnu, sa fokusom na korisničko iskustvo, performanse i održavanje.",
    },
    intro: {
      eyebrow: "NMark Designs",
      title: "O nama",
      description: "Ideje pretvaramo u funkcionalne, moderne i brze web sajtove. Umesto generičkih rešenja, kreiramo pažljivo osmišljene sajtove koji pomažu vašem biznisu da raste i izdvoji se na tržištu.",
    },
    profile: {
      eyebrow: "Ko smo mi",
      title: "Ko stoji iza NMark Designs?",
      paragraphs: [
        "Osnivač NMark Designs je Nikola Marković, frontend developer sa višegodišnjim iskustvom u kreiranju modernih, brzih i funkcionalnih web sajtova.",
        "Bilo da je u pitanju WordPress rešenje, custom kod ili e-commerce platforma, cilj je isti: vizuelno privlačan, tehnički stabilan sajt, optimizovan za performanse.",
        "NMark Designs je nastao iz ideje da klijentima ponudi praktična i kvalitetna rešenja bez nepotrebnih komplikacija. Fokus je na jasnoći, dobroj strukturi i korisničkom iskustvu, kako bi sajt bio jednostavan za korišćenje, održavanje i dalje proširenje.",
        "Svakom projektu pristupamo individualno, uz razumevanje potreba klijenta i ciljeva sajta: predstavljanje usluga, jačanje online prisustva ili povećanje prodaje.",
      ],
      imageAlt: "Nikola Marković, osnivač NMark Designs.",
      caption: "Nikola Marković / Osnivač i frontend developer",
    },
    approach: {
      title: "Naša misija",
      principles: [
        "Web sajtovi koji rade za vas",
        "Korisničko iskustvo na prvom mestu",
        "SEO i performanse bez kompromisa",
        "Dugoročna podrška i unapređenje",
      ],
      contactTitle: "Razgovarajmo o vašem sajtu.",
    },
  },
  caseStudy: {
    eyebrow: "Web projekat",
    client: "Klijent",
    location: "Lokacija",
    category: "Delatnost",
    services: "Usluge",
    technologies: "Tehnologije i alati",
    challenge: "Izazov",
    solution: "Rešenje",
    results: "Rezultati",
    gallery: "Prikazi projekta",
    navigation: "Navigacija kroz projekte",
    nextProject: "Sledeći projekat",
  },
  home: {
    metadata: {
      title: "Profesionalna izrada web sajtova",
      description: "NMark Designs kreira moderne, brze i SEO optimizovane web sajtove za male biznise, frilensere i lokalne brendove. Pogledajte projekte i zatražite besplatnu ponudu.",
    },
    hero: {
      eyebrow: "Web sajt koji donosi rezultate",
      title: "Profesionalna izrada web sajtova",
      subtitle: "Moderni, brzi i SEO optimizovani.",
      description: "Kreiramo sajtove za male biznise, frilensere i lokalne brendove. Pogledajte cene ili zatražite besplatnu ponudu.",
      imageAlt: "NMark Designs prikaz web dizajna na tabletu, telefonu i štampanim maketama.",
    },
    projects: {
      eyebrow: "Naši uspešni projekti",
      title: "Web dizajn koji pravi razliku.",
      description: "Svaki web sajt koji kreiramo prilagođen je potrebama klijenta. Pogledajte neke od naših najnovijih projekata.",
    },
    services: {
      eyebrow: "Vaša online prisutnost zaslužuje više",
      title: "Moderni sajtovi.\nPromišljen pristup.",
      description: "Od dizajna i SEO optimizacije do prilagođavanja različitim uređajima i redovnog održavanja.",
      imageAlt: "Web sajt Mađioničar Bojan prikazan na laptopu, uz šolju kafe na radnom stolu.",
      items: [
        {
          id: "design",
          title: "Moderni web dizajn",
          description: "Svaki detalj dizajniran je da odražava ono što vaš brend predstavlja i da privuče pažnju vaše ciljne publike.",
        },
        {
          id: "seo",
          title: "SEO optimizacija",
          description: "Strategijskom SEO optimizacijom poboljšavamo prisutnost vašeg brenda u rezultatima pretraživača i povezujemo vas sa ciljanom publikom.",
        },
        {
          id: "responsive",
          title: "Prilagođeno svakom uređaju",
          description: "Naš dizajn prilagođava se svakom ekranu, bilo da je to telefon, tablet ili kompjuter. Želimo da svako ima odlično iskustvo na vašem sajtu.",
        },
      ],
      maintenance: {
        id: "maintenance",
        title: "Održavanje i ažuriranje",
        description: "Web svet se neprestano menja, a mi držimo korak sa tim promenama za vas. Redovno ažuriramo vaš sajt, uz tehničku podršku i sigurnosne provere.",
      },
    },
    cta: {
      eyebrow: "Ne dozvolite da vaš biznis ostane nevidljiv",
      title: "Web sajt koji radi za vas.",
      description: "Kontaktirajte nas za besplatnu konsultaciju i saznajte kako možemo zajedno unaprediti vašu digitalnu prisutnost.",
    },
    faq: {
      eyebrow: "Centar za pomoć",
      title: "Imate pitanje? Pronađite odgovor.",
      description: "Brzi odgovori na najčešća pitanja o našim uslugama i saradnji.",
      items: [
        {
          id: "services",
          question: "Koje usluge pruža NMark Designs?",
          paragraphs: ["NMark Designs se bavi izradom web sajtova, njihovim održavanjem, optimizacijom i drugim digitalnim rešenjima prilagođenim potrebama klijenata."],
        },
        {
          id: "timeline",
          question: "Koliko traje izrada web sajta?",
          paragraphs: ["Rok izrade zavisi od složenosti sajta i vremena potrebnog za dostavljanje materijala od strane klijenta. Rad na projektu počinje tek kada dostavite sav neophodan sadržaj."],
        },
        {
          id: "payment",
          question: "Kako se vrši plaćanje?",
          paragraphs: [],
          list: [
            "50% avansno pre početka rada.",
            "Preostalih 50% po završetku projekta, pre nego što se sajt objavi i omogući pristup klijentu.",
            "Održavanje može biti mesečno, kvartalno ili godišnje, u skladu sa dogovorom.",
          ],
        },
        {
          id: "hosting",
          question: "Da li su troškovi domena i hostinga uključeni u cenu?",
          paragraphs: ["Ne, troškovi domena i hostinga se plaćaju odvojeno, direktno provajderu, u skladu sa vašim potrebama i željama."],
        },
        {
          id: "maintenance",
          question: "Da li nudite usluge održavanja i optimizacije sajta?",
          paragraphs: ["Da, nudimo:"],
          list: [
            "Održavanje, koje uključuje tehničku podršku, ažuriranje sadržaja i sigurnosne provere.",
            "Optimizaciju, koja može obuhvatati SEO, ubrzanje sajta i prilagođavanje za mobilne uređaje.",
          ],
        },
      ],
    },
  },
} satisfies Dictionary;

export default sr;
