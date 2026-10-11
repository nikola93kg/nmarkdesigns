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

test("header language switcher links satisfy 44px mobile touch targets", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto("/sr/");
  const switcherLinks = page.locator("header nav.shrink-0 a");
  const count = await switcherLinks.count();
  expect(count).toBeGreaterThanOrEqual(1);

  for (const link of await switcherLinks.all()) {
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  }
  await page.close();
});

test("footer navigation and contact links satisfy 44px mobile touch targets", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto("/sr/");
  const footerLinks = page.locator("footer nav a, footer address a, footer ul[aria-label] a");
  const count = await footerLinks.count();
  expect(count).toBeGreaterThanOrEqual(5);

  for (const link of await footerLinks.all()) {
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  }
  await page.close();
});

test("portfolio showcase images request capped deviceSizes without 3840px bloat", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("/sr/portfolio/");
  const firstImage = page.locator("article img").first();
  await expect(firstImage).toBeVisible();

  const currentSrc = await firstImage.evaluate((img: HTMLImageElement) => img.currentSrc);
  const requestedW = Number(new URL(currentSrc).searchParams.get("w"));
  expect(requestedW).toBeLessThanOrEqual(2048);
  expect(requestedW).toBeGreaterThan(0);
  await page.close();
});

test("GTA VI blog article delivers optimized WebP cover and valid article metadata", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("/sr/blog/gta-vi-website-web-dizajn-core-web-vitals/");
  
  // Verify WebP image tag
  const coverImage = page.locator("figure img").first();
  await expect(coverImage).toBeVisible();
  const currentSrc = await coverImage.evaluate((img: HTMLImageElement) => img.currentSrc);
  expect(currentSrc).toContain("gta-vi-website-cover.webp");

  // Verify Open Graph image metadata
  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute("content", /gta-vi-website-cover\.webp/);

  // Verify JSON-LD Schema
  const schemaScript = page.locator('script[type="application/ld+json"]');
  const jsonContent = await schemaScript.textContent();
  expect(jsonContent).toContain("gta-vi-website-cover.webp");

  await page.close();
});