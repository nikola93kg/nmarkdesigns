import type { ComponentPropsWithoutRef } from "react";

export function Container({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-site px-gutter ${className}`}
      {...props}
    />
  );
}
