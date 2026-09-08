import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

interface SharedProps {
  variant?: "primary" | "secondary";
  className?: string;
}

type ActionProps = SharedProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: never;
    external?: never;
  };

type LinkProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ActionProps | LinkProps;

const variants = {
  primary:
    "border-brand bg-brand text-on-brand hover:border-brand-hover hover:bg-brand-hover",
  secondary:
    "border-border bg-surface text-brand hover:border-brand hover:bg-accent-soft",
} satisfies Record<NonNullable<SharedProps["variant"]>, string>;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-control border px-5 py-3 text-center text-small font-semibold whitespace-normal transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;

  if (typeof props.href === "string") {
    const { href, external, target, rel, ...linkProps } = props;
    const safeRel = target === "_blank" ? `${rel ?? ""} noopener noreferrer`.trim() : rel;

    if (external || /^(?:https?:|mailto:|tel:)/.test(href)) {
      return (
        <a
          className={classes}
          href={href}
          target={target}
          rel={safeRel}
          {...linkProps}
        />
      );
    }

    return (
      <Link
        className={classes}
        href={href}
        target={target}
        rel={safeRel}
        {...linkProps}
      />
    );
  }

  return <button type="button" className={classes} {...props} />;
}
