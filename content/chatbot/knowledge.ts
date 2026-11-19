import { websitePackages, additionalServices, carePlans, formatWebsiteStartingPrice } from "@/content/pricing";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";
import type { ChatLink } from "@/lib/chatbot/contracts";

export interface KnowledgeEntry extends ChatLink {
  locale: Locale;
  facts: readonly string[];
  lastReviewedAt: string;
  keywords: readonly string[];
}
export const KNOWLEDGE_VERSION = "2026-11-19.1";
const reviewed = "2026-11-19";
const names = {
  sr: { pricing: "Početne cene", services: "Usluge", contact: "Kontakt sa Nikolom", portfolio: "Portfolio" },
  en: { pricing: "Starting prices", services: "Services", contact: "Contact Nikola", portfolio: "Portfolio" },
};
const selectedProjects = new Set([
  "casovi-francuskog", "coolfridgeguys", "buy-pallet-jacks", "os-dule-karaklajic",
  "ilic-enterijer", "powder-brows-vienna", "anabelabebioprema", "tripolisweets",
]);

/** Pricing values are read from the same registry as the public pricing page. */
export function knowledgeRegistry(locale: Locale): KnowledgeEntry[] {
  const copy = names[locale];
  const base = { locale, lastReviewedAt: reviewed };
  return [
    { ...base, id: "pricing", title: copy.pricing, category: "pricing", url: `${site.url}${localizedPath("pricing", locale)}`,
      description: locale === "sr" ? "Početne cene; konačna ponuda zavisi od obima." : "Starting prices; the final quote depends on scope.",
      keywords: ["cena", "cene", "košta", "kosta", "price", "cost", "budget", "budžet", "eur"],
      facts: [
        ...websitePackages.map((p) => `${p.id}: ${formatWebsiteStartingPrice(p.id, locale)} (starting price, not a fixed quote)`),
        ...additionalServices.map((s) => `${s.id}: from ${s.startingPrice} EUR${s.id === "ai-chatbot" ? "; API and infrastructure billed separately" : ""}`),
        ...carePlans.map((p) => `${p.id}: ${p.startingPrice === undefined ? "by quotation" : `from ${p.startingPrice} EUR / ${p.period}`}`),
        "Custom web applications: by quotation. No guaranteed deadlines, discounts, rankings or results.",
      ] },
    { ...base, id: "services", title: copy.services, category: "services", url: `${site.url}${localizedPath("services", locale)}`,
      description: locale === "sr" ? "Izrada i redizajn sajtova, web prodavnice, SEO, brzina, AI chatbot i održavanje." : "Websites, redesign, online stores, SEO, performance, AI chatbots and maintenance.",
      keywords: ["sajt", "website", "wordpress", "next", "seo", "chatbot", "održavanje", "maintenance"],
      facts: ["Website design/development, redesign, ecommerce, custom web development, SEO, performance optimization, AI chatbot integration, supported-site hosting and care plans."] },
    { ...base, id: "contact", title: copy.contact, category: "contact", url: `${site.url}${localizedPath("contact", locale)}`,
      description: locale === "sr" ? "Opišite projekat za konkretnu ponudu." : "Describe your project to request a quote.",
      keywords: ["ponud", "kontakt", "quote", "contact", "rok", "deadline", "sarad", "availability"],
      facts: [`Contact: Nikola Marković, ${site.email}. Contact form submission is separate from this chat. Never claim an inquiry has been sent.`] },
    { ...base, id: "portfolio", title: copy.portfolio, category: "portfolio", url: `${site.url}${localizedPath("portfolio", locale)}`,
      description: locale === "sr" ? "Odabrani projekti NMark Designs." : "Selected NMark Designs projects.",
      keywords: ["portfolio", "projekti", "projects", "radovi", "examples"], facts: [] },
    ...projects.filter((p) => selectedProjects.has(p.slug)).map((p): KnowledgeEntry => ({
      ...base, id: `project:${p.slug}`, title: p.title, category: "project",
      url: `${site.url}${localizedProjectPath(p.slug, locale)}`,
      description: p.shortDescription?.[locale] ?? p.title,
      keywords: [p.title, p.slug, p.category?.[locale] ?? "", p.shortDescription?.[locale] ?? ""],
      facts: [p.shortDescription?.[locale] ?? p.title, ...(p.technologies ?? []),
        ...(p.status === "inactive" || p.status === "archived" || p.slug === "tripolisweets" ? ["Historical portfolio project; do not claim its external website is currently available."] : [])],
    })),
  ];
}
const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "dj");

export function selectKnowledge(message: string, locale: Locale): KnowledgeEntry[] {
  const tokens = normalize(message).split(/[^a-z0-9]+/).filter((s) => s.length > 2);
  return knowledgeRegistry(locale).map((entry) => {
    const haystack = normalize(entry.keywords.join(" "));
    let score = tokens.reduce((sum, word) => sum + (haystack.includes(word) ? 1 : 0), 0);
    if (entry.id === "project:ilic-enterijer" && /stolar|namestaj|furniture|carpent|kitchen/.test(normalize(message))) score += 10;
    if (entry.id === "project:anabelabebioprema" && /prodavnic|ecommerce|e-commerce|online store/.test(normalize(message))) score += 5;
    return { entry, score };
  }).sort((a, b) => b.score - a.score).filter(({ score, entry }) => score > 0 || ["services", "pricing", "contact"].includes(entry.id)).slice(0, 7).map(({ entry }) => entry);
}

/** Only this server-derived selection can become clickable UI; model prose never becomes a URL. */
export function recommendedLinks(message: string, locale: Locale): ChatLink[] {
  const selected = selectKnowledge(message, locale);
  const projects = selected.filter((e) => e.category === "project").slice(0, 2);
  const topic = selected.filter((e) => e.category !== "project" && e.keywords.some((k) => normalize(message).includes(normalize(k)))).slice(0, 2);
  return [...topic, ...projects].map(({ id, title, description, url, category }) => ({ id, title, description, url, category }));
}

export function isKnowledgeUrl(url: string, locale: Locale): boolean {
  return knowledgeRegistry(locale).some((entry) => entry.url === url);
}
