import { llmsIndex } from "@/lib/agent-discovery";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await llmsIndex(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
