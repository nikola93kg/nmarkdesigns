# NMark Designs — Frontend Agent

## Project Mission

This repository contains the new NMark Designs website.

The existing production website is being rebuilt from WordPress as a modern Next.js application.

This is a **REBUILD**, not a mechanical WordPress-to-React conversion.

The existing website and the reference materials in `docs/reference/` are the source of truth for:

* brand identity
* existing content
* visual direction
* existing projects
* existing services
* public-facing business information

The new implementation should preserve the recognizable identity of NMark Designs while improving the website technically and visually.

The final result should feel custom-designed, intentional, and professional.

It must **NOT** feel like:

* a generic Tailwind template
* a generic SaaS landing page
* an AI-generated agency website
* a WordPress theme converted into JSX

---

## Primary Reference

The current homepage reference is located in:

```text
docs/reference/nmarkdesigns-current-homepage.pdf
```

Always inspect the reference before redesigning an existing homepage section.

The reference should guide:

* visual hierarchy
* section structure
* content hierarchy
* brand colors
* typography direction
* portfolio presentation
* spacing
* overall aesthetic

Do **NOT** blindly reproduce WordPress limitations or accidental inconsistencies.

Preserve the identity.

Improve the implementation.

---

## Technology Stack

Use:

* Next.js
* App Router
* React
* TypeScript
* Tailwind CSS
* `next/image`
* `next/font`
* Next.js Metadata API

Prefer native Next.js and browser capabilities.

Do not add dependencies unless they provide clear value.

---

## Next.js Rules

Use App Router.

Prefer Server Components by default.

Use `"use client"` only when required for:

* React state
* effects
* browser APIs
* interactive UI
* event-driven client behavior

Keep client boundaries as small as possible.

Do not turn entire pages into Client Components because one child component requires interactivity.

---

## Project Architecture

Prefer the following structure:

```text
app/
├── layout.tsx
├── page.tsx
├── about/
├── services/
├── portfolio/
├── contact/
└── blog/

components/
├── layout/
├── home/
├── portfolio/
└── ui/

content/

lib/

public/
├── images/
├── projects/
└── logo/

docs/
└── reference/
```

Do not create new top-level directories without a clear architectural reason.

---

## Component Architecture

Components must have clear responsibilities.

Examples:

```text
components/layout/Header.tsx
components/layout/Footer.tsx

components/home/Hero.tsx
components/home/FeaturedProjects.tsx
components/home/Services.tsx
components/home/CTA.tsx
components/home/FAQ.tsx

components/portfolio/ProjectCard.tsx

components/ui/Button.tsx
components/ui/Container.tsx
components/ui/Section.tsx
```

Avoid monolithic page components.

`app/page.tsx` should primarily compose homepage sections rather than contain hundreds of lines of JSX.

Do not split components purely to reduce line count.

Split them when there is a meaningful responsibility boundary.

---

## Design Direction

NMark Designs uses a restrained, modern visual identity.

The existing visual language includes:

* white / light neutral surfaces
* very dark purple brand sections
* restrained accent colors
* generous whitespace
* strong typography
* large project imagery
* subtle grid/background patterns
* minimal borders
* restrained rounded corners
* simple professional CTAs

Preserve this direction.

Do not introduce unrelated:

* gradients
* neon colors
* glassmorphism
* excessive shadows
* oversized rounded cards
* decorative blobs
* generic SaaS illustrations

unless specifically requested.

---

## Design System

Use existing Phase 1 design tokens.

Recurring values should be represented through reusable tokens where practical.

This includes:

* brand colors
* neutral colors
* text colors
* container widths
* section spacing
* typography
* border radius
* borders
* shadows

Do not introduce slightly different versions of the same color or spacing throughout the application.

Consistency is more important than arbitrary pixel-perfect reproduction.

---

## Layout

Use the reusable `Container` component for page width and horizontal padding.

Do not manually repeat container styles throughout sections.

Major sections should have deliberate vertical rhythm.

Avoid excessive whitespace.

Avoid cramped layouts.

Desktop content should not stretch unnecessarily across ultra-wide screens.

---

## Responsive Design

Every section must be intentionally designed for:

* mobile
* tablet
* laptop
* desktop
* large desktop

Important reference widths:

* 375px
* 430px
* 768px
* 1024px
* 1440px
* 1920px

Do not simply shrink desktop layouts.

Explicitly consider:

* typography scaling
* line lengths
* grid collapse
* image proportions
* CTA placement
* navigation
* section spacing
* touch targets

There must be no horizontal overflow.

---

## Typography

Use the typography system established during Phase 1.

Use `next/font`.

Maintain a strong hierarchy between:

* H1
* H2
* H3
* body
* labels
* supporting text

Each page must contain one primary H1.

Use semantic heading levels.

Do not choose heading elements purely for visual styling.

Avoid arbitrary font sizes throughout individual components.

---

## Images

Use `next/image` for normal site imagery.

Always consider:

* intrinsic dimensions
* responsive sizing
* aspect ratio
* image quality
* loading priority
* meaningful alt text

Do not stretch images.

Do not use large unoptimized images when an optimized asset can be provided.

Above-the-fold images should receive appropriate loading priority only when necessary.

---

## Homepage

The homepage must evolve the existing NMark Designs homepage rather than replace it with a generic agency template.

The existing homepage contains important concepts that should be preserved or intentionally improved:

1. Header / navigation
2. Hero
3. Portfolio / selected work showcase
4. Service / value proposition content
5. Strong contact CTA
6. FAQ
7. Footer

The exact implementation may evolve, but removing major existing content requires an intentional reason.

Do not add sections simply because agency templates commonly contain them.

---

## Hero

The hero must immediately communicate:

* professional website design/development
* modern implementation
* performance
* SEO
* clear path toward contacting NMark Designs

Use existing business claims where appropriate.

Do not invent exaggerated marketing claims.

Avoid generic startup-style hero designs.

---

## Portfolio

Portfolio work is one of the most important parts of this website.

Give real project imagery enough visual space.

Do not reduce the portfolio to tiny generic cards.

Prefer strong visual presentation.

Portfolio content should eventually be data-driven.

Example:

```ts
export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  featuredImage: string;
  images?: string[];
  location?: string;
  services?: string[];
  technologies?: string[];
  websiteUrl?: string;
  challenge?: string;
  solution?: string;
  results?: string;
}
```

Store project data in an appropriate content module such as:

```text
content/projects.ts
```

Never invent:

* clients
* project results
* statistics
* technologies
* locations
* testimonials

Use only verified project information.

---

## Services

Services should be derived from real NMark Designs offerings.

Do not invent services simply to fill a layout.

Service content should be structured and reusable when appropriate.

Avoid six identical generic cards if a stronger editorial layout better matches the design.

---

## FAQ

The existing homepage contains an FAQ section.

Preserve FAQ content where it remains useful.

FAQ should be accessible.

If implemented as an accordion:

* keyboard interaction must work
* controls must use semantic buttons
* expanded state must be exposed accessibly
* content should remain usable without unnecessary animation

Do not invent FAQ answers.

---

## Calls To Action

CTAs should be clear and restrained.

Primary goals include:

* requesting a quote
* contacting NMark Designs
* viewing work

Avoid having many competing primary CTAs on the same screen.

Use consistent Button variants.

---

## Content Rules

Never invent business information.

Do not invent:

* testimonials
* awards
* number of clients
* number of projects
* revenue impact
* conversion improvements
* SEO results
* years of experience
* customer statistics
* guarantees

If information is unavailable:

* omit it
* keep the field optional
* or clearly report that content is needed

---

## Accessibility

Accessibility is mandatory.

Use semantic HTML.

Prefer:

```text
header
nav
main
section
article
footer
```

over unnecessary generic `div` wrappers.

Interactive controls must be keyboard accessible.

Never use a `div` as a fake button.

Maintain visible focus states.

Provide appropriate alt text.

Decorative images may use empty alt text.

Maintain reasonable contrast.

Respect `prefers-reduced-motion`.

---

## SEO

SEO is a first-class requirement.

Use Next.js Metadata API.

Important public pages should eventually define:

* title
* description
* canonical
* Open Graph metadata

Support:

* sitemap
* robots
* structured data where appropriate

Do not manually scatter SEO tags throughout UI components.

---

## WordPress Migration

The current WordPress website remains the production source during development.

Do not casually change existing public URLs.

Before replacing an existing URL:

1. identify the production URL
2. identify the new URL
3. determine whether a redirect is required
4. document the decision

Do not create speculative redirects.

Do not remove existing SEO-relevant content without considering migration impact.

---

## Preview Environment

Development and preview environments must not accidentally become indexable.

Production SEO settings should only apply when appropriate for the production environment.

Do not remove preview indexing safeguards without understanding the deployment environment.

---

## Performance

Aim for excellent Core Web Vitals and Lighthouse results.

Prefer:

* Server Components
* static rendering where appropriate
* optimized images
* minimal client JavaScript
* native browser capabilities
* lightweight components

Avoid:

* unnecessary JavaScript
* oversized libraries
* multiple icon libraries
* animation libraries for trivial transitions
* client-side fetching for static content

---

## Animation

Animation should be subtle.

Prefer CSS for:

* hover transitions
* opacity changes
* small transforms
* menu transitions

Do not introduce an animation library unless CSS is insufficient.

Avoid:

* scroll-jacking
* excessive parallax
* constant motion
* animated backgrounds that hurt readability
* animating every section on scroll

---

## TypeScript

Use strict TypeScript.

Do not use `any` unless there is an exceptional documented reason.

Create shared types when data structures are reused.

Do not duplicate identical interfaces throughout the project.

---

## State Management

Do not introduce:

* Redux
* Zustand
* MobX
* global Context stores

unless there is a genuine application requirement.

Most of this website should require little or no global client state.

---

## Dependencies

Before adding a dependency, ask:

1. Can Next.js already do this?
2. Can React already do this?
3. Can CSS or the browser already do this?
4. Can this be implemented cleanly without a dependency?
5. What does it add to the client bundle?

Do not install dependencies casually.

---

## Forms

Forms must be accessible.

Use:

* labels
* clear validation
* loading states
* success states
* error states

Do not invent backend integrations.

Contact form infrastructure will be implemented intentionally.

---

## Git Discipline

Make focused changes.

Do not refactor unrelated working code while implementing a feature.

Preserve established patterns unless there is a concrete reason to improve them.

Before significant architectural changes:

1. inspect existing implementation
2. explain the reason
3. identify affected files
4. make the smallest clean change

---

## Validation

After meaningful implementation work, validate with the project's available tooling.

At minimum, where available:

* production build
* TypeScript
* ESLint
* tests

For UI changes also inspect relevant responsive widths.

Do not claim validation passed unless it was actually run.

---

## Agent Workflow

Before implementing a substantial feature:

1. Read this `AGENTS.md`.
2. Inspect relevant existing code.
3. Inspect relevant documentation.
4. Inspect visual references when the task affects design.
5. Identify reusable existing components.
6. Plan the smallest coherent implementation.
7. Implement.
8. Validate.
9. Report what changed.

Do not rebuild working Phase 1 components unless required.

---

## Current Development Phases

### Phase 1 — Foundation

Includes:

* Next.js foundation
* global styles
* typography
* design tokens
* Container
* Button
* Header
* navigation
* mobile navigation
* Footer
* base metadata

**Phase 1 is complete.**

Do not unnecessarily rebuild it.

### Phase 2 — Homepage

Implement and refine the real homepage based on the reference design.

Expected areas:

* Hero
* portfolio / selected work
* services / value propositions
* CTA
* FAQ

Reuse Phase 1 components.

### Phase 3 — Core Pages

* Portfolio
* Services
* About
* Contact
* Pricing where required by existing site architecture

### Phase 4 — Portfolio Case Studies

* dynamic project routes
* structured project data
* reusable case-study layout

### Phase 5 — Content / Blog

Implement only if required by the final content strategy.

### Phase 6 — SEO Migration

* production metadata review
* sitemap
* robots
* structured data
* URL inventory
* redirect mapping
* canonical review

### Phase 7 — Quality / Launch

* responsive QA
* accessibility review
* Lighthouse
* Core Web Vitals
* production deployment
* redirect validation
* analytics/search verification

---

## Final Rule

When there is a conflict between:

* generic web-design conventions
* the existing NMark Designs identity

prefer the NMark Designs identity unless there is a concrete usability, accessibility, performance, or technical reason to improve it.

Improve deliberately.

Do not redesign merely for the sake of redesigning.
