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
        <div className="grid gap-8 text-center lg:grid-cols-[1fr_1.5fr] lg:gap-20 lg:text-left">
          <div>
            <h2 id="about-mission-title" className="text-heading font-bold">{approach.title}</h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-muted lg:mx-0">{approach.description}</p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {approach.principles.map((principle, index) => (
              <li key={principle} className="grid gap-3 py-5 text-left sm:grid-cols-[3rem_1fr] sm:items-start">
                <span className="font-mono text-small text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-subheading font-medium text-brand">{principle}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-col items-center gap-6 border-t border-border pt-10 text-center md:mt-12 md:pt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
          <p className="max-w-xl text-subheading font-semibold">{approach.contactTitle}</p>
          <Button href={contact.href} external={contact.external} className="shrink-0">
            {contact.label}<ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
