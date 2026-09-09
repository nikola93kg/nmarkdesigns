# Project Content Sources

Reviewed on 2026-09-09 for Phase 4. The existing NMark Designs project pages are the primary source for the facts below. All eight source pages returned HTTP 200 and their rendered document content was parsed before editing project data.

| Existing project page | Client as published | Published website destination | Published tools, normalized capitalization |
| --- | --- | --- | --- |
| [Buy Pallet Jacks](https://nmarkdesigns.com/portfolio/buy-pallet-jacks/) | Buy Pallet Jacks | https://buypalletjacks.com | Next.js, Vercel, Tailwind CSS |
| [Ilić Enterijer](https://nmarkdesigns.com/portfolio/ilic-enterijer/) | Ilić Enterijer | https://ilicenterijer.rs/ | Next.js, Vercel, Tailwind CSS |
| [OŠ Dule Karaklajić](https://nmarkdesigns.com/portfolio/os-dule-karaklajic/) | ОШ „Дуле Караклајић“ – Лазаревац | https://dulovaskola.edu.rs/ | WordPress, HTML, CSS, JavaScript |
| [Powder Brows Vienna](https://nmarkdesigns.com/portfolio/powder-brows-vienna/) | Jovana Ristic Makeup | https://www.powderbrowsvienna.com | Next.js, Tailwind CSS, TypeScript, Vercel |
| [Tripoli Sweets](https://nmarkdesigns.com/portfolio/tripolisweets/) | Tripoli Sweets | https://www.tripolisweets.com.mx | WordPress, HTML, CSS, JavaScript |
| [Frankultura](https://nmarkdesigns.com/portfolio/frankultura/) | Frankultura | https://www.frankultura.rs | WordPress, HTML, CSS, JavaScript |
| [CoolFridgeGuys](https://nmarkdesigns.com/portfolio/coolfridgeguys/) | CoolFridgeGuys | https://www.coolfridgeguys.com/ | Next.js |
| [LaDekor](https://nmarkdesigns.com/portfolio/ladekor/) | LaDekor | https://ladekor.rs/ | Not provided; omitted |

## Editorial Treatment

- Existing verified project titles, slugs, and screenshots are unchanged. The client field preserves the source name even where it differs from the project title, uses Cyrillic, or has different spelling/diacritics. It is not separately translated business information.
- `NextJS`, `Tailwind`, `Typescript`, `Wordpress`, and `Javascript` are normalized to their conventional product spellings. Combined `HTML/CSS/JS` entries are expanded to HTML, CSS, and JavaScript. No additional tools are inferred from the screenshots or the new NMark Designs stack.
- Each page contains a brief Serbian overview and an equivalent English translation. Subject descriptions come from already migrated screenshots/alt text: pallet jacks, custom furniture/kitchens, school presentation, eyebrow treatments, traditional desserts, French lessons, company presentation, and painting/decorating services. Lazarevac is explicitly part of the school's published client name. No project results or design-process claims are added.
- The project pages each reuse one image already registered in `docs/migration-notes.md`. No additional unique project screenshot was present in the inspected source pages. Logo/navigation images are not project gallery content.
- The source pages provide no challenge, solution, or results narratives. These remain optional in the model and absent from the rendered pages. Detailed delivery scope, dates, budgets, service lists, locations other than the school's explicit introductory reference, and measured results are not inferred.
- Website URLs are the destinations published by NMark Designs, not a claim that the client's current site has remained unchanged since delivery. They open in the same tab. No live-client screenshots or content are fetched at application runtime.
- Conflicting global contact numbers in the WordPress template were not migrated into project content or used to alter existing contact values. See the Phase 2.5 report.

## Migration Mapping

For each source slug in the table, the new application pages are `/sr/portfolio/{slug}/` and `/en/portfolio/{slug}/`. Slugs retain their exact existing spelling, including `coolfridgeguys` and `tripolisweets`.

The original WordPress URLs remain stored as `sourceUrl` provenance. Homepage and Portfolio links now open the local case-study page when `caseStudy` content is present. A project without published case-study content retains its source fallback and is not statically generated.

Legacy `/portfolio/{slug}/` compatibility requires an approved redirect or equivalent treatment before the production domain switch. No speculative redirects are implemented in Phase 4.
