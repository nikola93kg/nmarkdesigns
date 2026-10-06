import type { Editorial } from "@/content/blog-editorial";
import type { BlogSection } from "@/content/blog";

const mythsRowsSr = [
  [
    "SEO je mrtav u eri AI pretrage",
    "Netačno",
    "AI pretraživači se oslanjaju na tradicionalne indekse i web retrieval. Bez crawlability, indeksabilnosti i tehničkog SEO-a, sajt uopšte ne ulazi u proces odabira izvora.",
  ],
  [
    "Ključne reči više nisu važne",
    "Obmanjujuće",
    "Pretraga se pomerila ka semantici i nameri korisnika, ali reči koje korisnici kucaju i dalje definišu temu. Ponavljanje fraza (keyword stuffing) jeste prevaziđeno, ali jasna terminologija ostaje ključna.",
  ],
  [
    "Schema.org garantuje prikaz u AI Overviews",
    "Netačno",
    "Strukturirani podaci pomažu mašinama da jednoznačno prepoznaju entitete i atribute, ali zvanično ne predstavljaju garanciju niti automatsku ulaznicu za generativne odgovore.",
  ],
  [
    "Fajl llms.txt ubacuje sajt u ChatGPT",
    "Nema dokaza",
    "llms.txt je eksperimentalni predlog koji pretraživači nisu usvojili kao standard. ChatGPT Search koristi OAI-SearchBot i standardno indeksiranje weba, a ne llms.txt direktive.",
  ],
  [
    "Samo sajtovi iz organskih top 10 mogu biti citirani",
    "Netačno",
    "Iako postoji snažna korelacija sa visokim organskim rangom, analize pokazuju da tehnologije poput 'query fan-out' pretražuju specifična potpitanja i citiraju relevantne stranice van prvih pozicija.",
  ],
  [
    "Backlinkovi više nisu važan faktor",
    "Netačno",
    "Linkovi ostaju ključni signal poverenja i autoriteta domena na webu. Ono što se menja jeste da u AI okruženju i kvalitetna pominjanja brenda (brand mentions) dobijaju sve veću težinu.",
  ],
  [
    "Masovno objavljivanje AI tekstova poboljšava vidljivost",
    "Netačno",
    "Generički sadržaj bez originalnih činjenica, dokaza i iskustva podložan je Google sistemima za filtriranje bezvrednog sadržaja i retko biva odabran kao autoritativan izvor.",
  ],
  [
    "Dodavanje FAQ sekcije automatski donosi AI citat",
    "Netačno",
    "Pitanja i odgovori pomažu strukturisanju misli, ali puki FAQ format bez suštinske vrednosti, jedinstvenih podataka i autoriteta ne garantuje AI citiranje.",
  ],
] as const;

const mythsRowsEn = [
  [
    "SEO is dead in the age of AI search",
    "False",
    "AI search engines rely on traditional indexes and web retrieval. Without crawlability, indexability, and technical SEO, a website never even enters the retrieval pool.",
  ],
  [
    "Keywords no longer matter at all",
    "Misleading",
    "Search has shifted towards semantics and user intent, but the actual terms people use still define topics. Keyword stuffing is obsolete, but clear terminology remains essential.",
  ],
  [
    "Schema.org guarantees inclusion in AI Overviews",
    "False",
    "Structured data helps machines disambiguate entities and page attributes, but it does not represent an official guarantee or express ticket into generative answers.",
  ],
  [
    "Adding an llms.txt file gets your site into ChatGPT",
    "No evidence",
    "llms.txt is an experimental community proposal not officially adopted as a standard by search engines. ChatGPT Search relies on OAI-SearchBot and web indexing, not llms.txt.",
  ],
  [
    "Only websites ranked in the organic top 10 get cited",
    "False",
    "While correlation with traditional rank is high, studies show mechanisms like query fan-out search for specific sub-questions and cite useful pages well beyond the top organic slots.",
  ],
  [
    "Backlinks no longer matter for visibility",
    "False",
    "Links remain a cornerstone of web authority and trust signals. What changes in AI search is that unlinked brand mentions also serve as complementary topical entity indicators.",
  ],
  [
    "Publishing hundreds of AI-generated articles boosts visibility",
    "False",
    "Generic content without verified data, first-hand experience, or original insight is filtered out by helpful content systems and rarely selected as an authoritative source.",
  ],
  [
    "Adding an FAQ block automatically generates an AI citation",
    "False",
    "Clear Q&A structures help information architecture, but an empty FAQ template lacking substance, unique facts, and authority will not trigger generative citations.",
  ],
] as const;

const searchComparisonRowsSr = [
  [
    "SEO",
    "Search Engine Optimization",
    "Neophodna osnova: tehnička dostupnost, indeksabilnost, arhitektura sajta, brzina i autoritet.",
  ],
  [
    "AEO",
    "Answer Engine Optimization",
    "Strukturisanje sadržaja za direktne odgovore, glasovnu pretragu i featured snippete.",
  ],
  [
    "GEO",
    "Generative Engine Optimization",
    "Prilagođavanje sadržaja za citiranje i preporučivanje unutar generativnih modela i AI pregleda.",
  ],
  [
    "AI Search Optimization",
    "Krovni termin za modernu pretragu",
    "Najprecizniji praktični pojam: evolucija SEO-a koja kombinuje tehničku bazu, jasne činjenice i jačinu brenda.",
  ],
  [
    "AIO",
    "AI Overviews",
    "Google funkcionalnost koja prikazuje generativni sažetak na vrhu rezultata (koristiti pažljivo zbog skraćenice).",
  ],
] as const;

const searchComparisonRowsEn = [
  [
    "SEO",
    "Search Engine Optimization",
    "The required foundation: crawlability, indexability, site architecture, performance, and authority.",
  ],
  [
    "AEO",
    "Answer Engine Optimization",
    "Structuring content to provide direct, concise answers for featured snippets and voice assistants.",
  ],
  [
    "GEO",
    "Generative Engine Optimization",
    "Optimizing visibility and citation frequency within generative LLMs and synthesis engines.",
  ],
  [
    "AI Search Optimization",
    "Umbrella term for modern search",
    "The most accurate industry term: an evolution of SEO combining technical hygiene, verified facts, and brand strength.",
  ],
  [
    "AIO",
    "AI Overviews",
    "Google's specific generative summary feature rendered at the top of SERPs (abbreviation used with care).",
  ],
] as const;

const sectionsSr: readonly BlogSection[] = [
  {
    heading: "Zašto borba za prvo mesto više nije dovoljna?",
    paragraphs: [
      "Zamislimo preduzetnika koji u Google unosi upit: „Koliko košta izrada web sajta u Beogradu?“. Do skora, putanja je bila pravolinijska: Google prikaže deset plavih linkova, korisnik klikne na prva dva ili tri rezultata, uporedi ponude agencija i pošalje upit.",
      "Danas je iskustvo pretrage suštinski drugačije. Google AI Overview ili ChatGPT Search odmah formiraju sintetizovan pregled na samom vrhu ekrana: razdvajaju cene osnovnih prezentacija, internet prodavnica i custom aplikacija, navode šta utiče na troškove, koje su uobičajene faze izrade, pa tek onda nude kartice sa izvorima.",
      "Korisnik više ne mora da otvori pet različitih sajtova da bi dobio preliminarnu sliku tržišta. To znači da se takmičenje na internetu više ne vodi isključivo za poziciju #1 u organskim rezultatima. Borba se sve češće vodi za to da vaš sajt postane jedan od izvora koji AI koristi da bi uopšte formulisao odgovor.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Suština promene",
        statement: "Vaš sajt više ne mora biti samo najbolji rezultat koji korisnik posećuje — mora biti i pouzdan izvor koji AI pretraživač rado citira.",
        note: "Ako AI model ne može da razume strukturu i podatke na vašoj stranici, ona ostaje nevidljiva za novi talas sinteznih odgovora.",
      },
    ],
  },
  {
    heading: "Šta se zapravo promenilo u Google pretrazi?",
    paragraphs: [
      "Da bismo pripremili sajt, moramo precizno razumeti mehaniku. Tradicionalni pretraživači su funkcionisali kao indeksirani katalozi: korisnik ukuca frazu, algoritam rangira dokumente prema relevantnosti i linkovima, a korisnik samostalno pregleda stranice.",
      "U AI Search modelu, pretraživač postaje analitičar i sintezni agregator. On analizira korisničko pitanje, po potrebi samostalno pokreće više paralelnih internih upita, preuzima delove sadržaja iz desetak izvora, sklapa logičan odgovor i na kraju postavlja linkove ka izvorima odakle su podaci preuzeti.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "Tradicionalna Google pretraga",
            body: "Linearni proces u kome korisnik sam obavlja selekciju i analizu sajtova.",
            list: [
              "Korisnik unosi specifičnu ključnu reč",
              "Google prikazuje rangiranu listu plavih linkova",
              "Korisnik klikne na prvi ili drugi sajt",
              "Korisnik sam traži odgovor unutar stranice",
            ],
          },
          {
            title: "AI Search i generativni odgovori",
            body: "Konverzacijska sinteza gde mašina čita, filtrira i sklapa celinu.",
            list: [
              "Korisnik postavlja kompleksno pitanje na prirodnom jeziku",
              "AI pokreće više povezanih pretraga u pozadini (fan-out)",
              "Sistem preuzima i sintetizuje podatke iz više izvora",
              "Prikazuje se direktan odgovor sa karticama citata",
              "Klik sledi samo kada korisnik želi dublji kontekst",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Šta su Google AI Overviews i šta je Google AI Mode?",
    paragraphs: [
      "Google AI Overviews (nekada poznati kao Search Generative Experience ili SGE) predstavljaju AI-generisane blokove na vrhu Google rezultata. Za razliku od klasičnog 'Featured Snippet-a' koji je samo citirao jedan pasus sa jedne rangirane stranice, AI Overview stvara nov, fluidan tekst kombinujući informacije iz više dokumenata.",
      "Google ove preglede ne prikazuje za svaki upit. Oni se najčešće aktiviraju kod informativnih, poređivačkih i višeslojnih pretraga gde korisnik traži objašnjenje, preporuku ili poređenje.",
      "Uz AI Overviews, Google razvija i 'AI Mode' — potpuno konverzacijsko iskustvo pretrage gde korisnik vodi dijalog i postavlja potpitanja. U ovom režimu ključnu ulogu igra takozvani 'query fan-out'.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Definicija",
            title: "Google AI Overview",
            body: "Generativni odgovor unutar standardnih rezultata koji kombinuje više izvora u jedinstvenu celinu sa linkovanim referencama.",
          },
          {
            eyebrow: "Koncept",
            title: "Query Fan-out",
            body: "Mehanizam gde sistem jedno korisničko pitanje automatski razlaže na 3 do 5 specifičnih potpitanja i istražuje ih paralelno.",
          },
          {
            eyebrow: "Praktična posledica",
            title: "Domet van pozicije #1",
            body: "Zahvaljujući razlaganju upita, stranica koja nije na vrhu za glavno pitanje može biti citirana ako precizno odgovara na jedno od potpitanja.",
          },
        ],
      },
    ],
  },
  {
    heading: "ChatGPT Search radi malo drugačije",
    paragraphs: [
      "I dok se Google oslanja na svoj kolosalni web indeks i decenije rangiranja, OpenAI je integrisao namensku pretragu weba direktno u ChatGPT. ChatGPT Search funkcioniše preuzimanjem informacija u realnom vremenu uz prikaz izvora i direktnih citata sa desne strane odgovora.",
      "Za vlasnike sajtova i developere ovde postoji ključna tehnička distinkcija koju dokumentuje sam OpenAI: razlika između pretraživačkog bota i bota za treniranje modela.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "OAI-SearchBot: Pretraživački crawler",
            paragraphs: [
              "OAI-SearchBot služi isključivo za pronalaženje, indeksiranje i prikazivanje web stranica unutar ChatGPT Search rezultata. On ne koristi vaš sadržaj za treniranje budućih osnovnih modela.",
              "Ako u vašem robots.txt fajlu blokirate ovog bota, vaš sajt se neće moći pojaviti kao citirani izvor kada korisnici pretražuju internet kroz ChatGPT.",
            ],
            list: [
              "User-agent: OAI-SearchBot",
              "Svrha: Prikaz i citiranje u pretragama",
              "Preporuka: Dozvolite pristup (Allow: /) ukoliko želite vidljivost",
            ],
          },
          {
            heading: "GPTBot: Bot za prikupljanje podataka za trening",
            paragraphs: [
              "GPTBot je zaseban crawler koji OpenAI koristi za preuzimanje javnog weba u svrhu treniranja novih veštačkih inteligencija.",
              "Svaka firma ima potpuno legitimno pravo da u robots.txt blokira GPTBot kako njen originalni rad ne bi služio za mašinsko treniranje, a da istovremeno ostavi OAI-SearchBot otvorenim za pretragu.",
            ],
            list: [
              "User-agent: GPTBot",
              "Svrha: Trening AI modela",
              "Važno: Blokiranje GPTBot-a NE uklanja sajt iz ChatGPT Search-a ako je OAI-SearchBot dozvoljen",
            ],
          },
        ],
      },
      {
        type: "verdict",
        title: "Tehnička napomena",
        statement: "Dozvola u robots.txt fajlu je ulaznica za stadion, a ne garantovano mesto u prvoj postavi.",
        note: "Otvaranje vrata za OAI-SearchBot omogućava indeksiranje, ali citiranje zavisi od jasnoće i autoriteta sadržaja.",
      },
    ],
  },
  {
    heading: "Da li SEO onda umire?",
    paragraphs: [
      "Kratak i direktan odgovor glasi: ne. SEO ne umire, već se razvija.",
      "Da bi bilo koji veštački inteligentni sistem — bilo Google Gemini ili OpenAI — mogao da citira vašu stranicu, ona prvo mora da prođe kroz klasične filtere koje SEO inženjeri grade decenijama. Stranica mora biti tehnički dostupna botovima (crawlable), mora biti u indeksu (indexable), mora se brzo učitavati, posedovati stabilan HTML i imati jasan tematski autoritet.",
      "AI Search ne briše SEO; on stvara novi sloj na vrhu postojećih temelja.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Nivo 01", title: "Crawlability i indeksabilnost — Osnovni tehnički pristup pretraživačima" },
          { label: "Nivo 02", title: "Tehnički SEO i performanse — Čist HTML, Core Web Vitals i stabilnost" },
          { label: "Nivo 03", title: "Originalan i relevantan sadržaj — Podaci, iskustvo i direktni odgovori" },
          { label: "Nivo 04", title: "Struktura i entiteti — Semantičke oznake, Schema.org i doslednost brenda" },
          { label: "Nivo 05", title: "AI Search vidljivost — Pozicioniranje u AI Overviews i ChatGPT citatima" },
        ],
      },
    ],
  },
  {
    heading: "SEO, AEO i GEO: šta znače, a šta je samo novi naziv?",
    paragraphs: [
      "Kako se tehnologija menjala, marketinška industrija je požurila da izmisli nove skraćenice. Čućete za AEO (Answer Engine Optimization) i GEO (Generative Engine Optimization). Pre nego što poverujete agencijama koje ove pojmove prodaju kao 'skupe nove tajne', pogledajmo šta oni zapravo predstavljaju.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Uporedni pregled terminologije u modernoj optimizaciji pretrage.",
        columns: ["Termin", "Značenje", "Praktična uloga"],
        rows: searchComparisonRowsSr,
      },
      {
        type: "verdict",
        title: "Zdrav razum za vlasnike sajtova",
        statement: "GEO i AEO nisu zamena za SEO, već njegova prirodna evolucija ka direktnijem formulisanju odgovora.",
        note: "Ako je sajt tehnički spor, neindeksovan i pun generičkih rečenica, nikakva 'GEO optimizacija' ga neće magično spasiti.",
      },
    ],
  },
  {
    heading: "Problem koji vlasnici sajtova već osećaju: manje klikova",
    paragraphs: [
      "Mnogi vlasnici biznisa primećuju neobičan trend u analitici: impresije na Google-u rastu ili ostaju stabilne, ali broj poseta opada. Razlog leži u rastu fenomena 'zero-click' pretraga — situacija u kojima korisnik dobije potpun odgovor na samom Google-u i nema potrebu da klikne na bilo koji sajt.",
      "Prema opsežnoj analizi koju su sproveli SparkToro i Similarweb na reprezentativnom uzorku američkog internet saobraćaja, zabeležen je izuzetno visok procenat pretraga koje se završavaju bez odlaska na eksterne sajtove.",
    ],
    blocks: [
      {
        type: "metrics",
        items: [
          {
            label: "SparkToro / Similarweb (SAD, Jan–Apr 2024/2026)",
            title: "Zero-click pretrage",
            value: "68,01%",
            body: "Udeo desktop i mobilnih Google pretraga u analiziranom uzorku koji se završio bez klika na organski ili plaćeni sajt.",
          },
          {
            label: "Priroda upita",
            title: "Informativni udar",
            value: "Najveći pad",
            body: "Jednostavna pitanja (vremenska prognoza, definicije, kursevi, radno vreme) trpe najveći gubitak saobraćaja.",
          },
          {
            label: "Komercijalna namera",
            title: "Transakcije i upiti",
            value: "Stabilan klik",
            body: "Kada korisnik bira izvođača, kupuje proizvod ili traži lokalnu uslugu, poseta sajtu ostaje ključan korak.",
          },
        ],
      },
      {
        type: "subsections",
        items: [
          {
            heading: "Šta ovaj podatak zaista znači za srpske firme?",
            paragraphs: [
              "Prvo, ovaj procenat je izmeren na tržištu Sjedinjenih Američkih Država gde su AI opcije implementirane ranije i agresivnije nego u našem regionu.",
              "Drugo, to ne znači da je 68% vaših potencijalnih kupaca nestalo. Posetilac koji je nekada tražio definiciju pojma nije nužno bio spreman da naruči uslugu. Korisnik koji danas klikne na vaš sajt nakon što je pročitao AI sažetak često ima viši nivo namere i jasnije zahteve.",
              "Zato moderna metrika uspeha više ne može biti samo sirov broj poseta (sessions). Pravi pokazatelj su stvarni upiti, pozivi, prodaje i sklopljeni poslovi.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Kako AI bira koje izvore da citira?",
    paragraphs: [
      "Postoji ogromna količina dezinformacija o tome kako algoritmi biraju citate. Neki tvrde da 'AI voli bulete', drugi da morate imati llms.txt, treći da schema donosi zagarantovan plasman. Da bismo donosili racionalne poslovne odluke, moramo jasno razdvojiti činjenice od nagađanja.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Nivo 1 — Potvrđeno",
            title: "Zvanične tehničke činjenice",
            body: "Stranica mora biti indeksibilna u pretraživaču. Google AI sistemi grade svoje odgovore na osnovu glavnih Google indeksa. ChatGPT Search koristi namensko preuzimanje weba. OAI-SearchBot kontroliše pristup ChatGPT pretraživaču.",
            list: [
              "Ispravan robots.txt i HTTP 200 status",
              "Sadržaj dostupan u sirovom HTML-u",
              "Indeksiranost u Google i Bing bazi",
            ],
          },
          {
            eyebrow: "Nivo 2 — Jaki podaci",
            title: "Korelacije potvrđene istraživanjima",
            body: "Stranice sa jakim organskim pozicijama znatno češće bivaju citirane. Međutim, citati dolaze i van top 10 zahvaljujući query fan-out pretragama. Postoji snažna korelacija između pominjanja brenda na autoritativnim mestima i AI vidljivosti.",
            list: [
              "Visok organski autoritet domena",
              "Citati iz tematski specifičnih podstranica",
              "Prepoznatljivost brenda na spoljnim portalima",
            ],
          },
          {
            eyebrow: "Nivo 3 — Nije dokazano",
            title: "Mitovi i marketinške zablude",
            body: "Nijedno zvanično istraživanje niti dokumentacija ne potvrđuju da Schema garantuje AI Overview, da llms.txt ubacuje sajt u ChatGPT, da su 'bulet liste' rangirajući faktor ili da masovni AI tekstovi donose prednost.",
            list: [
              "Schema NE garantuje generativni citat",
              "llms.txt nema zvaničan pretraživački status",
              "Formatiranje bez suštine ne donosi ništa",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Kako napraviti sadržaj koji AI lakše razume?",
    paragraphs: [
      "Cilj pripreme sadržaja nije da se dodvoravamo veštačkoj inteligenciji, već da informacije organizujemo tako da budu maksimalno jasne i posetiocu i algoritmu. Dobra informaciona arhitektura pomaže čoveku da brzo pronađe podatak, a Retrieval-Augmented Generation (RAG) sistemima olakšava da iz teksta izvuku precizne i nedvosmislene odgovore.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "1. Odgovor prvo, objašnjenje posle (Inverted Pyramid)",
            paragraphs: [
              "Loš pristup: 'Cena izrade web sajta zavisi od velikog broja faktora, u današnjem digitalnom svetu svaka firma ima specifične zahteve i mi pristupamo svakom klijentu individualno...'. Ovo je prazan uvod koji ne donosi nikakvu informaciju.",
              "Bolji pristup: 'Izrada poslovnog sajta u Srbiji u 2026. godini najčešće se kreće u rasponu od 500 do 1.500 EUR za osnovne prezentacije, dok naprednija custom rešenja i e-commerce projekti zahtevaju veće budžete u zavisnosti od obima i integracija.'",
              "Kada direktan odgovor stavite u prvu rečenicu, AI sistem odmah prepoznaje definiciju i činjenicu koju može da upotrebi kao citat.",
            ],
          },
          {
            heading: "2. Jasni, tematski H2 i H3 naslovi",
            paragraphs: [
              "Svaka sekcija treba da odgovara na jedno konkretno pitanje. Izbegavajte poetske ili apstraktne naslove poput 'Nova dimenzija poslovanja'. Umesto toga koristite jasne naslove: 'Koliko traje izrada web shopa?', 'Koje tehnologije koristimo?', 'Kako izgleda proces održavanja?'.",
            ],
          },
          {
            heading: "3. Konkretni podaci umesto opštih tvrdnji",
            paragraphs: [
              "AI pretraživači traže činjenice: brojke, rokove, garancije, alate, tehničke standarde i ograničenja. Umesto 'radimo veoma brzo', napišite 'prosečan rok za izradu landing stranice je 7 do 14 radnih dana'.",
            ],
          },
          {
            heading: "4. Originalno iskustvo i dokazano znanje",
            paragraphs: [
              "Ono što AI model ne može samostalno da generiše jesu vaša stvarna iskustva: studije slučaja, fotografije radionice, primeri problema koje ste rešili na terenu, specifični izazovi klijenata i merljivi ishodi. Sajt koji deli autentične lekcije iz prakse poseduje trajnu vrednost.",
            ],
          },
          {
            heading: "5. Pregledne tabele i strukturisana poređenja",
            paragraphs: [
              "Tabela nije ukras za bota, već najpregledniji format za posetioca. Kada upoređujete nivoe usluga, cene, materijale ili tehničke razlike, tabela pruža mašini savršeno strukturisanu matricu podataka koju je lako ekstrahovati.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Brend postaje ključni deo SEO strategije",
    paragraphs: [
      "U eri klasičnog SEO-a glavno pitanje je bilo: „Šta vaš sajt kaže o sebi kroz ključne reči?“. U eri AI pretrage pitanje glasi: „Šta celokupan internet kaže o vašem brendu?“.",
      "Veliki jezički modeli i pretraživački sistemi formiraju sliku o entitetima na osnovu konsenzusa na webu. Ako se ime vaše firme redovno pominje u stručnim člancima, na lokalnim portalima, poslovnim registrima, u recenzijama klijenata i na relevantnim forumima, sistem stiče poverenje da je reč o stvarnom, aktivnom biznisu.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Poverenje",
            title: "Konzistentna pominjanja (Brand Mentions)",
            body: "Čak i kada pominjanje vašeg brenda ne sadrži aktivan link, savremeni jezički modeli ga registruju kao signal asocijacije sa vašom industrijom.",
          },
          {
            eyebrow: "Zajednički kontekst",
            title: "Ko-citiranje (Co-occurrence)",
            body: "Kada se ime vaše firme pojavljuje u istom kontekstu sa ključnim pojmovima (npr. 'izrada sajtova', 'Beograd', 'Next.js'), entitet dobija jače tematske veze.",
          },
          {
            eyebrow: "Oprez",
            title: "Korelacija nije uzročnost",
            body: "Iako studije pokazuju visoku korelaciju između prepoznatljivosti brenda i AI vidljivosti, pominjanje bez pokrića ne zamenjuje tehnički kvalitet i autoritet.",
          },
        ],
      },
      {
        type: "verdict",
        title: "Status linkova",
        statement: "Backlinkovi ostaju temelj SEO autoriteta. Ono što je novo jeste da ne smete ignorisati ni pominjanja brenda bez linka.",
        note: "Gradite reputaciju na mestima gde se vaši potencijalni klijenti zaista informišu.",
      },
    ],
  },
  {
    heading: "AI Search i lokalni biznis u Srbiji",
    paragraphs: [
      "Za preduzetnike, zanatlije, ordinacije, agencije i uslužne delatnosti u Beogradu, Novom Sadu, Nišu i drugim gradovima Srbije, lokalna pretraga je krvotok poslovanja. AI pretraživači kod lokalnih upita — poput „časovi francuskog Beograd“, „servis klima uređaja Novi Sad“ ili „advokat za nekretnine Beograd“ — primenjuju specifične kriterijume.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "Google Business Profile ostaje prioritet broj jedan",
            paragraphs: [
              "Pre nego što se upustite u složene optimizacije koda, uverite se da je vaš Google Business Profile besprekoran. On direktno hrani lokalne mape i AI preglede osnovnim parametrima: tačan naziv, primarna kategorija delatnosti, fizička adresa ili reon rada, radno vreme, kontakt telefon i web sajt.",
            ],
          },
          {
            heading: "Autentične recenzije stvarnih klijenata",
            paragraphs: [
              "Nemojte kupovati generičke recenzije sa lažnih profila. Google i AI sistemi analiziraju jezik u recenzijama: kada stvarni klijent napiše 'ugradili su inverter klimu u stanu na Novom Beogradu u roku od tri sata', taj tekst direktno potvrđuje vašu specijalizaciju i lokaciju.",
            ],
          },
          {
            heading: "NAP konzistentnost (Name, Address, Phone)",
            paragraphs: [
              "Ime firme, adresa i broj telefona moraju biti identični na sajtu, u impressumu, na Google mapi, privrednim imenicima i društvenim mrežama. Bilo kakvo razmimoilaženje stvara zabunu u mašinskom prepoznavanju entiteta.",
            ],
          },
          {
            heading: "Prestanite sa štancovanjem 50 identičnih gradskih stranica",
            paragraphs: [
              "Stara SEO praksa pravljenja stranica /usluga-beograd, /usluga-zemun, /usluga-vozdovac sa identičnim tekstom gde je zamenjeno samo ime opštine danas je štetna. Napravite kvalitetne stranice usluga samo tamo gde zaista imate kancelariju, fizičko prisustvo ili specifične realizovane projekte.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Structured data: korisno, ali nije čarobni prekidač",
    paragraphs: [
      "Strukturirani podaci (Schema.org) predstavljaju standardizovan format kojim u kodu stranice eksplicitno saopštavate pretraživačima šta pojedini elementi znače: ko je autor članka, koja organizacija stoji iza sajta, gde se nalazi sedište firme, koje usluge nudite i koje su njihove cene.",
      "Često se postavlja pitanje: da li schema obezbeđuje ulazak u Google AI Overview? Zvaničan odgovor glasi: ne. Google nigde ne obećava da će stranica sa Article ili LocalBusiness schemom biti uvrštena u generativni sažetak.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Osnovni entitet",
            title: "Organization & LocalBusiness",
            body: "Povezuje ime firme, zvaničan logo, kontakt podatke, adresu, PIB i profile na mrežama u jedinstven mašinski čitljiv entitet.",
          },
          {
            eyebrow: "Sadržaj i autorstvo",
            title: "Article / BlogPosting",
            body: "Jasno definiše naslov, datum objave, datum izmene, autora i izdavača, čime se potvrđuje poreklo i svežina informacija.",
          },
          {
            eyebrow: "Navigacija i hijerarhija",
            title: "BreadcrumbList",
            body: "Pomaže pretraživačima da razumeju logičku dubinu i strukturu sajta od početne strane do specifične usluge.",
          },
        ],
      },
      {
        type: "verdict",
        title: "Pravilo poštenja",
        statement: "Strukturirani podaci moraju verno odražavati ono što korisnik vidi na ekranu.",
        note: "Nikada nemojte u šemu ubacivati lažne ocene sa pet zvezdica, nepostojeće nagrade ili izmišljene recenzije. To vodi direktno do algoritamske penalizacije.",
      },
    ],
  },
  {
    heading: "Da li nam treba llms.txt?",
    paragraphs: [
      "Tokom proteklih meseci na internetu se pojavio predlog uvođenja fajla pod nazivom `llms.txt`. Ideja je bila da se, po uzoru na `robots.txt`, u koren sajta postavi tekstualni fajl sa sažetim uputstvima i linkovima prilagođenim velikim jezičkim modelima.",
      "Da li vlasnik sajta u 2026. treba da troši vreme i novac na implementaciju `llms.txt` fajla? Kratak odgovor je: **trenutno ne kao prioritet**.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Status: Eksperimentalno",
        statement: "Ne postoji nijedan dokaz da Google, Bing ili OpenAI koriste llms.txt kao zvanični rangirajući ili indeksirajući standard.",
        note: "Ako vam je tehnički SEO loš, stranice spore, a sadržaj prazan, postavljanje llms.txt fajla neće rešiti nijedan problem.",
      },
      {
        type: "subsections",
        items: [
          {
            heading: "Gde je pravo mesto za ulaganje energije?",
            paragraphs: [
              "Pretraživači su izgrađeni da čitaju semantički HTML. Umesto kreiranja eksperimentalnih tekstualnih fajlova za koje nema potvrde u pretraživačkoj praksi, uložite trud u čist HTML: semantičke tagove (header, main, section, article), brze servere, ispravne meta podatke i sajt koji radi bez greške.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Primer: „Izrada web sajtova Beograd“ pre i posle",
    paragraphs: [
      "Da bismo videli kako teorija izgleda u praksi, pogledajmo hipotetički, ali vrlo čest primer jedne prosečne stranice usluge u Srbiji. Uporedićemo zastareli SEO pristup zasnovan na ponavljanju reči i savremeni pristup prilagođen korisniku i AI sintezi.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "Stari SEO pristup (Prezasićenost ključnim rečima)",
            body: "Tekst pisan isključivo za stare algoritme, bez konkretnih informacija za posetioca.",
            list: [
              "„Izrada web sajtova Beograd je naša strast. Ako vam treba profesionalna izrada web sajtova u Beogradu, nudimo najpovoljniju izradu...“",
              "Superlativi bez pokrića: „najbolji tim“, „vrhunski kvalitet“, „100% garancija uspeha“",
              "Nema cena, raspona budžeta niti objašnjenja šta utiče na troškove",
              "Nema opisa tehnologija, faza izrade niti realnih rokova",
              "Nema stvarnih studija slučaja sa rezultatima klijenata",
              "Generička pitanja u FAQ sekciji koja ne daju konkretne odgovore",
            ],
          },
          {
            title: "Savremeni pristup (Fokus na činjenice i nameru)",
            body: "Jasno strukturisan dokument koji odgovara na realna pitanja i pruža proverljive dokaze.",
            list: [
              "Jasna definicija: ko smo, za koga radimo i koje tipove sajtova izrađujemo",
              "Transparentni okviri: šta ulazi u osnovni sajt, a šta u custom aplikaciju",
              "Faze procesa: planiranje, UX/UI dizajn, Next.js razvoj, testiranje i puštanje",
              "Okviran rok: landing page 1–2 nedelje, kompleksan sajt 4–8 nedelja",
              "Pravi portfolio primeri sa opisom zadatka, tehničke odluke i isporučenog rešenja",
              "Tehnički detalji: Core Web Vitals optimizacija, bezbednost i CMS platforma",
            ],
          },
        ],
      },
      {
        type: "verdict",
        title: "Rezultat za pretragu i konverziju",
        statement: "Ni savremena stranica nema garanciju da će uvek biti citirana u AI Overview-u — ali je višestruko korisnija za čoveka i znatno lakša za analizu mašini.",
        note: "Kada posetilac dođe na sajt koji jasno odgovara na njegova pitanja, verovatnoća slanja upita je neuporedivo veća.",
      },
    ],
  },
  {
    heading: "Da li treba koristiti AI za pisanje sadržaja na sajtu?",
    paragraphs: [
      "Mnogi vlasnici sajtova su pojavu alata poput ChatGPT-a i Claude-a shvatili kao priliku da za jedno popodne generišu 200 blog tekstova. Takva strategija danas predstavlja najbrži put ka marginalizaciji sajta.",
      "Google-ove smernice su vrlo jasne: pretraživač ne kažnjava sadržaj samo zato što je u njegovom nastanku korišćen AI alat. Problem nastaje kada se AI koristi kao fabrika niskokvalitetnog, masovnog sadržaja čiji je jedini cilj manipulisanje rezultatima pretrage.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "AI kao pametan asistent u radu (Preporučeno)",
            paragraphs: [
              "Koristite AI za istraživanje tema, pravljenje plana članka, prepoznavanje rupa u logici, lekturu teksta, prevođenje tehničkih skraćenica na jednostavan jezik i sažimanje dugačkih materijala.",
              "U ovoj ulozi AI ubrzava proces, ali čovek donosi činjenice, proverava tačnost podataka i garantuje kvalitet.",
            ],
          },
          {
            heading: "AI kao automatska fabrika sadržaja (Rizično i neuspešno)",
            paragraphs: [
              "Objavljivanje tekstova bez provere, generisanje lažnih studija slučaja, izmišljanje statistika i kreiranje stotina stranica bez ljudskog iskustva dovodi do toga da sajt biva prepoznat kao bezvredan.",
              "Ako tekst može da napiše bilo ko sa jednim promptom, on nema nikakvu konkurentsku prednost niti razlog da ga AI pretraživač izdvoji kao originalan izvor.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Checklist: da li je vaš sajt spreman za AI Search?",
    paragraphs: [
      "Da biste tačno znali gde se vaš sajt nalazi i šta treba prvo da rešavate, kreirali smo kontrolnu listu raspoređenu po nivoima prioriteta.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Nivo 1 — Neophodno",
            title: "Kritični tehnički temelji",
            body: "Bez ovih stavki sajt uopšte ne postoji za pretraživačke botove i AI agente.",
            list: [
              "Sajt je indeksibilan i nema grešaka u robots.txt fajlu",
              "OAI-SearchBot ima dozvoljen pristup (ako želite ChatGPT vidljivost)",
              "Ključne stranice vraćaju HTTP status 200 i stabilne kanonikale",
              "XML sitemap postoji, ažurna je i prijavljena u Search Console",
              "Glavni sadržaj je prisutan u server-rendered HTML-u",
              "Kontakt podaci, PIB i identitet firme su jasno istaknuti",
            ],
          },
          {
            eyebrow: "Nivo 2 — Visok prioritet",
            title: "Struktura, dokazi i autoritet",
            body: "Elementi koji omogućavaju mašini da prepozna vrednost i preporuči vas kao izvor.",
            list: [
              "Stranice usluga sadrže jasne definicije, rokove i faze rada",
              "Pravi portfolio primeri sa opisom rešenja i rezultatima",
              "Logična interna povezanost (internal linking) između tema",
              "Ažuran Google Business Profile i stvarne ocene klijenata",
              "Schema.org oznake (Organization, LocalBusiness, Article)",
              "Potpisani autori tekstova sa stvarnim iskustvom",
            ],
          },
          {
            eyebrow: "Nivo 3 — Srednji prioritet",
            title: "Optimizacija i širenje prisustva",
            body: "Fino podešavanje koje pravi razliku na konkurentnijim tržištima.",
            list: [
              "Pregledne tabele za specifikacije i poređenja ponuda",
              "Strukturisana FAQ sekcija koja odgovara na stvarna pitanja",
              "Pominjanja firme na lokalnim i stručnim portalima (digital PR)",
              "Redovno osvežavanje važnih vodiča novim podacima",
              "Praćenje Bing Webmaster Tools konzole",
            ],
          },
          {
            eyebrow: "Nivo 4 — Eksperimentalno",
            title: "Pristupi u povoju",
            body: "Stavke koje ne treba raditi pre nego što nivoi 1, 2 i 3 budu potpuno rešeni.",
            list: [
              "Kreiranje llms.txt fajla (opciono, bez dokazanog uticaja na Google)",
              "Eksperimentisanje sa custom AI sažecima",
              "Podešavanje nestandardnih direktiva za pojedinačne jezičke modele",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "8 mitova o AI SEO-u: šta je istina, a šta zabluda?",
    paragraphs: [
      "U domaćoj i svetskoj javnosti kruži pregršt poluinformacija. Sledeća tabela sumira najčešće mitove i daje njihovu trezvenu ocenu zasnovanu na tehničkim činjenicama.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Činjenice i zablude o vidljivosti u eri generativnih pretraživača.",
        columns: ["Tvrdnja", "Ocena", "Objašnjenje"],
        rows: mythsRowsSr,
      },
    ],
  },
  {
    heading: "Šta bih uradio da imam mali biznis i ograničen budžet?",
    paragraphs: [
      "Većina vlasnika malih i srednjih firmi u Srbiji nema desetine hiljada evra za eksperimente sa velikim agencijama. Ako imate ograničeno vreme i budžet, evo pragmatičnog akcionog plana u šest koraka koji donosi najveći povrat na uloženi trud.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Korak 01", title: "Popravite tehničku osnovu — Brzina, mobilna upotrebljivost i čist HTML" },
          { label: "Korak 02", title: "Sredite glavne stranice usluga — Jasni odgovori, proces i rasponi cena" },
          { label: "Korak 03", title: "Objavite stvarne dokaze — Studije slučaja, fotografije i primeri radova" },
          { label: "Korak 04", title: "Optimizujte Google Business Profile — Tačni podaci i autentične ocene" },
          { label: "Korak 05", title: "Gradite prisustvo van sajta — Partneri, lokalni mediji i imenici" },
          { label: "Korak 06", title: "Merite upite i lidove — Zanemarite puki broj poseta i pratite prodaju" },
        ],
      },
      {
        type: "subsections",
        items: [
          {
            heading: "Zlatno pravilo prioriteta",
            paragraphs: [
              "Ako morate da birate između novog modernog eksperimenta (poput llms.txt fajla) i jedne vrhunske stranice usluge sa jasnim objašnjenjem ponude, realnim rokovima i referencama klijenata — uvek izaberite dobru stranicu usluge.",
              "Kvalitetna stranica prodaje vaš rad ljudima i daje konkretan materijal mašinama. Sve ostalo je sekundarno.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Kako meriti vidljivost u novom ekosistemu pretrage?",
    paragraphs: [
      "Merenje rezultata u AI eri zahteva promenu optike. Nekada smo pratili poziciju za 5 fiksnih ključnih reči na Google-u. Danas je kretanje korisnika višedimenzionalno.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "Google Search Console",
            paragraphs: [
              "Search Console ostaje vaš osnovni prozor u Google ekosistem. Pratite trendove impresija i klikova. Imajte u vidu da Google trenutno ne nudi zaseban filter koji razdvaja klikove iz AI Overviews od onih iz klasičnih organskih linkova; svi podaci su agregirani u opštem izveštaju o pretrazi.",
            ],
          },
          {
            heading: "GA4 i referral saobraćaj sa AI platformi",
            paragraphs: [
              "U Google Analytics 4 pratite referral izvore: saobraćaj koji dolazi sa domena kao što su chatgpt.com, perplexity.ai i claude.ai. Iako je ovaj saobraćaj po broju poseta često manji od Google-a, posetioci koji dolaze preko AI preporuka obično imaju znatno višu stopu angažovanja.",
            ],
          },
          {
            heading: "Kvalifikovani upiti i konverzije kao glavno merilo",
            paragraphs: [
              "Najvažnija metrika za vlasnika firme nisu grafikoni poseta, već poslovni rezultati: broj popunjenih kontakt formi, telefonski pozivi, preuzete ponude i sklopljeni poslovi. Sajt koji ima 30% manje poseta, ali donosi 20% više kvalitetnih upita, radi bolji posao od sajta punog praznog saobraćaja.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Zaključak: priprema za pretragu novog doba",
    paragraphs: [
      "Najveća greška u 2026. godini nije to što vaša firma nema komplikovanu 'GEO strategiju'. Najveća greška je ako vaš sajt nema ništa dovoljno jasno, precizno i pouzdano da bi ga čovek — ili veštačka inteligencija — poželeo da koristi kao izvor.",
      "Tehnologija se menja, ali suština uspešnog web prisustva ostaje ista:",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Pravilo uspeha",
        statement: "Dobar tehnički SEO dovodi sistem do sadržaja. Dobar sadržaj daje mu razlog da ga koristi. Jak brend daje mu razlog da mu veruje.",
        note: "Kada spojite stabilnu tehničku osnovu, poštene činjenice i prepoznatljivo poslovanje, vaš sajt je spreman za sve promene koje pretraga donosi.",
      },
    ],
  },
];

const sectionsEn: readonly BlogSection[] = [
  {
    heading: "Why fighting for position #1 is no longer enough",
    paragraphs: [
      "Consider a business owner searching Google for: 'How much does website development cost in Belgrade?'. Previously, the journey was strictly linear: Google served ten blue links, the user opened the top two or three, compared quotes, and got in touch.",
      "Today, that journey is fundamentally different. Google AI Overviews or ChatGPT Search instantly generate a synthesized overview right at the top of the viewport: breaking down landing page costs, web shop budgets, custom application timelines, cost drivers, and only then offering source citation cards.",
      "Users no longer have to visit five individual sites to get an initial market overview. This means online competition is no longer just about owning position #1 in organic results. It is increasingly about becoming one of the authoritative sources the AI relies on to build its answer.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Core Shift",
        statement: "Your website no longer only needs to be a great result users click on — it must also be a trusted source AI search engines cite.",
        note: "If an AI model cannot parse the structure and data on your page, your business remains invisible in conversational synthesis.",
      },
    ],
  },
  {
    heading: "What has actually changed in Google Search?",
    paragraphs: [
      "To prepare a website effectively, we need to understand the underlying mechanics. Traditional search engines operated like indexed card catalogs: a user typed a query, the algorithm ranked documents by keyword relevance and links, and the user did the legwork of reading.",
      "In an AI Search environment, the search engine acts as an analyst and research synthesizer. It interprets user intent, runs multiple related background queries, extracts data points from a dozen sources, writes a cohesive answer, and adds citation cards back to the original URLs.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "Traditional Google Search",
            body: "A linear process where the human visitor does all the synthesis.",
            list: [
              "User enters a specific search term",
              "Google displays a ranked list of blue links",
              "User clicks the first or second result",
              "User navigates the page to locate answers",
            ],
          },
          {
            title: "AI Search & Generative Answers",
            body: "A conversational synthesis where the engine reads and compiles.",
            list: [
              "User asks a nuanced natural language question",
              "AI executes multiple sub-queries simultaneously (fan-out)",
              "The system synthesizes data across multiple sources",
              "A direct answer is shown with linked citation cards",
              "Clicks occur when the user requires deeper engagement",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "What are Google AI Overviews and Google AI Mode?",
    paragraphs: [
      "Google AI Overviews (formerly known as Search Generative Experience or SGE) are generative summary blocks appearing atop standard Google search results. Unlike a classic Featured Snippet, which simply extracted one sentence from a single URL, an AI Overview writes a custom text synthesizing multiple web documents.",
      "Google does not trigger AI Overviews for every query. They appear primarily on informational, comparative, and multi-step searches where users seek structured explanations or product comparisons.",
      "Alongside AI Overviews, Google has introduced 'AI Mode' — an end-to-end conversational search experience allowing continuous follow-up questions. Here, a technical process called 'query fan-out' plays a decisive role.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Definition",
            title: "Google AI Overview",
            body: "A generative summary block rendered in main search results, synthesizing multiple web sources with interactive citation cards.",
          },
          {
            eyebrow: "Mechanism",
            title: "Query Fan-out",
            body: "The automated process where one user prompt triggers multiple parallel sub-searches behind the scenes to gather comprehensive context.",
          },
          {
            eyebrow: "Practical Takeaway",
            title: "Reach Beyond Rank #1",
            body: "Because queries fan out into specific sub-questions, a page that is not #1 for the primary keyword can easily be cited if it directly answers a sub-query.",
          },
        ],
      },
    ],
  },
  {
    heading: "ChatGPT Search operates on different mechanics",
    paragraphs: [
      "While Google relies on its vast historical search index and link graph, OpenAI integrated direct web search capabilities into ChatGPT. ChatGPT Search retrieves live web data and pairs conversational answers with source cards on the right side of the interface.",
      "For site owners and developers, OpenAI's official documentation defines a crucial distinction between search discovery crawlers and model training crawlers.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "OAI-SearchBot: Search discovery crawler",
            paragraphs: [
              "OAI-SearchBot exists exclusively to crawl, index, and present web pages within ChatGPT Search results. It does not ingest content to train foundational AI models.",
              "If you disallow this crawler in your robots.txt file, your website will be excluded from appearing as a cited reference in ChatGPT Search queries.",
            ],
            list: [
              "User-agent: OAI-SearchBot",
              "Purpose: Search retrieval and citation surfaces",
              "Recommendation: Allow access (Allow: /) if you want ChatGPT visibility",
            ],
          },
          {
            heading: "GPTBot: Foundation model training crawler",
            paragraphs: [
              "GPTBot is a separate web crawler operated by OpenAI to gather public web training data for training general AI models.",
              "Site owners can choose to block GPTBot in robots.txt to prevent proprietary content from being used in AI training, while keeping OAI-SearchBot completely open for search discovery.",
            ],
            list: [
              "User-agent: GPTBot",
              "Purpose: Generative model training",
              "Fact: Blocking GPTBot does NOT remove your site from ChatGPT Search",
            ],
          },
        ],
      },
      {
        type: "verdict",
        title: "Technical Rule",
        statement: "A robots.txt allow rule is a technical prerequisite, not a citation guarantee.",
        note: "Allowing the crawler makes retrieval possible, but authoritative content and clear information architecture determine whether citations occur.",
      },
    ],
  },
  {
    heading: "Is SEO really dead?",
    paragraphs: [
      "The short, definitive answer is no. SEO is not dead — it is maturing.",
      "Before an AI system can extract information and recommend your brand, your site must first pass traditional search prerequisites: it must be crawlable, indexable, fast, semantically structured, and authoritative. AI Search does not discard traditional SEO; it builds directly upon it.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Tier 01", title: "Crawlability & Indexability — Basic search engine bot access" },
          { label: "Tier 02", title: "Technical SEO & Speed — Clean HTML, Core Web Vitals, and stability" },
          { label: "Tier 03", title: "High-Quality Content — Factual answers, real experience, and topical depth" },
          { label: "Tier 04", title: "Entities & Structure — Semantic HTML, Schema.org, and brand consistency" },
          { label: "Tier 05", title: "AI Search Visibility — Inclusions across AI Overviews and ChatGPT citations" },
        ],
      },
    ],
  },
  {
    heading: "SEO, AEO, and GEO: definitions vs buzzwords",
    paragraphs: [
      "With every technological shift, marketing terminology explodes with new acronyms like AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization). Before buying into hype, let's establish clear definitions.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Comparative overview of modern search optimization disciplines.",
        columns: ["Term", "Definition", "Practical Role"],
        rows: searchComparisonRowsEn,
      },
      {
        type: "verdict",
        title: "Practical Perspective",
        statement: "GEO and AEO are better understood as evolutionary layers of SEO rather than separate disciplines.",
        note: "If a website has poor technical fundamentals and thin generic copy, buying a 'GEO service' will not fix the underlying issues.",
      },
    ],
  },
  {
    heading: "The challenge website owners are already feeling: fewer clicks",
    paragraphs: [
      "Many business owners notice an odd trend in analytics: search impressions remain steady or rise, while organic clicks decline. This reflects the growth of zero-click searches, where users satisfy their query directly on the search engine results page.",
      "Comprehensive research published by SparkToro and Similarweb analyzing large-scale desktop and mobile browser search data in the United States highlights the scale of this phenomenon.",
    ],
    blocks: [
      {
        type: "metrics",
        items: [
          {
            label: "SparkToro / Similarweb (US dataset, Jan–Apr 2024/2026)",
            title: "Zero-Click Searches",
            value: "68.01%",
            body: "Proportion of Google browser searches in the analyzed US sample that concluded without an external click to organic or paid websites.",
          },
          {
            label: "Query Intent",
            title: "Informational Impact",
            value: "Largest Drop",
            body: "Quick answers (definitions, dates, weather, simple facts) absorb the steepest loss of external traffic.",
          },
          {
            label: "Commercial Value",
            title: "High-Intent Enquiries",
            value: "Stable Clicks",
            body: "When visitors compare agencies, buy products, or hire local specialists, website visits remain crucial.",
          },
        ],
      },
      {
        type: "subsections",
        items: [
          {
            heading: "What does this mean for businesses?",
            paragraphs: [
              "This metric does not mean that 68% of your prospective customers have disappeared. Casual visitors looking for trivia rarely convert into paying clients anyway. Visitors who click through after reading an AI summary often have clearer intentions and higher qualification.",
              "As a result, raw pageviews and sessions are no longer sufficient KPIs. The primary focus must shift to qualified leads, phone calls, enquiries, and closed business.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "How does AI choose which sources to cite?",
    paragraphs: [
      "There is widespread speculation about what drives AI citations. Some claim bullet points are a direct ranking factor; others promise that special files guarantee inclusion. To make sound investments, we must separate verified facts from speculation.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Tier 1 — Confirmed",
            title: "Verified Documentation",
            body: "Pages must be crawlable and indexable. Google AI features build on foundational search systems. ChatGPT Search utilizes live web retrieval. OAI-SearchBot governs ChatGPT crawler access.",
            list: [
              "Clean robots.txt and HTTP 200 responses",
              "Core content accessible in raw HTML",
              "Confirmed index status in search consoles",
            ],
          },
          {
            eyebrow: "Tier 2 — Strong Data",
            title: "Research-Backed Correlations",
            body: "Traditional organic rankings correlate strongly with citation frequency. However, citations frequently stem from outside the top organic ranks via query fan-out. Brand mentions correlate notably with generative visibility.",
            list: [
              "Strong topical authority and backlinks",
              "Granular sub-page answers cited for niche queries",
              "Consistent third-party brand footprint",
            ],
          },
          {
            eyebrow: "Tier 3 — Unproven",
            title: "Myths and Speculation",
            body: "No evidence proves that Schema.org guarantees inclusion in AI Overviews, that llms.txt forces ChatGPT recommendations, that bullet points are an AI ranking factor, or that mass AI copy drives rankings.",
            list: [
              "Schema does NOT guarantee AI Overviews",
              "llms.txt holds no official search status",
              "Formatting without substance yields nothing",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "How to structure content so AI can understand it",
    paragraphs: [
      "The goal of structuring content is not to 'trick' machine learning models, but to present information with unambiguous clarity. Strong information architecture helps human readers find answers while enabling Retrieval-Augmented Generation (RAG) pipelines to extract verified facts.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "1. Answer first, context second (Inverted Pyramid)",
            paragraphs: [
              "Ineffective phrasing: 'The cost of building a website depends on many factors, in today's digital world every business is unique...'. This is empty filler that conveys zero data.",
              "Effective phrasing: 'Website development for small and medium businesses in Serbia typically ranges between EUR 500 and EUR 1,500 for standard business sites, while custom web applications and e-commerce stores require higher budgets based on scope and integrations.'",
              "Placing the direct answer in the opening sentence gives retrieval systems an explicit factual unit to cite.",
            ],
          },
          {
            heading: "2. Specific, topical H2 and H3 headings",
            paragraphs: [
              "Each section should answer one well-defined question. Avoid abstract, poetic headlines. Use concrete queries: 'How long does an e-commerce build take?', 'What technologies do we use?', 'What is included in ongoing maintenance?'.",
            ],
          },
          {
            heading: "3. Concrete data over vague claims",
            paragraphs: [
              "AI search engines favor concrete facts: numbers, timelines, processes, warranties, and constraints. Instead of 'we deliver fast results', write 'our typical delivery timeline for a custom landing page is 7 to 14 business days'.",
            ],
          },
          {
            heading: "4. First-hand experience and verified evidence",
            paragraphs: [
              "What generative models cannot produce is your proprietary business experience: genuine client case studies, photos of real projects, challenges solved on-site, and verified business outcomes.",
            ],
          },
          {
            heading: "5. Responsive tables and comparison matrices",
            paragraphs: [
              "Tables are not just visual elements; they provide retrieval engines with structured key-value data that is easily extracted and compared.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Brand reputation becomes a primary SEO pillar",
    paragraphs: [
      "In traditional SEO, the core question was: 'What does your website say about itself?'. In AI Search, the question becomes: 'What does the rest of the web say about your brand?'.",
      "Large language models understand entities through web-wide consensus. If your company is consistently referenced across industry portals, local business directories, client reviews, and industry discussions, algorithms gain confidence in your authority.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Entity Trust",
            title: "Consistent Brand Mentions",
            body: "Even unlinked brand mentions are recognized by modern search models as topical entity signals associating your name with specific services.",
          },
          {
            eyebrow: "Topical Affinity",
            title: "Co-occurrence Signals",
            body: "When your brand consistently appears alongside terms like 'web design studio', 'custom development', and 'performance', your topical association deepens.",
          },
          {
            eyebrow: "Caution",
            title: "Correlation vs Causation",
            body: "While brand visibility correlates with AI citations, manufactured mentions without genuine client value will not replace solid technical foundations.",
          },
        ],
      },
      {
        type: "verdict",
        title: "Backlink Reality",
        statement: "Backlinks remain a fundamental authority pillar; what is new is that unlinked brand mentions must no longer be ignored.",
        note: "Build your reputation where your ideal clients actually research solutions.",
      },
    ],
  },
  {
    heading: "AI Search and local businesses in Serbia",
    paragraphs: [
      "For local service providers, studios, and small businesses in Belgrade, Novi Sad, Niš, and across Serbia, local search is the lifeblood of customer acquisition. AI search engines apply specific priorities for local queries.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "Google Business Profile remains top priority",
            paragraphs: [
              "Before embarking on complex on-page experiments, ensure your Google Business Profile is completely accurate: exact business name, verified primary category, accurate service area, opening hours, phone number, and website URL.",
            ],
          },
          {
            heading: "Authentic customer reviews with context",
            paragraphs: [
              "Avoid purchased or synthetic reviews. Algorithms analyze customer sentiment and terminology: when a real customer writes 'they built our custom e-commerce shop on Next.js and delivered in 4 weeks', that review provides concrete topical validation.",
            ],
          },
          {
            heading: "NAP consistency across the web",
            paragraphs: [
              "Your Name, Address, and Phone number must be identical across your website, Google Business Profile, local directories, and social media channels.",
            ],
          },
          {
            heading: "Stop publishing 50 duplicate city landing pages",
            paragraphs: [
              "The outdated tactic of creating dozens of identical pages swapping only town names is actively penalized. Create dedicated service pages only where you have a genuine physical location or verified portfolio work.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Structured data: valuable, but not a magic switch",
    paragraphs: [
      "Structured data (Schema.org) provides search engines with explicit, machine-readable declarations about your entities: your organization, founders, locations, articles, and services.",
      "However, Google does not promise that implementing schema will automatically trigger AI Overviews. Structured data helps search engines understand what a page is about, but quality, trust, and authority determine visibility.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Entity Identity",
            title: "Organization & LocalBusiness",
            body: "Explicitly connects brand name, logo, contact points, tax ID, physical coordinates, and social profiles into an unambiguous entity graph.",
          },
          {
            eyebrow: "Editorial Depth",
            title: "Article & BlogPosting",
            body: "Documents headline, publish dates, update dates, verified authors, and publishers to signal editorial transparency.",
          },
          {
            eyebrow: "Site Architecture",
            title: "BreadcrumbList",
            body: "Provides clear structural context showing how specific services relate to overarching core categories.",
          },
        ],
      },
      {
        type: "verdict",
        title: "Integrity Rule",
        statement: "Structured data must strictly reflect visible content on the page.",
        note: "Never inject fabricated 5-star ratings or unverified awards into schema markup; doing so triggers algorithmic penalties.",
      },
    ],
  },
  {
    heading: "Do you really need an llms.txt file?",
    paragraphs: [
      "In recent months, a community proposal called `llms.txt` has gained attention, suggesting that websites place a curated markdown file in their root directory to guide AI models.",
      "Should business owners prioritize creating an `llms.txt` file in 2026? The short answer is: **not as an active priority**.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Status: Experimental",
        statement: "There is no evidence that Google, Bing, or OpenAI use llms.txt as an official ranking or indexing standard.",
        note: "If your technical SEO is flawed and your pages are slow, adding an llms.txt file will solve none of your visibility problems.",
      },
      {
        type: "subsections",
        items: [
          {
            heading: "Where should development effort go instead?",
            paragraphs: [
              "Search engines and web retrievers are built to parse semantic HTML. Invest your resources in clean markup, fast response times, proper metadata, and comprehensive service pages rather than speculative formats.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Case comparison: web design service page before and after",
    paragraphs: [
      "To see how these principles translate into real-world code, let's contrast an outdated keyword-stuffed agency landing page with a modern, factual service page built for users and AI retrieval.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "Outdated SEO Approach (Keyword Stuffing)",
            body: "Content written strictly for search spiders with zero substantive utility.",
            list: [
              "'Web development Belgrade is our passion. If you need cheap web design in Belgrade, we are the best web design in Belgrade...'",
              "Superlatives with no proof: 'best agency', 'unbeatable prices', '100% satisfaction guarantee'",
              "Zero pricing clarity or budget guidelines",
              "No technology breakdown, development steps, or timelines",
              "No verifiable case studies or real client problem breakdowns",
              "Generic FAQ questions with vague non-answers",
            ],
          },
          {
            title: "Modern Approach (Factual & User-Centered)",
            body: "A structured, scannable document answering real client needs.",
            list: [
              "Clear value proposition: who the service serves and which business problems it solves",
              "Realistic budgeting scopes: standard business sites vs bespoke web applications",
              "Clear workflow: discovery, UX design, Next.js engineering, testing, and deployment",
              "Realistic timelines: 1–2 weeks for landing pages, 4–8 weeks for custom builds",
              "Documented portfolio case studies with verified challenges, decisions, and outcomes",
              "Technical standards: Core Web Vitals targets, security standards, and CMS flexibility",
            ],
          },
        ],
      },
      {
        type: "verdict",
        title: "Impact on Search & Conversion",
        statement: "A modern service page does not guarantee an AI citation, but it dramatically improves both machine readability and human conversion rates.",
        note: "When visitors arrive at a page that directly addresses their questions, enquiry conversion rates increase substantially.",
      },
    ],
  },
  {
    heading: "Should you use AI to write website content?",
    paragraphs: [
      "Many website owners viewed the arrival of large language models as an opportunity to generate hundreds of articles overnight. In 2026, that strategy is a direct route to search invisibility.",
      "Google's guidance is clear: using AI assistance is not penalized in itself. The penalty applies to low-value, mass-produced content created solely to manipulate search rankings without offering first-hand experience.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "AI as a research assistant (Recommended)",
            paragraphs: [
              "Use AI tools to brainstorm outlines, identify logical gaps in your writing, edit grammar, and summarize background studies.",
              "In this workflow, AI accelerates research, but a human expert supplies facts, verifies claims, and takes responsibility for quality.",
            ],
          },
          {
            heading: "AI as an autonomous content mill (High Risk)",
            paragraphs: [
              "Publishing raw AI drafts without fact-checking, creating synthetic case studies, and inventing quotes leads directly to helpful content devaluation.",
              "If an article can be generated by anyone in seconds with a single prompt, it offers no competitive differentiator to readers or search engines.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Checklist: is your website ready for AI Search?",
    paragraphs: [
      "To help you audit your website systematically, here is an actionable readiness checklist organized by priority tier.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          {
            eyebrow: "Tier 1 — Critical",
            title: "Foundational Technical Access",
            body: "Without these items, your site is invisible to both search engines and AI retrieval bots.",
            list: [
              "Site is fully indexable with no accidental robots.txt disallows",
              "OAI-SearchBot is allowed if you want ChatGPT Search discovery",
              "Core pages return clean HTTP 200 status codes and self-referencing canonicals",
              "XML sitemaps are active, accurate, and submitted to Search Console",
              "Primary content renders in initial server-generated HTML",
              "Company identity, contact details, and ownership are clearly displayed",
            ],
          },
          {
            eyebrow: "Tier 2 — High Priority",
            title: "Structure, Evidence & Authority",
            body: "Elements that prove expertise and enable AI engines to cite you with confidence.",
            list: [
              "Service pages outline real deliverables, scopes, and realistic budgets",
              "Real case studies showcase project tasks, decisions, and deliverables",
              "Logical internal linking between related services and articles",
              "Active Google Business Profile with authentic customer reviews",
              "Structured data implemented (Organization, LocalBusiness, Article)",
              "Visible author attribution reflecting verified industry experience",
            ],
          },
          {
            eyebrow: "Tier 3 — Medium Priority",
            title: "Content Optimization & Outreach",
            body: "Competitive enhancements that deepen your topical footprint.",
            list: [
              "Responsive tables comparing features, pricing, or technical choices",
              "Q&A blocks providing direct answers to high-intent questions",
              "Digital PR and industry mentions on respected external portals",
              "Regular scheduled updates to maintain freshness across core guides",
              "Monitoring search visibility inside Bing Webmaster Tools",
            ],
          },
          {
            eyebrow: "Tier 4 — Experimental",
            title: "Emerging Concepts",
            body: "Exploratory tactics to consider only after Tiers 1–3 are completely established.",
            list: [
              "Testing an llms.txt file (optional; currently no proven search impact)",
              "Custom conversational LLM integrations",
              "Experimental prompts for emerging search agents",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "8 AI SEO myths: separating fact from fiction",
    paragraphs: [
      "With so much conflicting advice in circulation, here is a factual breakdown of eight common claims surrounding AI search visibility.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Fact-checking common misconceptions in generative engine optimization.",
        columns: ["Claim", "Rating", "Explanation"],
        rows: mythsRowsEn,
      },
    ],
  },
  {
    heading: "Action roadmap for small businesses on a budget",
    paragraphs: [
      "Most small business owners cannot afford speculative multi-thousand-euro marketing experiments. If you have limited time and budget, this six-step priority roadmap provides the highest return on effort.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Step 01", title: "Fix technical hygiene — Fast load times, mobile usability, and clean HTML" },
          { label: "Step 02", title: "Refine core service pages — Clear answers, processes, and realistic price ranges" },
          { label: "Step 03", title: "Add genuine proof — Portfolio case studies, client results, and real imagery" },
          { label: "Step 04", title: "Optimize Google Business Profile — Accurate data and real customer feedback" },
          { label: "Step 05", title: "Build off-site brand signals — Industry directories, partners, and local press" },
          { label: "Step 06", title: "Measure leads over traffic — Track business enquiries rather than vanity pageviews" },
        ],
      },
      {
        type: "subsections",
        items: [
          {
            heading: "The Golden Rule of Prioritization",
            paragraphs: [
              "If forced to choose between setting up an experimental file (like llms.txt) and refining a core service page with clear answers and real client evidence — always build the great service page.",
              "A substantive page converts human visitors and gives AI retrieval systems concrete information to quote. Everything else is secondary.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "How to measure visibility in the new search landscape",
    paragraphs: [
      "Evaluating visibility in the era of generative AI requires looking beyond single-keyword rank tracking.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          {
            heading: "Google Search Console",
            paragraphs: [
              "Search Console remains your fundamental diagnostic tool. Monitor impression and click trajectories. Keep in mind that Google does not currently segment AI Overview clicks into a separate report; they are bundled into general performance metrics.",
            ],
          },
          {
            heading: "GA4 and AI referral channels",
            paragraphs: [
              "Monitor referral traffic originating from domains like chatgpt.com, perplexity.ai, and claude.ai. While overall volume may be modest compared to Google organic, visitors arriving via AI recommendations frequently show elevated engagement and intent.",
            ],
          },
          {
            heading: "Enquiries and conversions as the ultimate benchmark",
            paragraphs: [
              "The most meaningful metrics are business outcomes: phone calls, qualified contact form submissions, and signed contracts. A website that experiences a 30% reduction in raw sessions but yields 20% more high-value enquiries is performing effectively.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Conclusion: preparing for the modern search landscape",
    paragraphs: [
      "The greatest risk in 2026 is not the absence of an elaborate 'GEO tactic'. The real risk is operating a website that contains nothing clear, useful, or credible enough for a human — or an AI model — to rely on as a source.",
      "Search interfaces evolve, but the foundation of digital success remains constant:",
    ],
    blocks: [
      {
        type: "verdict",
        title: "The Formula for Visibility",
        statement: "Sound technical SEO brings systems to your content. High-quality content gives them a reason to use it. A strong brand gives them a reason to trust it.",
        note: "When you combine robust technical engineering with honest facts and verified authority, your website is prepared for whatever search becomes.",
      },
    ],
  },
];

export const aiSearchGuide2026: Editorial = {
  image: "/blog/ai-search-google-overviews.webp",
  heroBackground: {
    image: "/blog/hero/ai-search-google-overviews-bg.webp",
    width: 1920,
    height: 820,
    position: "center",
  },
  width: 1600,
  height: 900,
  alt: {
    sr: "Ilustracija transformacije pretrage od klasičnih plavih rezultata ka AI sintezi sa karticama citata.",
    en: "Editorial illustration of search transformation from traditional blue links to AI synthesis with citation cards.",
  },
  caption: {
    sr: "AI Search menja način na koji korisnici pronalaze odgovore: od liste linkova do direktne sinteze sa citiranim izvorima.",
    en: "AI Search transforms discovery: from a list of links to conversational synthesis supported by cited sources.",
  },
  topic: {
    sr: "AI Search i SEO",
    en: "AI Search & SEO",
  },
  answer: {
    sr: "Da bi vaš sajt bio vidljiv i citiran u Google AI Overviews, ChatGPT Search-u i sličnim sistemima, ne treba vam magična 'GEO' tajna, već tri stabilna sloja: besprekorna tehnička osnova (crawlability i indeksabilnost), sadržaj sa konkretnim odgovorima i proverljivim podacima (umesto generičkih fraza), i dosledna reputacija brenda na webu.",
    en: "To make your website discoverable and cited in Google AI Overviews, ChatGPT Search, and modern AI engines, you do not need speculative 'GEO tricks'. You need three robust layers: sound technical fundamentals (crawlability and indexability), factual content with direct answers and verifiable evidence, and consistent web-wide brand trust.",
  },
  sections: {
    sr: sectionsSr,
    en: sectionsEn,
  },
  sources: [
    {
      label: "Google Search Central — AI features and your website",
      href: "https://developers.google.com/search/docs/appearance/ai-features",
    },
    {
      label: "Google Search Central — Creating helpful, reliable, people-first content",
      href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    },
    {
      label: "OpenAI Help Center — Overview of OpenAI Crawlers (OAI-SearchBot & GPTBot)",
      href: "https://platform.openai.com/docs/bots",
    },
    {
      label: "SparkToro & Similarweb — 2024–2026 Google Zero-Click Search Study",
      href: "https://sparktoro.com/blog/how-many-searches-end-without-a-click-2024/",
    },
    {
      label: "Ahrefs — How Brand Mentions and Authority Relate to AI Visibility",
      href: "https://ahrefs.com/blog/brand-mentions-seo/",
    },
    {
      label: "Schema.org — Standards for Structured Data and Entities",
      href: "https://schema.org/",
    },
  ],
  cta: {
    sr: {
      title: "Da li je vaš sajt spreman za novi način pretrage?",
      description:
        "NMark Designs radi detaljnu analizu tehničkog SEO-a, strukture stranica, brzine i arhitekture sadržaja kako bi vaš sajt bio i privlačan za posetioce i lak za mašinsko čitanje.",
      label: "Zatražite analizu sajta",
      secondaryLabel: "Pogledajte naš cenovnik",
      secondaryHref: "/sr/cenovnik/",
    },
    en: {
      title: "Is your website prepared for the new era of search?",
      description:
        "NMark Designs conducts technical audits across SEO fundamentals, information architecture, performance, and structured data to ensure your site is built for both human visitors and AI retrieval systems.",
      label: "Request a website audit",
      secondaryLabel: "Explore our pricing guide",
      secondaryHref: "/en/pricing/",
    },
  },
};
