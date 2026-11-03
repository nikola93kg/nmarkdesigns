import type { BlogSection } from "@/content/blog";
import type { Editorial } from "@/content/blog-editorial";

const sectionsSr: readonly BlogSection[] = [
  {
    heading: "SEO, AEO i GEO: razlika na jednom mestu",
    paragraphs: [
      "Kada tražite način da vaš sajt bude vidljiviji, danas možete dobiti ponudu za SEO, AEO ili GEO. Nazivi zvuče kao tri različita posla, iako se veliki deo rada preklapa: tehnički dostupan sajt, jasno objašnjena usluga i informacije kojima posetilac može da veruje.",
      "Najkorisnije je razlikovati ih prema cilju. SEO obuhvata pronalaženje i vidljivost u organskoj pretrazi. AEO stavlja naglasak na direktan odgovor na pitanje. GEO se bavi vidljivošću i predstavljanjem sadržaja ili brenda u generativnim AI odgovorima. AEO i GEO su industrijski termini čija upotreba varira; granica između njih nije strogo definisana.",
    ],
    blocks: [{
      type: "table",
      caption: "Praktično poređenje ciljeva, a ne tri odvojena tehnička standarda.",
      columns: ["Pristup", "Glavni cilj", "Primer", "Šta pratiti"],
      rows: [
        ["SEO — Search Engine Optimization", "Da se relevantna stranica pronađe u organskoj pretrazi", "Stranica usluge za upit „izrada poslovnog sajta“", "Prikaze, klikove i relevantne upite klijenata"],
        ["AEO — Answer Engine Optimization", "Da sadržaj pruži jasan odgovor koji sistem može da izdvoji", "Odgovor na pitanje „šta ulazi u cenu izrade sajta?“", "Pojavljivanje odgovora, posete i upite koji slede"],
        ["GEO — Generative Engine Optimization", "Da sadržaj bude korišćen kao izvor ili brend tačno predstavljen u AI odgovoru", "AI poređenje poslovnih sajtova sa linkom ka vašem vodiču", "Citate, tačnost pominjanja i poslovni doprinos"],
      ],
    }],
  },
  {
    heading: "SEO: osnova da prava stranica dođe do pravog posetioca",
    paragraphs: [
      "SEO počinje pitanjem šta potencijalni klijent traži i koja vaša stranica mu stvarno pomaže. Za poslovni sajt to su često stranice usluga, radovi, informacije o procesu i kontakt. Blog je koristan kada razjašnjava dileme koje se javljaju pre kupovine.",
      "Ako nudite izradu sajtova, jedna stranica koja nabraja sve digitalne usluge teško može da objasni obim svakog posla. Jasna stranica konkretne usluge može da predstavi kome je namenjena, šta uključuje i kako izgleda saradnja. Interne veze zatim povezuju tu uslugu sa relevantnim radovima i vodičima.",
      "Tehnička provera obuhvata dostupnost za pretraživače, indeksiranje, ispravne URL-ove i canonical oznake. Title i opis treba da odgovaraju sadržaju, a mobilni prikaz da omogući čitanje i kontakt bez prepreka. SEO je kontinuirano unapređivanje, a ne jednokratno ubacivanje ključnih reči.",
    ],
    blocks: [{ type: "linkList", title: "Osnove iz zvanične dokumentacije", items: [
      { label: "Google Search Central — SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    ] }],
  },
  {
    heading: "AEO: odgovorite na pitanje pre nego što krenete u prodaju",
    paragraphs: [
      "AEO je koristan urednički pristup kada posetilac dolazi sa konkretnim pitanjem. Umesto dugog uvoda, ponudite kratak odgovor, pa objasnite uslove, izuzetke i sledeći korak. Takav sadržaj je lakši za korišćenje i kada ga čovek čita na telefonu.",
      "Na primer, na pitanje „koliko traje izrada sajta?“ nije dovoljno odgovoriti „brzo i profesionalno“. Navedite stvaran okvir ako ga možete potvrditi i objasnite od čega zavisi: broj stranica, priprema tekstova i fotografija, funkcionalnosti i odobravanje dizajna. Ako nemate pouzdan rok, objasnite kako se on određuje umesto da ga izmislite.",
      "Podnaslovi u obliku pitanja, liste koraka i pregledne tabele mogu pomoći čitaocu da pronađe odgovor. To ne znači da svaki pasus treba pretvoriti u FAQ. Google sam određuje kada prikazuje izdvojeni odgovor, odnosno featured snippet; vlasnik sajta ne može posebnom oznakom da rezerviše to mesto.",
    ],
    blocks: [{ type: "linkList", title: "Kako se biraju izdvojeni odgovori", items: [
      { label: "Google Search Central — Featured snippets and your website", href: "https://developers.google.com/search/docs/appearance/featured-snippets" },
    ] }],
  },
  {
    heading: "GEO: da li vaš sadržaj može da posluži kao izvor?",
    paragraphs: [
      "Generativni sistemi sastavljaju odgovor, pa korisnik ne mora prvo da izabere jedan od ponuđenih linkova. Za vlasnika sajta zato postaje važno da li se njegova stranica navodi kao izvor i da li je ono što AI govori o njegovoj firmi tačno. Pominjanje brenda, citat sa linkom i poseta sajtu predstavljaju različite ishode.",
      "Naša praktična preporuka je da sadržaj učinite korisnim i van sopstvenog prodajnog konteksta. Objasnite kriterijume za izbor usluge, prikažite stvarne radove i navedite ograničenja preporuke. Poređenje treba da kaže za koga je koja opcija prikladna. Studija slučaja treba da razlikuje urađeni posao od rezultata koji nisu mereni.",
      "Potpis autora, proverljivi izvori i dosledni podaci o firmi pomažu čitaocu da proceni pouzdanost. Oni nisu potvrda da će AI odabrati baš vaš sajt. Posebno izbegavajte izmišljene statistike i masovno prepisivanje opštih saveta: tekst tada nema jasan razlog da bude izabran umesto postojećeg izvora.",
    ],
    blocks: [{ type: "linkList", title: "Kvalitet sadržaja i AI odgovori", items: [
      { label: "Microsoft — Optimizing Your Content for Inclusion in AI Search Answers", href: "https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers" },
      { label: "Google — Creating helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ] }],
  },
  {
    heading: "Da li su za AI pretragu potrebni posebni fajlovi i schema?",
    paragraphs: [
      "Za Google AI Overviews i AI Mode, Google navodi da nema dodatnih tehničkih zahteva ni posebne schema oznake. Stranica mora biti indeksirana i podobna za prikaz sa isečkom u pretrazi. Novi AI tekstualni fajl nije uslov za pojavljivanje u tim funkcijama. To je smernica za Google Search, a ne univerzalno pravilo za svaki AI servis.",
      "Strukturirani podaci treba da opisuju stvarni sadržaj stranice. Ne pretvaraju slabu stranicu u pouzdan izvor i ne garantuju citiranje. Pre dodavanja novih oznaka proverite da li posetilac uopšte može da pronađe cenu ili način obračuna, opis usluge i kontakt.",
    ],
    blocks: [{ type: "linkList", title: "Tehnički uslovi za Google AI funkcije", items: [
      { label: "Google Search Central — AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
    ] }],
  },
  {
    heading: "Šta prvo uraditi ako imate ograničen budžet?",
    paragraphs: [
      "Preporučujemo sledeći redosled. On nije zahtev pretraživača, već način da ulaganje prvo reši prepreke koje utiču i na posetioce i na vidljivost.",
    ],
    blocks: [{ type: "subsections", items: [
      { heading: "1. Proverite da li osnovne stranice rade svoj posao", paragraphs: ["Počnite od početne, ključnih usluga i kontakta. Proverite indeksiranje, mobilni prikaz, interne linkove i slanje upita. Ako kontakt forma ne radi ili se ne razume šta nudite, dodatna vidljivost ne rešava glavni problem."] },
      { heading: "2. Dopunite informacije koje klijenti stalno traže", paragraphs: ["Zapišite pitanja iz stvarnih razgovora: šta ulazi u cenu, šta klijent priprema, ko održava sajt i kako se dogovaraju izmene. Odgovore postavite uz odgovarajuću uslugu, gde su potrebni za odluku. To je praktičan početak AEO pristupa."] },
      { heading: "3. Objavite sadržaj koji donosi nešto vaše", paragraphs: ["Izaberite dilemu koju poznajete iz rada. Prikažite proverljiv primer, objasnite odluku i povežite tekst sa relevantnom uslugom. Za lokalni posao proverite i tačnost poslovnih profila. Širite sadržaj kada postojeće stranice već jasno objašnjavaju ponudu."] },
    ] }],
  },
  {
    heading: "Kako meriti uspeh bez jurenja AI pominjanja?",
    paragraphs: [
      "Odvojite vidljivost od poslovnog rezultata. Prikaz u pretrazi pokazuje da se stranica pojavila, klik da je neko došao, a kvalitetan upit da postoji interesovanje za saradnju. AI citat ne potvrđuje da je osoba posetila sajt ili postala klijent.",
      "Bing Webmaster Tools ima AI Performance izveštaj o citiranju na podržanim AI površinama. On ne predstavlja pregled svih AI platformi i broj citata nije pozicija u odgovoru. Podatke o citatima posmatrajte uz posete i ostvarene kontakte.",
      "Za sopstveno praćenje pripremite isti skup stvarnih pitanja klijenata i beležite datum, platformu, jezik, citirani URL i tačnost odgovora. Rezultati takve provere su uzorak, a ne pouzdan tržišni udeo: odgovor može da se promeni sa formulacijom pitanja i kontekstom razgovora.",
    ],
    blocks: [{ type: "linkList", title: "Šta Bing izveštaj meri", items: [
      { label: "Bing — Introducing AI Performance in Bing Webmaster Tools", href: "https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview" },
    ] }],
  },
  {
    heading: "Najčešća pitanja o SEO, AEO i GEO",
    paragraphs: [],
    blocks: [{ type: "faq", items: [
      { question: "Da li GEO zamenjuje SEO?", answer: "GEO dodaje fokus na generativne odgovore. Za poslovni sajt i dalje su potrebne jasne, tehnički dostupne stranice koje odgovaraju na potrebe potencijalnih klijenata. Zbog nove skraćenice ne treba zanemariti organsku pretragu." },
      { question: "Da li je FAQ sekcija dovoljna za AEO?", answer: "FAQ može da pomogne kada odgovara na stvarna pitanja. Važni odgovori treba da postoje i u samom sadržaju usluge, sa potrebnim kontekstom. Dodavanje pitanja radi forme ne garantuje izdvojeni odgovor." },
      { question: "Može li neko da garantuje AI citat?", answer: "Takvo obećanje nije pouzdana osnova za saradnju. Tražite konkretan obim rada, izvore preporuka i način merenja. Izbor izvora ostaje na platformi i može da se menja." },
      { question: "Da li treba kupiti tri odvojena paketa?", answer: "Ne automatski. Tražite jedinstven plan sa jasno opisanim tehničkim, sadržajnim i mernim zadacima. Odvojeni paketi imaju smisla samo ako je jasno šta svaki dodaje i da se isti posao ne naplaćuje više puta." },
    ] }],
  },
  {
    heading: "Šta je vašem sajtu potrebno u 2026?",
    paragraphs: [
      "Poslovnom sajtu je potreban jasan odgovor na tri pitanja: šta nudite, zašto bi vam klijent verovao i kako može da vas kontaktira. SEO, AEO i GEO pomažu da te informacije dođu do ljudi kroz različite načine pretrage.",
      "Ako tek počinjete, uredite osnovne stranice i merenje upita. Ako sajt već radi dobro, dopunite odgovore na važna pitanja i razvijajte sadržaj sa originalnim primerima. Birajte sledeći korak prema stvarnom nedostatku sajta i potrebama klijenata.",
    ],
    blocks: [{ type: "linkList", title: "Povezani vodiči", items: [
      { label: "Kako AI Overviews i ChatGPT menjaju pretragu", href: "/sr/blog/ai-menja-google-pretragu-ai-overviews-chatgpt-ai-search/" },
      { label: "Kako da uradite brz audit sajta", href: "/sr/blog/kako-da-radite-brzi-audit-sajta/" },
    ] }],
  },
];

const sectionsEn: readonly BlogSection[] = [
  {
    heading: "SEO, AEO and GEO at a glance",
    paragraphs: [
      "When you look for ways to improve your website’s visibility, you may be offered SEO, AEO or GEO. These sound like three separate jobs, although much of the work overlaps: a technically accessible website, clearly explained services and information visitors can trust.",
      "The most useful distinction is their goal. SEO covers discovery and visibility in organic search. AEO emphasizes direct answers to questions. GEO focuses on how content or a brand appears in generative AI answers. AEO and GEO are industry terms used in different ways; there is no strict boundary between them.",
    ],
    blocks: [{
      type: "table",
      caption: "A practical comparison of goals, rather than three separate technical standards.",
      columns: ["Approach", "Main goal", "Example", "What to track"],
      rows: [
        ["SEO — Search Engine Optimization", "Help a relevant page appear in organic search", "A service page for ‘business website development’", "Impressions, clicks and relevant enquiries"],
        ["AEO — Answer Engine Optimization", "Provide a clear answer a system can extract", "An answer to ‘what does website pricing include?’", "Answer appearances, visits and subsequent enquiries"],
        ["GEO — Generative Engine Optimization", "Have content used as a source or a brand accurately represented in AI answers", "An AI comparison linking to your guide", "Citations, accurate mentions and business contribution"],
      ],
    }],
  },
  {
    heading: "SEO: connect the right page with the right visitor",
    paragraphs: [
      "SEO starts with what a potential customer is looking for and which page actually helps them. For a business website, these are often service pages, previous work, process information and contact details. A blog helps when it resolves questions people have before buying.",
      "If you build websites, a single page listing every digital service can struggle to explain the scope of each one. A dedicated service page can describe who it is for, what is included and how collaboration works. Internal links then connect that service with relevant projects and guides.",
      "Technical checks include crawler access, indexing, correct URLs and canonical tags. Titles and descriptions should reflect the content, while the mobile experience should make reading and contacting you straightforward. SEO involves ongoing improvement, rather than a one-off exercise in inserting keywords.",
    ],
    blocks: [{ type: "linkList", title: "Official guidance on the fundamentals", items: [
      { label: "Google Search Central — SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    ] }],
  },
  {
    heading: "AEO: answer the question before making your pitch",
    paragraphs: [
      "AEO is a useful editorial approach when visitors arrive with a specific question. Give a short answer first, then explain conditions, exceptions and next steps. This also makes the content easier for someone reading on a phone.",
      "For example, ‘fast and professional’ does not answer ‘how long does building a website take?’ Provide a real timeframe if you can substantiate it, and explain what affects it: page count, copy and photography, functionality and design approvals. If you cannot give a reliable estimate, explain how the schedule is determined instead of inventing one.",
      "Question headings, step lists and clear tables can help readers find answers. This does not require turning every paragraph into an FAQ. Google decides when to show a featured snippet; a website owner cannot reserve that placement with a special tag.",
    ],
    blocks: [{ type: "linkList", title: "How featured answers are selected", items: [
      { label: "Google Search Central — Featured snippets and your website", href: "https://developers.google.com/search/docs/appearance/featured-snippets" },
    ] }],
  },
  {
    heading: "GEO: could your content serve as a source?",
    paragraphs: [
      "Generative systems compose an answer, so users do not necessarily choose a link first. Website owners therefore need to consider whether their pages are cited and whether AI descriptions of their business are accurate. A brand mention, a linked citation and a website visit are different outcomes.",
      "Our practical recommendation is to make content useful beyond its sales context. Explain how to choose a service, show real work and state the limits of your advice. A comparison should explain who each option suits. A case study should distinguish work completed from outcomes that were never measured.",
      "Named authors, verifiable sources and consistent business details help readers assess reliability. They do not establish that AI will select your website. Avoid invented statistics and mass-produced generic advice: these give the content little reason to be chosen over an existing source.",
    ],
    blocks: [{ type: "linkList", title: "Content quality and AI answers", items: [
      { label: "Microsoft — Optimizing Your Content for Inclusion in AI Search Answers", href: "https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers" },
      { label: "Google — Creating helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ] }],
  },
  {
    heading: "Does AI search require special files or schema?",
    paragraphs: [
      "For Google AI Overviews and AI Mode, Google states that there are no additional technical requirements or special schema markup. A page must be indexed and eligible to appear with a search snippet. A new AI text file is not a requirement for these features. This is guidance for Google Search, rather than a universal rule for every AI service.",
      "Structured data should describe the actual content of a page. It does not turn a weak page into a reliable source or guarantee citations. Before adding markup, check whether visitors can find pricing or its basis, a service description and contact information.",
    ],
    blocks: [{ type: "linkList", title: "Technical eligibility for Google AI features", items: [
      { label: "Google Search Central — AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
    ] }],
  },
  {
    heading: "What should you prioritize with a limited budget?",
    paragraphs: [
      "We recommend the following sequence. This is a practical allocation of effort, rather than a search engine requirement: address obstacles that affect both visitors and visibility first.",
    ],
    blocks: [{ type: "subsections", items: [
      { heading: "1. Check whether the essential pages do their job", paragraphs: ["Start with your homepage, core services and contact page. Check indexing, mobile usability, internal links and enquiry submission. If the form is broken or the offer is unclear, additional visibility will not solve the main problem."] },
      { heading: "2. Add information customers repeatedly ask for", paragraphs: ["Collect questions from real conversations: what pricing includes, what the customer must prepare, who maintains the website and how changes are agreed. Place answers alongside the relevant service, where they support a decision. This is a practical starting point for AEO."] },
      { heading: "3. Publish content with an original contribution", paragraphs: ["Choose a question you know from your work. Show a verifiable example, explain a decision and link to the relevant service. For a local business, check business profile accuracy too. Expand your content once existing pages clearly explain the offer."] },
    ] }],
  },
  {
    heading: "How can you measure success beyond AI mentions?",
    paragraphs: [
      "Separate visibility from business outcomes. An impression shows that a page appeared, a click that someone arrived, and a qualified enquiry that there is interest in working together. An AI citation does not establish that someone visited your website or became a customer.",
      "Bing Webmaster Tools offers an AI Performance report covering citations across supported AI experiences. It does not cover every AI platform, and citation counts are not answer rankings. Review citation data alongside visits and actual contacts.",
      "For your own monitoring, use a consistent set of real customer questions and record the date, platform, language, cited URL and answer accuracy. Treat this as a sample, rather than reliable market share: results can change with wording and conversation context.",
    ],
    blocks: [{ type: "linkList", title: "What Bing’s report measures", items: [
      { label: "Bing — Introducing AI Performance in Bing Webmaster Tools", href: "https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview" },
    ] }],
  },
  {
    heading: "Common questions about SEO, AEO and GEO",
    paragraphs: [],
    blocks: [{ type: "faq", items: [
      { question: "Does GEO replace SEO?", answer: "GEO adds a focus on generative answers. A business website still needs clear, technically accessible pages that address potential customers’ needs. A new acronym is no reason to neglect organic search." },
      { question: "Is an FAQ section enough for AEO?", answer: "FAQs can help when they answer real questions. Important answers should also appear within service content, with the necessary context. Adding questions for their own sake does not guarantee a featured answer." },
      { question: "Can anyone guarantee an AI citation?", answer: "That promise is not a reliable basis for hiring someone. Ask for a specific scope, sources behind recommendations and a measurement plan. Source selection remains under the platform’s control and can change." },
      { question: "Should you buy three separate packages?", answer: "Not automatically. Ask for a unified plan with clearly described technical, editorial and measurement tasks. Separate packages only make sense when each adds identifiable work and the same tasks are not charged multiple times." },
    ] }],
  },
  {
    heading: "What does your website need in 2026?",
    paragraphs: [
      "A business website needs clear answers to three questions: what do you offer, why should a customer trust you and how can they contact you? SEO, AEO and GEO help those answers reach people through different search experiences.",
      "If you are starting out, improve essential pages and enquiry measurement. If the website already works well, fill gaps in important answers and develop content with original examples. Choose the next step based on a real weakness in the website and your customers’ needs.",
    ],
    blocks: [{ type: "linkList", title: "Related guides", items: [
      { label: "How AI Overviews and ChatGPT are changing search", href: "/en/blog/ai-menja-google-pretragu-ai-overviews-chatgpt-ai-search/" },
      { label: "How to run a quick website audit", href: "/en/blog/kako-da-radite-brzi-audit-sajta/" },
    ] }],
  },
];

export const seoAeoGeo2026: Editorial = {
  image: "/blog/seo-aeo-geo-2026-cover.webp",
  heroBackground: {
    image: "/blog/hero/seo-aeo-geo-2026-bg.webp",
    width: 1920,
    height: 820,
    position: "center",
  },
  width: 1600,
  height: 1000,
  alt: {
    sr: "Poređenje tri prikaza: SEO lista rezultata, AEO izdvojeni odgovor i GEO odgovor sa označenim izvorima.",
    en: "Three formats compared: SEO search results, an AEO direct answer and a GEO answer with numbered sources.",
  },
  caption: {
    sr: "Tri načina prikaza informacija: lista rezultata, direktan odgovor i odgovor potkrepljen izvorima. Šematski prikaz, ne snimak određene platforme.",
    en: "Three ways to present information: search results, a direct answer and an answer supported by sources. A schematic illustration, rather than a screenshot of a specific platform.",
  },
  topic: { sr: "SEO, AEO i GEO", en: "SEO, AEO & GEO" },
  answer: {
    sr: "SEO poboljšava vidljivost u organskoj pretrazi, AEO stavlja fokus na jasne direktne odgovore, a GEO na korišćenje sadržaja i predstavljanje brenda u generativnim AI odgovorima. Za većinu poslovnih sajtova dobar početak je zajednički: tehnički dostupne stranice, konkretne informacije i proverljivi primeri. Ulaganja rasporedite prema stanju sajta i stvarnim upitima klijenata.",
    en: "SEO improves organic search visibility, AEO focuses on clear direct answers, and GEO on content use and brand representation in generative AI answers. Most business websites share the same starting point: technically accessible pages, specific information and verifiable examples. Prioritize investment according to your website’s condition and real customer enquiries.",
  },
  sections: { sr: sectionsSr, en: sectionsEn },
  sources: [
    { label: "Google Search Central — SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    { label: "Google Search Central — Featured snippets and your website", href: "https://developers.google.com/search/docs/appearance/featured-snippets" },
    { label: "Google Search Central — AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
    { label: "Google Search Central — Creating helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    { label: "Microsoft — Optimizing Your Content for Inclusion in AI Search Answers", href: "https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers" },
    { label: "Bing — Introducing AI Performance in Bing Webmaster Tools", href: "https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview" },
  ],
  cta: {
    sr: {
      title: "Šta prvo treba unaprediti na vašem sajtu?",
      description: "Pošaljite nam adresu sajta i opišite kakve upite želite da dobijate. Javite se NMark Designs timu da razgovaramo o narednim koracima za vaš poslovni sajt.",
      label: "Razgovarajmo o vašem sajtu",
    },
    en: {
      title: "What should your website improve first?",
      description: "Send us your website address and describe the enquiries you want to receive. Contact NMark Designs to discuss the next steps for your business website.",
      label: "Let’s discuss your website",
    },
  },
};
