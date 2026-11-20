# Privacy notice review — 2026-11-19

## Owner publication decision — 2026-11-20

This update supersedes the draft status described in the historical review below. The owner approved the remaining content and requested removal of draft labels and business-registration commentary. They confirmed Nikola Markovic as the person operating the site, Lazarevac/Beograd as the contact location, and the existing info@nmarkdesigns.com mailbox for privacy requests (the abbreviated spelling in the reply was interpreted using the established public mailbox).

SR/EN now name the controller and contact location, remove the draft banner and registration commentary, and use a November 20 update date. No street address, company registration, signed provider agreement or active cleanup schedule is invented. Publication status is approved, allowing the existing SR/EN URLs through the chat resolver and including the pages in the sitemap; preview-host noindex protection remains. Unverified retention outside the application is still disclosed, and an active cleanup schedule is not claimed. These operational details still need owner follow-through; approval of the copy is not an assertion of legal or operational compliance.

The change is prepared on feature/chatbot. Main merge, production deployment and runtime environment edits require separate authorization. After deployment, configure the two policy URLs below if not already present, then verify the real session/provider path.

Validation for this update: production build (including TypeScript) and ESLint passed; two configuration tests, six SR/EN privacy-page browser checks at 375/1440px (including accessibility), the missing-policy submission check and the complete sitemap/metadata/preview-robots check passed. Reviewed the generated privacy-page screenshot. No real AI requests, emails, runtime configuration edits or production deployment were performed.

## Owner approval — 2026-11-20

The owner approved the bilingual text, requested removal of the public draft banner and registration commentary, and confirmed Nikola Markovic, Lazarevac/Beograd, and the existing info@nmarkdesigns.com mailbox for privacy requests. The location is published as a contact location, not an invented street address. Publication status is now approved, which makes the configured SR/EN policy URLs eligible for chatbot use and includes the routes in the sitemap. Preview-host indexing safeguards remain active. No production environment, cleanup schedule or provider account setting was changed. The operational review items below remain a record of what must be checked; text approval is not evidence of provider contracts, automated retention enforcement or a legal-compliance certification.

## Original draft review — historical status

- SR: `/sr/politika-privatnosti/`
- EN: `/en/privacy-policy/`
- Both new production URLs returned 404 before this implementation; no existing public URL is replaced and no speculative redirect is added.
- Content: `content/privacy.ts`; shared server-rendered page: `components/privacy/PrivacyPage.tsx`.
- The owner requested both drafts and confirmed that NMark Designs is not yet a registered business. No company registration, tax number, address, controller identity or DPO appointment has been invented.
- `privacyPublication.approved` is **false**. The pages display a prominent draft notice, have noindex metadata and response headers, and are omitted from sitemap. Footer, contact form and cookie-preference dialog provide equivalent localized links. Language switching preserves the page.
- The chatbot's URL resolver rejects these draft routes (with or without the trailing slash) as a consent-policy URL. Explicit development-only local testing remains available. No production env, enablement, cleanup or deployment setting was changed.

## Required owner decisions before final publication

1. Confirm the actual controller: a natural person is possible; registration as a company is not assumed. Confirm the full name and suitable controller contact address. The known founder/public contact is not silently treated as a confirmed controller or DPO.
2. Confirm the privacy-request mailbox. The existing public `info@nmarkdesigns.com` appears as a contact for questions about the draft; its formal request-handling role is not asserted.
3. Review the proposed purposes and legal grounds: inquiry handling at the person's request before contracting, security/administration legitimate interest with an assessment, and the separate chat/analytics consent choices. A UI acceptance alone does not establish that the proposed basis is legally sufficient in every jurisdiction.
4. Confirm actual provider accounts/contracting entities, hosting location, subprocessors and international-transfer safeguards under the relevant contracts. The text does not claim EU-only storage, a signed DPA/SCC or zero retention without evidence. Verify OpenAI training/data-sharing settings against the production project.
5. Set retention/handling for mailbox copies, correspondence, backups, hosting logs, admin audit logs and GA property data. Do not infer these from the 90/365-day application cleanup rules. Identify how erasure/access requests are handled across those copies and providers.
6. Verify scheduled cleanup and backups/restores before promising enforcement of the application periods. Keep `CHAT_RETENTION_ENABLED` and email automation tied to their separate operational checks. No cron job is claimed to be active.
7. Review the complete bilingual text and approve it. After confirmed details and operational settings are reflected in the text, change publication status and the draft-specific wording/date. Publication requires owner approval for main/deployment separately.

## After approved publication

Verify HTTP 200, equivalent SR/EN routes and the final visible text, then set only these approved URLs in Hostinger:

```dotenv
CHAT_PRIVACY_URL_SR=https://nmarkdesigns.com/sr/politika-privatnosti/
CHAT_PRIVACY_URL_EN=https://nmarkdesigns.com/en/privacy-policy/
```

Do not point those variables to the homepage, a 404, this draft or the development local notice. Preserve all existing runtime variables when making changes. Enabling the feature is a later operation after admin/DB, provider limits, consent, notification scheduling and retention checks.

## Evidence used

Code review covered chat provider `store:false` requests and semantic classification, message history, inquiry storage/outbox, 24-hour chat access cookie, eight-hour admin sessions and ten-minute sign-in links, retention/aggregate operations, contact SMTP delivery and in-memory throttling, consent localStorage and gated GA loading. Chat DB retention does not control email copies or provider records. No claim of anonymization is inferred merely from pseudonymous identifiers.

Official sources checked 2026-11-19:

- [Serbian data protection law, official Parliament text](https://www.parlament.gov.rs/upload/archive/files/lat/pdf/zakoni/2018/2959-18-lat.pdf): controller and notice requirements; natural/legal persons are distinguished.
- [Commissioner: data subject rights](https://poverenik.rs/zastita-podataka/kako-da-ostvarite-svoja-prava/?script=lat): access, correction, erasure and requests/complaints, subject to conditions.
- [OpenAI API data controls](https://developers.openai.com/api/docs/guides/your-data): default training exclusion unless sharing is enabled and abuse-monitoring retention/exceptions. `store:false` is not a blanket zero-retention guarantee.
- [Cloudflare Turnstile privacy addendum](https://www.cloudflare.com/turnstile-privacy-policy/): technical signals and bot protection.
- [Hostinger privacy policy](https://www.hostinger.com/legal/privacy-policy): provider information; it does not establish this owner's selected hosting region or signed contracts.
- [Google partner-site information](https://policies.google.com/technologies/partner-sites): provider receives visit/browser information when its services run. This site's script is gated by explicit consent.

This is a reviewable implementation and draft, not a claim of legal compliance or operational readiness.

## Validation

- Production build, TypeScript (explicit check and final build), and ESLint passed.
- 14 chatbot contract/topic/config tests passed, including refusal of the draft policy URLs and preservation of the explicit development notice.
- 69 browser checks passed across privacy pages, analytics consent, contact forms, localization and SEO (with targeted repeats after the final reading-width change). The first broad run passed 68 checks; its exhaustive serial metadata crawl exceeded the old 30-second timeout. That single crawl now has a 120-second limit and passed in 38.4 seconds, with all assertions retained.
- Six final privacy checks passed: SR/EN at 375/1440px with axe, no horizontal overflow, canonical/hreflang, noindex response headers even under the production Host header, sitemap omission, contents links, consent dialog, footer/contact links and equivalent-language navigation. Screenshots were inspected in a bounded two-pass review; the only layout adjustment limited article lines to 65ch.
- No real OpenAI calls, outgoing email, production data writes or production settings/deployments were performed for these drafts. Pre-existing portfolio/blog edits remain outside the commit.
