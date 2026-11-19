import { expect, test } from "@playwright/test";
import { database } from "../admin/fixtures";
import type mysql from "mysql2/promise";
import { createHash, randomUUID } from "node:crypto";
import { CHAT_CONSENT_VERSION } from "@/lib/chatbot/contracts";
import { CONTACT_CONSENT_VERSION } from "@/lib/chatbot/lead-contracts";

test("real HTTP cookie ownership, explicit consent, durable receipt, replay and cron denial", async ({ playwright }) => {
  test.skip(process.env.CHAT_HTTP_TEST !== "true", "Requires isolated HTTP server and disposable MySQL.");
  expect(process.env.DB_NAME).toMatch(/(?:^|_)nmark_chatbot_test$/);
  const db = database();
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
    const interaction = { event: "quick_action_click", eventId: randomUUID(), locale: "sr", analyticsConsent: true };
    expect((await stranger.post("/api/chat/events/",{data:interaction})).status()).toBe(401);
    expect((await owner.post("/api/chat/events/",{data:interaction,headers:{Origin:"https://evil.example"}})).status()).toBe(403);
    for (const invalid of [{...interaction,analyticsConsent:false},{...interaction,event:"lead_submit_success"},{...interaction,message:"PII must not be accepted"},{...interaction,sessionId:randomUUID()}])
      expect((await owner.post("/api/chat/events/",{data:invalid})).status()).toBe(400);
    expect((await owner.post("/api/chat/events/",{data:interaction})).status()).toBe(200);
    expect((await owner.post("/api/chat/events/",{data:interaction})).status()).toBe(200);
    const [sessionRows] = await db.execute<mysql.RowDataPacket[]>("SELECT id FROM chat_sessions WHERE token_hash=?",[createHash("sha256").update(cookie.slice(cookie.indexOf("=")+1)).digest("hex")]);
    const eventKey = createHash("sha256").update(`${sessionRows[0].id}:quick_action_click:${interaction.eventId}`).digest("hex");
    const [receipts] = await db.execute<mysql.RowDataPacket[]>("SELECT key_hash FROM chat_metric_receipts WHERE key_hash=?",[eventKey]);expect(receipts).toHaveLength(1);
    expect((await owner.post("/api/chat/cleanup/")).status()).toBe(403);
    expect((await owner.post("/api/chat/cleanup/",{headers:{Authorization:"Bearer local-http-cron-secret-at-least-32-characters"}})).status()).toBe(200);
    expect((await owner.post("/api/chat/maintenance/")).status()).toBe(403);
    expect((await owner.post("/api/chat/maintenance/", { headers: { Authorization: "Bearer local-http-cron-secret-at-least-32-characters" } })).status()).toBe(503);
  } finally { await owner.dispose(); await stranger.dispose(); await db.end(); }
});
