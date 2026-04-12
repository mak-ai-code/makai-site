"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "solid" | "outline" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "outline", className = "", children, ...rest },
  ref,
) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 px-7 py-4 text-[13px] uppercase tracking-[0.18em] transition-all duration-300 select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const styles: Record<Variant, string> = {
    solid:
      "bg-[var(--fg)] text-[var(--bg)] border border-[var(--fg)] hover:bg-transparent hover:text-[var(--fg)]",
    outline:
      "bg-transparent text-[var(--fg)] border border-[var(--line-3)] hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)]",
    ghost:
      "bg-transparent text-[var(--muted-2)] border border-transparent hover:text-[var(--fg)]",
  };
  return (
    <button ref={ref} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
});
