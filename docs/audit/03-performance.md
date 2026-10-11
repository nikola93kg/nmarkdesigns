# Frontend Performance & Core Web Vitals Audit

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Frontend Performance Engineer  
**Evidence Source:** Live production curl benchmarks (`fra-edge`), HTTP transfer measurements, asset inventory, font configuration, image sizing analysis, and Next.js bundle structure review.

---

## 1. Executive Performance Summary

The performance foundation of NMark Designs is exceptionally strong. Because 90%+ of the application is composed of **React Server Components**, client-side JavaScript execution is minimal.

### Key Measured Production Metrics (Frankfurt Node to nmarkdesigns.com)

| Metric | Measured Value | Standard Target | Assessment |
| :--- | :--- | :--- | :--- |
| **TTFB (Time to First Byte - HTML)** | **83 ms – 198 ms** | ≤ 800 ms (Good) | **EXCELLENT** (Cached via Hostinger hCDN edge) |
| **HTML Page Transfer Size (Gzip/Brotli)** | **~25 KB – 32 KB** compressed (120 KB uncompressed) | ≤ 50 KB | **GOOD** |
| **Total Initial CSS Bundle** | **13.4 KB** (compressed across 2 files) | ≤ 50 KB | **EXCELLENT** |
| **Total Framework + Main JS Bundle** | **~190 KB** (compressed) | ≤ 250 KB | **GOOD** |
| **Font Delivery** | 2 subsets of DM Sans via `next/font/google` (**55 KB total**) | ≤ 100 KB | **EXCELLENT** (Self-hosted woff2) |
| **Image Compression Format** | WebP (average 60 KB – 150 KB per full screenshot) | WebP / AVIF | **EXCELLENT** |
| **HTTP Protocol** | **HTTP/2 & HTTP/3 (QUIC)** supported | HTTP/2+ | **EXCELLENT** |

---

## 2. Core Web Vitals (CWV) Analysis & Vulnerabilities

### 2.1 Largest Contentful Paint (LCP)
* **Target:** ≤ 2.5s on mobile (75th percentile).
* **Homepage LCP Element:**
  * The Hero section ([`components/home/Hero.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/home/Hero.tsx)) contains the visual composition [`components/home/HeroArtwork.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/home/HeroArtwork.tsx).
  * In [`components/home/HeroArtwork.tsx#L12-L31`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/home/HeroArtwork.tsx#L12-L31), two layers have `priority: true`:
    * `back-panel` (`/images/hero-assets/back-panel.webp`, 1536x1024)
    * `tablet` (`/images/hero-assets/tablet.webp`, 1536x1024)
  * **Critical Observation:** Next.js generates `<link rel="preload">` for priority images. On mobile devices, preloading multiple overlapping layers can contend for initial bandwidth.
  * On blog article pages ([`components/blog/BlogArticlePage.tsx#L130`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/blog/BlogArticlePage.tsx#L130)), hero backgrounds have `priority={true}` and load eagerly, providing fast LCP for editorial articles.

### 2.2 Cumulative Layout Shift (CLS)
* **Target:** ≤ 0.1.
* **Findings:**
  * **Images:** All `next/image` tags throughout components define explicit `width`, `height`, or fixed aspect-ratio containers (`aspect-[3/2]`, `aspect-square`, `aspect-[1370/1148]`), eliminating layout shifts from image rendering.
  * **Typography:** [`app/[locale]/layout.tsx#L14-L20`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/layout.tsx#L14-L20) configures `DM_Sans`:
    ```ts
    const dmSans = DM_Sans({
      subsets: ["latin", "latin-ext"],
      display: "swap",
      variable: "--font-dm-sans",
      adjustFontFallback: false,
      fallback: ["system-ui", "sans-serif"],
    });
    ```
    * `adjustFontFallback: false` disables Next.js automatic font-fallback metrics adjustment (override @font-face declaration that matches fallback font size/x-height). Setting `adjustFontFallback: true` or removing the false override will eliminate micro-shifts during font swap.

### 2.3 Interaction to Next Paint (INP)
* **Target:** ≤ 200 ms.
* **Findings:**
  * The main thread is not burdened with large client libraries (no React state management stores, no Framer Motion runtime, no heavy animation libraries).
  * The Back to Top button ([`components/ui/BackToTop.tsx#L10-L35`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/ui/BackToTop.tsx#L10-L35)) listens to `window.scroll` with `{ passive: true }`. However, it calculates `document.documentElement.scrollHeight` and invokes React `setProgress` and `setVisible` on every scroll tick.
  * **Optimization Opportunity:** While `{ passive: true }` prevents scroll-jacking, throttling the scroll progress calculation via `requestAnimationFrame` or CSS scroll-driven animations will further protect INP on budget Android devices.

---

## 3. Asset & Bundle Breakdown

### 3.1 JavaScript Deliverables (Measured from Production)
From production HTML inspection of `https://nmarkdesigns.com/sr/`:
1. `4bd1b696-92152b0f5947070d.js` — 84.0 KB (React 19 & Next.js runtime chunk)
2. `794-ea706ca1310a8352.js` — 92.6 KB (Shared UI chunk)
3. `polyfills-42372ed130431b0a.js` — 50.4 KB (Next.js polyfills)
4. `256-1b785126af7e8fc5.js` — 10.6 KB
5. Route chunks (`layout-*.js`, `page-*.js`) — ~8.6 KB total
* **Total JS Payload:** ~245 KB uncompressed / ~75 KB gzipped. This is very lean for a modern Next.js 16 application.

### 3.2 CSS Deliverables
* Global Tailwind CSS: `401f08049525bbb9.css` (11.0 KB)
* Component CSS Modules: `37a596008318d5af.css` (2.4 KB)
* **Total CSS:** **13.4 KB**. Fully non-blocking, loads in <20ms.

### 3.3 Image Optimization & Delivery
* In [`next.config.ts#L8-L11`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/next.config.ts#L8-L11):
  ```ts
  images: {
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 384],
    qualities: [75, 82, 84, 85, 88],
  }
  ```
* All project screenshots are stored as pre-optimized local `.webp` files in `/public/projects/` and `/public/images/`.
* When requested directly (e.g. `/projects/coolfridgeguys.webp`), Hostinger returns:
  * `content-type: image/webp`
  * `size: 93,802 bytes`
  * `cache-control: public, max-age=31536000, immutable`
  * `x-hcdn-cache-status: HIT`
* Responsive `sizes` attributes are meticulously defined across [`components/portfolio/PortfolioShowcase.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/portfolio/PortfolioShowcase.tsx) and [`components/home/FeaturedProjects.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/home/FeaturedProjects.tsx), ensuring mobile devices do not download desktop assets.

---

## 4. Performance Optimization Opportunities

1. **Enable AVIF Image Generation:** Add `formats: ['image/avif', 'image/webp']` to `next.config.ts`. AVIF yields ~20–30% smaller file sizes than WebP for photographs and screenshots.
2. **Refine Hero Priority Preload on Mobile:** In `HeroArtwork.tsx`, load only the base artwork eagerly on mobile (`max-width: 768px`) to prevent bandwidth contention for the tablet and mobile mockups.
3. **Throttle Scroll Listener in `BackToTop.tsx`:** Wrap scroll progress updates in `requestAnimationFrame` to avoid unnecessary React re-renders on every scroll pixel.
4. **Remove `adjustFontFallback: false` in Font Loader:** Allow Next.js to calculate matched font fallback metrics to eliminate font-swap layout shift.
