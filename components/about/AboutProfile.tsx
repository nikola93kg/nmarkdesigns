import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { aboutIdentityImage } from "@/content/about";
import type { Dictionary } from "@/content/i18n/types";

export function AboutProfile({ copy }: { copy: Dictionary["about"]["profile"] }) {
  return (
    <section aria-labelledby="about-profile-title" className="py-section">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <figure className="mx-auto w-full max-w-xl lg:mx-0">
          <Image
            {...aboutIdentityImage}
            alt={copy.imageAlt}
            sizes="(min-width: 1024px) 520px, (min-width: 768px) 70vw, calc(100vw - 40px)"
            quality={88}
            className="aspect-square h-auto w-full rounded-card object-cover"
          />
          <figcaption className="mt-4 text-small text-muted">{copy.caption}</figcaption>
        </figure>
        <div className="text-center lg:text-left">
          <p className="mb-4 text-small font-medium text-brand">{copy.eyebrow}</p>
          <h2 id="about-profile-title" className="mx-auto max-w-xl text-heading font-bold lg:mx-0">{copy.title}</h2>
          <div className="mx-auto mt-6 max-w-prose space-y-5 text-pretty text-muted lg:mx-0">
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
