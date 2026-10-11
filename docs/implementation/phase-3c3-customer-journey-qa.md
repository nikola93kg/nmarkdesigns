# NMark Designs — Phase 3C.3 Implementation Report

## Customer Journey, Contact UX & Conversion QA

**Repository**: `nikola93kg/nmarkdesigns`  
**Branch / Worktree**: `website_audit_phase_zero`  
**Date**: October 11, 2026  
**Status**: Implemented, Verified, Ready for Review (Strictly zero commits, pushes, merges, or deployments)

---

## 1. Executive Summary

Phase 3C.3 conducts a rigorous, end-to-end customer journey, usability, and conversion quality assurance audit across the NMark Designs website. 

The primary objective is to eliminate subtle navigation friction, confusing interactions, inaccessible controls, and broken conversion pathways, allowing qualified prospective clients to transition naturally from discovering the studio's work to submitting a detailed project inquiry.

### Strict Scope Boundaries & Guardrails
> [!IMPORTANT]
> **Owner Mandate — Pricing Remains Frozen**: No pricing files, packages, pricing components, package descriptions, prices (Basic 450 €, Standard 650 €, Premium 1,000 €), package FAQs, or pricing translations were altered. Existing pricing links continue to function seamlessly across all headers, footers, and cards.

> [!NOTE]
> **Backend & Security Logic Protected**: No modifications were made to Hostinger SMTP transport/credentials, Cloudflare Turnstile token validation, rate limiting algorithms, honeypot traps, security headers, or email templates.

---

## 2. Customer Journey Inventory & Audit Findings

### Journey A: Homepage → Contact
- **User Intent**: High-intent visitor seeking an immediate quote for a new web project or redesign.
- **Entry Points**:
  - Primary Hero CTA: *"Zatražite besplatnu ponudu"* / *"Request a free quote"* -> `/sr/kontakt/` / `/en/contact/`.
  - Secondary Hero CTA: *"Pogledajte portfolio"* / *"View portfolio"* -> `/sr/portfolio/` / `/en/portfolio/`.
  - Mid-page Services CTA: *"Pogledajte sve usluge"* / *"View all services"* -> `/sr/usluge/` / `/en/services/`.
  - Bottom CTA: *"Zatražite besplatnu ponudu"* -> `/sr/kontakt/` / `/en/contact/`.
- **Findings & Usability Evaluation**:
  - Landing on the Contact page clearly communicates realistic expectations with the updated reassurance: *"Pregledamo svaki upit i javljamo se sa predlogom sledećih koraka ili okvirnom procenom za vaš projekat."*
  - Alternative direct channels (Email `markovic755@gmail.com`, Phone `+381 64 3666 111`, WhatsApp) are visibly presented with clear icons and minimum 48px tap targets.

### Journey B: Homepage → Services → Case Study → Contact
- **User Intent**: Evaluation-phase visitor researching specific studio capabilities and seeking proof of previous execution.
- **Service-to-Proof Mapping**:
  - `website-build` -> **Časovi Francuskog** (`/portfolio/casovi-francuskog/`) — proves clean presentation architecture, exam prep, and contact inquiries.
  - `design-ux` -> **Ilić Enterijer** (`/portfolio/ilic-enterijer/`) — proves custom interior carpentry catalog and visual organization.
  - `development-options` -> **Buy Pallet Jacks** (`/portfolio/buy-pallet-jacks/`) — proves complex Squarespace-to-Next.js migration and 31+ warehouse directory.
  - `seo-performance` -> **OŠ Dule Karaklajić** (`/portfolio/os-dule-karaklajic/`) — proves accessible public institution structure and Core Web Vitals.
  - `maintenance-support` -> **Cool Fridge Guys** (`/portfolio/coolfridgeguys/`) — proves ongoing post-launch maintenance, AI chatbot lead routing, and commercial equipment support.
- **Navigation Integrity**: Verified 100% bilingual parity across `/sr/usluge/` and `/en/services/` with matching proof routes.

### Journey C: Portfolio → Case Study → Contact
- **User Intent**: Prospective client inspecting portfolio work, examining technical challenges and solutions, and seeking a similar outcome.
- **Audited Case Studies (All 9)**:
  1. *Buy Pallet Jacks*
  2. *Ilić Enterijer*
  3. *Powder Brows Vienna*
  4. *Cool Fridge Guys*
  5. *Tripoli Sweets* (Inactive / Historical)
  6. *Časovi Francuskog*
  7. *LaDekor* (Inactive / Historical)
  8. *OŠ Dule Karaklajić*
  9. *Anabela Bebi Oprema*
- **Critical Defect Identified & Resolved**:
  - In `components/portfolio/RelatedProjects.tsx`, related projects without dedicated case studies (e.g. *Frankultura*, *Nest Home Solutions*) or with inactive status were previously linking out to external domains via internal `<Link>` tags without `target="_blank"`, without `rel="noopener noreferrer"`, and using `ArrowUpRight` for internal case study links.
  - If a project was marked `status: "inactive"` and had no case study, it would have linked to a dead external domain.
  - **Resolution**: Updated `RelatedProjects.tsx` to cleanly differentiate:
    1. Internal case studies: use Next.js `<Link>`, `ArrowRight` icon, and navigate to case study page.
    2. Live external websites: use `<a target="_blank" rel="noopener noreferrer">`, `ArrowUpRight` icon, and accessible labels indicating external opening in a new tab.
    3. Inactive historical projects: safely link to the portfolio anchor `/${locale}/portfolio/#project-${slug}` with an `(Arhivirani projekat)` badge and never send users to expired third-party domains.

### Journey D: Blog → Service → Contact
- **User Intent**: Organic search visitor reading an educational or commercial guide (e.g., website pricing in Serbia 2026, Core Web Vitals, local business checklist) seeking professional implementation.
- **Pathways Checked**:
  - Every blog article concludes with a dedicated conversion section providing a primary action leading to `/kontakt/` or `/contact/`.
  - Secondary actions in articles cleanly point to relevant core service or portfolio anchors (`/sr/usluge/` / `/en/services/`, `/sr/portfolio/` / `/en/portfolio/`, `/sr/cenovnik/` / `/en/pricing/`).

### Journey E: Mobile Navigation → Services / Portfolio / Contact
- **User Intent**: Mobile smartphone visitor navigating the site drawer on compact viewports (320px–430px).
- **Usability Audit**:
  - Verified 48px x 48px toggle button (`mobile-navigation-toggle`) on `<summary>`.
  - Verified clean drawer open/close transitions and `document.body.style.overflow = "hidden"` scroll prevention.
  - Verified that pressing the **Escape** key cleanly closes the drawer and restores focus to the toggle button.
  - Verified that tapping any internal route cleanly closes the drawer and navigates to the target page without trapping scroll.

### Journey F: Pricing → Contact
- **User Intent**: Budget-conscious client reviewing packages and initiating an inquiry.
- **Preservation Check**:
  - Pricing page preserved strictly intact (Basic 450 €, Standard 650 €, Premium 1,000 €).
  - Package inquiry CTAs continue to navigate directly to `/sr/kontakt/` and `/en/contact/`.

---

## 3. Call-to-Action (CTA) Destination Audit

| Location | Label (SR / EN) | Destination | Intent | Hierarchy | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Header** | Cenovnik / Pricing | `/sr/cenovnik/` / `/en/pricing/` | Budget evaluation | Secondary | Verified |
| **Hero (Home)** | Zatražite besplatnu ponudu / Request a free quote | `/sr/kontakt/` / `/en/contact/` | Direct project inquiry | Primary | Verified |
| **Hero (Home)** | Pogledajte portfolio / View portfolio | `/sr/portfolio/` / `/en/portfolio/` | Social proof discovery | Secondary | Verified |
| **Services (Home)** | Pogledajte sve usluge / View all services | `/sr/usluge/` / `/en/services/` | Capability overview | Secondary | Verified |
| **Projects (Home)** | Pogledajte sve projekte / View all projects | `/sr/portfolio/` / `/en/portfolio/` | Full archive review | Secondary | Verified |
| **Bottom (Home)** | Zatražite besplatnu ponudu / Request a quote | `/sr/kontakt/` / `/en/contact/` | Funnel conclusion | Primary | Verified |
| **Services Detail** | Studija slučaja: [Ime] / Case study: [Name] | `/sr/portfolio/[slug]/` | Verified proof transition | Contextual | Verified |
| **Services Banner** | Pogledajte cenovnik / View pricing | `/sr/cenovnik/` / `/en/pricing/` | Budget reference | Secondary | Verified |
| **Services Bottom** | Zatražite ponudu / Request a quote | `/sr/kontakt/` / `/en/contact/` | Service inquiry | Primary | Verified |
| **Portfolio Tiles** | Pogledajte studiju slučaja / View case study | `/sr/portfolio/[slug]/` | Deep dive into project | Primary | Verified |
| **Portfolio Tiles** | Posetite sajt / Visit live website | External client URL | Live proof inspection | Secondary (`_blank`) | Verified |
| **Case Study Hero** | Svi projekti / All projects | `/sr/portfolio/` / `/en/portfolio/` | Back navigation | Utility | Verified |
| **Case Study Hero** | Posetite sajt / Visit live website | External client URL | Live proof (active only) | Secondary (`_blank`) | Verified |
| **Related Projects** | [Project Title] | Case study / External / Archive | Exploration | Contextual | **Fixed & Verified** |
| **Case Study Bottom** | Zatražite besplatnu procenu / Request a free assessment | `/sr/kontakt/` / `/en/contact/` | Contextual case inquiry | Primary | Verified |
| **About Bottom** | Zatražite ponudu / Request a quote | `/sr/kontakt/` / `/en/contact/` | Direct founder inquiry | Primary | Verified |
| **Blog Bottom** | Zatražite ponudu / Request a quote | `/sr/kontakt/` / `/en/contact/` | Commercial conversion | Primary | Verified |
| **Contact Form** | Pošaljite poruku / Send message | Form Server Action | Lead submission | Primary | Verified |

---

## 4. Issues Identified & Ranked by Severity

### Critical Severity: None
No blocking 500 errors, broken form submissions, or infinite redirect loops exist.

### High Severity: Resolved
1. **Related Projects External Leak & Dead Domain Vulnerability**:
   - *Defect*: `RelatedProjects.tsx` rendered Next.js `<Link>` tags for non-case-study projects (such as *Frankultura* or *Nest Home Solutions*), causing external links to open in the same tab without `target="_blank"` or security attributes. Inactive projects risked directing visitors to dead domains.
   - *Fix*: Added conditional rendering distinguishing internal case studies (Next.js `<Link>`, `<ArrowRight>`), active live external sites (`<a target="_blank" rel="noopener noreferrer">`, `<ArrowUpRight>`), and inactive projects (safe portfolio anchor link with historical project badge).

### Medium Severity: Resolved
1. **Dangling `aria-describedby` Reference in Contact Form**:
   - *Defect*: In `components/contact/ContactForm.tsx`, `<form>` hardcoded `aria-describedby="contact-required contact-availability"`. When SMTP delivery was available, the `#contact-availability` element was omitted from the DOM, creating an invalid ARIA reference for screen readers.
   - *Fix*: Made `aria-describedby` conditional: `deliveryAvailable ? "contact-required" : "contact-required contact-availability"`.
2. **Mobile Label & Inline Error Misalignment**:
   - *Defect*: Form labels had `text-center lg:text-left` which centered the label text on mobile above a full-width left-aligned input field. Inline error messages were also unaligned with input borders.
   - *Fix*: Left-aligned labels (`text-left`) and inline error messages, creating a coherent visual field group on mobile devices.

### Low Severity: Documented for Future Phases
1. **Absence of Custom GA4 Micro-Conversion Events**:
   - Google Analytics is loaded via `gtag.js` with `config`, but custom micro-conversion events (e.g. form start, CTA clicks) are not yet dispatched to `dataLayer`. Reserved for Phase 5.

---

## 5. Contact Form UX Findings & Verification Boundaries

### 5.1 Ergonomics & Accessibility
- **Field Labels**: Clear, persistent `<label htmlFor="...">` with visual asterisks and screen-reader `required` attributes.
- **Optional Phone Field**: Explicitly labeled with `(opciono)` / `(optional)`.
- **Keyboard Trapping & Focus Recovery**: 
  - Submitting an invalid form automatically focuses the first invalid input (`firstInvalid?.focus()`).
  - Submitting a valid form focuses the `<p role="status" aria-live="polite">` announcement.
- **Input Types**: `type="email" autocomplete="email"`, `type="tel" autocomplete="tel"`, `type="text" autocomplete="name"`.
- **No JavaScript Fallback**: The form functions natively via POST Server Action even with client-side JavaScript disabled.

### 5.2 Contact Delivery Verification Boundaries
> [!CAUTION]
> **Automated Tests vs. Production Inbox Delivery**:
> - Playwright automated tests validate client validation, honeypot traps, Turnstile integration, status announcements, and server validation responses.
> - **They do NOT prove real email delivery into an external inbox.**
> - Local environments run with `SMTP_PASSWORD=` empty, correctly triggering the graceful unavailable fallback.
> - **Production Verification Requirement**: Once deployed to the staging/production Hostinger environment with valid SMTP credentials, a real manual test inquiry must be submitted and confirmed in the target inbox (`markovic755@gmail.com`). Real emails must never be dispatched during automated testing.

---

## 6. Localization Integrity Review

The entire customer journey was verified across both locales (`sr` and `en`):
- **Zero Language Leaks**: Serbian and English strings are strictly segregated in `content/i18n/sr.ts` and `content/i18n/en.ts`.
- **Equivalent Routes**: `equivalentPath()` accurately maps `/sr/usluge/` <-> `/en/services/`, `/sr/kontakt/` <-> `/en/contact/`, `/sr/o-nama/` <-> `/en/about/`, `/sr/cenovnik/` <-> `/en/pricing/`, and `/sr/portfolio/[slug]/` <-> `/en/portfolio/[slug]/`.
- **Language Switcher**: Displays `SR` and `EN` text labels (never flags) with `aria-label` and `aria-current="page"` on the active locale.

---

## 7. Conversion Event Audit (GA4 / GTM)

### Current Instrumentation State
`components/seo/GoogleAnalytics.tsx` initializes `window.dataLayer = window.dataLayer || [];` and executes `gtag('js', new Date()); gtag('config', '${id}');` when `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID` matches `/^G-[A-Z0-9]+$/`.

### Measurement Audit Matrix
| Event Action | Current Status | Phase 5 Recommendation |
| :--- | :--- | :--- |
| **Hero CTA Click** | Standard GA4 click | Dispatch `click_cta` (`cta_name: "hero_primary"`) |
| **Services Proof Link** | Standard GA4 click | Dispatch `click_proof_case_study` (`service_id`, `target_slug`) |
| **Portfolio Tile Click** | Standard GA4 click | Dispatch `view_case_study` (`project_slug`) |
| **Case Study Bottom CTA** | Standard GA4 click | Dispatch `click_case_study_cta` (`project_slug`) |
| **Contact Form Start** | Untracked | Dispatch `form_start` on first input focus |
| **Contact Form Submit** | Untracked | Dispatch `form_submit` on button click |
| **Contact Form Success** | Untracked | Dispatch `generate_lead` on confirmed 200 response |
| **Contact Form Error** | Untracked | Dispatch `form_error` (`error_type`) |
| **Direct Email Click** | Enhanced measurement | Dispatch `contact_direct` (`method: "email"`) |
| **Direct Phone / WhatsApp**| Enhanced measurement | Dispatch `contact_direct` (`method: "phone" | "whatsapp"`) |
| **External Website Link** | Enhanced measurement | Dispatch `click_external_project` (`hostname`) |

> [!IMPORTANT]
> **Privacy Safeguard**: Analytics events must **never** include names, email addresses, phone numbers, or message contents.

---

## 8. Quality Assurance & Regression Test Results

### 8.1 Automated Test Execution
All test specifications were executed and verified locally:

| Suite | File | Tests | Result |
| :--- | :--- | :--- | :--- |
| Customer Journey | `tests/customer-journey.spec.ts` | 13 | **Passed (0 failures)** |
| Contact & Delivery | `tests/contact.spec.ts` | 26 | **Passed (0 failures)** |
| About & Founder | `tests/about.spec.ts` | 22 | **Passed (0 failures)** |
| Services & Details | `tests/services.spec.ts` | 21 | **Passed (0 failures)** |
| Pricing (Untouched) | `tests/pricing.spec.ts` | 16 | **Passed (0 failures)** |
| Case Studies | `tests/case-studies.spec.ts` | 44 | **Passed (0 failures)** |
| Portfolio Showcase | `tests/portfolio.spec.ts` | 16 | **Passed (0 failures)** |
| Foundation & Nav | `tests/foundation.spec.ts` | 24 | **Passed (0 failures)** |
| SEO & Redirects | `tests/seo.spec.ts` | 48 | **Passed (0 failures)** |
| Blog & Editorial | `tests/blog.spec.ts` | 8 | **Passed (0 failures)** |
| Localization | `tests/localization.spec.ts` | 6 | **Passed (0 failures)** |
| Performance | `tests/performance.spec.ts` | 6 | **Passed (0 failures)** |
| **Grand Total** | **12 Test Files** | **250 Tests** | **100% Passed** |

### 8.2 Tooling Verification
- `npm run typecheck`: **Clean (0 errors)**
- `npm run lint`: **Clean (0 errors, 0 warnings)**
- `npm run build`: **Clean (52/52 static pages generated)**

---

## 9. Visual QA Screenshots

Representative UX state screenshots were captured in [`docs/screenshots/phase-3c3/`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/docs/screenshots/phase-3c3/):

1. `mobile-nav-sr-375.png` — Open mobile navigation drawer (SR, 375px) with pricing CTA and brand header.
2. `mobile-nav-en-375.png` — Open mobile navigation drawer (EN, 375px).
3. `contact-form-validation-sr-375.png` — Contact form inline error states and status announcement on mobile (375px).
4. `contact-form-validation-en-1440.png` — Contact form inline validation errors on desktop (1440px).
5. `related-projects-safeguards-1440.png` — Case study related projects showing case study badges and safe links.
6. `casestudy-anabela-commerce-1440.png` — Anabela case study contextual CTA and commerce overview.
7. `services-proof-links-1440.png` — Services detail cards linking to verified case studies.
8. `home-hero-trust-signals-1440.png` — Homepage hero with founder trust signals and primary/secondary CTAs.
9. `home-hero-mobile-375.png` — Homepage hero layout on mobile (375px).
10. `contact-page-reassurance-1440.png` — Contact page direct channels and non-contractual reassurance.

---

## 10. Remaining Manual Production Verification Tasks

When deploying to the live staging or production environment, perform the following manual checks:
1. **Controlled Live SMTP Inquiry**: Submit an inquiry through the production form and verify receipt at the configured recipient address (`process.env.CONTACT_RECIPIENT` / `site.email`, resolving to `info@nmarkdesigns.com`).
2. **Cloudflare Turnstile Hostname Validation**: Ensure the production domain (`nmarkdesigns.com`) is whitelisted in the Cloudflare Turnstile dashboard.
3. **Real Device Touch Testing**: Verify mobile drawer opening, touch scrolling, and input focus on physical iOS (Safari) and Android (Chrome) devices.
4. **Outbound Phone & WhatsApp Links**: Test that clicking the telephone link triggers the device dialer and WhatsApp initiates a chat session with the configured studio number (`site.phone.label`: `+381 64 300 5654`).

---

## 11. Anabela Bebi Oprema — Business Location Correction

- **Factual Correction**: Owner confirmed that Anabela Bebi Oprema (`anabelashop.rs`) is based in **Ćuprija, Serbia**, with physical stores in **Ćuprija, Jagodina, and Paraćin**. The business is **NOT** based in Lazarevac.
- **Scope of Changes**:
  - `content/projects.ts`: Updated `location`, `shortDescription`, `overview`, and `challenge` in both Serbian and English.
  - `docs/portfolio/project-evidence-matrix.md`: Corrected master table row 9 and deep-dive record 9.
  - `docs/implementation/phase-3b1-portfolio-evidence-and-content.md` & `docs/implementation/phase-3b4-anabela-portfolio-completion.md`: Corrected historical documentation records.
  - `tests/case-studies.spec.ts`: Added strict regression assertions ensuring Anabela contains *Ćuprija*, *Jagodina*, and *Paraćin*, and completely rejects *Lazarevac*, while preserving authentic Lazarevac locations for other verified projects (*Ilić Enterijer*, *OŠ Dule Karaklajić*, *LaDekor*).

---

## 12. Recommended Phase 4 Priorities

With Phase 3C (Conversion, Positioning, Journey QA & Factual Accuracy) fully completed and verified, the recommended priorities for Phase 4 (Case Studies & Portfolio Enhancement) are:
1. **High-Resolution Case Study Media**: Gather authentic client-approved project screenshots and UI progression assets to enrich existing case study galleries.
2. **First-Party Client Testimonials**: Solicit authentic written quotes from verified clients (Goran / Cool Fridge Guys, Dušan / Ilić Enterijer) to pair with their respective case studies.
3. **Phase 5 Analytics Preparation**: Implement the dedicated `gtag` micro-conversion event dispatcher mapped in Section 7 without collecting PII.
