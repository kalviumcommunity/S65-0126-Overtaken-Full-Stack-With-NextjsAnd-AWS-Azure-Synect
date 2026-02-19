import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/auth/login", label: "Login" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profiles", label: "Profiles" },
  { href: "/internships", label: "Internships" },
  { href: "/mentors", label: "Mentors" },
  { href: "/availability", label: "Availability" },
  { href: "/bookings", label: "Bookings" },
];

export function SiteNav() {
  return (
    <header className="glass app-shell sticky top-3 z-20 px-4 py-3 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Synect
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm text-slate-700">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-1.5 hover:bg-[var(--surface)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
