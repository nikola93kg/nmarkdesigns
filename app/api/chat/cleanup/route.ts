import { randomUUID } from "node:crypto";
import { apiError } from "@/lib/chatbot/security";
import { authorizeMaintenance } from "@/lib/chatbot/notifications";
import { runDataMaintenance } from "@/lib/chatbot/maintenance";
export const runtime = "nodejs";
export const maxDuration = 90;
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    authorizeMaintenance(request);
    const result = await runDataMaintenance();
    return Response.json({ ...result, requestId }, { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
  } catch (error) { return apiError(error,requestId); }
}
