import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "wordmark" | "seal";
}

export function Logo({ variant = "wordmark" }: LogoProps) {
  const isSeal = variant === "seal";

  return (
    <Link
      href="/"
      aria-label="NMark Designs - početna"
      className={`inline-flex shrink-0 items-center justify-center ${isSeal ? "size-32 rounded-full bg-surface" : "min-h-12"}`}
    >
      <Image
        src={isSeal ? "/logo/nmark-seal.png" : "/logo/nmark-wordmark.png"}
        alt="NMark Designs"
        width={isSeal ? 1000 : 785}
        height={isSeal ? 1000 : 234}
        sizes={isSeal ? "128px" : "(min-width: 768px) 160px, 144px"}
        className={isSeal ? "size-32 object-contain" : "h-auto w-36 md:w-40"}
        preload={!isSeal}
      />
    </Link>
  );
}
