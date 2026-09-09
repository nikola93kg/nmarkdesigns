# Migration Notes

Inspection date: 2026-09-08. Primary visual reference: `docs/reference/nmarkdesigns-current-homepage.pdf`. Secondary content/URL reference: https://nmarkdesigns.com/.

## Initial URL Findings

This is a focused initial inspection, not a complete crawl or redirect map. Responses were checked with redirects followed.

| Existing destination | Observed status | Current treatment |
| --- | --- | --- |
| `/` | 200 | Local root redirects to `/sr/`; `/en/` is the translated homepage |
| `/portfolio/` | 200 | Phase 3A replaces index links with `/sr/portfolio/` and `/en/portfolio/`; legacy URL redirect remains a launch decision |
| `/all-services/` | 200 | Navigation uses localized homepage anchor; future `/sr/usluge/` and `/en/services/` need approved launch mappings |
| `/about/` | 200 | Link to production until migrated |
| `/contact/` | 200 | Use existing header destination |
| `/cenovnik/` | 200 | Keep the existing pricing destination |
| `/portfolio/coolfridgeguys/` | 200 | Preserve slug unless a replacement and redirect are explicitly agreed |
| `/usluge` | 404 | Broken link found in existing footer markup; not copied |
| `/kontakt` | 404 | Broken link found in existing footer markup; not copied |

The live page also links `/faqs` and other portfolio slugs. Inventory these and all indexed WordPress pages, posts, archives, media URLs, query-based URLs, and backlinks before launch. A successful HTTP response does not prove page content is complete or suitable for migration.

No business URL redirects are implemented. Next.js trailing-slash behavior matches the verified production page convention. The proposed `/portfolio/cool-fridge-guys` example is not the existing project slug.

## Content Decisions

- Keep Serbian Latin content. Phase 2 uses the requested `lang="sr"` and `sr` hreflang, plus `sr_RS` for Open Graph. English uses `en` and `en_US`; neither page inherits an incorrect language declaration.
- Use `info@nmarkdesigns.com` and `+381 64 300 5654`, matching the PDF footer and its live links.
- Use the existing Instagram account and Serbian-number WhatsApp destination from the footer. Elsewhere, the live site displays `+52 984 137 1132`; confirm the preferred number before launch.
- Do not migrate live-markup ratings or customer totals without evidence. The PDF does not establish their authenticity.
- No testimonials, business results, technologies, locations, legal business details, or client outcomes have been invented.
- Pricing and some other production pages contain apparent theme-demo content. Review actual intended copy rather than importing their complete DOM.
- Phase 2 replaces the minimal Phase 1 index with the actual homepage flow. Serbian copy and all five FAQ answers derive from production; English is a faithful edited translation, without additional claims. Repeated hero wording is shortened for mobile readability.
- The initial standalone Process proposal is deferred to preserve the user's explicit Phase 2 section flow. No testimonials, statistics, process cards, or logo strip are added.

## Asset Register

| Source | Local destination | Treatment |
| --- | --- | --- |
| `docs/reference/logo/22.png` | `public/logo/nmark-wordmark.png` | Unmodified copy for the header |
| `docs/reference/logo/1.png` | `public/logo/nmark-seal.png` | Unmodified copy for the footer on a white circle |
| `docs/reference/logo/2.png` | Not migrated | Alternate supplied logo retained as reference |
| Homepage PDF | Remains under `docs/reference/` | Visual reference only |
| WordPress project/hero images | See Phase 2 register below | Intentionally migrated from verified source URLs |

Both migrated logos render through `next/image` with explicit intrinsic dimensions and responsive display sizes. Phase 2 reserves image preload for the hero; other images use default lazy loading. No WordPress media host is permitted in the image configuration and no live media is hotlinked.

### Phase 2 Image Sources

All source paths below are relative to `https://nmarkdesigns.com/wp-content/uploads/`. Originals were downloaded at full available size, inspected against the reference, and encoded as WebP at quality 88 with the existing Next.js Sharp installation. Resizing never enlarges the source. `next/image` supplies responsive derivatives. No image-generation or new runtime dependency is involved.

| WordPress source path | Local destination | Dimensions | Bytes |
| --- | --- | --- | --- |
| `2025/02/1739729571591-copy.jpg` | `public/images/hero-montage.webp` | 1365 x 1100 | 136842 |
| `2025/02/pexels-pixabay-4596531-min-scaled.jpg` | `public/images/website-maintenance.webp` | 1440 x 1202 | 264404 |
| `2026/05/bpj-covers.png` | `public/projects/buy-pallet-jacks.webp` | 1536 x 1024 | 155406 |
| `2026/03/Screenshot-2026-03-12-095334.png` | `public/projects/ilic-enterijer.webp` | 1894 x 868 | 69832 |
| `2026/03/Screenshot-2026-03-12-095240.png` | `public/projects/os-dule-karaklajic.webp` | 1877 x 868 | 254214 |
| `2025/12/Screenshot-2025-12-28-234830.png` | `public/projects/powder-brows-vienna.webp` | 1883 x 867 | 54220 |
| `2025/12/Screenshot-2025-12-15-223234.png` | `public/projects/tripolisweets.webp` | 1890 x 940 | 119668 |
| `2025/12/Screenshot-2025-12-15-145503.png` | `public/projects/frankultura.webp` | 1351 x 827 | 79028 |
| `2025/10/Screenshot-2025-10-29-214811.png` | `public/projects/coolfridgeguys.webp` | 1436 x 850 | 93802 |
| `2025/09/Screenshot-2025-09-22-113259.png` | `public/projects/ladekor.webp` | 1307 x 679 | 76464 |

The eight projects preserve the production slugs recorded in `content/projects.ts`. Do not rename `coolfridgeguys` to `cool-fridge-guys` or `tripolisweets` to `tripoli-sweets` without an approved redirect. Phase 4 verifies client names, website destinations, and available technology lists from the original project pages; see [project content sources](reference/project-content-sources.md). Other missing metadata and narratives remain omitted.

## Localization and Temporary Destinations

The implemented public pages are `/sr/`, `/en/`, both localized Portfolio indexes, and both locale versions of the eight project details. `/` temporarily redirects to `/sr/` (307). This is the explicitly requested root behavior, not a final WordPress migration redirect decision. Trailing slashes remain consistent. Unsupported locale segments and unpublished project slugs, including uppercase variants, return 404 rather than rendering arbitrary content.

`lib/routes.ts` enables the Portfolio index and declares future equivalents for services (`usluge`/`services`), about (`o-nama`/`about`), contact (`kontakt`/`contact`), and pricing (`cenovnik`/`pricing`). Those other core pages do not exist yet. Switch targets use the shared mapping; no browser-language detection, localStorage, or locale cookie is used.

Portfolio navigation and the homepage all-projects action point to the localized Portfolio index. Project links now open localized detail pages; their verified client-site links remain external. Services navigation retains the localized homepage anchor. About/Contact/Pricing retain the Serbian WordPress destinations even from English pages. These remaining fallbacks must be resolved before the domain switch.

Each page/locale has its own production canonical, translated title/description, Open Graph locale, Twitter metadata, and `sr`, `en`, `x-default` alternates. `x-default` points to the equivalent Serbian page. Homepage social metadata uses the migrated montage; Portfolio uses the first verified project image with its localized alt text. Final social cropping and production availability must be checked at launch. Preview and production builds both remain `noindex, nofollow` until launch protection is intentionally redesigned.

### Phase 3A Portfolio URL Decision

- Existing production index: `https://nmarkdesigns.com/portfolio/`.
- New application indexes: `/sr/portfolio/` and `/en/portfolio/`.
- Only index navigation is replaced now. All eight project links still use their existing `sourceUrl` values on WordPress, in the same tab. No local detail routes are generated.
- Preserving the legacy `/portfolio/` URL will require an approved launch redirect or equivalent compatibility treatment before the domain switch. No redirect is implemented during Phase 3A; the unlocalized path still returns 404 in the new application.
- The Portfolio image preload is limited to its first project; remaining projects retain lazy loading. Existing homepage loading behavior is unchanged.

### Phase 4 Project URL Decision

- The Phase 3A project-link fallback above is superseded: `/portfolio/{slug}/` source links now correspond to `/sr/portfolio/{slug}/` and `/en/portfolio/{slug}/` in application navigation.
- All eight existing slugs remain unchanged. Only entries with a `caseStudy` object generate local detail pages; `sourceUrl` remains source provenance and a fallback for future unready entries.
- Legacy unlocalized project URLs still return 404 in the new application. An approved redirect or equivalent compatibility treatment is required before launch, but none is implemented speculatively now.
- Metadata uses each project's localized overview, screenshot, and slug-specific canonical/alternates. All detail pages remain `noindex, nofollow`.
- Unknown and incorrectly cased project paths are rejected before the static cache. This prevents case-insensitive filesystem lookup from serving a differently cased URL as valid.
- One existing screenshot is preloaded on each detail page. No new project imagery was discovered or invented; optional galleries and challenge/solution/results sections stay absent until verified content is supplied.

## Launch Work Still Required

- Replace temporary production links with implemented local routes; otherwise they could link back to missing pages after a domain switch.
- Complete core page content and launch review before removing the explicit `noindex, nofollow` setting on both locale homepages.
- Add environment-appropriate staging crawl protection as soon as deployment is introduced. Keep previews protected when production indexing is enabled; never use `NODE_ENV=production` alone as the indexing gate.
- Review titles, descriptions, canonicals, trailing slashes, Open Graph/social images, and image alt text per public page.
- Generate sitemap entries only for actual indexable pages. Add robots and structured data using verified business information.
- Establish redirects from a complete inventory and approved destinations; do not infer mappings merely from similar names.
- Confirm contact details and social destinations, implement and test the agreed contact delivery method, and migrate relevant privacy/legal content.
- Preserve the WordPress media backup and the source register above; original downloads used during development live in temporary storage, not the repository. Favicon assets, final social-image treatment, and additional case-study imagery still need review.
- Review analytics/search verification requirements and existing integrations before replacing WordPress.
- Measure the completed site with Lighthouse, then evaluate field Core Web Vitals after launch. The foundation alone cannot establish final scores.
