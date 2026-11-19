# Production troubleshooting — 2026-11-19

## Admin bind-address redirect

Observed directly: `GET https://nmarkdesigns.com/admin/` returned HTTP 307 with `Location: https://0.0.0.0:3000/admin/sr/`. The direct `/admin/sr/login/` returned HTTP 200 and a login form. This is a redirect origin bug, not evidence of a broken certificate for nmarkdesigns.com.

The entry handler built an absolute URL from `request.url`, which contains the internal origin behind the Hostinger reverse proxy. It now returns a fixed relative `Location: /admin/sr/` with private/no-store caching. It does not trust forwarded host headers or infer a public URL from the bind address.

Validation: production build including TypeScript, ESLint, three focused config/route tests, and a real local Next.js HTTP test passed. The HTTP test checks both `/admin` and `/admin/` with public Host plus internal forwarded-host headers, private/noindex response headers, and the direct login page. No login email or database writes were needed.

## Widget controls

- `CHAT_ENABLED=true` is required for production launcher HTML.
- `CHAT_PREVIEW` is development-only and cannot enable a production demo or override `CHAT_ENABLED=false`.
- Read-only production requests showed no launcher, with `Cache-Control: private, no-cache, no-store` and CDN status DYNAMIC. This rules out an ordinary cached page as the explanation for those responses.
- The owner confirmed the intended Hostinger setting is `CHAT_ENABLED=true`; the connector masks its value, so the actual string cannot be independently read through it. A new main build was still running at diagnosis time; recheck the published app after it completes before inferring a runtime mismatch. Values in hPanel's individual value fields should be plain `true`/`false`, without surrounding quotes or `KEY=` text.
- The two policy URL variables were still absent from the key list, and the policy publication flag remains a draft. Launcher visibility does not establish that AI processing is ready. Complete approved notices and the other runtime checks before allowing live conversations; do not bypass the draft guard to make the API respond.

This correction is prepared on feature/chatbot. Main merge and production deployment require the owner's separate approval under AGENTS.md. Existing unrelated portfolio/blog edits are excluded.
