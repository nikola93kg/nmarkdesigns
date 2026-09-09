# Phase 2.5 Refinement Report

Reviewed: 2026-09-08. Scope: the existing Serbian and English homepages only.
No Phase 3 work, new routes, dependencies, redirects, or business claims were added.

## Files Changed In This Pass

- `components/home/Services.tsx`: editorial alignment, hierarchy, and spacing.
- `components/home/CTA.tsx`: heading treatment, copy width, button prominence, and padding.
- `components/home/Home.module.css`: CTA-local heading size using the existing heading token.
- `components/home/FAQ.tsx`: column proportions and section spacing.
- `content/i18n/sr.ts`: a sentence break in the Services heading; wording unchanged.
- `content/i18n/en.ts`: the equivalent sentence break; wording unchanged.
- `tests/foundation.spec.ts`: responsive header geometry, text overflow, and section screenshots.
- `docs/phase-2-5-report.md`: this report.

The working tree already contained the approved Phase 2 implementation and other changes. The list above describes this refinement pass, not every outstanding Git change.

## Visual Refinements

- Services retains its original image, maintenance copy, and numbered editorial list. Desktop heading/intro columns now align with the image/list columns. Tablet introductory copy stacks to avoid cramped heading columns. Desktop indices sit beside service text; smaller screens retain stacked indices. Brand-colored service headings and tighter local gaps clarify the hierarchy without introducing cards.
- Services headings break between sentences in both languages. This prevents the English article from being stranded on the preceding line without reducing global type sizes.
- Services and FAQ desktop vertical padding is 96px instead of 112px. Existing mobile/tablet section spacing remains in place.
- The dark CTA uses a heading 4px larger than the current responsive heading token, a narrower description, and a 56px-high primary action within the existing secondary Button variant. Section padding is 48/64/80px across mobile/tablet/desktop, avoiding unnecessary section height.
- FAQ uses more balanced columns and a smaller gutter. English introductory headings now wrap into complete sentences at tablet/laptop widths. The accordion implementation, questions, answers, default expansion, and keyboard behavior are unchanged.
- Portfolio composition, Hero, Header, Footer, language switcher, Phase 1 primitives, global typography, assets, and route/SEO architecture were not modified.

## Phone Audit

Two distinct NMark Designs phone numbers were found. Neither was changed or selected as the confirmed business number during this pass.

| Number | Existing source locations and representations |
| --- | --- |
| `+381 64 300 5654` | `content/site.ts:24` (display), `content/site.ts:25` (`tel:+381643005654`), `content/site.ts:28` (`https://wa.me/381643005654`); `docs/migration-notes.md:28`; `docs/phase-2-report.md:95`. |
| `+52 984 137 1132` | `docs/migration-notes.md:29`. No active Next.js content entry uses this number. The legacy homepage also contains a `tel:+52%20984%20137%201132` link. |

`components/layout/Footer.tsx:41` consumes the shared telephone href, line 43 renders its label, and line 58 consumes the WhatsApp destination. These are the same shared values for both locales, not additional numbers. Normalized values are `+381643005654` and `+529841371132`.

The supplied PDF footer shows the Serbian number. The [live WordPress homepage](https://nmarkdesigns.com) still contains both numbers: the Serbian number in footer/contact markup and the Mexican number in another contact/WhatsApp area. Its separate WhatsApp icon uses the encoded Mexican telephone link, while the footer WhatsApp link uses the Serbian number. This confirms a source conflict, not which number should be retained.

The audit covered repository source/content/documentation and the existing reference/live business contact information. Generated output and third-party dependencies were excluded; dates and screenshot filenames were not treated as phone numbers. This report repeats the values as audit evidence, not as a new contact-content source. Business-owner confirmation is still required.

## WordPress Fallback Links

The rendered homepage DOM contains 22 WordPress anchor instances per locale, including the separate desktop/mobile header controls. These resolve to 12 distinct destinations. Both locales use the same destinations; English labels currently lead to Serbian WordPress content. All were left unchanged.

| Destination | Homepage placements | Source |
| --- | --- | --- |
| https://nmarkdesigns.com/about/ | Desktop/mobile About navigation and footer | `lib/routes.ts:27` |
| https://nmarkdesigns.com/contact/ | Desktop/mobile Contact navigation, footer, Hero quote action, dark CTA, FAQ contact action | `lib/routes.ts:32`; shared `navigationItem` consumers |
| https://nmarkdesigns.com/cenovnik/ | Desktop/mobile Pricing actions, footer, Hero pricing action | `lib/routes.ts:37` |
| https://nmarkdesigns.com/portfolio/ | Selected-work section's all-projects action | `components/home/FeaturedProjects.tsx` |
| https://nmarkdesigns.com/portfolio/buy-pallet-jacks/ | Buy Pallet Jacks showcase link | `content/projects.ts:26` |
| https://nmarkdesigns.com/portfolio/ilic-enterijer/ | Ilic Enterijer showcase link | `content/projects.ts:35` |
| https://nmarkdesigns.com/portfolio/os-dule-karaklajic/ | OS Dule Karaklajic showcase link | `content/projects.ts:44` |
| https://nmarkdesigns.com/portfolio/powder-brows-vienna/ | Powder Brows Vienna showcase link | `content/projects.ts:53` |
| https://nmarkdesigns.com/portfolio/tripolisweets/ | Tripoli Sweets showcase link | `content/projects.ts:62` |
| https://nmarkdesigns.com/portfolio/frankultura/ | Frankultura showcase link | `content/projects.ts:71` |
| https://nmarkdesigns.com/portfolio/coolfridgeguys/ | CoolFridgeGuys showcase link | `content/projects.ts:80` |
| https://nmarkdesigns.com/portfolio/ladekor/ | LaDekor showcase link | `content/projects.ts:89` |

Project links are rendered by `components/portfolio/ProjectCard.tsx`. Header/footer Portfolio and Services navigation use local, locale-aware homepage anchors, not WordPress URLs. Logo/Home and SR/EN links are local. Email, telephone, Instagram, and WhatsApp links are not WordPress fallbacks. Canonical/social metadata URLs are also not navigational fallbacks.

All 12 WordPress destinations returned HTTP 200 during this review. Their replacement and any migration redirects remain future work.

## Validation

- `npm run build`: passed with the existing localized static homepages.
- `npm run typecheck`: passed.
- `npm run lint`: passed, with no warnings.
- `npm run test:e2e`: 26 tests passed in Chrome against the production build.
- `git diff --check`: passed.
- Both locales were tested at 375, 430, 768, 1024, 1440, and 1920px, plus the existing 320px regression width. Responsive screenshots were captured and inspected; no document horizontal overflow or clipped tested text was found.
- New assertions verify visible header controls stay within the viewport, do not overlap, and retain at least 44px height. Active SR/EN links are visible and underlined. Header screenshots were inspected across all requested widths.
- Keyboard SR-to-EN-to-SR switching also passed at 767 and 1023px, immediately below header breakpoints, including current-locale state and overflow checks.
- Existing tests passed for mobile-menu keyboard operation/dismissal/resize, visible skip-link focus, language switching in both directions, equivalent-route mapping, FAQ keyboard/expanded state, reduced-motion behavior, and practical no-JavaScript operation.
- Existing automated axe checks passed at 375 and 1440px in both locales and with the Serbian mobile menu open. This is not a substitute for a full screen-reader audit.
- Root redirect, invalid/unfinished route behavior, localized metadata, canonical/alternate URLs, and preview noindex regression checks passed. Their implementation was unchanged.
- Image loading/bounds and browser runtime-error checks passed. No Lighthouse, field Core Web Vitals, Safari, or Firefox run was performed in this pass.

Screenshot artifacts are under `test-results/foundation-{locale}-homepage-remains-readable-at-{width}px-chromium/`. Each run includes full-page, hero viewport, header, Services, CTA, and FAQ views, plus service-list detail on mobile. These generated artifacts are not committed source files.

The existing development server remains available at http://localhost:3000/sr/ and http://localhost:3000/en/.

## Remaining Decisions

- Confirm the preferred telephone and WhatsApp number before changing shared business content.
- Replace the documented WordPress fallbacks only when the corresponding pages are intentionally implemented and URL migration decisions are documented.
- No additional assets or new copy were needed for this refinement. Phase 3 has not started.
