# Phase 2A: Technical SEO Foundation & Indexing Integrity Implementation Report

**Project:** NMark Designs (https://nmarkdesigns.com)  
**Branch / Worktree:** `website_audit_phase_zero`  
**Date:** October 10, 2026  
**Status:** **Completed & Verified** (Audit + Implementation + 48/48 E2E Tests Passing)

---

## 1. Executive Summary & Problem Analysis

In Phase 0, a comprehensive audit identified key strengths alongside critical SEO migration gaps:
1. **Seven Legacy WordPress Portfolio URLs Returned 404:**  
   In the legacy WordPress installation, 15 projects were published. In the Next.js rebuild, only 8 projects had full case studies (`caseStudyProjects`). The remaining 7 projects were retained in the portfolio archive dataset (`content/projects.ts`), but their legacy WordPress permalinks (`/portfolio/{slug}/`) were missing from `lib/legacy-redirects.ts`. Consequently, any legacy backlinks or search engine index entries targeting those 7 URLs resulted in HTTP 404 errors.
2. **Canonical & Hreflang Integrity:**  
   Strict self-referencing canonical URLs and bidirectional alternates (`sr`, `en`, and `x-default -> sr`) exist across all 44 indexable pages. Trailing slash consistency is strictly enforced with HTTP 308 redirects.
3. **Sitemap & Robots Directives:**  
   `/sitemap.xml` dynamically lists exactly the 44 indexable URLs (50 static pages generated total, with 44 public content URLs and 6 utility/root assets). `/robots.txt` dynamically serves canonical-host-aware rules (allowing indexable crawlers on `nmarkdesigns.com` and disallowing all on non-production hosts).
4. **Structured Data Foundation:**  
   JSON-LD schemas exist for `Organization`, `WebSite`, `Person`, `BreadcrumbList`, and `BlogPosting`. No malformed JSON-LD or fabricated claims are present.

---

## 2. Legacy URL Recovery & Redirect Mapping

### Verified Recovery of 7 Legacy Portfolio URLs
Rather than redirecting legacy portfolio URLs generically to the homepage (a soft-404 antipattern), each legacy URL was analyzed against the live portfolio dataset in `content/projects.ts` and `components/portfolio/PortfolioShowcase.tsx`:

| # | Legacy WordPress URL | Project Title | Project Destination | HTTP Status | Redirect Mechanism |
|---|----------------------|---------------|---------------------|-------------|--------------------|
| 1 | `/portfolio/anabelabebioprema/` | Anabela Bebi Oprema | `/sr/portfolio/#project-anabelabebioprema` | 308 Permanent | Direct 1-hop, preserves query strings |
| 2 | `/portfolio/frankultura/` | Frankultura | `/sr/portfolio/#project-frankultura` | 308 Permanent | Direct 1-hop, preserves query strings |
| 3 | `/portfolio/dh-travell/` | DH Travel | `/sr/portfolio/#project-dh-travell` | 308 Permanent | Direct 1-hop, preserves query strings |
| 4 | `/portfolio/madjionicar-bojan/` | Mađioničar Bojan | `/sr/portfolio/#project-madjionicar-bojan` | 308 Permanent | Direct 1-hop, preserves query strings |
| 5 | `/portfolio/nest-home-solutions/` | Nest Home Solutions | `/sr/portfolio/#project-nest-home-solutions` | 308 Permanent | Direct 1-hop, preserves query strings |
| 6 | `/portfolio/stamenko-milic-photography/` | Stamenko Milić Photography | `/sr/portfolio/#project-stamenko-milic-photography` | 308 Permanent | Direct 1-hop, preserves query strings |
| 7 | `/portfolio/banquetes-castellanos-zoreda/` | Banquetes Castellanos Zoreda | `/sr/portfolio/#project-banquetes-castellanos-zoreda` | 308 Permanent | Direct 1-hop, preserves query strings |

### Implementation in `lib/legacy-redirects.ts`
The legacy redirects dictionary was updated to map all 15 projects dynamically from `content/projects.ts`:
- If `project.caseStudy` exists: redirects to `/sr/portfolio/${project.slug}/` (dedicated case study route).
- If no case study exists: redirects to `/sr/portfolio/#project-${project.slug}` (exact anchor on the live portfolio showcase page where the project card, screenshot, description, and client link are rendered).
- Handled in `proxy.ts` middleware with HTTP 308, attaching query parameters and security headers without intermediary hops.

---

## 3. Technical SEO Route & Indexing Audit

### Canonical URLs
- **Format:** Strict trailing slash (`https://nmarkdesigns.com/{locale}/{path}/`).
- **Generation:** Handled in `lib/metadata.ts` via `canonicalUrl(pagePath(locale))`.
- **Self-referencing:** Verified that all Serbian pages canonicalize to their `/sr/` variant, and all English pages canonicalize to their `/en/` variant.
- **Root & Non-Trailing Slash:**
  - `GET /` -> 308 Redirect to `/sr/`
  - `GET /sr` -> 308 Redirect to `/sr/`
  - `GET /en/about` -> 308 Redirect to `/en/about/`
  - Non-trailing slash requests preserve query strings across the single 308 hop.

### Hreflang Alternates
- **Bidirectional Mappings:**
  - `sr` -> Serbian canonical URL
  - `en` -> English canonical URL
  - `x-default` -> Serbian canonical URL (`/sr/...`)
- **Shared Slugs Verification:**
  - Blog post slugs are identical in Serbian and English (e.g. `/sr/blog/iphone-duo-responsive-web-dizajn/` and `/en/blog/iphone-duo-responsive-web-dizajn/`).
  - Hreflang correctly maps between locales for each individual post without cross-canonical pollution.

### XML Sitemap & Robots Directives
- **XML Sitemap:** Dynamic Next.js route at `/sitemap.xml`.
  - Lists all 44 indexable pages with explicit `xhtml:link rel="alternate"` hreflang annotations.
  - Excludes 308 redirects, 404 routes, preview URLs, and non-canonical pages.
  - Response status: 200 OK, `content-type: application/xml`.
- **Robots.txt:** Dynamic Next.js route at `/robots.txt`.
  - Canonical host (`nmarkdesigns.com`): `User-agent: *`, `Allow: /`, `Sitemap: https://nmarkdesigns.com/sitemap.xml`.
  - Non-canonical / preview / staging hosts: `User-agent: *`, `Disallow: /`, accompanied by `X-Robots-Tag: noindex, nofollow`.

---

## 4. Structured Data (JSON-LD) Audit

### Existing Schemas Verified:
1. **Organization (`https://nmarkdesigns.com/#organization`):**
   - Output on homepage (`/sr/` and `/en/`).
   - Fields: `name`, `url`, `logo`, `email`, `telephone`, `sameAs: [Instagram]`, `founder: Person`.
2. **WebSite (`https://nmarkdesigns.com/#website`):**
   - Output on homepage.
   - Fields: `name`, `url`, `inLanguage: ["sr", "en"]`, `publisher: Organization`.
3. **Person (`https://nmarkdesigns.com/#nikola-markovic`):**
   - Output on About page (`/sr/o-nama/` and `/en/about/`).
   - Fields: `name`, `jobTitle: "Frontend developer"`, `image`, `url`, `brand: Brand`.
4. **BreadcrumbList:**
   - Output on Case Studies (`/portfolio/[slug]/`) and Blog Posts (`/blog/[slug]/`).
   - Valid 2-item hierarchy (`Portfolio` / `Blog` -> Item).
5. **BlogPosting:**
   - Output on Blog Posts.
   - Fields: `headline`, `description`, `abstract`, `inLanguage`, `datePublished`, `dateModified`, `image`, `mainEntityOfPage`, `author`, `publisher`, `articleSection`, `citation`.

### Integrity Constraints Preserved:
- No fabricated reviews, aggregate ratings, business addresses, or unsubstantiated awards were added.
- Substantial expansion (such as `Service` schemas with localized descriptions and entity sameAs links) is scheduled for Phase 2B.

---

## 5. Verification & Test Suite Results

### Automated Test Runs:
1. **ESLint:**
   ```bash
   npm run lint
   # Result: 0 warnings, 0 errors
   ```
2. **TypeScript Compilation:**
   ```bash
   npm run typecheck
   # Result: Types generated successfully, 0 type errors
   ```
3. **Production Webpack Build:**
   ```bash
   npm run build
   # Result: Compiled successfully in 3.3s, 50/50 static routes prerendered
   ```
4. **Playwright SEO Test Suite (`tests/seo.spec.ts`):**
   ```bash
   npm run test:e2e tests/seo.spec.ts
   # Result: 48/48 tests passed (0 failures)
   ```
   Verified:
   - 44 crawlable pages (200 OK, canonical, hreflang, Open Graph, Twitter cards, single H1, semantic heading order, image alts/dimensions, JSON-LD validity).
   - Sitemap XML completeness, valid loc tags, absence of deprecated tags.
   - Robots.txt host isolation (production allow vs preview disallow).
   - Exact 1-hop 308 legacy redirects for all 15 portfolio projects, root `/`, and core pages with query preservation.
   - Genuine 404 status and `noindex, nofollow` headers for unknown legacy and case variants.

---

## 6. Files Modified

- `lib/legacy-redirects.ts`: Extended mapping to dynamically include all 15 portfolio projects (8 case studies -> dedicated routes, 7 archive projects -> `/sr/portfolio/#project-{slug}`).
- `tests/seo.spec.ts`: Updated test suite to import `projects` and assert 1-hop 308 redirects for all 15 projects.

---

## 7. Production Deployment & Rollback Plan

### Deployment Checklist:
- [x] All 15 legacy WordPress project URLs return 308 to live destinations.
- [x] Zero 404 errors on legacy portfolio routes.
- [x] Canonical and hreflang annotations match exactly between HTML and sitemap.
- [x] Build passes with 0 warnings or errors.
- [x] Preview protection preserves `X-Robots-Tag: noindex, nofollow` for staging.

### Rollback Plan:
If unexpected redirect issues occur in production:
- Revert commit on `website_audit_phase_zero`.
- The previous implementation falls back to handling only 8 case study routes.
