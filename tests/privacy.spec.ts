import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { privacyCopy } from "@/content/privacy";
import { consentCopy } from "@/content/consent";
import { localizedPath } from "@/lib/routes";

for (const locale of ["sr", "en"] as const) {
  const copy = privacyCopy[locale];
  for (const width of [375, 1440]) {
    test(`${locale} privacy draft at ${width}px: readable, accessible and excluded from indexing`, async ({ page, request }, testInfo) => {
      // Includes axe, full-page capture, consent interaction and locale navigation.
      test.slow();
      await page.setViewportSize({ width, height: 900 });
      const path = localizedPath("privacy", locale);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
      const productionHost = await request.get(path, { headers: { host: "nmarkdesigns.com" } });
      expect(productionHost.headers()["x-robots-tag"]).toBe("noindex, nofollow");
      await expect(page.locator("h1")).toHaveText(copy.title);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("[data-privacy-draft]")).toHaveText(copy.draft);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://nmarkdesigns.com${path}`);
      const target = locale === "sr" ? "en" : "sr";
      await expect(page.locator(`link[hreflang="${target}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com${localizedPath("privacy", target)}`);
      const sitemap = await (await request.get("/sitemap.xml")).text();
      expect(sitemap).not.toContain(path);
      for (const section of copy.sections) {
        await expect(page.getByRole("navigation", { name: copy.contents }).getByRole("link", { name: section.title })).toHaveAttribute("href", `#${section.id}`);
        await expect(page.locator(`#${section.id}`)).toHaveCount(1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      await page.locator("[data-consent-banner]").getByRole("button", { name: consentCopy[locale].decline, exact: true }).click();
      await page.screenshot({ path: testInfo.outputPath("privacy.png"), fullPage: true });
      await page.getByRole("contentinfo").getByRole("button", { name: consentCopy[locale].footerLink }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("link", { name: consentCopy[locale].privacyLink })).toHaveAttribute("href", path);
      await dialog.getByRole("button", { name: consentCopy[locale].close, exact: true }).click();
      await page.getByRole("banner").locator(`a[hreflang="${target}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${localizedPath("privacy", target)}$`));
    });
  }
  test(`${locale} privacy is reachable from contact and footer without submitting data`, async ({ page }) => {
    const path = localizedPath("privacy", locale);
    await page.goto(localizedPath("contact", locale));
    const link = page.locator("form").getByRole("link", { name: consentCopy[locale].privacyLink });
    await expect(link).toHaveAttribute("href", path);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: consentCopy[locale].privacyLink })).toHaveAttribute("href", path);
    await page.locator("[data-consent-banner]").getByRole("button", { name: consentCopy[locale].decline, exact: true }).click();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  });
}
