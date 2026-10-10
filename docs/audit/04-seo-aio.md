# Technical SEO & AI Search (AIO / GEO) Audit

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Technical SEO Specialist & AI Search Consultant  
**Primary Market:** Serbia (Belgrade priority) + International  
**Languages:** Serbian (`sr`, primary) and English (`en`)

---

## 1. Technical SEO Audit Summary

The technical SEO architecture of NMark Designs is among the cleanest and most disciplined implementations possible in Next.js 16:
* **Canonical URLs:** Strict self-referencing trailing-slash canonical URLs generated per page.
* **Hreflang Alternates:** Clean bidirectional alternates (`sr`, `en`, and `x-default -> sr`) on all 44 indexable pages.
* **Indexing Directives:** Production pages declare `<meta name="robots" content="index, follow">`, while preview/dynamic 404 pages emit `x-robots-tag: noindex, nofollow`.
* **Legacy WordPress 308 Redirects:** Flawlessly mapped for core pages (`/about/` -> `/sr/o-nama/`, `/contact/` -> `/sr/kontakt/`, `/cenovnik/` -> `/sr/cenovnik/`, `/all-services/` -> `/sr/usluge/`).
* **XML Sitemap:** Dynamic `/sitemap.xml` listing exactly 44 published URLs with language alternate blocks.
* **Robots.txt:** Clean dynamic `/robots.txt` advertising `Sitemap: https://nmarkdesigns.com/sitemap.xml` and disallowing crawlers on non-production hosts.

---

## 2. Technical SEO Findings & Deficiencies

### SEO-01: Seven Legacy WordPress Portfolio URLs Return 404 Without Permanent Redirects
* **Severity:** **High (SEO Migration Risk)**
* **Status:** **VERIFIED**
* **Evidence:**
  * In the original WordPress installation, 15 projects were published. In the new Next.js rebuild, only **8 projects** were converted into full case studies (`caseStudyProjects` in [`content/projects.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/projects.ts)).
  * In [`lib/legacy-redirects.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/legacy-redirects.ts), only the 8 converted projects have redirect mappings.
  * Real-world curl probing of the remaining 7 legacy project URLs:
    * `GET /portfolio/anabelabebioprema/` -> **404 Not Found**
    * `GET /portfolio/frankultura/` -> **404 Not Found**
    * `GET /portfolio/dh-travell/` -> **404 Not Found**
    * `GET /portfolio/madjionicar-bojan/` -> **404 Not Found**
    * `GET /portfolio/nest-home-solutions/` -> **404 Not Found**
    * `GET /portfolio/stamenko-milic-photography/` -> **404 Not Found**
    * `GET /portfolio/banquetes-castellanos-zoreda/` -> **404 Not Found**
* **Impact:**
  * If these 7 URLs previously had backlinks, indexed rankings, or social shares, they are currently dropping out of Google's index with 404 errors.
* **Recommendation:**
  * For any of these 7 projects that are listed in the full portfolio index ([`content/projects.ts#L263-L368`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/projects.ts#L263-L368)), either:
    1. Create minimal case study pages so they have live destinations.
    2. Add exact 308 redirects pointing to `/sr/portfolio/#project-{slug}` (hash anchor on the portfolio showcase page).
    3. If permanently retired, return explicit HTTP 410 Gone rather than letting them bounce.

---

### SEO-02: Local Keyword & Geographic Targeting Gaps (Belgrade / Serbia)
* **Severity:** **Medium (Commercial Opportunity)**
* **Status:** **VERIFIED**
* **Evidence:**
  * The site's primary commercial market is **Belgrade and Serbia** ("Izrada web sajtova Beograd", "Web dizajn Srbija").
  * Global grep across the core marketing copy ([`content/i18n/sr.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/i18n/sr.ts)) reveals:
    * The words **"Beograd"**, **"Belgrade"**, or **"Srbija"** appear **ZERO times** in the core homepage, services, about, and contact copy!
    * They only appear inside blog articles ([`content/blog-ai-search.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/blog-ai-search.ts), [`content/blog-pricing-guide.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/blog-pricing-guide.ts)) and in one project mention ("OŠ Dule Karaklajić Lazarevac").
* **Impact:**
  * Google and AI Search engines evaluating local intent queries (e.g. *„ko pravi sajtove u Beogradu“*, *„web dizajner Beograd cena“*) will rank competitors with clear localized entity signals much higher.
* **Recommendation:**
  * Naturally introduce verified geographic context in:
    * Homepage Hero subtitle / description (e.g. *"Izrada web sajtova i web dizajn za klijente u Beogradu, Srbiji i inostranstvu"*).
    * About page ([`content/i18n/sr.ts#L293`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/i18n/sr.ts#L293)).
    * Contact page address / service area metadata.
    * Schema markup (`areaServed: "RS"`, `addressLocality: "Beograd"`).

---

### SEO-03: Structured Data Schema Scope & Enhancement
* **Severity:** **Low (Enhancement)**
* **Status:** **VERIFIED**
* **Current Implementation:**
  * [`lib/schema.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/schema.ts) outputs:
    1. `Organization` (name, url, logo, email, telephone, founder)
    2. `WebSite` (name, url, inLanguage, publisher)
    3. `Person` on About page (name, jobTitle, image, url)
    4. `BreadcrumbList` on Case Studies and Blog Posts
    5. `BlogPosting` on individual articles
* **Missing Supported Entities:**
  * The studio qualifies as a `ProfessionalService` or `LocalBusiness`.
  * The Services page ([`/sr/usluge/`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/services/ServicesPage.tsx)) currently has **no structured data** (missing `Service` schema).
  * Adding valid, non-fabricated `Service` schema for the 6 core offerings will clarify entity relationships for both Google and LLMs.

---

## 3. AI Search Optimization (AIO / GEO) Assessment

How well does the site perform for Perplexity, ChatGPT Search, Claude Search, and Google AI Overviews?

### Current Strengths
1. **Answer-First Content Architecture in Blog:**
   * Every blog article in [`content/blog.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/blog.ts) includes an explicit `answer` field ("Ukratko" / "The short answer") displayed in an `<aside className={styles.answer}>`.
   * This structure is cited directly by AI crawlers because it directly provides clear, concise factual answers.
2. **Server-Rendered Static HTML:**
   * AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not reliably execute client-side JavaScript. Because NMark Designs pre-renders full HTML on the server (`x-nextjs-prerender: 1`), 100% of the content is immediately discoverable.
3. **High Information Density & Original Expertise:**
   * Articles like [`content/blog-pricing-guide.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/blog-pricing-guide.ts) (*"Koliko košta izrada web sajta u Srbiji 2026?"*) contain specific price ranges (€350–€1.200+), breakdown tables, and commercial terms that AI engines frequently use to summarize local web design costs.

### AIO / GEO Opportunities
1. **AI Crawler Access Directives in `robots.txt`:**
   * Ensure `robots.txt` explicitly allows or maintains open crawling for `GPTBot`, `ClaudeBot`, and `PerplexityBot`.
2. **Add Service FAQs with Natural Questions:**
   * Add 3–4 high-intent questions to the Services page (e.g. *„Koja je razlika između WordPress sajta i Next.js rešenja?“*, *„Šta je sve potrebno pripremiti pre početka izrade sajta?“*).
3. **Entity Disambiguation:**
   * Link the `Person` schema to verifiable public profiles (LinkedIn, GitHub) via `sameAs`.
