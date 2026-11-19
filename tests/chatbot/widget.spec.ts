import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { chatCopy } from "@/content/chatbot/copy";

async function dismissCookies(page: Page) {
  await page.locator('[data-consent-banner] button').nth(1).click();
}
async function mockSession(page: Page) {
  await page.route("**/api/chat/session/", async (route) => {
    if (route.request().method() === "GET") await route.fulfill({ status: 401, json: { code: "SESSION_EXPIRED" } });
    else await route.fulfill({ status: 201, json: { sessionId: "test-session", locale: "sr" } });
  });
}
for (const locale of ["sr", "en"] as const) {
  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`${locale} consent and keyboard at ${width}px`, async ({ page }, testInfo) => {
      const copy = chatCopy[locale];
      let aiCalls = 0;
      await mockSession(page);
      await page.route("**/api/chat/", async (route) => { aiCalls++; await route.fulfill({ status: 503, json: { code: "UNAVAILABLE" } }); });
      await page.setViewportSize({ width, height: 850 });
      await page.goto(`/${locale}/`);
      await expect(page.locator('[data-chat-panel]')).toHaveCount(0);
      await expect(page.locator('[data-chat-launcher]')).toBeHidden();
      await dismissCookies(page);
      await page.getByRole("button", { name: copy.open }).click();
      const panel = page.getByRole("dialog", { name: "NMark Assistant" });
      await expect(panel).toBeVisible();
      await expect(panel.getByText(copy.consent)).toBeVisible();
      await expect(page.locator('#chat-message')).toHaveCount(0);
      await expect(panel.getByRole("link", { name: copy.privacy })).toHaveAttribute("rel", "noopener noreferrer");
      expect(aiCalls).toBe(0);
      const box = await panel.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await panel.getByRole("button", { name: copy.accept }).click();
      await expect(panel.getByLabel(copy.input)).toBeEnabled();
      await expect(panel.getByRole("button", { name: copy.quickActions[0], exact: true })).toBeVisible();
      expect(aiCalls).toBe(0);
      if (width === 375 || width === 1440) {
        const audit = await new AxeBuilder({ page }).include('[data-chat-panel]').withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(audit.violations).toEqual([]);
        await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}.png`) });
      }
      if (width < 640) {
        for (let index = 0; index < 14; index++) {
          await page.keyboard.press("Tab");
          expect(await panel.evaluate((element) => element.contains(document.activeElement))).toBe(true);
        }
      }
      await panel.getByRole("button", { name: copy.close }).click();
      await expect(page.getByRole("button", { name: copy.open })).toBeFocused();
    });
  }
}
test("streaming renders safe text, verified cards and retries the same client message ID", async ({ page }) => {
  const copy = chatCopy.sr;
  await mockSession(page);
  const ids: string[] = [];
  await page.route("**/api/chat/", async (route) => {
    ids.push((route.request().postDataJSON() as { clientMessageId: string }).clientMessageId);
    const events = ids.length === 1
      ? [{ type: "start", requestId: "test" }, { type: "delta", text: "Delimičan odgovor" }, { type: "error", code: "STREAM_ERROR", requestId: "test" }]
      : [{ type: "delta", text: '<img src=x onerror=alert(1)> Poslovni sajt od 550 €.' }, { type: "links", links: [{ id: "pricing", title: "Početne cene", category: "pricing", description: "", url: "https://nmarkdesigns.com/sr/cenovnik/" }] }, { type: "done", messageId: "server-id", status: "completed" }];
    await route.fulfill({ contentType: "text/event-stream", body: events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("") });
  });
  await page.goto("/sr/"); await dismissCookies(page);
  await page.getByRole("button", { name: copy.open }).click();
  await page.getByRole("button", { name: copy.accept }).click();
  await page.getByLabel(copy.input).fill("Koliko košta poslovni sajt?"); await page.getByLabel(copy.input).press("Enter");
  await expect(page.locator("[data-chat-panel]").getByRole("alert")).toContainText(copy.errors.STREAM_ERROR);
  await page.getByRole("button", { name: copy.retry }).click();
  await expect(page.locator('[data-chat-panel] article')).toHaveCount(2);
  await expect(page.locator('[data-chat-panel] article').last()).toContainText("550 €");
  await expect(page.locator('[data-chat-panel] img')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Početne cene" })).toHaveAttribute("href", "/sr/cenovnik/");
  expect(ids).toHaveLength(2); expect(ids[0]).toBe(ids[1]);
});
test("unconfigured server fails closed without database or provider access", async ({ request }) => {
  expect((await request.get("/api/chat/local-notice/?locale=sr")).status()).toBe(404);
  for (const endpoint of ["/api/chat/", "/api/chat/session/"]) {
    const response = await request.post(endpoint, { headers: { Origin: "https://evil.example" }, data: { message: "hello" } });
    expect(response.status()).toBe(503);
    expect(await response.json()).toMatchObject({ code: "UNAVAILABLE", requestId: expect.any(String) });
    expect(response.headers()["cache-control"]).toContain("no-store");
  }
});
