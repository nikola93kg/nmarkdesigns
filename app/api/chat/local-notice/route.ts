import { localTestOrigin } from "@/lib/chatbot/config";
import { isLocale } from "@/lib/i18n";
import { chatCopy } from "@/content/chatbot/copy";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const origin = localTestOrigin();
  const locale = new URL(request.url).searchParams.get("locale");
  const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
  if (!origin || request.headers.get("host") !== new URL(origin).host || (!locale || !isLocale(locale))) return new Response("Not found", { status: 404, headers });
  const copy = chatCopy[locale].local;
  return new Response(`${copy.link}\n\n${copy.notice}\n\n${copy.details}`, { headers });
}
