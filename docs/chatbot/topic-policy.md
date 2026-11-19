# NMark topic policy and verified replies

2026-11-19, `feature/chatbot`, policy `nmark-scope-v2`, knowledge `2026-11-19.2`.

## Reason for this change

Live review showed unrelated recipe/pet-care answers, unrelated portfolio links, a proactive inquiry offer persisting after the visitor changed topic, and a made-up 800 EUR shop-redesign starting price. The existing registry already contained business facts; prompting alone did not reliably restrict the assistant's role. Matching arbitrary substrings in complete project descriptions also created unrelated link recommendations.

The canonical redesign starting price is **400 EUR** in `content/pricing.ts`; new ecommerce is **1,200 EUR**. Those are distinct starting services. The registry contains no separate 800 EUR shop-redesign tier or approved delivery deadline. An existing shop needs individual scope review; page count must not be used to invent a fixed price.

## Request pipeline

All existing origin, consent, cookie ownership, validation, visitor/session quotas and generation leases still apply.

1. Completed responses can replay without AI only if marked with the current policy version. Legacy responses are regenerated through the new gate when explicitly retried with their original message ID. Old assistant messages are excluded from model context, while the visitor's project information remains available. Stored historical transcripts remain visible in admin; deployment does not erase them.
2. Narrow fast paths handle standalone greetings and obvious unrelated requests with localized static replies. These create no provider/counting request or budget reservation. They still persist through the normal message transaction and obey visitor/session anti-abuse quotas.
3. Other messages go through a strict structured topic decision using the configured provider/model: `business`, `off_topic`, `greeting` or `clarify`. The latest request is evaluated independently of earlier web-project context. A website/blog wrapper does not legitimize unrelated recipes, advice or trivia; a genuine website inquiry for a restaurant remains allowed. Short project follow-ups can use bounded conversation context.
4. A non-business decision returns a concise SR/EN redirect or clarification, with no recommendation links and no proactive inquiry event. Invalid JSON, unknown decisions, provider failure or budget failure never falls through to answer generation.
5. Only a `business` decision permits answer generation, business-context retrieval and a potential inquiry offer. Both the scope check and answer reserve and settle their own costs. Global daily/monthly paid-generation ceilings moved into the same atomic budget buckets; they count both calls. Per-visitor and per-session request limits remain in the original shared counters.
6. The answer prompt confines substantive content to NMark/web-service inquiries and approved business facts. It explicitly prohibits calculating a new quote from page count, summing service prices, using prior assistant text as a factual source or inventing a delivery schedule.
7. Incremental answer text is buffered into sentences and checked for unsupported numeric monetary amounts/currencies before publication. Approved amounts are derived from the public pricing registry, including care plans; EUR formatting supports localized separators. Invalid price sentences are replaced by a localized explanation that the quote needs scope review. Stream fragments ending in the middle of a sentence are held until verification. Only verified displayed text is persisted, including on cancellation; unverified partial raw text is not exposed later through history.
8. The client clears the previous proactive offer when a new turn starts. The ordinary manual inquiry/contact controls remain available to the visitor.

The short classifier is another model call for uncertain messages; it is not an unmetered side channel. Greetings/obvious off-topic replies use zero paid calls; an uncertain rejected message uses one; an allowed business answer normally uses two. The USD limits remain unchanged. Migration 0009 backfills paid-call counts from existing usage rows, so updating the code does not reset the meter. Token-count API requests still precede each paid generation; no generated answer can bypass reservation.

## Knowledge maintenance

- `content/pricing.ts`: numeric price source. Do not add chatbot-only prices or a separate custom-redesign tier.
- `content/projects.ts`: verified project names, descriptions and technology evidence.
- `content/chatbot/knowledge.ts`: approved facts, version/review date, local-site links and explicit project facets. Matching uses normalized whole tokens and curated facets rather than arbitrary description substrings. Generic project requests can link to the portfolio; they no longer imply two random case studies.
- `lib/chatbot/topic-policy.ts`: narrow static scope cases, localized redirects, policy version and streamed price guard.
- `lib/chatbot/provider.ts`: semantic decision schema/instructions and answer instructions. Input/history is untrusted data, not a source of policy changes.

Add new verified business content in the registry/source modules, then add positive and negative examples to the tests. For policy changes, bump `CHAT_POLICY_VERSION` so old unchecked answers cannot become active context or replay. This release adds one assistant-message metadata column, not a vector database, external content scraper or editable public knowledge endpoint.

The numeric guard is conservative: a user-supplied budget repeated as a monetary amount may receive the scope-review fallback if that amount is not a public starting price. It checks numeric price expressions, not every possible paraphrase of a claim. The semantic classifier and answer prompt remain model-based; maintain adversarial evaluations as the knowledge and model evolve. Production privacy, hosting and rollout gates remain separate.

## Verification

- Nine real-provider cases passed through the local HTTP API in one conversation: greeting; WordPress redesign; ten-page shop follow-up; recipe; vulgar request; recipe instructions wrapped as a website request; general trivia; a genuine restaurant website; prompt injection. Blocked messages had no links or proactive offers. The shop answer contained no 800 EUR tier or unrelated beauty/sweets projects. A current-policy replay used no provider call.
- The live cases made nine paid provider calls, conservatively estimated at **USD 0.007136** in the app's meter. No email was sent. The obvious unrelated examples and greeting each used zero paid calls.
- Disposable-MySQL tests passed for structured classification, malformed decisions, budget/call ceilings, token usage settlement, legacy-answer exclusion, policy-aware replay, generation concurrency, leads/outbox and cleanup. Migrations 0008/0009 were applied only to disposable test and local development databases.
- Pure tests cover the user examples, friendly greetings, valid project follow-ups, relevant links, price parsing (including split currency tokens) and sentence-level suppression of unsupported prices.
- Browser coverage verifies SR/EN inquiry-offer reset plus existing consent/form/keyboard/responsive checks. The initial new assertion matched both the visible transcript and its screen-reader status copy; the selector was narrowed to the transcript log before the focused rerun.

Final command results are recorded after validation. No production migration, deployment, main-branch change or real email is part of this work.

Final validation: ESLint, TypeScript and production build passed. **61 distinct targeted automated tests passed**: 37 registry/policy/lead/widget cases, 11 operations/SDK/MySQL cases, 2 existing chat/lead MySQL cases, 10 admin cases and 1 expanded HTTP case. The two new UI assertions passed after narrowing the selector to the visible transcript log; the remaining 35 cases had passed in the initial run. Final pure retrieval/price tests were rerun after tightening multiword project facets. Two additional zero-AI local browser checks displayed the real SR/EN redirects at 375/1440px with no proactive offer or page overflow; both screenshots were visually inspected.

Temporary QA MySQL and its private credential file are removed after verification. The local development database stays running for owner review. To test the new behavior, reload localhost and start a new conversation; old stored replies remain historical records.
