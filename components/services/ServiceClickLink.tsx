"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface ServiceClickLinkProps {
  href: string;
  serviceSlug: string;
  locale: "sr" | "en";
  className?: string;
  children: ReactNode;
}

export function ServiceClickLink({
  href,
  serviceSlug,
  locale,
  className,
  children,
}: ServiceClickLinkProps) {
  function handleClick() {
    trackEvent("click_service", {
      service_slug: serviceSlug,
      locale,
    });
  }

  return (
    <Link href={href} onClick={handleClick} className={className} data-service-slug={serviceSlug}>
      {children}
    </Link>
  );
}
