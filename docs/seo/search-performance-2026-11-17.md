# NMark Designs — analiza pretrage i saobraćaja

Analiza od 17. novembra 2026. Izvori: korisnikov Search Console ZIP `https___nmarkdesigns.com_-Performance-on-Search-2026-11-17.zip` i GA4 CSV `Преглед_извештаја (2).csv` iz Downloads direktorijuma. Izvori nisu menjani. Analiza obuhvata sve redove oba izvoza i relevantnu postojeću strukturu sajta.

Naknadno odobrene izmene na sajtu evidentirane su u [izveštaju o implementaciji](../implementation/seo-commercial-content-2026-11-17.md). Nalazi ispod predstavljaju početno stanje iz analize, a ne tvrdnju da sve preporuke i dalje čekaju implementaciju.

## Sažetak podataka

| Pokazatelj | Vrednost | Tumačenje |
| --- | --- | --- |
| GSC stvarni period iz dnevnih redova | 19.10–15.11.2026. | 28 dana; datum imena ZIP-a nije kraj serije |
| GSC klikovi / prikazi | 24 / 1.672 | CTR = 24 / 1.672 = 1,44% |
| GSC prosečna pozicija | približno 32,17 | Ponderisana dnevnim prikazima; dnevne pozicije su zaokružene |
| Prvih / drugih 14 dana | 9 / 15 klikova; 793 / 879 prikaza | +6 klikova i +86 prikaza; mali uzorak, bez zaključka o uzroku |
| GA4 period | 20.10–16.11.2026. | Pomeren jedan dan u odnosu na GSC |
| GA4 aktivni / novi korisnici | 8 / 5 | Nije isto što i klik ili sesija |
| GA4 sesije | 34 | Zbir pet izvezenih izvora sesije |
| GA4 prikazi stranica | 230 | Zbir 20 izvezenih naslova; ne pretpostavljati da je izvoz kompletan inventar svih prikaza |
| GA4 događaji | 390 | Ukupni događaji nisu broj upita |
| Prosečno angažovanje / aktivni korisnik | 197,375 sekundi | Oko 3 min 17 s; nije trajanje prosečne sesije |

### Granice podataka

GSC tabela upita sadrži 96 redova, 933 prikaza i samo dva klika. To nije ceo organski promet: nevidljivi/anonomizovani upiti i različite agregacije sprečavaju izjednačavanje sa ukupnim redom. Tabela stranica daje 1.790 prikaza; taj zbir takođe ne zamenjuje ukupnih 1.672. Broj prikaza zavisi i od grupisanja rezultata po stranici odnosno svojstvu. Ne računati tržišni udeo iz vidljivih upita.

GA4 ključni događaji su prazna sekcija, ne potvrđena nula konverzija. Nedostaju landing-page × session-source × lead podaci, status saglasnosti i spisak događaja. Razliku između 24 GSC klika i osam GA4 Google sesija mogu objašnjavati različiti periodi, metodologija i saglasnost; iz ovih fajlova nije moguće odrediti udeo svakog uzroka.

Nije moguće utvrditi da su korisnici vlasnik sajta, botovi ili klijenti. Veliki broj ponovljenih prikaza uz osam korisnika je razlog da se proveri interno/test saobraćaj, a ne dokaz da je prisutan. Izvoz nije izvor za Search Console indeksiranje, CWV terenske rezultate ili AI citate.

## Gde je najveća poslovna prilika

| Stranica / upit | Klikovi | Prikazi | Pozicija | Predlog |
| --- | ---: | ---: | ---: | --- |
| SR vodič o ceni sajta | 0 | 642 | 69,47 | Prvi prioritet za sadržaj, interne linkove i dokazanu relevantnost |
| SR cenovnik | 0 | 77 | 61,55 | Jasno razlikovati aktuelnu ponudu od uredničkog tržišnog vodiča |
| `izrada sajta cena` | 0 | 127 | 79,20 | Raditi na rangiranju i nameri; naslov sam neće rešiti poziciju |
| `izrada web sajta cena` | 0 | 81 | 63,99 | Isti tematski klaster; bez posebne stranice za svaku varijantu |
| `ponuda za izradu web sajta` | 0 | 6 | 33,33 | Mali ali relevantan signal za pomoćni vodič o specifikaciji ponude |
| `nmark` | 0 | 135 | 6,51 | Ispitati nameru i prikazane URL-ove pre promene brenda ili naslova |
| EN iPhone članak | 9 | 405 | 7,49 | Zadržati korisno, proveriti stvarne ulazne upite i komercijalnu putanju |
| EN GTA članak | 3 | 64 | 6,12 | Zajedno sa iPhone člankom donosi 50% svih klikova |
| SR AI chatbot članak | 0 | 15 | 4,93 | Pratiti relevantnost upita i snippet; uzorak premali za CTR eksperiment |

Vidljivih 34 upita koji sadrže `cena`, `cene`, `cijene`, `košta`, `kosta` ili `cost` daju 613 prikaza bez klika. Ovo je leksička grupa unutar izvezene tabele, ne search volume, broj ljudi ili dokazana pripadnost određenoj stranici. Izvoz nema spoj query × page, pa kanibalizacija nije potvrđena.

Srbija: 10 klikova, 811 prikaza, pozicija 58,1. SAD: tri klika, 214 prikaza, pozicija 8,7. Različit miks upita objašnjava zašto globalna prosečna pozicija nije dobar samostalni cilj za srpske komercijalne upite.

Mobilni: 12/385, CTR 3,12%, pozicija 14,04. Desktop: 11/1.276, CTR 0,86%, pozicija 37,83. Ova razlika ne dokazuje problem desktop dizajna ili brzine; razlikuju se i pozicije i namere pretrage.

GA4 izvori sesija: direct 16, google/organic 8, casovifrancuskog.rs/referral 7, frankultura.rs/referral 2, Instagram/referral 1. First-user acquisition (četiri Google aktivna korisnika) ne mešati sa session acquisition (osam Google sesija). Kontakt ima 20 prikaza i dva aktivna korisnika; to nisu 20 ili dva potvrđena upita.

## Prioriteti za naredni ciklus

### P1 — pouzdano meriti interesovanje i stvarne upite

1. U GA4 proveriti da li je `generate_lead` podešen kao key event i da li postoji u Events izveštaju. Kod već šalje događaj tek posle uspešnog SMTP prihvatanja. Prazan overview nije dokaz da implementacija ne radi.
2. Posebno pratiti `contact_direct`, `click_cta` i partnerske klikove. Klik na telefon ili partnera nije automatski prodaja ili upit.
3. Izvesti landing page + session source/medium + sessions + engaged sessions + key events za isti period kao GSC. Za preciznije tumačenje tražiti agregirane podatke o saglasnosti, bez zaobilaženja cookie izbora.
4. Proveriti interne/test posete i ispravno primeniti odgovarajuće GA4 filtere tek nakon provere; ne filtrirati sve korisnike iz jednog grada ili zemlje.

### P1 — cenovni klaster koji vodi do ponude

- Cenovnik ostaje vlasnik aktuelnih NMark paketa; vodič o cenama objašnjava budžet, obim i razlike. U njemu jasno razdvojiti sopstvene cene od ilustrativnih tržišnih raspona i proveriti zastarele izvore pre ažuriranja.
- Dodati jasnu dvosmernu vezu vodič ↔ cenovnik ↔ usluga izrade sajta, uz jedan sledeći korak ka kontaktu.
- Novi vodič o ponudi treba da donese upotrebljiv brief, tabelu za poređenje obima i kriterijume predaje. Ne pisati još jednu verziju „koliko košta sajt” za isti upit.
- Verifikovane studije slučaja povezati tamo gde objašnjavaju konkretan tip obima. Ne dodavati izmišljeni ROI, klijentske budžete ili SEO rezultate.
- Jedan tekst nedeljno ima smisla samo kada popunjava novo stvarno pitanje; ažuriranje postojećeg vodiča može biti vrednije od dodatnog sličnog posta.

### P2 — brend, poverenje i lokalna prisutnost

- Za `nmark` izvesti query × page i query × country; naziv može imati više značenja. Nije potvrđeno da svih 135 prikaza pripada osobama koje traže NMark Designs.
- Dosledno koristiti NMark Designs i proverene podatke o autoru, uslugama, kontaktu i projektima. Proveriti stvarni Google Business Profile i Bing Places profil ako postoje; ne izmišljati adresu niti praviti slične city stranice bez zasebnog sadržaja.
- `WebSite` schema trenutno ima naziv, ali URL pokazuje na `/sr/`. Proveriti Google prikaz naziva za domenski root koji preusmerava na `/sr/` pre promene arhitekture. Dodavanje alternativnog naziva nije garancija za brendirani CTR.
- Ne kupovati linkove ili lažne recenzije. Prioritet su stvarne klijentske reference, odgovarajući poslovni profili i relevantna pominjanja uz dozvolu.

### P2 — tehnička dostupnost i migracija

Kod već centralizuje lokalizovane canonical i hreflang oznake, inventar javnih stranica i sitemap. Novi blog automatski ulazi u taj inventar.

Javno provereno 17.11: `robots.txt` dozvoljava `User-Agent: *` i navodi sitemap. `/about/` vraća 308 ka `/sr/o-nama/`. Pojavljivanje starih URL-ova u istorijskom izvozu nije dokaz da danas nedostaju redirecti. Ostale stare URL-ove proveriti pojedinačno, uključujući `/portfolio/nest-home-solutions/`; ne dodavati catch-all ili izmišljeno novo odredište.

U GSC URL Inspection proveriti indeksiranje vodiča, cenovnika i nove objave, izabrani canonical i poslednje preuzimanje. Dostupnost za AI botove proveriti i na hosting/CDN/WAF nivou: dopuštajući robots nije dokaz da CDN ne blokira zahtev. Preview zabrane indeksiranja ostaju.

## SEO, AIO, AEO i GEO — praktični zadaci

SEO: relevantna namera, indeksiranje, korisna stranica, jasne interne veze i stvarni dokazi. AIO se ovde odnosi na vidljivost u AI rezultatima; AEO na direktne odgovore; GEO na korišćenje sadržaja kao izvora u generativnim odgovorima. To nisu četiri odvojena tehnička standarda.

Prema Google smernicama, za AI rezultate nisu potrebni poseban AI fajl ni posebna schema. Koristan fokus su tekstualno dostupne informacije i strukturirani podaci koji odgovaraju vidljivom sadržaju. FAQ rich rezultati su ukinuti od 7. maja 2026; korisna FAQ sekcija i dalje ima uredničku ulogu.

Za ChatGPT proveriti pristup OAI-SearchBot-u; odluka o GPTBot treniranju je zasebna. Za Bing/Copilot koristiti AI Performance u Webmaster Tools-u, koji ne meri sve AI platforme. U dostavljenim fajlovima nema podataka o AI citatima; odsustvo AI referral reda nije dokaz odsustva vidljivosti.

Dopuna posle istraživanja teme bloga: proveriti i aktuelni Google Generative AI performance izveštaj za impresije i Search generative AI podešavanje. OpenAI Business Hub može dati dodatne podatke za podobne, verifikovane firme, ali dostupnost NMark nalogu nije potvrđena. Izvori i granice su u [belešci za novi blog](blog-ai-business-check-2026-11-17.md).

Za pitanja klijenata održavati mali kontrolni uzorak: datum, jezik, pitanje, platforma, citirani URL i tačnost odgovora. Citati, posete i upiti su različiti ishodi. Ne izvoditi procenat ukupne AI vidljivosti iz ručnog uzorka.

## Predlog današnje objave

**Preporučena tema:** „Ponuda za izradu sajta: šta treba da sadrži i kako uporediti cene”.

Razlog je postojeći relevantan upit i snažniji cenovni klaster, uz prostor za specifičan praktičan odgovor. Šest prikaza nije dovoljan dokaz velike potražnje; temu podržava i poslovna blizina odluci o kupovini. Alternativa je održavanje sajta, sa tri vidljiva prikaza i niskom pozicijom, pa je drugi izbor.

Plan: SR original i prirodna EN verzija, datum 17.11.2026, odgovor na početku, jedan primenljiv brief, primer poređenja označen kao ilustracija, kriterijumi SEO/pristupačnosti i predaje, izvori, autor, interna veza ka cenovniku i cenovnom vodiču. Nema garancija rangiranja ni AI citata. Postojeći članak o cenama ostaje glavni odgovor na cenu; novi tekst pokriva procenu ponude.

## Kako proceniti napredak

Sledeći uporedivi period: isti broj dana i iste dimenzije u oba alata. Pratiti prikaze i klikove srpskog cenovnog klastera, broj relevantnih ulaznih stranica, angažovane sesije i potvrđene upite. Posle objave prvo proveriti otkrivanje i indeksiranje; tek zatim trendove upita i kontakata. Broj novih postova, schema blokova ili stranica u sitemap-u nije rezultat sam po sebi.

## Zvanični izvori, provereni 17.11.2026.

- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google — dokumentacione izmene, ukidanje FAQ rezultata](https://developers.google.com/search/updates)
- [Google — site names](https://developers.google.com/search/docs/appearance/site-names)
- [Google — Search Console performance overview](https://support.google.com/webmasters/answer/7576553?hl=en)
- [OpenAI — crawlers](https://developers.openai.com/api/docs/bots)
- [Bing — AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)

GA4/hPanel/GSC podešavanja, objavljivanje sajta i slanje zahteva za indeksiranje nisu menjani ovom analizom.
