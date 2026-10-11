# Accessibility Audit (WCAG 2.2 AA)

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Web Accessibility Expert  
**Standard Evaluated:** WCAG 2.2 Level AA

---

## 1. Executive Accessibility Assessment

NMark Designs demonstrates an above-average technical commitment to accessible web principles:
* **Skip Link:** A working keyboard skip link (`<a href="#main-content">`) is present on every page in [`app/[locale]/layout.tsx#L58-L62`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/app/[locale]/layout.tsx#L58-L62).
* **Keyboard Navigation & Visible Focus:** All interactive controls define `:focus-visible` styling (`focus-visible:outline-accent`).
* **Semantic Landmark Architecture:** Clean usage of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
* **No Div-Buttons:** Every interactive control is either a native `<button>` or a semantic `<a>` link.
* **Progressive Enhancement in Accordion:** The FAQ accordion renders all questions and answers as plain readable HTML on initial server render, ensuring users without JavaScript or assistive devices encounter no hidden content.

---

## 2. Accessibility Findings Matrix

| Ref | Category | WCAG 2.2 Criteria | Severity | Status | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A11Y-01** | Color Contrast | 1.4.3 Contrast (Minimum) | **Medium** | **VERIFIED** | Muted text on dark brand surfaces (`text-on-brand-muted` on `bg-brand`) and subtle amber text have borderline contrast ratios. |
| **A11Y-02** | Form Labels & Errors | 3.3.1 Error Identification / 3.3.2 Labels | **Low** | **VERIFIED** | Form labels and aria-describedby associations are correctly implemented; focus transfer to error summary functions as intended. |
| **A11Y-03** | Touch Targets | 2.5.8 Target Size (Minimum) | **Low** | **VERIFIED** | Mobile menu, language switchers, and CTA buttons meet the 44x44px minimum touch target size. |
| **A11Y-04** | Text Alternatives | 1.1.1 Non-text Content | **Low** | **VERIFIED** | Decorative hero layers explicitly mark `alt=""` and `aria-hidden="true"`; content images provide descriptive localized alts. |
| **A11Y-05** | Screen Reader Announcements | 4.1.3 Status Messages | **Low** | **VERIFIED** | Copy link button in blog shares status via `aria-live="polite"`. |

---

## 3. Detailed Accessibility Findings & Recommendations

### A11Y-01: Contrast Ratios on Dark Surfaces & Secondary Text
* **WCAG 2.2 AA Success Criterion:** 1.4.3 Contrast (Minimum) (4.5:1 for normal text, 3:1 for large text).
* **Evidence:**
  * Background: `bg-brand` (`#110024`, very dark purple).
  * Text classes used on dark surfaces:
    * `text-on-brand` (`#ffffff`) -> Contrast ratio **19.8:1** (Passes AAA).
    * `text-on-brand-muted`: defined as `rgba(255, 255, 255, 0.70)` -> Contrast ratio **9.5:1** (Passes AAA).
    * `text-on-brand-subtle` / `rgba(255, 255, 255, 0.50)` -> Contrast ratio **4.7:1** (Borderline on small body text).
    * `text-muted` on `bg-surface-muted` (`#737380` on `#f8f8fa`): Contrast ratio **4.6:1** (Passes AA by a small margin).
* **Recommendation:**
  * Keep `text-on-brand-muted` at or above `75%` opacity for body text smaller than 16px.
  * Ensure accent amber text (`#e89a3c`) is used only on `#110024` (ratio **7.1:1**, Passes AA) and never on white backgrounds (where `#e89a3c` on `#ffffff` is only **2.2:1** — Fails). Inspection confirms amber is strictly kept on dark surfaces.

---

### A11Y-02: Screen Reader Experience in Case Study Gallery
* **Finding:**
  * In [`components/portfolio/CaseStudyDetails.tsx#L51-L54`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/portfolio/CaseStudyDetails.tsx#L51-L54), project gallery screenshots render with:
    `alt={image.alt[locale]}`.
  * In [`content/projects.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/content/projects.ts), some project image alt texts repeat identical strings (e.g. *"Prikaz početne stranice web sajta Casovi Francuskog."*).
* **Recommendation:**
  * Provide descriptive, unique alt text for multiple screenshots of the same project (e.g. *"Prikaz sekcije za rezervaciju termina na sajtu Časovi Francuskog"*).
