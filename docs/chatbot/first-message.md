# First-message entry flow — 2026-11-19

The owner approved a shorter SR/EN entry flow: no name field, immediate composer, a short OpenAI/storage notice and a visible Privacy link. The separate “Agree and start chatting” screen is removed. The existing consent-based API contract is preserved; this implementation does not establish a different legal basis or finalize the policy drafts.

## Behavior

- Opening the panel or typing does not create a new chat session or send a message. Where a valid notice URL exists, the panel may restore a previously consented session through the existing GET endpoint.
- Sending a nonblank first message (button, Enter, or a predefined question) is explicitly described beside the composer as the consent action. A session POST with `consent:true` and notice version `2026-11-19-v2-first-message` must succeed before the message POST starts.
- The synchronous in-flight guard covers both session creation and generation, preventing rapid submissions from creating duplicate first requests.
- If session creation fails, the composer retains the draft and no model request is sent. Retry reuses the original message attempt. Existing stream retry/idempotency, cancellation, ownership, limits and inquiry consent remain in place.
- Starting a new conversation clears the local transcript and draft. It creates no session until another message is sent. Existing records are not deleted. The version change requires renewed consent for older browser sessions rather than silently reusing the old notice version; old records remain available to the owner in admin.
- Initial predefined-question metrics are recorded only after session creation and remain gated by analytics consent. The regular contact/inquiry form still collects contact details separately.
- Local preview uses the same immediate composer, keeps its demo disclosure and sends no backend/provider requests.

## Missing or unapproved policy

The existing fail-closed policy checks remain intact. Owner publication approval was recorded on 2026-11-20; the approved SR/EN routes are accepted, while missing or invalid configured URLs still block submission. The regression command is now `CHAT_POLICY_MISSING_TEST=true npm run test:chatbot -- first-message.spec.ts`. When URLs are missing, the composer accepts a local draft, but send and predefined-question buttons are disabled, Enter is guarded, and no session restoration is attempted. The Privacy link leads to the relevant policy page. Production configuration, main merge and deployment remain separate operations.

## Review

The visible notice says what happens to messages and links to details. It does not describe a blanket acceptance of a policy, grant marketing permission, add a name requirement or claim the operator is a registered company. The policy drafts' flow description was updated accordingly. Outstanding controller/provider/retention facts remain in [privacy-review.md](privacy-review.md).

## Validation

- Production build, TypeScript and ESLint passed.
- 41 checks passed: 15 contract/configuration/topic-policy checks, 25 production-build browser checks and one draft-policy browser check. Browser coverage includes both locales, widths 320–1920px, accessibility, session-before-message ordering, duplicate submission prevention, session failure/retry and inquiry flows. API responses were mocked; no provider calls or emails were sent.
- Inspected the SR mobile and EN desktop screenshots.
- The four local-demo checks could not be completed: a disposable isolated Next.js dev server failed with `Manifest file is empty` / incomplete JSON manifests, including after clearing its own cache and using one worker. The owner's existing development server and local environment were left untouched. Production-build browser checks passed; this does not establish that the local-demo suite passed.
