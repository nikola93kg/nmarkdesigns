import { expect, test } from "@playwright/test";

test("admin entry preserves the public origin behind a reverse proxy", async ({ request }) => {
  for (const path of ["/admin", "/admin/"]) {
    const response = await request.get(path, {
      maxRedirects: 0,
      headers: { host: "nmarkdesigns.com", "x-forwarded-host": "0.0.0.0:3000", "x-forwarded-proto": "https" },
    });
    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe("/admin/sr/");
    expect(new URL(response.headers().location, "https://nmarkdesigns.com").origin).toBe("https://nmarkdesigns.com");
    expect(response.headers()["cache-control"]).toContain("no-store");
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
  }
  const login = await request.get("/admin/sr/login/");
  expect(login.status()).toBe(200);
  expect(await login.text()).toContain("Admin prijava");
});
