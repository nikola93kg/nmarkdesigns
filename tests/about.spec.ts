import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { locales, localeSettings } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

const dictionaries = { sr, en };

for (const locale of locales) {
  const copy = dictionaries[locale];
  const path = localizedPath("about", locale);

  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} about at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.about.intro.title);
      await expect(page.locator("main h2")).toHaveText([copy.about.profile.title, copy.about.approach.title]);
      for (const paragraph of copy.about.profile.paragraphs) {
        await expect(page.getByText(paragraph, { exact: true })).toBeVisible();
      }
      await expect(page.locator("main li")).toHaveText([...copy.about.approach.principles]);
      const portrait = page.getByRole("img", { name: copy.about.profile.imageAlt, exact: true });
      await portrait.scrollIntoViewIfNeeded();
      await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(portrait).toHaveCSS("object-fit", "contain");
      const bounds = await portrait.boundingBox();
      expect(bounds!.height / bounds!.width).toBeCloseTo(1.5, 1);
      expect(bounds!.width).toBeGreaterThan(200);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(await page.locator("main h1, main h2, main p, main li, main figcaption, header a:visible").evaluateAll((elements) =>
        elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
      )).toEqual([]);
      const languageNav = page.getByRole("navigation", { name: copy.accessibility.languageNavigation });
      await expect(languageNav).toBeVisible();
      await expect(languageNav.locator('[aria-current="page"]')).toHaveText(locale.toUpperCase());
      await expect(languageNav.locator('[aria-current="page"]')).toHaveCSS("text-decoration-line", "underline");
      for (const target of locales) {
        await expect(languageNav.locator(`[hreflang="${target}"]`)).toHaveAttribute("href", localizedPath("about", target));
      }
      const footer = page.getByRole("contentinfo");
      await expect(footer.getByRole("link", { name: "+381 64 300 5654", exact: true })).toHaveAttribute("href", "tel:+381643005654");
      await expect(footer.getByRole("link", { name: "WhatsApp", exact: true })).toHaveAttribute("href", "https://wa.me/381643005654");
      await expect(page.getByText("+52 984 137 1132", { exact: false })).toHaveCount(0);
      if (width === 375 || width === 1440) {
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: test.info().outputPath("intro.png") });
      await page.screenshot({ path: test.info().outputPath("full-page.png"), fullPage: true });
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} about metadata`, async ({ page }) => {
    await page.goto(path);
    const canonical = `https://nmarkdesigns.com${path}`;
    await expect(page).toHaveTitle(`${copy.about.metadata.title} | NMark Designs`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", copy.about.metadata.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${copy.about.metadata.title} | NMark Designs`);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", copy.about.metadata.description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", localeSettings[locale].openGraph);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", copy.about.profile.imageAlt);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", copy.about.metadata.description);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    for (const target of locales) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${target}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com${localizedPath("about", target)}`);
    }
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", "https://nmarkdesigns.com/sr/o-nama/");
  });

  test(`${locale} about desktop mobile and footer navigation`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const origin of [localizedPath("home", locale), localizedPath("portfolio", locale)]) {
      await page.goto(origin);
      const headerLink = page.getByRole("navigation", { name: copy.accessibility.mainNavigation, exact: true }).getByRole("link", { name: copy.navigation.about, exact: true });
      await expect(headerLink).toHaveAttribute("href", path);
      await headerLink.focus();
      await expect(headerLink).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      const footer = page.getByRole("contentinfo");
      await expect(footer.getByRole("navigation").getByRole("link")).toHaveText([
        copy.navigation.home, copy.navigation.services, copy.footer.portfolioLabel,
        copy.navigation.pricing, copy.navigation.contact,
      ]);
      await expect(footer.getByRole("link", { name: copy.navigation.contact, exact: true })).toHaveAttribute("href", localizedPath("contact", locale));
      await expect(footer.getByRole("link", { name: copy.navigation.pricing, exact: true })).toHaveAttribute("href", localizedPath("pricing", locale));
      await expect(page.locator('a[href="https://nmarkdesigns.com/about/"]')).toHaveCount(0);
    }
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(localizedPath("home", locale));
    const toggle = page.getByLabel(copy.accessibility.menu, { exact: true });
    await toggle.focus();
    await page.keyboard.press("Enter");
    const mobile = page.getByRole("navigation", { name: copy.accessibility.mobileNavigation });
    const link = mobile.getByRole("link", { name: copy.navigation.about, exact: true });
    await expect(link).toHaveAttribute("href", path);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(mobile).not.toBeVisible();
    const cta = page.getByRole("main").getByRole("link", { name: copy.actions.contact, exact: true });
    await cta.focus();
    await expect(cta).toBeFocused();
    await expect(cta).toHaveCSS("outline-style", "solid");
    await expect(cta).toHaveAttribute("href", localizedPath("contact", locale));
  });

  test(`${locale} about without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}${path}`);
      for (const paragraph of copy.about.profile.paragraphs) {
        await expect(page.getByText(paragraph, { exact: true })).toBeVisible();
      }
      await expect(page.locator("main li")).toHaveText([...copy.about.approach.principles]);
      await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
      await expect(page.getByRole("navigation", { name: copy.accessibility.mobileNavigation }).getByRole("link", { name: copy.navigation.about, exact: true })).toHaveAttribute("href", path);
      await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
      const target = locale === "sr" ? "en" : "sr";
      await page.locator(`header a[hreflang="${target}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${localizedPath("about", target)}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(dictionaries[target].about.intro.title);
    } finally {
      await context.close();
    }
  });
}

for (const width of [375, 1440]) {
  test(`about keyboard language switching at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sr/o-nama/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: sr.accessibility.skipLink, exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
    for (const target of ["en", "sr"] as const) {
      const link = page.locator(`header a[hreflang="${target}"]`);
      await link.focus();
      await expect(link).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${localizedPath("about", target)}$`));
      await expect(page.locator("html")).toHaveAttribute("lang", target);
      await expect(page.locator(`header a[hreflang="${target}"]`)).toHaveAttribute("aria-current", "page");
    }
  });
}

test("about rejects wrong locales slugs and unimplemented routes", async ({ request }) => {
  for (const path of ["/fr/about/", "/SR/o-nama/", "/EN/about/", "/sr/about/", "/en/o-nama/", "/sr/O-NAMA/", "/en/ABOUT/", "/en/about/extra/", "/sr/blog/", "/en/blog/", "/sr/unknown/"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
  for (const locale of locales) {
    expect((await request.get(localizedPath("about", locale).slice(0, -1))).status()).toBe(200);
  }
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(308);
  expect(new URL(root.headers().location, "http://127.0.0.1:3100").pathname).toBe("/sr/");
});
