import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import {
  additionalServices,
  carePlans,
  websitePackages,
  type ServiceInquiryId,
} from "@/content/pricing";
import type { Locale } from "@/lib/i18n";
import { localizedBlogPostPath, localizedPath } from "@/lib/routes";

type PricingPageProps = {
  locale: Locale;
  copy: Dictionary["pricing"];
  navigation: Dictionary["navigation"];
};

function inquiryUrl(contactPath: string, key: ServiceInquiryId): string {
  return `${contactPath}?service=${encodeURIComponent(key)}#contact-form`;
}

export function PricingPage({ locale, copy }: PricingPageProps) {
  const contact = localizedPath("contact", locale);

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section
        aria-labelledby="pricing-title"
        className={`${background.grid} ${background.inverseGrid} bg-brand py-14 text-on-brand md:py-20 lg:py-24`}
      >
        <Container className="grid gap-8 text-center lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-12 lg:text-left">
          <div>
            <p className="mb-4 text-small font-medium uppercase tracking-wider text-on-brand-muted">
              {copy.intro.eyebrow}
            </p>
            <h1 id="pricing-title" className="text-display font-bold">
              {copy.intro.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-on-brand-muted">
              {copy.intro.description}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-end">
            <Button
              href={contact}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {copy.intro.primaryAction}
              <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
            </Button>
            <Button
              href="#packages"
              className="w-full border-border-inverse bg-transparent text-on-brand hover:border-white hover:bg-white/10 sm:w-auto"
            >
              {copy.intro.secondaryAction}
              <ArrowDown aria-hidden="true" size={18} className="shrink-0" />
            </Button>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — WEBSITE DEVELOPMENT PACKAGES */}
      <section
        id="packages"
        aria-labelledby="packages-title"
        aria-label={copy.websiteDevelopment.title}
        className="py-section scroll-mt-20 bg-surface"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-small font-semibold uppercase text-brand">
              {copy.websiteDevelopment.eyebrow}
            </p>
            <h2 id="packages-title" className="mt-2 text-heading font-bold text-ink">
              {copy.websiteDevelopment.title}
            </h2>
            <p className="mt-3 text-pretty text-muted">
              {copy.websiteDevelopment.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {websitePackages.map((pkg, index) => {
              const content = copy.websiteDevelopment.packages[pkg.id];
              return (
                <article
                  key={pkg.id}
                  aria-labelledby={`pkg-${pkg.id}`}
                  className="relative flex flex-col justify-between rounded-card border border-border bg-surface p-6 shadow-xs transition-colors hover:border-brand/40 md:p-7"
                >
                  <div>
                    <header className="border-b border-border pb-6">
                      <p className="text-small font-semibold uppercase text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3
                        id={`pkg-${pkg.id}`}
                        className="mt-4 text-xl font-bold text-ink"
                      >
                        {content.name}
                      </h3>
                      <p className="mt-3 text-3xl font-bold text-brand">
                        {content.price}
                      </p>
                      <p className="mt-3 text-small text-muted">
                        {content.description}
                      </p>
                    </header>

                    <div className="pt-6">
                      <p className="text-small font-semibold text-ink">
                        {copy.websiteDevelopment.includesLabel}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {content.features.map((feature, featureIndex) => (
                          <li
                            key={`${pkg.id}-feat-${featureIndex}`}
                            className="flex items-start gap-2.5 text-small text-muted"
                          >
                            <Check
                              aria-hidden="true"
                              size={16}
                              className="mt-0.5 shrink-0 text-brand"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 border-t border-border pt-4">
                        <p className="text-xs text-muted">
                          <span className="font-semibold text-ink">
                            {copy.websiteDevelopment.scopeNotesLabel}{" "}
                          </span>
                          {content.scopeNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Button
                      href={inquiryUrl(contact, pkg.inquiryKey)}
                      className="w-full justify-center"
                      aria-label={`${copy.websiteDevelopment.ctaLabel}: ${content.name}`}
                    >
                      {copy.websiteDevelopment.ctaLabel}
                      <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 3 — CUSTOM WEB APPLICATIONS */}
      <section
        aria-labelledby="custom-dev-title"
        className="py-12 md:py-16"
      >
        <Container>
          <div
            className={`${background.grid} ${background.inverseGrid} rounded-card border border-border-inverse bg-brand p-8 text-on-brand md:p-12 lg:p-16`}
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
              <div>
                <div className="inline-flex items-center rounded-control border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  <span>{copy.customDevelopment.eyebrow}</span>
                </div>
                <h2
                  id="custom-dev-title"
                  className="mt-4 text-heading font-bold text-on-brand"
                >
                  {copy.customDevelopment.title}
                </h2>
                <div className="mt-4 inline-block rounded-control bg-white/10 px-4 py-1.5 text-lg font-bold text-accent">
                  {copy.customDevelopment.price}
                </div>
                <p className="mt-4 text-pretty text-on-brand-muted">
                  {copy.customDevelopment.description}
                </p>
                <p className="mt-3 text-small text-on-brand-muted/80">
                  {copy.customDevelopment.priceNotice}
                </p>

                <div className="mt-8">
                  <Button
                    href={inquiryUrl(contact, "custom-development")}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    {copy.customDevelopment.cta}
                    <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
                  </Button>
                </div>
              </div>

              <div className="rounded-card border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-small font-semibold uppercase tracking-wide text-on-brand-muted">
                  {copy.customDevelopment.capabilitiesTitle}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {copy.customDevelopment.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="rounded-control border border-white/15 bg-white/10 px-3 py-1.5 text-small text-white"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 4 — ADDITIONAL SERVICES */}
      <section
        aria-labelledby="additional-services-title"
        className="py-section bg-surface-muted"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-small font-semibold uppercase text-brand">
              {copy.additionalServices.eyebrow}
            </p>
            <h2
              id="additional-services-title"
              className="mt-2 text-heading font-bold text-ink"
            >
              {copy.additionalServices.title}
            </h2>
            <p className="mt-3 text-pretty text-muted">
              {copy.additionalServices.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {additionalServices.map((svc) => {
              const content = copy.additionalServices.services[svc.id];
              return (
                <article
                  key={svc.id}
                  aria-labelledby={`svc-${svc.id}`}
                  className="flex flex-col justify-between rounded-card border border-border bg-surface p-6 shadow-xs transition-colors hover:border-brand/40 md:p-8"
                >
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                      <h3
                        id={`svc-${svc.id}`}
                        className="text-lg font-bold text-ink"
                      >
                        {content.name}
                      </h3>
                      <span className="text-xl font-bold text-brand">
                        {content.price}
                      </span>
                    </div>
                    <p className="mt-4 text-pretty text-small text-muted">
                      {content.description}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Button
                      href={inquiryUrl(contact, svc.inquiryKey)}
                      variant="secondary"
                      className="w-full justify-center sm:w-auto"
                      aria-label={`${copy.additionalServices.ctaLabel}: ${content.name}`}
                    >
                      {copy.additionalServices.ctaLabel}
                      <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 5 — HOSTING & TECHNICAL MAINTENANCE */}
      <section
        aria-labelledby="maintenance-title"
        className="py-section bg-surface"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-small font-semibold uppercase text-brand">
              {copy.maintenance.eyebrow}
            </p>
            <h2
              id="maintenance-title"
              className="mt-2 text-heading font-bold text-ink"
            >
              {copy.maintenance.title}
            </h2>
            <p className="mt-3 text-pretty text-muted">
              {copy.maintenance.description}
            </p>
            <p className="mt-2 text-small font-medium text-brand">
              {copy.maintenance.notice}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {carePlans.map((plan) => {
              const content = copy.maintenance.plans[plan.id];
              return (
                <article
                  key={plan.id}
                  aria-labelledby={`plan-${plan.id}`}
                  className="flex flex-col justify-between rounded-card border border-border bg-surface p-6 shadow-xs transition-colors hover:border-brand/40 md:p-7"
                >
                  <header className="border-b border-border pb-5">
                    <span className="inline-block rounded-control bg-accent-soft px-2.5 py-1 text-xs font-semibold text-brand">
                      {content.target}
                    </span>
                    <h3
                      id={`plan-${plan.id}`}
                      className="mt-3 text-lg font-bold text-ink"
                    >
                      {content.name}
                    </h3>
                    <p className="mt-3 text-2xl font-bold text-brand">
                      {content.price}
                    </p>
                  </header>

                  <div className="flex flex-1 flex-col justify-between pt-5">
                    <ul className="space-y-2.5">
                      {content.features.map((feature, idx) => (
                        <li
                          key={`${plan.id}-feat-${idx}`}
                          className="flex items-start gap-2.5 text-small text-muted"
                        >
                          <Check
                            aria-hidden="true"
                            size={16}
                            className="mt-0.5 shrink-0 text-brand"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 border-t border-border pt-4 text-xs text-muted">
                      {content.scopeNote}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 6 — HOW WE WORK (PROCESS) */}
      <section
        aria-labelledby="process-title"
        className="py-section border-t border-border bg-surface-muted"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-small font-semibold uppercase text-brand">
              {copy.process.eyebrow}
            </p>
            <h2
              id="process-title"
              className="mt-2 text-heading font-bold text-ink"
            >
              {copy.process.title}
            </h2>
            <p className="mt-3 text-pretty text-muted">
              {copy.process.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.process.steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col rounded-card border border-border bg-surface p-6 shadow-xs md:p-8"
              >
                <span className="text-small font-semibold tabular-nums text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-pretty text-small text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 7 — IMPORTANT NOTES */}
      <section
        aria-labelledby="pricing-notes-title"
        className="border-y border-border bg-surface py-12 md:py-16"
      >
        <Container className="grid gap-8 text-center lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:text-left">
          <div>
            <h2
              id="pricing-notes-title"
              className="text-heading font-bold text-ink"
            >
              {copy.notes.title}
            </h2>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {copy.notes.items.map((item, index) => (
              <li
                key={item}
                className="grid gap-3 py-5 lg:grid-cols-[3rem_minmax(0,1fr)] lg:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="text-small font-semibold tabular-nums text-brand"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-pretty text-muted">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* GUIDE BANNER */}
      {copy.guideBanner ? (
        <section
          aria-labelledby="pricing-guide-banner"
          className="border-b border-border bg-surface-muted py-12 md:py-16"
        >
          <Container className="flex flex-col items-center justify-between gap-6 rounded-card border border-border bg-surface p-8 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              {copy.guideBanner.eyebrow ? (
                <p className="text-small font-semibold uppercase text-brand">
                  {copy.guideBanner.eyebrow}
                </p>
              ) : null}
              <h3
                id="pricing-guide-banner"
                className="mt-2 text-subheading font-bold text-ink"
              >
                {copy.guideBanner.title}
              </h3>
              <p className="mt-2 text-pretty text-muted">
                {copy.guideBanner.description}
              </p>
            </div>
            <Button
              href={localizedBlogPostPath(
                "koliko-kosta-izrada-web-sajta-u-srbiji-2026",
                locale,
              )}
              variant="secondary"
              className="shrink-0"
            >
              {copy.guideBanner.label}
              <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
            </Button>
          </Container>
        </section>
      ) : null}

      {/* SECTION 8 — FAQ */}
      <section
        id="faq"
        aria-labelledby="pricing-questions"
        className="py-section bg-surface"
      >
        <Container className="grid gap-10 text-center lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:text-left">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-small font-semibold uppercase text-brand">
              {copy.faq.eyebrow}
            </p>
            <h2
              id="pricing-questions"
              className="mx-auto max-w-md text-heading font-bold text-ink lg:mx-0"
            >
              {copy.faq.title}
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-pretty text-muted lg:mx-0">
              {copy.faq.description}
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border text-left">
            {copy.faq.items.map((item, itemIndex) => (
              <details
                key={item.id}
                className="group"
                open={itemIndex === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-brand marker:hidden">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="relative size-5 shrink-0"
                  >
                    <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-current transition-transform group-open:rotate-90 group-open:scale-0" />
                  </span>
                </summary>

                <div className="space-y-4 pb-7 text-muted">
                  {item.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${item.id}-p-${paragraphIndex}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section
        aria-labelledby="pricing-contact"
        className={`${background.grid} ${background.inverseGrid} bg-brand py-14 text-on-brand md:py-18 lg:py-20`}
      >
        <Container className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
          <div className="max-w-2xl">
            <p className="mb-3 text-small font-semibold uppercase text-on-brand-muted">
              {copy.cta.eyebrow}
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
