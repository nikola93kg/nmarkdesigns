import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";

interface PortfolioContactProps {
  locale: Locale;
  copy: Dictionary;
  title?: string;
  description?: string;
  buttonLabel?: string;
}

export function PortfolioContact({ locale, copy, title, description, buttonLabel }: PortfolioContactProps) {
  const contact = navigationItem("contact", locale, buttonLabel ?? copy.actions.contact);

  return (
    <section aria-labelledby="portfolio-contact-title" className="bg-brand py-14 text-on-brand md:py-18 lg:py-20">
      <Container className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
        <div className="max-w-2xl">
          <h2 id="portfolio-contact-title" className="text-heading font-bold">{title ?? copy.portfolio.contactTitle}</h2>
          {description ? (
            <p className="mt-3 text-pretty text-body-muted text-on-brand-muted">{description}</p>
          ) : null}
        </div>
        <Button href={contact.href} external={contact.external} variant="secondary" className="shrink-0 focus-visible:outline-accent">
          {contact.label}<ArrowUpRight aria-hidden="true" size={18} />
        </Button>
      </Container>
    </section>
  );
}
