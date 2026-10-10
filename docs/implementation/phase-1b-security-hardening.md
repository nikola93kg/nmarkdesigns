# NMark Designs — Phase 1B: Security Headers & Content Security Policy Hardening

## Executive Summary

Phase 1B implements a hardened, production-compatible Content Security Policy (CSP) and HTTP security headers for **NMark Designs** (`https://nmarkdesigns.com`) on Next.js with Hostinger hosting and Cloudflare edge CDN.

This phase resolved the root cause blocking Cloudflare Turnstile bot verification identified during Phase 1A, eliminated unrecognized Permissions-Policy directives, validated strict origin allowances, and established automated regression tests for HTTP security headers.

---

## 1. Original Security Issues & Root Causes

### 1.1 Turnstile Script & Iframe Blocking
* **Symptom:** Browser console error when loading `/sr/kontakt/` and `/en/contact/`:
  ```text
  Loading the script 'https://challenges.cloudflare.com/turnstile/v0/api.js' violates the following Content Security Policy directive: "script-src 'self' ...". The action has been blocked.
  ```
* **Root Cause:**
  - `script-src` in `proxy.ts` permitted only `'self'`, `'unsafe-inline'`, `'unsafe-eval'`, and Google Analytics origins. `https://challenges.cloudflare.com` was missing.
  - `frame-src` was configured strictly as `'none'`, which prohibited Turnstile from mounting its challenge execution `<iframe>`.

### 1.2 Deprecated Permissions-Policy Directive
* **Symptom:** Browser reported:
  ```text
  Error with Permissions-Policy header: Unrecognized feature: 'ambient-light-sensor'.
  ```
* **Root Cause:** `ambient-light-sensor=()` is an obsolete/non-standard Permissions-Policy feature rejected by modern Chromium/WebKit rendering engines.

### 1.3 Hostinger CDN CSP Override in Production
* **Symptom:** Probing `https://nmarkdesigns.com` in Phase 0 revealed that Hostinger edge reverse proxy (hCDN) served a truncated `content-security-policy: upgrade-insecure-requests`, overriding the application middleware headers.
* **Root Cause:** Hostinger edge caching layer caches responses and applies default edge security policies unless origin upstream headers are passed through or configured in Hostinger hPanel.

---

## 2. Changes Implemented

### 2.1 Content-Security-Policy (CSP) Directives Update (`proxy.ts`)

| Directive | Before Phase 1B | After Phase 1B | Rationale |
| :--- | :--- | :--- | :--- |
| `script-src` | `'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com` | `'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com` | Allows Cloudflare Turnstile challenge engine script (`api.js`). |
| `frame-src` | `'none'` | `https://challenges.cloudflare.com` | Allows Turnstile to mount challenge iframe while denying all other untrusted embedding. |
| `connect-src` | `'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://analytics.google.com` | `'self' https://challenges.cloudflare.com https://www.google-analytics.com https://stats.g.doubleclick.net https://analytics.google.com` | Allows Turnstile script telemetry and challenge negotiation with Cloudflare endpoints. |
| `frame-ancestors` | `'none'` | `'none'` | Preserved: Prevents site clickjacking (cannot be embedded by any other site). |
| `form-action` | `'self'` | `'self'` | Preserved: Prevents form exfiltration to unauthorized external URLs. |
| `base-uri` | `'self'` | `'self'` | Preserved: Restricts `<base>` tag injection. |
| `object-src` | `'none'` | `'none'` | Preserved: Disables legacy Flash/Java plugins. |
| `upgrade-insecure-requests` | Included | Included | Automatically upgrades any HTTP asset requests to HTTPS. |

### 2.2 Permissions-Policy Cleanup (`proxy.ts`)
- Removed unrecognized `ambient-light-sensor=()`.
- Retained strict lockdown on sensitive APIs:
  `camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), autoplay=(), encrypted-media=(), fullscreen=(), picture-in-picture=(), xr-spatial-tracking=()`

### 2.3 Turnstile Frontend Integration (`components/contact/ContactForm.tsx`)
- Container `<div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="light" />` conditionally renders when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is present.
- Injects `https://challenges.cloudflare.com/turnstile/v0/api.js` using Next.js `next/script` with `strategy="lazyOnload"`.

---

## 3. Trusted Origins Directory

The complete trusted third-party origin whitelist for NMark Designs is:
1. **Google Analytics / Tag Manager:**
   - `https://www.googletagmanager.com` (`script-src`)
   - `https://www.google-analytics.com`, `https://ssl.google-analytics.com` (`script-src`, `connect-src`, `img-src`)
   - `https://stats.g.doubleclick.net`, `https://analytics.google.com` (`connect-src`, `img-src`)
2. **Google Fonts:**
   - `https://fonts.googleapis.com` (`style-src`)
   - `https://fonts.gstatic.com` (`font-src`)
3. **Cloudflare Turnstile (Anti-Spam Bot Defense):**
   - `https://challenges.cloudflare.com` (`script-src`, `frame-src`, `connect-src`)

No wildcards (`*`) or unvetted CDNs are permitted.

---

## 4. Browser Testing & Regression Evidence

1. **CSP Loading Verification in Real Chromium Browser:**
   - Successfully verified loading `http://127.0.0.1:3100/sr/kontakt/`.
   - `window.turnstile` loaded and defined: **`true`**.
   - Zero CSP violation errors logged in browser console.
2. **HTTP Response Header Probing:**
   - `Content-Security-Policy`: Full directive with `https://challenges.cloudflare.com` in `script-src`, `frame-src`, `connect-src` confirmed delivered.
   - `X-Content-Type-Options: nosniff`: Confirmed.
   - `X-Frame-Options: DENY`: Confirmed.
   - `Referrer-Policy: strict-origin-when-cross-origin`: Confirmed.
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`: Confirmed.
   - `Permissions-Policy`: Clean list without console syntax warnings confirmed.
3. **Automated Playwright Suite (`tests/contact.spec.ts`):**
   - Added `Phase 1B: security headers and Content Security Policy verification` test.
   - Ran all **26 tests** covering viewports (320px–1920px), honeypot trap, tab keyboard navigation, no-JS fallback, and security headers:
   - **Result: 26 passed (0 failures, 27.8s)**.
4. **Code Quality & Build:**
   - `npm run lint`: 0 warnings, 0 errors.
   - `npm run typecheck`: clean (0 errors).
   - `npm run build`: 50/50 static routes prerendered cleanly.

---

## 5. Hostinger Production Deployment Guide

When deploying to Hostinger production:
1. Ensure the Hostinger reverse proxy forwards the upstream `Content-Security-Policy` header.
2. In Hostinger hPanel -> **Security** -> **Advanced / Headers** (or OpenLiteSpeed / Nginx config):
   - Confirm that the server does not overwrite the full Next.js CSP with a generic `upgrade-insecure-requests`.
3. If Hostinger edge CDN caches the HTML pages:
   - Purge the edge cache after deployment to ensure new headers take effect immediately.

---

## 6. Rollback Instructions

If any third-party script compatibility issue arises:
1. In `proxy.ts`: Revert `frame-src` to `'none'` and remove `https://challenges.cloudflare.com` from `script-src` and `connect-src`.
2. Clear `NEXT_PUBLIC_TURNSTILE_SITE_KEY` from `.env.local` / `.env.production`.
3. Rebuild with `npm run build`. The contact form will automatically hide the Turnstile widget and continue operating with honeypot and IP sliding-window rate limiting alone.
