# Blog: AI vidljivost biznisa — 17.11.2026.

Korisnik je izabrao praktičnu proveru AI vidljivosti, uz zakazani naslov „Da li AI može da pronađe i preporuči vaš biznis?”.

## Urednička odluka

- Novi članak je postupak za vlasnika biznisa: pitanja, beleženje odgovora, provera izvora i prioritizacija popravki. Postojeći tekstovi objašnjavaju AI pretragu i SEO/AEO/GEO, pa se definicije ne ponavljaju kao glavni sadržaj.
- Aktuelni povod su Business Hub i dostupni AI izveštaji, provereni u primarnim izvorima 17.11.2026. To nije tvrdnja o Google Trends obimu ili garancija rasta saobraćaja.
- Alternativa o ponudi za izradu sajta ostaje neaktivni nacrt; nije dodavana druga objava za isti datum.
- SR original i prirodna EN verzija imaju datum 17.11.2026, isti slug i lokalizovane metadata/structured-data vrednosti kroz postojeću infrastrukturu.
- Tekst uključuje dva obrasca u tabelama, konkretne primere upita i plan provere. Ne prikazuje izmišljene rezultate testiranja određenog AI asistenta ili klijenta.
- Hostinger partnerstvo je kratko pomenuto u delu o dostupnosti/hostingu, uz interni link ka detaljima i uslovima. Nije predstavljeno kao ranking signal ili osnova za AI preporuku. Nema dodatnog direktnog affiliate linka u članku.
- Naslovna ilustracija prati postojeći vektorski stil bloga: pitanje → provera poslovne stranice → beleška. SVG izvornik i optimizovani WebP 1600 × 1000, oko 19 KB. Nije snimak korisničkog interfejsa niti rezultat AI testa.

## Provereni izvori i granice

1. [Google — Generative AI performance report](https://support.google.com/webmasters/answer/16984139): impresije za podržane funkcije, ne zaseban AI click report. Nedostatak dovoljnog broja impresija može objasniti odsustvo izveštaja. Dostavljeni korisnikov ZIP ne sadrži ovaj izvoz.
2. [Google — Search generative AI control](https://support.google.com/webmasters/answer/16908024): zasebna kontrola uključivanja i nasleđivanje na svojstvima. Stvarni status NMark svojstva nije ovim radom potvrđen ili promenjen.
3. [Google — aktuelni vodič za AI pretragu](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): relevantan koristan sadržaj i tehnički pristup ostaju osnova. Nema obećanja AI citata.
4. [OpenAI — Business Hub](https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt): podobnost zavisi od lokacije/tipa, verifikacije su potrebne za određene funkcije, a agenti imaju zasebna US ograničenja. Ne tvrditi da su svi lokalni biznisi u Srbiji podržani. Claim nije garancija preporuke. NMark nalog nije prijavljivan ili verifikovan ovim radom.
5. [OpenAI — botovi](https://developers.openai.com/api/docs/bots): pretraživački pristup odvojen od odluke o treniranju.
6. [Bing — AI Visibility Insights](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/): podržane Microsoft površine i odabrani partneri, ne sve platforme.

Stariji AI Search vodič dopunjen je aktuelnom informacijom o Google AI izveštaju i uklonjenom nepotkrepljenom generalizacijom o kvalitetu AI referral saobraćaja. Zadržan je datum originalne objave, a promenjen stvarni datum ažuriranja.

## Status validacije

ESLint, TypeScript i diff provera prolaze. Novi članak se otvara na postojećem Next.js razvojnom serveru; pregledani SR/EN prikazi na 375, 430, 768, 1024, 1440 i 1920 px, bez horizontalnog prelivanja. Provereni su učitavanje ilustracije, jedan H1, canonical/hreflang, BlogPosting datum na oba jezika, interni partnerski link do vidljive ponude, promena jezika, istaknuta objava u blog listi i oba sitemap unosa sa datumom 17.11.2026.

Pred commit i push produkcioni build je uspešno izvršen, uključujući novu objavu; prethodna blokada automatskog odobrenja zbog limita korišćenja više nije aktivna. Prošli su i završni ESLint, TypeScript i svih **168 povezanih E2E testova** za blog, SEO, komercijalni sadržaj, analitiku, Hostinger, cenovnik i usluge. Postojeći blog testovi automatski obuhvataju novu objavu i prolaze za oba jezika, slike, navigaciju, strukturirane podatke, axe proveru i responzivni prikaz.

Članak je lokalno dodat u javni inventar i blog, ali nije deployovan. Predviđeni javni SR URL je `/sr/blog/da-li-ai-moze-da-pronadje-vas-biznis/`; EN koristi isti slug pod `/en/blog/`.
