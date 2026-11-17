"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { getHostingerCopy, hostingerPartner, type HostingerPlacement } from "@/content/partners";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type PartnerLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "rel" | "onClick"> & {
  locale: Locale;
  placement: HostingerPlacement;
  href?: string;
};

export function HostingerLink({ locale, placement, href = hostingerPartner.url, children, ...props }: PartnerLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      data-partner="hostinger"
      data-partner-placement={placement}
      onClick={() => trackEvent("click_partner", {
        partner_name: "hostinger",
        partner_placement: placement,
        locale,
        destination_domain: new URL(href).hostname,
      })}
    >
      {children}
      <span className="sr-only"> ({getHostingerCopy(locale).newTab})</span>
    </a>
  );
}

type PartnerDetailsProps = Omit<PartnerLinkProps, "href"> & { href: string };

export function HostingerDetailsLink({ locale, placement, href, children, ...props }: PartnerDetailsProps) {
  return (
    <Link
      {...props}
      href={href}
      onClick={() => trackEvent("click_cta", {
        cta_name: "hostinger_details",
        cta_location: placement,
        locale,
      })}
    >
      {children}
    </Link>
  );
}
