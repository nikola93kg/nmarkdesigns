import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import { pricingPackages } from "@/content/pricing";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export function PricingPage({ locale, copy }: { locale: Locale; copy: Dictionary["pricing"] }) {
  const contact = localizedPath("contact", locale);
  return (
    <>
      <section aria-labelledby="pricing-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
        <Container className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-small text-on-brand-muted">{copy.intro.eyebrow}</p>
            <h1 id="pricing-title" className="text-display font-bold text-balance">{copy.intro.title}</h1>
          </div>
          <p className="max-w-xl text-pretty text-on-brand-muted">{copy.intro.description}</p>
        </Container>
      </section>
      <Container className="py-12 md:py-16">
        <div className="divide-y divide-border border-y border-border">
          {pricingPackages.map((plan) => {
            const content = copy.packages[plan.id];
            return (
              <article key={plan.id} aria-labelledby={`plan-${plan.id}`} className="grid gap-8 py-10 md:grid-cols-[1fr_1.6fr] md:gap-12 md:py-12">
                <div>
                  <p className="mb-2 text-small text-muted">{copy.packageLabel}</p>
                  <h2 id={`plan-${plan.id}`} className="text-subheading font-bold" translate="no">{plan.name}</h2>
                  <p className="mt-4 text-heading font-bold whitespace-nowrap text-brand">{plan.price}</p>
                  <Button href={contact} className="mt-6" aria-label={`${copy.packageCta}: ${plan.name}`}>{copy.packageCta}</Button>
                </div>
                <div>
                  <p className="mb-4 font-medium text-brand">{copy.packageFeaturesLabel}</p>
                  <ul className="list-disc space-y-2 pl-5 marker:text-muted">
                    {content.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  {content.excluded && <p className="mt-5 border-t border-border pt-4 text-muted"><strong className="font-medium">{copy.excludedLabel}:</strong> {content.excluded.join(", ")}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
      <section aria-labelledby="pricing-questions" className="bg-surface-muted py-12 md:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <div>
            <p className="mb-3 text-small text-muted">{copy.faq.eyebrow}</p>
            <h2 id="pricing-questions" className="text-heading font-bold">{copy.faq.title}</h2>
          </div>
          <div className="space-y-8">
            {copy.faq.items.map((item) => (
              <section key={item.id} aria-labelledby={`pricing-${item.id}`}>
                <h3 id={`pricing-${item.id}`} className="mb-3 text-lg font-semibold text-brand">{item.question}</h3>
                {item.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-2xl text-pretty">{paragraph}</p>)}
              </section>
            ))}
          </div>
        </Container>
      </section>
      <section aria-labelledby="pricing-contact" className="py-12 md:py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <h2 id="pricing-contact" className="text-subheading font-bold">{copy.cta.title}</h2>
            <p className="mt-3 text-muted">{copy.cta.description}</p>
          </div>
          <Button href={contact} className="shrink-0">{copy.cta.label}</Button>
        </Container>
      </section>
    </>
  );
}
