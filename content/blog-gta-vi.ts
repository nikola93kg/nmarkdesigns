import type { Editorial } from "@/content/blog-editorial";

const sectionsSr = [
  {
    heading: "GTA VI website nije običan landing page",
    paragraphs: [
      "Većina poslovnih sajtova počinje objašnjenjem: šta nudimo, kome pomažemo i kako da nas kontaktirate. GTA VI website radi nešto drugo. Umesto da odmah izloži kompletnu argumentaciju, on posetioca uvodi u atmosferu, budi radoznalost i postepeno otkriva sadržaj.",
      "To nije slučajna razlika u ukusu. To je razlika u poslovnom zadatku. Nepoznata lokalna firma mora brzo da objasni svoju vrednost. Rockstar već ima ogroman nivo prepoznatljivosti, pa može da računa na to da posetilac razume kontekst čim vidi naziv, boju, muziku ili poznate likove.",
      "Zato je korisno posmatrati ovaj sajt kao kampanju i brand experience, a ne kao klasičnu korporativnu početnu stranicu. Njegov cilj nije samo da nekoga dovede do kontakta. Cilj je da korisnik poželi da ostane, istražuje i uđe u svet koji će igra ponuditi.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          { title: "Tipičan poslovni website", body: "Korisnik često prvi put čuje za firmu i traži odgovor na praktično pitanje.", list: ["Problem → rešenje", "Poverenje", "Kontakt ili kupovina"] },
          { title: "GTA VI website", body: "Korisnik dolazi sa kontekstom i spreman je da istražuje atmosferu i sadržaj kampanje.", list: ["Atmosfera → radoznalost", "Priča i svet", "Proizvod → pre-order"] },
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-hero.webp",
        width: 1600,
        height: 900,
        alt: "Originalna editorial ilustracija filmske hero sekcije sa obalom, palmama i tamnim web interfejsom.",
        caption: "Originalna editorial ilustracija hero sekcije, napravljena za analizu vizuelnog storytellinga bez korišćenja Rockstar asseta.",
      },
    ],
  },
  {
    heading: "Rockstar ne prodaje samo igru — prodaje svet",
    paragraphs: [
      "Na GTA VI stranici sadržaj nije organizovan kao katalog funkcija. Vice City i Leonida, Jason i Lucia, muzika, lokacije, ljudi i mesta stvaraju osećaj da posetilac ne gleda samo proizvod, već zaviruje u njegov univerzum.",
      "Traileri, artwork i kratki tekstovi rade zajedno. Tekst je dovoljno kratak da ne preuzme pažnju od vizuelnog materijala, ali dovoljno precizan da svaka sekcija ima razlog. Vizuelna hijerarhija prvo određuje gde gledamo, a zatim sadržaj objašnjava zašto je to važno.",
      "To je važna lekcija i van gaming industrije. Dobar dizajn ne počinje pitanjem ‘Kako će izgledati?’, već pitanjem ‘Šta korisnik treba da oseti i uradi?’. Za restoran to može biti osećaj poverenja i rezervacija. Za studio može biti sigurnost da razume problem. Za B2B firmu može biti jasnoća procesa i sledeći razgovor.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Glavna lekcija",
        statement: "Dizajn nije dekoracija oko poruke. Dizajn je način na koji korisnik doživljava i razume poruku.",
        note: "Pre izbora animacije, slike ili fonta definišite osećaj, informaciju i akciju koju sekcija treba da podrži.",
      },
    ],
  },
  {
    heading: "Hero sekcija: koliko malo informacija je dovoljno?",
    paragraphs: [
      "Hero sekcija GTA VI sajta može da bude veoma koncentrisana: naziv igre, datum izlaska, platforme i poziv na pre-order. Na papiru, to je malo informacija. U kontekstu brenda, to je dovoljno jer ‘GTA VI’ već nosi značenje koje bi nepoznata firma morala tek da izgradi.",
      "Poređenje sa lokalnim biznisom je zato korisnije od kopiranja izgleda. Rockstar može da se osloni na poruke poput ‘GTA VI’, ‘Coming November 19, 2026’ i ‘Pre-Order’. Frizerski salon, računovodstvena agencija ili lokalni restoran ne mogu da stave ‘Dobrodošli na naš sajt’ i očekuju da posetilac sam zaključi šta dobija.",
      "Za poslovni hero potreban je jasan odgovor na tri pitanja: šta nudite, kome je namenjeno i koji je sledeći korak. Atmosfera može da bude deo rešenja, ali ne sme da sakrije vrednost. Ako je fotografija glavna zvezda, naslov ipak mora da objasni uslugu; ako je animacija velika, CTA mora da ostane lako uočljiv.",
    ],
    list: [
      "Rockstar koristi prepoznatljivost kao skraćenicu za kontekst.",
      "Nepoznati biznis mora da uloži više prostora u vrednosnu ponudu.",
      "Hero treba da bude dramatičan samo koliko poslovni cilj može da podrži.",
    ],
  },
  {
    heading: "Scroll kao deo priče",
    paragraphs: [
      "Na ovakvom sajtu scroll nije samo način da se dođe do dna stranice. On postaje deo narativne strukture. Korisnik prvo dobija atmosferu, zatim prikaz trailera, informacije o izdanjima i bonusima, a onda likove, muziku, ljude, mesta i medije.",
      "To je scrollytelling: sadržaj se otkriva progresivno, u redosledu koji ima smisla. Posetilac ne dobija sve informacije odjednom, pa svaka sledeća sekcija ima šansu da produži pažnju i izgradi novu nijansu priče.",
      "Ipak, scrollytelling nije isto što i scroll-jacking. Dobar scroll pomaže korisniku da razume redosled. Loš scroll mu oduzima kontrolu, preskače poziciju, usporava dolazak do informacije ili stvara problem tastaturi i čitačima ekrana. Scroll treba da otkriva sadržaj, ne da kažnjava korisnika.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "01", title: "Hero — kontekst i atmosfera" },
          { label: "02", title: "Trailers — pokret i iščekivanje" },
          { label: "03", title: "Editions / bonuses — proizvod" },
          { label: "04", title: "Jason & Lucia — likovi" },
          { label: "05", title: "Music / People & Places — svet" },
          { label: "06", title: "Media — sadržaj za dalje istraživanje" },
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-storytelling.webp",
        width: 1600,
        height: 900,
        alt: "Editorial ilustracija toka priče kroz šest vizuelnih panela od atmosfere do medija.",
        caption: "Originalna ilustracija progresivnog otkrivanja sadržaja: atmosfera, trailer, proizvod, likovi, muzika i mediji.",
      },
    ],
  },
  {
    heading: "Dobro izgleda. Ali da li je brzo?",
    paragraphs: [
      "Vizuelno bogat website otvara legitimno tehničko pitanje: koliko medija, videa, fontova, animacija i JavaScript-a možemo da isporučimo pre nego što iskustvo počne da trpi? Za GTA VI ne treba izmišljati odgovor. Sama vrsta iskustva jeste dobar primer za razgovor o performance budgetu.",
      "Core Web Vitals ne pitaju samo da li je sajt lep. Oni posmatraju da li se glavni sadržaj učitava na vreme, da li stranica reaguje kada je korisnik koristi i da li se raspored pomera dok sadržaj stiže.",
    ],
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "LCP", title: "Largest Contentful Paint", value: "≤ 2.5 s", body: "Koliko brzo se prikaže najveći važan element, obično naslovna slika ili glavni blok sadržaja." },
          { label: "INP", title: "Interaction to Next Paint", value: "< 200 ms", body: "Koliko brzo stranica vizuelno odgovori nakon klika, tap-a ili druge korisničke akcije." },
          { label: "CLS", title: "Cumulative Layout Shift", value: "< 0.1", body: "Koliko se sadržaj neočekivano pomera dok se slike, fontovi ili drugi elementi učitavaju." },
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-cwv.webp",
        width: 1600,
        height: 900,
        alt: "Editorial ilustracija tri performance signala: učitavanje, odziv na dodir i stabilan raspored.",
        caption: "Originalna ilustracija tri Core Web Vitals ideje: brzo učitavanje, odziv interakcije i stabilan layout.",
      },
    ],
  },
  {
    heading: "Da li GTA VI website prolazi Core Web Vitals?",
    paragraphs: [
      "Ne možemo to odgovorno da tvrdimo na osnovu podataka kojima trenutno raspolažemo. U dostupnom istraživanju nema pouzdanih aktuelnih CrUX field podataka koji bi potvrdili da GTA VI website prolazi ili pada Core Web Vitals.",
      "To nije izbegavanje odgovora, već razlika između utiska i merenja. Field data dolazi od stvarnih korisnika, na različitim uređajima i mrežama, i koristi se za procenu realnog iskustva. Za ovakav zaključak potreban je dovoljan i relevantan uzorak podataka.",
      "Lighthouse je drugačiji alat. On pokreće kontrolisan laboratorijski test koji je odličan za pronalaženje problema i proveru promena u implementaciji. Ali jedan Lighthouse rezultat nije dokaz da svi posetioci imaju isto iskustvo, niti je njegov skor sam po sebi potvrda ili presuda za Core Web Vitals.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Presuda",
        statement: "Nema dovoljno pouzdanih field podataka da bismo potvrdili da GTA VI website trenutno prolazi ili pada Core Web Vitals.",
        note: "Ne navodimo izmišljene LCP, INP, CLS ili Lighthouse vrednosti. FID više nije aktuelna Core Web Vital metrika.",
      },
    ],
  },
  {
    heading: "Field data vs Lab data",
    paragraphs: [
      "Najkraće rečeno: field data govori kako se sajt ponaša u stvarnom svetu, a lab data pomaže timu da sistematski pronađe uzrok problema. Potrebni su nam oba pogleda, ali ih ne treba mešati u zaključku.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          { title: "FIELD DATA / CrUX", body: "Agregirani podaci stvarnih Chrome korisnika koji pokazuju iskustvo kroz različite uređaje, lokacije i mreže.", list: ["Stvarni korisnici", "Različiti uslovi", "Osnova za real-world CWV procenu"] },
          { title: "LAB DATA / Lighthouse", body: "Kontrolisan i ponovljiv test koji pomaže da se pronađe šta usporava učitavanje ili interakciju.", list: ["Kontrolisano okruženje", "Ponovljivi test", "Odlično za debugging i regresije"] },
        ],
      },
    ],
  },
  {
    heading: "Gde ovakav dizajn najlakše postaje skup?",
    paragraphs: [
      "Ovo su performance risk areas za vizuelno bogata iskustva, ne potvrđeni problemi GTA VI sajta. Svaki tim koji pravi ovakav website mora da ih kontroliše pre objave i posle većih izmena.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          { eyebrow: "01 / Large media", title: "Veliki mediji", body: "Hero slike i video mogu da povećaju količinu podataka i odlože prikaz glavnog sadržaja. Dimenzije, format, preload i lazy loading moraju da prate prioritet." },
          { eyebrow: "02 / JavaScript", title: "JavaScript", body: "Bogate interakcije mogu da povećaju rad na glavnoj niti ako se učitavaju prerano ili rade više nego što je potrebno." },
          { eyebrow: "03 / Scroll animations", title: "Scroll animacije", body: "CSS transformacija može biti jeftina, ali složena animacija, stalni event listeneri ili velika količina DOM-a mogu postati skupi." },
          { eyebrow: "04 / Fonts", title: "Fontovi", body: "Custom fontovi utiču na prikaz i mogu doprineti pomeranju ili promeni teksta ako strategija učitavanja nije pažljivo podešena." },
          { eyebrow: "05 / Third-party", title: "Spoljni servisi", body: "Analytics, embed sadržaj i drugi third-party kod mogu dodati zahteve, JavaScript i nepredvidivost koju tim ne kontroliše potpuno." },
        ],
      },
    ],
  },
  {
    heading: "Da li dobar website mora da ima Lighthouse 100?",
    paragraphs: [
      "Ne. Lighthouse 100 nije poslovni cilj sam po sebi, kao što ni 100 na laboratorijskom testu ne znači da je svako realno iskustvo savršeno. Dobar website balansira više zahteva: performanse, percipiranu brzinu, UX, accessibility, brend, storytelling, SEO i konverziju.",
      "S druge strane, ‘performance nije važan ako sajt izgleda dobro’ jednako je loš zaključak. Ako korisnik čeka glavni sadržaj, ne može da klikne dugme ili mu se stranica pomera pod prstom, atmosfera prestaje da bude prednost.",
      "Praktičan princip glasi: prvo definišite poslovni cilj. Zatim performance budget. Tek onda dizajnirajte unutar tih granica. Rockstar može opravdano da uloži više u atmosferu jer je brand-first iskustvo deo proizvoda. Mali biznis mora da odluči gde vizuelni intenzitet stvarno pomaže prodaji, rezervaciji ili upitu.",
    ],
  },
  {
    heading: "GTA VI vs vaš poslovni website",
    paragraphs: [
      "Najvažnija lekcija nije da svi sajtovi treba da izgledaju kao igra. Lekcija je da dizajn treba da sledi nivo prepoznatljivosti, nameru posete i način na koji se donosi odluka.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Dve legitimne strategije, za dva potpuno različita konteksta.",
        columns: ["Dimenzija", "GTA VI", "Poslovni website"],
        rows: [
          ["Prepoznatljivost", "Ogroman postojeći brend", "Posetilac možda prvi put čuje za firmu"],
          ["Prioritet", "Brand-first", "Conversion-first"],
          ["Prvi osećaj", "Emocija i radoznalost", "Jasnoća i poverenje"],
          ["Glavna radnja", "Explore", "Solve / izaberi uslugu"],
          ["Sadržaj", "World building, trailer, artwork", "Usluga, proizvod, dokaz i proces"],
          ["CTA", "Pre-order", "Poziv, forma, rezervacija ili kupovina"],
          ["Pretraga", "Branded search", "Lokalna i nebrendirana pretraga"],
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-comparison.webp",
        width: 1600,
        height: 900,
        alt: "Editorial ilustracija poređenja imerzivnog brand-first i jasnog conversion-first website pristupa.",
        caption: "Originalna vizuelna paralela između atmosfere i istraživanja sa jedne strane, i jasnoće i akcije sa druge.",
      },
    ],
  },
  {
    heading: "7 stvari koje možemo da naučimo od Rockstara",
    paragraphs: [
      "Rockstarov pristup je koristan kada ga posmatramo kao skup principa, a ne kao gotov template. Evo kako se ti principi mogu prevesti u normalan poslovni website.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          { heading: "01 — Jedna poruka po sekciji", paragraphs: ["Rockstar ne pokušava da svaki blok napuni svim informacijama. Jedan deo gradi atmosferu, drugi prikazuje likove, treći vodi ka proizvodu.", "Za biznis: neka sekcija usluge objašnjava uslugu, a ne i istoriju firme, cenovnik i sve odgovore odjednom."], list: ["Primer: hero = ‘Izrađujemo brze sajtove za lokalne biznise.’"] },
          { heading: "02 — Vizuelna hijerarhija pre dekoracije", paragraphs: ["Velika slika ima smisla zato što vodi pogled. Nije dovoljno da element bude upečatljiv; mora da pomogne korisniku da razume redosled.", "Za biznis: prvo odredite naslov, dokaz i CTA, pa tek onda birajte pozadinu, ilustraciju ili motion."], list: ["Primer: važniji CTA dobija veću jasnoću, ne nužno jaču boju."] },
          { heading: "03 — Emocija može biti deo UX-a", paragraphs: ["UX nije samo broj klikova. Osećaj sigurnosti, uzbuđenja ili poverenja menja način na koji korisnik tumači informacije.", "Za biznis: fotografija stvarnog prostora, čist proces ili dobar case study mogu da smanje neizvesnost pre kontakta."], list: ["Primer: pokažite kako izgleda saradnja, ne samo finalni logo ili screenshot."] },
          { heading: "04 — Dobar website vodi korisnika kroz priču", paragraphs: ["Sadržaj dobija snagu kada se otkriva u logičnom redosledu. Ne morate imati dramatične animacije da biste imali narativ.", "Za biznis: problem → način rada → primer → odgovor na prigovor → sledeći korak često je sasvim dovoljno pripovedanje."], list: ["Primer: servis prvo objasni simptom, zatim pregled i na kraju zakazivanje."] },
          { heading: "05 — Jedan primarni CTA je često dovoljan", paragraphs: ["GTA VI stranica može da ima mnogo sadržaja, ali ne mora da se takmiči sa pet jednakih primarnih akcija.", "Za biznis: izaberite kontakt, poziv, rezervaciju ili kupovinu kao glavnu akciju. Portfolio i društvene mreže mogu biti sekundarni."], list: ["Primer: ‘Zatražite ponudu’ ostaje primarni CTA kroz ključne sekcije."] },
          { heading: "06 — Mobile nije samo smanjeni desktop", paragraphs: ["Vizuelna priča mora da se prevede na dodir, kraću širinu i drugačiji ritam čitanja. Element koji radi na velikom ekranu nije automatski dobar na telefonu.", "Za biznis: proverite redosled, crop slike, veličinu tap targeta, meni i čitljivost na 360 ili 390 piksela."], list: ["Primer: mobilni hero skraćuje naslov, ali ne skriva uslugu i CTA."] },
          { heading: "07 — Dizajn mora da pripada brendu", paragraphs: ["GTA VI website ima smisla jer njegova atmosfera pripada Rockstaru i proizvodu. Imitacija bez tog konteksta deluje kao kostim.", "Za biznis: boje, fotografija, tipografija i ton treba da potvrde ono što klijent već treba da oseti o vama."], list: ["Primer: računovodstvena agencija može biti moderna bez izgleda neon-kluba u Vice Cityju."] },
        ],
      },
    ],
  },
  {
    heading: "Šta mali biznis NE treba da kopira",
    paragraphs: [
      "Ako iz ovog članka ostane samo želja da na sajt stavite ogroman video i misteriozni meni, promašili smo poentu. Rockstar ne uspeva zato što je ‘cool’ u vakuumu, već zato što njegov stil odgovara publici, proizvodu i postojećem brendu.",
      "Lokalni biznis obično ima manje vremena da objasni vrednost i manje prostora za eksperiment. Posetilac računovodstvene agencije želi da zna da li mu možete pomoći. Gost restorana želi meni, lokaciju i rezervaciju. Pacijent želi jasnu uslugu i način zakazivanja.",
    ],
    blocks: [
      {
        type: "checklist",
        items: [
          "Nejasnu hero poruku koja lepo izgleda, ali ne objašnjava ponudu.",
          "Veliki autoplay video bez jasnog performance opravdanja.",
          "Prekomerne scroll animacije koje usporavaju ili dezorijentišu.",
          "Scroll-jacking koji korisniku oduzima kontrolu.",
          "Skrivanje ključnih informacija iza misterije, hover-a ili nepotrebnog klika.",
          "Misterioznu navigaciju kada korisnik treba da pronađe kontakt.",
          "Kopiranje GTA estetike samo zato što izgleda atraktivno.",
        ],
      },
    ],
  },
  {
    heading: "Zaključak: emocija privlači, UX zatvara posao",
    paragraphs: [
      "Rockstar može da proda emociju pre informacija zato što publika već razume proizvod. Većina biznisa nema taj luksuz. Njihov website mora da uradi obe stvari: da ostavi dobar osećaj i da dovoljno brzo odgovori na praktična pitanja.",
      "Zato GTA VI website nije lekcija o tome kako svi treba da dodaju više efekata. On je lekcija o usklađivanju brenda, sadržaja i poslovnog cilja. Vizuelna priča vredi kada vodi pažnju, pojačava značenje i ostaje upotrebljiva.",
      "Dobar website se ne definiše najvećim brojem animacija niti slepim jurenjem Lighthouse 100. Definiše ga razumevanje svrhe, jasan sledeći korak i dovoljno dobra brzina, dostupnost i memorabilnost da podrže tu svrhu.",
    ],
    blocks: [
      {
        type: "faq",
        items: [
          { question: "Da li GTA VI website prolazi Core Web Vitals?", answer: "Na osnovu dostupnog istraživanja ne postoji dovoljno pouzdanih aktuelnih CrUX field podataka da se odgovorno potvrdi da prolazi ili pada. Ne treba izmišljati LCP, INP, CLS ili Lighthouse vrednosti." },
          { question: "Koje su tri Core Web Vitals metrike?", answer: "LCP meri učitavanje najvećeg važnog sadržaja, INP odziv na korisničke interakcije, a CLS stabilnost rasporeda. Aktuelni dobri pragovi su LCP do 2,5 sekunde, INP ispod 200 ms i CLS ispod 0,1." },
          { question: "Da li je Lighthouse rezultat isto što i Core Web Vitals?", answer: "Ne. Lighthouse je kontrolisan laboratorijski test, dok field podaci poput CrUX-a opisuju iskustvo stvarnih korisnika. Lighthouse je odličan za debugging, ali sam rezultat nije dokaz real-world prolaza ili pada." },
          { question: "Šta mali biznis može da nauči od GTA VI sajta?", answer: "Jednu poruku po sekciji, jaku vizuelnu hijerarhiju, priču koja vodi korisnika, dosledan brend i jednu jasnu primarnu akciju — bez kopiranja cinematic implementacije." },
          { question: "Da li veliki video automatski čini website sporim?", answer: "Ne automatski. Rizik zavisi od formata, veličine, učitavanja, uređaja, mreže i ostatka implementacije. Veliki medij mora da ima opravdanje, rezervni prikaz i performance plan." },
        ],
      },
    ],
  },
] as const;

const sectionsEn = [
  {
    heading: "The GTA VI website is not a regular landing page",
    paragraphs: [
      "Most business websites start with an explanation: what we offer, who we help, and how to contact us. The GTA VI website does something else. Instead of laying out the full argument immediately, it introduces an atmosphere, creates curiosity, and reveals content progressively.",
      "That is not simply a difference in taste. It is a difference in business task. An unknown local company has to explain its value quickly. Rockstar already has enormous awareness, so it can rely on visitors understanding the context as soon as they see the name, colour, music, or familiar characters.",
      "It is therefore more useful to see the page as a campaign and brand experience than as a conventional corporate homepage. Its goal is not only to generate contact. It wants visitors to stay, explore, and enter the world the game promises.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          { title: "Typical business website", body: "Visitors may be hearing about the company for the first time and need a practical answer.", list: ["Problem → solution", "Trust", "Contact or purchase"] },
          { title: "GTA VI website", body: "Visitors arrive with context and are ready to explore the campaign atmosphere and content.", list: ["Atmosphere → curiosity", "Story and world", "Product → pre-order"] },
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-hero.webp",
        width: 1600,
        height: 900,
        alt: "Original editorial illustration of a cinematic hero section with a coastal sunset and dark website interface.",
        caption: "Original editorial illustration for the hero-section analysis, created without Rockstar assets.",
      },
    ],
  },
  {
    heading: "Rockstar is not only selling a game — it is selling a world",
    paragraphs: [
      "The GTA VI page is not organised like a feature catalogue. Vice City and Leonida, Jason and Lucia, music, locations, people and places create the feeling that visitors are not only looking at a product, but peeking into its universe.",
      "Trailers, artwork and short copy work together. The copy stays concise enough not to compete with the visual material, but precise enough for each section to have a reason. Visual hierarchy tells us where to look first, then the content explains why it matters.",
      "That lesson applies far beyond games. Good design does not start with ‘What should it look like?’ It starts with ‘What should the user feel and do?’ For a restaurant that may be confidence followed by a booking. For a studio it may be confidence that the team understands the problem. For a B2B company it may be clarity about process and the next conversation.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "The main lesson",
        statement: "Design is not decoration around the message. Design is how the user experiences and understands the message.",
        note: "Before choosing animation, imagery, or a font, define the feeling, information, and action the section needs to support.",
      },
    ],
  },
  {
    heading: "The hero section: how little information is enough?",
    paragraphs: [
      "The GTA VI hero can stay highly concentrated: the game name, release date, platforms, and a pre-order action. On paper, that is little information. In the context of the brand, it is enough because ‘GTA VI’ already carries meaning an unknown company would have to build first.",
      "The comparison with a local business is therefore more useful than copying the visual treatment. Rockstar can rely on ‘GTA VI’, ‘Coming November 19, 2026’, and ‘Pre-Order’. A salon, accounting firm, or local restaurant cannot place ‘Welcome to our website’ above the fold and expect visitors to infer the offer.",
      "A business hero needs to answer three questions: what do you offer, who is it for, and what should happen next? Atmosphere can be part of the solution, but it must not hide the value. If the photograph is the star, the heading still needs to explain the service; if the animation is large, the CTA must remain easy to find.",
    ],
    list: [
      "Rockstar uses awareness as a shortcut for context.",
      "An unknown business needs to spend more space on its value proposition.",
      "A hero should be dramatic only to the extent the business goal can support.",
    ],
  },
  {
    heading: "Scroll as part of the story",
    paragraphs: [
      "On a page like this, scroll is not only a way to reach the bottom. It becomes part of the narrative structure. Visitors first get atmosphere, then trailers, editions and bonuses, followed by characters, music, people, places, and media.",
      "That is scrollytelling: content is revealed progressively in a meaningful order. Visitors do not get every detail at once, so each next section has a chance to extend attention and add another layer to the story.",
      "Scrollytelling is not the same as scroll-jacking. Good scroll helps visitors understand sequence. Bad scroll removes control, jumps the page, delays access to information, or creates problems for keyboards and assistive technology. Scroll should reveal content, not punish the user.",
    ],
    blocks: [
      {
        type: "flow",
        items: [
          { label: "01", title: "Hero — context and atmosphere" },
          { label: "02", title: "Trailers — movement and anticipation" },
          { label: "03", title: "Editions / bonuses — product" },
          { label: "04", title: "Jason & Lucia — characters" },
          { label: "05", title: "Music / People & Places — world" },
          { label: "06", title: "Media — further exploration" },
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-storytelling.webp",
        width: 1600,
        height: 900,
        alt: "Editorial illustration of a story flow through six visual panels from atmosphere to media.",
        caption: "Original illustration of progressive disclosure: atmosphere, trailer, product, characters, music, and media.",
      },
    ],
  },
  {
    heading: "It looks good. But is it fast?",
    paragraphs: [
      "A media-rich website raises a legitimate technical question: how much imagery, video, fonts, animation, and JavaScript can be delivered before the experience starts to suffer? There is no reason to invent an answer for GTA VI. The type of experience is already a useful case for discussing a performance budget.",
      "Core Web Vitals do not only ask whether a page looks good. They consider whether the main content loads in time, whether the page responds when used, and whether the layout moves while content arrives.",
    ],
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "LCP", title: "Largest Contentful Paint", value: "≤ 2.5 s", body: "How quickly the largest important element appears, often the hero image or main content block." },
          { label: "INP", title: "Interaction to Next Paint", value: "< 200 ms", body: "How quickly the page visually responds after a click, tap, or another user action." },
          { label: "CLS", title: "Cumulative Layout Shift", value: "< 0.1", body: "How much content moves unexpectedly while images, fonts, or other elements load." },
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-cwv.webp",
        width: 1600,
        height: 900,
        alt: "Editorial illustration of three performance signals: loading, touch response, and layout stability.",
        caption: "Original illustration of the three Core Web Vitals ideas: loading, interaction response, and layout stability.",
      },
    ],
  },
  {
    heading: "Does the GTA VI website pass Core Web Vitals?",
    paragraphs: [
      "We cannot responsibly claim that based on the data currently available to us. The supplied research does not contain reliable current CrUX field data that would prove the GTA VI website passes or fails Core Web Vitals.",
      "That is not avoiding the question; it is the difference between an impression and a measurement. Field data comes from real users on different devices and networks and is used to assess real-world experience. A meaningful conclusion needs a sufficient and relevant sample.",
      "Lighthouse is different. It runs a controlled lab test that is excellent for finding problems and checking implementation changes. But one Lighthouse result is not proof that every visitor has the same experience, nor is its score alone a pass/fail verdict for Core Web Vitals.",
    ],
    blocks: [
      {
        type: "verdict",
        title: "Verdict",
        statement: "There is not enough reliable field data to confirm that the GTA VI website currently passes or fails Core Web Vitals.",
        note: "We do not invent LCP, INP, CLS, or Lighthouse values. FID is no longer a current Core Web Vital metric.",
      },
    ],
  },
  {
    heading: "Field data vs lab data",
    paragraphs: [
      "In short: field data tells us how a website behaves in the real world, while lab data helps a team systematically investigate causes. We need both views, but we should not use them interchangeably in a conclusion.",
    ],
    blocks: [
      {
        type: "comparison",
        items: [
          { title: "FIELD DATA / CrUX", body: "Aggregated data from real Chrome users showing experience across devices, locations, and networks.", list: ["Real users", "Different conditions", "Basis for real-world CWV assessment"] },
          { title: "LAB DATA / Lighthouse", body: "A controlled, repeatable test that helps identify what is slowing loading or interaction.", list: ["Controlled environment", "Repeatable test", "Excellent for debugging and regressions"] },
        ],
      },
    ],
  },
  {
    heading: "Where does this kind of design become expensive?",
    paragraphs: [
      "These are performance risk areas for rich experiences, not confirmed problems on the GTA VI website. Any team building this kind of site needs to control them before launch and after major changes.",
    ],
    blocks: [
      {
        type: "cards",
        items: [
          { eyebrow: "01 / Large media", title: "Large media", body: "Hero images and video can increase transfer size and delay the main content. Dimensions, format, preload, and lazy loading need to follow priority." },
          { eyebrow: "02 / JavaScript", title: "JavaScript", body: "Rich interactions can increase main-thread work if they load too early or do more than necessary." },
          { eyebrow: "03 / Scroll animations", title: "Scroll animations", body: "A CSS transform may be cheap, but complex animation, persistent event listeners, or a large DOM can become expensive." },
          { eyebrow: "04 / Fonts", title: "Fonts", body: "Custom fonts affect rendering and can contribute to shifts or text changes when the loading strategy is not carefully planned." },
          { eyebrow: "05 / Third-party", title: "Third-party integrations", body: "Analytics, embeds, and other third-party code can add requests, JavaScript, and unpredictability the team does not fully control." },
        ],
      },
    ],
  },
  {
    heading: "Does a good website need Lighthouse 100?",
    paragraphs: [
      "No. Lighthouse 100 is not a business goal by itself, just as a perfect lab score does not mean every real-world experience is perfect. A strong website balances performance, perceived speed, UX, accessibility, branding, storytelling, SEO, and conversion.",
      "The opposite claim — ‘performance does not matter if the site looks good’ — is equally weak. If users wait for the main content, cannot click the button, or watch the page move under their finger, atmosphere stops being an advantage.",
      "A practical principle is: define the business goal first. Then define the performance budget. Only then design within those limits. Rockstar can justifiably invest more in atmosphere because the brand-first experience is part of the product. A small business needs to decide where visual intensity genuinely helps a sale, booking, or enquiry.",
    ],
  },
  {
    heading: "GTA VI vs your business website",
    paragraphs: [
      "The important lesson is not that every website should look like a game. It is that design should follow awareness, visit intent, and how decisions are made.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Two legitimate strategies for two very different contexts.",
        columns: ["Dimension", "GTA VI", "Business website"],
        rows: [
          ["Awareness", "Massive existing brand", "Visitors may not know the company"],
          ["Priority", "Brand-first", "Conversion-first"],
          ["First feeling", "Emotion and curiosity", "Clarity and trust"],
          ["Main action", "Explore", "Solve / choose a service"],
          ["Content", "World building, trailer, artwork", "Service, product, proof, and process"],
          ["CTA", "Pre-order", "Call, form, booking, or purchase"],
          ["Search", "Branded search", "Local and non-branded search"],
        ],
      },
    ],
    media: [
      {
        image: "/blog/gta-vi-comparison.webp",
        width: 1600,
        height: 900,
        alt: "Editorial illustration comparing immersive brand-first and clear conversion-first website strategies.",
        caption: "Original visual contrast between atmosphere and exploration on one side, and clarity and action on the other.",
      },
    ],
  },
  {
    heading: "7 things we can learn from Rockstar",
    paragraphs: [
      "Rockstar’s approach is useful when treated as a set of principles, not a ready-made template. Here is how those principles can translate to a normal business website.",
    ],
    blocks: [
      {
        type: "subsections",
        items: [
          { heading: "01 — One message per section", paragraphs: ["Rockstar does not try to fill every block with every detail. One area builds atmosphere, another presents characters, and another moves towards the product.", "For a business: let a service section explain the service rather than also carrying the company history, price list, and every FAQ."], list: ["Example: hero = ‘We build fast websites for local businesses.’"] },
          { heading: "02 — Visual hierarchy before decoration", paragraphs: ["A large image matters because it guides attention. It is not enough for an element to be striking; it has to help visitors understand sequence.", "For a business: define the heading, proof, and CTA first, then choose the background, illustration, or motion."], list: ["Example: the most important CTA gets clarity, not necessarily the loudest colour."] },
          { heading: "03 — Emotion can be part of UX", paragraphs: ["UX is not only a click count. Feelings of safety, excitement, or trust change how users interpret information.", "For a business: a real space, a clear process, or a good case study can reduce uncertainty before contact."], list: ["Example: show what collaboration looks like, not only the final logo or screenshot."] },
          { heading: "04 — A good website leads visitors through a story", paragraphs: ["Content becomes stronger when it is revealed in a logical order. You do not need dramatic animation to have a narrative.", "For a business: problem → approach → example → objection → next step is often enough storytelling."], list: ["Example: a service explains the symptom, the assessment, and finally the booking path."] },
          { heading: "05 — One primary CTA is often enough", paragraphs: ["The GTA VI page can contain a lot of content without competing with five equally primary actions.", "For a business: choose contact, call, booking, or purchase as the main action. Portfolio and social links can be secondary."], list: ["Example: ‘Request a quote’ stays primary through the key sections."] },
          { heading: "06 — Mobile is not a smaller desktop", paragraphs: ["A visual story has to translate to touch, narrower widths, and a different reading rhythm. What works on a large screen is not automatically good on a phone.", "For a business: check order, image crop, tap-target size, menu, and readability at 360 or 390 pixels."], list: ["Example: the mobile hero shortens the heading without hiding the service or CTA."] },
          { heading: "07 — Design has to belong to the brand", paragraphs: ["The GTA VI website makes sense because its atmosphere belongs to Rockstar and the product. Imitation without that context feels like a costume.", "For a business: colour, photography, typography, and tone should confirm what clients need to feel about you."], list: ["Example: an accounting firm can be modern without looking like a neon club in Vice City."] },
        ],
      },
    ],
  },
  {
    heading: "What a small business should NOT copy",
    paragraphs: [
      "If this article leaves you wanting a huge video and a mysterious menu, we have missed the point. Rockstar works because its style fits the audience, product, and existing brand — not because it is ‘cool’ in a vacuum.",
      "A local business usually has less time to explain value and less room for experimentation. An accounting firm needs to show whether it can help. A restaurant needs a menu, location, and booking path. A dental practice needs a clear service and a way to schedule.",
    ],
    blocks: [
      {
        type: "checklist",
        items: [
          "An unclear hero that looks good but does not explain the offer.",
          "A huge autoplay video without a performance justification.",
          "Excessive scroll animation that slows or disorients visitors.",
          "Scroll-jacking that takes control away from the user.",
          "Hiding essential information behind mystery, hover, or an unnecessary click.",
          "Mysterious navigation when visitors need to find contact details.",
          "Copying GTA aesthetics just because they look attractive.",
        ],
      },
    ],
  },
  {
    heading: "Conclusion: emotion attracts, UX closes the deal",
    paragraphs: [
      "Rockstar can sell emotion before information because its audience already understands the product. Most businesses do not have that luxury. Their website needs to do both: leave a strong impression and answer practical questions quickly enough.",
      "That is why the GTA VI website is not a lesson in adding more effects everywhere. It is a lesson in aligning brand, content, and business purpose. A visual story is valuable when it guides attention, adds meaning, and remains usable.",
      "A good website is not defined by the highest number of animations or by blindly chasing Lighthouse 100. It is defined by understanding its purpose, leading users to the right action, and staying fast, accessible, and memorable enough to support that purpose.",
    ],
    blocks: [
      {
        type: "faq",
        items: [
          { question: "Does the GTA VI website pass Core Web Vitals?", answer: "The supplied research does not contain enough reliable current CrUX field data to responsibly confirm a pass or fail. We should not invent LCP, INP, CLS, or Lighthouse values." },
          { question: "What are the three Core Web Vitals?", answer: "LCP measures loading of the largest important content, INP measures responsiveness to user interactions, and CLS measures layout stability. Current good thresholds are LCP up to 2.5 seconds, INP under 200 ms, and CLS under 0.1." },
          { question: "Is a Lighthouse result the same as Core Web Vitals?", answer: "No. Lighthouse is a controlled lab test, while field data such as CrUX describes real-user experience. Lighthouse is excellent for debugging, but its result alone is not proof of a real-world pass or fail." },
          { question: "What can a small business learn from the GTA VI website?", answer: "One message per section, strong visual hierarchy, a guided story, a consistent brand, and one clear primary action — without copying a cinematic implementation." },
          { question: "Does a large video automatically make a website slow?", answer: "Not automatically. The risk depends on format, size, loading strategy, device, network, and the rest of the implementation. Large media needs justification, a fallback, and a performance plan." },
        ],
      },
    ],
  },
] as const;

export const gtaViWebsiteAnalysis = {
  image: "/blog/gta-vi-website-cover.png",
  imageType: "image/png",
  heroBackground: {
    image: "/blog/hero/gta-vi-website-hero.webp",
    width: 1920,
    height: 900,
    position: "center",
  },
  width: 1788,
  height: 872,
  alt: {
    sr: "Screenshot GTA VI website-a sa centralnim logotipom, likovima, vozilima, obalom i informacijama o izlasku igre.",
    en: "Screenshot of the GTA VI website with the central logo, characters, vehicles, coastline, and release information.",
  },
  caption: {
    sr: "Screenshot hero sekcije GTA VI website-a, dostavljen za ovaj članak.",
    en: "GTA VI website hero-section screenshot supplied for this article.",
  },
  topic: { sr: "Web dizajn, UX i performanse", en: "Web design, UX & performance" },
  answer: {
    sr: "GTA VI website funkcioniše kao kampanja i brand experience: prodaje atmosferu, priču i svet, a ne samo listu funkcija. Ali nema dovoljno pouzdanih aktuelnih field podataka da bismo odgovorno tvrdili da trenutno prolazi ili pada Core Web Vitals.",
    en: "The GTA VI website works as a campaign and brand experience: it sells atmosphere, story, and a world rather than only a feature list. But there is not enough reliable current field data to responsibly claim that it passes or fails Core Web Vitals.",
  },
  sections: { sr: sectionsSr, en: sectionsEn },
  sources: [
    { label: "Rockstar Games — GTA VI", href: "https://www.rockstargames.com/VI" },
    { label: "Google Search Central — Core Web Vitals", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
    { label: "Google Search Console Help — Core Web Vitals report", href: "https://support.google.com/webmasters/answer/9205520" },
    { label: "Google Developers — PSI and CrUX", href: "https://developers.google.com/codelabs/chrome-web-vitals-psi-crux" },
  ],
  cta: {
    sr: {
      title: "Vaš sajt ne mora da izgleda kao GTA VI. Ali mora da zna zašto postoji.",
      description: "NMark Designs gradi sajtove koji spajaju promišljen dizajn, performanse i jasan put ka upitu — bez kopiranja tuđeg brenda.",
      label: "Razgovarajmo o vašem sajtu",
      secondaryLabel: "Pogledajte naše radove",
      secondaryHref: "/sr/portfolio/",
    },
    en: {
      title: "Your website does not have to look like GTA VI. But it has to know why it exists.",
      description: "NMark Designs builds websites that combine thoughtful design, performance, and a clear path to an enquiry — without copying someone else’s brand.",
      label: "Let’s talk about your website",
      secondaryLabel: "View our work",
      secondaryHref: "/en/portfolio/",
    },
  },
} as const satisfies Editorial;
