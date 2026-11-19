import { adminResponse, queryValues } from "@/lib/chatbot/admin/http";
import { leadFilters } from "@/lib/chatbot/admin/contracts";
import { requireOwner } from "@/lib/chatbot/admin/access";
import { leads } from "@/lib/chatbot/admin/queries";
export const runtime = "nodejs";
export const GET = (request: Request) => adminResponse(async () => { await requireOwner(); return leads(leadFilters.parse(queryValues(new URL(request.url).searchParams))); });
