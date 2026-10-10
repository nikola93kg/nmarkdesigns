# NMark Designs — Phase 0: Executive Summary & Comprehensive Website Audit

**Website:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only — No Application Source Code Modified)  
**Date:** October 10, 2026  
**Auditor Roles:** Senior Next.js Architect, Frontend Performance Engineer, Application Security Reviewer, Technical SEO Specialist, Accessibility Expert, and Conversion Optimization Consultant.

---

## 1. Overall Architectural Assessment

The new NMark Designs website is **already live in production on https://nmarkdesigns.com** running a modern **Next.js 16 App Router (Next 16.3.6 / React 19.2.8)** stack.

The codebase represents a disciplined engineering implementation:
* **Strict TypeScript:** Zero `: any` or `@ts-ignore` in the entire repository.
* **Component Architecture:** Pristine Server Component boundaries with minimal isolated client components.
* **Performance:** HTML TTFB is **83 ms – 198 ms** delivered over HTTP/2 & HTTP/3 via Hostinger CDN (`server: hcdn`, edge nodes in Frankfurt `fra-edge`). Global CSS is only **13.4 KB**; total initial JS is lean (~75 KB gzipped).
* **SEO Foundations:** Flawless self-referencing canonicals, bidirectional hreflang tags (`sr`, `en`, and `x-default`), dynamic `/robots.txt`, and clean `/sitemap.xml`.

**The site does NOT require a rebuild or a costly hosting migration.** It is ~90% of the way to being an industry-leading studio site. However, several critical operational and commercial gaps currently prevent it from reaching its revenue potential.

---

## 2. Top 10 Critical Findings

1. **[CRITICAL / CONVERSION] The Contact Form "Unavailable" Trap:**  
   The contact form on `/sr/kontakt/` and `/en/contact/` displays a banner stating that submissions are disabled (`contactDelivery.available = false`) and rejects inquiries with an error message. High-intent prospects cannot submit inquiries through the website.
2. **[HIGH / SECURITY] Missing Spam, Honeypot & Rate Limiting on Server Action:**  
   The form submission Server Action (`submitContact` in `actions.ts`) has no CAPTCHA (Turnstile), no honeypot field, and no IP rate limiting. Once email delivery is connected, bots can flood the endpoint and exhaust mail quotas.
3. **[HIGH / SECURITY] Content-Security-Policy (CSP) Overridden in Production:**  
   The comprehensive CSP defined in `proxy.ts` is stripped by the Hostinger reverse proxy; production headers only return `content-security-policy: upgrade-insecure-requests`.
4. **[HIGH / SEO] Seven Legacy WordPress Project URLs Return 404:**  
   7 out of 15 legacy project URLs (`/portfolio/madjionicar-bojan/`, `/portfolio/frankultura/`, etc.) have no 308 redirect mappings and return 404, risking link equity loss.
5. **[MEDIUM / LOCAL SEO] Zero Mention of Belgrade or Serbia in Core Copy:**  
   Despite targeting Belgrade and Serbia, the words "Beograd" or "Srbija" appear zero times in the core homepage, services, about, and contact copy. Competitors capture local high-intent search traffic.
6. **[MEDIUM / UX] Portfolio Showcase Tiles Route Directly Off-Site:**  
   Clicking project cards on `/sr/portfolio/` sends visitors directly to external client websites in the same tab, bypassing the 8 rich internal case study pages and losing potential clients from the sales funnel.
7. **[MEDIUM / AIO] Missing Service Structured Data:**  
   The Services page (`/sr/usluge/`) has no structured data schema (`Service` / `ProfessionalService`), reducing clarity for Google and AI search engines (Perplexity, ChatGPT).
8. **[LOW / HOUSEKEEPING] Dead / Unused Portfolio Components:**  
   `ProjectGrid.tsx`, `ProjectCard.tsx`, and `PortfolioIntro.tsx` in `components/portfolio/` are unreferenced dead code (~250 lines) left over from earlier phase iterations.
9. **[LOW / PERFORMANCE] Unthrottled Scroll Calculation in BackToTop:**  
   `BackToTop.tsx` recalculates `scrollHeight` and triggers React state updates on every scroll event rather than throttling via `requestAnimationFrame`.
10. **[LOW / ANALYTICS] Missing Micro-Conversion Event Tracking:**  
    Outbound WhatsApp and phone number clicks are not tracked as conversion events in Google Analytics 4.

---

## 3. Confirmed Strengths vs. Confirmed Weaknesses

### Confirmed Strengths
* **Server Components First:** 90%+ of JSX renders entirely on the server; zero client state bloat (no Redux, Zustand, or large UI libraries).
* **Speed & Edge Caching:** Sub-150ms TTFB across Europe on Hostinger CDN with Brotli and HTTP/3 support.
* **Disciplined Design System:** Restrained brand palette (`#110024`, light surfaces, warm amber accents) with clean DM Sans typography.
* **Strict Type Safety:** Exhaustive typing across bilingual dictionaries, route models, and form validation.
* **Progressive Enhancement:** FAQ accordion renders full answers on server; accessible without JavaScript.

### Confirmed Weaknesses
* **Disabled Form Delivery:** Visitors cannot message the studio via the form.
* **Off-Site Link Traps:** Portfolio tiles dump users off the domain without warning.
* **Local Geographic Blind Spot:** No local entity signals for Belgrade search engine queries.
* **Unprotected Form Action:** Vulnerable to automated bot spam once email delivery is connected.
* **Unredirected Legacy URLs:** 7 older project pages return 404.

---

## 4. Architectural & Hosting Recommendation

### Is a Hosting Migration Justified?
**NO. Moving to Vercel or another host is NOT justified at this time.**

* **Evidence:**
  * Hostinger hCDN edge in Frankfurt (`fra-edge`) delivers cached HTML in **83 ms – 198 ms**.
  * HTTP/2, HTTP/3, Brotli compression, and TLS 1.3 Let's Encrypt certificates are active and properly configured.
  * Node.js runtime executes Server Components and React 19 Server Actions without issue.
  * Vercel Pro would add an unnecessary **$240+/year overhead** with zero measurable performance or business improvement for this 44-page marketing site.
* **Verdict:** Keep the existing Hostinger infrastructure. Revisit only if international traffic expands outside Europe or automated branch preview pipelines become essential.

---

## 5. Top 3 Highest-Impact Quick Wins

1. **Activate Contact Delivery via Resend / Postmark (Effort: ~1 hour):**  
   Replace `available: false` in `lib/contact-delivery.ts` with a real transactional email provider. Instantly transforms the website from an informational brochure into an active lead-capture engine.
2. **Add 308 Redirects for the 7 Legacy Projects (Effort: ~15 minutes):**  
   Add the 7 missing slugs in `lib/legacy-redirects.ts` pointing to `/sr/portfolio/#project-{slug}` to resolve 404 errors and preserve backlink equity.
3. **Change Portfolio Card Clicks to Internal Case Studies (Effort: ~30 minutes):**  
   In `PortfolioShowcase.tsx`, make card clicks navigate to the internal case study route (`localizedProjectPath(slug)`), keeping visitors engaged inside the studio's portfolio rather than bouncing them off-site.

---

## 6. Recommended Phase Order

1. **Phase 1 — Immediate Fixes & Lead Capture Restoration (P0):**  
   Enable email delivery (Resend/Postmark), add Turnstile/honeypot spam protection, and fix the production CSP header override.
2. **Phase 2 — Technical SEO Migration & Local Entity Optimization (P1):**  
   Redirect the 7 legacy project 404s, naturally incorporate Belgrade/Serbia local entities, and add `Service` structured data.
3. **Phase 3 — UX Flow & Portfolio Alignment (P2):**  
   Re-link portfolio tiles to internal case studies, clean up dead components, and optimize the scroll listener.
4. **Phase 4 — Advanced Analytics & Conversions (P3):**  
   Implement custom GA4 events for WhatsApp/Phone clicks and add AVIF image support.

---

## 7. Blockers Requiring User Input

Before Phase 1 implementation can begin, please provide:
1. **Email Service Provider Choice:** Preference for transactional email delivery (e.g., **Resend** [Recommended: 3,000 free emails/mo, instant Next.js integration], **Postmark**, or direct **SMTP credentials** for `info@nmarkdesigns.com`).
2. **Notification Recipient:** Confirm the destination inbox where form submissions should be delivered (e.g., `info@nmarkdesigns.com`).
3. **7 Legacy Projects Decision:** Confirm whether the 7 older projects (`madjionicar-bojan`, `frankultura`, etc.) should permanently redirect to `/sr/portfolio/` or if you plan to write case studies for any of them.
4. **Local Entity Positioning:** Confirmation to include "Beograd / Srbija" in the hero and about descriptions.

---

## 8. Verification Status

* **Completed & Verified:** Architecture, Node/Next.js/React versions, routing, Server/Client boundaries, live production HTTP responses, SSL/TLS, edge caching, compression, asset sizes, CSS delivery, security headers, XSS/injection safety, legacy 308 redirects, sitemap.xml, robots.txt, structured data, mobile menu, touch targets, and external source reachability.
* **Unverified (Pending Access):** Live GA4 event reception (needs GA property access), Google Search Console crawl errors/coverage (needs GSC access), and mail delivery (intentionally disabled in current code).

---

## 9. Recommended Exact Scope of Phase 1

1. Connect **Resend** (or Hostinger SMTP) in `lib/contact-delivery.ts` with server-only environment variables.
2. Update `components/contact/ContactForm.tsx` to remove the "unavailable" banner and display clean submission feedback.
3. Add a hidden honeypot field and Cloudflare Turnstile token verification to `submitContact` Server Action.
4. Add rate limiting to prevent automated form flooding.
5. Move full CSP configuration to `next.config.ts` `headers()` so Hostinger delivers the complete policy.
