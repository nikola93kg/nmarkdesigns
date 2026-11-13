import { projects } from "@/content/projects";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

// Exact verified paths only. Do not turn this into a catch-all legacy redirect.
export const legacyRedirects: Readonly<Record<string, string>> = {
  "/": localizedPath("home", "sr"),
  "/about/": localizedPath("about", "sr"),
  "/contact/": localizedPath("contact", "sr"),
  "/cenovnik/": localizedPath("pricing", "sr"),
  "/portfolio/": localizedPath("portfolio", "sr"),
  "/portfolio-2/": localizedPath("portfolio", "sr"),
  "/all-services/": localizedPath("services", "sr"),
  "/usluge/": localizedPath("services", "sr"),
  "/kontakt/": localizedPath("contact", "sr"),
  "/blog/": localizedPath("blog", "sr"),
  "/faqs/": `${localizedPath("home", "sr")}#faq`,
  ...Object.fromEntries(
    projects
      .filter(({ sourceUrl }) => {
        try {
          const pathname = new URL(sourceUrl).pathname;
          return pathname !== "/" && pathname.length > 1;
        } catch {
          return false;
        }
      })
      .map(({ sourceUrl, slug, caseStudy }) => [
        new URL(sourceUrl).pathname,
        caseStudy
          ? localizedProjectPath(slug, "sr")
          : `${localizedPath("portfolio", "sr")}#project-${slug}`,
      ])
  ),
};
