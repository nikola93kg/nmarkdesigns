import { expect, test } from "@playwright/test";

test.describe("Phase 3 — Homepage Hero Copy & Heading Punctuation", () => {
  test("Serbian homepage hero: exact approved copy, hierarchy, personal voice, and CTA destinations", async ({ page }) => {
    await page.goto("/sr/");
    const hero = page.locator('section[aria-labelledby="hero-title"]');
    await expect(hero).toBeVisible();

    // 1. Eyebrow
    const eyebrow = hero.locator("p").first();
    await expect(eyebrow).toHaveText("WEB DIZAJN · RAZVOJ SAJTOVA · SEO");

    // 2. H1
    const h1 = hero.locator("h1#hero-title");
    await expect(h1).toHaveText("Izrada modernih web sajtova");

    // 3. Subtitle (p.text-subheading)
    const subtitle = hero.locator("p.text-subheading");
    await expect(subtitle).toHaveText("Sajt koji izgleda dobro. I radi još bolje.");

    // 4. Description (personal singular voice "dizajniram i razvijam")
    const description = hero.locator("p.text-pretty");
    await expect(description).toHaveText(
      "Od prve ideje do poslednjeg detalja — dizajniram i razvijam web sajtove koji izgledaju odlično, rade brzo i imaju jasnu poslovnu svrhu."
    );

    // Verify personal voice: no agency plurals
    const descriptionText = await description.textContent();
    expect(descriptionText).toContain("dizajniram i razvijam");
    expect(descriptionText).not.toContain("Naš tim");
    expect(descriptionText).not.toContain("Naša agencija");

    // 5. Primary CTA
    const primaryCta = hero.locator('a[href="/sr/kontakt/"]').first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toContainText("Zatražite besplatnu ponudu");

    // 6. Secondary CTA
    const secondaryCta = hero.locator('a[href="/sr/portfolio/"]').first();
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveText("Pogledajte portfolio");

    // 7. No reintroduced trust signal bullets
    await expect(hero.locator("ul")).toHaveCount(0);
    await expect(hero.getByText("9 detaljnih studija slučaja")).toHaveCount(0);
    await expect(hero.getByText("Direktna saradnja sa developerom")).toHaveCount(0);
  });

  test("English homepage hero: exact approved copy, hierarchy, personal voice, and CTA destinations", async ({ page }) => {
    await page.goto("/en/");
    const hero = page.locator('section[aria-labelledby="hero-title"]');
    await expect(hero).toBeVisible();

    // 1. Eyebrow
    const eyebrow = hero.locator("p").first();
    await expect(eyebrow).toHaveText("WEB DESIGN · WEB DEVELOPMENT · SEO");

    // 2. H1
    const h1 = hero.locator("h1#hero-title");
    await expect(h1).toHaveText("Modern Websites, Thoughtfully Built");

    // 3. Subtitle
    const subtitle = hero.locator("p.text-subheading");
    await expect(subtitle).toHaveText("A website that looks great. And works even better.");

    // 4. Description (personal singular voice "I design and develop")
    const description = hero.locator("p.text-pretty");
    await expect(description).toHaveText(
      "From the first idea to the final detail, I design and develop websites that look great, load fast, and serve a clear business purpose."
    );

    // Verify personal voice
    const descriptionText = await description.textContent();
    expect(descriptionText).toContain("I design and develop");
    expect(descriptionText).not.toContain("Our agency");
    expect(descriptionText).not.toContain("Our team");

    // 5. Primary CTA
    const primaryCta = hero.locator('a[href="/en/contact/"]').first();
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toContainText("Request a Free Quote");

    // 6. Secondary CTA
    const secondaryCta = hero.locator('a[href="/en/portfolio/"]').first();
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveText("View Portfolio");

    // 7. No reintroduced bullets
    await expect(hero.locator("ul")).toHaveCount(0);
  });

  const routesToTest = [
    { name: "Homepage (SR)", path: "/sr/" },
    { name: "Homepage (EN)", path: "/en/" },
    { name: "About (SR)", path: "/sr/o-nama/" },
    { name: "About (EN)", path: "/en/about/" },
    { name: "Services (SR)", path: "/sr/usluge/" },
    { name: "Services (EN)", path: "/en/services/" },
    { name: "Portfolio (SR)", path: "/sr/portfolio/" },
    { name: "Portfolio (EN)", path: "/en/portfolio/" },
    { name: "Contact (SR)", path: "/sr/kontakt/" },
    { name: "Contact (EN)", path: "/en/contact/" },
    { name: "Pricing (SR)", path: "/sr/cenovnik/" },
    { name: "Pricing (EN)", path: "/en/pricing/" },
    { name: "Blog Listing (SR)", path: "/sr/blog/" },
    { name: "Blog Listing (EN)", path: "/en/blog/" },
    { name: "Blog Article GTA VI (SR)", path: "/sr/blog/gta-vi-website-web-dizajn-core-web-vitals/" },
    { name: "Blog Article GTA VI (EN)", path: "/en/blog/gta-vi-website-web-dizajn-core-web-vitals/" },
    { name: "Case Study Buy Pallet Jacks (SR)", path: "/sr/portfolio/buy-pallet-jacks/" },
    { name: "Case Study Buy Pallet Jacks (EN)", path: "/en/portfolio/buy-pallet-jacks/" },
  ];

  for (const route of routesToTest) {
    test(`Rendered H1 and H2 headings on ${route.name} have no trailing periods`, async ({ page }) => {
      await page.goto(route.path);
      const headings = await page.locator("main h1, main h2").all();

      for (const heading of headings) {
        const text = (await heading.innerText()).trim();
        if (!text) continue;

        // Must not end with a sentence-ending trailing period
        expect(
          text.endsWith(".") && !text.endsWith(".."),
          `Heading "${text}" on ${route.path} ends with a trailing period!`
        ).toBe(false);
      }
    });
  }

  test("Internal sentence punctuation is strictly preserved on About and Blog pages", async ({ page }) => {
    // SR About page H2
    await page.goto("/sr/o-nama/");
    const srProfileH2 = page.locator("h2#about-profile-title");
    await expect(srProfileH2).toHaveText(
      "Bez velikih agencijskih priča. Fokus je na sajtu koji stvarno ima smisla za vaš posao"
    );

    // EN About page H2
    await page.goto("/en/about/");
    const enProfileH2 = page.locator("h2#about-profile-title");
    await expect(enProfileH2).toHaveText(
      "No big-agency theatre. The focus is a website that actually makes sense for your work"
    );

    // GTA VI Blog CTA H2 (SR)
    await page.goto("/sr/blog/gta-vi-website-web-dizajn-core-web-vitals/");
    const srBlogCtaH2 = page.locator("main section:has(a[href='/sr/portfolio/']) h2");
    await expect(srBlogCtaH2).toHaveText(
      "Vaš sajt ne mora da izgleda kao GTA VI. Ali mora da zna zašto postoji"
    );

    // GTA VI Blog CTA H2 (EN)
    await page.goto("/en/blog/gta-vi-website-web-dizajn-core-web-vitals/");
    const enBlogCtaH2 = page.locator("main section:has(a[href='/en/portfolio/']) h2");
    await expect(enBlogCtaH2).toHaveText(
      "Your website does not have to look like GTA VI. But it has to know why it exists"
    );
  });

  test("Technology names like Next.js remain intact across the site", async ({ page }) => {
    await page.goto("/sr/");
    const servicesDesc = page.locator('section[aria-labelledby="services-title"]');
    await expect(servicesDesc).toContainText("Next.js");

    await page.goto("/en/");
    const servicesDescEn = page.locator('section[aria-labelledby="services-title"]');
    await expect(servicesDescEn).toContainText("Next.js");
  });

  for (const width of [375, 1440]) {
    test(`Responsive check: Homepage hero at ${width}px renders cleanly with no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      await page.goto("/sr/");
      await page.evaluate(() => document.fonts.ready);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);

      const h1 = page.locator("h1#hero-title");
      await expect(h1).toBeVisible();
      const primaryCta = page.locator('section[aria-labelledby="hero-title"] a').first();
      await expect(primaryCta).toBeVisible();
    });
  }
});
