import { expect, test } from "@playwright/test";
import { consentCopy } from "@/content/consent";

test("production robots declares Content Signals and previews block crawling", async ({ request }) => {
  const production = await request.get("/robots.txt", { headers: { Host: "nmarkdesigns.com" } });
  expect(production.ok()).toBeTruthy();
  expect(await production.text()).toContain("Content-Signal: search=yes, ai-train=no");
  expect(await production.text()).toContain("Sitemap: https://nmarkdesigns.com/sitemap.xml");
  const preview = await request.get("/robots.txt");
  expect(await preview.text()).toBe("User-agent: *\nDisallow: /\n");
});

test("homepages negotiate Markdown without affecting ordinary HTML requests", async ({ request }) => {
  for (const [path, locale] of [["/", "sr"], ["/sr/", "sr"], ["/en/", "en"]]) {
    const markdown = await request.get(path, { headers: { Accept: "text/markdown" }, maxRedirects: 0 });
    expect(markdown.status()).toBe(200);
    expect(markdown.headers()["content-type"]).toMatch(/^text\/markdown\b/);
    expect(markdown.headers()["content-language"]).toBe(locale);
    expect(markdown.headers().vary).toMatch(/\bAccept\b/i);
    expect(markdown.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    const body = await markdown.text();
    expect(body).toMatch(/^# .*NMark Designs/);
    expect(body).toContain(locale === "sr" ? "300 €" : "$750");
    expect(await (await request.get(`/${locale}/index.md`)).text()).toBe(body);

    for (const accept of ["*/*", "text/html,text/markdown;q=0.5", "text/markdown;q=0,*/*"]) {
      const html = await request.get(path, { headers: { Accept: accept }, maxRedirects: 0 });
      expect(html.status()).toBe(path === "/" ? 308 : 200);
      expect(html.headers().vary).toMatch(/\bAccept\b/i);
      if (path !== "/") expect(html.headers()["content-type"]).toContain("text/html");
    }
  }
});

test("llms.txt links to real public documents in both languages", async ({ request }) => {
  const index = await request.get("/llms.txt");
  expect(index.ok()).toBeTruthy();
  const body = await index.text();
  expect(body).toMatch(/^# NMark Designs\n\n> /);
  const links = [...body.matchAll(/^- \[[^\]]+\]\((https:\/\/nmarkdesigns\.com[^)]+)\)/gm)]
    .map(([, href]) => new URL(href).pathname);
  expect(links).toEqual(expect.arrayContaining([
    "/sr/index.md", "/en/index.md", "/sr/kontakt/", "/en/contact/", "/sr/o-nama/", "/en/about/",
    "/sr/uslovi-koriscenja/", "/en/terms-of-use/", "/llms-full.txt",
  ]));
  for (const path of links) expect((await request.get(path, { maxRedirects: 0 })).status(), path).toBe(200);
});

test("server card advertises a working read-only HTTP MCP tool", async ({ request }) => {
  const response = await request.get("/.well-known/mcp/server-card.json", { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  const card = await response.json();
  const endpoint = new URL(card.transport.endpoint);
  expect(endpoint.origin).toBe("https://nmarkdesigns.com");

  const message = (method: string, params?: object) => ({ jsonrpc: "2.0", method, params, id: 1 });
  const post = (data: object, headers?: Record<string, string>) => request.post(endpoint.pathname, {
    headers: { Accept: "application/json, text/event-stream", ...headers }, data,
  });

  const initialize = await post(message("initialize", { protocolVersion: card.protocolVersion }));
  expect(await initialize.json()).toMatchObject({
    jsonrpc: "2.0", id: 1, result: { protocolVersion: card.protocolVersion, serverInfo: card.serverInfo, capabilities: card.capabilities },
  });
  expect((await post({ jsonrpc: "2.0", method: "notifications/initialized" })).status()).toBe(202);
  const list = await post(message("tools/list"));
  expect((await list.json()).result.tools).toEqual(card.tools);
  const call = await post(message("tools/call", { name: "get_site_pages", arguments: { locale: "en" } }));
  expect(JSON.parse((await call.json()).result.content[0].text)).toMatchObject({
    locale: "en", pages: expect.arrayContaining([{ label: "Contact", url: "https://nmarkdesigns.com/en/contact/" }]),
  });
  expect((await post(message("tools/list"), { Origin: "https://other.example" })).status()).toBe(403);
  expect((await request.get(endpoint.pathname)).status()).toBe(405);
});

for (const [locale, width, about, contact, terms] of [
  ["sr", 375, "/sr/o-nama/", "/sr/kontakt/", "/sr/uslovi-koriscenja/"],
  ["en", 1440, "/en/about/", "/en/contact/", "/en/terms-of-use/"],
] as const) {
  test(`localized homepage discovery and WebMCP registration at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      Object.defineProperty(document, "modelContext", {
        value: { registerTool: (tool: unknown) => { Reflect.set(window, "__siteTool", tool); } },
      });
    });
    await page.goto(`/${locale}/`);

    const footer = page.getByRole("contentinfo");
    for (const href of [about, contact, terms]) await expect(footer.locator(`a[href="${href}"]`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(await page.locator('script[type="application/ld+json"]').allTextContents()).toEqual(
      expect.arrayContaining([expect.stringContaining('"@type":"FAQPage"')]),
    );
    await expect.poll(() => page.evaluate(async () => {
      const tool = Reflect.get(window, "__siteTool");
      if (!tool) return null;
      return { name: tool.name, ...JSON.parse((await tool.execute({})).content[0].text) };
    })).toMatchObject({ name: "get_site_pages", locale, pages: expect.arrayContaining([
      expect.objectContaining({ url: `https://nmarkdesigns.com${contact}` }),
    ]) });

    await page.locator("[data-consent-banner]").getByRole("button", { name: consentCopy[locale].decline, exact: true }).click();
    await footer.locator(`a[href="${terms}"]`).click();
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
