import "server-only";
import { randomUUID } from "node:crypto";
import { and, desc, eq, sql } from "drizzle-orm";
import { chatDb } from "./db";
import { chatCounters, chatMessages, chatSessions } from "./schema";
import { hashToken, ChatError } from "./security";
import { chatConfig } from "./config";
import type { ChatLink, FinishStatus } from "./contracts";

type Transaction = Parameters<Parameters<ReturnType<typeof chatDb>["transaction"]>[0]>[0];
/** INSERT/UPDATE + row locking inside one transaction: limits survive process restarts. */
export async function consumeLimit(tx: Transaction, identity: string, action: string, limit: number, seconds: number) {
  const now = new Date();
  const window = action === "month" ? now.toISOString().slice(0, 7) : Math.floor(now.getTime() / (seconds * 1000));
  const keyHash = hashToken(`${identity}:${action}:${window}`);
  const expiresAt = action === "month"
    ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
    : new Date((Number(window) + 1) * seconds * 1000);
  await tx.insert(chatCounters).values({ keyHash, count: 1, expiresAt }).onDuplicateKeyUpdate({ set: { count: sql`${chatCounters.count} + 1` } });
  const [counter] = await tx.select().from(chatCounters).where(eq(chatCounters.keyHash, keyHash)).for("update");
  if (counter.count > limit) throw new ChatError("RATE_LIMITED", 429, Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000)));
}
export async function history(sessionId: string) {
  // Bounded response; full transcript remains in DB for the future admin panel.
  const recent = await chatDb().select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(desc(chatMessages.createdAt), desc(chatMessages.id)).limit(100);
  return recent.reverse();
}
export async function reserveTurn(sessionId: string, clientMessageId: string, message: string, ipHash: string) {
  const config = chatConfig();
  return chatDb().transaction(async (tx) => {
    const [session] = await tx.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).for("update");
    if (!session || session.expiresAt <= new Date()) throw new ChatError("SESSION_EXPIRED", 401);
    const previous = await tx.select().from(chatMessages).where(and(eq(chatMessages.sessionId, sessionId), eq(chatMessages.clientMessageId, clientMessageId)));
    const user = previous.find((m) => m.role === "user");
    const assistant = previous.find((m) => m.role === "assistant");
    if (user && user.content !== message) throw new ChatError("INVALID_INPUT", 409);
    if (assistant?.status === "completed") return { replay: assistant, assistantId: assistant.id, generationId: "replay" };
    if (session.activeUntil && session.activeUntil > new Date()) throw new ChatError("BUSY", 409);
    await consumeLimit(tx, ipHash, "chat", 20, 900);
    await consumeLimit(tx, sessionId, "chat", 100, 86400);
    await consumeLimit(tx, "global", "day", config.daily, 86400);
    await consumeLimit(tx, `global:${new Date().toISOString().slice(0, 7)}`, "month", config.monthly, 32 * 86400);
    const now = new Date();
    const assistantId = assistant?.id ?? randomUUID();
    const generationId = randomUUID();
    if (!user) await tx.insert(chatMessages).values({ id: randomUUID(), sessionId, role: "user", content: message,
      status: "completed", clientMessageId, createdAt: new Date(now.getTime() - 1), completedAt: now });
    if (assistant) await tx.update(chatMessages).set({ content: "", status: "pending", completedAt: null, links: null }).where(eq(chatMessages.id, assistantId));
    else await tx.insert(chatMessages).values({ id: assistantId, sessionId, role: "assistant", content: "", status: "pending", clientMessageId, createdAt: now });
    await tx.update(chatSessions).set({ activeGenerationId: generationId, activeUntil: new Date(now.getTime() + config.timeoutMs + 15000), lastActivityAt: now }).where(eq(chatSessions.id, sessionId));
    return { replay: null, assistantId, generationId };
  });
}
export async function finishTurn(sessionId: string, id: string, generationId: string, content: string, status: FinishStatus, links: ChatLink[]) {
  await chatDb().transaction(async (tx) => {
    const [session] = await tx.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).for("update");
    if (!session || session.activeGenerationId !== generationId) throw new ChatError("STREAM_ERROR");
    await tx.update(chatMessages).set({ content, status, links, completedAt: new Date() }).where(eq(chatMessages.id, id));
    await tx.update(chatSessions).set({ activeGenerationId: null, activeUntil: null, lastActivityAt: new Date() }).where(eq(chatSessions.id, sessionId));
  });
}
export async function modelHistory(sessionId: string, assistantId: string) {
  const rows = await chatDb().select().from(chatMessages).where(and(eq(chatMessages.sessionId, sessionId), eq(chatMessages.status, "completed"))).orderBy(desc(chatMessages.createdAt)).limit(12);
  return rows.filter((r) => r.id !== assistantId).reverse().map((r) => ({ role: r.role, content: r.content.slice(0, 2000) }));
}
