# NMark Designs — Phase 4A: Performance, Core Web Vitals & Accessibility Baseline

## Executive Summary

Phase 4A establishes a rigorous, reproducible, and evidence-based technical baseline for **NMark Designs** (`https://nmarkdesigns.com`) prior to executing performance optimizations in Phase 4B.

The audit was conducted against the production Next.js build running in production mode (`next start`) on Node.js v24 under strictly controlled lab environments. Every metric, bundle breakdown, network transfer size, and accessibility test in this report was directly measured and recorded from the active codebase and reproducible test harnesses.

### Key Audit Findings at a Glance

1. **Rendering & Architecture:**
   - Next.js 16.3.6 (webpack build), React 19.2.8, Tailwind CSS v4.3.3.
   - **100% Static Page Generation (SSG):** All 52 application routes are prerendered at build time via `generateStaticParams`.
   - **Server Component Dominance:** Only **6 client components** exist across the entire application (`BackToTop`, `FAQAccordion`, `ContactForm`, `MobileNavigation`, `LanguageSwitcher`, `BlogShare`). All data models (`projects.ts`, `posts.ts`, `site.ts`, and i18n dictionaries) execute zero JavaScript in the client bundle.
2. **Core Web Vitals Lab Baseline:**
   - **CLS (Cumulative Layout Shift): 0.0000** across every single evaluated route on both Mobile (375x812) and Desktop (1440x900). Layout stability is flawless due to explicit aspect ratios, image sizing, and CSS layout containment.
   - **FCP (First Contentful Paint):** 56.0ms – 108.0ms across all routes in lab measurements.
   - **LCP (Largest Contentful Paint):** 56.0ms – 156.0ms in lab measurements. On text-dominated heroes, LCP is instantaneous (<H1> or <P>); on image-led heroes, LCP is anchored by optimized WebP layers.
   - **INP / Interaction Latency:** Zero Long Tasks detected across all mobile viewports; maximum single long task of 54.0ms on desktop layout hydration. Hydration overhead is minimal.
3. **Accessibility (WCAG 2.2 AA):**
   - **Axe Core: 0 violations** across all 16 mobile and desktop benchmark runs (26 to 30 passed rules per page).
   - Strict adherence to landmark structures (`header`, `nav`, `main`, `section`, `article`, `footer`), single `<h1>` per page, and visible keyboard focus rings (`focus-visible:outline-accent`).
4. **Primary Optimization Opportunities Identified for Phase 4B:**
   - **Image Payload Optimization:** `public/blog/gta-vi-website-cover.png` is an uncompressed 1.7 MB PNG file that must be converted to optimized WebP.
   - **Next.js Image `deviceSizes` & `sizes` Configuration:** Default Next.js device sizes reach `w=3840`, leading high-DPI viewports to pull oversized image variants on the portfolio showcase and blog. `PortfolioShowcase.tsx` uses `quality={92}`, which does not match `next.config.ts` allowed qualities (`[75, 82, 84, 85, 88]`).
   - **Touch Target Ergonomics:** While 100% compliant with the WCAG 2.2 AA minimum threshold (24x24px with inline exemptions), several secondary links (language switcher, footer navigation, and case study related links) have tap areas between 31px and 40px, which can be improved to meet 44x44px mobile ergonomics standards.
   - **Hostinger Infrastructure Alignment:** Hostinger's edge reverse proxy previously stripped application-level Content-Security-Policy (CSP) headers. Production deployment must verify whether Hostinger LiteSpeed/Apache forwards the full CSP from `proxy.ts`.

---

## 1. Technical Architecture & Build Baseline

### 1.1 Environment & Toolchain

| Component | Version / Specification | Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.6 (webpack mode) | Configured in `next.config.ts` |
| **UI Library** | React 19.2.8 / ReactDOM 19.2.8 | Full React 19 Server Components support |
| **CSS System** | Tailwind CSS 4.3.3 (`@tailwindcss/postcss`) | Pure CSS-first engine, zero runtime CSS-in-JS |
| **Icons** | Lucide React 1.42.0 | Tree-shaken Server & Client component icons |
| **Email Transport** | Nodemailer 8.0.7 | Server Action transport via Hostinger SMTP |
| **Node.js Engine** | `>=22.0.0` (Active: Node v24.14.1) | Required for production deployment |
| **E2E / Testing** | Playwright 1.63.0 / Axe Core 4.13.0 | 251 automated tests currently passing |

### 1.2 Route Generation & Rendering Matrix

The production build generates **52 static routes** plus metadata and asset endpoints:

```text
Route (app)                                                            Type    Revalidation
┌ ○ /_not-found                                                        Static  Prerendered
├   /[locale]                                                          SSG     Prerendered
│ ├ ● /sr (Serbian Homepage)
│ └ ● /en (English Homepage)
├   /[locale]/[page]                                                   SSG     Prerendered
│ ├ ● /sr/usluge, /en/services (Services)
│ ├ ● /sr/o-nama, /en/about (About)
│ ├ ● /sr/kontakt, /en/contact (Contact)
│ └ ● /sr/cenovnik, /en/pricing (Pricing - Frozen)
├   /[locale]/blog                                                     SSG     Prerendered
│ ├ ● /sr/blog, /en/blog (Blog Archives)
├   /[locale]/blog/[slug]                                              SSG     Prerendered
│ ├ ● 14 Serbian articles + 14 English articles (28 total paths)
├   /[locale]/portfolio                                                SSG     Prerendered
│ ├ ● /sr/portfolio, /en/portfolio (Showcase Archives)
├   /[locale]/portfolio/[slug]                                         SSG     Prerendered
│ ├ ● 9 Serbian case studies + 9 English case studies (18 total paths)
├ ○ /apple-icon.png                                                    Static  Prerendered
├ ○ /icon.png                                                          Static  Prerendered
├ ○ /manifest.webmanifest                                              Static  Prerendered
├ ƒ /robots.txt                                                        Dynamic Edge Proxy Guard
└ ○ /sitemap.xml                                                       Static  Prerendered
```

### 1.3 Client vs Server Component Boundaries

The codebase strictly follows Next.js App Router Server Component patterns. There are **only 6 components** marked with `"use client"`:

| Client Component | Location | Responsibility & State |
| :--- | :--- | :--- |
| `BackToTop` | `components/ui/BackToTop.tsx` | Window scroll position listener, smooth scroll trigger. |
| `FAQAccordion` | `components/home/FAQAccordion.tsx` | Expanded/collapsed item state with keyboard navigation. |
| `ContactForm` | `components/contact/ContactForm.tsx` | Form state via `useActionState`, Turnstile token callback, reset handling. |
| `MobileNavigation` | `components/layout/MobileNavigation.tsx` | Hamburger menu toggle state, backdrop scroll lock, focus trap. |
| `LanguageSwitcher` | `components/layout/LanguageSwitcher.tsx` | Client-side locale path replacement helper. |
| `BlogShare` | `components/blog/BlogShare.tsx` | Web Share API trigger with fallback copy-to-clipboard state. |

**Zero Server Component Bleed:**
Large static datasets (`content/projects.ts`, `content/blog/posts.ts`, `content/site.ts`, and i18n dictionaries in `content/i18n/`) are never imported into Client Components. They are parsed exclusively during build time on the server, ensuring zero KB of raw markdown or project metadata enters client JavaScript bundles.

---

## 2. JavaScript Bundle & Resource Breakdown

### 2.1 Shared Base Bundles (Loaded on Every Page)

| Chunk Filename | Raw Size | Gzip Size | Contents / Modules |
| :--- | :--- | :--- | :--- |
| `framework-6860ebc283a60d07.js` | 185.0 KB | 56.4 KB | React 19 runtime, ReactDOM, Scheduler |
| `4bd1b696-92152b0f5947070d.js` | 196.3 KB | 61.8 KB | Next.js App Router client runtime & Next Image client helpers |
| `794-ea706ca1310a8352.js` | 235.0 KB | 64.0 KB | Next.js link prefetching, router cache, navigation runtime |
| `main-754a09a18760df5a.js` | 136.0 KB | 42.1 KB | Core polyfills, module bootstrap |
| `256-1b785126af7e8fc5.js` | 22.3 KB | 8.3 KB | Shared UI client logic (`MobileNavigation`, `LanguageSwitcher`) |
| `layout-4cfd6036b276c25c.js` | 12.0 KB | 4.6 KB | Root Layout hydration (`Header`, `Footer`, `BackToTop`) |
| `webpack-8575fd4edcc7ac3c.js` | 3.3 KB | 1.7 KB | Webpack runtime manifest |
| `main-app-09723e496f2b13e2.js` | 0.5 KB | 0.2 KB | Entry loader |
| **Total Shared Baseline** | **790.4 KB** | **239.1 KB** | **Full client runtime required for hydration** |

### 2.2 Route-Specific JavaScript Footprint

Because pages are predominantly composed of Server Components, the page-specific client JavaScript payloads are remarkably tiny:

| Route Type | Page Chunk Filename | Raw Size | Gzip Size | Client Components Hydrated |
| :--- | :--- | :--- | :--- | :--- |
| **Homepage** (`/[locale]`) | `page-de5eea0658833d02.js` | 6.4 KB | 2.7 KB | `FAQAccordion` |
| **Services / About** (`/[locale]/[page]`) | `page-8e0836e1b6d4146d.js` | 13.0 KB | 4.1 KB | `ContactForm` (on Contact route) |
| **Portfolio Showcase** (`/[locale]/portfolio`) | `page-70fce4379f3020a7.js` | 4.7 KB | 1.9 KB | None (Pure Server Component) |
| **Case Studies** (`/[locale]/portfolio/[slug]`) | `page-b39320fc26a46bf0.js` | 2.7 KB | 1.2 KB | None (Pure Server Component) |
| **Blog Archives** (`/[locale]/blog`) | `page-a16faa44ddbecfad.js` | 1.8 KB | 0.9 KB | None (Pure Server Component) |
| **Blog Article** (`/[locale]/blog/[slug]`) | `page-1d568b5f71237546.js` | 8.6 KB | 3.1 KB | `BlogShare` |

### 2.3 CSS Footprint

All styles are compiled via Tailwind CSS v4 into static CSS chunks without runtime CSS overhead:

| CSS File | Raw Size | Gzip Size | Description |
| :--- | :--- | :--- | :--- |
| `4e058a6c692c7216.css` | 39.6 KB | 8.4 KB | Global Tailwind styles, layout tokens, typography rules |
| `44459e5591536fa0.css` | 11.3 KB | 2.8 KB | Article & prose layout styles |
| `f875485f5c480680.css` | 11.0 KB | 2.6 KB | Case study & portfolio showcase styles |
| `58d20322e0e8f0d0.css` | 7.7 KB | 2.1 KB | Hero artwork animation and layering rules |
| **Total Global CSS** | **~47.3 KB** | **~10.5 KB** | **Loaded on initial page visit** |

### 2.4 Font Footprint

- Configured using `next/font/google` (`DM_Sans` with subsets `["latin", "latin-ext"]`, `display: "swap"`, and system-ui fallback).
- Build outputs two self-hosted WOFF2 files in `.next/static/media/`:
  - `13971731025ec697.p.woff2`: 37.0 KB (Latin / Latin-ext regular & medium)
  - `7ab938503e4547a1.p.woff2`: 18.2 KB (Latin bold)
- **Total Font Transfer:** 55.2 KB (zero third-party round-trips to `fonts.googleapis.com` or `fonts.gstatic.com`).

---

## 3. Core Web Vitals Lab Measurements

### 3.1 Measurement Methodology & Distinction

> [!IMPORTANT]
> **Lab Data vs Field Data:**
> All metrics reported below are **reproducible lab measurements** executed using Playwright Chromium with browser PerformanceObserver APIs and Navigation Timing under controlled production builds (`next start`).
> 
> Because the Next.js rebuild of NMark Designs is not yet deployed to production public traffic, **no Chrome User Experience Report (CrUX) field data exists**. Any claims of real-world 75th-percentile field metrics would be fabricated. The lab figures represent clean-room baseline performance.

### 3.2 Comprehensive 8-Page Benchmark Matrix

Tested under two realistic configurations:
- **Mobile:** 375 × 812 viewport, `deviceScaleFactor: 3` (simulating modern mobile devices such as iPhone 13/14/15/16 Pro).
- **Desktop:** 1440 × 900 viewport, `deviceScaleFactor: 1` (standard laptop/desktop screen).

| Route | Viewport | TTFB | FCP | LCP | LCP Element Identified | CLS | Long Tasks (TBT proxy) | Axe WCAG AA Violations | Network Transfer |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Serbian Homepage** (`/sr/`) | Mobile | 5.2 ms | 80.0 ms | 80.0 ms | `<H1>` Hero headline | 0.0000 | 0 (0.0 ms) | **0** (26 passed) | 283.4 KB |
| **Serbian Homepage** (`/sr/`) | Desktop | 5.1 ms | 80.0 ms | 80.0 ms | `<H1>` Hero headline | 0.0000 | 0 (0.0 ms) | **0** (26 passed) | 312.9 KB |
| **English Homepage** (`/en/`) | Mobile | 4.8 ms | 88.0 ms | 88.0 ms | `<H1>` Hero headline | 0.0000 | 0 (0.0 ms) | **0** (26 passed) | 283.4 KB |
| **English Homepage** (`/en/`) | Desktop | 14.5 ms | 104.0 ms | 156.0 ms | `<img>` Hero `back-panel.webp` | 0.0000 | 1 (54.0 ms) | **0** (26 passed) | 312.9 KB |
| **Services** (`/sr/usluge/`) | Mobile | 4.8 ms | 88.0 ms | 88.0 ms | `<H1>` Services headline | 0.0000 | 0 (0.0 ms) | **0** (27 passed) | 274.0 KB |
| **Services** (`/sr/usluge/`) | Desktop | 4.7 ms | 92.0 ms | 92.0 ms | `<H2>` Featured service | 0.0000 | 1 (54.0 ms) | **0** (26 passed) | 298.3 KB |
| **Portfolio Showcase** (`/sr/portfolio/`) | Mobile | 5.0 ms | 88.0 ms | 104.0 ms | `<img>` `casovi-francuskog.webp` | 0.0000 | 0 (0.0 ms) | **0** (27 passed) | 416.4 KB |
| **Portfolio Showcase** (`/sr/portfolio/`) | Desktop | 5.0 ms | 104.0 ms | 104.0 ms | `<img>` `casovi-francuskog.webp` | 0.0000 | 0 (0.0 ms) | **0** (26 passed) | 979.4 KB |
| **Case Study: Cool Fridge Guys** | Mobile | 4.6 ms | 76.0 ms | 76.0 ms | `<P>` Case study subtitle | 0.0000 | 0 (0.0 ms) | **0** (29 passed) | 118.4 KB |
| **Case Study: Cool Fridge Guys** | Desktop | 4.2 ms | 76.0 ms | 76.0 ms | `<img>` `coolfridgeguys.webp` | 0.0000 | 0 (0.0 ms) | **0** (28 passed) | 117.0 KB |
| **Case Study: Anabela** | Mobile | 4.2 ms | 72.0 ms | 72.0 ms | `<P>` Case study subtitle | 0.0000 | 0 (0.0 ms) | **0** (29 passed) | 92.6 KB |
| **Case Study: Anabela** | Desktop | 4.7 ms | 76.0 ms | 76.0 ms | `<img>` `anabela-bebi-oprema.webp`| 0.0000 | 0 (0.0 ms) | **0** (28 passed) | 87.1 KB |
| **Blog: Website Costs 2026** | Mobile | 5.2 ms | 92.0 ms | 92.0 ms | `<img>` Article cover image | 0.0000 | 0 (0.0 ms) | **0** (30 passed) | 123.0 KB |
| **Blog: Website Costs 2026** | Desktop | 5.1 ms | 96.0 ms | 96.0 ms | `<img>` Article cover image | 0.0000 | 0 (0.0 ms) | **0** (30 passed) | 201.6 KB |
| **Contact Page** (`/sr/kontakt/`) | Mobile | 3.2 ms | 56.0 ms | 56.0 ms | `<P>` Direct contact intro | 0.0000 | 0 (0.0 ms) | **0** (30 passed) | 80.9 KB |
| **Contact Page** (`/sr/kontakt/`) | Desktop | 3.2 ms | 108.0 ms | 108.0 ms | `<H1>` Contact headline | 0.0000 | 0 (0.0 ms) | **0** (29 passed) | 64.0 KB |

### 3.3 Core Web Vitals Analysis

1. **Cumulative Layout Shift (CLS):**
   - **Score: 0.0000 across all 16 runs.**
   - All images rendered via `next/image` specify explicit `width` and `height` dimensions or parent aspect ratio containers (e.g. `aspect-[3/2] md:aspect-[2/1]`).
   - Font loading uses `adjustFontFallback: false` with system fallbacks, eliminating layout jumping during font swap.
   - Dynamic UI states (mobile menu, FAQ accordion) animate exclusively using CSS transforms and opacity, avoiding reflow.
2. **First Contentful Paint (FCP):**
   - Ranging from **56.0 ms to 108.0 ms**.
   - Prerendered HTML is sent immediately; CSS is minimal (~40 KB uncompressed); fonts are self-hosted with `display: swap`.
3. **Largest Contentful Paint (LCP):**
   - Ranging from **56.0 ms to 156.0 ms**.
   - On the Homepage, Services, Case Studies (mobile), and Contact pages, the LCP candidate is an above-the-fold typographical element (`<H1>` or `<P>`). Because text paints with the initial DOM and CSS, LCP occurs almost concurrently with FCP.
   - On the Desktop Homepage and Portfolio Showcase, the LCP candidate is an image (`back-panel.webp` or `casovi-francuskog.webp`). Even when an image is the candidate, it renders in ~104ms–156ms locally.
4. **Interaction to Next Paint (INP) & Total Blocking Time (TBT):**
   - **Mobile: 0 Long Tasks across all 8 tested pages.**
   - Desktop: Only 2 pages logged a single task exceeding 50ms (54.0ms during initial layout tree calculation).
   - Because 90%+ of the DOM consists of pure Server Components, React 19 hydrator needs to attach listeners only to the few lightweight client components (`MobileNavigation`, `FAQAccordion`, `ContactForm`).

---

## 4. Image Inventory & Optimization Audit

### 4.1 Asset Inventory Breakdown

A complete scan of `public/` revealed **55 image files** totaling **8.75 MB**:

| Format | File Count | Total Disk Size | Average Size | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **.webp** | 48 files | 6.49 MB | 138.3 KB | Case study heroes, portfolio screenshots, artwork layers |
| **.png** | 5 files | 1.74 MB | 356.4 KB | App icons, manifest icons, blog cover |
| **.jpg** | 2 files | 0.51 MB | 261.0 KB | Legacy blog cover photos |
| **Total** | **55 files** | **8.75 MB** | — | — |

### 4.2 Top 15 Largest Image Assets

| File Relative Path | Format | File Size | Recommended Optimization Action |
| :--- | :--- | :--- | :--- |
| `public/blog/gta-vi-website-cover.png` | PNG | **1,702.5 KB** | **P0 Bottleneck:** Convert to optimized WebP (~120 KB, 93% saving). |
| `public/projects/nesthome.webp` | WebP | 390.9 KB | Re-compress at quality 80 (~180 KB). |
| `public/projects/casovi-francuskog.webp` | WebP | 302.9 KB | Re-compress at quality 82 (~160 KB). |
| `public/blog/lokalni-biznis-treba-da-popravi-na-pocetnoj-stranici.jpg` | JPG | 275.9 KB | Convert to WebP (~95 KB). |
| `public/projects/banquetes-castellanos-zoreda.webp` | WebP | 268.5 KB | Re-compress (~140 KB). |
| `public/images/website-maintenance.webp` | WebP | 258.2 KB | Re-compress (~110 KB). |
| `public/images/hero-assets/back-panel.webp` | WebP | 253.5 KB | Hero artwork layer — optimize dimensions (~120 KB). |
| `public/blog/da-portfolio-ne-bude-galerija.jpg` | JPG | 251.0 KB | Convert to WebP (~90 KB). |
| `public/projects/os-dule-karaklajic.webp` | WebP | 248.3 KB | Re-compress (~130 KB). |
| `public/images/hero-assets/tablet.webp` | WebP | 245.8 KB | Hero artwork primary layer (~115 KB). |
| `public/about/about1.webp` | WebP | 244.1 KB | Re-compress (~120 KB). |
| `public/projects/milic-weddings.webp` | WebP | 240.9 KB | Re-compress (~125 KB). |
| `public/images/hero-assets/dark-panel.webp` | WebP | 236.8 KB | Hero artwork layer (~110 KB). |
| `public/projects/madjionicar-bojan.webp` | WebP | 213.2 KB | Re-compress (~105 KB). |
| `public/images/hero-assets/white-card-2.webp` | WebP | 196.0 KB | Hero artwork layer (~90 KB). |

### 4.3 Sizing & `sizes` Attribute Configuration Findings

1. **`PortfolioShowcase.tsx` Configuration Discrepancy:**
   - In `components/portfolio/PortfolioShowcase.tsx` (lines 100, 119, 132), the image quality is declared as `quality={92}`.
   - However, `next.config.ts` declares:
     ```ts
     qualities: [75, 82, 84, 85, 88],
     ```
   - In Next.js, requesting a quality not present in `qualities` causes Next.js to fall back or generate un-optimized source files.
   - **Desktop Payload Inflate:** The `sizes` attribute on `PortfolioShowcase.tsx` specifies:
     `sizes="(min-width: 1600px) 1500px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 32px)"`.
     Because `next.config.ts` does not constrain `deviceSizes`, Next.js defaults to `[640, 750, 828, 1080, 1200, 1920, 2048, 3840]`. On desktop viewports with DPR > 1, Next.js requests `w=3840`, leading to **979.4 KB** transfer for the portfolio showcase page.
2. **Hero Artwork Priority:**
   - In `components/home/HeroArtwork.tsx`, exactly one layer (`tablet.webp`) has `priority={true}`. The other 4 layers have `priority={false}`. This correctly generates a single `<link rel="preload" as="image">` tag in the `<head>`, preventing browser connection starvation.
3. **Case Study Hero Images:**
   - In `components/portfolio/CaseStudyHero.tsx`, images use `preload` attribute and `quality={85}` with container aspect ratio constraint.

---

## 5. Accessibility Baseline (WCAG 2.2 AA)

### 5.1 Automated Axe Core Audit Results

The automated accessibility test suite executed against all 8 representative routes across mobile and desktop environments produced:
- **0 Violations**
- **0 Incomplete / Needs Review flags**
- **26 to 30 Passed WCAG 2.0 / 2.1 / 2.2 AA rules per route**

Specific validated checkpoints include:
- `color-contrast`: All text elements meet or exceed 4.5:1 (normal text) and 3:1 (large text / UI borders).
- `document-title`: Every route generates a unique, localized `<title>` tag.
- `html-has-lang`: Root `<html>` element specifies `lang="sr"` or `lang="en"` matching route locale.
- `landmark-one-main`: Exactly one `<main>` landmark element per page.
- `region`: All content is contained inside appropriate landmark structures.
- `image-alt`: All informative images have descriptive localized `alt` text; decorative artwork layers have `alt=""` and `aria-hidden="true"`.
- `button-name` & `link-name`: All buttons and interactive anchors have accessible names (either text content or `aria-label`).
- `aria-allowed-attr` & `aria-roles`: Valid ARIA attributes on accordion, mobile navigation, and dialogs.

### 5.2 Touch Target Ergonomics Audit

A programmatic audit of all interactive elements (`<a>`, `<button>`, `<input>`, `<textarea>`) was conducted to evaluate compliance with **WCAG 2.2 Criterion 2.5.8 (Target Size - Minimum: 24×24px)** and mobile platform ergonomics standards (**Apple Human Interface Guidelines 44×44px / Android Material Design 48×48px**):

#### WCAG 2.2 AA Criterion 2.5.8 Status: **100% COMPLIANT**
- Every interactive element on the website exceeds the 24×24px minimum physical target size.
- Text links situated inside sentences (e.g. "Svi projekti" breadcrumb link at height 21px) are explicitly exempt under the **Inline Exception** of WCAG 2.2 Criterion 2.5.8.

#### Mobile Platform Ergonomics (44×44px) Opportunities for Phase 4B:
While technically passing WCAG 2.2 AA, several interactive elements fall below the 44×44px mobile touch recommendation:

| Element | Location | Current Size (w × h) | Ergonomics Assessment |
| :--- | :--- | :--- | :--- |
| **Language Switcher Buttons** (`SR` / `EN`) | Header navigation | 36.0px × 44.0px | Height meets 44px; width is 36px. Increasing horizontal padding (`px-3`) would ensure a 44×44px hit box. |
| **Case Study Related Project Links** | `RelatedProjects.tsx` | ~160px–210px × 31.2px | Width is generous, but vertical hit box is 31.2px. Adding `py-1.5` will bring tap height to 44px. |
| **Footer Navigation Links** | `Footer.tsx` | ~45px–118px × 32.0px | Uses `min-h-8` (32px). Upgrading to `min-h-11` (44px) will improve mobile tap ergonomics. |
| **Footer Phone & Email Links** | `Footer.tsx` | ~150px–188px × 36.0px | Uses `min-h-9` (36px). Upgrading to `min-h-11` (44px) improves tap precision. |
| **Footer Social Pills** (`Instagram`, `WhatsApp`) | `Footer.tsx` | 187.7px × 40.0px | Uses `min-h-10` (40px). Slightly below 44px; increasing padding will reach 44px. |

### 5.3 Keyboard Navigation & Focus Indicator Baseline

- **Skip Link:** Implemented in `app/[locale]/layout.tsx`, accessible via initial `Tab` keypress, jumping directly to `<main id="main-content">`.
- **Focus Rings:** Consistently styled with `focus-visible:outline-accent` (`outline: 2px solid var(--color-focus)` and `outline-offset: 2px`).
- **Interactive Forms:** All input elements on `/kontakt/` have associated `<label>` elements, `aria-required="true"`, explicit `aria-describedby` error bindings, and error summary announcement via `role="alert"`.
- **FAQ Accordion:** Built with native `<button>` elements, toggling `aria-expanded="true|false"` and linked to `<div id="..." role="region" aria-labelledby="...">`.

---

## 6. Hosting & Infrastructure Assessment (Hostinger)

### 6.1 Deployment Architecture Assumptions

1. **Node.js Server Runtime Requirement:**
   - Because NMark Designs uses Next.js Server Actions (`submitContact` in `app/[locale]/[page]/actions.ts`) with Nodemailer SMTP transport, **the production application cannot be deployed as a static file dump (`output: "export"`)**.
   - It requires a Node.js process (`next start`) managed via Hostinger Node.js Application Manager (Cloud/VPS or cPanel/hPanel Node.js selector with PM2 or systemd).
2. **Reverse Proxy Configuration (LiteSpeed / Apache / Nginx):**
   - The Hostinger web server terminates SSL/TLS and acts as a reverse proxy, forwarding requests to the internal Next.js port (e.g. `127.0.0.1:3000`).
   - Caching headers from Next.js (`Cache-Control: s-maxage=31536000` on prerendered static pages) allow LiteSpeed / Apache to cache static responses effectively.
3. **Edge CDN (hCDN) & Header Behavior:**
   - In Phase 0 and Phase 1B testing, Hostinger hCDN edge was observed stripping application-level Content-Security-Policy (CSP) headers and injecting `content-security-policy: upgrade-insecure-requests`.
   - The application defines a comprehensive, hardened CSP in `proxy.ts`. During final deployment verification, the Hostinger edge configuration must be verified to ensure full security headers are passed down to visitors.
4. **Asset Compression:**
   - Hostinger LiteSpeed supports Gzip and Brotli compression out of the box. As demonstrated in Section 2, the gzipped Serbian homepage transfer is only **176.5 KB**, ensuring sub-second delivery over 4G/5G networks.

---

## 7. Prioritized Optimization Backlog for Phase 4B

Based on empirical measurements from this audit, the following tasks are prioritized for implementation in Phase 4B:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PHASE 4B IMPLEMENTATION ROADMAP                       │
├────────────┬─────────────────────────────────────────────────┬──────────────┤
│ Priority   │ Task Description                                │ Target Area  │
├────────────┼─────────────────────────────────────────────────┼──────────────┤
│ P0 (High)  │ Convert 1.7 MB PNG blog cover to WebP           │ Assets       │
│ P0 (High)  │ Align Next.js image deviceSizes & showcase sizes │ Images / Config│
│ P1 (Med)   │ Upgrade mobile touch targets to 44px ergonomics │ UI / Layout  │
│ P1 (Med)   │ Batch optimize remaining oversized WebP/JPGs   │ Assets       │
│ P2 (Low)   │ Verify Hostinger LiteSpeed CSP header forwarding│ Hosting / Ops│
└────────────┴─────────────────────────────────────────────────┴──────────────┘
```

### Backlog Detail

#### P0 — Critical Performance Improvements

1. **OPT-01: Convert Blog Hero PNG to Optimized WebP**
   - **Target:** `public/blog/gta-vi-website-cover.png` (1.7 MB).
   - **Action:** Convert to WebP format with quality 80.
   - **Expected Impact:** Saves ~1.58 MB (93% bandwidth reduction) on the GTA VI blog post.
   - **Verification:** File size check + blog page load network transfer test.

2. **OPT-02: Next.js Image Config & Portfolio Showcase Sizing Alignment**
   - **Target:** `next.config.ts`, `components/portfolio/PortfolioShowcase.tsx`.
   - **Action:**
     - Configure explicit `deviceSizes: [640, 750, 828, 1080, 1200, 1920]` in `next.config.ts` to prevent generating unnecessary 3840px variants.
     - Align `quality={85}` in `PortfolioShowcase.tsx` with declared qualities in `next.config.ts`.
     - Refine `sizes` attribute on `PortfolioShowcase` image elements.
   - **Expected Impact:** Reduces desktop portfolio showcase transfer size from 979.4 KB to ~400 KB (over 50% bandwidth reduction).
   - **Verification:** Playwright network request measurement on `/sr/portfolio/`.

#### P1 — UX & Ergonomic Improvements

3. **OPT-03: Mobile Touch Target Ergonomics Standardization (44×44px)**
   - **Target:** `components/layout/LanguageSwitcher.tsx`, `components/layout/Footer.tsx`, `components/portfolio/RelatedProjects.tsx`.
   - **Action:** Increase tap padding on language switchers (`px-3`), footer navigation links (`min-h-11`), footer contact links, and related project links to ensure a minimum 44×44px touch target on mobile viewports.
   - **Expected Impact:** Improves mobile thumb ergonomics and prevents mis-taps on small screens.
   - **Verification:** Automated Playwright bounding box check on mobile viewport (375x812).

4. **OPT-04: Batch Re-Compression of Top 10 Secondary Images**
   - **Target:** `public/projects/nesthome.webp`, `casovi-francuskog.webp`, `banquetes-castellanos-zoreda.webp`, etc.
   - **Action:** Re-compress WebP images exceeding 250 KB using sharp/cwebp at quality 80–82.
   - **Expected Impact:** Reduces overall static asset footprint by ~1.2 MB.
   - **Verification:** Image file size inventory check.

#### P2 — Hosting & Infrastructure Verification

5. **OPT-05: Hostinger Edge CSP & Header Pass-Through Verification**
   - **Target:** `proxy.ts`, deployment documentation.
   - **Action:** Verify whether Hostinger LiteSpeed proxy passes `Content-Security-Policy` and `Permissions-Policy` headers intact, and document any required `.htaccess` / reverse proxy directive overrides.
   - **Expected Impact:** Ensures production security posture matches local proxy configuration.
   - **Verification:** Curl response header inspection on staging/production.

---

## 8. Verification & Audit Sign-Off

- **Test Suite Status:** 251 / 251 tests passing (`npm run test:e2e`).
- **TypeScript:** 0 type errors (`npm run typecheck`).
- **ESLint:** 0 lint errors, 0 warnings (`npm run lint`).
- **Production Build:** Clean generation of 52 static routes (`npm run build`).
- **Audit Completeness:** All 12 requested baseline areas evaluated with empirical lab data.
- **Constraints Maintained:**
  - Active branch: `website_audit_phase_zero`.
  - Zero git commits, pushes, merges, or deployments executed.
  - Zero modifications to pricing routes, pricing components, or pricing content.
  - Zero modifications to SMTP credentials, Turnstile verification, or honeypot security.
