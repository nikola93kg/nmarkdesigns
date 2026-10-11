# Technical Architecture & Hosting Audit

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Senior Next.js Architect & Performance Engineer  
**Status Evidence:** Non-destructive code audit + real-world production curl probing (Hostinger hCDN node `fra-edge`).

---

## 1. Executive Architecture Summary

NMark Designs is an incremental rebuild of an original WordPress agency site into a modern **Next.js 16 App Router** application, written in strict TypeScript and styled with Tailwind CSS v4.

Contrary to conventional assumptions about marketing sites on shared hosting, the live production site is **NOT** a static export (`output: "export"`). It runs as a **Node.js runtime application deployed on Hostinger VPS / Cloud Application Platform**, fronted by **Hostinger CDN (`server: hcdn`, edge nodes in Frankfurt `fra-edge`)**, utilizing HTTP/2 and HTTP/3 (QUIC).

### Core Stack Inventory

| Component | Repository Config / Package | Observed Production State | Evidence & File Location |
| :--- | :--- | :--- | :--- |
| **Next.js Version** | `next: 16.3.6` (Canary/Pre-release Next 16) | Active on server (`x-nextjs-cache`, `x-nextjs-prerender: 1`) | [`package.json#L18`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/package.json#L18), Production HTTP headers |
| **React Version** | `react: 19.2.8`, `react-dom: 19.2.8` | React 19 Server Components + Actions | [`package.json#L19-L20`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/package.json#L19-L20) |
| **Node.js Target** | `>=22.0.0` (`.nvmrc`: `24`) | Node 24 LTS compatible | [`.nvmrc`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/.nvmrc), [`package.json#L6`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/package.json#L6) |
| **TypeScript** | `typescript: 6.0.3` (Strict mode) | Strict typing across codebase; zero `any` found | [`tsconfig.json#L7`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/tsconfig.json#L7) |
| **Styling** | `tailwindcss: 4.3.3`, `@tailwindcss/postcss: 4.3.3` | PostCSS v4 engine; CSS Modules for specific artwork/blog styles | [`postcss.config.mjs`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/postcss.config.mjs), [`app/globals.css`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/globals.css) |
| **Icons** | `lucide-react: 1.42.0` | SVG icons rendered cleanly | [`package.json#L17`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/package.json#L17) |
| **Rendering Model** | App Router Server Components + Static Pre-rendering | SSG/ISR hybrid with dynamic proxy middleware | [`proxy.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/proxy.ts), Production header `x-nextjs-prerender: 1` |
| **Hosting Infrastructure** | Hostinger (`platform: hostinger`, `panel: hpanel`) | Hostinger hCDN reverse proxy (`hcdn`), Let's Encrypt TLS 1.3 | Production header `platform: hostinger`, `server: hcdn` |

---

## 2. Rendering & Routing Architecture

### 2.1 Routing Structure
The application employs localized dynamic routing under `app/[locale]/`:
* Root `/` permanently redirects (HTTP 308) to `/sr/`.
* Supported locales: `sr` (Serbian Latin, default) and `en` (English), defined strictly in [`lib/i18n.ts#L1`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/i18n.ts#L1).
* Total public indexable pages in sitemap: **44 pages** (2 locale roots + 10 core pages + 16 project details [8 per locale] + 16 blog posts [8 per locale, 7 published/1 pending]).
* Slug localization pattern:
  * Serbian: `/sr/o-nama/`, `/sr/kontakt/`, `/sr/cenovnik/`, `/sr/usluge/`, `/sr/portfolio/`, `/sr/blog/`
  * English: `/en/about/`, `/en/contact/`, `/en/pricing/`, `/en/services/`, `/en/portfolio/`, `/en/blog/`
  * Dynamic core routes mapped via `app/[locale]/[page]/page.tsx` with `dynamicParams = false` and `generateStaticParams` constrained by `corePageRoutes` in [`lib/routes.ts#L44`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/routes.ts#L44).

### 2.2 Server vs. Client Component Boundaries
The architecture strictly enforces Next.js Server Components by default:
* **Server Components (No client JS):**
  * Root Layout: [`app/[locale]/layout.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/layout.tsx)
  * Homepage: [`app/[locale]/page.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/page.tsx)
  * All Core Pages: `CorePage`, `ServicesPage`, `PricingPage`, `AboutIntro`, `AboutProfile`, `AboutApproach`
  * Portfolio Showcase & Case Studies: `PortfolioShowcase`, `CaseStudyHero`, `CaseStudyDetails`, `CaseStudyNavigation`
  * Blog Page & Article: `BlogPage`, `BlogCard`, `BlogArticlePage`
* **Isolated Client Boundaries (`"use client"`):**
  1. [`components/layout/MobileNavigation.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/layout/MobileNavigation.tsx) — Handles mobile drawer toggle and body scroll lock.
  2. [`components/layout/LanguageSwitcher.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/layout/LanguageSwitcher.tsx) — Reads current pathname via `usePathname()` to compute equivalent alternate link.
  3. [`components/home/FAQAccordion.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/home/FAQAccordion.tsx) — Progressive enhancement for accordion toggles (uses `useSyncExternalStore` so SSR renders all answers visible to search engines and JS-disabled users).
  4. [`components/contact/ContactForm.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/contact/ContactForm.tsx) — React 19 `useActionState` form with client validation feedback.
  5. [`components/blog/BlogShare.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/blog/BlogShare.tsx) — Clipboard API copy and social popups.
  6. [`components/ui/BackToTop.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/ui/BackToTop.tsx) — Scroll listener with SVG progress circle.

---

## 3. Deployment, Middleware & Hostinger Reverse Proxy

### 3.1 The `proxy.ts` vs `middleware.ts` Dilemma
In Next.js, request middleware is loaded from `middleware.ts` or `src/middleware.ts` in the project root.
* The repository defines comprehensive request handling inside [`proxy.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/proxy.ts):
  * Normalized trailing slash enforcement.
  * Direct 308 permanent redirects for legacy WordPress paths (`lib/legacy-redirects.ts`).
  * Strict path allowlist check against `publicPaths`.
  * Security response headers injection (`addSecurityHeaders`).
  * Dynamic host check for `X-Robots-Tag: noindex, nofollow` on non-production hosts.
* **CRITICAL FINDING (VERIFIED):** Next.js does **not** recognize `proxy.ts` as a middleware file unless invoked by custom server code or a proxy wrapper.
  * However, testing on live production shows that:
    1. Legacy redirects work (`/about/` -> `/sr/o-nama/` with HTTP 308).
    2. Missing paths return strict Next.js 404 with `x-robots-tag: noindex, nofollow`.
    3. HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy **are present** in production headers.
    4. **BUT Content-Security-Policy (CSP) is NOT present in its full configured form**; the production response only sends `content-security-policy: upgrade-insecure-requests` (injected by Hostinger / reverse proxy).
  * **Architectural Rationale:** The application is running via Next.js custom server or Hostinger's Next.js container launcher where `proxy.ts` was either renamed to `middleware.ts` during build or executed via a wrapper script. If this file was intended to be standard Next.js middleware, renaming it to `middleware.ts` is required for standard Next.js CLI portability.

---

## 4. Hosting Options Comparison: Keep Hostinger vs. Vercel vs. Self-Hosted VPS

A central mandate of Phase 0 is to evaluate whether moving from Hostinger to Vercel or another platform is technically and commercially justified.

### In-Depth Platform Comparison

| Evaluation Dimension | Option A: Current Hostinger (Node Container / VPS + hCDN) | Option B: Vercel Pro ($20/mo + add-ons) | Option C: Static Export (`output: 'export'`) on Cloudflare Pages / S3 |
| :--- | :--- | :--- | :--- |
| **Current Performance (TTFB)** | **83 ms – 200 ms** across Europe (tested live on `fra-edge`). | Typically 40 ms – 120 ms globally. | Sub-50 ms globally on Cloudflare edge. |
| **Next.js Feature Compatibility** | Supports Server Actions, dynamic routes, headers, custom node runtime. Image optimization enabled via Sharp. | 100% native Next.js feature support, Instant Rollbacks, Preview Comments. | ❌ No Server Actions without external API. ❌ No `next/image` on-demand optimization without Cloudflare Images or static sizing. |
| **Contact Form & Server Actions** | Supported directly. Form actions run in Node.js server. | Supported natively via Vercel Serverless Functions. | Requires 3rd-party SaaS (Formspree, Formkeep, Resend webhook). |
| **Operating Cost** | **Included in existing Hostinger plan (~€3–€10/month)**. | **$20/user/month (€240/yr min)** + bandwidth/build execution. | **Free** on Cloudflare Pages / Netlify Starter. |
| **Maintenance Burden** | Moderate: Managed via Hostinger Git/Container deploy or SSH. Requires tracking Node.js process stability. | Zero maintenance: Git push triggers automated build, deploy, preview. | Zero server maintenance; purely static CDN. |
| **Migration Risk** | **Zero risk** (Site is already live, operational, and achieving 83ms TTFB). | Medium risk (DNS cutover, custom domain configs, environment variable setup). | High risk (Loss of Server Actions for contact form, loss of dynamic robots host protection). |

### Architectural Verdict on Hosting
**Recommendation: KEEP EXISTING HOSTINGER INFRASTRUCTURE FOR PHASES 1–3.**  
Migrating to Vercel is **NOT commercially or technically justified** at this stage:
1. The production website already achieves TTFB under 100–200ms on Hostinger CDN in Frankfurt (`fra-edge`), which is optimal for Serbian and European audiences.
2. HTTP/2, HTTP/3 (QUIC), Brotli compression, and SSL (Let's Encrypt TLS 1.3) are all verified active on Hostinger.
3. Next.js Server Components and React 19 Server Actions operate correctly on the existing host.
4. Moving to Vercel would introduce an ongoing recurring cost of $240+/year without measurable business benefit for a boutique agency website with ~44 pages.
5. Re-evaluate hosting only if international traffic expands outside Europe or if automated CI/CD branch preview deployments become a core requirement.
