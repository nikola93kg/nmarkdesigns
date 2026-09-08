import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  test(`foundation remains readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("NMark Designs");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

    for (const image of await page.getByRole("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    }

    if (width === 375 || width === 1440) {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: test.info().outputPath(`foundation-${width}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("mobile navigation supports keyboard, dismissal, and viewport changes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByLabel("Glavni meni", { exact: true });
  const menu = page.getByRole("navigation", { name: "Glavna navigacija za mobilne uređaje" });

  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(menu.getByRole("link", { name: "Početna" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(toggle).toBeFocused();

  await toggle.click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({ path: test.info().outputPath("mobile-menu.png"), fullPage: true });

  await page.getByRole("banner").click({ position: { x: 10, y: 10 } });
  await expect(menu).not.toBeVisible();
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("navigation", { name: "Glavna navigacija", exact: true })).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(menu).not.toBeVisible();
  await toggle.click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Cenovnik" }).focus();
  await page.keyboard.press("Tab");
  await expect(menu).not.toBeVisible();
});

test("mobile navigation works without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await page.getByLabel("Glavni meni", { exact: true }).click();
  const menu = page.getByRole("navigation", { name: "Glavna navigacija za mobilne uređaje" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Kontakt" })).toHaveAttribute("href", "https://nmarkdesigns.com/contact/");
  await context.close();
});

test("metadata, skip link, and unfinished routes stay intentional", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "sr-Latn");
  await expect(page).toHaveTitle("Izrada web sajtova | NMark Designs");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://nmarkdesigns.com/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://nmarkdesigns.com/");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pređi na sadržaj" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Pređi na sadržaj" })).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  expect((await request.get("/services/")).status()).toBe(404);
});
