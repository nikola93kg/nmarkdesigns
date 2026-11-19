import { adminResponse } from "@/lib/chatbot/admin/http";
import { rangeSchema } from "@/lib/chatbot/admin/contracts";
import { requireOwner } from "@/lib/chatbot/admin/access";
import { metrics } from "@/lib/chatbot/admin/queries";
export const runtime = "nodejs";
export const GET = (request: Request) => adminResponse(async () => { await requireOwner(); return metrics(rangeSchema.parse(new URL(request.url).searchParams.get("range") ?? undefined)); });
