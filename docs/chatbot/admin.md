# Owner admin — iteration 3

2026-11-19, `feature/chatbot`. Scope: passwordless owner authentication, private SR/EN administration, auditable edits/deletion, current-record metrics and notification reconciliation. No production database, hosting configuration or deployment was changed.

## Local review

In this workspace, the owner confirmed `info@nmarkdesigns.com` as the only allowed address. Private `.env.local` now has `ADMIN_ALLOWED_EMAIL`, a generated `AUTH_SECRET`, `AUTH_URL=http://localhost:3000`, and dedicated **local development** MySQL settings. Existing OpenAI and SMTP values were preserved, and no secret values were printed or staged.

A persistent local Docker container `nmark-chatbot-dev` uses volume `nmark-chatbot-dev-data` and loopback port 33308, with a generated application-user password. It is independent of the disposable test database and other existing containers. Migrations 0000–0005 were applied locally. Development starts with an empty database: no sample visitors or test admin sessions were added to it. The owner account is created by Auth.js only after a valid email-link verification.

```sh
docker start nmark-chatbot-dev  # if it is stopped
npm run dev
```

Open `http://localhost:3000/admin/sr/login/` (English: `/admin/en/login/`) and explicitly request a sign-in link for the approved address. The URL must match `AUTH_URL` exactly, including hostname/port. No actual sign-in email was sent by the agent; submitting this form is an owner-initiated SMTP action. SMTP delivery to the real account remains a manual acceptance check.

On another checkout/machine, configure the private environment from `docs/chatbot/env.example` and provision a local MySQL development database before applying migrations. The generated local credentials are intentionally not in Git. This local setup is not authorization to create/migrate a production database.

## Authentication and permissions

- Auth.js `next-auth` **5.0.0-beta.32** (pinned) and `@auth/drizzle-adapter` **1.11.3** (pinned), MySQL-backed sessions. Next.js 16 and React 19 are in its peer range. The v5 package remains a beta release; reevaluate updates before production.
- The installed Auth.js peer range names Nodemailer 7/8, while the project already uses Nodemailer 10. The narrow `nodemailer: "$nodemailer"` override preserves the existing 10.5.0 SMTP dependency, with a custom `sendVerificationRequest` reusing the established hardened transport. No downgrade, `--force`, or `--legacy-peer-deps` was used. Adapter/auth/session flows are tested; actual SMTP delivery is a separate check.
- `ADMIN_ALLOWED_EMAIL` is one validated exact email, compared after trimming/lowercasing. It is not inferred from the public contact address and is never sent as client configuration. Unapproved identifiers are rejected before creating an account or sending email. Existing sessions must also match the currently allowed, verified identity on every private operation.
- Sign-in links expire in 10 minutes; database sessions expire in eight hours. Auth.js generates tokens, handles CSRF and manages cookies; there is no custom password/JWT/session scheme. On HTTPS, cookies use Auth.js secure/httpOnly/sameSite defaults. Loopback HTTP is permitted for local development/test only; a non-loopback HTTP `AUTH_URL` is invalid.
- The upstream MySQL adapter's separate select/delete verification-token consumption is overridden with one transaction and `FOR UPDATE`. Concurrent requests cannot consume the same link twice.
- Every admin page and every data query/mutation checks owner authorization server-side, independent of the proxy. API routes also check it before parsing filters/IDs. Public chat cookies or guessed IDs do not grant access. Unknown/missing configuration fails closed.
- POST auth actions and all admin mutations require the configured origin; Auth.js additionally enforces its CSRF token. Login attempts are limited by persistent MySQL counters. The fallback proxy identity is intentionally shared until the trusted IP header is verified.
- `AUTH_URL` pins URLs and callback origin; forwarded headers are pinned before Auth.js handles a request. Return URLs are restricted to the same origin's `/admin/sr/` or `/admin/en/` paths. Arbitrary external redirects are rejected.
- Logout removes the Auth.js database session, then performs full document navigation to discard the private client router state.
- Auth error logs use a static code, never the SMTP error, email payload, token, secret or transcript.

## Private surfaces

`/admin/` redirects to `/admin/sr/`; `/admin/en/` is equivalent. Public navigation, sitemap, language alternates and public URL inventory do not include admin pages. The admin root has no GA4, public cookie banner or chat widget. The UI reuses DM Sans, existing colors, Container and Button.

- Overview: 7/30 business-day periods in Europe/Belgrade, chat starts, engaged sessions, inquiries, conversion, chat errors, notification issues and daily counts.
- Conversations: date, language and inquiry-presence filters; keyset pagination; transcript/status/timestamps, approved recommended links and related inquiries. Full DB transcript is retained; the detail response caps display at 500 messages and marks truncation.
- Inquiries: date/status/delivery-attention filters, keyset pagination, complete details, consent evidence, transcript link, status and internal note.
- Notifications: failed/uncertain deliveries can be requeued only after the owner checks delivery and explicitly confirms it was not accepted/delivered. Requeue writes an audit record and does not itself send email. The existing protected cron worker handles delivery.
- Deletion: separate confirmation required. Deleting an inquiry removes its contact fields/notification and retains the transcript. Deleting its conversation cascades through messages, inquiries and notifications. Active generation or an active notification lease blocks deletion; expired processing leases do not prevent a legitimate deletion indefinitely. Audit entries contain identity/action/target ID/time, never a deleted note/transcript/contact payload.

The public lead notification email now includes admin/transcript links only when the authenticated admin configuration is ready. Links still require owner sign-in.

## Metrics and privacy boundaries

These metrics query **currently retained records**, rather than a permanent analytics ledger. Deleting data changes historical counts; the UI says so. `chatStarts` uses first visitor-message time; engagement means at least two visitor messages. Leads use submission time, errors use assistant-error time, and notification issues include failed/uncertain and pending notifications with an actual delivery error. Initial pending notifications without an attempted delivery are not counted as errors. Conversion is inquiries/chat starts for the period; no artificial cap is applied.

Day boundaries are computed in Europe/Belgrade with Intl (tested across both DST transitions), without requiring named MySQL time-zone tables. New covering/date indexes support message metrics and keyset lists. Private APIs use `Cache-Control: private, no-store`; private/auth routes also set `X-Robots-Tag: noindex, nofollow`, no-referrer and a tighter CSP without external analytics sources. Production robots disallow admin/auth paths while keeping public pages crawlable. Robots are not authorization.

Lists intentionally avoid searching/transmitting contact or transcript text through URL query parameters. Allowed filters are dates, locale, status, presence and opaque pagination cursor. The Hostinger access-log configuration still needs to redact Auth.js callback query parameters (which contain one-time token/identifier), and enforce the configured host/forwarding behavior before production.

## API

All endpoints require a verified owner session; mutations additionally require origin, JSON schema validation and confirmation where relevant.

- `GET /api/admin/metrics?range=7d|30d`
- `GET /api/admin/conversations?from=…&to=…&locale=sr|en&hasLead=yes|no&cursor=…`
- `GET`, `DELETE /api/admin/conversations/:id`
- `GET /api/admin/leads?from=…&to=…&status=…&delivery=attention&cursor=…`
- `GET`, `PATCH`, `DELETE /api/admin/leads/:id` (PATCH: status/internalNote only)
- `POST /api/admin/leads/:id/notification` (verifiedNotDelivered: true)

Auth.js routes are `/api/auth/*`. Missing auth returns 401, invalid origin 403, invalid data 400, missing record 404, active processing 409. Responses use a request ID and stable error code, without stack traces. Empty/unconfigured admin is a closed state, not a demo bypass.

## Still pending

Approved retention/cleanup and auth-token/session cleanup, analytics/event ledger, monetary budget guards, SMTP acceptance and Hostinger staging/production checks, reviewed deployment/migrations/backups remain. Audit-log retention and deployment-version review must be decided before launch. No public production enablement is performed by this iteration.

## Primary implementation references

- [Auth.js Nodemailer](https://authjs.dev/getting-started/providers/nodemailer)
- [Auth.js Drizzle adapter](https://authjs.dev/getting-started/adapters/drizzle)
- [Auth.js restricting access](https://authjs.dev/guides/restricting-user-access)
- Installed version-matched `next-auth`/adapter source and local Next.js route/mutation guides.

## Validation results

- ESLint, TypeScript and production build passed. Existing dependency versions were preserved; new auth packages are pinned and runtime npm audit reported zero vulnerabilities.
- Ten admin tests passed against the real Auth.js routes and disposable MySQL 8.4: anonymous/expired/forged/foreign-email denial; first owner-account creation; concurrent one-time-token consumption; expired/non-owner token rejection; fixed-origin redirects; logout revocation; owner metrics/filtering/keyset pagination; strict mutations; origin/CSRF denial; audit records without note content; explicit notification reconciliation; busy-work protection and cascade deletion.
- UI checks passed on SR/EN at 375 and 1440px, including axe WCAG A/AA checks, no page overflow, full logout, equivalent-page language switching and approved links from mixed-language conversations. Test screenshots were visually inspected in two bounded rounds; all displayed records were synthetic fixtures.
- Both existing MySQL chat/lead/outbox tests passed after the schema and notification-link integration.
- All 78 public SEO tests passed, covering metadata, sitemap, canonical/hreflang, preview protections, redirects and the updated private-route robots policy. No public routes were removed.
- Migrations 0004 and 0005 were applied only to the local development and disposable test databases. The local login page returned 200 with the login form, and its unauthenticated metrics API returned 401. No sign-in or inquiry email was automatically sent.
- `git diff --check` and staged credential-pattern checks passed. Temporary test MySQL was stopped/removed; the persistent local development database remains for owner review. Pre-existing unrelated portfolio/blog changes were preserved.

Re-run integration/UI tests only with a disposable local test database, after `npm run build`:

```sh
DB_HOST=127.0.0.1 DB_PORT=<test-port> DB_NAME=nmark_chatbot_test DB_USER=<test-user> DB_PASSWORD=<test-password> npm run test:admin
```

The test server uses a synthetic owner, a fake SMTP endpoint and a separate port. It has no auth bypass: fixtures seed standard Auth.js tokens/sessions into the guarded test database and exercise normal application authorization. Integration tests skip in the ordinary broad test configuration unless the dedicated admin configuration is selected.
