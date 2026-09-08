# Migration Notes

Inspection date: 2026-09-08. Primary visual reference: `docs/reference/nmarkdesigns-current-homepage.pdf`. Secondary content/URL reference: https://nmarkdesigns.com/.

## Initial URL Findings

This is a focused initial inspection, not a complete crawl or redirect map. Responses were checked with redirects followed.

| Existing destination | Observed status | Current treatment |
| --- | --- | --- |
| `/` | 200 | Local foundation index |
| `/portfolio/` | 200 | Link to production until migrated |
| `/all-services/` | 200 | Preserve existing destination; do not silently rename to `/services/` |
| `/about/` | 200 | Link to production until migrated |
| `/contact/` | 200 | Use existing header destination |
| `/cenovnik/` | 200 | Keep the existing pricing destination |
| `/portfolio/coolfridgeguys/` | 200 | Preserve slug unless a replacement and redirect are explicitly agreed |
| `/usluge` | 404 | Broken link found in existing footer markup; not copied |
| `/kontakt` | 404 | Broken link found in existing footer markup; not copied |

The live page also links `/faqs` and other portfolio slugs. Inventory these and all indexed WordPress pages, posts, archives, media URLs, query-based URLs, and backlinks before launch. A successful HTTP response does not prove page content is complete or suitable for migration.

No business URL redirects are implemented. Next.js trailing-slash behavior matches the verified production page convention. The proposed `/portfolio/cool-fridge-guys` example is not the existing project slug.

## Content Decisions

- Keep Serbian Latin content (`lang="sr-Latn"`) and use the matching Serbian Open Graph locale. The current document's English language declaration does not match its content.
- Use `info@nmarkdesigns.com` and `+381 64 300 5654`, matching the PDF footer and its live links.
- Use the existing Instagram account and Serbian-number WhatsApp destination from the footer. Elsewhere, the live site displays `+52 984 137 1132`; confirm the preferred number before launch.
- Do not migrate live-markup ratings or customer totals without evidence. The PDF does not establish their authenticity.
- No testimonials, business results, technologies, locations, legal business details, or client outcomes have been invented.
- Pricing and some other production pages contain apparent theme-demo content. Review actual intended copy rather than importing their complete DOM.
- Homepage copy in Phase 1 is a brief existing business description, not completed homepage content.

## Asset Register

| Source | Local destination | Treatment |
| --- | --- | --- |
| `docs/reference/logo/22.png` | `public/logo/nmark-wordmark.png` | Unmodified copy for the header |
| `docs/reference/logo/1.png` | `public/logo/nmark-seal.png` | Unmodified copy for the footer on a white circle |
| `docs/reference/logo/2.png` | Not migrated | Alternate supplied logo retained as reference |
| Homepage PDF | Remains under `docs/reference/` | Visual reference only |
| WordPress project/hero images | Not migrated | Review source quality and usage before importing |

Both migrated logos render through `next/image` with explicit intrinsic dimensions and responsive display sizes. The wordmark is preloaded; the footer seal uses default lazy loading. No WordPress media host is permitted in the image configuration and no live media is hotlinked.

## Launch Work Still Required

- Replace temporary production links with implemented local routes; otherwise they could link back to missing pages after a domain switch.
- Complete real homepage and core page content before removing the explicit homepage `noindex, nofollow` setting.
- Add environment-appropriate staging crawl protection as soon as deployment is introduced. The current setting covers the single unfinished index only.
- Review titles, descriptions, canonicals, trailing slashes, Open Graph/social images, and image alt text per public page.
- Generate sitemap entries only for actual indexable pages. Add robots and structured data using verified business information.
- Establish redirects from a complete inventory and approved destinations; do not infer mappings merely from similar names.
- Confirm contact details and social destinations, implement and test the agreed contact delivery method, and migrate relevant privacy/legal content.
- Migrate optimized project imagery, favicon, and social images intentionally; retain originals and source records.
- Review analytics/search verification requirements and existing integrations before replacing WordPress.
- Measure the completed site with Lighthouse, then evaluate field Core Web Vitals after launch. The foundation alone cannot establish final scores.
