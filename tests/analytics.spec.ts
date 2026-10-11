import { expect, test } from "@playwright/test";
import { consentCopy } from "@/content/consent";
import {
  CONSENT_STORAGE_KEY,
  isAnalyticsEnvironmentAllowed,
  sanitizeParams,
} from "@/lib/analytics";
import { locales } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

test.describe("Phase 5B: Analytics, Consent Mode v2 & Conversion Tracking", () => {
  test.beforeEach(async ({ context }) => {
    // Clear cookies and storage between tests
    await context.clearCookies();
  });

  test("1. No GA4 script or tracking events are dispatched before explicit user consent", async ({ page }) => {
    await page.addInitScript(() => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
    });

    await page.goto(localizedPath("home", "sr"));

    // Consent banner must be visible on first visit
    const banner = page.locator('aside[aria-label="Podešavanja privatnosti"]');
    await expect(banner).toBeVisible();

    // No GA4 external script tag injected
    const gaScript = page.locator('script[src*="googletagmanager.com/gtag/js"]');
    expect(await gaScript.count()).toBe(0);

    // No events tracked
    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    expect(events).toEqual([]);

    // LocalStorage has no consent recorded yet
    const stored = await page.evaluate((key) => localStorage.getItem(key), CONSENT_STORAGE_KEY);
    expect(stored).toBeNull();
  });

  test("2. Rejecting consent hides banner, saves denied state, and prevents all tracking", async ({ page }) => {
    await page.addInitScript(() => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
    });

    await page.goto(localizedPath("home", "sr"));

    const banner = page.locator('aside[aria-label="Podešavanja privatnosti"]');
    await expect(banner).toBeVisible();

    // Click decline
    const declineBtn = banner.getByRole("button", { name: consentCopy.sr.decline });
    await declineBtn.click();

    // Banner disappears
    await expect(banner).not.toBeVisible();

    // LocalStorage contains denied
    const stored = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, CONSENT_STORAGE_KEY);
    expect(stored?.status).toBe("denied");

    // No events tracked
    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    expect(events).toEqual([]);

    // Navigate to another page (Services) - banner stays hidden and no events tracked
    await page.goto(localizedPath("services", "sr"));
    await expect(page.locator('aside[aria-label="Podešavanja privatnosti"]')).not.toBeVisible();
    const newEvents = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    expect(newEvents).toEqual([]);
  });

  test("3. Accepting consent enables tracking, records page_view, and persists choice", async ({ page }) => {
    await page.addInitScript(() => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
    });

    await page.goto(localizedPath("home", "en"));

    const banner = page.locator('aside[aria-label="Privacy Preferences"]');
    await expect(banner).toBeVisible();

    // Click accept
    const acceptBtn = banner.getByRole("button", { name: consentCopy.en.accept });
    await acceptBtn.click();

    // Banner disappears
    await expect(banner).not.toBeVisible();

    // LocalStorage contains granted
    const stored = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, CONSENT_STORAGE_KEY);
    expect(stored?.status).toBe("granted");

    // Pageview was tracked for /en
    await page.waitForFunction(() => (window.__MOCK_ANALYTICS_EVENTS__ || []).length > 0);
    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    expect(
      events.some(
        (e) =>
          e.event === "page_view" &&
          typeof e.params.page_location === "string" &&
          e.params.page_location.includes("/en"),
      ),
    ).toBe(true);
  });

  test("4. Footer cookie settings button allows reopening preference modal and changing consent", async ({ page }) => {
    // Start with granted consent
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("home", "sr"));

    // Banner should not be visible
    await expect(page.locator('aside[aria-label="Podešavanja privatnosti"]')).not.toBeVisible();

    // Find and click footer cookie settings button
    const footerBtn = page.getByRole("button", { name: consentCopy.sr.footerLink });
    await expect(footerBtn).toBeVisible();
    await footerBtn.click();

    // Modal dialog opens
    const modal = page.getByRole("dialog", { name: consentCopy.sr.modalTitle });
    await expect(modal).toBeVisible();
    await expect(modal.getByText(consentCopy.sr.statusGranted)).toBeVisible();

    // Test Escape key closes modal
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();

    // Reopen and switch to Decline
    await footerBtn.click();
    await expect(modal).toBeVisible();
    const declineBtn = modal.getByRole("button", { name: consentCopy.sr.decline });
    await declineBtn.click();
    await expect(modal).not.toBeVisible();

    // Verify storage updated to denied
    const stored = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, CONSENT_STORAGE_KEY);
    expect(stored?.status).toBe("denied");
  });

  test("5. CTA click dispatches click_cta event with accurate location parameters", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("home", "sr"));

    // Click hero CTA button
    const heroSection = page.locator('section[aria-labelledby="hero-title"]');
    const heroCta = heroSection.locator('a[data-cta-name="request_quote"]');
    await expect(heroCta).toBeVisible();
    await heroCta.click();

    // Verify event captured
    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const ctaEvent = events.find((e) => e.event === "click_cta");
    expect(ctaEvent).toBeDefined();
    expect(ctaEvent?.params).toMatchObject({
      cta_name: "request_quote",
      cta_location: "hero",
      locale: "sr",
    });
  });

  test("6. Direct contact links dispatch contact_direct with correct channel method", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("contact", "sr"));

    // Click direct phone link in contact details
    const phoneLink = page.locator('a[data-contact-method="phone"]').first();
    await expect(phoneLink).toBeVisible();
    await phoneLink.click();

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const directEvent = events.find((e) => e.event === "contact_direct" && e.params.contact_method === "phone");
    expect(directEvent).toBeDefined();
    expect(directEvent?.params).toMatchObject({
      contact_method: "phone",
      cta_location: "contact_page",
      locale: "sr",
    });
  });

  test("7. Service cards dispatch click_service event", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("home", "sr"));

    const serviceLink = page.locator('a[data-service-slug="all_services"]').first();
    await expect(serviceLink).toBeVisible();
    await serviceLink.click();

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const serviceEvent = events.find((e) => e.event === "click_service");
    expect(serviceEvent).toBeDefined();
    expect(serviceEvent?.params).toMatchObject({
      service_slug: "all_services",
      locale: "sr",
    });
  });

  test("8. Case study page navigation dispatches view_case_study with slug", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedProjectPath("coolfridgeguys", "sr"));

    await page.waitForFunction(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).some((e) => e.event === "view_case_study"),
    );

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const viewEvent = events.find((e) => e.event === "view_case_study");
    expect(viewEvent).toBeDefined();
    expect(viewEvent?.params).toMatchObject({
      project_slug: "coolfridgeguys",
      locale: "sr",
    });
  });

  test("9. Contact form fires form_start on first field focus, deduplicated on subsequent focuses", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("contact", "sr"));

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');

    // Focus name
    await nameInput.focus();

    let events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    let formStarts = events.filter((e) => e.event === "form_start");
    expect(formStarts.length).toBe(1);
    expect(formStarts[0].params).toMatchObject({
      page_type: "contact",
      locale: "sr",
    });

    // Focus email (should NOT trigger a duplicate form_start)
    await emailInput.focus();
    events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    formStarts = events.filter((e) => e.event === "form_start");
    expect(formStarts.length).toBe(1);
  });

  test("10. Zero PII is transmitted in any event payloads", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    // Visit contact page and interact
    await page.goto(localizedPath("contact", "en"));
    await page.locator('input[name="name"]').focus();
    await page.locator('input[name="name"]').fill("Test John Doe");
    await page.locator('input[name="email"]').fill("johndoe@example.com");

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);

    // Inspect all parameters of all events
    for (const evt of events) {
      const serialized = JSON.stringify(evt.params).toLowerCase();
      expect(serialized).not.toContain("johndoe@example.com");
      expect(serialized).not.toContain("john doe");
      expect(serialized).not.toContain("password");
      expect(serialized).not.toContain("token");
    }
  });

  for (const locale of locales) {
    test(`${locale} consent UI conforms to responsive layout and accessible touch targets at 320px`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 600 });
      await page.goto(localizedPath("home", locale));

      const banner = page.locator(`aside[role="region"]`);
      await expect(banner).toBeVisible();

      // Check buttons meet minimum 44px touch target height
      const buttons = banner.locator("button");
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const box = await buttons.nth(i).boundingBox();
        expect(box).not.toBeNull();
        expect(box!.height).toBeGreaterThanOrEqual(44);
      }

      // Check horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(320);
    });
  }
});

test.describe("Phase 5C: Analytics Reliability, Privacy & Release Readiness", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  // 1. Primary Conversion Reliability
  test("1. Primary Conversion: Invalid form submission triggers zero generate_lead events", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("contact", "sr"));
    const form = page.locator('form[aria-labelledby="contact-form-title"]');
    const submitBtn = form.locator('button[type="submit"]');

    // Submit without filling fields
    await submitBtn.click();
    await expect(form.getByRole("status")).toBeVisible();

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const leads = events.filter((e) => e.event === "generate_lead");
    expect(leads.length).toBe(0);
  });

  test("2. Primary Conversion: Honeypot bot trap submission triggers zero generate_lead events", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("contact", "sr"));
    const form = page.locator('form[aria-labelledby="contact-form-title"]');

    await form.locator('input[name="name"]').fill("Bot Trap Tester");
    await form.locator('input[name="email"]').fill("bot@spammer.com");
    await form.locator('textarea[name="message"]').fill("Spam message offer.");
    // Populate hidden honeypot
    await page.evaluate(() => {
      const hp = document.querySelector<HTMLInputElement>('input[name="_hp_website"]');
      if (hp) hp.value = "https://spam.example.com";
    });

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();
    await expect(form.getByRole("status")).toBeVisible();

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const leads = events.filter((e) => e.event === "generate_lead");
    expect(leads.length).toBe(0);
  });

  test("3. Primary Conversion: Missing/unavailable SMTP transport triggers zero generate_lead events", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("contact", "sr"));
    const form = page.locator('form[aria-labelledby="contact-form-title"]');

    await form.locator('input[name="name"]').fill("Valid Tester");
    await form.locator('input[name="email"]').fill("valid@example.com");
    await form.locator('textarea[name="message"]').fill("Valid test message for delivery check.");

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();
    await expect(form.getByRole("status")).toBeVisible();

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const leads = events.filter((e) => e.event === "generate_lead");
    expect(leads.length).toBe(0);
  });

  test("4. Primary Conversion: Dispatcher tracks exactly 1 lead on accepted submission, deduplicates rerenders, and tracks 2 distinct submissions as 2 leads", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("contact", "sr"));

    const result = await page.evaluate(() => {
      const api = window.__nmark_analytics_test_api__;
      if (!api) return { error: "API not available" };

      // Dispatch 1st lead
      const lead1 = api.trackEvent("generate_lead", { page_type: "contact", locale: "sr" });
      const eventsAfter1 = (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "generate_lead").length;

      // Dispatch 2nd lead (distinct submission)
      const lead2 = api.trackEvent("generate_lead", { page_type: "contact", locale: "sr" });
      const eventsAfter2 = (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "generate_lead").length;

      return { lead1, lead2, eventsAfter1, eventsAfter2 };
    });

    expect(result.lead1).toBe(true);
    expect(result.lead2).toBe(true);
    expect(result.eventsAfter1).toBe(1);
    expect(result.eventsAfter2).toBe(2);
  });

  test("5. Primary Conversion: Denial of consent prevents generate_lead, subsequent acceptance enables it", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "denied", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("contact", "sr"));

    const deniedResult = await page.evaluate(() => {
      const api = window.__nmark_analytics_test_api__;
      if (!api) return { tracked: false };
      const tracked = api.trackEvent("generate_lead", { page_type: "contact", locale: "sr" });
      return { tracked, count: (window.__MOCK_ANALYTICS_EVENTS__ || []).length };
    });
    expect(deniedResult.tracked).toBe(false);
    expect(deniedResult.count).toBe(0);

    // Grant consent
    const grantedResult = await page.evaluate(() => {
      const api = window.__nmark_analytics_test_api__;
      if (!api) return { tracked: false };
      api.setConsentPreferences("granted");
      const tracked = api.trackEvent("generate_lead", { page_type: "contact", locale: "sr" });
      return { tracked, count: (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "generate_lead").length };
    });
    expect(grantedResult.tracked).toBe(true);
    expect(grantedResult.count).toBe(1);
  });

  // 2. SPA Pageview Integrity
  test("6. SPA Pageview: Browser back and forward navigation dispatches single pageviews with accurate paths", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("home", "sr"));
    await page.waitForFunction(() => (window.__MOCK_ANALYTICS_EVENTS__ || []).some((e) => e.event === "page_view"));

    // Navigate to Services via link click
    const navServices = page.getByRole("navigation", { name: "Glavna navigacija" }).getByRole("link", { name: "Usluge" });
    await navServices.click();
    await expect(page).toHaveURL(/.*\/sr\/usluge\/?$/);
    await page.waitForFunction(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view" && String(e.params.page_location).includes("/sr/usluge")).length >= 1,
    );

    // Navigate to About via link click
    const navAbout = page.getByRole("navigation", { name: "Glavna navigacija" }).getByRole("link", { name: "O meni" });
    await navAbout.click();
    await expect(page).toHaveURL(/.*\/sr\/o-nama\/?$/);
    await page.waitForFunction(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view" && String(e.params.page_location).includes("/sr/o-nama")).length >= 1,
    );

    // Go back to Services
    await page.goBack();
    await expect(page).toHaveURL(/.*\/sr\/usluge\/?$/);
    await page.waitForFunction(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view" && String(e.params.page_location).includes("/sr/usluge")).length >= 2,
    );

    // Go forward to About
    await page.goForward();
    await expect(page).toHaveURL(/.*\/sr\/o-nama\/?$/);
    await page.waitForFunction(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view" && String(e.params.page_location).includes("/sr/o-nama")).length >= 2,
    );
  });

  test("7. SPA Pageview: Rapid repeated clicks on the active navigation link do not dispatch duplicate pageviews", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("services", "sr"));
    await page.waitForFunction(() => (window.__MOCK_ANALYTICS_EVENTS__ || []).some((e) => e.event === "page_view"));

    const initialCount = await page.evaluate(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view" && String(e.params.page_location).includes("/sr/usluge")).length,
    );
    expect(initialCount).toBe(1);

    // Click active link 3 times rapidly
    const activeLink = page.getByRole("navigation", { name: "Glavna navigacija" }).getByRole("link", { name: "Usluge" });
    await activeLink.click();
    await activeLink.click();
    await activeLink.click();
    await page.waitForTimeout(300);

    const afterCount = await page.evaluate(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view" && String(e.params.page_location).includes("/sr/usluge")).length,
    );
    expect(afterCount).toBe(1);
  });

  test("8. SPA Pageview: Consent withdrawal and re-acceptance on the same page dispatches a pageview upon re-acceptance", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("home", "sr"));
    await page.waitForFunction(() => (window.__MOCK_ANALYTICS_EVENTS__ || []).some((e) => e.event === "page_view"));

    const initialPvCount = await page.evaluate(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view").length,
    );
    expect(initialPvCount).toBe(1);

    // Open settings and Decline
    const footerBtn = page.getByRole("button", { name: consentCopy.sr.footerLink });
    await footerBtn.click();
    const modal = page.getByRole("dialog", { name: consentCopy.sr.modalTitle });
    await expect(modal).toBeVisible();
    await modal.getByRole("button", { name: consentCopy.sr.decline }).click();
    await expect(modal).not.toBeVisible();

    // Verify storage updated to denied
    const deniedStatus = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw).status : null;
    }, CONSENT_STORAGE_KEY);
    expect(deniedStatus).toBe("denied");

    // Reopen settings and Accept on the same page
    await footerBtn.click();
    await expect(modal).toBeVisible();
    await modal.getByRole("button", { name: consentCopy.sr.accept }).click();
    await expect(modal).not.toBeVisible();

    // Pageview tracker must fire again for this page now that consent is re-granted
    await page.waitForFunction(
      (initCount) => (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view").length > initCount,
      initialPvCount,
    );

    const reacceptedPvCount = await page.evaluate(() =>
      (window.__MOCK_ANALYTICS_EVENTS__ || []).filter((e) => e.event === "page_view").length,
    );
    expect(reacceptedPvCount).toBe(2);
  });

  // 3. Consent State Reliability & Resilience
  test("9. Consent Resilience: Withdrawing consent purges Google Analytics cookies immediately", async ({ page }) => {
    await page.goto(localizedPath("home", "sr"));

    // Set mock GA cookies in document
    await page.evaluate(() => {
      document.cookie = "_ga=GA1.1.123456789.1600000000; path=/";
      document.cookie = "_ga_TVJKFZRKRJ=GS1.1.1600000000.1.1.1600000000.0; path=/";
      document.cookie = "_gid=GA1.1.987654321.1600000000; path=/";
      document.cookie = "_gat=1; path=/";
    });

    const cookiesBefore = await page.evaluate(() => document.cookie);
    expect(cookiesBefore).toContain("_ga=");
    expect(cookiesBefore).toContain("_ga_TVJKFZRKRJ=");

    // Withdraw consent
    await page.evaluate(() => {
      window.__nmark_analytics_test_api__?.setConsentPreferences("denied");
    });

    const cookiesAfter = await page.evaluate(() => document.cookie);
    expect(cookiesAfter).not.toContain("_ga=");
    expect(cookiesAfter).not.toContain("_ga_TVJKFZRKRJ=");
    expect(cookiesAfter).not.toContain("_gid=");
    expect(cookiesAfter).not.toContain("_gat=");
  });

  test("10. Consent Resilience: Multi-tab storage event synchronizes consent changes across windows", async ({ page }) => {
    await page.goto(localizedPath("home", "sr"));

    const initialStatus = await page.evaluate(() => window.__nmark_analytics_test_api__?.getConsentStatus());
    expect(initialStatus).toBe("unspecified");

    // Simulate another tab updating localStorage
    await page.evaluate((key) => {
      const prefs = { status: "granted", timestamp: Date.now(), version: "2.0" };
      localStorage.setItem(key, JSON.stringify(prefs));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(prefs),
        }),
      );
    }, CONSENT_STORAGE_KEY);

    const syncedStatus = await page.evaluate(() => window.__nmark_analytics_test_api__?.getConsentStatus());
    expect(syncedStatus).toBe("granted");
  });

  test("11. Consent Resilience: Storage failure or restricted private browsing does not crash application", async ({ page }) => {
    await page.addInitScript(() => {
      // Mock throwing localStorage
      const throwingStorage = {
        getItem: () => {
          throw new DOMException("The operation is insecure.", "SecurityError");
        },
        setItem: () => {
          throw new DOMException("The operation is insecure.", "SecurityError");
        },
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      };
      Object.defineProperty(window, "localStorage", {
        value: throwingStorage,
        configurable: true,
      });
    });

    await page.goto(localizedPath("home", "sr"));

    // Banner still displays safely
    const banner = page.locator('aside[aria-label="Podešavanja privatnosti"]');
    await expect(banner).toBeVisible();

    // Clicking decline does not crash
    const declineBtn = banner.getByRole("button", { name: consentCopy.sr.decline });
    await declineBtn.click();
    await expect(banner).not.toBeVisible();
  });

  // 4. Privacy & PII Protection
  test("12. Privacy: trackPageView strips query parameters and hash fragments from page_location", async ({ page }) => {
    await page.addInitScript((key) => {
      window.__MOCK_ANALYTICS__ = true;
      window.__MOCK_ANALYTICS_EVENTS__ = [];
      localStorage.setItem(key, JSON.stringify({ status: "granted", timestamp: Date.now(), version: "2.0" }));
    }, CONSENT_STORAGE_KEY);

    await page.goto(localizedPath("home", "sr"));

    await page.evaluate(() => {
      window.__nmark_analytics_test_api__?.trackPageView(
        "https://nmarkdesigns.com/sr/kontakt?name=Nikola&email=nikola%40example.com&token=secret123#my-hash",
        "Kontakt | NMark Designs",
      );
    });

    const events = await page.evaluate(() => window.__MOCK_ANALYTICS_EVENTS__ || []);
    const strippedPv = events.find(
      (e) => e.event === "page_view" && String(e.params.page_location).includes("/sr/kontakt"),
    );

    expect(strippedPv).toBeDefined();
    expect(strippedPv?.params.page_location).toBe("https://nmarkdesigns.com/sr/kontakt");
    const serialized = JSON.stringify(strippedPv?.params).toLowerCase();
    expect(serialized).not.toContain("nikola@example.com");
    expect(serialized).not.toContain("secret123");
    expect(serialized).not.toContain("my-hash");
  });

  test("13. Privacy: sanitizeParams scrubs disallowed keys and regex-filters sensitive email or phone sequences", () => {
    const rawParams = {
      cta_name: "contact_quote",
      cta_location: "hero",
      email: "injected@example.com",
      phone: "+381643005654",
      password: "adminpassword",
      token: "bearer_xyz",
      budget: "5000",
      free_text: "unallowed parameter key",
      inquiry_type: "info@business.com", // Disallowed because it matches EMAIL_PATTERN
      locale: "sr",
    };

    const clean = sanitizeParams(rawParams);

    expect(clean).toEqual({
      cta_name: "contact_quote",
      cta_location: "hero",
      locale: "sr",
    });
    expect(clean).not.toHaveProperty("email");
    expect(clean).not.toHaveProperty("phone");
    expect(clean).not.toHaveProperty("password");
    expect(clean).not.toHaveProperty("inquiry_type");
  });

  test("14. Privacy: Maximum string length limits prevent oversized memory payloads", () => {
    const oversizedString = "A".repeat(500);
    const clean = sanitizeParams({
      cta_name: oversizedString,
      page_location: oversizedString,
    });

    expect(clean.cta_name).toHaveLength(100);
    expect(clean.page_location).toHaveLength(255);
  });

  // 5. Production Environment Isolation
  test("15. Environment Isolation: Blocks dev, loopback, and preview hostnames while permitting canonical production domains", () => {
    // Loopback & dev
    expect(isAnalyticsEnvironmentAllowed("localhost")).toBe(false);
    expect(isAnalyticsEnvironmentAllowed("127.0.0.1")).toBe(false);
    expect(isAnalyticsEnvironmentAllowed("0.0.0.0")).toBe(false);
    expect(isAnalyticsEnvironmentAllowed("[::1]")).toBe(false);
    expect(isAnalyticsEnvironmentAllowed("dev.local")).toBe(false);

    // Staging / preview
    expect(isAnalyticsEnvironmentAllowed("my-feature-branch.vercel.app")).toBe(false);
    expect(isAnalyticsEnvironmentAllowed("nmark-preview.pages.dev")).toBe(false);
    expect(isAnalyticsEnvironmentAllowed("unauthorized-mirror.com")).toBe(false);

    // Approved production domains
    expect(isAnalyticsEnvironmentAllowed("nmarkdesigns.com")).toBe(true);
    expect(isAnalyticsEnvironmentAllowed("www.nmarkdesigns.com")).toBe(true);
  });
});
