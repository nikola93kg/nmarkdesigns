import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getBlogPosts } from "@/content/blog";
import { blogLabels } from "@/content/blog-editorial";

for (const locale of ["sr", "en"] as const) {
  test(`${locale} blog guides, images, navigation and schema`, async ({ page }) => {
    await page.goto(`/${locale}/blog/`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main article")).toHaveCount(3);
    for (const post of getBlogPosts(locale)) {
      await page.goto(`/${locale}/blog/${post.slug}/`);
      await expect(page.locator("h1")).toHaveText(post.title);
      expect(post.sections.length).toBeGreaterThanOrEqual(5);
      await expect(page.getByRole("navigation", { name: blogLabels[locale].contents }).locator("a")).toHaveCount(post.sections.length);
      await expect(page.locator("figure img")).toBeVisible();
      await expect.poll(() => page.locator("figure img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
      await page.getByRole("navigation", { name: blogLabels[locale].contents }).locator("a").last().click();
      await expect(page).toHaveURL(new RegExp(`#section-${post.sections.length}$`));
      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
      const article = schemas.flatMap((text) => JSON.parse(text)["@graph"] ?? []).find((entry) => entry["@type"] === "BlogPosting");
      expect(article.headline).toBe(post.title);
      expect(article.inLanguage).toBe(locale);
      expect(article.abstract).toBe(post.answer);
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
      const accessibility = await new AxeBuilder({ page }).include("main").analyze();
      expect(accessibility.violations).toEqual([]);
    }
  });

  test(`${locale} responsive blog layouts`, async ({ page }) => {
    for (const width of [375, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of [`/${locale}/blog/`, `/${locale}/blog/${getBlogPosts(locale)[0].slug}/`]) {
        await page.goto(path);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await expect(page.locator("h1")).toBeVisible();
        await page.screenshot({ path: `test-results/blog-${locale}-${width}-${path.split("/").length}.png`, fullPage: true });
      }
    }
  });
}