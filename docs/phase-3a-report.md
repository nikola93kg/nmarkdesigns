# Phase 3A Portfolio Report

Completed: 2026-09-08. Scope: localized Portfolio index only.

## Routes

- `/sr/portfolio/` and `/en/portfolio/` are statically generated from one App Router page and the existing localized root layout.
- URLs without the trailing slash resolve through the existing Next.js normalization.
- `/` still redirects to `/sr/`. Invalid locales, including uppercase variants, still return 404.
- No Services, About, Contact, Pricing, or project-detail pages were created. Phase 4 has not started.

## Files Created

- `app/[locale]/portfolio/page.tsx`: server page composition and localized metadata.
- `components/portfolio/PortfolioIntro.tsx`: concise translated introduction.
- `components/portfolio/ProjectGrid.tsx`: data-driven editorial index.
- `components/portfolio/PortfolioContact.tsx`: restrained contact band.
- `components/ui/GridBackground.module.css`: existing light/dark grid background extracted unchanged for reuse.
- `tests/portfolio.spec.ts`: 22 new browser tests.
- `docs/phase-3a-report.md`: this report.

## Files Modified

- `lib/routes.ts`: enable only the Portfolio route and remove its section-anchor fallback.
- `content/i18n/types.ts`, `content/i18n/sr.ts`, `content/i18n/en.ts`: typed Portfolio intro, contact invitation, optional live-site link label, and metadata.
- `components/portfolio/ProjectCard.tsx`: configurable heading level, responsive image sizes, first-image preload, explicit optional destination, and optional project metadata rendering. Defaults preserve the homepage presentation.
- `components/home/FeaturedProjects.tsx`: localize the all-projects link and import the shared grid stylesheet.
- `components/home/Hero.tsx`, `components/home/CTA.tsx`, `components/home/Home.module.css`: use the extracted background stylesheet without changing the homepage design; the CTA-specific heading style remains in its existing module.
- `tests/localization.spec.ts`: update the expected homepage Portfolio navigation URL.
- `README.md`, `docs/implementation-plan.md`, `docs/migration-notes.md`: current routes, architecture, and migration decisions.

These lists describe Phase 3A changes, not the full pre-existing dirty Git worktree. Header, Footer, LanguageSwitcher, Navigation, Button, Container, global tokens/fonts, business contact values, project data/assets, and existing phase reports were not edited during this phase.

## Layout and Content

The page continues the homepage's dark-purple, subtle-grid identity but uses a different browsing rhythm: four alternating 7/5 and 5/7 desktop pairs, two equal tablet columns, and a single mobile column. Entries align at their captions, with source and keyboard order preserved. There is no masonry reordering, filtering interface, animation library, or extra marketing section.

A concise Portfolio introduction precedes the images. A light, unframed contact band separates the project index from the shared dark footer. Existing typography, spacing, corners, and container limits are reused. The first project is visible in the initial viewport at all inspected widths.

`content/projects.ts` is reused without changes or duplication. All eight verified entries appear in their existing order with their exact titles and assets:

1. Buy Pallet Jacks
2. Ilić Enterijer
3. OŠ Dule Karaklajić
4. Powder Brows Vienna
5. Tripoli Sweets
6. Frankultura
7. CoolFridgeGuys
8. LaDekor

Optional category, short description, location, and live-site URL render only when provided. No missing metadata was invented or represented by placeholders. The intro and contact invitation are bilingual and add no statistics, outcomes, guarantees, or separate English claims. Proper project names and text embedded in authentic screenshots retain their original language.

## Links and Case-Study Readiness

- Header desktop/mobile Portfolio links, Footer Portfolio links, and the homepage all-projects action now use the appropriate local index URL.
- Header/Footer behavior changed through `lib/routes.ts`; neither component required a layout or markup change.
- The existing SR/EN switcher preserves `/portfolio/` in both directions, including without JavaScript. Active-language underline and accessible current state remain intact.
- Each project still opens its verified WordPress `sourceUrl` in the same tab. No unavailable internal detail page is linked.
- ProjectCard accepts an explicit `href` and renders a Next.js Link for internal destinations. A future case-study implementation can supply a real destination without changing the index composition or inferring that every stored slug already has a local route.

The legacy `https://nmarkdesigns.com/portfolio/` index has been replaced in application navigation by `/sr/portfolio/` and `/en/portfolio/`. An approved redirect or equivalent compatibility treatment for the old index is required before the domain switch. No speculative redirect was added; `/portfolio/` still returns 404 locally. See [migration notes](migration-notes.md#phase-3a-portfolio-url-decision).

## SEO and Performance

The existing Metadata API helper generates translated titles/descriptions, distinct canonicals, Open Graph/Twitter metadata, and `sr`, `en`, and Serbian `x-default` alternates for the Portfolio routes. The first verified project screenshot supplies the social image and translated alt text.

All routes retain `noindex, nofollow`, including production builds. Preview protection was not weakened. Sitemap, robots route, structured data, and final migration redirects remain launch work.

All new UI is server-rendered. No dependencies or new client boundaries were added. Images use `next/image`, stable 3:2 frames, intrinsic dimensions, responsive sizes, and `object-contain`. Only the first Portfolio image is preloaded; subsequent project images remain lazy-loaded. Homepage image loading and composition are unchanged.

## Validation Results

| Check | Result |
| --- | --- |
| `npm run build` | Passed; homepages and both Portfolio indexes statically generated |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed, zero warnings |
| `npm run test:e2e` | 48 passed in Chrome against the production build, including all 26 existing tests |
| `git diff --check` | Passed |
| Serbian and English at 320, 375, 430, 768, 1024, 1440, 1920px | Passed; screenshots captured and visually reviewed |
| Image load, bounds, contain treatment, caption/arrow separation, and text overflow | Passed; no document horizontal overflow or runtime errors detected |
| Header/mobile/Footer Portfolio links and homepage all-projects action | Passed localized destination checks |
| Keyboard Portfolio navigation, project-link focus, and SR/EN switching | Passed, including page-preserving language switches at 375/1440px |
| Portfolio without JavaScript | Passed both locales, mobile disclosure, and equivalent language links |
| Axe WCAG A/AA checks on Portfolio | No detected violations at 375/1440px in both locales |
| Canonicals, alternates, Open Graph, Twitter, and noindex | Passed for both Portfolio locales |
| Invalid locales, unlocalized legacy URL, unfinished pages, and unimplemented case studies | Correct 404 responses |
| Missing project metadata | Existing entries render only verified titles/images/links, without empty metadata or placeholders |
| Existing development server | Both new routes returned HTTP 200; large-desktop rendering also checked in Chrome |

The first run had 47 passing tests and one unsupported render-only test: Playwright's JSX transform did not produce React elements for direct server rendering. That test was replaced with actual browser assertions covering absent project metadata; the complete final 48-test run passed. No application code change was required for that test-harness issue.

Each project is semantic `article` markup with an H2 beneath the page's single H1. Links include the project title in their localized accessible name, focus outlines remain visible on dark surfaces, and screenshots retain meaningful translated alt text. Nothing relies on hover-only disclosure. Existing reduced-motion rules remain in place.

Generated screenshots are under `test-results/portfolio-{locale}-portfolio-at-{width}px-chromium/`, including `intro.png`, `full-page.png`, and `last-project.png`. Existing homepage screenshots are regenerated by the regression suite. These are ignored test artifacts, not new source assets.

Automated axe checks are not a complete screen-reader audit. Safari, Firefox, Lighthouse, field Core Web Vitals, and rendering of future supplied optional metadata were not tested in this phase.

## Remaining WordPress Fallbacks

The following 11 distinct destinations remain unchanged. English links still lead to the existing Serbian WordPress content.

- `https://nmarkdesigns.com/about/`: header/mobile/footer About navigation.
- `https://nmarkdesigns.com/contact/`: header/mobile/footer Contact navigation, homepage quote/contact actions, and Portfolio contact action.
- `https://nmarkdesigns.com/cenovnik/`: header/mobile/footer Pricing actions and homepage pricing action.
- `https://nmarkdesigns.com/portfolio/buy-pallet-jacks/`
- `https://nmarkdesigns.com/portfolio/ilic-enterijer/`
- `https://nmarkdesigns.com/portfolio/os-dule-karaklajic/`
- `https://nmarkdesigns.com/portfolio/powder-brows-vienna/`
- `https://nmarkdesigns.com/portfolio/tripolisweets/`
- `https://nmarkdesigns.com/portfolio/frankultura/`
- `https://nmarkdesigns.com/portfolio/coolfridgeguys/`
- `https://nmarkdesigns.com/portfolio/ladekor/`

The eight detail links appear in both the homepage showcase and Portfolio index. Services remains a local homepage anchor, not a WordPress fallback. Phone/WhatsApp confirmation remains outstanding as documented in Phase 2.5; those values were not changed.

Preview: http://localhost:3000/sr/portfolio/ and http://localhost:3000/en/portfolio/.
