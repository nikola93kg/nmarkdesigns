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
      <Container className="grid items-center gap-7 text-center lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.92fr)] lg:gap-16 lg:text-left">
        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-2xl">
          <p className="mx-auto mb-4 max-w-full text-small font-medium text-brand lg:mx-0">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mx-auto max-w-xl text-display font-bold text-ink lg:mx-0">{hero.title}</h1>
          <p className="mx-auto mt-4 max-w-lg text-subheading font-semibold text-ink lg:mx-0">{hero.subtitle}</p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted lg:mx-0">{hero.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
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
