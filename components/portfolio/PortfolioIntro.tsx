import type { Dictionary } from "@/content/i18n/types";

export function PortfolioIntro({ copy }: { copy: Dictionary["portfolio"]["intro"] }) {
  return (
    <header className="grid gap-6 pb-10 text-center md:pb-14 lg:grid-cols-2 lg:items-end lg:gap-12 lg:text-left">
      <div>
        <p className="mb-4 text-small font-medium text-on-brand-muted">{copy.eyebrow}</p>
        <h1 id="portfolio-title" className="text-display font-bold">{copy.title}</h1>
      </div>
      <p className="mx-auto max-w-lg text-pretty text-on-brand-muted lg:mx-0">{copy.description}</p>
    </header>
  );
}
