import { site } from "@/content/site";
import { homeMarkdown } from "@/lib/agent-discovery";
import { isLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export const dynamic = "force-static";

export async function GET(_request: Request, { params }: RouteContext<"/[locale]/index.md">) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });

  const canonical = new URL(localizedPath("home", locale), site.url);
  return new Response(await homeMarkdown(locale), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": locale,
      Link: `<${canonical.href}>; rel="canonical"`,
    },
  });
}
