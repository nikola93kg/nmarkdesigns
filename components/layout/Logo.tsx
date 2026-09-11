import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

interface LogoProps {
  locale: Locale;
  label: string;
  variant?: "wordmark" | "seal";
}

export function Logo({ variant = "wordmark", locale, label }: LogoProps) {
  const isSeal = variant === "seal";

  return (
      <Link
          href={localizedPath("home", locale)}
          aria-label={label}
          className={
            isSeal
                ? "inline-flex size-[195px] shrink-0 items-center justify-center"
                : "inline-flex min-h-12 shrink-0 items-center justify-center"
          }
      >
        <Image
            src={isSeal ? "/logo/nmark-footer.webp" : "/logo/nmark-wordmark.png"}
            alt="NMark Designs"
            width={isSeal ? 787 : 785}
            height={isSeal ? 775 : 234}
            sizes={isSeal ? "195px" : "(min-width: 768px) 160px, 144px"}
            className={
              isSeal
                  ? "size-[195px] object-contain"
                  : "h-auto w-36 md:w-40"
            }
        />
      </Link>
  );
}