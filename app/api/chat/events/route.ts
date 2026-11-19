import { randomUUID } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import { clientMetricInput } from "@/lib/chatbot/event-contracts";
import { apiError, assertOrigin, ChatError, ownedSession, parseBody } from "@/lib/chatbot/security";
import { chatDb } from "@/lib/chatbot/db";
import { chatSessions } from "@/lib/chatbot/schema";
import { recordMetric } from "@/lib/chatbot/analytics";
import { consumeLimit } from "@/lib/chatbot/store";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    assertOrigin(request);
    const input = await parseBody(request,clientMetricInput); const owner = await ownedSession();
    await chatDb().transaction(async(tx) => {
      const [session] = await tx.select().from(chatSessions).where(and(eq(chatSessions.id,owner.id),gt(chatSessions.expiresAt,new Date()))).for("update");
      if(!session) throw new ChatError("SESSION_EXPIRED",401);
      await consumeLimit(tx,session.id,"events",60,900);
      await recordMetric(tx,session.id,input.locale,input.event,input.eventId);
    });
    return Response.json({requestId},{headers:{"Cache-Control":"private, no-store"}});
  } catch(error) { return apiError(error,requestId); }
}
