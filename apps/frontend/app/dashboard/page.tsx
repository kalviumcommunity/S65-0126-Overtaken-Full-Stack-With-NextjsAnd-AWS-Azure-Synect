import Link from "next/link";
import { PageShell } from "@/app/components/page-shell";

const boards = [
  {
    title: "Student Dashboard",
    description: "Track internship applications and manage mentor requests.",
    href: "/dashboard/student",
  },
  {
    title: "Mentor Dashboard",
    description: "Manage profile, slot availability, and booking approvals.",
    href: "/dashboard/mentor",
  },
  {
    title: "Admin Dashboard",
    description: "Monitor users, system trends, and operational summaries.",
    href: "/dashboard/admin",
  },
];

export default function DashboardPage() {
  return (
    <PageShell
      title="Role dashboards"
      subtitle="Use this route as the role switchboard after login. In integration, redirect users here and route by their role from /auth/me."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {boards.map((board) => (
          <article key={board.href} className="glass px-5 py-5">
            <h2 className="text-lg font-semibold">{board.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{board.description}</p>
            <Link
              href={board.href}
              className="mt-4 inline-block rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm hover:bg-[var(--surface)]"
            >
              Open
            </Link>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
