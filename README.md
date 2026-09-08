# NMark Designs

Incremental rebuild of [nmarkdesigns.com](https://nmarkdesigns.com/) with Next.js App Router, React, strict TypeScript, and Tailwind CSS.

Phase 1 implements the shared foundation only. The index is intentionally minimal; homepage sections and additional pages are not implemented.

## Development

Use Node.js 24 LTS (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. If that port is occupied, pass another port with `npm run dev -- --port 3001`.

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

- `app/`: root layout, global tokens, and minimal index.
- `components/layout/`: shared header, logo, navigation, and footer.
- `components/ui/`: typed Button and Container primitives.
- `content/site.ts`: business information and navigation destinations.
- `lib/metadata.ts`: page metadata helper.
- `public/logo/`: intentionally migrated copies of supplied logo assets.
- `tests/`: browser behavior, layout, and accessibility checks.
- `docs/`: reference material, design decisions, and migration plan.

Layouts render on the server. `MobileNavigation` is the only explicit client boundary. It enhances a native `details` disclosure with Escape, outside-click, focus-leave, and responsive dismissal; opening the menu and following links also work without JavaScript.

## Migration State

Only `/` exists locally. Header and footer links to unfinished pages open existing production destinations in the same tab. Convert those entries to local paths and remove `external` in `content/site.ts` as each route is implemented. These temporary links must all be resolved before launch.

The incomplete index explicitly emits `noindex, nofollow`. Remove this only after real homepage content and launch checks are complete. No sitemap, robots route, structured data, or business URL redirects have been added yet. Trailing slashes match verified production page URLs.

See [the implementation plan](docs/implementation-plan.md), [migration notes](docs/migration-notes.md), and [frontend guidelines](docs/frontend-agent.md).
