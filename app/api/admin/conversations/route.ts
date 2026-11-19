import { adminResponse, queryValues } from "@/lib/chatbot/admin/http";
import { listFilters } from "@/lib/chatbot/admin/contracts";
import { requireOwner } from "@/lib/chatbot/admin/access";
import { conversations } from "@/lib/chatbot/admin/queries";
export const runtime = "nodejs";
export const GET = (request: Request) => adminResponse(async () => { await requireOwner(); return conversations(listFilters.parse(queryValues(new URL(request.url).searchParams))); });
