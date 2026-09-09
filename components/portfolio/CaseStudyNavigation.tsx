import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

export function CaseStudyNavigation({ nextProject, locale, copy }: { nextProject?: Project; locale: Locale; copy: Dictionary }) {
  return (
    <nav aria-label={copy.caseStudy.navigation} className="border-t border-border bg-surface-muted py-8 md:py-10">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-12">
        <Link href={localizedPath("portfolio", locale)} className="inline-flex min-h-11 shrink-0 items-center font-medium text-brand underline underline-offset-4 hover:text-focus">
          {copy.actions.allProjects}
        </Link>
        {nextProject && (
          <Link href={localizedProjectPath(nextProject.slug, locale)} className="group flex min-h-11 min-w-0 items-center gap-6 text-brand sm:text-right">
            <span className="min-w-0">
              <span className="block text-small text-muted">{copy.caseStudy.nextProject}</span>
              <span className="mt-1 block text-subheading font-semibold wrap-break-word group-hover:underline" translate="no">{nextProject.title}</span>
            </span>
            <ArrowRight aria-hidden="true" size={24} className="shrink-0" />
          </Link>
        )}
      </Container>
    </nav>
  );
}
