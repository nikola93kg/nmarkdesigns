# UI/UX, Design System & Conversion Rate Optimization (CRO) Audit

**Target:** https://nmarkdesigns.com  
**Audit Phase:** Phase 0 (Audit-Only)  
**Date:** October 10, 2026  
**Auditor:** Conversion Optimization Consultant & Senior Product Designer  
**Scope:** Homepage, Navigation, Portfolio Showcase, Case Studies, Services, Pricing, About, Contact, and Mobile Layouts.

---

## 1. Visual Identity & Brand Consistency Assessment

NMark Designs possesses an intentional, restrained visual identity that aligns with high-end modern digital studios:
* **Color Palette:**
  * Deep Purple / Brand Dark Surface: `#110024` (represented by `bg-brand`, `text-on-brand`).
  * Clean Light Neutral Surfaces: `#ffffff` (`bg-surface`), light grey `#f8f8fa` (`bg-surface-muted`).
  * Subtle borders: `border-border` (`#e6e6ec`), `border-border-inverse` (`rgba(255, 255, 255, 0.15)`).
  * Brand Accent: Warm amber / gold `#e89a3c` / `#e59a3c` used sparingly for badges, eyebrow tags, and hover highlights.
* **Typography:**
  * Clean modern sans-serif (**DM Sans**) with balanced font weights (regular, medium, semibold, bold).
  * Good typographic scaling from small metadata labels (`text-small`) to display headers (`text-display`).

---

## 2. Key Conversion Obstacles & UX Deficiencies

### UX-01: The Contact Form "Unavailable" Trap
* **Severity:** **Critical (Conversion Blocker)**
* **Status:** **VERIFIED**
* **Location:** [`components/contact/ContactForm.tsx#L34-L36`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/contact/ContactForm.tsx#L34-L36) & [`lib/contact-delivery.ts`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/lib/contact-delivery.ts)
* **The User Experience Today:**
  1. A high-intent prospect arrives on `/sr/kontakt/` or `/en/contact/` wanting a quote.
  2. Right above the form fields, they see:
     > *"Slanje putem formulara trenutno nije dostupno. Kontaktirajte nas direktno putem emaila, telefona ili WhatsApp-a."*
  3. If they attempt to fill out the form anyway, the button says *"Obrada poruke..."*, then fails with:
     > *"Poruka nije poslata. Slanje putem formulara još nije dostupno. Pišite nam direktno ili nas pozovite."*
* **Conversion Impact:**
  * Presenting an interactive web form that actively refuses to submit immediately erodes credibility. In B2B web services, prospects who encounter broken or disabled forms rarely take the friction-filled extra step to copy an email or dial a number—they bounce to a competitor.
* **Remediation Priority:** **P0.** Connecting email delivery (via Resend, Postmark, or SMTP) must be the first operational objective in Phase 1.

---

### UX-02: Hero Section "5-Second Rule" Value Proposition Clarity
* **Severity:** **Medium**
* **Status:** **VERIFIED**
* **Location:** [`components/home/Hero.tsx#L19-L22`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/home/Hero.tsx#L19-L22)
* **Current Copy:**
  * Eyebrow: `WEB DIZAJN · RAZVOJ · SEO`
  * H1: `Izrada modernih web sajtova`
  * Subtitle: `Dizajn. Performanse. SEO.`
  * Description: `Kreiramo brze, responzivne i SEO optimizovane web sajtove sa fokusom na moderan dizajn, korisničko iskustvo i kvalitetnu tehničku osnovu.`
* **UX/CRO Analysis:**
  * The copy repeats the same three words four times in a row (*"Web dizajn, razvoj, SEO"*, *"Dizajn. Performanse. SEO."*, *"SEO optimizovane web sajtove sa fokusom na moderan dizajn"*).
  * While clear, it is somewhat generic agency phrasing. It does not answer:
    * *Who is this for?* (Small businesses, solo practitioners, local brands in Serbia/Europe).
    * *What tangible outcome do they get?* (A website that builds trust, explains what they do in 5 seconds, and generates inquiries).
* **Recommendation:**
  * Sharpen the hero description into an outcome-oriented statement:
    > *"Pomažemo malim biznisima, uslugama i preduzetnicima da dobiju moderan, brz i jasan web sajt koji uliva poverenje i pretvara posetioce u upite."*

---

### UX-03: Portfolio Showcase Interaction Hierarchy
* **Severity:** **Medium**
* **Status:** **VERIFIED**
* **Location:** [`components/portfolio/PortfolioShowcase.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/portfolio/PortfolioShowcase.tsx) vs [`components/home/FeaturedProjects.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/home/FeaturedProjects.tsx)
* **Finding:**
  * On the dedicated Portfolio index (`/sr/portfolio/`), clicking a project card tile opens the **external client website** directly in the same tab (`href={project.websiteUrl}`) rather than opening the local case study details.
  * In contrast, on the homepage (`/sr/`), clicking a project card opens the **internal case study route** (`/sr/portfolio/coolfridgeguys/`).
  * **UX Disconnect:**
    1. Visitors on the portfolio index are suddenly redirected off-site to a 3rd party domain without warning, losing their place in NMark Designs' conversion funnel.
    2. The 8 in-depth, beautifully written case study pages (`/sr/portfolio/[slug]/`) are virtually impossible to discover from the portfolio page itself!
* **Recommendation:**
  * The primary card action on `/portfolio/` should navigate to the **internal case study page** (`localizedProjectPath(slug)`).
  * The external client link should be a secondary button/link (*"Posetite sajt ↗"*).

---

### UX-04: Pricing Page Transparency & Reassurance
* **Severity:** **Low (CRO Opportunity)**
* **Status:** **VERIFIED**
* **Location:** [`components/pricing/PricingPage.tsx`](file:///Users/apple/.gemini/antigravity/worktrees/nmarkdesigns/website_audit_phase_zero/components/pricing/PricingPage.tsx)
* **Strengths:**
  * Transparent pricing packages (€450 Basic / €650 Standard / €1.000 Premium) are a massive competitive advantage in the Serbian market where 90% of agencies hide prices behind "send an inquiry" gates.
  * Notes clearly specify timelines (15 / 20 / 30 days) and scope.
* **Improvement Opportunity:**
  * Add a prominent "Standard plan" badge indicating *"Najpopularniji izbor za male biznise"* (Most popular choice).
  * Clarify the 50% deposit policy in a positive, reassuring tone (e.g. milestones).
