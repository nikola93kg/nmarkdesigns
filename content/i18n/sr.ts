import type { Dictionary } from "./types";

const sr = {
  navigation: {
    home: "Početna", portfolio: "Portfolio", services: "Usluge",
    blog: "Blog", about: "O nama", contact: "Kontakt", pricing: "Cenovnik",
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
    label: "NMarkDesigns podnožje",
    socialLabel: "NMarkDesigns na društvenim mrežama",
    portfolioLabel: "Portfolio / Projekti",
    description: "Profesionalna izrada web sajtova za male biznise, frilensere i lokalne brendove. Fokus na modernom dizajnu, brzini i osnovnoj SEO optimizaciji kako bi vaš sajt zaista radio za vas.",
    quickLinks: "Brzi linkovi",
    contact: "Kontakt",
    copyright: "Sva prava zadržana",
  },
  portfolio: {
    metadata: {
      title: "Portfolio - odabrani web projekti",
      description: "Istražite web sajtove iz NMark Designs portfolija: prikaze projekata, podatke o klijentima i korišćenim alatima, uz linkove ka njihovim sajtovima.",
    },
    intro: {
      eyebrow: "Odabrani projekti",
      title: "Portfolio",
      description: "Web sajtovi za različite delatnosti i različite potrebe. Svaki projekat odražava naš pristup dizajnu i individualne potrebe klijenta.",
    },
    allProjects: "Svi projekti",
    defaultCategory: "Web sajt",
    contentNeeded: {
      category: "Kategoriju treba naknadno uneti.",
      description: "Opis projekta treba naknadno uneti.",
      screenshot: "Screenshot projekta treba naknadno uneti.",
      website: "URL sajta treba naknadno uneti.",
    },
    contactTitle: "Razgovarajmo o vašem sajtu.",
    visitWebsite: "Posetite web sajt",
  },
  blog: {
    metadata: {
      title: "Blog - saveti za web sajtove lokalnih biznisa",
      description: "Korisni članci o tome kako lokalni biznisi mogu da unaprede web sajt, mobilno iskustvo, SEO osnovu i broj upita bez nerealnih obećanja.",
    },
    intro: {
      eyebrow: "Blog",
      title: "Praktični saveti za web sajt koji donosi više upita",
      description: "Članci su namenjeni malim i lokalnim biznisima koji žele jasniji sajt, bolji mobilni prikaz i više poruka, poziva ili rezervacija.",
    },
    readArticle: "Pročitaj članak",
    readTime: "min čitanja",
    publishedOn: "Objavljeno",
    empty: "Novi članci uskoro.",
    cta: {
      eyebrow: "Besplatna procena sajta",
      title: "Pošaljite sajt i dobićete 3 konkretna predloga",
      description: "Ako želite brz i jasan sledeći korak, pošaljite URL sajta i javićemo šta prvo ima najveći uticaj na upite.",
      label: "Zatražite besplatnu procenu sajta",
    },
  },
  services: {
    metadata: {
      title: "Usluge izrade web sajtova i web dizajna",
      description: "NMark Designs usluge obuhvataju izradu web sajtova, web dizajn, razvoj, SEO osnovu, optimizaciju performansi, web prodavnice i održavanje.",
    },
    intro: {
      eyebrow: "Usluge",
      title: "Izrada web sajtova, dizajn i optimizacija",
      description: "Pomažemo malim biznisima, preduzetnicima, frilenserima i lokalnim brendovima da dobiju moderan, jasan i tehnički stabilan web sajt.",
    },
    overview: {
      eyebrow: "Šta radimo",
      title: "Usluge organizovane oko stvarnih potreba projekta",
      description: "Svaki projekat počinje pitanjem šta sajt treba da postigne, a zatim se oko toga oblikuju struktura, dizajn, razvoj i podrška.",
      items: [
        {
          id: "websites",
          title: "Izrada web sajtova",
          description: "Prezentacioni, poslovni i portfolio sajtovi koji jasno predstavljaju usluge, sadržaj i brend.",
        },
        {
          id: "design",
          title: "Web dizajn i korisničko iskustvo",
          description: "Vizuelna hijerarhija, raspored sadržaja i responsive dizajn koji posetiocima olakšavaju snalaženje.",
        },
        {
          id: "development",
          title: "Razvoj i tehnička implementacija",
          description: "Custom kod ili WordPress rešenja, u zavisnosti od strukture, sadržaja i načina održavanja sajta.",
        },
        {
          id: "optimization",
          title: "SEO osnova i performanse",
          description: "Semantička struktura, metadata, brzina, crawlability i tehnička osnova za bolju vidljivost bez lažnih obećanja.",
        },
        {
          id: "commerce",
          title: "Web prodavnice",
          description: "Online prodaja i e-commerce funkcionalnosti kada projekat zahteva katalog, proizvode ili plaćanje.",
        },
        {
          id: "maintenance",
          title: "Održavanje i podrška",
          description: "Ažuriranje sadržaja, tehnička podrška, sigurnosne provere i unapređenja nakon objave.",
        },
      ],
    },
    details: {
      eyebrow: "Detaljnije",
      title: "Šta svaka usluga znači u praksi",
      description: "Bez nepotrebnog žargona: najvažnije je da znate šta dobijate, kada vam je potrebno i kako pomaže vašem sajtu.",
      includeLabel: "Može da uključuje",
      items: [
        {
          id: "website-build",
          title: "Izrada web sajtova",
          description: "Kreiramo web sajtove koji predstavljaju usluge, radove, organizaciju ili proizvode na pregledan i profesionalan način.",
          when: "Ovo je pravi izbor kada vam je potreban novi sajt ili postojeći sajt više ne predstavlja dobro vaš biznis.",
          includes: [
            "strukturu stranica i sadržaja",
            "responsive prikaz za telefon, tablet i računar",
            "tehnički stabilnu implementaciju",
            "jasne kontakt i quote putanje",
          ],
        },
        {
          id: "design-ux",
          title: "Web dizajn i UX",
          description: "Dizajn ne posmatramo kao dekoraciju, već kao način da posetilac brzo razume ponudu i zna koji je sledeći korak.",
          when: "Posebno je važno kada imate sadržaj, ali stranica deluje nejasno, zastarelo ili ne vodi korisnika dovoljno dobro.",
          includes: [
            "vizuelnu hijerarhiju",
            "čist raspored sekcija",
            "usklađivanje sa identitetom brenda",
            "čitljivost i upotrebljivost na manjim ekranima",
          ],
        },
        {
          id: "development-options",
          title: "Razvoj web sajta",
          description: "Tehničko rešenje biramo prema projektu. Nekada je najbolji izbor WordPress, a nekada custom implementacija sa modernim frontend pristupom.",
          when: "Ovo je važno kada sajt treba da bude lak za održavanje, brz, proširiv ili prilagođen specifičnom načinu rada.",
          includes: [
            "WordPress ili custom pristup kada je opravdan",
            "čistu strukturu komponenti i stranica",
            "lokalizovane stranice gde su potrebne",
            "osnovu za dalje proširenje",
          ],
        },
        {
          id: "seo-performance",
          title: "SEO i optimizacija performansi",
          description: "Postavljamo tehničku osnovu koja pomaže pretraživačima i korisnicima: jasne stranice, metadata, interne linkove, brzinu i dobru strukturu.",
          when: "Potrebno je kada želite da sajt bude razumljiv, indeksabilan nakon launch-a i prijatan za korišćenje na različitim uređajima.",
          includes: [
            "localized title i description metadata",
            "canonical i hreflang osnovu",
            "sitemap i crawlability proveru",
            "optimizovane slike i performanse",
          ],
        },
        {
          id: "maintenance-support",
          title: "Održavanje i podrška",
          description: "Nakon objave, sajt često treba dopuniti, tehnički proveravati i postepeno unapređivati kako se menjaju potrebe biznisa.",
          when: "Korisno je ako želite dugoročnu stabilnost, redovna ažuriranja i podršku bez nepotrebnih komplikacija.",
          includes: [
            "ažuriranje sadržaja",
            "tehničku podršku",
            "sigurnosne provere",
            "postepena poboljšanja i optimizaciju",
          ],
        },
      ],
    },
    audience: {
      eyebrow: "Za koga je",
      title: "Za biznise kojima treba jasan i pouzdan online nastup",
      description: "Najčešće radimo sa klijentima kojima sajt treba da objasni uslugu, predstavi rad, olakša kontakt ili podrži prodaju.",
      items: [
        "mali biznisi i lokalni brendovi",
        "preduzetnici i frilenseri",
        "organizacije i škole",
        "uslužne delatnosti",
        "brendovi kojima treba redizajn ili modernizacija",
      ],
    },
    process: {
      eyebrow: "Proces",
      title: "Kako izgleda saradnja",
      description: "Proces ostaje jednostavan i razumljiv, ali dovoljno detaljan da se od početka zna šta pravimo i zašto.",
      items: [
        {
          id: "goals",
          title: "Upoznavanje i ciljevi",
          description: "Razumemo kome je sajt namenjen, šta treba da predstavi i koji su prioriteti projekta.",
        },
        {
          id: "content",
          title: "Struktura i sadržaj",
          description: "Organizujemo stranice, poruke i potrebne materijale tako da posetilac lako pronađe najvažnije informacije.",
        },
        {
          id: "design",
          title: "Dizajn",
          description: "Oblikujemo vizuelni pravac, hijerarhiju i responsive raspored u skladu sa brendom i ciljem sajta.",
        },
        {
          id: "build",
          title: "Razvoj",
          description: "Implementiramo sajt, povezujemo stranice i vodimo računa o stabilnoj tehničkoj osnovi.",
        },
        {
          id: "review",
          title: "Testiranje i optimizacija",
          description: "Proveravamo prikaz, linkove, osnovnu pristupačnost, metadata, performanse i ponašanje na različitim ekranima.",
        },
        {
          id: "launch",
          title: "Objava i podrška",
          description: "Pripremamo sajt za objavu i definišemo šta se održava ili unapređuje nakon launch-a.",
        },
      ],
    },
    principles: {
      eyebrow: "Standard rada",
      title: "Šta razmatramo tokom svakog projekta",
      description: "Ovo nisu dekorativne stavke, već praktični kriterijumi koji utiču na to koliko je sajt koristan, brz i održiv.",
      items: [
        {
          id: "responsive",
          title: "Responsive dizajn",
          description: "Sajt mora biti čitljiv i upotrebljiv na telefonu, tabletu, laptopu i većim ekranima.",
        },
        {
          id: "structure",
          title: "Jasna struktura",
          description: "Navigacija, naslovi, sekcije i interne veze treba da pomognu korisnicima i pretraživačima.",
        },
        {
          id: "performance",
          title: "Performanse",
          description: "Slike, kod i layout planiraju se tako da stranice ostanu brze i stabilne.",
        },
        {
          id: "maintainability",
          title: "Održavanje",
          description: "Sajt treba da može da se dopunjava i unapređuje bez nepotrebnog tehničkog haosa.",
        },
      ],
    },
    proof: {
      eyebrow: "Portfolio",
      title: "Pogledajte kako to izgleda u praksi",
      description: "Izabrani projekti pokazuju različite tipove sajtova, od poslovnih prezentacija do specifičnih uslužnih i prodajnih stranica.",
    },
    pricing: {
      eyebrow: "Budžet",
      title: "Želite okvirnu predstavu o ceni?",
      description: "Cenovnik daje početni okvir, a konačna procena zavisi od obima, sadržaja i funkcionalnosti projekta.",
      label: "Pogledajte cenovnik",
    },
    cta: {
      eyebrow: "Sledeći korak",
      title: "Imate projekat na umu?",
      description: "Kratko nam opišite šta vam je potrebno i možemo da razgovaramo o najboljem pristupu za vaš sajt.",
      label: "Zatražite ponudu",
    },
  },
  about: {
    metadata: {
      title: "O nama - Nikola Marković",
      description: "Upoznajte Nikolu Markovića, osnivača NMark Designs i frontend developera, i njegov pristup dizajnu, izradi i dugoročnom održavanju web sajtova.",
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
  contact: {
    metadata: {
      title: "Kontakt",
      description: "Razgovarajte sa NMark Designs o izradi ili održavanju sajta i zatražite ponudu. Kontaktirajte nas putem emaila, telefona ili WhatsApp-a.",
    },
    intro: {
      eyebrow: "Započnimo priču",
      title: "Kontaktirajte nas",
      description: "Imate pitanja o našim uslugama, želite da razgovaramo o saradnji ili vam je potrebna podrška oko održavanja sajta? Tu smo da pomognemo.",
    },
    details: {
      title: "Tu smo za vas",
      description: "Imate pitanje, ideju ili želite ponudu? Pozovite nas ili nam pišite.",
      email: "Email",
      phone: "Telefon",
      whatsapp: "Pišite na WhatsApp",
    },
    form: {
      title: "Zanima vas saradnja?",
      labels: { name: "Ime", email: "Email", phone: "Telefon", message: "Poruka" },
      optional: "opciono",
      required: "Obavezna polja su označena zvezdicom (*).",
      submit: "Pošaljite poruku",
      pending: "Obrada poruke…",
      unavailableNotice: "Slanje putem formulara trenutno nije dostupno. Kontaktirajte nas direktno putem emaila, telefona ili WhatsApp-a.",
      validation: {
        required: "Popunite ovo polje.",
        tooLong: "Unos prelazi dozvoljenu dužinu. Skratite tekst.",
        invalidValue: "Unesite ispravnu tekstualnu vrednost.",
        invalidEmail: "Unesite ispravnu email adresu.",
        invalidPhone: "Unesite ispravan broj telefona ili ostavite polje prazno.",
      },
      status: {
        invalid: "Proverite označena polja. Poruka nije poslata.",
        unavailable: "Poruka nije poslata. Slanje putem formulara još nije dostupno. Pišite nam direktno ili nas pozovite.",
        error: "Poruku nije moguće poslati. Pokušajte ponovo ili nas kontaktirajte direktno.",
        success: "Vaša poruka je prihvaćena za slanje.",
      },
    },
  },
  pricing: {
    metadata: {
      title: "Cenovnik izrade web sajtova",
      description: "Pogledajte okvirne NMark Designs pakete za izradu web sajta: Basic plan, Standard Plan i Premium plan. Cene zavise od složenosti i zahteva projekta.",
    },
    intro: {
      eyebrow: "Cene izrade sajta",
      title: "Pronađite plan koji vam odgovara",
      description: "Cene su okvirne i mogu varirati u zavisnosti od složenosti i specifičnih zahteva vašeg projekta. Iako su planovi podeljeni prema ponuđenim uslugama, konačna cena može biti i niža za jednostavnije projekte, bez obzira na odabrani paket.",
    },
    packageLabel: "Paket",
    packageFeaturesLabel: "Šta dobijate u ovom paketu:",
    packageCta: "Pošaljite upit",
    excludedLabel: "Nije uključeno",
    packages: {
      basic: {
        features: [
          "Vreme izrade do 15 dana",
          "Optimizacija web sajta",
          "Izrada do 5 stranica",
          "Kreiranje bloga",
          "Osnovna SEO optimizacija",
          "Kreiranje sadržaja",
          "Responsive dizajn",
        ],
        excluded: ["Razvoj web prodavnice"],
      },
      standard: {
        features: [
          "Vreme izrade do 20 dana",
          "Optimizacija web sajta",
          "Podrška za više jezika",
          "Kreiranje bloga",
          "Obrada slika: do 20 slika",
          "Osnovna SEO optimizacija",
          "Kreiranje sadržaja",
          "Responsive dizajn",
        ],
        excluded: ["Razvoj web prodavnice"],
      },
      premium: {
        features: [
          "Period izrade do 30 dana",
          "Optimizacija web sajta",
          "Podrška za više jezika",
          "Napredna SEO optimizacija",
          "Automatizovan sistem plaćanja (PayPal, Stripe, itd...)",
          "Održavanje web sajta",
          "Personalizovani dizajn sa custom funkcionalnostima",
          "Responsive dizajn",
          "Razvoj web prodavnice",
          "Napredna analitika i izveštaji",
        ],
      },
    },
    notes: {
      title: "Važne napomene",
      items: [
        "Rokovi teku od trenutka kada klijent dostavi sav neophodan materijal.",
        "Troškovi domena i hostinga nisu uključeni u cenu izrade sajta i plaćaju se posebno prema specifikaciji izabranog paketa.",
        "Avansno plaćanje od 50% nije refundabilno u slučaju raskida saradnje.",
      ],
    },
    cta: {
      title: "Niste sigurni koji paket odgovara vašem projektu?",
      description: "Pošaljite nam kratku poruku i zajedno ćemo proći kroz potrebe sajta.",
      label: "Kontaktirajte nas",
    },
    faq: {
      eyebrow: "Centar za pomoć",
      title: "Najčešća pitanja o cenama",
      description: "Odgovori na pitanja o okvirnim cenama, rokovima, plaćanju, domenu i hostingu.",
      items: [
        {
          id: "price-flexibility",
          question: "Da li su navedene cene fiksne?",
          paragraphs: ["Svaki projekat je jedinstven, pa se cene mogu menjati u zavisnosti od složenosti i vaših potreba. Ako je vaš projekat jednostavniji, konačna cena može biti niža od one navedene u paketima."],
        },
        {
          id: "timeline",
          question: "Koliko traje izrada sajta?",
          paragraphs: ["Vreme izrade sajta zavisi od obima posla i njegove strukture. Basic plan predviđa izradu u roku do 15 dana, ali u zavisnosti od složenosti, sajt može biti završen i ranije. Standard plan obuhvata rok do 20 dana, dok je za Premium plan predviđen period do 30 dana. Rokovi teku od trenutka kada klijent dostavi sav neophodan materijal."],
        },
        {
          id: "payment",
          question: "Kako funkcioniše plaćanje?",
          paragraphs: ["Plaćanje se vrši u dve faze, pri čemu klijent unapred uplaćuje 50% iznosa pre početka rada, dok se preostalih 50% plaća po završetku projekta, pre same predaje sajta. Za redovno održavanje sajta, plaćanje može biti organizovano na mesečnom, kvartalnom ili godišnjem nivou, u skladu s prethodnim dogovorom."],
        },
        {
          id: "domain-hosting",
          question: "Da li cena uključuje troškove domena i hostinga?",
          paragraphs: ["Kupovinu i registraciju domena i hostinga obavlja NMark Designs, čime se klijentima olakšava ceo proces. Troškovi ovih usluga nisu uključeni u cenu izrade sajta, jer zavise od tipa i namene projekta. Nakon zajedničkog odabira odgovarajućeg rešenja, klijent ih plaća posebno, direktno prema specifikaciji izabranog paketa."],
        },
        {
          id: "cancellation",
          question: "Šta se dešava ako želim da prekinem saradnju tokom izrade sajta?",
          paragraphs: ["U slučaju raskida saradnje, avansno plaćanje od 50% nije refundabilno, a ukoliko klijent ne isplati preostali deo dogovorene sume, NMark Designs zadržava pravo da obustavi rad ili ugasi sajt dok obaveza ne bude u potpunosti izmirena."],
        },
      ],
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
      title: "Izrada web sajtova i web dizajn",
      description: "NMark Designs kreira moderne, brze i responsive web sajtove za male biznise, preduzetnike i brendove, uz web dizajn, razvoj, SEO optimizaciju i održavanje.",
    },
    hero: {
      eyebrow: "WEB DIZAJN · RAZVOJ · SEO",
      title: "Izrada modernih web sajtova",
      subtitle: "Dizajn. Performanse. SEO.",
      description: "Kreiramo brze, responzivne i SEO optimizovane web sajtove sa fokusom na moderan dizajn, korisničko iskustvo i kvalitetnu tehničku osnovu.",
      primaryAction: "Zatražite ponudu",
      secondaryAction: "Pogledajte projekte",
      imageAlt: "Vizuelna montaža NMark Designs web projekta na telefonu, tabletu i štampanim maketama.",
    },
    projects: {
      eyebrow: "Odabrani projekti",
      title: "Projekti koji oblikuju naš pristup dizajnu i razvoju",
      description: "Stvarni web sajtovi za različite delatnosti, izabrani zbog načina na koji spajaju jasnu strukturu, vizuelni identitet i tehničku osnovu.",
    },
    services: {
      eyebrow: "Vaša online prisutnost zaslužuje više",
      title: "Moderni sajtovi.\nPromišljen pristup.",
      description: "Od dizajna i SEO optimizacije do prilagođavanja različitim uređajima i redovnog održavanja.",
      imageAlt: "Web sajt Mađioničar Bojan prikazan na laptopu, uz šolju kafe na radnom stolu.",
      detailsAction: "Pogledajte sve usluge",
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
