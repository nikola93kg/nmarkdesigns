# Chatbot production rollout — prepared 2026-11-19

## Current target, verified through Hostinger

- Website: `https://nmarkdesigns.com`, existing Node.js / Next.js website, Node 22.
- Git source: `nikola93kg/nmarkdesigns`, automatic deployment from `main`.
- Current production revision / rollback reference: `15e2788025776cafff57b9bb87d015f0a4f73ce3`.
- `feature/chatbot` includes that main revision. No merge, production deploy or remote configuration change was performed during price alignment.
- No assigned chatbot database or cron jobs were returned for this website. Runtime environment has existing SMTP, contact, Turnstile, site URL, GA and NODE_ENV settings; chatbot DB/auth/provider settings are absent.

## Price review

All current offers are derived from `content/pricing.ts`, including public pages, contact prefills, JSON-LD, chatbot facts and the statically generated `/llms.txt` response. Its public URL is unchanged.

| Service | Serbian / EUR | English / USD |
| --- | --- | --- |
| Landing | 300 | 750 |
| Business | 550 | 1,500 |
| Advanced | 900 | 2,500 |
| E-commerce | 1,200 | 3,500 |
| Redesign | 400 | 600 |
| SEO | 150 | 200 |
| Speed | 100 | 150 |
| AI integration | 350 | 450 |
| Hosting / year | 30 | 50 |
| Basic Care / month | 25 | 40 |
| Business Care / month | 50 | 75 |

Every numeric price is a starting price. Custom development/support is by quotation. The owner specified package and additional-service USD amounts; the last three US care amounts were selected under the owner's instruction to increase the remaining US prices. API/infrastructure fees remain separate. Historical/illustrative market research figures and third-party service prices are not current NMark offers and keep their stated currencies.

Current offers in the English AI, redesign, SEO and WordPress/Next.js articles are aligned too. Explicitly labeled Serbian-market research in the English pricing guide remains EUR.

## Ordered launch steps

1. Obtain explicit owner approval to merge this reviewed feature into `main` and overwrite the existing `nmarkdesigns.com` site. Git authorization for `feature/chatbot` alone does not authorize this. Because main auto-deploys, do not merge before the following preparation is ready.
2. Prepare the runtime privately, initially `CHAT_ENABLED=false`, `CHAT_PREVIEW=false`, `CHAT_LOCAL_TEST=false`, `CHAT_EMAIL_ENABLED=false`, `CHAT_RETENTION_ENABLED=false`. Preserve every existing runtime variable. The connector replaces the entire environment and masks existing values: never write masked placeholders back. Existing real Turnstile/GA/site settings must be preserved through hPanel or provided in a private local configuration before any full replacement. Never paste secrets into chat, Git or docs.
3. Provision the website's MySQL database; retain loopback `127.0.0.1:3306`. Confirm backup and restore access. Use an explicitly reviewed production migration command. The current `npm run chat:db:migrate:dev` intentionally rejects production; do not relabel the production database to bypass it. Apply the checked-in migrations 0000–0009 in order and verify their history/schema before allowing traffic. A production migration execution path still needs implementation and validation.
4. Configure a production OpenAI key/model and exact model-price metadata, separate high-entropy identity/auth/cron secrets, `CHAT_ORIGIN=https://nmarkdesigns.com`, `AUTH_URL=https://nmarkdesigns.com`, `ADMIN_ALLOWED_EMAIL=info@nmarkdesigns.com`, SMTP and the approved positive call caps. Retain monetary caps **$0.50/day / $4/month**. Provider credit balance is not read by the app. Verify model pricing before launch; see `env.example` for all key names. No secrets belong in build logs or cron URLs.
5. Publish and review truthful SR/EN processing/privacy notices describing actual providers, stored conversation/contact data, retention and contact. Configure their approved URLs. The development-only local notice cannot satisfy production requirements; published approved URLs have not yet been established. Keep the proxy IP-header setting unset until Hostinger forwarding behavior is verified.
6. Merge/deploy the reviewed revision with the feature off. Verify ordinary site routes, localized SEO/robots, current prices, contact form and admin protection; confirm that production remains indexable only as intended.
7. Configure the protected notification worker and cleanup schedules using `run-maintenance.mjs` and a private env file outside the public root (see `operations.md`). Verify actual Node/application paths on Hostinger. Exercise authorization failures and a successful job; verify scheduled execution rather than only manual invocation. Backfill metrics before checking historical totals.
8. Enable the chatbot and test one SR and one EN exchange, unrelated-topic rejection, quota handling, contact/lead consent, durable records, admin counts, magic-link login and email delivery. Real smoke tests use the owner's capped API credit and test inbox. Reconcile usage and confirm worker retry/deduplication. Then enable email and the approved retention schedule once their checks pass.
9. Roll back by disabling the chatbot first. Re-deploy the previous known-good application revision if needed; preserve data and backups. Code rollback does not reverse schema migrations. Do not restore/drop production tables as an automatic rollback step.

## Authorization reference

`AGENTS.md`, “Chatbot branch workflow”: main commits/pushes/merges require explicit owner approval. The Hostinger `deploy-to-hosting/SKILL.md` also requires target-domain confirmation before the first overwrite of an existing site. This document prepares that concrete review; it does not claim that production is configured or the chatbot is live.

## Alignment validation

- Production build and ESLint passed; TypeScript passed explicitly and again during the final build.
- 30 production-browser checks passed: pricing and customer journeys, both locales, 320/375/430/768/1024/1440/1920px pricing layouts, no overflow/clipped text, keyboard/language navigation, axe at 375/1440px, contact prefills, five service Offer schemas, four English articles and `/llms.txt`.
- 16 chatbot contract/topic/lead/local-configuration checks passed without provider calls or database writes. They cover every current market price, cross-currency rejection and split-stream price checking.
- English 375px and 1440px pricing screenshots were visually inspected. No layout/style redesign was needed.
- No paid AI calls, real emails, production SQL, deployment or main changes were made during this alignment.


## Owner-created database — follow-up

The owner subsequently merged/deployed main and created `u540890623_nmark_chatbot` (the `_prod` suffix exceeded the panel limit). Their hPanel screenshot shows the database assigned, with external connections off. The earlier environment/database observations above describe the pre-creation state.

[First-import instructions](sql/README.md) and [schema-only SQL](sql/hostinger-initial.sql) now provide a phpMyAdmin initialization path without changing the development migration guard. The export was tested on disposable local MySQL 8.4 databases: all 15 tables matched a separate native Drizzle migration run, all 10 ledger hashes/timestamps matched, a later native migrator made no changes, re-import failed at the existing ledger table, and Unicode roundtrip passed. Temporary test databases and the isolated QA container were removed. No production SQL has been executed by the agent. This file is for an empty database only; it does not implement upgrades of populated production databases.

## Production runtime and privacy follow-up

After the owner added environment variables, Hostinger build `01a1f4de-bbf9-72d7-9d1e-b218e29a92b3` completed successfully from main revision `558b1b44f0a55506e24044d429b0fd0dcd1404cb`. The configuration API showed DB, OpenAI, admin and budget keys; it masks values, so this is not proof of valid credentials or correct amounts. At the check, the two policy URL keys were absent. Public/admin login returned 200, an unauthenticated private metrics request returned 401 and the chat session endpoint returned 503. No owner sign-in, DB connection or paid AI round trip was claimed by those reads.

The owner requested SR/EN policy drafts and confirmed the brand is not yet a registered business. [Privacy review](privacy-review.md) records the implemented routes, draft safeguards and unresolved controller/retention/provider facts. These new drafts are on `feature/chatbot`; they have not been deployed or approved as final consent notices.
