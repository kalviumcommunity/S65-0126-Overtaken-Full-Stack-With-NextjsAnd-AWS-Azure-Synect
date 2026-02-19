"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/profiles", label: "Profiles" },
  { href: "/internships", label: "Internships" },
  { href: "/mentors", label: "Mentors" },
  { href: "/availability", label: "Availability" },
  { href: "/bookings", label: "Bookings" },
  { href: "/users/student-demo", label: "Dynamic User" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass h-fit p-4">
      <p className="pill mb-3">Protected Area</p>
      <nav className="grid gap-2">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-3 py-2 text-sm ${
                active
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--surface-strong)] text-[var(--foreground)] hover:bg-[var(--surface)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
