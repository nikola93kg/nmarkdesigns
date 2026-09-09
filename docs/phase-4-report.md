# Phase 4 Portfolio Case Studies

Completed: 2026-09-09. Scope: project detail architecture and the eight verified project profiles in Serbian and English. Other unfinished core pages and Phases 5-7 were not implemented.

## Implementation

- One Server Component route, `app/[locale]/portfolio/[slug]/page.tsx`, statically generates 16 detail pages from the shared project data.
- Existing slugs are preserved: `buy-pallet-jacks`, `ilic-enterijer`, `os-dule-karaklajic`, `powder-brows-vienna`, `tripolisweets`, `frankultura`, `coolfridgeguys`, and `ladekor`.
- The reusable layout comprises a dark grid-backed introduction and uncropped project screenshot, a light project-facts area, optional verified narratives/gallery, and all-projects/next-project navigation. The last project links back to the first project.
- The typed project model now supports a client name, existing optional facts, shared image type, and optional case-study overview/challenge/solution/results/images. Only projects with case-study content receive local detail pages; unknown/unpublished slugs return 404.
- Homepage and Portfolio project links now open localized detail pages. Verified client-site links are ordinary external anchors in the same tab. Source WordPress URLs remain stored as provenance and as fallback destinations for future entries without case-study content.
- Existing Header/Footer layout, homepage composition, Portfolio grid, imagery, Button/Container primitives, contact information, and design tokens remain intact. No dependency or new Client Component was added.

## Content and Provenance

All eight existing WordPress detail pages were fetched successfully and reviewed. Their client names, website URLs, and published tools were migrated into `content/projects.ts`; tool names only received conventional capitalization. Each page uses its existing verified project title and local screenshot. All eight client names and website destinations are available; technology lists exist for seven projects.

The source pages do not contain substantive challenge, solution, or results narratives. The new pages therefore match their verified information rather than presenting invented, fully developed case-study stories. Brief localized overviews describe the existing project/screenshot subject. Source facts, editorial treatment, and migration mappings are recorded in [project content sources](reference/project-content-sources.md).

Missing content remains omitted, not replaced by filler:

- Detailed challenge, solution, and results narratives for all eight projects.
- Additional project screenshots or galleries.
- LaDekor's technology list.
- Detailed delivery scope, timelines, service lists, and other unsupported metadata.

Optional narrative/gallery rendering is implemented for later verified content, but those populated branches are not exercised by the current real-content browser fixtures.

## Routing and SEO

Each project has `/sr/portfolio/{slug}/` and `/en/portfolio/{slug}/`. The existing language switcher preserves the project slug and current-language accessibility state. The root redirect, trailing-slash convention, and other locale behavior remain intact.

The metadata helper now accepts a Portfolio slug, generating unique canonical URLs, translated descriptions, project-title metadata, Open Graph/Twitter images and alt text, and equivalent `sr`, `en`, and Serbian `x-default` alternates. All pages retain `noindex, nofollow`, including production builds. No launch crawl protections were removed.

Production-browser checks caught an uppercase slug being served from the local case-insensitive static cache. `proxy.ts` now validates Portfolio paths and published slugs before cache lookup. Unknown slugs, case variants, extra path segments, and unsupported locales return 404. This also avoids the previous static fallback errors for unknown detail paths.

Legacy `/portfolio/{slug}/` URLs still require an approved redirect or equivalent compatibility treatment before the domain switch. No speculative migration redirects were added. See [migration notes](migration-notes.md#phase-4-project-url-decision).

## Accessibility and Font Correction

Pages have one H1, semantic navigation/sections, definition lists for facts, meaningful translated image alt text, and visible keyboard focus. Internal links use Next.js Link. Screenshots use intrinsic dimensions and stable contained frames, never stretched/cropped presentation. Only the lead image is preloaded; additional images use lazy loading. Existing reduced-motion behavior is retained.

Visual inspection discovered that the existing automatic DM Sans fallback rendered Cyrillic client-name letters with zero advance width. The localized root layout now disables that metric-adjusted fallback and specifies `system-ui, sans-serif` after DM Sans. DM Sans remains the primary font; no font download or dependency was added. The published Cyrillic client name is preserved, and a browser text-width assertion now guards against blank glyphs.

## Files Created

- `app/[locale]/portfolio/[slug]/page.tsx`
- `components/portfolio/CaseStudyHero.tsx`
- `components/portfolio/CaseStudyDetails.tsx`
- `components/portfolio/CaseStudyNavigation.tsx`
- `tests/case-studies.spec.ts`
- `docs/reference/project-content-sources.md`
- `docs/phase-4-report.md`

## Files Modified

- `content/projects.ts`
- `content/i18n/types.ts`, `content/i18n/sr.ts`, `content/i18n/en.ts`
- `components/portfolio/ProjectCard.tsx`
- `lib/routes.ts`, `lib/metadata.ts`
- `proxy.ts`
- `app/[locale]/layout.tsx`
- `tests/portfolio.spec.ts`
- `README.md`, `docs/implementation-plan.md`, `docs/migration-notes.md`

These lists describe this phase only. Pre-existing dirty-worktree changes and historical phase reports were preserved.

## Validation Executed

| Check | Result |
| --- | --- |
| `npm run build` | Passed; 16 project details plus the existing four locale pages statically generated |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed, zero warnings |
| `npm run test:e2e` | Final run: 85 passed in Chrome against the production build |
| `git diff --check` | Passed |
| All eight projects in both locales | Verified content, metadata, client links, next-project targets, omitted missing sections, and language equivalents |
| Responsive matrix | Serbian/English at 320, 375, 430, 768, 1024, 1440, 1920px using Buy Pallet Jacks and the school as tall-image/long-title fixtures; screenshots inspected |
| Overflow/image checks | No horizontal overflow or clipped tested text; lead images loaded, remained in bounds, and used contain treatment |
| Keyboard navigation | Skip link, project focus, all-projects navigation, next project, and both-way language switching passed |
| No JavaScript | Detail content and equivalent language links remained usable in both locales |
| Axe WCAG A/AA | No detected violations in representative case studies at 375/1440px in both locales; existing homepage/index checks also passed |
| Cyrillic client name | Visible after fallback correction; regression width check passed in both locales |
| Development server | All 16 routes returned HTTP 200, loaded their images, and had no horizontal overflow at 320/1440px in an additional browser smoke check |

The final suite includes all existing homepage/Portfolio regressions, updated only where project-link behavior intentionally changed. Screenshot artifacts are in `test-results/case-studies-{locale}-case-study-layouts-at-{width}px-chromium/`; other existing test artifacts are regenerated as usual.

No Lighthouse, field Core Web Vitals, Safari/Firefox, or full assistive-technology audit was performed. Automated checks do not establish complete accessibility or launch readiness.

## Remaining Work

Only About (`/about/`), Contact (`/contact/`), and Pricing (`/cenovnik/`) remain WordPress navigation fallbacks. Services remains a localized homepage anchor. Their corresponding core pages were not created.

Verified narratives and additional assets can now be added to the project model without separate page implementations. Phone/WhatsApp confirmation, legacy URL compatibility, launch metadata/crawl configuration, sitemap/robots/structured data, and final performance/cross-browser review remain outstanding as previously documented.

Preview: http://localhost:3000/sr/portfolio/coolfridgeguys/ and http://localhost:3000/en/portfolio/coolfridgeguys/.
