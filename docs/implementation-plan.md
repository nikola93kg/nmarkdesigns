# NMark Designs Implementation Plan

## Inspection

Reviewed on 2026-09-08:

- `docs/frontend-agent.md`.
- All four pages of `docs/reference/nmarkdesigns-current-homepage.pdf`, an image-only screenshot export.
- `docs/reference/logo/1.png` and `2.png` (1000 x 1000 transparent logo variants), and `22.png` (785 x 234 wordmark).
- The live homepage and its linked style definitions, used to corroborate content, colors, type, and public destinations.

The initial repository contains reference material only: no package configuration, application, dependencies, or existing component patterns. Existing staged and unstaged reference changes must be preserved.

## Reference Interpretation

The PDF is the primary visual authority. Its first page shows a compact white header with a black wordmark, five navigation links, and an outlined pricing button. A light hero combines a large bold service heading, supporting copy, two buttons, and a website mockup. Faint grid lines recur on both light and dark backgrounds.

The project showcase is a major visual anchor: deep aubergine surrounds large pale screenshot surfaces, with two-column entries alternating with full-width projects. Services use numbered entries and a prominent laptop image. A process section precedes an aubergine call to action, a two-column FAQ, and a dark footer. The footer contains a circular logo, business introduction, quick links, contact methods, and copyright.

The screenshot contains partially transparent content and unusually large blank areas. Scroll/reveal effects are a plausible cause, but this cannot be proven from the PDF alone. Do not reproduce missing headings, invisible content, washed-out images, or scroll-dependent visibility.

Other changes to make deliberately:

- Use sentence case rather than automatic title capitalization.
- Replace rounded outer project containers with an unframed grid; reserve 8px corners for individual project items.
- Keep text and screenshot contrast clear on dark sections.
- Consolidate duplicated desktop/mobile footer content.
- Keep source order meaningful before adding visual variation.
- Omit unsupported ratings, client totals, results, and testimonials.

## Homepage Composition

1. Header.
2. Hero: real business offer and intentionally migrated project imagery.
3. FeaturedProjects: recognizable project-first emphasis.
4. Services: design, SEO, responsive implementation, and maintenance.
5. Process: consultation/planning, design/development/testing, launch/support.
6. CTA: contact invitation.
7. FAQ: native accessible disclosures where sufficient.
8. Footer.

No distinct AboutPreview or Testimonials section is visible in the PDF. Add either only after suitable business content is supplied. A client-logo strip exists in live markup but is not clearly visible in the PDF; its inclusion remains a content decision.

## Design Tokens

| Token | Value | Use |
| --- | --- | --- |
| brand | `#110024` | Primary buttons, dark bands, footer |
| brand-hover | `#2B1642` | Interactive dark surface |
| accent | `#AB7EFF` | Accent details and focus on dark surfaces |
| accent-soft | `#F2EBFF` | Pale highlights |
| surface | `#FFFFFF` | Main page and header |
| surface-muted | `#F9F8FC` | Alternate light sections |
| ink | `#474752` | Body text |
| muted | `#65616E` | Secondary text on light surfaces |
| border | `#E2E2E8` | Light dividers and outlines |
| on-brand | `#FFFFFF` | Primary inverse text |
| on-brand-muted | `#D5CDE0` | Readable secondary inverse text |
| border-inverse | `#493956` | Dark dividers |
| focus | `#6941A5` | Visible focus on light surfaces |

The original palette, DM Sans family, and 1280px container are corroborated by production CSS. Hover/focus/inverse values are explicit accessibility refinements, not claimed original tokens. Keep white and neutral space prominent; use aubergine in deliberate bands rather than tinting every surface purple.

Typography uses DM Sans through `next/font`, regular body text, medium navigation, and semibold/bold headings. Body is 16px with 1.7 line height; small text is 14px. Display sizes are 36/48/60px and section headings 28/36/48px at mobile/tablet/desktop breakpoints. Subheadings are 24px. These are reusable roles, not automatic heading element styles. All letter spacing is zero.

Layout uses a 1280px maximum outer container, 20/32/40px horizontal gutters, and a 4px spacing rhythm. Section padding is 56/80/112px, with 80/96px header height. Buttons have at least 48px height and 6px corners; ordinary image/card corners are 8px. Primary buttons are aubergine with white text; secondary buttons are white with a border. Focus is outlined and offset. Navigation and icon controls have comfortable touch targets.

No image grids or homepage patterns are implemented during the foundation. Later, use `next/image` with real dimensions, responsive `sizes`, and aspect ratios appropriate to each asset. Use contain for inspectable site screenshots and crop only when the source supports it. Avoid reproducing dark overlays over project imagery.

## Responsive Strategy

- Below 768px: 20px gutters, a native mobile navigation disclosure, stacked footer, and later single-column sections and project cards.
- 768px to 1023px: 32px gutters, mobile navigation, and two-column content where it fits.
- At 1024px: desktop navigation and four-column footer become available.
- Large desktop: stop growing at the shared maximum container width.
- Text wraps naturally; typography changes at explicit breakpoints rather than scaling with viewport width.
- Mobile navigation closes with Escape, outside pointer input, focus leaving, link activation, or switching to desktop. It is a nonmodal disclosure, so a focus trap and body scroll lock are unnecessary. The disclosure and links work without JavaScript.
- Native focus and reduced-motion behavior remain usable.

## Component Tree

```text
RootLayout (Server)
  Skip link
  Header (Server)
    Container
    Logo -> next/image, next/link
    Navigation (Server in desktop/footer use)
    Button
    MobileNavigation (Client)
      Native details/summary
      Navigation
      Button
  main
    HomePage (minimal composition point in Phase 1)
  Footer (Server)
    Container
    Logo
    Navigation
    Contact and social links
```

`Navigation` is shared presentational markup. Its module is also included in the mobile client graph because it is imported by `MobileNavigation`; the server header and footer are not converted into client components. Button renders a native action button, Next.js internal link, or ordinary external anchor based on its typed props.

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  layout/
    Header.tsx
    Logo.tsx
    Navigation.tsx
    MobileNavigation.tsx
    Footer.tsx
  ui/
    Container.tsx
    Button.tsx
content/
  site.ts
lib/
  metadata.ts
public/
  logo/
docs/
  frontend-agent.md
  implementation-plan.md
  migration-notes.md
  reference/
tests/
  foundation.spec.ts
```

Add `components/home/`, `components/portfolio/`, structured content files, and actual page folders as their phases begin. Do not prepopulate empty routes or create unused type/helper files. New route names are provisional until checked against the production inventory; `/all-services/` and `/cenovnik/` need explicit consideration beyond the original proposed structure.

## Implementation Phases

1. Foundation: Next.js App Router, React, strict TypeScript, Tailwind, shared tokens, DM Sans, root layout, Container, Button, header, desktop/mobile navigation, footer, metadata defaults, minimal index, and focused browser checks.
2. Homepage: real sections in the order above, intentional image migration, and reusable Section/SectionHeading when actual usage establishes their API.
3. Core pages: About, Services, Portfolio, Contact, and existing Pricing content. Preserve verified public URLs or agree replacements. Decide contact submission separately.
4. Case studies: typed project data, dynamic portfolio route, shared template. Leave unknown challenges, technologies, locations, and results optional.
5. Blog: repository content and article metadata only when actual content is available.
6. SEO and migration: complete URL inventory, per-page metadata, canonical review, approved redirects, sitemap, robots, useful structured data, social imagery, and favicon assets.
7. Quality and launch: responsive/a11y review, Lighthouse and image tuning, real-world Core Web Vitals follow-up, full link checks, staging protection, and deployment validation.

Phase 1 uses one icon library, Lucide, for consistent accessible control icons. Playwright and axe are development-only verification tools. No CMS, database, authentication, backend, state store, or animation library is introduced.

## Phase 1 Verification

- Strict type check, ESLint, and a production build.
- Browser checks at 320, 375, 768, 1024, 1440, and 1920px.
- Loaded logo images, no horizontal page overflow, and no runtime page errors.
- Keyboard skip link, menu opening/closing, focus return, outside dismissal, resize behavior, and operation with JavaScript disabled.
- Automated WCAG checks on desktop, mobile, and the open mobile menu, plus screenshot review.
- Correct Serbian language, production canonical, social metadata, and noindex on the incomplete homepage.

These checks cover the foundation; they do not establish whole-site accessibility or future production Core Web Vitals.
