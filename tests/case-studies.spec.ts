import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { caseStudyProjects } from "@/content/projects";
import { locales } from "@/lib/i18n";
import { localizedProjectPath } from "@/lib/routes";

const dictionaries = { sr, en };

for (const locale of locales) {
  const copy = dictionaries[locale];

  for (const [index, project] of caseStudyProjects.entries()) {
    test(`${locale} ${project.slug} content and metadata`, async ({ page }) => {
      await page.goto(localizedProjectPath(project.slug, locale));
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
      await expect(page.getByText(project.caseStudy.overview[locale], { exact: true })).toBeVisible();
      if (project.client) await expect(page.locator("main dd").filter({ hasText: project.client })).toHaveText(project.client);
      if (project.client && /[\u0400-\u04ff]/u.test(project.client)) {
        await page.evaluate(() => document.fonts.ready);
        // The previous font fallback gave Cyrillic letters zero advance width.
        const textWidth = await page.locator("main dd").first().evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return range.getBoundingClientRect().width;
        });
        expect(textWidth).toBeGreaterThan(200);
      }
      if (project.technologies?.length) {
        await expect(page.locator("main dd").filter({ hasText: project.technologies.join(", ") })).toHaveText(project.technologies.join(", "));
      } else {
        await expect(page.locator("main dt").filter({ hasText: copy.caseStudy.technologies })).toHaveCount(0);
      }
      if (project.websiteUrl) {
        await expect(page.getByRole("link", { name: copy.portfolio.visitWebsite, exact: true })).toHaveAttribute("href", project.websiteUrl);
      }
      for (const key of ["challenge", "solution", "results"] as const) {
        if (!project.caseStudy[key]?.[locale].length) {
          await expect(page.getByRole("heading", { name: copy.caseStudy[key], exact: true })).toHaveCount(0);
        }
      }
      await expect(page.locator("#project-gallery")).toHaveCount(0);
      const url = `https://nmarkdesigns.com${localizedProjectPath(project.slug, locale)}`;
      await expect(page).toHaveTitle(`${project.title} | NMark Designs`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", project.caseStudy.overview[locale]);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", url);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", project.caseStudy.overview[locale]);
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", project.featuredImage.alt[locale]);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
      for (const language of locales) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com${localizedProjectPath(project.slug, language)}`);
      }
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", `https://nmarkdesigns.com${localizedProjectPath(project.slug, "sr")}`);
      const other = locale === "sr" ? "en" : "sr";
      await expect(page.locator(`header a[hreflang="${other}"]`)).toHaveAttribute("href", localizedProjectPath(project.slug, other));
      const next = caseStudyProjects[(index + 1) % caseStudyProjects.length];
      await expect(page.getByRole("navigation", { name: copy.caseStudy.navigation }).getByRole("link", { name: new RegExp(next.title) })).toHaveAttribute("href", localizedProjectPath(next.slug, locale));
      await expect(page.locator('main a[href^="https://nmarkdesigns.com/portfolio/"]')).toHaveCount(0);
    });
  }

  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} case study layouts at ${width}px`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      // Cover the tallest source image and a longer title/client name.
      for (const project of [caseStudyProjects[0], caseStudyProjects[2]]) {
        await page.goto(localizedProjectPath(project.slug, locale));
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        const image = page.locator("main img").first();
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute("alt", project.featuredImage.alt[locale]);
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
        await expect(image).toHaveCSS("object-fit", "contain");
        const rect = await image.boundingBox();
        expect(rect!.x).toBeGreaterThanOrEqual(0);
        expect(rect!.x + rect!.width).toBeLessThanOrEqual(width);
        expect(rect!.width).toBeGreaterThan(200);
        const clipped = await page.locator("main h1, main p, main dd, main a").evaluateAll((elements) =>
          elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
        );
        expect(clipped).toEqual([]);
        if (width === 375 || width === 1440) {
          const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
          expect(result.violations).toEqual([]);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: test.info().outputPath(`${project.slug}-intro.png`) });
        await page.screenshot({ path: test.info().outputPath(`${project.slug}-full.png`), fullPage: true });
      }
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} homepage and index link to local case studies`, async ({ page }) => {
    for (const path of [`/${locale}/`, `/${locale}/portfolio/`]) {
      await page.goto(path);
      for (const project of caseStudyProjects) {
        await expect(page.getByRole("link", { name: `${copy.actions.viewProject}: ${project.title}`, exact: true })).toHaveAttribute("href", localizedProjectPath(project.slug, locale));
      }
      await page.getByRole("link", { name: `${copy.actions.viewProject}: ${caseStudyProjects[0].title}`, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${localizedProjectPath(caseStudyProjects[0].slug, locale)}$`));
      await page.getByRole("navigation", { name: copy.caseStudy.navigation }).getByRole("link", { name: copy.actions.allProjects, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/portfolio/$`));
    }
  });

  test(`${locale} case study is usable without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    const project = caseStudyProjects[7];
    await page.goto(`${baseURL}${localizedProjectPath(project.slug, locale)}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.getByText(project.caseStudy.overview[locale], { exact: true })).toBeVisible();
    const other = locale === "sr" ? "en" : "sr";
    await page.locator(`header a[hreflang="${other}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${localizedProjectPath(project.slug, other)}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", other);
    await context.close();
  });
}

for (const width of [375, 1440]) {
  test(`case study keyboard navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sr/portfolio/coolfridgeguys/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: sr.accessibility.skipLink })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
    for (const target of ["en", "sr"] as const) {
      const language = page.locator(`header a[hreflang="${target}"]`);
      await language.focus();
      await expect(language).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${target}/portfolio/coolfridgeguys/$`));
      await expect(page.locator(`header a[hreflang="${target}"]`)).toHaveAttribute("aria-current", "page");
    }
    const next = page.getByRole("navigation", { name: sr.caseStudy.navigation }).getByRole("link", { name: /LaDekor/ });
    await next.focus();
    await expect(next).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/sr\/portfolio\/ladekor\/$/);
  });
}

test("case studies reject unknown slugs and unsupported locales", async ({ request }) => {
  for (const path of ["/sr/portfolio/unknown/", "/en/portfolio/cool-fridge-guys/", "/fr/portfolio/coolfridgeguys/", "/SR/portfolio/coolfridgeguys/", "/sr/portfolio/COOLFRIDGEGUYS/", "/sr/PORTFOLIO/coolfridgeguys/", "/sr/portfolio/coolfridgeguys/extra/", "/portfolio/coolfridgeguys/"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});
