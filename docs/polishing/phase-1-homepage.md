# NMark Designs — Website Polishing
## Phase 1: Homepage Refinement Report

**Date:** 2026-10-12  
**Branch:** `feature/website-polishing`  
**Base Commit:** `3f84398cd34034e522c313ed500d4aaca1707f18` (`origin/main`)  
**Scope:** Homepage refinement only (`sr` & `en`). No other pages or global systems modified.

---

### 1. Hero Content Updates

#### Original Hero Eyebrow / Label
- **Serbian (`sr`):** `WEB DIZAJN · NEXT.JS & WORDPRESS · SEO`
- **English (`en`):** `WEB DESIGN · NEXT.JS & WORDPRESS · SEO`

#### New Hero Eyebrow / Label
- **Serbian (`sr`):** `WEB DIZAJN · RAZVOJ SAJTOVA · SEO`
- **English (`en`):** `WEB DESIGN · WEB DEVELOPMENT · SEO`

#### Preserved Hero Structure
- Heading: `Izrada modernih web sajtova` / `Modern websites, thoughtfully built`
- Subheading: `Dizajn. Performanse. SEO.` / `Design. Performance. SEO.`
- Description: Preserved in full across both languages.
- CTA buttons: Both primary ("Zatražite besplatnu ponudu" / "Request a free quote") and secondary ("Pogledajte portfolio" / "View portfolio") buttons remain intact with exact styling, arrow icons, and navigation routes.
- Typography, uppercase styling, letter spacing, and separators (`·`) are strictly preserved.

---

### 2. Hero Feature Bullets Removal

#### Removed Bullet Group
The three bullet-style selling points positioned underneath the CTA buttons were removed in their entirety:
- `9 detaljnih studija slučaja` / `9 detailed case studies`
- `Next.js, WordPress & WooCommerce` / `Next.js, WordPress & WooCommerce`
- `Direktna saradnja sa developerom` / `Direct collaboration with founder`

#### Implementation Details
- Completely eliminated the `<ul>` container and list elements from `components/home/Hero.tsx`.
- Removed decorative dot markers (`h-1.5 w-1.5 rounded-full bg-brand`).
- Removed `trustSignals` data from `content/i18n/sr.ts` and `content/i18n/en.ts`.
- Removed unused `trustSignals` property from `Dictionary["home"]["hero"]` in `content/i18n/types.ts`.
- No empty wrappers remain.
- The hero vertical rhythm is clean, balanced, and maintains intentional spacing between the CTA buttons and the bottom of the section on mobile, tablet, and desktop viewports.

---

### 3. Selected Projects Reordering

The homepage portfolio showcase section (`#portfolio` / `Odabrani projekti` / `Selected work`) was reordered to follow the exact requested 8-project sequence using a scoped homepage configuration (`homepageProjectSlugs` and `homepageProjects` in `content/projects.ts`).

#### Final Selected-Project Order (Serbian & English)

| Position | Title | Canonical Slug | Status | Domain / Outbound |
|:---:|:---|:---|:---:|:---|
| **01** | Časovi Francuskog | `casovi-francuskog` | Active | `casovifrancuskog.rs` |
| **02** | Cool Fridge Guys | `coolfridgeguys` | Active | `coolfridgeguys.com` |
| **03** | Buy Pallet Jacks | `buy-pallet-jacks` | Active | `buypalletjacks.com` |
| **04** | OŠ Dule Karaklajić | `os-dule-karaklajic` | Active | `osdulekaraklajic.edu.rs` |
| **05** | Ilić Enterijer | `ilic-enterijer` | Active | `ilicenterijer.com` |
| **06** | Powder Brows Vienna | `powder-brows-vienna` | Active | `powderbrowsvienna.at` |
| **07** | Anabela Bebi Oprema | `anabelabebioprema` | Active | `anabelashop.rs` |
| **08** | Tripoli Sweets | `tripolisweets` | Inactive / Historical | *None (internal case study link only)* |

#### Important Safeguards Preserved
- No project data or images were modified.
- Full portfolio page ordering (`/portfolio`) was untouched.
- Tripoli Sweets remains marked as historical/inactive with zero external links; only its internal case study is linked.
- The primary showcase featured card displays project #01 (Časovi Francuskog) followed by the 7 supporting project cards with numbering `02` through `08`.

---

### 4. Services Heading Punctuation Changes

Trailing periods were removed from the homepage services heading while preserving the exact two-line structure and styling.

#### Serbian (`sr`)
- **Original:**  
  `Moderni sajtovi.`  
  `Promišljen pristup.`
- **Updated:**  
  `Moderni sajtovi`  
  `Promišljen pristup`

#### English (`en`)
- **Original:**  
  `Modern websites.`  
  `A thoughtful approach.`
- **Updated:**  
  `Modern websites`  
  `A thoughtful approach`

All service items, layout, maintenance card, images, links, and descriptions were preserved without modification.

---

### 5. Files Modified

1. `content/i18n/sr.ts`:
   - Updated hero eyebrow to `WEB DIZAJN · RAZVOJ SAJTOVA · SEO`.
   - Removed `trustSignals` array from `home.hero`.
   - Removed trailing periods from `home.services.title`.
2. `content/i18n/en.ts`:
   - Updated hero eyebrow to `WEB DESIGN · WEB DEVELOPMENT · SEO`.
   - Removed `trustSignals` array from `home.hero`.
   - Removed trailing periods from `home.services.title`.
3. `content/i18n/types.ts`:
   - Cleaned up `trustSignals?: readonly string[]` from `Dictionary["home"]["hero"]`.
4. `components/home/Hero.tsx`:
   - Removed bullet list rendering and decorative dots.
5. `content/projects.ts`:
   - Added scoped `homepageProjectSlugs` array and exported `homepageProjects`.
6. `components/home/FeaturedProjects.tsx`:
   - Updated component to consume scoped `homepageProjects`.
7. `tests/case-studies.spec.ts`:
   - Updated homepage link test to iterate over `homepageProjects`.
8. `tests/customer-journey.spec.ts`:
   - Removed outdated trustSignals bullet check.
9. `tests/homepage-polishing.spec.ts` (New test file):
   - Added 24 automated tests covering all 6 polishing requirements and responsive viewports with screenshots.

---

### 6. Responsive & Visual QA

Tested across all required viewports in both Serbian (`sr`) and English (`en`):
- `320px` (Ultra-narrow mobile)
- `375px` (Standard mobile)
- `430px` (Large mobile / iPhone Pro Max)
- `768px` (Tablet portrait)
- `1024px` (Small desktop / Tablet landscape)
- `1440px` (Standard desktop)
- `1920px` (Large display)

#### QA Checks Passed
- **Hero layout and vertical spacing:** Removing the bullets leaves a clean, uncluttered visual rhythm. Buttons are clearly prominent and visually balanced against `HeroArtwork` on desktop.
- **CTA visibility and alignment:** Both primary ("Zatražite besplatnu ponudu") and secondary ("Pogledajte portfolio") buttons render with proper alignment across all viewports.
- **No horizontal overflow:** `scrollWidth <= viewportWidth` verified at all breakpoints (320px to 1920px).
- **Selected project ordering:** All 8 projects render in exact 1–8 order with correct numbers (`01` through `08`).
- **Portfolio card rendering:** Images, aspect ratios, headings, hosts, and case study links render cleanly.
- **Tripoli Sweets inactive status:** Renders `#08` with no domain hostname and zero outbound external links.
- **Services heading line breaks:** Two-line layout preserved without trailing periods.
- **Visual consistency between languages:** Serbian and English layouts are identical in spacing, typography, and card composition.

Screenshots captured and stored in `docs/polishing/screenshots/`:
- `sr-320px.png`, `sr-375px.png`, `sr-430px.png`, `sr-768px.png`, `sr-1024px.png`, `sr-1440px.png`, `sr-1920px.png`
- `en-320px.png`, `en-375px.png`, `en-430px.png`, `en-768px.png`, `en-1024px.png`, `en-1440px.png`, `en-1920px.png`

---

### 7. Automated Test Results

- `npm run lint`: **0 errors, 0 warnings**
- `npm run typecheck`: **0 errors (clean compilation)**
- `npm run build`: **Compiled successfully in Next.js 16.3.6 (webpack), 52/52 static pages generated**
- `tests/homepage-polishing.spec.ts`: **24/24 tests passed**
- Full Playwright suite: **292/292 tests passed** (0 failures, 0 skips)
  - Baseline: 282 passed
  - New suite total: 292 passed (282 baseline + 10 targeted assertions)

---

### 8. Owner Review Notes

No issues or anomalies identified. All changes strictly adhere to Phase 1 homepage refinement instructions. No code committed or pushed, awaiting owner review.
