# Phase 6 - Technical SEO and Migration

Implementation resumed and reviewed on 2026-09-11. This report completes the missing handoff for the existing Pricing and SEO changes. The historical source inventory is recorded in [migration notes](migration-notes.md); production sources were not recrawled during this continuation.

## Implemented Behavior

- All 26 published Serbian and English pages share the inventory in `lib/public-pages.ts`: home, Portfolio, eight project details, About, Contact and Pricing in each language. Services links to the localized homepage section. Blog remains deferred.
- Each page has its own production canonical, localized title and description, Open Graph and Twitter metadata, and published `sr`, `en` and Serbian `x-default` equivalents. `/sitemap.xml` includes those 26 URLs and language alternates, without invented modification dates.
- Homepage Organization/WebSite, About Person and project BreadcrumbList data use the verified repository content. JSON-LD escapes script-breaking characters. Unsupported ratings, business details and commercial schema are omitted.
- The exact legacy map redirects the root, About, Contact, Pricing, Portfolio index, Services and eight migrated project paths to Serbian equivalents with HTTP 308. Slashless legacy requests use the same direct mapping. Known localized URLs normalize to trailing slashes and preserve query parameters. Unknown routes and incorrect locale/case combinations return 404.
- Pricing now has real localized destinations, so current navigation and CTAs use internal URLs. Client website links remain external. Pricing content decisions are documented in [Phase 5C](phase-5c-report.md).

## Preview and Launch Policy![img.png](img.png)

Indexing is disabled by default. `next.config.ts` captures the launch policy during the build: `SITE_LAUNCH=true`, a production Node environment and a production deployment are all required. `VERCEL_ENV`, when present, takes precedence over `DEPLOYMENT_ENV`, so a preview cannot be enabled by the self-hosted setting. Changing the policy requires a rebuild.

The proxy additionally checks the exact canonical production host. Localhost, preview hosts and aliases receive `X-Robots-Tag: noindex, nofollow`; dynamic `/robots.txt` disallows crawling on those hosts. Only an enabled launch artifact served on the production host allows crawling and advertises the sitemap. Unknown routes retain noindex even on that host.

Static HTML from a launch artifact can contain index/follow on an alias; the restrictive response header supplies host protection. Hosting access controls are still needed for private previews. No production deployment or indexing activation was performed.

## Continuation Fixes

The first browser run exposed a redirect loop for slashless localized URLs. A cloned `NextURL` retained the incoming slash policy and serialized the redirect back to its original slashless path. `proxy.ts` now constructs a native `URL` before assigning the canonical pathname. The regression check covers all 26 slashless URLs, query preservation and a 200 response after a single redirect.

The project hero and next-project navigation had identical accessible names despite containing different navigation options. The hero's return link now uses the localized Portfolio landmark label; next-project navigation keeps its existing label. Existing navigation tests cover both languages.

## Validation

- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build -- --webpack`: passed, generating all 26 localized public pages, the sitemap and dynamic robots endpoint.
- `npm run test:e2e`: all 178 tests passed against that production build in Chrome. Coverage includes responsive checks at 320, 375, 430, 768, 1024, 1440 and 1920px; automated accessibility; keyboard and no-JavaScript behavior; metadata and internal links; exact redirects; unknown-route rejection; sitemap and preview crawl protection.
- Pricing screenshots were visually inspected on desktop and mobile, with an additional check that both logo images loaded and neither page overflowed horizontally. A desktop homepage screenshot was also inspected. Screenshots remain in ignored `test-results/`.
- `git diff --check`: passed.
- The development preview was started with `npm run dev -- --webpack --hostname 127.0.0.1 --port 3000`; `/sr/` returned HTTP 200.

The default Turbopack build could not complete in this execution environment: the first attempt could not fetch Google Fonts, and the network-enabled retry hit a worker port permission error. Webpack built successfully with network access. No compiler default or font implementation was changed. Browser tests likewise required permission to start the local server and Chrome.

Launch environment and host-policy combinations are covered by function-level tests; an index-enabled production deployment was not exercised. Lighthouse, field Core Web Vitals and deployment validation remain Phase 7 work. Starting `next dev` also appended its framework-managed guidance block to `AGENTS.md`.

## Remaining Launch Work

- Resolve the seven additional legacy project URLs listed in migration notes. Their content and retention decisions remain open; no unrelated redirects were added.
- Confirm the Pricing ambiguities documented in Phase 5C, including domain/hosting terms, maintenance and package scope.
- Integrate and test real Contact delivery. The current form validates input and reports unavailable; it sends and stores no messages.
- Review privacy/legal content, favicon and social-image treatment, HTTPS and host normalization, and analytics/search verification.
- Complete Phase 7 visual polish, Lighthouse and deployment checks. Field Core Web Vitals require post-launch measurement.

The application is ready for further local review, not a production launch. Keep `SITE_LAUNCH=false` until launch requirements are resolved.
