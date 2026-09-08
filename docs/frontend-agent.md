# NMark Designs Frontend Agent Guidelines

This repository contains the Next.js version of the NMark Designs website.

The website is being rebuilt from an existing WordPress website.

The current production website may be used as a visual and content reference, but WordPress implementation details should NOT be replicated unless they represent useful behavior.

The objective is to create a clean, modern, maintainable, high-performance Next.js application.

---

# Core Stack

Use:

* Next.js
* App Router
* React
* TypeScript
* Tailwind CSS
* next/image
* next/font
* Next.js Metadata API

Prefer native Next.js and browser capabilities over additional dependencies.

Do not introduce dependencies without a clear benefit.

---

# General Engineering Philosophy

Prioritize:

1. readability
2. maintainability
3. accessibility
4. performance
5. SEO
6. visual consistency
7. developer experience

Avoid clever solutions when simple solutions are sufficient.

Do not overengineer.

Do not create abstractions before they are useful.

---

# Next.js Architecture

Use App Router.

Prefer Server Components by default.

Use `"use client"` only when a component actually requires:

* React state
* effects
* browser APIs
* event-driven client interaction
* client-side libraries

Do not convert large component trees into Client Components unnecessarily.

Keep client boundaries small.

---

# Folder Structure

Prefer the following organization:

app/
layout.tsx
page.tsx

about/
services/
portfolio/
contact/
blog/

components/
layout/
home/
portfolio/
ui/

content/

lib/

public/
images/
projects/
logo/

docs/
reference/

Do not create new top-level folders without a clear architectural reason.

---

# Component Architecture

Components should have a clear responsibility.

Good:

components/layout/Header.tsx

components/home/Hero.tsx

components/portfolio/ProjectCard.tsx

components/ui/Button.tsx

Bad:

components/HomePageEverything.tsx

Avoid large monolithic components.

As a guideline, review components that become larger than approximately 150–200 lines and split them when meaningful.

Do not split components merely to reduce line count.

---

# UI Components

Reusable UI primitives belong in:

components/ui/

Examples:

* Button
* Container
* Section
* SectionHeading
* Badge
* Card

Page-specific components should not be placed in `ui`.

---

# Layout Components

Site-wide components belong in:

components/layout/

Examples:

* Header
* Navigation
* MobileNavigation
* Footer

---

# Page Sections

Homepage-specific sections belong in:

components/home/

Example:

components/home/Hero.tsx
components/home/Services.tsx
components/home/FeaturedProjects.tsx
components/home/CTA.tsx

Pages should mostly compose sections rather than contain hundreds of lines of markup.

---

# TypeScript

Use TypeScript strictly.

Do not use `any` unless there is an exceptional, documented reason.

Prefer explicit types for structured data.

Example:

```ts
export interface Project {
  slug: string;
  title: string;
  client?: string;
  location?: string;
  category: string;
  services: string[];
  description: string;
  featuredImage: string;
  websiteUrl?: string;
}
```

Do not duplicate identical type definitions.

Place shared types in an appropriate shared location.

---

# Content

Static website content should initially live inside the repository.

Prefer typed structured data.

Example:

content/projects.ts

content/services.ts

content/testimonials.ts

Avoid scattering repeated business content across many components.

Do not invent client information, statistics, testimonials, project results, or business claims.

If information is unavailable, use a clearly marked placeholder or leave the field optional.

---

# Styling

Use Tailwind CSS.

Avoid inline style objects unless there is a strong technical reason.

Avoid custom CSS for things Tailwind handles cleanly.

Global CSS should contain:

* CSS variables
* typography defaults
* global resets if necessary
* truly global styling

Do not place page-specific styling in global CSS.

---

# Design System

Recurring visual values should be expressed as reusable tokens when practical.

Examples:

* brand colors
* neutral colors
* background colors
* container widths
* border radii
* shadows
* typography scale
* spacing conventions

Do not randomly introduce slightly different colors or spacing values across components.

Visual consistency is more important than pixel-perfect duplication of accidental inconsistencies from the old WordPress website.

---

# Visual Reference

The project may contain screenshots or PDFs of the current NMark Designs website inside:

docs/reference/

Use these assets as the primary visual reference when rebuilding existing pages.

When interpreting the design:

Preserve:

* visual identity
* hierarchy
* recognizable brand elements
* important layout ideas
* overall aesthetic

Improve:

* responsiveness
* spacing consistency
* typography
* accessibility
* visual rhythm
* maintainability

Do not blindly reproduce obvious WordPress layout limitations.

---

# Responsive Design

Every component must be intentionally responsive.

Design for:

* mobile
* tablet
* desktop
* large desktop

Do not rely solely on shrinking desktop layouts.

Avoid hardcoded widths that break on smaller screens.

Prefer responsive grids and flexible containers.

Check long headings and text wrapping.

Navigation must have a proper mobile solution.

---

# Containers

Use a reusable Container component rather than manually repeating:

max-width
margin auto
horizontal padding

throughout the application.

Example usage:

```tsx
<Container>
  ...
</Container>
```

---

# Sections

Use consistent vertical spacing across major page sections.

Prefer reusable section patterns where appropriate.

Example:

```tsx
<Section>
  <Container>
    ...
  </Container>
</Section>
```

Do not create visually inconsistent spacing from section to section without intentional design reasoning.

---

# Typography

Use `next/font`.

Avoid loading fonts through external CSS when Next.js font optimization can handle them.

Maintain a clear hierarchy for:

* H1
* H2
* H3
* body text
* small text
* labels

Avoid arbitrary font sizes in every component.

---

# Images

Use `next/image` unless there is a strong reason not to.

Always define appropriate:

* alt text
* sizing
* aspect ratio
* responsive behavior

Use `fill` only when the parent layout supports it correctly.

Avoid distorted images.

Prefer WebP or AVIF assets where practical.

---

# Accessibility

Accessibility is mandatory.

Use semantic HTML.

Examples:

Use:

nav
main
section
article
header
footer

instead of unnecessary div wrappers.

Interactive elements must be keyboard accessible.

Never use a `div` as a fake button.

Buttons should use `<button>`.

Navigation links should use Next.js `<Link>`.

Images should have meaningful alt text.

Decorative imagery may use empty alt text.

Maintain visible keyboard focus styles.

Respect reasonable color contrast.

---

# Heading Structure

Each page should have one primary H1.

Use heading levels logically.

Do not choose heading elements purely for styling.

Example:

H1 — page title

H2 — major sections

H3 — subsection/card headings

---

# SEO

SEO is a first-class requirement.

Use the Next.js Metadata API.

Every important public page should eventually define:

* title
* description
* canonical URL
* Open Graph metadata

Do not manually place SEO tags in random components.

SEO helpers may live inside:

lib/metadata.ts

The site should also support:

app/sitemap.ts

app/robots.ts

Structured data helpers may live inside:

lib/schema.ts

---

# Existing WordPress URLs

This website replaces an existing production WordPress website.

Never rename or remove production URLs casually.

Before changing an existing URL:

1. identify the current URL
2. identify the replacement URL
3. determine whether a redirect is required

Do not create speculative redirect rules.

Migration redirects should eventually be documented.

---

# Performance

Performance is important.

Prefer:

* Server Components
* optimized images
* minimal JavaScript
* code splitting
* static rendering when appropriate

Avoid:

* unnecessary animation libraries
* large UI libraries
* multiple icon libraries
* large runtime dependencies
* unnecessary client-side fetching

Do not add a dependency for functionality that can reasonably be implemented with a few lines of code.

---

# Animation

Animations should support the design.

They should not dominate the experience.

Prefer subtle:

* hover effects
* fades
* small translations
* menu transitions

Avoid:

* excessive parallax
* constant movement
* long animations
* animation on every element
* scroll-jacking

Respect reduced-motion preferences.

---

# Portfolio

Portfolio projects should be data-driven.

Prefer structured project data instead of manually duplicating layout for every project.

Expected project shape may include:

```ts
interface Project {
  slug: string;
  title: string;
  client?: string;
  location?: string;
  category: string;
  services: string[];
  description: string;
  featuredImage: string;
  images?: string[];
  websiteUrl?: string;
  technologies?: string[];
  challenge?: string;
  solution?: string;
  results?: string;
}
```

Individual project pages should eventually be generated through:

app/portfolio/[slug]/page.tsx

Do not create separate hardcoded React page components for every project unless there is a strong reason.

---

# Links

Use Next.js `Link` for internal navigation.

Use normal anchors for external URLs when appropriate.

External links opening in a new tab must include appropriate security attributes.

---

# Forms

Keep forms simple.

Do not introduce complex form libraries unless the form complexity justifies them.

Always provide:

* labels
* clear error states
* loading state
* success state
* keyboard accessibility

Backend/contact form integration will be decided separately.

Do not invent an API implementation.

---

# State Management

Do not introduce Redux, Zustand, MobX, Context stores, or similar global state-management systems unless there is a genuine application requirement.

Most of this website should not require global state.

Local UI state is preferred.

---

# Data Fetching

Do not use client-side fetching for static site content.

Prefer static content or Server Components.

If remote data is introduced later, follow Next.js server-side data-fetching patterns where appropriate.

---

# Dependencies

Before installing a dependency, consider:

1. Can Next.js already do this?
2. Can the browser already do this?
3. Can this be implemented cleanly in a few lines?
4. Is this dependency actively maintained?
5. Does it significantly increase the client bundle?

Avoid unnecessary dependencies.

---

# Icons

Use one consistent icon solution.

Do not install multiple icon libraries.

Prefer lightweight solutions.

---

# Git / Change Discipline

Make focused changes.

Do not refactor unrelated files while implementing a specific feature.

Do not rewrite working components merely to change personal coding style.

Preserve established project patterns unless there is a meaningful reason to improve them.

---

# Before Implementing a Large Feature

Before making significant architectural changes:

1. inspect the current implementation
2. understand existing patterns
3. identify affected components
4. explain the proposed approach
5. make the smallest clean change that solves the requirement

---

# Do Not

Do not:

* generate the entire website in one giant step
* create dozens of placeholder pages
* invent business data
* invent portfolio results
* introduce a CMS without being asked
* introduce a database without being asked
* introduce authentication without being asked
* use `any`
* use excessive `"use client"`
* build large monolithic components
* use unnecessary dependencies
* create inaccessible interactive UI
* duplicate existing reusable components
* casually change existing public URLs

---

# Development Workflow

Build incrementally.

Preferred sequence:

## Phase 1 — Foundation

* project setup
* typography
* global styling
* design tokens
* Container
* Button
* Header
* navigation
* mobile navigation
* Footer

## Phase 2 — Homepage

* Hero
* services
* project showcase
* about preview
* testimonials if applicable
* CTA

## Phase 3 — Core Pages

* Services
* Portfolio
* About
* Contact

## Phase 4 — Portfolio Case Studies

* dynamic project route
* project content model
* case-study template

## Phase 5 — Blog

* content architecture
* article pages
* metadata

## Phase 6 — SEO / Migration

* metadata review
* canonical URLs
* sitemap
* robots
* structured data
* old URL inventory
* redirects

## Phase 7 — Quality

* responsive review
* accessibility audit
* Lighthouse optimization
* performance cleanup
* production deployment validation

---

# Final Principle

The website should feel custom-designed and intentionally engineered.

It should not feel like:

* a generic Tailwind template
* an AI-generated landing page
* a WordPress theme converted into JSX

Preserve the identity of NMark Designs while using the migration as an opportunity to improve the website technically and visually.
