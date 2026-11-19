# Lead flow and durable email delivery — iteration 2

2026-11-19. Work is on `feature/chatbot`; no production database, email, cron or deployment was changed.

## Visitor flow

The assistant can suggest an inquiry after a concrete business signal. Greetings and generic pricing questions do not trigger a suggestion. Rejection is saved for the owned session; an explicit later request for contact can offer the form again. A visitor can always open it manually from the chat footer.

The first form step covers service, goals/features, optional existing website, budget and timeframe. Up to the last three visitor messages are shown as an editable draft description; no model-generated claims or contact details are inferred. The second step shows a project review and collects name/email, optional company/phone and preferred contact method. A separate unchecked contact-consent checkbox is required. Blank budget/timeframe are accepted. Choosing phone contact requires a phone number.

Only the visitor's final **Send inquiry** click calls `POST /api/chat/lead/`. It validates origin, consented cookie ownership, a bounded schema and explicit current contact consent. The request cannot choose a session. One transaction records the lead, consent timestamp/version and outbox item. A stable submission ID survives browser retries, with a payload hash rejecting changed content under an already-received ID. Parallel retries return one lead and one notification. New accepted inquiries are capped at three/day/anti-abuse identity and three/day/session; replays do not consume another slot.

The UI confirms receipt only after DB success. A pending/failed email does not turn a saved inquiry into a failed lead. On failure, fields/checkbox remain available for retry. Contact PII is cleared from the form after confirmed receipt. Reloading the owned session restores whether an inquiry was already received, preventing another casual form submission from the same conversation. No public API returns a lead's contact fields.

Demo mode includes the form, review, validation and success screen. It explicitly says the inquiry was **not sent**; there are no API, SMTP or database requests. The existing UI/brand is retained.

## Database

Migration `0003_tough_rachel_grey.sql` adds `chat_leads`, `chat_lead_notifications` and `chat_sessions.lead_declined_at`. Foreign keys cascade from session → leads → notifications. Existing messages remain intact. Status, internal-note and delivery fields are ready for the next admin iteration; no unprotected admin routes were added.

The migration was applied only to a disposable local MySQL 8.4 test database. Production application requires a separately reviewed migration, backup and hosting check.

## SMTP/outbox

The existing Nodemailer transport and server-only SMTP configuration are reused. `CHAT_EMAIL_ENABLED` defaults to disabled. The recipient defaults to the approved `info@nmarkdesigns.com`; `CHAT_LEAD_RECIPIENT` is server-side only. The plain-text email contains exact reviewed fields, lead/session IDs, Belgrade-local time, locale and consent evidence. It does not contain AI summaries or invented details. Admin links are deferred until protected admin routes exist.

`POST /api/chat/maintenance/` requires a random `CHAT_CRON_SECRET` of at least 32 characters in the `Authorization: Bearer …` header. Comparison is constant-time; cookie auth and hidden URLs are not used. The response contains counts/request ID only. No query-string secret is supported. The worker awaits all work and claims at most two notifications per request. MySQL transactional row locks with `SKIP LOCKED` allow concurrent cron runs to process separate rows without sending the same notification twice. The lease is 180 seconds; route duration is 90 seconds, within the brief's stated 120-second hosting ceiling (actual plan still needs verification).

Statuses:

- `pending`: ready when `next_retry_at` is due.
- `processing`: claimed by one worker.
- `sent`: recipient accepted by SMTP and result durably recorded. This means SMTP acceptance, **not proof of inbox delivery**.
- `failed`: five known unsuccessful attempts exhausted; manual correction/review needed.
- `uncertain`: acceptance may have occurred (for example a disconnect after DATA or a stale processing lease after process loss); do not auto-resend.

Known pre-delivery/negative SMTP failures retry with exponential backoff (1, 2, 4, 8 minutes between attempts, maximum five attempts). Raw SMTP errors are never persisted; only classified codes are stored. A deterministic `Message-ID` is used, but SMTP alone cannot guarantee exactly-once inbox delivery. Ambiguous acceptance is deliberately routed to manual review instead of risking a duplicate. A DB failure after SMTP acceptance leaves a stale claim, which later becomes `uncertain`. The forthcoming admin panel needs to expose reconciliation for these rows.

Hostinger setup remains a future authorized operation. Configure a periodic POST (for example every five minutes), with the bearer header loaded from protected runtime configuration; do not put the actual secret in a public URL or repository. Keep `CHAT_EMAIL_ENABLED=false` until this is reviewed. No cron was configured in the account during this iteration.

## Real OpenAI check

The owner's `.env.local` key was detected without printing or editing it. The authenticated models endpoint confirmed `gpt-5.4-mini` access. The opt-in `lib/chatbot/smoke.ts` ran exactly two synthetic SR/EN streaming checks through the actual provider adapter: business website (550 EUR starting price) and online store (1,200 EUR starting price). Both completed, yielded multiple text delta events and passed price/starting-price assertions. No real visitor/contact data was used; no email or DB record was created by this provider check.

The smoke script needs the already-installed Drizzle Kit `tsx` tooling and Node's React server condition:

```sh
CHAT_SMOKE_TEST=true NODE_OPTIONS=--conditions=react-server npx tsx lib/chatbot/smoke.ts
```

This is an explicit, potentially billed opt-in check, never part of lint/build/normal tests. It uses test fixture policy URLs internally and presents none as published legal policies. It does not replace public consent or approve production activation. The local widget still defaults to demo; interactive real-backend use requires the full environment/policy setup.

## Remaining MVP work

Owner-only Auth.js admin access and screens, audit/status/deletion flows, approved retention and retention cron, analytics, monetary budget reservations and usage reporting, staging proxy/IP/pool recovery, real SMTP delivery test, production privacy approval and Hostinger cron/streaming checks remain. Production is disabled by default. No API key, SMTP credential, or database password is committed.

## Primary references

- [Nodemailer SMTP transport](https://nodemailer.com/smtp) — transport/acceptance behavior.
- [Drizzle transactions](https://orm.drizzle.team/docs/transactions) — atomic lead/outbox writes.
- [OpenAI GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini) — tested provider model; this is not a permanent production model decision.

## Validation results

- ESLint, TypeScript and production build passed. No dependencies were added for this iteration.
- 27 contract/qualification/widget/lead-form tests passed (SR/EN, existing 320–1920px coverage, mobile/desktop form review, axe checks, consent, retained retries, pending email receipt).
- Four demo tests passed, now including the complete form with zero chat API requests.
- Two MySQL integration tests passed: existing generation/idempotency/counter tests and new lead/outbox concurrency/backoff/failure/uncertainty/cascade tests. Migration 0003 applied successfully to local MySQL 8.4.
- One real HTTP API test passed against the production build and isolated test DB: secure/httpOnly/strict cookie, missing/foreign session, missing consent, wrong origin, rejected client-selected session, durable receipt, replay/conflict, restored suppression/receipt flags and cron denial. The production secure cookie was explicitly transferred only over loopback HTTP by the API test harness; browser production cookie policy is unchanged. AI key was a dummy fixture and email sending was disabled in this server.
- The four lead-form UI tests also passed on that production test server after clearing stale validation notices when fields change. Mobile/desktop screenshots were reviewed in two bounded passes. An already running owner dev server on port 3000 was left untouched; the HTTP test used port 3110 and `next start`.
- Two real OpenAI streaming checks passed as described above; no actual email was sent. These checks are separate from the 34 distinct automated tests above.
- Concurrent Playwright suites now use separate artifact directories. An initial artifact deletion collision was corrected; final runs passed with isolated outputs.
- `git diff --check` passed. Temporary local MySQL test container was stopped/removed after validation; unrelated pre-existing files were preserved.

Operational update: owner administration is covered by [admin.md](admin.md); approved retention, durable metrics and USD budget control are covered by [operations.md](operations.md). These supersede the corresponding earlier pending items; production scheduling and launch checks remain open.
