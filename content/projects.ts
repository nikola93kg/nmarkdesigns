import type { Localized } from "@/lib/i18n";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: Localized<string>;
}

export interface CaseStudyHighlight {
  title: Localized<string>;
  description: Localized<string>;
}

export type ProjectStatus = "active" | "inactive" | "archived";

export interface ProjectCaseStudy {
  overview: Localized<string>;
  challenge?: Localized<readonly string[]>;
  approach?: Localized<readonly string[]>;
  solution?: Localized<readonly string[]>;
  aiSalesAssistant?: {
    title: Localized<string>;
    overview: Localized<string>;
    capabilities: Localized<readonly string[]>;
  };
  technicalHighlights?: readonly CaseStudyHighlight[];
  results?: Localized<readonly string[]>;
  images?: readonly ProjectImage[];
  relatedSlugs?: readonly string[];
}

export interface Project {
  slug: string;
  title: string;
  category?: Localized<string>;
  shortDescription?: Localized<string>;
  featuredImage?: ProjectImage;
  sourceUrl: `https://${string}`;
  client?: string;
  location?: string;
  websiteUrl?: `https://${string}`;
  status?: ProjectStatus;
  role?: Localized<string>;
  services?: Localized<readonly string[]>;
  technologies?: readonly string[];
  caseStudy?: ProjectCaseStudy;
  featured?: boolean;
}

// Names, slugs, and screenshots are from the production homepage. See migration notes.
export const projects: readonly Project[] = [
  {
    slug: "buy-pallet-jacks",
    title: "Buy Pallet Jacks",
    client: "Buy Pallet Jacks",
    location: "United States",
    status: "active",
    role: {
      sr: "Frontend arhitektura i migracija sa Squarespace platforme na Next.js",
      en: "Frontend architecture and migration from Squarespace to Next.js",
    },
    category: {
      sr: "B2B sajt",
      en: "B2B Website",
    },
    websiteUrl: "https://buypalletjacks.com",
    services: {
      sr: [
        "Migracija sa Squarespace platforme",
        "Frontend razvoj (Next.js & React)",
        "B2B arhitektura lokacija i skladišta",
        "Optimizacija korisničkog iskustva",
        "Optimizacija performansi",
      ],
      en: [
        "Squarespace Platform Migration",
        "Frontend Development (Next.js & React)",
        "B2B Warehouse Location Architecture",
        "User Experience Optimization",
        "Performance Optimization",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    caseStudy: {
      overview: {
        sr: "Kompletna migracija B2B platforme za Buy Pallet Jacks sa krutog Squarespace šablona na moderan Next.js App Router, sa strukturiranom mrežom od preko 31 skladišne i distributivne lokacije i jasnim uputstvima za preuzimanje industrijske opreme širom SAD.",
        en: "Full migration of the Buy Pallet Jacks B2B platform from a rigid Squarespace template to modern Next.js App Router, organizing a network of more than 31 warehouse and storage locations with location-specific equipment pickup guidelines across the US.",
      },
      challenge: {
        sr: [
          "Prethodni sajt bio je izgrađen na Squarespace CMS-u, gde su restriktivni šabloni i ugrađene skripte otežavali prilagođavanje navigacije i usporavali učitavanje stranica.",
          "Kompanija posluje sa mrežom od preko 31 lokacije za skladištenje i preuzimanje paletnih viljuškara širom Sjedinjenih Američkih Država. Na postojećem sajtu posetiocima je bilo komplikovano da pronađu najbliži distributivni centar, radno vreme i tačna uputstva za kamionski utovar.",
          "B2B kupcima industrijske opreme bila je potrebna pregledna, brza platforma sa jasnim tehničkim karakteristikama viljuškara i jednostavnim putem za slanje upita za ponudu bez suvišnih koraka.",
        ],
        en: [
          "The client's original storefront operated on Squarespace, where rigid template boundaries and heavy bundled scripts restricted custom navigation and degraded page loading speeds.",
          "The company operates an extensive distribution network of more than 31 warehouse and equipment pickup locations across the United States. On the legacy platform, commercial buyers struggled to locate nearby storage facilities, operational hours, and specific freight loading guidelines.",
          "B2B industrial equipment purchasers needed a high-performance platform providing transparent equipment specifications and a frictionless pathway to request commercial quotes.",
        ],
      },
      approach: {
        sr: [
          "Izvršena je potpuna rekonstrukcija frontenda u radnom okviru Next.js uz TypeScript i Tailwind CSS na Vercel platformi, oslobađajući sajt od ograničenja Squarespace šablona.",
          "Projektovan je namenski direktorijum lokacija koji organizovano prikazuje preko 31 regionalnog centra sa adresama, radnim vremenom i specifičnim procedurama preuzimanja.",
          "Implementirana je responzivna navigacija prilagođena menadžerima nabavke i logistike koji sajtu pristupaju sa stonih računara u kancelariji ili mobilnih uređaja u skladištima.",
          "Jasno su istaknute kategorije paletnih viljuškara sa detaljnim nosivostima i dimenzijama, uz optimizovan kontakt tok za direktne komercijalne narudžbine.",
        ],
        en: [
          "Architected a complete frontend reconstruction using Next.js with TypeScript and Tailwind CSS deployed on Vercel, eliminating legacy Squarespace constraints.",
          "Designed a structured regional directory presenting more than 31 warehouse locations with clear physical addresses, operating hours, and localized equipment pickup instructions.",
          "Engineered responsive B2B navigation tailored for procurement and logistics managers accessing the site from desktop workstations or mobile warehouse environments.",
          "Structured equipment categories highlighting load capacities and dimensional specifications, paired with direct inquiry pathways for commercial procurement.",
        ],
      },
      solution: {
        sr: [
          "Isporučena moderna, brza Next.js web platforma na zvaničnom domenu buypalletjacks.com sa trenutnim odzivom stranica.",
          "Uspostavljen pregledan sistem pretrage skladišnih lokacija koji kupcima omogućava brz odabir najbližeg punkta za preuzimanje viljuškara.",
          "Integrisana jasna uputstva za svaku lokaciju u skladu sa zahtevima klijenta, smanjujući nesporazume prilikom preuzimanja robe.",
          "Postavljeni optimizovani kontakt obrasci za brzo slanje upita za pojedinačne ili veće flotne narudžbine.",
        ],
        en: [
          "Delivered a modern, ultra-responsive Next.js web application on buypalletjacks.com with instantaneous page transitions.",
          "Established an intuitive directory structure enabling commercial buyers to quickly identify the closest equipment pickup facility.",
          "Integrated facility-specific instructions in accordance with client specifications, clarifying warehouse pickup protocols.",
          "Deployed streamlined commercial inquiry forms accommodating individual unit purchases and larger fleet orders.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "Migracija sa Squarespace-a na Next.js",
            en: "Squarespace to Next.js Migration",
          },
          description: {
            sr: "Zamena krutog CMS šablona modernim Next.js kodom za potpunu kontrolu nad arhitekturom, brzinom i korisničkim interfejsom.",
            en: "Replaced a rigid CMS template with modern Next.js code for total control over web architecture, speed, and user interface.",
          },
        },
        {
          title: {
            sr: "Mreža od preko 31 skladišne lokacije",
            en: "31+ Warehouse Location Directory",
          },
          description: {
            sr: "Strukturirani direktorijum regionalnih skladišta koji B2B kupcima omogućava brz uvid u najbliže punktove za preuzimanje.",
            en: "Structured regional warehouse directory providing B2B buyers with fast visibility into equipment depots nationwide.",
          },
        },
        {
          title: {
            sr: "Namenska uputstva za preuzimanje opreme",
            en: "Location-Specific Pickup Protocols",
          },
          description: {
            sr: "Specifične smernice za svako pojedinačno skladište sa procedurama pristupa kamiona i radnim vremenom utovara.",
            en: "Tailored guidelines for each facility detailing freight loading protocols, dock access, and operating schedules.",
          },
        },
        {
          title: {
            sr: "Responzivna navigacija za B2B kupce",
            en: "Responsive B2B Equipment Navigation",
          },
          description: {
            sr: "Prilagođen interfejs optimizovan za brzo pronalaženje tehničkih specifikacija opreme na desktopu i mobilnim telefonima.",
            en: "Tailored interface optimized for rapid lookup of industrial specifications across desktop and mobile devices.",
          },
        },
      ],
      results: {
        sr: [
          "Uspešno redizajnirana i puštena u rad Next.js platforma na domenu buypalletjacks.com.",
          "Potpuno zamenjen restriktivni Squarespace šablon brzim, prilagođenim statičkim kodom.",
          "Organizovana i objavljena mreža sa više od 31 skladišne lokacije širom Sjedinjenih Američkih Država.",
          "Pojednostavljen proces slanja komercijalnih upita i narudžbina za industrijske kupce.",
        ],
        en: [
          "Successfully redesigned and deployed the Next.js platform on buypalletjacks.com.",
          "Completely replaced the restrictive Squarespace template with high-performance custom code.",
          "Organized and launched the distribution network across more than 31 storage locations throughout the US.",
          "Streamlined commercial inquiry and procurement workflows for industrial equipment buyers.",
        ],
      },
      relatedSlugs: ["coolfridgeguys", "ilic-enterijer"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/buy-pallet-jacks/",
    featuredImage: {
      src: "/projects/buy-pallet-jacks.webp", width: 1536, height: 1024,
      alt: { sr: "Početna stranica Buy Pallet Jacks sa ponudom paletnih viljuškara.", en: "Buy Pallet Jacks homepage featuring pallet jacks." },
    },
  },
  {
    slug: "ilic-enterijer",
    title: "Ilić Enterijer",
    client: "Ilić Enterijer",
    location: "Lazarevac / Beograd, Srbija",
    status: "active",
    role: {
      sr: "Kompletan digitalni projekat: dizajn logotipa, brend identitet, Next.js frontend, lokalni SEO i integracija forme upita",
      en: "End-to-end digital project: logo design, brand identity, Next.js frontend, local SEO, and inquiry form integration",
    },
    category: {
      sr: "Poslovni sajt",
      en: "Business Website",
    },
    websiteUrl: "https://ilicenterijer.rs/",
    services: {
      sr: [
        "Web dizajn i vizuelni identitet",
        "Dizajn originalnog logotipa",
        "Frontend razvoj (Next.js & React)",
        "Lokalna SEO optimizacija",
        "Podešavanje Google Business profila",
        "Integracija forme za upite",
      ],
      en: [
        "Web Design & Visual Identity",
        "Original Logo Design",
        "Frontend Development (Next.js & React)",
        "Local SEO Optimization",
        "Google Business Profile Setup",
        "Inquiry Form Integration",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel", "Resend"],
    caseStudy: {
      overview: {
        sr: "Sveobuhvatna digitalna prezentacija i brending za Ilić Enterijer — porodičnu radionicu za izradu nameštaja i kuhinja po meri. Projekat je obuhvatio kreiranje originalnog logotipa, razvoj modernog Next.js sajta, lokalnu SEO optimizaciju i uspostavljanje Google Business profila za tržište Lazarevca i Beograda.",
        en: "A comprehensive digital presence and branding project for Ilić Enterijer — a custom cabinetry and furniture workshop. The project encompassed original logo design, custom Next.js development, local SEO optimization, and Google Business Profile setup for the Lazarevac and Belgrade markets.",
      },
      challenge: {
        sr: [
          "Ilić Enterijer je godinama gradio reputaciju na kvalitetu izrade enterijera po meri, ali je poslovao isključivo na osnovu preporuka, bez prepoznatljivog vizuelnog identiteta i digitalnog prisustva.",
          "Kada klijenti traže izradu kuhinje ili plakara po meri, fotografije radova na društvenim mrežama nisu bile dovoljne da prenesu nivo preciznosti, detalje okova i kvalitet materijala. Bilo je neophodno kreirati profesionalnu prezentaciju koja uliva poverenje vlasnicima stanova i arhitektama.",
          "Takođe, radionica je želela jednostavan i pouzdan način za prijem upita sa dimenzijama i zahtevima kupaca, uz prisustvo na lokalnim pretragama u Lazarevcu i široj beogradskoj regiji.",
        ],
        en: [
          "Ilić Enterijer built an outstanding reputation for custom furniture manufacturing over years, but operated entirely through word-of-mouth without an official visual identity or digital presence.",
          "When prospective clients evaluate bespoke cabinetry and custom kitchens, fragmented social media photos failed to convey the craftsmanship, hardware precision, and material quality. A dedicated, professional presentation was needed to build confidence among homeowners and interior designers.",
          "Furthermore, the workshop needed a reliable, straightforward channel for receiving project inquiries with specifications, alongside organic visibility for local searches in Lazarevac and greater Belgrade.",
        ],
      },
      approach: {
        sr: [
          "Kreiran je originalan dizajn logotipa koji simbolizuje preciznost i stolarski zanat kroz elegantnu, modernu tipografiju i stilizovani monogram.",
          "Za frontend je odabran Next.js sa React radnim okvirom i Tailwind CSS stilizacijom na Vercel infrastrukturi. Ovaj pristup omogućava brzo učitavanje fotografija visoke rezolucije bez glomaznih CMS skripti.",
          "Posebna pažnja posvećena je vizuelnom prikazu radova: kuhinje, plakari, dnevne sobe i kupatilski nameštaj organizovani su u pregledne kategorije sa opisima korišćenih materijala (medijapan, univer, kompakt ploče, Blum okovi).",
          "Postavljen je i konfigurisan Google Business profil sa tačnim koordinatama radionice, radnim vremenom i kategorijama usluga radi jačanja lokalne vidljivosti.",
        ],
        en: [
          "Crafted an original logo design symbolizing craftsmanship and woodworking precision through clean typography and a stylized geometric monogram.",
          "Selected Next.js with React and Tailwind CSS hosted on Vercel's edge network, ensuring instant loading of high-resolution furniture imagery without the overhead of heavy legacy CMS platforms.",
          "Structured the portfolio around visual storytelling: custom kitchens, wardrobes, living room units, and bathroom furnishings are organized into clear categories with material details (MDF, compact surfaces, Blum hardware).",
          "Configured and verified the Google Business Profile with accurate workshop coordinates, business hours, and service categories to establish local search discoverability.",
        ],
      },
      solution: {
        sr: [
          "Izrađen responzivan, vizuelno čist web sajt optimizovan za pregledanje na telefonima, gde većina kupaca prvi put pregleda enterijerska rešenja.",
          "Implementirana jednostavna kontakt forma integrisana sa Resend servisom, koja bezbedno i trenutno prosleđuje upite klijenata direktno u inboks majstora.",
          "Uspostavljena semantička SEO osnova sa ciljanim lokalnim ključnim rečima ('nameštaj po meri Lazarevac', 'kuhinje po meri Beograd') i strukturiranim podacima lokalnog biznisa.",
        ],
        en: [
          "Delivered a responsive, visually refined website tailored for mobile browsing, where the majority of homeowners initially explore interior ideas.",
          "Integrated an accessible inquiry form powered by the Resend API, reliably delivering client project requests directly to the workshop's inbox without backend bloat.",
          "Implemented semantic local SEO foundations with targeted regional terminology ('custom furniture Lazarevac', 'bespoke kitchens Belgrade') and LocalBusiness structured data.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "Originalan dizajn brenda i logotipa",
            en: "Original Brand & Logo Identity",
          },
          description: {
            sr: "Kreiran kompletan vizuelni identitet od nule — prepoznatljiv znak, tipografska hijerarhija i neutralna paleta boja koja ističe fotografije gotovih enterijera.",
            en: "Created the complete visual identity from scratch — distinctive emblem, typographic hierarchy, and neutral palette designed to highlight finished interior photography.",
          },
        },
        {
          title: {
            sr: "Next.js arhitektura na Vercel platformi",
            en: "Next.js Architecture on Vercel Edge",
          },
          description: {
            sr: "Statičko generisanje stranica i optimizovano serviranje slika garantuju brzo otvaranje galerije radova na mobilnim uređajima.",
            en: "Static page generation and optimized image delivery ensure instant gallery rendering even on mobile networks.",
          },
        },
        {
          title: {
            sr: "Lokalni SEO i Google Business profil",
            en: "Local SEO & Google Business Setup",
          },
          description: {
            sr: "Povezivanje sajta sa Google profilom i lokalnim meta podacima za pretrage nameštaja po meri u Lazarevcu i okolini.",
            en: "Connected the website with a verified Google profile and local schema markup for custom cabinetry searches in Lazarevac and surrounding areas.",
          },
        },
        {
          title: {
            sr: "Pouzdana dostava upita putem forme",
            en: "Reliable Inquiry Form Delivery",
          },
          description: {
            sr: "Forma za upite integrisana sa Resend servisom obezbeđuje trenutnu isporuku poruka klijenata bez zavisnosti od eksternih CMS dodataka.",
            en: "Inquiry form integrated with the Resend API delivers customer inquiries cleanly to the workshop without CMS plugin overhead.",
          },
        },
      ],
      results: {
        sr: [
          "Kreiran prepoznatljiv brend identitet i originalan logo za Ilić Enterijer.",
          "Lansiran brz, moderan Next.js sajt na zvaničnom domenu ilicenterijer.rs.",
          "Uspostavljeno digitalno prisustvo sa Google Business profilom i lokalnom SEO osnovom.",
          "Aktiviran direktan kanal za prijem upita sa specifikacijama projekata.",
        ],
        en: [
          "Delivered a memorable brand identity and original logo for Ilić Enterijer.",
          "Launched a fast, modern Next.js website on the official ilicenterijer.rs domain.",
          "Established verified local digital presence with Google Business Profile and local SEO markup.",
          "Activated a direct, reliable inquiry channel for custom cabinetry requests.",
        ],
      },
      relatedSlugs: ["powder-brows-vienna", "buy-pallet-jacks"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/ilic-enterijer/",
    featuredImage: {
      src: "/projects/ilic-enterijer.webp", width: 1894, height: 868,
      alt: { sr: "Početna stranica Ilić Enterijer sa prikazom nameštaja i kuhinja po meri.", en: "Ilić Enterijer homepage showcasing custom furniture and kitchens." },
    },
  },
  {
    slug: "powder-brows-vienna",
    title: "Powder Brows Vienna",
    client: "Jovana Ristic Makeup",
    location: "Vienna, Austria",
    status: "active",
    role: {
      sr: "Kompletan dizajn i razvoj: originalni logo, vizuelni identitet, višejezični Next.js frontend i Vercel deployment",
      en: "Full design and development: original logo, visual identity, multilingual Next.js frontend, and Vercel deployment",
    },
    category: {
      sr: "Poslovni sajt",
      en: "Business Website",
    },
    websiteUrl: "https://www.powderbrowsvienna.com",
    services: {
      sr: [
        "Web dizajn i estetika kozmetičkog salona",
        "Dizajn originalnog logotipa i monograma",
        "Frontend razvoj (Next.js & React)",
        "Trojezična arhitektura (nemački, engleski, srpski)",
        "Lokalizacija sadržaja za austrijsko tržište",
        "Optimizacija za mobilne uređaje",
      ],
      en: [
        "Web Design & Beauty Studio Aesthetic",
        "Original Logo & Monogram Design",
        "Frontend Development (Next.js & React)",
        "Trilingual Architecture (German, English, Serbian)",
        "Austrian German Content Localization",
        "Mobile-First Optimization",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    caseStudy: {
      overview: {
        sr: "Elegantna web prezentacija i digitalni identitet za kozmetički studio Powder Brows Vienna (Jovana Ristić) u Beču. Projekat je obuhvatio kreiranje originalnog minimalističkog logotipa i razvoj brzog Next.js sajta sa potpunom trojezičnom podrškom na nemačkom, engleskom i srpskom jeziku, prilagođenom klijentima u Austriji.",
        en: "An elegant web presence and brand identity for cosmetic studio Powder Brows Vienna (Jovana Ristic) in Vienna. The project included crafting an original minimalist logo and building a fast Next.js website with native trilingual routing in German, English, and Serbian tailored for Austrian clients.",
      },
      challenge: {
        sr: [
          "Tržište estetskih tretmana lica i trajne šminke u Beču je izuzetno konkurentno. Studio je zahtevao prezentaciju koja odiše suptilnim luksuzom, besprekornom higijenom i profesionalnim poverenjem kako bi se izdvojio u austrijskoj prestonici.",
          "Beč je multikulturalna sredina gde se klijenti obraćaju na različitim jezicima: lokalni austrijski klijenti očekuju besprekoran nemački jezik sa odgovarajućom terminologijom, dok međunarodni posetioci i dijaspora koriste engleski ili srpski. Bilo je ključno omogućiti jednostavno prebacivanje jezika bez automatskih nepouzdanih prevodilaca.",
          "Većina klijentkinja pronalazi studio putem mobilnih telefona i Instagrama, pa je sajt morao da ponudi trenutno učitavanje, besprekornu responzivnost i jasan pregled tretmana i cena bez prepreka.",
        ],
        en: [
          "The aesthetic cosmetics and semi-permanent makeup market in Vienna is highly competitive. The studio required a digital presentation conveying understated luxury, immaculate hygiene, and artistic trust to stand out in the Austrian capital.",
          "Vienna is a diverse international hub where clients communicate across multiple languages: local Austrian clients expect refined German terminology, while expatriates and diaspora clients navigate in English or Serbian. Delivering clean, route-based multilingual navigation without machine translation artifacts was essential.",
          "Because the vast majority of beauty clients browse from smartphones via social media referrals, the site demanded instantaneous load speeds, flawless mobile ergonomics, and transparent service overviews.",
        ],
      },
      approach: {
        sr: [
          "Dizajniran je originalan monogram i tipografski znak u minimalističkom stilu, uz paletu toplih neutralnih i puderastih tonova usklađenih sa beauty estetikom.",
          "Aplikacija je izgrađena u radnom okviru Next.js sa TypeScript-om i Tailwind CSS stilizacijom, hostovana na Vercel globalnoj edge mreži radi minimalnog vremena odziva za posetioce iz Austrije i Centralne Evrope.",
          "Projektovana je striktna lokalizovana arhitektura ruta gde svaka stranica ima svoj puni ekvivalent na nemačkom (`/de/`), engleskom (`/en/`) i srpskom (`/sr/`), sa očuvanjem lokacije pri promeni jezika.",
          "Struktura tretmana je pažljivo organizovana: detaljni opisi postupka puder obrva, pripreme kože, faze zarastanja, korekcija i post-tretmanske nege, uz jasne i transparentne informacije o cenama i direktan kontakt za konsultacije.",
        ],
        en: [
          "Designed an original monogram and typography emblem in a minimalist luxury aesthetic, complemented by warm neutral tones matching aesthetic facial treatments.",
          "Built the application in Next.js with TypeScript and Tailwind CSS, deployed to Vercel's global edge network for minimal latency across Austria and Central Europe.",
          "Architected strict localized route handling where every page provides a fully translated equivalent in German, English, and Serbian, preserving page context upon switching.",
          "Structured treatment pages with educational clarity: detailed breakdowns of the powder brows procedure, skin preparation, healing timeline, touch-up sessions, and aftercare guidelines, alongside transparent pricing and consultation contact options.",
        ],
      },
      solution: {
        sr: [
          "Lansirana brza i responzivna Next.js web prezentacija prilagođena mobilnim korisnicima sa galerijom tretmana i jasnim prikazom rezultata.",
          "Obezbeđeno prirodno jezičko iskustvo na austrijskom nemačkom, engleskom i srpskom jeziku, uz pravilne jezičke oznake (hreflang) za pretraživače.",
          "Kreiran jasan tok za zakazivanje konsultacija sa direktnim kontakt opcijama (telefon, WhatsApp, email) bez nepotrebnih posrednika.",
        ],
        en: [
          "Delivered an ultra-responsive Next.js storefront optimized for mobile beauty shoppers with clear treatment presentation.",
          "Provided a natural, culturally accurate reading experience in Austrian German, English, and Serbian, backed by proper hreflang metadata.",
          "Established a frictionless consultation inquiry workflow with direct contact options (phone, WhatsApp, email) without third-party friction.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "Originalan vizuelni identitet i logo",
            en: "Original Logo & Visual Identity",
          },
          description: {
            sr: "Tipografski monogram i vizuelni standardi razvijeni specijalno za premium estetski studio u Beču.",
            en: "Custom typographic monogram and aesthetic brand guidelines crafted specifically for a high-end Vienna aesthetic salon.",
          },
        },
        {
          title: {
            sr: "Trojezična arhitektura ruta (DE / EN / SR)",
            en: "Trilingual Route Architecture (DE / EN / SR)",
          },
          description: {
            sr: "Strukturirane rute sa prirodnim prevodima na nemački, engleski i srpski jezik uz očuvanje konteksta stranice.",
            en: "Structured routes with natural translations in German, English, and Serbian, preserving the active page when changing language.",
          },
        },
        {
          title: {
            sr: "Next.js na Vercel edge mreži",
            en: "Next.js on Vercel Edge Network",
          },
          description: {
            sr: "Maksimalna brzina odziva i glatke tranzicije na mobilnim uređajima zahvaljujući modernom edge hostingu.",
            en: "Fast response times and smooth mobile transitions powered by edge deployment across Central Europe.",
          },
        },
        {
          title: {
            sr: "Mobilno prilagođena struktura tretmana",
            en: "Mobile-First Treatment Discovery",
          },
          description: {
            sr: "Jasna prezentacija usluga, cena i nege prilagođena korisnicama koje dolaze sa mobilnih mreža i društvenih profila.",
            en: "Clean service presentation, pricing transparency, and aftercare guidance tailored for smartphone visitors.",
          },
        },
      ],
      results: {
        sr: [
          "Kreiran originalan brend identitet i logotip salona za Jovana Ristic Makeup.",
          "Lansiran trojezični Next.js sajt na zvaničnom domenu powderbrowsvienna.com na Vercel-u.",
          "Obezbeđeno prirodno nemačko govorno iskustvo prilagođeno klijentima u Austriji.",
          "Postignuto trenutno učitavanje stranica na mobilnim telefonima.",
        ],
        en: [
          "Delivered an original brand identity and salon logo for Jovana Ristic Makeup.",
          "Launched the trilingual Next.js site on powderbrowsvienna.com hosted on Vercel.",
          "Provided a natural German-language browsing experience tailored to the Austrian market.",
          "Delivered instantaneous page loads on mobile devices.",
        ],
      },
      relatedSlugs: ["ilic-enterijer", "coolfridgeguys"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/powder-brows-vienna/",
    featuredImage: {
      src: "/projects/powder-brows-vienna.webp", width: 1883, height: 867,
      alt: { sr: "Početna stranica Powder Brows Vienna sa ponudom tretmana obrva.", en: "Powder Brows Vienna homepage presenting eyebrow treatments." },
    },
  },
  {
    slug: "coolfridgeguys",
    title: "Cool Fridge Guys",
    client: "Cool Fridge Guys",
    location: "Elk Grove Village, IL, USA",
    status: "active",
    role: {
      sr: "Kompletan redizajn, headless frontend inženjering na Next.js 15, i integracija AI asistenta za prodaju",
      en: "Complete redesign, headless frontend engineering on Next.js 15, and AI sales assistant integration",
    },
    category: {
      sr: "Web prodavnica",
      en: "E-commerce",
    },
    websiteUrl: "https://www.coolfridgeguys.com/",
    services: {
      sr: [
        "Headless e-commerce razvoj",
        "Next.js 15 & React 19 arhitektura",
        "UI/UX dizajn kataloga proizvoda",
        "AI asistent za prodaju (OpenAI API)",
        "API integracije (Squarespace, Google Reviews, Google Maps)",
        "Automatizacija upita (Resend)",
      ],
      en: [
        "Headless E-commerce Development",
        "Next.js 15 & React 19 Architecture",
        "Product Catalog UI/UX Design",
        "AI Sales Assistant (OpenAI API)",
        "API Integrations (Squarespace, Google Reviews, Google Maps)",
        "Inquiry Automation (Resend)",
      ],
    },
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Vercel",
      "Squarespace Commerce",
      "OpenAI API",
      "Resend",
      "Formik",
      "Yup",
    ],
    shortDescription: {
      sr: "Headless e-commerce platforma na Next.js 15 sa prilagođenim katalogom komercijalne rashladne opreme, Squarespace checkout-om i OpenAI asistentom za prodaju sa real-time pretragom inventara.",
      en: "Headless e-commerce platform built on Next.js 15 featuring a custom commercial refrigeration catalog, Squarespace checkout, and an OpenAI sales assistant with real-time inventory search.",
    },
    caseStudy: {
      overview: {
        sr: "Potpuni arhitektonski redizajn sa restriktivnog Squarespace šablona na headless Next.js 15 platformu sa React 19 i Tailwind CSS v4, dopunjen naprednim filtriranjem kataloga, custom dizajniranim karticama proizvoda i inteligentnim AI asistentom za prodaju koji u realnom vremenu pretražuje artikle i kvalifikuje lidove.",
        en: "Complete architectural redesign from a restrictive Squarespace template to a headless Next.js 15 platform powered by React 19 and Tailwind CSS v4, featuring advanced catalog filtering, custom product card designs, and an intelligent AI sales assistant that searches live inventory and qualifies commercial leads.",
      },
      challenge: {
        sr: [
          "Cool Fridge Guys je poslovao na monolitnoj Squarespace platformi. Iako je Squarespace pružao stabilan checkout i upravljanje inventarom, standardni šablon je ozbiljno ograničavao brzinu učitavanja, mogućnosti filtriranja po tehničkim specifikacijama i prezentaciju komercijalnih rashladnih jedinica za restorane i markete.",
          "Standardne fotografije rashladne opreme bile su vizuelno neusklađene, dok posetioci nisu imali mogućnost brzog pretraživanja po brendovima (True, Atosa, Beverage Air), dimenzijama ili broju vrata.",
          "Pored toga, vlasnik Goran je želeo moderan način za pomoć kupcima van radnog vremena i obradu čestih komercijalnih pitanja o garanciji, lokaciji i specifikacijama opreme.",
        ],
        en: [
          "Cool Fridge Guys operated on a monolithic Squarespace storefront. While Squarespace handled inventory and transactions reliably, the standard template severely limited load performance, commercial specification filtering, and the presentation of refrigeration units for food service businesses.",
          "Product photography lacked visual consistency across suppliers, and customers had no efficient way to filter by industry brands (True, Atosa, Beverage Air), dimensions, or door configurations.",
          "Furthermore, business owner Goran sought a modern way to assist commercial buyers outside office hours and answer frequent questions regarding warranties, showroom location, and equipment availability.",
        ],
      },
      approach: {
        sr: [
          "Projektovana je hibridna headless arhitektura: primarni prezentacioni i kataloški sajt na domenu coolfridgeguys.com pokreće custom Next.js 15 na Vercel edge mreži, dok je bezbedan transakcioni proces zadržan na Squarespace domenu coolfridgeguys.shop bez prekida u poslovanju.",
          "Dizajniran je namenski katalog prilagođen B2B kupcima: 12 jedinica po stranici na desktopu i 6 na mobilnim uređajima, uz custom Photoshop dizajn kartica proizvoda koji osigurava vizuelni sklad celokupnog asortimana.",
          "Razvijen je prilagođeni AI asistent za prodaju baziran na OpenAI strimingu, direktno integrisan sa live podacima iz Squarespace kataloga kako bi kupcima u toku razgovora prikazivao konkretne dostupne modele sa slikama i cenama.",
        ],
        en: [
          "Engineered a decoupled headless architecture: the customer-facing storefront on coolfridgeguys.com runs Next.js 15 on Vercel's global edge network, while the proven checkout and inventory workflow was preserved on coolfridgeguys.shop without disruption.",
          "Architected a custom commercial catalog with 12 units per page on desktop and 6 on mobile, backed by custom Photoshop product card graphics providing unified visual framing across all inventory.",
          "Built a tailored AI sales assistant leveraging streaming OpenAI models, directly integrated with live Squarespace catalog data to present matching units with images, pricing, and specs right inside the chat conversation.",
        ],
      },
      solution: {
        sr: [
          "Izgrađen izuzetno brz Next.js 15 frontend sa React 19 i Tailwind CSS v4, podržan server-side renderovanjem i trenutnim filtriranjem po kategorijama (vitrine, frižideri, zamrzivači, radni stolovi), brendovima i dimenzijama.",
          "Integrisan Google Reviews API za prikaz realnih ocena i komentara kupaca, Google Maps za navigaciju do izložbenog salona u Elk Grove Village-u, i YouTube Shorts video prikazi opreme u radu.",
          "Kreirane kontakt i narudžbene forme korišćenjem Formik i Yup biblioteka sa robusnom validacijom i zaštitom od neželjene pošte (Cloudflare Turnstile i Google reCAPTCHA v3).",
          "Implementiran AI asistent sa bodovanjem interesovanja i prosleđivanjem upita prodajnom timu putem Resend servisa kada posetilac zatraži ponudu.",
        ],
        en: [
          "Delivered an ultra-fast Next.js 15 frontend with React 19 and Tailwind CSS v4, supporting server-side rendering and instant multi-attribute filtering by category (reach-ins, merchandisers, prep tables, display freezers), brand, and dimensions.",
          "Integrated Google Reviews API for live social proof, interactive Google Maps for showroom directions in Elk Grove Village, IL, and embedded YouTube Shorts showcasing units in operation.",
          "Built contact and quote forms using Formik and Yup with rigorous client/server validation and automated anti-spam protection.",
          "Deployed an AI sales assistant with intent evaluation and inquiry dispatch via Resend when commercial buyers request quotes.",
        ],
      },
      aiSalesAssistant: {
        title: {
          sr: "AI asistent za prodaju i korisničku podršku",
          en: "AI Sales & Customer Support Assistant",
        },
        overview: {
          sr: "Prilagođeni AI agent pokrenut OpenAI tehnologijom sa strimovanjem odgovora, koji vodi prirodan razgovor sa kupcima, u realnom vremenu pretražuje katalog i usmerava kvalifikovane komercijalne lidove direktno ka prodajnom timu.",
          en: "Custom AI sales agent powered by streaming OpenAI technology that conducts natural buyer consultations, searches live inventory in real time, and routes qualified commercial leads directly to the sales team.",
        },
        capabilities: {
          sr: [
            "Pretraga kataloga u realnom vremenu: automatski pronalazi i u čat prozoru prikazuje do 3 odgovarajuća proizvoda iz Squarespace kataloga sa slikom, cenom i specifikacijama.",
            "Inteligentno bodovanje lidova (Lead Scoring): prati tok razgovora i prepoznaje faze interesovanja kupaca.",
            "Automatizovano prosleđivanje upita (Resend): kada kupac zatraži ponudu ili ostavi kontakt, sistem šalje strukturiran email prodajnom timu.",
            "Lokalni keš odgovora bez trošenja API tokena: odgovori o radnom vremenu, lokaciji salona (Elk Grove Village, IL), broju telefona i 2-mesečnoj garanciji serviraju se trenutno i bez pozivanja OpenAI servisa.",
            "Bezbednost i zaštita: definisana sistemska pravila za relevantnost tema, IP ograničenje učestalosti zahteva, i striktna politika bez prikupljanja osetljivih platnih podataka.",
          ],
          en: [
            "Real-time catalog search: dynamically queries Squarespace inventory and renders up to 3 matching product cards directly inside chat with image, price, and specs.",
            "Intelligent lead scoring: evaluates visitor dialogue across intent stages to identify serious buyers.",
            "Automated quote dispatch (Resend): delivers structured lead summaries to the sales team via Resend when purchase intent is expressed.",
            "Token-free local cache: standard inquiries regarding business hours, Elk Grove Village showroom location, contact phone, and 2-month warranty are answered instantly without incurring OpenAI token costs.",
            "Security & safety guardrails: strict prompt boundaries keeping dialogue focused on commercial equipment, IP rate limiting, and zero credit card data collection.",
          ],
        },
      },
      technicalHighlights: [
        {
          title: {
            sr: "Headless e-commerce razdvajanje",
            en: "Headless E-commerce Decoupling",
          },
          description: {
            sr: "Prezentacioni sloj i katalog pokreće Next.js 15 na Vercel edge mreži, dok je checkout izolovan na namenskom Squarespace domenu coolfridgeguys.shop bez ometanja kupaca.",
            en: "Presentation and catalog layers are powered by Next.js 15 on Vercel's edge, while secure checkout remains isolated on coolfridgeguys.shop without disruption.",
          },
        },
        {
          title: {
            sr: "AI katalog pretraga u čatu",
            en: "In-Chat AI Catalog Search",
          },
          description: {
            sr: "AI asistent u toku strimovanog odgovora poziva interni pretraživač i kupcu servira interaktivne kartice raspoložive opreme.",
            en: "The AI agent dynamically queries the inventory during streamed responses and displays interactive product cards directly in the dialogue.",
          },
        },
        {
          title: {
            sr: "Automatizovano bodovanje lidova",
            en: "Automated Lead Qualification",
          },
          description: {
            sr: "Klasifikacija posetilaca od razgledanja do 'Hot' statusa sa automatskim slanjem notifikacija prodavcu putem Resend API-ja.",
            en: "Evaluates buyer intent from casual browsing to 'Hot' status, firing immediate sales alerts to staff via Resend API.",
          },
        },
        {
          title: {
            sr: "Optimizovane kartice i filtriranje",
            en: "Custom Cards & Smart Filtering",
          },
          description: {
            sr: "Prilagođene Photoshop kartice artikala uz paginaciju (12 desktop / 6 mobilni) i instant filtriranje po brendovima i tipu rashlade.",
            en: "Uniform Photoshop product cards with tailored pagination (12 desktop / 6 mobile) and instant brand/equipment filtering.",
          },
        },
      ],
      results: {
        sr: [
          "Uspešno pušten u rad headless Next.js 15 sajt na domenu coolfridgeguys.com sa kompletnim asortimanom komercijalne rashladne opreme.",
          "Očuvan postojeći Squarespace sistem naručivanja na domenu coolfridgeguys.shop uz neprekinutu naplatu i stabilan inventar.",
          "Implementiran AI asistent koji pruža trenutne odgovore 24/7, pronalazi tačne modele u katalogu i prosleđuje kvalifikovane lidove prodavcu.",
        ],
        en: [
          "Successfully launched the headless Next.js 15 storefront on coolfridgeguys.com with full commercial refrigeration catalog.",
          "Preserved Squarespace ordering on coolfridgeguys.shop with continuous payment processing and inventory sync.",
          "Deployed an AI sales assistant providing 24/7 consultation, live catalog matching, and instant lead delivery to sales staff.",
        ],
      },
      relatedSlugs: ["buy-pallet-jacks", "ilic-enterijer"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/coolfridgeguys/",
    featuredImage: {
      src: "/projects/coolfridgeguys.webp", width: 1436, height: 850,
      alt: { sr: "Prikaz početne stranice web sajta Cool Fridge Guys.", en: "Cool Fridge Guys website homepage." },
    },
  },
  {
    slug: "tripolisweets",
    title: "Tripoli Sweets",
    client: "Tripoli Sweets",
    location: "Cancún, Mexico",
    status: "inactive",
    role: {
      sr: "E-commerce izrada i web dizajn (WordPress & WooCommerce katalog poslastica)",
      en: "E-commerce development and web design (WordPress & WooCommerce dessert catalog)",
    },
    category: {
      sr: "Web prodavnica",
      en: "E-commerce",
    },
    websiteUrl: "https://www.tripolisweets.com.mx",
    services: {
      sr: [
        "Web dizajn za poslastičarnicu",
        "WordPress i WooCommerce razvoj",
        "Katalog tradicionalnih poslastica",
        "Optimizacija procesa naručivanja hrane",
        "Prilagođavanje za mobilne uređaje",
      ],
      en: [
        "Confectionery Web Design",
        "WordPress & WooCommerce Development",
        "Traditional Sweets Catalog",
        "Food Ordering Flow Optimization",
        "Mobile-First Optimization",
      ],
    },
    technologies: ["WordPress", "WooCommerce", "PHP", "HTML", "CSS", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "E-commerce web sajt i katalog za Tripoli Sweets u Kankunu (Meksiko), razvijen na WordPress i WooCommerce platformi za online naručivanje tradicionalnih mediteranskih i bliskoistočnih poslastica. Projekat je sačuvan kao istorijski portfolio prikaz nakon što klijent nije obnovio domen i servis.",
        en: "An e-commerce website and catalog for Tripoli Sweets in Cancún, Mexico, built on WordPress and WooCommerce for online ordering of traditional Mediterranean and Middle Eastern pastries. The project is preserved as an authentic historical portfolio showcase following client domain expiration.",
      },
      challenge: {
        sr: [
          "Tripoli Sweets je poslovao u dinamičnom turističkom i lokalnom okruženju Kankuna u Meksiku, nudeći ručno pravljene tradicionalne poslastice (baklave, ma'amoul, kolače od pistaća). Klijentu je bila potrebna privlačna online prodavnica koja bi omogućila lokalnim kupcima i turistima jednostavno pregledanje ponude i naručivanje.",
          "Bilo je neophodno kreirati katalog sa jasnim kategorizacijama slatkiša, opcijama izbora gramaže i veličina pakovanja (kutije za poklon, porodična pakovanja), uz pregledan cenovnik i jednostavan proces naručivanja prilagođen telefonima.",
          "Sistem je morao da omogući vlasniku jednostavno upravljanje ponudom, cenama i pristiglim narudžbinama bez komplikovane tehničke administracije.",
        ],
        en: [
          "Operating in the bustling tourist and local market of Cancún, Mexico, Tripoli Sweets offered artisanal Middle Eastern and Mediterranean pastries. The business required an attractive digital storefront to help local residents and international visitors explore their dessert selection and place orders online.",
          "A structured catalog was needed with intuitive product categorization, box sizing options, weight variations, and clear pricing, coupled with a smooth mobile ordering experience for customers on the go.",
          "The administrative workflow had to allow the business owner to update seasonal dessert offerings, adjust pricing, and process incoming food orders without technical complexity.",
        ],
      },
      approach: {
        sr: [
          "Kreiran je topao, elegantan vizuelni dizajn usklađen sa poslastičarskom tradicijom, gde fotografije poslastica i opisi sastojaka dolaze do punog izražaja.",
          "Implementirana je prilagođena WordPress i WooCommerce prodavnica sa fleksibilnim opcijama artikala za izbor težine i pakovanja.",
          "Optimizovan je tok naručivanja za mobilne telefone, omogućavajući posetiocima da u nekoliko dodira dodaju poslastice u korpu i pošalju narudžbinu.",
          "Postavljen je pregledan administratorski interfejs na španskom jeziku koji je vlasniku omogućio samostalno vođenje kataloga i pregled narudžbina.",
        ],
        en: [
          "Designed a warm, appetizing visual aesthetic rooted in confectionery tradition, emphasizing artisanal dessert photography and ingredient descriptions.",
          "Implemented a custom WordPress and WooCommerce store featuring flexible item variations for custom box sizes and weights.",
          "Streamlined the checkout and ordering flow for mobile smartphones, allowing visitors to configure dessert assortments in just a few taps.",
          "Configured an intuitive Spanish-language administrative dashboard enabling autonomous menu updates and order management.",
        ],
      },
      solution: {
        sr: [
          "Izrađena i uspešno puštena u rad WooCommerce prodavnica na domenu tripolisweets.com.mx sa kompletnim asortimanom poslastica.",
          "Implementirane prilagođene opcije pakovanja i gramaže za poslastice, omogućavajući kupcima izbor manjih i većih porudžbina.",
          "Obezbeđen potpuno funkcionalan digitalni kanal za naručivanje pre nego što klijent nije obnovio zakup domena.",
          "Sajt je arhiviran u portfoliju kao verodostojan primer e-commerce izrade za poslastičarski sektor, uz onemogućavanje eksternih linkova radi bezbednosti posetilaca.",
        ],
        en: [
          "Successfully deployed the WooCommerce storefront on tripolisweets.com.mx featuring the full confectionery product line.",
          "Implemented tailored packaging and weight variation selectors, accommodating individual treats as well as gift boxes.",
          "Provided a dependable online ordering channel for the business prior to client domain expiration.",
          "Preserved as an authentic historical portfolio study of small-business food e-commerce, with outbound links disabled to protect visitors.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "WooCommerce katalog poslastica",
            en: "WooCommerce Confectionery Catalog",
          },
          description: {
            sr: "Prilagođena struktura artikala sa varijacijama težine i opcijama pakovanja slatkiša u poklon kutije.",
            en: "Tailored product architecture supporting box sizing, weight variations, and pastry categorization.",
          },
        },
        {
          title: {
            sr: "Prezentacija tradicionalnih slatkiša",
            en: "Artisanal Dessert Presentation",
          },
          description: {
            sr: "Topao vizuelni stil usmeren na isticanje tekstura, sastojaka i zanatske pripreme bliskoistočnih kolača.",
            en: "Warm, appetizing visual layout highlighting pastry textures, ingredients, and traditional preparation methods.",
          },
        },
        {
          title: {
            sr: "Optimizovan tok naručivanja na telefonima",
            en: "Mobile-Friendly Ordering Flow",
          },
          description: {
            sr: "Pregledna mobilna korpa i jednostavan proces naručivanja prilagođen turistima i lokalnim kupcima u Kankunu.",
            en: "Intuitive cart and checkout ergonomics designed for quick orders from tourist smartphones.",
          },
        },
        {
          title: {
            sr: "Samostalno upravljanje asortimanom",
            en: "Autonomous Catalog Management",
          },
          description: {
            sr: "Jednostavan WordPress administratorski tok koji je vlasniku omogućio samostalno vođenje ponude i obradu porudžbina.",
            en: "Intuitive WordPress back-office enabling the shop to update seasonal dessert offerings and manage orders.",
          },
        },
      ],
      results: {
        sr: [
          "Izrađena i uspešno lansirana WordPress i WooCommerce online prodavnica za klijenta u Kankunu.",
          "Implementiran strukturiran katalog sa opcijama gramaže i pakovanja poslastica.",
          "Omogućeno digitalno naručivanje hrane za lokalne i turističke kupce tokom perioda aktivnosti sajta.",
          "Projekat očuvan u portfoliju kao autentičan istorijski primer izrade sa bezbedno neutralisanim linkovima.",
        ],
        en: [
          "Developed and launched custom WordPress & WooCommerce ordering storefront for Tripoli Sweets in Cancún.",
          "Implemented structured product catalog featuring traditional dessert variations and packaging options.",
          "Delivered mobile-optimized ordering experience for local residents and international visitors during site operation.",
          "Preserved as an authentic historical portfolio project with outbound links safely disabled.",
        ],
      },
      relatedSlugs: ["anabelabebioprema", "coolfridgeguys"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/tripolisweets/",
    featuredImage: {
      src: "/projects/tripolisweets.webp", width: 1890, height: 940,
      alt: { sr: "Početna stranica Tripoli Sweets sa fotografijama tradicionalnih poslastica.", en: "Tripoli Sweets homepage featuring traditional desserts." },
    },
  },
  {
    slug: "casovi-francuskog",
    title: "Časovi Francuskog",
    client: "Jelena Marković - Časovi Francuskog",
    location: "Lazarevac / Online, Srbija",
    status: "active",
    role: {
      sr: "Izrada od nule: prilagođena WordPress tema, custom HTML i CSS, i SEO optimizacija za individualne časove francuskog",
      en: "Built from scratch: custom WordPress theme, bespoke HTML/CSS, and SEO optimization for individual French tutoring",
    },
    category: {
      sr: "Edukacija i kursevi",
      en: "Education & Courses",
    },
    websiteUrl: "https://casovifrancuskog.rs",
    services: {
      sr: ["Web dizajn", "Izrada custom WordPress teme", "Prilagođeni HTML/CSS", "SEO optimizacija edukativnog sadržaja", "Optimizacija performansi"],
      en: ["Web Design", "Custom WordPress Theme", "Bespoke HTML/CSS", "Educational Content SEO", "Performance Optimization"],
    },
    technologies: ["WordPress", "PHP", "HTML5", "CSS3", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "Kompletna izrada edukativne web platforme za individualne online časove francuskog jezika i srpskog za strance. Sajt je izgrađen od nule na namenskoj WordPress temi bez teških page buildera, sa fokusom na individualnu nastavu, personalizovano učenje, samostalno objavljivanje nastavnih materijala, visoku čitljivost dvojezičnog teksta i ciljani SEO za edukativne upite.",
        en: "End-to-end development of an educational web platform for individual online French language tutoring and Serbian for foreigners. Built from scratch with a custom WordPress theme free of heavy page builders, prioritizing 1-on-1 personalized instruction, autonomous lesson publishing, bilingual reading ergonomics, and targeted educational SEO.",
      },
      challenge: {
        sr: [
          "Profesorka francuskog jezika trebala je nezavisnu digitalnu platformu za privlačenje polaznika za individualne časove i personalizovano učenje, bez zavisnosti od posredničkih škola stranih jezika ili društvenih mreža.",
          "Bilo je neophodno izbeći kupljene, pretrpane WordPress teme i glomazne page buildere (poput Elementora ili Divija) koji usporavaju sajt i komplikuju održavanje, a istovremeno omogućiti profesorki da potpuno samostalno unosi lekcije, gramatička objašnjenja i termine kurseva.",
          "Platforma je morala da ponudi kristalno jasnu dvojezičnu tipografiju prilagođenu specifičnim francuskim akcentima i dijakriticima, uz besprekoran prikaz na pametnim telefonima koje učenici najčešće koriste.",
        ],
        en: [
          "A certified French language educator needed an independent digital platform to attract students for individual 1-on-1 tutoring and personalized learning without reliance on agency middlemen or volatile social channels.",
          "Commercial off-the-shelf WordPress themes and visual page builders (such as Elementor or Divi) were rejected due to script bloat and fragile maintenance. The platform required a lightweight foundation that still granted the educator total publishing autonomy for lessons, grammar notes, and course updates.",
          "The website demanded refined bilingual typography supporting French diacritics and accents seamlessly, alongside frictionless mobile navigation for students browsing on smartphones.",
        ],
      },
      approach: {
        sr: [
          "Izgrađena je namenska WordPress tema od nule korišćenjem čistog PHP-a, semantičkog HTML5 koda i prilagođenog CSS-a, bez ijednog eksternog page buildera.",
          "Projektovana je jasna arhitektura kurseva sa zasebnim celinama za individualne časove, personalizovanu pripremu za međunarodne DELF/DALF ispite i časove srpskog jezika za frankofone polaznike.",
          "Implementirana je pažljivo kalibrisana tipografska hijerarhija sa velikim proredom i optimalnom dužinom reda, obezbeđujući komforno čitanje edukativnih tekstova i primera na svim rezolucijama.",
          "Postavljena je precizna on-page SEO struktura sa optimizovanim meta podacima i semantikom prilagođenom pretragama za privatne individualne časove francuskog i online nastavu.",
        ],
        en: [
          "Engineered a bespoke WordPress theme from the ground up utilizing clean PHP, semantic HTML5, and custom CSS without relying on visual builder plugins.",
          "Architected structured course pathways with dedicated sections tailored exclusively for 1-on-1 tutoring, personalized DELF/DALF international exam preparation, and Serbian lessons for francophone learners.",
          "Established calibrated reading ergonomics featuring generous line-heights and measured line lengths for sustained reading comfort across desktop and mobile screens.",
          "Structured targeted on-page SEO targeting educational search intent, keyword mapping for private individual French tutoring, and semantic heading hierarchies.",
        ],
      },
      solution: {
        sr: [
          "Razvijena je brza, stabilna platforma na domenu casovifrancuskog.rs sa jednostavnim administratorskim interfejsom za upravljanje sadržajem.",
          "Integrisane su jasne kontaktne tačke i forma za zakazivanje besplatnih uvodnih konsultacija ili probnog individualnog časa, smanjujući prepreke za prijavu novih polaznika.",
          "Obezbeđeno je dugoročno tehničko održavanje, redovno ažuriranje jezgra i sigurnosne kopije bez tehničkog duga.",
        ],
        en: [
          "Delivered a fast, dependable web platform on casovifrancuskog.rs with an uncluttered administrative editing workflow.",
          "Integrated clear calls-to-action and a direct inquiry form for complimentary consultations and introductory 1-on-1 trial sessions.",
          "Provided reliable ongoing maintenance, WordPress core updates, and secure backups without technical debt.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "Prilagođena WordPress tema od nule",
            en: "Custom WordPress Theme from Scratch",
          },
          description: {
            sr: "Napisana od nule bez generičkih tema ili teških page buildera, dajući čist semantički kod, minimalan broj skripti i munjevito učitavanje.",
            en: "Authored from scratch without commercial theme bloat or visual page builders, yielding clean semantic markup and rapid load speeds.",
          },
        },
        {
          title: {
            sr: "Autonomno upravljanje edukativnim sadržajem",
            en: "Independent Educational Content Management",
          },
          description: {
            sr: "Intuitivan uređivački tok rada koji omogućava profesorki da samostalno dodaje lekcije, gramatičke osvrte i kurseve bez tehničke pomoći.",
            en: "Intuitive editorial workflow enabling the educator to publish lessons, grammar guides, and course bulletins without developer dependency.",
          },
        },
        {
          title: {
            sr: "Dvojezična edukativna tipografija i UX",
            en: "Bilingual Educational Typography & UX",
          },
          description: {
            sr: "Tipografski sistem prilagođen francuskim akcentima i dijakriticima, sa visokim kontrastom i komfornim čitanjem na mobilnim telefonima.",
            en: "Refined typographic scale supporting French accents, high contrast ratios, and comfortable mobile reading ergonomics for students.",
          },
        },
        {
          title: {
            sr: "Ciljana edukativna SEO arhitektura",
            en: "Targeted Educational SEO Architecture",
          },
          description: {
            sr: "Strukturirana on-page optimizacija za pretrage individualnih časova jezika, DELF/DALF pripreme i kurseva srpskog za strance na Google pretrazi.",
            en: "Targeted on-page optimization for individual language tutoring, exam preparation, and regional educational search intent on Google.",
          },
        },
      ],
      results: {
        sr: [
          "Lansirana i održavana brza WordPress platforma na domenu casovifrancuskog.rs.",
          "Uspostavljen potpuno samostalan proces objavljivanja nastavnih materijala i novosti bez zavisnosti od programera.",
          "Pojednostavljen put od prve posete do zakazivanja individualnih konsultacija putem optimizovanih mobilnih formi.",
          "Postignuta i očuvana stabilna organska vidljivost na pretrazi za ključne termine individualnih časova francuskog jezika.",
        ],
        en: [
          "Successfully launched and maintained custom WordPress platform on casovifrancuskog.rs.",
          "Established a completely autonomous lesson and content publishing workflow for the educator without technical overhead.",
          "Streamlined student onboarding with mobile-optimized inquiry and 1-on-1 consultation scheduling workflows.",
          "Achieved and sustained organic search visibility for core individual French language tutoring queries.",
        ],
      },
      relatedSlugs: ["frankultura", "os-dule-karaklajic"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/casovifrancuskog-rs/",
    featuredImage: {
      src: "/projects/casovi-francuskog.webp", width: 1351, height: 827,
      alt: { sr: "Prikaz početne stranice web sajta Časovi Francuskog.", en: "Časovi Francuskog website homepage." },
    },
  },
  {
    slug: "ladekor",
    title: "LaDekor",
    client: "LaDekor",
    location: "Lazarevac, Srbija",
    status: "inactive",
    role: {
      sr: "Web dizajn i frontend izrada u čistom HTML, CSS i JavaScript kodu (bez WordPress-a ili radnih okvira)",
      en: "Web design and frontend development in plain HTML, CSS, and JavaScript (no WordPress or heavy frameworks)",
    },
    category: {
      sr: "Poslovni sajt",
      en: "Business Website",
    },
    websiteUrl: "https://ladekor.rs/",
    services: {
      sr: [
        "Web dizajn za zanatske usluge",
        "Frontend izrada u čistom HTML5/CSS3/JS kodu",
        "Katalog molerskih i dekorativnih tehnika",
        "Optimizacija za mobilne uređaje",
        "Brzi kanali za telefonski kontakt i upite",
      ],
      en: [
        "Artisanal Contractor Web Design",
        "Framework-Free HTML5/CSS3/JS Development",
        "Decorative Painting Techniques Catalog",
        "Mobile-First Optimization",
        "Direct Call & Quotation Inquiry Pathways",
      ],
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "Statički poslovni web sajt za LaDekor, izrađen u čistom HTML, CSS i JavaScript kodu bez korišćenja WordPress-a ili glomaznih JavaScript radnih okvira. Sajt je kreiran za prezentaciju molerskih, fasaderskih, keramičarskih i dekorativnih tehnika u Lazarevcu, a arhiviran je u portfoliju kao istorijski projekat nakon što klijent nije obnovio domen.",
        en: "A static business website for LaDekor, handcrafted in plain HTML, CSS, and JavaScript without WordPress or heavy JavaScript frameworks. Created to showcase decorative painting, facades, ceramics, and renovation services in Lazarevac, the project is preserved as an authentic historical showcase after the client did not renew the domain.",
      },
      challenge: {
        sr: [
          "Zanatska radionica za završne radove u građevinarstvu i dekorativne tehnike želela je profesionalnu digitalnu prezentaciju svojih usluga bez visokih troškova održavanja kompleksnih CMS sistema ili baza podataka.",
          "Vlasnicima stanova i investitorima bilo je važno da brzo vide primere konkretnih tehnika (travertino, sahara, ottocento, spušteni plafoni, unutrašnje krečenje i fasade) sa fotografijama gotovih radova i jasnim kontakt opcijama.",
          "Bilo je neophodno postići maksimalnu brzinu učitavanja na mobilnim telefonima koje klijenti najčešće koriste na terenu, uz direktnu mogućnost pozivanja majstora jednim klikom.",
        ],
        en: [
          "A specialized interior painting and decorative finishes contractor needed a professional digital portfolio without the overhead, updates, and hosting costs of a complex CMS or database backend.",
          "Prospective clients and renovation contractors needed to examine specific techniques (travertino, sahara, ottocento, drywall ceilings, interior painting, and exterior facades) with authentic project imagery and direct contact details.",
          "Achieving instantaneous load speeds on smartphones used by on-site property owners and providing one-tap click-to-call communication was essential.",
        ],
      },
      approach: {
        sr: [
          "Primenjen je puristički pristup bez radnih okvira: kompletan sajt je napisan u čistom semantičkom HTML5, modernom CSS3 i vanila JavaScript-u, bez WordPress-a, React-a ili eksternih biblioteka.",
          "Kreiran je čist, profesionalan vizuelni raspored koji u prvi plan stavlja galeriju dekorativnih zidnih tehnika i preciznost završne obrade.",
          "Implementirana je responzivna struktura sa fluidnim CSS rasporedom koji se savršeno prilagođava ekranima svih veličina bez učitavanja teških CSS biblioteka.",
          "Postavljeni su jasni putevi za kontakt: istaknuti telefonski brojevi za direktno pozivanje sa mobilnih telefona i jednostavan obrazac za zakazivanje procene radova.",
        ],
        en: [
          "Adopted a framework-free engineering approach: authored entirely in semantic HTML5, modern CSS3, and vanilla JavaScript without WordPress, React, or heavy runtime dependencies.",
          "Created a focused editorial layout highlighting decorative wall textures, precision craftsmanship, and finished room transformations.",
          "Implemented a lightweight responsive structure adapting seamlessly to all screen dimensions without third-party CSS framework bloat.",
          "Structured prominent communication pathways: click-to-call mobile buttons and a straightforward contact form for requesting on-site estimates.",
        ],
      },
      solution: {
        sr: [
          "Lansiran izuzetno lagan, brz statički web sajt na domenu ladekor.rs sa minimalnim vremenom odziva stranice na svim mrežama.",
          "Kreirana strukturirana prezentacija usluga sa podelom na dekorativne tehnike, molerske radove, fasade i gipsarske radove.",
          "Omogućen direktan kontakt sa majstorom bez posrednika ili komplikovanih formulara.",
          "Sajt je uredno arhiviran u portfoliju kao primer čistog statičkog razvoja, sa bezbedno isključenim spoljnim linkom ka neaktivnom domenu.",
        ],
        en: [
          "Delivered an ultra-lightweight static web application on ladekor.rs providing instant rendering across all network conditions.",
          "Established an organized service directory covering decorative finishes, general painting, exterior facades, and drywall installations.",
          "Enabled immediate mobile communication between property owners and the contractor without unnecessary friction.",
          "Preserved as an authentic portfolio case study of framework-free development, with external outbound links disabled.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "Izrada bez radnih okvira (HTML / CSS / JS)",
            en: "Framework-Free Architecture (HTML / CSS / JS)",
          },
          description: {
            sr: "Razvijeno u čistom semantičkom HTML5, CSS3 i vanila JavaScript-u bez WordPress-a, baza podataka ili eksternih zavisnosti.",
            en: "Engineered purely in semantic HTML5, CSS3, and vanilla JavaScript with zero CMS, database, or library dependencies.",
          },
        },
        {
          title: {
            sr: "Izuzetno lagana statička struktura",
            en: "Lightweight Static Implementation",
          },
          description: {
            sr: "Minimalna težina stranice omogućava trenutno otvaranje i pregled usluga čak i na slabim mobilnim mrežama.",
            en: "Minimal page weight ensuring instant browser rendering and zero server-side maintenance requirements.",
          },
        },
        {
          title: {
            sr: "Strukturirani prikaz zanatskih tehnika",
            en: "Structured Craftsmanship Showcase",
          },
          description: {
            sr: "Jasna prezentacija specijalizovanih zidnih tehnika (travertino, sahara, ottocento) i završnih građevinskih radova.",
            en: "Dedicated showcase detailing specialized wall finishes (travertino, sahara, ottocento) and renovation crafts.",
          },
        },
        {
          title: {
            sr: "Mobilna ergonomija i direktan kontakt",
            en: "Mobile-First Contractor Inquiries",
          },
          description: {
            sr: "Interfejs optimizovan za telefon sa mogućnošću pozivanja majstora jednim dodirom za brze dogovore o radovima.",
            en: "Interface optimized for smartphones with one-tap click-to-call phone integration for rapid estimates.",
          },
        },
      ],
      results: {
        sr: [
          "Izrađen i uspešno lansiran čist statički sajt na domenu ladekor.rs bez opterećenja CMS sistema.",
          "Implementiran strukturiran prikaz svih molersko-dekorativnih i fasaderskih usluga.",
          "Omogućen trenutan odziv stranica i jednostavno zakazivanje procene radova tokom rada sajta.",
          "Projekat arhiviran kao autentičan primer frontend izrade u čistom kodu sa neutralisanim linkom.",
        ],
        en: [
          "Developed and deployed clean, framework-free static business website for LaDekor in Lazarevac.",
          "Implemented responsive service catalog detailing decorative wall techniques, facades, and ceramics.",
          "Delivered instantaneous page response and direct mobile contact pathways throughout site operation.",
          "Preserved as an authentic portfolio case study of framework-free development, with outbound links disabled.",
        ],
      },
      relatedSlugs: ["ilic-enterijer", "nest-home-solutions"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/ladekor/",
    featuredImage: {
      src: "/projects/ladekor.webp", width: 1307, height: 679,
      alt: { sr: "Prikaz početne stranice web sajta LaDekor.", en: "LaDekor website homepage." },
    },
  },
  {
    slug: "os-dule-karaklajic",
    title: "OŠ Dule Karaklajić",
    client: "ОШ „Дуле Караклајић“ – Лазаревац",
    location: "Lazarevac, Srbija",
    status: "active",
    role: {
      sr: "Kompletan redizajn postojećeg sajta škole: custom WordPress tema, prilagođeni HTML/CSS i nova arhitektura informacija",
      en: "Complete redesign of existing school website: custom WordPress theme, bespoke HTML/CSS, and revised information architecture",
    },
    category: {
      sr: "Obrazovna ustanova",
      en: "Educational Institution",
    },
    websiteUrl: "https://dulovaskola.edu.rs/",
    services: {
      sr: [
        "Kompletan redizajn sajta škole",
        "Izrada custom WordPress teme",
        "Arhitektura informacija i javnih obaveštenja",
        "Prilagođeni HTML/CSS moduli",
        "Prilagođavanje za mobilne uređaje",
      ],
      en: [
        "School Website Redesign",
        "Custom WordPress Theme Development",
        "Information & Public Notice Architecture",
        "Bespoke HTML/CSS Modules",
        "Mobile-First Optimization",
      ],
    },
    technologies: ["WordPress", "PHP", "HTML5", "CSS3", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "Sveobuhvatan redizajn zvaničnog web sajta Osnovne škole „Dule Karaklajić“ u Lazarevcu, sa namenskom WordPress temom, čistim HTML/CSS rešenjima za ključne sekcije i reorganizovanom arhitekturom informacija koja učenicima, roditeljima i nastavnicima omogućava brz pristup školskim vestima, rasporedima i službenim dokumentima.",
        en: "A comprehensive redesign of the official website for Dule Karaklajić primary school in Lazarevac, featuring a custom WordPress theme, handcrafted HTML/CSS modules, and an overhauled information architecture delivering swift access to school bulletins, timetables, and public documents for students, parents, and educators.",
      },
      challenge: {
        sr: [
          "Prethodni sajt jedne od najvećih osnovnih škola u Lazarevcu patio je od zastarelog dizajna, nepregledne navigacije i otežanog korišćenja na mobilnim telefonima kojima se roditelji i učenici prevashodno služe.",
          "Tokom godina nagomilale su se stotine službenih dokumenata, pravilnika, rasporeda časova, rezultata sa takmičenja i obaveštenja o javnim nabavkama bez logične hijerarhije, pa je pronalaženje važnih informacija bilo otežano.",
          "Školskoj administraciji i nastavnom timu bio je potreban jednostavan, pouzdan sistem za samostalno objavljivanje svakodnevnih vesti i dokumenata bez zavisnosti od eksternih programera za svaku promenu.",
        ],
        en: [
          "The legacy website of one of the largest primary schools in Lazarevac suffered from dated aesthetics, fragmented navigation, and poor mobile usability for parents and students browsing on phones.",
          "Over years of operation, hundreds of institutional documents, school policies, timetables, academic competition results, and public procurement announcements had accumulated without clear taxonomy, making critical information difficult to find.",
          "School administrators and faculty needed an intuitive, reliable system to publish daily announcements and official documents independently without developer dependency for routine updates.",
        ],
      },
      approach: {
        sr: [
          "Umesto kupljenih, pretrpanih višenamenskih tema, razvijena je lagana namenska WordPress tema prilagođena specifičnim potrebama osnovne škole, sa čistim PHP predlošcima i semantičkim kodom.",
          "Reorganizovana je kompletna arhitektura informacija: kreirane su jasne celine za roditelje (upis đaka, rasporedi, đački kalendar), učenike (sekcije, takmičenja, produženi boravak) i javnost (javne nabavke, finansijski planovi, pravilnici).",
          "Za odabrane stranice i sekcije implementirana su prilagođena HTML i CSS rešenja koja obezbeđuju čistu tipografiju, visok kontrast i pregledan tabelarni prikaz školskih rasporeda.",
          "Uspostavljen je pristupačan i intuitivan uređivački tok unutar WordPress-a koji školskom osoblju omogućava brzo dodavanje vesti sa PDF prilozima i fotografijama.",
        ],
        en: [
          "Rather than using bloated multi-purpose commercial themes, a lightweight custom WordPress theme was developed specifically for public school requirements using clean PHP templates and semantic markup.",
          "Restructured the entire information architecture into intuitive portals: distinct categories for parents (enrollment, schedules, school calendar), students (academic clubs, competitions, after-school care), and public governance (tenders, school board policies).",
          "Crafted bespoke HTML and CSS page sections providing high-legibility typography, clear contrast, and structured timetable displays.",
          "Established an intuitive administrative editorial workflow inside WordPress enabling school staff to publish announcements with PDF attachments and galleries effortlessly.",
        ],
      },
      solution: {
        sr: [
          "Uspešno lansiran redizajniran, moderan sajt na zvaničnom edu.rs domenu dulovaskola.edu.rs.",
          "Implementirana responzivna navigacija prilagođena roditeljima i učenicima na pametnim telefonima.",
          "Organizovana centralizovana arhiva školskih dokumenata, konkursa i obaveštenja dostupna u nekoliko klikova.",
          "Obezbeđeno dugoročno tehničko održavanje i stabilan rad platforme bez tehničkog duga.",
        ],
        en: [
          "Successfully deployed the modernized primary school portal on the official dulovaskola.edu.rs domain.",
          "Implemented a mobile-first navigation system optimized for parents and students on smartphones.",
          "Organized a centralized institutional repository for school bulletins, policies, and tender documentation accessible in seconds.",
          "Provided dependable ongoing maintenance and stable platform operation without technical debt.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "Namenska školska WordPress tema",
            en: "Custom Educational WordPress Theme",
          },
          description: {
            sr: "Razvijena od nule sa čistim PHP predlošcima bez glomaznih page buildera, garantujući stabilnost i brzo učitavanje.",
            en: "Engineered from scratch with clean PHP templates without page builder bloat, ensuring speed and stability.",
          },
        },
        {
          title: {
            sr: "Prilagođene HTML i CSS komponente",
            en: "Bespoke HTML & CSS Page Modules",
          },
          description: {
            sr: "Namenska rešenja za prikaz nastavnih planova, rasporeda časova i školskih sekcija sa preglednom tipografijom.",
            en: "Handcrafted modules for timetables, curricula, and staff directories with legible institutional typography.",
          },
        },
        {
          title: {
            sr: "Strukturirana arhitektura informacija",
            en: "Structured Information Architecture",
          },
          description: {
            sr: "Pregledno razdvojene celine za roditelje, učenike i javnost sa brzim uvidom u obaveštenja i službene akte.",
            en: "Logically separated portals for parents, students, and administration with swift access to announcements and policies.",
          },
        },
        {
          title: {
            sr: "Responzivna navigacija za roditelje i đake",
            en: "Responsive Navigation for Parents & Students",
          },
          description: {
            sr: "Meni prilagođen telefonima koji omogućava trenutno pronalaženje dnevnih informacija i rasporeda u pokretu.",
            en: "Mobile-first menu hierarchy allowing rapid access to daily notices on smartphones.",
          },
        },
      ],
      results: {
        sr: [
          "Uspešno redizajniran i pokrenut zvanični portal škole na domenu dulovaskola.edu.rs.",
          "Izrađena namenska, brza WordPress tema bez zavisnosti od komercijalnih bildera.",
          "Uspostavljena logična arhitektura za stotine školskih obaveštenja, pravilnika i dokumenata.",
          "Omogućen potpuno samostalan rad školskog tima na objavljivanju vesti i rasporeda.",
        ],
        en: [
          "Successfully redesigned and launched the official school platform on dulovaskola.edu.rs.",
          "Built a custom lightweight WordPress theme with zero page-builder bloat.",
          "Restructured hundreds of school notices and administrative documents into an organized public archive.",
          "Delivered a reliable publishing workflow for school administration to post announcements and updates independently.",
        ],
      },
      relatedSlugs: ["casovi-francuskog", "frankultura"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/os-dule-karaklajic/",
    featuredImage: {
      src: "/projects/os-dule-karaklajic.webp", width: 1877, height: 868,
      alt: { sr: "Početna stranica OŠ Dule Karaklajić sa fotografijom škole.", en: "OŠ Dule Karaklajić homepage featuring a photograph of the school." },
    },
  },
  {
    slug: "anabelabebioprema",
    title: "Anabela Bebi Oprema",
    client: "Anabela Bebi Oprema",
    location: "Ćuprija, Srbija (maloprodajni objekti: Ćuprija, Jagodina, Paraćin)",
    status: "active",
    role: {
      sr: "E-commerce izrada na WordPress i WooCommerce platformi sa katalogom od preko 200 artikala i SEO optimizacijom",
      en: "E-commerce development on WordPress & WooCommerce with a 200+ product catalog and SEO optimization",
    },
    category: {
      sr: "Web prodavnica",
      en: "E-commerce",
    },
    websiteUrl: "https://anabelashop.rs/",
    services: {
      sr: ["Web dizajn", "WordPress & WooCommerce razvoj", "Katalog proizvoda (200+ artikala)", "SEO optimizacija", "Optimizacija procesa naručivanja"],
      en: ["Web Design", "WordPress & WooCommerce Development", "Product Catalog (200+ items)", "SEO Optimization", "Checkout Optimization"],
    },
    technologies: ["WordPress", "WooCommerce", "PHP", "HTML", "CSS", "JavaScript"],
    shortDescription: {
      sr: "WooCommerce e-commerce prodavnica za prodavnicu bebi opreme sa sedištem u Ćupriji i maloprodajnim objektima u Ćupriji, Jagodini i Paraćinu, sa katalogom od preko 200 artikala bebi opreme, optimizovana za pretragu i kupovinu na mobilnim uređajima.",
      en: "WooCommerce e-commerce store for a baby equipment retailer based in Ćuprija, Serbia, with physical stores in Ćuprija, Jagodina, and Paraćin, featuring a 200+ product catalog optimized for mobile shopping and search.",
    },
    caseStudy: {
      overview: {
        sr: "Kompletna izrada e-commerce web prodavnice za Anabela Bebi Oprema na WordPress i WooCommerce platformi. Anabela Bebi Oprema je prodavnica bebi opreme sa sedištem u Ćupriji i maloprodajnim objektima u Ćupriji, Jagodini i Paraćinu. Sajt obuhvata strukturiran katalog sa više od 200 artikala bebi opreme, kolica, krevetaca, autosedišta i pratećeg asortimana, uz pripremu podataka za uvoz, doslednu hijerarhiju kategorija, on-page SEO optimizaciju i prilagođeno korisničko iskustvo za kupovinu putem pametnih telefona.",
        en: "Full-scale e-commerce development for Anabela Bebi Oprema using WordPress and WooCommerce. Anabela Bebi Oprema is a baby equipment retailer based in Ćuprija, Serbia, with physical stores in Ćuprija, Jagodina, and Paraćin. The store features a structured product catalog of more than 200 baby equipment items—including strollers, cribs, car seats, and nursery accessories—supported by catalog data preparation for import, clean category hierarchy, on-page SEO optimization, and a responsive mobile shopping experience.",
      },
      challenge: {
        sr: [
          "Anabela Bebi Oprema je prodavnica bebi opreme sa sedištem u Ćupriji i maloprodajnim objektima u Ćupriji, Jagodini i Paraćinu, kojoj je bilo potrebno širenje prodaje na digitalni kanal kako bi kupcima omogućila pregled čitavog asortimana i naručivanje putem interneta.",
          "Bilo je neophodno organizovati i strukturirati obiman katalog od preko 200 raznovrsnih artikala—od gabaritnih kolica i krevetaca sa tehničkim specifikacijama i dimenzijama, do manjih aksesoara i odeće za bebe—uz dosledno formatiranje naziva, opisa, cena i varijacija.",
          "Sistem je morao da obezbedi intuitivno filtriranje i pretragu za roditelje koji kupuju sa mobilnih telefona, uz stabilnu WordPress i WooCommerce osnovu koju osoblje prodavnice može samostalno da dopunjuje novim artiklima bez tehničkih komplikacija.",
        ],
        en: [
          "Anabela Bebi Oprema is a baby equipment retailer based in Ćuprija, Serbia, with physical stores in Ćuprija, Jagodina, and Paraćin, that required an online e-commerce presence to showcase its comprehensive inventory and enable direct online ordering across Serbia.",
          "The project demanded organizing and structuring a substantial catalog of more than 200 diverse items—ranging from bulky strollers and cribs with exact specifications and dimensions to smaller baby accessories—ensuring consistent product naming, descriptions, variations, and pricing.",
          "The storefront needed to deliver effortless navigation and search for parents shopping on mobile devices, backed by an accessible WordPress and WooCommerce back-office that retail staff could manage independently.",
        ],
      },
      approach: {
        sr: [
          "Izabran je WooCommerce na WordPress-u kao proverena e-commerce osnova koja omogućava potpunu kontrolu nad podacima, fleksibilno proširenje asortimana i samostalno upravljanje bez plaćanja fiksnih mesečnih pretplata za platformu (dok standardne naknade za procesiranje plaćanja važe po transakciji).",
          "Pripremljena je i standardizovana struktura podataka za uvoz preko 200 artikala, uključujući jasnu podelu na glavne kategorije (kolica, kreveci, sedišta, posteljine, oprema za hranjenje) i atribute proizvoda.",
          "Projektovan je čist, nežan i vizuelno topao dizajn prilagođen industriji bebi opreme, sa visokim kontrastom, krupnim fotografijama artikala i transparentnim prikazom cena i raspoloživosti.",
          "Postavljena je temeljna on-page SEO struktura sa semantičkim naslovima, optimizovanim meta podacima za brendove i kategorije bebi opreme, i preglednim putanjama kroz kategorije (breadcrumbs).",
        ],
        en: [
          "Selected WooCommerce on WordPress as the foundation, providing complete data ownership, flexible catalog scalability, and autonomy without recurring monthly platform subscription fees (standard payment processing fees apply per transaction).",
          "Prepared and standardized the catalog data structure for importing more than 200 products, establishing a logical category taxonomy (strollers, cribs, car seats, bedding, nursery feeding) and consistent product attributes.",
          "Designed a welcoming, clean visual aesthetic tailored to baby and nursery retail, emphasizing high-clarity product photography, legible typography, and transparent pricing.",
          "Implemented a solid on-page SEO foundation featuring semantic heading hierarchy, category and brand meta descriptions, and intuitive breadcrumb navigation.",
        ],
      },
      solution: {
        sr: [
          "Lansirana je brza i pouzdana WooCommerce prodavnica na domenu anabelashop.rs sa više od 200 aktivno unetih i kategorisanih artikala bebi opreme.",
          "Implementiran je optimizovan prikaz pojedinačnih stranica artikala sa detaljnim opisima, specifikacijama, galerijom slika i jasnim dugmetom za dodavanje u korpu.",
          "Prilagođen je tok naručivanja i korpa za mobilne uređaje, omogućavajući roditeljima unos podataka za dostavu u nekoliko jasnih koraka bez obavezne registracije korisničkog naloga.",
          "Postavljena je interna pretraga i kategorizovana navigacija koja posetiocima omogućava da u svega nekoliko klikova pronađu željenu grupu opreme.",
        ],
        en: [
          "Launched a reliable WooCommerce online store on anabelashop.rs featuring more than 200 organized baby equipment products.",
          "Implemented optimized single product pages with detailed technical specifications, image galleries, and clear call-to-action buttons for cart addition.",
          "Refined the mobile cart and checkout flow, allowing parents to complete orders in clear steps with guest checkout and no mandatory account creation.",
          "Configured intuitive search and category navigation, enabling visitors to locate specific baby products and nursery essentials in just a few taps.",
        ],
      },
      technicalHighlights: [
        {
          title: {
            sr: "Katalog od 200+ artikala i strukturiran uvoz",
            en: "200+ Item Catalog & Structured Data Import",
          },
          description: {
            sr: "Strukturirana priprema podataka i uvoz više od 200 artikala bebi opreme sa unificiranim atributima, opisima i dimenzijama unutar WooCommerce baze.",
            en: "Structured data preparation and import of over 200 baby care products with standardized attributes, descriptions, and dimensions in WooCommerce.",
          },
        },
        {
          title: {
            sr: "Kategorizacija i hijerarhija bebi opreme",
            en: "Specialized Nursery Taxonomy & Hierarchy",
          },
          description: {
            sr: "Logična podela na kolica, nameštaj, autosedišta i prateću opremu koja roditeljima omogućava brzo i pregledno pronalaženje artikala.",
            en: "Logical categorization across strollers, nursery furniture, car seats, and accessories enabling effortless navigation for parents.",
          },
        },
        {
          title: {
            sr: "Responzivno korisničko iskustvo i mobilna korpa",
            en: "Mobile-First UX & Streamlined Cart",
          },
          description: {
            sr: "Optimizovan raspored elemenata za ekrane telefona sa preglednim galerijama proizvoda i jednostavnim procesom naručivanja.",
            en: "Mobile-optimized product layouts featuring responsive image galleries and a direct checkout pathway without mandatory account creation.",
          },
        },
        {
          title: {
            sr: "On-page SEO optimizacija za komercijalne upite",
            en: "On-Page SEO for E-Commerce Queries",
          },
          description: {
            sr: "Optimizovane kategorije, meta opisi i semantičke strukture za pretrage bebi opreme i brendova na lokalnom i regionalnom tržištu.",
            en: "Optimized product categories, meta tags, and semantic structures targeting local and regional commercial search queries for baby essentials.",
          },
        },
      ],
      results: {
        sr: [
          "Uspešno izgrađena i lansirana WooCommerce e-commerce prodavnica na domenu anabelashop.rs.",
          "Strukturiran, uvezen i objavljen katalog sa više od 200 artikala bebi opreme.",
          "Implementirano prilagođeno korisničko iskustvo sa fokusom na jednostavno naručivanje na mobilnim telefonima.",
          "Postavljena sveobuhvatna on-page SEO optimizacija za kategorije i proizvode bebi asortimana.",
        ],
        en: [
          "Successfully built and deployed the custom WooCommerce e-commerce storefront on anabelashop.rs.",
          "Structured, imported, and published an extensive catalog of more than 200 baby equipment products.",
          "Delivered an optimized shopping experience focused on responsive mobile browsing and guest checkout.",
          "Established a comprehensive on-page SEO foundation across product categories and nursery inventory.",
        ],
      },
      relatedSlugs: ["tripolisweets", "coolfridgeguys"],
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/anabelabebioprema/",
    featuredImage: {
      src: "/projects/anabela-bebi-oprema.webp", width: 1757, height: 931,
      alt: { sr: "Prikaz početne stranice web sajta Anabela Bebi Oprema.", en: "Anabela Bebi Oprema website homepage." },
    },
    featured: false,
  },
  {
    slug: "frankultura",
    title: "Frankultura",
    client: "Frankultura",
    location: "Lazarevac / Online, Srbija",
    status: "active",
    role: {
      sr: "Web dizajn i WordPress izrada sa prilagođenim HTML i CSS sekcijama za individualne i grupne časove francuskog jezika",
      en: "Web design and WordPress development with bespoke HTML and CSS sections for individual and group French courses",
    },
    category: {
      sr: "Edukacija i kursevi",
      en: "Education & Courses",
    },
    websiteUrl: "https://www.frankultura.rs",
    services: {
      sr: ["Web dizajn", "WordPress razvoj", "Prilagođene HTML/CSS sekcije", "Individualni i grupni kursevi"],
      en: ["Web Design", "WordPress Development", "Custom HTML/CSS Sections", "Individual & Group Courses"],
    },
    technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
    shortDescription: {
      sr: "Web prezentacija za Frankulturu sa fokusom na individualne i grupne časove francuskog jezika, konverzacijske radionice i kulturne programe, izgrađena na WordPress-u sa namenskim HTML/CSS sekcijama.",
      en: "Educational presentation website for Frankultura focusing on individual and group French classes, conversational workshops, and cultural courses, built on WordPress with custom HTML/CSS sections.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/frankultura/",
    featuredImage: {
      src: "/projects/frankultura.webp", width: 1351, height: 827,
      alt: { sr: "Prikaz početne stranice web sajta Frankultura.", en: "Frankultura website homepage." },
    },
    featured: false,
  },
  {
    slug: "madjionicar-bojan",
    title: "Mađioničar Bojan",
    client: "Bojan Bogdanović - Mađioničar",
    location: "Lazarevac / Srbija",
    status: "active",
    role: {
      sr: "Web dizajn i frontend razvoj u React-u (React SPA aplikacija, bez WordPress-a i bez Next.js-a)",
      en: "Web design and frontend development in React (React SPA application, no WordPress and no Next.js)",
    },
    category: {
      sr: "Prezentacioni sajt",
      en: "Presentation Website",
    },
    websiteUrl: "https://madjionicarbokac.com/",
    services: {
      sr: ["Web dizajn", "React SPA razvoj", "Optimizacija performansi", "Interaktivna prezentacija"],
      en: ["Web Design", "React SPA Development", "Performance Optimization", "Interactive Presentation"],
    },
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    shortDescription: {
      sr: "Interaktivna React aplikacija (SPA) za poznatog mađioničara Bojana Bogdanovića iz Lazarevca, kreirana za promociju mađioničarskih nastupa za rođendane, proslave i događaje.",
      en: "Interactive React single-page application for magician Bojan Bogdanović from Lazarevac, designed to showcase magic shows for birthdays, corporate events, and celebrations.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/madjionicar-bojan/",
    featuredImage: {
      src: "/projects/madjionicar-bojan.webp", width: 1757, height: 923,
      alt: { sr: "Prikaz početne stranice web sajta Mađioničar Bojan.", en: "Mađioničar Bojan website homepage." },
    },
    featured: false,
  },
  {
    slug: "banquetes-castellanos-zoreda",
    title: "Banquetes Castellanos Zoreda",
    client: "Banquetes Castellanos Zoreda",
    location: "Mexico",
    status: "active",
    role: {
      sr: "Web dizajn i statički frontend razvoj na Netlify platformi",
      en: "Web design and static frontend development deployed on Netlify",
    },
    category: {
      sr: "Poslovni sajt",
      en: "Business Website",
    },
    websiteUrl: "https://precious-marigold-0deefc.netlify.app/",
    services: {
      sr: ["Web dizajn", "Frontend razvoj (HTML/CSS/JS)", "Netlify hosting", "Prezentacija kataloga opreme za svečanosti"],
      en: ["Web Design", "Frontend Development (HTML/CSS/JS)", "Netlify Hosting", "Event Rental Catalog"],
    },
    technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
    shortDescription: {
      sr: "Prezentacioni web sajt za klijenta iz Meksika koji se bavi iznajmljivanjem svadbenih stolica, stolova i prateće opreme za svečanosti, realizovan u čistom HTML/CSS/JS kodu i hostovan na Netlify-ju.",
      en: "Presentation website for an event rental business in Mexico providing wedding chairs, tables, and party furnishings, built with static HTML/CSS/JS and deployed on Netlify.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/banquetes-castellanos-zoreda/",
    featuredImage: {
      src: "/projects/banquetes-castellanos-zoreda.webp", width: 1757, height: 926,
      alt: { sr: "Prikaz početne stranice web sajta Banquetes Castellanos Zoreda.", en: "Banquetes Castellanos Zoreda website homepage." },
    },
    featured: false,
  },
  {
    slug: "nest-home-solutions",
    title: "Nest Home Solutions",
    client: "Nest Home Solutions",
    location: "Divčibare, Srbija",
    status: "active",
    role: {
      sr: "Web dizajn i statički frontend razvoj hostovan na GitHub Pages platformi",
      en: "Web design and static frontend development hosted on GitHub Pages",
    },
    category: {
      sr: "Poslovni sajt",
      en: "Business Website",
    },
    websiteUrl: "https://nikola93kg.github.io/nest-home/",
    services: {
      sr: ["Web dizajn", "Frontend razvoj (HTML/CSS/JS)", "GitHub Pages hosting", "Prezentacija apartmana na Divčibarama"],
      en: ["Web Design", "Frontend Development (HTML/CSS/JS)", "GitHub Pages Hosting", "Mountain Apartment Showcase"],
    },
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    shortDescription: {
      sr: "Web prezentacija za građevinsku firmu koja gradi apartmane na planini Divčibare, sa prikazom stambenih jedinica, lokacije i tehničkih detalja gradnje, hostovana na GitHub Pages.",
      en: "Presentation website for a construction firm developing mountain apartments in Divčibare, showcasing residential units, site location, and structural specifications, hosted on GitHub Pages.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/nest-home-solutions/",
    featuredImage: {
      src: "/projects/nesthome.webp", width: 1757, height: 926,
      alt: { sr: "Prikaz početne stranice web sajta Nest Home Solutions.", en: "Nest Home Solutions website homepage." },
    },
    featured: false,
  },
  {
    slug: "stamenko-milic-photography",
    title: "Stamenko Milić Photography",
    client: "Stamenko Milić Photography",
    location: "Srbija",
    status: "active",
    role: {
      sr: "Web dizajn i WordPress izrada fotografskog portfolija sa galerijama venčanja",
      en: "Web design and WordPress development of a photography portfolio with wedding galleries",
    },
    category: {
      sr: "Portfolio sajt",
      en: "Portfolio Website",
    },
    websiteUrl: "https://www.milicweddings.com/",
    services: {
      sr: ["Web dizajn", "WordPress izrada", "Galerija fotografija", "Optimizacija slika"],
      en: ["Web Design", "WordPress Development", "Photo Gallery Showcase", "Image Optimization"],
    },
    technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
    shortDescription: {
      sr: "Web portfolio za profesionalnog fotografa Stamenka Milića sa prikazom fotografisanja venčanja, portreta i studijskih sesija, izgrađen na WordPress platformi.",
      en: "Online portfolio for professional photographer Stamenko Milić highlighting wedding photography, portraits, and studio sessions, built on WordPress.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/stamenko-milic-photography/",
    featuredImage: {
      src: "/projects/milic-weddings.webp", width: 1757, height: 926,
      alt: { sr: "Prikaz početne stranice web sajta Stamenko Milić Photography.", en: "Stamenko Milić Photography website homepage." },
    },
    featured: false,
  },
  {
    slug: "dh-travell",
    title: "DH Travel",
    client: "DH Travel",
    location: "Srbija",
    status: "active",
    role: {
      sr: "Web dizajn i WordPress izrada prezentacije usluga prevoza putnika do aerodroma",
      en: "Web design and WordPress development for airport shuttle and passenger transfer services",
    },
    category: {
      sr: "Poslovni sajt",
      en: "Business Website",
    },
    websiteUrl: "https://dhtravell.rs/",
    services: {
      sr: ["Web dizajn", "WordPress razvoj", "Prezentacija ruta i vozila", "Brza rezervacija prevoza"],
      en: ["Web Design", "WordPress Development", "Route & Fleet Presentation", "Fast Transfer Inquiries"],
    },
    technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
    shortDescription: {
      sr: "Web prezentacija za firmu DH Travel koja organizuje prevoz putnika od adrese do aerodroma i nazad, sa transparentnim informacijama o vozilima, rutama i direktnim kontaktom.",
      en: "Presentation website for DH Travel offering direct door-to-airport passenger shuttle services, featuring vehicle overviews, travel routes, and instant booking contact.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/dh-travell/",
    featuredImage: {
      src: "/projects/dhtravel.webp", width: 1900, height: 876,
      alt: { sr: "Prikaz početne stranice web sajta DH Travel.", en: "DH Travel website homepage." },
    },
    featured: false,
  },
];

const portfolioOrder = [
  "casovi-francuskog",
  "ilic-enterijer",
  "powder-brows-vienna",
  "coolfridgeguys",
  "tripolisweets",
  "buy-pallet-jacks",
  "ladekor",
  "os-dule-karaklajic",
  "anabelabebioprema",
  "frankultura",
  "madjionicar-bojan",
  "banquetes-castellanos-zoreda",
  "nest-home-solutions",
  "stamenko-milic-photography",
  "dh-travell",
] as const;

const caseStudyOrder = [
  "buy-pallet-jacks",
  "ilic-enterijer",
  "os-dule-karaklajic",
  "powder-brows-vienna",
  "tripolisweets",
  "casovi-francuskog",
  "coolfridgeguys",
  "ladekor",
  "anabelabebioprema",
] as const;

export type ProjectWithImage = Project & { featuredImage: ProjectImage };

export function hasProjectImage(project: Project): project is ProjectWithImage {
  return Boolean(project.featuredImage);
}

export const projectsWithImages = projects.filter(hasProjectImage);

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export const portfolioProjects: readonly Project[] = portfolioOrder.map((slug) => {
  const project = projectsBySlug.get(slug);
  if (!project) throw new Error(`Missing portfolio project: ${slug}`);
  return project;
});

export type CaseStudyProject = ProjectWithImage & { caseStudy: ProjectCaseStudy };

export const caseStudyProjects = projects
  .filter((project): project is CaseStudyProject => Boolean(project.caseStudy && project.featuredImage))
  .toSorted((a, b) => caseStudyOrder.indexOf(a.slug as (typeof caseStudyOrder)[number]) - caseStudyOrder.indexOf(b.slug as (typeof caseStudyOrder)[number]));

export function getCaseStudyProject(slug: string): CaseStudyProject | undefined {
  return caseStudyProjects.find((project) => project.slug === slug);
}

export function getProjectsBySlugs(slugs: readonly string[]): readonly Project[] {
  return slugs
    .map((slug) => projectsBySlug.get(slug))
    .filter((project): project is Project => Boolean(project));
}
