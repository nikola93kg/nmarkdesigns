import { expect, test } from "@playwright/test";

test("mobile hero uses appropriately sized images without entrance delays", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 3 });
  await page.goto("/sr/");
  const layers = page.locator("[data-hero-artwork] img");
  await expect(layers).toHaveCount(5);
  for (const image of await layers.all()) {
    await expect(image).toHaveJSProperty("complete", true);
    const metrics = await image.evaluate((element: HTMLImageElement) => ({
      requested: Number(new URL(element.currentSrc).searchParams.get("w")),
      rendered: element.clientWidth * devicePixelRatio,
      animation: getComputedStyle(element).animationName,
      opacity: getComputedStyle(element).opacity,
    }));
    expect(metrics.requested).toBeLessThanOrEqual(metrics.rendered * 1.35);
    expect(metrics.animation).toBe("none");
    expect(metrics.opacity).toBe("1");
  }
  await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(1);
  await page.close();
});