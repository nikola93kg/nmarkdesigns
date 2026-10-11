"use client";

import type { ReactNode } from "react";
import { trackEvent, type ContactMethod } from "@/lib/analytics";

interface ContactDirectLinkProps {
  href: string;
  method: ContactMethod;
  location: string;
  locale: "sr" | "en";
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export function ContactDirectLink({
  href,
  method,
  location,
  locale,
  className,
  target,
  rel,
  children,
  "aria-label": ariaLabel,
}: ContactDirectLinkProps) {
  function handleClick() {
    trackEvent("contact_direct", {
      contact_method: method,
      cta_location: location,
      locale,
    });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      data-contact-method={method}
      data-cta-location={location}
    >
      {children}
    </a>
  );
}
