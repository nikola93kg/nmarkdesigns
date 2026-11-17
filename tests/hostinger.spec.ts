import { expect, test, type Locator, type Page } from "@playwright/test";
import { getHostingerCopy, hostingerPartner } from "@/content/partners";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics";
import { locales, type Locale } from "@/lib/i18n";
import { localizedBlogPostPath, localizedPath } from "@/lib/routes";

const offerSelector = `#${hostingerPartner.detailsAnchor}`;
const copySelector = '[data-copy-partner-code="hostinger"]';
const copiedValueKey = "hostinger-test-copied-value";
const maintenancePaths = {
  sr: "/sr/usluge/odrzavanje-i-hosting/",
  en: "/en/services/website-maintenance/",
} as const;
const referralSelector = 'a[href*="hostinger.com"][href*="REFERRALCODE="]';

async function prepareBrowser(
  page: Page,
  consent: "granted" | "denied" = "denied",
  clipboardFails = false,
) {
  await page.addInitScript(({ key, consent, clipboardFails, copiedValueKey }) => {
    window.__MOCK_ANALYTICS__ = true;
    window.__MOCK_ANALYTICS_EVENTS__ = [];
    localStorage.setItem(key, JSON.stringify({ status: consent, timestamp: Date.now(), version: "2.0" }));
    sessionStorage.removeItem(copiedValueKey);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          if (clipboardFails) throw new Error("Clipboard unavailable in this test");
          sessionStorage.setItem(copiedValueKey, value);
        },
      },
    });
  }, { key: CONSENT_STORAGE_KEY, consent, clipboardFails, copiedValueKey });
}

async function expectOfferTerms(offer: Locator, locale: Locale) {
  const copy = getHostingerCopy(locale);
  await expect(offer).toBeVisible();
  await expect(offer.getByRole("heading", { name: copy.title, exact: true })).toBeVisible();
  for (const text of [copy.eligibility, copy.exclusions, copy.renewal, copy.disclosure]) {
    await expect(offer.getByText(text, { exact: true })).toBeVisible();
  }
  await expect(offer.locator("code")).toHaveText(hostingerPartner.couponCode);
  await expect(offer.getByRole("link", { name: copy.termsAction })).toHaveAttribute("href", hostingerPartner.termsUrl);
}

function partnerOffer(page: Page, locale: Locale) {
  return page.getByRole("complementary", { name: getHostingerCopy(locale).title, exact: true });
}

async function expectReferralAttributes(page: Page, placement: string) {
  const referrals = page.locator(referralSelector);
  expect(await referrals.count()).toBeGreaterThan(0);
  for (const link of await referrals.all()) {
    await expect(link).toHaveAttribute("href", hostingerPartner.url);
    await expect(link).toHaveAttribute("data-partner", "hostinger");
    await expect(link).toHaveAttribute("data-partner-placement", placement);
    await expect(link).toHaveAttribute("target", "_blank");
    const rel = (await link.getAttribute("rel"))?.split(/\s+/) ?? [];
    expect(rel).toEqual(expect.arrayContaining(["sponsored", "noopener", "noreferrer"]));
  }
}

test.beforeEach(async ({ context }) => {
  // Intercept every Hostinger request, including a new tab's first navigation.
  // These tests never contact the provider or enter its checkout.
  await context.route(/^https:\/\/(?:www\.)?hostinger\.com(?:\/|$)/, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Partner navigation stub</title>" }),
  );
});

for (const locale of locales) {
  const copy = getHostingerCopy(locale);
  const pricingPath = localizedPath("pricing", locale);
  const detailsPath = `${pricingPath}#${hostingerPartner.detailsAnchor}`;

  test(`${locale} hero and footer lead to local offer details before the provider`, async ({ page }) => {
    await prepareBrowser(page);
    await page.goto(localizedPath("home", locale));

    const summary = page.locator("[data-hostinger-summary]");
    await expect(summary.getByText(copy.heroBenefit, { exact: true })).toBeVisible();
    const details = summary.getByRole("link", { name: copy.detailsAction });
    await expect(details).toHaveAttribute("href", detailsPath);
    await expect(summary.locator(referralSelector)).toHaveCount(0);
    const footerBadge = page.locator(`footer a[href="${detailsPath}"]`).filter({ has: page.locator("img") });
    await expect(footerBadge).toHaveCount(1);

    await details.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL((url) => url.pathname === pricingPath && url.hash === `#${hostingerPartner.detailsAnchor}`);
    await expectOfferTerms(page.locator(offerSelector), locale);

    await page.goto(localizedPath("home", locale));
    await footerBadge.click();
    await expect(page).toHaveURL((url) => url.pathname === pricingPath && url.hash === `#${hostingerPartner.detailsAnchor}`);
    await expect(page.locator(offerSelector)).toBeInViewport();
  });

  test(`${locale} pricing and maintenance show the same eligibility and separate maintenance from hosting`, async ({ page }) => {
    await prepareBrowser(page);
    for (const [path, placement] of [[pricingPath, "pricing"], [maintenancePaths[locale], "maintenance"]] as const) {
      await page.goto(path);
      const offer = partnerOffer(page, locale);
      await expectOfferTerms(offer, locale);
      await expect(offer.getByText(copy.description, { exact: true })).toBeVisible();
      await expect(offer.getByText(copy.linkExplanation, { exact: true })).toBeVisible();
      await expectReferralAttributes(page, placement);
    }
  });

  test(`${locale} blog referrals carry offer terms, disclosure and sponsored link attributes`, async ({ page }) => {
    await prepareBrowser(page);
    for (const slug of ["10-znakova-da-je-vreme-za-redizajn-sajta-2026", "wordpress-vs-nextjs-poslovni-sajt"]) {
      await page.goto(localizedBlogPostPath(slug, locale));
      await expectOfferTerms(partnerOffer(page, locale), locale);
      await expectReferralAttributes(page, "blog");
    }
  });

  test(`${locale} maintenance pricing agrees with Basic Care and uses EUR in structured data`, async ({ page }) => {
    await prepareBrowser(page);
    await page.goto(maintenancePaths[locale]);
    const expectedPrice = locale === "sr" ? "Od 25 € / mes." : "From €25 / mo.";
    await expect(page.getByText(expectedPrice, { exact: true })).toBeVisible();
    const offers = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.flatMap((script) => {
        const data = JSON.parse(script.textContent ?? "{}") as {
          "@graph"?: Array<{ "@type"?: string; offers?: { priceCurrency?: string; description?: string } }>;
        };
        return (data["@graph"] ?? []).filter((node) => node["@type"] === "Service").map((node) => node.offers);
      }),
    );
    expect(offers).toContainEqual({ "@type": "Offer", priceCurrency: "EUR", description: expectedPrice });
    await page.goto(pricingPath);
    await expect(page.locator('#maintenance article[aria-labelledby="plan-basic-care"]')).toContainText(locale === "sr" ? "Od 25 € / mes." : "From €25/month");
  });

  for (const consent of ["denied", "granted"] as const) {
    test(`${locale} copying and opening the offer respect ${consent} analytics consent`, async ({ page }) => {
      await prepareBrowser(page, consent);
      await page.goto(detailsPath);
      const offer = partnerOffer(page, locale);
      const copyButton = offer.locator(copySelector);
      await expect(copyButton).toBeEnabled();
      await expect(copyButton).toHaveAccessibleName(copy.copyCoupon);
      await copyButton.focus();
      await page.keyboard.press("Enter");
      await expect(offer.locator("[aria-live]")).toContainText(copy.copiedCoupon);
      expect(await page.evaluate((key) => sessionStorage.getItem(key), copiedValueKey)).toBe(hostingerPartner.couponCode);

      const originalUrl = page.url();
      const popupPromise = page.waitForEvent("popup");
      await offer.locator('a[data-partner="hostinger"]').click();
      const popup = await popupPromise;
      await expect(popup).toHaveURL(new URL(hostingerPartner.url).href);
      await expect(popup).toHaveTitle("Partner navigation stub");
      expect(page.url()).toBe(originalUrl);
      await popup.close();

      const events = await page.evaluate(() => (window.__MOCK_ANALYTICS_EVENTS__ ?? []).filter((event) =>
        event.event === "click_partner" || event.event === "copy_partner_code",
      ));
      expect(events).toEqual(consent === "granted" ? [
        {
          event: "copy_partner_code",
          params: { partner_name: "hostinger", partner_placement: "pricing", locale },
        },
        {
          event: "click_partner",
          params: { partner_name: "hostinger", partner_placement: "pricing", locale, destination_domain: "www.hostinger.com" },
        },
      ] : []);
    });
  }

  test(`${locale} failed clipboard access keeps a selectable manual coupon without a success event`, async ({ page }) => {
    await prepareBrowser(page, "granted", true);
    await page.goto(detailsPath);
    const offer = partnerOffer(page, locale);
    const copyButton = offer.locator(copySelector);
    await expect(copyButton).toBeEnabled();
    await copyButton.click();
    await expect(offer.locator("[aria-live]")).toContainText(copy.copyFailed);
    await expect(copyButton).toBeEnabled();
    const code = offer.locator("code");
    await expect(code).toHaveText(hostingerPartner.couponCode);
    await code.selectText();
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(hostingerPartner.couponCode);
    expect(await page.evaluate(() => (window.__MOCK_ANALYTICS_EVENTS__ ?? []).filter((event) => event.event === "copy_partner_code"))).toEqual([]);
    await expect(offer.locator('a[data-partner="hostinger"]')).toHaveAttribute("href", hostingerPartner.url);
  });

  test(`${locale} offer details and manual coupon work without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}${localizedPath("home", locale)}`);
      await page.locator("[data-hostinger-summary]").getByRole("link", { name: copy.detailsAction }).click();
      await expect(page).toHaveURL((url) => url.pathname === pricingPath && url.hash === `#${hostingerPartner.detailsAnchor}`);
      const offer = partnerOffer(page, locale);
      await expectOfferTerms(offer, locale);
      await expect(offer.locator(copySelector)).toBeDisabled();
      await offer.locator("code").selectText();
      expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(hostingerPartner.couponCode);
      await expectReferralAttributes(page, "pricing");
    } finally {
      await context.close();
    }
  });

  for (const width of [375, 1440]) {
    test(`${locale} partner content stays within ${width}px without clipped text or controls`, async ({ page }, testInfo) => {
      await prepareBrowser(page);
      await page.setViewportSize({ width, height: 900 });
      for (const path of [localizedPath("home", locale), pricingPath, maintenancePaths[locale]]) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        const content = path === localizedPath("home", locale)
          ? page.locator("[data-hostinger-summary]")
          : partnerOffer(page, locale);
        await expect(content).toBeVisible();
        const clipped = await content.locator("p, code, a, button").evaluateAll((elements) => elements
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .map((element) => element.textContent));
        expect(clipped).toEqual([]);
        for (const control of await content.locator("a, button").all()) {
          const bounds = await control.boundingBox();
          expect(bounds).not.toBeNull();
          expect(bounds!.x).toBeGreaterThanOrEqual(0);
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
        }
        await content.screenshot({ path: testInfo.outputPath(`${path.split("/").filter(Boolean).join("-")}-partner.png`) });
      }
    });
  }
}
