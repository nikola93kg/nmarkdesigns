# NMark Designs

Incremental rebuild of [nmarkdesigns.com](https://nmarkdesigns.com/) with Next.js App Router, React, strict TypeScript, and Tailwind CSS.

The reference-based homepage, Portfolio index, eight project detail pages, About, and Contact are available in Serbian and English. Contact form validation is implemented, but delivery is unavailable until a mail provider is integrated. Services and Pricing pages remain outside the implemented scope. Blog is deferred until verified article content is available.

## Development

Use Node.js 24 LTS (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000/sr/ or http://localhost:3000/en/. The root redirects to Serbian. If that port is occupied, pass another port with `npm run dev -- --port 3001`.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Browser tests use Google Chrome and start the production build on port 3100. Install Chrome locally, or run `npx playwright install chrome` in a CI environment. Build before running browser tests. Screenshots and failure traces go to the ignored `test-results/` directory.

DM Sans is self-hosted by `next/font/google`; the first build requires access to Google's font service. Latin and Latin Extended subsets support Serbian Latin text.

ESLint 9 is currently pinned to stay within the React lint plugin's supported peer range. npm marks this major as deprecated; update the lint toolchain when that plugin supports ESLint 10. This is development tooling only.

## Structure

- `app/[locale]/`: localized root layout and statically generated homepage, Portfolio index, and project detail routes.
- `app/globals.css`: unchanged Phase 1 typography and design tokens.
- `components/layout/`: shared header, logo, navigation, and footer.
- `components/home/`: Hero, FeaturedProjects, Services, CTA, and FAQ.
- `components/portfolio/`: reusable project presentation.
- `components/about/`: shared About introduction, founder profile, and mission content.
- `components/contact/`: shared Contact content and progressively enhanced form.
- `lib/contact*.ts`: typed form state, explicit validation, and the currently unavailable server-only delivery adapter.
- `components/ui/`: typed Button and Container primitives.
- `content/site.ts`: shared verified business information.
- `content/i18n/`: typed Serbian and English content, loaded on the server.
- `content/projects.ts`: verified project identities and local screenshots; unknown fields stay optional.
- `lib/i18n.ts`, `lib/routes.ts`: locale types and equivalent route mappings.
- `lib/metadata.ts`: localized titles, descriptions, canonicals, and language alternates.
- `proxy.ts`: strict locale guard before the static cache; excludes asset requests.
- `public/logo/`, `public/images/`, `public/projects/`: intentionally migrated local assets.
- `tests/`: browser behavior, layout, and accessibility checks.
- `docs/`: reference material, design decisions, and migration plan.

Pages and layouts render on the server. The small client boundaries are `MobileNavigation`, `LanguageSwitcher`, `FAQAccordion`, and `ContactForm`. The menu retains its native disclosure fallback. Language links work without JavaScript, and all FAQ answers remain visible without JavaScript. With JavaScript, the FAQ exposes button controls and expanded state, with the first answer initially open. Contact uses a native Server Action and localized validation, also usable without JavaScript.

## Adding Localized Content

Add shared fields to `content/i18n/types.ts` and provide both dictionaries. Resolve content with `getDictionary(locale)` in Server Components. Business information belongs in `content/site.ts`; project-specific content belongs in `content/projects.ts`. Do not duplicate localized JSX.

`lib/routes.ts` maps semantic route keys to translated slugs and safe temporary destinations. Once a core page is implemented in **both** languages, set its `implemented` flag to `true` and use `localizedPath` for metadata. The language switcher maps equivalent paths, including future portfolio detail slugs. It does not store locale in React state, cookies, or localStorage. Unknown routes have no switch target.

## Migration State

Implemented routes: `/sr/`, `/en/`, `/sr/o-nama/`, `/en/about/`, `/sr/kontakt/`, `/en/contact/`, `/sr/portfolio/`, `/en/portfolio/`, and `/sr/portfolio/[slug]/` / `/en/portfolio/[slug]/` for the eight verified projects with case-study content. `/` redirects to `/sr/` with HTTP 307; Next.js normalizes trailing slashes. Unsupported locales, mismatched core-page locale/slug combinations, and unknown project slugs return 404, including uppercase variants. No browser-language detection or speculative WordPress redirects are used.

Portfolio navigation and the homepage all-projects link point to the localized Portfolio index. Showcase links open local project details, and verified client-site links open externally in the same tab. About and Contact are generated by the shared `app/[locale]/[page]/page.tsx` implementation, restricted by `corePageRoutes` in `lib/routes.ts`. The resolver, static parameters, and proxy use that same allowlist. Services still points to the localized homepage anchor. Pricing alone still opens WordPress; this temporary link must be replaced before launch.

Contact delivery is deliberately unavailable. `lib/contact-delivery.ts` sends and stores nothing; `available: false` exposes an upfront notice. The Server Action validates input and reports unavailable rather than claiming success. Integrating delivery requires an approved provider/SMTP service, server-only credentials, verified sender and recipient, spam/rate controls, and delivery tests. Do not enable the flag or return `accepted` without a real provider acknowledgement. See [the Phase 5B report](docs/phase-5b-report.md).

Project content lives in `content/projects.ts`. A populated `caseStudy` enables static detail routes; absent narrative/gallery fields render no placeholder sections. Client names, website URLs, tools, and editorial decisions are recorded in [project content sources](docs/reference/project-content-sources.md). No challenge or results narrative has been invented to fill the template.

All localized pages explicitly emit `noindex, nofollow`, including production builds. Remove this only during an intentional launch, with environment-aware preview protection. Canonicals point to the corresponding production locale URL; `sr`, `en`, and `x-default` alternates are present. Sitemap, robots route, structured data, full social-image review, and approved migration redirects remain launch work.

See [the implementation plan](docs/implementation-plan.md), [migration notes](docs/migration-notes.md), and [frontend guidelines](docs/frontend-agent.md).
