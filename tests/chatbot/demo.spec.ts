import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { leadCopy } from "@/content/chatbot/lead-copy";
import { chatCopy } from "@/content/chatbot/copy";

for (const locale of ["sr", "en"] as const) {
  for (const width of [375, 1440]) {
    test(`${locale} default local demo works without backend at ${width}px`, async ({ page }, testInfo) => {
      test.slow();
      test.skip(process.env.CHAT_DEMO_TEST !== "true", "Runs against the default development demo server.");
      const copy = chatCopy[locale];
      const requests: string[] = [];
      page.on("request", (request) => { if (request.url().includes("/api/chat")) requests.push(request.url()); });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      await page.locator('[data-consent-banner] button').nth(1).click();
      await page.getByRole("button", { name: copy.open }).click();
      const panel = page.getByRole("dialog", { name: "NMark Assistant" });
      await expect(panel).toHaveAttribute("data-chat-preview", "true");
      await expect(panel.getByText(copy.preview.notice)).toBeVisible();
      await panel.getByLabel(copy.input).fill("Hello / Zdravo");
      await panel.getByRole("button", { name: copy.send, exact: true }).click();
      await expect(panel.getByRole("button", { name: copy.stop })).toBeVisible();
      await panel.getByRole("button", { name: copy.stop }).click();
      await panel.getByRole("button", { name: copy.retry }).click();
      await expect(panel.locator("article").last()).toContainText(copy.preview.response, {timeout:30_000});
      await expect(panel.locator('a[href*="/portfolio/"]').first()).toBeVisible();
      expect(await panel.locator('a[href*="/portfolio/"]').count()).toBeLessThanOrEqual(3);
      await expect(panel.locator("article")).toHaveCount(2);
      expect(requests).toEqual([]);
      expect((await new AxeBuilder({ page }).include('[data-chat-panel]').withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}-demo.png`) });
      const lead = leadCopy[locale];
      await panel.getByRole("button", { name: lead.open, exact: true }).click();
      await panel.getByRole("button", { name: lead.next }).click();
      await panel.locator("#lead-name").fill("Demo Visitor");
      await panel.locator("#lead-email").fill("visitor@example.test");
      await panel.getByRole("checkbox").check();
      await panel.getByRole("button", { name: lead.submit, exact: true }).click();
      await expect(panel.getByText(lead.previewSuccess, { exact: true })).toBeVisible();
      expect(requests).toEqual([]);
      await panel.getByRole("button", { name: lead.returnToChat }).click();
      await panel.getByRole("button", { name: copy.restart }).click();
      await expect(panel.getByLabel(copy.input)).toBeEnabled();
      await expect(panel.locator("article")).toHaveCount(0);
      expect(requests).toEqual([]);
    });
  }
}
