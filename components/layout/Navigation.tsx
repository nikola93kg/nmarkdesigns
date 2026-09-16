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
  mobile: "flex flex-col items-center gap-2",
  footer: "flex flex-col items-center lg:items-start",
};

const linkStyles = {
  desktop: "min-h-12 text-brand hover:text-focus",
  mobile: "min-h-14 justify-center px-3 py-2 text-2xl font-bold uppercase text-on-brand hover:text-accent focus-visible:outline-accent",
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
        {items.map((item) => (
          <li key={item.href}>
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
