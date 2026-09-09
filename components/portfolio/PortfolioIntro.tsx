import type { Dictionary } from "@/content/i18n/types";

export function PortfolioIntro({ copy }: { copy: Dictionary["portfolio"]["intro"] }) {
  return (
    <header className="grid gap-6 pb-10 md:grid-cols-2 md:items-end md:gap-12 md:pb-14">
      <div>
        <p className="mb-4 text-small font-medium text-on-brand-muted">{copy.eyebrow}</p>
        <h1 id="portfolio-title" className="text-display font-bold">{copy.title}</h1>
      </div>
      <p className="max-w-lg text-pretty text-on-brand-muted">{copy.description}</p>
    </header>
  );
}
