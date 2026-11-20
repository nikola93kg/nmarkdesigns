import { robotsForHost } from "@/lib/crawl";
import { isIndexableHost } from "@/lib/seo-config";

export function GET(request: Request) {
  const host = request.headers.get("host");
  const { rules, sitemap } = robotsForHost(host);
  const lines = [
    `User-agent: ${rules.userAgent}`,
    ...("allow" in rules ? [`Allow: ${rules.allow}`] : []),
    ...[rules.disallow].flat().map((path) => `Disallow: ${path}`),
  ];

  if (isIndexableHost(host)) lines.push("Content-Signal: search=yes, ai-train=no");
  if (sitemap) lines.push("", `Sitemap: ${sitemap}`);

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
