import { NextRequest } from "next/server";
import { randomUUID, createHmac } from "node:crypto";
import { adminConfig } from "@/lib/chatbot/admin/config";
import { handlers } from "@/lib/chatbot/admin/auth";
import { assertAdminOrigin } from "@/lib/chatbot/admin/access";
import { apiError, ChatError } from "@/lib/chatbot/security";
import { chatDb } from "@/lib/chatbot/db";
import { consumeLimit } from "@/lib/chatbot/store";
export const runtime = "nodejs";
async function handle(request: NextRequest, method: "GET" | "POST") {
  const requestId = randomUUID();
  try {
    const config = adminConfig();
    if (request.headers.get("host") !== new URL(config.origin).host) throw new ChatError("FORBIDDEN", 403);
    let body: string | undefined;
    if (method === "POST") {
      assertAdminOrigin(request);
      if (Number(request.headers.get("content-length")) > 12000) throw new ChatError("INVALID_INPUT", 413);
      const reader = request.body?.getReader(); const decoder = new TextDecoder(); let size = 0; body = "";
      if (reader) {
        try {
          while (true) { const { value, done } = await reader.read(); if (done) break; size += value.byteLength; if (size > 12000) throw new ChatError("INVALID_INPUT", 413); body += decoder.decode(value, { stream: true }); }
          body += decoder.decode();
        } finally { await reader.cancel().catch(() => undefined); reader.releaseLock(); }
      }
      if (request.nextUrl.pathname.replace(/\/$/, "") === "/api/auth/signin/nodemailer") {
        const identity = createHmac("sha256", config.secret).update(process.env.CHAT_TRUSTED_IP_HEADER ? request.headers.get(process.env.CHAT_TRUSTED_IP_HEADER)?.split(",")[0]?.trim() || "shared" : "shared").digest("hex");
        await chatDb().transaction(async (tx) => { await consumeLimit(tx, identity, "admin_login", 5, 900); await consumeLimit(tx, "admin-owner", "admin_login", 10, 900); });
      }
    }
    // AUTH_URL pins the URL; pin forwarded headers as well before trusting the request host.
    const headers = new Headers(request.headers);
    headers.set("host", new URL(config.origin).host); headers.set("x-forwarded-host", new URL(config.origin).host);
    headers.set("x-forwarded-proto", new URL(config.origin).protocol.slice(0, -1));
    return await handlers[method](new NextRequest(request.url, { headers, method, ...(body !== undefined ? { body } : {}) }));
  } catch (error) { return apiError(error instanceof ChatError ? error : new ChatError("ADMIN_UNAVAILABLE", 503), requestId); }
}
export const GET = (request: NextRequest) => handle(request, "GET");
export const POST = (request: NextRequest) => handle(request, "POST");
