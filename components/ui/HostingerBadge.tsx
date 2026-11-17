import Image from "next/image";
import { getHostingerCopy } from "@/content/partners";
import type { Locale } from "@/lib/i18n";

export function HostingerBadge({ locale, inverse = false }: { locale: Locale; inverse?: boolean }) {
  return (
    <Image
      src={inverse ? "/logo/hostinger-logo/badge-brand-dark-320x120.png" : "/logo/hostinger-logo/badge-brand-light-320x120.webp"}
      alt={getHostingerCopy(locale).label}
      width={160}
      height={60}
      className="h-11 w-auto shrink-0 object-contain"
    />
  );
}
