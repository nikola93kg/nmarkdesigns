# NMark Designs — Phase 1A: Hostinger SMTP & Secure Contact Form Implementation

## Executive Summary

Phase 1A restores fully functional, secure, and authenticated contact form message delivery for **NMark Designs** (`https://nmarkdesigns.com`) using Hostinger's standard business email infrastructure.

In accordance with Phase 0 audit decisions:
- **Hosting:** Kept on existing Hostinger hosting.
- **Mailbox:** Utilizes existing Hostinger business mailbox (`info@nmarkdesigns.com`).
- **No Third-Party Paid Providers:** Eliminates the need for Resend, SendGrid, or Postmark subscriptions.
- **Design & Localization:** 100% preserved visual design system and Serbian (`sr`) / English (`en`) bilingual support.
- **Anti-Spam Defense:** Layered defense-in-depth including honeypot trapping, strict input sanitation, sliding-window IP rate limiting, duplicate submission debouncing, and server-side Cloudflare Turnstile token validation.

---

## 1. System Architecture

```text
Visitor Submits Form (Client Component: ContactForm.tsx)
    │
    ▼ (POST via Server Action with React 19 useActionState)
submitContact Server Action (app/[locale]/[page]/actions.ts)
    │
    ├── 1. Honeypot Check (_hp_website field must be strictly empty)
    │      └─ If filled -> Return spamDetected (silently rejected without SMTP execution)
    │
    ├── 2. Input Validation (lib/contact-validation.ts)
    │      └─ Field boundaries, regex checks, control character sanitation
    │
    ├── 3. Client IP Extraction & Sliding-Window Rate Limiting (lib/rate-limit.ts)
    │      └─ Maximum 5 submissions per 10 minutes per IP
    │
    ├── 4. Duplicate Submission Debounce (lib/rate-limit.ts)
    │      └─ Debounce fingerprint (IP:email:message) within 15 seconds
    │
    ├── 5. Server-Side Cloudflare Turnstile Verification (lib/turnstile.ts)
    │      └─ Siteverify API validation (timeout-guarded, bypasses gracefully if unconfigured)
    │
    └── 6. SMTP Transport Delivery (lib/contact-delivery.ts)
           └─ Nodemailer transport via smtp.hostinger.com:465 (SSL)
           └─ From: "NMark Designs Contact Form" <info@nmarkdesigns.com>
           └─ Reply-To: "${customerName}" <${customerEmail}>
           └─ Plain-text and escaped HTML multi-part payload
           └─ Connection timeouts (10s greeting/connect, 15s socket)
```

---

## 2. Changed & Created Files

| File | Change Type | Purpose |
| :--- | :--- | :--- |
| `lib/contact-delivery.ts` | **Updated** | Hardened Nodemailer SMTP transport, timeouts, safe HTML escaping, dual text/HTML email formatting, and configuration detection. |
| `lib/contact-validation.ts` | **Updated** | Added hidden honeypot (`_hp_website`) bot detection and Cloudflare Turnstile token parsing. |
| `lib/rate-limit.ts` | **Created** | In-memory sliding window rate limiter (5 requests / 10 min) and 15-second duplicate submission debounce store. |
| `lib/turnstile.ts` | **Created** | Server-side Cloudflare Turnstile verification with timeout handling and unconfigured-environment fallback. |
| `lib/contact.ts` | **Updated** | Extended validation error types (`spamDetected`, `rateLimited`, `turnstileFailed`) and form state errors. |
| `content/i18n/sr.ts` | **Updated** | Added Serbian localization strings for honeypot, rate limiting, and Turnstile errors. |
| `content/i18n/en.ts` | **Updated** | Added English localization strings for honeypot, rate limiting, and Turnstile errors. |
| `app/[locale]/[page]/actions.ts` | **Updated** | Orchestrated honeypot, rate limit, duplicate debounce, Turnstile, and SMTP delivery in `submitContact`. |
| `components/contact/ContactForm.tsx` | **Updated** | Added hidden honeypot field, conditional availability warning, status aria announcements, and reset on success. |
| `components/contact/ContactPage.tsx` | **Updated** | Wired dynamic `deliveryAvailable={contactDelivery.isAvailable()}` based on live environment variables. |
| `tests/contact.spec.ts` | **Updated** | Added automated honeypot bot trap tests and updated validation specs. |
| `playwright.config.ts` | **Updated** | Configured `RATE_LIMIT_DISABLED=true` in e2e test webServer command. |
| `.env.example` | **Updated** | Documented all required Hostinger SMTP and Cloudflare Turnstile environment variables. |
| `package.json` & `package-lock.json` | **Updated** | Added production dependency `nodemailer` and dev dependency `@types/nodemailer`. |

---

## 3. Server-Only Environment Variables

All SMTP and Turnstile credentials are kept strictly server-side. None are prefixed with `NEXT_PUBLIC_`, ensuring they are never exposed to browser bundles or client code.

```bash
# ==============================================================================
# Hostinger SMTP Configuration (Phase 1A)
# ==============================================================================
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@nmarkdesigns.com
SMTP_PASSWORD=YOUR_HOSTINGER_EMAIL_PASSWORD_HERE
CONTACT_RECIPIENT=info@nmarkdesigns.com

# ==============================================================================
# Cloudflare Turnstile (Phase 1A - Anti-Spam)
# Optional in local development; when omitted, verification passes safely.
# ==============================================================================
TURNSTILE_SECRET_KEY=YOUR_CLOUDFLARE_TURNSTILE_SECRET_KEY_HERE
NEXT_PUBLIC_TURNSTILE_SITE_KEY=YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY_HERE
```

---

## 4. SMTP Deliverability & DNS Alignment

Live DNS checks on domain `nmarkdesigns.com` confirmed proper mail configuration:
1. **SPF Record (`TXT`):**
   ```text
   v=spf1 include:_spf.mail.hostinger.com ~all
   ```
   Authorizes Hostinger's mail servers to send on behalf of `nmarkdesigns.com`.
2. **MX Records:**
   ```text
   5  mx1.hostinger.com.
   10 mx2.hostinger.com.
   ```
3. **DKIM Record:**
   ```text
   hostingermail-a._domainkey.nmarkdesigns.com -> hostingermail-a.dkim.mail.hostinger.com (2048-bit RSA)
   ```
4. **DMARC Record:**
   ```text
   v=DMARC1; p=none
   ```

### Deliverability Rule Adherence
- **Envelope From & Header From:** Strictly set to `info@nmarkdesigns.com`. Sending from the visitor's email address would fail SPF/DMARC alignment and cause messages to land in spam or be dropped by recipient MTAs.
- **Visitor Reply Address:** Placed strictly in the RFC-compliant `Reply-To: "${name}" <${email}>` header. When clicking "Reply" in the Hostinger webmail or email client, responses route directly to the prospective client.

---

## 5. Anti-Spam Protection Layers

1. **Honeypot Trap (`_hp_website`):**
   - Rendered with CSS clipping (`position: absolute; width: 1px; clip: rect(0,0,0,0); overflow: hidden;`).
   - Hidden from assistive technology (`aria-hidden="true"`, `tabIndex={-1}`).
   - Automated bots that autofill all form controls populate this input, triggering immediate rejection without consuming SMTP resources.

2. **Sliding-Window Rate Limiting:**
   - In-memory tracker tracking client IP timestamps.
   - Enforces a maximum of 5 requests per 10-minute window per IP.
   - Automatically cleans up expired timestamps every 10 minutes to prevent memory leaks.

3. **Duplicate Submission Debouncing:**
   - Generates an in-memory SHA-like composite key of `clientIp:email:message`.
   - Rejects identical submissions repeated within 15 seconds, preventing double-clicks or browser form resubmission duplicate spam.

4. **Cloudflare Turnstile Verification:**
   - Server-side verification querying `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
   - Timeout-guarded (6s abort signal).
   - Graceful fallback: If `TURNSTILE_SECRET_KEY` is not defined in `.env`, the check passes transparently (`bypassed: true`), allowing local tests and staging builds without third-party dependencies.

---

## 6. Verification Results

All automated test suites and validation pipelines passed with zero errors or warnings:

1. **TypeScript Typecheck:**
   ```bash
   npm run typecheck
   # Output:
   # Generating route types...
   # ✓ Types generated successfully
   # Exit code: 0
   ```

2. **ESLint Static Analysis:**
   ```bash
   npm run lint
   # Output:
   # eslint . --max-warnings=0
   # Exit code: 0
   ```

3. **Playwright Contact E2E Suite (`tests/contact.spec.ts`):**
   ```bash
   npm run test:e2e tests/contact.spec.ts
   # Output:
   # Running 25 tests using 2 workers
   # 25 passed (24.1s)
   # Exit code: 0
   ```
   Verified:
   - Viewport scaling across 320px, 375px, 430px, 768px, 1024px, 1440px, 1920px
   - No horizontal overflow
   - Full keyboard accessibility and focus management
   - Client and server-side validation messages
   - JavaScript disabled form postback
   - Honeypot bot trap detection
   - Serbian and English bilingual copy and labels

4. **Production Build:**
   ```bash
   npm run build
   # Output:
   # ✓ Compiled successfully
   # ✓ Generating static pages (50/50)
   # Exit code: 0
   ```

---

## 7. Production Deployment & Hostinger Setup Instructions

### Step 1: Hostinger hPanel Environment Configuration
In the Hostinger VPS or Cloud panel (or `.env.production` file on the deployment server):
1. Navigate to **Websites** -> **Manage** -> **Environment Variables** (or edit `.env.production` directly in the project directory).
2. Configure the following values:
   ```bash
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@nmarkdesigns.com
   SMTP_PASSWORD=<Enter your info@nmarkdesigns.com mailbox password>
   CONTACT_RECIPIENT=info@nmarkdesigns.com
   ```
3. *(Optional)* If configuring Cloudflare Turnstile:
   - Go to Cloudflare Dashboard -> **Turnstile** -> **Add Site**.
   - Set Domain to `nmarkdesigns.com`.
   - Copy the Site Key to `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
   - Copy the Secret Key to `TURNSTILE_SECRET_KEY`.

### Step 2: Restart Next.js Application
Restart the running Node.js / Next.js daemon so it picks up the newly set environment variables:
```bash
pm2 restart nmarkdesigns || npm run start
```

### Step 3: Real-World Delivery Test Checklist
1. Visit `https://nmarkdesigns.com/sr/kontakt/`.
2. Notice that the yellow *"Form delivery is not available yet"* disclaimer disappears once `SMTP_PASSWORD` is configured.
3. Fill out test data:
   - Name: `Test Pošiljalac`
   - Email: `your-personal-email@gmail.com`
   - Phone: `+381 60 000 0000`
   - Message: `Test poruka nakon konfiguracije Hostinger SMTP-a.`
4. Click **Pošaljite poruku**.
5. Check:
   - Success banner appears in green (`text-emerald-700`).
   - Log into Hostinger Webmail (`https://mail.hostinger.com`) with `info@nmarkdesigns.com`.
   - Verify arrival of email titled: `New Website Inquiry — NMark Designs [Test Pošiljalac]`.
   - Verify sender header shows `NMark Designs Contact Form <info@nmarkdesigns.com>`.
   - Click "Reply" and verify recipient defaults to `your-personal-email@gmail.com`.
   - Check spam folder to confirm clean delivery.

---

## 8. Rollback Strategy & Remaining Risks

### Rollback Strategy
If SMTP delivery fails in production (e.g. incorrect password or network restriction on port 465):
1. Simply clear or remove the `SMTP_PASSWORD` environment variable.
2. The contact form automatically falls back to `deliveryAvailable: false`, displaying the helpful notice advising visitors to email or call directly.
3. The website does not crash or exhibit unhandled errors.

### Remaining Risks & Production Considerations
- **Distributed Rate Limiting:** The in-memory sliding window rate limiter operates within a single Node.js process. If the application is ever scaled horizontally to multiple load-balanced instances in the future, rate limiting should be migrated to a distributed key-value store such as Upstash Redis. For the current single-instance Hostinger deployment, in-memory rate limiting is completely sufficient.
- **Port 465 Outbound Access:** Hostinger shared and VPS environments generally permit outbound SSL connections on port 465 to `smtp.hostinger.com`. Ensure firewall rules do not restrict outbound TCP port 465.
