# SEO izmene posle GSC i GA4 analize — 17.11.2026.

Osnova je [analiza korisnikovih izvoza](../seo/search-performance-2026-11-17.md). Prvi prioritet je postojeći cenovni klaster: vodič ima 642 prikaza bez klika, a cenovnik 77. Ovo je implementacija na sajtu; nije potvrda promene Google pozicija ili AI citata.

## Implementirano na SR i EN

- Cenovnik dobija konkretan naslov, opis i H1 za izradu sajta i aktuelne pakete. On ostaje izvor važeće NMark ponude, dok postojeći članak objašnjava planiranje budžeta.
- Numeričke početne cene paketa centralizovane su kroz `getWebsiteStartingPrice()`. Postojeće cene 300 / 550 / 900 / 1.200 EUR nisu menjane. Prikaz paketa i nova tabela u vodiču koriste isti izvor.
- Vodič odmah daje kratak odgovor sa NMark cenama i dodaje tabelu osnovnog obima. Širi rasponi ostaju označeni kao orijentacioni, a ne kao zvanični tržišni proseci ili NMark cenovnik.
- Vodič povezuje cenovnik, uslugu izrade sajta, web prodavnice i verifikovane projekte škole i Anabele. Cenovnik i relevantne usluge uzvraćaju link ka vodiču. Linkovi su dostupni u serverskom HTML-u i bez JavaScripta.
- Uklonjene su formulacije koje impliciraju poznate budžete klijenata bez dokaza, garantovane Google pozicije, obavezan rezultat 100/100 ili poseban Schema.org kod za sigurne AI citate. Opis SEO/AEO/GEO usluge sada objašnjava preklapanje i stvarni obim rada.
- `WebSite` entitet koristi domenski root i alternativni naziv `NMarkDesigns`. Identitet entiteta i lokalizovani canonical URL-ovi stranica ostaju dosledni.
- Ažurirani vodič čuva originalni datum objave 22.09.2026. i dobija datum izmene 17.11.2026. Datum ažuriranja sada je vidljiv i čitaocu, pored postojećih `dateModified` i Open Graph podataka.
- Sitemap koristi stvarne uredničke datume članaka za `lastmod`. Datum današnjeg builda se ne prikazuje kao izmena svih stranica.

## Provera javnog sajta pre objavljivanja izmena

Provereno 17.11.2026. običnim HTTPS zahtevima:

| URL | Trenutno ponašanje |
| --- | --- |
| `/sr/cenovnik/` | 200; self-canonical |
| `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/` | 200; self-canonical |
| `/sr/usluge/izrada-web-sajtova/` | 200; self-canonical |
| `/about/` | 308 → `/sr/o-nama/`, zatim 200 i odgovarajući canonical |
| `/portfolio/ilic-enterijer/` | 308 → `/sr/portfolio/ilic-enterijer/`, zatim 200 |
| `/portfolio/nest-home-solutions/` | 308 → `/sr/portfolio/#project-nest-home-solutions`, zatim 200; canonical portfolio stranice |

Ova preusmerenja već postoje, pa nisu dodavani spekulativni redirecti. HTTP dostupnost nije dokaz indeksiranja ili Google izabranog canonical URL-a.

## Validacija

- Završni `npm run build`, `npm run typecheck`, `npm run lint` i `git diff --check` prolaze.
- Dodata tri integraciona testa: SR/EN putanja vodič → cenovnik → usluga → vodič bez JavaScripta, cene i datumi, zatim domenski WebSite entitet i sitemap.
- Šira provera obuhvatila je 118 testova: 117 je odmah prošlo; jedno prethodno očekivanje zabranjivalo je svaki `lastmod` u sitemap-u. Test je usklađen sa stvarnim uredničkim datumima svih članaka. Zatim su na završnom buildu prošle sve tri ciljane provere: kompletan sitemap, jedinstveni metapodaci i preview robots, te SR/EN SEO usluga. Nema preostalih neuspešnih provera iz ovog ciklusa.
- Ručno pregledani cenovnik i vodič u Chrome-u na desktopu i širini 375 px. Mobilna tabela koristi postojeći prilagođeni prikaz; nema horizontalnog prelivanja.
- Pred commit i push, nakon dodavanja novog AI članka, prošli su završni produkcioni build, TypeScript, ESLint i **168/168** povezanih E2E provera. Ranije neuspešno očekivanje o odsustvu `lastmod` ostaje ispravljeno i prolazi u ovom kompletnom ciklusu.

## Posle objavljivanja

1. Proveriti GSC URL Inspection za cenovnik, vodič i uslugu: indeksiranje, izabrani canonical i poslednje preuzimanje. Po potrebi tražiti ponovno indeksiranje značajno ažuriranog vodiča.
2. U GA4 nalogu potvrditi `generate_lead` kao key event i proveriti landing-page × source/medium × lead podatke za isti period kao GSC. Prazna sekcija u izvozu ne dokazuje nula upita; kod već šalje događaj posle uspešno prihvaćenog kontakta.
3. Posebno proveriti pristup pretraživačkim botovima na CDN/WAF nivou i dostupne Bing AI Performance podatke. Nisu menjana pravila pristupa botovima ili politika treniranja modela.
4. Porediti sledeći jednak period prema relevantnim upitima i stvarnim upitima klijenata, uz mali početni uzorak.

U trenutku završetka ovog SEO ciklusa novi blog još nije bio aktiviran. Naknadno je korisnik izabrao temu AI vidljivosti i dodat je [novi članak na oba jezika](../seo/blog-ai-business-check-2026-11-17.md). GA4/GSC podešavanja i zahtevi za indeksiranje nisu menjani. Produkciono objavljivanje nije potvrđeno ovim izveštajem.
