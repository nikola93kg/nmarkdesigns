# NMark Designs — Phase 2C: AI Search Optimization, Content Authority & Semantic SEO

## 1. Overview & Objectives

Phase 2C builds upon the technical SEO foundation (Phase 2A) and local commercial intent (Phase 2B) to strengthen NMark Designs’ organic visibility, authority, and citation clarity in both traditional search engines (Google Search) and AI-powered search retrieval systems (Google AI Overviews, ChatGPT Search, Perplexity AI, Claude Search, Apple Intelligence).

All changes were executed strictly within the existing Git worktree (`website_audit_phase_zero`) without visual redesigns, CSS disruptions, or modifications to security headers and SMTP credentials.

### Key Focus Areas
1. **Answer-First Clarity:** Refined homepage FAQ and article summaries to provide direct, truthful answers to core buyer and architectural queries without keyword stuffing.
2. **Entity & Author Authority (E-E-A-T):** Explicitly connected NMark Designs (independent web design & development studio in Belgrade) with Nikola Marković (developer and author) across visible content and JSON-LD schema graphs (`@id` linked).
3. **Semantic Cross-Linking & Proof Points:** Interlinked educational blog guides with real production portfolio case studies (`buy-pallet-jacks`, `os-dule-karaklajic`, `casovi-francuskog`, `ilic-enterijer`) and service offerings (`/sr/usluge/`, `/en/services/`).
4. **AI Crawler Accessibility & `llms.txt` Analysis:** Evaluated server-side rendering (SSG), robots.txt policy, and industry standards regarding `llms.txt`.
5. **Bilingual Parity:** Maintained exact synchronization between Serbian (`sr`) and English (`en`) implementations.

---

## 2. Changes Summary by Component & File

| File | Change Description |
|---|---|
| `content/i18n/sr.ts` | Upgraded homepage FAQ items to concise, answer-first responses directly answering 10 top buyer questions (starting pricing, services, tech stack comparison, turnaround, SEO inclusion, maintenance, etc.). |
| `content/i18n/en.ts` | Matching English translation of answer-first homepage FAQ preserving technical accuracy and commercial clarity. |
| `content/blog-editorial.ts` | Added visible author attribution (`blogLabels.author` = "Nikola Marković"), contextual case study link lists, and structured editorial CTAs across all key guides. |
| `components/blog/BlogArticlePage.tsx` | Rendered author metadata (`Autor: Nikola Marković` / `Author: Nikola Marković`) alongside publisher, publication date, and read time in the article header. |
| `content/blog-pricing-guide.ts` | Added pricing guide linkLists and structured CTAs connecting pricing tiers to services and portfolio. |
| `lib/schema.ts` | Maintained `@id` graph connections linking `Organization`, `Person` (Nikola Marković), `WebSite`, and `Service` entities. |

---

## 3. Before & After Content Comparisons

### A. Homepage FAQ (Answer-First Buyer Queries)

* **Question 1: Starting Price**
  * *Before (Generic):* "Cena zavisi od obima posla i specifičnih zahteva. Za osnovne sajtove cena kreće od..."
  * *After (Direct & Factual):*
    * **SR:** "Cena izrade zavisi od obima i tehnologije, a osnovni paketi u NMark Designs kreću od 450 € za jednostavniji sajt (Osnovni paket), 650 € za standardni poslovni sajt (Standard paket), do 1.000 € za naprednija custom rešenja (Premium paket). Za detaljan pregled posetite naš cenovnik ili pročitajte vodič o cenama izrade sajta u Srbiji."
    * **EN:** "Website development pricing depends on scope and technical architecture. At NMark Designs, our fixed packages start at 450 € for simpler web presentations (Basic), 650 € for standard business websites (Standard), and 1,000 € for advanced custom web solutions (Premium). Explore our pricing page or read our Serbian web development cost guide for detailed breakdowns."

* **Question 3: WordPress vs Custom Next.js**
  * *Before:* Opis prednosti jedne i druge platforme bez konkretnih kriterijuma izbora.
  * *After:*
    * **SR:** "WordPress preporučujemo kada klijent želi jednostavno samostalno uređivanje sadržaja, blog ili standardan CMS ekosistem uz razuman budžet. Custom Next.js (React) rešenja biramo kada su prioritet maksimalna brzina, visoke Core Web Vitals ocene, napredna bezbednost bez ranjivih dodataka i specifična interaktivnost."
    * **EN:** "We recommend WordPress when clients require straightforward self-service content management, a blog, or a standard CMS ecosystem on a manageable budget. We engineer custom Next.js (React) applications when maximum speed, near-perfect Core Web Vitals, enterprise security without plugin vulnerabilities, and bespoke functionality are top priorities."

* **Question 5: Technical SEO Inclusion**
  * *Before:* "Da, radimo osnovnu SEO optimizaciju."
  * *After:*
    * **SR:** "Da. Svaki projekat izrađujemo sa tehničkim SEO temeljom: semantički HTML, optimizovane meta oznake (title, description), Open Graph podaci za društvene mreže, automatski generisani XML sitemap, robots.txt, kanonički linkovi i strukturirani JSON-LD podaci (Schema.org)."
    * **EN:** "Yes. Every website is built on a solid technical SEO foundation: semantic HTML, optimized meta tags (title, description), Open Graph social previews, auto-generated XML sitemaps, robots.txt, canonical URLs, and structured JSON-LD schema markup (Schema.org)."

### B. Blog Author & Publisher Attribution

* **Header Metadata:**
  * *Before:* `Objavljuje NMark Designs · 26. septembar 2026. · 5 min čitanja`
  * *After:* `Autor: Nikola Marković · Objavljuje NMark Designs · 26. septembar 2026. · 5 min čitanja`
  * Matches schema markup:
    ```json
    "author": {
      "@type": "Person",
      "@id": "https://nmarkdesigns.com/#nikola-markovic",
      "name": "Nikola Marković"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://nmarkdesigns.com/#organization",
      "name": "NMark Designs"
    }
    ```

---

## 4. Semantic Relationships & Contextual Internal Linking

To eliminate siloed content and demonstrate real-world competence to search engines and AI assistants, contextual `linkList` blocks and secondary CTAs were embedded directly within relevant article sections:

1. **`homepage-checklist-za-lokalni-biznis` (`local-business-homepage-check`):**
   - Section 4 ("Poverenje gradite dokazima, ne superlativima"):
     - Links directly to **Ilić Enterijer** (`/sr/portfolio/ilic-enterijer/` / `/en/portfolio/ilic-enterijer/`) as an authentic example of custom craftsmanship presentation.
     - Links directly to **Časovi Francuskog** (`/sr/portfolio/casovi-francuskog/` / `/en/portfolio/casovi-francuskog/`) as an authentic example of structured educational offerings and contact flows.
   - Dedicated conversion CTA: Links primary action to Contact and secondary action to Services (`/sr/usluge/` / `/en/services/`).

2. **`kako-da-portfolio-donosi-kvalitetne-upite` (`portfolio-storytelling`):**
   - Section 5 ("Završite povezanim sledećim korakom"):
     - Links directly to **Buy Pallet Jacks** (`/sr/portfolio/buy-pallet-jacks/` / `/en/portfolio/buy-pallet-jacks/`) illustrating a B2B catalog with clear quote requests.
     - Links directly to **OŠ Dule Karaklajić** (`/sr/portfolio/os-dule-karaklajic/` / `/en/portfolio/os-dule-karaklajic/`) demonstrating structured public institution information architecture.
     - Links to full portfolio index (`/sr/portfolio/`).
   - Dedicated conversion CTA: Primary link to Contact, secondary link to Portfolio (`/sr/portfolio/`).

3. **`kako-da-radite-brzi-audit-sajta` (`website-audit-framework`):**
   - Section 5 ("Pretvorite nalaze u redosled rada"):
     - Links directly to **Services** (`/sr/usluge/` / `/en/services/`).
     - Links directly to **Pricing** (`/sr/cenovnik/` / `/en/pricing/`).
     - Links directly to **Cost Guide** (`/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/`).
   - Dedicated conversion CTA: Primary link to Contact, secondary link to Services.

4. **`iphone-duo-responsive-web-dizajn` (`iphone-duo-responsive-design`):**
   - Dedicated responsive audit CTA: Primary link to Contact, secondary link to Services.

---

## 5. Structured Data & Entity Graph Architecture

The JSON-LD schema implementation remains strictly verified across all pages:

```
[WebSite] https://nmarkdesigns.com/#website
   │
   ├─ publisher ──> [Organization] https://nmarkdesigns.com/#organization
   │                    ├── name: "NMark Designs"
   │                    ├── address: Belgrade, Serbia
   │                    ├── founder: [Person] https://nmarkdesigns.com/#nikola-markovic
   │                    └── offers / services: [Service] #service-izrada-sajtova, #service-redizajn, etc.
   │
   └─ author / founder ──> [Person] https://nmarkdesigns.com/#nikola-markovic
                              ├── name: "Nikola Marković"
                              └── jobTitle: "Web Designer & Developer"
```

- **FAQPage Schema:** Embedded on homepage, pricing guide, and AI search article. Answers match the visible DOM text exactly.
- **Service Schema:** Configured on `/sr/usluge/` and `/en/services/` with verified service types, provider, and areaServed.
- **BlogPosting Schema:** Each article explicitly references `author: Person` and `publisher: Organization`, matching visible header text.

---

## 6. AI Crawler Accessibility & `llms.txt` Evaluation

### A. Current Crawler Policy (`robots.txt`)
In `lib/crawl.ts`, the canonical production hostname serves:
```text
User-agent: *
Allow: /
Sitemap: https://nmarkdesigns.com/sitemap.xml
```
- No user-agents are restricted or blocked.
- AI scrapers and search bots (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Applebot`, `Google-Extended`) enjoy full read access to all public routes.
- Preview/staging hosts continue to return `Disallow: /` with `X-Robots-Tag: noindex, nofollow`, protecting the pre-launch environment.

### B. Prerendering (SSG) Advantage
All 50 site routes are pre-rendered into static HTML at build time (`Next.js SSG`). AI agents and search bots without JavaScript execution engines retrieve 100% of the text, headings, meta tags, and structured JSON-LD data on the initial HTTP GET request.

### C. Analysis of `llms.txt`
- **What it is:** A proposal for placing a Markdown summary file at `/llms.txt` to help language models read concise site summaries.
- **Benefits:**
  - Provides a single compact index of key URLs and technical summaries.
  - Useful for lightweight CLI tools and specialized AI aggregators.
- **Risks & Maintenance Burden:**
  - `llms.txt` is an informal community draft, not an established W3C, IETF, or search engine standard.
  - Major search engines (Google AI Overviews, Bing Copilot) and primary search AI agents (ChatGPT Search, Perplexity) crawl and parse standard semantic HTML, sitemaps, and JSON-LD schema. They do not rely on `llms.txt` for indexing or citation selection.
  - Introducing an `llms.txt` creates an unautomated manual content source that can desynchronize from production prices, service descriptions, and blog links whenever content changes.
- **Conclusion:** Standard HTML + Schema.org + XML sitemap remains the highest-fidelity, most universally supported standard for AI search discovery. Adding an unstandardized `llms.txt` is not recommended at this phase.

---

## 7. Verification & Quality Assurance

All verification commands were executed in the active worktree:

1. **TypeScript Compilation:**
   ```bash
   npm run typecheck
   # Output: Types generated successfully. 0 errors.
   ```
2. **ESLint:**
   ```bash
   npm run lint
   # Output: 0 warnings, 0 errors.
   ```
3. **Production Static Build:**
   ```bash
   npm run build
   # Output: Successfully prerendered 50/50 static routes.
   ```
4. **Playwright SEO Test Suite (`tests/seo.spec.ts`):**
   ```bash
   npm run test:e2e tests/seo.spec.ts
   # Output: 48 passed (31.4s)
   ```
5. **Playwright Contact & Security Suite (`tests/contact.spec.ts`):**
   ```bash
   npm run test:e2e tests/contact.spec.ts
   # Output: 26 passed (37.4s)
   ```

All existing Phase 1A (SMTP, Turnstile, CSRF, honeypot) and Phase 1B (CSP, security headers) functionality remain completely intact.

---

## 8. Recommended Next Steps (Phase 3)

With Phase 2A (Technical SEO), Phase 2B (Local Commercial SEO), and Phase 2C (AI Search Optimization & Content Authority) complete, the recommended scope for **Phase 3 (Core Pages Refinement & Portfolio Polish)** is:

1. **Portfolio Case Study Deep-Dives:**
   - Expand top case studies (`buy-pallet-jacks`, `casovi-francuskog`, `ilic-enterijer`, `coolfridgeguys`) with structured challenge, solution, and verifiable technology scopes.
2. **Services Page Editorial Enhancements:**
   - Add structured feature breakdowns to `/sr/usluge/` and `/en/services/` that reflect real commercial offerings (WordPress migration, Next.js performance, custom maintenance).
3. **About Page Authority Reinforcement:**
   - Align the About page copy with the verified studio entity and author profile (Nikola Marković, Belgrade, modern web standards).
