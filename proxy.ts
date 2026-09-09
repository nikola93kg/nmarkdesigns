import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n";
import { getCaseStudyProject } from "@/content/projects";

export function proxy(request: NextRequest) {
  const [locale, section, slug, ...rest] = request.nextUrl.pathname.split("/").filter(Boolean);
  const invalidProjectPath = section?.toLowerCase() === "portfolio" && (
    section !== "portfolio" || (slug !== undefined && (!getCaseStudyProject(slug) || rest.length > 0))
  );

  // Validate before the static cache, including on case-insensitive hosts.
  if (!isLocale(locale) || invalidProjectPath) {
    return NextResponse.rewrite(new URL("/_not-found/", request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|_not-found/|images/|projects/|logo/|.*\\..*).+)"],
};
