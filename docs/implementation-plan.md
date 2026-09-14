# NMark Designs Implementation Plan

## Inspection

Current status (2026-09-11): Phase 5C Pricing and Phase 6 technical SEO are implemented and validated. The continuation fixed slashless URL redirect loops and duplicate project navigation landmark labels; all 178 browser tests passed against a Webpack production build. The historical decisions below describe their original phase scope; current routing/indexing decisions and environment limitations are in [Phase 6 report](phase-6-report.md). Visual polish and Phase 7 are not started.

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
5. CTA: contact invitation.
6. FAQ: accessible button-controlled accordion with readable no-JavaScript content.
7. Footer.

Phase 2 follows the explicitly requested five-section homepage. The standalone Process section from the initial plan is not implemented. Its source content remains a future content decision, not a new or silently invented section.

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
    HomePage (localized Server Component)
      Hero
      FeaturedProjects -> ProjectCard -> next/image
      Services
      CTA
      FAQ -> FAQAccordion (Client)
  Footer (Server)
    Container
    Logo
    Navigation
    Contact and social links
```

`Navigation` is shared presentational markup. Its module is also included in the mobile client graph because it is imported by `MobileNavigation`; the server header and footer are not converted into client components. Header additionally renders a small `LanguageSwitcher` client boundary for the current pathname. Button renders a native action button, Next.js internal link, or ordinary external anchor based on its typed props.

## Project Structure

```text
app/
  globals.css
  robots.ts
  sitemap.ts
  [locale]/
    layout.tsx
    page.tsx
    [page]/
      page.tsx
      actions.ts
    portfolio/
      page.tsx
      [slug]/
        page.tsx
components/
  pricing/
    PricingPage.tsx
  seo/
    JsonLd.tsx
  contact/
    ContactPage.tsx
    ContactForm.tsx
  about/
    AboutIntro.tsx
    AboutProfile.tsx
    AboutApproach.tsx
  layout/
    Header.tsx
    Logo.tsx
    Navigation.tsx
    MobileNavigation.tsx
    LanguageSwitcher.tsx
    Footer.tsx
  home/
    Hero.tsx
    FeaturedProjects.tsx
    Services.tsx
    CTA.tsx
    FAQ.tsx
    FAQAccordion.tsx
    Home.module.css
  portfolio/
    ProjectCard.tsx
    ProjectGrid.tsx
    PortfolioIntro.tsx
    PortfolioContact.tsx
    CaseStudyHero.tsx
    CaseStudyDetails.tsx
    CaseStudyNavigation.tsx
  ui/
    Container.tsx
    Button.tsx
    GridBackground.module.css
content/
  about.ts
  pricing.ts
  site.ts
  projects.ts
  i18n/
    types.ts
    index.ts
    sr.ts
    en.ts
lib/
  contact.ts
  contact-validation.ts
  contact-delivery.ts
  i18n.ts
  routes.ts
  metadata.ts
  public-pages.ts
  legacy-redirects.ts
  seo-config.ts
  crawl.ts
  schema.ts
proxy.ts
public/
  logo/
  images/
  projects/
docs/
  frontend-agent.md
  implementation-plan.md
  migration-notes.md
  reference/
tests/
  pricing.spec.ts
  seo.spec.ts
  contact.spec.ts
  about.spec.ts
  foundation.spec.ts
  localization.spec.ts
  portfolio.spec.ts
  case-studies.spec.ts
```

No empty core-page routes are created. Implemented localized paths are declared in `lib/routes.ts`; unsupported locale/slug combinations still return 404. Services, About, Contact, Pricing, Portfolio, and the migrated portfolio slugs now have approved localized routes and legacy mappings where verified.

## Implementation Phases

1. Foundation: Next.js App Router, React, strict TypeScript, Tailwind, shared tokens, DM Sans, root layout, Container, Button, header, desktop/mobile navigation, footer, metadata defaults, minimal index, and focused browser checks.
2. Homepage and localization: real sections in the order above, intentional image migration, typed Serbian/English content, equivalent-route language switching, and localized metadata. Reuse Container and Button; do not add unused Section/SectionHeading abstractions.
3. Core pages: About, Services, Portfolio, Contact, and existing Pricing content. Preserve verified public URLs or agree replacements. Decide contact submission separately.
4. Case studies: typed project data, dynamic portfolio route, shared template. Leave unknown challenges, technologies, locations, and results optional.
5. Blog: repository content and article metadata only when actual content is available.
6. SEO and migration: complete URL inventory, per-page metadata, canonical review, approved redirects, sitemap, robots, useful structured data, social imagery, and favicon assets.
7. Quality and launch: responsive/a11y review, Lighthouse and image tuning, real-world Core Web Vitals follow-up, full link checks, staging protection, and deployment validation.

Phase 5 discovery (2026-09-09): no repository manuscripts or publicly published WordPress articles were found. The Blog page exists, but the posts API and RSS feed are empty. Implementation awaits approved article content; no empty blog pages or speculative content were added. See [Phase 5 discovery report](phase-5-report.md) for sources, the proposed architecture, and required content.

Phase 5A is the separately authorized localized About migration, not Blog implementation. Blog remains deferred. See [Phase 5A report](phase-5a-report.md).

Phase 5B adds localized Contact and the form foundation. No mail provider exists: validation is implemented, delivery is explicitly unavailable, and no message is reported as sent. See [Phase 5B report](phase-5b-report.md).

Phase 5C completes the localized Pricing migration, including explicit source exclusions and five published commercial questions. The implementation was finished during Phase 6's prerequisite review because only draft dictionaries existed. See [Phase 5C report](phase-5c-report.md).

Phase 6 adds the shared public URL inventory, refreshed metadata, published-only alternates, sitemap, host-aware crawl policy, explicit launch opt-in, safe JSON-LD and exact permanent legacy mappings. Current navigation has no WordPress fallback. Seven newly discovered older project URLs have no equivalent in the approved eight-project application; their retention/migration remains a pre-launch content decision. No visual polishing, Blog, new services route, contact delivery or deployment is included.

Phase 1 uses one icon library, Lucide, for consistent accessible control icons. Playwright and axe are development-only verification tools. No CMS, database, authentication, backend, state store, or animation library is introduced.

## Phase 1 Verification

- Strict type check, ESLint, and a production build.
- Browser checks at 320, 375, 768, 1024, 1440, and 1920px.
- Loaded logo images, no horizontal page overflow, and no runtime page errors.
- Keyboard skip link, menu opening/closing, focus return, outside dismissal, resize behavior, and operation with JavaScript disabled.
- Automated WCAG checks on desktop, mobile, and the open mobile menu, plus screenshot review.
- Correct Serbian language, production canonical, social metadata, and noindex on the incomplete homepage.

These checks cover the foundation; they do not establish whole-site accessibility or future production Core Web Vitals.

## Phase 2 Decisions

- Static `/sr/` and `/en/` share `app/[locale]/layout.tsx`. Root uses a temporary 307 redirect to Serbian. HTML language and SEO language alternates use `sr` and `en` as requested.
- A dependency-free server dictionary loader centralizes navigation, homepage text, FAQ, footer, image descriptions, accessibility labels, and metadata. Shared business facts remain outside translations.
- The language switcher uses equivalent route keys, not a universal homepage fallback. Future translated services/about/contact/pricing slugs and stable portfolio detail slugs are covered by mapping tests.
- A small native Next.js proxy rejects unsupported locales before static cache lookup. This is required by the observed production-server behavior on this case-insensitive development filesystem: `/SR/` otherwise served cached `/sr/` HTML. No language detection, cookies, redirects, or fetching are performed by the guard.
- The eight project identities/slugs are verified against the PDF and production homepage. No unknown project technologies, locations, outcomes, descriptions, or statistics are filled in.
- Preserve large inspectable screenshot frames: paired projects alternate with wide school and Frankultura entries. Screenshots use contain, never cover; hero and service images retain natural proportions.
- Retain Phase 1 tokens, fonts, Button, Container, and header/footer design. Light and dark grid lines live in the homepage CSS module. No animation dependency or reveal-on-scroll hiding is introduced.
- Mobile hero copy removes repeated wording, actions fit together at the requested phone widths, and the montage has a deliberate smaller mobile size. Tablet and desktop retain the reference's text/image composition.
- FAQ uses native buttons, linked panels, visible focus, and explicit expanded state. Server output shows all answers; the small client boundary enhances it to an accordion. There is no duplicated no-JavaScript markup or animated height transition.
- Both locale pages remain noindex even in production builds. Launch SEO work and all Phase 3 routes remain out of scope.

## Phase 3A Decisions

- Implement only the localized Portfolio indexes. Other core pages and all project detail routes remain unimplemented.
- Reuse the eight verified project entries and the shared ProjectCard. The index uses alternating 7/5 and 5/7 desktop pairs, equal tablet columns, and a single mobile column, preserving source order and complete screenshots.
- Keep page-specific intro/contact text and metadata in typed dictionaries. No project metadata is invented; optional fields render only when supplied.
- Move the existing grid-background CSS unchanged into a shared UI stylesheet. Homepage styling, composition, primitives, and interaction behavior are retained.
- Enable the Portfolio route in the registry and replace the homepage all-projects fallback. Header, mobile navigation, Footer, and language switching use existing shared APIs.
- Keep individual WordPress project destinations until actual case studies exist. ProjectCard accepts an explicit destination for that future change; it does not infer or generate detail routes.
- Use the shared metadata helper, with page-specific canonicals/alternates and unchanged noindex protection. Document the legacy Portfolio URL migration separately; do not implement a speculative redirect.

## Phase 4 Decisions

- Add one localized dynamic project route and statically generate the eight verified projects in both languages. Do not implement the unfinished core pages or begin Blog/launch phases.
- Extend the existing typed project model with verified client names, website URLs, available tools, and localized case-study overviews. Preserve the eight project names, slugs, and image assets.
- Record provenance in `docs/reference/project-content-sources.md`. Do not invent challenges, solutions, results, extra images, dates, or delivery scope; optional sections render only when supplied.
- Use a shared dark screenshot-led hero, light fact/narrative area, and back/next project navigation. Reuse all existing primitives, fonts, and grid/background tokens.
- ProjectCard links locally only for entries with case-study content; unpublished entries retain the source fallback. Keep homepage composition unchanged.
- Extend the metadata helper with a typed optional Portfolio slug, so detail pages get their own canonicals and language equivalents. Retain noindex and strict route validation before static-cache lookup.
- Keep DM Sans as the primary font, but use a system fallback instead of its automatic metric-adjusted Arial fallback: browser screenshots exposed blank Cyrillic glyphs in the newly verified school client name. A text-width regression assertion covers this case.

## Phase 5A Decisions

- Migrate the published About content into the existing typed dictionaries and translate it naturally into English. Retain the verified founder identity, unquantified experience statement, approach, and four mission principles without invented credentials or outcomes.
- Use a concise dark intro, a light founder profile with the published portrait, and an editorial mission list with one contact action. Preserve homepage, Portfolio, Header/Footer styling, primitives, and tokens.
- Generate `/sr/o-nama/` and `/en/about/` through `app/[locale]/[page]/page.tsx`. Only the matching About slug for each locale is published; the resolver and proxy reject unknown, incorrectly cased, and cross-locale slugs.
- Enable About in the route registry. Shared navigation and equivalent-page language switching require no component changes. Reuse the metadata helper and retain noindex/nofollow.
- Record the owner's confirmation of the existing Serbian phone/WhatsApp number and rejection of the Mexican number. Runtime contact data already uses the correct number and stays unchanged.
- Document `/about/` -> `/sr/o-nama/` for Phase 6, without implementing the redirect. Contact/Pricing fallbacks remain unchanged; Services remains a homepage anchor. Blog and Phases 6-7 remain outside scope.

## Phase 5B Decisions

- Migrate the published Contact introduction and direct-contact invitation. Use only `content/site.ts` for displayed email, telephone, and WhatsApp destinations. Keep the confirmed Serbian phone number; do not migrate rejected legacy contact data.
- Extend the shared translated core-page route to publish Contact alongside About. Centralize its allowlist in `corePageRoutes`/`corePageRoute` so static parameters, resolver, and proxy agree. Enable Contact in the existing registry; all shared navigation and CTA destinations update without markup changes.
- Use a dark intro and an unframed direct-contact/form layout, stacked on mobile. No new imagery, map, extra marketing section, or dependency is needed.
- Use a small ContactForm client boundary with native form controls, React useActionState, and a Server Action. Validate required name/email/message and optional phone on the server; preserve input and expose localized errors, pending, unavailable, error, and provider-acknowledged success states.
- The delivery adapter currently returns unavailable and performs no network request, logging, storage, or queue operation. Show an upfront unavailable notice and never display success for validation alone. A real provider, verified sender/recipient, operational spam controls, and delivery tests are required before enabling sending.
- Keep noindex/nofollow and localized metadata. Document `/contact/` -> `/sr/kontakt/` for Phase 6 without adding the redirect. Pricing remains the only WordPress navigation fallback; Blog and Phases 6-7 remain deferred.
