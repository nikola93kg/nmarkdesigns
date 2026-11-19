import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { CHAT_CONSENT_VERSION } from "@/lib/chatbot/contracts";
import { CONTACT_CONSENT_VERSION } from "@/lib/chatbot/lead-contracts";

test("real HTTP cookie ownership, explicit consent, durable receipt, replay and cron denial", async ({ playwright }) => {
  test.skip(process.env.CHAT_HTTP_TEST !== "true", "Requires isolated HTTP server and disposable MySQL.");
  expect(process.env.DB_NAME).toMatch(/(?:^|_)nmark_chatbot_test$/);
  const origin = "http://127.0.0.1:3110";
  let owner = await playwright.request.newContext({ baseURL: origin, extraHTTPHeaders: { Origin: origin } });
  const stranger = await playwright.request.newContext({ baseURL: origin, extraHTTPHeaders: { Origin: origin } });
  const lead = { clientSubmissionId: randomUUID(), locale: "sr", name: "HTTP Test Visitor", email: "http@example.test", privacyConsent: true, consentVersion: CONTACT_CONSENT_VERSION };
  try {
    expect((await owner.post("/api/chat/lead/", { data: lead })).status()).toBe(401);
    expect((await owner.post("/api/chat/session/", { data: { locale: "sr", consent: false, consentVersion: CHAT_CONSENT_VERSION } })).status()).toBe(400);
    const session = await owner.post("/api/chat/session/", { data: { locale: "sr", consent: true, consentVersion: CHAT_CONSENT_VERSION } });
    expect(session.status()).toBe(201);
    expect(session.headers()["set-cookie"]).toMatch(/HttpOnly/i); expect(session.headers()["set-cookie"]).toMatch(/SameSite=strict/i);
    expect(session.headers()["set-cookie"]).toMatch(/Secure/i);
    // Production cookie is secure; transfer it explicitly over loopback HTTP for this API-only test.
    const cookie = session.headers()["set-cookie"].split(";")[0];
    await owner.dispose();
    owner = await playwright.request.newContext({ baseURL: origin, extraHTTPHeaders: { Origin: origin, Cookie: cookie } });
    expect((await owner.post("/api/chat/lead/", { data: { ...lead, privacyConsent: false } })).status()).toBe(400);
    expect((await owner.post("/api/chat/lead/", { data: lead, headers: { Origin: "https://evil.example" } })).status()).toBe(403);
    expect((await owner.post("/api/chat/lead/", { data: { ...lead, sessionId: randomUUID() } })).status()).toBe(400);
    const receipt = await owner.post("/api/chat/lead/", { data: lead });
    expect(receipt.status()).toBe(201);
    const saved = await receipt.json();
    expect(saved).toMatchObject({ status: "received", notificationStatus: "pending", leadId: expect.any(String), requestId: expect.any(String) });
    expect(receipt.headers()["cache-control"]).toContain("no-store");
    expect(await (await owner.post("/api/chat/lead/", { data: lead })).json()).toMatchObject({ leadId: saved.leadId });
    expect((await owner.post("/api/chat/lead/", { data: { ...lead, email: "changed@example.test" } })).status()).toBe(409);
    expect((await stranger.get("/api/chat/session/")).status()).toBe(401);
    expect((await stranger.post("/api/chat/lead/", { data: lead })).status()).toBe(401);
    expect((await owner.post("/api/chat/lead/preference/", { data: { declined: true } })).status()).toBe(200);
    const restored = await (await owner.get("/api/chat/session/")).json();
    expect(restored).toMatchObject({ leadReceived: true, leadDeclined: true });
    expect(JSON.stringify(restored)).not.toContain("http@example.test");
    expect((await owner.post("/api/chat/maintenance/")).status()).toBe(403);
    expect((await owner.post("/api/chat/maintenance/", { headers: { Authorization: "Bearer local-http-cron-secret-at-least-32-characters" } })).status()).toBe(503);
  } finally { await owner.dispose(); await stranger.dispose(); }
});
