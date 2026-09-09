import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";
import styles from "@/components/ui/GridBackground.module.css";

export function Hero({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const hero = copy.home.hero;
  const contact = navigationItem("contact", locale, copy.actions.quote);
  const pricing = navigationItem("pricing", locale, copy.navigation.pricing);

  return (
    <section aria-labelledby="hero-title" className={`${styles.grid} border-b border-border py-6 md:py-14 lg:py-16`}>
      <Container className="grid items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-16">
        <div>
          <p className="mb-4 text-small font-medium text-brand">{hero.eyebrow}</p>
          <h1 id="hero-title" className="max-w-xl text-display font-bold text-ink">{hero.title}</h1>
          <p className="mt-4 max-w-lg text-subheading font-semibold text-ink">{hero.subtitle}</p>
          <p className="mt-4 max-w-lg text-muted">{hero.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={contact.href} external={contact.external}>
              {contact.label}<ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
            </Button>
            <Button href={pricing.href} external={pricing.external} variant="secondary">{pricing.label}</Button>
          </div>
        </div>
        <Image
          src="/images/hero-montage.webp"
          alt={hero.imageAlt}
          width={1365}
          height={1100}
          sizes="(min-width: 1280px) 568px, (min-width: 768px) 46vw, (min-width: 640px) 512px, 256px"
          quality={85}
          preload
          className="mx-auto h-auto w-full max-w-64 sm:max-w-lg md:max-w-none"
        />
      </Container>
    </section>
  );
}
