# NMark Designs — Website Polishing
## Phase 3: Homepage Hero Copy & Sitewide Heading Punctuation Report

**Date:** 2026-10-12  
**Branch:** `feature/website-polishing`  
**Base:** `e6d54ead` (Phase 2 completion commit)  
**Scope:** 
1. Homepage hero messaging refinement (SR & EN)
2. Sitewide H1 and H2 trailing period audit and removal (SR & EN)

---

### 1. Homepage Hero Copy Refinement

The hero copy on the homepage was updated across both languages to communicate clear service positioning and a personal, founder-led voice without sounding like an agency template.

#### Serbian (`/sr`) Hero Content
- **Eyebrow:** `WEB DIZAJN · RAZVOJ SAJTOVA · SEO`
- **H1:** `Izrada modernih web sajtova`
- **Subtitle:** `Sajt koji izgleda dobro. I radi još bolje.`
- **Description:** `Od prve ideje do poslednjeg detalja — dizajniram i razvijam web sajtove koji izgledaju odlično, rade brzo i imaju jasnu poslovnu svrhu.`
- **Primary CTA:** `Zatražite besplatnu ponudu` (links to `/sr/kontakt`)
- **Secondary CTA:** `Pogledajte portfolio` (links to `#portfolio`)

#### English (`/en`) Hero Content
- **Eyebrow:** `WEB DESIGN · WEB DEVELOPMENT · SEO`
- **H1:** `Modern Websites, Thoughtfully Built`
- **Subtitle:** `A website that looks great. And works even better.`
- **Description:** `From the first idea to the final detail, I design and develop websites that look great, load fast, and serve a clear business purpose.`
- **Primary CTA:** `Request a Free Quote` (links to `/en/kontakt`)
- **Secondary CTA:** `View Portfolio` (links to `#portfolio`)

#### Preserved Elements & Voice Rules
- **Founder-Led Singular Voice:** Kept strictly first-person singular ("dizajniram i razvijam" / "I design and develop"). No agency plural phrasing ("we are a team", "our agency", "our developers").
- **Hierarchy:** Eyebrow → H1 → Subtitle (`text-xl font-medium text-foreground`) → Description (`text-muted-foreground`) → CTAs.
- **Design & Layout:** Zero new animations, badges, or cards. Retained responsive layout, max-width constraints, grid background, and touch targets across 375px–1920px viewports.

---

### 2. Sitewide H1 and H2 Heading Punctuation Audit

A comprehensive automated audit was conducted across all 701 rendered `<h1>` and `<h2>` headings across all 52 static routes (`/sr` and `/en`).

#### Rules Applied:
1. **Trailing Sentence Periods Removed:** Removed unnecessary trailing full stops when serving solely as sentence-ending punctuation.
2. **Internal Sentence Punctuation Preserved:** Multi-sentence headings keep internal sentence breaks intact (e.g. `. Fokus` or `. But`).
3. **Abbreviations & Technical Terms Preserved:** `Next.js`, version numbers, and brand terms are strictly preserved.
4. **Question Marks Preserved:** Rhetorical or interrogative headings keep their `?`.
5. **No Scope Creep:** Headings H3–H6, paragraph body copy, CTAs, card metadata, and SEO titles/descriptions were not altered.

#### Complete List of Corrected Headings

| # | File / Key | Tag | Route(s) | Before | After | Notes |
|:---:|:---|:---:|:---|:---|:---|:---|
| 1 | `content/i18n/sr.ts`<br>`about.intro.title` | `<h1>` | `/sr/o-nama` | `Web sajt koji izgleda ozbiljno, a nastaje kroz jasan i normalan proces.` | `Web sajt koji izgleda ozbiljno, a nastaje kroz jasan i normalan proces` | Trailing period removed |
| 2 | `content/i18n/sr.ts`<br>`about.profile.title` | `<h2>` | `/sr/o-nama` | `Bez velikih agencijskih priča. Fokus je na sajtu koji stvarno ima smisla za vaš posao.` | `Bez velikih agencijskih priča. Fokus je na sajtu koji stvarno ima smisla za vaš posao` | Trailing period removed; internal `. Fokus` preserved |
| 3 | `content/i18n/en.ts`<br>`about.intro.title` | `<h1>` | `/en/o-nama` | `Websites that look professional, built through a clear and transparent process.` | `Websites that look professional, built through a clear and transparent process` | Trailing period removed |
| 4 | `content/i18n/en.ts`<br>`about.profile.title` | `<h2>` | `/en/o-nama` | `No agency fluff. The focus is on a website that actually makes sense for your business.` | `No agency fluff. The focus is on a website that actually makes sense for your business` | Trailing period removed; internal `. The focus` preserved |
| 5 | `content/i18n/sr.ts`<br>`portfolio.contactTitle` | `<h2>` | `/sr/portfolio` | `Zainteresovani ste za saradnju? Javite se da popričamo o vašem sajtu.` | `Zainteresovani ste za saradnju? Javite se da popričamo o vašem sajtu` | Trailing period removed |
| 6 | `content/i18n/en.ts`<br>`portfolio.contactTitle` | `<h2>` | `/en/portfolio` | `Interested in working together? Get in touch to discuss your website.` | `Interested in working together? Get in touch to discuss your website` | Trailing period removed |
| 7 | `content/i18n/sr.ts`<br>`home.cta.title` | `<h2>` | `/sr` | `Imate projekat na umu? Javite se da popričamo o tome šta vam je potrebno.` | `Imate projekat na umu? Javite se da popričamo o tome šta vam je potrebno` | Trailing period removed |
| 8 | `content/i18n/en.ts`<br>`home.cta.title` | `<h2>` | `/en` | `Have a project in mind? Let's discuss what you need.` | `Have a project in mind? Let's discuss what you need` | Trailing period removed |
| 9 | `content/blog-gta-vi.ts`<br>`cta.sr.title` | `<h2>` | `/sr/blog/gta-vi-website-analiza` | `GTA VI ima milione posetilaca. Ali vaš sajt ima svoju publiku.` | `GTA VI ima milione posetilaca. Ali vaš sajt ima svoju publiku` | Trailing period removed; internal `. Ali` preserved |
| 10 | `content/blog-gta-vi.ts`<br>`cta.en.title` | `<h2>` | `/en/blog/gta-vi-website-analysis` | `GTA VI has millions of visitors. But your website has its own audience.` | `GTA VI has millions of visitors. But your website has its own audience` | Trailing period removed; internal `. But` preserved |

---

### 3. Verification & Automated Testing

#### Verification Commands Executed
1. `npm run build`: Successfully built all 52 static routes without errors or warnings.
2. `npm run typecheck`: Strict TypeScript check passed with 0 errors.
3. `npm run lint`: ESLint check passed with 0 warnings.
4. `scratch/audit-headings.js`: Automated scan over static HTML confirmed 0 user-facing headings with trailing periods.
5. `npx playwright test tests/hero-copy-heading-punctuation.spec.ts`: 24/24 tests passed covering:
   - Serbian hero exact copy and structure
   - English hero exact copy and structure
   - Heading punctuation verification across 18 routes (Homepage, About, Services, Portfolio, Contact, Pricing, Blog Listing, Blog Article, Case Studies)
   - Preservation of internal sentence periods (`. Fokus`, `. The focus`, `. Ali`, `. But`)
   - Preservation of technical names (`Next.js`)
   - Responsive layouts at 375px and 1440px with 0 horizontal overflow.

---

### 4. Git Status & Safety Notice

All changes are local in working tree `website_polishing_homepage` on branch `feature/website-polishing`.

Per instructions:
- No changes committed.
- No changes pushed to remote.
- Awaiting owner review before final commit.
