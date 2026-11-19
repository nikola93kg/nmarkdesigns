import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { leadPreferenceInput } from "@/lib/chatbot/lead-contracts";
import { apiError, assertOrigin, ownedSession, parseBody } from "@/lib/chatbot/security";
import { chatDb } from "@/lib/chatbot/db";
import { chatSessions } from "@/lib/chatbot/schema";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    assertOrigin(request);
    await parseBody(request, leadPreferenceInput);
    const session = await ownedSession();
    await chatDb().update(chatSessions).set({ leadDeclinedAt: new Date() }).where(eq(chatSessions.id, session.id));
    return Response.json({ status: "saved", requestId }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return apiError(error, requestId); }
}
