import type { Editorial } from "@/content/blog-editorial";

const priceRows = [
  ["Landing page", "250-900 EUR", "1-2 nedelje", "kampanja, jedna usluga, prikupljanje upita"],
  ["Osnovni poslovni sajt", "500-1.500 EUR", "oko 3-6 nedelja", "mali biznisi i uslužne delatnosti"],
  ["Napredni poslovni sajt", "1.200-3.000+ EUR", "oko 4-8+ nedelja", "custom UX, sadržaj, jezici, integracije"],
  ["Internet prodavnica", "900-4.000+ EUR", "oko 6-12+ nedelja", "online prodaja i katalog proizvoda"],
  ["Custom web aplikacija", "od oko 2.000 EUR", "meseci, prema obimu", "portali, dashboardi, SaaS, interni alati"],
] as const;

const faqSr = [
  ["Koliko košta izrada web sajta u Srbiji 2026?", "Na osnovu javno dostupnih ponuda i vodiča iz 2025-2026, profesionalni rasponi najčešće kreću od oko 250-900 EUR za landing page, 500-1.500 EUR za osnovni poslovni sajt, 900-4.000+ EUR za standardnu internet prodavnicu i od oko 2.000 EUR za jednostavnije custom web aplikacije. To su budžetski okviri, ne zvanični proseci."],
  ["Koliko košta jednostavan poslovni sajt?", "Jednostavan poslovni sajt najčešće se planira u okviru od oko 500 do 1.500 EUR, ako uključuje početnu, o nama, usluge, reference ili portfolio i kontakt. Cena raste kada se dodaju custom dizajn, više tipova stranica, CMS, SEO struktura, više jezika ili priprema sadržaja."],
  ["Koliko košta WordPress sajt?", "Cena WordPress sajta zavisi od toga da li se koristi gotova tema, ozbiljno prilagođena tema ili dizajn po meri. U javnim ponudama za Srbiju profesionalni WordPress poslovni sajtovi često kreću od oko 500 EUR, dok veći i višejezični sajtovi idu znatno više."],
  ["Koliko košta internet prodavnica?", "Manja WooCommerce prodavnica može krenuti od oko 900-1.500 EUR, dok standardne profesionalne prodavnice često ulaze u raspon od 1.500 do 4.000 EUR. Veće prodavnice sa integracijama, automatizacijom i velikim katalogom mogu ići 4.000-8.000+ EUR."],
  ["Da li je 1.000 EUR mnogo za internet prodavnicu?", "Za mali shop sa ograničenim brojem proizvoda i osnovnim checkoutom, 1.000 EUR može biti realna cena. Za prodavnicu sa custom dizajnom, kartičnim plaćanjem, kuririma, naprednim filterima, SEO strukturom i većim katalogom, to je često donji deo budžeta."],
  ["Zašto jedan sajt košta 300 EUR, a drugi 3.000 EUR?", "Zato što reč sajt može značiti gotov šablon sa nekoliko izmena, ali i custom dizajn, strategiju sadržaja, CMS, SEO arhitekturu, integracije, testiranje i podršku. Cena ima smisla tek kada znate šta tačno ulazi u obim."],
  ["Koliko traje izrada sajta?", "Landing page često traje 1-2 nedelje, osnovni poslovni sajt oko 3-6 nedelja, a napredniji poslovni sajt ili web shop 6-12+ nedelja. Rok zavisi od pripremljenog sadržaja, broja odluka, integracija i brzine povratnih informacija."],
  ["Da li se domen i hosting plaćaju posebno?", "Često da. Neki paketi uključuju prvu godinu domena ili hostinga, ali vlasnik sajta treba da zna ko je registrant, gde se nalazi hosting i koliki su troškovi obnove. Domen i hosting su obično godišnje ili mesečne stavke."],
  ["Koliko košta održavanje sajta?", "Održavanje može biti vrlo malo za statičan sajt bez čestih izmena, ali WordPress, WooCommerce i sajtovi sa integracijama često traže mesečnu podršku. U javnim ponudama održavanje može krenuti od malih retainer paketa i preći 100 EUR mesečno kada uključuje ažuriranja, backup, bezbednost i izmene."],
  ["Da li je WordPress dovoljan za poslovni sajt?", "Za mnoge poslovne sajtove, blogove i manje ili srednje WooCommerce prodavnice WordPress je sasvim razuman izbor, posebno kada vlasnik želi da sam menja sadržaj. Nije idealan za svaki custom workflow, ali nije ni zastareo sam po sebi."],
  ["WordPress ili custom sajt?", "WordPress se više isplati kada je važan CMS, brz ulazak u sadržaj i razuman budžet. Custom razvoj ima smisla kada projekat traži specifičnu funkcionalnost, kompleksne integracije, aplikacijsko ponašanje ili arhitekturu koju gotov sistem otežava."],
  ["Freelancer ili agencija?", "Freelancer može biti odličan izbor za manji, jasno definisan projekat i direktnu komunikaciju. Agencija ili studio ima više smisla kada treba koordinisati dizajn, razvoj, SEO, sadržaj, integracije i dugoročnu podršku."],
  ["Da li mogu sam da menjam sadržaj?", "Možete ako je u cenu uključen CMS ili dogovorena administracija sadržaja. To treba pitati pre početka: koje delove možete menjati, da li dobijate obuku i šta se dešava ako želite novi tip stranice."],
  ["Da li SEO ulazi u cenu izrade?", "Nekad da, ali SEO može značiti mnogo toga. Pitajte da li ponuda uključuje istraživanje strukture, title i meta opise, kanonikale, sitemap, indeksiranje, internu povezanost, brzinu, schema markup i osnovnu Search Console postavku."],
  ["Ko je vlasnik sajta nakon izrade?", "To mora da piše u ponudi ili ugovoru. Pitajte ko je vlasnik domena, ko ima pristup hostingu, da li dobijate fajlove ili source code, koje licence su vaše i da li možete promeniti hosting ili developera."],
] as const;

const faqEn = [
  ["How much does website development cost in Serbia in 2026?", "Public Serbian offers and guides from 2025-2026 suggest rough budgeting ranges of about EUR 250-900 for a landing page, EUR 500-1,500 for a basic business website, EUR 900-4,000+ for a standard online store, and from about EUR 2,000 upward for simpler custom web applications. These are not official averages."],
  ["How much does a simple business website cost?", "A simple business website is often budgeted around EUR 500-1,500 when it includes home, about, services, references or portfolio, and contact pages. Custom design, CMS, SEO structure, languages, and content preparation move the budget upward."],
  ["How much does a WordPress website cost?", "A WordPress website can mean a lightly customized template or a custom designed business site. Public Serbian offers often place professional WordPress business sites from around EUR 500 upward, while larger multilingual builds cost more."],
  ["How much does an online store cost?", "A small WooCommerce store may start around EUR 900-1,500. Standard professional stores commonly sit around EUR 1,500-4,000, while larger stores with integrations, automation, and extensive catalogs can reach EUR 4,000-8,000+."],
  ["Is EUR 1,000 a lot for an online store?", "For a small store with a limited catalog and basic checkout, EUR 1,000 can be realistic. For custom UX, card payments, delivery integrations, filters, SEO structure, and a larger catalog, it is often the lower end of the budget."],
  ["Why does one website cost EUR 300 and another EUR 3,000?", "Because website can mean a ready-made template with a few changes, or a custom build with content strategy, CMS, SEO architecture, integrations, testing, and support. The scope matters more than the label."],
  ["How long does website development take?", "A landing page may take 1-2 weeks, a basic business website roughly 3-6 weeks, and a more advanced business site or online store 6-12+ weeks. Content readiness and integrations often decide the timeline."],
  ["Are domain and hosting paid separately?", "Often yes. Some packages include the first year, but the owner should know who registered the domain, where hosting lives, and what renewals cost."],
  ["How much does website maintenance cost?", "Static sites may need little maintenance. WordPress, WooCommerce, and integrated sites often need monthly support, ranging from small retainers to EUR 100+ per month depending on backups, updates, security, and content changes."],
  ["Is WordPress enough for a business website?", "For many business sites, blogs, and small or medium WooCommerce stores, WordPress is a sensible choice, especially when the owner needs to edit content. It is not perfect for every custom workflow."],
  ["WordPress or custom website?", "WordPress usually makes sense when CMS, content work, and budget matter most. Custom development makes sense for specific functionality, complex integrations, application-like behavior, or architecture requirements."],
  ["Freelancer or agency?", "A freelancer can fit smaller, clearly scoped projects with direct communication. A studio or agency can fit projects that need coordinated design, development, SEO, content, integrations, and ongoing support."],
  ["Can I edit the content myself?", "Yes, if a CMS or content admin is included. Ask which parts are editable, whether training is included, and what happens when you need a new page type."],
  ["Is SEO included in website development?", "Sometimes, but SEO needs definition. Ask whether the offer includes structure, titles and descriptions, canonicals, sitemap, indexability, internal links, speed, schema, and Search Console setup."],
  ["Who owns the website after launch?", "That should be written in the offer or contract. Ask who owns the domain, who has hosting access, whether you receive source files, what licenses are yours, and whether you can change hosting or developer."],
] as const;

export const websitePricingSerbia2026 = {
  image: "/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026.webp",
  heroBackground: {
    image: "/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026.webp",
    width: 1672,
    height: 941,
    position: "center",
  },
  width: 1672,
  height: 941,
  alt: {
    sr: "Laptop na radnom stolu sa prikazom web sajta, pogledom na Beograd i novcem pored računara.",
    en: "Laptop displaying a website on a desk overlooking Belgrade, with money beside the computer.",
  },
  caption: {
    sr: "Cena sajta zavisi od obima: landing stranica, poslovni sajt, web shop i custom aplikacija nisu isti proizvod.",
    en: "Website cost depends on scope: a landing page, business site, online store, and custom app are not the same product.",
  },
  topic: {
    sr: "Cene izrade sajta",
    en: "Website pricing",
  },
  answer: {
    sr: "Izrada web sajta u Srbiji 2026. nema jednu zvaničnu prosečnu cenu. Na osnovu javno dostupnih domaćih ponuda i vodiča iz 2025-2026, korisni budžetski okviri su oko 250-900 EUR za landing page, 500-1.500 EUR za osnovni poslovni sajt, 1.200-3.000+ EUR za napredniji poslovni sajt, 900-4.000+ EUR za standardnu internet prodavnicu i od oko 2.000 EUR naviše za jednostavnije custom web aplikacije. To su orijentacioni rasponi, ne službeni tržišni prosek.",
    en: "Website development in Serbia in 2026 has no official average price. Based on publicly available Serbian offers and guides from 2025-2026, useful budgeting ranges are around EUR 250-900 for a landing page, EUR 500-1,500 for a basic business website, EUR 1,200-3,000+ for an advanced business website, EUR 900-4,000+ for a standard online store, and from about EUR 2,000 upward for simpler custom web applications. These are orientation ranges, not an official market average.",
  },
  sections: {
    sr: [
      {
        heading: "Zašto se ponude toliko razlikuju?",
        paragraphs: [
          "Ako ste tražili cenu izrade sajta, verovatno ste već videli isti problem: jedna ponuda je 300 EUR, druga 1.000 EUR, treća 3.000 EUR ili više. Sve tri mogu da nose isti naziv, ali ne moraju da opisuju isti posao.",
          "Reč sajt može da znači jednu landing stranicu na gotovom šablonu, poslovni WordPress sajt sa CMS-om, internet prodavnicu sa plaćanjem i kuririma, ili custom aplikaciju sa korisničkim nalozima. Zato je prvo pitanje uvek: šta taj sajt treba da radi, ko ga koristi i šta je tačno uključeno u cenu?",
          "Jeftina ponuda nije automatski loša, a skupa ponuda nije automatski dobra. Razlika je u obimu, iskustvu, procesu, sadržaju, SEO osnovi, integracijama, testiranju i podršci. Cilj ovog vodiča je da znate kako da čitate ponude pre nego što platite izradu sajta.",
        ],
      },
      {
        heading: "Pregled okvirnih cena izrade sajta u Srbiji",
        paragraphs: [
          "Na osnovu više javno dostupnih srpskih cenovnika, ponuda i vodiča iz 2025-2026, sledeći rasponi su korisni za početno planiranje budžeta. Oni nisu zvanični proseci i ne znače da svaki projekat mora stati u tabelu.",
          "Vreme izrade je takođe okvirno. Pripremljen sadržaj, broj revizija, integracije, brzina odlučivanja i kvalitet materijala često utiču na rok koliko i sam razvoj.",
        ],
        blocks: [
          {
            type: "table",
            caption: "Orijentacioni profesionalni budžeti, sintetizovani iz javnih domaćih ponuda i vodiča.",
            columns: ["Tip sajta", "Okvirna cena", "Tipično vreme", "Najčešća namena"],
            rows: priceRows,
          },
        ],
      },
      {
        heading: "Koliko košta sajt prema vrsti projekta?",
        paragraphs: [
          "Najkorisnije je da cenu posmatrate prema tipu projekta, ne samo prema broju stranica. Pet stranica na gotovoj temi i pet pažljivo dizajniranih stranica sa posebnim komponentama, sadržajem i SEO strukturom nisu isti obim rada.",
        ],
        blocks: [
          {
            type: "subsections",
            items: [
              {
                heading: "Landing page",
                paragraphs: [
                  "Landing page je jedna fokusirana stranica namenjena jednoj kampanji, usluzi, proizvodu ili jasnom pozivu na akciju. U javnim ponudama za Srbiju 2026. profesionalan landing page se često planira u rasponu od oko 250 do 900 EUR.",
                  "Niža cena obično znači gotovu strukturu, manje sadržaja i jednostavniji vizuelni sloj. Viši deo raspona ima smisla kada se piše ili uređuje tekst, radi dizajn po meri, povezuju forme, analitika, oglašavanje, CRM ili email alat, ili kada stranica ima pažljivo urađene animacije.",
                  "Postoje i jeftinija template rešenja. Ona mogu biti dovoljna za test kampanju ili vrlo jednostavnu prezentaciju, ali treba proveriti da li dobijate pristup, vlasništvo, analitiku, brzinu učitavanja i mogućnost kasnijeg širenja.",
                ],
              },
              {
                heading: "Basic business website",
                paragraphs: [
                  "Osnovni poslovni sajt najčešće uključuje početnu, o nama, usluge, portfolio ili reference, kontakt, a ponekad i blog. Za mali biznis ili uslužnu delatnost to je često najrazumniji početni format.",
                  "Okviran profesionalni raspon je približno 500-1.500 EUR. Ka donjem delu ide projekat sa jasnom strukturom, manjim brojem strana, pripremljenim tekstovima i fotografijama. Ka gornjem delu ide custom dizajn, više sekcija, CMS, dodatne forme, osnovna SEO arhitektura i više pažnje na sadržaj.",
                  "Responsive prikaz za telefon, tablet i računar ne bi trebalo tretirati kao luksuznu doplatu. U 2026. to je osnovni deo profesionalne izrade sajta.",
                ],
              },
              {
                heading: "Napredni poslovni sajt",
                paragraphs: [
                  "Napredniji poslovni sajt obično kreće od oko 1.200 EUR i lako prelazi 3.000 EUR kada projekat ima više tipova stranica, kompleksniji sadržaj, custom dizajn, više jezika ili integracije.",
                  "Cena raste kada je potrebno planirati korisničko iskustvo, migrirati sadržaj sa starog sajta, napraviti CMS koji odgovara načinu rada firme, povezati booking, CRM, email alate, analitiku, katalog, specifične kalkulatore ili posebne komponente.",
                  "Ovde se često plaća razmišljanje i struktura, ne samo kod. Dobar napredni sajt treba da objasni ponudu, vodi posetioca kroz odluku, bude brz, dostupan, razumljiv pretraživačima i lak za održavanje.",
                ],
              },
              {
                heading: "Internet prodavnica",
                paragraphs: [
                  "Internet prodavnica je složenija od prezentacionog sajta zato što uključuje proizvode, kategorije, korpu, checkout, porudžbine, plaćanje, isporuku, email obaveštenja i često administraciju zaliha.",
                  "Manja profesionalna WooCommerce prodavnica može krenuti od oko 900-1.800 EUR. Standardni web shop se često planira u rasponu od 1.500 do 2.800 ili 4.000 EUR, zavisno od obima. Veći ili custom e-commerce projekti sa integracijama mogu ići 4.000-8.000+ EUR.",
                  "Broj proizvoda sam po sebi nije jedini faktor. Varijacije, atributi, kvalitet fotografija, kategorije, uvoz proizvoda, filteri, način plaćanja, kurirske službe, ERP ili knjigovodstveni sistem često više utiču na cenu od same brojke proizvoda.",
                ],
              },
              {
                heading: "Custom web aplikacija",
                paragraphs: [
                  "Custom web aplikacija nije isto što i običan sajt. Ona može imati korisničke naloge, dashboarde, rezervacije, SaaS funkcionalnost, interne tokove rada, API-je, različite uloge korisnika ili povezivanje sa ERP i CRM sistemima.",
                  "Neki javni domaći izvori navode početke od oko 2.000 EUR za jednostavnije web aplikacije, ali to ne treba čitati kao tipičnu cenu kompletne custom aplikacije. To je pre moguća početna tačka za vrlo jasno ograničenu prvu verziju.",
                  "Ozbiljne aplikacije se skoro uvek procenjuju pojedinačno. Kod njih budžet zavisi od pravila poslovanja, sigurnosti, podataka, uloga, integracija, administracije, testiranja i dugoročnog održavanja.",
                ],
              },
            ],
          },
          {
            type: "linkList",
            title: "Korisni sledeći koraci na sajtu NMark Designs",
            items: [
              { label: "Pogledajte okvirni cenovnik", href: "/sr/cenovnik/" },
              { label: "Istražite usluge izrade web sajtova", href: "/sr/usluge/" },
              { label: "Pogledajte portfolio projekte", href: "/sr/portfolio/" },
              { label: "Pročitajte 10-minutni audit sajta", href: "/sr/blog/kako-da-radite-brzi-audit-sajta/" },
            ],
          },
        ],
      },
      {
        heading: "Da li je 1.000 EUR mnogo za internet prodavnicu?",
        paragraphs: [
          "Zavisi od obima projekta. Za malu WooCommerce prodavnicu sa ograničenim brojem proizvoda i bez kompleksnih integracija, 1.000 EUR može biti realna cena. Za prodavnicu sa custom dizajnom, većim katalogom, kartičnim plaćanjem, kurirskim ili ERP integracijama, naprednim filterima i SEO strukturom, 1.000 EUR je često donji deo budžeta.",
          "Najvažnije je da ne poredite samo krajnju cenu, već scenario koji ta cena pokriva.",
        ],
        blocks: [
          {
            type: "cards",
            items: [
              {
                eyebrow: "Scenario 1",
                title: "Mali shop",
                body: "Template ili blago prilagođen dizajn, nekoliko desetina proizvoda, osnovni checkout i bez kompleksnih integracija. U tom scenariju 1.000 EUR može biti realan budžet.",
                list: ["manji katalog", "osnovno plaćanje ili upit", "ručna obrada porudžbina"],
              },
              {
                eyebrow: "Scenario 2",
                title: "Profesionalna online prodavnica",
                body: "Custom UX, više proizvoda, plaćanje karticama, dostava, filteri, analitika i SEO struktura. Ovde je 1.000 EUR najčešće blizu donje granice.",
                list: ["jasna struktura kategorija", "integracija plaćanja", "merenja i osnovni SEO"],
              },
              {
                eyebrow: "Scenario 3",
                title: "Napredni e-commerce",
                body: "Stotine ili hiljade proizvoda, ERP, sinhronizacija zaliha, B2B cene, kompleksna pretraga, više magacina i automatizacija. Za takav obim 1.000 EUR nije realan kompletan budžet.",
                list: ["integracije", "automatizacija", "napredno upravljanje katalogom"],
              },
            ],
          },
        ],
      },
      {
        heading: "Zašto jedan sajt košta 300 EUR, a drugi 3.000 EUR?",
        paragraphs: [
          "Zato što cena prati količinu odluka, odgovornosti i rada koji nisu uvek vidljivi u finalnom dizajnu. Posetilac vidi lepu stranicu; u pozadini mogu biti strategija sadržaja, tehnička SEO osnova, migracija, testiranje, integracije i podešavanje merenja.",
        ],
        blocks: [
          {
            type: "cards",
            items: [
              { title: "Template ili custom dizajn", body: "Gotova tema je brža i jeftinija. Dizajn po meri traži istraživanje, strukturu, vizuelni sistem i više provera, ali bolje prati brend i sadržaj." },
              { title: "Broj i kompleksnost tipova stranica", body: "Pet običnih stranica nije isto što i pet različitih šablona za usluge, projekte, članke, kategorije i kontakt putanje." },
              { title: "WordPress ili custom development", body: "WordPress često smanjuje cenu za CMS i sadržaj. Custom razvoj ima smisla kada funkcionalnost ili arhitektura prevazilaze gotov sistem." },
              { title: "Sadržaj i copywriting", body: "Ako klijent ima spremne tekstove i fotografije, posao je manji. Ako treba osmisliti poruku, urediti tekst i pripremiti vizuale, cena raste." },
              { title: "SEO i struktura", body: "SEO nije samo plugin. U cenu mogu ući struktura stranica, metadata, kanonikale, interni linkovi, schema, brzina i indeksiranje." },
              { title: "Višejezičnost", body: "Sajt na srpskom i engleskom nije samo prekidač jezika. Treba prevesti sadržaj, metadata, URL strukturu, forme i poruke." },
              { title: "E-commerce funkcije", body: "Proizvodi, kategorije, varijacije, plaćanje, dostava, porudžbine i email tokovi čine prodavnicu složenijom od prezentacije." },
              { title: "Integracije", body: "Kartično plaćanje, kuriri, ERP, CRM, API, newsletter i booking alati traže podešavanje, testiranje i često koordinaciju sa trećom stranom." },
              { title: "Uvoz proizvoda ili sadržaja", body: "Kvalitet podataka utiče na cenu. Uvoz iz urednog fajla nije isto što i sređivanje nekompletnih naziva, slika, kategorija i atributa." },
              { title: "Interakcije i animacije", body: "Suptilne animacije mogu pomoći, ali kompleksne interakcije traže više dizajna, razvoja i testiranja na uređajima." },
              { title: "Performanse i pristupačnost", body: "Brzina, stabilan layout, alt tekstovi, fokus stanja, kontrast i tastatura nisu ukrasi. To su delovi profesionalne izrade." },
              { title: "Testiranje, analitika i podrška", body: "Forma mora stvarno slati poruke, merenja moraju raditi, a vlasnik mora znati šta se dešava posle objave." },
            ],
          },
        ],
      },
      {
        heading: "Šta najviše utiče na cenu izrade sajta?",
        paragraphs: [
          "Najveći pokretači cene su obim, neizvesnost i odgovornost. Što je jasnije šta treba napraviti, za koga i sa kojim materijalima, lakše je dobiti preciznu ponudu.",
          "Ako ponuda ima samo jednu rečenicu i cenu, tražite razradu. Profesionalna ponuda treba da objasni šta ulazi u cenu, šta ne ulazi, koliko revizija imate, ko priprema sadržaj, koji su rokovi i šta se plaća kasnije.",
        ],
      },
      {
        heading: "WordPress ili custom sajt — šta se više isplati?",
        paragraphs: [
          "WordPress i custom razvoj nisu protivnici. To su različiti pristupi za različite potrebe. WordPress često ima finansijskog smisla za poslovne sajtove, blogove, sadržajno bogate stranice i male ili srednje WooCommerce prodavnice, naročito kada vlasnik želi da sam menja sadržaj.",
          "Custom razvoj, recimo kroz React ili Next.js arhitekturu, ima smisla kada projekat traži jedinstvenu funkcionalnost, vrlo specifičan UI, kompleksne integracije, aplikacijsko ponašanje, posebne performansne zahteve ili dugoročnu arhitekturu koju gotovi sistemi otežavaju.",
          "NMark Designs radi sa modernim web tehnologijama, ali dobar savet nije uvek najskuplja tehnologija. Pravo pitanje je šta sajt treba da postigne i ko će ga održavati posle objave.",
        ],
      },
      {
        heading: "Koji troškovi dolaze posle izrade sajta?",
        paragraphs: [
          "Cena izrade je jednokratni trošak. Posle toga postoje troškovi koji se plaćaju godišnje, mesečno ili po potrebi. Ne plaća svaki sajt sve stavke, ali ih treba znati pre početka.",
        ],
        blocks: [
          {
            type: "comparison",
            items: [
              {
                title: "Jednokratni troškovi",
                body: "Ovo je ono što plaćate da bi se sajt isplanirao, dizajnirao, razvio, testirao i objavio.",
                list: ["strategija i struktura", "dizajn i razvoj", "unos početnog sadržaja", "migracija ili uvoz podataka", "osnovna SEO i analitika postavka"],
              },
              {
                title: "Ponavljajući troškovi",
                body: "Ovo su troškovi koji održavaju sajt živim, bezbednim i korisnim nakon objave.",
                list: ["domen i hosting", "premium pluginovi ili licence", "email", "backup i bezbednost", "održavanje, SEO, sadržaj i oglašavanje"],
              },
            ],
          },
          {
            type: "cards",
            items: [
              { title: "Domen", body: ".rs domen se kod domaćih registrara često kreće oko 18-30 EUR godišnje, zavisno od registrara, paketa i usluga uz domen. RNIDS naglašava da krajnje cene određuju ovlašćeni registri, ne RNIDS kao maloprodajnu cenu." },
              { title: "Hosting", body: "Za osnovne sajtove hosting često staje u okvir od oko 40-150 EUR godišnje. Web shop, veći WordPress, VPS ili aplikacija mogu zahtevati znatno veći budžet." },
              { title: "SSL", body: "SSL sertifikat je često besplatan kroz Let's Encrypt ili uključen u hosting. Ako vam neko naplaćuje SSL, pitajte šta tačno plaćate i da li postoji besplatna alternativa." },
              { title: "Održavanje", body: "Održavanje može biti mali mesečni retainer, ali i 100+ EUR mesečno ako uključuje redovna ažuriranja, backup, sigurnosne provere, izmene sadržaja i podršku." },
              { title: "Plaćanja i e-commerce servisi", body: "Online prodavnica može imati troškove payment procesora, banke, kurira, integracija, fakturisanja, email alata ili dodatnih pluginova." },
              { title: "SEO, sadržaj i oglašavanje", body: "Sajt može biti tehnički spreman, ali rast vidljivosti traži stalni sadržaj, merenje, optimizaciju i često oglašavanje. To nije automatski deo izrade." },
            ],
          },
        ],
      },
      {
        heading: "Freelancer ili web agencija?",
        paragraphs: [
          "Ne postoji univerzalni pobednik. Freelancer može biti odličan izbor za manji projekat, direktnu komunikaciju, niži overhead i fokusiranu ekspertizu. Agencija ili studio ima smisla kada projekat traži više disciplina: dizajn, razvoj, SEO, sadržaj, project management, integracije i podršku.",
          "Zato 300 EUR, 700 EUR, 1.500 EUR, 3.000 EUR i 5.000+ EUR mogu biti legitimne ponude za nešto što se u razgovoru zove sajt. Ispravno pitanje nije ko je najjeftiniji, nego šta tačno dobijam za ovu cenu?",
        ],
      },
      {
        heading: "Šta treba da pitate pre nego što platite izradu sajta?",
        paragraphs: [
          "Ova lista je korisna i ako nikada ne angažujete NMark Designs. Dobra pitanja štite vas od nesporazuma i pomažu dobrom izvođaču da napravi jasniju ponudu.",
        ],
        blocks: [
          {
            type: "checklist",
            items: [
              "Ko je vlasnik domena?",
              "Da li je domen registrovan na mene ili moju firmu?",
              "Da li dobijam pristup hostingu?",
              "Da li dobijam source code ili fajlove sajta?",
              "Šta tačno ulazi u cenu?",
              "Koliko revizija je uključeno?",
              "Da li je sadržaj uključen?",
              "Da li je SEO uključen i šta SEO konkretno znači?",
              "Da li su Analytics i Search Console podešeni?",
              "Kako funkcioniše backup?",
              "Ko održava sajt?",
              "Koliki su godišnji troškovi?",
              "Da li postoje licence?",
              "Da li mogu da promenim hosting ili developera?",
              "Mogu li sam da menjam sadržaj?",
              "Šta se događa ako saradnja prestane?",
              "Koji je rok?",
              "Kako se rešavaju dodatni zahtevi?",
            ],
          },
          {
            type: "cta",
            title: "Već imate ponudu i niste sigurni šta piše u njoj?",
            body: "Možete poslati obim projekta ili postojeću specifikaciju i pitati šta nedostaje pre nego što donesete odluku.",
            label: "Zatražite procenu projekta",
            href: "/sr/kontakt/",
          },
        ],
      },
      {
        heading: "Da li se ulaganje u sajt isplati?",
        paragraphs: [
          "Sajt se isplati kada ima zadatak: da donese upite, predstavi usluge, podrži prodaju, izgradi poverenje, prikaže portfolio, objasni proces ili učini firmu dostupnom ljudima koji ne prate vaše društvene mreže.",
          "Zvanični podaci NBS pokazuju da je u 2025. realizovano 110,6 miliona online kupovina karticama i elektronskim novcem, što je 34,3% više nego 2024. U prvom tromesečju 2026. NBS beleži 32,9 miliona online kupovina, 39,7% više nego u istom periodu prethodne godine. Najnoviji javni podatak za drugo tromesečje 2026. ide dalje: 34,2 miliona internet kupovina za tri meseca.",
          "Ti podaci ne znače da će svaki sajt automatski vratiti investiciju. Znače da korisnici u Srbiji sve više koriste online kanale za kupovinu i plaćanje. Ako vaš biznis zavisi od upita, poverenja, lokalne vidljivosti ili prodaje, sajt je deo infrastrukture, ne samo digitalna brošura.",
        ],
      },
      {
        heading: "Najčešća pitanja",
        paragraphs: [
          "Kratki odgovori u nastavku služe za brzo poređenje ponuda i planiranje budžeta.",
        ],
        blocks: [{ type: "faq", items: faqSr.map(([question, answer]) => ({ question, answer })) }],
      },
      {
        heading: "Izvori i metodologija",
        paragraphs: [
          "Rasponi u ovom tekstu su sintetizovani iz javno dostupnih cenovnika, ponuda i vodiča srpskih agencija, studija i freelancera objavljenih ili ažuriranih tokom 2025-2026. To nije zvanično nacionalno istraživanje i ne treba ga čitati kao prosečnu cenu na nivou Srbije.",
          "Za tržišni kontekst korišćeni su zvanični podaci Narodne banke Srbije o online plaćanjima. Za domen i registry kontekst korišćen je RNIDS, uz primer javno objavljene cene akreditovanog registrara. Slabe ili teško proverljive tvrdnje, kao što su univerzalni procenti poverenja ili tačni SEO rezultati bez izvora, namerno nisu uključene.",
        ],
      },
    ],
    en: [
      {
        heading: "Why do quotes differ so much?",
        paragraphs: [
          "If you have asked for a website price, you have probably seen the same issue: one quote is EUR 300, another EUR 1,000, and a third EUR 3,000 or more. All three may be called a website, but they may describe very different work.",
          "A website can mean one landing page on a ready-made template, a business WordPress site with CMS, an online store with payments and delivery, or a custom app with user accounts. So the first question is not how many pages, but what the website needs to do and what is included.",
          "Cheap is not automatically bad, and expensive is not automatically good. The difference is usually scope, process, content, SEO foundations, integrations, testing, and support.",
        ],
      },
      {
        heading: "Website pricing overview in Serbia",
        paragraphs: [
          "Based on publicly available Serbian price pages, offers, and guides from 2025-2026, these ranges are useful for first-pass budgeting. They are not official averages.",
          "Timelines are also indicative. Prepared content, decision speed, integrations, and revision rounds can affect timing as much as development itself.",
        ],
        blocks: [
          {
            type: "table",
            caption: "Indicative professional budgets synthesized from public Serbian offers and guides.",
            columns: ["Website type", "Budget range", "Typical timeline", "Common use"],
            rows: [
              ["Landing page", "EUR 250-900", "1-2 weeks", "campaign, single service, lead generation"],
              ["Basic business website", "EUR 500-1,500", "about 3-6 weeks", "small businesses and service providers"],
              ["Advanced business website", "EUR 1,200-3,000+", "about 4-8+ weeks", "custom UX, content, languages, integrations"],
              ["Online store", "EUR 900-4,000+", "about 6-12+ weeks", "online sales and product catalog"],
              ["Custom web application", "from about EUR 2,000", "months, depending on scope", "portals, dashboards, SaaS, internal tools"],
            ],
          },
        ],
      },
      {
        heading: "How much does a website cost by project type?",
        paragraphs: [
          "The most useful way to judge price is by project type, not simply by page count. Five simple pages on a template and five custom page types with content and SEO structure are not the same scope.",
        ],
        blocks: [
          {
            type: "subsections",
            items: [
              { heading: "Landing page", paragraphs: ["A landing page is one focused page for one campaign, service, product, or call to action. Public Serbian offers often place a professional landing page around EUR 250-900.", "The lower end usually means a ready-made structure and simpler visuals. The higher end can include copy, custom design, forms, analytics, ad tracking, CRM or email integration, and polished interactions."] },
              { heading: "Basic business website", paragraphs: ["A basic business website usually includes home, about, services, references or portfolio, and contact. For small service businesses, this is often the most sensible starting point.", "A useful range is roughly EUR 500-1,500. Prepared content and a clear scope sit lower; custom design, CMS, SEO architecture, and more careful content work move it upward."] },
              { heading: "Advanced business website", paragraphs: ["An advanced business website often starts around EUR 1,200 and can pass EUR 3,000 when it needs more page types, custom UX, multilingual content, CMS, migration, integrations, or special components.", "Here you are often paying for structure and decision-making, not only code."] },
              { heading: "Online store", paragraphs: ["An online store is more complex because it includes products, categories, cart, checkout, orders, payments, delivery, emails, and often stock administration.", "A smaller WooCommerce store may start around EUR 900-1,800. Standard professional stores often sit between EUR 1,500 and EUR 4,000, while larger custom e-commerce builds can reach EUR 4,000-8,000+."] },
              { heading: "Custom web application", paragraphs: ["A custom web application is not comparable to a normal website. It may include user accounts, dashboards, booking systems, SaaS features, APIs, roles, or ERP/CRM integration.", "Some public offers start around EUR 2,000 for simpler applications, but that should be read as a starting point for a limited first version, not a typical complete-app price."] },
            ],
          },
          {
            type: "linkList",
            title: "Useful next steps on NMark Designs",
            items: [
              { label: "View pricing", href: "/en/pricing/" },
              { label: "Explore website services", href: "/en/services/" },
              { label: "See portfolio projects", href: "/en/portfolio/" },
              { label: "Read the 10-minute website audit", href: "/en/blog/kako-da-radite-brzi-audit-sajta/" },
            ],
          },
        ],
      },
      {
        heading: "Is EUR 1,000 a lot for an online store?",
        paragraphs: [
          "It depends on scope. For a small WooCommerce store with a limited catalog and no complex integrations, EUR 1,000 can be realistic. For custom design, larger catalog, card payments, delivery or ERP integrations, advanced filters, and SEO structure, EUR 1,000 is often the lower end.",
        ],
        blocks: [
          {
            type: "cards",
            items: [
              { eyebrow: "Scenario 1", title: "Small shop", body: "A template or lightly customized design, a few dozen products, basic checkout, and no complex integrations. EUR 1,000 can be realistic.", list: ["small catalog", "basic checkout", "manual order handling"] },
              { eyebrow: "Scenario 2", title: "Professional store", body: "Custom UX, more products, payment integration, delivery setup, filters, analytics, and SEO structure. EUR 1,000 is likely near the low end.", list: ["category structure", "payment integration", "analytics and SEO"] },
              { eyebrow: "Scenario 3", title: "Advanced e-commerce", body: "Hundreds or thousands of products, ERP, stock synchronization, B2B pricing, complex search, multiple warehouses, and automation. EUR 1,000 is not a realistic full-project budget.", list: ["integrations", "automation", "advanced catalog management"] },
            ],
          },
        ],
      },
      {
        heading: "Why does one website cost EUR 300 and another EUR 3,000?",
        paragraphs: [
          "Because the price follows the decisions, responsibility, and work that are not always visible in the final design. Behind a clean page there may be content strategy, technical SEO, migration, integrations, analytics, and testing.",
        ],
        blocks: [
          {
            type: "cards",
            items: [
              { title: "Template or custom design", body: "Templates are faster and cheaper. Custom design requires more planning and checks, but follows the brand and content more closely." },
              { title: "Page type complexity", body: "Five regular pages are not the same as five custom templates for services, projects, articles, categories, and contact paths." },
              { title: "WordPress or custom development", body: "WordPress can reduce CMS and content costs. Custom development makes sense when functionality or architecture outgrows a ready system." },
              { title: "Content and copywriting", body: "Prepared content lowers scope. Messaging, editing, and visual preparation add real work." },
              { title: "SEO and structure", body: "SEO is not just a plugin. It can include metadata, canonicals, internal links, schema, speed, and indexability." },
              { title: "Languages", body: "A bilingual site also needs localized metadata, URLs, forms, and messages." },
              { title: "E-commerce", body: "Products, categories, variations, payments, delivery, orders, and email flows add complexity." },
              { title: "Integrations", body: "Payments, couriers, ERP, CRM, booking, API, and newsletter tools need setup and testing." },
              { title: "Import quality", body: "Clean product data is different from fixing incomplete names, images, categories, and attributes." },
              { title: "Animations", body: "Subtle interactions can help, but complex animation adds design, development, and testing work." },
              { title: "Performance and accessibility", body: "Speed, stable layout, alt text, focus states, contrast, and keyboard access are parts of professional work." },
              { title: "Support", body: "Forms must work, analytics must be configured, and the owner must know what happens after launch." },
            ],
          },
        ],
      },
      {
        heading: "What drives website development cost most?",
        paragraphs: [
          "The largest drivers are scope, uncertainty, and responsibility. The clearer the goal, users, content, and constraints are, the easier it is to price the project accurately.",
          "If a quote contains only one sentence and a price, ask for a breakdown: what is included, what is not, how many revisions are included, who prepares content, what the timeline is, and what costs continue later.",
        ],
      },
      {
        heading: "WordPress or custom website — which pays off more?",
        paragraphs: [
          "WordPress and custom development are not enemies. WordPress often makes financial sense for business websites, blogs, content-heavy pages, and small or medium WooCommerce stores, especially when the owner needs content editing.",
          "Custom development, including React or Next.js architecture, makes sense when a project needs unique functionality, a highly custom UI, complex integrations, application-like behavior, or performance and architecture requirements that justify it.",
          "NMark Designs works with modern web technologies, but the right advice is not always the most expensive technology. The right question is what the website needs to achieve and who will maintain it after launch.",
        ],
      },
      {
        heading: "Which costs come after the website is built?",
        paragraphs: [
          "Development is a one-time cost. After launch, some costs are annual, monthly, or usage-based. Not every website needs every item, but owners should know the categories.",
        ],
        blocks: [
          {
            type: "comparison",
            items: [
              { title: "One-time costs", body: "What you pay to plan, design, build, test, and launch the site.", list: ["strategy and structure", "design and development", "initial content entry", "migration or import", "basic SEO and analytics setup"] },
              { title: "Recurring costs", body: "What keeps the site alive, secure, and useful after launch.", list: ["domain and hosting", "premium plugins or licenses", "email", "backup and security", "maintenance, SEO, content, and ads"] },
            ],
          },
          {
            type: "cards",
            items: [
              { title: "Domain", body: ".rs domains often sit around EUR 18-30 per year depending on registrar and package. RNIDS notes that end-user prices are set by accredited registrars." },
              { title: "Hosting", body: "Basic hosting commonly falls around EUR 40-150 per year. Shops, larger WordPress sites, VPS, or applications can cost much more." },
              { title: "SSL", body: "SSL is often free through Let's Encrypt or included in hosting. If it is charged, ask what exactly is included." },
              { title: "Maintenance", body: "Maintenance can be a small retainer or EUR 100+ per month when it includes updates, backups, security, content changes, and support." },
              { title: "E-commerce services", body: "Stores may have payment processor, bank, courier, invoicing, email, or plugin costs." },
              { title: "SEO and content", body: "A site may be technically ready, but visibility growth requires ongoing content, measurement, optimization, and sometimes ads." },
            ],
          },
        ],
      },
      {
        heading: "Freelancer or web agency?",
        paragraphs: [
          "There is no universal winner. A freelancer can fit smaller, clearly defined projects with direct communication and lower overhead. A studio or agency makes more sense when several disciplines need coordination: design, development, SEO, content, project management, integrations, and support.",
          "So EUR 300, EUR 700, EUR 1,500, EUR 3,000, and EUR 5,000+ can all be legitimate quotes for something marketed as a website. The right question is not who is cheapest, but what exactly do I get for this price?",
        ],
      },
      {
        heading: "What should you ask before paying for a website?",
        paragraphs: [
          "These questions are useful even if you never hire NMark Designs. They reduce misunderstandings and help good providers write clearer offers.",
        ],
        blocks: [
          {
            type: "checklist",
            items: [
              "Who owns the domain?",
              "Is the domain registered to me or my company?",
              "Do I get hosting access?",
              "Do I receive source code or website files?",
              "What exactly is included in the price?",
              "How many revisions are included?",
              "Is content included?",
              "Is SEO included, and what does SEO mean here?",
              "Are Analytics and Search Console configured?",
              "How do backups work?",
              "Who maintains the website?",
              "What are the annual costs?",
              "Are there licenses?",
              "Can I change hosting or developer?",
              "Can I edit content myself?",
              "What happens if cooperation ends?",
              "What is the timeline?",
              "How are extra requests handled?",
            ],
          },
          {
            type: "cta",
            title: "Already have a quote and are unsure what it includes?",
            body: "You can send the scope or specification and ask what is missing before making a decision.",
            label: "Request a project estimate",
            href: "/en/contact/",
          },
        ],
      },
      {
        heading: "Does investing in a website pay off?",
        paragraphs: [
          "A website pays off when it has a job: generating enquiries, presenting services, supporting sales, building trust, showing portfolio work, explaining a process, or making the business discoverable beyond social media.",
          "Official NBS data says Serbia recorded 110.6 million online purchases using cards and e-money in 2025, up 34.3% from 2024. In Q1 2026, NBS recorded 32.9 million online purchases, up 39.7% year over year. The latest public Q2 2026 release reports 34.2 million internet purchases in three months.",
          "Those numbers do not mean every website automatically creates ROI. They do show that online channels matter more for Serbian buyers, especially when enquiries, trust, local visibility, and sales depend on being easy to find and evaluate.",
        ],
      },
      {
        heading: "Frequently asked questions",
        paragraphs: [
          "Short answers for comparing quotes and planning a realistic budget.",
        ],
        blocks: [{ type: "faq", items: faqEn.map(([question, answer]) => ({ question, answer })) }],
      },
      {
        heading: "Sources and methodology",
        paragraphs: [
          "The ranges in this guide are synthesized from publicly available price pages, offers, and guides from Serbian agencies, studios, and freelancers published or updated during 2025-2026. This is not an official national pricing survey and should not be read as an average market price.",
          "For market context, the guide uses official National Bank of Serbia data on online payments. For domain and registry context, it uses RNIDS and an example public price from an accredited registrar. Weak or hard-to-verify claims, such as universal trust percentages or exact SEO outcomes without a primary source, were intentionally omitted.",
        ],
      },
    ],
  },
  sources: [
    { label: "NBS - Online shopping hits a new record in 2025", href: "https://www.nbs.rs/sr_RS/scripts/showcontent/index.html?id=21320&konverzija=no" },
    { label: "NBS - Strong growth in online payments in Serbia continues", href: "https://www.nbs.rs/sr/scripts/showcontent/index.html?id=21541&konverzija=no" },
    { label: "NBS - 34.2 million internet purchases in Q2 2026", href: "https://www.nbs.rs/sr/scripts/showcontent/index.html?id=21691" },
    { label: "RNIDS - note on domain fee tariff and accredited registrars", href: "https://www.rnids.rs/sr/novosti/izmena-tarifnika-naknada-rnids-a-od-10-februara" },
    { label: "Metoda - .rs domain pricing example", href: "https://www.metoda.rs/domeni.html" },
    { label: "Makko - Koliko košta izrada web sajta u Srbiji 2026?", href: "https://www.makko.rs/blog/koliko-kosta-izrada-web-sajta" },
    { label: "Webant - Izrada sajta cena 2026", href: "https://www.webant.rs/blog/koliko-kosta-izrada-sajta-srbija-2026" },
    { label: "IzradaWebSajta.co - Koliko košta WordPress sajt u 2026?", href: "https://izradawebsajta.co/sr/blog/koliko-kosta-wordpress-sajt/" },
    { label: "TechnoLogic - Cenovnik izrade web sajta", href: "https://technologicweb.rs/cenovnik-izrade-web-sajta/" },
    { label: "IzradaWebSajta.co - Izrada web aplikacija po meri", href: "https://izradawebsajta.co/sr/izrada-web-aplikacija/" },
    { label: "Let's Encrypt - free TLS certificates", href: "https://letsencrypt.org/" },
    { label: "Google Search Central - AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
  ],
  cta: {
    sr: {
      title: "Ne znate koji tip sajta vam je zapravo potreban?",
      description: "Opišite biznis, cilj sajta, da li prodajete online, okviran broj stranica ili proizvoda i potrebne integracije. NMark Designs može da predloži realan obim pre nego što uđete u izradu.",
      label: "Zatražite procenu projekta",
    },
    en: {
      title: "Not sure which type of website you actually need?",
      description: "Describe your business, website goal, whether you sell online, the rough number of pages or products, and needed integrations. NMark Designs can recommend a realistic scope before development begins.",
      label: "Request a project estimate",
    },
  },
} as const satisfies Editorial;
