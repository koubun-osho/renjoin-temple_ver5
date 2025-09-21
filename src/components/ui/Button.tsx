import Link from "next/link";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const baseStyles = "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-900",
  secondary: "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 focus-visible:outline-zinc-700",
} as const;

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: keyof typeof variants;
  href?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", href, ...props }, ref) => {
    const classes = cn(baseStyles, variants[variant], className);

    if (href) {
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={classes}>
            {props.children}
          </Link>
        );
      }

      return (
        <a href={href} className={classes}>
          {props.children}
        </a>
      );
    }

    return (
      <button ref={ref} type={type} className={classes} {...props} />
    );
  },
);

Button.displayName = "Button";
