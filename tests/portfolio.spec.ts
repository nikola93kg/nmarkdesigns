import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { portfolioProjects } from "@/content/projects";
import { locales } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

const dictionaries = { sr, en };

for (const locale of locales) {
  const copy = dictionaries[locale];

  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} portfolio at ${width}px`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`/${locale}/portfolio/`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.portfolio.intro.title);
      const projectEntries = page.locator('main section[id^="project-"] article');
      await expect(projectEntries).toHaveCount(portfolioProjects.length);
      await expect(projectEntries.locator("h2")).toHaveText(portfolioProjects.map((project) => project.title));
      await expect(page.locator('section[aria-labelledby="portfolio-title"] span').filter({ hasText: String(portfolioProjects.length).padStart(2, "0") }).first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

      for (const project of portfolioProjects) {
        const section = page.locator(`#project-${project.slug}`);
        await expect(section).toHaveCount(1);
        await expect(section.getByRole("heading", { name: project.title, exact: true })).toBeVisible();

        if (project.featuredImage) {
          const image = section.getByRole("img");
          await image.scrollIntoViewIfNeeded();
          await expect(image).toHaveAttribute("alt", project.featuredImage.alt[locale]);
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
          await expect(image).toHaveCSS("object-fit", "cover");
          const bounds = await image.boundingBox();
          expect(bounds!.x).toBeGreaterThanOrEqual(0);
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
          expect(bounds!.width).toBeGreaterThan(200);
        } else {
          await expect(section.getByText(copy.portfolio.contentNeeded.screenshot, { exact: true })).toBeVisible();
        }

        if (project.websiteUrl) {
          await expect(section.locator(`a[href="${project.websiteUrl}"]`)).toHaveCount(project.featuredImage ? 2 : 1);
        } else {
          await expect(section.getByText(copy.portfolio.contentNeeded.website, { exact: true })).toBeVisible();
        }
      }

      const clippedText = await page.locator("main h1, main h2, main p, header a:visible").evaluateAll((elements) =>
        elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
      );
      expect(clippedText).toEqual([]);
      const languageNav = page.getByRole("navigation", { name: copy.accessibility.languageNavigation });
      await expect(languageNav).toBeVisible();
      await expect(languageNav.locator('[aria-current="page"]')).toHaveText(locale.toUpperCase());
      await expect(languageNav.locator('[aria-current="page"]')).toHaveCSS("text-decoration-line", "underline");
      const otherLocale = locale === "sr" ? "en" : "sr";
      await expect(languageNav.locator(`[hreflang="${otherLocale}"]`)).toHaveAttribute("href", `/${otherLocale}/portfolio/`);

      if (width === 375 || width === 1440) {
        const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(result.violations).toEqual([]);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: test.info().outputPath("intro.png") });
      await page.screenshot({ path: test.info().outputPath("full-page.png"), fullPage: true });
      await page.locator("main article").last().scrollIntoViewIfNeeded();
      await page.screenshot({ path: test.info().outputPath("last-project.png") });
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} portfolio metadata and local navigation`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${locale}/`);
    await expect(page.getByRole("link", { name: copy.actions.allProjects, exact: true })).toHaveAttribute("href", `/${locale}/portfolio/`);
    const headerLink = page.getByRole("navigation", { name: copy.accessibility.mainNavigation, exact: true }).getByRole("link", { name: copy.navigation.portfolio, exact: true });
    await expect(headerLink).toHaveAttribute("href", `/${locale}/portfolio/`);
    await headerLink.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`/${locale}/portfolio/$`));
    await expect(page).toHaveTitle(`${copy.portfolio.metadata.title} | NMark Designs`);
    const canonical = `https://nmarkdesigns.com/${locale}/portfolio/`;
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", copy.portfolio.metadata.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${copy.portfolio.metadata.title} | NMark Designs`);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", copy.portfolio.metadata.description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", locale === "sr" ? "sr_RS" : "en_US");
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", portfolioProjects[0].featuredImage!.alt[locale]);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    for (const language of locales) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com/${language}/portfolio/`);
    }
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", "https://nmarkdesigns.com/sr/portfolio/");
    await expect(page.getByRole("contentinfo").getByRole("link", { name: copy.footer.portfolioLabel, exact: true })).toHaveAttribute("href", `/${locale}/portfolio/`);
    await expect(page.locator('a[href="https://nmarkdesigns.com/portfolio/"]')).toHaveCount(0);
    for (const [route, href] of [
      ["services", localizedPath("services", locale)],
      ["contact", localizedPath("contact", locale)],
      ["pricing", localizedPath("pricing", locale)],
    ] as const) {
      await expect(page.getByRole("contentinfo").getByRole("link", { name: copy.navigation[route], exact: true })).toHaveAttribute("href", href);
    }
    const firstWebsite = portfolioProjects[0].websiteUrl!;
    const projectLink = page.locator(`main a[href="${firstWebsite}"]`).first();
    await projectLink.focus();
    await expect(projectLink).toBeFocused();
    await expect(projectLink).toHaveCSS("outline-style", "solid");

    await page.setViewportSize({ width: 375, height: 812 });
    await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
    const mobileLink = page.getByRole("navigation", { name: copy.accessibility.mobileNavigation }).getByRole("link", { name: copy.navigation.portfolio, exact: true });
    await expect(mobileLink).toHaveAttribute("href", `/${locale}/portfolio/`);
    await mobileLink.click();
    await expect(page.getByRole("navigation", { name: copy.accessibility.mobileNavigation })).not.toBeVisible();
  });

  test(`${locale} portfolio works without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    await page.goto(`${baseURL}/${locale}/portfolio/`);
    await expect(page.locator('main section[id^="project-"] article')).toHaveCount(portfolioProjects.length);
    await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
    await expect(page.getByRole("navigation", { name: copy.accessibility.mobileNavigation }).getByRole("link", { name: copy.navigation.portfolio, exact: true })).toHaveAttribute("href", `/${locale}/portfolio/`);
    await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
    const target = locale === "sr" ? "en" : "sr";
    await page.locator(`header a[hreflang="${target}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${target}/portfolio/$`));
    await expect(page.locator("html")).toHaveAttribute("lang", target);
    await expect(page.getByText(dictionaries[target].portfolio.intro.description, { exact: true })).toBeVisible();
    await context.close();
  });
}

for (const width of [375, 1440]) {
  test(`portfolio language switching preserves the page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sr/portfolio/");
    for (const target of ["en", "sr"] as const) {
      const link = page.locator(`header a[hreflang="${target}"]`);
      await link.focus();
      await expect(link).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${target}/portfolio/$`));
      await expect(page.locator("html")).toHaveAttribute("lang", target);
      await expect(page.locator(`header a[hreflang="${target}"]`)).toHaveAttribute("aria-current", "page");
      await expect(page.getByText(dictionaries[target].portfolio.intro.description, { exact: true })).toBeVisible();
    }
  });
}

test("portfolio rejects invalid locales and does not create other core pages", async ({ request }) => {
  for (const path of ["/fr/portfolio/", "/SR/portfolio/", "/EN/portfolio/", "/sr/portfolio/unknown/", "/sr/services/", "/en/usluge/"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
  for (const locale of locales) {
    expect((await request.get(`/${locale}/portfolio`)).status()).toBe(200);
  }
});

test("project index uses local details and only verified optional metadata", async ({ page }) => {
  for (const locale of locales) {
    const copy = dictionaries[locale];
    await page.goto(`/${locale}/portfolio/`);
    for (const [index, project] of portfolioProjects.entries()) {
      const entry = page.locator('main section[id^="project-"] article').nth(index);
      await expect(entry.getByRole("heading")).toHaveText(project.title);
      await expect(entry.getByText(project.category?.[locale] ?? copy.portfolio.defaultCategory, { exact: true })).toBeVisible();
      const description = project.shortDescription?.[locale] ?? project.caseStudy?.overview[locale] ?? copy.portfolio.contentNeeded.description;
      await expect(entry.getByText(description, { exact: true })).toBeVisible();
      if (project.websiteUrl) {
        await expect(entry.getByRole("link", { name: `${copy.portfolio.visitWebsite}: ${project.title}`, exact: true }).last()).toHaveAttribute("href", project.websiteUrl);
      } else {
        await expect(entry.getByText(copy.portfolio.contentNeeded.website, { exact: true })).toBeVisible();
      }
    }
    await expect(page.locator(`main a[href^="/${locale}/portfolio/"]`)).toHaveCount(0);
  }
});
