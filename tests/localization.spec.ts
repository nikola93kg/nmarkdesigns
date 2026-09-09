import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { locales } from "@/lib/i18n";
import { equivalentPath, localizedPath, navigationItem } from "@/lib/routes";

const dictionaries = { sr, en };

for (const locale of locales) {
  const copy = dictionaries[locale];

  test(`${locale} metadata and navigation are localized`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    const canonical = `https://nmarkdesigns.com/${locale}/`;
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(`${copy.home.metadata.title} | NMark Designs`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", copy.home.metadata.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${copy.home.metadata.title} | NMark Designs`);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", copy.home.metadata.description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", locale === "sr" ? "sr_RS" : "en_US");
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", copy.home.hero.imageAlt);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    for (const language of locales) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com/${language}/`);
    }
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", "https://nmarkdesigns.com/sr/");
    const nav = page.getByRole("navigation", { name: copy.accessibility.mainNavigation, exact: true });
    await expect(nav.getByRole("link", { name: copy.navigation.home, exact: true })).toHaveAttribute("href", `/${locale}/`);
    await expect(nav.getByRole("link", { name: copy.navigation.portfolio, exact: true })).toHaveAttribute("href", `/${locale}/portfolio/`);
    await expect(nav.getByRole("link", { name: copy.navigation.services, exact: true })).toHaveAttribute("href", `/${locale}/#services`);
    await expect(nav.getByRole("link", { name: copy.navigation.about, exact: true })).toHaveAttribute("href", localizedPath("about", locale));
    await expect(nav.getByRole("link", { name: copy.navigation.contact, exact: true })).toHaveAttribute("href", "https://nmarkdesigns.com/contact/");
  });

  test(`${locale} FAQ supports keyboard toggling and reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}/`);
    const first = page.getByRole("button", { name: copy.home.faq.items[0].question });
    const second = page.getByRole("button", { name: copy.home.faq.items[1].question });
    await expect(first).toBeEnabled();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(second).toHaveAttribute("aria-expanded", "false");
    await second.focus();
    await page.keyboard.press("Enter");
    await expect(second).toBeFocused();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#faq-answer-timeline")).toBeVisible();
    await expect(page.locator("#faq-answer-services")).toBeHidden();
    await page.keyboard.press("Space");
    await expect(second).toHaveAttribute("aria-expanded", "false");
    for (const item of copy.home.faq.items) {
      const button = page.getByRole("button", { name: item.question });
      await button.click();
      await expect(button).toHaveAttribute("aria-controls", `faq-answer-${item.id}`);
      await expect(page.locator(`#faq-answer-${item.id}`)).toBeVisible();
    }
  });

  test(`${locale} homepage remains useful without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 430, height: 932 } });
    const page = await context.newPage();
    await page.goto(`${baseURL}/${locale}/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.home.hero.title);
    for (const item of copy.home.faq.items) {
      await expect(page.locator(`#faq-answer-${item.id}`)).toBeVisible();
    }
    await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
    await expect(page.getByRole("navigation", { name: copy.accessibility.mobileNavigation })).toBeVisible();
    const target = locale === "sr" ? "en" : "sr";
    await page.getByRole("navigation", { name: copy.accessibility.languageNavigation }).getByRole("link", { name: copy.accessibility.languageLabels[target], exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", target);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(dictionaries[target].home.hero.title);
    await context.close();
  });
}

for (const width of [375, 1440]) {
  test(`language switcher maps both ways at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sr/");
    for (const [source, target] of [["sr", "en"], ["en", "sr"]] as const) {
      const copy = dictionaries[source];
      const nav = page.getByRole("navigation", { name: copy.accessibility.languageNavigation });
      const active = nav.getByRole("link", { name: copy.accessibility.languageLabels[source], exact: true });
      await expect(active).toHaveAttribute("aria-current", "page");
      await expect(active).toHaveCSS("text-decoration-line", "underline");
      const other = nav.getByRole("link", { name: copy.accessibility.languageLabels[target], exact: true });
      await expect(other).toHaveAttribute("href", `/${target}/`);
      await other.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${target}/$`));
      await expect(page.locator("html")).toHaveAttribute("lang", target);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(dictionaries[target].home.hero.title);
    }
  });
}

test("shared route mapping supports future equivalent pages without creating routes", () => {
  for (const [serbian, english] of [
    ["/sr/", "/en/"],
    ["/sr/portfolio/", "/en/portfolio/"],
    ["/sr/usluge/", "/en/services/"],
    ["/sr/o-nama/", "/en/about/"],
    ["/sr/kontakt/", "/en/contact/"],
    ["/sr/cenovnik/", "/en/pricing/"],
    ["/sr/portfolio/coolfridgeguys/", "/en/portfolio/coolfridgeguys/"],
    ["/sr/?ref=work#portfolio", "/en/?ref=work#portfolio"],
  ]) {
    expect(equivalentPath(serbian, "en")).toBe(english);
    expect(equivalentPath(english, "sr")).toBe(serbian);
  }
  expect(equivalentPath("/", "en")).toBe("/en/");
  expect(equivalentPath("/fr/", "en")).toBeNull();
  expect(equivalentPath("/sr/unknown/", "en")).toBeNull();
  expect(equivalentPath("/sr/services/", "en")).toBeNull();
  expect(equivalentPath("/sr/portfolio/one/two/", "en")).toBeNull();
  expect(localizedPath("services", "sr")).toBe("/sr/usluge/");
  expect(navigationItem("services", "en", "Services").href).toBe("/en/#services");
});
