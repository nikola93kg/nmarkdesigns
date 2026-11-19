import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";

test("MySQL migrations, concurrent generation, replay, retry, quotas and cascade deletion", async () => {
  test.skip(process.env.CHAT_DB_TEST !== "true", "Requires the explicitly configured disposable local MySQL test database.");
  expect(process.env.DB_HOST).toBe("127.0.0.1");
  expect(process.env.DB_NAME).toMatch(/(?:^|_)nmark_chatbot_test$/);
  Object.assign(process.env, {
    CHAT_ENABLED: "true", CHAT_ORIGIN: "http://127.0.0.1:3110", CHAT_IDENTITY_SECRET: "local-database-test-identity-secret-only",
    OPENAI_MODEL: "test-model-no-provider-request", OPENAI_API_KEY: "test-key-no-provider-request",
    CHAT_MAX_CALLS_DAY: "1000", CHAT_MAX_CALLS_MONTH: "1000",
    CHAT_PRIVACY_URL_SR: "https://nmarkdesigns.com/sr/", CHAT_PRIVACY_URL_EN: "https://nmarkdesigns.com/en/",
  });
  const { chatDb } = await import("@/lib/chatbot/db");
  const { chatSessions, chatMessages, chatCounters } = await import("@/lib/chatbot/schema");
  const { reserveTurn, finishTurn, consumeLimit } = await import("@/lib/chatbot/store");
  const { hashToken, assertOrigin, parseBody } = await import("@/lib/chatbot/security");
  const { messageInput } = await import("@/lib/chatbot/contracts");
  expect(() => assertOrigin(new Request("http://127.0.0.1:3110/api/chat/", { headers: { Origin: "https://evil.example" } }))).toThrow("FORBIDDEN");
  expect(() => assertOrigin(new Request("http://127.0.0.1:3110/api/chat/"))).toThrow("FORBIDDEN");
  assertOrigin(new Request("http://127.0.0.1:3110/api/chat/", { headers: { Origin: "http://127.0.0.1:3110" } }));
  await expect(parseBody(new Request("http://127.0.0.1:3110/api/chat/", { method: "POST", headers: { "Content-Type": "application/json" }, body: "x".repeat(12001) }), messageInput)).rejects.toMatchObject({ code: "INVALID_INPUT", status: 413 });
  const db = chatDb();
  const sessionId = randomUUID();
  const clientId = randomUUID();
  const identity = randomUUID();
  const now = new Date();
  try {
    await db.insert(chatSessions).values({ id: sessionId, tokenHash: hashToken(randomUUID()), locale: "sr", consentVersion: "db-test",
      consentAt: now, createdAt: now, lastActivityAt: now, expiresAt: new Date(now.getTime() + 3600000) });
    const results = await Promise.allSettled([
      reserveTurn(sessionId, clientId, "Koliko košta poslovni sajt?", identity),
      reserveTurn(sessionId, clientId, "Koliko košta poslovni sajt?", identity),
    ]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(results.filter((r) => r.status === "rejected")).toHaveLength(1);
    const success = results.find((r) => r.status === "fulfilled");
    if (!success || success.status !== "fulfilled") throw new Error("No reserved turn");
    const turn = success.value;
    await finishTurn(sessionId, turn.assistantId, turn.generationId, "Od 550 €.", "completed", []);
    const replay = await reserveTurn(sessionId, clientId, "Koliko košta poslovni sajt?", identity);
    expect(replay.replay?.content).toBe("Od 550 €.");
    expect((await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)))).toHaveLength(2);
    await expect(reserveTurn(sessionId, clientId, "Different content", identity)).rejects.toMatchObject({ code: "INVALID_INPUT" });
    const retryId = randomUUID();
    const failed = await reserveTurn(sessionId, retryId, "Treba mi sajt", identity);
    await finishTurn(sessionId, failed.assistantId, failed.generationId, "Partial", "cancelled", []);
    const retry = await reserveTurn(sessionId, retryId, "Treba mi sajt", identity);
    expect(retry.assistantId).toBe(failed.assistantId);
    // A stale completion cannot overwrite a newer generation or release its lease.
    await expect(finishTurn(sessionId, failed.assistantId, failed.generationId, "Stale", "completed", [])).rejects.toMatchObject({ code: "STREAM_ERROR" });
    await finishTurn(sessionId, retry.assistantId, retry.generationId, "Kako mogu da pomognem?", "completed", []);
    expect(await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId))).toHaveLength(4);
    const attempts = await Promise.allSettled(Array.from({ length: 8 }, () => db.transaction((tx) => consumeLimit(tx, identity, "atomic-test", 3, 3600))));
    expect(attempts.filter((r) => r.status === "fulfilled")).toHaveLength(3);
    expect(attempts.filter((r) => r.status === "rejected")).toHaveLength(5);
    const window = Math.floor(Date.now() / 3600000);
    const [counter] = await db.select().from(chatCounters).where(eq(chatCounters.keyHash, hashToken(`${identity}:atomic-test:${window}`)));
    expect(counter.count).toBe(3);
    await db.delete(chatSessions).where(eq(chatSessions.id, sessionId));
    expect(await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId))).toHaveLength(0);
    await db.execute(sql`SELECT 1`);
  } finally {
    await db.delete(chatSessions).where(eq(chatSessions.id, sessionId));
    await db.$client.end();
  }
});
