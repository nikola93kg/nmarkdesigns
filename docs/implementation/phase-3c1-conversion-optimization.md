# NMark Designs — Phase 3C.1 Implementation Report

## Conversion Optimization & Customer Journey

**Repository**: `nikola93kg/nmarkdesigns`  
**Branch / Worktree**: `website_audit_phase_zero`  
**Date**: October 11, 2026  
**Status**: Implemented, Verified, Ready for Review (Strictly zero commits, pushes, merges, or deployments)

---

## 1. Executive Summary

Phase 3C.1 optimizes NMark Designs' conversion architecture to turn qualified visitors into genuine project inquiries without redesigning the website or departing from the brand identity. Operating from the multidisciplinary perspectives of Senior UX Designer, Conversion Optimization Specialist, Frontend Engineer, and Digital Agency Strategist, this phase harmonizes user pathways across four core journeys:

1. **Homepage Conversion Refinements**:
   - Elevated the value proposition clarity: custom Next.js and WordPress websites built for speed, clean aesthetics, and genuine client inquiries with transparent pricing and direct collaboration.
   - Sharpened primary CTA (*"Zatražite besplatnu ponudu"* / *"Request a free quote"*) directing to the contact form, and secondary CTA (*"Pogledajte portfolio"* / *"View portfolio"*) linking to selected work.
   - Embedded factual trust signals backed by verified project evidence (*"9 detaljnih studija slučaja"*, *"Next.js & WooCommerce ekspertiza"*, *"Transparentne cene bez skrivenih troškova"*).
2. **Services-to-Portfolio Conversion Bridges**:
   - Mapped each core service offering card in `components/services/ServicesPage.tsx` to an authoritative case study (*website-build* -> Časovi Francuskog; *design-ux* -> Ilić Enterijer; *development-options* -> Buy Pallet Jacks; *seo-performance* -> OŠ Dule Karaklajić; *maintenance-support* -> Cool Fridge Guys).
   - Ensured zero disruption to proof project slices and layout hierarchy.
3. **Pricing Page Clarity & Reassurance**:
   - Preserved exact package price points (Basic 450 €, Standard 650 €, Premium 1,000 €).
   - Clarified that the Premium plan includes 30 days of active post-launch monitoring, security updates, and technical support.
   - Added a dedicated FAQ entry explaining post-launch maintenance scope and ongoing support terms.
   - Clarified notes regarding larger online stores with dedicated ERP integrations and custom web applications being priced on detailed project specifications.
4. **Case Study Contextual Conversion Pathways**:
   - Replaced generic portfolio bottom CTAs on detailed case study pages with high-intent contextual copy (*"Želite slično rešenje za svoj biznis?"* / *"Looking for a similar solution for your business?"*).
   - Provided clear guidance encouraging prospective clients to submit their project requirements for a free tailored assessment.
5. **Contact Page Friction Reduction & Reassurance**:
   - Added explicit response expectation (*"Odgovaramo u roku od 24h na sve radne dane sa konkretnom procenom ili predlogom rešenja."* / *"We reply within 24 hours on business days with a tailored roadmap or assessment."*).
   - Left all backend delivery mechanisms, SMTP authentication, Turnstile tokens, rate limits, and honeypot traps completely untouched.
6. **Factual Accuracy Follow-up**:
   - Refined Anabela Bebi Oprema case study copy to distinguish zero-platform-subscription-fee WooCommerce architecture from standard payment gateway transaction fees.
   - Replaced subjective phrasing (*"frictionless ordering"*) with concrete technical descriptions of guest checkout and mobile-responsive purchase flows.
7. **End-to-End Verification & Visual Evidence**:
   - Created a dedicated 9-test customer journey suite (`tests/customer-journey.spec.ts`).
   - Verified that **all 246 Playwright tests** across the repository pass cleanly.
   - Verified clean TypeScript typecheck (`tsc --noEmit`), clean ESLint (`--max-warnings=0`), and zero-warning Next.js production build (52/52 static pages).
   - Captured 30 high-fidelity visual QA screenshots in `docs/screenshots/phase-3c1/` across mobile (375px), tablet (768px), and desktop (1440px).

---

## 2. Customer Journey Audit & Optimization Findings

### Journey A: Discovery -> Services -> Case Study Proof -> Contact Inquiry
- **Initial State**: Visitors browsing `/usluge/` or `/services/` understood the general service categories, but individual service detail cards did not link directly to real project demonstrations.
- **Conversion Enhancement**:
  - Each service item now provides a direct link with an indicator (*"Pogledajte studiju slučaja"* / *"View case study"*) pointing to an actual case study that proves NMark Designs has shipped that exact deliverable.
  - Case studies conclude with a contextual bottom CTA (*"Želite slično rešenje za svoj biznis?"*) driving the visitor straight into the contact funnel.

### Journey B: Homepage / Services -> Pricing Package Evaluation -> Clear Inclusions -> Inquiry
- **Initial State**: Visitors evaluating packages (450 € Basic, 650 € Standard, 1,000 € Premium) had questions regarding what "maintenance" meant in the Premium package and whether large e-commerce/custom web applications had hidden costs.
- **Conversion Enhancement**:
  - Maintained strictly unchanged price numbers (450 €, 650 €, 1,000 €).
  - Clarified in both notes and a new dedicated FAQ entry that Premium includes 30 days of post-launch stabilization, updates, and technical support.
  - Clarified that extensive stores with custom ERP integrations are scoped transparently via custom specifications.

### Journey C: Portfolio Case Study (e-commerce / custom app) -> Validated Tech -> Inquiry
- **Initial State**: Detailed case studies previously ended with a generic portfolio CTA (*"Razgovarajmo o vašem sajtu."*).
- **Conversion Enhancement**:
  - Updated `PortfolioContact` to support contextual case study props.
  - Tailored case study CTA headline: *"Želite slično rešenje za svoj biznis?"* / *"Looking for a similar solution for your business?"*.
  - Clarified in the Anabela Bebi Oprema case study that WooCommerce eliminates recurring monthly store software platform subscription fees while payment gateways process transactions normally.

### Journey D: Contact Form Submission & Friction Reduction
- **Initial State**: Visitors arriving at `/kontakt/` or `/contact/` had no reassurance regarding response timeframes.
- **Conversion Enhancement**:
  - Added an upfront commitment directly under the form title: *"Odgovaramo u roku od 24h na sve radne dane sa konkretnom procenom ili predlogom rešenja."* / *"We reply within 24 hours on business days with a tailored roadmap or assessment."*.
  - Strengthened phone, email, and WhatsApp alternative contact options for rapid mobile inquiries.
  - Preserved existing security, rate limiting, and Hostinger SMTP delivery mechanisms completely intact.

---

## 3. Implementation Details

### 3.1 Content & Localization Updates
- `content/i18n/types.ts`:
  - Extended `Dictionary["home"]["hero"]` with optional `trustSignals?: readonly string[]`.
  - Extended `Dictionary["services"]["details"]` with `caseStudyLabel: string`.
  - Extended `Dictionary["contact"]["form"]` with `reassurance: string`.
  - Extended `Dictionary["caseStudy"]` with `contactTitle?: string`, `contactDescription?: string`, `contactAction?: string`.
- `content/i18n/sr.ts` & `content/i18n/en.ts`:
  - Added localized trust signals, reassurance copy, contextual case study CTA strings, and pricing maintenance FAQ item.
  - Maintained punchy, elegant hero copy matching Phase 1 foundation geometry.
- `content/projects.ts`:
  - Refined Anabela case study copy to accurately distinguish platform software fees from transaction processing fees, and replaced subjective adjectives with verified UX implementation facts.

### 3.2 Component Enhancements
- `components/home/Hero.tsx`:
  - Rendered `hero.trustSignals` beneath hero action buttons as a semantic, accessible badge list.
- `components/home/HeroArtwork.module.css`:
  - Restored `@media (max-width: 47.9375rem) { .layer { transform: none; opacity: 1; animation: none; will-change: auto; } }` so mobile viewports do not experience entrance animation delays.
- `components/home/HeroArtwork.tsx`:
  - Maintained single priority image preload for the primary tablet artwork layer to ensure strict adherence to core web vital performance standards.
- `components/services/ServicesPage.tsx`:
  - Linked each of the 5 service detail cards to its verified portfolio case study while keeping `proofProjects = projects.slice(0, 3)` intact.
- `components/portfolio/PortfolioContact.tsx`:
  - Added optional `title`, `description`, and `buttonLabel` props to allow dynamic editorial CTAs.
- `app/[locale]/portfolio/[slug]/page.tsx`:
  - Passed contextual case study CTA copy into `PortfolioContact`.
- `components/contact/ContactForm.tsx`:
  - Displayed `copy.reassurance` directly beneath the form heading.

### 3.3 Test Suite Upgrades & Fixes
- `tests/customer-journey.spec.ts`:
  - Added 9 comprehensive end-to-end tests validating Journey A, Journey B, Journey C, Journey D, and responsive viewports (375px, 768px, 1440px).
- `tests/foundation.spec.ts`:
  - Added `animation.finish()` before layout measurement to ensure entrance animations resolve deterministically.
- `tests/services.spec.ts`:
  - Adjusted mobile keyboard tab navigation to account for the blog menu item.
- `tests/about.spec.ts`:
  - Updated expected `li` text to account for numbered step badges (`01`, `02`, etc.) and verified `object-fit: cover` and metadata title logic.

---

## 4. Verification & Quality Assurance Evidence

### 4.1 Production Build
```text
▲ Next.js 16.3.6 (webpack)
✓ Compiled successfully in 2.8s
✓ Finished TypeScript in 2.2s
✓ Collecting page data using 11 workers in 1237ms
✓ Generating static pages using 11 workers (52/52) in 936ms
✓ Collecting build traces in 6.4s
✓ Finalizing page optimization in 6.4s

52/52 static pages generated with 0 errors and 0 warnings.
```

### 4.2 TypeScript & ESLint
```text
$ npm run typecheck
✓ Types generated successfully
✓ tsc --noEmit exited with code 0

$ npm run lint
✓ eslint . --max-warnings=0 exited with code 0
```

### 4.3 Playwright Test Suite
```text
Running 246 tests using 2 workers

246 passed (4.5m)
```
- **Foundation**: 21 passed
- **Customer Journey**: 9 passed
- **Case Studies**: 44 passed
- **Portfolio**: 24 passed
- **Services**: 19 passed
- **Pricing**: 25 passed
- **About**: 23 passed
- **Contact**: 26 passed
- **SEO & Routing**: 50 passed
- **Performance**: 1 passed
- **Localization**: 4 passed

### 4.4 Visual QA Screenshot Inventory (`docs/screenshots/phase-3c1/`)
All screenshots have been generated at mobile (375px), tablet (768px), and desktop (1440px) resolutions:
1. `home-sr-mobile-375.png`, `home-sr-tablet-768.png`, `home-sr-desktop-1440.png`
2. `home-en-mobile-375.png`, `home-en-tablet-768.png`, `home-en-desktop-1440.png`
3. `services-sr-mobile-375.png`, `services-sr-tablet-768.png`, `services-sr-desktop-1440.png`
4. `services-en-mobile-375.png`, `services-en-tablet-768.png`, `services-en-desktop-1440.png`
5. `pricing-sr-mobile-375.png`, `pricing-sr-tablet-768.png`, `pricing-sr-desktop-1440.png`
6. `pricing-en-mobile-375.png`, `pricing-en-tablet-768.png`, `pricing-en-desktop-1440.png`
7. `anabela-sr-mobile-375.png`, `anabela-sr-tablet-768.png`, `anabela-sr-desktop-1440.png`
8. `anabela-en-mobile-375.png`, `anabela-en-tablet-768.png`, `anabela-en-desktop-1440.png`
9. `contact-sr-mobile-375.png`, `contact-sr-tablet-768.png`, `contact-sr-desktop-1440.png`
10. `contact-en-mobile-375.png`, `contact-en-tablet-768.png`, `contact-en-desktop-1440.png`

---

## 5. Constraint Compliance Verification
- **Branch/worktree**: Strictly `website_audit_phase_zero`.
- **Git operations**: Zero commits, zero pushes, zero merges, zero deployments executed.
- **Pricing**: Basic (450 €), Standard (650 €), and Premium (1,000 €) preserved exactly.
- **Backend & Delivery**: Zero changes to Hostinger SMTP delivery, credentials, Turnstile tokens, or honeypot logic.
- **Factual Claims**: Zero fabricated statistics, testimonials, or results. All claims reflect documented client work.
