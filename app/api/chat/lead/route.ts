import { randomUUID } from "node:crypto";
import { leadInput } from "@/lib/chatbot/lead-contracts";
import { apiError, assertOrigin, limiterIdentity, ownedSession, parseBody } from "@/lib/chatbot/security";
import { receiveLead } from "@/lib/chatbot/leads";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    assertOrigin(request);
    const input = await parseBody(request, leadInput);
    const session = await ownedSession();
    const receipt = await receiveLead(session.id, input, limiterIdentity(request));
    // Delivery is picked up by the durable cron outbox. This never promises email delivery.
    return Response.json({ ...receipt, requestId }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return apiError(error, requestId); }
}
