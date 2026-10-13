import type { BlogSection } from "@/content/blog";
import type { Editorial } from "@/content/blog-editorial";

const sectionsSr: readonly BlogSection[] = [
  {
    heading: "Šta je Google zaista promenio 1. oktobra 2026?",
    paragraphs: [
      "Najvažnija vest nije novi penal, algoritam ili zabrana AI sadržaja. Google je 1. oktobra 2026. ažurirao postojeću stranicu o korišćenju generativnog AI sadržaja. U novom odeljku objašnjava da generativni modeli predviđaju verovatan niz reči, a ne proveravaju činjenice, pa AI izlaz može da sadrži netačnosti.",
      "Zato Google izričito kaže da je potrebno ručno proveriti AI-generisani sadržaj zbog tačnosti i poverenja pre objavljivanja. Ista provera obuhvata title, meta description, strukturirane podatke i alt tekst slika. To je praktična smernica za urednika, a ne objava da će svaka stranica napravljena uz AI alat automatski biti kažnjena.",
      "Google navodi da je ažuriranje urađeno kako bi dokumentacija bila usklađena sa objašnjenjima koja se već koriste na developerskim događajima. U dokumentaciji o ažuriranju nema najave novog AI penala. Razlika između ažurirane smernice, spam politike i algoritamskog update-a ovde je presudna.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "Šta se promenilo",
            body: "Google je jasnije napisao šta urednik treba da proveri pre objavljivanja AI izlaza.",
            list: [
              "Ručno proveravanje činjenica i pouzdanosti je izričito naglašeno.",
              "Provera se odnosi i na title, meta description, structured data i alt tekst.",
              "Dokumentacija upozorava na halucinacije generativnih modela.",
            ],
          },
          {
            title: "Šta se nije promenilo",
            body: "Google nije rekao da je način nastanka sadržaja sam po sebi spam.",
            list: [
              "AI sadržaj nije automatski zabranjen niti automatski izbačen iz rezultata.",
              "Scaled content abuse i dalje zavisi od svrhe, obima i vrednosti stranica.",
              "Korisnost, tačnost, originalnost i tehnička dostupnost ostaju temelj.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Da li Google kažnjava AI-generisani tekst?",
    paragraphs: [
      "Kratak odgovor je: ne zato što je korišćen određeni AI alat. Google ne vezuje prihvatljivost stranice za ime alata koji je korišćen. Pitanje je šta je objavljeno, zašto je objavljeno i da li stranica stvarno pomaže osobi koja je došla iz pretrage.",
      "Tekst može da bude AI-generisan i koristan, originalan, tačan i dobro prilagođen nameri pretrage. Može biti i ljudski napisan, ali površan, netačan ili napravljen samo da zauzme još jednu poziciju u rezultatima. Poreklo teksta samo po sebi ne rešava tu procenu.",
      "To ne znači da je prvi nacrt iz ChatGPT-a, Claude-a, Gemini-ja ili drugog generativnog alata spreman za objavu. Model može da izmisli izvor, pomeša datume, napiše netačan opis usluge ili ponovi opšte savete bez stvarne vrednosti. Odgovornost za konačnu stranicu ostaje na vlasniku sajta i osobi koja je uređuje.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Odgovor na najčešću dilemu",
        statement: "Google ne kažnjava AI alat kao takav. Slab ili manipulativan sadržaj može da bude problem bez obzira na to koji je alat korišćen.",
        note: "Google-ova dokumentacija govori o kvalitetu, korisnosti, tačnosti i spam praksama, a ne o automatskoj kazni za korišćenje generativnog AI-ja.",
      },
    ],
  },
  {
    heading: "Kada AI sadržaj postaje SEO problem?",
    paragraphs: [
      "Google termin scaled content abuse koristi za situaciju u kojoj se veliki broj stranica pravi prvenstveno radi manipulisanja rangiranjem, a ne radi pomoći korisnicima. Pravilo važi bez obzira na to da li je sadržaj napravio čovek, AI alat ili kombinacija oba pristupa.",
      "Problem zato nije jednostavno u broju stranica ili u tome što je korišćen automatizovani alat. Problem nastaje kada brzina proizvodnje postane važnija od vrednosti. Ako svaka nova stranica samo zauzima drugu kombinaciju ključnih reči, a ne odgovara na stvarno pitanje, sajt dobija mnogo URL-ova bez jasnog razloga da postoje.",
    ],
    list: [
      "Stotine gotovo identičnih lokalnih stranica sa promenjenim samo gradom ili uslugom.",
      "Blog tekstovi generisani u seriji bez izvora, provere i originalnog zaključka.",
      "Netačne tvrdnje o cenama, zakonima, rezultatima ili funkcijama proizvoda.",
      "Opisi proizvoda prepisani iz kataloga uz minimalne izmene.",
      "Prevođenje ili sinonimizovanje tuđeg teksta bez dodatne vrednosti za čitaoca.",
    ],
    blocks: [
      {
        type: "linkList",
        title: "Povezane teme",
        items: [
          { label: "Kako AI Overviews i ChatGPT menjaju pretragu", href: "/sr/blog/ai-menja-google-pretragu-ai-overviews-chatgpt-ai-search/" },
          { label: "Kako da uradite brz audit sajta", href: "/sr/blog/kako-da-radite-brzi-audit-sajta/" },
        ],
      },
    ],
  },
  {
    heading: "AI tekst i AI-napravljen sajt nisu ista stvar",
    paragraphs: [
      "U razgovorima o AI SEO-u često se mešaju dve odvojene procene. Prva je urednička: da li sadržaj vredi, da li je tačan i da li donosi nešto svoje? Druga je tehnička: da li sajt može da se pronađe, renderuje, indeksira i koristi na telefonu? AI-generisani tekst i sajt koji je napravio AI website builder mogu imati različite probleme.",
      "ChatGPT, Claude Code, Gemini CLI, Codex, GitHub Copilot, Cursor, Wix AI i Framer AI nisu SEO presuda. Alat može da ubrza rad, ali rezultat i dalje mora da bude pregledan. Isto važi i za tradicionalni WordPress ili ručno napisani React: loša konfiguracija ne postaje dobra samo zato što je kod pisao čovek.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "AI-generisani tekst",
            body: "AI priprema nacrt bloga, opisa usluge, FAQ odgovora ili metapodataka.",
            list: [
              "Glavni rizik je netačnost, generičnost i promašena namera pretrage.",
              "Potrebni su izvori, uređivanje i originalna perspektiva.",
              "Metadata se proverava isto kao i vidljivi tekst.",
            ],
          },
          {
            title: "No-code AI website builder",
            body: "Wix, Framer ili Webflow AI brzo sastavljaju vizuelni i sadržajni nacrt sajta.",
            list: [
              "Vredi proveriti URL strukturu, canonical, sitemap i mogućnosti internacionalizacije.",
              "Platforma može biti sasvim dovoljna za određeni obim projekta.",
              "Ograničenja zavise od konkretne konfiguracije i plana.",
            ],
          },
          {
            title: "AI-assisted professional development",
            body: "Developer koristi AI za komponente, nacrt koda, testove ili dokumentaciju, ali kontroliše rezultat.",
            list: [
              "Next.js može da podrži server-rendered i statički generisan sadržaj.",
              "Framework ne rešava automatski SEO, pristupačnost ili sigurnost.",
              "Pregled koda i testiranje ostaju deo posla.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Šta AI može da napravi, a šta ipak mora da se proveri?",
    paragraphs: [
      "AI može da predloži strukturu stranice, generiše komponentu, napiše nacrt metapodataka ili pripremi osnovni JSON-LD. To je korisno za ubrzanje. Ipak, nijedna od tih mogućnosti ne znači da je sajt automatski spreman za Google ili za stvarne korisnike.",
      "Praktično je razdvojiti tehničke preduslove od kvalitativnih preporuka. Crawlability, indexability i dostupnost sadržaja u renderovanom HTML-u omogućavaju pretraživaču da uopšte obradi stranicu. Originalnost, tačnost, dobra arhitektura i jasno iskustvo korisnika pomažu da stranica bude vredna. Structured data i Open Graph imaju posebne uloge i ne garantuju bogatiji rezultat ili bolje rangiranje.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Šta proveriti na AI-generisanom sajtu i zašto.",
        columns: ["Oblast", "Šta proveriti", "Uloga"],
        rows: [
          ["Crawlability", "Linkovi, robots.txt i dostupni URL-ovi", "Preduslov da Google može da pronađe sadržaj"],
          ["Indexability", "noindex, canonical i status odgovora", "Sprečava slučajno isključivanje ili pogrešan URL"],
          ["Rendering", "Sadržaj u server odgovoru i nakon učitavanja", "Pomaže da tekst i metadata budu dostupni"],
          ["Arhitektura", "Hijerarhija, slugovi i interni linkovi", "Povezuje teme i važne stranice"],
          ["Performanse", "LCP, INP, CLS i ponašanje na telefonu", "Doprinosi kvalitetu iskustva stranice"],
          ["Structured data", "Tačnost, validnost i podudaranje sa sadržajem", "Može pomoći razumevanju i eligibility-ju za funkcije"],
          ["Pristupačnost", "Semantički HTML, tastatura, kontrast i alt tekst", "Čini sadržaj upotrebljivim za više ljudi"],
          ["Sadržaj", "Činjenice, izvori, namera i originalni doprinos", "Daje korisniku razlog da veruje stranici"],
        ],
      },
    ],
  },
  {
    heading: "Praktičan primer: AI generiše sajt, developer ga priprema za Google",
    paragraphs: [
      "Zamislimo realan, ali ilustrativan proces: vlasnik malog biznisa ili developer koristi AI alat kao što su ChatGPT, Claude Code, Gemini CLI, Codex ili Cursor da pripremi početnu stranicu, kontakt formu i nekoliko tekstova. Prvi rezultat izgleda uredno u browseru. To je početak, a ne dokaz da je posao završen.",
      "Kada radim sa AI-pomognutim razvojem, prvo proveravam rezultat kao proizvod koji će neko zaista koristiti. Pregledam šta server šalje bez oslanjanja na naknadno izvršavanje JavaScript-a, proveravam URL-ove i metadata, zatim testiram interakcije, mobilni prikaz, pristupačnost i podatke koji se pojavljuju u strukturi stranice.",
      "Ovaj primer ne predstavlja mereni eksperiment niti obećanje određenog rangiranja. On pokazuje redosled odgovornosti koji sprečava da brz AI nacrt postane javna tehnička greška.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Nacrt", title: "AI priprema početni kod i tekst" },
          { label: "HTML", title: "Provera šta je dostupno u server-rendered sadržaju" },
          { label: "Metadata", title: "Title, description, canonical, hreflang i OG" },
          { label: "Crawl", title: "Sitemap, robots, linkovi i indexability" },
          { label: "Review", title: "Činjenice, structured data, UX i pristupačnost" },
          { label: "Objava", title: "Tek kada su sadržaj i tehnički sloj spremni" },
        ],
      },
      {
        type: "cta",
        title: "Imate AI sajt, ali ne znate da li je spreman za Google?",
        body: "SEO audit može da pokaže da li postoje problemi sa metadata, canonical URL-ovima, sitemapom, internim linkovima i osnovnom indeksabilnošću. SEO audit u NMark Designs ponudi počinje od €150.",
        label: "Pogledajte SEO audit",
        href: "/sr/cenovnik/#svc-seo",
      },
    ],
  },
  {
    heading: "Da li je bolji AI website builder ili developer koji koristi AI?",
    paragraphs: [
      "Ne postoji odgovor koji važi za svaki biznis. AI website builder može biti razuman za jednostavnu prezentaciju, brzu validaciju ideje ili projekat sa jasnim ograničenjima. Developer koji koristi AI ima više smisla kada su važni specifična struktura, više jezika, integracije, održavanje, kontrola koda ili dugoročan razvoj.",
      "Platforma sama po sebi nije ranking faktor. Wix, Framer, WordPress i Next.js mogu da posluže za različite vrste sajtova. Razlika se vidi u tome koliko lako možete da kontrolišete rezultat, testirate ga i menjate kada se poslovni zahtevi promene.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Kako da razmišljate o izboru pristupa.",
        columns: ["Kriterijum", "AI builder", "AI-assisted custom development"],
        rows: [
          ["Početna brzina", "Vrlo brza za standardan format", "Brza uz pripremljen proces i jasnu specifikaciju"],
          ["Kontrola", "Zavisi od platforme i plana", "Veća kontrola nad kodom, rutama i integracijama"],
          ["SEO podešavanja", "Dostupna kroz platformu, proveriti ograničenja", "Mogu se planski ugraditi i testirati"],
          ["Održavanje", "Vezano za platformu i njen ekosistem", "Zavisi od koda, hostinga i dogovorenog procesa"],
          ["Najbolji slučaj", "Jednostavan sajt sa jasnim potrebama", "Specifičan, višejezičan ili dugoročan projekat"],
        ],
      },
    ],
  },
  {
    heading: "Kako koristiti AI alate za SEO bez nepotrebnog rizika?",
    paragraphs: [
      "Najkorisniji workflow nije „generiši i objavi“, već istraži, napiši nacrt, proveri, dopuni i testiraj. ChatGPT, Claude Code, Gemini CLI, Codex ili drugi AI alati mogu da pomognu oko grupisanja pitanja, prve strukture, varijanti naslova ili objašnjenja tehničkog koncepta. Ne treba im prepustiti konačnu odluku o činjenicama, strategiji ili obećanjima koja dajete kupcu.",
      "Za svaku stranicu prvo napišite kome je namenjena, na koje pitanje odgovara i koju odluku treba da olakša. Zatim proverite svaki podatak koji može da utiče na novac, zdravlje, zakon, rok, cenu ili poverenje. Na kraju pročitajte stranicu kao osoba koja prvi put dolazi na sajt: da li razume ponudu i zna šta može da uradi dalje?",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Istraži", title: "Razumevanje publike i search intent-a" },
          { label: "Napiši", title: "AI nacrt strukture i prve verzije" },
          { label: "Proveri", title: "Činjenice, izvori, datumi i metadata" },
          { label: "Dodaj", title: "Vlastito iskustvo, kontekst i originalne primere" },
          { label: "Optimizuj", title: "Naslovi, linkovi, struktura i CTA" },
          { label: "Prati", title: "Indexiranje i ponašanje kroz Search Console" },
        ],
      },
      {
        type: "linkList",
        title: "Još korisnih stranica na sajtu",
        items: [
          { label: "Vodič kroz cenu izrade web sajta u Srbiji 2026", href: "/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
          { label: "Usluge razvoja i SEO osnova", href: "/sr/usluge/" },
          { label: "Cenovnik NMark Designs usluga", href: "/sr/cenovnik/" },
        ],
      },
    ],
  },
  {
    heading: "SEO checklista pre objavljivanja AI sajta",
    paragraphs: [
      "Pre objavljivanja prođite kroz kratku proveru. Nije svaka stavka direktan ranking faktor, ali zajedno daju dobru sliku o tome da li je stranica dostupna, razumljiva, korisna i spremna da je neko stvarno koristi.",
    ],
    blocks: [
      {
        type: "checklist",
        items: [
          "Da li Google može da pristupi stranici i njenim važnim resursima?",
          "Da li su status stranice, noindex i canonical URL ispravni?",
          "Da li postoje sitemap, robots.txt i logični interni linkovi?",
          "Da li je glavni sadržaj dostupan u renderovanom HTML-u?",
          "Da li title, meta description i alt tekst opisuju stvarni sadržaj?",
          "Da li su sve činjenice, datumi, cene i obećanja ručno provereni?",
          "Da li stranica donosi originalnu vrednost umesto opšteg sažetka?",
          "Da li je structured data validan i usklađen sa vidljivim sadržajem?",
          "Da li sajt radi čitljivo i upotrebljivo na telefonu i tastaturom?",
          "Da li postoje srpska i engleska verzija sa ispravnim canonical i hreflang vezama?",
          "Da li posetilac zna koji je sledeći korak: kontakt, ponuda ili pregled usluge?",
        ],
      },
    ],
  },
  {
    heading: "Najčešća pitanja",
    paragraphs: [
      "Ovo su pitanja koja se najčešće kriju iza pretraga kao što su „ChatGPT SEO“, „AI sajt SEO“ i „da li Google kažnjava AI sadržaj“. Odgovori razdvajaju ono što Google zaista kaže od zaključaka koji se često previše pojednostave.",
    ],
    blocks: [
      {
        type: "faq",
        items: [
          {
            question: "Da li Google može da prepozna AI tekst?",
            answer: "Google javno ne opisuje jednostavan test koji odlučuje da li je tekst napisao AI. Njegove smernice fokus stavljaju na korisnost, tačnost, originalnost i spam obrasce. Zato nije dobro planirati SEO oko ideje da treba „proći“ ili „prevariti“ AI detektor.",
          },
          {
            question: "Da li AI tekst može da bude prvi na Google-u?",
            answer: "Može da se rangira ako je koristan, tačan, originalan i dobro odgovara nameri pretrage. To nije garancija prve pozicije. Niko ne može iz samog načina nastanka teksta zaključiti kakav će rang dobiti.",
          },
          {
            question: "Da li Google zahteva oznaku da je sadržaj napisan uz AI?",
            answer: "Googleova opšta dokumentacija ne uvodi obavezu da svaki običan web tekst mora imati AI oznaku. Navodi da informacije o načinu nastanka mogu dati čitaocu koristan kontekst kada je to relevantno. Posebna pravila mogu važiti za oglase ili Merchant Center podatke.",
          },
          {
            question: "Da li Next.js automatski poboljšava SEO?",
            answer: "Ne. Next.js može da olakša server rendering, statičko generisanje, metadata i optimizaciju slika, ali ništa od toga nije automatska garancija za rangiranje. Loše podešen Next.js sajt i dalje može imati slab sadržaj, pogrešne kanonikale ili neispravne linkove.",
          },
          {
            question: "Može li Wix AI ili Framer sajt da se rangira?",
            answer: "Može, ako je rezultat dostupan pretraživačima, tehnički ispravan, koristan i relevantan. Platformu treba birati prema potrebama projekta i nivou kontrole koji vam je potreban, a ne prema pretpostavci da određeni alat automatski donosi ili oduzima rang.",
          },
          {
            question: "Šta ako je ceo sajt napravljen uz AI?",
            answer: "Pregledajte ga kao bilo koji proizvod pre objavljivanja: sadržaj, kod, metadata, crawlability, indexability, rendering, pristupačnost, performanse, sigurnost i kontakt tok. Ako ti slojevi rade i stranice stvarno pomažu korisnicima, sam alat kojim je sajt napravljen nije dovoljan razlog za zaključak da sajt ne može da se rangira.",
          },
        ],
      },
    ],
  },
  {
    heading: "Zaključak: AI je ubrzanje, ne gotov SEO",
    paragraphs: [
      "Sajt napravljen uz pomoć AI alata može da se rangira na Google-u u 2026. godini. AI može da ubrza pisanje nacrta, istraživanje, razvoj komponenti i pripremu stranica. Ali funkcionalan sajt nije automatski vidljiv, pouzdan ili poslovno koristan sajt.",
      "Za rezultat su i dalje potrebni tačni podaci, originalan doprinos, jasna namera stranice, tehnička dostupnost, dobro povezane stranice, pristupačan interfejs i redovna provera. Googleovo ažuriranje od 1. oktobra samo je jasnije podsetilo na odgovornost urednika: proverite ono što objavljujete, uključujući metadata.",
      "Ako planirate novi sajt ili već imate AI-generisanu verziju koja ne donosi dovoljno upita, pogledajte izradu poslovnog sajta ili naprednog sajta po meri kroz NMark Designs usluge. AI može biti dobar početak; kvalitetna tehnička i urednička obrada pravi razliku između nacrta i sajta koji je spreman za ljude, pretraživače i sledeći poslovni korak.",
    ],
    blocks: [
      {
        type: "linkList",
        title: "Sledeći korak",
        items: [
          { label: "Izrada poslovnog sajta", href: "/sr/cenovnik/#pkg-business-website" },
          { label: "Napredni sajt po meri", href: "/sr/cenovnik/#pkg-advanced-website" },
          { label: "Kontaktirajte NMark Designs", href: "/sr/kontakt/" },
        ],
      },
    ],
  },
];

const sectionsEn: readonly BlogSection[] = [
  {
    heading: "What did Google actually change on October 1, 2026?",
    paragraphs: [
      "The important news is not a new penalty, algorithm, or ban on AI content. On October 1, 2026, Google updated its existing guidance on using generative AI content. The new wording explains that generative models predict likely sequences of words rather than checking facts, so AI output can contain inaccuracies.",
      "Google therefore says that AI-generated content should be manually fact-checked and reviewed for accuracy and trustworthiness before publication. The same review includes title elements, meta descriptions, structured data, and image alt text. This is practical guidance for publishers, not an announcement that every page created with an AI tool will be penalized.",
      "Google says the documentation was updated to align with explanations already used at developer events. The update does not announce a new AI penalty. The distinction between updated guidance, an existing spam policy, and a ranking algorithm update matters here.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "What changed",
            body: "Google made the publisher’s review responsibility more explicit.",
            list: [
              "Manual fact-checking and trust review are directly emphasized.",
              "The review applies to titles, meta descriptions, structured data, and alt text.",
              "The guidance explains why generative models can hallucinate facts.",
            ],
          },
          {
            title: "What did not change",
            body: "Google did not say that the production method itself is spam.",
            list: [
              "AI content is not automatically prohibited or excluded from Search.",
              "Scaled content abuse still depends on purpose, scale, and user value.",
              "Usefulness, accuracy, originality, and technical accessibility remain central.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "Does Google penalize AI-generated text?",
    paragraphs: [
      "The short answer is: not because a particular AI tool was used. Google does not make a page’s eligibility depend on the name of the tool used to create it. The real questions are what was published, why it was published, and whether it helps the person who arrived from Search.",
      "AI-generated text can be useful, original, accurate, and aligned with search intent. Human-written text can also be shallow, inaccurate, or created only to occupy another position in the results. The origin of the words does not settle the quality question.",
      "That does not make a first draft from ChatGPT, Claude, Gemini, or another generative tool ready to publish. A model can invent a source, confuse dates, misdescribe a service, or repeat generic advice without adding value. The site owner and editor remain responsible for the final page.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "The direct answer",
        statement: "Google does not penalize an AI tool as such. Weak or manipulative content can be a problem regardless of which tool was used.",
        note: "Google’s documentation focuses on quality, usefulness, accuracy, and spam practices rather than an automatic penalty for generative AI use.",
      },
    ],
  },
  {
    heading: "When does AI content become an SEO problem?",
    paragraphs: [
      "Google uses the term scaled content abuse for situations where many pages are created primarily to manipulate rankings rather than help users. The policy applies whether the pages were produced by a person, an AI tool, or a mixture of both.",
      "The issue is therefore not simply the number of pages or the presence of automation. The issue appears when production speed matters more than usefulness. If every new page only targets another keyword combination without answering a real question, the site accumulates URLs without a clear reason for users to visit them.",
    ],
    list: [
      "Hundreds of near-identical local pages that only change the city or service.",
      "Blog posts generated in batches without sources, review, or an original conclusion.",
      "Unverified claims about prices, laws, results, or product capabilities.",
      "Product descriptions copied from a catalogue with minimal changes.",
      "Translations or synonymized versions of another site’s content without added value.",
    ],
    blocks: [
      {
        type: "linkList",
        title: "Related reading",
        items: [
          { label: "How AI Overviews and ChatGPT are changing search", href: "/en/blog/ai-menja-google-pretragu-ai-overviews-chatgpt-ai-search/" },
          { label: "How to run a useful website audit", href: "/en/blog/kako-da-radite-brzi-audit-sajta/" },
        ],
      },
    ],
  },
  {
    heading: "AI-written content and an AI-built website are different things",
    paragraphs: [
      "AI SEO conversations often combine two separate evaluations. The first is editorial: is the content accurate, useful, and original? The second is technical: can the website be found, rendered, indexed, and used on a phone? AI-generated copy and a website assembled by an AI builder can have different failure modes.",
      "ChatGPT, Claude Code, Gemini CLI, Codex, GitHub Copilot, Cursor, Wix AI, and Framer AI are not SEO verdicts. A tool can speed up work, but the result still needs review. The same is true of traditional WordPress or hand-written React: a poor configuration does not become good simply because a person wrote the code.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          {
            title: "AI-generated content",
            body: "AI prepares a draft blog post, service description, FAQ answer, or metadata.",
            list: [
              "The main risks are inaccuracy, generic writing, and missed search intent.",
              "It needs sources, editing, and an original point of view.",
              "Metadata deserves the same review as visible copy.",
            ],
          },
          {
            title: "No-code AI website builder",
            body: "Wix, Framer, or Webflow AI quickly assemble a visual and content draft.",
            list: [
              "Check URL structure, canonicals, sitemaps, and internationalization support.",
              "The platform may be perfectly suitable for a defined project scope.",
              "Limitations depend on the specific configuration and plan.",
            ],
          },
          {
            title: "AI-assisted professional development",
            body: "A developer uses AI for components, code drafts, tests, or documentation while controlling the result.",
            list: [
              "Next.js can support server-rendered and statically generated content.",
              "The framework does not solve SEO, accessibility, or security by itself.",
              "Code review and testing remain part of the work.",
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "What can AI create, and what still needs to be checked?",
    paragraphs: [
      "AI can suggest a page structure, generate a component, draft metadata, or prepare basic JSON-LD. That can speed up production. None of it means that the website is automatically ready for Google or for real users.",
      "It helps to separate technical prerequisites from quality recommendations. Crawlability, indexability, and content availability in rendered HTML allow a search engine to process the page at all. Originality, accuracy, clear architecture, and a usable experience make the page worth keeping. Structured data and Open Graph have specific roles; neither guarantees a richer result or better rankings.",
    ],
    blocks: [
      {
        type: "table",
        caption: "What to check on an AI-generated website and why.",
        columns: ["Area", "What to check", "Role"],
        rows: [
          ["Crawlability", "Links, robots.txt, and reachable URLs", "Allows Google to find the content"],
          ["Indexability", "noindex, canonical, and response status", "Prevents accidental exclusion or wrong URL selection"],
          ["Rendering", "Content in the server response and after loading", "Helps make text and metadata available"],
          ["Architecture", "Hierarchy, slugs, and internal links", "Connects topics and important pages"],
          ["Performance", "LCP, INP, CLS, and mobile behavior", "Contributes to page experience quality"],
          ["Structured data", "Validity, accuracy, and visible-content match", "May help understanding and feature eligibility"],
          ["Accessibility", "Semantic HTML, keyboard use, contrast, and alt text", "Makes content usable by more people"],
          ["Content", "Facts, sources, intent, and original contribution", "Gives users a reason to trust the page"],
        ],
      },
    ],
  },
  {
    heading: "A practical example: AI generates a website, a developer prepares it for Google",
    paragraphs: [
      "Imagine a realistic but illustrative process: a small business owner or developer uses an AI tool such as ChatGPT, Claude Code, Gemini CLI, Codex, or Cursor to prepare a homepage, contact form, and several pieces of copy. The first result looks tidy in a browser. That is a starting point, not proof that the work is finished.",
      "When I work with AI-assisted development, I review the result as a product someone will actually use. I check what the server sends without relying on JavaScript to reveal the page later, verify URLs and metadata, then test interactions, mobile layouts, accessibility, and the data represented in the page structure.",
      "This is not a measured experiment or a promise of a particular ranking. It is an illustrative order of responsibility that prevents a fast AI draft from becoming a public technical failure.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Draft", title: "AI prepares the initial code and copy" },
          { label: "HTML", title: "Check what is available in server-rendered content" },
          { label: "Metadata", title: "Title, description, canonical, hreflang, and OG" },
          { label: "Crawl", title: "Sitemap, robots, links, and indexability" },
          { label: "Review", title: "Facts, structured data, UX, and accessibility" },
          { label: "Publish", title: "Only when the content and technical layer are ready" },
        ],
      },
      {
        type: "cta",
        title: "Have an AI-built website but do not know if it is ready for Google?",
        body: "An SEO audit can reveal problems with metadata, canonical URLs, sitemaps, internal links, and basic indexability. NMark Designs SEO audits start at €150.",
        label: "View the SEO audit",
        href: "/en/pricing/#svc-seo",
      },
    ],
  },
  {
    heading: "Is an AI website builder better than a developer who uses AI?",
    paragraphs: [
      "There is no answer that fits every business. An AI website builder can be sensible for a simple presentation site, a quick idea validation, or a project with clear limits. A developer using AI makes more sense when the project needs a specific structure, multiple languages, integrations, maintainability, code ownership, or long-term growth.",
      "The platform itself is not a ranking factor. Wix, Framer, WordPress, and Next.js can all serve different kinds of sites. The difference is how much control you have over the result, how easily you can test it, and how well it can change when the business changes.",
    ],
    blocks: [
      {
        type: "table",
        caption: "A practical way to compare the two approaches.",
        columns: ["Criterion", "AI builder", "AI-assisted custom development"],
        rows: [
          ["Initial speed", "Very fast for a standard format", "Fast with a clear brief and process"],
          ["Control", "Depends on the platform and plan", "More control over code, routes, and integrations"],
          ["SEO settings", "Available through the platform; check limits", "Can be planned, implemented, and tested"],
          ["Maintenance", "Tied to the platform and its ecosystem", "Depends on the code, hosting, and agreed process"],
          ["Best fit", "A simple site with defined requirements", "A specific, multilingual, or long-term project"],
        ],
      },
    ],
  },
  {
    heading: "How to use AI tools for SEO without unnecessary risk",
    paragraphs: [
      "The useful workflow is not “generate and publish”; it is research, draft, review, enrich, and test. ChatGPT, Claude Code, Gemini CLI, Codex, and other AI tools can help group questions, outline a page, suggest title variations, or explain a technical concept. They should not make the final decision about facts, strategy, or promises made to a customer.",
      "For each page, define who it is for, which question it answers, and which decision it should make easier. Then verify every detail that could affect money, health, law, timing, price, or trust. Finally, read the page as a first-time visitor: do they understand the offer and know what to do next?",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "Research", title: "Understand the audience and search intent" },
          { label: "Draft", title: "Use AI for structure and a first version" },
          { label: "Verify", title: "Check facts, sources, dates, and metadata" },
          { label: "Add", title: "Bring in experience, context, and original examples" },
          { label: "Optimize", title: "Refine headings, links, structure, and CTA" },
          { label: "Measure", title: "Watch indexing and performance in Search Console" },
        ],
      },
      {
        type: "linkList",
        title: "More useful pages on this site",
        items: [
          { label: "Website development cost in Serbia in 2026", href: "/en/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
          { label: "Website development and SEO foundations", href: "/en/services/" },
          { label: "NMark Designs pricing", href: "/en/pricing/" },
        ],
      },
    ],
  },
  {
    heading: "SEO checklist before publishing an AI-built website",
    paragraphs: [
      "Use this short review before publishing. Each item is not necessarily a direct ranking factor, but together they show whether the page is accessible, understandable, useful, and ready for real visitors.",
    ],
    blocks: [
      {
        type: "checklist",
        items: [
          "Can Google access the page and its important resources?",
          "Are the response status, noindex, and canonical URL correct?",
          "Do sitemap, robots.txt, and logical internal links exist?",
          "Is the main content available in rendered HTML?",
          "Do the title, meta description, and alt text describe the actual content?",
          "Have all facts, dates, prices, and promises been manually checked?",
          "Does the page add original value instead of a generic summary?",
          "Is structured data valid and consistent with visible content?",
          "Does the site work clearly on mobile and with a keyboard?",
          "Do the Serbian and English versions have correct canonical and hreflang links?",
          "Does the visitor know the next step: contact, quote, or service details?",
        ],
      },
    ],
  },
  {
    heading: "Frequently asked questions",
    paragraphs: [
      "These are the questions behind searches such as “ChatGPT SEO”, “AI-built website SEO”, and “does Google penalize AI content?” The answers separate Google’s documented position from common oversimplifications.",
    ],
    blocks: [
      {
        type: "faq",
        items: [
          {
            question: "Can Google detect AI-written text?",
            answer: "Google does not publicly describe a simple test that decides whether a person or an AI wrote a page. Its guidance focuses on usefulness, accuracy, originality, and spam patterns. It is therefore a weak strategy to plan SEO around passing or defeating an AI detector.",
          },
          {
            question: "Can AI-generated content rank first on Google?",
            answer: "It can rank if it is useful, accurate, original, and aligned with search intent. That is not a guarantee of a first position. The production method alone cannot predict the page’s final ranking.",
          },
          {
            question: "Does Google require an AI disclosure on website content?",
            answer: "Google’s general guidance does not require every ordinary web page to carry an AI label. It says that sharing how content was created can provide useful context when it makes sense for the audience. Separate rules can apply to ads or Merchant Center data.",
          },
          {
            question: "Does Next.js automatically improve SEO?",
            answer: "No. Next.js can make server rendering, static generation, metadata, and image optimization easier, but it does not guarantee rankings. A poorly configured Next.js site can still have weak content, wrong canonicals, or broken links.",
          },
          {
            question: "Can a Wix AI or Framer website rank?",
            answer: "Yes, if the result is accessible to search engines, technically sound, useful, and relevant. Choose a platform according to the project and the level of control you need, rather than assuming a tool automatically creates or removes ranking potential.",
          },
          {
            question: "What if the entire website was made with AI?",
            answer: "Review it as a product before publishing: content, code, metadata, crawlability, indexability, rendering, accessibility, performance, security, and the contact journey. If those layers work and the pages help users, the tool used to build the site is not enough reason to conclude that it cannot rank.",
          },
        ],
      },
    ],
  },
  {
    heading: "Conclusion: AI accelerates the work, but it is not SEO by itself",
    paragraphs: [
      "An AI-built website can rank on Google in 2026. AI can accelerate drafting, research, component development, and page production. But a functional website is not automatically discoverable, trustworthy, or commercially useful.",
      "Good results still require accurate information, original contribution, clear page intent, technical accessibility, connected pages, an accessible interface, and ongoing review. Google’s October 1 update simply made the publisher’s responsibility more explicit: check what you publish, including metadata.",
      "If you are planning a new website or already have an AI-generated version that is not producing enough enquiries, explore NMark Designs business website development or advanced website development services. AI can be a strong starting point; technical and editorial work is what turns a draft into a site ready for people, search engines, and the next business step.",
    ],
    blocks: [
      {
        type: "linkList",
        title: "The next step",
        items: [
          { label: "Business website development", href: "/en/pricing/#pkg-business-website" },
          { label: "Advanced website development", href: "/en/pricing/#pkg-advanced-website" },
          { label: "Contact NMark Designs", href: "/en/contact/" },
        ],
      },
    ],
  },
];

const sources = [
  { label: "Google Search Central: Guidance on using generative AI content", href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" },
  { label: "Google Search Central: Spam policies for Google web search", href: "https://developers.google.com/search/docs/essentials/spam-policies" },
  { label: "Google Search Central: Creating helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
  { label: "Google Search Central: A new resource for optimizing for generative AI in Google Search", href: "https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing" },
  { label: "Google Search Central: Guidance about AI-generated content", href: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content" },
  { label: "Google Search Central: Localized versions of your pages", href: "https://developers.google.com/search/docs/specialty/international/localized-versions" },
];

export const googleAiContent2026: Editorial = {
  image: "/blog/google-ai-content-2026-cover.webp",
  heroBackground: {
    image: "/blog/hero/google-ai-content-2026-bg.webp",
    width: 1672,
    height: 941,
    position: "center",
  },
  width: 1672,
  height: 941,
  alt: {
    sr: "Laptop sa prikazom strukture web sajta, papiri sa tehničkom checklistom i ruka koja proverava nacrt.",
    en: "Laptop showing website structure beside technical checklists and a hand reviewing the draft.",
  },
  caption: {
    sr: "AI može da ubrza nacrt sajta, ali tehnička provera i uređivanje odlučuju da li je spreman za objavu.",
    en: "AI can accelerate a website draft, but technical review and editing decide whether it is ready to publish.",
  },
  topic: { sr: "AI sadržaj i tehnički SEO", en: "AI content and technical SEO" },
  answer: {
    sr: "Da — sajt napravljen uz pomoć AI alata, od ChatGPT-a i Codex-a do AI website buildera, može da se rangira na Google-u. Google ne uvodi automatsku kaznu zato što je korišćen AI alat. Rezultat zavisi od korisnosti i tačnosti sadržaja, originalne vrednosti, tehničke dostupnosti, renderovanja, indeksabilnosti i iskustva korisnika. Ažuriranje Google smernica od 1. oktobra 2026. naglašava ručnu proveru AI sadržaja i metadata, ali nije predstavljalo novi penal ili algoritamski update.",
    en: "Yes — a website built with AI tools, from ChatGPT and Codex to AI website builders, can rank on Google. Google does not apply an automatic penalty because an AI tool was used. The result depends on useful and accurate content, original value, technical accessibility, rendering, indexability, and user experience. Google’s October 1, 2026 guidance update emphasizes manual review of AI content and metadata, but it was not a new penalty or ranking algorithm update.",
  },
  sections: { sr: sectionsSr, en: sectionsEn },
  sources,
  cta: {
    sr: {
      title: "Želite sajt koji je spreman za Google i ljude?",
      description: "Pogledajte kako NMark Designs pristupa izradi poslovnih sajtova, tehničkoj SEO osnovi i jasnom putu do upita.",
      label: "Pogledajte usluge",
      secondaryLabel: "Pogledajte cenovnik",
      secondaryHref: "/sr/cenovnik/",
    },
    en: {
      title: "Need a website ready for Google and real users?",
      description: "Explore how NMark Designs approaches business websites, technical SEO foundations, and clear paths to enquiries.",
      label: "Explore services",
      secondaryLabel: "View pricing",
      secondaryHref: "/en/pricing/",
    },
  },
};
