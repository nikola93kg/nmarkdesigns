import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { navigationItem, navigationOrder } from "@/lib/routes";

test.use({ viewport: { width: 402, height: 874 }, hasTouch: true });

for (const locale of ["sr", "en"] as const) {
  test(`mobile menu touch links navigate and unlock scrolling (${locale})`, async ({ page }) => {
    const copy = { sr, en }[locale];
    await page.goto(`/${locale}/`);

    for (const route of [...navigationOrder, "pricing"] as const) {
      const item = navigationItem(route, locale, copy.navigation[route]);
      await page.getByLabel(copy.accessibility.menu, { exact: true }).tap();
      const panel = page.locator("#mobile-navigation");
      await expect(panel).toBeVisible();
      await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
      await panel.getByRole("link", { name: item.label, exact: true }).tap();
      await expect(page).toHaveURL(new RegExp(`${item.href}$`));
      await expect(panel).not.toBeVisible();
      await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    }
  });
}

test("Safari-style blur with no next focus keeps the link available until activation", async ({ page }) => {
  await page.goto("/sr/");
  const toggle = page.getByLabel("Glavni meni", { exact: true });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const panel = page.locator("#mobile-navigation");
  const portfolio = panel.getByRole("link", { name: "Portfolio", exact: true });

  // Safari can leave relatedTarget null between touch pointerdown and click.
  // Wait past the old zero-delay pointer guard before emitting that blur.
  await portfolio.dispatchEvent("pointerdown", { pointerType: "touch" });
  await toggle.evaluate(async (element) => {
    await new Promise<void>((resolve) => window.setTimeout(resolve, 20));
    element.dispatchEvent(new FocusEvent("focusout", { bubbles: true, relatedTarget: null }));
  });
  await expect(panel).toBeVisible();
  await portfolio.tap();
  await expect(page).toHaveURL(/\/sr\/portfolio\/$/);
  await expect(panel).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});
