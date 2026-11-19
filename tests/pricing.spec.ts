import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { localizedPath } from "@/lib/routes";

test("US package prices stay consistent across pages, inquiries and machine-readable content", async ({ page, request }) => {
  const prices = [
    { id: "landing-page", price: "$750" },
    { id: "business-website", price: "$1,500" },
    { id: "advanced-website", price: "$2,500" },
    { id: "ecommerce", price: "$3,500" },
  ];
  await page.goto("/en/pricing/");
  await expect(page).toHaveTitle(/from \$750/);
  const metadata = page.locator('meta[name="description"]');
  for (const { price } of prices) await expect(metadata).toHaveAttribute("content", new RegExp(price.replace(/\$/g, "\\$")));

  const extras = [
    { id: "redesign", price: "$600" }, { id: "seo", price: "$200" },
    { id: "performance", price: "$150" }, { id: "ai-chatbot", price: "$450" },
    { id: "hosting", price: "$50/year" }, { id: "basic-care", price: "$40/month" },
    { id: "business-care", price: "$75/month" },
  ];
  const pricingText = await page.locator("main").innerText();
  expect(pricingText).not.toMatch(/€|EUR/);
  for (const { price } of [...prices, ...extras]) expect(pricingText).toContain(`From ${price}`);
  for (const { id, price } of extras) {
    await page.goto(`/en/contact/?service=${id}#contact-form`);
    await expect(page.locator('[name="message"]')).toHaveValue(new RegExp(`from ${price.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  }

  for (const { id, price } of prices) {
    await page.goto(`/en/contact/?service=${id}#contact-form`);
    await expect(page.locator('[name="message"]')).toHaveValue(`Hi Nikola, I'm interested in ${
      id === "landing-page" ? "Landing Page website development"
        : id === "business-website" ? "Business Website development"
          : id === "advanced-website" ? "Advanced Website development"
            : "E-commerce online store development"
    } (from ${price}).`);
  }

  for (const [slug, price] of [["website-development", "$750"], ["ecommerce-development", "$3,500"], ["web-design-and-redesign", "$600"], ["seo-and-speed-optimization", "$150"], ["website-maintenance", "$40/month"]]) {
    await page.goto(`/en/services/${slug}/`);
    const label = ["website-development", "ecommerce-development"].includes(slug) ? `Starting from ${price}` : `From ${price}`;
    await expect(page.getByText(label, { exact: true })).toBeVisible();
    expect(await page.locator("main").innerText()).not.toMatch(/€|EUR/);
    const nodes = (await page.locator('script[type="application/ld+json"]').allTextContents())
      .flatMap((text) => (JSON.parse(text) as { "@graph"?: Array<{ "@type": string; offers?: { priceCurrency: string; description: string } }> })["@graph"] ?? []);
    expect(nodes.find((node) => node["@type"] === "Service")?.offers).toMatchObject({ priceCurrency: "USD", description: label });
  }

  const llms = await (await request.get("/llms.txt")).text();
  for (const { price } of [...prices,...extras]) expect(llms).toContain(price);
  expect(llms).not.toContain("€300 / $350");
  for (const [slug, expected] of [
    ["ai-chatbot-za-sajt-cena-isplativost-2026", "NMark Designs offers AI chatbot integration from $450"],
    ["10-znakova-da-je-vreme-za-redizajn-sajta-2026", "At NMark Designs, website redesign packages start from $600"],
    ["google-ai-sadrzaj-2026-chatgpt-seo", "NMark Designs SEO audits start from $200"],
    ["wordpress-vs-nextjs-poslovni-sajt", "NMark Designs Basic Care starts from $40/month"],
  ]) {
    await page.goto(`/en/blog/${slug}/`);
    await expect(page.locator("main")).toContainText(expected);
  }
});

for (const locale of ["sr", "en"] as const) {
  const dictionary = { sr, en }[locale];
  const copy = dictionary.pricing;
  const path = localizedPath("pricing", locale);
  const contactPath = localizedPath("contact", locale);

  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} pricing at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);

      // Verify H1
      await expect(page.locator("h1")).toHaveText(copy.intro.title);

      // Verify the 4 website packages
      const packagesSection = page.locator("#packages");
      await expect(packagesSection).toBeVisible();
      const packages = packagesSection.locator("article");
      await expect(packages).toHaveCount(4);

      const expectedWebsitePackages = locale === "sr"
        ? [
            { name: "Landing Page", price: "Od 300 €" },
            { name: "Poslovni sajt", price: "Od 550 €" },
            { name: "Napredni sajt", price: "Od 900 €" },
            { name: "Web prodavnica", price: "Od 1.200 €" },
          ]
        : [
            { name: "Landing Page", price: "From $750" },
            { name: "Business Website", price: "From $1,500" },
            { name: "Advanced Website", price: "From $2,500" },
            { name: "E-commerce Website", price: "From $3,500" },
          ];

      for (let i = 0; i < expectedWebsitePackages.length; i++) {
        const item = expectedWebsitePackages[i];
        const entry = packages.nth(i);
        await expect(entry.getByRole("heading", { name: item.name })).toBeVisible();
        await expect(entry.getByText(item.price, { exact: true })).toBeVisible();
      }

      // Verify Custom Web Applications section
      const customDevSection = page.locator('section[aria-labelledby="custom-dev-title"]');
      await expect(customDevSection).toBeVisible();
      await expect(customDevSection.getByRole("heading", { name: copy.customDevelopment.title })).toBeVisible();
      await expect(customDevSection.getByText(copy.customDevelopment.price)).toBeVisible();

      // Verify Additional Services section
      const additionalServicesSection = page.locator('section[aria-labelledby="additional-services-title"]');
      await expect(additionalServicesSection).toBeVisible();
      const additionalArticles = additionalServicesSection.locator("article");
      await expect(additionalArticles).toHaveCount(4);

      // Verify Maintenance section
      const maintenanceSection = page.locator('section[aria-labelledby="maintenance-title"]');
      await expect(maintenanceSection).toBeVisible();
      const maintenanceArticles = maintenanceSection.locator("article");
      await expect(maintenanceArticles).toHaveCount(4);

      // Verify Process section (6 steps)
      const processSection = page.locator('section[aria-labelledby="process-title"]');
      await expect(processSection).toBeVisible();

      // Verify FAQ questions
      for (const question of copy.faq.items) {
        await expect(page.getByRole("heading", { name: question.question })).toBeVisible();
      }

      // Check no horizontal overflow
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

      const clipped = await page.locator("main h1,main h2,main h3,main p,main li,main a").evaluateAll((elements) =>
        elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent)
      );
      expect(clipped).toEqual([]);

      await page.screenshot({ path: testInfo.outputPath("pricing.png"), fullPage: true });

      if (width === 375 || width === 1440) {
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      }
    });
  }

  test(`${locale} pricing navigation, keyboard and language equivalents`, async ({ page }) => {
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(localizedPath("home", locale));

      await expect(page.getByRole("contentinfo").getByRole("link", { name: dictionary.navigation.pricing, exact: true })).toHaveAttribute("href", path);

      if (width < 1024) await page.getByLabel(dictionary.accessibility.menu, { exact: true }).click();
      const headerLink = page.getByRole("banner").getByRole("link", { name: dictionary.navigation.pricing, exact: true }).filter({ visible: true });
      await expect(headerLink).toHaveAttribute("href", path);
      await headerLink.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${path}$`));

      for (const target of [locale === "sr" ? "en" : "sr", locale] as const) {
        const link = page.getByRole("banner").locator(`a[hreflang="${target}"]`);
        await link.focus();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(new RegExp(`${localizedPath("pricing", target)}$`));
      }

      const cta = page.locator("#packages article a").first();
      await cta.focus();
      await expect(cta).toBeFocused();
      expect(await cta.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");

      const targetHref = await cta.getAttribute("href");
      expect(targetHref).toContain(contactPath);
      expect(targetHref).toContain("service=landing-page");
    }
  });
}
