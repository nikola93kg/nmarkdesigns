# Verification Gaps & Unknowns Register

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Multi-Disciplinary Audit Team

---

## 1. Executive Statement on Verification

In strict accordance with Phase 0 instructions:
* **No assumption is treated as fact.**
* Inabilities to access backend services or private dashboards are explicitly recorded below as **NOT VERIFIED**.
* For each item, we document the exact evidence needed, the technical reason for the gap, and the validation command or instruction required to confirm it.

---

## 2. Gaps & Verification Matrix

| Ref | Domain | Verification Subject | Audit Status | Why It Could Not Be Verified in Phase 0 | What Is Required to Confirm / Verify |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GAP-01** | Lead Gen / Ops | Contact Email Inbox & SMTP Credentials | **NOT VERIFIED** | Delivery is disabled in code (`available: false`). No mailbox or API key is configured in repository. | Provider selection (e.g. Resend, Postmark) + DNS SPF/DKIM records + real test transmission. |
| **GAP-02** | Analytics | Google Analytics 4 Data Ingestion | **NOT VERIFIED** | Script tag with ID `G-TVJKFZRKRJ` is active in HTML, but live event ingestion into GA4 dashboard requires Google Analytics property access. | Google Analytics dashboard access or checking Network tab in browser for `collect?v=2` HTTP 204. |
| **GAP-03** | SEO / Search | Google Search Console Crawl & Coverage Stats | **NOT VERIFIED** | Verification code `6Xv8e2FJ-f85FWS7ql7WzFIFeZDTlLawCJ2LNP475s8` is live in HTML, but indexing status, search impressions, and crawl error logs require GSC access. | Search Console property access or URL Inspection API export. |
| **GAP-04** | Hosting / Infra | Hostinger Nginx / OpenLiteSpeed Raw VirtualHost Config | **NOT VERIFIED** | Probing revealed Hostinger hCDN overrides CSP and blocks `.env` with 403, but raw server configuration files (`/etc/nginx/...` or hPanel settings) are not in git. | Access to Hostinger hPanel / SSH server configuration. |
| **GAP-05** | Legal / Privacy | Serbian Personal Data Protection Act (ZZPL) / GDPR Compliance | **NOT VERIFIED** | The website loads Google Analytics without an upfront cookie consent banner. Legal necessity depends on business registration status in Serbia and analytics IP anonymization settings. | Client decision on privacy policy and cookie banner requirement for Serbian/EU visitors. |
| **GAP-06** | Testing / DX | Local E2E Test Execution in Worktree | **NOT VERIFIED** | `node_modules` is not installed inside this isolated git worktree branch (`eslint: command not found`). | Running `npm ci` once the audit phase concludes and code changes are authorized. |
| **GAP-07** | Field Perf | 75th Percentile Real-User Core Web Vitals (CrUX) | **NOT VERIFIED** | CrUX field data requires sufficient traffic volume on nmarkdesigns.com. Only laboratory/edge probe transfer data was measured. | Google PageSpeed Insights API check for domain-level origin CrUX data. |
