# Antigravity QA follow-up — 2026-11-19

The owner supplied a local end-to-end QA report covering the real chatbot, inquiry form, MySQL outbox, SMTP, inbox receipt and owner administration. SMTP acceptance and inbox receipt were confirmed during that QA, including a second worker invocation with no duplicate. This follow-up did not resend email or alter the saved local QA inquiry.

## Conversation message count

The reported zero-count defect was reproduced by compiling the actual Drizzle selection. In a single-table selection, column qualification was removed from a raw SQL correlated subquery:

```sql
(select count(*) from `chat_messages` where `session_id` = `id`)
```

MySQL resolves the inner `id` to the message table. The corrected expression explicitly renders table identifiers and column-name identifiers from schema metadata:

```sql
(select count(*) from `chat_messages`
 where `chat_messages`.`session_id` = `chat_sessions`.`id`)
```

No join rewrite or schema migration is needed. A read-only execution against the report's local synthetic QA conversation returned **6**, matching its six stored messages. The separate lead-presence subquery was also inspected: its generated SQL already qualifies both tables correctly and was left unchanged.

Regression coverage checks one conversation with four messages (including an errored assistant reply) and another with zero messages. It verifies per-session API counts and lead flags. Browser tests check the displayed count in both admin locales at 375/1440px; status and internal note are additionally checked after a full reload. All mutations in those automated checks target an explicitly guarded disposable test database.

## Pricing decision and deferred work

The owner explicitly confirmed the current market rule: **SR uses EUR; EN targets the US market and uses USD**. This supersedes the older same-EUR instruction and is persisted in `AGENTS.md`. Public business prices are distinct from the OpenAI API budget/usage ledger, which remains USD.

The pre-existing Antigravity USD edits were preserved in the working tree. This admin fix does not commit or broaden those unfinished pricing edits. The owner explicitly deferred a full pricing-page consistency review. That future task must review every EN price section, service detail, inquiry template, metadata/JSON-LD, machine-readable content and chatbot fact/price guard together; passing package-price checks does not establish complete market-price consistency. Do not invent missing USD amounts or convert EUR automatically.

## Validation scope

Lint, TypeScript and production build were run with the preserved QA working-tree edits present. Additional checks cover current pricing/knowledge behavior without declaring the full USD audit complete. No production database, deployment, real provider call or email was triggered by this follow-up. The local QA inquiry and its sent notification were left intact.

Final results: production build, ESLint and TypeScript passed. **54 targeted tests passed**: 10 admin/Auth.js/API/UI cases (including count rendering and reload persistence), 1 raw HTTP cookie/idempotency case, 13 chatbot registry/policy cases and 30 pricing/customer-journey cases. Final admin and HTTP runners were executed sequentially to avoid overlapping Playwright artifact directories. No claim is made that the deferred full USD consistency audit is complete.
