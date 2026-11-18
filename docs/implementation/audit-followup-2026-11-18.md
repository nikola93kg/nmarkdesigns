# Izmene posle provere audita — 18.11.2026.

Naknadno je vlasnik odobrio predložene US iznose. Njihova implementacija evidentirana je u [izveštaju o US cenama](./us-website-pricing-2026-11-18.md); sledeći tekst opisuje prethodni zahvat pre tog odobrenja.

## Dogovoreni obim

Vlasnik je potvrdio ciljano US prikazivanje USD cena i zatražio mišljenje o povećanju. Iznosi, valute i broj projekata na početnoj ostaju u postojećem stanju. Predlog novih cena je odvojen od implementacije: landing od $750, poslovni sajt od $1.500, napredni od $2.500, osnovna prodavnica od $3.500, uz jasno definisan obim. To je predlog za testiranje pozicioniranja, ne utvrđeni tržišni prosek ili garantovana isplativost. Pre eventualne objave uskladiti sve EN prikaze i objasniti odnos EUR ponude i US ponude.

Nema nove testimonials sekcije, traženja izjava, izbacivanja tehničkog formata studija ili smanjivanja izbora projekata. Očuvani su postojeći prikaz rada, tehnologije, slike i opis projekta.

## Implementacija

- Uvod usluga dobio je primarni kontakt CTA sa postojećim tracking-om i sekundarni link ka cenovniku, u oba jezika.
- Kontakt uvod ima direktan link do forme. Forma je prva u mobilnom sadržaju i DOM redosledu, dok desktop zadržava kontakt podatke levo i formu desno. Dodata je margina za dolazak na anchor ispod zaglavlja.
- Na portfolio prikazu od 1024 px veliki naslovi preko slika su vizuelno uklonjeni. Naziv ostaje kompaktno u metapodacima, a semantički H2 ostaje dostupan čitačima ekrana. Mobilni naslov ostaje čitljiv; ka studiji vode slika i dugme.
- Marketinški tekstovi osnovnih stranica i detaljnih usluga usklađeni su sa direktnim radom sa Nikolom: „ja / moj / kontaktirajte me” i „I / my / contact me”. Množina koja označava saradnju klijenta i developera ostaje prirodna.
- SMTP zahteva validaciju sertifikata, najmanje TLS 1.2 i TLS za slanje. Nema novih izuzetaka za nevažeće sertifikate.
- Podešavanja privatnosti koriste native `dialog.showModal()`, modalnu inertnu pozadinu, kruženje Tab/Shift+Tab fokusa, Escape i povratak fokusa na pokretač. Dijalog ima ograničenu visinu sa unutrašnjim skrolom za male ekrane. Izbor analitike i postojeći consent tok ostaju isti.
- Prvi sloj objašnjenja analitike je kraći u oba jezika. Dugme za povratak na vrh skriveno je dok banner postoji, tako da na mobilnom ne prekriva dugme „Detalji”; po izboru saglasnosti ponovo radi po postojećim pravilima.
- Postojeći testovi ažurirani su za novi kontakt anchor i portfolio bez dodatnog naslovnog linka. Provera privatnosti dopunjena je stvarnim testom tastature.

## Stvarni Google pristup

Provereno direktno kroz vlasnikov ulogovani Search Console, ne samo imitacijom user-agent zaglavlja:

| URL | Google indeks | Poslednji smartphone Googlebot crawl u indeksnom izveštaju | Live test 18.11.2026. |
| --- | --- | --- | --- |
| `/sr/` | Indeksiran; Google canonical: pregledani URL | 17.11.2026. 05:03:02; crawl dozvoljen, preuzimanje uspešno, indeksiranje dozvoljeno | 21:09:20; Google Inspection Tool smartphone; dostupno, preuzimanje uspešno, crawl/index dozvoljeni |
| `/sr/cenovnik/` | Indeksiran; Google canonical: pregledani URL | 03.11.2026. 06:04:11; crawl dozvoljen, preuzimanje uspešno, indeksiranje dozvoljeno | 21:12:39; Google Inspection Tool smartphone; dostupno, preuzimanje uspešno, crawl/index dozvoljeni |
| `/sr/portfolio/ilic-enterijer/` | Indeksiran; Google canonical: pregledani URL | 11.11.2026. 14:45:33; crawl dozvoljen, preuzimanje uspešno, indeksiranje dozvoljeno | 21:14; URL dostupan Google-u i može da se indeksira |

Vremena su prikazana u Search Console UI, zona Europe/Belgrade. Live test koristi Google Inspection Tool i nije identičan redovnoj Googlebot poseti; istorijski deo posebno potvrđuje stvarni Googlebot. Dokazi ne potvrđuju opštu blokadu crawlera. Razlog 403 odgovora za imitaciju Googlebot-a sa test IP adrese nije nezavisno utvrđen; WAF/CDN podešavanja nisu menjana.

Search Console pregled pri pristupu navodi 73 indeksirane i 28 neindeksiranih stranica i nema CWV podataka. To su brojke trenutnog izveštaja, ne dijagnoza da svih 28 zahteva ispravku. Za portfolio URL indeksni deo je prikazao „Privremena greška u obradi” kod sitemap izvora uprkos uspešnom popisivanju i indeksiranju; nije utvrđeno da postoji kvar aktuelnog sitemap-a.

Nisu slati zahtevi za ponovno indeksiranje niti menjana Search Console podešavanja.

## SMTP provera

Nezavisna veza ka već podešenom SMTP hostu potvrdila je **validan sertifikat i TLS 1.3** sa `rejectUnauthorized: true`. U toj proveri nisu slati kredencijali ili email.

Nodemailer `verify()` sa postojećim lokalnim podacima završio se sa **EAUTH**. To sprečava potvrdu autentifikacije i isporuke u lokalnom okruženju. Ne dokazuje kvar produkcionih podataka, jer produkciona konfiguracija nije čitana. Email nije poslat, lozinka i nalog nisu menjani. Potrebno je proveriti tačnost lokalnih SMTP podataka pre kontrolisanog slanja.

## Validacija

- `npm run lint`: prošao.
- `npm run typecheck`: prošao; konačni production build takođe uključuje TypeScript proveru.
- `npm run build`: prošao. Prvi sandbox pokušaj nije mogao da preuzme postojeći Google font zbog DNS ograničenja; build sa dostupnom mrežom prošao je.
- Proširena browser provera kontakta, analitike, portfolija, usluga i lokalizacije: **106 testova prošlo**, oba jezika i 320–1920 px.
- Posle poslednje vizuelno otkrivene ispravke preklapanja: **12 dodatnih ciljanih testova prošlo** na konačnom build-u, uključujući SR/EN cookie detalje posle skrolovanja pri 320/375 px, Tab/Shift+Tab, Escape, povratak fokusa i SR kontakt/portfolio/usluge pri 375/1440 px.
- Vizuelno pregledani desktop i mobilni snimci kontakta, portfolija i usluga. Nema pronađenog horizontalnog prelivanja u testiranim prikazima. Očuvana čitljivost i tehnologije u portfolio sadržaju.
- `git diff --check`: prošao. Postojeće vlasnikove izmene portfolio evidencije i neobjavljeni blog materijali nisu menjani ovim zahvatom.

Izmene su lokalne; produkcija nije ponovo objavljena.
