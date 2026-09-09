# Phase 5 Content Discovery

Started: 2026-09-09. Status: discovery complete; implementation awaits real article content. Phase 5 is not complete.

## Verified Sources

The repository contains homepage dictionaries and project content, but no article manuscripts or blog assets. The following public production endpoints were fetched and inspected on 2026-09-09:

| Source | Observation |
| --- | --- |
| [Blog](https://nmarkdesigns.com/blog/) | HTTP 200; introductory English copy about social media marketing, but no article entries or article links |
| [Published posts API](https://nmarkdesigns.com/wp-json/wp/v2/posts?per_page=100) | HTTP 200; empty JSON array |
| [RSS feed](https://nmarkdesigns.com/feed/) | HTTP 200; valid XML with zero `item` elements |
| [Published pages API](https://nmarkdesigns.com/wp-json/wp/v2/pages?per_page=100&_fields=slug,link,title) | Nine page records: Home, About, Services, Portfolio, Maintenance Mode, Contact, Blog, Cenovnik, and another Portfolio; no apparent article pages |
| [Public content types](https://nmarkdesigns.com/wp-json/wp/v2/types) | Posts and existing portfolio content are exposed; no separate apparent article type |

These checks establish that no public articles were found, not that private drafts or unpublished manuscripts do not exist. The generic blog introduction is not sufficient evidence for a new social-media service offering or the intended editorial strategy and has not been migrated.

The production Blog page also repeats the previously documented conflicting phone values, `+52 984 137 1132` and `+381 64 300 5654`. Neither has been changed in the application.

## Implementation Decision

The implementation plan explicitly conditions Phase 5 on actual content being available. No placeholder articles, empty public blog routes, speculative article metadata, navigation links, or unused content framework have been added. Existing Phase 1-4 behavior remains unchanged. No dependency was added.

Before implementation, supply at least one approved article or identify another authoritative source. Each article needs its Serbian manuscript, title, intended slug, and any image assets with permission to use them. English can be translated from that source. Author credit and publication/update dates should be supplied where intended; they will not be fabricated.

## Proposed Architecture Once Content Is Available

- Use `app/[locale]/blog/page.tsx` and `app/[locale]/blog/[slug]/page.tsx` as Server Components, with published articles statically generated and unknown/unpublished slugs rejected.
- Store strongly typed repository content under `content/`, separate from localized interface labels in the existing dictionaries. Choose a simple body representation based on the actual manuscripts rather than introducing MDX or a CMS in advance.
- Give articles a stable content identity with explicit locale variants and equivalent slugs. The language switcher and metadata alternates must only reference published translations, never nonexistent pages.
- Reuse Container, typography, colors, image patterns, and shared layout. Keep article reading widths constrained and use semantic headings, lists, links, and figures as required by the content.
- Extend the route registry and metadata helper for blog indexes and article equivalents. Use article Open Graph metadata with verified optional author/date fields and retain all existing noindex safeguards.
- Validate both languages, unknown routes, language switching, metadata, keyboard access, no-JavaScript reading, images, and overflow across the established viewport matrix. Run the existing regression suite alongside focused article checks.

## Migration Boundary

The existing production index is `/blog/`; the proposed replacements are `/sr/blog/` and `/en/blog/`. No replacement has been published or redirect implemented. The launch treatment of `/blog/` must be explicitly approved during migration review. No legacy article URLs were found in this audit; future source articles require their own URL inventory.

## Files and Validation

Created this discovery report and added a Phase 5 status note to `docs/implementation-plan.md`. Application code, routes, content, assets, navigation, and SEO output were not changed.

Public-source HTTP/content checks were executed as described above. `git diff --check` passed. Production build, TypeScript, ESLint, browser layout checks, and the regression suite were not rerun for this documentation-only change; previous Phase 4 results are historical, not Phase 5 validation.
