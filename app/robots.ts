import { headers } from "next/headers";
import { robotsForHost } from "@/lib/crawl";

export const dynamic = "force-dynamic";

export default async function robots() {
  return robotsForHost((await headers()).get("host"));
}
