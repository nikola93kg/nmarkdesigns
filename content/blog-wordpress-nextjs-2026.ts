import type { BlogSection } from "@/content/blog";
import type { Editorial } from "@/content/blog-editorial";

const sr: readonly BlogSection[] = [
  {
    heading: "WordPress vs Next.js — najkraći odgovor za vlasnike biznisa",
    paragraphs: [
      "Ako želite da zaposleni samostalno objavljuju tekstove, menjaju usluge i dodaju fotografije kroz poznatu administraciju, WordPress je često racionalan početak. Ako sajt zahteva posebno korisničko iskustvo, povezivanje poslovnih sistema ili funkcionalnosti koje se teško uklapaju u gotova rešenja, Next.js zaslužuje ozbiljno razmatranje. Jednostavan prezentacioni sajt može dobro da radi na oba.",
      "Pitanje „WordPress ili Next.js“ ipak poredi različite kategorije. WordPress je sistem za upravljanje sadržajem, odnosno CMS: uključuje administraciju, objave, stranice i biblioteku medija. Next.js je razvojni okvir za izradu sajtova i aplikacija. Administracija sadržaja nije automatski uključena; povezuje se postojeći CMS ili se posebno razvija.",
      "Ovde pod WordPressom podrazumevamo samostalno hostovan softver sa WordPress.org, a ne određeni WordPress.com paket. Pod Next.js rešenjem podrazumevamo kompletan sajt, sa uređivanjem sadržaja kada vam je potrebno. Bez toga bi poređenje bilo nepravedno: jedna ponuda bi uključivala alat za vaš tim, druga samo javne stranice.",
      "Za malo ili srednje preduzeće korisnije pitanje glasi: ko menja sadržaj, šta posetilac treba da uradi i koliko nas košta da to održavamo? Novija tehnologija sama po sebi nije poslovna prednost. Ni poznatiji sistem ne opravdava loš dizajn, sporu stranicu ili komplikovan put do kontakta.",
    ],
    media: [{
      image: "/blog/wordpress-nextjs-2026-content.webp", width: 1586, height: 992,
      alt: "Ilustracija vizuelnog uređivača sadržaja i razvojnog okruženja sa prikazom web stranice, povezanih blokovima sadržaja.",
      caption: "AI-generisana ilustracija dva pristupa radu sa sadržajem. Prikaz je konceptualan i ne predstavlja stvarne administrativne panele.",
    }],
    blocks: [{
      type: "table",
      caption: "Brza orijentacija pre razgovora o ponudi.",
      columns: ["Potreba", "WordPress", "Next.js"],
      rows: [
        ["Blog i redovno objavljivanje", "Ugrađena administracija i uređivanje", "Treba ugovoriti CMS i način objavljivanja"],
        ["Sajt sa nekoliko usluga", "Dobar uz pažljivu temu i održavanje", "Dobar uz jednostavnu arhitekturu i plan izmena"],
        ["Posebni tokovi i integracije", "Mogući kroz dodatke ili namenski razvoj", "Fleksibilna osnova za namenski razvoj"],
        ["Brzina, SEO i bezbednost", "Zavise od izvedbe i podrške", "Zavise od izvedbe i podrške"],
      ],
    }],
  },
  {
    heading: "Cena izrade: početno ulaganje, hosting i buduće izmene",
    paragraphs: [
      "Oba projekta koriste softver otvorenog koda; ne plaćate obaveznu licencu samo da biste koristili WordPress ili Next.js. Plaćate dizajn, sadržaj, razvoj, testiranje i infrastrukturu. Kod WordPressa gotove mogućnosti mogu da smanje početni rad. Kod Next.js-a dodatni rad često odlazi na model sadržaja, administraciju i povezivanje servisa. To je obrazac za procenu, a ne pravilo da je svaki Next.js sajt skuplji.",
      "U postojećem NMark Designs cenovniku poslovni sajt počinje od 550 €, a napredni sajt od 900 €. To su početne cene prema obimu, ne zasebni cenovnici za WordPress i Next.js. Osnovni poslovni paket ne uključuje CMS, blog, višejezičnost i napredne integracije. Nemojte cenu sajta bez administracije porediti sa ponudom koja već obuhvata urednički sistem, obuku i migraciju tekstova.",
      "Za pregled troškova koristite jednostavnu računicu: izrada + migracija + tri godine hostinga, domena, licenci i podrške + naknadni razvoj. Hosting obezbeđuje infrastrukturu; održavanje uključuje dogovoreni rad na sajtu. Nijedna od te dve stavke ne podrazumeva automatski pisanje tekstova, prevode ili dodavanje novih funkcionalnosti.",
    ],
    media: [{
      image: "/blog/wordpress-nextjs-2026-costs.webp", width: 1586, height: 992,
      alt: "Radni sto sa kalkulatorom, beležnicom sa tri kolone za planiranje i laptopom sa skicom web sajta.",
      caption: "AI-generisana ilustracija planiranja troškova. Konkretni iznosi i pretpostavke navedeni su u tekstu, a ne na slici.",
    }],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "Šta stvarno znače oglašene cene hostinga?",
            paragraphs: [
              "Na dan provere, 27. oktobra 2026, Hostinger Premium WordPress hosting prikazuje 2,49 USD mesečno uz uplatu 119,52 USD za 48 meseci unapred. Objavljena obnova je 10,99 USD mesečno za isti period. Dakle, oglašena mesečna cena nije mesečni način plaćanja. Pratite period obaveze, obnovu, poreze i šta se dešava sa domenom i emailom posle promotivnog perioda.",
              "Vercel Pro prikazuje početnu cenu od 20 USD mesečno, odnosno 240 USD za dvanaest meseci osnovne pretplate, uz dodatne troškove prema korišćenju i konfiguraciji. Cene su bez poreza. Besplatni Hobby plan namenjen je ličnoj, nekomercijalnoj upotrebi; nemojte ga računati kao redovan besplatan hosting firme. Ovo su primeri tarifnih modela, ne preporuka provajdera niti poređenje istog nivoa usluge.",
              "Next.js ne zahteva Vercel. Može da radi na sopstvenom Node.js serveru ili drugoj odgovarajućoj platformi. Statički izvoz može se smestiti na hosting za obične HTML fajlove, ali tada nema svih serverskih mogućnosti: forme, prijava korisnika i dinamička obrada traže zasebno rešenje. Jeftin server je koristan samo kada neko odgovara za njegovo podešavanje i podršku.",
            ],
          },
          {
            heading: "Licence, CMS i cena svake sledeće izmene",
            paragraphs: [
              "WordPress može da radi bez plaćenih dodataka, ali višejezičnost, napredne forme ili određena tema mogu doneti godišnje licence. Tražite spisak: šta se plaća, ko je vlasnik naloga i da li obnova uključuje samo ažuriranja ili i podršku. Broj pluginova sam po sebi nije dobra mera kvaliteta; bitni su njihova namena, kvalitet i međusobna kompatibilnost.",
              "Next.js sajt može imati sadržaj u kodu, besplatan CMS paket ili plaćenu administraciju. Proverite ograničenja za korisnike, jezike, medije i broj objava. Ako zaposleni ne mogu da promene cenu bez developera, uračunajte taj rad. Ako sadržaj menjate dvaput godišnje, dogovorene pojedinačne izmene mogu biti jednostavnije od posebnog CMS-a.",
              "NMark Designs Basic Care počinje od 25 € mesečno, a Business Care od 50 € i obuhvata manje izmene sadržaja u dogovorenom obimu. Zahtevnije Next.js aplikacije i WooCommerce sistemi imaju podršku po ponudi. Managed hosting od 30 € godišnje važi za podržane lagane sajtove; nije univerzalna cena za svaku arhitekturu.",
            ],
          },
        ],
      },
      {
        type: "linkList",
        title: "Proverite cene i uslove",
        items: [
          { label: "NMark Designs cenovnik — obim paketa i podrška", href: "/sr/cenovnik/" },
          { label: "Hostinger — WordPress hosting i obnova", href: "https://www.hostinger.com/wordpress-hosting" },
          { label: "Vercel — Pro cene", href: "https://vercel.com/pricing" },
          { label: "Vercel — uslovi Hobby plana", href: "https://vercel.com/docs/plans/hobby" },
        ],
      },
    ],
  },
  {
    heading: "Brzina i SEO: šta utiče na Google, a šta je marketing?",
    paragraphs: [
      "Dobro optimizovan WordPress može biti brz. Next.js može biti spor ako stranica učitava prevelike fotografije, mnogo JavaScript-a, video i marketinške skripte. Keširanje, kvalitet hostinga, obrada slika i odluke o sadržaju često su važniji od logotipa tehnologije. Next.js pruža alate za unapred pripremljene stranice i serversko prikazivanje; oni moraju biti pravilno upotrebljeni.",
      "Tražite proveru na telefonu, na stvarnim šablonima stranica i sa aktivnim alatima koje ćete koristiti posle objave. Test prazne početne stranice ne govori kako radi katalog sa velikim slikama, analitikom i kontakt formom. Kada postoje podaci stvarnih korisnika, oni dopunjuju laboratorijsko merenje; jedan rezultat iz Lighthouse-a nije potpuna slika.",
      "Google potvrđuje da njegovi sistemi koriste Core Web Vitals, ali dobri rezultati ne garantuju vrh pretrage. Prate se učitavanje glavnog sadržaja kroz LCP, odziv na interakciju kroz INP i stabilnost rasporeda kroz CLS. Od developera tražite objašnjenje šta merenje znači za posetioca, umesto obećanja prve pozicije zato što je sajt „custom“.",
      "SEO počinje time da pretraživač može da pronađe i razume korisnu stranicu. Potrebni su smisleni naslovi, jasan sadržaj usluga, interni linkovi, ispravni canonical URL-ovi i dostupnost za indeksiranje. Za više jezika proveravaju se i jezičke verzije. WordPress SEO plugin olakšava podešavanja, ali ne piše dobru ponudu umesto vas. Next.js Metadata API takođe traži plansko podešavanje.",
      "Prelazak sa WordPressa na Next.js nije samostalna SEO strategija. Ako se menjaju URL-ovi, potrebno je popisati stare stranice, mapirati odgovarajuća odredišta i postaviti potrebna preusmerenja. Gubitak sadržaja ili pogrešan canonical može da napravi problem uprkos bržem novom sajtu. Ako postojeći WordPress već dobro služi poslu, prvo proverite da li optimizacija rešava konkretan problem.",
    ],
    blocks: [{
      type: "linkList",
      title: "Šta Google zaista navodi",
      items: [
        { label: "Google Search Central — Core Web Vitals", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
        { label: "Google Search Central — iskustvo stranice i rangiranje", href: "https://developers.google.com/search/docs/appearance/page-experience" },
      ],
    }],
  },
  {
    heading: "Bezbednost i održavanje: oba izbora traže odgovornost",
    paragraphs: [
      "Za WordPress planirajte ažuriranja jezgra, teme, dodataka i serverskog okruženja. Važni su pouzdan izvor dodataka, ograničene administratorske dozvole, bezbedan pristup i rezervne kopije koje zaista mogu da se vrate. Automatska ažuriranja pomažu, ali kod važnih funkcija treba proveriti da li posle izmene rade forma, pretraga i naručivanje.",
      "Next.js nema WordPress pluginove, ali ima sopstveni okvir i programske zavisnosti koje takođe dobijaju bezbednosne ispravke. Zvanična Next.js objava od 11. decembra 2025. dokumentuje ranjivosti i potrebu za ažuriranjem pogođenih verzija. To nije tvrdnja da je današnji ažuriran sajt ranjiv, već proverljiv primer zašto „custom sajt ne mora da se održava“ nije odgovorna preporuka.",
      "Statički javni sajt bez baze i administracije može imati manje izloženih funkcija. Ipak, nalog za hosting, domen, build proces i kontakt servis ostaju važni. Kada dodate CMS, korisničke naloge, plaćanja ili pristup poslovnom sistemu, povećava se i broj stvari koje treba zaštititi. Rizik se procenjuje prema arhitekturi, podacima i pristupu, ne samo prema nazivu platforme.",
      "Od podrške tražite konkretan dogovor: ko prati upozorenja, ko primenjuje hitne ispravke, koliko često se proveravaju kopije i u kom roku očekujete odgovor. Backup koji nikada nije probno vraćen nije dovoljno dobar plan oporavka. Razjasnite i šta se dodatno naplaćuje kada incident zahteva više rada od redovnog održavanja.",
      "Važno je i da možete promeniti saradnika. Treba da imate dogovorene pristupe domenu, hostingu, kodu, CMS-u i licencama, uz dokumentaciju za pokretanje i objavljivanje. WordPress ne garantuje jednostavno preuzimanje zapuštenog sajta; Next.js ne znači automatsko vezivanje za jednog developera. Kvalitet isporuke i dokumentacije određuje koliko je prelazak realno lak.",
    ],
    blocks: [{
      type: "linkList",
      title: "Bezbednosni izvori",
      items: [
        { label: "WordPress — zvanične preporuke za zaštitu", href: "https://developer.wordpress.org/advanced-administration/security/hardening/" },
        { label: "Next.js — bezbednosna objava od 11. decembra 2025.", href: "https://nextjs.org/blog/security-update-2025-12-11" },
      ],
    }],
  },
  {
    heading: "Kada je WordPress bolji izbor?",
    paragraphs: [
      "WordPress ima jasnu prednost kada je uređivanje sadržaja glavni svakodnevni posao: blog sa više autora, novosti organizacije, stranice usluga i galerije koje zaposleni redovno dopunjavaju. Uređivač blokova već podržava tekst, slike, naslove i druge uobičajene elemente. Uz dobro pripremljene obrasce, tim može da objavljuje bez menjanja dizajna svake stranice.",
      "Za jednostavniji poslovni projekat sa ograničenim budžetom, standardnim funkcijama i željom da sadržaj održavate sami, nema razloga da WordPress unapred odbacite. Može imati namenski dizajn i pažljivo razvijenu temu. Nije sinonim za kupljen šablon, kao što ni Next.js nije automatski dokaz originalnog dizajna.",
      "U NMark Designs portfoliju sajt OŠ „Dule Karaklajić“ koristi WordPress. Objavljivanje obaveštenja i dostupnost dokumentacije predstavljaju koristan kontekst za razumevanje CMS pristupa. To je potvrđen primer upotrebe tehnologije, ne dokaz da druga platforma ne bi mogla da podrži isti sadržaj. Cena projekta i uporedni poslovni rezultati ovde se ne iznose.",
      "Za standardnu prodavnicu vredi razmotriti i WooCommerce, uz posebnu procenu plaćanja, dostave i upravljanja artiklima. To je šira odluka od izbora prezentacionog sajta. WordPress postaje slabiji izbor kada se veliki deo budžeta troši na zaobilaženje neusklađenih dodataka, dok stvarni poslovni proces ostaje nezgodan za zaposlene.",
    ],
    media: [{
      image: "/projects/os-dule-karaklajic.webp", width: 1877, height: 868,
      alt: "Prikaz početne stranice OŠ Dule Karaklajić, WordPress projekta iz NMark Designs portfolija.",
      caption: "OŠ Dule Karaklajić: potvrđen WordPress projekat. Prikaz sajta nije merenje brzine niti poslovnih rezultata.",
    }],
    blocks: [{ type: "linkList", title: "Pogledajte primer i uređivač", items: [
      { label: "OŠ Dule Karaklajić — studija slučaja", href: "/sr/portfolio/os-dule-karaklajic/" },
      { label: "WordPress — dokumentacija uređivača blokova", href: "https://wordpress.org/documentation/article/wordpress-block-editor/" },
    ] }],
  },
  {
    heading: "Kada je Next.js bolji izbor?",
    paragraphs: [
      "Next.js ima smisla kada sajt prerasta standardnu prezentaciju: namenski konfigurator, korisnički portal, povezivanje kataloga sa poslovnim sistemom ili specifičan proces slanja upita. Posebno je koristan kada želite preciznu kontrolu nad interfejsom i načinom učitavanja podataka. I WordPress podržava namenski razvoj; odluka zavisi od toga gde se konkretan zahtev jednostavnije i pouzdanije rešava.",
      "U portfoliju NMark Designs, Buy Pallet Jacks koristi Next.js za B2B sajt sa katalogom i informacijama o lokacijama, nakon migracije sa Squarespace-a. Taj projekat pokazuje primenu namenskog frontenda u poslovnom kontekstu. Ne predstavlja eksperiment WordPress protiv Next.js, niti objavljujemo njegov budžet ili pripisujemo tehnologiji neizmereni rast prodaje.",
      "Next.js može biti racionalan i za mali sajt sa retkim izmenama, ako jednostavan razvoj i dogovorena podrška odgovaraju budžetu. Nasuprot tome, za tim koji objavljuje svakog dana prvo treba pokazati administraciju: unos teksta, pregled pre objave, slike, prevode i dozvole. Lep javni sajt ne nadoknađuje nepraktičan alat za zaposlene.",
      "Moguća je i kombinacija: WordPress služi za unos sadržaja, a Next.js za javni prikaz kroz API. Takav headless pristup može da sačuva poznato uređivanje i omogući namenski frontend. Ipak, dva povezana sistema znače dodatni rad na pregledu nacrta, osvežavanju sadržaja, SEO podacima i održavanju. Birajte ga kada ta korist opravdava složenost.",
    ],
    blocks: [{ type: "linkList", title: "Primer i tehničke mogućnosti", items: [
      { label: "Buy Pallet Jacks — studija slučaja", href: "/sr/portfolio/buy-pallet-jacks/" },
      { label: "Next.js — samostalni hosting", href: "https://nextjs.org/docs/app/guides/self-hosting" },
      { label: "Next.js — mogućnosti i ograničenja statičkog izvoza", href: "https://nextjs.org/docs/app/guides/static-exports" },
      { label: "WordPress — REST API za povezivanje sistema", href: "https://developer.wordpress.org/rest-api/" },
    ] }],
  },
  {
    heading: "Poslovni scenariji i odluka: koliko košta kroz tri godine?",
    paragraphs: [
      "Sledeći iznosi su ilustrativni budžetski scenariji za poređenje ponuda. Nisu tržišni proseci, NMark Designs ponude niti cene prethodno pomenutih projekata. Svaki broj je pretpostavka računice. Prikazani zbirovi ne uključuju domen, poreze, pisanje i prevode, migraciju ili razvoj novih funkcija; te stavke dodajte prema svojoj ponudi. Kod oba pristupa pretpostavljamo isti dogovoreni nivo podrške.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "1. Lokalna firma: pet stranica i retke izmene",
            paragraphs: [
              "Pretpostavimo da sadržaj priprema firma, nema bloga ni samostalne administracije, a podrška pokriva jednak mali obim izmena kod oba rešenja. Za WordPress uzmimo 900 € izrade, 100 € godišnje za hosting, 60 € za licence i 300 € za podršku. Za Next.js uzmimo 1.300 € izrade, 120 € godišnje za hosting, bez plaćenih licenci i 300 € za podršku.",
              "Za tri godine to daje 2.280 € za WordPress i 2.560 € za Next.js. Razlika je 280 €, pod ovim pretpostavkama. Ako Next.js ponuda bude jeftinija ili WordPress ne zahteva licence, promeniće se i odnos. Za ovaj posao oba izbora mogu biti dobra; kvalitet izrade i način budućih izmena važniji su od tehnološkog prestiža.",
            ],
          },
          {
            heading: "2. Aktivna redakcija: blog i samostalno objavljivanje",
            paragraphs: [
              "Ovde oba rešenja moraju uključivati CMS i obuku. Ilustrativni WordPress budžet je 1.200 € za izradu, pa godišnje 120 € hosting, 100 € licence i 600 € podrška: ukupno 3.660 € za tri godine. Za Next.js sa povezanim CMS-om pretpostavimo 2.000 € izrade, godišnje 240 € hosting, 120 € CMS i 600 € podrška: ukupno 4.880 €.",
              "U ovom scenariju WordPress ima racionalniju računicu ako već pokriva uredničke potrebe. Next.js može biti opravdan posebnim javnim interfejsom ili povezivanjem sa drugim kanalima. Od oba ponuđača tražite demonstraciju istih zadataka. Jeftiniji CMS ne donosi uštedu ako zaposleni svakog dana troše dodatno vreme na objavljivanje.",
            ],
          },
          {
            heading: "3. B2B katalog: namenski tok upita i integracija",
            paragraphs: [
              "Pretpostavimo isti obim integracije i podrške. WordPress varijanta: 3.000 € razvoj, godišnje 240 € hosting, 180 € licence i 1.200 € podrška, ukupno 7.860 € za tri godine. Next.js varijanta: 4.000 € razvoj, godišnje 240 € hosting, bez plaćenog CMS-a i licenci, 1.200 € podrška, ukupno 8.320 €. Pretpostavka je da se podaci održavaju u postojećem poslovnom sistemu.",
              "Razlika od 460 € nije dovoljan razlog da izaberete arhitekturu koja otežava ključan posao. Proverite sinhronizaciju, obradu grešaka, vlasništvo nad podacima i cenu nove integracije. Ako neki dodatak za WordPress pouzdano rešava ceo zahtev, on može biti isplativiji. Ako zahteva stalna zaobilaženja, namenski Next.js razvoj može biti racionalniji uprkos većem početnom iznosu.",
            ],
          },
        ],
      },
      {
        type: "table",
        caption: "Ilustrativni obračun: izrada + 3 × (godišnji hosting + licence/CMS + podrška). Sve stavke su pretpostavke, u evrima.",
        columns: ["Scenario", "WordPress: tri godine", "Next.js: tri godine"],
        rows: [
          ["Pet stranica", "900 + 3 × (100 + 60 + 300) = 2.280 €", "1.300 + 3 × (120 + 0 + 300) = 2.560 €"],
          ["Blog sa CMS-om", "1.200 + 3 × (120 + 100 + 600) = 3.660 €", "2.000 + 3 × (240 + 120 + 600) = 4.880 €"],
          ["B2B integracija", "3.000 + 3 × (240 + 180 + 1.200) = 7.860 €", "4.000 + 3 × (240 + 0 + 1.200) = 8.320 €"],
        ],
      },
      {
        type: "checklist",
        items: [
          "Napišite ko uređuje sadržaj i koliko često.",
          "Tražite isti broj stranica, jezika, funkcija i isti nivo podrške u obe ponude.",
          "Odvojite izradu, migraciju, hosting, CMS, licence i buduće izmene.",
          "Proverite brzinu na stvarnom sadržaju i demonstraciju administracije.",
          "Dogovorite ažuriranja, oporavak, pristupe i predaju dokumentacije.",
          "Za postojeći sajt uključite očuvanje sadržaja i mapiranje URL-ova.",
        ],
      },
      {
        type: "faq",
        items: [
          { question: "Da li je WordPress zastareo u 2026?", answer: "Ne treba ga odbaciti samo zbog starosti. Važno je da podržana verzija, tema, dodaci i hosting odgovaraju projektu. Za sadržajni poslovni sajt može biti racionalan izbor." },
          { question: "Da li Next.js automatski donosi bolji SEO?", answer: "Ne. Pruža tehničke alate, ali sadržaj, dostupnost za indeksiranje, struktura i kvalitet implementacije ostaju presudni delovi posla. Dobre performanse ne garantuju visoko rangiranje." },
          { question: "Da li mogu samostalno da menjam Next.js sajt?", answer: "Možete ako je ugovoren odgovarajući CMS ili administracija. Sam Next.js ne uključuje gotov urednički panel. Pre naručivanja proverite koje promene ćete moći da napravite bez developera." },
        ],
      },
      {
        type: "linkList",
        title: "Pripremite konkretnu odluku",
        items: [
          { label: "Koliko košta izrada web sajta u Srbiji — detaljan vodič", href: "/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
          { label: "Usluge NMark Designs", href: "/sr/usluge/" },
          { label: "Pošaljite potrebe za novi sajt ili redizajn", href: "/sr/kontakt/" },
        ],
      },
    ],
  },
];

const en: readonly BlogSection[] = [
  {
    heading: "WordPress vs Next.js: the short answer for business owners",
    paragraphs: [
      "If employees need to publish articles, update services and add photographs through a familiar dashboard, WordPress is often a sensible starting point. If your website needs a particular user experience, connections to business systems or functions that fit poorly into existing solutions, Next.js deserves consideration. A straightforward company website can work well with either.",
      "The comparison involves different categories. WordPress is a content management system, or CMS: it includes administration, posts, pages and a media library. Next.js is a framework for building websites and applications. A content dashboard is not automatically included; an existing CMS must be connected or an administration interface developed separately.",
      "Here, WordPress means self-hosted software from WordPress.org, rather than a particular WordPress.com subscription. A Next.js solution means a complete website, including content editing when required. Otherwise the comparison would be unfair: one proposal would include a tool for your employees while the other covered only public pages.",
      "For a small or medium-sized business, the useful questions are who updates the content, what visitors should accomplish and what keeping everything running will cost. A newer technology is not a business advantage by itself. A familiar platform does not excuse poor design, slow pages or a complicated route to contacting you.",
    ],
    media: [{
      image: "/blog/wordpress-nextjs-2026-content.webp", width: 1586, height: 992,
      alt: "Illustration of a visual content editor and a development environment with a website preview, linked by content blocks.",
      caption: "AI-generated illustration of two approaches to content. This is a concept, rather than a screenshot of actual administration interfaces.",
    }],
    blocks: [{ type: "table", caption: "A starting point before comparing proposals.", columns: ["Requirement", "WordPress", "Next.js"], rows: [
      ["Blog and regular publishing", "Built-in dashboard and editing", "Agree on a CMS and publishing workflow"],
      ["A few service pages", "Suitable with a careful theme and maintenance", "Suitable with simple architecture and an update plan"],
      ["Custom workflows and integrations", "Possible through plugins or custom development", "Flexible foundation for custom development"],
      ["Speed, SEO and security", "Depend on implementation and support", "Depend on implementation and support"],
    ] }],
  },
  {
    heading: "Development cost: initial investment, hosting and future changes",
    paragraphs: [
      "Both projects use open-source software; there is no mandatory software licence simply to use WordPress or Next.js. You pay for design, content, development, testing and infrastructure. Existing WordPress features can reduce initial work. With Next.js, extra work often covers content modelling, administration and connecting services. This is a budgeting pattern, not a rule that every Next.js website costs more.",
      "The existing NMark Designs price list starts business websites at €550 and advanced websites at €900. These are starting prices based on scope, rather than separate WordPress and Next.js tariffs. The basic business package excludes a CMS, blog, additional languages and advanced integrations. A website without administration should not be compared with a proposal already covering an editorial system, training and article migration.",
      "Use a simple ownership calculation: development + migration + three years of hosting, domain, licences and support + subsequent development. Hosting provides infrastructure; maintenance provides agreed work on the website. Neither automatically includes writing articles, translating pages or adding new features. Ask what you can edit yourself and what requires paid assistance.",
    ],
    media: [{
      image: "/blog/wordpress-nextjs-2026-costs.webp", width: 1586, height: 992,
      alt: "A desk with a calculator, a notebook with three planning columns and a laptop displaying a website wireframe.",
      caption: "AI-generated illustration of cost planning. Actual amounts and assumptions appear in the article rather than the image.",
    }],
    blocks: [
      { type: "subsections", items: [
        {
          heading: "What do advertised hosting prices actually mean?",
          paragraphs: [
            "When checked on October 27, 2026, Hostinger Premium WordPress hosting displayed USD 2.49 per month with USD 119.52 paid upfront for 48 months. The published renewal was USD 10.99 per month for the same term. The headline monthly price therefore does not mean monthly billing. Check the commitment period, renewal, taxes and what happens to domain and email charges after promotions expire.",
            "Vercel Pro displayed a starting price of USD 20 per month, or USD 240 for twelve months of the base subscription, with additional charges depending on usage and configuration. Prices exclude taxes. The free Hobby plan is restricted to personal, non-commercial use; do not budget it as ordinary free company hosting. These illustrate billing models, rather than equivalent service levels or provider recommendations.",
            "Next.js does not require Vercel. It can run on your own Node.js server or another suitable platform. Static exports can use hosting that serves ordinary HTML files, but do not retain every server feature: forms, sign-in and dynamic processing need separate provision. A cheap server is useful only when someone is responsible for configuring and supporting it.",
          ],
        },
        {
          heading: "Licences, the CMS and the next change request",
          paragraphs: [
            "WordPress can run without paid plugins, although multilingual publishing, advanced forms or a particular theme may bring annual licence costs. Request a list explaining what is paid, who owns each account and whether renewal covers updates, support or both. Plugin count alone is not a useful quality measure; purpose, quality and compatibility matter more.",
            "Next.js content might live in code, a free CMS tier or paid administration software. Check limits on editors, languages, media and publishing. If an employee needs a developer to change a price, include that work in the budget. If content changes only twice a year, agreed individual updates may be simpler than a separate CMS.",
            "NMark Designs Basic Care starts at €25 per month. Business Care starts at €50 and covers minor content changes within an agreed scope. More demanding Next.js applications and WooCommerce systems receive a tailored support quote. Managed hosting from €30 annually applies to supported lightweight websites; it is not a universal price for every architecture.",
          ],
        },
      ] },
      { type: "linkList", title: "Check prices and conditions", items: [
        { label: "NMark Designs pricing — package scope and support", href: "/en/pricing/" },
        { label: "Hostinger — WordPress hosting and renewal", href: "https://www.hostinger.com/wordpress-hosting" },
        { label: "Vercel — Pro pricing", href: "https://vercel.com/pricing" },
        { label: "Vercel — Hobby plan conditions", href: "https://vercel.com/docs/plans/hobby" },
      ] },
    ],
  },
  {
    heading: "Speed and SEO: what affects Google and what is marketing?",
    paragraphs: [
      "A well-optimised WordPress website can be fast. A Next.js website can be slow when it loads oversized photographs, excessive JavaScript, video and marketing scripts. Caching, hosting quality, image handling and content decisions often matter more than the technology logo. Next.js provides tools for prebuilt pages and server rendering; someone still needs to use them appropriately.",
      "Ask for mobile checks using actual page templates and the tools that will remain active after launch. Testing an empty homepage does not show how a catalog performs with large photographs, analytics and an enquiry form. Where real-user data exists, it complements laboratory measurements. One Lighthouse score is not a complete picture of the experience your customers receive.",
      "Google confirms that its systems use Core Web Vitals, but good results do not guarantee top rankings. LCP tracks loading of the main content, INP measures interaction responsiveness and CLS measures layout stability. Ask a developer to explain what the measurements mean for visitors, rather than promising first place because a website is custom built.",
      "SEO starts with making useful pages discoverable and understandable. That requires meaningful titles, clear service content, internal links, correct canonical URLs and access for indexing. Multilingual websites also need properly connected language versions. A WordPress SEO plugin helps configure settings; it does not write a convincing offer for you. The Next.js Metadata API also requires deliberate configuration.",
      "Moving from WordPress to Next.js is not an SEO strategy on its own. If URLs change, inventory the old pages, map equivalent destinations and implement necessary redirects. Lost content or an incorrect canonical can cause problems despite a faster new website. If an existing WordPress site already serves the business, first investigate whether targeted optimisation resolves the actual issue.",
    ],
    blocks: [{ type: "linkList", title: "What Google actually says", items: [
      { label: "Google Search Central — Core Web Vitals", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
      { label: "Google Search Central — page experience and rankings", href: "https://developers.google.com/search/docs/appearance/page-experience" },
    ] }],
  },
  {
    heading: "Security and maintenance: both choices need an owner",
    paragraphs: [
      "For WordPress, plan updates to the core software, theme, plugins and server environment. Reliable plugin sources, limited administrator permissions, secure access and restorable backups matter. Automatic updates help, but important functions still need checks: forms, search and ordering should work after changes. A hosting subscription does not necessarily include this application-level work.",
      "Next.js does not use WordPress plugins, but its framework and software dependencies also receive security fixes. The official Next.js announcement dated December 11, 2025 documents vulnerabilities and the need to update affected versions. This is not a claim that a currently updated website is vulnerable. It is a verifiable example of why saying custom websites never need maintenance is irresponsible.",
      "A static public website without a database or dashboard may expose fewer functions. Hosting accounts, domain access, the build process and contact services still matter. Adding a CMS, user accounts, payments or access to business systems increases what needs protection. Assess risk through architecture, data and permissions, rather than the platform name alone.",
      "Request a specific support agreement: who monitors advisories, who applies urgent fixes, how frequently backups are checked and when you can expect a response. A backup that nobody has attempted to restore is an incomplete recovery plan. Also clarify additional charges when an incident requires work beyond routine maintenance. Different response commitments can explain a substantial difference between support prices.",
      "You should also be able to change suppliers. Agree on access to the domain, hosting, source code, CMS and licences, alongside documentation for running and publishing the website. WordPress does not guarantee an easy handover of a neglected installation. Next.js does not automatically tie you to one developer. Delivery quality and documentation determine how practical a transition will be.",
    ],
    blocks: [{ type: "linkList", title: "Security references", items: [
      { label: "WordPress — official hardening guidance", href: "https://developer.wordpress.org/advanced-administration/security/hardening/" },
      { label: "Next.js — December 11, 2025 security announcement", href: "https://nextjs.org/blog/security-update-2025-12-11" },
    ] }],
  },
  {
    heading: "When is WordPress the better choice?",
    paragraphs: [
      "WordPress has a clear advantage when editing content is a daily task: a multi-author blog, organisational news, service descriptions or galleries that employees regularly update. Its block editor already handles text, photographs, headings and other common elements. With carefully prepared templates, the team can publish without redesigning each page or editing code.",
      "For a simpler business project with a limited budget, standard functionality and a preference for managing content yourself, there is no reason to reject WordPress in advance. It can use a custom design and carefully developed theme. WordPress does not necessarily mean a purchased template, just as Next.js does not automatically prove that a design is original.",
      "The OŠ Dule Karaklajić school website in the NMark Designs portfolio uses WordPress. Publishing notices and making documents accessible provide useful context for understanding the CMS approach. This is a verified example of the technology in use, rather than proof that another platform could not support the same content. Its project price and comparative business results are not disclosed here.",
      "For a conventional online store, WooCommerce is also worth considering, with a separate assessment of payments, delivery and product management. That is a broader decision than choosing a company presentation site. WordPress becomes a weaker fit when much of the budget goes into working around incompatible plugins while the underlying business process remains awkward for employees.",
    ],
    media: [{ image: "/projects/os-dule-karaklajic.webp", width: 1877, height: 868,
      alt: "OŠ Dule Karaklajić homepage, a WordPress project in the NMark Designs portfolio.",
      caption: "OŠ Dule Karaklajić: a verified WordPress project. This screenshot is not a performance measurement or evidence of business results.",
    }],
    blocks: [{ type: "linkList", title: "Explore the project and editor", items: [
      { label: "OŠ Dule Karaklajić — case study", href: "/en/portfolio/os-dule-karaklajic/" },
      { label: "WordPress — block editor documentation", href: "https://wordpress.org/documentation/article/wordpress-block-editor/" },
    ] }],
  },
  {
    heading: "When is Next.js the better choice?",
    paragraphs: [
      "Next.js makes sense when a website moves beyond a conventional presentation: a custom configurator, customer portal, catalog connected to a business system or a particular enquiry process. It is especially useful when precise control over the interface and data loading matters. WordPress also supports custom development; the decision depends on where your particular requirements can be implemented more simply and reliably.",
      "In the NMark Designs portfolio, Buy Pallet Jacks uses Next.js for a B2B website with a catalog and location information, following a migration from Squarespace. It illustrates a custom frontend in a business context. It is not a controlled WordPress-versus-Next.js experiment. We do not disclose its budget or attribute unmeasured sales growth to the technology.",
      "Next.js can also suit a small website with infrequent updates if straightforward development and agreed support fit the budget. Conversely, a team publishing daily should see the administration first: text entry, previews, images, translations and permissions. An attractive public website does not compensate for an inconvenient tool that employees must use every day.",
      "A combination is possible: WordPress manages content while Next.js presents public pages through an API. This headless approach can preserve familiar editing and support a custom frontend. Two connected systems, however, require extra work on draft previews, content refreshes, SEO data and maintenance. Choose this architecture when its benefits justify the additional complexity, rather than simply because both products are available.",
    ],
    blocks: [{ type: "linkList", title: "A project example and technical options", items: [
      { label: "Buy Pallet Jacks — case study", href: "/en/portfolio/buy-pallet-jacks/" },
      { label: "Next.js — self-hosting", href: "https://nextjs.org/docs/app/guides/self-hosting" },
      { label: "Next.js — static export features and limitations", href: "https://nextjs.org/docs/app/guides/static-exports" },
      { label: "WordPress — REST API for connecting systems", href: "https://developer.wordpress.org/rest-api/" },
    ] }],
  },
  {
    heading: "Business scenarios: what does ownership cost over three years?",
    paragraphs: [
      "The following figures are illustrative budgets for comparing proposals. They are not market averages, NMark Designs quotations or prices of the portfolio projects mentioned above. Every number is an input assumption. Totals exclude domains, taxes, writing, translation, migration and new feature development; add those from your own proposal. Both approaches assume the same agreed level of support.",
    ],
    blocks: [
      { type: "subsections", items: [
        {
          heading: "1. Local business: five pages and infrequent updates",
          paragraphs: [
            "Assume the company supplies content, there is no blog or editing dashboard, and support covers the same small allowance for changes in both solutions. For WordPress, use €900 development, plus €100 hosting, €60 licences and €300 support annually. For Next.js, use €1,300 development, plus €120 hosting, no paid licences and €300 support annually. These are calculation inputs, not advertised packages.",
            "Over three years that gives €2,280 for WordPress and €2,560 for Next.js: a €280 difference under these assumptions. If the Next.js quote is lower or WordPress needs no paid licences, the relationship changes. Either can serve this business. Build quality and the process for future changes matter more than technological prestige. Ask who will handle the occasional new photograph or updated service price.",
          ],
        },
        {
          heading: "2. Active publishing: a blog and independent editors",
          paragraphs: [
            "Both solutions must include a CMS and training. An illustrative WordPress budget is €1,200 development, followed annually by €120 hosting, €100 licences and €600 support: €3,660 over three years. For Next.js with a connected CMS, assume €2,000 development, then €240 hosting, €120 CMS and €600 support annually: €4,880 over three years. Any applicable CMS limits must fit the same editorial requirements.",
            "WordPress has the more economical calculation here if it already meets the team's needs. A particular public interface or connections to other channels might justify Next.js. Request demonstrations of identical publishing tasks from both suppliers. A cheaper CMS does not save money if employees spend extra time preparing every article. Confirm whether adding a new page template is included or requires a separate development request.",
          ],
        },
        {
          heading: "3. B2B catalog: a custom enquiry workflow and integration",
          paragraphs: [
            "Assume identical integration scope and support. WordPress: €3,000 development, then €240 hosting, €180 licences and €1,200 support annually, giving €7,860 over three years. Next.js: €4,000 development, then €240 hosting, no paid CMS or licences and €1,200 support annually, giving €8,320. The assumption is that data is managed in an existing business system rather than a newly purchased CMS.",
            "A €460 difference alone is insufficient reason to choose architecture that makes essential work harder. Check synchronisation, error handling, data ownership and the cost of the next integration. If a dependable WordPress plugin satisfies the whole requirement, it may be more economical. If it needs continual workarounds, custom Next.js development may be a better choice despite a higher initial investment. Test the actual business workflow before committing.",
          ],
        },
      ] },
      { type: "table", caption: "Illustrative calculation: development + 3 × (annual hosting + licences/CMS + support). All figures are assumed inputs in euros.", columns: ["Scenario", "WordPress: three years", "Next.js: three years"], rows: [
        ["Five pages", "900 + 3 × (100 + 60 + 300) = €2,280", "1,300 + 3 × (120 + 0 + 300) = €2,560"],
        ["Blog with a CMS", "1,200 + 3 × (120 + 100 + 600) = €3,660", "2,000 + 3 × (240 + 120 + 600) = €4,880"],
        ["B2B integration", "3,000 + 3 × (240 + 180 + 1,200) = €7,860", "4,000 + 3 × (240 + 0 + 1,200) = €8,320"],
      ] },
      { type: "checklist", items: [
        "Write down who edits content and how often.",
        "Request the same page count, languages, functions and support level in both proposals.",
        "Separate development, migration, hosting, CMS, licences and future changes.",
        "Check speed with real content and request a dashboard demonstration.",
        "Agree on updates, recovery, access and documentation handover.",
        "For an existing website, include content preservation and URL mapping.",
      ] },
      { type: "faq", items: [
        { question: "Is WordPress outdated in 2026?", answer: "It should not be rejected simply because of its age. A supported version, suitable theme, plugins and hosting matter. It can be a sensible choice for a content-focused business website." },
        { question: "Does Next.js automatically deliver better SEO?", answer: "No. It provides technical tools, but content, indexability, structure and implementation quality remain essential. Strong performance does not guarantee high rankings." },
        { question: "Can I update a Next.js website myself?", answer: "Yes, if an appropriate CMS or administration interface is included. Next.js itself does not include a ready-made editorial dashboard. Confirm which changes you can make without a developer before ordering." },
      ] },
      { type: "linkList", title: "Prepare a concrete decision", items: [
        { label: "Website development costs in Serbia — detailed guide", href: "/en/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
        { label: "NMark Designs services", href: "/en/services/" },
        { label: "Send your requirements for a new website or redesign", href: "/en/contact/" },
      ] },
    ],
  },
];

export const wordpressVsNextjs2026: Editorial = {
  image: "/blog/wordpress-nextjs-2026-cover.webp",
  heroBackground: { image: "/blog/wordpress-nextjs-2026-content.webp", width: 1586, height: 992, position: "center" },
  width: 1586,
  height: 992,
  alt: {
    sr: "WordPress i Next.js predstavljeni kroz dva ravnopravna prikaza uređivača sadržaja i namenskog web razvoja, u neutralnim i ljubičastim tonovima.",
    en: "WordPress and Next.js shown as equally prominent content editing and custom web development interfaces in neutral and purple tones.",
  },
  caption: {
    sr: "AI-generisana naslovna ilustracija poređenja WordPressa i Next.js-a. Vizuelni prikaz ne označava prednost jedne tehnologije.",
    en: "AI-generated cover illustration comparing WordPress and Next.js. The visual does not imply that one technology is superior.",
  },
  topic: { sr: "Web development · Izbor tehnologije · Poslovni sajtovi", en: "Web development · Technology choices · Business websites" },
  answer: {
    sr: "WordPress je često racionalniji za blog i tim koji samostalno uređuje sadržaj. Next.js ima smisla za namenski interfejs, integracije i posebne poslovne procese, uz jasno ugovoren način izmena. Oba mogu biti brza, bezbedna i dobro pripremljena za SEO. Poredite isti obim rada i ukupan trošak kroz tri godine, a ne samo početnu cenu.",
    en: "WordPress is often more practical for blogs and teams editing their own content. Next.js suits custom interfaces, integrations and specific business workflows, with an agreed update process. Both can be fast, secure and well prepared for SEO. Compare equal scope and three-year ownership costs rather than the initial development price alone.",
  },
  sections: { sr, en },
  sources: [
    { label: "WordPress — License", href: "https://wordpress.org/about/license/" },
    { label: "WordPress — Block Editor", href: "https://wordpress.org/documentation/article/wordpress-block-editor/" },
    { label: "WordPress — Hardening", href: "https://developer.wordpress.org/advanced-administration/security/hardening/" },
    { label: "WordPress — REST API Handbook", href: "https://developer.wordpress.org/rest-api/" },
    { label: "Next.js — Self-hosting", href: "https://nextjs.org/docs/app/guides/self-hosting" },
    { label: "Next.js — Static Exports", href: "https://nextjs.org/docs/app/guides/static-exports" },
    { label: "Next.js — Security Update, December 11, 2025", href: "https://nextjs.org/blog/security-update-2025-12-11" },
    { label: "Google Search Central — Core Web Vitals", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
    { label: "Google Search Central — Page Experience", href: "https://developers.google.com/search/docs/appearance/page-experience" },
    { label: "Hostinger — WordPress Hosting", href: "https://www.hostinger.com/wordpress-hosting" },
    { label: "Vercel — Pricing", href: "https://vercel.com/pricing" },
    { label: "Vercel — Hobby Plan", href: "https://vercel.com/docs/plans/hobby" },
  ],
  cta: {
    sr: {
      title: "WordPress ili Next.js za vaš posao?",
      description: "Pošaljite postojeći sajt, potrebne funkcije, okvirni budžet i ko će menjati sadržaj. Na osnovu toga možemo da predložimo pristup i obim rada koji odgovaraju vašim potrebama.",
      label: "Zatražite besplatnu procenu sajta",
      secondaryLabel: "Pogledajte cenovnik",
      secondaryHref: "/sr/cenovnik/",
    },
    en: {
      title: "WordPress or Next.js for your business?",
      description: "Send your existing website, required functions, approximate budget and who will edit the content. We can use that to suggest an approach and scope that fit your needs.",
      label: "Request a free website assessment",
      secondaryLabel: "View pricing",
      secondaryHref: "/en/pricing/",
    },
  },
};
