# Hostinger partnerska ponuda

Implementirano 17. novembra 2026, nakon [pregleda integracije](../audit/hostinger-partner-review-2026-11-17.md).

Posetilac sada sa početne stranice ili iz footera dolazi do lokalizovanih detalja ponude u cenovniku, zatim može da otvori potvrđeni partnerski link ili kopira kupon. Uslovi, napomena o proviziji i razlika između kupovine hostinga i NMark održavanja dostupni su pre odlaska kod provajdera.

## Promene

- `content/partners.ts` sadrži SR/EN partnerske tekstove, uslove i pristup potvrđenom URL-u/kuponu iz `content/site.ts`.
- Hero ima diskretnu poruku o popustu i interni link ka `#hostinger-partner`; footer vodi na isto mesto.
- `HostingerOffer` prikazuje iste uslove u cenovniku, održavanju i dva relevantna blog teksta. Partnerski linkovi su označeni sa `sponsored noopener noreferrer` i najavljuju otvaranje novog taba.
- `CopyPartnerCode` koristi Clipboard API, prikazuje stanje kopiranja, uspeh i oporavak pri neuspehu kroz lokalizovani live status. Kupon i link su dostupni i bez JavaScript-a; dugme tada ostaje onemogućeno, a tekst koda se može označiti i kopirati.
- Blog izvori su odvojeni od komercijalne ponude. Uklonjene su nepodržane tvrdnje uz hosting preporuku i netačni CWV rezultati u `llms.txt`.
- Osnovne cene održavanja izvode se iz postojećih podataka: hosting od 30 €/god, Basic Care od 25 €/mes, Business Care od 50 €/mes. EN detalj održavanja i njegov schema Offer koriste EUR.
- Obim održavanja usklađen je sa paketima: provere rezervnih kopija zavise od okruženja, a obrada zahteva od ugovorenog obima. Uklonjena su obećanja povratka u minuti i trenutne intervencije.

## Analitika

Novi događaji prolaze kroz postojeću saglasnost, proveru produkcionog okruženja i dozvoljenu listu parametara:

| Događaj | Parametri | Kada se šalje |
| --- | --- | --- |
| `click_cta` | `cta_name=hostinger_details`, `cta_location`, `locale` | Klik na interne detalje iz hero/footer dela |
| `click_partner` | `partner_name`, `partner_placement`, `locale`, `destination_domain` | Klik na spoljnu ponudu |
| `copy_partner_code` | `partner_name`, `partner_placement`, `locale` | Posle uspešnog kopiranja |

Kopiranje funkcioniše i bez saglasnosti za analitiku. Neuspešno kopiranje ne šalje događaj uspeha. Ovi događaji mere interesovanje, a kupovinu i proviziju potvrđuje Hostinger evidencija.

## Provera

Završni produkcioni build, ESLint i eksplicitni TypeScript check prošli su. `git diff --check` je čist.

- Širi E2E prolaz: **190/190** — partnerstvo, foundation, lokalizacija, cenovnik, usluge, analitika, SEO i blog.
- Posle vizuelne dorade i dodavanja regresione provere cene/valute: **24/24** ciljanih provera — 20 partnerskih scenarija i četiri postojeće blog provere.
- Postojeće responsive provere obuhvataju 320, 375, 430, 768, 1024, 1280, 1440 i 1920 px gde je predviđeno odgovarajućim skupom testova, uz postojeće axe provere.

Novi `tests/hostinger.spec.ts` pokriva SR/EN putanju do ponude, uslove na više stranica, oznake spoljnih linkova, kopiranje i neuspeh clipboard-a, rad bez JavaScript-a, saglasnost za analitiku, granice prikaza na 375/1440 px i usklađenost cene održavanja sa schema valutom. Spoljna Hostinger navigacija u testovima koristi lokalni stub; testovi ne kontaktiraju checkout.

Vizuelni pregled kroz CUA obuhvatio je SR hero i ponudu na 375 px, desktop hero, EN ponudu na 1440 px i SR blog ponudu. Jedina naknadna vizuelna dorada ograničava nasleđene razmake pasusa unutar blog partnerskog bloka.

## Pre objavljivanja

Ranije utvrđena nejasnoća između opštih referral ograničenja i Partner Program javne promocije ostaje otvorena za pisanu potvrdu Hostinger partner tima. Predlog pitanja je sačuvan u prvobitnom pregledu. Nikakva poruka nije poslata u ime vlasnika.

Nisu rađeni deploy, test kupovina, izmena Hostinger naloga ili GA4 podešavanja. Postojeće korisnikove izmene portfolio/reference dokumenata sačuvane su. Nema novih zavisnosti.
