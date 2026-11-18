# US cene paketa — 18.11.2026.

Vlasnik je odobrio sledeće početne cene za US tržište na engleskoj verziji:

| Paket | US / EN, USD | Srbija / SR, EUR |
| --- | ---: | ---: |
| Landing stranica | $750 | 300 € |
| Poslovni sajt | $1,500 | 550 € |
| Napredni sajt | $2,500 | 900 € |
| Web prodavnica | $3,500 | 1.200 € |

## Implementacija

- `content/pricing.ts` je centralni izvor iznosa za oba tržišta. Postojeće EUR vrednosti su očuvane. `getWebsiteStartingPrice` podržava locale, a `formatWebsiteStartingPrice` obezbeđuje dosledan prikaz valute i hiljada.
- Usklađeni su EN cenovnik, metadata, pregled usluga, detalji izrade sajta i prodavnice, homepage FAQ i početne kontakt poruke za sva četiri paketa.
- Postojeći Service/Offer JSON-LD i WebPage metadata sada koriste novu US ponudu preko zajedničkog sadržaja.
- EN verzije vodiča o ceni i poređenja WordPress/Next.js usklađene su tamo gde citiraju aktuelne NMark pakete. Tržišne analize za Srbiju i ilustrativne računice ostaju u EUR, sa jasnim razdvajanjem od US ponude. Datumi stvarno ažuriranih članaka i sitemap lastmod su ažurirani.
- `llms.txt` navodi obe ponude i objašnjava da su USD iznosi zasebne tržišne cene.
- Dodatne usluge, održavanje i hosting zadržavaju postojeće iznose i valute. Ta razlika je objašnjena na EN cenovniku.
- Nema promena URL-ova, opisa obima paketa ili automatskog izbora cena prema IP adresi. Jezička ruta i dalje određuje prikaz.

## Validacija

- Production build sa TypeScript proverom: prošao.
- ESLint: prošao.
- Browser provera: 52 testa prošla (cenovnik, usluge, komercijalni SEO i korisničke putanje). Provereni SR i EN prikazi pri 320–1920 px, kontakt poruke za sva četiri US paketa, metadata, Service/Offer schema i `llms.txt`.
- Vizuelno pregledani EN cenovnik na 375 i 1440 px; iznosi su čitljivi i nema pronađenog prelivanja.
- `git diff --check`: prošao.

Izmene su lokalne i nisu objavljene na produkciji.
