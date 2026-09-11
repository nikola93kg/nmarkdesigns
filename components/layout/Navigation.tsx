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
  mobile: "flex flex-col divide-y divide-border",
  footer: "flex flex-col items-start",
};

const linkStyles = {
  desktop: "min-h-12 text-brand hover:text-focus",
  mobile: "w-full min-h-12 py-3 text-base text-brand hover:text-focus",
  footer:
      "min-h-8 py-1 text-on-brand-muted hover:text-on-brand focus-visible:outline-accent",
};

export function Navigation({
  items,
  label,
  variant = "desktop",
  onNavigate,
}: NavigationProps) {
  const className = `inline-flex items-center text-small font-medium transition-colors ${linkStyles[variant]}`;

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
