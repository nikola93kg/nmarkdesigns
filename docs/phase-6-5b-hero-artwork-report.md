# Phase 6.5B - Layered Animated Hero Artwork

Completed: 2026-09-13. Scope: homepage Hero artwork, directly required artwork styles/tests and this report.

The approved Phase 6.5A Hero copy, CTAs, metadata direction and viewport-height behavior were preserved. Portfolio, Services, CTA, FAQ, Footer, BackToTop, other pages and Phase 6 SEO/indexing/redirect architecture were not redesigned or changed.

## 1. Asset Inventory

Prepared assets found in `public/images/hero-assets/`:

| Asset | Dimensions | Size | Treatment |
| --- | ---: | ---: | --- |
| `back-panel.webp` | 1536 x 1024 | 124K | used |
| `dark-panel.webp` | 1536 x 1024 | 240K | used |
| `tablet.webp` | 1536 x 1024 | 96K | used, preloaded |
| `phone.webp` | 1199 x 1312 | 164K | used |
| `brand-card.webp` | 1536 x 1024 | 176K | used |
| `white-card.webp` | 1536 x 1024 | 200K | used |
| `pencil.webp` | 1536 x 1024 | 68K | used, hidden on mobile |
| `dark-panel-backup.webp` | 1536 x 1024 | 148K | ignored backup |

PNG source versions also exist under `public/images/hero-assets/png/`; they were not used because the prepared WebP assets are available.

## 2. Actual Files Used

- `/images/hero-assets/back-panel.webp`
- `/images/hero-assets/dark-panel.webp`
- `/images/hero-assets/tablet.webp`
- `/images/hero-assets/phone.webp`
- `/images/hero-assets/brand-card.webp`
- `/images/hero-assets/white-card.webp`
- `/images/hero-assets/pencil.webp`

The old flattened `/images/hero-montage.webp` is no longer rendered in the Hero component. It was not deleted because it is still referenced by homepage Open Graph/Twitter metadata.

## 3. Composition and Stacking

The new `HeroArtwork` component renders one relative, isolated artwork wrapper with absolutely positioned `next/image` layers. The wrapper uses a stable aspect ratio and percentage-based positioning so the composition scales as a single visual system.

Stacking order:

1. back panel
2. dark panel
3. brand card and white card
4. phone
5. tablet
6. pencil

The tablet remains the dominant upper-right object. The phone sits lower-left, the panels/cards create depth through the middle, and the pencil sits near the lower-right foreground on tablet/desktop.

No gray rectangle, white backing card, blur panel, glassmorphism layer or large CSS shadow was added. The transparent assets expose the architectural Hero grid between objects.

## 4. Animation Offsets

Entrance animation uses only `transform` and `opacity`.

| Layer | Initial offset |
| --- | --- |
| back panel | `translateY(-118px) scale(0.97)` |
| dark panel | `translate(-10px, -148px) scale(0.985)` |
| tablet | `translateY(-178px) scale(0.985) rotate(-1deg)` |
| phone | `translate(-8px, -164px) scale(0.985)` |
| brand card | `translate(4px, -136px) scale(0.99)` |
| white card | `translate(10px, -154px) scale(0.99)` |
| pencil | `translate(18px, -126px) scale(0.99)` |

The final state is fully assembled with `opacity: 1` and neutral transform. There is no continuing float animation.

## 5. Timing and Stagger

All layers use the same `assemble` keyframe:

- duration: `2400ms`
- easing: `cubic-bezier(0.16, 1, 0.3, 1)`

Stagger:

- back panel: `0ms`
- dark panel: `240ms`
- tablet: `500ms`
- phone: `760ms`
- brand card: `980ms`
- white card: `1200ms`
- pencil: `1420ms`

Total perceived assembly remains around 3.8s including the final stagger tail, with a larger falling gap between layers before they settle into the final stack.

## 6. Responsive Behavior

- Mobile uses the existing stacked Hero order: text first, artwork second.
- Tablet and desktop preserve the approved two-column Hero.
- The artwork wrapper scales within its column, capped at `41rem`.
- Existing Hero min-height behavior remains: desktop/tablet Hero occupies the first viewport below the Header while using min-height rather than fixed height.
- No JavaScript viewport or animation logic was introduced.

## 7. Mobile Simplification

On viewports below `48rem`, the pencil layer is hidden to reduce clutter and prevent edge pressure. The main visual identity remains through the back panel, dark panel, tablet, phone, brand card and white card.

The artwork is not hidden on mobile.

## 8. Reduced Motion

`prefers-reduced-motion: reduce` disables the entrance animation and renders all visible layers immediately in final position:

- `animation: none`
- `opacity: 1`
- `transform: none`
- no ambient motion

This behavior is covered by a focused Playwright test.

## 9. LCP and Loading Decisions

The likely LCP candidate within the layered artwork is the tablet because it is the largest visible object and the strongest visual element. Only `tablet.webp` is preloaded.

Other layer images load normally:

- no layer-wide priority/preload
- no animation library
- no client JS
- no video
- no layout-shifting document-flow layer placement
- quality set to `82` for the artwork layers to balance sharp UI detail and payload

The old single flattened Hero visual was one `1365 x 1100` image. The new visual uses more requests, so preloading is limited deliberately.

## 10. Accessibility Treatment

The layered visual is treated as one decorative illustration:

- artwork wrapper has `aria-hidden="true"`
- each layer image has `alt=""`
- no file names or repetitive device descriptions are exposed to screen readers

This is cleaner than seven verbose alt strings because the Hero text already communicates the business/service information. Homepage social metadata still retains the existing localized image alt text for the Open Graph image.

## 11. Files Changed

- `components/home/Hero.tsx`
- `components/home/HeroArtwork.tsx`
- `components/home/HeroArtwork.module.css`
- `tests/foundation.spec.ts`
- `tests/localization.spec.ts`
- `tests/seo.spec.ts`
- `docs/phase-6-5b-hero-artwork-report.md`

## 12. Tests Run

Validation commands:

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build -- --webpack`: passed
- `npx playwright test tests/localization.spec.ts tests/foundation.spec.ts tests/seo.spec.ts --project=chromium`: passed, 60 tests
- `npm run test:e2e`: passed, 182 tests
- `git diff --check`: passed

After the follow-up refinement that increased the artwork container and slowed the assembly timing:

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npx playwright test tests/foundation.spec.ts --project=chromium`: passed, 21 tests
- `git diff --check`: passed

## 13. Screenshots and Viewport Checks

Manual visual QA captured and inspected:

- `375x812`
- `430x932`
- `768x1024`
- `1024x768`
- `1440x800`
- `1440x900`
- `1920x1080`

Checked:

- layered composition and final state
- no gray rectangular backing
- grid visibility between objects
- no text/artwork overlap
- no horizontal overflow
- mobile stacked order
- pencil hidden on mobile
- desktop Hero still owns first viewport
- Portfolio begins after Hero on desktop/tablet
- reduced-motion final state

## 14. Intentionally Deferred

- no new artwork generation or asset editing
- no replacement of homepage Open Graph image
- no Hero copy, CTA or metadata rewrite
- no Portfolio or lower-homepage polish
- no Lighthouse or field Core Web Vitals measurement
