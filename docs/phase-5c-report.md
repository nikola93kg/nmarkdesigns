# Phase 5C Pricing Migration

Completed alongside the Phase 6 prerequisite check on 2026-09-09. The workspace contained draft pricing dictionaries but no Pricing implementation or report when Phase 6 began. The previously authorized Pricing work was completed to provide real migration destinations. No Blog or Contact delivery work was added.

## Source and Commercial Content

Reviewed the [production Pricing page](https://nmarkdesigns.com/cenovnik/), its public WordPress page data, and the actual feature-list icon markup. Serbian is the source language. Prices and package names are shared in `content/pricing.ts`; descriptions, included/excluded features and terms use the existing typed dictionaries.

| Package | Published price | Included services | Explicit exclusion |
| --- | --- | --- | --- |
| Basic plan | 450 € | Up to 15 days; website optimization; up to five pages; blog creation; basic SEO; content creation; responsive design | Online-store development |
| Standard Plan | 650 € | Up to 20 days; website optimization; multilingual support; blog creation; editing up to 20 images; basic SEO; content creation; responsive design | Online-store development |
| Premium plan | 1.000 € | Up to 30 days; website optimization; multilingual support; advanced SEO; automated payment system (PayPal, Stripe, etc.); maintenance; personalized design/custom functionality; responsive design; online-store development; advanced analytics/reports | None listed |

The Basic and Standard source lists use minus-square icons for online-store development. The initial text-only draft lost this distinction; the finished page displays an explicit localized exclusion. Premium uses a check mark for that service.

All five source questions/answers are preserved in Serbian with natural equivalent English wording: indicative prices may be lower for simpler work; delivery periods begin after receipt of required materials; 50% advance and 50% before handover; maintenance billing by prior agreement; domain/hosting arranged by NMark Designs but paid separately; non-refundable advance on cancellation and the published nonpayment condition. These are published terms, not newly invented guarantees.

The source also contains an unrelated English annual-price panel (Personal $999, Professional $1600, Expert $2600), discount badges, Monthly/Yearly toggle, and theme-demo copy. These were omitted. No billing interval is attached to the Serbian euro amounts because the mixed toggle does not establish a reliable recurring unit. Maintenance duration/scope, tax treatment and any optional-extra prices are not specified. Confirm those ambiguities and current commercial terms before launch.

## Implementation

New files: `content/pricing.ts`, `components/pricing/PricingPage.tsx`, `tests/pricing.spec.ts`, this report.

Modified for Pricing: `content/i18n/types.ts`, `sr.ts`, `en.ts`; `lib/routes.ts`; `app/[locale]/[page]/page.tsx`; existing About/Contact/Portfolio tests; README, implementation plan and migration notes. Phase 6 edits to these shared files are recorded separately.

One Server Component serves `/sr/cenovnik/` and `/en/pricing/`. The core-page allowlist drives generation, resolution and public route inventory. Header, mobile navigation, Footer and homepage Pricing links update through the registry. All four Pricing enquiry CTAs use localized Contact without query parameters or form changes.

Unframed editorial package rows reuse Container, Button, typography and dark grid intro. Mobile stacks packages in source order. Features are semantic lists; package names are H2 headings and prices are ordinary readable text. Five always-visible commercial questions use H3 headings under an H2, requiring no accordion JavaScript. No dependency, stock asset, pricing switch, badge or additional client boundary was added.

Serbian source package-name capitalization and euro formatting are preserved in both languages. All surrounding UI is localized. SEO uses the common metadata helper; the Phase 6 report documents the final environment-aware indexing configuration.

## Validation

The 16 focused Pricing tests passed in the initial combined SEO/Pricing run. Both languages were inspected at 320, 375, 430, 768, 1024, 1440 and 1920px, including full-page screenshots, heading/list wrapping and no horizontal overflow. Axe checks passed at 375/1440px. Keyboard Header/mobile/Footer/homepage links, Contact CTAs and both-way language switching passed. Phase 6 tests additionally inspect both Pricing pages without JavaScript, including metadata and semantic content. Final whole-suite/build results are in the Phase 6 report.

No primary navigation or current CTA retains a WordPress destination. Client websites remain intentional external links. Project `sourceUrl`, portrait-source comments and `pricingSourceUrl` remain provenance. The required `/cenovnik/` -> `/sr/cenovnik/` migration is implemented in the now-authorized Phase 6, not treated as a separate speculative redirect.
