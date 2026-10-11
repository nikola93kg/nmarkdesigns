# NMark Designs — Phase 6A: Git, Security & Hostinger Release Readiness Audit

## Executive Summary

Phase 6A provides a comprehensive, evidence-based audit of the code repository, Git revision ancestry, security credentials, deployment architecture, and runtime requirements ahead of releasing the redesigned NMark Designs Next.js application to Hostinger production.

This phase is strictly an **AUDIT AND PLANNING** phase. In compliance with project guidelines, zero git commits, merges, pushes, or infrastructure modifications were executed.

---

## 1. Git History & Worktree Review

### Current Environment & Worktree Topology

* **Repository**: `nikola93kg/nmarkdesigns`
* **Active Worktree**: `/Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero`
* **Active Branch**: `website_audit_phase_zero`
* **HEAD Revision**: `74fd1988`
* **Remote Tracking Branch**: `origin/website_audit_phase_zero` (aligned at `74fd1988`)
* **Production Default Branch**: `origin/main` (pointing to commit `77516f6e` — *"new blog add"*)

### Verification of Checkpoint Commits

Both required milestone commits are confirmed present in the ancestry of `HEAD`:

1. **`9f6b3e41`**:
   * *Message*: `feat(portfolio): complete Phase 3A portfolio architecture, project discovery, and case study routing`
   * *Status*: **Present and verified** in Git history ancestry.
2. **`c9c582b6`**:
   * *Message*: `chore(checkpoint): complete Phases 3B.1-3B.4, 3C.1-3C.3, and Phase 4A audit baseline`
   * *Status*: **Present and verified** in Git history ancestry.

### Branch Divergence & Ahead/Behind Status

Running `git log origin/main..HEAD --oneline` shows `website_audit_phase_zero` is **5 commits directly ahead** of `origin/main`:

1. `4134fd87` — `feat(security): complete Phase 0 audit, Hostinger SMTP delivery, anti-spam, and CSP hardening (Phase 1A & 1B)`
2. `870fabaa` — `feat(seo): complete Phase 2A technical SEO foundation and legacy URL recovery`
3. `9f6b3e41` — `feat(portfolio): complete Phase 3A portfolio architecture, project discovery, and case study routing`
4. `c9c582b6` — `chore(checkpoint): complete Phases 3B.1-3B.4, 3C.1-3C.3, and Phase 4A audit baseline`
5. `74fd1988` — `feat(performance): complete Phase 4B optimizations and Phase 4C WCAG 2.2 AA responsive QA`

Running `git log HEAD..origin/main --oneline` returns **0 commits**. There are no upstream commits on `origin/main` that are missing from `website_audit_phase_zero`. Merging to `main` will be a clean fast-forward or linear merge without merge conflicts.

### Uncommitted Changes Inventory

> [!WARNING]
> **Worktree Status**: The worktree is **NOT clean**. It contains the complete, uncommitted implementations from Phases 5A, 5B, and 5C (Google Analytics 4, Consent Mode v2, and Conversion Reliability).

#### Modified Files (12 files)
* `app/[locale]/layout.tsx` (analytics component injection & consent mode default)
* `app/[locale]/portfolio/[slug]/page.tsx` (case study tracking hook)
* `components/contact/ContactForm.tsx` (primary conversion tracking `generate_lead` & `form_start`)
* `components/contact/ContactPage.tsx` (direct contact link telemetry)
* `components/home/CTA.tsx` (homepage CTA conversion attributes)
* `components/home/Hero.tsx` (hero quote CTA telemetry)
* `components/home/Services.tsx` (service card click telemetry)
* `components/layout/Footer.tsx` (cookie settings modal trigger button)
* `components/portfolio/PortfolioContact.tsx` (portfolio CTA telemetry)
* `components/portfolio/PortfolioShowcase.tsx` (portfolio proof click telemetry)
* `components/seo/GoogleAnalytics.tsx` (router-aware pageview tracking & consent state synchronization)
* `components/services/ServicesPage.tsx` (service detail click telemetry)

#### Untracked Files (13 files)
* `components/layout/ContactDirectLink.tsx` (direct phone/email/WhatsApp click wrapper)
* `components/layout/CookieConsent.tsx` (accessible Consent Mode v2 banner & preference modal)
* `components/layout/CookieSettingsButton.tsx` (footer preference modal trigger)
* `components/portfolio/CaseStudyTracker.tsx` (client case study view dispatcher)
* `components/portfolio/PortfolioProjectLink.tsx` (outbound & case study link tracker)
* `components/services/ServiceClickLink.tsx` (service click tracker)
* `components/ui/CtaButton.tsx` (conversion CTA tracking wrapper)
* `content/consent.ts` (bilingual cookie consent UI dictionaries)
* `docs/audit/phase-5a-analytics-conversion-tracking.md` (Phase 5A audit documentation)
* `docs/implementation/phase-5b-analytics-consent-tracking.md` (Phase 5B implementation documentation)
* `docs/implementation/phase-5c-analytics-release-readiness.md` (Phase 5C reliability & privacy documentation)
* `lib/analytics.ts` (consent state machine, cookie purger, PII sanitizer, event dispatcher)
* `tests/analytics.spec.ts` (27 comprehensive Playwright analytics tests)

---

## 2. Secret & Sensitive File Audit

### Summary of Audit Findings

| Category | Item Checked | Status | Action Taken / Required |
| :--- | :--- | :--- | :--- |
| **Local Environment** | `.env.local` | Ignored (`.gitignore` line 15), untracked | Verified safe (purely local). |
| **Committed Secrets** | `SMTP_PASSWORD` in `.env.example` | **EXPOSED** in historical commit `4134fd87` | **Remediated by Owner**: Password rotated in Hostinger. File untracked via `git rm --cached .env.example` and added to `.gitignore`. |
| **API Keys** | `TURNSTILE_SECRET_KEY` | Present only in local `.env.local`; absent from Git | Verified safe (dummy placeholders in tests). |
| **Public Keys** | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Present in `.env.local` | Public client token; safe for client. |
| **Public Analytics** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-TVJKFZRKRJ` | Public client measurement ID; safe. |
| **Client Reports** | Confidential PDFs or client invoices | None found in repository | Verified safe. |
| **Screenshots & Tests** | `docs/screenshots/`, `test-results/` | Ignored in `.gitignore`, untracked | Verified safe (zero bloated binaries in Git). |
| **Build Artifacts** | `.next/`, `node_modules/` | Ignored in `.gitignore`, untracked | Verified safe. |

### Critical Security Finding & Remediation Status

In commit `4134fd87` (`feat(security): complete Phase 0 audit...`), an active Hostinger SMTP password was committed in plaintext inside `.env.example` (Line 14).

#### Current Remediation Status
1. **Password Rotation (COMPLETED BY OWNER)**:
   * The owner has manually rotated and revoked the password for `info@nmarkdesigns.com` directly within Hostinger hPanel. The exposed historical credential is revoked and inactive.
2. **Git Ignore Protection (TASK A COMPLETED)**:
   * `.gitignore` updated: the `!.env.example` negation rule was removed and `.env.example` was explicitly added under `# Environment`.
   * Current Git index updated: `.env.example` was removed from tracking via `git rm --cached .env.example` without modifying the owner's local working copy on disk.
   * Verified with `git ls-files .env.example` (empty) and `git check-ignore -v .env.example` (`.gitignore:17:.env.example`).
3. **Exposure Scope Analysis (TASK B COMPLETED)**:
   * **Local Branch**: Present in local `website_audit_phase_zero` at commit `4134fd87`.
   * **Remote Branch**: Present on `origin/website_audit_phase_zero`.
   * **Production Branch**: **NOT PRESENT** on `origin/main` (commit `77516f6e`) or local `main`.
   * **Tags**: Zero tags exist in the repository (`git tag -l` is empty).
   * **Other Secrets**: No other commits, files, or branches contain plaintext credentials or private keys. All Turnstile keys in Git are dummy placeholders.
4. **Git History Remediation (TASK C)**:
   * Adding `.env.example` to `.gitignore` and untracking it prevents *future* commits from tracking the file, but does *not* erase the historical blob in commit `4134fd87`.
   * A clean release strategy (Option A) is recommended so that the upcoming production merge into `main` carries forward all application code without ever introducing `4134fd87` into `main`'s ancestry.

---

## 3. Hostinger Deployment Architecture

### Runtime Environment Analysis

NMark Designs is built on **Next.js 16.3.6 (App Router)** with React 19.

#### Incompatibility with `output: "export"`
The website **CANNOT** be deployed as a purely static HTML bundle (`output: "export"`):
* The contact inquiry form utilizes Next.js **Server Actions** (`"use server"` in `app/[locale]/[page]/actions.ts`).
* Server Actions perform server-side Cloudflare Turnstile token validation via `fetch` to `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
* Server Actions enforce server-side sliding-window rate limiting (`lib/rate-limit.ts`).
* Server Actions execute authenticated SMTP transmission via `nodemailer` over TCP port 465 (`lib/contact-delivery.ts`).
* Dynamic request headers (`headers()`) are inspected in `proxy.ts` and `app/robots.ts` to enforce host-specific indexing restrictions.

### Hostinger Deployment Profile Requirements

Hostinger provides three hosting tiers for modern web applications. The deployment requires a Node.js-capable environment:

1. **Hostinger Cloud / VPS (Recommended)**:
   * **Node.js Version**: Node.js **>= 22.0.0** (specified in `package.json` `"engines": { "node": ">=22.0.0" }`).
   * **Process Manager**: PM2 or Hostinger Node.js Application Manager.
   * **Build Command**: `npm run build` (`next build --webpack`).
   * **Start Command**: `npm run start` (`next start --port $PORT`).
   * **Outbound Networking**: Unrestricted outbound TCP access on **Port 465** (for `smtp.hostinger.com`) and outbound HTTPS on **Port 443** (for Cloudflare Turnstile verification).
2. **Reverse Proxy Configuration (OpenLiteSpeed / Nginx)**:
   * Hostinger's edge proxy must forward the upstream HTTP security headers generated by `proxy.ts`:
     * `Content-Security-Policy`
     * `Strict-Transport-Security`
     * `X-Frame-Options`
     * `X-Content-Type-Options`
     * `Referrer-Policy`
     * `Permissions-Policy`
     * `X-Robots-Tag`
   * Hostinger edge caching must respect `Cache-Control: private, no-store` on Server Action POST responses (`/sr/kontakt/` and `/en/contact/`).

#### Missing Owner Confirmations for Hostinger
* Owner must confirm whether the current live deployment is managed via:
  * A) Hostinger Git automated webhook integration (deploy on push to `main`), OR
  * B) Hostinger Cloud / VPS Node.js application manager, OR
  * C) Manual SSH deployment via PM2.

---

## 4. Runtime Configuration Inventory

All variables referenced across the codebase, classified by lifecycle and security boundary:

| Variable Name | Required Scope | Environment Gating | Public Exposure Safe? | Purpose |
| :--- | :---: | :---: | :---: | :--- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Build & Runtime | Client & Server | **Yes** (Public) | GA4 stream identifier (`G-TVJKFZRKRJ`). Defaults to fallback if unset. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Build & Runtime | Client & Server | **Yes** (Public) | Cloudflare Turnstile client-side widget sitekey. |
| `SMTP_HOST` | Runtime | Server-Only | **No** (Private) | Hostinger mail server (`smtp.hostinger.com`). |
| `SMTP_PORT` | Runtime | Server-Only | **No** (Private) | Port (`465` for SSL/TLS, or `587`). |
| `SMTP_SECURE` | Runtime | Server-Only | **No** (Private) | Implicit TLS flag (`true`). |
| `SMTP_USER` | Runtime | Server-Only | **No** (Private) | Authenticated mailbox username (`info@nmarkdesigns.com`). |
| `SMTP_PASSWORD` | Runtime | Server-Only | **No** (Private) | Authenticated mailbox password. |
| `CONTACT_RECIPIENT` | Runtime | Server-Only | **No** (Private) | Destination inbox address (`info@nmarkdesigns.com`). |
| `TURNSTILE_SECRET_KEY` | Runtime | Server-Only | **No** (Private) | Cloudflare Turnstile secret key for server-side siteverify. |
| `DEPLOYMENT_ENV` | Build & Runtime | Server-Only | **No** (Private) | Environment identifier (`production`). |
| `SITE_LAUNCH` | Build | Server-Only | **No** (Private) | Flag governing legacy maintenance mode or launch gating. |

---

## 5. Google Analytics 4 (GA4) Configuration & Owner Actions

### Confirmed Stream Parameters
* **Property / Stream Name**: `nmark`
* **Measurement ID**: `G-TVJKFZRKRJ`
* **Google Tag ID**: `GT-5MG3QG6`

### Critical Dashboard Setting: Disable Enhanced Measurement History Tracking

Because NMark Designs uses an application-level, Next.js router-aware pageview tracker (`GoogleAnalytics.tsx`) with `send_page_view: false`, GA4's default automatic history tracking will cause duplicate pageview counting if left enabled.

#### Owner Step-by-Step Procedure:
1. Log into [Google Analytics](https://analytics.google.com/).
2. Navigate to **Admin** (gear icon) → **Data Streams** → Select `nmark` (`G-TVJKFZRKRJ`).
3. Click the gear icon under **Enhanced measurement**.
4. Expand **Page views** → Click **Show advanced settings**.
5. **Uncheck** *"Page changes based on browser history events"*.
6. Click **Save**.

### Post-Deployment Verification Procedure

1. **Realtime Verification**:
   * Open `https://nmarkdesigns.com` in an incognito browser window.
   * Observe that the cookie consent banner is displayed.
   * Open GA4 **Reports** → **Realtime**: confirm **0 active users** are attributed to analytics prior to consent.
   * Click **"Prihvati analitiku"**.
   * Confirm that an active user immediately appears in GA4 Realtime, and that a `page_view` event is recorded for `/sr/`.
2. **Conversion Lead Verification**:
   * Navigate to `/sr/kontakt/`. Confirm `page_view` is recorded for `/sr/kontakt/`.
   * Focus on the form name input: confirm `form_start` is recorded in DebugView.
   * Submit an inquiry: upon successful submission, confirm `generate_lead` is recorded.

---

## 6. Business Identity & Privacy Notice Status

### Confirmed Business Identity: Individual Operator
* **Operator**: Nikola Marković (fizičko lice / individual).
* **Business Format**: Founder-led, independent web design and development studio.
* **Legal Registration Status**: NMark Designs is **not** currently registered as a company, sole proprietorship (*preduzetnik*), or limited liability company (*d.o.o.*). It does **not** have a PIB or Matični broj.
* **Strict Constraint**: Fictitious company information, registration numbers, tax IDs, or corporate entity statuses must never be invented.

### Privacy Compliance Analysis (GDPR & ZZPL)
Under both the Serbian Law on Personal Data Protection (ZZPL, čl. 4 tač. 8) and GDPR (Art. 4(7)), a natural person who determines the purposes and means of personal data processing in the course of independent commercial activity is recognized as a **data controller** (*rukovalac*). Being an individual operator does not eliminate statutory personal data protection principles.

### Privacy Notice Drafts Status
* The privacy notice drafts in `docs/implementation/phase-5c-analytics-release-readiness.md` (Section 7) have been updated to present Nikola Marković as an individual data controller operating NMark Designs via `https://nmarkdesigns.com` and `info@nmarkdesigns.com`.
* **Publication Status**: These drafts remain strictly **offline / unpublished** documentation drafts. No unvetted privacy routes are deployed to the live website routing tree.
* **Pending Items Before Future Route Publication**:
  1. Owner verification of contact/location disclosure requirements.
  2. Owner review and optional legal counsel review.
  3. Decision on whether to publish dedicated standalone routes (`/sr/politika-privatnosti`, `/en/privacy-policy`) or maintain transparent in-modal disclosures (`content/consent.ts`).

---

## 7. SEO Migration & Legacy URL Audit

### URL Strategy & Trailing Slash Policy

* **Canonical Domain**: `https://nmarkdesigns.com`
* **Trailing Slash**: Enforced (`trailingSlash: true` in `next.config.ts`). Non-slash URLs are redirected to trailing-slash equivalents via 308 permanent redirects in `proxy.ts`.
* **Host Guard**: Non-canonical hosts (staging, preview, IP, localhost) automatically receive `X-Robots-Tag: noindex, nofollow` to prevent search engine indexing pollution.

### Legacy WordPress Redirect Verification

In `lib/legacy-redirects.ts`, all legacy WordPress URLs are mapped to their modern Next.js routes:

| Legacy WordPress URL | Destination Route | Status & Evaluation |
| :--- | :--- | :--- |
| `/` | `/sr/` | 308 Permanent Redirect |
| `/about/` | `/sr/o-nama/` | 308 Permanent Redirect |
| `/contact/` | `/sr/kontakt/` | 308 Permanent Redirect |
| `/cenovnik/` | `/sr/cenovnik/` | 308 Permanent Redirect |
| `/portfolio/` | `/sr/portfolio/` | 308 Permanent Redirect |
| `/all-services/` | `/sr/usluge/` | 308 Permanent Redirect |
| `/portfolio/buy-pallet-jacks/` | `/sr/portfolio/buy-pallet-jacks/` | 1-to-1 Case Study Redirect |
| `/portfolio/ilic-enterijer/` | `/sr/portfolio/ilic-enterijer/` | 1-to-1 Case Study Redirect |
| `/portfolio/powder-brows-vienna/` | `/sr/portfolio/powder-brows-vienna/` | 1-to-1 Case Study Redirect |
| `/portfolio/coolfridgeguys/` | `/sr/portfolio/coolfridgeguys/` | 1-to-1 Case Study Redirect |
| `/portfolio/tripolisweets/` | `/sr/portfolio/tripolisweets/` | 1-to-1 Case Study Redirect |
| `/portfolio/casovifrancuskog-rs/` | `/sr/portfolio/casovi-francuskog/` | 1-to-1 Case Study Redirect |
| `/portfolio/ladekor/` | `/sr/portfolio/ladekor/` | 1-to-1 Case Study Redirect |
| `/portfolio/os-dule-karaklajic/` | `/sr/portfolio/os-dule-karaklajic/` | 1-to-1 Case Study Redirect |
| `/portfolio/anabelabebioprema/` | `/sr/portfolio/anabelabebioprema/` | 1-to-1 Case Study Redirect |

### Identified SEO Migration Risk: Secondary Project Fragment Redirects

6 legacy WordPress portfolio URLs do not have standalone case studies and redirect to URL fragments:
1. `/portfolio/frankultura/` → `/sr/portfolio/#project-frankultura`
2. `/portfolio/madjionicar-bojan/` → `/sr/portfolio/#project-madjionicar-bojan`
3. `/portfolio/banquetes-castellanos-zoreda/` → `/sr/portfolio/#project-banquetes-castellanos-zoreda`
4. `/portfolio/nest-home-solutions/` → `/sr/portfolio/#project-nest-home-solutions`
5. `/portfolio/stamenko-milic-photography/` → `/sr/portfolio/#project-stamenko-milic-photography`
6. `/portfolio/dh-travell/` → `/sr/portfolio/#project-dh-travell`

> [!NOTE]
> **SEO Impact**: Search engines strip URI fragments (`#...`). These 6 URLs will be indexed as redirects to the generic `/sr/portfolio/` page. If any of these individual URLs had specific organic search keywords in Google, that specific ranking equity will consolidate into the general portfolio index.

---

## 8. Contact & Security Readiness

### Contact Form Backend Checklist

* **Nodemailer Transport**: Port 465 SSL connection to `smtp.hostinger.com`.
* **RFC-Compliant Headers**: Inquiries set `From: "NMark Designs Contact Form" <info@nmarkdesigns.com>` and `Reply-To: "${name}" <${email}>`.
* **Rate Limiting**: Sliding window in `lib/rate-limit.ts` (maximum 5 requests per 10 minutes per IP).
* **Honeypot Protection**: Hidden input `_hp_website` catches automated bots.
* **Turnstile Protection**: Cloudflare Turnstile token verified server-side.
  * *Owner Check*: Confirm that `nmarkdesigns.com` and `www.nmarkdesigns.com` are added to the allowed domain list in the Cloudflare Turnstile dashboard.

### Security Headers Inspection (`proxy.ts`)

* **CSP**: Strict `default-src 'self'`, whitelisting Cloudflare Turnstile (`challenges.cloudflare.com`), Google Fonts, and Google Analytics.
* **HSTS**: `max-age=63072000; includeSubDomains; preload` (2 years).
* **Clickjacking Protection**: `X-Frame-Options: DENY` and `frame-ancestors 'none'`.
* **MIME Sniffing**: `X-Content-Type-Options: nosniff`.
* **Referrer Policy**: `strict-origin-when-cross-origin`.
* **Permissions Policy**: Unused device features disabled (`camera=(), microphone=(), geolocation=()`, etc.).

---

## 9. Rollback & Release Strategy

### Pre-Deployment Production Snapshot

1. Take a full snapshot / backup of the Hostinger web server and database (if WordPress is currently running on the server).
2. Archive the existing Hostinger `.env` and configuration files.

### Known-Good Revisions

* **Production Fallback**: Commit `77516f6e` (`origin/main`).
* **Release Candidate Revision**: Current HEAD `74fd1988` + local Phase 5 uncommitted changes.

### Release Execution Sequence (Phase 6B Strategy)

```
[ Step 1: Owner Pre-Requisites ]
• [COMPLETED] Rotate info@nmarkdesigns.com password in Hostinger hPanel.
• [COMPLETED] Business identity confirmed: individual operator Nikola Marković.
• [COMPLETED] .env.example added to .gitignore and untracked from Git index.
• [PENDING] Owner disables history tracking in GA4 Enhanced Measurement settings.
• [PENDING] Owner verifies nmarkdesigns.com domain whitelist in Cloudflare Turnstile dashboard.
• [PENDING] Owner inputs production secrets directly in Hostinger hPanel environment variables.

[ Step 2: Clean Release Branch Reconstruction (Option A) ]
• Check out a clean release branch from origin/main (commit 77516f6e).
• Transfer all verified code changes from Phases 1–5 without including commit 4134fd87.
• Ensure .env.example is completely absent from the release tree.
• Validate complete test suite (282 Playwright tests, lint, typecheck, build).

[ Step 3: Production Merge & Push ]
• Fast-forward or merge the clean release branch into main.
• Push main to origin/main (history remains 100% clean and free of compromised secrets).

[ Step 4: Hostinger Deployment ]
• Trigger deployment in Hostinger hPanel / Git.
• Ensure Hostinger Node.js runtime is set to Node.js >= 22 LTS.
• Run npm run build and npm run start on Hostinger Node.js runtime.

[ Step 5: Post-Deployment Smoke Testing ]
1. curl -I https://nmarkdesigns.com (Verify HTTP 200, HSTS, CSP headers).
2. curl -I https://nmarkdesigns.com/all-services/ (Verify 308 redirect to /sr/usluge/).
3. Inspect https://nmarkdesigns.com/sitemap.xml and robots.txt.
4. Verify responsive navigation at 375px and 1440px.
5. Send 1 test contact form inquiry; verify delivery in Hostinger webmail.
6. Accept cookie banner; verify GA4 Realtime event.
```

### Rollback Execution Plan

If critical defects occur during smoke testing (e.g. Node.js startup failure, 500 errors on form submission):
1. In Hostinger hPanel, redeploy from the previous known-good deployment snapshot or rollback Git branch to `77516f6e`.
2. Restore previous environment variables.
3. Restart the Node.js / web process.
4. Verify site recovery.

---

## 10. Release Blockers Classification

| Blocker Description | Severity Level | Current Status & Resolution Prerequisite |
| :--- | :---: | :--- |
| **Active SMTP Credential Exposure** | **RESOLVED** | **Remediated by Owner**: Password for `info@nmarkdesigns.com` was rotated in Hostinger. File untracked via `git rm --cached .env.example` and added to `.gitignore`. |
| **Historical Git Credential Exposure (`4134fd87`)** | **HIGH** | **Pending Phase 6B Execution**: Remediate prior to production merge by executing clean release reconstruction (Option A) so `main` never inherits `4134fd87`. |
| **GA4 Enhanced Measurement History Duplication** | **HIGH** | **Owner Action Required**: Owner disables "Page changes based on browser history events" in GA4 Web Stream settings. |
| **Worktree Staged & Untracked Phase 5 Changes** | **MEDIUM** | **Pending Phase 6B Execution**: Commit local analytics and consent changes cleanly before preparing release branch. |
| **Turnstile Production Domain Registration** | **MEDIUM** | **Owner Verification**: Confirm `nmarkdesigns.com` is registered in Cloudflare Turnstile and supply keys via Hostinger env. |
| **Hostinger Node.js Runtime & Outbound Port 465** | **MEDIUM** | **Hostinger Setup**: Ensure Node.js >= 22 LTS runtime and open outbound Port 465 in Hostinger. |
| **Privacy Notice Route Publication** | **INFORMATIONAL** | **Resolved for Release**: Drafts updated for individual operator Nikola Marković. Routes remain unpublished in application code. |
| **Fragment Redirect SEO Consolidation** | **ADVISORY** | **Acknowledged**: 6 secondary projects consolidate equity to general portfolio listing. |

---

## 11. Final Validation Results

Validation executed locally on worktree `website_audit_phase_zero`:

* **ESLint**:
  ```bash
  npm run lint
  # ✓ Passed with 0 errors and 0 warnings (max-warnings=0)
  ```
* **TypeScript**:
  ```bash
  npm run typecheck
  # ✓ Types generated successfully, 0 errors
  ```
* **Production Build**:
  ```bash
  npm run build
  # ✓ Compiled successfully in 3.3s
  # ✓ Generated 52/52 static pages
  ```
* **Playwright Complete Test Suite**:
  ```bash
  npx playwright test
  # ✓ 282 passed (5.2m) across all 11 test suites (0 failures)
  ```
