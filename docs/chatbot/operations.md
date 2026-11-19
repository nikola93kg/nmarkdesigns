# Data lifecycle, durable metrics and API budget — iteration 4

Update: [topic-policy.md](topic-policy.md) adds separately metered scope checks. Global paid-call counts now live in budget buckets and include both classification and answers; sentence verification also limits which partial text is persisted.

2026-11-19, `feature/chatbot`. The owner approved 90/365-day retention, seven-day technical grace periods, and **USD 0.50 per UTC day / USD 4 per UTC calendar month**. The screenshot's USD 4.98 credit is a provider account balance, not the application's budget; the app does not query or replenish it. No hosting, production database or scheduled Hostinger job was changed.

## Local review

Private `.env.local` has the approved budget and `CHAT_RETENTION_ENABLED=true`. It uses the previously smoke-tested `gpt-5.4-mini` with explicit standard text prices: USD 0.75 input / USD 4.50 output per million tokens (verified against [OpenAI model documentation](https://developers.openai.com/api/docs/models/gpt-5.4-mini) on 2026-11-19). The existing widget demo/real-backend setting is preserved. No external AI call or email is needed for the tests in this iteration.

After applying migrations 0006/0007 to the local development DB, restart `npm run dev` and open `/admin/sr/` or `/admin/en/`. The overview now shows permanent daily metrics and the sum of estimated committed spend plus reservations against both limits. This is not an OpenAI billing statement. Existing historical records are reconstructed by the cleanup/backfill job, so execute that once before reviewing old counts. Empty history has zero counts.

## Data retention

The protected `POST /api/chat/cleanup/` endpoint is separate from email delivery. It works when the chat/widget/email feature is disabled and authorizes through the existing `Authorization: Bearer CHAT_CRON_SECRET` check.

- No lead history: delete the conversation after **90 days since last activity**.
- Any lead history: retain its conversation until **365 days after the latest lead submission**. The durable `last_lead_at` marker prevents an early 90-day deletion if an owner has already deleted the lead. Migration backfills it for retained leads.
- Delete individual leads after **365 days from their submission**, even when a newer lead keeps their conversation. Cascades remove notifications; whole-session deletion also cascades through messages, leads and analytics receipts.
- Active generation or an unexpired notification-processing lease blocks deletion. Expired processing leases allow deletion. A MySQL session lock serializes cleanup with new messages, lead submission and owner deletion; notifications are rechecked under lock.
- Expired rate-limit buckets, Auth.js sessions and one-time verification tokens are removed after **seven days of grace**. Live counters are never reset by cleanup.
- Audit entries keep only system actor/action/opaque target/time. They retain no deleted contact fields, note or transcript. Audit-log retention remains a launch-policy decision; this iteration does not silently delete owner audit history.
- Permanent daily counts contain only business day, locale, event type and count. They deliberately survive deletions. Per-session deduplication receipts cascade away with their session. Budget usage metadata contains no session/visitor/contact/message fields and is retained for reconciliation; no new identifying analytics ledger is created.

Deletion is bounded to 50 candidate conversations per invocation, plus 500 per technical table and 100 stale budget reservations. `moreWork` means another invocation may be needed. A 45-second conversation-processing window leaves room for technical maintenance. A dedicated MySQL connection holds `GET_LOCK` until completion; an overlapping job returns `skipped=true`. Locks release on connection/process loss. Each conversation's aggregation, audit and deletion is one transaction, so retries neither lose aggregates nor count a record twice. Fresh backups still require review before production enablement.

`CHAT_RETENTION_ENABLED=false` disables contact/transcript deletion while keeping backfill, technical cleanup and stale-budget reconciliation available. It defaults off in the checked-in example. The owner-approved local development setting is on. No background timer runs inside Next.js.

## Durable analytics

Server-side receipts and daily aggregate increments are committed in the same transaction as successful message/lead/transcript/outbox writes. Session/notification row locks serialize receipt creation. Failed writes cannot produce a successful inquiry count. Replaying completed messages or retrying the same inquiry does not increment it again.

Events: `chat_start` at the first visitor message; `engaged_session` at the second; `message_sent` for each distinct visitor message; `response_completed` and `response_error` once per assistant message/result category; `lead_submit_success` once per inquiry; `notification_failure` once per notification that ever fails or becomes uncertain. A recovered notification remains part of its historical failure count. These are event totals, not a count of currently failed notifications. Conversion is submissions divided by starts in the selected period and can exceed 100% when inquiries come from earlier conversations.

Historical backfill is idempotent and can reconstruct only the latest retained assistant result and known notification failure state. Deleted-before-upgrade data and overwritten earlier retry outcomes cannot be recovered. The cleanup job processes unsynced sessions first; new chat requests and manual deletion also synchronize retained data before proceeding. Business days use the existing tested Europe/Belgrade boundaries; budget days use UTC.

Optional `chat_open`, `quick_action_click`, `knowledge_link_click` and `lead_form_open` are sent only after the existing analytics consent and chat consent. `POST /api/chat/events/` additionally requires origin, owned nonexpired session, strict event allowlist, UUID deduplication and a shared 60/15-minute session quota. It accepts no visitor ID, text, contact field, URL, arbitrary properties or server-authoritative event. These interaction counts are best effort and client-supplied; they cannot change conversion totals. Demo mode sends none. No new GA4 integration is introduced; server validation/submission-error funnels and GA4 expansion remain outside this operational milestone.

## API cost protection

`OPENAI_MODEL` must exactly match `CHAT_PRICE_MODEL`; both USD-per-million rates and positive daily/monthly budgets must be explicitly configured. Missing/invalid configuration fails closed. When changing models, review standard text prices before updating all three settings. Existing daily/monthly call caps and visitor/session quotas remain in effect.

1. Build a stateless, text-only request without tools or previous response IDs.
2. Use the [Responses input-token counting API](https://developers.openai.com/api/docs/guides/token-counting) on exactly the same model/instructions/history. Count failures or input above 32,000 tokens prevent generation.
3. Reserve the full input cost plus `max_output_tokens` at configured standard prices, atomically against **both** UTC day/month buckets. Integer micro-USD arithmetic rounds upwards. Pending reservations count against the cap. Generation begins only after reservation commits.
4. Use `service_tier=default`, `store=false`, no automatic SDK retries, bounded output and existing timeout. The [output cap includes reasoning tokens](https://developers.openai.com/api/docs/guides/token-counting), even when invisible to the visitor.
5. Final provider usage settles once against the original period buckets. Cached input is conservatively charged at the full input rate. Latency and token counts are stored without request content. Usage exceeding its reservation is fully accounted and stops subsequent calls when limits are exceeded; it is never clipped to hide an overage.
6. Interrupted/unknown usage retains the full reserved amount. A crash leaves a reservation counted; after five minutes cleanup turns it into conservative committed usage, without refund. A stale transcript generation cannot overwrite a newer result.

Budget denial produces the existing localized rate-limit/contact fallback. A repeated visitor attempt can have a new reservation only after its prior generation finishes/expires; completed-answer replay creates no provider request. The application meter covers this DB's chatbot calls from this release onward; it does not include pre-upgrade usage, other API keys/apps, taxes, currency conversion or future price changes. OpenAI billing remains authoritative. Local/staging environments must not share an API project if separate budgets are intended; separate DB meters cannot enforce one combined account cap.

## Hostinger scheduling (not activated)

After staging/production database, migrations, secrets, backups, URL and proxy behavior are reviewed, configure Hostinger cron to run the committed client with a private env file:

```sh
# Hourly cleanup/backfill (example cron schedule: 17 * * * *)
/usr/bin/node --env-file=/absolute/private/chatbot.env /absolute/app/lib/chatbot/run-maintenance.mjs cleanup
# Existing email outbox worker (example schedule: every minute)
/usr/bin/node --env-file=/absolute/private/chatbot.env /absolute/app/lib/chatbot/run-maintenance.mjs notifications
```

Verify the actual Node/app paths on the target. `CHAT_ORIGIN` must match the application origin and `CHAT_CRON_SECRET` must match its private runtime setting. The client rejects redirects and non-HTTPS remote origins; its output only includes approved counts/request IDs. Never put secrets in URL query strings or public cron command arguments. `.env` password values with `#` must be quoted; Next.js also expands `$`, so escape literal `$` as `\$`. Use private file permissions. A running schedule, monitoring, backups/restores and production operation are still staging/launch checks, not claimed by this code implementation.

## Validation

All checks passed for this iteration:

- ESLint, TypeScript and production build.
- **9** disposable-MySQL operation tests: exact monetary arithmetic; concurrent day/month reservations and rollback; one-time settlement; uncertain usage; immutable aggregates/deduplication; cascade retention and busy leases; newer-lead protection; seven-day counter/auth cleanup; cron exclusion; actual SDK input counting and generation denial against a local fake API.
- **2** existing MySQL chat/lead/outbox transaction tests, each in its own process because it closes the singleton pool.
- **10** admin API/Auth.js/UI tests, including the new usage section, SR/EN at 375/1440px, axe and no-overflow checks. Full-page dashboard screenshots were inspected for Serbian mobile and English desktop.
- **1** real HTTP ownership/consent/lead/cron test expanded with new endpoint authorization, strict analytics properties and SQL proof of event deduplication.
- **25** existing registry/SSE/widget/lead-form tests at 320–1920px in SR/EN. These used `CHAT_UI_PRODUCTION_TEST=true` to avoid stopping the owner's active development server.
- Migrations 0006/0007 applied to the disposable test database and the persistent local development database. The protected local cleanup client returned success with `retentionEnabled=true`, zero expired conversations/leads and no remaining backlog.

That is **47 passing targeted tests**. Tests used synthetic records, the actual OpenAI SDK pointed at a local fake HTTP provider and fake SMTP settings. No real OpenAI request, email, production migration or deployment was performed. Pre-existing unrelated portfolio/blog changes were preserved. The persistent development database remains running; the disposable QA database and its temporary credential file are removed after validation.

Useful commands (supply only disposable loopback test credentials for the DB suites):

```sh
npm run lint
npm run typecheck
npm run build
CHAT_DB_TEST=true NODE_OPTIONS=--conditions=react-server npm run test:chatbot -- operations-mysql.spec.ts
npm run test:admin
CHAT_HTTP_TEST=true npm run test:chatbot -- lead-api.spec.ts
CHAT_UI_PRODUCTION_TEST=true npm run test:chatbot -- contracts.spec.ts widget.spec.ts leads-widget.spec.ts
```

Use separate processes for the two older `mysql.spec.ts` / `leads-mysql.spec.ts` suites. Do not run tests that mutate the same test database in parallel with the admin metric assertions. `operations-mysql.spec.ts` resets only its synthetic 2029 budget buckets in a guarded test database; it must never target development or production.
