import { expect, test } from "@playwright/test";
import { getBlogPost } from "@/content/blog";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";
import { localizedBlogPostPath, localizedPath } from "@/lib/routes";

const guideSlug = "koliko-kosta-izrada-web-sajta-u-srbiji-2026";
const dictionaries = { sr, en };

for (const locale of locales) {
  test(`${locale} pricing guide and current packages form a crawlable commercial journey`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
    try {
      const page = await context.newPage();
      const copy = dictionaries[locale];
      const post = getBlogPost(locale, guideSlug);
      if (!post) throw new Error("Missing pricing guide");
      const guidePath = localizedBlogPostPath(guideSlug, locale);
      const pricingPath = localizedPath("pricing", locale);
      await page.goto(guidePath);
      const table = page.locator("table").first();
      for (const pkg of Object.values(copy.pricing.websiteDevelopment.packages)) {
        await expect(table).toContainText(pkg.price);
      }
      await expect(page.locator('header time[datetime="2026-11-17"]')).toBeVisible();
      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
      const nodes = schemas.flatMap((text) => (JSON.parse(text) as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? []);
      const article = nodes.find((node) => node["@type"] === "BlogPosting");
      expect(article?.datePublished).toBe("2026-09-22");
      expect(article?.dateModified).toBe("2026-11-17");
      await page.locator(`main a[href="${pricingPath}#packages"]`).click();
      await expect(page).toHaveURL((url) => url.pathname === pricingPath && url.hash === "#packages");
      const resources = page.getByRole("navigation", { name: copy.pricing.websiteDevelopment.resourcesLabel });
      const service = resources.getByRole("link", { name: copy.pricing.websiteDevelopment.serviceAction, exact: true });
      await service.click();
      await expect(page).toHaveURL(new RegExp(locale === "sr" ? "/sr/usluge/izrada-web-sajtova/$" : "/en/services/website-development/$"));
      await page.getByRole("link", { name: copy.pricing.websiteDevelopment.guideAction, exact: true }).click();
      await expect(page).toHaveURL((url) => url.pathname === guidePath);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
      for (const project of ["os-dule-karaklajic", "anabelabebioprema"]) {
        await expect(page.locator(`main a[href="/${locale}/portfolio/${project}/"]`)).toBeVisible();
      }
    } finally {
      await context.close();
    }
  });
}

test("site entity uses the domain and sitemap dates reflect real editorial changes", async ({ page, request }) => {
  await page.goto("/sr/");
  const nodes = (await page.locator('script[type="application/ld+json"]').allTextContents())
    .flatMap((text) => (JSON.parse(text) as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? []);
  const website = nodes.find((node) => node["@type"] === "WebSite");
  expect(website?.url).toBe(`${site.url}/`);
  expect(website?.name).toBe(site.name);
  expect(website?.alternateName).toBe("NMarkDesigns");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const locale of locales) {
    const path = localizedBlogPostPath(guideSlug, locale);
    const entry = sitemap.split("<url>").find((item) => item.includes(`<loc>${site.url}${path}</loc>`));
    expect(entry).toContain("<lastmod>2026-11-17</lastmod>");
  }
  const home = sitemap.split("<url>").find((item) => item.includes(`<loc>${site.url}/sr/</loc>`));
  expect(home).not.toContain("<lastmod>");
  expect(sitemap).not.toContain("ponuda-za-izradu-sajta");
});
