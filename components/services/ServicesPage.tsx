import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary, ServiceDetail, ServiceItem } from "@/content/i18n/types";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

interface ServiceVisual {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  className?: string;
}

const overviewVisual: ServiceVisual = {
  src: "/images/website-maintenance.webp",
  width: 1440,
  height: 1202,
  alt: {
    sr: "Laptop sa prikazom web sajta na radnom stolu.",
    en: "Laptop showing a website on a work desk.",
  },
  className: "object-cover",
};

const serviceDetailVisuals: Record<string, ServiceVisual> = {
  "website-build": {
    src: "/projects/casovi-francuskog.webp",
    width: 1351,
    height: 827,
    alt: {
      sr: "Prikaz početne stranice web sajta Časovi Francuskog.",
      en: "Casovi Francuskog website homepage.",
    },
    className: "object-contain",
  },
  "design-ux": {
    src: "/projects/ilic-enterijer.webp",
    width: 1894,
    height: 868,
    alt: {
      sr: "Prikaz web sajta Ilić Enterijer kao primer vizuelne organizacije sadržaja.",
      en: "Ilić Enterijer website shown as an example of visual content organization.",
    },
    className: "object-contain",
  },
  "development-options": {
    src: "/projects/buy-pallet-jacks.webp",
    width: 1536,
    height: 1024,
    alt: {
      sr: "Prikaz web sajta Buy Pallet Jacks.",
      en: "Buy Pallet Jacks website screen.",
    },
    className: "object-contain",
  },
  "seo-performance": {
    src: "/projects/os-dule-karaklajic.webp",
    width: 1877,
    height: 868,
    alt: {
      sr: "Prikaz web sajta OŠ Dule Karaklajić sa jasnom strukturom stranice.",
      en: "OŠ Dule Karaklajić website screen with a clear page structure.",
    },
    className: "object-contain",
  },
  "maintenance-support": overviewVisual,
};

function NumberedService({ item, index }: { item: ServiceItem; index: number }) {
  return (
    <li className="grid gap-3 border-t border-border py-6 text-center md:py-8 lg:grid-cols-[3rem_minmax(0,1fr)] lg:gap-6 lg:text-left">
      <span aria-hidden="true" className="text-small font-semibold tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3 className="text-subheading font-semibold text-brand">{item.title}</h3>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted lg:mx-0">{item.description}</p>
      </div>
    </li>
  );
}

function ServiceDetailCard({ item, index, locale }: { item: ServiceDetail; index: number; locale: Locale }) {
  const visual = serviceDetailVisuals[item.id] ?? overviewVisual;
  const featured = index === 0;

  return (
    <article className={`overflow-hidden rounded-card border border-border bg-surface text-center lg:text-left ${featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr]" : ""}`}>
      <div className={`relative bg-surface-muted ${featured ? "min-h-72 lg:min-h-full" : "aspect-[16/10]"}`}>
        <Image
          src={visual.src}
          alt={visual.alt[locale]}
          width={visual.width}
          height={visual.height}
          sizes={featured ? "(min-width: 1024px) 660px, 100vw" : "(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"}
          quality={85}
          className={`h-full w-full ${visual.className ?? "object-cover"}`}
        />
      </div>
      <div className="p-6 md:p-8">
        <p className="text-small font-semibold tabular-nums text-brand">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-5 text-subheading font-semibold text-ink">{item.title}</h3>
        <p className="mt-4 text-pretty text-muted">{item.description}</p>
        <p className="mt-4 border-t border-border pt-4 text-pretty text-muted">{item.when}</p>
      </div>
    </article>
  );
}

export function ServicesPage({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const services = copy.services;
  const contact = localizedPath("contact", locale);
  const pricing = localizedPath("pricing", locale);
  const portfolio = localizedPath("portfolio", locale);
  const proofProjects = projects.slice(0, 3);

  return (
    <>
      <section aria-labelledby="services-page-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
        <Container className="grid gap-6 text-center lg:grid-cols-2 lg:items-end lg:gap-12 lg:text-left">
          <div>
            <p className="mb-4 text-small font-medium text-on-brand-muted">{services.intro.eyebrow}</p>
            <h1 id="services-page-title" className="text-display font-bold">{services.intro.title}</h1>
          </div>
          <p className="mx-auto max-w-lg text-pretty text-on-brand-muted lg:mx-0">{services.intro.description}</p>
        </Container>
      </section>

      <section aria-labelledby="services-overview-title" className="py-section">
        <Container className="grid gap-10 text-center lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:text-left">
          <div>
            <p className="mb-4 text-small font-semibold uppercase text-brand">{services.overview.eyebrow}</p>
            <h2 id="services-overview-title" className="text-heading font-bold text-ink">{services.overview.title}</h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-muted lg:mx-0">{services.overview.description}</p>
            <div className="relative mx-auto mt-8 aspect-[6/5] overflow-hidden rounded-card bg-surface-muted md:max-w-md lg:mx-0">
              <Image
                src={overviewVisual.src}
                alt={overviewVisual.alt[locale]}
                width={overviewVisual.width}
                height={overviewVisual.height}
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw"
                quality={85}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <ol className="border-b border-border">
            {services.overview.items.map((item, index) => <NumberedService key={item.id} item={item} index={index} />)}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="services-details-title" className="bg-surface-muted py-section">
        <Container className="text-center lg:text-left">
          <div className="mx-auto mb-8 max-w-3xl md:mb-12 lg:mx-0">
            <p className="mb-4 text-small font-semibold uppercase text-brand">{services.details.eyebrow}</p>
            <h2 id="services-details-title" className="text-heading font-bold text-ink">{services.details.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted lg:mx-0">{services.details.description}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.details.items.map((item, index) => <ServiceDetailCard key={item.id} item={item} index={index} locale={locale} />)}
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-audience-title" className="py-section">
        <Container className="grid gap-8 text-center lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20 lg:text-left">
          <div>
            <p className="mb-4 text-small font-semibold uppercase text-brand">{services.audience.eyebrow}</p>
            <h2 id="services-audience-title" className="text-heading font-bold text-ink">{services.audience.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-muted lg:mx-0">{services.audience.description}</p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {services.audience.items.map((item) => (
              <li key={item} className="py-5 text-subheading font-medium text-brand">{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="services-process-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-section text-on-brand`}>
        <Container className="text-center lg:text-left">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
            <div>
              <p className="mb-4 text-small font-semibold uppercase text-on-brand-muted">{services.process.eyebrow}</p>
              <h2 id="services-process-title" className="text-heading font-bold">{services.process.title}</h2>
            </div>
            <p className="mx-auto max-w-xl text-pretty text-on-brand-muted lg:mx-0">{services.process.description}</p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-card border border-border-inverse bg-border-inverse lg:grid-cols-3">
            {services.process.items.map((item, index) => (
              <li key={item.id} className="min-h-52 bg-brand p-6 md:p-8">
                <span aria-hidden="true" className="text-small font-semibold tabular-nums text-on-brand-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-subheading font-semibold">{item.title}</h3>
                <p className="mt-4 text-pretty text-on-brand-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="services-principles-title" className="py-section">
        <Container className="text-center lg:text-left">
          <div className="mx-auto mb-10 max-w-3xl lg:mx-0">
            <p className="mb-4 text-small font-semibold uppercase text-brand">{services.principles.eyebrow}</p>
            <h2 id="services-principles-title" className="text-heading font-bold text-ink">{services.principles.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted lg:mx-0">{services.principles.description}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {services.principles.items.map((item) => (
              <section key={item.id} aria-labelledby={`principle-${item.id}`} className="border-t border-border pt-5">
                <h3 id={`principle-${item.id}`} className="text-lg font-semibold text-brand">{item.title}</h3>
                <p className="mt-3 text-pretty text-muted">{item.description}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-proof-title" className="bg-surface-muted py-12 md:py-16">
        <Container className="grid gap-10 text-center lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:text-left">
          <div>
            <p className="mb-4 text-small font-semibold uppercase text-brand">{services.proof.eyebrow}</p>
            <h2 id="services-proof-title" className="text-heading font-bold text-ink">{services.proof.title}</h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-muted lg:mx-0">{services.proof.description}</p>
            <Link href={portfolio} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline underline-offset-4 hover:text-focus">
              {copy.actions.allProjects}
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {proofProjects.map((project) => (
              <article key={project.slug} className="grid gap-3 py-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
                <h3 className="text-subheading font-semibold text-brand" translate="no">{project.title}</h3>
                <div>
                  <p className="mx-auto max-w-xl text-pretty text-muted lg:mx-0">{project.caseStudy?.overview[locale]}</p>
                  <Link href={localizedProjectPath(project.slug, locale)} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline underline-offset-4 hover:text-focus">
                    {copy.actions.viewProject}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-pricing-title" className="py-12 md:py-16">
        <Container className="grid gap-8 text-center lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:text-left">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="mb-3 text-small font-semibold uppercase text-brand">{services.pricing.eyebrow}</p>
            <h2 id="services-pricing-title" className="text-subheading font-bold text-ink">{services.pricing.title}</h2>
            <p className="mt-3 text-pretty text-muted">{services.pricing.description}</p>
          </div>
          <Button href={pricing} variant="secondary" className="justify-self-center lg:justify-self-start">{services.pricing.label}</Button>
        </Container>
      </section>

      <section aria-labelledby="services-contact-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
        <Container className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
          <div className="max-w-2xl">
            <p className="mb-3 text-small font-semibold uppercase text-on-brand-muted">{services.cta.eyebrow}</p>
            <h2 id="services-contact-title" className="text-heading font-bold">{services.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-on-brand-muted lg:mx-0">{services.cta.description}</p>
          </div>
          <Button href={contact} variant="secondary" className="shrink-0">
            {services.cta.label}
            <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
          </Button>
        </Container>
      </section>
    </>
  );
}
