import { adminResponse } from "@/lib/chatbot/admin/http";
import { idSchema, retryNotification } from "@/lib/chatbot/admin/contracts";
import { assertAdminOrigin, requireOwner } from "@/lib/chatbot/admin/access";
import { requeueNotification } from "@/lib/chatbot/admin/mutations";
import { parseBody } from "@/lib/chatbot/security";
export const runtime = "nodejs";
export const POST = (request: Request, context: { params: Promise<{ id: string }> }) => adminResponse(async () => { await requireOwner(); assertAdminOrigin(request); await parseBody(request, retryNotification); await requeueNotification(idSchema.parse((await context.params).id)); return { status: "pending" }; });
