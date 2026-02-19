import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "accent" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const variantClass: Record<Variant, string> = {
  primary: "bg-[var(--brand)] text-white hover:bg-[var(--brand-strong)]",
  accent: "bg-[var(--accent)] text-white hover:opacity-95",
  secondary:
    "border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--foreground)] hover:bg-[var(--surface)]",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-xl px-4 py-2.5 font-medium transition ${variantClass[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
}
