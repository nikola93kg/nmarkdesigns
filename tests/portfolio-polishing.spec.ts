import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { portfolioProjects, caseStudyProjects } from "@/content/projects";
import { locales } from "@/lib/i18n";
import { localizedProjectPath } from "@/lib/routes";

const dictionaries = { sr, en };

test.describe("Phase 2 — Portfolio & Project Detail UX Polishing", () => {
  for (const locale of locales) {
    const copy = dictionaries[locale];

    test(`${locale}: natural terminology is displayed on portfolio cards and badges`, async ({ page }) => {
      await page.goto(`/${locale}/portfolio/`);

      // Verify case study badge copy
      const badges = page.locator('main span:has-text("' + copy.portfolio.caseStudyBadge + '")');
      await expect(badges.first()).toBeVisible();
      if (locale === "sr") {
        await expect(badges.first()).toHaveText("Detalji projekta");
        // Ensure "Studija slučaja" is NOT present on the page
        const oldBadge = page.locator('main :text-is("Studija slučaja")');
        await expect(oldBadge).toHaveCount(0);
      } else {
        await expect(badges.first()).toHaveText("Project details");
      }

      // Verify CTA button copy
      const primaryButtons = page.locator('main a:has-text("' + copy.portfolio.viewCaseStudy + '")');
      await expect(primaryButtons.first()).toBeVisible();
      if (locale === "sr") {
        await expect(primaryButtons.first()).toContainText("Pogledajte projekat");
        // Ensure old CTA "Pogledajte studiju slučaja" is NOT present
        const oldCta = page.locator('main :text-is("Pogledajte studiju slučaja")');
        await expect(oldCta).toHaveCount(0);
      } else {
        await expect(primaryButtons.first()).toContainText("View project");
      }
    });

    test(`${locale}: portfolio card primary CTA button has deep brand background and high contrast`, async ({ page }) => {
      await page.goto(`/${locale}/portfolio/`);
      const firstCta = page.locator('main article a:has-text("' + copy.portfolio.viewCaseStudy + '")').first();
      await expect(firstCta).toBeVisible();

      // Ensure button uses brand background (#110024 / rgb(17, 0, 36)) and white text (rgb(255, 255, 255))
      const buttonStyles = await firstCta.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
        };
      });

      expect(buttonStyles.backgroundColor).toBe("rgb(17, 0, 36)");
      expect(buttonStyles.color).toBe("rgb(255, 255, 255)");
    });

    test(`${locale}: portfolio cards display concise shortDescription rather than full overview`, async ({ page }) => {
      await page.goto(`/${locale}/portfolio/`);

      for (const project of portfolioProjects) {
        if (project.shortDescription && project.caseStudy) {
          const card = page.locator(`#project-${project.slug}`);
          // Card must contain the short description
          await expect(card.getByText(project.shortDescription[locale])).toBeVisible();
          // If short description is distinct from overview, ensure full overview is NOT dumped on card
          if (project.shortDescription[locale] !== project.caseStudy.overview[locale]) {
            const overviewInCard = card.getByText(project.caseStudy.overview[locale], { exact: true });
            await expect(overviewInCard).toHaveCount(0);
          }
        }
      }
    });

    for (const width of [320, 375, 430]) {
      test(`${locale}: mobile viewport at ${width}px has no horizontal overflow and valid card stacking`, async ({ page }) => {
        await page.setViewportSize({ width, height: 812 });
        await page.goto(`/${locale}/portfolio/`);

        // Check no horizontal scrollbar
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(width);

        // Check cards are stacked vertically (image on top, content below)
        const firstArticle = page.locator('main section[id^="project-"] article').first();
        const display = await firstArticle.evaluate((el) => window.getComputedStyle(el).display);
        const flexDirection = await firstArticle.evaluate((el) => window.getComputedStyle(el).flexDirection);
        expect(display).toBe("flex");
        expect(flexDirection).toBe("column");
      });
    }

    test(`${locale}: case study narrative accordions are closed by default, toggle on click, and accessible`, async ({ page }) => {
      const project = caseStudyProjects[0]; // Buy Pallet Jacks
      await page.goto(localizedProjectPath(project.slug, locale));

      const detailsElements = page.locator("main details");
      const detailsCount = await detailsElements.count();
      expect(detailsCount).toBeGreaterThan(0);

      // Verify all accordions are closed by default
      for (let i = 0; i < detailsCount; i++) {
        const item = detailsElements.nth(i);
        const isOpen = await item.evaluate((el: HTMLDetailsElement) => el.open);
        expect(isOpen).toBe(false);

        // Heading inside summary is visible
        const heading = item.locator("summary h2");
        await expect(heading).toBeVisible();

        // Chevron icon is present
        const chevron = item.locator("summary svg");
        await expect(chevron).toBeVisible();
      }

      // Test click toggle behavior
      const firstDetails = detailsElements.first();
      const firstSummary = firstDetails.locator("summary");
      await firstSummary.click();

      // Now open
      expect(await firstDetails.evaluate((el: HTMLDetailsElement) => el.open)).toBe(true);

      // Paragraph content inside is now visible
      const firstParagraph = firstDetails.locator("div p").first();
      await expect(firstParagraph).toBeVisible();

      // Click again to close
      await firstSummary.click();
      expect(await firstDetails.evaluate((el: HTMLDetailsElement) => el.open)).toBe(false);

      // Test keyboard interaction: focus and press Enter / Space
      await firstSummary.focus();
      await page.keyboard.press("Enter");
      expect(await firstDetails.evaluate((el: HTMLDetailsElement) => el.open)).toBe(true);

      await page.keyboard.press("Space");
      expect(await firstDetails.evaluate((el: HTMLDetailsElement) => el.open)).toBe(false);
    });

    test(`${locale}: technical highlights grid uses balanced 2x2 layout when 4 items exist`, async ({ page }) => {
      // Find a project with 4 technical highlights (e.g. powder-brows-vienna or ilic-enterijer or casovi-francuskog)
      const fourHighlightProject = caseStudyProjects.find((p) => p.caseStudy.technicalHighlights?.length === 4);
      expect(fourHighlightProject).toBeDefined();

      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(localizedProjectPath(fourHighlightProject!.slug, locale));

      const highlightsSection = page.locator('section[aria-labelledby="project-highlights"]');
      await expect(highlightsSection).toBeVisible();

      const grid = highlightsSection.locator("div.grid");
      const gridClass = await grid.getAttribute("class");

      // Verify grid applies sm:grid-cols-2 (2 columns on desktop) rather than lg:grid-cols-3
      expect(gridClass).toContain("sm:grid-cols-2");
      expect(gridClass).not.toContain("lg:grid-cols-3");
    });

    test(`${locale}: back to portfolio link navigates to localized portfolio route`, async ({ page }) => {
      const project = caseStudyProjects[0];
      await page.goto(localizedProjectPath(project.slug, locale));

      const backLink = page.getByRole("link", { name: copy.actions.allProjects, exact: true }).first();
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute("href", `/${locale}/portfolio/`);

      if (locale === "sr") {
        await expect(backLink).toHaveText("Svi projekti");
      } else {
        await expect(backLink).toHaveText("All projects");
      }
    });

    for (const width of [320, 375, 402, 430, 768, 1024, 1440, 1920]) {
      test(`${locale}: capture responsive evidence screenshot at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
        await page.goto(`/${locale}/portfolio/`);
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: `docs/polishing/evidence/phase-2/portfolio-${locale}-${width}px.png` });

        // Case study page with accordion
        await page.goto(localizedProjectPath(caseStudyProjects[0].slug, locale));
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: `docs/polishing/evidence/phase-2/case-study-${locale}-${width}px.png` });

        // Open first accordion
        const details = page.locator("main details").first();
        if (await details.count()) {
          await details.locator("summary").click();
          await page.waitForTimeout(100);
          await details.scrollIntoViewIfNeeded();
          await page.screenshot({ path: `docs/polishing/evidence/phase-2/accordion-open-${locale}-${width}px.png` });
        }
      });
    }
  }
});
