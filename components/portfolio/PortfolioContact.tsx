import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";

export function PortfolioContact({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const contact = navigationItem("contact", locale, copy.actions.contact);

  return (
    <section aria-labelledby="portfolio-contact-title" className={`${background.grid} ${background.inverseGrid} border-t border-border-inverse bg-brand py-14 text-on-brand md:py-18 lg:py-20`}>
      <Container className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
        <h2 id="portfolio-contact-title" className="max-w-2xl text-heading font-bold">{copy.portfolio.contactTitle}</h2>
        <Button href={contact.href} external={contact.external} variant="secondary" className="shrink-0 focus-visible:outline-accent">
          {contact.label}<ArrowUpRight aria-hidden="true" size={18} />
        </Button>
      </Container>
    </section>
  );
}
