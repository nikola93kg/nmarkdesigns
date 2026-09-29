import type { Locale } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";
import type { ContactField, ContactFormState, ContactValidationError } from "@/lib/contact";
import type { PricingPackageId } from "@/content/pricing";

export interface FAQItem {
  id: string;
  question: string;
  paragraphs: readonly string[];
  list?: readonly string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ServiceDetail extends ServiceItem {
  when: string;
  includes: readonly string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}

/**
 * Copy for the hidden "Flappy Flight" easter egg served at
 * /sr/egg/coolfridgeguys. It is never linked from the public site and is
 * answered with X-Robots-Tag: noindex, nofollow by proxy.ts.
 */
export interface EggCopy {
  eyebrow: string;
  title: string;
  badge: string;
  score: string;
  best: string;
  start: string;
  loading: string;
  retry: string;
  resume: string;
  readyTitle: string;
  readyBody: string;
  hint: string;
  pauseTitle: string;
  pauseBody: string;
  overTitle: string;
  newBest: string;
  /** Sentence fragment placed right after the numeric score. */
  cleared: string;
  again: string;
  footer: string;
  saved: string;
  close: string;
  mute: string;
  unmute: string;
  pauseAria: string;
  resumeAria: string;
  restartAria: string;
  canvasLabel: string;
}

export interface Dictionary {
  egg: EggCopy;
  navigation: Record<RouteKey, string>;
  accessibility: {
    skipLink: string;
    homeLink: string;
    mainNavigation: string;
    mobileNavigation: string;
    footerNavigation: string;
    menu: string;
    backToTop: string;
    languageNavigation: string;
    languageLabels: Record<Locale, string>;
  };
  actions: {
    quote: string;
    contact: string;
    allProjects: string;
    viewProject: string;
  };
  footer: {
    label: string;
    socialLabel: string;
    portfolioLabel: string;
    description: string;
    quickLinks: string;
    contact: string;
    copyright: string;
  };
  portfolio: {
    metadata: { title: string; description: string };
    intro: SectionCopy;
    allProjects: string;
    defaultCategory: string;
    contentNeeded: {
      category: string;
      description: string;
      screenshot: string;
      website: string;
    };
    contactTitle: string;
    visitWebsite: string;
  };
  blog: {
    metadata: { title: string; description: string };
    intro: SectionCopy;
    readArticle: string;
    readTime: string;
    publishedOn: string;
    empty: string;
    cta: SectionCopy & { label: string };
  };
  services: {
    metadata: { title: string; description: string };
    intro: SectionCopy;
    overview: SectionCopy & { items: readonly ServiceItem[] };
    details: SectionCopy & { includeLabel: string; items: readonly ServiceDetail[] };
    audience: SectionCopy & { items: readonly string[] };
    process: SectionCopy & { items: readonly ProcessStep[] };
    principles: SectionCopy & { items: readonly ServiceItem[] };
    proof: SectionCopy;
    pricing: SectionCopy & { label: string };
    cta: SectionCopy & { label: string };
  };
  about: {
    metadata: { title: string; description: string };
    intro: SectionCopy & {
      imageAlt: string;
      imageCaption: string;
    };
    profile: {
      eyebrow: string;
      title: string;
      paragraphs: readonly string[];
      imageAlt: string;
      caption: string;
    };
    approach: {
      title: string;
      description: string;
      principles: readonly string[];
      contactTitle: string;
    };
  };
  contact: {
    metadata: { title: string; description: string };
    intro: SectionCopy;
    details: {
      title: string;
      description: string;
      email: string;
      phone: string;
      whatsapp: string;
    };
    form: {
      title: string;
      labels: Record<ContactField, string>;
      optional: string;
      required: string;
      submit: string;
      pending: string;
      unavailableNotice: string;
      validation: Record<ContactValidationError, string>;
      status: Record<Exclude<ContactFormState["status"], "idle">, string>;
    };
  };
  pricing: {
    metadata: { title: string; description: string };
    intro: SectionCopy;
    packageLabel: string;
    packageFeaturesLabel: string;
    packageCta: string;
    excludedLabel: string;
    packages: Record<PricingPackageId, {
      features: readonly string[];
      excluded?: readonly string[];
    }>;
    notes: {
      title: string;
      items: readonly string[];
    };
    cta: {
      title: string;
      description: string;
      label: string;
    };
    faq: SectionCopy & { items: readonly FAQItem[] };
  };
  caseStudy: {
    eyebrow: string;
    client: string;
    location: string;
    category: string;
    services: string;
    technologies: string;
    challenge: string;
    solution: string;
    results: string;
    gallery: string;
    navigation: string;
    nextProject: string;
  };
  home: {
    metadata: { title: string; description: string };
    hero: SectionCopy & {
      subtitle: string;
      primaryAction: string;
      secondaryAction: string;
      imageAlt: string;
    };
    projects: SectionCopy;
    services: SectionCopy & {
      imageAlt: string;
      detailsAction: string;
      items: readonly ServiceItem[];
      maintenance: ServiceItem;
    };
    cta: SectionCopy;
    faq: SectionCopy & { items: readonly FAQItem[] };
  };
}
