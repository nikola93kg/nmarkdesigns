import { caseStudyProjects } from "@/content/projects";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

// Exact verified paths only. Do not turn this into a catch-all legacy redirect.
export const legacyRedirects: Readonly<Record<string, string>> = {
  "/": localizedPath("home", "sr"),
  "/about/": localizedPath("about", "sr"),
  "/contact/": localizedPath("contact", "sr"),
  "/cenovnik/": localizedPath("pricing", "sr"),
  "/portfolio/": localizedPath("portfolio", "sr"),
  "/all-services/": `${localizedPath("home", "sr")}#services`,
  ...Object.fromEntries(caseStudyProjects.map(({ sourceUrl, slug }) => [
    new URL(sourceUrl).pathname, localizedProjectPath(slug, "sr"),
  ])),
};
