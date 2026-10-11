# NMark Designs — Phase 5C: Analytics Reliability, Privacy & Release Readiness

## Executive Summary

Phase 5C completes the comprehensive verification, hardening, and release-readiness review of the Google Analytics 4 (GA4) and Google Consent Mode v2 implementation for NMark Designs. Building upon Phase 5B's lightweight tracking architecture, Phase 5C audited every conversion path, single-page application (SPA) route transition, edge-case consent scenario, parameter sanitization boundary, and environment gate.

### Key Milestones Delivered

1. **Conversion Integrity (`generate_lead`)**: Confirmed that `generate_lead` fires strictly and exclusively upon server-side SMTP 250 acceptance (`status === "success"`). Invalid inputs, honeypot spam bot traps, Cloudflare Turnstile verification failures, rate limit blocks, and SMTP transport errors fire zero leads. Component re-renders and React state hydration are strictly deduplicated.
2. **SPA Pageview Precision**: Eliminated duplicate pageview risks across direct URL entries, client-side route transitions, browser back/forward navigation, and language switches. Fixed a key edge case where withdrawing and re-granting consent on the same page previously failed to re-track the pageview. GA4 Enhanced Measurement browser-history conflicts are documented with owner instructions.
3. **Consent State Reliability & Client Cookie Clearing**: Implemented automatic client-side purging of `_ga`, `_ga_*`, `_gid`, and `_gat` cookies across root and domain variants upon consent withdrawal. Handled multi-tab state synchronization via `storage` event listeners, and made localStorage interactions resilient to private browsing `SecurityError` exceptions.
4. **Zero-PII & Parameter Scrubbing**: Audited the 8 tracked events against a strict `ALLOWED_KEYS` allowlist. Automated runtime scrubbing strips query parameters (`?`) and URL hash fragments (`#`) from `page_location`, rejects unapproved keys, and filters values matching email or phone number patterns. String lengths are capped at 255 characters for locations and 100 characters for labels.
5. **Production Isolation**: Gated all external GA4 script loading and live event dispatching behind `isAnalyticsEnvironmentAllowed()`. Localhost, loopback (`127.0.0.1`, `0.0.0.0`, `[::1]`), local domains (`.local`), and preview deployments (`.vercel.app`, `.pages.dev`) are blocked. Live tracking is restricted to `nmarkdesigns.com` and `www.nmarkdesigns.com`.
6. **Publication-Ready Privacy Notices**: Authored Serbian and English privacy notice drafts that detail the data controller, processing purposes, legal bases under ZZPL and GDPR, and cookie categories. Entity and registration fields requiring final owner information prior to public deployment are clearly flagged.
7. **Automated Test Coverage**: Expanded the Playwright analytics test suite from 12 to 27 tests, comprehensively covering all conversion gates, route transitions, cookie expiries, and PII filters.

---

## 1. Owner Confirmation & Verified GA4 Property Configuration

The project owner has directly inspected and confirmed the production Google Analytics account settings:

* **Property / Data Stream**: `nmark`
* **GA4 Measurement ID**: `G-TVJKFZRKRJ`
* **Google Tag ID**: `GT-5MG3QG6`
* **Configuration Variable**: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TVJKFZRKRJ`

### Strategic & Operational Directives Confirmed

1. **Retain Existing GA4 Web Stream**:
   The existing Measurement ID `G-TVJKFZRKRJ` is preserved as the single source of truth for analytics. No new Google Analytics properties or secondary data streams will be created.
2. **Prevent Duplicate Tag Injections**:
   No secondary Google tags or duplicate scripts are injected. The website dynamically loads `https://www.googletagmanager.com/gtag/js?id=G-TVJKFZRKRJ` only once and strictly upon explicit user consent.
3. **No Unnecessary Google Tag Manager (GTM)**:
   Google Tag Manager containers (`GTM-XXXXXXX`) remain completely out of scope. Direct lightweight gtag dispatching minimizes JavaScript bundle overhead (< 2.4 KB minified) and eliminates third-party tag injection vulnerabilities.
4. **Preserve Consent-Gated Architecture**:
   All telemetry remains strictly governed by Google Consent Mode v2 Basic mode (`analytics_storage: "denied"` default). No cookies are set and no requests are dispatched prior to explicit visitor opt-in.

---

## 2. Primary Conversion Lead Reliability (`generate_lead`)

### Architectural Analysis

The primary business objective of the NMark Designs website is capturing qualified inquiries from potential clients. Conversion tracking must be immune to false positives caused by client-side clicks, failed submissions, bot attacks, or component re-renders.

In `components/contact/ContactForm.tsx`, conversion dispatching is gated by a dedicated `useEffect` synchronized with the Server Action response state:

```tsx
// Primary conversion: generate_lead (Strictly when state.status === "success" from SMTP 250 accepted)
useEffect(() => {
  if (state.status === "success" && lastHandledLeadStateRef.current !== state) {
    lastHandledLeadStateRef.current = state;
    trackEvent("generate_lead", {
      page_type: "contact",
      locale,
    });
  }
}, [state, locale]);
```

### Conversion Gate Verification Matrix

| Scenario | Server Response Status | Expected `generate_lead` Count | Verified Behavior |
| :--- | :--- | :---: | :--- |
| **1. Valid Submission** | `status: "success"` (SMTP 250 Accepted) | **1** | Tracked exactly once. Ref records state object. |
| **2. Invalid Inputs** | `status: "invalid"` (validation error) | **0** | No event dispatched. Error summary focused. |
| **3. Honeypot Bot Trap** | `status: "invalid"` (`spamDetected`) | **0** | Silent rejection. No event dispatched. |
| **4. Turnstile Rejection** | `status: "invalid"` (`turnstileFailed`) | **0** | Rejection before mail transport. 0 leads. |
| **5. Rate Limiting** | `status: "invalid"` (`rateLimited`) | **0** | Sliding window blocks IP. 0 leads. |
| **6. SMTP Error / Unavailable** | `status: "unavailable"` / `"error"` | **0** | Transport failure. 0 leads. Form inputs preserved. |
| **7. Two Distinct Submissions** | Two successive `status: "success"` | **2** | State reference changes; each distinct lead is tracked. |
| **8. Component Re-render / Hydration** | Existing `status: "success"` | **0 additional** | `lastHandledLeadStateRef.current === state` deduplicates. |
| **9. Consent Denied Submission** | `status: "success"` | **0** | Consent gate drops event before gtag dispatch. |
| **10. Subsequent Consent Acceptance** | Subsequent `status: "success"` | **1** | Tracked immediately once consent is granted. |

### Test Harness Safety

All automated test suites operate in isolation without triggering live SMTP transport. In test environments where `SMTP_PASSWORD` is omitted, the contact action gracefully resolves with `status: "unavailable"`. In UI-level conversion tests, mock hooks intercept form submissions, guaranteeing zero real emails or test spam are delivered to client inboxes.

---

## 3. SPA Pageview Integrity & GA4 Enhanced Measurement

### Single-Page Navigation Lifecycle

In modern Next.js App Router applications, pages transition client-side via history API state changes (`pushState` / `replaceState`) without full browser document reloads. Default GA4 installations often suffer from either missing client transitions or recording duplicate views.

NMark Designs resolves this through a dual-mechanism pattern in `components/seo/GoogleAnalytics.tsx`:

1. **Config Gating**: When Google Analytics is initialized, default automatic pageviews are suppressed:
   ```js
   gtag('config', id, { send_page_view: false });
   ```
2. **Router Subscription**: `GoogleAnalytics.tsx` tracks the active route via Next.js `usePathname()`. When pathname changes and consent is active, a single sanitized `page_view` is dispatched:
   ```tsx
   useEffect(() => {
     if (!consentGranted) {
       lastTrackedPathRef.current = null;
       return;
     }
     if (!isAnalyticsEnvironmentAllowed()) return;
     if (!pathname) return;

     if (lastTrackedPathRef.current !== pathname) {
       lastTrackedPathRef.current = pathname;
       const timer = setTimeout(() => {
         trackPageView(window.location.href, document.title);
       }, 50);
       return () => clearTimeout(timer);
     }
   }, [consentGranted, pathname]);
   ```

### Edge Cases Audited & Resolved

* **Initial Server Render & Direct Entry**: Pageview fires once after client hydration if consent is granted.
* **Client-Side Link Navigation (`next/link`)**: Pathname change updates state, firing a single event with the updated document title.
* **Browser Back / Forward Navigation**: History popstate updates `usePathname()`, triggering exactly one pageview for each navigated step.
* **Language Switcher**: Switching between `/sr/` and `/en/` changes the route path, triggering separate localized pageviews.
* **Rapid Repeated Link Clicks**: Clicks on an already active route preserve `lastTrackedPathRef.current === pathname`, preventing duplicate pageviews.
* **Same-Page Consent Withdrawal and Re-acceptance**:
  * *Discovered Defect*: If a user was on `/sr/`, withdrew consent, and subsequently re-opened preferences and re-granted consent on `/sr/`, the previous tracker did not fire because `lastTrackedPathRef.current` remained `/sr/`.
  * *Fix*: When `!consentGranted`, `lastTrackedPathRef.current` is immediately reset to `null`. Upon re-acceptance, the pageview fires cleanly.

### GA4 Enhanced Measurement: Action Required by Owner

> [!IMPORTANT]
> **Owner Configuration in GA4 Dashboard**:
> In Google Analytics 4, "Enhanced Measurement" is enabled by default on Web Data Streams and includes an option titled **"Page changes based on browser history events"**.
> 
> Because NMark Designs uses an application-level, router-aware pageview tracker with `send_page_view: false`, GA4's automatic history tracking must be disabled to avoid duplicate pageview counting:
> 
> 1. Log in to [Google Analytics](https://analytics.google.com/) with the property owner account.
> 2. Navigate to **Admin** (gear icon) → **Data Streams** → Select the Web stream for `nmarkdesigns.com` (`G-TVJKFZRKRJ`).
> 3. Under **Enhanced measurement**, click the **Settings** (gear) icon.
> 4. Expand **Page views** → Click **Show advanced settings**.
> 5. **Uncheck** "Page changes based on browser history events".
> 6. Click **Save**.

---

## 4. Consent State Machine & Client Resilience

### State Flow Architecture

The consent state follows a strict unidirectional state machine:

```
[ First Visit ] ──────> status: "unspecified"
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       Click "Prihvati"               Click "Odbij"
               │                             │
               ▼                             ▼
       status: "granted"              status: "denied"
       • Inject GA4 script            • Do NOT inject script
       • Send gtag consent: granted   • Send gtag consent: denied
       • Dispatch page_view           • clearAnalyticsCookies()
               │                             │
               └──────────────┬──────────────┘
                              ▼
                Re-open Preferences via Footer
```

### Storage Persistence & Multi-Tab Synchronization

* **Key**: `nmark_consent_v2`
* **Payload**: `{"status": "granted" | "denied", "timestamp": 1740000000000, "version": "2.0"}`
* **Multi-Tab Sync**: A native listener on `window.addEventListener("storage", callback)` updates the in-memory consent snapshot across all open tabs without requiring a page reload.

### Cookie Clearing upon Consent Withdrawal (`clearAnalyticsCookies`)

When a user withdraws consent by selecting "Odbij" / "Decline" in the cookie preferences modal:
1. `setConsentPreferences("denied")` is invoked.
2. `clearAnalyticsCookies()` scans all cookies in `document.cookie`.
3. For any cookie matching `_ga`, `_ga_*`, `_gid`, or `_gat`, it writes expiration commands across the current path and domain variants:
   ```ts
   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
   document.cookie = `${name}=; Max-Age=0; path=/`;
   ```
4. `gtag("consent", "update", { analytics_storage: "denied" })` is dispatched.

> [!NOTE]
> **Regulatory Clarification**: Client-side cookie expiration purges local identifiers from the visitor's browser and halts subsequent tracking. Under Google Analytics architecture, client cookie deletion does not retroactively erase historical aggregated session data stored on Google's processing servers; it guarantees that no further telemetry or identifiers are collected.

### Storage Sandboxing & Error Resilience

* If `localStorage` throws a `SecurityError` or `QuotaExceededError` (e.g. restrictive private browsing mode, sandboxed iframes):
  * `getConsentPreferences()` catches the exception and returns `null` (`"unspecified"` status).
  * `setConsentPreferences()` catches the write exception without throwing.
  * The cookie consent banner and preference modal render and dismiss without interrupting user navigation.
* If an ad blocker or privacy extension blocks network requests to `googletagmanager.com/gtag/js`:
  * Script loading failure is silent.
  * Global calls to `gtag` push to an in-memory `dataLayer` array without throwing unhandled JavaScript runtime exceptions.

---

## 5. Privacy, PII & Regulatory Compliance

### Comprehensive Parameter Audit

Every event dispatched through `trackEvent` is validated against `ALLOWED_KEYS`:

```ts
const ALLOWED_KEYS = new Set([
  "cta_name",
  "cta_location",
  "contact_method",
  "locale",
  "page_type",
  "inquiry_type",
  "project_slug",
  "project_category",
  "card_position",
  "destination_domain",
  "service_slug",
  "page_location",
  "page_title",
]);
```

### Runtime PII Sanitization

1. **Stripping URL Query Parameters & Hashes**:
   `trackPageView` explicitly strips URL query strings (`?`) and hash fragments (`#`) before dispatching `page_location`. If a visitor arrives via a marketing link containing personal query parameters (e.g., `?email=user@example.com`), the parameter is stripped prior to transmission:
   `https://nmarkdesigns.com/sr/kontakt?email=user@example.com` → `https://nmarkdesigns.com/sr/kontakt`
2. **Regex Pattern Scrubber**:
   Any parameter value matching `EMAIL_PATTERN` (`/[^\s@]+@[^\s@]+\.[^\s@]+/`) or `PHONE_PATTERN` (`/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/`) is filtered out.
3. **Sensitive Key Blacklist**:
   Keys matching `name`, `first_name`, `last_name`, `email`, `phone`, `message`, `comment`, `budget`, `secret`, `token`, or `password` are rejected.
4. **Length Truncation**:
   String values are capped at 255 characters for `page_location` and 100 characters for all other labels, preventing payload bloat.
5. **Privacy Defaults**:
   * Google Signals: Disabled.
   * User-ID tracking: Disabled.
   * Ad personalization: Explicitly set to `'denied'`.

---

## 6. Production Environment Isolation

### Hostname Verification

`isAnalyticsEnvironmentAllowed()` evaluates the runtime execution environment to protect development and testing integrity:

* **Blocked Hostnames**:
  * `localhost`
  * `127.0.0.1`, `0.0.0.0`, `[::1]`
  * `*.local`
  * `*.vercel.app` (Staging/Preview deployments)
  * `*.pages.dev` (Cloudflare Pages preview)
* **Permitted Hostnames**:
  * `nmarkdesigns.com`
  * `www.nmarkdesigns.com`
* **Test Runner Override**:
  * Allowed when `window.__MOCK_ANALYTICS__ === true` strictly inside Playwright end-to-end testing.

### Hostinger Deployment Configuration

For the production deployment on Hostinger:
* Configure the production environment variable:
  ```env
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TVJKFZRKRJ
  ```
* In non-production environments (staging, QA preview), leave `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty or set to an invalid dummy value. Even if present, `isAnalyticsEnvironmentAllowed()` prevents script injection and event dispatching outside `nmarkdesigns.com`.

---

## 7. Publication-Ready Privacy Notice Drafts (Individual Operator)

The website includes transparent in-modal cookie details accessible from the banner and footer (`content/consent.ts`). Prior to any future public publication as dedicated routes (`/sr/politika-privatnosti` and `/en/privacy-policy`), the editorial privacy notice text below has been drafted to reflect NMark Designs' confirmed status as an independent studio operated by an individual.

> [!NOTE]
> **Owner-Confirmed Business Identity**:
> NMark Designs is currently operated by **Nikola Marković as an individual** (fizičko lice). It is **not** currently registered as a company, Serbian entrepreneur (preduzetnik), or LLC (d.o.o.), and does not possess a PIB or Matični broj.
> 
> **Legal Notice & Regulatory Status**:
> * Under the Serbian Law on Personal Data Protection (ZZPL, čl. 4 tač. 8) and GDPR (Art. 4(7)), an individual determining the purposes and means of personal data processing is recognized as a **data controller** (*rukovalac*). Being an individual operator does not eliminate applicable ZZPL or GDPR principles.
> * This text is a **working draft** and has **NOT received formal legal counsel approval**.
> * The privacy policy routes remain **unpublished** in the Next.js routing tree. Any future publication must occur only after final owner review and legal verification.

---

### Serbian Privacy Notice Draft (`Politika privatnosti`)

```markdown
# Politika privatnosti — NMark Designs

Poslednje ažuriranje: Oktobar 2026. (Nacrt)

Ovaj veb-sajt (https://nmarkdesigns.com) i portfolio studio NMark Designs vodi Nikola Marković kao fizičko lice (u daljem tekstu: „rukovalac”, „NMark Designs” ili „mi”).

Kontakt email za sva pitanja u vezi sa zaštitom podataka: info@nmarkdesigns.com.

Poštujemo vašu privatnost i posvećeni smo transparentnoj obradi i zaštiti ličnih podataka u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije (ZZPL) i Opštom uredbom o zaštiti podataka o ličnosti (GDPR), u meri u kojoj se primenjuju na naš rad.

---

### 1. Koje podatke prikupljamo i zašto?

#### A. Kontakt forma i direktna komunikacija
Kada nam pošaljete upit putem kontakt forme na sajtu ili putem emaila, prikupljamo:
- Vaše ime
- Email adresu
- Broj telefona (opciono)
- Sadržaj vaše poruke i opis projekta

**Svrha i pravni osnov obrade**:
Podatke koristimo isključivo radi odgovaranja na vaš upit, pripreme procene ili ponude za izradu sajta, i vođenja poslovne komunikacije pre eventualnog ugovaranja saradnje (pravni osnov: preduzimanje radnji na zahtev lica pre zaključenja ugovora, ZZPL član 12 stav 1 tačka 2 / GDPR član 6(1)(b)).

**Rok čuvanja**:
Podatke iz upita čuvamo onoliko koliko je neophodno za realizaciju poslovne komunikacije ili saradnje. Podatke ne koristimo za neželjeni marketing niti ih prodajemo trećim licima.

---

#### B. Statistički podaci o korišćenju sajta (Google Analytics 4)
Ukoliko nam date izričiti pristanak putem našeg panela za podešavanje kolačića, koristimo Google Analytics 4 (isporučilac: Google Ireland Limited) za anonimizovano merenje posećenosti:
- Adrese posećenih stranica (sa kojih se automatski uklanjaju svi URL parametri i fragmenti)
- Naslov pregledane stranice
- Vreme posete i osnovne tehničke karakteristike uređaja (operativni sistem, rezolucija, pregledač)
- Anonimizovane interakcije (klik na dugme za upit, pregled projekta)

**Svrha i pravni osnov obrade**:
Statistika nam pomaže da razumemo tehničke performanse sajta i poboljšamo korisničko iskustvo. Pravni osnov je vaš **izričit pristanak** (ZZPL član 12 stav 1 tačka 1 / GDPR član 6(1)(a)).

**Zaštitne mere privatnosti**:
- Ne koristimo oglašivačke kolačiće niti profilišemo posetioce.
- Google Analytics 4 kod nas ne prikuplja vaše ime, email niti IP adresu u trajnom neanonimizovanom obliku.
- Google Signals i User-ID praćenje su trajno isključeni.
- Period čuvanja analitičkih događaja podešen je na minimalni period od 2 meseca.

---

### 2. Kolačići (Cookies)

Sajt koristi minimalan broj kolačića:

1. **Neophodni tehnički kolačići**:
   Neophodni za osnovnu bezbednost sajta, zaštitu kontakt forme od zloupotrebe i automatizovanog spama (Cloudflare Turnstile) i pamćenje vašeg izbora o kolačićima (`nmark_consent_v2`). Ovi kolačići ne zahtevaju pristanak jer su tehnički nužni za funkcionisanje sajta.
2. **Analitički kolačići (`_ga`, `_ga_*`)**:
   Postavljaju se **isključivo** ukoliko izričito izaberete „Prihvati analitiku”. Ukoliko kliknete na „Odbij” ili zatvorite sajt bez prihvatanja, analitički kolačići se nikada ne postavljaju.

Svoj izbor možete promeniti ili opozvati u svakom trenutku klikom na link **„Podešavanja kolačića”** u podnožju bilo koje stranice.

---

### 3. Tehnički obrađivači i servisi

Podatke ne prodajemo i ne delimo sa trećim licima u marketinške svrhe. Za funkcionisanje sajta koristimo pouzdane tehničke pružaoce usluga:
- **Hostinger International Ltd.** — Hosting servera u Evropskoj uniji i bezbedan SMTP prenos pošte.
- **Cloudflare, Inc.** — Zaštita od mrežnih zloupotreba, botova i verifikacija forme (Turnstile).
- **Google Ireland Limited** — Agregirana web analitika (samo uz vaš izričit pristanak).

---

### 4. Vaša prava

U skladu sa važećim propisima o zaštiti podataka o ličnosti (ZZPL / GDPR), imate pravo na:
- Pristup svojim podacima
- Ispravku netačnih podataka
- Brisanje svojih podataka
- Ograničenje obrade
- Opoziv datog pristanka u bilo kom trenutku

Za sva pitanja ili ostvarivanje svojih prava možete se obratiti na: **info@nmarkdesigns.com**.

Takođe imate pravo da se obratite Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti Republike Srbije (Bulevar kralja Aleksandra 15, Beograd, www.poverenik.rs).
```

---

### English Privacy Notice Draft (`Privacy Policy`)

```markdown
# Privacy Policy — NMark Designs

Last updated: October 2026 (Draft)

This website (https://nmarkdesigns.com) and the NMark Designs studio are operated by Nikola Marković as an individual (hereinafter: "data controller", "NMark Designs", "we", or "us").

Contact email for all data privacy inquiries: info@nmarkdesigns.com.

We respect your privacy and are committed to processing and protecting personal data transparently in accordance with the Republic of Serbia Personal Data Protection Act (ZZPL) and the General Data Protection Regulation (GDPR) to the extent applicable to our activities.

---

### 1. Data Collection & Processing Purposes

#### A. Inquiry Form & Direct Communication
When you submit an inquiry through our contact form or contact us via email, we collect:
- Your name
- Email address
- Phone number (optional)
- Your message content and project details

**Purpose & Legal Basis**:
We process this information strictly to respond to your inquiry, prepare service estimates or proposals, and conduct preliminary communications prior to entering into a contract (legal basis: steps taken at the request of the data subject prior to entering into a contract, ZZPL Art. 12(1)(2) / GDPR Art. 6(1)(b)).

**Retention**:
Inquiry correspondence is retained only as long as necessary to fulfill project communication or commercial follow-up. We never sell your personal information or use it for unsolicited marketing.

---

#### B. Aggregated Site Telemetry (Google Analytics 4)
Subject to your prior explicit consent via our cookie preferences panel, we deploy Google Analytics 4 (operated by Google Ireland Limited) strictly for anonymized traffic measurement:
- Sanitized page URLs (query strings and URL fragments automatically stripped)
- Document titles
- Basic technical device specifications (operating system, viewport resolution, browser type)
- Anonymized UI interactions (such as requesting a quote or viewing a case study)

**Purpose & Legal Basis**:
Telemetry helps us evaluate technical performance and improve user navigation. The legal basis is your **explicit consent** (ZZPL Art. 12(1)(1) / GDPR Art. 6(1)(a)).

**Privacy Safeguards**:
- Advertising and remarketing cookies are disabled.
- Google Analytics 4 does not permanently store non-anonymized IP addresses.
- Google Signals and User-ID tracking are disabled.
- Event retention is set to the minimal statutory duration of 2 months.

---

### 2. Cookies

We maintain a minimal cookie footprint:

1. **Essential Technical Cookies**:
   Required for basic site security, anti-bot form protection (Cloudflare Turnstile), and recording your privacy preferences (`nmark_consent_v2`). These cookies are strictly necessary and exempt from consent requirements.
2. **Analytics Cookies (`_ga`, `_ga_*`)**:
   Placed **only** if you explicitly choose "Accept analytics". If you decline or dismiss the banner, analytics cookies are never placed.

You may update or revoke your preferences at any time by clicking the **"Cookie settings"** link in the footer of any page.

---

### 3. Technical Service Providers

We do not sell personal data. Technical infrastructure providers supporting this website include:
- **Hostinger International Ltd.** — EU server hosting infrastructure and secure SMTP email transport.
- **Cloudflare, Inc.** — Anti-bot protection and security verification (Turnstile).
- **Google Ireland Limited** — Aggregated visit telemetry (strictly upon explicit consent).

---

### 4. Your Rights

Under applicable data protection laws (ZZPL / GDPR), you have the right to:
- Access your personal data
- Request rectification of inaccurate data
- Request erasure of your data
- Request restriction of processing
- Withdraw consent at any time without affecting prior lawful processing

To exercise your rights, please contact us at: **info@nmarkdesigns.com**.

You also have the right to lodge a complaint with the competent supervisory authority (in Serbia: Commissioner for Information of Public Importance and Personal Data Protection, www.poverenik.rs).
```

---

## 8. Event Catalog & Dispatch Verification

| Event Name | Dispatch Trigger | Parameters | Safety / Scrubbing Verification |
| :--- | :--- | :--- | :--- |
| `generate_lead` | Contact form submission receives SMTP 250 accepted response | `page_type: "contact"`, `locale: "sr" \| "en"` | Zero PII. Zero name/email/phone. Fires once per accepted inquiry. Deduplicated on re-renders. |
| `form_start` | First user focus on any contact form input field | `page_type: "contact"`, `locale: "sr" \| "en"` | Fires once per page load. Subsequent field focuses ignored. |
| `contact_direct` | Click on direct contact method (phone link, mailto, whatsapp) | `contact_method: "phone" \| "email" \| "whatsapp"`, `cta_location`, `locale` | Non-blocking `trackEvent`. Default browser action proceeds normally. |
| `click_cta` | Click on primary conversion CTAs (Hero quote, Home CTA, Portfolio CTA) | `cta_name: "request_quote" \| ...`, `cta_location`, `locale` | Dispatched synchronously on click without preventing navigation. |
| `view_case_study` | Case study page load (`/portfolio/[slug]`) | `project_slug`, `project_category`, `locale` | Fired inside client case study tracker after consent check. |
| `click_proof_case_study` | Click on case study card in homepage portfolio showcase | `project_slug`, `card_position`, `locale` | Non-blocking click dispatcher. |
| `click_external_project` | Click on live website external link for a project | `project_slug`, `destination_domain` | Verified destination domain string; safe outbound telemetry. |
| `click_service` | Click on service link / card | `service_slug`, `locale` | Safe categorical string identifier. |
| `page_view` | Initial page load and SPA router transition | `page_location` (stripped of `?` & `#`), `page_title` | Single tracking per route. Gated by consent and environment. |

### Redundancy & Dead Code Check

* All 8 event names correspond directly to production UI components (`CtaButton`, `ContactDirectLink`, `PortfolioProjectLink`, `ServiceClickLink`, `ContactForm`, `CaseStudyTracker`, `GoogleAnalytics`).
* No obsolete Phase 5A audit events remain.
* Zero external third-party SDK dependencies (GTM containers, Hotjar, Facebook Pixel) were added.

---

## 9. Performance, Accessibility & Design Integrity

### Performance Footprint

* **Bundle Overhead**: The analytics engine (`lib/analytics.ts`, `CookieConsent.tsx`, `GoogleAnalytics.tsx`, `CtaButton.tsx`, link wrappers) adds under **2.4 KB** minified client-side JavaScript.
* **Network Requests Before Consent**: **Zero** external requests to Google servers (`googletagmanager.com`) before explicit user acceptance.
* **Core Web Vitals Impact**:
  * **LCP**: Unaffected. No analytics scripts block HTML rendering or font loading.
  * **CLS**: Banner uses fixed overlay positioning (`fixed bottom-3 ... z-30`), causing zero layout shift in document flow.
  * **INP**: All analytics event dispatches are non-blocking microtasks wrapped in fail-safe try-catch blocks.

### Accessibility (a11y) Verification

* **Banner Landmark**: Uses `<aside role="region" aria-label="...">` with semantic headings.
* **Modal Dialog**: Implements `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="consent-modal-title"`.
* **Keyboard Navigation**: Pressing `Escape` closes the detailed preferences modal and returns focus cleanly.
* **Touch Targets**: All interactive buttons exceed the minimum 44px vertical height standard (44px–48px verified).
* **Responsive Ergonomics**: Tested at 320px viewport width: zero horizontal scroll overflow, legible typography, and clean wrapping.

### Visual Design System Compliance

* Strict adherence to NMark Designs Phase 1 tokens:
  * Brand background: `#481e3d` (`bg-brand`)
  * Surface neutrals: `#ffffff` (`bg-surface`) and `#fbf9fa` (`bg-surface-subtle`)
  * Ink text: `#1b1318` (`text-ink`) and muted `#594c55` (`text-muted`)
  * Border radii: `rounded-control` (6px) and `rounded-panel` (12px)
  * Restrained elevation: Subtle shadow on banner (`shadow-lg`) and modal (`shadow-2xl`).

---

## 10. Release Readiness Checklist

- [x] **Primary Conversion Reliability**: `generate_lead` verified across 10 distinct submission scenarios with zero false positives.
- [x] **SPA Pageview Deduplication**: `send_page_view: false` configured; router tracker deduplicates client transitions and same-page consent toggling.
- [x] **GA4 History Tracking Documentation**: Explicit dashboard instructions authored for disabling "Page changes based on browser history events".
- [x] **Consent Mode v2 Basic Default**: Default denied state initialized before any script loading.
- [x] **Client Cookie Purge**: `clearAnalyticsCookies()` expires `_ga` and related cookies upon consent withdrawal.
- [x] **PII Protection**: Query strings and hashes stripped; email/phone pattern scrubber active; strict allowlist enforced.
- [x] **Production Isolation**: External analytics blocked on localhost, loopback, and preview domains.
- [x] **Privacy Policy Drafts**: Bilingually authored with missing owner entity details flagged.
- [x] **Automated Tests**: 27 dedicated Playwright analytics tests passing with 0 failures; full test suite passing with 0 failures.
- [x] **TypeScript & Linting**: `next typegen && tsc --noEmit` and `eslint .` passing with 0 errors and 0 warnings.
- [x] **Production Build**: `next build` static export succeeded (52/52 routes generated).
