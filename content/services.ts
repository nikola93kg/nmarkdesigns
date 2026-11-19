import type { Localized } from "@/lib/i18n";
import { getCarePlanStartingPrice, formatCarePlanStartingPrice, formatAdditionalStartingPrice, formatWebsiteStartingPrice } from "@/content/pricing";

const maintenanceStartingPrice = getCarePlanStartingPrice("basic-care");

export type ServiceKey =
  | "websites"
  | "commerce"
  | "development"
  | "design"
  | "optimization"
  | "maintenance";

export interface ServiceFaqItem {
  question: Localized<string>;
  answer: Localized<readonly string[]>;
}

export interface ServiceScopeItem {
  title: Localized<string>;
  description: Localized<string>;
}

export interface ServiceProcessStep {
  step: string;
  title: Localized<string>;
  description: Localized<string>;
}

export interface ServiceDetailDefinition {
  key: ServiceKey;
  id: string; // matches id in services.details.items
  slugs: Localized<string>;
  metadata: {
    title: Localized<string>;
    description: Localized<string>;
  };
  eyebrow: Localized<string>;
  heroTitle: Localized<string>;
  heroDescription: Localized<string>;
  startingPrice: {
    sr: string;
    en: string;
  };
  pricingAnchor: string;
  relatedCaseStudySlug: string;
  audience: {
    title: Localized<string>;
    description: Localized<string>;
    items: Localized<readonly string[]>;
  };
  scope: {
    title: Localized<string>;
    description: Localized<string>;
    items: readonly ServiceScopeItem[];
  };
  techStack: {
    title: Localized<string>;
    description: Localized<string>;
    technologies: readonly string[];
  };
  process: {
    title: Localized<string>;
    description: Localized<string>;
    steps: readonly ServiceProcessStep[];
  };
  faq: readonly ServiceFaqItem[];
}

export const serviceDefinitions: Record<ServiceKey, ServiceDetailDefinition> = {
  websites: {
    key: "websites",
    id: "website-build",
    slugs: {
      sr: "izrada-web-sajtova",
      en: "website-development",
    },
    metadata: {
      title: {
        sr: "Izrada Web Sajtova — Poslovni i Prezentacioni Sajtovi",
        en: "Website Development Services — Fast, Custom Business Websites",
      },
      description: {
        sr: "Profesionalna izrada web sajtova po meri za firme i preduzetnike u Beogradu i Srbiji. Responzivan prikaz, optimizacija učitavanja, jasan dizajn i tehnički SEO temelji.",
        en: "Custom website development for ambitious businesses. Built with Next.js or WordPress, clear content structure, responsive layouts, performance optimization and technical SEO foundations.",
      },
    },
    eyebrow: {
      sr: "Usluga: Izrada web sajtova",
      en: "Service: Website Development",
    },
    heroTitle: {
      sr: "Izrada web sajtova koji donose upite i grade dugoročno poverenje",
      en: "High-performance business websites engineered for trust and inquiries",
    },
    heroDescription: {
      sr: "Od sažetih Landing stranica do naprednih poslovnih portala. Gradim brze, responzivne sajtove u modernom kodu bez glomaznih generičkih tema, sa jasnom strukturom koja posetioce pretvara u klijente.",
      en: "From focused landing pages to comprehensive company websites. I build fast, responsive web solutions with clean modern code—free from generic templates—structured to turn visitors into qualified inquiries.",
    },
    startingPrice: {
      sr: `Od ${formatWebsiteStartingPrice("landing-page","sr")}`,
      en: `Starting from ${formatWebsiteStartingPrice("landing-page", "en")}`,
    },
    pricingAnchor: "packages",
    relatedCaseStudySlug: "casovi-francuskog",
    audience: {
      title: {
        sr: "Za koga je ova usluga",
        en: "Who this service is for",
      },
      description: {
        sr: "Izrada sajta je strateška investicija kada želite da predstavite poslovanje profesionalno i obezbedite stabilan kanal novih upita.",
        en: "Website development is a strategic investment for businesses looking to project credibility and establish a dependable client acquisition channel.",
      },
      items: {
        sr: [
          "Preduzeća i preduzetnici kojima je potreban moderan i reprezentativan sajt",
          "Lokalne i uslužne delatnosti koje žele veću vidljivost na Google pretrazi",
          "Kompanije koje pokreću novi brend ili ulaze na novo tržište",
          "Organizacije, škole i udruženja kojima je neophodna pregledna prezentacija informacija",
        ],
        en: [
          "Established businesses and founders needing a polished, modern web presence",
          "Service firms and local practices targeting higher visibility on search engines",
          "Brands launching new offerings or expanding into international markets",
          "Institutions, associations, and educational centers needing intuitive information design",
        ],
      },
    },
    scope: {
      title: {
        sr: "Šta obuhvata izrada sajta",
        en: "What is included in the project",
      },
      description: {
        sr: "Svaki projekat donosi zaokruženu tehničku i vizuelnu celinu, spremnu za posetioce i pretraživače.",
        en: "Every build delivers a complete visual and technical system engineered for both users and search engines.",
      },
      items: [
        {
          title: {
            sr: "Prilagođen moderan dizajn",
            en: "Tailored modern design",
          },
          description: {
            sr: "Bez gotovih šablona: vizuelni identitet usklađen sa vašim brendom, sa jasnom tipografijom i logičnim rasporedom sekcija.",
            en: "No off-the-shelf templates: a custom aesthetic tailored to your brand, with clean typography and deliberate section flow.",
          },
        },
        {
          title: {
            sr: "Mobilna responzivnost (100% Mobile-first)",
            en: "100% Responsive & mobile-first",
          },
          description: {
            sr: "Besprekorno funkcionisanje na svim širinama ekrana: od modernih pametnih telefona do ultra-širokih monitora.",
            en: "Flawless rendering and interaction across all screens, from compact phones to high-resolution widescreen monitors.",
          },
        },
        {
          title: {
            sr: "Tehnički SEO i Schema.org osnova",
            en: "Technical SEO & Schema foundations",
          },
          description: {
            sr: "Semantički HTML5, meta tagovi, Open Graph slike, kanonikalizacija, XML sitemap i strukturirani podaci za brže indeksiranje.",
            en: "Semantic HTML5, Open Graph metadata, canonical URLs, sitemap, and structured JSON-LD for rapid search engine indexing.",
          },
        },
        {
          title: {
            sr: "Core Web Vitals performanse",
            en: "Core Web Vitals excellence",
          },
          description: {
            sr: "Optimizovane slike sledeće generacije (WebP), kompresovan kod i munjevito učitavanje koje Google nagrađuje boljim pozicijama.",
            en: "Next-gen image optimization (WebP), minimal asset weight, and near-instant page loads that search algorithms prioritize.",
          },
        },
        {
          title: {
            sr: "Optimizovane kontakt forme",
            en: "Conversion-ready contact forms",
          },
          description: {
            sr: "Jasni pozivi na akciju (CTA), forme za upit sa validacijom u realnom vremenu i integrisana zaštita od spama bez dosadnih captcha testova.",
            en: "Frictionless contact workflows with real-time validation and bot-protection to deliver authentic inquiries directly to your inbox.",
          },
        },
        {
          title: {
            sr: "Dvojezičnost i internacionalizacija",
            en: "Localization & internationalization",
          },
          description: {
            sr: "Mogućnost višemilionske publike uz čiste jezičke rute (/sr/ i /en/) sa ispravnim hreflang alternativama za pretraživače.",
            en: "Target global audiences with clean locale-based URLs and proper hreflang alternating signals for international ranking.",
          },
        },
      ],
    },
    techStack: {
      title: {
        sr: "Tehnologije i arhitektura",
        en: "Technologies and architecture",
      },
      description: {
        sr: "Biram tehnologiju koja najbolje odgovara ciljevima projekta — bez gomilanja suvišnih dodataka koji usporavaju sajt.",
        en: "I choose the architecture that best solves the task—avoiding bloated plugins that degrade speed and security.",
      },
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Semantic HTML5", "WordPress (Clean Custom)"],
    },
    process: {
      title: {
        sr: "Kako teče izrada sajta",
        en: "Development workflow",
      },
      description: {
        sr: "Predvidiv proces u 4 koraka uz direktnu komunikaciju sa developerom u svakoj fazi.",
        en: "A structured 4-step process with direct access to the developer at every checkpoint.",
      },
      steps: [
        {
          step: "01",
          title: {
            sr: "Planiranje i struktura",
            en: "Discovery and sitemap",
          },
          description: {
            sr: "Definišemo ciljeve sajta, ciljnu publiku, navigaciju i spisak neophodnih stranica i funkcionalnosti.",
            en: "I clarify your primary business objectives, audience expectations, navigation flow, and required pages.",
          },
        },
        {
          step: "02",
          title: {
            sr: "Dizajn i organizacija sadržaja",
            en: "Design and content layout",
          },
          description: {
            sr: "Oblikujem vizuelni stil, tipografiju, sekcije i hijerarhiju poruka tako da posetilac lako razume vašu ponudu.",
            en: "I establish typographic hierarchy, color palette, and section layouts so visitors immediately grasp your value proposition.",
          },
        },
        {
          step: "03",
          title: {
            sr: "Razvoj i optimizacija koda",
            en: "Engineering and optimization",
          },
          description: {
            sr: "Pišem čist, brz kod, optimizujem slike, implementiram forme, SEO tagove i bezbednosne mehanizme.",
            en: "I write clean, semantic code, compress imagery, implement secure contact flows, and wire up technical SEO foundations.",
          },
        },
        {
          step: "04",
          title: {
            sr: "Testiranje i lansiranje",
            en: "Testing and launch",
          },
          description: {
            sr: "Verifikujem prikaz na svim uređajima, proveravam Core Web Vitals metrike, povezujem domen i Google analitiku.",
            en: "I test across real devices, confirm Core Web Vitals scores, configure domain DNS, and connect Google analytics.",
          },
        },
      ],
    },
    faq: [
      {
        question: {
          sr: "Koliko traje izrada web sajta?",
          en: "How long does it take to build a website?",
        },
        answer: {
          sr: [
            "Rok izrade zavisi od obima projekta i pripremljenosti materijala. Landing stranica se najčešće završava za 5 do 7 radnih dana, dok izrada kompletnog poslovnog sajta od 5–8 stranica obično traje 2 do 3 nedelje.",
            "Jasno definisan raspored sekcija i pripremljeni tekstovi i fotografije sa vaše strane omogućavaju brz i predvidiv napredak.",
          ],
          en: [
            "Timelines depend on scope and content readiness. A focused landing page typically takes 5–7 business days, while a comprehensive multi-page business website generally completes within 2–3 weeks.",
            "Prepared text, imagery, and prompt feedback ensure steady, predictable progress.",
          ],
        },
      },
      {
        question: {
          sr: "Šta tačno ulazi u cenu izrade sajta?",
          en: "What is included in the quoted price?",
        },
        answer: {
          sr: [
            "U cenu ulazi kompletan proces: dizajn, responzivno kodiranje, tehnički SEO temelji, integracija kontakt formi, optimizacija brzine (Core Web Vitals), povezivanje domena i SSL sertifikata, kao i osnovno uputstvo za korišćenje.",
            "Domen i hosting zakupljujete direktno kod pouzdanih provajdera uz moju pomoć pri izboru i podešavanju, bez skrivenih marži.",
          ],
          en: [
            "The quote covers the full lifecycle: bespoke design, responsive engineering, technical SEO, contact workflows, Core Web Vitals optimization, domain configuration, and launch verification.",
            "Domain and hosting are registered directly with your chosen provider—I guide the setup without inflated markups.",
          ],
        },
      },
      {
        question: {
          sr: "Da li je sajt prilagođen telefonima i Google pretrazi?",
          en: "Will the website be mobile-friendly and optimized for Google?",
        },
        answer: {
          sr: [
            "Apsolutno. Svaki sajt izrađujem mobile-first metodom sa posebnom pažnjom posvećenom brzini na mobilnim mrežama. Svaka stranica dobija semantičke meta opise, Open Graph kartice, XML sitemap i strukturirane podatke (Schema.org).",
          ],
          en: [
            "Yes, unconditionally. Every website is built mobile-first with dedicated testing on cellular bandwidth. Each page includes semantic meta descriptions, Open Graph cards, an automated XML sitemap, and Schema.org structured data.",
          ],
        },
      },
      {
        question: {
          sr: "Mogu li kasnije samostalno menjati sadržaj na sajtu?",
          en: "Can I update website content on my own later?",
        },
        answer: {
          sr: [
            "Da. U zavisnosti od izabrane arhitekture, sajt može imati intuitivan CMS panel (WordPress ili headless CMS) gde možete samostalno dodavati vesti, menjati cene i ažurirati fotografije bez programerskog znanja.",
            "Ukoliko preferirate da ja brinem o tehničkim i sadržajnim promenama, nudim mesečne pakete održavanja.",
          ],
          en: [
            "Yes. Depending on your workflow requirements, your website can be configured with an intuitive dashboard for updating articles, imagery, and text without touching code.",
            "Alternatively, I offer ongoing maintenance plans if you prefer hands-off management.",
          ],
        },
      },
    ],
  },

  commerce: {
    key: "commerce",
    id: "ecommerce",
    slugs: {
      sr: "web-prodavnice",
      en: "ecommerce-development",
    },
    metadata: {
      title: {
        sr: "Izrada Web Prodavnica — WooCommerce Online Prodavnice",
        en: "E-Commerce Website Development — Custom WooCommerce Stores",
      },
      description: {
        sr: "Izrada stabilnih i brzih WooCommerce web prodavnica u Srbiji. Sigurna korpa, organizovani katalozi proizvoda, plaćanje karticama i pouzećem, optimizacija za prodaju.",
        en: "Custom WooCommerce and e-commerce development. Fast product catalogs, streamlined checkout flows, secure payment gateways, and conversion-focused architectures.",
      },
    },
    eyebrow: {
      sr: "Usluga: Web prodavnice",
      en: "Service: E-Commerce Development",
    },
    heroTitle: {
      sr: "Izrada pouzdanih web prodavnica prilagođenih kupcima i lakih za vođenje",
      en: "Reliable e-commerce storefronts built for conversion and easy operations",
    },
    heroDescription: {
      sr: "Razvijam WooCommerce prodavnice sa čistom strukturom kategorija, brzim procesom kupovine i potpunim vlasništvom nad vašim podacima i kupcima, bez mesečnih provizija na promet.",
      en: "I engineer performant WooCommerce stores with structured catalogs, frictionless checkout flows, and full merchant ownership of your customer data—free from recurring transaction cuts.",
    },
    startingPrice: {
      sr: `Od ${formatWebsiteStartingPrice("ecommerce","sr")}`,
      en: `Starting from ${formatWebsiteStartingPrice("ecommerce", "en")}`,
    },
    pricingAnchor: "packages",
    relatedCaseStudySlug: "anabelabebioprema",
    audience: {
      title: {
        sr: "Kome je namenjena izrada online prodavnice",
        en: "Who needs a custom online store",
      },
      description: {
        sr: "Za proizvođače, uvoznike, lokalne trgovce i brendove koji žele da prodaju svoje proizvode direktno kupcima 24/7.",
        en: "Ideal for retail brands, independent manufacturers, and merchants aiming to sell directly to consumers with full platform control.",
      },
      items: {
        sr: [
          "Firme koje prelaze sa fizičke ili Instagram prodaje na automatizovanu web prodavnicu",
          "Trgovci sa katalogom od nekoliko desetina do više hiljada artikala",
          "Brendovi koji žele moderan, brz sajt sa integrisanim online plaćanjem",
          "Postojeće prodavnice kojima je potreban redizajn i ubrzavanje sporog procesa kupovine",
        ],
        en: [
          "Businesses transitioning from manual Instagram orders to an automated checkout system",
          "Merchants managing catalogs ranging from boutique collections to thousands of SKUs",
          "Brands requiring seamless payment gateway integration and inventory synchronization",
          "Existing online shops needing performance optimization and mobile checkout redesign",
        ],
      },
    },
    scope: {
      title: {
        sr: "Šta obuhvata izrada web prodavnice",
        en: "What the e-commerce build includes",
      },
      description: {
        sr: "Kompletno tehničko podešavanje prodavnice sa fokusom na sigurnost, brzinu i jednostavnost kupovine.",
        en: "End-to-end store configuration designed for speed, security, and purchasing ease.",
      },
      items: [
        {
          title: {
            sr: "WooCommerce instalacija i konfiguracija",
            en: "Tailored WooCommerce setup",
          },
          description: {
            sr: "Čista konfiguracija bez opterećujućih univerzalnih tema, prilagođena vašim tipovima artikala i porezima.",
            en: "Lean store setup without bloated multipurpose themes, configured for your specific product variants and tax rules.",
          },
        },
        {
          title: {
            sr: "Optimizovan Checkout u 2 koraka",
            en: "Streamlined 2-step checkout",
          },
          description: {
            sr: "Uklanjanje nepotrebnih polja u korpi kako bi se smanjilo napuštanje porudžbine i povećao procenat završenih kupovina.",
            en: "Frictionless checkout forms with minimal mandatory fields to maximize order completion rates.",
          },
        },
        {
          title: {
            sr: "Povezivanje načina plaćanja i dostave",
            en: "Payment & shipping integration",
          },
          description: {
            sr: "Podešavanje plaćanja pouzećem, virmanom ili platnim karticama (bankarski procesori) uz definisane zone i cenovnike kurirskih službi.",
            en: "Configuration of payment options (credit card processors, bank transfer, cash on delivery) and automated carrier shipping tiers.",
          },
        },
        {
          title: {
            sr: "Filtriranje i varijacije artikala",
            en: "Product filtering & attributes",
          },
          description: {
            sr: "Pregledno filtriranje po veličinama, bojama, ceni ili kategorijama koje radi brzo i bez osvežavanja cele stranice.",
            en: "Fast, responsive faceted search and attribute filtering by size, color, brand, or price range.",
          },
        },
        {
          title: {
            sr: "Automatska obaveštenja i emailovi",
            en: "Automated transaction emails",
          },
          description: {
            sr: "Brendirani emailovi za potvrdu porudžbine kupcu i instant notifikacije vašem timu za brzu pripremu pošiljke.",
            en: "Branded transactional email receipts for buyers and instant order notifications for your fulfillment team.",
          },
        },
        {
          title: {
            sr: "E-commerce SEO i Schema Product oznake",
            en: "E-Commerce SEO & Product Schema",
          },
          description: {
            sr: "Strukturirani podaci za cene, dostupnost i opise proizvoda koji se prikazuju u Google Shopping i organskim rezultatima.",
            en: "Schema.org Product and Offer markup enabling rich search snippets with price, availability, and product ratings.",
          },
        },
      ],
    },
    techStack: {
      title: {
        sr: "Tehnologije za web prodavnice",
        en: "E-commerce technology stack",
      },
      description: {
        sr: "Gradim na proverenom open-source rešenju, uz podešavanje bezbednosti, održavanja i dogovorenih pristupa bazi podataka.",
        en: "I build on established open-source systems, with security, maintenance and data access configured for the agreed scope.",
      },
      technologies: ["WordPress", "WooCommerce", "MySQL", "PHP", "Tailwind CSS", "Next.js (Headless opciono)"],
    },
    process: {
      title: {
        sr: "Proces izrade prodavnice",
        en: "Store delivery process",
      },
      description: {
        sr: "Sistematičan pristup od arhitekture kataloga do prvog testnog plaćanja.",
        en: "A systematic approach from catalog taxonomy to final checkout test orders.",
      },
      steps: [
        {
          step: "01",
          title: {
            sr: "Arhitektura kataloga i zahteva",
            en: "Catalog taxonomy and scope",
          },
          description: {
            sr: "Definišemo kategorije, atribute artikala (boje, veličine), načine plaćanja i model obračuna dostave.",
            en: "I map product categories, variant attributes, payment processors, and shipping logistics rules.",
          },
        },
        {
          step: "02",
          title: {
            sr: "Dizajn izloga i stranice artikla",
            en: "Storefront and product UI design",
          },
          description: {
            sr: "Dizajniram intuitivan katalog, kartice proizvoda sa jasnom cenom i dugmetom za kupovinu, i mobilnu korpu.",
            en: "I design clean product cards, clear add-to-cart workflows, and responsive shopping cart screens.",
          },
        },
        {
          step: "03",
          title: {
            sr: "Implementacija i uvoz proizvoda",
            en: "Configuration and product entry",
          },
          description: {
            sr: "Podešavam WooCommerce, povezujem platne prolaze, uvozim početni asortiman artikala i konfigurišem transakcione emailove.",
            en: "I set up payment gateways, import initial product data, test transactional emails, and secure checkout endpoints.",
          },
        },
        {
          step: "04",
          title: {
            sr: "Simulacija kupovine i obuka",
            en: "Live checkout test and training",
          },
          description: {
            sr: "Prolazim kroz kompletne testne porudžbine na računaru i telefonu, proveravam zalihe i obučavam vas za upravljanje narudžbinama.",
            en: "I execute end-to-end test transactions, verify inventory adjustments, and train your team on order fulfillment.",
          },
        },
      ],
    },
    faq: [
      {
        question: {
          sr: "Koliko proizvoda može da primi WooCommerce prodavnica?",
          en: "How many products can a WooCommerce store support?",
        },
        answer: {
          sr: [
            "WooCommerce nema veštačko ograničenje broja artikala. Može pouzdano da podrži od 50 do preko 20.000 artikala uz kvalitetan hosting i pravilno keširanje baze podataka, što sam dokumentovao na projektu Anabela Bebi Oprema sa hiljadama aktivnih artikala.",
          ],
          en: [
            "WooCommerce has no artificial item limit. With optimized database architecture and solid hosting, it reliably powers catalogs from 50 to 20,000+ SKUs—as demonstrated on the Anabela Bebi Oprema project.",
          ],
        },
      },
      {
        question: {
          sr: "Koje načine plaćanja moja prodavnica može da ponudi kupcima?",
          en: "What payment options can my store offer customers?",
        },
        answer: {
          sr: [
            "Najčešća kombinacija u Srbiji je plaćanje pouzećem (gotovinom kuriru pri preuzimanju) i uplatom na račun (virmanom). Takođe konfigurišem plaćanje platnim karticama (Banca Intesa, AIK, ChipCard, Monri ili Stripe za inostrano tržište).",
          ],
          en: [
            "I integrate international card gateways (Stripe, PayPal) as well as domestic payment processors, direct bank transfers, and cash-on-delivery options depending on your operating geography.",
          ],
        },
      },
      {
        question: {
          sr: "Da li plaćamo mesečne procente ili provizije na prodaju?",
          en: "Are there recurring platform sales fees or commissions?",
        },
        answer: {
          sr: [
            "Ne. Za razliku od platformi kao što je Shopify, WooCommerce je softver u vašem 100% vlasništvu. Ne plaćate meni niti platformi nikakve mesečne procente od prodate robe — plaćate samo standardnu proviziju vaše banke za kartične transakcije ukoliko koristite e-commerce kartično plaćanje.",
          ],
          en: [
            "No. Unlike proprietary platforms like Shopify, WooCommerce is open-source software you own outright. You pay zero platform fees on order volume—only your merchant bank's standard interchange rate on card transactions.",
          ],
        },
      },
    ],
  },

  development: {
    key: "development",
    id: "development-options",
    slugs: {
      sr: "custom-web-aplikacije",
      en: "custom-web-applications",
    },
    metadata: {
      title: {
        sr: "Custom Web Aplikacije — Namenski Next.js i React Razvoj",
        en: "Custom Web Applications — Bespoke Next.js & React Engineering",
      },
      description: {
        sr: "Razvoj namenskih web aplikacija i softverskih portala po meri. Next.js, React, TypeScript, API integracije, interaktivni alati i dashboards visokih performansi.",
        en: "Engineering custom web applications, client portals, and internal tools with Next.js, React, and TypeScript. Robust APIs, high security, and extreme performance.",
      },
    },
    eyebrow: {
      sr: "Usluga: Custom web aplikacije",
      en: "Service: Custom Web Applications",
    },
    heroTitle: {
      sr: "Namenska Next.js i React rešenja za specifične poslovne zahteve",
      en: "Bespoke Next.js and React software engineered for scale and speed",
    },
    heroDescription: {
      sr: "Kada gotovi šabloni i univerzalni WordPress plugini više ne mogu da podrže vaše poslovanje. Razvijam modularan softver od nule: korisničke portale, kalkulatore, sisteme rezervacija i interne alate sa direktnim API integracijama.",
      en: "When off-the-shelf templates and generic plugins reach their limits. I architect bespoke software from scratch: authenticated client portals, interactive calculators, booking systems, and internal operational tools.",
    },
    startingPrice: {
      sr: "Po ponudi",
      en: "Custom quote",
    },
    pricingAnchor: "custom-development",
    relatedCaseStudySlug: "buy-pallet-jacks",
    audience: {
      title: {
        sr: "Kada je potreban custom web razvoj",
        en: "When bespoke engineering is needed",
      },
      description: {
        sr: "Custom inženjering je pravi izbor kada softver treba da se prilagodi vašem poslovnom toku, a ne obrnuto.",
        en: "Custom software is the right path when your system must conform to your operational processes, not the other way around.",
      },
      items: {
        sr: [
          "Kompanije kojima su potrebni zatvoreni korisnički portali sa prijavom i nivoima pristupa",
          "Biznisi kojima su neophodni dinamički konfiguratori, interaktivni kalkulatori ili uporedni alati",
          "Organizacije koje žele povezivanje sajta sa internim CRM, ERP ili skladišnim sistemima putem API-ja",
          "Projekti sa zahtevom za ekstremnom brzinom i bezbednošću bez baze podataka izložene u WordPress-u",
        ],
        en: [
          "Organizations needing authenticated client dashboards with fine-grained role-based access",
          "Businesses requiring interactive product configurators, dynamic calculators, or comparison engines",
          "Companies integrating their web presence with internal CRM, ERP, or warehouse APIs",
          "Projects demanding extreme performance and attack surface minimization beyond traditional CMS platforms",
        ],
      },
    },
    scope: {
      title: {
        sr: "Šta obuhvata namenski razvoj",
        en: "Bespoke development scope",
      },
      description: {
        sr: "Čista softverska arhitektura dizajnirana za stabilnost, bezbednost i dugoročno skaliranje.",
        en: "Modern frontend and full-stack software architecture engineered for stability and growth.",
      },
      items: [
        {
          title: {
            sr: "Next.js App Router i React arhitektura",
            en: "Next.js App Router & React architecture",
          },
          description: {
            sr: "Server Components za maksimalnu brzinu i minimalan prenos JavaScript koda ka korisnikovom uređaju.",
            en: "Server Components rendering for lightning-fast first contentful paint and minimal client bundle overhead.",
          },
        },
        {
          title: {
            sr: "Striktno tipiziran TypeScript kod",
            en: "Strictly typed TypeScript codebase",
          },
          description: {
            sr: "Sprečavanje grešaka u ranoj fazi razvoja, modularna struktura i jednostavno održavanje bez tehničkog duga.",
            en: "Zero runtime type surprises, clean component boundaries, and effortless maintainability across team lifecycles.",
          },
        },
        {
          title: {
            sr: "API integracije i automatizacija",
            en: "API integrations & automation",
          },
          description: {
            sr: "Povezivanje sa eksternim servisima (Stripe, SendGrid, Cloudflare, CRM sistemi, baze podataka) putem REST ili GraphQL protokola.",
            en: "Seamless connections to third-party services, transactional dispatchers, Cloudflare edge tools, and external databases.",
          },
        },
        {
          title: {
            sr: "Interaktivni korisnički interfejsi (UI/UX)",
            en: "Interactive user interfaces (UI/UX)",
          },
          description: {
            sr: "Komponente prilagođene kompleksnim tokovima podataka: tabele, grafikoni, višekoračni obrasci i instant filtriranja.",
            en: "Components engineered for complex data entry: reactive tables, multi-step wizards, and instantaneous client-side filtering.",
          },
        },
        {
          title: {
            sr: "Bezbednosno kaljenje i zaštita podataka",
            en: "Security hardening & rate limiting",
          },
          description: {
            sr: "CSP hederi, HSTS, striktna validacija ulaznih podataka, zaštita od CSRF i XSS napada i kontrola frekvencije zahteva (rate-limiting).",
            en: "Rigorous Content Security Policies, HSTS, strict payload validation, and robust in-memory edge rate limiting.",
          },
        },
        {
          title: {
            sr: "Automatizovani testovi i CI/CD",
            en: "Automated verification & CI/CD",
          },
          description: {
            sr: "Playwright E2E testovi i statička provera koda kako nijedna izmena u budućnosti ne bi pokvarila postojeće funkcije.",
            en: "End-to-end automated tests covering agreed user journeys to help detect regressions during feature releases and dependency updates.",
          },
        },
      ],
    },
    techStack: {
      title: {
        sr: "Tehnološki arsenal",
        en: "Engineering stack",
      },
      description: {
        sr: "Alati i jezici modernog veba sa nultim kompromisom po pitanju performansi i sigurnosti.",
        en: "Modern web tools chosen strictly for performance, maintainability, and security excellence.",
      },
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "REST & GraphQL APIs", "Playwright"],
    },
    process: {
      title: {
        sr: "Kako razvijam custom softver",
        en: "Custom software lifecycle",
      },
      description: {
        sr: "Inženjerski pristup sa preciznim definisanjem zahteva pre nego što se napiše prva linija koda.",
        en: "Disciplined agile engineering with unambiguous specifications before touching code.",
      },
      steps: [
        {
          step: "01",
          title: {
            sr: "Tehnička specifikacija i model podataka",
            en: "Technical specification & data model",
          },
          description: {
            sr: "Mapiram entitete, korisničke uloge, eksterne integracije i logiku poslovnih procesa u preciznu specifikaciju.",
            en: "I document user flows, schema models, external integration points, and edge cases in a formal specification.",
          },
        },
        {
          step: "02",
          title: {
            sr: "Arhitektura sistema i prototip UI-ja",
            en: "Architecture & UI prototyping",
          },
          description: {
            sr: "Definišem modularnu arhitekturu, bezbednosne granice i izrađujem wireframe modele ključnih ekrana aplikacije.",
            en: "I design component hierarchies, security perimeters, and high-fidelity screen layouts for approval.",
          },
        },
        {
          step: "03",
          title: {
            sr: "Razvoj u fazama uz demonstracije",
            en: "Iterative development & checkpoints",
          },
          description: {
            sr: "Gradim aplikaciju u definisanim etapama uz redovne preglede i testno okruženje gde možete isprobati napredak.",
            en: "I engineer features in staged milestones with private preview environments for your continuous verification.",
          },
        },
        {
          step: "04",
          title: {
            sr: "Automatizovano testiranje i deploy",
            en: "Automated QA & production deployment",
          },
          description: {
            sr: "Izvršavam rigorozne testove performansi i bezbednosti, konfigurišem server i predajem uredno dokumentovan kod.",
            en: "I run end-to-end regression suites, verify Core Web Vitals, execute server provisioning, and provide clean documentation.",
          },
        },
      ],
    },
    faq: [
      {
        question: {
          sr: "Zašto izabrati Next.js umesto WordPress-a za specifične projekte?",
          en: "Why choose Next.js over WordPress for custom projects?",
        },
        answer: {
          sr: [
            "WordPress je odličan za standardne blogove i prezentacije, ali kada su vam potrebni specifični korisnički portali, dinamički kalkulatori ili interfejsi sa velikom količinom interakcije, plugini postaju spori, nesigurni i teški za održavanje.",
            "Next.js omogućava potpunu slobodu u arhitekturi, munjevito učitavanje, minimalan utrošak resursa i mnogo manju izloženost hakerskim napadima jer nema izloženu administratorsku bazu.",
          ],
          en: [
            "WordPress is great for content-heavy brochure sites, but when your application demands authenticated client workflows, interactive calculations, or real-time API integrations, plugin stacks become sluggish and fragile.",
            "Next.js delivers absolute architectural freedom, unmatched runtime speed, lower server operating costs, and a dramatically reduced vulnerability surface.",
          ],
        },
      },
      {
        question: {
          sr: "Koliko traje razvoj custom web aplikacije?",
          en: "How long does custom software development take?",
        },
        answer: {
          sr: [
            "Trajanje zavisi od kompleksnosti funkcionalnosti. Manji interni alati ili kalkulatori mogu se razviti za 2 do 3 nedelje, dok kompleksniji klijentski portali obično traže od 4 do 8 nedelja uz jasno definisane etape i testiranja.",
          ],
          en: [
            "Timelines scale directly with feature scope. Targeted business calculators or interactive components generally take 2–3 weeks, while comprehensive multi-role client portals typically span 4–8 weeks across planned milestones.",
          ],
        },
      },
    ],
  },

  design: {
    key: "design",
    id: "design-ux",
    slugs: {
      sr: "web-dizajn-i-redizajn",
      en: "web-design-and-redesign",
    },
    metadata: {
      title: {
        sr: "Web Dizajn i Redizajn Sajta — Modernizacija Izgleda i UX",
        en: "Web Design and Website Redesign — UI/UX Modernization",
      },
      description: {
        sr: "Strateški web dizajn i redizajn sajtova. Modernizacija vizuelnog identiteta, mobilno prilagođavanje, bolja preglednost ponude i povećanje konverzija bez gubitka SEO pozicija.",
        en: "Strategic web design and website redesign services. Modern visual aesthetics, mobile UX refinement, intuitive content hierarchy, and conversion improvements.",
      },
    },
    eyebrow: {
      sr: "Usluga: Web dizajn i redizajn",
      en: "Service: Web Design and Redesign",
    },
    heroTitle: {
      sr: "Web dizajn i redizajn koji posetioca pretvaraju u klijenta",
      en: "Strategic web design and redesign that turns visitors into clients",
    },
    heroDescription: {
      sr: "Dizajn ne posmatram kao površinsku dekoraciju, već kao strateški alat koji jasno objašnjava vašu vrednost. Radim nov dizajn od nule ili temeljan redizajn postojećeg sajta uz očuvanje stečenih Google pozicija.",
      en: "I treat design not as cosmetic decoration, but as a strategic asset that communicates your value instantly. I create fresh designs from scratch or execute comprehensive redesigns while protecting your hard-won SEO equity.",
    },
    startingPrice: {
      sr: formatAdditionalStartingPrice("redesign","sr"),
      en: formatAdditionalStartingPrice("redesign","en"),
    },
    pricingAnchor: "additional-services",
    relatedCaseStudySlug: "os-dule-karaklajic",
    audience: {
      title: {
        sr: "Kada je vreme za novi dizajn ili redizajn",
        en: "Signs your website needs a redesign",
      },
      description: {
        sr: "Ukoliko imate odličan proizvod ili uslugu, ali sajt izgleda prevaziđeno — gubite klijente pre nego što uopšte stupe u kontakt.",
        en: "When your products or services are exceptional but your website looks dated, you lose high-value prospects before they ever reach out.",
      },
      items: {
        sr: [
          "Sajt je pravljen pre 4–5 godina i deluje zastarelo u poređenju sa modernim konkurentima",
          "Tekstovi i ponude su pretrpani, a posetiocima je teško da se snađu na telefonu",
          "Posete postoje, ali je broj upita ili narudžbina nizak zbog lošeg korisničkog toka (UX)",
          "Brend je evoluirao i sada nudi ozbiljnije usluge koje postojeći sajt ne predstavlja adekvatno",
        ],
        en: [
          "Your website was built years ago and looks dated against contemporary market competitors",
          "Content is cluttered and navigation on mobile devices feels awkward or frustrating",
          "You receive traffic, but conversion to inquiries is weak due to poor visual hierarchy",
          "Your business has matured to higher-tier services that your current website fails to reflect",
        ],
      },
    },
    scope: {
      title: {
        sr: "Šta obuhvata proces redizajna",
        en: "What the redesign includes",
      },
      description: {
        sr: "Sistematičan proces analize, restrukturiranja i vizuelne modernizacije.",
        en: "A structured methodology covering UX audit, hierarchy redesign, and visual polish.",
      },
      items: [
        {
          title: {
            sr: "Analiza slabih tačaka postojećeg sajta",
            en: "Existing website UX audit",
          },
          description: {
            sr: "Identifikujem gde posetioci odustaju, šta zbunjuje korisnike i koje sekcije ne doprinose konverziji.",
            en: "I pinpoint where visitors drop off, eliminate confusing navigation patterns, and prune dead weight.",
          },
        },
        {
          title: {
            sr: "Snažna vizuelna hijerarhija i tipografija",
            en: "Intentional visual hierarchy",
          },
          description: {
            sr: "Odabir fontova, boja i razmaka koji odišu profesionalizmom i usmeravaju pažnju na ključne poruke i pozive na akciju.",
            en: "Sophisticated typography scales, whitespace rhythm, and color tokens that guide visitor focus toward calls to action.",
          },
        },
        {
          title: {
            sr: "Mobile-first optimizacija dodira i čitanja",
            en: "Mobile touch target polish",
          },
          description: {
            sr: "Prilagođavanje veličina dugmadi, formi i navigacionih menija za lako korišćenje jednom rukom na telefonu.",
            en: "Generous tap targets, frictionless thumb navigation, and comfortable line lengths tailored for phone screens.",
          },
        },
        {
          title: {
            sr: "Prezentacija portfolija i referenci",
            en: "Showcase presentation design",
          },
          description: {
            sr: "Dizajniram sekcije radova sa velikim, jasnim fotografijama i konkretnim rezultatima koji grade poverenje.",
            en: "Large, crisp imagery and structured case studies showcasing your past work and authentic business credibility.",
          },
        },
        {
          title: {
            sr: "Očuvanje i migracija SEO strukture",
            en: "SEO equity protection",
          },
          description: {
            sr: "Pazim na postojeće URL-ove, naslove i preusmeravanja kako redizajn ne bi naškodio vašim Google pozicijama.",
            en: "I map historical URLs, headings, and metadata with 308 redirects to ensure zero loss of organic search rank.",
          },
        },
      ],
    },
    techStack: {
      title: {
        sr: "Dizajnerski pristup",
        en: "Design principles",
      },
      description: {
        sr: "Radim umeren, moderan stil baziran na dizajnerskim tokenima koji se prirodno prenosi u čist kod.",
        en: "Restrained, purposeful design systems built on strict tokens that translate 1:1 into clean production code.",
      },
      technologies: ["Design Tokens", "Responsive Layouts", "Next/Font", "CSS Variables", "Tailwind CSS", "Semantic UI"],
    },
    process: {
      title: {
        sr: "Kako teče redizajn",
        en: "Redesign workflow",
      },
      description: {
        sr: "Od analize trenutnog stanja do osveženog sajta koji ponosno delite sa klijentima.",
        en: "From initial friction audit to a refined web presence that commands respect.",
      },
      steps: [
        {
          step: "01",
          title: {
            sr: "Audit trenutnog sajta i ciljeva",
            en: "Current site audit",
          },
          description: {
            sr: "Pregledam postojeći sajt, izdvajam šta funkcioniše, a šta mora da se promeni da bi sajt izgledao savremeno.",
            en: "I review what currently works, what causes friction, and what needs structural reimagining.",
          },
        },
        {
          step: "02",
          title: {
            sr: "Strukturni wireframe i hijerarhija",
            en: "Wireframing & flow mapping",
          },
          description: {
            sr: "Definišemo novi raspored sekcija, redosled poruka i jasan tok od naslova do kontakt forme.",
            en: "I map the sequence of arguments, section hierarchy, and the seamless path to conversion.",
          },
        },
        {
          step: "03",
          title: {
            sr: "Vizuelni dizajn i tipografija",
            en: "Visual system & styling",
          },
          description: {
            sr: "Kreiram konačan izgled stranica sa paletom boja, tipografijom i pripremljenim fotografijama.",
            en: "I craft the final visual presentation with bespoke typography, cohesive colors, and image art direction.",
          },
        },
        {
          step: "04",
          title: {
            sr: "Implementacija bez prekida rada",
            en: "Zero-downtime implementation",
          },
          description: {
            sr: "Novi dizajn prenosim u produkcioni kod uz očuvanje rada vašeg trenutnog sajta sve do dana lansiranja.",
            en: "I develop the new design in a parallel environment, deploying seamlessly with zero interruption to your live business.",
          },
        },
      ],
    },
    faq: [
      {
        question: {
          sr: "Hoće li redizajn ugroziti naše trenutne pozicije na Google-u?",
          en: "Will a website redesign hurt our existing Google rankings?",
        },
        answer: {
          sr: [
            "Ne, pod uslovom da se redizajn radi stručno. Pažljivo mapiram sve stare URL-ove sa 308 trajnim preusmeravanjima, čuvam ključne tekstualne celine i poboljšavam tehničku semantiku i brzinu, što pretraživači gotovo uvek nagrade skokom pozicija.",
          ],
          en: [
            "No, provided it is handled with architectural discipline. I map all legacy URLs with permanent 308 redirects, preserve topical content integrity, and elevate Core Web Vitals speed—which typically leads to improved rankings.",
          ],
        },
      },
      {
        question: {
          sr: "Da li zadržavamo postojeće tekstove i fotografije?",
          en: "Do we keep our existing copy and images?",
        },
        answer: {
          sr: [
            "Zadržavam sve što je kvalitetno i relevantno, ali predlažem skraćivanje i reorganizaciju delova koji su nejasni ili preobimni za čitanje na mobilnom telefonu.",
          ],
          en: [
            "I preserve everything that performs well, while restructuring or refining copy and imagery that causes mobile reading fatigue.",
          ],
        },
      },
    ],
  },

  optimization: {
    key: "optimization",
    id: "seo-performance",
    slugs: {
      sr: "seo-i-optimizacija-brzine",
      en: "seo-and-speed-optimization",
    },
    metadata: {
      title: {
        sr: "SEO i optimizacija brzine sajta — audit i AI integracije",
        en: "SEO, Speed Optimization & AI — Core Web Vitals Excellence",
      },
      description: {
        sr: "Tehnički SEO audit, Core Web Vitals optimizacija brzine sajta, Schema.org strukturirani podaci i implementacija obučenih AI chatbota za poslovanje u 2026.",
        en: "Technical SEO audits, Core Web Vitals performance acceleration, Schema.org entity architecture, and custom AI chatbot assistants for modern web presence.",
      },
    },
    eyebrow: {
      sr: "Usluga: SEO, brzina i AI integracije",
      en: "Service: SEO, Speed & AI Integrations",
    },
    heroTitle: {
      sr: "Tehnički SEO, Core Web Vitals brzina i praktični AI asistenti",
      en: "Technical SEO, Core Web Vitals speed, and practical AI assistants",
    },
    heroDescription: {
      sr: "Unapređujem tehničku osnovu za posetioce i pretraživače: semantički HTML, merljive Core Web Vitals performanse, jasne odgovore, strukturirane podatke usklađene sa vidljivim sadržajem i praktične AI asistente.",
      en: "I improve technical foundations for visitors and search engines: semantic HTML, measured Core Web Vitals improvements, clear answers, structured data that matches visible content, and practical AI assistants.",
    },
    startingPrice: {
      sr: formatAdditionalStartingPrice("performance","sr"),
      en: formatAdditionalStartingPrice("performance","en"),
    },
    pricingAnchor: "additional-services",
    relatedCaseStudySlug: "ilic-enterijer",
    audience: {
      title: {
        sr: "Kome je potrebna tehnička optimizacija i AI",
        en: "Who needs technical optimization and AI",
      },
      description: {
        sr: "Za sajtove koji se sporo učitavaju, imaju problem sa indeksiranjem ili žele da odgovore na zahteve novih AI pretraživača.",
        en: "For web platforms experiencing sluggish load times, indexing friction, or looking to lead in AI-powered search results.",
      },
      items: {
        sr: [
          "Sajtovi koji gube posetioce jer se stranica učitava duže od 2–3 sekunde na mobilnoj mreži",
          "Biznisi sa problemima u Google Search Console (neindeksirane stranice, 404 greške, loš Core Web Vitals)",
          "Firme koje žele da AI pretraživači (Google AI Overviews, Perplexity, SearchGPT) tačno prepoznaju njihove usluge",
          "Kompanije kojima treba obučeni AI chatbot da odgovara posetiocima na česta pitanja 24/7",
        ],
        en: [
          "Websites bleeding potential clients because mobile pages take more than 2–3 seconds to render",
          "Businesses facing Google Search Console coverage warnings, 404 dead links, or poor CWV scores",
          "Brands aiming to be accurately cited by generative search engines (Perplexity, SearchGPT, AI Overviews)",
          "Companies wanting an intelligent 24/7 AI conversational assistant trained on their own FAQs",
        ],
      },
    },
    scope: {
      title: {
        sr: "Šta obuhvata tehnički SEO i optimizacija",
        en: "Technical SEO & optimization deliverables",
      },
      description: {
        sr: "Konkretne inženjerske intervencije koje daju merljive rezultate u brzini i pozicijama.",
        en: "Measurable engineering optimizations that tangibly accelerate load times and ranking durability.",
      },
      items: [
        {
          title: {
            sr: "Kompletan tehnički SEO audit",
            en: "Comprehensive technical SEO audit",
          },
          description: {
            sr: "Pregled indeksabilnosti, kanoničkih oznaka, robots.txt pravila, XML sitemapa i status kodova (rešavanje 404/redirect lanaca).",
            en: "Deep inspection of crawlability, canonical integrity, robots directives, sitemaps, and redirect chain cleanup.",
          },
        },
        {
          title: {
            sr: "Optimizacija Core Web Vitals (LCP, CLS, INP)",
            en: "Core Web Vitals optimization (LCP, CLS, INP)",
          },
          description: {
            sr: "Optimizacija Largest Contentful Paint, eliminacija pomeranja elemenata pri učitavanju i poboljšanje odziva na klik.",
            en: "Eliminating layout shifts (CLS), accelerating primary content render (LCP), and polishing responsiveness (INP).",
          },
        },
        {
          title: {
            sr: "Kompresija koda i slika sledeće generacije",
            en: "Asset compression & next-gen imagery",
          },
          description: {
            sr: "Konverzija u WebP/AVIF format sa responzivnim atributima, uklanjanje nekorišćenog CSS/JS koda i keširanje.",
            en: "Automated WebP conversion, responsive srcset rules, unused CSS/JS tree-shaking, and HTTP cache headers.",
          },
        },
        {
          title: {
            sr: "Schema.org strukturirani podaci",
            en: "Schema.org structured data",
          },
          description: {
            sr: "JSON-LD podaci o organizaciji, uslugama i navigaciji, prema stvarnom sadržaju stranice. Jasni podaci pomažu razumevanju sajta; ne garantuju izdvojene rezultate ili AI citate.",
            en: "JSON-LD describing the organization, services and navigation where supported by the page content. Clear data helps explain the website; it does not guarantee rich results or AI citations.",
          },
        },
        {
          title: {
            sr: "Implementacija obučenog AI chatbota",
            en: "Custom-trained AI chatbot integration",
          },
          description: {
            sr: "Postavljanje pametnog asistenta obučenog na vašim uslugama i cenovniku, bez generičkih beskorisnih odgovora.",
            en: "Deployment of an intelligent conversational assistant strictly grounded in your verified service facts and pricing.",
          },
        },
      ],
    },
    techStack: {
      title: {
        sr: "Alati i standardi",
        en: "Standards & diagnostic tools",
      },
      description: {
        sr: "Koristim zvanične industrijske alate za dijagnostiku i verifikaciju rezultata.",
        en: "I benchmark exclusively against official performance and search diagnostic tools.",
      },
      technologies: ["Google PageSpeed Insights", "Lighthouse", "Core Web Vitals", "Schema.org JSON-LD", "Cloudflare Turnstile", "AI RAG Integrations"],
    },
    process: {
      title: {
        sr: "Kako sprovodim optimizaciju",
        en: "Optimization workflow",
      },
      description: {
        sr: "Dijagnostika pre i posle intervencija sa jasnim izveštajem o postignutim merenjima.",
        en: "Transparent before-and-after benchmarks with verified Lighthouse and search performance evidence.",
      },
      steps: [
        {
          step: "01",
          title: {
            sr: "Dijagnostičko merenje",
            en: "Baseline diagnostic audit",
          },
          description: {
            sr: "Snimam početno stanje brzine na mobilnom i desktopu, identifikujem uska grla i greške u indeksiranju.",
            en: "I measure current mobile and desktop performance, identify blocking scripts, and log crawl warnings.",
          },
        },
        {
          step: "02",
          title: {
            sr: "Tehničko čišćenje i ubrzavanje",
            en: "Code refinement & asset speedup",
          },
          description: {
            sr: "Uklanjam suvišan kod, optimizujem medije, podešavam keširanje i rešavam probleme sa indeksiranjem.",
            en: "I refactor heavy assets, implement modern image sizing, configure server headers, and clean up redirects.",
          },
        },
        {
          step: "03",
          title: {
            sr: "Strukturiranje podataka i AI",
            en: "Structured data & AI grounding",
          },
          description: {
            sr: "Dodajem strukturirane podatke koji odgovaraju vidljivom sadržaju. Ako je dogovorena integracija AI asistenta, povezujem ga sa proverenim informacijama o poslovanju.",
            en: "I add structured data that matches visible content. If an AI assistant is included in the agreed scope, I connect it to verified business information.",
          },
        },
        {
          step: "04",
          title: {
            sr: "Verifikacija rezultata",
            en: "Evidence & verification",
          },
          description: {
            sr: "Ponovo merim performanse na PageSpeed Insights i prijavljujem ažurirani sitemap i URL-ove u Google Search Console.",
            en: "I run final PageSpeed and Lighthouse audits, verify schema validity, and resubmit fresh sitemaps to Google.",
          },
        },
      ],
    },
    faq: [
      {
        question: {
          sr: "Šta su Core Web Vitals i zašto su važni?",
          en: "What are Core Web Vitals and why do they matter?",
        },
        answer: {
          sr: [
            "Core Web Vitals su tri ključne metrike kojima Google meri stvarno korisničko iskustvo: brzinu učitavanja glavnog sadržaja (LCP), stabilnost elemenata na ekranu (CLS) i odziv na interakciju (INP).",
            "Sajtovi koji prolaze ove testove imaju niži bounce rate, veći procenat konverzije i direktnu prednost u Google rangiranju u odnosu na sporu konkurenciju.",
          ],
          en: [
            "Core Web Vitals are Google's standardized metrics measuring real user experience: largest element load speed (LCP), visual layout stability (CLS), and interaction responsiveness (INP).",
            "Passing websites experience lower bounce rates, higher conversion velocity, and a measurable ranking advantage over slower competitors.",
          ],
        },
      },
      {
        question: {
          sr: "Šta je razlika između SEO, AEO i GEO?",
          en: "What is the difference between SEO, AEO, and GEO?",
        },
        answer: {
          sr: [
            "SEO unapređuje dostupnost, relevantnost i kvalitet sajta za pretragu. AEO stavlja naglasak na jasne, direktne odgovore na pitanja. GEO se bavi time koliko je sadržaj koristan i pouzdan kao izvor u generativnim odgovorima. Ovi pristupi se preklapaju: tačni podaci, dostupne stranice, korisni odgovori i stvarne reference važni su za sve njih. Ne postoji poseban Schema.org kod koji garantuje AI citat, preporuku ili poziciju.",
          ],
          en: [
            "SEO improves a website's accessibility to search engines, relevance and quality. AEO emphasizes clear, direct answers to questions. GEO considers how useful and trustworthy content is as a source in generative answers. These approaches overlap: accurate information, accessible pages, helpful answers and real references matter to all of them. No special Schema.org markup guarantees an AI citation, recommendation or ranking.",
          ],
        },
      },
    ],
  },

  maintenance: {
    key: "maintenance",
    id: "maintenance-support",
    slugs: {
      sr: "odrzavanje-i-hosting",
      en: "website-maintenance",
    },
    metadata: {
      title: {
        sr: "Održavanje Sajtova i Hosting — Tehnička Podrška i Sigurnost",
        en: "Website Maintenance and Hosting Services — Reliable Support",
      },
      description: {
        sr: "Managed hosting i tehničko održavanje: ažuriranja, provere bezbednosti i rezervnih kopija u podržanom okruženju. Izmene sadržaja prema odabranom planu.",
        en: "Managed hosting and website maintenance: updates, security and backup checks where supported. Content changes and priority support depend on the selected plan.",
      },
    },
    eyebrow: {
      sr: "Usluga: Hosting i tehničko održavanje",
      en: "Service: Hosting and Maintenance",
    },
    heroTitle: {
      sr: "Pouzdan hosting i redovno tehničko održavanje za vaš miran san",
      en: "Dependable hosting and ongoing technical care for complete peace of mind",
    },
    heroDescription: {
      sr: "Hosting i održavanje ugovaraju se zasebno. Basic Care obuhvata redovna ažuriranja, osnovne bezbednosne provere i proveru rezervnih kopija gde je podržana. Business Care dodaje manje izmene sadržaja, periodične provere performansi i prioritetnu obradu zahteva u dogovorenom obimu.",
      en: "Hosting and maintenance are agreed separately. Basic Care covers routine updates, basic security checks, and backup verification where supported. Business Care adds minor content changes, periodic performance checks, and priority request handling within the agreed scope.",
    },
    startingPrice: {
      sr: `Od ${maintenanceStartingPrice} € / mes.`,
      en: formatCarePlanStartingPrice("basic-care","en"),
    },
    pricingAnchor: "maintenance",
    relatedCaseStudySlug: "coolfridgeguys",
    audience: {
      title: {
        sr: "Zašto je redovno održavanje neophodno",
        en: "Why active maintenance is vital",
      },
      description: {
        sr: "Sajt je živa poslovna infrastruktura. Bez redovnog nadzora, zastareli plugini i neproverene izmene postaju lak plen za hakere i padove.",
        en: "Your website is living business infrastructure. Without active oversight, outdated software and unverified updates expose your business to downtime and security compromises.",
      },
      items: {
        sr: [
          "Vlasnici firmi koji nemaju vremena da se bave tehničkim ažuriranjima i žele da se posvete svom poslu",
          "Kompanije kojima sajt donosi svakodnevne upite i ne smeju da priušte sate ili dane prekida rada",
          "Klijenti koji žele pouzdanog partnera za brze izmene tekstova, cenovnika i novih fotografija",
          "Biznisi kojima je potrebna provera raspoloživih rezervnih kopija i dogovoren postupak oporavka sajta",
        ],
        en: [
          "Business owners who lack the time or desire to navigate technical updates and server configs",
          "Operations that depend on daily inquiries and cannot afford costly downtime",
          "Clients who need agreed support for copy, pricing, and image updates through Business Care",
          "Businesses needing available backups checked and a recovery process agreed for their setup",
        ],
      },
    },
    scope: {
      title: {
        sr: "Šta je uključeno u pakete održavanja",
        en: "Maintenance plan deliverables",
      },
      description: {
        sr: "Basic Care obuhvata osnovne tehničke provere. Business Care dodaje manje izmene sadržaja, provere performansi i prioritetnu obradu zahteva. Aktivnosti zavise od odabranog plana i podržanog okruženja.",
        en: "Basic Care covers core technical checks. Business Care adds minor content changes, performance checks, and priority request handling. Activities depend on the selected plan and supported setup.",
      },
      items: [
        {
          title: {
            sr: "Proaktivna ažuriranja softvera i platforme",
            en: "Proactive platform & plugin updates",
          },
          description: {
            sr: "Redovna ažuriranja CMS-a i dodataka gde je primenjivo, uz kontrolu rada sajta u dogovorenom obimu. Održavanje namenskih aplikacija ugovara se kroz Custom Support.",
            en: "Routine CMS and plugin updates where applicable, with website checks within the agreed scope. Custom application maintenance is agreed through Custom Support.",
          },
        },
        {
          title: {
            sr: "Provera rezervnih kopija",
            en: "Backup verification",
          },
          description: {
            sr: "Proveravam raspoložive rezervne kopije gde postojeća postavka to podržava. Učestalost, mesto čuvanja i postupak oporavka definišu se prema okruženju i dogovorenom obimu.",
            en: "I verify available backups where the setup supports it. Backup frequency, storage location, and recovery procedures depend on the environment and agreed scope.",
          },
        },
        {
          title: {
            sr: "Provera zdravlja i dostupnosti sajta",
            en: "Website health and availability checks",
          },
          description: {
            sr: "Redovno proveravam zdravlje i dostupnost sajta. Automatska upozorenja zavise od podešenog nadzora; rok i način intervencije ugovaraju se zasebno. Planovi ne uključuju 24/7 dežurstvo.",
            en: "I regularly check website health and availability. Automated alerts depend on the monitoring setup; response times and intervention scope are agreed separately. Plans do not include staffed 24/7 support.",
          },
        },
        {
          title: {
            sr: "Osnovne bezbednosne i SSL provere",
            en: "Basic security and SSL checks",
          },
          description: {
            sr: "Osnovne bezbednosne provere i provera SSL sertifikata u dogovorenom obimu, uz alate koje podržava izabrano okruženje.",
            en: "Basic security and SSL certificate checks within the agreed scope, using tools supported by the selected environment.",
          },
        },
        {
          title: {
            sr: "Ažuriranje sadržaja i prioritetna podrška",
            en: "Content updates & priority support",
          },
          description: {
            sr: "Business Care uključuje manje izmene tekstova i fotografija, provere performansi i prioritetnu obradu u odnosu na Basic Care. Veće izmene ugovaraju se posebno.",
            en: "Business Care includes minor text and image changes, performance checks, and priority handling relative to Basic Care. Larger changes are agreed separately.",
          },
        },
      ],
    },
    techStack: {
      title: {
        sr: "Infrastruktura i nadzor",
        en: "Infrastructure & tooling",
      },
      description: {
        sr: "Hosting i alati biraju se prema tehnologiji i resursima sajta. Nadzor i provera rezervnih kopija zavise od podržanog okruženja i ugovorenog plana.",
        en: "Hosting and tools are selected for the website's technology and resource needs. Monitoring and backup verification depend on the supported environment and agreed plan.",
      },
      technologies: ["Managed Hosting", "Backup Verification", "Website Health Checks", "SSL / HTTPS"],
    },
    process: {
      title: {
        sr: "Kako sarađujemo na održavanju",
        en: "How maintenance works",
      },
      description: {
        sr: "Mesečna saradnja sa definisanim aktivnostima, obimom podrške i načinom prijave zahteva.",
        en: "Monthly collaboration with defined activities, support scope, and a clear way to submit requests.",
      },
      steps: [
        {
          step: "01",
          title: {
            sr: "Početni audit i preuzimanje",
            en: "Onboarding health check",
          },
          description: {
            sr: "Pregledam sajt, verzije softvera i raspoložive rezervne kopije. Dogovaramo odabrani plan, podržano okruženje i način praćenja dostupnosti.",
            en: "I inspect the website, software versions, and available backups. I agree on the plan, supported environment, and availability checks.",
          },
        },
        {
          step: "02",
          title: {
            sr: "Redovno mesečno održavanje",
            en: "Monthly upkeep routines",
          },
          description: {
            sr: "Vršim ažuriranja gde je primenjivo, osnovne bezbednosne provere i proveru rezervnih kopija gde je podržana. Business Care uključuje i mesečni pregled tehničkog stanja.",
            en: "I perform updates where applicable, basic security checks, and backup verification where supported. Business Care also includes a monthly technical overview.",
          },
        },
        {
          step: "03",
          title: {
            sr: "Zahtevi za izmene sadržaja",
            en: "Content update requests",
          },
          description: {
            sr: "Manje izmene tekstova i fotografija u Business Care planu šaljete emailom ili porukom. Izmene izvan ugovorenog obima dogovaraju se zasebno.",
            en: "Submit minor text and image changes under Business Care by email or message. Changes outside the agreed scope are quoted separately.",
          },
        },
        {
          step: "04",
          title: {
            sr: "Obrada tehničkih zahteva",
            en: "Handling technical requests",
          },
          description: {
            sr: "Manje tehničke smetnje rešavam u okviru ugovorenog plana. Business Care ima prioritet u odnosu na Basic Care; odziv i veće intervencije definišu se dogovorom.",
            en: "Minor technical issues are handled within the agreed plan. Business Care has priority over Basic Care; response times and larger interventions are agreed separately.",
          },
        },
      ],
    },
    faq: [
      {
        question: {
          sr: "Koja je razlika između hostinga i tehničkog održavanja?",
          en: "What is the difference between hosting and maintenance?",
        },
        answer: {
          sr: [
            "Hosting je zakup prostora i resursa na serveru kako bi sajt bio dostupan na internetu. Basic Care održavanje obuhvata ažuriranja gde je primenjivo, osnovne bezbednosne provere i proveru rezervnih kopija gde je podržana. Business Care dodaje manje izmene sadržaja, provere performansi i prioritetnu obradu zahteva.",
            "Možete imati hosting bez održavanja, ali tada sami snosite odgovornost za bezbednost i kvarove na sajtu.",
          ],
          en: [
            "Hosting provides server resources to keep your website online. Basic Care covers updates where applicable, basic security checks, and backup verification where supported. Business Care adds minor content changes, performance checks, and priority request handling.",
            "You can purchase hosting without maintenance, but you remain personally responsible for updates, security, and repairs.",
          ],
        },
      },
      {
        question: {
          sr: "Da li sam vezan ugovorom na 12 meseci?",
          en: "Are there long-term contract lock-ins?",
        },
        answer: {
          sr: [
            "Ne. Paketi održavanja se fakturišu na mesečnom nivou i možete ih otkazati u bilo kom trenutku bez penala.",
          ],
          en: [
            "No. Maintenance plans are billed month-to-month and can be paused or cancelled at any time without penalties.",
          ],
        },
      },
    ],
  },
};

export const serviceKeys = Object.keys(serviceDefinitions) as readonly ServiceKey[];

export function getServiceByKey(key: ServiceKey): ServiceDetailDefinition {
  return serviceDefinitions[key];
}

export function getServiceBySlug(slug: string, locale: "sr" | "en"): ServiceDetailDefinition | undefined {
  return Object.values(serviceDefinitions).find((def) => def.slugs[locale] === slug);
}
