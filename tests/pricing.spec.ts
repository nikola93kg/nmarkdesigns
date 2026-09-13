import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { localizedPath } from "@/lib/routes";

for (const locale of ["sr", "en"] as const) {
  const dictionary = { sr, en }[locale];
  const copy = dictionary.pricing;
  const path = localizedPath("pricing", locale);
  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} pricing at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await expect(page.locator("h1")).toHaveText(copy.intro.title);
      const packages = page.locator("main article");
      await expect(packages).toHaveCount(3);
      for (const [index, name, price, featureCount] of [[0, "Basic plan", "450 €", 7], [1, "Standard Plan", "650 €", 8], [2, "Premium plan", "1.000 €", 10]] as const) {
        const entry = packages.nth(index);
        await expect(entry.getByRole("heading", { name })).toBeVisible();
        await expect(entry.getByText(price, { exact: true })).toBeVisible();
        await expect(entry.locator("li")).toHaveCount(featureCount);
        await expect(entry.getByRole("link")).toHaveAttribute("href", localizedPath("contact", locale));
      }
      await expect(packages.nth(0).getByText(copy.excludedLabel, { exact: false })).toBeVisible();
      await expect(packages.nth(1).getByText(copy.excludedLabel, { exact: false })).toBeVisible();
      await expect(packages.nth(2).getByText(copy.excludedLabel, { exact: false })).toHaveCount(0);
      for (const question of copy.faq.items) await expect(page.getByRole("heading", { name: question.question })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const clipped = await page.locator("main h1,main h2,main h3,main p,main li,main a").evaluateAll((elements) => elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent));
      expect(clipped).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath("pricing.png"), fullPage: true });
      if (width === 375 || width === 1440) expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    });
  }
  test(`${locale} pricing navigation, keyboard and language equivalents`, async ({ page }) => {
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(localizedPath("home", locale));
      await expect(page.getByRole("contentinfo").getByRole("link", { name: dictionary.navigation.pricing, exact: true })).toHaveAttribute("href", path);
      await expect(page.locator("main").getByRole("link", { name: dictionary.navigation.pricing, exact: true })).toHaveCount(0);
      if (width < 1024) await page.getByLabel(dictionary.accessibility.menu, { exact: true }).click();
      const headerLink = page.getByRole("banner").getByRole("link", { name: dictionary.navigation.pricing, exact: true }).filter({ visible: true });
      await expect(headerLink).toHaveAttribute("href", path);
      await headerLink.focus(); await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      for (const target of [locale === "sr" ? "en" : "sr", locale] as const) {
        const link = page.getByRole("banner").locator(`a[hreflang="${target}"]`);
        await link.focus(); await page.keyboard.press("Enter");
        await expect(page).toHaveURL(new RegExp(`${localizedPath("pricing", target)}$`));
      }
      const cta = page.locator("main article a").first();
      await cta.focus(); await expect(cta).toBeFocused();
      expect(await cta.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${localizedPath("contact", locale)}$`));
    }
  });
}
