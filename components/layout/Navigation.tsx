import Link from "next/link";
import type { NavigationItem } from "@/content/site";

interface NavigationProps {
  items: readonly NavigationItem[];
  label: string;
  variant?: "desktop" | "mobile" | "footer";
  onNavigate?: () => void;
}

const listStyles = {
  desktop: "flex items-center gap-5 xl:gap-7",
  mobile: "flex flex-col border-b border-border-inverse",
  footer: "flex flex-col items-center lg:items-start",
};

const linkStyles = {
  desktop: "min-h-12 text-brand hover:text-focus",
  mobile:
    "mobile-navigation-link min-h-18 justify-between gap-5 py-4 text-[clamp(2.35rem,11vw,4.75rem)] font-semibold leading-none tracking-[-0.045em] text-on-brand hover:text-accent focus-visible:outline-accent",
  footer:
      "min-h-8 justify-center py-1 text-center text-on-brand-muted hover:text-on-brand focus-visible:outline-accent lg:justify-start lg:text-left",
};

export function Navigation({
  items,
  label,
  variant = "desktop",
  onNavigate,
}: NavigationProps) {
  const sizeClass = variant === "mobile" ? "" : "text-small font-medium";
  const className = `inline-flex items-center transition-colors ${sizeClass} ${linkStyles[variant]}`;

  return (
    <nav aria-label={label}>
      <ul className={listStyles[variant]}>
        {items.map((item, index) => (
          <li
            key={item.href}
            className={variant === "mobile" ? "mobile-navigation-item border-b border-border-inverse last:border-b-0" : undefined}
            data-index={variant === "mobile" ? String(index + 1).padStart(2, "0") : undefined}
          >
            {item.external ? (
              <a href={item.href} className={className} onClick={onNavigate}>
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className={className} onClick={onNavigate}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
