import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-[var(--muted)]">{label}</span>
      <input
        {...props}
        className={`w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 ${className}`}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
