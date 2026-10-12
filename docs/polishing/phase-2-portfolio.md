# NMark Designs — Website Polishing
## Phase 2: Portfolio & Project Detail UX Refinement

### Overview
Phase 2 refines the portfolio listing page (`/portfolio`) and individual project case study pages (`/portfolio/[slug]`) to resolve critical readability and layout issues identified in owner feedback across mobile and desktop devices.

All changes strictly preserve Phase 1 homepage refinements and adhere to the NMark Designs brand identity.

---

### 1. Modified Files
- `content/i18n/sr.ts`: Replaced corporate `Studija slučaja` terminology with natural `Detalji projekta` and `Pogledajte projekat`.
- `content/i18n/en.ts`: Aligned natural English terminology to `Project details` and `View project`.
- `content/projects.ts`: Added verified, concise 2–3 line `shortDescription` for all portfolio projects (`buy-pallet-jacks`, `ilic-enterijer`, `powder-brows-vienna`, `tripolisweets`, `casovi-francuskog`, `ladekor`, `os-dule-karaklajic`) and tightened `anabelabebioprema`. Full descriptions in `caseStudy.overview` remain preserved for dedicated case study pages.
- `components/portfolio/PortfolioShowcase.module.css`:
  - Redesigned `.projectButton` CTA with deep brand purple (`#110024`), crisp white text (`#ffffff`), subtle border, and brand hover/focus states to eliminate low-contrast/invisible white-on-white text.
  - Implemented a clean stacked two-zone card layout on mobile viewports (`<48rem` / `<768px`) separating the 16:10 screenshot preview from a solid dark content container.
- `components/portfolio/PortfolioShowcase.tsx`: Updated historical project badge styling on dark card surface to use `text-on-brand-muted` ensuring WCAG AA color contrast compliance (4.5:1+).
- `components/portfolio/CaseStudyDetails.tsx`:
  - Converted narrative sections (`challenge`, `approach`, `solution`, `results`) to native accessible HTML `<details>` and `<summary>` accordions (closed by default, keyboard accessible, rotating chevron indicator, visible H2 headings).
  - Implemented an adaptive balanced grid for technical highlights (2x2 grid for 4 items, 2-column for 2 items, 3-column for 3 items).
- `tests/portfolio-polishing.spec.ts`: Added 34 automated tests covering terminology, CTA styling, summary density, mobile layout stacking, accordion interactions, grid balance, and responsive visual captures.

---

### 2. Copy & Terminology Updates

#### Serbian Localization (`content/i18n/sr.ts`)
| Element | Before | After |
| :--- | :--- | :--- |
| Case Study Badge | `STUDIJA SLUČAJA` | `DETALJI PROJEKTA` |
| Primary Card CTA | `Pogledajte studiju slučaja` | `Pogledajte projekat` |
| Case Study Label | `Pogledajte studiju slučaja` | `Pogledajte projekat` |

#### English Localization (`content/i18n/en.ts`)
| Element | Before | After |
| :--- | :--- | :--- |
| Case Study Badge | `CASE STUDY` | `PROJECT DETAILS` |
| Primary Card CTA | `View case study` | `View project` |
| Case Study Label | `View case study` | `View project` |

---

### 3. Portfolio Card CTA Contrast Redesign
- **Root Cause:** `.projectButton` previously used `background: color-mix(in srgb, var(--color-on-brand) 94%, transparent);` while rendering white button text (`text-on-brand`), resulting in near-invisible white text on a 94% white background.
- **Solution:** Redesigned `.projectButton` to use NMark's signature deep purple brand background (`var(--color-brand)` / `#110024`), crisp white text (`var(--color-on-brand)` / `#ffffff`), border (`var(--color-border-inverse)`), box shadow, and smooth hover transition to `var(--color-brand-hover)` (`#2b1642`) with `var(--color-accent)` (`#ab7eff`) border.
- **External Client Links:** Distinct secondary action (`secondaryLink`) with underline and `ArrowUpRight` icon. Inactive projects (e.g. Tripoli Sweets) retain historical badges without external links.

---

### 4. Text Density & Mobile Card Architecture
- **Concise Summaries:** All portfolio items now display a dedicated 2–3 line summary (`shortDescription`) on `/portfolio` instead of dumping full multi-paragraph overviews onto the cards.
- **Two-Zone Mobile Card Structure (`<768px`):**
  - **Top:** 16:10 aspect-ratio screenshot preview frame with light gradient overlay and click link to project details.
  - **Bottom:** Solid deep purple content container (`var(--color-brand)`) with project number, category, badge, title, concise summary, tech pills, host info, and full-width CTA button.
  - **Result:** Complete elimination of text collisions over busy screenshots, predictable card heights, zero horizontal overflow across 320px–430px.

---

### 5. Case Study Accordion UX
- Converted narrative sections on individual project detail pages (`/portfolio/[slug]`):
  - Izazov / Challenge
  - Pristup / Approach
  - Rešenje / Solution
  - Rezultati / Results (where available)
- **Implementation:** Native HTML5 `<details>` and `<summary>` elements wrapped in semantic `<section aria-labelledby="...">` blocks:
  - Closed by default (preventing lengthy scrolling on mobile before key highlights).
  - Zero client JavaScript required (100% Server Component, zero hydration delay).
  - Search engine bots crawl and index full content natively.
  - Keyboard accessible: native Space / Enter toggling.
  - Accessible rotating chevron indicator (`group-open:rotate-180`).
  - H2 semantic headings remain preserved in the document outline.

---

### 6. Desktop Technical Highlights Grid Balance
- Evaluated `technicalHighlights` item count dynamically:
  - **4 items:** `sm:grid-cols-2` (balanced 2x2 grid on desktop, eliminating trailing orphan card).
  - **2 items:** `sm:grid-cols-2` (balanced 2-column grid).
  - **3 items:** `sm:grid-cols-2 lg:grid-cols-3` (3-column grid).
  - **1 item:** `grid-cols-1 max-w-xl` (centered / proportional single card).

---

### 7. Verification Evidence
1. **Production Build:** `npm run build` compiled successfully (52/52 static pages generated).
2. **TypeScript:** `npm run typecheck` passed with 0 errors.
3. **ESLint:** `npm run lint` passed with 0 warnings.
4. **Automated Tests:**
   - `tests/portfolio-polishing.spec.ts`: 34/34 passed.
   - `tests/portfolio.spec.ts`: 24/24 passed.
   - `tests/case-studies.spec.ts`: 45/45 passed.
   - `tests/homepage-polishing.spec.ts`: 24/24 passed.
   - **Full Test Suite:** 324/324 passed (0 regressions).
5. **Responsive Visual Captures:** Screenshots captured and archived in `docs/polishing/evidence/phase-2/` across viewports:
   - 320px, 375px, 402px, 430px, 768px, 1024px, 1440px, 1920px.
