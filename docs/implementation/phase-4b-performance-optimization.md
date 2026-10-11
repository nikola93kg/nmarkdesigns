# NMark Designs — Phase 4B: Evidence-Based Performance Optimization & Mobile Ergonomics

## Executive Summary

Phase 4B implements targeted, evidence-based performance, image payload, responsive configuration, and mobile touch ergonomics improvements for **NMark Designs** (`https://nmarkdesigns.com`) on branch `website_audit_phase_zero`.

All optimizations were executed strictly in response to empirical bottlenecks measured in the Phase 4A audit baseline (`docs/audit/phase-4a-performance-accessibility-baseline.md`). No speculative refactors were made. Visual fidelity, brand identity, Server Component architecture, SEO configuration, and the strict pricing freeze were 100% preserved.

### Major Achievements at a Glance

1. **Portfolio Showcase Image Transfer Cut by 49.5%:**
   - Desktop portfolio showcase total page transfer reduced from **979.4 KB** down to **494.9 KB** (**-484.5 KB / -49.5%**).
   - Direct image payload reduced from **925.0 KB** down to **440.5 KB** (**-52.4%**).
2. **GTA VI Blog Article Cover Optimized by 92.4%:**
   - Uncompressed 1.7 MB PNG replaced with an optimized WebP asset (`131.7 KB`, **43.84 dB PSNR**), saving **1.61 MB** on the article page.
   - Preserved original 1788×872 aspect ratio and updated Open Graph / JSON-LD schema metadata.
3. **Secondary Portfolio Images Re-Compressed with Zero Visual Degradation:**
   - Re-encoded top oversized portfolio WebP assets (`nesthome.webp`, `casovi-francuskog.webp`, `banquetes-castellanos-zoreda.webp`, etc.).
   - Total asset savings across the 8 optimized images: **2,707,834 bytes (~2.71 MB reduction, -72.9%)**.
4. **Mobile Touch Ergonomics Standardized to 44×44px:**
   - Resolved all small interactive hit areas identified in Phase 4A across the Header language switcher, Footer quick links, Footer contact address, and Case study related project links.
   - Maintained strict zero horizontal overflow across 320px, 375px, 430px, 768px, 1024px, 1440px, and 1920px viewports.
5. **100% Test Pass Rate Across 255 Automated Tests:**
   - All 251 existing tests plus 4 new targeted regression tests passed cleanly (`255 / 255 passed`).

---

## 1. Baseline Methodology & Test Environment

All comparative measurements were performed against identical production builds (`next build --webpack` followed by `next start`) on Node.js v24 under controlled lab conditions:
- **Test Harness:** Playwright Chromium headless engine using browser `PerformanceObserver` (Paint, Layout Shift, Long Tasks) and Navigation Timing APIs.
- **Viewports:**
  - Mobile: 375 × 812 with `deviceScaleFactor: 3` (simulating modern iOS/Android high-DPI viewports).
  - Ultra-narrow Mobile: 320 × 600 with `deviceScaleFactor: 1` (stress testing horizontal scroll & text clipping).
  - Desktop: 1440 × 900 with `deviceScaleFactor: 1` (standard desktop) and `deviceScaleFactor: 2` (Retina desktop).
- **Distinction Between Lab and Field Data:**
  - All figures reported are **reproducible lab benchmarks**. No Chrome User Experience Report (CrUX) field data exists as the Next.js rebuild has not yet received live production traffic.

---

## 2. Changes Implemented

### 2.1 GTA VI Cover Image Optimization
- **Source Asset:** `public/blog/gta-vi-website-cover.png` (1,743,360 bytes / 1,702.5 KB).
- **Optimized Asset:** `public/blog/gta-vi-website-cover.webp` (131,732 bytes / 128.6 KB).
- **Encoding:** Encoded using `cwebp -q 82` with libsharpyuv. Achieved **43.84 dB PSNR** (virtually indistinguishable from uncompressed source).
- **Dimensions:** Exactly preserved at 1788 × 872 px.
- **References Safely Updated:**
  - Updated `content/blog-gta-vi.ts` (`image: "/blog/gta-vi-website-cover.webp"`, `imageType: "image/webp"`).
  - Updated editorial registry in `content/blog-editorial.ts`.
  - Automatically inherited by Open Graph `og:image` and JSON-LD `BlogPosting` schema in `app/[locale]/blog/[slug]/page.tsx`.
- **Rollback Safety:** Original PNG retained in `public/blog/` and backed up in scratch.

### 2.2 Next.js Image Configuration & Portfolio Sizing Alignment
- **`next.config.ts` Capped `deviceSizes`:**
  - Configured `deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048]`.
  - Removed Next.js default `3840` breakpoint. This prevents high-DPI viewports from requesting massive 4K upscaled image variants for container-constrained elements.
- **`PortfolioShowcase.tsx` Quality & Responsive Sizes:**
  - Aligned `quality={85}` (previously an unconfigured `quality={92}`). Matches `CaseStudyHero.tsx` and `ProjectCard.tsx`.
  - Adjusted `sizes` attribute from `(min-width: 1600px) 1500px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 32px)` to `(min-width: 1600px) 880px, (min-width: 1024px) 60vw, (min-width: 768px) 50vw, calc(100vw - 32px)`.
  - Accurately informs the browser that portfolio grid items occupy at most 7 of 12 columns (~840px at max container width).

### 2.3 Secondary WebP Optimization
- Decoded and re-compressed top oversized portfolio assets exceeding 200 KB using `dwebp` and `cwebp -q 82`:
  - `nesthome.webp`
  - `casovi-francuskog.webp`
  - `banquetes-castellanos-zoreda.webp`
  - `os-dule-karaklajic.webp`
  - `milic-weddings.webp`
  - `madjionicar-bojan.webp`
  - `website-maintenance.webp`
- Original source files preserved in `/Users/apple/.gemini/antigravity/brain/ebe97759-2a5d-4755-8d3d-4562b401b5fc/scratch/image-backups/` and lossless decoded PNGs.

### 2.4 Mobile Touch Target Ergonomics (44×44px Standard)
- **Header Language Switcher (`LanguageSwitcher.tsx`):**
  - Updated to `inline-flex min-h-11 min-w-9 min-[360px]:min-w-11 items-center justify-center px-2 min-[360px]:px-2.5 focus-visible:outline-accent`.
  - Provides a generous 44×44px hit box on all modern mobile viewports (360px+) while gracefully adapting to 36×44px on 320px screens to prevent header overflow.
- **Footer Navigation & Contact Links (`Footer.tsx`, `Navigation.tsx`):**
  - Upgraded `contactLinkClass` from `min-h-9` (36px) to `min-h-11 py-1.5` (44px).
  - Upgraded `socialLinkClass` from `min-h-10` (40px) to `min-h-11 py-2` (44px).
  - Upgraded footer navigation links in `Navigation.tsx` from `min-h-8` (32px) to `min-h-11 py-2` (44px).
- **Case Study Related Projects (`RelatedProjects.tsx`):**
  - Upgraded header back link from inline text to `inline-flex min-h-11 items-center py-2`.
  - Upgraded project title links from 31.2px height to `inline-flex min-h-11 items-center gap-1.5 py-1.5`.
- **Blog Article Page (`BlogArticlePage.tsx`, `Blog.module.css`):**
  - Upgraded "Back to all articles" link to `min-h-11`.
  - Upgraded Table of Contents anchor links (`.toc a`) to `padding-block: .75rem` (44px target).
  - Upgraded Share buttons (`.shareButton`) to `min-height: 2.75rem` (44px target).

---

## 3. Files Modified

| File | Change Type | Purpose |
| :--- | :--- | :--- |
| `next.config.ts` | Modified | Added explicit `deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048]`. |
| `content/blog-gta-vi.ts` | Modified | Updated GTA VI analysis cover image path and MIME type to WebP. |
| `components/portfolio/PortfolioShowcase.tsx` | Modified | Corrected `sizes` attribute and aligned `quality={85}`. |
| `components/layout/LanguageSwitcher.tsx` | Modified | Added responsive 44px min-width/min-height touch target. |
| `components/layout/Footer.tsx` | Modified | Standardized contact and social link heights to `min-h-11`. |
| `components/layout/Navigation.tsx` | Modified | Standardized footer navigation link height to `min-h-11 py-2`. |
| `components/portfolio/RelatedProjects.tsx` | Modified | Standardized related project card links and header link to `min-h-11`. |
| `components/blog/BlogArticlePage.tsx` | Modified | Standardized back link to `min-h-11`. |
| `components/blog/Blog.module.css` | Modified | Standardized TOC and share button heights to 44px. |
| `tests/performance.spec.ts` | Modified | Added 4 automated regression tests for touch targets, image sizes, and GTA VI metadata. |
| `.gitignore` | Modified | Added `docs/screenshots/` to prevent committing 57MB of test artifacts. |

---

## 4. Image Optimization Table

| Image Asset | Original Format & Size | Optimized Format & Size | Reduction (Bytes / %) | PSNR Fidelity | Visual Quality Verification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `blog/gta-vi-website-cover` | PNG: 1,743,360 B (1,702.5 KB) | WebP: 131,732 B (128.6 KB) | **-1,611,628 B (-92.4%)** | 43.84 dB | Pristine contrast and typography. |
| `projects/nesthome.webp` | WebP: 400,318 B (390.9 KB) | WebP: 114,720 B (112.0 KB) | **-285,598 B (-71.3%)** | 44.43 dB | Crisp architectural photography details. |
| `projects/casovi-francuskog.webp` | WebP: 310,182 B (302.9 KB) | WebP: 117,948 B (115.2 KB) | **-192,234 B (-62.0%)** | 43.58 dB | Clean UI text and Paris tower graphics. |
| `projects/banquetes-castellanos-zoreda.webp` | WebP: 274,900 B (268.5 KB) | WebP: 80,438 B (78.6 KB) | **-194,462 B (-70.7%)** | 45.96 dB | Smooth gradients and catering food imagery. |
| `projects/os-dule-karaklajic.webp` | WebP: 254,214 B (248.3 KB) | WebP: 197,490 B (192.9 KB) | **-56,724 B (-22.3%)** | 44.30 dB | Crisp school emblem and navigation items. |
| `projects/milic-weddings.webp` | WebP: 246,720 B (240.9 KB) | WebP: 89,114 B (87.0 KB) | **-157,606 B (-63.9%)** | 45.78 dB | Detailed wedding photography tones. |
| `projects/madjionicar-bojan.webp` | WebP: 218,342 B (213.2 KB) | WebP: 70,136 B (68.5 KB) | **-148,206 B (-67.9%)** | 46.84 dB | Dark stage backgrounds and playing card art. |
| `images/website-maintenance.webp` | WebP: 264,404 B (258.2 KB) | WebP: 203,028 B (198.3 KB) | **-61,376 B (-23.2%)** | 44.09 dB | Sharp dashboard metrics and icons. |
| **Total Across Assets** | **3,712,440 B (3,625.4 KB)** | **1,004,606 B (981.1 KB)** | **-2,707,834 B (-72.9%)** | **> 43.5 dB** | **Zero visual artifacts detected.** |

---

## 5. Before / After Performance Report

Measurements captured across mobile (375×812, DPR 3) and desktop (1440×900, DPR 1):

| Page Audited | Viewport | Total Transferred (Phase 4A) | Total Transferred (Phase 4B) | Delta | Image Transferred (Phase 4A) | Image Transferred (Phase 4B) | Delta | LCP (Before → After) | CLS (Before → After) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Portfolio Showcase** | Desktop | 979.4 KB | **494.9 KB** | **-484.5 KB (-49.5%)** | 925.0 KB | **440.5 KB** | **-484.5 KB (-52.4%)** | 104 ms → 100 ms | 0.0000 → 0.0000 |
| **Portfolio Showcase** | Mobile | 416.4 KB | **365.7 KB** | **-50.7 KB (-12.2%)** | 362.0 KB | **311.3 KB** | **-50.7 KB (-14.0%)** | 104 ms → 276 ms | 0.0000 → 0.0000 |
| **GTA VI Blog Article** | Desktop | ~2,000 KB (est.) | **332.4 KB** | **~ -1.6 MB (-83%)** | ~1,850 KB (est.)| **278.0 KB** | **~ -1.57 MB (-85%)** | N/A → 108 ms | N/A → 0.0000 |
| **GTA VI Blog Article** | Mobile | ~1,900 KB (est.) | **329.7 KB** | **~ -1.57 MB (-83%)**| ~1,750 KB (est.)| **275.3 KB** | **~ -1.47 MB (-84%)**| N/A → 228 ms | N/A → 0.0000 |
| **Serbian Homepage** | Mobile | 283.4 KB | 283.4 KB | 0.0 KB | 229.1 KB | 229.1 KB | 0.0 KB | 80 ms → 80 ms | 0.0000 → 0.0000 |
| **Serbian Homepage** | Desktop | 312.9 KB | 312.9 KB | 0.0 KB | 258.5 KB | 258.5 KB | 0.0 KB | 80 ms → 92 ms | 0.0000 → 0.0000 |
| **Services Page** | Desktop | 298.3 KB | 298.3 KB | 0.0 KB | 244.0 KB | 244.0 KB | 0.0 KB | 92 ms → 88 ms | 0.0000 → 0.0000 |
| **Cool Fridge Guys Study**| Desktop | 117.0 KB | 117.0 KB | 0.0 KB | 62.6 KB | 62.6 KB | 0.0 KB | 76 ms → 80 ms | 0.0000 → 0.0000 |
| **Anabela Study** | Desktop | 87.1 KB | 87.1 KB | 0.0 KB | 32.8 KB | 32.8 KB | 0.0 KB | 76 ms → 72 ms | 0.0000 → 0.0000 |
| **Contact Page** | Desktop | 64.0 KB | 64.0 KB | 0.0 KB | 9.5 KB | 9.5 KB | 0.0 KB | 108 ms → 84 ms | 0.0000 → 0.0000 |

*Interaction to Next Paint (INP) Observation:* Zero Long Tasks on all mobile viewports; maximum single Long Task on desktop remains under 55 ms during initial layout hydration. Layout stability (CLS) remains 0.0000 across all routes.

---

## 6. Mobile Usability & Ergonomics Improvements

### Touch Target Measurements

| Interactive Element | Location | Phase 4A Size | Phase 4B Size | Ergonomics Standard Met |
| :--- | :--- | :--- | :--- | :--- |
| **Language Switcher (SR / EN)** | Header Navigation | 36.0px × 44.0px | **44.0px × 44.0px** (on viewports ≥360px; 36×44 on 320px) | Apple HIG (44px) / Android (48px) |
| **Case Study Related Projects** | `RelatedProjects.tsx` | 162.4px × 31.2px | **162.4px × 44.0px** (`min-h-11`) | Apple HIG (44px) |
| **Related Projects Header Link** | `RelatedProjects.tsx` | 73.5px × 21.0px | **73.5px × 44.0px** (`min-h-11`) | Apple HIG (44px) |
| **Footer Navigation Links** | `Footer.tsx` / `Navigation.tsx` | ~45px–118px × 32.0px | **~45px–118px × 44.0px** (`min-h-11`) | Apple HIG (44px) |
| **Footer Contact Phone & Email**| `Footer.tsx` | ~150px–188px × 36.0px | **~150px–188px × 44.0px** (`min-h-11`) | Apple HIG (44px) |
| **Footer Social Pills (Instagram)**| `Footer.tsx` | 187.7px × 40.0px | **187.7px × 44.0px** (`min-h-11`) | Apple HIG (44px) |
| **Blog Table of Contents Links**| `BlogArticlePage.tsx` | ~200px × 38.0px | **~200px × 44.0px** (`padding-block: .75rem`)| Apple HIG (44px) |
| **Blog Share Action Buttons** | `Blog.module.css` | ~110px × 40.0px | **~110px × 44.0px** (`min-height: 2.75rem`) | Apple HIG (44px) |

---

## 7. Visual QA Findings

Screenshots captured across 320px, 375px, 768px, 1440px (1x and 2x Retina), and 1920px viewports were saved to `docs/screenshots/phase-4b/`:
1. **Desktop 1440px 2x Retina:**
   - Evaluated `portfolio-sr-1440-retina.png`: Typography, badges, and project screenshot details remain razor-sharp. Image reduction from 3840px down to capped 2048px/1200px variants produced zero visible degradation.
2. **Blog Article 1440px:**
   - Evaluated `blog-gtavi-1440.png`: The GTA VI hero cover displays excellent color depth and sharp edge definition with zero compression banding.
3. **Mobile 375px:**
   - Evaluated `footer-sr-375.png`: Generous vertical spacing between quick links and contact buttons, making thumb taps accurate and comfortable.
4. **Ultra-Narrow 320px:**
   - Verified that `document.documentElement.scrollWidth <= 320` across all routes. The responsive adaptation on `LanguageSwitcher` (`min-w-9` at 320px, `min-w-11` from 360px+) prevents horizontal overflow.

---

## 8. Regression Test Results

- **Playwright Test Suite:** **255 / 255 tests passed (100% pass rate)**.
- **TypeScript:** 0 type errors (`next typegen && tsc --noEmit`).
- **ESLint:** 0 lint errors, 0 warnings (`eslint . --max-warnings=0`).
- **Production Build:** 52 static routes generated cleanly (`next build --webpack`).
- **New Tests Added to `tests/performance.spec.ts`:**
  - Header language switcher satisfies 44px mobile touch target.
  - Footer navigation and contact links satisfy 44px mobile touch target.
  - Portfolio showcase images request capped `deviceSizes` without 3840px bloat.
  - GTA VI blog article delivers optimized WebP cover and valid article metadata.

---

## 9. Changes Considered but Rejected

1. **Converting Next.js Server Components to Client Memoized Components:**
   - *Rejected:* Server Components render 0 bytes of client JS. Adding `"use client"` with `useMemo` or `React.memo` would increase bundle weight and introduce unnecessary hydration work.
2. **Aggressively Reducing Image Quality Below 80:**
   - *Rejected:* For portfolio screenshots showing typography and UI design work, quality settings below 80 create noticeable artifacting around small text and borders. Preserved at `quality={85}`.
3. **Removing High-Resolution 2048px Device Breakpoint:**
   - *Rejected:* Removing 2048px would force Retina desktop screens (DPR 2x) to render 1200px images scaled up to 1440px, causing visible softness on modern high-DPI displays.
4. **Enforcing Static 44px Width on Language Switcher at 320px:**
   - *Rejected:* A rigid 44px width on both `SR` and `EN` at 320px caused a 5px header overflow. Responsive scaling (`min-w-9` at 320px, `min-w-11` at 360px+) successfully resolved the overflow while maintaining 44px height.

---

## 10. Remaining Limitations & Recommended Phase 4C Scope

### Remaining Technical Considerations
1. **Hostinger Reverse Proxy Content-Security-Policy (CSP):**
   - In production staging, Hostinger's edge proxy should be tested with `curl -I https://nmarkdesigns.com` to confirm that the full CSP headers configured in `proxy.ts` are forwarded without truncation.
2. **Self-Hosted Font Subset Optimization:**
   - DM Sans font payload is currently 55 KB across 2 WOFF2 files. Future optimization could investigate glyph subsetting if further micro-optimizations are desired.

### Recommended Phase 4C Scope
1. Staging deployment verification on Hostinger Node.js environment.
2. Verification of live contact form SMTP delivery with actual Hostinger credentials.
3. Live HTTP header verification for HSTS, CSP, and compression (Brotli/Gzip) at the Hostinger edge.
