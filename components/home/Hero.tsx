import { ArrowUpRight } from "lucide-react";
import { HeroArtwork } from "@/components/home/HeroArtwork";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";
import styles from "@/components/ui/GridBackground.module.css";

export function Hero({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const hero = copy.home.hero;
  const contact = navigationItem("contact", locale, hero.primaryAction);
  const portfolio = navigationItem("portfolio", locale, hero.secondaryAction);

  return (
    <section aria-labelledby="hero-title" className={`${styles.grid} border-b border-border py-8 md:flex md:min-h-[calc(100svh-var(--spacing-header)-1px)] md:items-center md:py-12 lg:py-14`}>
      <Container className="grid items-center gap-7 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.92fr)] md:gap-10 lg:gap-16">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="mb-4 max-w-full text-small font-medium text-brand">{hero.eyebrow}</p>
          <h1 id="hero-title" className="max-w-xl text-display font-bold text-ink">{hero.title}</h1>
          <p className="mt-4 max-w-lg text-subheading font-semibold text-ink">{hero.subtitle}</p>
          <p className="mt-4 max-w-xl text-pretty text-muted">{hero.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={contact.href} external={contact.external}>
              {contact.label}<ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
            </Button>
            <Button href={portfolio.href} external={portfolio.external} variant="secondary">{portfolio.label}</Button>
          </div>
        </div>
        <HeroArtwork />
      </Container>
    </section>
  );
}
