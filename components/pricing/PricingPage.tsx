import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import { pricingPackages } from "@/content/pricing";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

type PricingPageProps = {
  locale: Locale;
  copy: Dictionary["pricing"];
  navigation: Dictionary["navigation"];
};

export function PricingPage({ locale, copy }: PricingPageProps) {
  const contact = localizedPath("contact", locale);

  return (
    <>

      <section
        aria-labelledby="pricing-title"
        className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}
      >
        <Container className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <p className="mb-4 text-small font-medium text-on-brand-muted">
              {copy.intro.eyebrow}
            </p>
            <h1 id="pricing-title" className="text-display font-bold">
              {copy.intro.title}
            </h1>
          </div>
          <p className="max-w-lg text-pretty text-on-brand-muted">
            {copy.intro.description}
          </p>
        </Container>
      </section>

      <section aria-label={copy.packageLabel} className="py-section">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPackages.map((plan, index) => {
              const content = copy.packages[plan.id];
              const isHighlighted = pricingPackages.length >= 3 && index === 1;

              return (
                <article
                  key={plan.id}
                  aria-labelledby={`plan-${plan.id}`}
                  className={[
                    "relative flex min-h-full flex-col overflow-hidden border bg-surface",
                    "rounded-card p-6 transition-colors md:p-8",
                    isHighlighted ? "border-brand" : "border-border",
                  ].join(" ")}
                >
                  {isHighlighted ? (
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand" />
                  ) : null}

                  <header className="border-b border-border pb-6">
                    <p className="text-small font-semibold uppercase text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <h2
                      id={`plan-${plan.id}`}
                      className="mt-6 text-subheading font-bold text-ink"
                      translate="no"
                    >
                      {plan.name}
                    </h2>

                    <p className="mt-5 text-4xl font-bold text-brand md:text-5xl">
                      {plan.price}
                    </p>
                  </header>

                  <div className="flex flex-1 flex-col pt-6">
                    <p className="font-semibold text-ink">
                      {copy.packageFeaturesLabel}
                    </p>

                    <ul className="mt-5 grid gap-3">
                      {content.features.map((feature, featureIndex) => (
                        <li
                          key={`${plan.id}-feature-${featureIndex}`}
                          className="flex items-start gap-3 text-muted"
                        >
                          <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {content.excluded?.length ? (
                      <p className="mt-6 border-t border-border pt-5 text-small text-muted">
                        <span className="font-semibold text-ink">{copy.excludedLabel}:</span>{" "}
                        {content.excluded.join(", ")}
                      </p>
                    ) : null}

                    <Button
                      href={contact}
                      className="mt-8 w-full justify-center"
                      aria-label={`${copy.packageCta}: ${plan.name}`}
                    >
                      {copy.packageCta}
                      <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="pricing-notes-title" className="border-y border-border bg-surface-muted py-12 md:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <h2 id="pricing-notes-title" className="text-heading font-bold text-ink">
              {copy.notes.title}
            </h2>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {copy.notes.items.map((item, index) => (
              <li key={item} className="grid gap-3 py-5 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6">
                <span aria-hidden="true" className="text-small font-semibold tabular-nums text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-pretty text-muted">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="pricing-questions"
        className="py-section"
      >
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-small font-semibold uppercase text-brand">
              {copy.faq.eyebrow}
            </p>

            <h2
              id="pricing-questions"
              className="max-w-md text-heading font-bold text-ink"
            >
              {copy.faq.title}
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-muted">
              {copy.faq.description}
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {copy.faq.items.map((item, itemIndex) => (
              <details
                key={item.id}
                className="group"
                open={itemIndex === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-brand marker:hidden">
                  <h3 className="text-lg font-semibold">{item.question}</h3>

                  <span
                    aria-hidden="true"
                    className="relative size-5 shrink-0"
                  >
                    <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-current transition-transform group-open:rotate-90 group-open:scale-0" />
                  </span>
                </summary>

                <div className="max-w-2xl space-y-4 pb-7 text-muted">
                  {item.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${item.id}-paragraph-${paragraphIndex}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="pricing-contact" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-small font-semibold uppercase text-on-brand-muted">
              {copy.packageCta}
            </p>
            <h2 id="pricing-contact" className="text-heading font-bold">
              {copy.cta.title}
            </h2>

            <p className="mt-4 max-w-xl text-pretty text-on-brand-muted">
              {copy.cta.description}
            </p>
          </div>

          <Button
            href={contact}
            variant="secondary"
            className="shrink-0"
          >
            {copy.cta.label}
            <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
          </Button>
        </Container>
      </section>
    </>
  );
}
