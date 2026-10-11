# Phase 2B: Commercial SEO & Content Opportunities Roadmap

**Project:** NMark Designs (https://nmarkdesigns.com)  
**Target Market:** Serbia (Belgrade priority) + International Clients  
**Document Status:** Strategy & Recommendations (No content changes applied in Phase 2A)  
**Date:** October 10, 2026

---

## 1. Google Search Console Baseline Analysis

### 28-Day Performance Summary (September 9 – October 6, 2026)
- **Total Clicks:** ~35
- **Total Impressions:** 1,133
- **Average CTR:** 3.1%
- **Average Position:** 13.1
- **Geographic Segment (Serbia):** 338 impressions, 3 clicks, average position 25.6 (~0.9% CTR)

### Key Landing Page Observations:
1. `/en/blog/iphone-duo-responsive-web-dizajn/`:
   - 30 clicks, 551 impressions, average position 6.59.
   - *Observation:* This single conceptual post drives ~85% of total organic clicks and ~48% of total impressions. However, this traffic is broad/international with low commercial conversion intent for Belgrade web development services.
2. `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/`:
   - 0 clicks, 282 impressions, average position 29.
   - *Observation:* High commercial purchase intent. 282 Serbian prospects searched for web design costs in 28 days. Ranking at pos 29 yields 0 clicks, but moving into top 5–8 will generate qualified inquiries.
3. `/en/about/`:
   - 0 clicks, 91 impressions, average position 6.9.
   - *Observation:* Ranks in top 7 for navigational/brand queries without producing clicks.

### Commercial Query Impressions vs Average Position:
- *"izrada web sajta"*: 65 impressions, average position 6.37
- *"koliko kosta izrada sajta"*: 18 impressions, average position 6.89
- *"cena izrade sajta"*: 21 impressions, average position 31.95
- *"izrada web sajta cena"*: 21 impressions, average position 66.9
- *"izrada web sajtova"*: 6 impressions, average position 5.5

---

## 2. Core Deficiencies & Commercial Mismatches

1. **Lack of Geographic Context in Marketing Copy:**
   - The primary target market is **Belgrade and Serbia** ("Izrada web sajtova Beograd", "Web dizajn Srbija").
   - Currently, the words **"Beograd"**, **"Belgrade"**, or **"Srbija"** appear **0 times** across the core homepage, services, about, and contact copy!
   - They appear only in blog articles and one project case study. Google and AI search engines cannot establish strong local entity relevance for Belgrade commercial queries without explicit localized context.
2. **High-Intent Cost Article is Stranded on Page 3:**
   - `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/` already receives 282 impressions.
   - The article needs targeted internal links from `/sr/usluge/` and `/sr/cenovnik/`, clear schema, and enhanced call-to-actions.
3. **Services Page Lacks Structured Data:**
   - The Services page currently provides no `Service` or `ProfessionalService` JSON-LD schema.
   - Adding `Service` schemas with clear offerings (Website Development, E-commerce, Redesign, Maintenance) helps search engines parse offerings.

---

## 3. Recommended Phase 2B Action Items

### Priority 1: Natural Geographic Entity Grounding (Belgrade & Serbia)
- **Homepage (`/sr/`):**
  - Update hero subtitle / intro text naturally to mention Belgrade & Serbia, e.g.:
    > *"Profesionalna izrada web sajtova i web dizajn za preduzetnike i kompanije u Beogradu, Srbiji i inostranstvu."*
- **About Page (`/sr/o-nama/`):**
  - Clarify the studio base: Nikola Marković, web dizajner i developer iz Beograda / Srbije.
- **Contact Page (`/sr/kontakt/`):**
  - Add explicit service area notice: *"Dostupni za saradnju u Beogradu, širom Srbije i online sa klijentima iz inostranstva."*

### Priority 2: Optimize Commercial Pillar: Pricing Guide
- **Target URL:** `/sr/blog/koliko-kosta-izrada-web-sajta-u-srbiji-2026/`
- **Actions:**
  - Connect this article directly from the pricing page (`/sr/cenovnik/`) and services page (`/sr/usluge/`) using natural anchor text (*„Pogledajte detaljan vodič kroz cene izrade sajtova u Srbiji za 2026.“*).
  - Add FAQ schema to this article targeting questions:
    - *Koliko košta osnovni prezentacioni sajt?* (€350–€600)
    - *Koliko košta web shop u Srbiji?* (€800–€1.500+)
    - *Koji su skriveni troškovi izrade sajta?* (Domen, hosting, održavanje)
  - Refine meta title for maximum CTR:
    `Cena Izrade Web Sajta u Srbiji (2026) — Detaljan Vodič i Cenovnik | NMark Designs`

### Priority 3: Commercial Landing Page Meta Titles & Descriptions
- **Homepage (`/sr/`):**
  - Current Title: `NMark Designs — Izrada web sajtova i web dizajn`
  - Recommended Title: `Izrada Web Sajtova Beograd & Srbija | NMark Designs`
  - Recommended Description: `Profesionalna izrada modernih, brzih i SEO optimizovanih web sajtova u Beogradu i Srbiji. Povećajte broj upita i prodaju uz prilagođen web dizajn.`
- **Services (`/sr/usluge/`):**
  - Recommended Title: `Usluge Izrade Sajtova, Web Dizajna i Održavanja | NMark Designs`
- **Pricing (`/sr/cenovnik/`):**
  - Recommended Title: `Cenovnik Izrade Web Sajtova 2026 | NMark Designs Beograd`

### Priority 4: Service Schema & ProfessionalService Entity Markup
- Introduce structured JSON-LD schema on `/sr/usluge/`:
  - `ProfessionalService` with `addressLocality: "Beograd"`, `addressCountry: "RS"`, `areaServed: ["Beograd", "Srbija", "Worldwide"]`.
  - Individual `Service` entities for:
    1. Izrada prezentacionih i poslovnih web sajtova
    2. Redizajn postojećih sajtova
    3. E-commerce izrada web prodavnica
    4. WordPress održavanje i optimizacija brzine

### Priority 5: AI Search / GEO Optimization (AI Overviews & ChatGPT)
- Maintain open crawler access in `robots.txt` for `GPTBot`, `ClaudeBot`, `PerplexityBot`.
- Include concise "Answer-First" summary blocks on core service pages answering:
  - *Šta obuhvata proces izrade sajta u NMark Designs?*
  - *Koja je prednost Next.js rešenja u odnosu na generičke WordPress šablone?*
