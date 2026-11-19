import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { chatCopy } from "@/content/chatbot/copy";
import { leadCopy } from "@/content/chatbot/lead-copy";
for (const locale of ["sr", "en"] as const) {
  for (const width of [375, 1440]) {
    test(`${locale} reviewed lead, consent, retained retry and pending email at ${width}px`, async ({ page }, testInfo) => {
      const copy = chatCopy[locale]; const lead = leadCopy[locale]; const submissions: Record<string, unknown>[] = [];
      await page.route("**/api/chat/session/", (route) => route.fulfill({ status: route.request().method() === "GET" ? 401 : 201, json: route.request().method() === "GET" ? { code: "SESSION_EXPIRED" } : { sessionId: "fixture" } }));
      await page.route("**/api/chat/", (route) => route.fulfill({ contentType: "text/event-stream", body: [{ type: "delta", text: "NMark" }, { type: "lead_offer" }, { type: "done", messageId: "fixture", status: "completed" }].map((event) => `data: ${JSON.stringify(event)}\n\n`).join("") }));
      await page.route("**/api/chat/lead/", async (route) => {
        submissions.push(route.request().postDataJSON() as Record<string, unknown>);
        if (submissions.length === 1) await route.fulfill({ status: 503, json: { code: "UNAVAILABLE" } });
        else await route.fulfill({ status: 201, json: { leadId: "received-fixture", status: "received", notificationStatus: "pending" } });
      });
      await page.setViewportSize({ width, height: 900 }); await page.goto(`/${locale}/`);
      await page.locator('[data-consent-banner] button').nth(1).click();
      await page.getByRole("button", { name: copy.open }).click();
      const panel = page.getByRole("dialog", { name: "NMark Assistant" });
      await panel.getByRole("button", { name: copy.accept }).click();
      const message = locale === "sr" ? "Treba mi sajt za stolare" : "I need a website for my furniture business";
      await panel.getByLabel(copy.input).fill(message); await panel.getByRole("button", { name: copy.send, exact: true }).click();
      await expect(panel.getByRole("complementary", { name: lead.open })).toBeVisible();
      await panel.getByRole("complementary").getByRole("button", { name: lead.open }).click();
      await expect(panel.locator("#lead-projectDescription")).toHaveValue(message);
      await expect(panel.locator("#lead-service")).toHaveValue("new_website");
      await panel.getByRole("button", { name: lead.next }).click();
      await panel.getByRole("button", { name: lead.submit, exact: true }).click();
      expect(submissions).toHaveLength(0);
      await expect(panel.getByText(lead.errors.privacyConsent)).toBeVisible();
      await panel.locator("#lead-name").fill("Demo Visitor");
      await panel.locator("#lead-email").fill("invalid");
      await panel.getByRole("checkbox").check();
      await panel.getByRole("button", { name: lead.submit, exact: true }).click();
      expect(submissions).toHaveLength(0);
      await expect(panel.getByText(lead.errors.email)).toBeVisible();
      await panel.locator("#lead-email").fill("visitor@example.test");
      expect((await new AxeBuilder({ page }).include('[data-chat-panel]').withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}-lead-review.png`) });
      await panel.getByRole("button", { name: lead.submit, exact: true }).click();
      await expect(panel.getByRole("alert")).toContainText(lead.errors.UNAVAILABLE);
      await expect(panel.locator("#lead-name")).toHaveValue("Demo Visitor");
      await expect(panel.locator("#lead-email")).toHaveValue("visitor@example.test");
      await expect(panel.getByRole("checkbox")).toBeChecked();
      await panel.getByRole("button", { name: lead.submit, exact: true }).click();
      await expect(panel.getByText(lead.success, { exact: true })).toBeVisible();
      expect(submissions).toHaveLength(2);
      expect(submissions[0].clientSubmissionId).toBe(submissions[1].clientSubmissionId);
      expect(submissions[1]).toMatchObject({ privacyConsent: true, budgetRange: "", timeframe: "", projectDescription: message });
      await panel.getByRole("button", { name: lead.returnToChat }).click();
      await expect(panel.getByLabel(copy.input)).toBeEnabled();
      await expect(panel.getByText(lead.received)).toBeVisible();
    });
  }
}
