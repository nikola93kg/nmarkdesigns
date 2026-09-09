import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { locales } from "@/lib/i18n";

const dictionaries = { sr, en };
const responsiveCases = locales.flatMap((locale) =>
  [320, 375, 430, 768, 1024, 1440, 1920].map((width) => ({ locale, width })),
);

for (const { locale, width } of responsiveCases) {
  test(`${locale} homepage remains readable at ${width}px`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/${locale}/`);
    await page.evaluate(() => document.fonts.ready);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(dictionaries[locale].home.hero.title);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator("main > section")).toHaveCount(5);
    await expect(page.locator("#portfolio article")).toHaveCount(8);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

    const languageNavigation = page.getByRole("navigation", { name: dictionaries[locale].accessibility.languageNavigation });
    await expect(languageNavigation).toBeVisible();
    await expect(languageNavigation.locator('[aria-current="page"]')).toHaveText(locale.toUpperCase());
    await expect(languageNavigation.locator('[aria-current="page"]')).toHaveCSS("text-decoration-line", "underline");
    const headerControls = await page.getByRole("banner").locator("a:visible, summary:visible").evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          label: element.getAttribute("aria-label") ?? element.textContent ?? element.tagName,
          left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, height: rect.height,
        };
      }),
    );
    expect(headerControls).toHaveLength(width >= 1024 ? 9 : 4);
    for (const [index, control] of headerControls.entries()) {
      expect(control.left, control.label).toBeGreaterThanOrEqual(0);
      expect(control.right, control.label).toBeLessThanOrEqual(width);
      expect(control.height, control.label).toBeGreaterThanOrEqual(44);
      for (const other of headerControls.slice(index + 1)) {
        const overlapX = Math.min(control.right, other.right) - Math.max(control.left, other.left);
        const overlapY = Math.min(control.bottom, other.bottom) - Math.max(control.top, other.top);
        expect(overlapX > 0 && overlapY > 0, `${control.label} overlaps ${other.label}`).toBe(false);
      }
    }

    const overflowingText = await page.locator("main h1, main h2, main h3, main p, main button").evaluateAll((elements) =>
      elements.filter((element) => element.getClientRects().length > 0 && element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
    );
    expect(overflowingText).toEqual([]);

    for (const image of await page.getByRole("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
      const box = await image.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }

    if (width === 375 || width === 1440) {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: test.info().outputPath(`home-${locale}-${width}.png`), fullPage: true });
    await page.screenshot({ path: test.info().outputPath(`viewport-${locale}-${width}.png`) });
    await page.getByRole("banner").screenshot({ path: test.info().outputPath(`header-${locale}-${width}.png`) });
    for (const section of ["services", "cta", "faq"]) {
      await page.locator(`section[aria-labelledby="${section}-title"]`).evaluate((element) => {
        window.scrollTo(0, window.scrollY + element.getBoundingClientRect().top);
      });
      await page.screenshot({ path: test.info().outputPath(`${section}-${locale}-${width}.png`) });
      if (section === "services" && width < 768) {
        await page.locator("#services ol").evaluate((element) => {
          window.scrollTo(0, window.scrollY + element.getBoundingClientRect().top);
        });
        await page.screenshot({ path: test.info().outputPath(`services-detail-${locale}-${width}.png`) });
      }
    }
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

test("root redirect, skip link, and unfinished routes stay intentional", async ({ page, request }) => {
  const response = await request.get("/", { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe("/sr/");
  const englishBrowser = await request.get("/", { maxRedirects: 0, headers: { "Accept-Language": "en-US,en;q=0.9" } });
  expect(englishBrowser.headers().location).toBe("/sr/");
  await page.goto("/");
  await expect(page).toHaveURL(/\/sr\/$/);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pređi na sadržaj" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Pređi na sadržaj" })).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  for (const path of ["/fr/", "/SR/", "/services/", "/sr/usluge/", "/en/services/", "/sr/unknown/"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});
