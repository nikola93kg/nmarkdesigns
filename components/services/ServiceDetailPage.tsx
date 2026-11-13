import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import { projects } from "@/content/projects";
import type { ServiceDetailDefinition } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

interface ServiceDetailPageProps {
  service: ServiceDetailDefinition;
  locale: Locale;
  copy: Dictionary;
}

export function ServiceDetailPage({ service, locale, copy }: ServiceDetailPageProps) {
  const contactHref = `${localizedPath("contact", locale)}?service=${encodeURIComponent(service.key)}`;
  const pricingHref = `${localizedPath("pricing", locale)}#${service.pricingAnchor}`;
  const relatedProject = projects.find((project) => project.slug === service.relatedCaseStudySlug);

  return (
    <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
      {/* 1. Hero & Breadcrumbs Section */}
      <section className={`relative overflow-hidden border-b border-border py-12 md:py-20 lg:py-28 ${background.gridPattern}`}>
        <Container>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-small text-muted">
              <li>
                <Link href={localizedPath("home", locale)} className="hover:text-brand transition-colors">
                  {copy.navigation.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={localizedPath("services", locale)} className="hover:text-brand transition-colors">
                  {copy.navigation.services}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-brand" aria-current="page">
                {service.eyebrow[locale]}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-small font-semibold tracking-wider uppercase text-muted">
              {service.eyebrow[locale]}
            </span>
            <h1 className="mt-4 text-display font-bold tracking-tight text-brand">
              {service.heroTitle[locale]}
            </h1>
            <p className="mt-6 text-lead text-muted leading-relaxed">
              {service.heroDescription[locale]}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-small uppercase tracking-wider text-muted font-medium">
                {locale === "sr" ? "Početna cena:" : "Starting investment:"}
              </span>
              <span className="text-subheading font-bold text-brand">
                {service.startingPrice[locale]}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton
                href={contactHref}
                ctaName={`service_${service.key}_inquiry`}
                ctaLocation="service_detail_hero"
                locale={locale}
                variant="primary"
              >
                {locale === "sr" ? "Zatražite ponudu" : "Request a quote"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CtaButton>
              <Button href={pricingHref} variant="secondary">
                {locale === "sr" ? "Pogledajte cenovnik" : "View pricing"}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Target Audience Section */}
      <section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <span className="text-small font-semibold uppercase tracking-wider text-muted">
                {locale === "sr" ? "Kome je namenjeno" : "Ideal Fit"}
              </span>
              <h2 className="mt-3 text-heading font-bold text-brand">
                {service.audience.title[locale]}
              </h2>
              <p className="mt-4 text-body text-muted leading-relaxed">
                {service.audience.description[locale]}
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {service.audience.items[locale].map((item, index) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:border-brand/30"
                >
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                  <span className="text-body text-brand font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 3. Scope of Work (Deliverables) */}
      <section className="bg-surface-elevated/40 border-y border-border py-16 md:py-24">
        <Container>
          <div className="max-w-2xl text-center mx-auto mb-16">
            <span className="text-small font-semibold uppercase tracking-wider text-muted">
              {locale === "sr" ? "Obim usluge" : "Scope of Work"}
            </span>
            <h2 className="mt-3 text-heading font-bold text-brand">
              {service.scope.title[locale]}
            </h2>
            <p className="mt-4 text-body text-muted">
              {service.scope.description[locale]}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 shadow-sm"
              >
                <div>
                  <span className="text-small font-bold tabular-nums text-muted" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-subheading font-bold text-brand">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-3 text-small text-muted leading-relaxed">
                    {item.description[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Tech Stack & Engineering Standards */}
      <section>
        <Container>
          <div className="rounded-2xl border border-border bg-surface p-8 md:p-12">
            <div className="max-w-2xl">
              <span className="text-small font-semibold uppercase tracking-wider text-muted">
                {locale === "sr" ? "Inženjerski standardi" : "Engineering Standards"}
              </span>
              <h2 className="mt-3 text-heading font-bold text-brand">
                {service.techStack.title[locale]}
              </h2>
              <p className="mt-4 text-body text-muted leading-relaxed">
                {service.techStack.description[locale]}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {service.techStack.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-lg border border-border bg-surface-elevated px-4 py-2 text-small font-medium text-brand"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Process Timeline */}
      <section>
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="text-small font-semibold uppercase tracking-wider text-muted">
              {locale === "sr" ? "Strukturiran tok" : "Structured Lifecycle"}
            </span>
            <h2 className="mt-3 text-heading font-bold text-brand">
              {service.process.title[locale]}
            </h2>
            <p className="mt-4 text-body text-muted">
              {service.process.description[locale]}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.steps.map((step) => (
              <div key={step.step} className="border-t-2 border-brand/20 pt-6">
                <span className="text-display font-bold text-brand/30 tabular-nums">
                  {step.step}
                </span>
                <h3 className="mt-2 text-subheading font-bold text-brand">
                  {step.title[locale]}
                </h3>
                <p className="mt-3 text-small text-muted leading-relaxed">
                  {step.description[locale]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Featured Case Study from Portfolio */}
      {relatedProject && (
        <section className="bg-surface-elevated/40 border-y border-border py-16 md:py-24">
          <Container>
            <div className="max-w-2xl mb-10">
              <span className="text-small font-semibold uppercase tracking-wider text-muted">
                {locale === "sr" ? "Primer iz prakse" : "Real-World Evidence"}
              </span>
              <h2 className="mt-3 text-heading font-bold text-brand">
                {locale === "sr" ? "Kako ova usluga izgleda u praksi" : "How this service delivers in practice"}
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              {relatedProject.featuredImage && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
                  <Image
                    src={relatedProject.featuredImage.src}
                    alt={relatedProject.featuredImage.alt[locale]}
                    width={relatedProject.featuredImage.width}
                    height={relatedProject.featuredImage.height}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}

              <div className="flex flex-col justify-center">
                <span className="text-small font-medium text-muted">
                  {relatedProject.category?.[locale] ?? "Portfolio"}
                  {relatedProject.location ? ` · ${relatedProject.location}` : ""}
                </span>
                <h3 className="mt-2 text-subheading font-bold text-brand">
                  {relatedProject.title}
                </h3>
                <p className="mt-4 text-body text-muted leading-relaxed">
                  {relatedProject.shortDescription?.[locale]}
                </p>

                {relatedProject.caseStudy && (
                  <div className="mt-8">
                    <Button
                      href={localizedProjectPath(relatedProject.slug, locale)}
                      variant="primary"
                    >
                      {locale === "sr" ? "Pogledajte studiju slučaja" : "Explore full case study"}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 7. Frequently Asked Questions (FAQ & AEO) */}
      <section>
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="text-small font-semibold uppercase tracking-wider text-muted">
              FAQ
            </span>
            <h2 className="mt-3 text-heading font-bold text-brand">
              {locale === "sr" ? "Česta pitanja o ovoj usluzi" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="grid gap-6 max-w-4xl">
            {service.faq.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-surface p-6 md:p-8 shadow-sm"
              >
                <h3 className="text-subheading font-bold text-brand">
                  {item.question[locale]}
                </h3>
                <div className="mt-4 flex flex-col gap-3 text-body text-muted leading-relaxed">
                  {item.answer[locale].map((p, pIndex) => (
                    <p key={pIndex}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Conversion Bottom CTA */}
      <section className="border-t border-border bg-surface-elevated/60 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl text-center mx-auto">
            <h2 className="text-display font-bold text-brand">
              {locale === "sr"
                ? "Spremni da unapredite vaš online nastup?"
                : "Ready to elevate your digital presence?"}
            </h2>
            <p className="mt-4 text-lead text-muted">
              {locale === "sr"
                ? "Javite se sa osnovnim detaljima o vašem poslu i dobićete transparentnu ponudu bez obaveze."
                : "Share your project goals and receive a clear, no-obligation engineering proposal directly from the developer."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CtaButton
                href={contactHref}
                ctaName={`service_${service.key}_bottom_inquiry`}
                ctaLocation="service_detail_bottom"
                locale={locale}
                variant="primary"
              >
                {locale === "sr" ? "Zatražite ponudu" : "Request a quote"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CtaButton>
              <Button href={localizedPath("services", locale)} variant="secondary">
                {locale === "sr" ? "Sve usluge" : "All services"}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
