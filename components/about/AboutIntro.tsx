import Image from "next/image";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import { aboutHeroImage } from "@/content/about";
import type { Dictionary } from "@/content/i18n/types";

export function AboutIntro({ copy }: { copy: Dictionary["about"]["intro"] }) {
  return (
    <section aria-labelledby="about-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
        <div className="text-center lg:text-left">
          <p className="mb-4 text-small font-medium text-on-brand-muted" translate="no">{copy.eyebrow}</p>
          <h1 id="about-title" className="mx-auto max-w-3xl text-display font-bold lg:mx-0">{copy.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-on-brand-muted lg:mx-0">{copy.description}</p>
        </div>
        <figure className="mx-auto w-full max-w-3xl lg:mx-0">
          <Image
            {...aboutHeroImage}
            alt={copy.imageAlt}
            priority
            sizes="(min-width: 1280px) 704px, (min-width: 1024px) 54vw, calc(100vw - 40px)"
            quality={88}
            className="aspect-[1370/1148] h-auto w-full rounded-card object-cover shadow-2xl shadow-black/25"
          />
          <figcaption className="mt-4 text-small text-on-brand-muted">{copy.imageCaption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
