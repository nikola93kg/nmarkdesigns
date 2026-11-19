import { randomUUID } from "node:crypto";
import { apiError, ChatError } from "@/lib/chatbot/security";
import { authorizeMaintenance, runNotificationBatch } from "@/lib/chatbot/notifications";
export const runtime = "nodejs";
export const maxDuration = 90;
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    authorizeMaintenance(request);
    if (process.env.CHAT_EMAIL_ENABLED !== "true") throw new ChatError("UNAVAILABLE");
    const result = await runNotificationBatch();
    return Response.json({ ...result, requestId }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return apiError(error, requestId); }
}
