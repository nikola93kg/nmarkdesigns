import type { BlogSection } from "@/content/blog";
import type { Editorial } from "@/content/blog-editorial";

const sectionsSr: readonly BlogSection[] = [
  {
    heading: "Šta je AI chatbot za sajt i kome zapravo pomaže?",
    paragraphs: [
      "Posetilac otvori sajt uveče, pronađe proizvod koji mu deluje zanimljivo i pita: „Imate li nešto slično, ali uže od 90 centimetara?“ Kontakt forma može da sačuva pitanje za sutra. Dobro povezan AI asistent može odmah da proveri katalog, ponudi odgovarajuće artikle i pomogne posetiocu da pošalje konkretan upit.",
      "AI chatbot za sajt je interfejs za razgovor koji koristi jezički model i podatke vašeg poslovanja da odgovori na pitanja. U zavisnosti od integracije, može i da pretražuje proizvode ili prosledi zahtev timu. Sam model ne poznaje automatski vaše cene, dostupnost i pravila: te informacije moraju da mu budu dostupne iz pouzdanog izvora.",
      "Zato u 2026. nije dovoljno pitati da li chatbot zvuči prirodno. Za poslovni sajt važnije je da li daje proverljiv odgovor, skraćuje put do proizvoda i zna kada treba da uključi čoveka.",
    ],
  },
  {
    heading: "Običan FAQ bot i AI asistent: koja je razlika?",
    paragraphs: [
      "FAQ bot obično vodi posetioca kroz dugmad, ključne reči i unapred definisane odgovore. To može biti sasvim dovoljno za radno vreme, lokaciju i nekoliko čestih pitanja. Jednostavan tok ima prednost kada želite potpunu kontrolu nad svakom rečenicom.",
      "AI asistent može da obradi pitanje napisano slobodnim jezikom i koristi kontekst razgovora. Ipak, generisanje odgovora, pretraga poslovnih podataka i izvršavanje radnje tri su različite mogućnosti. Bot koji čita FAQ nije samim tim povezan sa stanjem magacina ili CRM-om.",
    ],
    blocks: [{
      type: "table",
      caption: "Mogućnosti zavise od implementacije, a ne samo od oznake „AI“.",
      columns: ["Mogućnost", "FAQ bot sa pravilima", "AI asistent sa integracijama"],
      rows: [
        ["Način razgovora", "Dugmad i unapred definisani tokovi", "Slobodna pitanja i potpitanja"],
        ["Izvor odgovora", "Ručno napisani odgovori", "Odobreni sadržaj i povezani poslovni podaci"],
        ["Pretraga kataloga", "Unapred podešeni linkovi i filteri", "Pretraga prema potrebama opisanim u razgovoru"],
        ["Prikupljanje upita", "Fiksna forma ili zadati tok", "Kontekst razgovora i strukturiran zahtev"],
        ["Održavanje", "Izmene pravila i odgovora", "Ažuriranje izvora, provera odgovora i integracija"],
      ],
    }],
  },
  {
    heading: "Šta chatbot za web sajt može da radi?",
    paragraphs: [
      "Najkorisnije funkcije polaze od pitanja koja kupci već postavljaju. Chatbot za web sajt nema veću vrednost zato što može da priča o svemu, već zato što može da pomogne oko vašeg konkretnog proizvoda ili usluge.",
    ],
    blocks: [{
      type: "subsections",
      items: [
        {
          heading: "Odgovara na pitanja iz vaših izvora",
          paragraphs: ["Uslovi isporuke, postupak saradnje, opis usluge i dokumentacija mogu da posluže kao osnova za odgovore. Često se relevantan deo sadržaja prvo pronađe, pa se modelu prosledi kao kontekst. To se često naziva RAG: pretraga izvora pre sastavljanja odgovora. Ne znači da je model trajno naučio sve o vašoj firmi niti da više ne može da pogreši."],
        },
        {
          heading: "Pretražuje katalog i sužava izbor",
          paragraphs: ["Kupac može da opiše namenu, dimenzije ili budžet, a asistent da zatraži rezultate iz kataloga i prikaže odgovarajuće proizvode. Za aktuelne cene i dostupnost potrebna je veza sa ažurnim katalogom. PDF učitan pre nekoliko meseci nije potvrda današnjeg stanja zaliha."],
        },
        {
          heading: "Prikuplja upite koje prodaja može da obradi",
          paragraphs: ["Uz dogovorena polja i povezivanje sa emailom ili CRM-om, asistent može da zatraži kontakt, proizvod koji kupca zanima i potrebnu količinu. Tim dobija smislen sažetak umesto poruke „Zanima me ponuda“. Potrebno je proveriti uspešno slanje; odgovor „Poslato“ ne sme da se prikaže samo zato što ga je model napisao."],
        },
        {
          heading: "Usmerava razgovor ka čoveku",
          paragraphs: ["Kada pitanje nema pokriće u izvorima ili zahteva individualnu ponudu, asistent treba da ponudi kontakt ili predaju timu. Odgovaranje van radnog vremena ne znači da će i zaposleni tada preuzeti razgovor. Posetilac treba da razume šta se dešava dalje."],
        },
      ],
    }],
  },
  {
    heading: "Kolika je cena AI chatbota u 2026?",
    paragraphs: [
      "Cena AI chatbota ima najmanje dva dela: početno postavljanje i redovne troškove rada. NMark Designs integraciju AI chatbota nudi od 350 €. Osnovni obim obuhvata asistenta sa informacijama o poslovanju, FAQ odgovorima i usmeravanjem ka kontakt formi. Mesečna API potrošnja i eksterni servisi plaćaju se zasebno.",
      "Pretraga kataloga u realnom vremenu, više povezanih sistema i složena obrada upita traže zasebnu procenu. Početna cena nije obećanje da svaka prodajna automatizacija staje u isti budžet.",
      "Gotove platforme imaju drugačiji obračun. Sledeći primeri provereni su 20. oktobra 2026. i služe za poređenje modela naplate. Iznosi su u originalnim valutama; konačan račun zavisi od važećih uslova, poreza i izabranih dodataka.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Početna integracija i pretplate nisu isti trošak i ne pokrivaju isti obim.",
        columns: ["Primer", "Objavljena cena", "Šta proveriti"],
        rows: [
          ["NMark Designs integracija", "Od 350 € za početnu implementaciju", "Dogovoreni obim; API i eksterni servisi odvojeno"],
          ["Chatbase Hobby", "32 USD mesečno uz godišnju naplatu", "700 kredita za poruke mesečno; krediti nisu broj celih razgovora"],
          ["Intercom Fin", "Od 0,99 USD po obračunatom ishodu", "Definicija ishoda, minimalna potrošnja i eventualne licence za tim"],
        ],
      },
      {
        type: "linkList",
        title: "Izvori cena i uslovi obračuna",
        items: [
          { label: "NMark Designs — integracija AI chatbota", href: "/sr/cenovnik/#svc-ai-chatbot" },
          { label: "Chatbase — aktuelni planovi", href: "https://www.chatbase.co/pricing" },
          { label: "Intercom — Fin naplata i definicija ishoda", href: "https://www.intercom.com/pricing" },
        ],
      },
    ],
  },
  {
    heading: "Od čega zavise mesečni troškovi?",
    paragraphs: [
      "Broj poseta nije dovoljan za procenu računa. Važno je koliko ljudi započinje razgovor, koliko poruka razmenjuju, koji model se koristi i koliko podataka sistem obrađuje. Kod platformi proverite da li plaćate po poruci, kreditu, razgovoru ili definisanom ishodu. Te jedinice nisu međusobno zamenljive.",
      "U ponudi razdvojite potrošnju modela ili pretplatu, hosting, pretragu baze znanja, email ili CRM servise i održavanje. Neće svako rešenje imati sve ove stavke. Bitno je da znate koje već pokriva pretplata, a koje dolaze dodatno.",
      "Tražite procenu za uobičajen i za prometniji mesec, uz limit potrošnje i ponašanje nakon dostizanja limita. U budžet uračunajte i vreme osobe koja proverava odgovore i ažurira informacije. Jeftina poruka nema poslovnu vrednost ako neko posle nje mora da ispravlja pogrešnu cenu.",
    ],
  },
  {
    heading: "Primer iz prakse: AI asistent na sajtu Cool Fridge Guys",
    paragraphs: [
      "Na projektu Cool Fridge Guys u NMark Designs portfoliju, AI asistent je povezan sa Squarespace katalogom komercijalne rashladne opreme. U toku razgovora pretražuje inventar i prikazuje odgovarajuće proizvode sa slikama, cenama i specifikacijama.",
      "Kada posetilac zatraži ponudu ili ostavi kontakt, sistem može da prosledi strukturiran upit prodajnom timu putem Resend servisa. Za česta pitanja o radnom vremenu, lokaciji i kontaktu koriste se pripremljeni odgovori bez pozivanja jezičkog modela.",
      "Ovaj primer pokazuje zašto FAQ odgovori i AI pretraga mogu da rade zajedno. Jednostavno pitanje ne mora da troši model, dok opis složenije potrebe može da pokrene pretragu. To je opis implementiranih funkcija, bez tvrdnje o izmerenom rastu prodaje ili povraćaju ulaganja.",
    ],
    blocks: [{
      type: "linkList",
      title: "Pogledajte konkretan projekat",
      items: [{ label: "Cool Fridge Guys — katalog i AI asistent za prodaju", href: "/sr/portfolio/coolfridgeguys/" }],
    }],
  },
  {
    heading: "Da li se AI chatbot isplati? Računica pre kupovine",
    paragraphs: [
      "Isplativost počinje od obima posla koji chatbot zaista preuzima. Broj otvorenih razgovora nije isto što i broj korisno rešenih pitanja. Vrednost može da bude u ušteđenom vremenu, boljem upitu za prodaju ili pomoći kupcu da pronađe proizvod, ali svaku od tih stvari treba zasebno pratiti.",
      "Ilustrativan primer, koji nije rezultat klijenta niti ponuda: pretpostavimo da asistent mesečno ispravno reši 200 pitanja koja bi inače zahtevala po tri minuta rada. To je 10 sati. Ako sat rada za računicu vrednujete sa 12 €, vrednost oslobođenog vremena je 120 €. Uz ukupne redovne troškove od 60 € ostaje 60 € mesečne koristi pre dodatnog vremena za proveru i održavanje.",
      "Ako bi postavljanje u tom zamišljenom primeru koštalo 600 €, jednostavan povraćaj bio bi oko 10 meseci. Ako zaposleni troše dodatno vreme na provere ili bot ne reši toliko pitanja, povraćaj je sporiji. Oslobođeno vreme takođe nije automatski manji novčani rashod: zavisi od toga kako ga tim koristi.",
    ],
    blocks: [{
      type: "verdict",
      title: "Praktičan kriterijum",
      statement: "Mesečna korist = vrednost stvarno ušteđenog vremena + doprinos dodatnih prodaja − svi redovni troškovi.",
      note: "Za prodaju računajte doprinos nakon troškova, a ne ceo prihod. Ne pripisujte chatbotu svaki upit ili kupovinu; uporedite sa prethodnim periodom ili kontrolnom grupom i izbegnite dvostruko brojanje koristi.",
    }],
  },
  {
    heading: "Kada ima smisla, a kada je bolja jednostavnija opcija?",
    paragraphs: [
      "AI asistent ima dobar razlog da postoji kada se ponavlja mnogo pitanja, ponuda je dovoljno složena da kupcima treba pomoć i imate pouzdane izvore za odgovore. Katalog sa mnogo sličnih artikala ili prodaja koja stalno traži iste početne podatke dobri su kandidati za ograničen pilot.",
      "Ako dobijate nekoliko pitanja mesečno i sva mogu da stanu na preglednu FAQ stranicu, počnite od nje. Ako posetioci ne razumeju ponudu, prvo popravite sadržaj i navigaciju. Chatbot ne treba da bude uslov da se na sajtu pronađu cena, kontakt ili opis usluge.",
      "Za mali broj kvalitetnih upita kontakt forma može biti efikasnija i jeftinija. Za kompleksne pregovore i izuzetke važniji je jasan put do odgovorne osobe nego pokušaj da AI samostalno završi svaki razgovor.",
    ],
  },
  {
    heading: "Šta AI asistent ne bi trebalo da obećava?",
    paragraphs: [
      "Tečan odgovor nije dokaz da je podatak tačan. Asistent može da pogreši i kada koristi vaše izvore. Zato mora da ima jasne granice: bez izmišljanja zaliha, popusta, uslova garancije ili rokova koji nisu potvrđeni. Kada nema podatak, prihvatljiv odgovor je da to kaže i ponudi kontakt.",
      "Za slanje upita i druge radnje potrebna je provera u sistemu koji ih izvršava. Cenama, dozvolama i obaveznoj validaciji mesto je u aplikaciji, a ne samo u tekstualnom uputstvu modelu. Ako katalog nije dostupan, asistent treba da objasni ograničenje umesto da nastavi sa pretpostavkama.",
      "Posetiocu jasno označite da razgovara sa AI asistentom. Za običan upit tražite samo neophodne kontakt podatke, objasnite čemu služe i nemojte tražiti kartične podatke ili lozinke u razgovoru. Pre puštanja proverite gde se razgovori čuvaju, ko im pristupa i koliko dugo su vam potrebni.",
    ],
  },
  {
    heading: "Kako izgleda dobra integracija chatbota na sajt?",
    paragraphs: [
      "Počnite jednim zadatkom koji može da se proveri: odgovori na pitanja o usluzi i usmeri posetioca ka upitu, ili pronađi proizvod iz kataloga. Tek kada taj tok radi pouzdano, dodajte nove izvore i radnje. Gotova platforma može da ubrza početak; prilagođeno rešenje ima smisla kada su specifični katalog, pravila ili način obrade upita.",
    ],
    blocks: [{
      type: "checklist",
      items: [
        "Prikupite stvarna česta pitanja i odobrite izvore odgovora.",
        "Odredite šta bot sme da radi i kada predaje razgovor čoveku.",
        "Testirajte srpski i engleski, latinicu i ćirilicu ako ih publika koristi.",
        "Proverite nepostojeći proizvod, zastarelu cenu, nedostupan katalog i neuspešno slanje upita.",
        "Proverite rad na telefonu, tastaturu i da prozor ne prekriva kontakt ili važna dugmad.",
        "Podesite ograničenje potrošnje, zaštitu od prekomernih zahteva i rezervni kontakt put.",
        "Dogovorite ko ažurira podatke i pregleda pogrešne ili nerešene odgovore.",
        "U pilotu pratite tačnost, korisno rešena pitanja, kvalitet upita i stvaran mesečni trošak.",
      ],
    }],
  },
  {
    heading: "Česta pitanja o AI chatbotovima za sajt",
    paragraphs: ["Pre odluke razjasnite i šta ulazi u cenu i šta asistent može da proveri u vašim sistemima."],
    blocks: [{
      type: "faq",
      items: [
        { question: "Koliko košta AI chatbot za sajt?", answer: "NMark Designs početnu integraciju nudi od 350 €, dok se API potrošnja i eksterni servisi plaćaju odvojeno. Katalog, CRM i napredna automatizacija procenjuju se prema obimu. Kod gotovih platformi posebno proverite pretplatu, limite i dodatke." },
        { question: "Da li postoji besplatan chatbot za web sajt?", answer: "Pojedine platforme nude probne ili ograničene besplatne planove. Proverite rok trajanja, broj poruka, dozvoljene funkcije i ponašanje kada se limit potroši. Besplatno testiranje ne znači da su integracija, održavanje i buduća potrošnja besplatni." },
        { question: "Može li AI chatbot da radi na srpskom jeziku?", answer: "Može, uz izbor odgovarajućeg modela i proverene izvore. Pre objave testirajte poslovne termine, latinicu, ćirilicu i konkretna pitanja kupaca. Podrška jeziku sama po sebi nije potvrda tačnosti odgovora." },
        { question: "Može li da prikazuje aktuelne cene i proizvode?", answer: "Može ako je povezan sa ažurnim katalogom ili odgovarajućim API-jem. Sam pristup opisu proizvoda ili starom PDF-u ne obezbeđuje današnju cenu i dostupnost. Potrebno je definisati i šta prikazuje kada izvor nije dostupan." },
        { question: "Da li chatbot radi na WordPress sajtu?", answer: "Može se dodati kroz podržan dodatak, ugrađenu skriptu ili prilagođenu integraciju. Pre izbora proverite kompatibilnost, performanse i mogućnost povezivanja sa vašim podacima. Obim posla zavisi od postojećeg sajta i traženih funkcija." },
        { question: "Da li AI chatbot poboljšava SEO i zamenjuje podršku?", answer: "Samo dodavanje chatbota nije garancija boljeg Google rangiranja. Važan sadržaj treba da ostane dostupan na stranicama. Asistent može da rastereti podršku, ali za nejasna pitanja, reklamacije i individualne dogovore i dalje treba obezbediti kontakt sa čovekom." },
      ],
    }],
  },
  {
    heading: "Prvi korak: definišite posao koji chatbot treba da obavi",
    paragraphs: [
      "Dobar AI chatbot za sajt ima jasnu ulogu, pouzdane podatke i merljiv trošak. Nekome će biti dovoljan FAQ i kontakt forma. Drugome će vrednost doneti asistent koji pretražuje katalog i priprema prodaji konkretan zahtev. Izbor počinje od tog zadatka, a ne od imena modela.",
      "Ako razmatrate integraciju, pošaljite URL sajta, nekoliko tipičnih pitanja, okviran mesečni broj upita i informaciju gde se nalaze vaši podaci. To je dovoljno za početni razgovor o obimu, ograničenjima i tome da li jednostavnije rešenje već rešava problem.",
    ],
    blocks: [{
      type: "linkList",
      title: "Planiranje sledećeg koraka",
      items: [
        { label: "Integracija AI chatbota — početna cena i obim", href: "/sr/cenovnik/#svc-ai-chatbot" },
        { label: "Pošaljite upit za AI chatbot", href: "/sr/kontakt/?service=ai-chatbot" },
        { label: "Koliko košta izrada web sajta u Srbiji u 2026?", href: "/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
      ],
    }],
  },
];

const sectionsEn: readonly BlogSection[] = [
  {
    heading: "What is a website AI chatbot, and who does it help?",
    paragraphs: [
      "A visitor opens your website in the evening, finds a promising product, and asks: “Do you have something similar, but narrower than 90 centimetres?” A contact form can save that question for tomorrow. A connected AI assistant can check the catalog immediately, suggest matching items, and help the visitor send a specific enquiry.",
      "A website AI chatbot is a conversational interface that uses a language model and your business information to answer questions. Depending on its integrations, it can also search products or forward requests to your team. The model does not automatically know your prices, availability, or policies: reliable sources must provide that information.",
      "In 2026, sounding natural is only one consideration. For a business website, the more useful questions are whether the answer is verifiable, whether it helps visitors find products, and whether the assistant knows when a person needs to take over.",
    ],
  },
  {
    heading: "FAQ bot or AI assistant: what is the difference?",
    paragraphs: [
      "A rules-based FAQ bot usually offers buttons, keyword matching, and predefined replies. That can be enough for opening hours, directions, and a handful of common questions. A simple flow is useful when you need full control over every sentence.",
      "An AI assistant can interpret questions in natural language and use the conversation for context. However, generating a reply, retrieving business data, and taking an action are separate capabilities. Reading an FAQ does not automatically connect a bot to inventory or a CRM.",
    ],
    blocks: [{
      type: "table",
      caption: "Capabilities depend on implementation, rather than the “AI” label alone.",
      columns: ["Capability", "Rules-based FAQ bot", "AI assistant with integrations"],
      rows: [
        ["Conversation", "Buttons and predefined flows", "Free-form questions and follow-ups"],
        ["Answer sources", "Manually written replies", "Approved content and connected business data"],
        ["Catalog search", "Preset links and filters", "Search based on needs described in conversation"],
        ["Lead collection", "Fixed form or scripted flow", "Conversation context and a structured request"],
        ["Maintenance", "Updating rules and replies", "Updating sources and checking answers and integrations"],
      ],
    }],
  },
  {
    heading: "What can a chatbot do on your website?",
    paragraphs: ["Start with the questions your customers already ask. A website chatbot earns its value by helping with your specific products and services."],
    blocks: [{
      type: "subsections",
      items: [
        { heading: "Answer questions using your sources", paragraphs: ["Delivery policies, service descriptions, documentation, and your process can provide the basis for answers. A common approach first retrieves relevant passages, then supplies them to the model as context. This is often called RAG: retrieval before generating an answer. It does not mean the model permanently learns everything about your company or becomes incapable of mistakes."] },
        { heading: "Search a catalog and narrow the options", paragraphs: ["Customers can describe their intended use, dimensions, or budget. The assistant can request catalog results and display matching products. Current prices and availability require access to an up-to-date catalog. A PDF uploaded months ago does not establish what is in stock today."] },
        { heading: "Collect enquiries your sales team can use", paragraphs: ["With agreed fields and an email or CRM integration, the assistant can ask for contact details, product interest, and quantity. Your team receives a useful summary rather than “Please send an offer.” Delivery needs confirmation from the receiving system; a model writing “Sent” is not proof that anything was delivered."] },
        { heading: "Hand the conversation to a person", paragraphs: ["If sources do not cover a question or the visitor needs a custom quote, offer contact or a handoff. Answering outside business hours does not mean staff will take over immediately. Explain what happens next."] },
      ],
    }],
  },
  {
    heading: "How much does a website AI chatbot cost in 2026?",
    paragraphs: [
      "There are at least two costs: initial implementation and ongoing operation. NMark Designs offers AI chatbot integration from €350. The starting scope covers business information, FAQ answers, and directing visitors to a contact form. Model API usage and external services are billed separately.",
      "Live catalog search, multiple connected systems, and advanced enquiry handling require a separate scope estimate. The starting price does not mean every sales automation fits the same budget.",
      "Hosted platforms use different billing models. The examples below were checked on October 20, 2026, to illustrate those differences. Prices remain in their original currencies; applicable terms, taxes, and add-ons affect the final bill.",
    ],
    blocks: [
      {
        type: "table",
        caption: "Initial implementation and subscriptions cover different work and are separate costs.",
        columns: ["Example", "Published price", "What to check"],
        rows: [
          ["NMark Designs integration", "Initial implementation from €350", "Agreed scope; API usage and external services billed separately"],
          ["Chatbase Hobby", "$32 per month, billed annually", "700 message credits monthly; credits are not whole conversations"],
          ["Intercom Fin", "From $0.99 per billable outcome", "Outcome definition, minimum commitment, and any team seat costs"],
        ],
      },
      {
        type: "linkList",
        title: "Pricing sources and billing terms",
        items: [
          { label: "NMark Designs — AI chatbot integration", href: "/en/pricing/#svc-ai-chatbot" },
          { label: "Chatbase — current plans", href: "https://www.chatbase.co/pricing" },
          { label: "Intercom — Fin pricing and outcome definition", href: "https://www.intercom.com/pricing" },
        ],
      },
    ],
  },
  {
    heading: "What determines the monthly running cost?",
    paragraphs: [
      "Traffic alone cannot predict the bill. Consider how many visitors start conversations, how many messages they exchange, the model used, and the amount of data processed. With platforms, check whether the billing unit is a message, credit, conversation, or defined outcome. These units are not interchangeable.",
      "Separate model usage or subscription, hosting, knowledge retrieval, email or CRM services, and maintenance in the estimate. Not every solution needs every item. Identify which costs a subscription already covers and which are additional.",
      "Ask for a normal-month and a busy-month estimate, a spending cap, and an explanation of what happens at the limit. Include the time someone spends reviewing answers and updating information. A cheap response has little value if a person then has to correct an invented price.",
    ],
  },
  {
    heading: "A real example: the Cool Fridge Guys AI assistant",
    paragraphs: [
      "In the Cool Fridge Guys project in the NMark Designs portfolio, the AI assistant connects to a Squarespace catalog of commercial refrigeration equipment. During the conversation, it searches inventory and displays matching products with images, prices, and specifications.",
      "When a visitor requests a quote or leaves contact details, the system can forward a structured enquiry to the sales team through Resend. Prepared responses handle common questions about opening hours, location, and contact details without calling the language model.",
      "This illustrates how FAQ responses and AI search can work together. A simple question need not consume model usage, while a more detailed requirement can trigger a search. These are implemented features, without a claim of measured sales growth or return on investment.",
    ],
    blocks: [{ type: "linkList", title: "Explore the project", items: [{ label: "Cool Fridge Guys — catalog and AI sales assistant", href: "/en/portfolio/coolfridgeguys/" }] }],
  },
  {
    heading: "Is an AI chatbot worth it? Calculate before buying",
    paragraphs: [
      "Value starts with the work the chatbot actually takes over. Opened conversations are not the same as useful resolutions. Benefits can include saved time, better sales enquiries, or helping customers find products, but each needs its own measurement.",
      "This is an illustrative calculation, rather than a client result or a quote: suppose an assistant correctly resolves 200 questions each month that would otherwise take three minutes of staff time each. That frees 10 hours. Valuing that time at €12 per hour gives €120. With total recurring costs of €60, the monthly benefit is €60 before additional review and maintenance time.",
      "If setup cost €600 in that hypothetical example, simple payback would take about 10 months. More checking time or fewer useful resolutions would make payback slower. Freed time also does not automatically reduce cash expenses: it depends on how the team uses it.",
    ],
    blocks: [{
      type: "verdict",
      title: "A practical measure",
      statement: "Monthly benefit = value of time actually saved + contribution from additional sales − all recurring costs.",
      note: "For sales, use contribution after costs rather than total revenue. Do not credit every enquiry or purchase to the chatbot. Compare with a previous period or control group and avoid double-counting benefits.",
    }],
  },
  {
    heading: "When does it make sense, and when is a simpler option better?",
    paragraphs: [
      "An AI assistant has a clear purpose when questions repeat frequently, customers need help navigating a complex offer, and reliable answer sources exist. A catalog with many similar products or a sales team repeatedly collecting the same initial details can justify a focused pilot.",
      "If you receive a few questions each month and a clear FAQ page can answer all of them, start there. If visitors cannot understand your offer, improve the content and navigation first. Finding prices, contact details, or service information should not require a conversation with a bot.",
      "For a small number of valuable enquiries, a contact form may be more efficient and cheaper. Complex negotiations and exceptions need a clear route to the responsible person rather than an attempt to automate every conversation.",
    ],
  },
  {
    heading: "What should an AI assistant never promise?",
    paragraphs: [
      "A fluent answer does not prove that a fact is correct. Assistants can make mistakes even when using your sources. Set clear boundaries against inventing stock, discounts, warranty terms, or unconfirmed deadlines. When information is missing, saying so and offering contact is an acceptable response.",
      "Enquiry delivery and other actions need confirmation from the system that executes them. Prices, permissions, and mandatory validation belong in the application as well as any model instructions. If the catalog is unavailable, explain that limitation rather than guessing.",
      "Tell visitors they are speaking with an AI assistant. Request only the contact information needed for an enquiry, explain its purpose, and avoid collecting payment card details or passwords in chat. Before launch, check where conversations are stored, who can access them, and how long you need them.",
    ],
  },
  {
    heading: "What does a good chatbot integration involve?",
    paragraphs: ["Start with one verifiable task: answer service questions and guide visitors to an enquiry, or find a product in the catalog. Add sources and actions after that flow works reliably. A hosted platform can speed up the start; custom development can suit a specific catalog, business rules, or enquiry workflow."],
    blocks: [{
      type: "checklist",
      items: [
        "Collect real customer questions and approve the answer sources.",
        "Define permitted actions and when a person takes over.",
        "Test Serbian and English, including Latin and Cyrillic if your audience uses them.",
        "Test missing products, outdated prices, catalog outages, and failed enquiry delivery.",
        "Check mobile and keyboard use, and ensure the widget does not cover important controls.",
        "Set spending limits, request rate limits, and a fallback contact route.",
        "Assign responsibility for source updates and incorrect or unresolved answers.",
        "Measure accuracy, useful resolutions, enquiry quality, and actual monthly costs during the pilot.",
      ],
    }],
  },
  {
    heading: "Frequently asked questions about website AI chatbots",
    paragraphs: ["Before choosing, establish both what the price includes and what the assistant can verify in your systems."],
    blocks: [{
      type: "faq",
      items: [
        { question: "How much does a website AI chatbot cost?", answer: "NMark Designs offers initial integration from €350, with API usage and external services billed separately. Catalog search, CRM connections, and advanced automation need a scope estimate. For hosted platforms, check subscription limits and add-ons separately." },
        { question: "Can I get a free website chatbot?", answer: "Some platforms offer trials or limited free plans. Check expiry, message allowances, included features, and what happens at the limit. Free testing does not make integration, maintenance, or future usage free." },
        { question: "Can an AI chatbot work in Serbian?", answer: "Yes, with a suitable model and reliable sources. Test business terminology, Latin and Cyrillic scripts, and actual customer questions before launch. Language support alone does not establish answer accuracy." },
        { question: "Can it display current prices and products?", answer: "Yes, when connected to an up-to-date catalog or appropriate API. Product descriptions or an old PDF do not establish current prices and availability. Define what happens when the data source is unavailable too." },
        { question: "Can a chatbot work on WordPress?", answer: "It can be added through a supported plugin, embedded script, or custom integration. Check compatibility, performance, and access to your business data before choosing. The work depends on the existing website and required features." },
        { question: "Does a chatbot improve SEO and replace customer support?", answer: "Adding a chatbot does not guarantee better Google rankings. Important information should remain available on website pages. An assistant can reduce repetitive support work, but unclear questions, complaints, and individual agreements still need access to a person." },
      ],
    }],
  },
  {
    heading: "First, define the job your chatbot should do",
    paragraphs: [
      "A useful website AI chatbot has a clear role, reliable data, and measurable costs. Some businesses need an FAQ and contact form. Others benefit from an assistant that searches a catalog and prepares a concrete sales request. Start with that job before choosing a model.",
      "If you are considering integration, send your website URL, a few typical questions, approximate monthly enquiry volume, and where your data lives. That supports an initial discussion of scope, limitations, and whether a simpler solution already solves the problem.",
    ],
    blocks: [{
      type: "linkList",
      title: "Plan your next step",
      items: [
        { label: "AI chatbot integration — starting price and scope", href: "/en/pricing/#svc-ai-chatbot" },
        { label: "Send an AI chatbot enquiry", href: "/en/contact/?service=ai-chatbot" },
        { label: "How much does a website cost in Serbia in 2026?", href: "/en/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/" },
      ],
    }],
  },
];

export const aiChatbotGuide2026: Editorial = {
  image: "/projects/coolfridgeguys.webp",
  heroBackground: { image: "/projects/coolfridgeguys.webp", width: 1436, height: 850, position: "center" },
  width: 1436,
  height: 850,
  alt: {
    sr: "Početna stranica Cool Fridge Guys, projekta sa povezanim katalogom i AI asistentom za prodaju.",
    en: "Cool Fridge Guys homepage, a project with a connected catalog and AI sales assistant.",
  },
  caption: {
    sr: "Cool Fridge Guys iz NMark Designs portfolija: prikaz početne stranice. Projekat uključuje katalog i AI asistenta za prodaju opisane u tekstu.",
    en: "Cool Fridge Guys from the NMark Designs portfolio: the homepage. The project includes the catalog and AI sales assistant discussed in this article.",
  },
  topic: { sr: "AI chatbot i automatizacija upita", en: "AI chatbots and enquiry automation" },
  answer: {
    sr: "AI chatbot za sajt može da odgovara na pitanja, pretražuje katalog i prikuplja upite ako ima pouzdane izvore i odgovarajuće integracije. U NMark Designs ponudi početna integracija košta od 350 €, dok se API potrošnja i eksterni servisi plaćaju zasebno. Napredne funkcije procenjuju se prema obimu. Isplativost zavisi od stvarno ušteđenog vremena, kvaliteta upita i ukupnih troškova; za mali broj jednostavnih pitanja dovoljan može biti dobar FAQ.",
    en: "A website AI chatbot can answer questions, search a catalog, and collect enquiries when supported by reliable sources and suitable integrations. NMark Designs offers initial integration from €350, with API usage and external services billed separately. Advanced features need a scope estimate. Value depends on time actually saved, enquiry quality, and total costs; a good FAQ may be enough for a small number of simple questions.",
  },
  sections: { sr: sectionsSr, en: sectionsEn },
  sources: [
    { label: "Chatbase — Pricing", href: "https://www.chatbase.co/pricing" },
    { label: "Intercom — Pricing and Fin outcome definition", href: "https://www.intercom.com/pricing" },
    { label: "Chatbase — Product overview: sources, actions and handoffs", href: "https://www.chatbase.co/features/product-overview" },
    { label: "Tidio — Lyro data sources API", href: "https://developers.tidio.com/reference/get_lyro-data-sources" },
  ],
  cta: {
    sr: {
      title: "Da li vašem sajtu treba AI asistent?",
      description: "Pošaljite URL, tipična pitanja kupaca i željene funkcije. Zajedno možemo da definišemo smislen početni obim i odvojimo cenu integracije od redovnih troškova.",
      label: "Razgovarajmo o vašem sajtu",
      secondaryLabel: "Pogledajte cenu integracije",
      secondaryHref: "/sr/cenovnik/#svc-ai-chatbot",
    },
    en: {
      title: "Does your website need an AI assistant?",
      description: "Send your URL, typical customer questions, and required features. We can define a useful starting scope and separate implementation from recurring costs.",
      label: "Let’s discuss your website",
      secondaryLabel: "View integration pricing",
      secondaryHref: "/en/pricing/#svc-ai-chatbot",
    },
  },
};
