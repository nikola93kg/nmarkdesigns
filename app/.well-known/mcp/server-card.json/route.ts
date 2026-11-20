import { serverCard } from "@/lib/site-mcp";

export const dynamic = "force-static";

export function GET() {
  return Response.json(serverCard);
}
