import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";
import styles from "./Home.module.css";
import background from "@/components/ui/GridBackground.module.css";

export function CTA({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const content = copy.home.cta;
  const contact = navigationItem("contact", locale, copy.actions.contact);

  return (
    <section aria-labelledby="cta-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
      <Container className="grid gap-6 text-center lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:text-left">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <p className="mb-4 text-small font-medium text-on-brand-muted">{content.eyebrow}</p>
          <h2 id="cta-title" className={`${styles.ctaHeading} font-bold`}>{content.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-on-brand-muted lg:mx-0">{content.description}</p>
        </div>
        <Button href={contact.href} external={contact.external} variant="secondary" className="min-h-14 justify-self-center px-6 focus-visible:outline-accent lg:justify-self-start">
          {contact.label}<ArrowUpRight aria-hidden="true" size={18} />
        </Button>
      </Container>
    </section>
  );
}
