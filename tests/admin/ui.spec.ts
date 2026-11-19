import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { database, authSession, seedConversation } from "./fixtures";
test.skip(process.env.ADMIN_TEST !== "true", "Run through playwright.admin.config.ts with the disposable local MySQL database.");
for (const locale of ["sr", "en"] as const) {
  for (const width of [375, 1440]) {
    test(`${locale} private dashboard and records at ${width}px`, async ({ page, context }, testInfo) => {
      const db = database(); const fixture = await seedConversation(db); const copy = adminCopy[locale];
      try {
        const token = await authSession(db);
        await context.addCookies([{ name: "authjs.session-token", value: token, domain: "127.0.0.1", path: "/", httpOnly: true, sameSite: "Lax", secure: false }]);
        await page.setViewportSize({ width, height: 950 }); await page.goto(`/admin/${locale}/`);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("heading", { name: copy.overview, exact: true })).toBeVisible();
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
        await expect(page.getByRole("heading", { name: copy.usageTitle })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}-dashboard.png`), fullPage: true });
        await page.goto(`/admin/${locale}/conversations/`);
        const conversationRow=page.locator("tbody tr").filter({has:page.locator(`a[href="/admin/${locale}/conversations/${fixture.id}/"]`)});
        await expect(conversationRow.getByRole("cell").nth(2)).toHaveText("4");
        await page.goto(`/admin/${locale}/leads/`); await page.getByRole("link", { name: "Test Visitor", exact: true }).click();
        await expect(page.getByRole("heading", { name: copy.details })).toBeVisible();
        await page.getByLabel(copy.note, { exact: true }).fill("Test note"); await page.getByLabel(copy.status, { exact: true }).selectOption("contacted");
        await page.getByRole("button", { name: copy.save }).click(); await expect(page.getByText(copy.saved)).toBeVisible();
        await page.reload();
        await expect(page.getByLabel(copy.note, { exact: true })).toHaveValue("Test note");
        await expect(page.getByLabel(copy.status, { exact: true })).toHaveValue("contacted");
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
        await page.getByRole("link", { name: copy.transcript, exact: true }).click();
        await expect(page.getByText("Početna cena je 550 €.")).toBeVisible();
        await expect(page.getByRole("link", { name: "Starting prices", exact: true })).toHaveAttribute("href", "https://nmarkdesigns.com/en/pricing/");
        await expect(page.getByRole("link", { name: copy.language, exact: true })).toHaveAttribute("href", `/admin/${locale === "sr" ? "en" : "sr"}/conversations/${fixture.id}/`);
        await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}-transcript.png`) });
        await page.getByRole("button", { name: copy.signOut }).click(); await expect(page).toHaveURL(`/admin/${locale}/login/`);
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
      } finally { await db.execute("DELETE FROM chat_sessions WHERE id=?", [fixture.id]); await db.end(); }
    });
  }
}
