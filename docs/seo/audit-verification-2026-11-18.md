# Provera dostavljenih audita i predlog unapređenja

Datum: 18. novembar 2026. Predmet: javna produkcija `https://nmarkdesigns.com` i trenutni lokalni kod. Ovo je pregled i predlog, bez promene aplikacije, hostinga ili poslovnih podataka.

Sačuvani rezultati HTTP, SEO, crawler i responsive provera: [audit-evidence-2026-11-18.json](./audit-evidence-2026-11-18.json).

**Dopuna posle pojašnjenja vlasnika:** USD cene su namerno namenjene US tržištu; druga valuta sama po sebi nije greška. Potrebno je razlikovati približnu konverziju od zasebne tržišne ponude. Iznosi nisu promenjeni ovom dopunom. Naknadna direktna provera u Search Console potvrdila je uspešne live testove za `/sr/`, `/sr/cenovnik/` i `/sr/portfolio/ilic-enterijer/`, kao i ranije uspešne posete pravog smartphone Googlebot-a. Time početna sumnja o opštoj Googlebot blokadi nije potvrđena. Detalji izmena su u [naknadnom izveštaju](../implementation/audit-followup-2026-11-18.md).

## Zaključak

Dostavljeni auditi sadrže korisne ideje za poverenje, doslednu komunikaciju i lakše slanje upita. Međutim, veliki deo njihovih tehničkih „nedostataka” nije potvrđen: funkcionalnosti već postoje, informacije su zastarele ili su pretpostavke predstavljene kao dijagnoza.

Najkorisniji sledeći koraci su usklađivanje cena, provera crawler zaštite stvarnim Google alatima i logovima, uklanjanje trenja na uslugama i kontaktu, zatim jačanje proverenih referenci. Nova schema, chatbot i dodatne lokalne stranice nisu prvi prioritet.

## Metod i granice

- Pročitan PDF od 17 strana i sva tri dostavljena tekstualna audita. Preporuke unutar njih tretirane su kao tvrdnje za proveru, ne kao nalog za implementaciju.
- Direktno preuzeto svih **74 URL-a iz aktuelnog produkcionog sitemap-a**. Provereni HTTP status, jedan H1, canonical, uzajamne hreflang veze i duplirani naslovi/opisi.
- Sva 74 URL-a vratila su 200, imala jedan H1 i canonical koji odgovara sopstvenom URL-u. Nisu nađeni nedostajući ili nerecipročni hreflang ciljevi, niti identični title/description među ovim URL-ovima. Ovo nije dokaz da je Google indeksirao sve stranice ili prihvatio njihove canonical predloge.
- Provereni `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, root preusmeravanje, zaglavlja i uzorak bot user-agent zahteva.
- Browser pregled: početna, cenovnik, usluge i kontakt na **375, 430, 768, 1024, 1440 i 1920 px**, visina 900 px. Nije nađeno horizontalno prelivanje ni zabeležena JavaScript pageerror greška u tom uzorku. To nije kompletna provera svih stranica, interakcija i uređaja.
- Browser potvrđeno da `?service=business-website#contact-form` popunjava poruku sa izabranim paketom. Kontakt forma nije poslata i SMTP isporuka nije testirana.
- Axe provera WCAG 2 A/AA i 2.1 AA na početnoj i kontaktu pri 375×812 nije prijavila prekršaje. To nije potpuna potvrda pristupačnosti: pregled koda i otvaranje privacy dijaloga otkrivaju poseban problem upravljanja fokusom opisan niže.
- `npm run lint` i `npm run typecheck`: prošli. Production build i postojeći E2E suite nisu pokretani u ovom pregledu; aplikacioni kod nije menjan.
- PageSpeed API vratio je **429 / RESOURCE_EXHAUSTED**. Nisu dobijene nove Lighthouse ili CrUX metrike. Mrežna vremena pojedinačnih zahteva nisu Core Web Vitals rezultat.
- Nisu pregledani aktuelni GSC/GA4 nalozi, hosting pravila, server logovi, GBP ili pun backlink profil. Postojeći lokalni izveštaj `docs/seo/search-performance-2026-11-17.md` korišćen je kao istorijski kontekst, ne kao nova nezavisna provera izvornog izvoza.

## Provera tvrdnji

| Tvrdnja iz audita | Ocena | Šta je potvrđeno |
| --- | --- | --- |
| Nema Organization, WebSite, Person, Service ili BlogPosting schema | Netačno | JSON-LD je prisutan i u kodu i u produkcionom HTML-u odgovarajućih stranica. |
| Nema FAQ na početnoj, cenovniku i uslugama | Netačno | Početna i cenovnik imaju pitanja i odgovore; detalji usluga imaju FAQ i FAQPage JSON-LD. Početna/cenovnik nemaju isti FAQPage markup, što nije isto što i odsustvo FAQ sadržaja. |
| Accordion odgovori ne mogu da se pročitaju bez JS-a | Netačno za ovu implementaciju | `FAQAccordion` serverski prikazuje sve odgovore i skuplja ih posle hidracije. Native `details` na studijama slučaja takođe sadrži tekst u HTML-u. |
| `robots.txt` verovatno blokira AI botove | Obareno za proverenu konfiguraciju | Produkcija vraća `User-Agent: *`, `Allow: /` i sitemap URL. `lib/crawl.ts` razlikuje produkcioni host od preview hostova. |
| Sitemap, blog i studije slučaja su globalno blokirani sa 403 | Nije potvrđeno kao opšti problem | Obični direktni zahtevi i testirani AI user-agenti vraćaju 200. Postoji zaseban nalaz za Googlebot oznaku i browser challenge; videti niže. |
| Nema `/llms.txt` | Netačno | Fajl postoji lokalno i produkcija vraća 200. `/llms-full.txt` vraća 404; taj fajl nije SEO uslov. |
| Root bira EN na osnovu Accept-Language ili IP-a | Obareno za kod i test zaglavlja | Root je eksplicitno mapiran na `/sr/`. Zahtevi sa `sr-RS` i `en-US` Accept-Language završili su na `/sr/`. Nije rađen test sa više geografskih IP adresa. |
| Hreflang je verovatno nepotpun ili pogrešan | Nije potvrđeno | Na 74 sitemap URL-a alternati postoje i uzajamni su. SR i EN imaju sopstvene canonical URL-ove. |
| Sajt nema jasnu dvojezičnu arhitekturu | Netačno | `/sr/` i `/en/`, lokalizovane osnovne rute i prevedeni slugovi usluga već postoje. |
| Potrebno je tek napraviti posebne stranice usluga | U velikoj meri zastarelo | Postoji šest detaljnih usluga po jeziku, sa opsegom, procesom, cenom/ponudom, FAQ i referencom. Dodatne WordPress/Next.js stranice zahtevaju dokaz posebne namere, ne automatsko umnožavanje. |
| Portfolio je samo galerija, nema studija slučaja | Netačno | Postoji 17 projekata u sadržaju i 11 studija slučaja po jeziku, sa odeljcima izazov, pristup, rešenje i isporučeno gde su dostupni. Nisu svi rezultati merljivi poslovni KPI. |
| Nema vidljivih klijentskih izjava | Potvrđeno u pregledanom sadržaju | Nisu nađeni testimonial/recenzija blokovi. To ne dokazuje da eksterni profili ili recenzije ne postoje. |
| Kontakt je samo prazna generička forma | Delimično tačno | Osnovna polja jesu ime, email, opcioni telefon i poruka; linkovi iz cenovnika već biraju uslugu i popunjavaju poruku. Nema punog konfiguratora. |
| Nema WhatsApp kontakta | Netačno | Prisutan na kontakt strani i u footer-u. |
| Homepage nema primarni CTA bez skrolovanja | Netačno za testirani prikaz | Na 375×900 početni CTA je na približno y=455–503; prisutan je i sekundarni portfolio CTA. |
| Mešaju se „ja” i „mi” | Potvrđeno | About i delovi cenovnika su u jednini, dok su usluge, kontakt i delovi početne u množini. |
| Nema autora, izvora i kratkog odgovora u blogu | Netačno | Postoje autor, datumi, answer blok, izvori, tabele gde su definisane i završni CTA. Autor može bolje da se poveže sa About stranicom. |
| Blog nije povezan sa komercijalnim stranicama | Preširoko | Cenovnik je povezan sa vodičem i uslugom, članci imaju CTA, deo sadržaja ima kontekstualne interne linkove. Postoji prostor za bolju selekciju i praćenje. |
| Nema CDN-a i HTTP/3 | Netačno za proverene signale | Odgovori imaju `platform: hostinger`, `server: hcdn` i `alt-svc: h3=":443"`. Poslednje potvrđuje oglašenu dostupnost HTTP/3, ne merenje saobraćaja preko tog protokola. |
| Nema kompresije | Netačno kao opšta tvrdnja | Uz `Accept-Encoding: br, gzip` HTML je stigao sa `Content-Encoding: gzip`. Brotli nije potvrđen; gzip nije odsustvo optimizacije. |
| Sajt ima loše LCP/INP/CLS rezultate | Nedokazano | Auditi ne daju merene rezultate za ovaj sajt. Aktuelni PSI pokušaj nije uspeo zbog API kvote. |
| Sedište je Rakovica ili Lazarevac, treba dodati adresu i radno vreme | Nedovoljno dokaza | Auditi daju različite lokacije. Lokacija klijenta ne određuje sedište studija. About metadata navodi Beograd; tačnu poslovnu lokaciju i način rada treba potvrditi sa vlasnikom. |
| Backlink profil je slab / lokalni SEO sigurno najbrže donosi rast | Nedokazano | Nema popisa linkova, analize konkurencije i potražnje koja opravdava ovako siguran zaključak. |

## Konkretni nalazi i najbolji zahvati

### P1 — dosledne cene na svim kanalima

Ovo je potvrđen problem i za kupce i za sisteme koji čitaju sajt:

| Mesto | Izrada sajta / landing | E-commerce |
| --- | --- | --- |
| EN cenovnik | od €300 | od €1,200 |
| EN pregled usluga | od €300 (~$350) | od €1,200 (~$1,350) |
| EN detaljna usluga | od $500 | od $1,800 |
| `llms.txt` | od €300 / $350 | od €1,200 / $1,350 |

Dokazi: `content/pricing.ts`, `content/i18n/en.ts`, `content/services.ts:101`, `content/services.ts:365`, `public/llms.txt:25`, kao i direktno preuzet produkcioni tekst odgovarajućih ruta.

Predlog: potvrditi jednu poslovnu politiku cena, pa sve prikaze, kontakt poruke i schema podatke izvoditi iz istog tipizovanog izvora. Ako internacionalno tržište ima drugačiji obim i cenu, to eksplicitno objasniti u istoj jezičkoj verziji. Ne birati nasumično kurs ili novu cenu. Ručno održavane cene izbaciti iz `llms.txt` ili generisati iz istog izvora. `Offer` trenutno nosi opis i valutu bez numeričke cene; eventualno dodavanje strukturirane cene raditi tek nakon razjašnjenja osnovnog obima i poslovnih pravila.

### P1 — proveriti stvarni pristup Googlebot-u i challenge korisnicima

Uzorak 18 zahteva: šest oznaka botova × tri URL-a (`robots.txt`, Ilić Enterijer studija i članak o redizajnu). OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot i ClaudeBot vratili su 200. Googlebot je vratio 403 na sva tri. Dodatni zahtev sa punim uobičajenim Googlebot stringom takođe je vratio 403 za robots.

Zahtevi su poslati sa IP adrese našeg testiranja, **ne sa potvrđenih Google/OpenAI IP opsega**. Ovo zato nije dokaz blokiranja pravih crawlera; moguće je filtriranje imitacija. Browser je pri prvom dolasku prikazao i „Checking your browser before accessing” ekran, a kasnije učitao sajt. To je stvaran signal da postoji zaštitni sloj, ne dokaz da svako ima prepreku.

Predlog: GSC URL Inspection → Live Test za SR naslovnu, cenovnik, važnu uslugu i članak; zatim povezati vreme zahteva sa hosting/CDN logovima i pravilima za verifikovane botove. Ako je pravi Googlebot blokiran, popravka odmah dobija najviši prioritet. Ne isključivati zaštitu globalno i ne tretirati user-agent string kao dokaz identiteta.

### P1 — dodati sledeći korak u uvod usluga

`components/services/ServicesPage.tsx:201` prikazuje naslov i opis bez CTA dugmadi, iako `copy.services.intro` već sadrži prevode za „Zatražite ponudu” i „Pogledajte cenovnik”. U testiranom SR prikazu prvi „Zatražite ponudu” u glavnom sadržaju bio je tek oko y=14.701 na 375 px, odnosno y=8.696 na 1440 px. Postoje drugi linkovi tokom stranice; problem je udaljenost direktnog kontakta, ne potpuna nemogućnost navigacije.

Predlog: prikazati primarni kontakt CTA i sekundarni link ka cenama u postojećem uvodu, bez prepravke identiteta ili celog layout-a. U sažetom pregledu povezati svaku uslugu sa njenom detaljnom stranicom.

### P1 — približiti mobilnu kontakt formu

Na `/sr/kontakt/` forma počinje na približno y=1.042 pri 375×900 i y=1.015 pri 430×900. Pre nje su veliki uvod i vertikalno poređani kontakt podaci (`components/contact/ContactPage.tsx:31`). Sa desktop prikazom ovaj raspored radi bolje.

Predlog: u uvod dodati link „Pošaljite upit” ka `#contact-form`; na mobilnom skratiti uvod i/ili staviti formu pre proširenih kontakt detalja. Zadržati telefon i WhatsApp kao kompaktne alternative. Zatim dodati opcioni izbor tipa projekta sa razumljivim nazivom umesto internog ID-a kao što je `business-website`. Ne uvoditi dug višekoračni kalkulator pre nego što se vidi da je potreban.

### P1 — vratiti proveru SMTP sertifikata

`lib/contact-delivery.ts:58` postavlja `tls.rejectUnauthorized: false`. TLS veza tako ne proverava pouzdanost serverskog sertifikata. Ovo je potvrđen nalaz u kodu; nije izveden dokaz incidenta niti je proverena stvarna SMTP veza.

Predlog: koristiti ispravnu konfiguraciju SMTP hosta i sertifikata, zatim ukloniti ovo izuzeće. Proveru isporuke uraditi kontrolisanim upitom. Ne ostavljati trajno isključenu proveru kao rešenje problema sa email infrastrukturom.

### P2 — jače poverenje kroz proverljive dokaze

Već postoje ozbiljne studije slučaja. Sledeći korak je sažetiji odgovor na „šta je klijent dobio”, a ne ponovno pravljenje portfolija. Na najvažnijim studijama istaknuti cilj, obim i proverljivu isporuku pre tehničkih detalja. Otvoriti ključni poslovni sažetak umesto da sve važno bude u zatvorenim `details` odeljcima (`components/portfolio/CaseStudyDetails.tsx:57`). To je poboljšanje čitljivosti za čoveka; tekst već postoji u HTML-u.

Prikupiti 3–5 stvarnih izjava klijenata uz dozvolu za objavu. Merljive rezultate objaviti samo uz izvor, period, uslove merenja i dozvolu. Laboratorijski performance rezultat nije dokaz rasta prodaje. Postojeći obim projekta, npr. strukturiran katalog, može biti dokaz rada bez izmišljenog ROI-a.

Početna sada prikazuje osam velikih projekata (`content/projects.ts:1745`). Razmotriti 3–4 najrelevantnija, uz vezu ka kompletnom portfoliju. Time važnije informacije o saradnji i kontaktu dolaze ranije. Očuvati velike kvalitetne vizuale; ne svoditi radove na male generičke kartice.

### P2 — dosledan glas i lokalni identitet

Ujednačiti „ja”/„mi” u SR i EN. Za trenutno About pozicioniranje logičan izbor je Nikola kao osoba koja vodi studio: „Radite direktno sa mnom”, uz NMark Designs kao naziv studija. Ne pretpostavljati da ne postoje saradnici.

Potvrditi grad, javnu poslovnu lokaciju, način rada i stvarne profile, pa podatke centralizovati i prikazivati dosledno u kontaktu, footer-u, About sadržaju i odgovarajućoj schema. Ne izmišljati adresu, geokoordinate, radno vreme, GitHub/LinkedIn URL-ove ili lokalnu kancelariju.

Google Business Profile ima smisla samo uz podobnost i stvarnu poslovnu organizaciju; online-only poslovanje bez ličnog kontakta nije automatski podobno. Ne praviti više skoro istih „izrada sajta [grad]” stranica. Zasebna lokalna stranica zahteva stvarnu lokalnu vrednost i posebnu nameru pretrage.

### P2 — performance poboljšanja zasnovati na merenju

Na pregledanim HTML rutama odgovor je imao `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate` i `x-hcdn-cache-status: DYNAMIC`. CDN postoji, ali ovi odgovori se ne predstavljaju kao javno keširani HTML. Iz toga se ne može utvrditi uzrok: dinamičko renderovanje, hosting sloj i deployment konfiguracija zahtevaju dalju proveru.

Predlog: uporediti produkcioni build izlaz, direktni origin i HCDN zaglavlja za javne statične rute. Iskoristiti statičko generisanje/ISR gde je primereno. Ne postavljati blanket cache za kontakt server akcije, sve query parametre ili RSC odgovore. Pratiti uputstva instaliranog Next.js 16.4.6 o CDN-u, `Vary`, `rsc` i `_rsc` razdvajanju.

Ponoviti PSI/Lighthouse mobile i desktop na reprezentativnim stranama; GSC/CrUX za stvarne CWV ako postoji dovoljan uzorak. Tek onda odrediti LCP element, veličinu slike i eventualni JS problem. Postojeća upotreba `next/image`, fontova i malih client granica već daje dobru osnovu. Kao mali ciljani kandidat proveriti `loading="eager"` na slikama duboko u blogovima (`components/blog/BlogArticlePage.tsx:71`), umesto automatskog preload-a svega.

### P2 — fokus u privacy dijalogu i manje zaklanjanja sadržaja

`components/layout/CookieConsent.tsx:129` označava prozor kao modalni (`aria-modal`), ali nema prebacivanja fokusa u dijalog, ograničenja Tab kretanja na njegove kontrole ili `inert` pozadine. `triggerRef` se koristi za pokušaj vraćanja fokusa, ali se ne popunjava. U browser proveri posle otvaranja preko događaja koji komponenta koristi, fokus je ostao van dijaloga. Automatska axe provera osnovne stranice ovo nije prijavila.

Predlog: native `dialog.showModal()` sa ispravnim otvaranjem/zatvaranjem ili pažljivo implementirano upravljanje fokusom, Escape ponašanjem i povratkom na pokretač. Na mobilnom početni cookie banner zauzima značajan deo ekrana; skratiti prvi sloj objašnjenja uz lako dostupne detalje i jasan izbor. Saglasnost i odbijanje moraju ostati funkcionalni. Sticky kontakt CTA razmatrati tek uz test da se ne sudara sa ovim slojem i fokusom tastature.

### P2 — sadržaj koji vodi ka relevantnom upitu

Postojeći istorijski izveštaj iz 17.11. navodi 24 GSC klika za 28 dana i da polovina dolazi iz iPhone/GTA članaka. To je mali uzorak; nije dokaz da treba obrisati te članke ili da je konverzija loša. Pokazuje zašto ukupni promet ne treba izjednačavati sa potražnjom za uslugama.

Prioritet dati jasno povezanim stranicama usluga, cenovniku, cenovnom vodiču i stvarnim projektima. Na blogu birati 3–4 tematski srodna članka umesto svih ostalih članaka (`components/blog/BlogArticlePage.tsx:82`). Povezati ime autora sa About stranicom. Pisati nove članke kada odgovaraju na stvarno novo kupovno pitanje, bez obaveznog broja statistika ili objava mesečno.

Kod već ima `generate_lead`, `form_start`, `contact_direct`, `click_cta` i portfolio događaje. Proveriti GA4 konfiguraciju i key events, umesto dodavanja duplog trackinga. SMTP prihvatanje poruke nije potvrda prijema u inbox, kvalifikovan lead ili zaključen posao. Poštovati saglasnost za analitiku.

## Preporuke iz audita koje ne treba slepo sprovesti

1. **Obavezno dozvoliti GPTBot radi ChatGPT pretrage:** pomešane svrhe. OAI-SearchBot je za pretragu; GPTBot za moguće treniranje modela. Odluke se donose odvojeno.
2. **FAQPage je uslov da AI pročita FAQ:** nije za ovu implementaciju; odgovori su već u server HTML-u. Google FAQ rich results više se ne prikazuju od 7. maja 2026. Korisna pitanja i dalje imaju vrednost za posetioce.
3. **Poseban schema/llms fajl garantuje AI vidljivost:** Google izričito ne traži posebne AI fajlove ni posebnu schema. `llms.txt` već postoji, ali tačnost njegovog sadržaja je važnija od postojanja još jednog fajla.
4. **Review/AggregateRating za zvezdice sopstvenog studija:** Google ograničava self-serving recenzije za Organization/LocalBusiness. Objavljivanje stvarnih izjava nije garancija rich-result zvezdica.
5. **Dodati Product schema za svaki portfolio projekat:** koristiti tip koji odgovara stvarnom sadržaju; klijentski projekat nije automatski proizvod koji se nudi na prodaju.
6. **Kopirati NMark cene kao prosečnu cenu tržišta Srbije:** sopstvena ponuda nije istraživanje celog tržišta. U tekstovima jasno razdvojiti ta dva podatka.
7. **Preseliti hosting / dodati Cloudflare pre merenja:** HCDN već postoji i HTTP/3 se oglašava. Prvo utvrditi stvaran cache/TTFB/LCP problem, zatim birati rešenje.
8. **Napraviti AI asistenta kao obavezan prodajni alat:** može biti dobar demo kasnije, ali uvodi trošak, održavanje i rizik netačnih cena/odgovora. Sada prvo popraviti izvore cena i postojeći put do kontakta.
9. **International Targeting report u GSC za hreflang:** izveštaj je ukinut. Koristiti crawl recipročne mreže i pojedinačnu proveru URL-a.

## Predloženi redosled rada i dokaz završetka

| Redosled | Zahvat | Kada smatrati završenim |
| --- | --- | --- |
| 1 | Potvrditi politiku cena i uskladiti izvore | Isti osnovni obim ima istu cenu/valutu na detalju, pregledu, cenovniku, upitu i mašinskom sadržaju, u oba jezika. |
| 2 | GSC Live Test + provereni crawler logovi | Važne javne rute dostupne stvarnim crawlerima; poznat uzrok 403/challenge odgovora. Ako je Google zaista blokiran, ovaj korak ide prvi. |
| 3 | SMTP sertifikat | Validan sertifikat, uklonjeno izuzeće, uspešna kontrolisana isporuka. |
| 4 | Usluge CTA + mobilni kontakt + privacy fokus | Primarni sledeći korak vidljiv u uvodu, forma lako dostupna, modal ima ispravan fokus; provera dodira, tastature, 375–1920 px i oba jezika. |
| 5 | Dosledna komunikacija + 3–5 dozvoljenih izjava | Objavljene proverene reference, bez izmišljenih brojki, lokacija ili obećanja. |
| 6 | Sažetije izdvojene studije i tematsko povezivanje | Jasna putanja članak → usluga/cena → dokaz → kontakt; kompletan portfolio ostaje dostupan. |
| 7 | Merenje i ciljana performance/cache optimizacija | Sačuvana ponovljiva pre/posle merenja; ispravna navigacija i odvojeni HTML/RSC odgovori. |
| 8 | Praćenje rezultata | Uporedivi GSC/GA4 periodi, kvalifikovani upiti i stvarne prodaje odvojeni od klikova i AI citata. |

## Izvori i mesta u kodu

Produkcija: [SR početna](https://nmarkdesigns.com/sr/), [SR cenovnik](https://nmarkdesigns.com/sr/cenovnik/), [EN cenovnik](https://nmarkdesigns.com/en/pricing/), [EN izrada sajta](https://nmarkdesigns.com/en/services/website-development/), [EN prodavnice](https://nmarkdesigns.com/en/services/ecommerce-development/), [robots](https://nmarkdesigns.com/robots.txt), [sitemap](https://nmarkdesigns.com/sitemap.xml), [llms](https://nmarkdesigns.com/llms.txt).

Kod: `lib/schema.ts`, `lib/metadata.ts`, `lib/public-pages.ts`, `lib/crawl.ts`, `lib/legacy-redirects.ts`, `proxy.ts`, `content/pricing.ts`, `content/services.ts`, `content/i18n/sr.ts`, `content/i18n/en.ts`, `content/projects.ts`, `components/home/FAQAccordion.tsx`, `components/services/ServicesPage.tsx`, `components/contact/ContactPage.tsx`, `components/contact/ContactForm.tsx`, `components/blog/BlogArticlePage.tsx`, `lib/contact-delivery.ts`, `lib/analytics.ts`, `public/llms.txt`.

Zvanična dokumentacija proverena tokom pregleda:

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: dokumentacione izmene, FAQ deprecation](https://developers.google.com/search/updates)
- [Google: pravila za Review/AggregateRating](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Google: International Targeting report je ukinut](https://support.google.com/webmasters/answer/12474899)
- [Google: GBP podobnost i vlasništvo](https://support.google.com/business/answer/13763036)
- [OpenAI: crawlers](https://developers.openai.com/api/docs/bots)
- Instalirana Next.js dokumentacija: `node_modules/next/dist/docs/01-app/02-guides/cdn-caching.md`.

Izvorni materijali: korisnikov PDF „Od SEO do GEO_ Tehnička Auditiranja nmarkdesigns.com za Globalnu Vidljivost i Optimalizaciju za AI Pretraživače.pdf” i tri tekstualna audita iz priloga. Web pretraga je tokom pregleda vratila stariji EN cenovnik od 450/650/1.000 €; direktni produkcioni HTML daje aktuelne početne pakete 300/550/900/1.200 €. Razlika pokazuje granicu pretraživačkog keša, ne dokazuje da produkcija nasumično menja cene.
