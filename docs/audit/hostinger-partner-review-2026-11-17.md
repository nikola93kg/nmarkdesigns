# Provera Hostinger partner integracije

Datum: 17. novembar 2026. Pregledana revizija: `4f3d1bab` na `main`.

Naknadna implementacija po odobrenju vlasnika opisana je u [belešci o izmenama](../implementation/hostinger-partner-offer.md). Nalazi ispod beleže stanje pre tih izmena.

**Zaključak:** partner status, kupon i odredišni link su potvrđeni. Integracija je tehnički jednostavna i dobro uklopljena u NMark identitet, ali promotivni tekst treba precizirati pre dodatnog isticanja popusta. Preporuka je dopuna postojećeg reda u hero sekciji i jedno centralno mesto sa detaljima ponude u cenovniku.

Ovo je analiza sa predlozima. Aplikacioni kod, poslovne cene, Hostinger podešavanja i produkcija nisu menjani.

## Obim i potvrđeni dokazi

- `git pull --ff-only origin main` je uspešno završen: `a35d747e` → `4f3d1bab`.
- Postojeće lokalne izmene u portfolio i reference dokumentima, kao i `docs/research/`, sačuvane su.
- Lokalni Hostinger logo fajlovi koji su blokirali pull sačuvani su u privremenoj rezervnoj kopiji. Svih 16 upoređenih fajlova identično je verzijama preuzetim sa `main`.
- Pregledani su relevantni SR/EN komponentni i sadržajni moduli, analitika, SEO izlaz i sva četiri lista postojeće PDF reference.
- Vizuelno su pregledani lokalni produkcioni build i objavljeni sajt. Nezavisni pregled dizajna obuhvatio je SR desktop i 430×932, EN početnu/cenovnik na 1440×1000, mobilni SR cenovnik, usluge i footer.
- Tehnički pregled koda i pregled dizajna urađeni su nezavisno, uz posebnu proveru zvaničnih Hostinger izvora.

| Provera | Zatečeno stanje | Zaključak |
| --- | --- | --- |
| Agency program u otvorenom hPanel-u | `Active` | Partnerstvo je potvrđeno |
| Agency Directory | `In review` | Ne predstavljati ga kao odobren javni listing |
| `Copy code` u Agency programu | `JIPMARKOVUSK` | Jednako vrednosti u `content/site.ts:32` |
| `Copy link` u Agency programu | `https://www.hostinger.com?REFERRALCODE=JIPMARKOVUSK` | Jednako vrednosti u `content/site.ts:31` |
| Otvaranje referral URL-a | Preusmerava na `/refer?REFERRALCODE=JIPMARKOVUSK` | Link je funkcionalan |
| Personalizovana landing stranica | Prikazuje NMark Designs i 20% popusta | Veza sa konkretnim partnerom je vidljiva |
| Landing FAQ | Popust je vezan za link; dodatni kod nije potreban | Na sajtu ponuditi link kao primaran način korišćenja; kupon kao alternativu |
| Landing FAQ o obnovi i drugim promocijama | Obnova ima redovnu cenu; dodatni promo se ne sabira | Ova objašnjenja nedostaju na NMark sajtu |

Javna ponuda proverena je u browseru: [personalizovana Hostinger stranica](https://www.hostinger.com/refer?REFERRALCODE=JIPMARKOVUSK). Nije izvršena kupovina, unos platnih podataka niti test samopreporuke. Prikaz partnera i ponude potvrđuje odredište; ne dokazuje konačnu atribuciju prodaje ili obračun provizije. To se proverava u Hostinger evidenciji nakon stvarne kvalifikovane kupovine.

## Šta već dobro radi

- Postojeći hero i footer koriste autentične lokalne partner bedževe i `next/image`.
- Partnerstvo ne potiskuje NMark naziv, portfolio ili glavni poziv za upit.
- Glavne sekcije ostaju serverske; nisu dodati marketinški SDK, biblioteka ili dodatni tracking skript zbog partnerstva.
- Centralni URL i kupon već postoje u `content/site.ts`.
- Cenovnik smešta partnersku ponudu uz hosting/održavanje, gde posetilac već razmatra trošak infrastrukture.
- U cenovniku postoji početno razdvajanje NMark managed hostinga i samostalne kupovine kod Hostingera.
- Mobilni prikaz pregledane kartice ponude uredno se prelama.

## Nalazi po prioritetu

### P1 — Uslovi popusta nisu dovoljno precizni

**Dokazi:** `components/services/ServiceDetailPage.tsx:206–207`, `components/pricing/PricingPage.tsx:405–410`, `public/llms.txt:12`, oba partnerski promovisana blog modula.

Stranica održavanja obećava popust i za domene; ostala mesta ne opisuju ograničenja ponude. Prema [zvaničnim uslovima programa](https://www.hostinger.com/legal/referral-program-agreement), pogodnost se odnosi na podobne nove kupovine, prvi period i podržane pretplate od 12+ meseci; domenske usluge su izuzete. Provizija za obnove ne znači obnovljivi klijentski popust.

**Predlog:** ukloniti obećanje za domene, uskladiti sve promotivne tvrdnje i uslove držati uz ponudu. Ne prenositi popust na cenu NMark izrade ili održavanja. Ponudu opisivati odvojeno od popusta za sopstveni Agency plan iz korisnikovog screenshot-a.

### P1 — Uslovi javne promocije imaju nerešenu nejasnoću

[Referral agreement](https://www.hostinger.com/legal/referral-program-agreement) ograničava javne komercijalne i blog referral linkove i navodi da ostala ograničenja važe i za Agency partnere. [Partner stranica](https://www.hostinger.com/partner-program) istovremeno nudi bedž za sajt, personalizovan landing i klijentske kupone.

**Zaključak:** korišćenje bedža je izričito podržano; javna komercijalna distribucija linka zahteva razjašnjenje partner tima. Funkcionalan personalizovan link sam po sebi ne rešava tu razliku u dokumentaciji. Nije utvrđeno da konkretan NMark ugovor ima poseban izuzetak.

**Predlog poruke podršci, bez slanja:** „As an approved Agency Partner, may NMark Designs publicly display the partner referral link and coupon on its commercial website and blog? Please confirm whether our partner terms override the commercial-publication restriction in the Referral Program Agreement.”

### P1 — Cene i obećanja održavanja nisu usklađeni

Ovo je povezano sa hosting prodajnim putem, iako nije greška samog referral linka.

- EN detalj usluge navodi `$40 / mo.` u `content/services.ts:1281`.
- EN pregled usluga navodi `€25 / mo. (~$30 / mo.)` u `content/i18n/en.ts:220`.
- EN cenovnik navodi `€25/month` u `content/i18n/en.ts:589`.
- `lib/schema.ts:115–116` prenosi valutnu/tekstualnu razliku u strukturirane podatke.
- Detalj obećava eksterni backup, vraćanje u minuti i trenutnu reakciju na incidente (`content/services.ts:1299`, `1330–1346`). Basic Care ima uži obim, a EN izričito isključuje 24/7 monitoring (`content/i18n/en.ts:594–597`).

**Predlog:** potvrditi jednu cenovnu osnovu i generisati prikaz iz centralnih podataka. Razdvojiti automatski monitoring od dostupnosti čoveka za intervenciju. Navesti šta koji paket obuhvata i izbegavati univerzalne rokove oporavka bez ugovorenog procesa. Ne menjati cenu po pretpostavci.

### P2 — Komercijalni odnos i SEO oznake linkova nisu obrađeni

**Dokazi:** `Hero.tsx:45`, `Footer.tsx:82`, `PricingPage.tsx:385,418`, `ServiceDetailPage.tsx:192,213`; blog renderer u `components/blog/BlogArticlePage.tsx:70,191`.

Referral linkovi uglavnom koriste samo `noopener noreferrer`, a blog izvori obične linkove. Nije pronađena kratka napomena da NMark može ostvariti proviziju. Hostinger status je vidljiv, ali to ne objašnjava proviziju.

**Predlog:** komercijalnim referral linkovima dodati `sponsored`, uz postojeće zaštitne atribute kada se otvaraju u novom tabu. [Google preporučuje `rel="sponsored"` za plaćene/komercijalne plasmane](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links). Obične neutralne izvore ne označavati automatski.

Predlog napomene: „Partnerski link: NMark Designs može ostvariti proviziju ako kupite preko ovog linka.” EN: “Partner link: NMark Designs may earn a commission if you purchase through this link.”

### P2 — Hero komunicira status, ali ne i praktičnu korist

**Dokaz:** `components/home/Hero.tsx:38–57`. Produkcioni link bedža izmeren je na približno 85×32 px. Slova u samoj grafici su sitna, a klik zona je niža od projektnog cilja od 44 px.

**Predlog:** zadržati sadašnju poziciju ispod dva glavna CTA-a. Dodati kratku korist i link do lokalnih detalja. Bedž prikazati čitljivije, uz klik zonu od najmanje 44 px ako ostane interaktivan. Ne menjati hero naslov radi hosting promocije. Na mobilnom dopuna treba da ostane kratka jer je početni ekran već visok.

### P2 — Isti podaci i prevodi se ponavljaju

**Dokazi:** `content/site.ts:31–32` sadrži centralne podatke, ali `ServiceDetailPage.tsx:190,206,211`, `content/blog-wordpress-nextjs-2026.ts:69` i `content/blog-redesign-signs-2026.ts:150` ponavljaju URL/kupon. Novi tekstovi su često inline `locale` uslovi umesto tipizovanog rečnika. SR formulacija „vlasništvo” i EN „managing” u cenovniku nemaju isto značenje.

**Predlog:** mali tipizovan partnerski sadržaj/modul, zajednički bedž i kontrolisan referral link. Nije potreban veliki sistem kampanja. Centralizovati URL, kupon, uslove, nazive akcija, napomenu o proviziji i pristupačne oznake u SR/EN. Klijentska granica potrebna je samo za kopiranje koda ili merenje klika.

### P2 — Nema eksplicitnog merenja partnerskog puta

**Dokazi:** `lib/analytics.ts:13–21` nema partnerski događaj; Hostinger linkovi su obični linkovi/dugmad bez odgovarajućeg handlera. Postojeći consent mehanizam može da se ponovo koristi.

**Predlog:** dodati događaj za odlazak na ponudu, sa lokacijom (`hero`, `footer`, `pricing`, `maintenance`, `blog`), jezikom i destinacionim domenom; kopiranje koda po potrebi meriti posebno. Ne slati lične podatke. Poštovati postojeću saglasnost i zabranu razvojne analitike. Klik je signal interesovanja, a ne potvrđena kupovina. GA4 automatsko outbound merenje nije provereno u podešavanjima naloga.

### P2 — Blog ponuda i tehnički saveti treba da budu jasnije razdvojeni

**Dokazi:** referral link je i među izvorima u WordPress/Next.js članku; članak o redizajnu prelazi sa problema brzine direktno na hosting preporuku. `content/blog-redesign-signs-2026.ts:76` ima univerzalnu numeričku tvrdnju o gubitku upita bez neposrednog odgovarajućeg izvora. `public/llms.txt:13` navodi „100/100 Core Web Vitals”, iako CWV nisu jedan rezultat od 100 poena.

**Predlog:** zadržati partnersku ponudu u relevantnim hosting/migracija odeljcima uz vidljivu oznaku. Neutralne dokaze i komercijalne linkove razdvojiti. Tehničke mogućnosti vezati za stvarni plan; ne predstavljati kupovinu hostinga kao univerzalno rešenje problema brzine. Nepotkrepljene brojke ukloniti ili potkrepiti odgovarajućim dokazima.

## Konkretan predlog za hero i ponudu

Postojeći glavni pozivi ostaju „Zatražite besplatnu ponudu” i „Pogledajte portfolio”. Partner red dobija sledeći sadržaj:

**SR:** „Hostinger partner · 20% popusta na prvi period odabranih hosting planova”

**EN:** “Hostinger partner · 20% off the first term of eligible hosting plans”

Manji tekstualni link: **„Detalji i uslovi →” / “Offer details →”**.

Odredište: predloženi novi anchor `/sr/cenovnik/#hostinger-partner` odnosno `/en/pricing/#hostinger-partner`. Anchor trenutno ne postoji i treba ga dodati postojećem calloutu. Ovo ne zahteva novu rutu ili SEO redirect.

U cenovniku postojeći callout postaje centralni detalj partnerske ponude:

- Naslov: „Hosting direktno kod Hostingera” / “Hosting directly with Hostinger”.
- Jasno prikazan kupon `JIPMARKOVUSK`, sa mogućnošću kopiranja i lokalizovanom potvrdom uspeha.
- Primarni odlazak preko već potvrđenog linka; posetilac ne mora istovremeno da unosi kupon.
- CTA: „Pogledajte Hostinger ponudu ↗” / “View Hostinger offer ↗”.
- Uslovi i partnerska napomena odmah uz ponudu, čitljivim tekstom.
- Objasniti da je hosting kupljen kod Hostingera, a NMark održavanje zasebna usluga. Ne pretpostavljati da klijent sa sopstvenim nalogom mora sam da obavlja tehničko upravljanje.

Na stranici održavanja koristiti iste podatke i formulacije. Footer zadržati kao diskretan dokaz partnerstva sa pristupom detaljima. Homepage sekciji usluga nije potreban dodatni bedž: ona već vodi na stranicu održavanja. Nije potrebna posebna hosting landing stranica u ovom malom zahvatu.

## Najmanji koherentan paket budućih izmena

1. Precizirati ponudu i ukloniti domene iz obećanja; uskladiti `llms.txt` i relevantne blogove.
2. Centralizovati partner sadržaj i prevode; dodati `sponsored` i napomenu o proviziji.
3. Dopuniti hero red i povezati ga sa postojećim calloutom u cenovniku.
4. Dodati pristupačno kopiranje koda i postojeću consent analitiku za partnerske klikove.
5. Uskladiti potvrđene cene i obim održavanja u prikazu i schema podacima.
6. Proveriti uslove javnog linkovanja sa Hostinger partner timom pre šire promocije.

Pri implementaciji proveriti da SR/EN putanja vodi do istog smisla ponude, da anchor radi, da kopiranje ima uspešno i neuspešno stanje, da spoljni link zadržava referral identifikator i oznake, i da događaji ostaju blokirani bez saglasnosti. Nove biblioteke i poseban backend nisu potrebni za ove izmene.

## Validacija i granice provere

- `npm run lint`: prošao.
- `npm run typecheck`: prošao.
- `npm run build`: prošao, uključujući generisanje 78 stranica. Prvi pokušaj nije mogao da pristupi Google Fonts iz sandbox-a; ponovljen build sa mrežnim pristupom je uspešan.
- `npm run test:e2e -- tests/localization.spec.ts tests/pricing.spec.ts tests/services.spec.ts tests/seo.spec.ts`: **120/120 prošlo**.
- Cenovnik/usluge provereni postojećim testovima na 320, 375, 430, 768, 1024, 1440 i 1920 px; uključene su postojeće axe provere na 375 i 1440 px.
- `npm run test:e2e -- tests/foundation.spec.ts`: **21/21 prošlo**. Početna stranica proverena je na 320, 375, 430, 768, 1024, 1280, 1440 i 1920 px na oba jezika, uz postojeće provere navigacije, tastature i smanjenog kretanja. Ukupno je prošla **141 provera**.
- Testovi pokrivaju postojeću funkcionalnost i deo SEO/pristupačnosti; ne potvrđuju istinitost poslovnih tvrdnji ili pravo na proviziju. Poseban Hostinger scenario trenutno nije pronađen u testovima.
- Impeccable automatski detektor nije dostupan: lokalni engine nije instaliran, a podrazumevani cache je van dozvoljene zone pisanja. Nalazi su zasnovani na pregledu koda, browsera i postojećim testovima; rezultat detektora nije izmišljen.
- Nisu rađeni nova Lighthouse/CWV terenska merenja, potpuni audit Hostinger naloga, izmena ugovora, GA4 konfiguracije, test kupovina ili deploy.

## Izvori

- [Hostinger Partner Program](https://www.hostinger.com/partner-program) — pogodnosti, bedž i razlika u odnosu na običan referral program.
- [Hostinger Referral Program Agreement](https://www.hostinger.com/legal/referral-program-agreement) — podobnost, uslovi i ograničenja.
- [Personalizovana NMark Designs ponuda](https://www.hostinger.com/refer?REFERRALCODE=JIPMARKOVUSK) — direktno posmatrana stranica i njen FAQ.
- [Hostinger: korišćenje referral programa](https://www.hostinger.com/support/6080777-how-to-use-the-referral-program-at-hostinger/) — linkovi i kodovi.
- [Google: kvalifikovanje spoljnih linkova](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) — `sponsored` atribut.

Provera je završena bez pitanja korisniku: tražen je pregled i predlog izmena, a potrebni podaci za taj pregled dostupni su u kodu, panelu i zvaničnim izvorima.
