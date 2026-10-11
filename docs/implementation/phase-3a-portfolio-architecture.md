# Phase 3A: Portfolio Architecture, Project Discovery & UX Implementation Report

**Project:** NMark Designs (https://nmarkdesigns.com)  
**Branch / Worktree:** `website_audit_phase_zero`  
**Date:** October 11, 2026  
**Status:** Completed & Verified  

---

## 1. Executive Summary

Phase 3A focused on transforming NMark Designs' portfolio from an external-link-heavy directory into a high-converting, professional portfolio architecture that prioritizes internal case studies, preserves external proof, enriches project discovery, and connects case study visits directly to business inquiries.

Prior to Phase 3A, portfolio cards wrapped all project images in external client links (`project.websiteUrl`), completely bypassing the 8 rich Next.js case study routes (`/portfolio/[slug]/`) that were implemented during Phase 1. Furthermore, portfolio project cards lacked clear category hierarchy and technology indicators, and case study detail pages ended abruptly without a contact call-to-action.

### Key Accomplishments
1. **Case Study-First Routing:** Cards with dedicated case studies now route card images, titles, and primary action buttons to internal case study pages (`/[locale]/portfolio/[slug]/`).
2. **Explicit Secondary External Links:** Verified external client websites remain accessible via clearly labeled, accessible secondary actions ("Posetite sajt uživo" / "Visit live website") opening in a new tab with `rel="noopener noreferrer"`.
3. **No Phantom Routes:** Showcase/archive projects without case studies retain their external links directly without generating empty or broken case study URLs.
4. **Enhanced Discovery & UI Hierarchy:** Reorganized `portfolioOrder` so all 8 case study projects appear first, followed by the 7 archive projects. Cards now display verified categories, technology pills, project numbers, and clear CTA buttons.
5. **Conversion Funnel Completion:** Embedded `PortfolioContact` at the base of case study detail pages, eliminating dead ends and guiding engaged prospects directly to the quote request form.
6. **Phase 2C Copy Review & Correction:** Cleaned up the WordPress vs custom Next.js FAQ copy in Serbian and English to remove unqualified speed/security guarantees, ensuring strictly factual claims.
7. **Comprehensive Phase 3B Case Study Inventory:** Documented the baseline state and detailed enhancement plans for upcoming case study storytelling.

---

## 2. Portfolio Architecture & Project Inventory

NMark Designs showcases **15 verified client projects** across Serbia, Austria, the United States, and Mexico.

### Project Breakdown

| Slug | Title | Client / Organization | Category (SR / EN) | Case Study Route | External URL | Technologies |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `casovi-francuskog` | Časovi Francuskog | Jelena Marković | Edukacija i kursevi / Education & Courses | Yes (`/casovi-francuskog/`) | https://casovifrancuskog.rs | WordPress, HTML, CSS, JavaScript |
| `ilic-enterijer` | Ilić Enterijer | Ilić Enterijer | Proizvodni i uslužni biznis / Manufacturing & Services | Yes (`/ilic-enterijer/`) | https://ilicenterijer.rs/ | Next.js, Vercel, Tailwind CSS |
| `powder-brows-vienna` | Powder Brows Vienna | Jovana Ristic Makeup | Poslovni sajt / Business Website | Yes (`/powder-brows-vienna/`) | https://www.powderbrowsvienna.com | Next.js, Tailwind CSS, TypeScript, Vercel |
| `coolfridgeguys` | CoolFridgeGuys | CoolFridgeGuys | Web prodavnica / E-commerce | Yes (`/coolfridgeguys/`) | https://www.coolfridgeguys.com/ | Next.js, Squarespace |
| `tripolisweets` | Tripoli Sweets | Tripoli Sweets | Poslovni sajt / Business Website | Yes (`/tripolisweets/`) | https://www.tripolisweets.com.mx | WordPress, HTML, CSS, JavaScript |
| `buy-pallet-jacks` | Buy Pallet Jacks | Buy Pallet Jacks | B2B sajt / B2B Website | Yes (`/buy-pallet-jacks/`) | https://buypalletjacks.com | Next.js, Vercel, Tailwind CSS |
| `ladekor` | LaDekor | LaDekor | Poslovni sajt / Business Website | Yes (`/ladekor/`) | https://ladekor.rs/ | WordPress, HTML, CSS, JavaScript |
| `os-dule-karaklajic` | OŠ Dule Karaklajić | ОШ „Дуле Караклајић“ – Лазаревац | Obrazovna ustanova / Educational Institution | Yes (`/os-dule-karaklajic/`) | https://dulovaskola.edu.rs/ | WordPress, HTML, CSS, JavaScript |
| `anabelabebioprema` | Anabela Bebi Oprema | — | Web prodavnica / E-commerce | No | https://anabelashop.rs/ | WordPress, WooCommerce |
| `frankultura` | Frankultura | Frankultura | Edukacija i kursevi / Education & Courses | No | https://www.frankultura.rs | WordPress, HTML, CSS, JavaScript |
| `madjionicar-bojan` | Mađioničar Bojan | Bojan Bogdanović | Prezentacioni sajt / Presentation Website | No | https://madjionicarbokac.com/ | WordPress, HTML, CSS, JavaScript |
| `banquetes-castellanos-zoreda` | Banquetes Castellanos Zoreda | — | Poslovni sajt / Business Website | No | https://precious-marigold-0deefc.netlify.app/ | HTML, CSS, JavaScript, Netlify |
| `nest-home-solutions` | Nest Home Solutions | — | Poslovni sajt / Business Website | No | https://nikola93kg.github.io/nest-home/ | HTML, CSS, JavaScript, GitHub Pages |
| `stamenko-milic-photography` | Stamenko Milić Photography | Stamenko Milić | Portfolio sajt / Portfolio Website | No | https://www.milicweddings.com/ | WordPress, HTML, CSS |
| `dh-travell` | DH Travel | — | Poslovni sajt / Business Website | No | https://dhtravell.rs/ | WordPress, HTML, CSS, JavaScript |

---

## 3. Navigation & UX Enhancements

### 3.1 Card Link Behavior
In `components/portfolio/PortfolioShowcase.tsx`:
- **When a project has a case study (`project.caseStudy`):**
  1. Card Screenshot: Wrapped in a Next.js `<Link href={localizedProjectPath(project.slug, locale)}>` with aria-label `${copy.viewCaseStudy}: ${project.title}`.
  2. Project Title: Linked via `<Link href={localizedProjectPath(project.slug, locale)}>` with subtle hover transitions.
  3. Primary Button: Renders `<Button href={caseStudyHref} variant="primary">` with text "Pogledajte studiju slučaja" / "View case study" and an `ArrowRight` icon.
  4. Secondary Action: If `project.websiteUrl` is defined, renders a discreet external anchor link with text "Posetite sajt uživo" / "Visit live website", `ArrowUpRight` icon, `target="_blank"`, and `rel="noopener noreferrer"`.
- **When a project does NOT have a case study:**
  1. Card Screenshot & Title: Directly link to the verified external website without creating fake or empty routes.
  2. Single Button: Renders a secondary button with text "Posetite sajt uživo" / "Visit live website" and `ArrowUpRight` icon.

### 3.2 Visual & Responsive Styling
In `components/portfolio/PortfolioShowcase.module.css`:
- Added `.titleLink`: Retains heading typography with hover opacity transition and focus ring.
- Added `.caseStudyBadge`: Refined brand badge indicating in-depth case study availability.
- Added `.techPills` and `.techPill`: Monospace-styled technology tags displaying verified frameworks and tools (e.g., `Next.js`, `Tailwind CSS`, `WordPress`, `Vercel`).
- Added `.projectButtons` and `.secondaryLink`: Clear, accessible button flex layout that wraps gracefully on small viewports (320px–430px) and aligns horizontally on desktop viewports (1024px–1920px).

### 3.3 Case Study Conversion Integration
In `app/[locale]/portfolio/[slug]/page.tsx`:
- Rendered `<PortfolioContact locale={locale} copy={copy} />` at the bottom of the case study page.
- Readers finishing a case study are immediately greeted with a streamlined project inquiry form and contact email, establishing a natural bridge from demonstrated expertise to lead generation.

---

## 4. Phase 2C Copy Review & Correction

In accordance with factual rigor guidelines, we reviewed and refined the "WordPress vs Custom Next.js" FAQ item (`wordpress-vs-custom`) in `content/i18n/sr.ts` and `content/i18n/en.ts`:
- **Previous statement:** Claimed absolute, guaranteed speed and security superiority for custom Next.js development.
- **Updated statement:** Accurately explains that custom Next.js solutions deliver minimal client overhead, static/edge rendering, and architectural isolation for brands requiring bespoke digital experiences, while WordPress remains an effective, economical solution for content-heavy sites with standard publishing workflows—emphasizing that both platforms can be fast and secure when properly engineered and maintained.

---

## 5. Phase 3B Case Study Inventory & Plan

Currently, all 8 case study projects contain a localized 1–2 sentence `overview` and a single desktop screenshot in `public/projects/`. Fields for `challenge`, `solution`, `results`, and additional `images` are not yet populated. 

Below is the verified inventory and implementation plan for Phase 3B:

### 1. Cool Fridge Guys (`coolfridgeguys`)
- **Verified Facts:** Headless Next.js e-commerce frontend for commercial refrigeration equipment (display cases, commercial freezers) in the US market. Integrates with Squarespace backend/checkout (`coolfridgeguys.shop`).
- **Current State:** 1 hero screenshot (`/projects/coolfridgeguys.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* Creating a lightning-fast, SEO-optimized commercial catalog while leveraging established Squarespace checkout for merchant operations.
  - *Solution:* Headless Next.js architecture deployed on Vercel with responsive filtering, clean product showcases, and seamless checkout redirection.
  - *Deliverables Needed:* 2–3 UI screenshots (catalog grid, mobile view, product specification table).

### 2. Buy Pallet Jacks (`buy-pallet-jacks`)
- **Verified Facts:** B2B material handling equipment website in the US. Built with Next.js, Vercel, and Tailwind CSS.
- **Current State:** 1 hero screenshot (`/projects/buy-pallet-jacks.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* B2B buyer UX requiring instant specification review, clear pallet jack category distinction, and friction-free inquiry forms.
  - *Solution:* Clean, modern component architecture prioritizing rapid load times and direct quote call-to-actions.
  - *Deliverables Needed:* Mobile layout screenshot and product spec overview.

### 3. Časovi Francuskog (`casovi-francuskog`)
- **Verified Facts:** Private language tutor business in Belgrade/Serbia (Jelena Marković). Custom WordPress website with responsive layout, localized educational copy, and lead generation form.
- **Current State:** 1 hero screenshot (`/projects/casovi-francuskog.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* Establishing personal credibility, explaining course curriculum tiers (A1–C2, business French), and converting visitors into trial lesson requests.
  - *Solution:* Warm, approachable visual identity, structured syllabus presentation, and prominent booking CTAs.
  - *Deliverables Needed:* Curriculum section screenshot and testimonial/contact section capture.

### 4. OŠ Dule Karaklajić (`os-dule-karaklajic`)
- **Verified Facts:** Official primary school website for ОШ „Дуле Караклајић“ in Lazarevac. Built with WordPress.
- **Current State:** 1 hero screenshot (`/projects/os-dule-karaklajic.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* High information density, official public institution transparency requirements, accessibility for students and parents, and active Cyrillic publishing.
  - *Solution:* Clear information hierarchy, streamlined navigation for school news, schedules, and official notices, and mobile-friendly responsive reading.
  - *Deliverables Needed:* School news feed screenshot and mobile navigation capture.

### 5. Ilić Enterijer (`ilic-enterijer`)
- **Verified Facts:** Custom furniture and interior carpentry studio in Serbia. Modern custom frontend with Next.js, Tailwind CSS, and Vercel hosting.
- **Current State:** 1 hero screenshot (`/projects/ilic-enterijer.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* Highlighting craftsmanship, materials, and bespoke interior projects with high-impact visual aesthetics without sacrificing Core Web Vitals.
  - *Solution:* Optimized Next.js image gallery, minimalist editorial typography, and clear project estimation request flow.
  - *Deliverables Needed:* Interior gallery screenshot and materials showcase.

### 6. Powder Brows Vienna (`powder-brows-vienna`)
- **Verified Facts:** Permanent makeup studio in Vienna, Austria (Jovana Ristic Makeup). Built with Next.js, TypeScript, Tailwind CSS, and Vercel.
- **Current State:** 1 hero screenshot (`/projects/powder-brows-vienna.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* High-end aesthetic expectations in the Austrian beauty market, mobile-dominated traffic, and direct appointment bookings.
  - *Solution:* Sophisticated color palette, high-resolution before/after visual presentation, and direct WhatsApp/booking integration.
  - *Deliverables Needed:* Before/after treatment showcase screenshot.

### 7. Tripoli Sweets (`tripolisweets`)
- **Verified Facts:** Artisanal pastry and confectionery business in Mexico. WordPress website with product presentation.
- **Current State:** 1 hero screenshot (`/projects/tripolisweets.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* Appetizing product visual showcase and clear location/catering inquiry flow.
  - *Solution:* Clean visual structure, vibrant product categorization, and localized Spanish copy layout.
  - *Deliverables Needed:* Product menu/catalog screenshot.

### 8. LaDekor (`ladekor`)
- **Verified Facts:** Painting and interior decorating business in Serbia. Custom WordPress presentation website.
- **Current State:** 1 hero screenshot (`/projects/ladekor.webp`), single-paragraph overview.
- **Phase 3B Opportunities:**
  - *Challenge:* Communicating service reliability, wall decorating techniques, and offering quick contact options for local property owners.
  - *Solution:* Clean service cards, verified project portfolio, and quick telephone/Viber inquiry triggers.
  - *Deliverables Needed:* Decorating service list and contact CTA capture.

---

## 6. Verification & Quality Assurance

All verification suites were run against production-built artifacts on the `website_audit_phase_zero` worktree:

1. **TypeScript (`npm run typecheck`):**
   - Result: `✓ Types generated successfully`, 0 errors.
2. **ESLint (`npm run lint`):**
   - Result: `✓ Passed with 0 warnings`.
3. **Portfolio E2E Tests (`npm run test:e2e tests/portfolio.spec.ts`):**
   - Result: `22 passed (59.2s)` across all 7 responsive viewports (320px, 375px, 430px, 768px, 1024px, 1440px, 1920px), no-JS fallback, metadata, and accessibility (Axe WCAG 2.1 AA).
4. **Case Studies E2E Tests (`npm run test:e2e tests/case-studies.spec.ts`):**
   - Result: `37 passed (40.3s)` across all 8 case studies, localized metadata, next/previous keyboard navigation, and responsive layouts.
5. **SEO Regression Suite (`npm run test:e2e tests/seo.spec.ts`):**
   - Result: `48 passed (33.6s)` verifying canonical URLs, sitemaps, structured data, and 1-hop legacy redirects.
6. **Contact Form Regression Suite (`npm run test:e2e tests/contact.spec.ts`):**
   - Result: `26 passed (32.2s)` verifying Turnstile security, rate limiting, validation, and accessibility.
7. **Production Build (`npm run build`):**
   - Result: Compiled successfully in 5.5s, 50 static SSG routes prerendered without errors.

---

## 7. Git & Deployment Status

- **Branch / Worktree:** `website_audit_phase_zero`
- **Remote Sync:** Up to date with origin (no commits or pushes made during this session).
- **Status:** All changes are local, uncommitted, and ready for review.
