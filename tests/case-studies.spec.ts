import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { caseStudyProjects } from "@/content/projects";
import { locales } from "@/lib/i18n";
import { localizedProjectPath } from "@/lib/routes";

const dictionaries = { sr, en };

for (const locale of locales) {
  const copy = dictionaries[locale];

  for (const [index, project] of caseStudyProjects.entries()) {
    test(`${locale} ${project.slug} content and metadata`, async ({ page }) => {
      await page.goto(localizedProjectPath(project.slug, locale));
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
      await expect(page.getByText(project.caseStudy.overview[locale], { exact: true })).toBeVisible();
      if (project.client) await expect(page.locator("main dd").filter({ hasText: project.client })).toHaveText(project.client);
      if (project.client && /[\u0400-\u04ff]/u.test(project.client)) {
        await page.evaluate(() => document.fonts.ready);
        // The previous font fallback gave Cyrillic letters zero advance width.
        const textWidth = await page.locator("main dd").first().evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return range.getBoundingClientRect().width;
        });
        expect(textWidth).toBeGreaterThan(200);
      }
      if (project.technologies?.length) {
        await expect(page.locator("main dd").filter({ hasText: project.technologies.join(", ") })).toHaveText(project.technologies.join(", "));
      } else {
        await expect(page.locator("main dt").filter({ hasText: copy.caseStudy.technologies })).toHaveCount(0);
      }
      if (project.websiteUrl && project.status !== "inactive") {
        await expect(page.getByRole("link", { name: copy.portfolio.visitWebsite, exact: true })).toHaveAttribute("href", project.websiteUrl);
      } else if (project.status === "inactive") {
        await expect(page.getByText(copy.portfolio.historicalProject, { exact: true })).toBeVisible();
      }
      for (const key of ["challenge", "approach", "solution", "results"] as const) {
        if (!project.caseStudy[key]?.[locale]?.length) {
          await expect(page.getByRole("heading", { name: copy.caseStudy[key], exact: true })).toHaveCount(0);
        } else {
          await expect(page.getByRole("heading", { name: copy.caseStudy[key], exact: true })).toBeVisible();
        }
      }
      if (project.caseStudy.technicalHighlights?.length) {
        await expect(page.getByRole("heading", { name: copy.caseStudy.technicalHighlights, exact: true })).toBeVisible();
      }
      if (project.caseStudy.relatedSlugs?.length) {
        await expect(page.getByRole("heading", { name: copy.caseStudy.relatedProjects, exact: true })).toBeVisible();
      }
      await expect(page.locator("#project-gallery")).toHaveCount(0);
      const url = `https://nmarkdesigns.com${localizedProjectPath(project.slug, locale)}`;
      await expect(page).toHaveTitle(`${project.title} - ${copy.caseStudy.eyebrow} | NMark Designs`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", project.caseStudy.overview[locale]);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", url);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", project.caseStudy.overview[locale]);
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", project.featuredImage.alt[locale]);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
      for (const language of locales) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com${localizedProjectPath(project.slug, language)}`);
      }
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", `https://nmarkdesigns.com${localizedProjectPath(project.slug, "sr")}`);
      const other = locale === "sr" ? "en" : "sr";
      await expect(page.locator(`header a[hreflang="${other}"]`)).toHaveAttribute("href", localizedProjectPath(project.slug, other));
      const next = caseStudyProjects[(index + 1) % caseStudyProjects.length];
      await expect(page.getByRole("navigation", { name: copy.caseStudy.navigation }).getByRole("link", { name: new RegExp(next.title) })).toHaveAttribute("href", localizedProjectPath(next.slug, locale));
      await expect(page.locator('main a[href^="https://nmarkdesigns.com/portfolio/"]')).toHaveCount(0);
    });
  }

  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} case study layouts at ${width}px`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      // Cover the tallest source image and a longer title/client name.
      for (const project of [caseStudyProjects[0], caseStudyProjects[2]]) {
        await page.goto(localizedProjectPath(project.slug, locale));
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        const image = page.locator("main img").first();
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute("alt", project.featuredImage.alt[locale]);
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
        await expect(image).toHaveCSS("object-fit", "contain");
        const rect = await image.boundingBox();
        expect(rect!.x).toBeGreaterThanOrEqual(0);
        expect(rect!.x + rect!.width).toBeLessThanOrEqual(width);
        expect(rect!.width).toBeGreaterThan(200);
        const clipped = await page.locator("main h1, main p, main dd, main a").evaluateAll((elements) =>
          elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
        );
        expect(clipped).toEqual([]);
        if (width === 375 || width === 1440) {
          const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
          expect(result.violations).toEqual([]);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: test.info().outputPath(`${project.slug}-intro.png`) });
        await page.screenshot({ path: test.info().outputPath(`${project.slug}-full.png`), fullPage: true });
      }
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} homepage links to local case studies and index links to client sites`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    for (const project of caseStudyProjects.filter((p) => p.featured !== false)) {
      await expect(page.getByRole("link", { name: `${copy.actions.viewProject}: ${project.title}`, exact: true })).toHaveAttribute("href", localizedProjectPath(project.slug, locale));
    }
    await page.getByRole("link", { name: `${copy.actions.viewProject}: ${caseStudyProjects[0].title}`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${localizedProjectPath(caseStudyProjects[0].slug, locale)}$`));
    await page.getByRole("navigation", { name: copy.caseStudy.navigation }).getByRole("link", { name: copy.actions.allProjects, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/portfolio/$`));

    await page.goto(`/${locale}/portfolio/`);
    for (const project of caseStudyProjects) {
      await expect(page.locator(`main a[href="${localizedProjectPath(project.slug, locale)}"]`)).toHaveCount(3);
      if (project.status === "inactive") {
        await expect(page.locator(`#project-${project.slug} a[href="${project.websiteUrl}"]`)).toHaveCount(0);
      } else if (project.websiteUrl) {
        await expect(page.locator(`#project-${project.slug} a[href="${project.websiteUrl}"]`)).toHaveCount(1);
      }
    }
  });

  test(`${locale} case study is usable without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    const project = caseStudyProjects[7];
    await page.goto(`${baseURL}${localizedProjectPath(project.slug, locale)}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.getByText(project.caseStudy.overview[locale], { exact: true })).toBeVisible();
    const other = locale === "sr" ? "en" : "sr";
    await page.locator(`header a[hreflang="${other}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${localizedProjectPath(project.slug, other)}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", other);
    await context.close();
  });
}

for (const width of [375, 1440]) {
  test(`case study keyboard navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sr/portfolio/coolfridgeguys/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: sr.accessibility.skipLink })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
    for (const target of ["en", "sr"] as const) {
      const language = page.locator(`header a[hreflang="${target}"]`);
      await language.focus();
      await expect(language).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${target}/portfolio/coolfridgeguys/$`));
      await expect(page.locator(`header a[hreflang="${target}"]`)).toHaveAttribute("aria-current", "page");
    }
    const next = page.getByRole("navigation", { name: sr.caseStudy.navigation }).getByRole("link", { name: /LaDekor/ });
    await next.focus();
    await expect(next).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/sr\/portfolio\/ladekor\/$/);
  });
}

test("Cool Fridge Guys case study renders all premium sections and related projects", async ({ page }) => {
  for (const locale of locales) {
    const copy = dictionaries[locale];
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${locale}/portfolio/coolfridgeguys/`);

    // Facts DL
    await expect(page.locator("main dt").filter({ hasText: copy.caseStudy.client })).toBeVisible();
    await expect(page.locator("main dt").filter({ hasText: copy.caseStudy.technologies })).toBeVisible();
    await expect(page.locator("main dt").filter({ hasText: copy.caseStudy.technologies }).locator("+ dd")).toHaveText(/Next\.js 15/);

    // Narrative sections
    await expect(page.getByRole("heading", { name: copy.caseStudy.challenge, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: copy.caseStudy.approach, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: copy.caseStudy.solution, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: copy.caseStudy.results, exact: true })).toBeVisible();

    // AI Sales Assistant section
    const aiSection = page.locator('section[aria-labelledby="project-ai-assistant"]');
    await expect(aiSection).toBeVisible();
    await expect(aiSection.getByRole("heading", { level: 2 })).toBeVisible();

    // Technical highlights section
    await expect(page.getByRole("heading", { name: copy.caseStudy.technicalHighlights, exact: true })).toBeVisible();
    const highlightCards = page.locator('section[aria-labelledby="project-highlights"] div.rounded-card');
    await expect(highlightCards).toHaveCount(4);

    // Related projects section
    await expect(page.getByRole("heading", { name: copy.caseStudy.relatedProjects, exact: true })).toBeVisible();
    const relatedCards = page.locator('section[aria-labelledby="related-projects-title"] article');
    await expect(relatedCards).toHaveCount(2);

    // External visit website link
    await expect(page.getByRole("link", { name: copy.portfolio.visitWebsite, exact: true })).toHaveAttribute("href", "https://www.coolfridgeguys.com/");

    // Contact form CTA
    const expectedContactTitle = copy.caseStudy.contactTitle ?? copy.portfolio.contactTitle;
    await expect(page.getByRole("heading", { name: expectedContactTitle, exact: true })).toBeVisible();
  }
});

test("Phase 3B.2 case studies (Ilić Enterijer, Powder Brows Vienna, Časovi Francuskog) render 4 highlights and deliverables", async ({ page }) => {
  const targetSlugs = ["ilic-enterijer", "powder-brows-vienna", "casovi-francuskog"] as const;
  for (const locale of locales) {
    const copy = dictionaries[locale];
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const slug of targetSlugs) {
      await page.goto(localizedProjectPath(slug, locale));
      const project = caseStudyProjects.find((p) => p.slug === slug)!;

      // Technical highlights section has 4 cards
      await expect(page.getByRole("heading", { name: copy.caseStudy.technicalHighlights, exact: true })).toBeVisible();
      const highlightCards = page.locator('section[aria-labelledby="project-highlights"] div.rounded-card');
      await expect(highlightCards).toHaveCount(4);

      // Results section has 4 items
      await expect(page.getByRole("heading", { name: copy.caseStudy.results, exact: true })).toBeVisible();
      const resultItems = page.locator('section[aria-labelledby="project-results"] p');
      await expect(resultItems).toHaveCount(4);

      // External website link
      if (project.websiteUrl && project.status !== "inactive") {
        await expect(page.getByRole("link", { name: copy.portfolio.visitWebsite, exact: true })).toHaveAttribute("href", project.websiteUrl);
      }

      // Related projects
      if (project.caseStudy.relatedSlugs?.length) {
        await expect(page.getByRole("heading", { name: copy.caseStudy.relatedProjects, exact: true })).toBeVisible();
      }
    }
  }
});

test("Phase 3B.3 case studies (Buy Pallet Jacks, OŠ Dule Karaklajić, Tripoli Sweets, LaDekor) render 4 highlights and deliverables", async ({ page }) => {
  const targetSlugs = ["buy-pallet-jacks", "os-dule-karaklajic", "tripolisweets", "ladekor"] as const;
  for (const locale of locales) {
    const copy = dictionaries[locale];
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const slug of targetSlugs) {
      await page.goto(localizedProjectPath(slug, locale));
      const project = caseStudyProjects.find((p) => p.slug === slug)!;

      // Technical highlights section has 4 cards
      await expect(page.getByRole("heading", { name: copy.caseStudy.technicalHighlights, exact: true })).toBeVisible();
      const highlightCards = page.locator('section[aria-labelledby="project-highlights"] div.rounded-card');
      await expect(highlightCards).toHaveCount(4);

      // Results section has 4 items
      await expect(page.getByRole("heading", { name: copy.caseStudy.results, exact: true })).toBeVisible();
      const resultItems = page.locator('section[aria-labelledby="project-results"] p');
      await expect(resultItems).toHaveCount(4);

      // Outbound link or historical badge based on operational status
      if (project.websiteUrl && project.status !== "inactive") {
        await expect(page.getByRole("link", { name: copy.portfolio.visitWebsite, exact: true })).toHaveAttribute("href", project.websiteUrl);
      } else if (project.status === "inactive") {
        await expect(page.getByText(copy.portfolio.historicalProject, { exact: true })).toBeVisible();
        await expect(page.getByRole("link", { name: copy.portfolio.visitWebsite, exact: true })).toHaveCount(0);
      }

      // Related projects
      if (project.caseStudy.relatedSlugs?.length) {
        await expect(page.getByRole("heading", { name: copy.caseStudy.relatedProjects, exact: true })).toBeVisible();
      }
    }
  }
});

test("casovi-francuskog case study strictly presents individual lessons and no group lessons", async ({ page }) => {
  for (const locale of locales) {
    await page.goto(localizedProjectPath("casovi-francuskog", locale));
    const caseStudyElements = page.locator("article > header, article dl, article section:not([aria-labelledby='related-projects-title'])");
    const caseStudyText = (await caseStudyElements.allInnerTexts()).join("\n");
    expect(caseStudyText).not.toMatch(/grupn/i);
    expect(caseStudyText).not.toMatch(/group/i);
    expect(caseStudyText).toMatch(locale === "sr" ? /individualn/i : /individual|1-on-1/i);
  }
});

test("Phase 3B.4 case study (Anabela Bebi Oprema) renders 4 highlights, 4 deliverables, 200+ catalog, and WooCommerce", async ({ page }) => {
  for (const locale of locales) {
    const copy = dictionaries[locale];
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(localizedProjectPath("anabelabebioprema", locale));
    const project = caseStudyProjects.find((p) => p.slug === "anabelabebioprema")!;
    expect(project).toBeDefined();

    // Verify H1 title and overview
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.getByText(project.caseStudy.overview[locale], { exact: true })).toBeVisible();

    // Technical highlights section has 4 cards
    await expect(page.getByRole("heading", { name: copy.caseStudy.technicalHighlights, exact: true })).toBeVisible();
    const highlightCards = page.locator('section[aria-labelledby="project-highlights"] div.rounded-card');
    await expect(highlightCards).toHaveCount(4);

    // Results section has 4 items
    await expect(page.getByRole("heading", { name: copy.caseStudy.results, exact: true })).toBeVisible();
    const resultItems = page.locator('section[aria-labelledby="project-results"] p');
    await expect(resultItems).toHaveCount(4);

    // External website link is active
    await expect(page.getByRole("link", { name: copy.portfolio.visitWebsite, exact: true })).toHaveAttribute("href", project.websiteUrl!);

    // Related projects section
    await expect(page.getByRole("heading", { name: copy.caseStudy.relatedProjects, exact: true })).toBeVisible();

    // Verify evidence content: 200+ catalog mention and WooCommerce
    const mainText = await page.locator("main").innerText();
    expect(mainText).toMatch(/200\+/);
    expect(mainText).toMatch(/WooCommerce/i);

    // Verify location accuracy: based in Ćuprija with stores in Ćuprija, Jagodina, Paraćin
    expect(mainText).toMatch(/Ćuprij|Cuprij/i);
    expect(mainText).toMatch(/Jagodin/i);
    expect(mainText).toMatch(/Paraćin|Paracin/i);
    // Strict regression guard: Anabela Bebi Oprema must NEVER be associated with Lazarevac
    expect(mainText).not.toMatch(/Lazarevac/i);

    // Meta description and OG description must contain Ćuprija and never Lazarevac
    const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(metaDesc).toMatch(/Ćuprij|Cuprij/i);
    expect(metaDesc).not.toMatch(/Lazarevac/i);
  }
});

test("Authentic Lazarevac locations are preserved for other verified projects", async ({ page }) => {
  for (const locale of locales) {
    for (const slug of ["ilic-enterijer", "os-dule-karaklajic", "ladekor"]) {
      await page.goto(localizedProjectPath(slug, locale));
      const mainText = await page.locator("main").innerText();
      expect(mainText).toMatch(/Lazarevac/i);
    }
  }
});

test("case studies reject unknown slugs and unsupported locales", async ({ request }) => {
  for (const path of ["/sr/portfolio/unknown/", "/en/portfolio/cool-fridge-guys/", "/fr/portfolio/coolfridgeguys/", "/SR/portfolio/coolfridgeguys/", "/sr/portfolio/COOLFRIDGEGUYS/", "/sr/PORTFOLIO/coolfridgeguys/", "/sr/portfolio/coolfridgeguys/extra/"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

