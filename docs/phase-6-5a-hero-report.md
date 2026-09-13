# Phase 6.5A - Homepage Hero SEO, AIO and Visual Optimization

Completed: 2026-09-13. Refined again on 2026-09-13 for Hero copy, vertical composition and first-viewport presentation. Scope: homepage Hero, directly required localized content/types/styles/tests and this report.

No Portfolio, Services, CTA, FAQ, Footer, sitemap, robots, redirect, canonical, hreflang, public-page inventory or launch policy architecture was changed.

## 1. Existing Hero Audit

Reviewed before editing:

- `AGENTS.md`
- `docs/phase-6-report.md`
- `docs/migration-notes.md`
- relevant phase reports: Phase 2, 2.5, 3A, 5B and 5C
- Serbian and English dictionaries in `content/i18n/`
- `components/home/Hero.tsx`
- `components/ui/Button.tsx`
- `components/ui/Container.tsx`
- `components/ui/GridBackground.module.css`
- route helpers in `lib/routes.ts`
- homepage metadata in `app/[locale]/page.tsx` and `lib/metadata.ts`
- Organization/WebSite JSON-LD in `lib/schema.ts`
- homepage, SEO, pricing and localization tests
- visual reference `docs/reference/nmarkdesigns-current-homepage.pdf`
- current `/sr/` and `/en/` screenshots at 375, 430, 768, 1024, 1440 and 1920px

The existing Hero was server-rendered, used one visible H1, rendered normal links, used `next/image` with intrinsic dimensions and preloaded the above-the-fold montage. Those foundations were kept.

Weak points found:

- the eyebrow was more of a marketing claim than a service-category signal
- the Hero supported Contact + Pricing, while the stronger discovery path is Contact + Portfolio proof
- the supporting copy repeated pricing language rather than clarifying service scope
- the grid cells rendered at 80px, larger than the finer architectural pattern in the production reference
- desktop image sizing was slightly dominant relative to the copy
- after the first 6.5A pass, the desktop Hero height was still content-sized at about 630px; at 1440x800 and 1920x900 the Portfolio section began inside the first viewport

## 2. Search Intent Selected

Primary Serbian homepage intent: `izrada web sajtova`.

Supporting concepts used naturally: `web dizajn`, `razvoj`, `SEO`, fast/responsive websites, and websites for small businesses, entrepreneurs and brands.

No location targeting was added. No ranking, lead, revenue or conversion guarantees were added.

## 3. Serbian H1 Candidates Considered

| Candidate | Assessment |
| --- | --- |
| `Izrada web sajtova koji pomažu vašem biznisu da bude pronađen` | Strong search clarity, but longer and can imply search visibility as an outcome. |
| `Profesionalna izrada web sajtova za moderan online nastup` | Safe and natural, but close to the previous generic wording. |
| `Moderni web sajtovi dizajnirani za vaš biznis` | Pleasant and concise, but less explicit about the primary service intent. |
| `Izrada modernih, brzih i SEO optimizovanih web sajtova` | Clear but list-like and closer to keyword packing. |
| `Izrada modernih web sajtova za vaš biznis` | Clear and safe, but a little generic in tone. Replaced after review. |
| `Izrada web sajtova koji jasno predstavljaju vaš brend` | Stronger balance of primary intent, natural Serbian, brand value, factual safety and responsive wrapping. |
| `Izrada modernih web sajtova` | Final refined direction: shorter, more premium, still contains the primary service concept and lets the supporting line carry design/performance/SEO. |

## 4. Final H1 Decisions

Serbian H1:

`Izrada web sajtova koji jasno predstavljaju vaš brend`

Rationale: starts with the primary service, avoids unsupported outcomes, and communicates a more specific value than the generic "za vaš biznis" wording.

Refined Serbian H1:

`Izrada modernih web sajtova`

Rationale: keeps the core search intent, reads more premium and minimal, avoids generic agency phrasing, and gives the Hero a stronger visual headline.

English H1:

`Website design and development that presents your brand clearly`

Rationale: natural English search/user intent favors "website design and development"; this keeps the service explicit while matching the refined brand-presentation idea.

Refined English H1:

`Modern websites, thoughtfully built`

Rationale: natural English marketing language for the shorter Serbian H1. It is concise and premium, while the eyebrow, description and metadata retain explicit design/development/SEO context.

## 5. Hero Copy Before/After

Serbian before:

- Eyebrow: `Web sajt koji donosi rezultate`
- H1: `Profesionalna izrada web sajtova`
- Lead: `Moderni, brzi i SEO optimizovani.`
- Description: `Kreiramo sajtove za male biznise, frilensere i lokalne brendove. Pogledajte cene ili zatražite besplatnu ponudu.`

Serbian after:

- Eyebrow: `WEB DIZAJN · RAZVOJ · SEO`
- H1: `Izrada modernih web sajtova`
- Lead: `Dizajn. Performanse. SEO.`
- Description: `Kreiramo brze, responzivne i SEO optimizovane web sajtove sa fokusom na moderan dizajn, korisničko iskustvo i kvalitetnu tehničku osnovu.`

English before:

- Eyebrow: `A website that works for your business`
- H1: `Professional website design and development`
- Lead: `Modern, fast, and built for search.`
- Description: `Websites for small businesses, freelancers, and local brands. Explore our pricing or request a free quote.`

English after:

- Eyebrow: `WEB DESIGN · DEVELOPMENT · SEO`
- H1: `Modern websites, thoughtfully built`
- Lead: `Design. Performance. SEO.`
- Description: `We create fast, responsive, SEO-friendly websites with a focus on modern design, user experience, and a strong technical foundation.`

## 6. CTA Before/After

Before:

- Primary: Contact/quote
- Secondary: Pricing

After:

- Serbian primary: `Zatražite ponudu` -> `/sr/kontakt/`
- Serbian secondary: `Pogledajte projekte` -> `/sr/portfolio/`
- English primary: `Request a quote` -> `/en/contact/`
- English secondary: `View projects` -> `/en/portfolio/`

Both CTAs are normal crawlable links produced through the existing localized route helpers.

## 7. Metadata Before/After

Serbian before:

- Title: `Profesionalna izrada web sajtova | NMark Designs`
- Description: `Profesionalni web dizajn i izrada modernih, brzih i SEO optimizovanih sajtova za male biznise, frilensere i lokalne brendove. Pogledajte radove NMark Designs.`

Serbian after:

- Title: `Izrada web sajtova i web dizajn | NMark Designs`
- Description: `NMark Designs kreira moderne, brze i responsive web sajtove za male biznise, preduzetnike i brendove, uz web dizajn, razvoj, SEO optimizaciju i održavanje.`

English before:

- Title: `Professional website design and development | NMark Designs`
- Description: `Professional design and development of modern, fast, SEO-friendly websites for small businesses, freelancers and local brands. Explore work by NMark Designs.`

English after:

- Title: `Web Design and Website Development | NMark Designs`
- Description: `NMark Designs creates modern, fast, responsive websites for small businesses, freelancers, and brands, with web design, development, SEO, and maintenance support.`

The refined Hero copy did not require another metadata change. The metadata remains intentionally more explicit than the visible H1 and continues to describe the homepage search intent without copying the heading exactly.

## 7A. Height and Viewport Strategy

Header source:

- `components/layout/Header.tsx` uses `min-h-header`.
- `app/globals.css` defines `--spacing-header: 5rem` by default and `6rem` from `48rem` upward.
- Browser measurement showed about 81px on mobile and about 97px on desktop/tablet because the header also has a 1px bottom border.

Hero strategy:

- mobile remains natural content flow with normal `py-8`
- tablet/desktop use `md:min-h-[calc(100svh-var(--spacing-header)-1px)]`
- tablet/desktop also use `md:flex md:items-center` so the two-column composition sits centered inside the available space
- the section uses min-height, not fixed height, so it can grow for small viewport heights, wrapping, browser zoom or larger text
- no JavaScript viewport calculation was added

Measured after refinement:

| Viewport | Header | Hero bottom / Portfolio top |
| --- | --- | --- |
| 1024x800 | 97px | 800px |
| 1280x800 | 97px | 800px |
| 1440x700 | 97px | 700px |
| 1440x800 | 97px | 800px |
| 1920x900 | 97px | 900px |

Mobile remains natural:

- 320px can exceed the viewport because content wraps; nothing clips
- 375px and 430px are not forced to full viewport height, avoiding empty mobile space

## 8. Grid Changes

`GridBackground.module.css` now uses:

- 56px cells (`3.5rem`) instead of 80px (`5rem`)
- a lighter border mix: 28% instead of 35%

This keeps the reusable architectural grid visible but quieter. Because the existing grid utility is shared by light and dark brand sections, the refinement is intentionally small and token-based rather than a one-off Hero-only background.

## 9. Hero Image and LCP Decisions

Kept image: `/images/hero-montage.webp`.

Decisions:

- kept `next/image`
- kept intrinsic dimensions `1365 x 1100` for layout stability
- kept `preload` because the image is above the fold and a likely LCP candidate on desktop
- kept `quality={85}` because the source is already compressed WebP and the montage contains inspectable UI details
- tuned `sizes` from desktop `46vw` to `42vw` and capped desktop rendered width at 33-35rem
- did not add blur placeholders, video, animation, client JS or additional preloads
- kept meaningful alt text because the image shows a NMark Designs project montage and is not purely decorative

Final alt text:

- Serbian: `Vizuelna montaža NMark Designs web projekta na telefonu, tabletu i štampanim maketama.`
- English: `NMark Designs website project montage on a phone, tablet, and printed mockups.`

## 10. SEO and AI Search Reasoning

The Hero now improves machine and human understanding through visible, server-rendered content:

- one clear visible H1
- service-category eyebrow
- concise service/audience lead
- normal internal links to Contact and Portfolio
- metadata aligned with the visible H1 and homepage service scope
- existing Organization/WebSite structured data left unchanged because it remains consistent and verified

No hidden AI text, hidden keyword blocks, fake schema, invented FAQ content, fake reviews, statistics, service areas, `llms.txt`, or unsupported business claims were added.

## 11. Accessibility Impact

- The Hero remains a Server Component.
- The `<section>` remains labelled by the H1.
- The homepage still has exactly one H1.
- CTAs remain keyboard-focusable links with meaningful visible text.
- The image retains localized alt text.
- No information depends on hover, canvas or client-side rendering.

## 12. Performance Impact

- No dependency or client boundary was added.
- The Hero image remains optimized through `next/image`.
- Intrinsic dimensions and stable responsive sizing avoid layout shift.
- Slightly smaller desktop image selection should reduce LCP pressure compared with the previous sizing.
- CSS-only grid refinement adds no runtime JavaScript.

## 13. Files Changed

- `components/home/Hero.tsx`
- `components/ui/GridBackground.module.css`
- `content/i18n/types.ts`
- `content/i18n/sr.ts`
- `content/i18n/en.ts`
- `tests/localization.spec.ts`
- `tests/foundation.spec.ts`
- `tests/pricing.spec.ts`
- `docs/phase-6-5a-hero-report.md`

## 14. Validation Results

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build -- --webpack`: passed
- `npm run test:e2e`: passed, 181 tests
- `git diff --check`: passed

The latest run includes the added 1280px homepage responsive cases and the new desktop Hero first-viewport regression test.

Manual visual QA:

- current Hero screenshots captured before changes at 375, 430, 768, 1024, 1440 and 1920px for `/sr/` and `/en/`
- updated Hero screenshots captured after changes at 375, 430, 768, 1024, 1440 and 1920px for `/sr/` and `/en/`
- additional 320px updated Hero check performed for both languages
- latest refinement screenshots captured at 320, 375, 430, 768, 1024, 1280, 1440x700, 1440x800 and 1920x900 for `/sr/` and `/en/`
- representative mobile, tablet, desktop and wide desktop captures were inspected manually against the production reference

Automated checks covered:

- exactly one H1
- localized Hero copy
- localized metadata
- crawlable Contact and Portfolio CTA links
- no Hero Pricing CTA
- image dimensions and alt text
- no horizontal overflow at 320, 375, 430, 768, 1024, 1440 and 1920px
- desktop/tablet Hero owns the first viewport at 1024x800, 1280x800, 1440x700, 1440x800 and 1920x900 without clipping
- keyboard and no-JavaScript homepage behavior
- SEO/crawl architecture regressions
- accessibility checks in the existing suite

## 15. Intentionally Deferred

- no Portfolio, Services, CTA, FAQ or Footer redesign
- no replacement or generation of Hero artwork
- no sitemap, robots, redirect, canonical, hreflang or launch-policy changes
- no new schema types
- no location targeting
- no Lighthouse or field Core Web Vitals measurement; those remain Phase 7/launch work
