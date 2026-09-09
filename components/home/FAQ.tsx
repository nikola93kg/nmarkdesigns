import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";
import { FAQAccordion } from "./FAQAccordion";

export function FAQ({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const content = copy.home.faq;
  const contact = navigationItem("contact", locale, copy.actions.contact);

  return (
    <section aria-labelledby="faq-title" className="py-section lg:py-24">
      <Container className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="mb-4 text-small font-medium text-brand">{content.eyebrow}</p>
          <h2 id="faq-title" className="max-w-md text-heading font-bold text-ink">{content.title}</h2>
          <p className="mt-4 max-w-sm text-pretty text-muted">{content.description}</p>
          <a href={contact.href} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline underline-offset-4 hover:text-focus">
            {contact.label}<ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
        <FAQAccordion key={locale} items={content.items} />
      </Container>
    </section>
  );
}
