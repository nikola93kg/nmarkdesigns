import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { projects } from "@/content/projects";
import { locales, localeSettings } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

const dictionaries = { sr, en };

for (const locale of locales) {
  const copy = dictionaries[locale];
  const path = localizedPath("services", locale);

  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} services at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      expect((await page.goto(path))?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);

      await expect(page.locator("h1")).toHaveText(copy.services.intro.title);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByText(copy.services.intro.description, { exact: true })).toBeVisible();
      await expect(page.locator('section[aria-labelledby="hero-title"]')).toHaveCount(0);
      await expect(page.locator("[data-hero-artwork]")).toHaveCount(0);
      await expect(page.locator('main img[src*="hero-montage"]')).toHaveCount(0);

      const overview = page.locator('section[aria-labelledby="services-overview-title"]');
      for (const item of copy.services.overview.items) {
        await expect(overview.getByRole("heading", { name: item.title, exact: true })).toBeVisible();
      }
      const details = page.locator('section[aria-labelledby="services-details-title"]');
      for (const item of copy.services.details.items) {
        await expect(details.getByRole("heading", { name: item.title, exact: true })).toBeVisible();
        await expect(page.getByText(item.when, { exact: true })).toBeVisible();
      }
      await expect(page.locator('section[aria-labelledby="services-process-title"] li')).toHaveCount(copy.services.process.items.length);
      await expect(page.getByRole("link", { name: copy.actions.allProjects, exact: true })).toHaveAttribute("href", localizedPath("portfolio", locale));
      for (const project of projects.slice(0, 3)) {
        await expect(page.getByRole("link", { name: copy.actions.viewProject, exact: true }).and(page.locator(`[href="${localizedProjectPath(project.slug, locale)}"]`))).toHaveCount(1);
      }
      await expect(page.getByRole("link", { name: copy.services.pricing.label, exact: true })).toHaveAttribute("href", localizedPath("pricing", locale));
      await expect(page.getByRole("link", { name: copy.services.cta.label, exact: true })).toHaveAttribute("href", localizedPath("contact", locale));

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const clipped = await page.locator("main h1, main h2, main h3, main p, main li, main a, header a:visible").evaluateAll((elements) =>
        elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
      );
      expect(clipped).toEqual([]);

      if (width === 375 || width === 1440) {
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      }

      await page.screenshot({ path: testInfo.outputPath("services-full.png"), fullPage: true });
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} services metadata navigation and language equivalents`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(localizedPath("home", locale));
    await expect(page.locator("#services")).toHaveCount(1);
    await expect(page.locator("#services").getByRole("link", { name: copy.home.services.detailsAction, exact: true })).toHaveAttribute("href", path);
    await expect(page.getByRole("navigation", { name: copy.accessibility.mainNavigation, exact: true }).getByRole("link", { name: copy.navigation.services, exact: true })).toHaveAttribute("href", path);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: copy.navigation.services, exact: true })).toHaveAttribute("href", path);

    await page.getByRole("navigation", { name: copy.accessibility.mainNavigation, exact: true }).getByRole("link", { name: copy.navigation.services, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page).toHaveTitle(`${copy.services.metadata.title} | NMark Designs`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", copy.services.metadata.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://nmarkdesigns.com${path}`);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `https://nmarkdesigns.com${path}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${copy.services.metadata.title} | NMark Designs`);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", copy.services.metadata.description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", localeSettings[locale].openGraph);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    for (const target of locales) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${target}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com${localizedPath("services", target)}`);
      await expect(page.locator(`header a[hreflang="${target}"]`)).toHaveAttribute("href", localizedPath("services", target));
    }
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", "https://nmarkdesigns.com/sr/usluge/");

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(localizedPath("home", locale));
    await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
    const mobileLink = page.getByRole("navigation", { name: copy.accessibility.mobileNavigation }).getByRole("link", { name: copy.navigation.services, exact: true });
    await expect(mobileLink).toHaveAttribute("href", path);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(mobileLink).toBeFocused();
    await expect(mobileLink).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  });

  test(`${locale} services works without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}${path}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.services.intro.title);
      await expect(page.getByText(copy.services.process.items[0].description, { exact: true })).toBeVisible();
      await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
      await expect(page.getByRole("navigation", { name: copy.accessibility.mobileNavigation }).getByRole("link", { name: copy.navigation.services, exact: true })).toHaveAttribute("href", path);
      await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
      const target = locale === "sr" ? "en" : "sr";
      await page.locator(`header a[hreflang="${target}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${localizedPath("services", target)}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(dictionaries[target].services.intro.title);
    } finally {
      await context.close();
    }
  });
}

test("services routes and legacy services redirect stay intentional", async ({ request }) => {
  expect((await request.get("/sr/usluge/")).status()).toBe(200);
  expect((await request.get("/en/services/")).status()).toBe(200);
  for (const path of ["/fr/usluge/", "/sr/services/", "/en/usluge/", "/sr/USLUGE/", "/en/SERVICES/", "/services/"]) {
    expect((await request.get(path, { maxRedirects: 0 })).status(), path).toBe(404);
  }
  for (const legacy of ["/all-services/", "/all-services"]) {
    const response = await request.get(`${legacy}?utm_source=services`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    const location = new URL(response.headers().location, "http://127.0.0.1:3100");
    expect(location.pathname).toBe("/sr/usluge/");
    expect(location.search).toBe("?utm_source=services");
  }
});
