"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const topLinks = [
  { href: "/", label: "Home" },
  { href: "/auth/login", label: "Login" },
  { href: "/auth/signup", label: "Signup" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="glass app-shell sticky top-3 z-20 px-4 py-3 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Synect
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm text-slate-700">
          {topLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full border px-3 py-1.5 ${
                  active
                    ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                    : "border-[var(--line)] bg-[var(--surface-strong)] hover:bg-[var(--surface)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
