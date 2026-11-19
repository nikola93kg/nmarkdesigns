import { randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { chatDb } from "@/lib/chatbot/db";
import { chatSessions } from "@/lib/chatbot/schema";
import { sessionInput } from "@/lib/chatbot/contracts";
import { apiError, assertOrigin, hashToken, limiterIdentity, ownedSession, parseBody, SESSION_COOKIE } from "@/lib/chatbot/security";
import { consumeLimit, history } from "@/lib/chatbot/store";

export const runtime = "nodejs";
export async function GET() {
  const requestId = randomUUID();
  try {
    const session = await ownedSession();
    const messages = await history(session.id);
    return Response.json({ sessionId: session.id, messages, requestId }, { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
  } catch (error) { return apiError(error, requestId); }
}
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    assertOrigin(request);
    const input = await parseBody(request, sessionInput);
    const identity = limiterIdentity(request);
    const token = randomBytes(32).toString("hex");
    const id = randomUUID();
    const now = new Date();
    // Browser access expires after 24h; database retention is separately configured/reviewed.
    const expiresAt = new Date(now.getTime() + 86400000);
    await chatDb().transaction(async (tx) => {
      await consumeLimit(tx, identity, "session", 10, 3600);
      await tx.insert(chatSessions).values({ id, tokenHash: hashToken(token), locale: input.locale,
        consentVersion: input.consentVersion, consentAt: now, createdAt: now, lastActivityAt: now, expiresAt });
    });
    (await cookies()).set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 86400 });
    return Response.json({ sessionId: id, locale: input.locale, requestId }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return apiError(error, requestId); }
}
