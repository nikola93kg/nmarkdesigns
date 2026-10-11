# NMark Designs — Phase 3C.2 Implementation Report

## Trust, Credibility & Professional Positioning

**Repository**: `nikola93kg/nmarkdesigns`  
**Branch / Worktree**: `website_audit_phase_zero`  
**Date**: October 11, 2026  
**Status**: Implemented, Verified, Ready for Review (Strictly zero commits, pushes, merges, or deployments)

---

## 1. Executive Summary

Phase 3C.2 refines the professional positioning, credibility, and trust architecture of NMark Designs across all core pages (Homepage, About, Services, and Contact). 

The studio is positioned as a **founder-led web design and development practice** helmed by **Nikola Marković**, combining custom frontend engineering (Next.js, React), tailored content management systems (WordPress, custom themes), e-commerce solutions (WooCommerce), migrations (Squarespace to custom), and technical SEO. This eliminates generic "large agency" posturing and establishes direct client-to-developer collaboration without account managers, bloated bureaucracy, or generic templates.

### Key Scope Guardrails & Owner Directives
> [!IMPORTANT]
> **Owner Decision — Pricing Postponed**: Pricing and service-package restructuring have been intentionally deferred to a separate owner-approved project. No pricing files, package descriptions, prices (450 €, 650 €, 1,000 €), package FAQs, or pricing components were modified. On newly edited pages, mentions of temporary package pricing have been decoupled in favor of scope-based and tailored project assessments.

> [!NOTE]
> **Strict Factual Integrity**: Zero fabricated metrics, client statistics, customer reviews, years of experience, or awards were introduced. All credibility statements are grounded in real project evidence (9 detailed case studies).

---

## 2. Initial Trust & Positioning Audit

Prior to implementation, an audit of the website's professional identity revealed several friction points and inconsistencies:

1. **Agency Posturing vs. Founder Reality**:
   - The studio occasionally alternated between "we/agency" narrative and solo developer presentation without clarifying the true value proposition: direct collaboration with a senior developer who designs and codes.
2. **Repetition of Temporary Pricing Packages**:
   - The Services page pricing banner and homepage FAQ repeated the temporary 3-package model (Basic 450 €, Standard 650 €, Premium 1,000 €) even though the studio offers comprehensive custom web development, migrations, and technical consulting beyond these three packages.
3. **Rigid Response Timeframe Commitment**:
   - The Contact form stated a 24-hour concrete response guarantee (*"Odgovaramo u roku od 24h na sve radne dane..."*). For an independent founder-led studio, an absolute turnaround SLA risks credibility if complex technical inquiries require detailed scoping.
4. **Vague Process Steps**:
   - The collaboration process was high-level and did not clearly delineate the step-by-step engagement from initial inquiry through scope definition, proposal, execution, and launch support.
5. **Lack of Evidence-Backed Hero Trust Signals**:
   - The homepage hero previously included temporary package pricing in its trust signals rather than emphasizing studio capabilities, technical stack, and direct founder collaboration.

---

## 3. Issues Identified & Changes Implemented

| Area | Prior Implementation | Updated Implementation | Rationale |
| :--- | :--- | :--- | :--- |
| **Homepage Hero Trust Signals** | Included temporary pricing signal (*"Transparentne cene bez skrivenih troškova"*) | `"9 detaljnih studija slučaja"`, `"Next.js, WordPress & WooCommerce"`, `"Direktna saradnja sa developerom"` | Anchors credibility in real shipped work and direct founder collaboration rather than temporary prices. |
| **Homepage Services Description** | Mentioned transparent package pricing (*"transparentnih paketa cena"*) | *"Od vizuelnog identiteta i dizajna do Next.js i WordPress razvoja, SEO osnove i dugoročnog održavanja."* | Accurately describes the full breath of studio capabilities without premature package commitments. |
| **Homepage FAQ (Services & Process)** | Summarized basic services and generic 5 steps | Full breakdown: presentation sites, WooCommerce stores, custom Next.js, migrations, SEO, multilingual architecture, and 5 clear collaboration steps. | Demonstrates deep technical versatility and professional process transparency. |
| **Services Pricing Banner** | Repeated fixed package tiers and pricing constraints | Clarified that the pricing guide provides an initial baseline, while final estimates are tailored to exact project scope, custom features, and business requirements. | Aligns with the owner's decision to decouple core service offerings from temporary packages. |
| **About Page Profile** | Generic agency-vs-freelancer narrative | Comprehensive 4-paragraph profile introducing Nikola Marković as developer and designer; explains advantages of direct collaboration, clean code, maintainability, and semantic SEO. | Builds authentic human connection and establishes technical authority. |
| **About Page Collaboration Process** | 4 generic principles | 5 distinct collaboration steps: 1. Initial inquiry and needs, 2. Scope and structure definition, 3. Proposal and work plan, 4. Custom design and frontend development, 5. Cross-device review, launch, and agreed support. | Provides prospective clients with clear expectations of how projects are executed. |
| **Contact Form Reassurance** | 24-hour turnaround SLA promise | *"Pregledamo svaki upit i javljamo se sa predlogom sledećih koraka ili okvirnom procenom za vaš projekat."* / *"We review every inquiry and get in touch with proposed next steps or a tailored project assessment."* | Sets realistic, professional expectations without making contractual SLA promises. |

---

## 4. Before / After Content Comparisons

### 4.1 Homepage Hero Trust Signals
- **Before (SR)**:
  ```json
  [
    "9 detaljnih studija slučaja",
    "Next.js & WooCommerce ekspertiza",
    "Transparentne cene bez skrivenih troškova"
  ]
  ```
- **After (SR)**:
  ```json
  [
    "9 detaljnih studija slučaja",
    "Next.js, WordPress & WooCommerce",
    "Direktna saradnja sa developerom"
  ]
  ```
- **After (EN)**:
  ```json
  [
    "9 detailed case studies",
    "Next.js, WordPress & WooCommerce",
    "Direct collaboration with founder"
  ]
  ```

### 4.2 Services Page Pricing Guidance Banner
- **Before (SR)**:
  > *"Paketi daju orijentaciju. Konačna procena zavisi od obima, sadržaja i funkcionalnosti."*
- **After (SR)**:
  > *"Cenovnik daje orijentacioni početni okvir, dok se konačna ponuda formira na osnovu obima, potrebnih funkcionalnosti i specifičnosti svakog projekta."*
- **After (EN)**:
  > *"Our pricing guide provides an initial baseline, while the final project estimate is tailored to the exact scope, technical requirements, and custom features of your website."*

### 4.3 Contact Form Inquirer Reassurance
- **Before (SR)**:
  > *"Odgovaramo u roku od 24h na sve radne dane sa konkretnom procenom ili predlogom rešenja."*
- **After (SR)**:
  > *"Pregledamo svaki upit i javljamo se sa predlogom sledećih koraka ili okvirnom procenom za vaš projekat."*
- **After (EN)**:
  > *"We review every inquiry and get in touch with proposed next steps or a tailored project assessment."*

### 4.4 About Page Collaboration Workflow
- **Before (SR)**:
  1. *Prvo se raščisti cilj sajta, publika i najvažniji sadržaj.*
  2. *Zatim se pravi struktura koja vodi posetioca bez lutanja.*
  3. *Dizajn ostaje čist, profesionalan i vezan za identitet projekta.*
  4. *Izrada se radi tako da sajt bude brz, responzivan i lakši za održavanje.*
- **After (SR)**:
  1. **Inicijalni upit i potrebe**: sagledavamo ciljeve projekta, publiku i ključne zahteve.
  2. **Definisanje obima i strukture**: usklađujemo sadržaj, funkcionalnosti i tehničku platformu.
  3. **Predlog rešenja i plan rada**: transparentan pregled faza bez skrivenih uslova.
  4. **Dizajn i tehnička izrada**: prilagođen vizuelni identitet, čist frontend kod i visoke performanse.
  5. **Pregled, lansiranje i podrška**: testiranje na svim uređajima, stabilna objava i dogovorena podrška.

---

## 5. Founder-Led Studio Identity: Nikola Marković

The updated About profile (`components/about/AboutPage.tsx` backed by `content/i18n/sr.ts` and `content/i18n/en.ts`) articulates the studio's true operating model:

1. **Direct Communication**: Working directly with the engineer who writes the code and designs the interface eliminates communication distortion, account manager handoffs, and unnecessary agency markup.
2. **Platform Agility**: Tailoring the technology to the client's actual requirements (Next.js for performance-critical web applications; WordPress/WooCommerce for flexible content management and self-hosted stores).
3. **Engineering Craft**: Focus on clean maintainable code, semantic accessibility, mobile responsiveness, and technical SEO fundamentals rather than short-lived design trends.
4. **Authentic Scope**: Clear articulation that NMark Designs is an independent studio serving ambitious small businesses, service professionals, and modern brands.

---

## 6. Social Proof & Future Testimonials Strategy

Because NMark Designs strictly prohibits fabricating testimonials, client quotes, or metrics, the following strategy is recommended for expanding social proof in future phases:

1. **Authoritative Client Case Studies (Implemented)**:
   - The 9 detailed case studies (*Cool Fridge Guys, Anabela Bebi Oprema, Ilić Enterijer, Časovi Francuskog, Powder Brows Vienna, Buy Pallet Jacks, OŠ Dule Karaklajić, Tripoli Sweets, LaDekor*) provide verifiable proof of deliverables, architecture, and live URLs.
2. **First-Party Client Testimonial Collection (Recommended Next Step)**:
   - Reach out to verified business owners (e.g., Goran from Cool Fridge Guys, Dušan from Ilić Enterijer, etc.) to collect authentic, signed quotes focusing on communication clarity, delivery reliability, and post-launch stability.
   - Format quotes with client name, role, business name, and a direct link to the corresponding case study.
3. **Verified Metrics Display (Post-Collection)**:
   - Only publish performance metrics (e.g., Google Search Console indexation, Lighthouse improvements) when backed by verified analytics exports.

---

## 7. Quality Assurance & Verification Evidence

### 7.1 Automated Verification Suite
All automated checks were executed in the `website_audit_phase_zero` worktree with zero errors:

| Tool / Suite | Command | Result |
| :--- | :--- | :--- |
| **TypeScript** | `npm run typecheck` (`next typegen && tsc --noEmit`) | **Passed (0 errors)** |
| **ESLint** | `npm run lint` (`eslint . --max-warnings=0`) | **Passed (0 errors, 0 warnings)** |
| **Next.js Production Build** | `npm run build` (`next build --webpack`) | **Passed (52/52 static pages generated)** |
| **Playwright Targeted Suite** | `npx playwright test tests/about.spec.ts tests/customer-journey.spec.ts tests/services.spec.ts tests/pricing.spec.ts tests/contact.spec.ts` | **93 passed (0 failed)** |
| **Playwright Full Suite** | `npx playwright test tests/foundation.spec.ts tests/case-studies.spec.ts tests/portfolio.spec.ts tests/seo.spec.ts tests/localization.spec.ts tests/blog.spec.ts tests/performance.spec.ts` | **153 passed (0 failed)** |
| **Total Automated Tests** | Across all 12 test specifications | **246 passed (100% pass rate)** |

### 7.2 Visual QA Evidence
High-resolution full-page screenshots were captured across mobile (375px), tablet (768px), and desktop (1440px) viewports in both Serbian (`sr`) and English (`en`):

```text
docs/screenshots/phase-3c2/
├── about-en-desktop-1440.png
├── about-en-mobile-375.png
├── about-en-tablet-768.png
├── about-sr-desktop-1440.png
├── about-sr-mobile-375.png
├── about-sr-tablet-768.png
├── contact-en-desktop-1440.png
├── contact-en-mobile-375.png
├── contact-en-tablet-768.png
├── contact-sr-desktop-1440.png
├── contact-sr-mobile-375.png
├── contact-sr-tablet-768.png
├── home-en-desktop-1440.png
├── home-en-mobile-375.png
├── home-en-tablet-768.png
├── home-sr-desktop-1440.png
├── home-sr-mobile-375.png
├── home-sr-tablet-768.png
├── portfolio-en-desktop-1440.png
├── portfolio-en-mobile-375.png
├── portfolio-en-tablet-768.png
├── portfolio-sr-desktop-1440.png
├── portfolio-sr-mobile-375.png
├── portfolio-sr-tablet-768.png
├── services-en-desktop-1440.png
├── services-en-mobile-375.png
├── services-en-tablet-768.png
├── services-sr-desktop-1440.png
├── services-sr-mobile-375.png
└── services-sr-tablet-768.png
```

---

## 8. Summary of Deferred Work

As explicitly mandated:
- **Pricing and Package Restructuring**: Completely deferred to a separate owner-approved project. The existing pricing page, packages (Basic 450 €, Standard 650 €, Premium 1,000 €), package FAQs, and pricing tests (`tests/pricing.spec.ts`) remain intact and functional.
- **Git Commits & Deployments**: Strictly zero git commits, pushes, merges, or production deployments performed. All changes remain unstaged in the local working tree ready for review.
