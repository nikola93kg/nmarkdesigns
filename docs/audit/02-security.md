# Application Security Audit

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Application Security Reviewer  
**Methodology:** Passive source inspection, dependency evaluation, secret leakage analysis, HTTP response header probing, input validation boundary review, and abuse protection assessment.

---

## 1. Summary of Security Posture

NMark Designs demonstrates a solid defense-in-depth architecture in its source code. The application has zero database attack surface, relies on React 19 Server Components, implements strict input sanitization on contact payloads, and avoids dangerous reflection.

However, the audit identified three key security issues:
1. **Misconfigured / Overridden Content-Security-Policy (CSP) in Production** (High Priority Defense-in-Depth finding).
2. **Contact Form Abuse & Denial-of-Service Surface** (Missing Rate Limiting & Captcha / Turnstile).
3. **Sensitive Path Scanning / File Access Surface**.

---

## 2. Security Findings Matrix

| Ref | Category | Severity | Status | Summary |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | HTTP Security Headers | **Medium** | **VERIFIED** | Full CSP directive defined in `proxy.ts` is overridden on production by Hostinger reverse proxy; only `upgrade-insecure-requests` is delivered. |
| **SEC-02** | Spam / Abuse Protection | **Medium** | **VERIFIED** | Contact form has no CAPTCHA (Turnstile/hCaptcha), no honeypot field, and no server-side rate limiting. |
| **SEC-03** | Secrets & Sensitive Config | **Low (Info)** | **VERIFIED** | No leaked secrets in repository or client bundle. `.env` and `.git` are protected by Hostinger with 403 Forbidden. |
| **SEC-04** | Input Validation & XSS | **Low (Info)** | **VERIFIED** | Form input validation is thorough and safe; no unescaped user reflections. JSON-LD properly sanitized. |
| **SEC-05** | Third-Party Scripts & Subresource Security | **Low** | **VERIFIED** | Google Analytics tag directly inlines script without Subresource Integrity or nonce; dependencies are up to date. |

---

## 3. Detailed Security Findings

### SEC-01: Content-Security-Policy (CSP) Stripped or Truncated in Production
* **Severity:** Medium (Defense-in-Depth)
* **Status:** **VERIFIED**
* **Evidence:**
  * Source code in [`proxy.ts#L25-L40`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/proxy.ts#L25-L40) defines a comprehensive Content-Security-Policy containing:
    ```http
    default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com ...; frame-ancestors 'none'; form-action 'self'; ...
    ```
  * Real-world production curl probing reveals the actual header returned by `https://nmarkdesigns.com/sr/`:
    ```http
    content-security-policy: upgrade-insecure-requests
    ```
* **Attack Surface & Impact:**
  * The production reverse proxy (Hostinger hCDN/Nginx) is replacing or truncating the Next.js application's CSP header with its own default `upgrade-insecure-requests` directive.
  * While `x-frame-options: DENY` is active (mitigating UI clickjacking), the absence of `script-src`, `connect-src`, and `frame-ancestors` leaves the browser without strict resource restriction if a future third-party script or dependency vulnerability were introduced.
* **Remediation:**
  * Ensure Hostinger Nginx / OpenLiteSpeed / hCDN configuration passes upstream `Content-Security-Policy` headers rather than overwriting them, OR configure the complete CSP header directly in Next.js `next.config.ts` `headers()` configuration.

---

### SEC-02: Contact Form Abuse Surface & Lack of Rate Limiting
* **Severity:** Medium (Functional / Abuse Vulnerability)
* **Status:** **VERIFIED**
* **Evidence:**
  * Form implementation: [`components/contact/ContactForm.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/contact/ContactForm.tsx)
  * Server action: [`app/[locale]/[page]/actions.ts#L8-L26`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/[page]/actions.ts#L8-L26)
  * Validation: [`lib/contact-validation.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/contact-validation.ts)
  * Delivery adapter: [`lib/contact-delivery.ts#L19-L24`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/contact-delivery.ts#L19-L24)
* **Current State:**
  * `contactDelivery.available` is currently set to `false`. When a visitor submits the form, the server action validates the fields and returns status `"unavailable"`, displaying:
    > *"Slanje putem formulara trenutno nije dostupno. Kontaktirajte nas direktno putem emaila, telefona ili WhatsApp-a."*
* **Vulnerability Analysis:**
  * While delivery is currently disabled, **the server action still executes full validation and error reporting on every POST request**.
  * There is **no CAPTCHA (e.g. Cloudflare Turnstile)**, **no hidden honeypot field**, and **no IP-based or session rate limiting**.
  * Once a real mail provider (e.g. Resend, Postmark, SendGrid) is connected in Phase 5B / Phase 7, the endpoint will immediately become vulnerable to:
    1. Automated spam bot flooding.
    2. Mail API quota exhaustion and financial denial-of-service.
    3. Mail reputation blacklisting (if bots submit victim email addresses to trigger automated confirmation bounces).
* **Remediation (Before enabling mail delivery):**
  1. Add a CSS-hidden honeypot input field (bots fill it; human browsers ignore it).
  2. Integrate Cloudflare Turnstile (free, privacy-preserving, zero friction for users).
  3. Implement in-memory or Redis / Upstash sliding-window rate limiting on the Server Action (e.g. max 3 submissions per IP per 10 minutes).

---

### SEC-03: Secrets Handling & File Exposure Checks
* **Severity:** Low (Informational)
* **Status:** **VERIFIED (SECURE)**
* **Evidence:**
  * `.env.example` in repo contains only non-sensitive configuration keys:
    ```sh
    SITE_LAUNCH=false
    DEPLOYMENT_ENV=development
    ```
  * Client bundle search for secret prefixes (`AIza`, `sk_`, `AKIA`, `private_`) revealed **zero exposed API keys or tokens**.
  * Live HTTP probing of sensitive paths:
    * `GET /.env` -> **HTTP 403 Forbidden** (Blocked at web server level).
    * `GET /.git/HEAD` -> **HTTP 403 Forbidden** (Blocked at web server level).
    * `GET /package.json` -> **HTTP 404 Not Found** (Protected by Next.js router).
    * `GET /next.config.ts` -> **HTTP 404 Not Found** (Protected by Next.js router).
    * `GET /wp-config.php` -> **HTTP 404 Not Found** (No leftover WordPress files).

---

### SEC-04: Cross-Site Scripting (XSS) & HTML Injection Analysis
* **Severity:** Low (Informational)
* **Status:** **VERIFIED (SECURE)**
* **Evidence:**
  * Three usages of `dangerouslySetInnerHTML` exist in the repository:
    1. [`components/seo/JsonLd.tsx#L4`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/seo/JsonLd.tsx#L4): Emits JSON-LD via `serializeJsonLd(data)`. In [`lib/schema.ts#L55-L57`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/schema.ts#L55-L57), the JSON string is rigorously escaped:
       `JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")` — perfectly preventing `</script>` tag breakout.
    2. [`app/[locale]/blog/[slug]/page.tsx#L64`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/blog/[slug]/page.tsx#L64): Uses the same `serializeJsonLd(schema)` helper for article schema.
    3. [`components/seo/GoogleAnalytics.tsx#L17`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/seo/GoogleAnalytics.tsx#L17): Validates measurement ID with regex `/^G-[A-Z0-9]+$/` before embedding into `gtag('config', '${id}')`.
  * Contact form reflects user input into text inputs safely via React JSX value props, with explicit control character stripping (`/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u`) and line-break checks on single-line inputs to prevent header injection.

---

### SEC-05: External Link Vulnerabilities (`target="_blank"`)
* **Severity:** Low
* **Status:** **VERIFIED**
* **Evidence:**
  * [`components/ui/Button.tsx#L39`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/ui/Button.tsx#L39) enforces:
    `const safeRel = target === "_blank" ? `${rel ?? ""} noopener noreferrer`.trim() : rel;`
  * Footer social links in [`components/layout/Footer.tsx#L124`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/layout/Footer.tsx#L124) explicitly define `target="_blank" rel="noopener noreferrer"`.
  * Blog sharing links in [`components/blog/BlogShare.tsx#L100`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/blog/BlogShare.tsx#L100) explicitly define `target="_blank" rel="noopener noreferrer"`.
  * **Result:** Reverse tabnabbing (`window.opener` abuse) is fully mitigated.
