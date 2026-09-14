import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { founderPortrait } from "@/content/about";
import type { Dictionary } from "@/content/i18n/types";

export function AboutProfile({ copy }: { copy: Dictionary["about"]["profile"] }) {
  return (
    <section aria-labelledby="about-profile-title" className="py-section">
      <Container className="grid items-start gap-10 text-center lg:grid-cols-[1.3fr_1fr] lg:gap-20 lg:text-left">
        <div>
          <p className="mb-4 text-small font-medium text-brand">{copy.eyebrow}</p>
          <h2 id="about-profile-title" className="mx-auto max-w-xl text-heading font-bold lg:mx-0">{copy.title}</h2>
          <div className="mx-auto mt-6 max-w-prose space-y-5 text-pretty text-muted lg:mx-0">
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <figure className="mx-auto w-full max-w-80 lg:mx-0 lg:ml-auto lg:max-w-100">
          <Image
            {...founderPortrait}
            alt={copy.imageAlt}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 40vw, (min-width: 375px) 320px, calc(100vw - 40px)"
            quality={85}
            className="aspect-2/3 h-auto w-full rounded-card object-contain"
          />
          <figcaption className="mt-4 text-small text-muted">{copy.caption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
