# Phase 2B: Local SEO, Commercial Search Intent & Structured Data Implementation Report

**Project:** NMark Designs (https://nmarkdesigns.com)  
**Branch / Worktree:** `website_audit_phase_zero`  
**Date:** October 11, 2026  
**Status:** **Completed & Verified** (Lint, Typecheck, Build, 48/48 SEO E2E Tests, 26/26 Contact & Security E2E Tests Passing)

---

## 1. Executive Summary & Problem Analysis

In Phase 2A, the technical indexing foundation (canonical URLs, sitemap, robots, and legacy 308 redirects) was audited and established. However, the commercial and local search performance revealed significant untapped opportunities based on Google Search Console (GSC) data for September 9 – October 6, 2026:

1. **Total Baseline (28-day GSC):**
   - 35 organic clicks, ~1,130 impressions, 3.1% CTR, 13.1 average position.
   - Serbia segment: 338 impressions, 3 clicks, average position 25.6 (~0.9% CTR).
   - ~85% of organic clicks were captured by a single international conceptual article (`/en/blog/iphone-duo-responsive-web-dizajn/`), which does not drive commercial leads for agency web development.
2. **High-Intent Serbian Commercial Search Queries:**
   - `"izrada web sajta"`: 65 impressions, position 6.37, 0 clicks.
   - `"koliko kosta izrada sajta"`: 18 impressions, position 6.89, 0 clicks.
   - `"cena izrade sajta"`: 21 impressions, position 31.95, 0 clicks.
   - `"izrada web sajta cena"`: 21 impressions, position 66.9, 0 clicks.
   - Landing page `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/`: 282 impressions, position 29, 0 clicks.
3. **Core Identified Deficiencies:**
   - Complete absence of geographic entity grounding (Belgrade / Serbia) across the core homepage, services, about, and contact copy.
   - The pricing guide blog post was isolated, lacking bidirectional links to the pricing page (`/sr/cenovnik/`) and services page (`/sr/usluge/`).
   - The Services page lacked structured JSON-LD schema describing offerings.
   - The pricing page lacked commercial query intent coverage for "koliko košta izrada sajta" and e-commerce web shop pricing.

---

## 2. Files Modified

| File | Type | Nature of Modification |
|---|---|---|
| `content/i18n/types.ts` | Type Definition | Added optional `guideBanner` to `Dictionary["pricing"]`. |
| `content/i18n/sr.ts` | Localization / Content | Updated metadata, hero, services, cta, about, contact, and pricing copy with Belgrade/Serbia geographic context and commercial intent. |
| `content/i18n/en.ts` | Localization / Content | Added matching `guideBanner`, note, and FAQs to English pricing to ensure strict type alignment and international parity. |
| `content/blog.ts` | Content / Metadata | Refined `seoTitle` and `description` of the pricing guide blog post for maximum CTR on cost queries. |
| `content/blog-pricing-guide.ts` | Editorial Content | Added explicit mentions of verified NMark Designs packages (Basic 450 €, Standard 650 €, Premium 1.000 €), verified portfolio references, and enriched `linkList`. |
| `components/pricing/PricingPage.tsx` | UI Component | Rendered accessible, responsive `guideBanner` section linking directly to the pricing guide post. |
| `lib/schema.ts` | Structured Data | Added `servicesSchema` generating valid `Service` schema for the 6 core offerings under `provider: { @id: organizationId }`. |
| `app/[locale]/[page]/page.tsx` | Route Component | Injected `servicesSchema` JSON-LD on `/sr/usluge/` and `/en/services/`. |
| `tests/seo.spec.ts` | Test Suite | Updated schema test assertions to verify `Service` schema on services routes without breaking strict anti-spam schema assertions. |

---

## 3. Original vs. Updated Important SEO Copy (Before / After)

### 3.1 Homepage (`/sr/`)

| Element | Before (Phase 2A) | After (Phase 2B) |
|---|---|---|
| **Meta Title** | `Izrada web sajtova i web dizajn` | `Izrada web sajtova i web dizajn — Beograd i Srbija` |
| **Meta Description** | `NMark Designs kreira moderne, brze i responsive web sajtove za male biznise, preduzetnike i brendove, uz web dizajn, razvoj, SEO optimizaciju i održavanje.` | `Profesionalna izrada modernih, brzih i SEO optimizovanih web sajtova u Beogradu i Srbiji. Prilagođen dizajn, WordPress i custom rešenja koja donose upite.` |
| **Hero Description** | `Kreiramo brze, responzivne i SEO optimizovane web sajtove sa fokusom na moderan dizajn, korisničko iskustvo i kvalitetnu tehničku osnovu.` | `Kreiramo brze, responzivne i SEO optimizovane web sajtove za preduzetnike i kompanije u Beogradu, Srbiji i inostranstvu. Fokus na čistom dizajnu, tehničkoj stabilnosti i jasnim upitima kupaca.` |
| **Services Eyebrow** | `Vaša online prisutnost zaslužuje više` | `Usluge web dizajna i razvoja` |
| **Services Description** | `Od dizajna i SEO optimizacije do prilagođavanja različitim uređajima i redovnog održavanja.` | `Od dizajna i SEO optimizacije do prilagođavanja različitim uređajima, transparentnih paketa cena i redovnog održavanja.` |
| **CTA Eyebrow** | `Ne dozvolite da vaš biznis ostane nevidljiv` | `Razgovarajmo o vašem sajtu` |
| **CTA Description** | `Kontaktirajte nas za besplatnu konsultaciju i saznajte kako možemo zajedno unaprediti vašu digitalnu prisutnost.` | `Planirate novi sajt ili redizajn postojećeg? Javite nam se za besplatnu konsultaciju i okvirnu procenu za vaš projekat u Beogradu ili online.` |

### 3.2 Services Page (`/sr/usluge/`)

| Element | Before (Phase 2A) | After (Phase 2B) |
|---|---|---|
| **Meta Title** | `Usluge izrade web sajtova i web dizajna` | `Usluge izrade web sajtova, web dizajna i razvoja` |
| **Meta Description** | `NMark Designs usluge obuhvataju izradu web sajtova, web dizajn, razvoj, SEO osnovu, optimizaciju performansi, web prodavnice i održavanje.` | `Usluge izrade sajtova, redizajna, e-commerce web prodavnica, WordPress i custom razvoja, SEO osnove i održavanja za firme u Beogradu, Srbiji i inostranstvu.` |
| **Intro Description** | `Pomažemo malim biznisima, preduzetnicima, frilenserima i lokalnim brendovima da dobiju moderan, jasan i tehnički stabilan web sajt.` | `Pomažemo malim biznisima, preduzetnicima, frilenserima i brendovima u Beogradu i širom Srbije da dobiju moderan, jasan i tehnički stabilan web sajt.` |
| **Pricing Section Copy** | `Cenovnik daje početni okvir, a konačna procena zavisi od obima, sadržaja i funkcionalnosti projekta.` | `Cenovnik daje početni okvir, a konačna procena zavisi od obima, sadržaja i funkcionalnosti projekta. Na raspolaganju su Basic (450 €), Standard (650 €) i Premium (1.000 €) paketi.` |

### 3.3 Pricing Page (`/sr/cenovnik/`)

| Element | Before (Phase 2A) | After (Phase 2B) |
|---|---|---|
| **Meta Title** | `Cenovnik izrade web sajtova` | `Cenovnik izrade web sajtova — Koliko košta sajt` |
| **Meta Description** | `Pogledajte okvirne NMark Designs pakete za izradu web sajta: Basic plan, Standard Plan i Premium plan. Cene zavise od složenosti i zahteva projekta.` | `Jasne i transparentne cene izrade sajta u Srbiji: Basic (450 €), Standard (650 €) i Premium (1.000 €). Saznajte šta utiče na cenu i zatražite procenu.` |
| **Intro Eyebrow** | `Cene izrade sajta` | `Cena izrade web sajta` |
| **Intro Title** | `Pronađite plan koji vam odgovara` | `Transparentne cene i paketi izrade sajta` |
| **Intro Description** | `Cene su okvirne i mogu varirati u zavisnosti od složenosti i specifičnih zahteva vašeg projekta...` | `Koliko košta izrada sajta? Naši paketi pružaju jasan početni okvir: Basic od 450 €, Standard od 650 € i Premium od 1.000 €. Konačna cena zavisi od složenosti i obima, a za veće internet prodavnice i custom sisteme izrađujemo ponudu po meri.` |
| **Guide Banner** | *(Nije postojalo)* | *„Želite detaljniji uvid u troškove izrade sajta u Srbiji?“* sa linkom ka blog vodiču |
| **New FAQs** | *(5 osnovnih pitanja)* | Dodata 2 nova pitanja: o ceni izrade internet prodavnice i linku ka detaljnom vodiču kroz cene |

### 3.4 About Page (`/sr/o-nama/`) & Contact Page (`/sr/kontakt/`)

| Page | Element | Before | After |
|---|---|---|---|
| **About** | Meta Title | `O meni - NMark Designs` | `O meni — Nikola Marković, web dizajner i developer` |
| **About** | Meta Description | `NMark Designs je rad Nikole Markovića na dizajnu, izradi i održavanju...` | `Upoznajte Nikolu Markovića, kreatora NMark Designs studija iz Beograda. Izrada modernih web sajtova, prilagođen dizajn i tehnička podrška za preduzetnike.` |
| **About** | Bio Paragraph 1 | `Ja sam Nikola Marković, frontend developer koji kroz NMark Designs...` | `Ja sam Nikola Marković, frontend developer iz Beograda koji kroz NMark Designs spaja moderan web dizajn, strukturu sadržaja i tehničku izradu u brz i funkcionalan sajt za klijente u Srbiji i inostranstvu.` |
| **Contact** | Meta Title | `Kontakt` | `Kontakt — Zatražite ponudu za izradu sajta` |
| **Contact** | Meta Description | `Razgovarajte sa NMark Designs o izradi ili održavanju sajta i zatražite ponudu...` | `Kontaktirajte NMark Designs za izradu novog sajta, redizajn ili tehničko održavanje. Dostupni za saradnju u Beogradu, širom Srbije i online.` |
| **Contact** | Details Description | `Imate pitanje, ideju ili želite ponudu? Pozovite nas ili nam pišite.` | `Dostupni za saradnju sa klijentima u Beogradu, širom Srbije i online sa partnerima iz inostranstva. Pozovite nas ili pošaljite poruku za besplatnu konsultaciju.` |

### 3.5 Pricing Guide Blog Post (`/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/`)

| Element | Before | After |
|---|---|---|
| **SEO Title** | `Koliko košta izrada web sajta u Srbiji 2026? Cene i vodič` | `Cena Izrade Web Sajta u Srbiji 2026: Koliko Košta Sajt i Vodič` |
| **Description** | `Saznajte koliko košta izrada web sajta u Srbiji 2026. Uporedili smo cene poslovnih sajtova, WordPress rešenja, web shopova i custom razvoja.` | `Koliko košta izrada web sajta u Srbiji 2026? Detaljan vodič kroz cene i troškove: poslovni sajtovi, WordPress, internet prodavnice i NMark Designs paketi.` |
| **Editorial Inclusions** | Apstraktni opisi bez pominjanja agencijskih paketa | Povezano sa NMark Designs paketima (Basic 450 €, Standard 650 €, Premium 1.000 €) i projektima (OŠ „Dule Karaklajić“, Buy Pallet Jacks, Nest Home Solutions) |

---

## 4. Keyword-to-Page Mapping

| Target Query (GSC Baseline) | Target Primary URL | Supporting URL | Intent Type | Optimization Implemented |
|---|---|---|---|---|
| `"izrada web sajta"` | `/sr/` | `/sr/usluge/` | Commercial | Geographic grounding (Beograd & Srbija), value proposition, service overview. |
| `"izrada web sajtova beograd"` | `/sr/` | `/sr/kontakt/` | Local Commercial | Natural Beograd/Srbija presence without fake storefront claims. |
| `"koliko kosta izrada sajta"` | `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/` | `/sr/cenovnik/` | Informational / Commercial | Updated meta title, anchor links from cenovnik, transparent package comparisons. |
| `"cena izrade sajta"` | `/sr/cenovnik/` | `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/` | Commercial Investigation | Package pricing transparency (450 €, 650 €, 1.000 €), custom quotes explanation, FAQ addition. |
| `"izrada web sajta cena"` | `/sr/cenovnik/` | `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/` | Commercial Investigation | Enhanced intro, FAQ covering e-commerce and guides. |
| `"izrada internet prodavnice cena"` | `/sr/cenovnik/` | `/sr/usluge/` | Commercial | Clarified Premium plan (1.000 €) e-commerce inclusions vs custom catalog scopes. |
| `"odrzavanje web sajta"` | `/sr/usluge/` | `/sr/cenovnik/` | Commercial | Maintenance service description and FAQ retainers explanation. |

---

## 5. Structured Data Changes

1. **`Service` Schema Implemented (`lib/schema.ts`):**
   - Injected on `/sr/usluge/` and `/en/services/`.
   - Generates an array of `Service` entities inside `@graph`, linked to `provider: { "@id": "https://nmarkdesigns.com/#organization" }`.
   - Includes 6 core offerings:
     1. Izrada web sajtova (`#service-websites`)
     2. Web dizajn i korisničko iskustvo (`#service-design`)
     3. Razvoj i tehnička implementacija (`#service-development`)
     4. SEO osnova i performanse (`#service-optimization`)
     5. Web prodavnice (`#service-commerce`)
     6. Održavanje i podrška (`#service-maintenance`)
2. **Schema Anti-Spam Integrity Preserved:**
   - **No fake `LocalBusiness` / `address`:** No physical address or opening hours were fabricated (adhering strictly to Google Search Central quality guidelines).
   - **No fake reviews or aggregate ratings:** Maintained zero fabricated testimonial schema.
   - **Consistent entity identifiers:** Reused canonical `@id` strings for `Organization`, `WebSite`, and `Person`.

---

## 6. Internal Linking Improvements

1. **Pricing Page (`/sr/cenovnik/` & `/en/pricing/`) -> Blog Guide:**
   - Added interactive `guideBanner` with button linking directly to `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/`.
   - Added contextual FAQ referencing the in-depth pricing guide.
2. **Blog Guide -> Core Pages & Portfolio:**
   - Enriched `linkList` with descriptive anchors pointing to `/sr/cenovnik/` (od 450 €), `/sr/usluge/`, and `/sr/portfolio/`.
   - Contextual inline editorial references to real projects: OŠ „Dule Karaklajić“, Buy Pallet Jacks, and Nest Home Solutions.
3. **Services Page -> Pricing & Portfolio:**
   - Updated pricing section description to clearly mention the Basic, Standard, and Premium packages.
   - Maintained direct case-study links for proof projects.

---

## 7. Factual Claims Requiring Project Owner Approval

The following claims were implemented based on verified project evidence and require project owner sign-off:
1. **Geographic Studio Identification:**
   - Nikola Marković identified as frontend developer based in Belgrade, serving clients in Belgrade, Serbia, and internationally.
   - *Confirmation required:* Confirm that describing the service area as Belgrade / Serbia without a physical storefront meets client preference.
2. **Custom E-Commerce Scope in Pricing Notes:**
   - Added clarification note: *„Za veće internet prodavnice sa specifičnim ERP integracijama ili custom web aplikacije, cena se formira na osnovu detaljne specifikacije projekta.“*
   - *Confirmation required:* Confirm that Premium plan (1.000 €) covers standard online stores, with larger ERP/enterprise stores quoted via custom specification.

---

## 8. Verification Results

All automated test suites were executed and verified:

```bash
# 1. ESLint
npm run lint
# Result: 0 warnings, 0 errors

# 2. TypeScript Type Check
npm run typecheck
# Result: Types generated successfully, 0 type errors

# 3. Production Build
npm run build
# Result: Compiled successfully in 5.0s, 50/50 static pages generated

# 4. Playwright SEO Test Suite
npm run test:e2e tests/seo.spec.ts
# Result: 48/48 passed (32.5s)

# 5. Playwright Contact & Security Suite
npm run test:e2e tests/contact.spec.ts
# Result: 26/26 passed (32.5s)
```

---

## 9. Expected Opportunities (Without Ranking Guarantees)

- **Search Console Visibility:** Transitioning `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/` from position ~29 into the top 10 for "koliko kosta izrada sajta" by consolidating internal page equity and CTR-focused metadata.
- **Local Intent Matching:** Enabling Google to associate NMark Designs with commercial Belgrade searches ("izrada web sajtova beograd", "web dizajn beograd") through natural contextual entity mentions.
- **Lead Quality:** Filtering unqualified leads by making package tiers transparent (Basic 450 €, Standard 650 €, Premium 1.000 €) while capturing higher-budget leads for custom e-commerce and web applications.

---

## 10. Post-Deployment GSC Monitoring Plan

Following production deployment:
1. **Week 1-2:** Submit updated URLs (`/sr/`, `/sr/usluge/`, `/sr/cenovnik/`, `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/`) via Google Search Console URL Inspection to request re-indexing.
2. **Week 3-4:** Track impression and CTR changes for the 4 core queries: `"izrada web sajta"`, `"koliko kosta izrada sajta"`, `"cena izrade sajta"`, and `"izrada web sajta cena"`.
3. **Week 4-8:** Monitor click attribution shifts towards Serbian commercial landing pages and track contact form submission volume.
