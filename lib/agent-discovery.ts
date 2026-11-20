import "server-only";
import { getDictionary } from "@/content/i18n";
import { privacyPublication } from "@/content/privacy";
import { homepageProjects } from "@/content/projects";
import { site } from "@/content/site";
import { locales, type Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

const keyPages = ["home", "services", "pricing", "portfolio", "blog", "about", "contact", "terms", "privacy"] as const;
const languageNames = { sr: "Srpski", en: "English" } as const;

const url = (path: string) => new URL(path, site.url).href;
const markdownLink = (label: string, href: string) => `[${label}](${href})`;

export async function discoverPages(locale: Locale) {
  const { navigation } = await getDictionary(locale);
  return keyPages
    .filter((route) => route !== "privacy" || privacyPublication.approved)
    .map((route) => ({
      label: navigation[route],
      url: url(localizedPath(route, locale)),
    }));
}

export async function llmsIndex() {
  const sections = await Promise.all(locales.map(async (locale) => [
    `## ${languageNames[locale]}`,
    "",
    ...(await discoverPages(locale)).map(({ label, url }) => `- ${markdownLink(label, url)}`),
    `- ${markdownLink(`Markdown (${languageNames[locale]})`, url(`${localizedPath("home", locale)}index.md`))}`,
  ].join("\n")));

  return [
    `# ${site.name}`,
    "> Web design and development studio run by Nikola Marković. Services include business websites, e-commerce, technical SEO and ongoing maintenance.",
    ...sections,
    `## Optional\n\n- ${markdownLink("Expanded studio guide", url("/llms-full.txt"))}: Case studies, contact details and starting prices for Serbia (EUR) and the US (USD).`,
  ].join("\n\n") + "\n";
}

export async function homeMarkdown(locale: Locale) {
  const { home, footer } = await getDictionary(locale);
  const { hero, projects, services, cta, faq } = home;
  const pages = (await discoverPages(locale)).slice(1);

  return [
    `# ${hero.title} | ${site.name}`,
    `> ${hero.subtitle}`,
    hero.description,
    ...pages.map(({ label, url }) => `- ${markdownLink(label, url)}`),
    `## ${projects.title}`,
    projects.description,
    ...homepageProjects.map((project) => {
      const description = project.caseStudy?.overview[locale] ?? project.shortDescription?.[locale];
      return `- ${markdownLink(project.title, url(localizedProjectPath(project.slug, locale)))}${description ? `: ${description}` : ""}`;
    }),
    `## ${services.eyebrow}`,
    services.description,
    ...[...services.items, services.maintenance].map(({ title, description }) => `- **${title}**: ${description}`),
    `## ${cta.title}`,
    cta.description,
    `- ${markdownLink(site.email, `mailto:${site.email}`)}\n- ${markdownLink(site.phone.label, site.phone.href)}`,
    `## ${faq.title}`,
    ...faq.items.flatMap(({ question, paragraphs, list }) => [
      `### ${question}`,
      ...paragraphs,
      ...(list ? [list.map((line) => `- ${line}`).join("\n")] : []),
    ]),
    footer.description,
  ].join("\n\n") + "\n";
}
