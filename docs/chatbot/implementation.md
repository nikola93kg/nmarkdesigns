# NMark Assistant — implementation, iteration 1

Date: 2026-11-19. Source brief: `/Users/apple/Downloads/CHATBOT_SPEC.md` (MVP v1.0).
The user's direct request authorizes local implementation; the brief's closing suggestion to wait for a separate prompt does not override that request. No production database, migration, commit, push or deployment was performed.

## Repository audit

- Next.js 16.4.6, App Router, React 19.2.8, TypeScript 6, Tailwind 4. Local Next route-handler/cookie guides inspected.
- Public pages share `app/[locale]/layout.tsx`; no top-level layout. Exact URL inventory/proxy rejects unknown routes: `/api/chat` has an explicit pass-through.
- Existing SMTP delivery is Nodemailer (`lib/contact-delivery.ts`). Existing contact limiter is process-local and unsuitable for persistent chatbot quotas, so chatbot limits use MySQL transactions.
- Existing cookie banner + consent-gated GA4 reused without adding tracking. No chatbot events are sent to GA4 in this iteration; no PII analytics added.
- No auth, database adapter or published privacy-policy route found. Existing offline privacy drafts remain unpublished. No admin identity inferred.
- Docker was initially stopped; Docker Desktop was started for an isolated, disposable MySQL 8.4 test container on loopback port 33306. All three generated migrations and real store integration tests passed. Hostinger quotas, credentials, backups, cron and proxy streaming remain unverified; no authenticated Hostinger management capability was available in this session.
- Unrelated pre-existing portfolio evidence changes, blog draft and research assets were preserved.

## User decision

Both locales use the same EUR starting prices, confirmed by the user during implementation. `content/pricing.ts` is the numeric source for website packages and chatbot knowledge. English pricing, service displays, metadata/JSON-LD, inquiry templates (derived), pricing article and `public/llms.txt` were aligned. Existing external-provider USD pricing in editorial articles was preserved.

## Implemented

- Versioned typed registry derives facts/prices from existing content and resolves the eight specified real portfolio slugs. Historical Tripoli Sweets status retained; only local NMark case studies become links.
- Runtime Zod schemas; shared SSE contract/parser; plain text rendering (no HTML or autolink parsing).
- Three Drizzle/MySQL tables: consented sessions, user/assistant transcripts and persistent atomic counters. Versioned SQL migrations; no automatic migration on build/start.
- Opaque random 256-bit httpOnly, sameSite=strict session cookie; only its SHA-256 digest stored. Production cookie is secure, host-only, `__Host-` prefixed. GET history authenticates cookie ownership; request bodies cannot choose sessions.
- POST session requires current explicit consent; POST chat validates origin, consented session, bounded request body, 2,000-character message, UUID and quotas before provider access. Config and DB errors fail closed.
- Transactional per-session generation lease, idempotent user messages, completed-answer replay and retry of failed/cancelled turns using the same ID. DB is the source of history. Full text persists on stream completion/cancellation/error; hard process termination can leave a pending answer requiring retry after lease expiry.
- Direct server-only OpenAI Responses API, `stream: true`, `store: false`, no tools, no provider auto-retries, bounded context (last 12 completed messages), output limit and 35s timeout (max 45s). No live scraping or external tool use. Server chooses clickable links separately from untrusted model text.
- MySQL shared quotas: 10 new sessions/hour/identity, 20 calls/15 minutes/identity, 100/day/session; owner-configured global daily and calendar-month call ceilings. The monthly bucket uses a UTC calendar-month identity. These are **call caps**, not cost accounting; monetary reservation/usage/budget controls are still required for MVP.
- Feature-gated, lazy-loaded SR/EN widget. Consent, welcome actions, input, stop/retry, inline errors/contact fallback, desktop panel, mobile modal focus containment and close-focus restoration. Current browser history limited to last 100 records; database keeps full transcript. Locale route changes restore owned history from the server; UI translations follow the route.
- No automatic popups or lead submissions. Panel hides launcher while the cookie banner is present and places launcher above back-to-top. Existing layout sections are unchanged.

## Local setup

1. Start a local MySQL 8 instance yourself or via Docker. Use a dedicated `nmark_chatbot_dev` or `nmark_chatbot_test` database and a dedicated development user. Do not reuse a production DB.
2. Copy values from `docs/chatbot/env.example` into the local environment. Populate credentials without checking them into Git. The migration script does not read `.env.local` automatically; use Node's `--env-file=.env.local` if that file contains your development DB values.
3. Generate schema SQL with `npm run chat:db:generate`; inspect the SQL. `npm run chat:db:migrate:dev` requires `CHAT_MIGRATION_TARGET=development`, `DB_HOST=127.0.0.1`, and a DB name ending in `nmark_chatbot_dev`/`nmark_chatbot_test`. It cannot target the future production DB. MySQL DDL is not transactionally rollbackable; use a disposable dev database for the first check.
4. Only enable `CHAT_ENABLED=true` locally after configuring explicit call ceilings, model/key, a random secret of at least 32 characters and both reviewed privacy URLs. There is no fabricated default privacy route. With missing config the API returns 503 without AI work; missing privacy URLs leave consent unavailable and offer contact.
5. Run `npm run dev`; test consent, real incremental responses, interruption, retry and reload ownership against the local DB. Set feature and policy configuration consistently in build and runtime environments. The validated build currently renders public page routes dynamically; other future caching settings may require rebuilding after configuration changes.
6. `npm run test:chatbot` uses a separate local dev server on port 3110 with **mock API responses and test-only policy URLs**. No test sends requests to OpenAI, SMTP or a production database.

The shared fallback rate-limit identity is deliberately restrictive until the trusted proxy header is verified. Never use client-supplied `X-Forwarded-For` without proxy enforcement. Secret rotation resets anti-abuse identity buckets; keep the secret stable during normal operation.

## Next iterations / release blockers

This is a working first implementation slice, **not MVP Definition of Done**.

1. Expand the passing local MySQL tests to real HTTP ownership/cookie scenarios, staging connectivity and pool recovery. Verify Hostinger charset/timezone and hard-failure recovery.
2. Lead qualification UI/form, separate contact consent, durable lead/outbox transaction, idempotency and SMTP retry cron. Reuse existing SMTP configuration; SMTP alone cannot promise exactly-once delivery after ambiguous network failure—define an observable reconciliation strategy.
3. Auth.js magic links + MySQL adapter, confirmed `ADMIN_ALLOWED_EMAIL`; protected dashboard/lists/details/status/note/deletion/audit. No admin routes were added in iteration 1.
4. Retention policy approval (90/365 days remain proposals), actual retention cleanup with lock, cascade deletion/audit and Hostinger cron. Session cookie expires after 24h; this is **not** a data-retention implementation.
5. First-party metrics/event deduplication and optional consent-gated GA4 events; usage/latency and global monetary budget reservations. Currently only request-count ceilings exist.
6. Final privacy text and published policy URLs, provider data-processing review, explicit production enablement. Current consent version is deliberately marked draft.
7. Adversarial real-provider evaluations, DB outage/partial persistence tests, real SSE cancellation/timeout tests, hosting proxy buffering, backups/restore, hosting quotas and cron availability. Do not declare AC-01–AC-23 passed based on mocked UI tests.
8. Longer-session context summary strategy. Current context uses a bounded sliding window; no summarization yet.

## Validation

See the final implementation report below for commands actually run and their results. A generated migration is not evidence it successfully ran against MySQL; mocked SSE is not evidence of Hostinger incremental delivery.

## Primary implementation references

- [OpenAI streaming](https://developers.openai.com/api/docs/guides/streaming-responses), also checked against installed `openai` 7.60.0 types.
- [Drizzle MySQL](https://orm.drizzle.team/docs/get-started-mysql), with installed Drizzle 0.45.4 and mysql2 3.24.6.

## Validation results — 2026-11-19

- `npm run lint`: passed (including final integration-test changes).
- `npm run typecheck`: passed.
- `npm run build`: passed with webpack; public routes preserved, `/api/chat` and `/api/chat/session` added.
- `npm run test:chatbot`: 21 tests passed before the optional database test was added. Covers registry/schema/parser, mocked UI flows, same-message retry, safe text, consent gate, 320/375/430/768/1024/1440/1920px in both locales, and scoped axe WCAG A/AA checks at 375 and 1440px. Initial mobile focus-wrap defect was fixed and the suite rerun successfully. Desktop/mobile screenshots were visually inspected in two bounded rounds.
- `npm run test:e2e -- tests/pricing.spec.ts tests/customer-journey.spec.ts`: 30 tests passed against the production build.
- Actual MySQL 8.4 migration on the isolated `nmark_chatbot_test` container: all generated migrations applied successfully. No production credentials were used.
- Optional DB integration command: `CHAT_DB_TEST=true NODE_OPTIONS=--conditions=react-server npx playwright test --config playwright.chatbot.config.ts mysql.spec.ts` (with explicit local test DB environment): 1 test passed. Covers actual store transactions, concurrent generation exclusion, completed-answer replay, mismatched idempotency rejection, cancellation/retry, stale generation protection, atomic counters/rollback, cascading transcript deletion, origin denial and request byte limits. No provider or SMTP request was made.
- Npm install audit: zero reported vulnerabilities after overriding Drizzle Kit's legacy esbuild dependency; `npm ls esbuild` is valid. Existing dependency versions were preserved. Drizzle Kit generation also ran successfully after the override.
- `git diff --check`: passed. Pre-existing unrelated files were preserved.
- Temporary MySQL test container was stopped/removed after testing. The downloaded MySQL image is retained for future development. No production database was created or migrated.

Optional database test setup: start a disposable MySQL instance, apply migrations with `lib/chatbot/migrate.mjs`, export `DB_HOST=127.0.0.1`, test-only `DB_PORT`, `DB_NAME=nmark_chatbot_test`, `DB_USER`, `DB_PASSWORD`, then run the command above. `mysql.spec.ts` skips during normal UI runs and refuses non-test database names. The React server condition is needed to import `server-only` modules outside Next's bundler; it is used only for this test command.


## Feature branch review — 2026-11-19

Branch: `feature/chatbot`, created directly from freshly fetched `origin/main` at `15e27880`. The owner authorizes subsequent validated chatbot commits/pushes on this branch without renewed approval. `main` commits/pushes/merges still need explicit approval. Unrelated portfolio-evidence/blog-draft changes remain outside these commits.

### Review immediately after checkout

```sh
git fetch origin
git switch feature/chatbot
npm ci
npm run dev
```

Open `/sr/` or `/en/`, dismiss the cookie banner and click the chat button at the bottom right. No chatbot credentials or MySQL setup are needed for this **local demo**. It plays an explicitly labelled sample reply, supports stop/retry/restart and shows verified portfolio links. Messages stay in React memory in the tab until reload; no AI request, session creation, database write, email or analytics event is made by the demo.

Development now defaults to a visible widget and local demo. `CHAT_ENABLED=false` hides it. Set `CHAT_PREVIEW=false` and configure the real backend environment to test actual AI/database flows. Production still defaults to disabled and never uses demo mode. This update supersedes the earlier local-setup instruction requiring backend configuration just to inspect the interface; real-backend requirements remain unchanged.

Demo QA: `CHAT_DEMO_TEST=true npm run test:chatbot -- demo.spec.ts`. The normal chatbot suite explicitly disables demo mode and continues testing the actual client/server contract with mocked responses.

Branch-review validation: ESLint, TypeScript and production build passed; the four SR/EN mobile/desktop demo tests (including no-backend-request assertions and axe checks) passed, and all 21 existing chatbot contract/widget tests passed again with demo disabled. The earlier MySQL and pricing/customer-journey results above still describe the unchanged backend/pricing implementation.

## Iteration 2 — inquiry and notifications

The lead form, qualification/suppression, cookie-owned API, transactional lead/outbox migration and cron email worker are implemented. See [lead-delivery.md](lead-delivery.md) for operation, SMTP ambiguity handling, the real OpenAI smoke check, validation and remaining release gates. This supersedes the earlier list entry describing the lead form/outbox as wholly unimplemented. Admin, retention, analytics and monetary budget accounting are still pending.

## Iteration 3 — owner administration

Auth.js email-link sign-in, MySQL sessions, private SR/EN dashboard/lists/transcripts/details, status/note updates, notification reconciliation and audited deletion are implemented. See [admin.md](admin.md) for local review, authentication limits, metric definitions and remaining gates. The owner's explicit admin-email confirmation is recorded in private local configuration; no secrets are committed. Retention, durable analytics, monetary budget controls and production operation remain pending.

## Iteration 4 — data lifecycle, permanent metrics and cost limits

Owner-approved 90/365-day retention, seven-day technical grace cleanup, idempotent historical backfill, permanent daily aggregates and atomic daily/monthly USD reservations are implemented. The admin overview now includes usage against the approved USD 0.50/day and USD 4/month limits. See [operations.md](operations.md) for event semantics, pricing, protected cron operation, local migration/backfill and validation. This supersedes the earlier pending-retention/metrics/budget entries. Hostinger scheduling, staging/production database work and launch/privacy gates remain unperformed.

## Local real-provider review

The owner requested switching this workspace from demo to real localhost chat. The private configuration, development-only processing notice and browser/provider/DB verification are documented in [local-testing.md](local-testing.md). Production policy requirements are preserved; no hosting deployment is implied.

## Topic policy and knowledge relevance

Live review prompted a stricter topic gate, controlled project-facet retrieval, verified numeric price sentences, policy-versioned model history/replay and reset of old proactive inquiry offers. Both classification and answer calls are covered by atomic monetary and paid-call limits. See [topic-policy.md](topic-policy.md) for behavior, knowledge maintenance, validation and local-only migrations.
