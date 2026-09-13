# Phase 6.5C - Homepage Portfolio Showcase Visual Polish

Completed: 2026-09-13. Scope: homepage Portfolio showcase section, directly required homepage portfolio copy/styles/tests, and this report.

The approved Header, Hero copy, layered Hero artwork/animation, Services, CTA, FAQ, Footer, BackToTop, About, Contact, Pricing, case-study page components, and Phase 6 SEO/indexing/redirect architecture were not redesigned.

## 1. Previous Portfolio Audit

- The homepage Portfolio section used the shared `ProjectCard` in a mostly equal two-column grid.
- Two projects were widened, but the overall rhythm still read as a conventional card grid.
- The dark NMark purple background and subtle architectural grid were already aligned with the brand direction.
- All eight project entries were visible and sourced from `content/projects.ts`.
- Project screenshots were real repository assets in `public/projects/`.
- Homepage links used localized internal case-study routes through `localizedProjectPath`.
- The existing Frankultura screenshot already shows the online French lessons project visually.

## 2. Visual Strategy Chosen

- Replaced the homepage card grid with an editorial showcase.
- Kept the dark brand section and reused the shared architectural grid background.
- Used one large lead project followed by alternating supporting project rows.
- Kept screenshots large, contained, and stable rather than aggressively cropped.
- Removed decorative tags/stacks and avoided invented metadata.

## 3. Project Hierarchy

- `Casovi Francuskog` is now the lead homepage portfolio project.
- The former `frankultura` project entry has been replaced with `casovi-francuskog` using the provided `casovi-francuskog.webp` screenshot and `casovifrancuskog.rs` destination.
- The remaining seven projects stay visible on the homepage after the lead project:
  Buy Pallet Jacks, Ilic Enterijer, OS Dule Karaklajic, Powder Brows Vienna, Tripoli Sweets, CoolFridgeGuys, LaDekor.

## 4. Layout And Composition Changes

- `components/home/FeaturedProjects.tsx` now renders the homepage showcase directly instead of using `ProjectCard`.
- Added a small `ProjectPreview` helper inside the same component for repeated project blocks.
- Added `components/home/FeaturedProjects.module.css` for the editorial composition.
- The intro now uses a concise selected-work framing in Serbian and English.
- Each project block includes image, number/domain, title, verified description, and a case-study link.

## 5. Responsive Behavior

- Mobile stacks each project naturally with image first, then text and link.
- Tablet keeps single-column editorial spacing with larger screenshots.
- Desktop alternates image/text alignment while preserving source and keyboard order.
- Checked 320, 375, 430, 768, 1024, 1440, and 1920 widths for overflow.

## 6. Interaction Behavior

- Project screenshots have a subtle hover/focus border shift.
- Images scale slightly on hover/focus.
- Text links and arrows use small color/position transitions.
- No animation library, parallax, dramatic zoom, or hover-only content was added.

## 7. Image And Performance Decisions

- All project images still use `next/image`.
- Portfolio images are not preloaded.
- Image aspect ratios are stable through CSS `aspect-ratio`.
- Screenshots use `object-fit: contain` to avoid cutting important UI.
- Quality is slightly higher on the lead project and conservative on supporting projects.
- Lazy loading remains in place; visual QA scrolled each project into view before final screenshot capture.

## 8. Accessibility Impact

- The section keeps one `h2` and project titles as `h3`.
- Case-study links remain normal crawlable localized internal links.
- Image links are named by meaningful image alt text.
- Text case-study links retain explicit accessible names such as `Pogledajte projekat: Casovi Francuskog`.
- Focus-visible outlines are preserved by the global focus style.
- Hover is not required to discover content.

## 9. Files Changed

- `components/home/FeaturedProjects.tsx`
- `components/home/FeaturedProjects.module.css`
- `content/projects.ts`
- `content/i18n/sr.ts`
- `content/i18n/en.ts`
- `tests/foundation.spec.ts`
- `tests/case-studies.spec.ts`
- `tests/seo.spec.ts`
- `docs/phase-6-5c-portfolio-report.md`

Note: `content/i18n/sr.ts`, `content/i18n/en.ts`, and `tests/foundation.spec.ts` already contained uncommitted Phase 6.5 hero-related changes before this phase. This phase only changed the homepage portfolio copy/assertions in those files.

## 10. Tests Run

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build -- --webpack`: passed
- `npm run test:e2e`: failed with 181 passed, 1 failed
- `npx playwright test tests/foundation.spec.ts -g "desktop hero owns"`: failed, same existing hero clipping assertion
- After replacing the former Frankultura data entry with Casovi Francuskog:
  - `npm run lint`: passed
  - `npm run typecheck`: passed
  - `npm run build -- --webpack`: passed
  - `npx playwright test tests/case-studies.spec.ts tests/seo.spec.ts`: passed, 67 tests
  - `npx playwright test tests/foundation.spec.ts -g "homepage remains readable"`: passed, 16 tests
  - `git diff --check`: passed

The failing e2e assertion is outside this phase's allowed scope: `tests/foundation.spec.ts` reports one empty decorative Hero child as clipped in `desktop hero owns the first viewport without clipping`. Portfolio, portfolio index, case-study, homepage readability, SEO crawl, localization, contact, pricing, and accessibility batches completed successfully during the full run.

## 11. Screenshots And Viewports Checked

Captured and inspected homepage Portfolio section screenshots for `/sr/` and `/en/`:

- `375x812`
- `430x932`
- `768x1024`
- `1024x768`
- `1440x800`
- `1440x900`
- `1920x1080`

Additional responsive edge check:

- `320x812`

Checked:

- section intro
- image quality and cropping
- alternating desktop rhythm
- mobile stack
- spacing between projects
- dark grid visibility
- transition from Hero into Portfolio
- transition from Portfolio into Services
- hover/focus behavior
- no horizontal overflow

## 12. Deferred

- No case-study page redesign.
- No case-study layout redesign.
- No unrelated portfolio projects were renamed or reordered outside the requested Casovi replacement.
- No changes to Services or lower homepage sections.
- The unrelated Hero clipping test failure should be resolved in a Hero-focused follow-up.
