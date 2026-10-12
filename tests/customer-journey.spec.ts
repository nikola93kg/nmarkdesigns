import { test, expect } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

const dictionaries = { sr, en };

test.describe("Phase 3C.1 Customer Journey & Conversion Optimization", () => {
  for (const locale of locales) {
    const copy = dictionaries[locale];

    test(`${locale} Journey A: Homepage -> Services -> Service Case Study Link -> Contact`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(localizedPath("home", locale));

      // 1. Verify Homepage Hero value proposition and sharp CTA
      const hero = page.locator('section[aria-labelledby="hero-title"]');
      await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(hero.getByRole("link", { name: copy.home.hero.primaryAction })).toHaveAttribute(
        "href",
        localizedPath("contact", locale)
      );

      // 2. Navigate to Services page
      await page.goto(localizedPath("services", locale));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.services.intro.title);

      // 3. Verify service cards link to verified case studies
      const serviceLinks = page.locator('section[aria-labelledby="services-details-title"] article a[href*="/portfolio/"]');
      await expect(serviceLinks).toHaveCount(5);

      // Verify specific case study link (e.g. Časovi Francuskog)
      const casoviLink = page.locator(`a[href="${localizedProjectPath("casovi-francuskog", locale)}"]`).first();
      await expect(casoviLink).toBeVisible();

      // Click through to case study
      await casoviLink.click();
      await expect(page).toHaveURL(new RegExp(localizedProjectPath("casovi-francuskog", locale)));

      // 4. Verify Case Study contextual CTA and navigate to Contact
      const expectedContactTitle = copy.caseStudy.contactTitle ?? copy.portfolio.contactTitle;
      const ctaSection = page.locator('section[aria-labelledby="portfolio-contact-title"]');
      await expect(ctaSection.getByRole("heading", { name: expectedContactTitle })).toBeVisible();

      const ctaButton = ctaSection.getByRole("link");
      await expect(ctaButton).toHaveAttribute("href", localizedPath("contact", locale));
      await ctaButton.click();

      // 5. Arrive at Contact page
      await expect(page).toHaveURL(new RegExp(localizedPath("contact", locale)));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test(`${locale} Journey B: Homepage -> Pricing -> Package Clarity & Contact`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(localizedPath("pricing", locale));

      // 1. Verify exact 3 packages and strictly unchanged prices
      const plans = page.locator('section[aria-label] article');
      await expect(plans).toHaveCount(3);
      await expect(plans.nth(0)).toContainText("450 €");
      await expect(plans.nth(1)).toContainText("650 €");
      await expect(plans.nth(2)).toContainText("1.000 €");

      // 2. Verify pricing notes on e-commerce scope and 30-day maintenance
      const notesSection = page.locator('section[aria-labelledby="pricing-notes-title"]');
      await expect(notesSection).toBeVisible();
      await expect(notesSection).toContainText(copy.pricing.notes.items[3]);

      // 3. Verify FAQ includes maintenance scope explanation
      const faqSection = page.locator('section[aria-labelledby="pricing-questions"]');
      await expect(faqSection).toBeVisible();

      // 4. Click package CTA and arrive at Contact
      const packageButton = plans.first().getByRole("link");
      await expect(packageButton).toHaveAttribute("href", localizedPath("contact", locale));
      await packageButton.click();

      await expect(page).toHaveURL(new RegExp(localizedPath("contact", locale)));
    });

    test(`${locale} Journey C: Case Study (Anabela) -> Factual UX & Commerce -> Contextual CTA -> Contact`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(localizedProjectPath("anabelabebioprema", locale));

      // 1. Verify case study heading and key factual highlights
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Anabela Bebi Oprema");
      const highlights = page.locator('section[aria-labelledby="project-highlights"] div.rounded-card');
      await expect(highlights).toHaveCount(4);

      // Verify WooCommerce zero platform fee note and guest checkout note without unmeasured claims
      if (locale === "sr") {
        await expect(page.locator("main")).toContainText("bez plaćanja fiksnih mesečnih pretplata za platformu");
        await expect(page.locator("main")).toContainText("bez obavezne registracije korisničkog naloga");
      } else {
        await expect(page.locator("main")).toContainText("without recurring monthly platform subscription fees");
        await expect(page.locator("main")).toContainText("guest checkout and no mandatory account creation");
      }

      // 2. Verify contextual bottom CTA
      const expectedContactTitle = copy.caseStudy.contactTitle ?? copy.portfolio.contactTitle;
      const ctaSection = page.locator('section[aria-labelledby="portfolio-contact-title"]');
      await expect(ctaSection.getByRole("heading", { name: expectedContactTitle })).toBeVisible();

      const ctaButton = ctaSection.getByRole("link");
      await ctaButton.click();
      await expect(page).toHaveURL(new RegExp(localizedPath("contact", locale)));
    });

    test(`${locale} Journey D: Contact Page -> Direct Inquiries & Reassurance`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(localizedPath("contact", locale));

      // 1. Verify direct contact channels in the contact details section
      const detailsSection = page.locator('section[aria-labelledby="contact-details-title"]');
      await expect(detailsSection.locator(`a[href="mailto:${site.email}"]`)).toBeVisible();
      await expect(detailsSection.locator(`a[href="${site.phone.href}"]`)).toBeVisible();
      await expect(detailsSection.locator(`a[href="${site.whatsappUrl}"]`)).toBeVisible();

      // 2. Verify reassurance microcopy
      if (copy.contact.form.reassurance) {
        await expect(page.getByText(copy.contact.form.reassurance)).toBeVisible();
      }

      // 3. Verify form fields
      await expect(page.locator("#contact-name")).toBeVisible();
      await expect(page.locator("#contact-email")).toBeVisible();
      await expect(page.locator("#contact-message")).toBeVisible();
      await expect(page.getByRole("button", { name: copy.contact.form.submit })).toBeVisible();
    });

    test(`${locale} Journey E: Mobile Navigation -> Services / Portfolio / Contact with accessible drawer & escape`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(localizedPath("home", locale));

      const toggle = page.locator("summary.mobile-navigation-toggle");
      await expect(toggle).toBeVisible();

      // Open mobile menu
      await toggle.click();
      const mobileNav = page.locator("#mobile-navigation");
      await expect(mobileNav).toBeVisible();

      // Check navigation items
      const servicesLink = mobileNav.getByRole("link", { name: copy.navigation.services, exact: true });
      await expect(servicesLink).toHaveAttribute("href", localizedPath("services", locale));

      const portfolioLink = mobileNav.getByRole("link", { name: copy.navigation.portfolio, exact: true });
      await expect(portfolioLink).toHaveAttribute("href", localizedPath("portfolio", locale));

      const contactLink = mobileNav.getByRole("link", { name: copy.navigation.contact, exact: true });
      await expect(contactLink).toHaveAttribute("href", localizedPath("contact", locale));

      // Test Escape closes menu
      await page.keyboard.press("Escape");
      await expect(page.locator("details.mobile-navigation")).not.toHaveAttribute("open", "");

      // Re-open and navigate to services
      await toggle.click();
      await servicesLink.click();
      await expect(page).toHaveURL(new RegExp(localizedPath("services", locale)));
    });

    test(`${locale} Journey C.2: Related Projects & Inactive Project Safeguards`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });

      // Navigate to Tripoli Sweets (inactive project with case study)
      await page.goto(localizedProjectPath("tripolisweets", locale));

      // Case study hero displays historical archive badge, not an external link to dead domain
      const heroSection = page.locator('section[aria-labelledby="case-study-title"]');
      await expect(heroSection.getByText(copy.portfolio.historicalProject)).toBeVisible();
      await expect(heroSection.getByRole("link", { name: copy.portfolio.visitWebsite })).toHaveCount(0);

      // Related projects section
      const relatedSection = page.locator('section[aria-labelledby="related-projects-title"]');
      await expect(relatedSection.getByRole("heading", { level: 2 })).toHaveText(copy.caseStudy.relatedProjects);

      // Verify related project links (Anabela Bebi Oprema and Cool Fridge Guys)
      const anabelaLink = relatedSection.locator(`a[href="${localizedProjectPath("anabelabebioprema", locale)}"]`).first();
      await expect(anabelaLink).toBeVisible();
    });
  }

  test("Responsive layout verification for Customer Journeys across 375px, 768px, 1440px", async ({ page }) => {
    const viewports = [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);

      // Homepage hero
      await page.goto("/sr");
      await expect(page.locator('section[aria-labelledby="hero-title"]')).toBeVisible();

      // Services page
      await page.goto("/sr/usluge");
      await expect(page.locator('section[aria-labelledby="services-details-title"]')).toBeVisible();

      // Pricing page
      await page.goto("/sr/cenovnik");
      await expect(page.locator('section[aria-label]')).toBeVisible();

      // Case study
      await page.goto("/sr/portfolio/anabelabebioprema");
      await expect(page.locator('section[aria-labelledby="portfolio-contact-title"]')).toBeVisible();

      // Contact page
      await page.goto("/sr/kontakt");
      await expect(page.locator('form[aria-labelledby="contact-form-title"]')).toBeVisible();
    }
  });
});
