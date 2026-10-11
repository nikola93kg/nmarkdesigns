"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface CtaButtonProps {
  href: string;
  ctaName: string;
  ctaLocation: string;
  locale: "sr" | "en";
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
  children: ReactNode;
}

export function CtaButton({
  href,
  ctaName,
  ctaLocation,
  locale,
  variant = "primary",
  className,
  external,
  children,
}: CtaButtonProps) {
  function handleClick() {
    trackEvent("click_cta", {
      cta_name: ctaName,
      cta_location: ctaLocation,
      locale,
    });
  }

  return (
    <Button
      href={href}
      variant={variant}
      className={className}
      external={external}
      onClick={handleClick}
      data-cta-name={ctaName}
      data-cta-location={ctaLocation}
    >
      {children}
    </Button>
  );
}
