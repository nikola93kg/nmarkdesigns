import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";

export function PortfolioContact({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const contact = navigationItem("contact", locale, copy.actions.contact);

  return (
    <section aria-labelledby="portfolio-contact-title" className="bg-surface-muted py-12 md:py-16">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <h2 id="portfolio-contact-title" className="max-w-2xl text-heading font-bold text-ink">{copy.portfolio.contactTitle}</h2>
        <Button href={contact.href} external={contact.external} className="shrink-0">
          {contact.label}<ArrowUpRight aria-hidden="true" size={18} />
        </Button>
      </Container>
    </section>
  );
}
