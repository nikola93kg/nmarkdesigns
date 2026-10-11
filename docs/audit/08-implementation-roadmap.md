# Phased Implementation Roadmap

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Senior Next.js Architect & Technical SEO Specialist

---

## 1. Roadmap Architecture & Priority Scheme

In accordance with Phase 0 mission rules:
* Security and core conversion defects are prioritized ahead of cosmetic refinements.
* Hosting migration is **not** prioritized because the current Hostinger edge deployment is fast, stable, and cost-effective.
* Tasks are grouped into independently reviewable, non-breaking phases.

**Priority Definitions:**
* **P0 (Blocker):** Broken business functionality, high-impact conversion blockers, critical security risks.
* **P1 (High):** Major SEO migration risks, missing redirects, local keyword deficiencies.
* **P2 (Medium):** UX enhancements, performance optimizations, dead code removal.
* **P3 (Low):** Minor visual enhancements, editorial polish, optional advanced schema.

---

## 2. Phase 1 — Immediate Fixes & Conversion Restoration (P0)

*Objective:* Turn NMark Designs into an active, lead-generating studio website by enabling contact delivery and eliminating customer-facing friction.

| Ref | Category | Priority | Finding & Problem | Recommended Solution | Effort | Regression Risk | Validation Approach | Affected Files |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ROAD-01** | Lead Gen / Ops | **P0** | Contact form explicitly tells users delivery is unavailable and rejects submissions. | Connect transactional email provider (Resend or Postmark) via Server Action adapter in `lib/contact-delivery.ts`. Remove unavailable notice. | **M** | Low | Submit live form on `/sr/kontakt/` and `/en/contact/`; verify email inbox receipt. | [`lib/contact-delivery.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/contact-delivery.ts), [`components/contact/ContactForm.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/contact/ContactForm.tsx) |
| **ROAD-02** | Security | **P0** | Server action accepts unlimited automated form POST requests without spam or rate protection. | Add CSS-hidden honeypot field + Cloudflare Turnstile widget + in-memory IP rate limiter (3 submits / 10 min). | **M** | Low | Automated script test attempting rapid submissions; verify 429 response. | [`lib/contact-validation.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/contact-validation.ts), [`app/[locale]/[page]/actions.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/[page]/actions.ts) |
| **ROAD-03** | Security / Infra | **P0** | Hostinger hCDN overrides application CSP; full CSP headers are not delivered to browser. | Configure CSP headers directly in `next.config.ts` `headers()` and adjust Hostinger proxy pass-through. | **S** | Low | Curl `https://nmarkdesigns.com/sr/` and inspect `content-security-policy` response header. | [`next.config.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/next.config.ts), [`proxy.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/proxy.ts) |

---

## 3. Phase 2 — SEO Migration & Local Entity Optimization (P1)

*Objective:* Prevent legacy link loss, capture Belgrade/Serbia search intent, and strengthen entity graph.

| Ref | Category | Priority | Finding & Problem | Recommended Solution | Effort | Regression Risk | Validation Approach | Affected Files |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ROAD-04** | Technical SEO | **P1** | 7 legacy project URLs return 404 (`/portfolio/madjionicar-bojan/`, `/portfolio/frankultura/`, etc.). | Add exact 308 redirects in `lib/legacy-redirects.ts` pointing to `/sr/portfolio/#project-{slug}`. | **S** | Zero | Curl all 7 legacy URLs; verify HTTP 308 and correct destination. | [`lib/legacy-redirects.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/legacy-redirects.ts) |
| **ROAD-05** | Local SEO / AIO | **P1** | Core homepage, services, and about pages contain zero mentions of Belgrade or Serbia. | Naturally incorporate Belgrade/Serbia into Hero description, About intro, and Contact metadata without keyword stuffing. | **S** | Zero | Check rendered HTML on `/sr/` and `/en/` for natural geographic entities. | [`content/i18n/sr.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/i18n/sr.ts), [`content/i18n/en.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/i18n/en.ts) |
| **ROAD-06** | Structured Data | **P1** | Services page lacks `Service` structured data schema. | Add typed `Service` schema in `lib/schema.ts` for the 6 core offerings and embed via `<JsonLd>` on `ServicesPage`. | **S** | Zero | Google Rich Results Test validation. | [`lib/schema.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/schema.ts), [`app/[locale]/[page]/page.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/[page]/page.tsx) |

---

## 4. Phase 3 — UX Flow & Portfolio Funnel Alignment (P2)

*Objective:* Retain visitors inside the conversion funnel and eliminate dead ends.

| Ref | Category | Priority | Finding & Problem | Recommended Solution | Effort | Regression Risk | Validation Approach | Affected Files |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ROAD-07** | UX / Portfolio | **P2** | Portfolio index tiles link directly to external client sites, bypassing internal case study pages. | Change primary card link on `/portfolio/` to open internal case study route; make external link a secondary button. | **M** | Low | Click portfolio cards in browser; verify internal routing. | [`components/portfolio/PortfolioShowcase.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/portfolio/PortfolioShowcase.tsx) |
| **ROAD-08** | Code Quality | **P2** | Unused components `ProjectGrid.tsx`, `ProjectCard.tsx`, and `PortfolioIntro.tsx` add ~250 lines of dead code. | Cleanly remove unused components from `components/portfolio/`. | **S** | Zero | Run TypeScript typecheck to verify zero broken imports. | `components/portfolio/*.tsx` |
| **ROAD-09** | Performance | **P2** | `BackToTop.tsx` scroll listener recalculates layout properties on every scroll tick. | Wrap progress calculation in `requestAnimationFrame` and optimize state updates. | **S** | Low | Scroll test in Chrome DevTools Performance Profiler. | [`components/ui/BackToTop.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/ui/BackToTop.tsx) |

---

## 5. Phase 4 — Long-Term Enhancements & Analytics Tracking (P3)

*Objective:* Advanced tracking and compliance.

| Ref | Category | Priority | Finding & Problem | Recommended Solution | Effort | Regression Risk | Validation Approach | Affected Files |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ROAD-10** | Analytics | **P3** | Outbound WhatsApp and Phone clicks are not tracked as conversion events in GA4. | Add custom GA4 event tracking for WhatsApp and Phone click interactions. | **S** | Low | DebugView in GA4 confirming click event receipt. | [`components/layout/Footer.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/layout/Footer.tsx), [`components/contact/ContactPage.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/contact/ContactPage.tsx) |
| **ROAD-11** | Image Optimization | **P3** | Images only serve WebP; Next.js config doesn't request AVIF. | Add `formats: ['image/avif', 'image/webp']` to `next.config.ts`. | **S** | Low | Check `content-type: image/avif` on modern Chrome. | [`next.config.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/next.config.ts) |
| **ROAD-12** | Privacy / Legal | **P3** | No cookie consent banner or privacy policy route. | Add lightweight Serbian/English privacy policy and cookie banner if required by client legal status. | **M** | Low | Consent banner verification. | Layout and legal route |
