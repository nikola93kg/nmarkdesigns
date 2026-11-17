import type { Editorial } from "@/content/blog-editorial";
import type { BlogSection } from "@/content/blog";

const sectionsSr: readonly BlogSection[] = [
  {
    heading: "Pronaći firmu, navesti izvor i preporučiti uslugu nisu isto",
    paragraphs: [
      "Zamislite da potencijalni klijent pita AI asistenta kome da poveri izradu sajta, kupovinu opreme ili renoviranje prostora. Da li vaš biznis ulazi u odgovor? Ako ulazi, da li su usluga, lokacija i kontakt tačni? To su korisna pitanja, ali jedan odgovor nije ocena vašeg ukupnog prisustva na internetu.",
      "Za početak odvojite tri vrste rezultata. Tako ćete znati da li treba popraviti poslovne podatke, sadržaj koji objašnjava ponudu ili tehnički pristup sajtu.",
    ],
    blocks: [{ type: "cards", items: [
      { title: "Prepoznavanje", body: "Asistent zna koju firmu pominjete kada unesete njen naziv. To još ne pokazuje da vas pronalazi neko ko taj naziv ne zna." },
      { title: "Citiranje", body: "Odgovor sadrži link ka vašoj stranici kao izvoru. Proverite šta taj link zaista potkrepljuje; citat nije automatski preporuka usluge." },
      { title: "Preporuka", body: "Vaš biznis je ponuđen kao izbor za konkretnu potrebu. Važno je kome je preporučen, uz koje razloge i da li ti razlozi odgovaraju stvarnoj ponudi." },
    ] }],
  },
  {
    heading: "1. Pripremite pitanja kakva klijent stvarno postavlja",
    paragraphs: [
      "Otvorite novu konverzaciju u alatu koji želite da proverite. Ako postoji pretraga weba, uključite je i zabeležite da ste je koristili. Nemojte u prvi upit dodavati svoj URL, hvaliti firmu ili tražiti da baš nju preporuči. Time biste proveravali kako asistent prati instrukciju, a ne kako vas sam pronalazi.",
      "Upotrebite naziv usluge i područje rada koje zaista pokrivate. Lokacija korisnika, jezik, dostupnost pretrage i prethodna konverzacija mogu menjati odgovor. Zabeležite te uslove, pa kasnije ponovite ista pitanja u što sličnijem kontekstu. Za poređenje jezika napravite odvojene beleške.",
    ],
    blocks: [{ type: "table", caption: "Primeri pitanja za sopstvenu proveru — nisu rezultati testa određene firme", columns: ["Šta proveravate", "Primer pitanja", "Šta beležite"], rows: [
      ["Prepoznavanje naziva", "Čime se bavi [naziv firme] i gde mogu da proverim njene usluge?", "Da li je prepoznata prava firma i odakle potiču podaci"],
      ["Otkrivanje bez naziva", "Ko pruža [konkretnu uslugu] za [tip klijenta] u [području rada]?", "Da li se pojavljujete i uz koje alternative"],
      ["Poređenje izbora", "Kako da uporedim ponuđače za [potrebu], ako mi je važno [stvarno ograničenje]?", "Koji kriterijumi i izvori ulaze u odgovor"],
      ["Provera činjenice", "Gde mogu da proverim šta obuhvata [usluga ili paket] firme [naziv]?", "Da li odgovor vodi na aktuelnu i odgovarajuću stranicu"],
    ] }],
  },
  {
    heading: "2. Sačuvajte odgovor i otvorite njegove izvore",
    paragraphs: [
      "Nemojte beležiti samo da li se naziv firme pojavio. Otvorite citirane linkove. Da li vode na vaš domen, stari imenik, društveni profil ili firmu sličnog imena? Proverite uslugu, cenu ako je navedena, područje rada i kontakt. Posebno odvojite podatak koji piše u izvoru od zaključka koji je asistent sam izveo.",
      "Ako je podatak pogrešan, pronađite mesto koje možete da ispravite: svoju stranicu, poslovni profil ili zastarelu objavu. Dopisivanje sa asistentom u jednoj konverzaciji nije pouzdan način da trajno ispravite informacije za sve korisnike.",
      "Sledeća tabela je obrazac za beleške. Popunite po jedan red za svaki odgovor. Ponovite proveru više puta, uključujući drugi datum; jedan izostanak ili jedno pominjanje nisu stabilan rezultat.",
    ],
    blocks: [{ type: "table", caption: "Obrazac za beleženje — prazna polja popunjava čitalac", columns: ["Polje", "Šta sačuvati"], rows: [
      ["Datum i okruženje", "Datum, alat/verzija ako je prikazana, jezik, lokacija i da li je korišćena web pretraga"],
      ["Tačno pitanje", "Kopija upita i napomena da li je konverzacija bila nova"],
      ["Odgovor", "Kopija ili snimak odgovora, uz odvojeno pominjanje, citat i preporuku"],
      ["Izvor", "Tačan citirani URL i tvrdnja koju bi trebalo da potvrđuje"],
      ["Greška i sledeći korak", "Netačan ili nedostajući podatak, gde se menja i datum ponovne provere"],
    ] }],
  },
  {
    heading: "3. Ako vas nema, proverite da li je stranica dostupna",
    paragraphs: [
      "Počnite od stranice koja najbolje odgovara pitanju: konkretne usluge, proizvoda ili kontakta. Proverite da li se otvara bez prijave, radi na telefonu i daje sadržaj umesto greške. Zatim proverite indeksiranje i izabrani canonical u Search Console-u. Otvaranje stranice u svom pregledaču nije dokaz da joj pretraživački bot može pristupiti.",
      "Za Google proverite i Settings → Search generative AI u Search Console-u. Google navodi uključivanje u te funkcije kao uslov podobnosti; podešavanje može da se nasleđuje sa roditeljskog svojstva. Uključenost omogućava razmatranje sadržaja, ali ne obećava prikaz.",
      "Za ChatGPT Search proverite OAI-SearchBot i pristup kroz hosting ili CDN, uključujući objavljene IP opsege. Pravila za GPTBot, koji je povezan sa treniranjem, odvojena su od pristupa za pretragu. Ne menjajte robots.txt napamet niti isključujte bezbednosnu zaštitu celog sajta da biste rešili jednu blokadu.",
    ],
    blocks: [{ type: "linkList", title: "Zvanične tehničke provere", items: [
      { label: "Google: Search generative AI podešavanje", href: "https://support.google.com/webmasters/answer/16908024" },
      { label: "OpenAI: pretraživački i drugi botovi", href: "https://developers.openai.com/api/docs/bots" },
    ] }],
  },
  {
    heading: "4. Proverite šta sajt zaista govori o vašoj ponudi",
    paragraphs: [
      "Ako stranica kaže samo da nudite kvalitetna rešenja po meri, čitaocu ostaju ista pitanja kao i pre posete. Koju uslugu radite? Za koga? Šta ulazi u obim, a šta se posebno dogovara? Gde radite i kako neko može da vam pošalje smislen upit? Odgovore napišite tamo gde se usluga objašnjava, ne samo u dnu generičke FAQ liste.",
      "Koristan test je da izdvojite jedan pasus sa stranice i pročitate ga bez ostatka sajta. Da li je jasno na koju firmu, uslugu i uslove se odnosi? Ako nije, dodajte potreban kontekst. Nemojte povećavati broj ponavljanja ključnih reči da biste nadoknadili nejasnu ponudu.",
      "Primer iz naše strukture sadržaja je razlika između cenovnika i vodiča o troškovima. Cenovnik opisuje NMark pakete; vodič objašnjava kako obim utiče na budžet. Širi tržišni raspon ne treba da izgleda kao cena našeg paketa. Jasna granica pomaže i klijentu koji poredi ponude i sistemu koji iz teksta izdvaja podatak.",
      "Dodajte stvarne primere rada i objasnite šta ste uradili. Tehnologija, funkcija ili prikaz projekta mogu biti dokaz obima; rast prodaje ili SEO rezultat navodite tek kada imate podatke koji ih potvrđuju. Strukturirani podaci treba da opisuju ono što posetilac može da pročita.",
    ],
    blocks: [{ type: "linkList", title: "Primer jasnog razdvajanja ponude i saveta", items: [
      { label: "NMark cenovnik: aktuelni paketi i obim", href: "/sr/cenovnik/#packages" },
      { label: "Vodič: koliko košta izrada sajta i šta utiče na cenu", href: "/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
      { label: "Portfolio: konkretni projekti i opis urađenog", href: "/sr/portfolio/" },
    ] }],
  },
  {
    heading: "5. Koristite dostupne izveštaje, uz njihove granice",
    paragraphs: [
      "U Search Console-u Generative AI performance report prikazuje impresije za AI Overviews i AI Mode, sa pregledom stranica, zemalja, datuma i uređaja. To nije zaseban izveštaj o AI klikovima. Ako ga ne vidite, razlog može biti nedovoljno impresija. Google navodi globalnu dostupnost od 31. avgusta 2026.",
      "Bing Webmaster Tools nudi AI Performance i dodatne uvide u teme i citiranje na podržanim Microsoft AI površinama i odabranim partnerima. Ti podaci ne predstavljaju sve AI asistente niti procenat vašeg ukupnog tržišta.",
      "Aktuelni OpenAI Business Hub omogućava podobnim firmama da potvrde vlasništvo, uređuju podatke i pristupe uvidima o pominjanjima i klikovima posle potrebnih verifikacija. Dostupnost zavisi od lokacije i tipa firme. Poslovni agenti imaju zasebna ograničenja i trenutno su namenjeni podobnim online biznisima u SAD. Potvrda firme ne garantuje češće preporuke.",
      "U GA4 posmatrajte prepoznatljive AI referral izvore uz ulaznu stranicu i uspešno poslate upite. Odsustvo referral reda nije dokaz da vas AI nikada ne prikazuje. Ručne beleške, impresije, citati, posete i upiti odgovaraju na različita pitanja; nemojte ih sabrati u jednu proizvoljnu ocenu vidljivosti.",
    ],
    blocks: [{ type: "linkList", title: "Gde proveriti mogućnosti i ograničenja izveštaja", items: [
      { label: "Google: Generative AI performance report", href: "https://support.google.com/webmasters/answer/16984139" },
      { label: "Microsoft: AI Visibility Insights u Bing Webmaster Tools-u", href: "https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/" },
      { label: "OpenAI: Business Hub, podobnost i verifikacija", href: "https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt" },
    ] }],
  },
  {
    heading: "6. Hosting proverite kao deo dostupnosti sajta",
    paragraphs: [
      "Ako server vraća grešku, stranica traži prijavu ili zaštita blokira legitimno preuzimanje, ni dobro napisan opis usluge nije dovoljan. Proverite stabilnost, HTTPS, odgovore servera i pravila pristupa zajedno sa osobom koja održava sajt. Izbor provajdera treba da prati tehnologiju i potrebe projekta.",
      "NMark Designs je zvanični Hostinger partner. Ako vam pri izradi ili unapređenju sajta treba i hosting, možemo da razmotrimo odgovarajuću postavku. Za samostalan zakup dostupna je partnerska ponuda sa uslovima na našem cenovniku; tehničko održavanje dogovara se zasebno.",
      "Partnerstvo potvrđuje odnos sa provajderom. Ono samo po sebi ne znači bolju poziciju u pretrazi niti preporuku AI asistenta.",
    ],
    blocks: [{ type: "linkList", title: "Hosting i podrška prema potrebama projekta", items: [
      { label: "Hostinger partnerstvo — detalji i uslovi ponude", href: "/sr/cenovnik/#hostinger-partner" },
      { label: "Hosting i održavanje: šta obuhvata usluga", href: "/sr/usluge/odrzavanje-i-hosting/" },
    ] }],
  },
  {
    heading: "7. Pretvorite nalaze u mali plan popravki",
    paragraphs: [
      "Prvo sačuvajte početno stanje. Zatim izaberite problem koji možete konkretno da opišete i proverite: pogrešan broj telefona, nedostajući obim usluge, zastarelu cenu ili stranicu koja vraća grešku. Za svaki nalaz napišite URL, potrebnu izmenu i način provere.",
      "Tokom naredne nedelje možete završiti osnovnu proveru i prve ispravke. To nije rok u kojem AI sistemi moraju da preuzmu izmene. Ponovno preuzimanje stranica i izbor izvora zavise od platforme; pratite datume i uporedive rezultate umesto da menjate sve posle svakog odgovora.",
    ],
    blocks: [{ type: "checklist", items: [
      "Sačuvajte ista pitanja i početne odgovore, sa izvorima i uslovima testa.",
      "Otklonite greške u identitetu, kontaktu, dostupnosti i ključnim podacima o ponudi.",
      "Povežite relevantnu uslugu, obim/cenu, stvarni primer rada i kontakt.",
      "Proverite dostupne izveštaje i merite uspešno poslate upite odvojeno od poseta.",
      "Ponovite pitanja u sličnom kontekstu i beležite šta se promenilo, bez zaključka o uzroku na osnovu jednog odgovora.",
    ] }, { type: "linkList", title: "Za dublju proveru sajta", items: [
      { label: "SEO, brzina i AI integracije — obim naše usluge", href: "/sr/usluge/seo-i-optimizacija-brzine/" },
      { label: "SEO, AEO i GEO — razlike i prioriteti", href: "/sr/blog/seo-aeo-geo-razlike-2026/" },
    ] }],
  },
  {
    heading: "Česta pitanja o AI vidljivosti biznisa",
    paragraphs: [],
    blocks: [{ type: "faq", items: [
      { question: "AI zna naziv moje firme. Da li to znači da je preporučuje?", answer: "Ne može se izvesti taj zaključak. Posebno testirajte pitanje bez naziva firme, za konkretnu uslugu i potrebu. Proverite da li ste ponuđeni kao izbor i kojim izvorima je taj izbor potkrepljen." },
      { question: "Da li treba da promenim hosting da bi me AI pronašao?", answer: "Prvo utvrdite da li postoji problem dostupnosti, resursa ili pravila pristupa. Promena provajdera bez utvrđenog problema nije plan za AI vidljivost. Partnerstvo sa hosting provajderom takođe nije algoritamska preporuka vašeg biznisa." },
      { question: "Da li svaki AI citat donosi posetu ili klijenta?", answer: "Citat može biti prikazan bez klika, a poseta može proći bez upita. Zato zasebno pratite pojavljivanje izvora, dolaske na sajt i stvarno interesovanje kroz dogovorene kontakt kanale." },
      { question: "Može li neko da garantuje da će ChatGPT preporučivati moju firmu?", answer: "Tražite konkretan obim rada i način merenja. Možete ispraviti podatke, poboljšati sadržaj i pristup sajtu, ali odluka o izvorima i preporukama ostaje na platformi. Jedan uspešan snimak ekrana nije garancija budućih odgovora." },
    ] }],
  },
];

const sectionsEn: readonly BlogSection[] = [
  {
    heading: "Finding a business, citing a source and recommending a service are different outcomes",
    paragraphs: [
      "Imagine a potential customer asking an AI assistant who can build a website, supply equipment or renovate a space. Does your business appear? If it does, are the service, location and contact details correct? These are useful questions, but one response cannot score your entire online presence.",
      "Separate three outcomes before making changes. This helps you decide whether the problem concerns business information, content explaining your offer or technical access to the website.",
    ],
    blocks: [{ type: "cards", items: [
      { title: "Recognition", body: "The assistant identifies the right business when you give it the name. This does not show whether customers who do not know that name can discover you." },
      { title: "Citation", body: "The answer links to one of your pages as a source. Check what that link actually supports; being cited is not automatically a service recommendation." },
      { title: "Recommendation", body: "Your business is offered as a choice for a particular need. Check the customer's context, the reasons given and whether those reasons match your actual services." },
    ] }],
  },
  {
    heading: "1. Prepare questions a customer would actually ask",
    paragraphs: [
      "Start a new conversation in the tool you want to check. If web search is available, enable it and record that choice. Do not add your URL, praise your business or ask the assistant to recommend it in the first question. That would test instruction following rather than independent discovery.",
      "Use the specific service and area you really cover. User location, language, search availability and conversation history can change an answer. Record these conditions so you can repeat the same questions in a similar context. Keep separate notes when comparing languages.",
    ],
    blocks: [{ type: "table", caption: "Example questions for your own review, not test results for a particular company", columns: ["What to check", "Example question", "What to record"], rows: [
      ["Name recognition", "What does [business name] do, and where can I check its services?", "Whether the right business is identified and where the facts come from"],
      ["Discovery without a name", "Who provides [specific service] for [customer type] in [service area]?", "Whether you appear and which alternatives are offered"],
      ["Comparing options", "How should I compare providers for [need] if [real constraint] matters?", "The criteria and sources used in the answer"],
      ["Fact checking", "Where can I verify what [business name]'s [service or package] includes?", "Whether the answer leads to a relevant, current page"],
    ] }],
  },
  {
    heading: "2. Save the answer and open its sources",
    paragraphs: [
      "Record more than whether your name appeared. Open the cited links. Do they lead to your domain, an old directory, a social profile or a different business with a similar name? Check the service, price if quoted, service area and contact details. Distinguish information actually present in a source from an inference made by the assistant.",
      "When a fact is wrong, find the place you can correct: your page, a business profile or an outdated post. Correcting an assistant inside one conversation is not a reliable way to update information permanently for everyone.",
      "Use the following template for your notes, with one record per answer. Repeat the check several times, including on another date. One appearance or absence is not a stable result.",
    ],
    blocks: [{ type: "table", caption: "A recording template for readers to complete", columns: ["Field", "What to save"], rows: [
      ["Date and context", "Date, tool/version if shown, language, location and whether web search was enabled"],
      ["Exact question", "The original wording and whether this was a new conversation"],
      ["Answer", "A copy or screenshot, recording mentions, citations and recommendations separately"],
      ["Source", "The exact cited URL and the claim it should support"],
      ["Issue and next step", "The incorrect or missing fact, where it can be changed and the date to review it again"],
    ] }],
  },
  {
    heading: "3. If you are missing, check whether the relevant page is accessible",
    paragraphs: [
      "Start with the page that best answers the question: a specific service, product or contact page. Check that it opens without a login, works on mobile and delivers content instead of an error. Then inspect indexing and the selected canonical in Search Console. Opening a page in your browser does not prove that a search crawler can access it.",
      "For Google, also check Settings → Search generative AI in Search Console. Google lists inclusion in these features as an eligibility condition; a property can inherit its setting from a parent. Inclusion makes content eligible for consideration, rather than promising an appearance.",
      "For ChatGPT Search, check OAI-SearchBot access through your hosting and CDN, including the published IP ranges. GPTBot rules related to training are separate from search access. Do not change robots.txt blindly or disable security across the entire website to solve one blocked request.",
    ],
    blocks: [{ type: "linkList", title: "Official technical checks", items: [
      { label: "Google: Search generative AI control", href: "https://support.google.com/webmasters/answer/16908024" },
      { label: "OpenAI: search and other crawlers", href: "https://developers.openai.com/api/docs/bots" },
    ] }],
  },
  {
    heading: "4. Review what the website actually says about your offer",
    paragraphs: [
      "A page promising quality solutions tailored to your needs leaves most buying questions unanswered. What service do you provide, and for whom? What is included, and what is quoted separately? Where do you work, and how can someone send a useful enquiry? Put these answers where the service is explained, rather than only in a generic FAQ at the bottom.",
      "Take one paragraph out of its page and read it on its own. Is it clear which business, service and conditions it refers to? If not, supply the missing context. Repeating more keywords will not repair an unclear offer.",
      "Our content structure offers a practical example: a price list and a budgeting guide have different roles. The price list explains NMark packages; the guide discusses how scope affects cost. A wider market range should not look like the price of one of our packages. A clear boundary helps both customers comparing proposals and systems extracting a fact from the text.",
      "Add real work and explain what you delivered. Technology, a feature or a project view can establish scope; claims about sales growth or SEO results need supporting measurements. Structured data should describe information visitors can actually read.",
    ],
    blocks: [{ type: "linkList", title: "An example of separating offers from advice", items: [
      { label: "NMark pricing: current packages and scope", href: "/en/pricing/#packages" },
      { label: "Guide: website costs and what changes a quote", href: "/en/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
      { label: "Portfolio: real projects and work delivered", href: "/en/portfolio/" },
    ] }],
  },
  {
    heading: "5. Use the available reports within their limits",
    paragraphs: [
      "Search Console's Generative AI performance report shows impressions for AI Overviews and AI Mode, grouped by page, country, date and device. It is not a separate AI click report. Insufficient impressions can explain why it is absent. Google states that these insights became globally available on August 31, 2026.",
      "Bing Webmaster Tools offers AI Performance and additional topic and citation insights across supported Microsoft AI experiences and selected partners. These figures do not cover every assistant or represent your overall market share.",
      "OpenAI's current Business Hub lets eligible businesses claim ownership, manage details and access mention and click insights after required verification. Availability depends on location and business type. Business agents have separate restrictions and currently serve eligible online businesses in the US. Claiming a business does not guarantee more recommendations.",
      "In GA4, review identifiable AI referrals alongside landing pages and successfully submitted enquiries. An absent referral row does not prove that AI never shows your business. Manual observations, impressions, citations, visits and enquiries answer different questions; do not combine them into an arbitrary visibility score.",
    ],
    blocks: [{ type: "linkList", title: "Check report capabilities and limits", items: [
      { label: "Google: Generative AI performance report", href: "https://support.google.com/webmasters/answer/16984139" },
      { label: "Microsoft: AI Visibility Insights in Bing Webmaster Tools", href: "https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/" },
      { label: "OpenAI: Business Hub eligibility and verification", href: "https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt" },
    ] }],
  },
  {
    heading: "6. Review hosting as part of website availability",
    paragraphs: [
      "A strong service description cannot compensate for a server error, a login barrier or protection that blocks legitimate retrieval. Review stability, HTTPS, server responses and access rules with whoever maintains the website. Choose a provider around the project's technology and resource needs.",
      "NMark Designs is an official Hostinger partner. If your website project also needs hosting, we can consider a suitable setup. A partner offer for independently purchased hosting is available through our pricing page, with its terms explained there. Technical maintenance is agreed separately.",
      "The partnership confirms a relationship with the provider. It does not itself establish a better search position or an AI assistant's recommendation.",
    ],
    blocks: [{ type: "linkList", title: "Hosting and support for your project", items: [
      { label: "Hostinger partnership: offer details and terms", href: "/en/pricing/#hostinger-partner" },
      { label: "Hosting and maintenance: service scope", href: "/en/services/website-maintenance/" },
    ] }],
  },
  {
    heading: "7. Turn observations into a small repair plan",
    paragraphs: [
      "Save a baseline first. Then choose an issue you can describe and verify: a wrong phone number, missing service scope, outdated price or page returning an error. Record its URL, the required change and how to check the result.",
      "Over the next week you can complete the initial review and first repairs. That is not a deadline for AI systems to pick up your changes. Recrawling and source selection depend on the platform; compare dated, similar observations rather than changing everything after each answer.",
    ],
    blocks: [{ type: "checklist", items: [
      "Save the same questions and baseline answers, with sources and testing conditions.",
      "Correct identity, contact, availability and essential service information first.",
      "Connect the relevant service, scope/pricing, real work and contact page.",
      "Review available reports and measure successful enquiries separately from visits.",
      "Repeat questions in a similar context and record changes without attributing causality from a single answer.",
    ] }, { type: "linkList", title: "For a deeper website review", items: [
      { label: "SEO, speed and AI integrations: our service scope", href: "/en/services/seo-and-speed-optimization/" },
      { label: "SEO, AEO and GEO: differences and priorities", href: "/en/blog/seo-aeo-geo-razlike-2026/" },
    ] }],
  },
  {
    heading: "Common questions about business visibility in AI",
    paragraphs: [],
    blocks: [{ type: "faq", items: [
      { question: "AI recognizes my business name. Does that mean it recommends us?", answer: "You cannot infer a recommendation from recognition. Test a question without the name, for a specific service and need. Check whether your business is offered as an option and which sources support that choice." },
      { question: "Should I switch hosting so AI can find my business?", answer: "First establish whether there is an availability, resource or access-rule problem. Switching providers without identifying a problem is not an AI visibility plan. A hosting partnership is not an algorithmic endorsement of your business either." },
      { question: "Does every AI citation bring a visit or customer?", answer: "A citation may appear without a click, and a visit may produce no enquiry. Measure source appearances, website visits and actual interest through your agreed contact channels separately." },
      { question: "Can someone guarantee that ChatGPT will recommend my business?", answer: "Ask for a concrete scope and measurement plan. You can correct information, improve content and make the site accessible, but platforms choose their own sources and recommendations. One successful screenshot does not guarantee future answers." },
    ] }],
  },
];

export const aiBusinessCheck2026 = {
  image: "/blog/ai-business-check-2026-cover.webp",
  heroBackground: { image: "/blog/ai-business-check-2026-cover.webp", width: 1600, height: 1000, position: "65% center" },
  width: 1600,
  height: 1000,
  alt: {
    sr: "Šematski prikaz provere AI odgovora: pitanje, poslovna stranica kao izvor i beleška o nalazu.",
    en: "A schematic AI answer review: a question, a business page as a source and a recorded observation.",
  },
  caption: {
    sr: "Provera povezuje pitanje, izvor i zabeležen nalaz. Ilustracija postupka, ne snimak određenog AI alata ili rezultat testa.",
    en: "A review connects the question, source and recorded finding. A process illustration, not a screenshot of an AI tool or a test result.",
  },
  topic: { sr: "AI vidljivost biznisa", en: "Business visibility in AI" },
  answer: {
    sr: "AI može da pronađe, pomene ili preporuči vaš biznis, ali to su različiti ishodi. Proverite pitanja sa nazivom firme i bez njega, otvorite citirane izvore i uporedite podatke sa stvarnom ponudom. Sačuvajte datum i uslove testa, ispravite konkretne prepreke i ponovite proveru. Jedan odgovor nije dokaz ukupne vidljivosti, a dobar hosting i partnerski bedž ne garantuju preporuku.",
    en: "AI can find, mention or recommend your business, but these are different outcomes. Test questions with and without the business name, open cited sources and compare their facts with your actual offer. Record the date and testing conditions, fix specific obstacles and repeat the review. One answer cannot establish overall visibility, and good hosting or a partner badge cannot guarantee a recommendation.",
  },
  sections: { sr: sectionsSr, en: sectionsEn },
  sources: [
    { label: "Google Search Central — Optimizing for generative AI features", href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
    { label: "Google — Search generative AI control", href: "https://support.google.com/webmasters/answer/16908024" },
    { label: "Google — Generative AI performance report (Search)", href: "https://support.google.com/webmasters/answer/16984139" },
    { label: "OpenAI — crawlers", href: "https://developers.openai.com/api/docs/bots" },
    { label: "OpenAI — Setting up your business on ChatGPT", href: "https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt" },
    { label: "Microsoft Bing — AI Visibility Insights", href: "https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/" },
  ],
  cta: {
    sr: { title: "Šta AI i pretraživači mogu da pročitaju o vašem biznisu?", description: "Pošaljite URL i opišite uslugu za koju želite da vas klijenti pronalaze. Dogovorićemo obim provere tehničke dostupnosti, sadržaja i puta do upita, pa izdvojiti konkretne prioritete.", label: "Zatražite analizu sajta", secondaryLabel: "Pogledajte obim i cene", secondaryHref: "/sr/cenovnik/#additional-services" },
    en: { title: "What can AI and search engines read about your business?", description: "Send your URL and the service you want customers to find. We can agree a review of technical access, content and the enquiry journey, then identify specific priorities.", label: "Request a website review", secondaryLabel: "View scope and pricing", secondaryHref: "/en/pricing/#additional-services" },
  },
} satisfies Editorial;
