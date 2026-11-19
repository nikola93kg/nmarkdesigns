# Real chatbot on localhost

The owner requested live local testing on 2026-11-19. The widget in this workspace now uses the real OpenAI provider and persistent local MySQL instead of demo replies. Only private local configuration changed activation; other checkouts still default to the development demo, and production still requires explicit configuration and reviewed policy URLs.

## Review

1. Keep Docker's `nmark-chatbot-dev` container running. If needed: `docker start nmark-chatbot-dev`.
2. Start `npm run dev`. If it was already running, reload the page after its environment reload; restart it if the previous mode remains.
3. Open **http://localhost:3000/sr/** or **http://localhost:3000/en/**. Use `localhost`, matching `CHAT_ORIGIN` and `AUTH_URL`, rather than switching to `127.0.0.1`.
4. Dismiss the cookie banner, open NMark Assistant, read the local-testing notice and explicitly accept chat processing. The header says “Lokalni test · pravi AI” / “Local test · live AI”. Use synthetic questions/contact information.
5. Try website pricing, project recommendations, Serbian/English follow-ups and reload restoration. The saved conversations and API usage can be reviewed in `/admin/sr/`.

Private `.env.local` has `CHAT_ENABLED=true`, `CHAT_PREVIEW=false`, `CHAT_LOCAL_TEST=true`, loopback `CHAT_ORIGIN`, a generated session identity secret, 30/day and 300/month call ceilings, 600 maximum output tokens and the previously approved USD 0.50/day and USD 4/month budgets. Pricing/model and the local DB settings remain configured. Keys/passwords are never committed. Email delivery is off; submitting a test inquiry only stores it and its outbox entry until an explicitly enabled worker runs. Actual AI requests do consume API credit.

`CHAT_LOCAL_TEST` is a development-only opt-in, restricted to a plain HTTP loopback origin. It provides `/api/chat/local-notice/?locale=sr|en` instead of inventing a published privacy-policy URL. The private test notice explains provider processing, local storage, retention, manual deletion and the lack of a local cron schedule. Production ignores this flag; the notice endpoint returns 404 and ordinary production privacy requirements remain unchanged. The existing chat consent, ownership, origin, database and budget checks all remain active.

To return this machine to the demo, set `CHAT_PREVIEW=true` and reload/restart development. To hide the widget, set `CHAT_ENABLED=false`. This does not delete stored real conversations; use owner administration for deletion.

## Verification

- Real browser flow on localhost used two synthetic questions: Serbian business website pricing and an English online-store follow-up. Both OpenAI streams completed and returned the approved starting prices (550 EUR / 1,200 EUR).
- The local database contained four saved messages, including two completed assistant responses. Reloading the EN page restored all four through the owned session API. Browser page errors: zero.
- Two real provider calls settled in the local budget meter, estimated total **USD 0.002094** using configured conservative rates. This is an application estimate, not a reading of provider balance. No email was sent.
- Serbian mobile (375px) and English desktop (1440px) live screenshots were inspected. Existing consent, form, keyboard and responsive coverage was rerun with the API key explicitly blanked in mocked tests.
- A focused configuration test verified explicit opt-in, loopback-only origins, and production refusal to use a local notice. Production HTTP behavior also verified 404 for the local notice route.

No Hostinger database, production enablement, deployment, merge or changes to `main` are part of local testing.

Validation commands passed: `npm run lint`, `npm run typecheck`, `npm run build`, and the focused local configuration test. In mocked browser coverage, 24/25 cases passed initially; one mobile form case timed out while clicking consent under parallel load. All four SR/EN mobile/desktop form cases passed when rerun sequentially. The successful real-provider browser flow was separate from those mocked tests.
