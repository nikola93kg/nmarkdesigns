import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";

export function AboutApproach({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const approach = copy.about.approach;
  const contact = navigationItem("contact", locale, copy.actions.contact);

  return (
    <section aria-labelledby="about-mission-title" className="border-t border-border bg-surface-muted py-12 md:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:gap-12 lg:gap-20">
          <h2 id="about-mission-title" className="text-heading font-bold">{approach.title}</h2>
          <ul className="divide-y divide-border border-y border-border">
            {approach.principles.map((principle) => (
              <li key={principle} className="py-5 text-subheading font-medium text-brand">{principle}</li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-col items-start gap-6 border-t border-border pt-10 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-12">
          <p className="max-w-xl text-subheading font-semibold">{approach.contactTitle}</p>
          <Button href={contact.href} external={contact.external} className="shrink-0">
            {contact.label}<ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
