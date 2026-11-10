import type { BlogSection } from "@/content/blog";
import type { Editorial } from "@/content/blog-editorial";

const sectionsSr: readonly BlogSection[] = [
  {
    heading: "Kada je sajtu stvarno potreban redizajn, a kada samo fejslift?",
    paragraphs: [
      "Mnogi vlasnici biznisa odlažu redizajn misleći da je to samo estetska promena — zamena boja, logotipa i fontova. Međutim, u 2026. godini vizuelni utisak je samo vrh ledenog brega. Ako vaš sajt izgleda lepo na vašem desktop računaru, ali ne donosi upite, posetioci brzo odlaze sa telefona, a AI pretraživači vas ignorišu, sajt ne obavlja svoj osnovni posao.",
      "Strateški redizajn se ne bavi ulepšavanjem onoga što ne funkcioniše, već preispitivanjem arhitekture stranica, tehničke brzine, jasnoće ponude i korisničkog iskustva. Pre nego što investirate budžet, važno je prepoznati objektivne signale koji pokazuju da je postojeće rešenje postalo kočnica vašeg rasta.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Razlika između površinskog ulepšavanja i strateškog redizajna u 2026.",
        columns: ["Kriterijum", "Kozmetičko osveženje (Fejslift)", "Strateški redizajn"],
        rows: [
          [
            "Fokus i cilj",
            "Nove boje, moderniji fontovi i zamena slika",
            "Povećanje broja upita, brže učitavanje i SEO/AI vidljivost",
          ],
          [
            "Arhitektura sadržaja",
            "Zadržava se ista struktura stranica i navigacija",
            "Reorganizacija stranica prema stvarnim potrebama kupaca",
          ],
          [
            "Tehnički temelj",
            "Ista tema, dodaci i kod sa svim starim problemima",
            "Čišćenje koda, Core Web Vitals optimizacija i semantika",
          ],
          [
            "AI & Search spremnost",
            "AI sistemi i dalje nailaze na nerazumljivu strukturu",
            "Implementirana Schema.org struktura i direktni odgovori (GEO)",
          ],
          [
            "Kada se primenjuje",
            "Kada sajt odlično konvertuje, ali deluje vizuelno staro",
            "Kada sajt gubi upite, sporo radi ili je biznis promenio ponudu",
          ],
        ],
      },
    ],
  },
  {
    heading: "10 jasnih znakova da je vreme za redizajn sajta",
    paragraphs: [
      "Ako primetite tri ili više stavki sa ove liste na svom poslovnom sajtu, vreme je za planiranje redizajna. Svaka od njih direktno utiče na gubitak potencijalnih klijenata i troškove marketinga.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "01. Imate posete, ali nemate upite (Konverzijsko slepilo)",
            paragraphs: [
              "Google Analytics pokazuje da ljudi dolaze na sajt, ali telefon ne zvoni i kontakt forma ostaje prazna. Ovo je najčešći signal da posetioci ne razumeju šta tačno nudite, koja je vaša prednost ili koji je sledeći korak. Loša hijerarhija informacija i nejasni pozivi na akciju (CTA) teraju kupce kod konkurencije.",
            ],
          },
          {
            heading: "02. AI pretraživači (ChatGPT, Perplexity, Google AI) vas uopšte ne preporučuju",
            paragraphs: [
              "U 2026. godini značajan broj kupaca postavlja pitanja veštačkoj inteligenciji: „Ko radi dobar redizajn u Beogradu?“ ili „Preporuči mi pouzdanu firmu za...“. Ako vaš sajt ima zastarelu strukturu, pretrpan kod bez semantičkih HTML tagova i Schema.org podataka, AI modeli ga ne mogu pročitati niti citirati kao verodostojan izvor (AEO i GEO optimizacija).",
            ],
          },
          {
            heading: "03. Mobilno iskustvo je samo „smanjeni desktop”",
            paragraphs: [
              "Preko 70% poseta lokalnim i uslužnim sajtovima dolazi sa pametnih telefona. Ako posetilac mora da zumira tekst, dugmad su preblizu jedna drugoj, a navigacija je spora ili se zaglavljuje, gubite većinu publike pre nego što uopšte pročitaju prvu rečenicu.",
            ],
          },
          {
            heading: "04. Sajt se sporo učitava i pada na Core Web Vitals testovima",
            paragraphs: [
              "Svaka sekunda čekanja duže od 2.5 sekunde smanjuje šansu za upit za više od 20%. Zastarele skripte, prevelike fotografije i pretrpan kod obaraju pozicije na Google-u. Redizajn podrazumeva prelazak na moderne formate slika (WebP), čišćenje nepotrebnog JavaScript-a i postizanje visokih ocena performansi.",
              "Često je usko grlo i zastarela hosting infrastruktura. Ako tokom redizajna migrirate sajt, preporučujemo prelazak na optimizovan NVMe Cloud hosting sa LiteSpeed podrškom. Kroz NMark Designs partnerski program možete iskoristiti 20% popusta na Hostinger hosting planove.",
            ],
            list: [
              "Preporuka za brzu infrastrukturu: Hostinger Cloud i WordPress hosting planovi obezbeđuju NVMe skladište i automatsko keširanje.",
            ],
          },
          {
            heading: "05. WordPress je pretrpan sa 30+ dodataka i page builder-om koji stalno puca",
            paragraphs: [
              "Ako je sajt zidan pomoću teških vizuelnih graditelja (poput starih verzija Elementora ili WPBakery-ja), svako ažuriranje dodataka nosi rizik da se raspadne izgled stranice. Savremeni redizajn čisti tehnički dug: bilo prelaskom na brzi namenski Next.js ili na čist WordPress sa blokovima bez viška koda.",
            ],
          },
          {
            heading: "06. Vaša stvarna ponuda i cene su prerasle postojeći sajt",
            paragraphs: [
              "Vaš biznis se razvio, dodali ste nove usluge ili promenili način rada, a sajt i dalje prikazuje informacije od pre nekoliko godina. Kada klijent u razgovoru čuje jedno, a na sajtu vidi drugo, gubi se poverenje. Sajt mora precizno da prati vaš trenutni nivo poslovanja.",
            ],
          },
          {
            heading: "07. Kontakt forma i putanja naručivanja stvaraju nepotrebno trenje",
            paragraphs: [
              "Previše obaveznih polja u formi, zbunjujući CAPTCHA zadaci koji frustriraju korisnike ili nepregledan checkout proces na web prodavnici direktno ubijaju prodaju. Savremeni sajt traži samo neophodne podatke i omogućava brzi kontakt preko telefona, forme ili WhatsApp-a.",
            ],
          },
          {
            heading: "08. Konkurencija deluje znatno modernije i profesionalnije",
            paragraphs: [
              "Kada potencijalni kupac otvori vaš sajt i sajtove tri konkurentske firme u tabovima pretraživača, prvi utisak se formira za manje od 3 sekunde. Zastareo dizajn, mutne slike i prenatrpan tekst stvaraju utisak da je firma pasivna ili neozbiljna, čak i kada imate bolji kvalitet rada.",
            ],
          },
          {
            heading: "09. Nemate kontrolu nad sadržajem i zavisite od spoljnih izmena",
            paragraphs: [
              "Ako za promenu jednog broja telefona, cene ili slike morate danima da čekate programera jer je sajt zakrpljen komplikovanim kodom, to je znak loše arhitekture. Dobar redizajn vam omogućava da osnovne stvari menjate sami, brzo i bez rizika da nešto pokvarite.",
            ],
          },
          {
            heading: "10. Sigurnosni rizici i nedostatak osnovne tehničke zaštite",
            paragraphs: [
              "Stare verzije PHP-a, neažurirane teme, nedostatak SSL sertifikata i sigurnosnih zaglavlja čine sajt lakom metom za spamere i viruse. Pored toga, moderni pretraživači označavaju nesigurne sajtove upozorenjem koje odmah tera posetioce.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Kako pripremiti redizajn da ne izgubite postojeće SEO pozicije?",
    paragraphs: [
      "Najveći strah vlasnika sajtova koji već imaju određeni organski saobraćaj jeste da će redizajn uništiti njihovo rangiranje na Google-u. Ovaj rizik je stvaran ako se redizajn radi nestručno — na primer, ako se promene URL adrese bez odgovarajućih 301 preusmerenja ili obriše tekst koji je nosio pozicije.",
      "Profesionalni redizajn podrazumeva jasnu mapu migracije: popis svih postojećih rangiranih stranica, zadržavanje ili pažljivo preusmeravanje URL strukture, očuvanje meta podataka i postavljanje čistog semantičkog koda koji Google i AI lakše razumeju.",
    ],
    blocks: [
      {
        type: "checklist",
        items: [
          "Popis postojećih stranica koje donose organske posete pre bilo kakvih izmena",
          "Kreiranje 301 redirect mape za svaki URL koji menja svoju putanju",
          "Očuvanje dokazanih naslova (H1/H2) i ključnih poruka koje već dobro rade",
          "Instalacija i provera Google Analytics 4 i Google Search Console koda pre i posle objave",
          "Validacija Core Web Vitals metrika pre puštanja novog dizajna u rad",
        ],
      },
      {
        type: "linkList",
        title: "Korisni alati i resursi za planiranje redizajna",
        items: [
          {
            label: "NMark Designs cenovnik — paketi izrade i redizajna od 400 €",
            href: "/sr/cenovnik/#additional-services",
          },
          {
            label: "Hostinger — pouzdan NVMe i WordPress hosting uz 20% popusta",
            href: "https://www.hostinger.com?REFERRALCODE=JIPMARKOVUSK",
          },
          {
            label: "Google PageSpeed Insights — proverite brzinu svog trenutnog sajta",
            href: "https://pagespeed.web.dev/",
          },
          {
            label: "Google Search Central — smernice za redizajn i migraciju sajtova",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        ],
      },
    ],
  },
  {
    heading: "Najčešća pitanja o redizajnu web sajta",
    paragraphs: [],
    blocks: [
      {
        type: "faq",
        items: [
          {
            question: "Koliko traje proces redizajna web sajta?",
            answer:
              "Za standardni poslovni sajt od 5 do 8 stranica, profesionalni redizajn obično traje između 2 i 4 nedelje. Vreme zavisi od pripremljenosti materijala, novih tekstova i potrebnih integracija.",
          },
          {
            question: "Koliko košta redizajn sajta u 2026. godini?",
            answer:
              "Cena redizajna u NMark Designs studiju kreće od 400 € za vizuelno i strukturno osveženje postojećeg sajta. Za složenije projekte sa kompletnom migracijom baze, WooCommerce prodavnicom ili custom Next.js aplikacijom, cena se formira na osnovu specifikacije.",
          },
          {
            question: "Da li će moj sajt biti nedostupan dok traje izrada novog dizajna?",
            answer:
              "Ne. Kompletan rad na novom dizajnu i razvoju odvija se na privremenom razvojnom serveru. Vaš postojeći sajt nesmetano radi za klijente sve do trenutka konačnog prebacivanja, koje traje svega nekoliko minuta.",
          },
          {
            question: "Šta klijent treba da pripremi pre početka redizajna?",
            answer:
              "Najvažnije je da definišete šta na trenutnom sajtu ne valja (zašto klijenti odustaju) i koje nove usluge ili poruke želite da istaknete. Sve ostalo — analizu konkurencije, strukturu, dizajn i tehničku implementaciju — vodimo zajedno.",
          },
        ],
      },
    ],
  },
  {
    heading: "Zaključak: Sajt treba da radi za vaš biznis, a ne obrnuto",
    paragraphs: [
      "Sajt koji je napravljen pre 4 ili 5 godina građen je za drugačiji internet. Danas posetioci očekuju trenutno učitavanje na telefonima, besprekornu jasnoću i transparentne informacije, dok pretraživači i AI servisi nagrađuju samo sajtove sa čistom semantikom i stvarnom vrednošću.",
      "Ako prepoznajete da vaš trenutni sajt više ne predstavlja nivo vašeg rada, nemojte čekati da posetioci odu konkurenciji. Redizajn je jedna od najisplativijih investicija jer koristi već postojeći brend i saobraćaj, pretvarajući ih u konkretne upite.",
    ],
  },
];

const sectionsEn: readonly BlogSection[] = [
  {
    heading: "When does a website truly need a redesign versus a visual facelift?",
    paragraphs: [
      "Many business owners delay a website redesign thinking it is merely an aesthetic update — changing colors, a logo, or typography. However, in 2026 visual style is only the surface. If your site looks acceptable on a desktop screen but fails to convert visitors into inquiries, stumbles on mobile devices, or gets overlooked by modern AI search engines, it is not serving its core purpose.",
      "A strategic redesign does not attempt to paint over dysfunctional architecture. Instead, it rethinks page flow, mobile responsiveness, Core Web Vitals speed, clarity of value proposition, and user journeys. Before spending money, it is essential to identify concrete signals that prove your current website has become a bottleneck to business growth.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Comparing a surface-level facelift with a strategic website redesign in 2026.",
        columns: ["Criterion", "Visual Facelift", "Strategic Redesign"],
        rows: [
          [
            "Primary objective",
            "Updated colors, modern typography and fresh imagery",
            "Increased inquiries, faster load speed, SEO and AI visibility",
          ],
          [
            "Content architecture",
            "Keeps the existing page structure and confusing navigation",
            "Restructures pages around real user queries and purchase intent",
          ],
          [
            "Technical foundation",
            "Retains old bloated themes, plugins, and technical debt",
            "Cleans codebase, optimizes Core Web Vitals, implements semantics",
          ],
          [
            "AI & search readiness",
            "AI agents struggle to parse outdated markup",
            "Structured with Schema.org data and direct answers (GEO/AEO)",
          ],
          [
            "When to choose",
            "When conversion is high but visuals look outdated",
            "When inquiries decline, pages load slowly, or services changed",
          ],
        ],
      },
    ],
  },
  {
    heading: "10 clear signs it is time to redesign your business website",
    paragraphs: [
      "If your business website exhibits three or more of the following indicators, it is time to plan a redesign. Each of these directly costs you leads, sales, and search ranking momentum.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "01. You have traffic, but no customer inquiries (Conversion blindness)",
            paragraphs: [
              "Analytics show people are arriving at your site, but the phone doesn't ring and your contact form remains quiet. This is the clearest indicator that visitors do not quickly understand what you do, why they should trust you, or what action to take next. Confusing visual hierarchy drives potential customers to your competitors.",
            ],
          },
          {
            heading: "02. AI search tools (ChatGPT, Perplexity, Google AI) overlook your site",
            paragraphs: [
              "In 2026, potential clients regularly ask AI assistants for business recommendations: 'Who provides dependable web design in Belgrade?' or 'Recommend a reliable service for...'. If your site runs on outdated, messy markup lacking semantic HTML and Schema.org data, AI engines cannot reliably quote or cite you as a trusted authority (AEO and GEO).",
            ],
          },
          {
            heading: "03. The mobile experience is just a shrunken desktop site",
            paragraphs: [
              "Over 70% of visits to local business websites happen on smartphones. If users have to pinch-to-zoom, tap minuscule buttons placed too close together, or struggle through laggy menus, you are losing prospects before they read a single paragraph.",
            ],
          },
          {
            heading: "04. Slow page speed and failing Core Web Vitals scores",
            paragraphs: [
              "Every second of delay beyond 2.5 seconds degrades conversion rates by over 20%. Bulky legacy scripts, uncompressed images, and outdated builders hurt Google rankings. A proper redesign deploys modern image formats (WebP), prunes unnecessary JavaScript, and achieves green Core Web Vitals scores.",
              "Often, the bottleneck stems from an antiquated hosting environment. When migrating your website during a redesign, we recommend switching to an optimized NVMe Cloud hosting stack with LiteSpeed caching. You can take advantage of 20% off Hostinger plans through our partner link.",
            ],
            list: [
              "Recommended infrastructure: Hostinger Cloud and WordPress hosting plans deliver NVMe performance, automatic caching, and high reliability.",
            ],
          },
          {
            heading: "05. WordPress is overloaded with 30+ plugins and a brittle page builder",
            paragraphs: [
              "When a site relies on heavy legacy builders (like old Elementor setups or WPBakery), every plugin update risks breaking styling and introduces security vulnerabilities. A modern redesign removes technical bloat, moving to lean Next.js code or clean, native block-based WordPress.",
            ],
          },
          {
            heading: "06. Your real-world offerings and prices have outgrown the website",
            paragraphs: [
              "Your company has matured, added high-margin services, or adjusted pricing, yet the website still displays packages from four years ago. When what you explain on a phone call contradicts what prospects see online, trust erodes immediately.",
            ],
          },
          {
            heading: "07. Friction in contact forms and purchasing workflows",
            paragraphs: [
              "Demanding too many form fields, using outdated CAPTCHA puzzles that frustrate visitors, or offering an unguided checkout process kills transactions. A modern redesign reduces friction, making inquiry submission or direct communication seamless.",
            ],
          },
          {
            heading: "08. Competitors look significantly more professional and modern",
            paragraphs: [
              "When a prospect opens your website alongside three competing firms, initial judgment takes less than three seconds. Dated styling, fuzzy graphics, and walls of text convey a business that may be sluggish or careless, even if your actual craftsmanship is superior.",
            ],
          },
          {
            heading: "09. You cannot update simple text without hiring a developer",
            paragraphs: [
              "If updating a single phone number, image, or pricing bullet requires a developer because the template is held together with custom patches, your architecture is broken. A well-designed website gives you straightforward control over everyday content changes.",
            ],
          },
          {
            heading: "10. Security alerts and outdated software dependencies",
            paragraphs: [
              "Legacy PHP versions, neglected themes, missing SSL configurations, and missing security headers expose websites to malware and automated spam. Modern web browsers warn visitors away from unsecured sites, destroying credibility on entry.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "How to redesign without sacrificing your existing Google SEO rankings",
    paragraphs: [
      "The greatest fear business owners have when considering a redesign is losing existing search traffic. That risk is genuine if a redesign is executed carelessly — such as changing URL slugs without 301 redirects or deleting high-ranking informational copy.",
      "A disciplined redesign incorporates an explicit migration roadmap: cataloging every indexed URL, establishing exact 301 redirects for any modified paths, preserving proven title and heading tags, and implementing semantic HTML that search crawlers parse effortlessly.",
    ],
    blocks: [
      {
        type: "checklist",
        items: [
          "Audit and inventory all currently ranking URLs before writing new code",
          "Create a comprehensive 301 redirect map for any altered slug or path",
          "Preserve proven heading hierarchy and key value propositions that already drive traffic",
          "Verify Google Analytics 4 and Google Search Console tags before and after launch",
          "Validate mobile responsiveness and Core Web Vitals before domain DNS cutover",
        ],
      },
      {
        type: "linkList",
        title: "Helpful tools and resources for redesign planning",
        items: [
          {
            label: "NMark Designs pricing — website redesign packages starting from €400",
            href: "/en/pricing/#additional-services",
          },
          {
            label: "Hostinger — reliable NVMe Cloud & WordPress hosting (20% off)",
            href: "https://www.hostinger.com?REFERRALCODE=JIPMARKOVUSK",
          },
          {
            label: "Google PageSpeed Insights — test your current site's speed",
            href: "https://pagespeed.web.dev/",
          },
          {
            label: "Google Search Central — website migration and redesign guidelines",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        ],
      },
    ],
  },
  {
    heading: "Frequently asked questions about website redesign",
    paragraphs: [],
    blocks: [
      {
        type: "faq",
        items: [
          {
            question: "How long does a website redesign typically take?",
            answer:
              "For a standard 5 to 8-page business website, a professional redesign typically takes 2 to 4 weeks. Timeline depends on content readiness, photography, and required integrations.",
          },
          {
            question: "How much does a website redesign cost in 2026?",
            answer:
              "At NMark Designs, website redesign packages start from €400 for structural and visual modernizations. More elaborate projects involving database migrations, e-commerce re-platforming, or custom Next.js applications are quoted based on specific scope.",
          },
          {
            question: "Will my current site go down while the new design is being built?",
            answer:
              "No. All design and development work takes place on a private staging environment. Your live website remains fully functional for customers until the final launch, which takes only minutes.",
          },
          {
            question: "What should a business prepare before initiating a redesign?",
            answer:
              "The most helpful starting point is defining what currently fails on your website (why prospects abandon it) and what new offerings or positioning you need to present. Strategy, page hierarchy, copywriting, and technical development are handled collaboratively.",
          },
        ],
      },
    ],
  },
  {
    heading: "Conclusion: Your website should generate business, not excuses",
    paragraphs: [
      "A website created four or five years ago was built for a different digital landscape. Today's visitors expect near-instant mobile load times, intuitive clarity, and straightforward answers, while search algorithms and AI engines prioritize well-structured, fast, and authentic content.",
      "If you recognize that your current website no longer matches the caliber of your services, do not wait for potential clients to choose a competitor. A strategic redesign is among the highest-ROI investments you can make because it converts your existing brand reputation and traffic into real business inquiries.",
    ],
  },
];

export const redesignSigns2026: Editorial = {
  image: "/blog/redesign-signs-2026-cover.webp",
  heroBackground: {
    image: "/blog/hero/redesign-signs-2026-bg.webp",
    width: 1920,
    height: 820,
    position: "center",
  },
  width: 1600,
  height: 1000,
  alt: {
    sr: "Ilustracija 10 znakova za redizajn sajta: analiza performansi, mobilni prikaz, konverzija i pretraga.",
    en: "Illustration of 10 website redesign signs: performance audits, mobile UX, conversion optimization, and search readiness.",
  },
  caption: {
    sr: "Prepoznavanje ključnih znakova za redizajn pre nego što zastareli sajt počne da košta vaš biznis upita i pozicija.",
    en: "Recognizing key website redesign signals before an outdated site costs your business leads and search visibility.",
  },
  topic: {
    sr: "Redizajn web sajta",
    en: "Website Redesign",
  },
  answer: {
    sr: "Najvažniji znakovi da je vreme za redizajn sajta u 2026. jesu izostanak upita uprkos posetama, loše mobilno iskustvo, pad na Core Web Vitals testovima brzine, pretrpan WordPress sa starim dodacima i nevidljivost za AI pretraživače (ChatGPT, Perplexity). Pravi redizajn ne menja samo boje, već reorganizuje sadržaj i čisti tehnički dug kako bi sajt počeo aktivno da donosi klijente.",
    en: "The primary signs that it is time for a website redesign in 2026 are declining inquiries despite steady traffic, poor mobile usability, failing Core Web Vitals speed tests, bloated WordPress installations, and invisibility to AI search tools (ChatGPT, Perplexity). A true redesign does not simply refresh styling; it restructures content and eliminates technical debt to convert traffic into real business.",
  },
  sections: {
    sr: sectionsSr,
    en: sectionsEn,
  },
  sources: [
    {
      label: "Google Search Central — Site Moves and Redesigns",
      href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
    },
    {
      label: "Google Search Central — Core Web Vitals Guidance",
      href: "https://developers.google.com/search/docs/appearance/core-web-vitals",
    },
    {
      label: "Hostinger — Fast WordPress and Cloud Infrastructure (Partner)",
      href: "https://www.hostinger.com?REFERRALCODE=JIPMARKOVUSK",
    },
    {
      label: "Google Search Central — Creating Helpful, Reliable Content",
      href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    },
    {
      label: "W3C Web Accessibility Initiative — Mobile Accessibility Principles",
      href: "https://www.w3.org/WAI/standards-guidelines/mobile/",
    },
  ],
  cta: {
    sr: {
      title: "Da li je vreme za redizajn vašeg sajta?",
      description:
        "Pošaljite nam link vašeg trenutnog sajta. NMark Designs tim će uraditi analizu ključnih nedostataka i predložiti konkretne korake za modernizaciju i povećanje broja upita.",
      label: "Zatražite besplatnu procenu sajta",
    },
    en: {
      title: "Is it time to redesign your website?",
      description:
        "Send us your current website URL. The NMark Designs team will analyze key bottlenecks and recommend actionable steps to modernize your site and boost customer inquiries.",
      label: "Request a website audit",
    },
  },
};
