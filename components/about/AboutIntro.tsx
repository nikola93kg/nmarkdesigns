import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";

export function AboutIntro({ copy }: { copy: Dictionary["about"]["intro"] }) {
  return (
    <section aria-labelledby="about-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
      <Container className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
        <div>
          <p className="mb-4 text-small font-medium text-on-brand-muted" translate="no">{copy.eyebrow}</p>
          <h1 id="about-title" className="text-display font-bold">{copy.title}</h1>
        </div>
        <p className="max-w-lg text-pretty text-on-brand-muted">{copy.description}</p>
      </Container>
    </section>
  );
}
