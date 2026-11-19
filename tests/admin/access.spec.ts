import { expect, test, type PlaywrightWorkerArgs } from "@playwright/test";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import type mysql from "mysql2/promise";
import { authSecret, authSession, database, ownerEmail, seedConversation } from "./fixtures";
test.skip(process.env.ADMIN_TEST !== "true", "Run through playwright.admin.config.ts with the disposable local MySQL database.");
const baseURL = "http://127.0.0.1:3115";
let db: mysql.Pool;
test.beforeAll(() => { db = database(); });
test.afterAll(async () => { await db.end(); });
async function api(playwright: PlaywrightWorkerArgs["playwright"], email = ownerEmail, expired = false) {
  const token = await authSession(db, email, expired);
  return playwright.request.newContext({ baseURL, extraHTTPHeaders: { Origin: baseURL, Cookie: `authjs.session-token=${token}` } });
}
async function cleanup(id: string) { await db.execute("DELETE FROM chat_sessions WHERE id=?", [id]); }

test("anonymous, expired, forged and other-email sessions cannot access any admin data", async ({ request, playwright }) => {
  const id = randomUUID();
  for (const path of ["/api/admin/metrics/", "/api/admin/conversations/", `/api/admin/conversations/${id}/`, "/api/admin/leads/", `/api/admin/leads/${id}/`]) {
    const response = await request.get(path); expect(response.status()).toBe(401); expect(response.headers()["cache-control"]).toContain("no-store"); expect(response.headers()["x-robots-tag"]).toContain("noindex");
  }
  const privatePage = await request.get("/admin/sr/", { maxRedirects: 0 }); expect(privatePage.status()).toBe(307); expect(privatePage.headers().location).toContain("/admin/sr/login/");
  for (const [email, expired] of [["other@example.test", false], [ownerEmail, true]] as const) {
    const client = await api(playwright, email, expired); expect((await client.get("/api/admin/metrics/")).status()).toBe(401); await client.dispose();
  }
  expect((await request.get("/api/admin/leads/", { headers: { Cookie: "authjs.session-token=forged" } })).status()).toBe(401);
});

test("Auth.js consumes email links once, rejects expired/non-owner tokens and pins redirect origin", async ({ playwright }) => {
  await db.execute("DELETE FROM chat_admin_users WHERE email=?", [ownerEmail]);
  async function link(email: string, expired = false) {
    const token = randomBytes(32).toString("hex");
    await db.execute("INSERT INTO chat_admin_verification_tokens (identifier,token,expires) VALUES (?,?,?)", [email, createHash("sha256").update(token + authSecret).digest("hex"), new Date(Date.now() + (expired ? -60000 : 600000))]);
    return `/api/auth/callback/nodemailer/?${new URLSearchParams({ token, email, callbackUrl: "https://evil.example/" })}`;
  }
  const owner = await playwright.request.newContext({ baseURL }); const intruder = await playwright.request.newContext({ baseURL });
  try {
    const target = await link(ownerEmail);
    const [first, second] = await Promise.all([owner.get(target, { maxRedirects: 0, headers: { "x-forwarded-host": "evil.example" } }), intruder.get(target, { maxRedirects: 0 })]);
    const locations = [first.headers().location, second.headers().location];
    expect(locations.filter((value) => value === `${baseURL}/admin/sr/`)).toHaveLength(1);
    expect(locations.join(" ")).not.toContain("evil.example");
    const winner = first.headers().location === `${baseURL}/admin/sr/` ? owner : intruder;
    expect((await winner.get("/api/admin/metrics/")).status()).toBe(200);
    const [createdOwner] = await db.execute<mysql.RowDataPacket[]>("SELECT email_verified FROM chat_admin_users WHERE email=?", [ownerEmail]);
    expect(createdOwner).toHaveLength(1); expect(createdOwner[0].email_verified).toBeTruthy();
    const loser = winner === owner ? intruder : owner;
    expect((await loser.get("/api/admin/metrics/")).status()).toBe(401);
    for (const target of [await link(ownerEmail, true), await link("unapproved@example.test")]) {
      const other = await playwright.request.newContext({ baseURL }); await other.get(target, { maxRedirects: 0 }); expect((await other.get("/api/admin/metrics/")).status()).toBe(401); await other.dispose();
    }
    const csrfResponse = await winner.get("/api/auth/csrf/"); const csrf = await csrfResponse.json();
    const signedOut = await winner.post("/api/auth/signout/", { headers: { Origin: baseURL, "X-Auth-Return-Redirect": "1" }, form: { csrfToken: csrf.csrfToken, callbackUrl: `${baseURL}/admin/sr/login/` } });
    expect(signedOut.ok()).toBe(true); expect((await winner.get("/api/admin/metrics/")).status()).toBe(401);
  } finally { await owner.dispose(); await intruder.dispose(); }
});

test("owner metrics, private lists, audited edits, notification reconciliation and cascade deletion", async ({ playwright }) => {
  const client = await api(playwright); const fixture = await seedConversation(db);
  try {
    const metricResponse = await client.get("/api/admin/metrics/?range=7d"); expect(metricResponse.status()).toBe(200);
    const metric = (await metricResponse.json()).data;
    expect(metric).toMatchObject({ chatStarts: 1, engagedSessions: 1, leadsSubmitted: 1, conversionRate: 100, chatErrors: 1, notificationFailures: 1 }); expect(metric.daily).toHaveLength(7);
    const list = (await (await client.get("/api/admin/conversations/?hasLead=yes&locale=sr")).json()).data;
    expect(list.items.some((item: { id: string }) => item.id === fixture.id)).toBe(true);
    expect((await client.get("/api/admin/conversations/?cursor=invalid")).status()).toBe(400);
    const transcript = (await (await client.get(`/api/admin/conversations/${fixture.id}/`)).json()).data;
    expect(transcript.messages).toHaveLength(4); expect(transcript.session).not.toHaveProperty("tokenHash");
    const endpoint = `/api/admin/leads/${fixture.leadId}/`;
    expect((await client.patch(endpoint, { headers: { Origin: "https://evil.example" }, data: { status: "contacted", internalNote: "" } })).status()).toBe(403);
    expect((await client.patch(endpoint, { data: { status: "contacted", internalNote: "", email: "overwrite@example.test" } })).status()).toBe(400);
    expect((await client.patch(endpoint, { data: { status: "contacted", internalNote: "Internal sensitive fixture note" } })).status()).toBe(200);
    const [audit] = await db.execute<mysql.RowDataPacket[]>("SELECT * FROM chat_admin_audit_logs WHERE target_id=?", [fixture.leadId]);
    expect(audit).toHaveLength(2); expect(JSON.stringify(audit)).not.toContain("Internal sensitive fixture note");
    expect((await client.post(endpoint + "notification/", { data: { verifiedNotDelivered: false } })).status()).toBe(400);
    expect((await client.post(endpoint + "notification/", { data: { verifiedNotDelivered: true } })).status()).toBe(200);
    expect((await client.post(endpoint + "notification/", { data: { verifiedNotDelivered: true } })).status()).toBe(409);
    expect((await client.delete(endpoint, { data: { confirm: false } })).status()).toBe(400);
    await db.execute("UPDATE chat_sessions SET active_until=? WHERE id=?", [new Date(Date.now() + 60000), fixture.id]);
    expect((await client.delete(endpoint, { data: { confirm: true } })).status()).toBe(409);
    await db.execute("UPDATE chat_sessions SET active_until=NULL WHERE id=?", [fixture.id]);
    await db.execute("UPDATE chat_lead_notifications SET status='processing',lease_until=? WHERE lead_id=?", [new Date(Date.now() + 60000), fixture.leadId]);
    expect((await client.delete(endpoint, { data: { confirm: true } })).status()).toBe(409);
    await db.execute("UPDATE chat_lead_notifications SET lease_until=? WHERE lead_id=?", [new Date(Date.now() - 60000), fixture.leadId]);
    expect((await client.delete(endpoint, { data: { confirm: true } })).status()).toBe(200);
    expect((await client.get(endpoint)).status()).toBe(404);
    expect((await (await client.get(`/api/admin/conversations/${fixture.id}/`)).json()).data.messages).toHaveLength(4);
    expect((await client.delete(`/api/admin/conversations/${fixture.id}/`, { data: { confirm: true } })).status()).toBe(200);
    expect((await client.get(`/api/admin/conversations/${fixture.id}/`)).status()).toBe(404);
    const [messages] = await db.execute<mysql.RowDataPacket[]>("SELECT id FROM chat_messages WHERE session_id=?", [fixture.id]); expect(messages).toHaveLength(0);
  } finally { await cleanup(fixture.id); await client.dispose(); }
});

test("keyset pagination has no duplicate conversations; login POST requires origin and Auth.js CSRF", async ({ playwright, request }) => {
  const client = await api(playwright); const ids: string[] = [];
  try {
    for (let i = 0; i < 22; i++) ids.push((await seedConversation(db, false)).id);
    const first = (await (await client.get("/api/admin/conversations/")).json()).data; expect(first.items).toHaveLength(20); expect(first.nextCursor).toBeTruthy();
    const second = (await (await client.get(`/api/admin/conversations/?cursor=${first.nextCursor}`)).json()).data;
    expect(new Set([...first.items, ...second.items].map((row: { id: string }) => row.id)).size).toBe(22);
    expect((await request.post("/api/auth/signin/nodemailer/", { headers: { Origin: "https://evil.example" }, form: { email: ownerEmail } })).status()).toBe(403);
    const denied = await request.post("/api/auth/signin/nodemailer/", { headers: { Origin: baseURL, "X-Auth-Return-Redirect": "1" }, form: { email: ownerEmail, csrfToken: "forged" } });
    expect(JSON.stringify(await denied.json())).toContain("MissingCSRF");
    const csrf = await (await request.get("/api/auth/csrf/")).json();
    const wrong = await request.post("/api/auth/signin/nodemailer/", { headers: { Origin: baseURL, "X-Auth-Return-Redirect": "1" }, form: { email: "not-owner@example.test", csrfToken: csrf.csrfToken, callbackUrl: `${baseURL}/admin/sr/` } });
    expect(JSON.stringify(await wrong.json())).toContain("error");
  } finally { for (const id of ids) await cleanup(id); await client.dispose(); }
});
