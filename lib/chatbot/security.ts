import "server-only";
import { createHash, createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { z } from "zod";
import { CHAT_CONSENT_VERSION } from "./contracts";
import { chatConfig } from "./config";
import { chatDb } from "./db";
import { chatSessions } from "./schema";
import { and, eq, gt } from "drizzle-orm";

export const SESSION_COOKIE = process.env.NODE_ENV === "production" ? "__Host-nmark-chat" : "nmark-chat-dev";
export function hashToken(token: string) { return createHash("sha256").update(token).digest("hex"); }
export class ChatError extends Error {
  constructor(public code: string, public status = 503, public retryAfter?: number) { super(code); }
}
export function assertOrigin(request: Request) {
  const config = chatConfig();
  if (request.headers.get("origin") !== config.origin || request.headers.get("sec-fetch-site") === "cross-site") throw new ChatError("FORBIDDEN", 403);
}
export function limiterIdentity(request: Request) {
  // Never trust arbitrary X-Forwarded-For. Configure ONE header only after proxy overwrite is verified.
  const header = process.env.CHAT_TRUSTED_IP_HEADER;
  const value = header ? request.headers.get(header)?.split(",")[0]?.trim() : undefined;
  return createHmac("sha256", chatConfig().secret).update(value || "shared-unverified-proxy").digest("hex");
}
export async function parseBody<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new ChatError("INVALID_INPUT", 400);
  if (!request.body) throw new ChatError("INVALID_INPUT", 400);
  const reader = request.body.getReader();
  let body = "";
  let size = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) throw new ChatError("INVALID_INPUT", 413);
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const result = schema.safeParse(JSON.parse(body));
    if (!result.success) throw new ChatError("INVALID_INPUT", 400);
    return result.data;
  } catch (error) {
    if (error instanceof ChatError) throw error;
    throw new ChatError("INVALID_INPUT", 400);
  } finally { await reader.cancel().catch(() => undefined); reader.releaseLock(); }
}
export async function ownedSession() {
  chatConfig();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) throw new ChatError("SESSION_EXPIRED", 401);
  const [session] = await chatDb().select().from(chatSessions).where(and(eq(chatSessions.tokenHash, hashToken(token)), eq(chatSessions.consentVersion, CHAT_CONSENT_VERSION), gt(chatSessions.expiresAt, new Date()))).limit(1);
  if (!session) throw new ChatError("SESSION_EXPIRED", 401);
  return session;
}
export function apiError(error: unknown, requestId: string) {
  const safe = error instanceof ChatError ? error : new ChatError("UNAVAILABLE");
  return Response.json({ code: safe.code, requestId }, { status: safe.status, headers: {
    "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow",
    ...(safe.retryAfter ? { "Retry-After": String(safe.retryAfter) } : {}),
  } });
}
