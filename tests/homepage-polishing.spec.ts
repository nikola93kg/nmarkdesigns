import { expect, test } from "@playwright/test";
import { homepageProjectSlugs } from "@/content/projects";
import { locales } from "@/lib/i18n";
import { localizedProjectPath } from "@/lib/routes";

const expectedHeroEyebrows = {
  sr: "WEB DIZAJN · RAZVOJ SAJTOVA · SEO",
  en: "WEB DESIGN · WEB DEVELOPMENT · SEO",
};

const expectedServicesHeadings = {
  sr: "Moderni sajtovi\nPromišljen pristup",
  en: "Modern websites\nA thoughtful approach",
};

const forbiddenEyebrowKeywords = [
  "NEXT.JS & WORDPRESS",
  "Next.js",
  "WordPress",
  "WooCommerce",
];

const forbiddenHeroBullets = [
  // Serbian bullets
  "9 detaljnih studija slučaja",
  "Next.js, WordPress & WooCommerce",
  "Direktna saradnja sa developerom",
  // English bullets
  "9 detailed case studies",
  "Direct collaboration with founder",
];

const expectedProjectTitles = [
  "Časovi Francuskog",
  "Cool Fridge Guys",
  "Buy Pallet Jacks",
  "OŠ Dule Karaklajić",
  "Ilić Enterijer",
  "Powder Brows Vienna",
  "Anabela Bebi Oprema",
  "Tripoli Sweets",
];

for (const locale of locales) {
  test.describe(`${locale.toUpperCase()} homepage polishing verification`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${locale}/`);
    });

    test("1 & 2: Hero eyebrow displays updated non-tech service label", async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-title"]');
      const eyebrow = hero.locator("p.text-brand").first();

      await expect(eyebrow).toBeVisible();
      await expect(eyebrow).toHaveText(expectedHeroEyebrows[locale]);
    });

    test("3: Old technology-specific wording is gone from hero eyebrow", async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-title"]');
      const eyebrowText = (await hero.locator("p.text-brand").first().textContent()) ?? "";

      for (const keyword of forbiddenEyebrowKeywords) {
        expect(eyebrowText.toLowerCase()).not.toContain(keyword.toLowerCase());
      }
    });

    test("4: The three hero feature bullets are completely absent", async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-title"]');

      // Check bullet items are absent
      for (const bullet of forbiddenHeroBullets) {
        await expect(hero.getByText(bullet, { exact: true })).toHaveCount(0);
      }

      // Check no bullet list container exists under CTA buttons
      const bulletsList = hero.locator("ul");
      await expect(bulletsList).toHaveCount(0);
    });

    test("5: Selected projects follow the exact requested 8-project order", async ({ page }) => {
      const portfolioSection = page.locator("#portfolio");
      const projectCards = portfolioSection.locator("article");

      await expect(projectCards).toHaveCount(8);

      for (let i = 0; i < 8; i++) {
        const card = projectCards.nth(i);
        const expectedSlug = homepageProjectSlugs[i];
        const expectedTitle = expectedProjectTitles[i];
        const expectedIndexStr = String(i + 1).padStart(2, "0");

        // Verify title
        await expect(card.locator("h3")).toHaveText(expectedTitle);

        // Verify numeric index badge
        await expect(card.locator("p").first()).toContainText(expectedIndexStr);

        // Verify internal case study link
        const expectedHref = localizedProjectPath(expectedSlug, locale);
        await expect(card.locator(`a[href="${expectedHref}"]`).first()).toBeVisible();
      }

      // Verify Tripoli Sweets (#8) is inactive and has no external outbound link
      const tripoliCard = projectCards.nth(7);
      await expect(tripoliCard.locator("h3")).toHaveText("Tripoli Sweets");
      const externalLinks = tripoliCard.locator('a[target="_blank"]');
      await expect(externalLinks).toHaveCount(0);
    });

    test("6: Homepage services heading has no trailing periods", async ({ page }) => {
      const servicesSection = page.locator("#services");
      const heading = servicesSection.locator("h2#services-title");

      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(expectedServicesHeadings[locale]);

      const headingText = (await heading.textContent()) ?? "";
      // Ensure neither line ends with a period
      const lines = headingText.split("\n").map((line) => line.trim()).filter(Boolean);
      for (const line of lines) {
        expect(line.endsWith(".")).toBe(false);
      }
    });
  });
}

const testBreakpoints = [320, 375, 430, 768, 1024, 1440, 1920];

for (const locale of locales) {
  for (const width of testBreakpoints) {
    test(`${locale.toUpperCase()} homepage responsive layout at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      await page.goto(`/${locale}/`);
      await page.evaluate(() => document.fonts.ready);

      // Verify no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);

      // Verify hero visibility & primary CTA
      const hero = page.locator('section[aria-labelledby="hero-title"]');
      await expect(hero).toBeVisible();
      const primaryCta = hero.locator("a").first();
      await expect(primaryCta).toBeVisible();

      // Verify portfolio 8 articles
      const articles = page.locator("#portfolio article");
      await expect(articles).toHaveCount(8);

      // Screenshot for visual evidence
      await page.screenshot({
        path: `docs/polishing/screenshots/${locale}-${width}px.png`,
        fullPage: false,
      });
    });
  }
}

