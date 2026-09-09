import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import sr from "@/content/i18n/sr";
import en from "@/content/i18n/en";
import { site } from "@/content/site";
import { contactFields, contactLimits } from "@/lib/contact";
import { validateContact } from "@/lib/contact-validation";
import { locales, localeSettings } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

const dictionaries = { sr, en };

for (const locale of locales) {
  const copy = dictionaries[locale];
  const path = localizedPath("contact", locale);

  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} contact at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      expect((await page.goto(path))?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.contact.intro.title);
      const form = page.getByRole("form", { name: copy.contact.form.title });
      await expect(form.getByText(copy.contact.form.unavailableNotice, { exact: true })).toBeVisible();
      for (const field of contactFields) {
        const control = form.locator(`[name="${field}"]`);
        await expect(control).toHaveAccessibleName(new RegExp(copy.contact.form.labels[field]));
        await expect(control).toHaveAttribute("maxlength", String(contactLimits[field]));
        if (field !== "phone") await expect(control).toHaveAttribute("required", "");
        else await expect(control).not.toHaveAttribute("required");
        const box = await control.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(48);
        expect(box!.width).toBeGreaterThan(200);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
        await expect(control).toHaveCSS("font-size", "16px");
      }
      await expect(form.locator('[name="email"]')).toHaveAttribute("type", "email");
      await expect(form.locator('[name="email"]')).toHaveAttribute("autocomplete", "email");
      await expect(form.locator('[name="name"]')).toHaveAttribute("autocomplete", "name");
      await expect(form.locator('[name="phone"]')).toHaveAttribute("type", "tel");
      await expect(form.locator('[name="phone"]')).toHaveAttribute("autocomplete", "tel");
      const details = page.getByRole("region", { name: copy.contact.details.title });
      await expect(details.getByRole("link")).toHaveCount(3);
      await expect(details.getByRole("link", { name: `${copy.contact.details.email} ${site.email}`, exact: true })).toHaveAttribute("href", `mailto:${site.email}`);
      await expect(details.getByRole("link", { name: `${copy.contact.details.phone} ${site.phone.label}`, exact: true })).toHaveAttribute("href", site.phone.href);
      await expect(details.getByRole("link", { name: `${copy.contact.details.whatsapp} ${site.phone.label}`, exact: true })).toHaveAttribute("href", site.whatsappUrl);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(await page.locator("main h1, main h2, main p, main label, main a, header a:visible").evaluateAll((elements) =>
        elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
      )).toEqual([]);
      await expect(page.locator(`header a[hreflang="${locale}"]`)).toHaveAttribute("aria-current", "page");
      await expect(page.locator(`header a[hreflang="${locale}"]`)).toHaveCSS("text-decoration-line", "underline");
      if (width === 375 || width === 1440) {
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      }
      await page.screenshot({ path: test.info().outputPath("full-page.png"), fullPage: true });
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} contact metadata and navigation destinations`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const origin of [localizedPath("home", locale), localizedPath("portfolio", locale), localizedPath("about", locale)]) {
      await page.goto(origin);
      await expect(page.getByRole("navigation", { name: copy.accessibility.mainNavigation, exact: true }).getByRole("link", { name: copy.navigation.contact, exact: true })).toHaveAttribute("href", path);
      await expect(page.getByRole("contentinfo").getByRole("link", { name: copy.navigation.contact, exact: true })).toHaveAttribute("href", path);
      const ctas = page.locator(`main a[href="${path}"]`);
      await expect(ctas).toHaveCount(origin === localizedPath("home", locale) ? 3 : 1);
      await expect(page.locator('a[href="https://nmarkdesigns.com/contact/"]')).toHaveCount(0);
      await ctas.first().focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
    await expect(page).toHaveTitle(`${copy.contact.metadata.title} | NMark Designs`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", copy.contact.metadata.description);
    for (const selector of ['link[rel="canonical"]', 'meta[property="og:url"]']) {
      await expect(page.locator(selector)).toHaveAttribute(selector.startsWith("link") ? "href" : "content", `https://nmarkdesigns.com${path}`);
    }
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${copy.contact.metadata.title} | NMark Designs`);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", copy.contact.metadata.description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", localeSettings[locale].openGraph);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", copy.contact.metadata.description);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    for (const target of locales) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${target}"]`)).toHaveAttribute("href", `https://nmarkdesigns.com${localizedPath("contact", target)}`);
    }
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", "https://nmarkdesigns.com/sr/kontakt/");
    await expect(page.getByRole("contentinfo").getByRole("link", { name: copy.navigation.pricing, exact: true })).toHaveAttribute("href", "https://nmarkdesigns.com/cenovnik/");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(localizedPath("home", locale));
    await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
    const mobileLink = page.getByRole("navigation", { name: copy.accessibility.mobileNavigation }).getByRole("link", { name: copy.navigation.contact, exact: true });
    await expect(mobileLink).toHaveAttribute("href", path);
    await mobileLink.click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  });

  test(`${locale} server validation pending and unavailable delivery`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);
    const form = page.getByRole("form", { name: copy.contact.form.title });
    const status = form.getByRole("status");
    await form.getByRole("button").click();
    await expect(status).toHaveText(copy.contact.form.status.invalid);
    for (const field of ["name", "email", "message"]) {
      await expect(form.locator(`#contact-${field}`)).toHaveAttribute("aria-invalid", "true");
      await expect(form.locator(`#contact-${field}`)).toHaveAttribute("aria-describedby", `contact-${field}-error`);
      await expect(form.locator(`#contact-${field}-error`)).toHaveText(copy.contact.form.validation.required);
    }
    await expect(form.locator('[name="name"]')).toBeFocused();
    await expect(form.locator('[name="name"]')).toHaveCSS("outline-style", "solid");
    await form.locator('[name="name"]').fill("Test person");
    await form.locator('[name="email"]').fill("not-an-email");
    await form.locator('[name="phone"]').fill("invalid phone");
    await form.locator('[name="message"]').fill("Test request, not a real delivery.");
    await form.getByRole("button").click();
    await expect(form.locator("#contact-email-error")).toHaveText(copy.contact.form.validation.invalidEmail);
    await expect(form.locator("#contact-phone-error")).toHaveText(copy.contact.form.validation.invalidPhone);
    await expect(form.locator('[name="email"]')).toBeFocused();
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
    await page.screenshot({ path: test.info().outputPath("validation.png"), fullPage: true });
    await form.locator('[name="email"]').fill("test@example.com");
    await form.locator('[name="phone"]').fill("");
    await page.route(`**${path}`, async (route) => {
      if (route.request().method() === "POST") await new Promise((resolve) => setTimeout(resolve, 600));
      await route.continue();
    });
    await form.getByRole("button").click();
    await expect(form.getByRole("button")).toBeDisabled();
    await expect(status).toHaveText(copy.contact.form.pending);
    await expect(status).toHaveText(copy.contact.form.status.unavailable);
    await expect(status).toBeFocused();
    await expect(form.getByRole("button")).toBeEnabled();
    await expect(form.locator('[name="name"]')).toHaveValue("Test person");
    await expect(form.locator('[name="email"]')).toHaveValue("test@example.com");
    await expect(form.locator('[name="message"]')).toHaveValue("Test request, not a real delivery.");
    await expect(form.getByText(copy.contact.form.status.success, { exact: true })).toHaveCount(0);
    await page.screenshot({ path: test.info().outputPath("unavailable.png"), fullPage: true });
  });

  test(`${locale} contact form validates without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}${path}`);
      await expect(page.getByText(copy.contact.intro.description, { exact: true })).toBeVisible();
      const form = page.getByRole("form", { name: copy.contact.form.title });
      await form.getByRole("button").click();
      await expect(form.getByRole("status")).toHaveText(copy.contact.form.status.invalid);
      await form.locator('[name="name"]').fill("No JavaScript test");
      await form.locator('[name="email"]').fill("test@example.com");
      await form.locator('[name="message"]').fill("Do not send. Foundation test.");
      await form.getByRole("button").click();
      await expect(form.getByRole("status")).toHaveText(copy.contact.form.status.unavailable);
      await expect(form.locator('[name="message"]')).toHaveValue("Do not send. Foundation test.");
      await expect(form.getByText(copy.contact.form.status.success, { exact: true })).toHaveCount(0);
      await page.getByLabel(copy.accessibility.menu, { exact: true }).click();
      await expect(page.getByRole("navigation", { name: copy.accessibility.mobileNavigation }).getByRole("link", { name: copy.navigation.contact, exact: true })).toHaveAttribute("href", path);
      const target = locale === "sr" ? "en" : "sr";
      await page.locator(`header a[hreflang="${target}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${localizedPath("contact", target)}$`));
    } finally {
      await context.close();
    }
  });
}

for (const width of [375, 1440]) {
  test(`contact keyboard and language switching at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sr/kontakt/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: sr.accessibility.skipLink, exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.locator('main a[href="mailto:info@nmarkdesigns.com"]')).toBeFocused();
    await page.locator('[name="name"]').focus();
    for (const field of ["email", "phone", "message"]) {
      await page.keyboard.press("Tab");
      await expect(page.locator(`[name="${field}"]`)).toBeFocused();
    }
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: sr.contact.form.submit })).toBeFocused();
    for (const target of ["en", "sr"] as const) {
      await page.locator(`header a[hreflang="${target}"]`).focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${localizedPath("contact", target)}$`));
      await expect(page.locator("html")).toHaveAttribute("lang", target);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(dictionaries[target].contact.intro.title);
    }
  });
}

test("contact validates strict locale routes and retains deferred routes", async ({ request }) => {
  for (const path of ["/fr/contact/", "/SR/kontakt/", "/EN/contact/", "/sr/contact/", "/en/kontakt/", "/sr/KONTAKT/", "/en/CONTACT/", "/sr/kontakt/extra/", "/contact/", "/sr/cenovnik/", "/en/pricing/", "/sr/blog/", "/en/blog/"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("contact validation rejects malformed and oversized fields", () => {
  const validData = () => {
    const data = new FormData();
    data.set("name", " Nikola ");
    data.set("email", " test@example.com ");
    data.set("phone", "+381 (64) 300-5654");
    data.set("message", "A request.\nSecond line.");
    return data;
  };
  expect(validateContact(validData())).toEqual({ valid: true, values: { name: "Nikola", email: "test@example.com", phone: "+381 (64) 300-5654", message: "A request.\nSecond line." } });
  for (const field of contactFields) {
    for (const kind of ["tooLong", "duplicate", "file"] as const) {
      const data = validData();
      if (kind === "tooLong") data.set(field, "a".repeat(contactLimits[field] + 1));
      if (kind === "duplicate") data.append(field, "duplicate");
      if (kind === "file") data.set(field, new File(["not text"], "file.txt"));
      const result = validateContact(data);
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.errors[field]).toBe(kind === "tooLong" ? "tooLong" : "invalidValue");
      expect(result.values[field].length).toBeLessThanOrEqual(contactLimits[field]);
    }
  }
  for (const value of ["", "   ", "\n\t"]) {
    const data = validData();
    data.set("message", value);
    const result = validateContact(data);
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.errors.message).toBe("required");
  }
  const data = validData();
  data.set("name", "Test\r\nInjected");
  data.set("message", "A\u0000B");
  const result = validateContact(data);
  expect(result.valid).toBe(false);
  if (!result.valid) expect(result.errors).toEqual({ name: "invalidValue", message: "invalidValue" });
});
