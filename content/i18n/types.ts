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

export interface Dictionary {
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
    intro: SectionCopy;
    profile: {
      eyebrow: string;
      title: string;
      paragraphs: readonly string[];
      imageAlt: string;
      caption: string;
    };
    approach: {
      title: string;
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
