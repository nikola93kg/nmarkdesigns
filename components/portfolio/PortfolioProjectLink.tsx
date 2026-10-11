"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface CaseStudyClickLinkProps {
  href: string;
  projectSlug: string;
  position: number;
  locale: "sr" | "en";
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
}

export function CaseStudyClickLink({
  href,
  projectSlug,
  position,
  locale,
  className,
  "aria-label": ariaLabel,
  children,
}: CaseStudyClickLinkProps) {
  function handleClick() {
    trackEvent("click_proof_case_study", {
      project_slug: projectSlug,
      card_position: position,
      locale,
    });
  }

  return (
    <Link href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function CaseStudyButtonLink({
  href,
  projectSlug,
  position,
  locale,
  className,
  "aria-label": ariaLabel,
  children,
}: CaseStudyClickLinkProps) {
  function handleClick() {
    trackEvent("click_proof_case_study", {
      project_slug: projectSlug,
      card_position: position,
      locale,
    });
  }

  return (
    <Button
      href={href}
      variant="primary"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </Button>
  );
}

interface ExternalProjectLinkProps {
  href: string;
  projectSlug: string;
  domain: string;
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
}

export function ExternalProjectLink({
  href,
  projectSlug,
  domain,
  className,
  "aria-label": ariaLabel,
  children,
}: ExternalProjectLinkProps) {
  function handleClick() {
    trackEvent("click_external_project", {
      project_slug: projectSlug,
      destination_domain: domain,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
