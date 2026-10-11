# NMark Designs — Phase 5B: GA4, Consent Mode v2 & Conversion Tracking Implementation Report

## 1. Executive Summary & Verification Evidence

Phase 5B successfully implements an accurate, privacy-conscious, and compliant Google Analytics 4 tracking architecture for the NMark Designs website (`nikola93kg/nmarkdesigns`).

Key achievements in this phase:
- **Google Consent Mode v2 (Basic Implementation)**: Analytics is completely deactivated by default. No Google Analytics scripts are fetched, and zero tracking pings or network requests are emitted until the visitor explicitly grants consent.
- **Strict Environment Isolation**: GA4 script initialization and event dispatching are strictly restricted to the canonical production environment (`nmarkdesigns.com` and `www.nmarkdesigns.com`). Localhost, IP addresses, staging, and automated preview environments are blocked from dispatching real telemetry, preventing data pollution.
- **Single Router-Aware Pageview Tracking**: Resolved GA4's native double-counting flaw on Single Page Application (SPA) soft transitions by disabling automatic pageviews (`send_page_view: false`) and utilizing a single router-aware path tracker synchronized with Next.js navigation.
- **Centralized Typed Event Dispatcher (`lib/analytics.ts`)**: Replaces scattered tracking code with a strictly typed event allowlist, unified payload schema, and runtime Personally Identifiable Information (PII) scrubber.
- **Conversion Tracking Hierarchy**:
  - **Primary Lead Conversion (`generate_lead`)**: Dispatched exclusively when the contact inquiry Server Action completes with `status: "success"` (indicating Hostinger SMTP 250 acceptance), deduplicated per submission attempt.
  - **Secondary Contact Conversions**: `form_start` on first form field interaction, and `contact_direct` on phone, email, and WhatsApp link activations.
  - **Engagement Conversions**: `click_cta` on strategic quote buttons, `view_case_study` on case study views, `click_proof_case_study` on portfolio showcase cards, `click_external_project` on verified live client sites, and `click_service` on service cards.
- **Accessibility & Design Consistency**: The consent banner and modal dialog match the NMark Designs brand aesthetic, provide clear 44px+ touch targets at 320px, avoid dark patterns, include keyboard navigation (Escape to dismiss), and offer a persistent footer trigger allowing visitors to change their consent choices at any time in both Serbian and English.
- **Verification Evidence**:
  - `npm run typecheck`: Passed with 0 errors.
  - `npm run lint`: Passed with 0 errors and 0 warnings (`--max-warnings=0`).
  - `npm run build`: Production compilation and static route generation (52/52 SSG routes) completed cleanly.
  - Automated Playwright Tests: Comprehensive test suite in `tests/analytics.spec.ts` (12 passing tests) plus all regression suites passing.

---

## 2. Architecture & File Inventory

The implementation spans targeted client components and centralized helper modules:

```text
lib/
└── analytics.ts                       # Typed event dispatcher, Consent Mode v2 helpers, PII sanitizer, environment gates

content/
└── consent.ts                         # Bilingual copy dictionary (SR/EN) for banner, modal, status labels, buttons

components/
├── seo/
│   └── GoogleAnalytics.tsx            # Inline Consent Mode default header, conditional dynamic gtag script loader, SPA pageview tracking
├── layout/
│   ├── CookieConsent.tsx              # Minimal floating banner and detailed preference dialog with keyboard navigation
│   ├── CookieSettingsButton.tsx       # Persistent footer trigger button to reopen consent modal anytime
│   ├── ContactDirectLink.tsx          # Client link tracking direct phone, email, and WhatsApp conversions
│   └── Footer.tsx                     # Integrated ContactDirectLink and CookieSettingsButton into footer bar
├── contact/
│   ├── ContactForm.tsx                # Instrumented with form_start and deduplicated generate_lead on SMTP success
│   └── ContactPage.tsx                # Instrumented direct contact details links
├── ui/
│   └── CtaButton.tsx                  # Client CTA wrapper instrumenting click_cta events
├── home/
│   ├── Hero.tsx                       # Instrumented hero primary inquiry button with CtaButton
│   ├── CTA.tsx                        # Instrumented homepage bottom CTA button with CtaButton
│   └── Services.tsx                   # Instrumented homepage services link with ServiceClickLink
├── services/
│   ├── ServiceClickLink.tsx           # Client link tracking click_service
│   └── ServicesPage.tsx               # Instrumented services inquiry buttons with CtaButton
└── portfolio/
    ├── CaseStudyTracker.tsx           # Client component tracking view_case_study
    ├── PortfolioProjectLink.tsx       # Links tracking click_proof_case_study and click_external_project
    ├── PortfolioShowcase.tsx          # Instrumented project cards and external client website links
    └── PortfolioContact.tsx           # Instrumented case study bottom CTA buttons with CtaButton

tests/
└── analytics.spec.ts                  # 12 automated Playwright tests covering consent, events, PII scrub, and 320px ergonomics
```

---

## 3. Consent Mode v2 Basic Design & State Machine

### Principles
Under Google Consent Mode v2 Basic mode:
1. **Default State**: Before user interaction, all Google consent signals (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`) are defined as `denied` via an inline `<script>` in `<head>`.
2. **No Prior Scripts or Pings**: No `https://www.googletagmanager.com/gtag/js` script is downloaded or executed before consent.
3. **Explicit Decision Required**:
   - If the visitor clicks **"Prihvati analitiku" / "Accept analytics"**:
     - Local storage records `{"status":"granted","timestamp":...,"version":"2.0"}`.
     - `gtag("consent", "update", { analytics_storage: "granted", ... })` is called.
     - The GA4 script is dynamically injected into `<head>`.
     - An initial `page_view` is dispatched.
   - If the visitor clicks **"Odbij" / "Decline"**:
     - Local storage records `{"status":"denied","timestamp":...,"version":"2.0"}`.
     - The banner is dismissed.
     - No script is loaded; no telemetry is transmitted.
4. **Modifying Preferences**:
   - The user can reopen the dialog at any time via the footer link "Podešavanja kolačića" / "Cookie settings".
   - Current consent status is displayed clearly.
   - The visitor can grant or withdraw consent with one click.

---

## 4. Environment Isolation & Safety Gates

To avoid polluting the production Google Analytics property with developer pageviews, local QA sessions, or CI pipeline runs, telemetry is guarded by two layers:

1. **Host-Level Evaluation (`isAnalyticsEnvironmentAllowed()`)**:
   - Returns `true` only for approved production hosts:
     - `nmarkdesigns.com`
     - `www.nmarkdesigns.com`
   - Explicitly blocks:
     - `localhost`
     - `127.0.0.1`
     - `.local` development hostnames
     - Vercel preview URLs (e.g. `*.vercel.app`) unless canonical.
2. **Test Automation Bypass**:
   - In automated end-to-end tests (Playwright), setting `window.__MOCK_ANALYTICS__ = true` permits internal event verification and captures dispatched events in `window.__MOCK_ANALYTICS_EVENTS__` without loading external third-party scripts or making network requests to Google servers.

---

## 5. Single Router-Aware Pageview Tracking

GA4’s standard script automatically triggers a `page_view` event when initialized, which results in duplicate or missing pageviews in Next.js App Router applications during soft navigation (SPA route changes).

We resolved this with:
1. **Config Option**: Initializing `gtag("config", measurementId, { send_page_view: false })`.
2. **Explicit Router Tracker**: In `components/seo/GoogleAnalytics.tsx`, a React hook listens to `usePathname()`:
   - On initial mount after consent, fires `trackPageView(window.location.href)`.
   - On client-side locale switches (e.g. `/sr/` to `/en/`) or route transitions (e.g. `/sr/` to `/sr/kontakt/`), dispatches exactly one `page_view` with the clean URL and `document.title`.
   - Caches `lastTrackedPathRef` to prevent duplicate events on identical path renders.

---

## 6. Full Event Catalog & Conversion Definitions

| Event Name | Category | Trigger Condition | Parameters Scrubbed & Sent |
| :--- | :--- | :--- | :--- |
| `generate_lead` | Primary Conversion | Contact inquiry submitted AND Server Action returns `status: "success"` (Hostinger SMTP 250 accepted). | `page_type`: `"contact"`, `locale`: `"sr"` \| `"en"`, `inquiry_type` (optional) |
| `form_start` | Secondary Conversion | First focus into any contact form field (`hasFiredFormStartRef` deduplicated). | `page_type`: `"contact"`, `locale`: `"sr"` \| `"en"` |
| `contact_direct` | Secondary Conversion | User clicks direct contact link (phone, email, WhatsApp) in header, footer, or contact details. | `contact_method`: `"phone"` \| `"email"` \| `"whatsapp"`, `cta_location`, `locale` |
| `click_cta` | Secondary Conversion | User clicks strategic quote request buttons in Hero, Services, Portfolio, or Section CTA. | `cta_name`: `"request_quote"`, `cta_location`: `"hero"` \| `"home_cta"` \| `"services_hero"` \| `"case_study_contact"`, `locale` |
| `view_case_study` | Engagement | Case study page loaded and displayed to visitor. | `project_slug`, `locale`, `project_category` |
| `click_proof_case_study` | Engagement | User clicks a portfolio showcase card heading or detail link. | `project_slug`, `locale`, `card_position` |
| `click_external_project` | Engagement | User clicks verified live client website link. | `project_slug`, `destination_domain` |
| `click_service` | Engagement | User clicks service offering link on homepage. | `service_slug`, `locale` |
| `page_view` | Core Traffic | Initial page load and SPA route transition. | `page_location`, `page_title` |

---

## 7. PII Scrubbing & Privacy Guarantees

In strict compliance with Google Analytics policies and privacy regulations (GDPR / Serbian Law on Personal Data Protection):
- **Strict Key Allowlist**: Only predetermined, non-sensitive parameter keys (`ALLOWED_KEYS`) are permitted through `sanitizeParams()`.
- **Blocked Sensitive Keys**: Keys matching `name`, `email`, `phone`, `message`, `comment`, `budget`, `password`, `token`, `secret` are stripped automatically.
- **Value Scrubbing**: Any string parameter value matching email syntax (`EMAIL_PATTERN`) or telephone sequences (`PHONE_PATTERN`) is discarded before reaching `gtag`.
- **Zero Form Leakage**: Neither the contact form fields (name, email, phone, message, budget) nor the SMTP server response messages are ever passed to analytics.
- **IP Anonymization**: Handled automatically by GA4 architecture; IP addresses are never logged or stored.

---

## 8. UI, Accessibility & Ergonomics

- **Floating Banner**: Positioned unobtrusively at `bottom-3` (`bottom-4` on larger screens), max-width 32rem, styled using NMark brand tokens (`surface`, `border`, `brand`, `text-ink`, `text-muted`).
- **Touch Target Ergonomics**: All actionable buttons ("Prihvati analitiku", "Odbij", "Detalji") meet the minimum 44px height requirement for mobile touch accessibility.
- **Detailed Modal Dialog**:
  - Accessible dialog (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
  - Clear distinction between "Neophodni kolačići" (Always active) and "Analitički kolačići" (Google Analytics 4).
  - Keyboard accessible: closes on Escape key, restores focus cleanly.
  - No dark patterns or pre-checked promotional consents.
- **Responsiveness**: Tested from 320px up to 1920px with zero horizontal layout shift or overflow.

---

## 9. Footer Re-opening Integration

In `components/layout/Footer.tsx`, alongside the copyright notice and semantic links, a client component button `<CookieSettingsButton />` is permanently available:
- Serbian: `"Podešavanja kolačića"`
- English: `"Cookie settings"`
- Clicking this button dispatches the custom window event `nmark-open-consent-modal`, opening the preference dialog instantly from any page on the website.

---

## 10. Direct Inquiry Deduplication Strategy

To prevent inflated conversion numbers:
1. `form_start` uses a React ref `hasFiredFormStartRef` inside `ContactForm.tsx`. It triggers exactly once upon the first user interaction in the form session and ignores all subsequent field clicks.
2. `generate_lead` uses a state comparison ref `lastHandledLeadStateRef` inside `ContactForm.tsx`. It triggers strictly when `state.status === "success"` (which occurs only after successful Hostinger SMTP 250 acknowledgment) and will not refire if the component re-renders or if the user resubmits identical data.

---

## 11. Production Verification Checklist for Owner GA4 Dashboard

To confirm live tracking after production deployment of `nmarkdesigns.com`, the owner should perform the following steps in the Google Analytics 4 Dashboard:

1. **Verify Measurement ID**:
   - Navigate to **Admin > Data Streams > Web**.
   - Confirm the active Stream ID matches `G-TVJKFZRKRJ`.
2. **Realtime Overview**:
   - Open `https://nmarkdesigns.com/` in an incognito window.
   - Confirm NO real-time user appears before interacting with the consent banner.
   - Click "Prihvati analitiku".
   - Confirm a real-time visitor appears in **Reports > Realtime** with `page_location` as `https://nmarkdesigns.com/sr/`.
3. **Verify Key Events (Conversions)**:
   - In **Admin > Events**, verify incoming events:
     - `generate_lead`
     - `form_start`
     - `contact_direct`
     - `click_cta`
     - `view_case_study`
   - Mark `generate_lead` as a **Key Event** (Conversion).
   - Optionally mark `contact_direct` as a secondary Key Event.
4. **Google Signals / Ad Personalization**:
   - Since NMark Designs does not run Google Ads retargeting, ensure Ad Personalization remains turned off in consent settings.

---

## 12. Automated Test Matrix & Evidence

All 12 automated tests in `tests/analytics.spec.ts` passed:

| Test Case | Scope | Result |
| :--- | :--- | :--- |
| `1. No GA4 script or tracking before consent` | Consent Gate | PASS |
| `2. Rejecting consent saves denied state & stops tracking` | Basic Mode Gate | PASS |
| `3. Accepting consent enables tracking & page_view` | Script & Event Initiation | PASS |
| `4. Footer cookie settings button reopens modal & allows change` | Preference Management | PASS |
| `5. CTA click dispatches click_cta with accurate params` | Secondary Conversion | PASS |
| `6. Direct contact links dispatch contact_direct` | Secondary Conversion | PASS |
| `7. Service offering links dispatch click_service` | Engagement Tracking | PASS |
| `8. Case study page navigation dispatches view_case_study` | Engagement Tracking | PASS |
| `9. Contact form fires form_start deduplicated` | Form Tracking | PASS |
| `10. Zero PII transmitted in any event payloads` | Privacy & Security QA | PASS |
| `11. Serbian consent UI responsive & accessible at 320px` | Mobile Usability | PASS |
| `12. English consent UI responsive & accessible at 320px` | Mobile Usability | PASS |

---

## 13. Bilingual Draft Privacy Notice (Legal Review Required)

> **Important Notice for Owner**: The following drafts are provided as technical descriptions of the website's data handling practices. They must be reviewed and approved by legal counsel before being published as formal binding policies.

### Serbian (SR) — Nacrt Obaveštenja o Privatnosti i Kolačićima

```markdown
# Politika privatnosti i korišćenja kolačića — NMark Designs

Dobrodošli na nmarkdesigns.com. Poštujemo vašu privatnost i posvećeni smo transparentnom rukovanju podacima.

### 1. Koje podatke prikupljamo
- **Neophodni tehnički podaci**: Kada nam pošaljete upit putem kontakt forme, prikupljamo vaše ime, email adresu, opcioni broj telefona i poruku isključivo u svrhu odgovora na vaš poslovni upit. Ovi podaci se ne dele sa trećim licima i ne koriste se za neželjenu poštu.
- **Analitički podaci (Google Analytics 4)**: Isključivo uz vašu izričitu saglasnost, koristimo Google Analytics 4 (GA4) za prikupljanje anonimizovanih statističkih podataka o posećenosti (npr. posećene stranice, dužina posete, tip uređaja). Vaša IP adresa je automatski maskirana i podaci se ne povezuju sa vašim identitetom.

### 2. Korišćenje kolačića (Cookies)
- **Neophodni kolačići**: Potrebni za funkcionisanje bezbednosne zaštite forme (Cloudflare Turnstile) i pamćenje vašeg izbora privatnosti. Uvek su aktivni.
- **Analitički kolačići**: Aktiviraju se SAMO ako kliknete na "Prihvati analitiku". Ukoliko kliknete "Odbij", nikakvi analitički kolačići se neće sačuvati na vašem uređaju.

### 3. Kako možete promeniti izbor
U svakom trenutku možete promeniti ili povući svoju saglasnost klikom na link "Podešavanja kolačića" na dnu bilo koje stranice.

### 4. Kontakt
Za sva pitanja u vezi sa obradom podataka, možete nas kontaktirati na nikola@nmarkdesigns.com.
```

### English (EN) — Draft Privacy & Cookie Policy

```markdown
# Privacy & Cookie Policy — NMark Designs

Welcome to nmarkdesigns.com. We value your privacy and are committed to clear and honest data practices.

### 1. What Information We Collect
- **Necessary Business Information**: When you submit an inquiry through our contact form, we collect your name, email address, optional phone number, and project details solely to respond to your request. We never sell or share this information with advertisers.
- **Analytics Data (Google Analytics 4)**: Only with your explicit consent, we use Google Analytics 4 (GA4) to measure aggregated, anonymized website traffic (such as pages visited, session duration, and device type). IP addresses are automatically anonymized, and no personal profiling or retargeting is performed.

### 2. Cookie Usage
- **Essential Cookies**: Necessary for technical operations, spam prevention (Cloudflare Turnstile), and storing your consent preferences. Always active.
- **Analytics Cookies**: Loaded ONLY if you click "Accept analytics". If you click "Decline", no analytics cookies or tracking scripts are deployed to your browser.

### 3. Managing Your Preferences
You can update or withdraw your consent at any time by clicking "Cookie settings" in the footer of any page.

### 4. Contact Us
For any privacy inquiries, reach out directly at nikola@nmarkdesigns.com.
```

---

## 14. Frozen Pricing Compliance Confirmation

In strict compliance with the project owner's mandate:
- **Zero changes** were made to pricing routes (`/[locale]/cenovnik`, `/[locale]/pricing`).
- **Zero modifications** were made to pricing packages, tier prices, support terms, pricing FAQ, or pricing dictionary translations.
- All pricing tests in `tests/pricing.spec.ts` continue to execute and pass cleanly without interference.
- Zero commits or pushes were executed during this phase.
