import Link from "next/link";
import { PageShell } from "./components/page-shell";

export default function Home() {
  const pages = [
    {
      title: "Authentication",
      description: "Signup, login, and JWT-backed sessions for role-based access.",
      href: "/auth/login",
    },
    {
      title: "Profiles",
      description: "Student and mentor profile updates with dedicated flows.",
      href: "/profiles",
    },
    {
      title: "Internships",
      description: "Track internship applications from applied to completed.",
      href: "/internships",
    },
    {
      title: "Mentor Discovery",
      description: "Browse mentors, inspect expertise, and find matching support.",
      href: "/mentors",
    },
    {
      title: "Availability",
      description: "Mentors create slots and students see open time windows.",
      href: "/availability",
    },
    {
      title: "Bookings",
      description: "Manage booking requests, approvals, and status updates.",
      href: "/bookings",
    },
  ];

  return (
    <PageShell
      title="Build the Synect frontend from one clean base"
      subtitle="This starter structure covers all MVP pages. Each screen currently uses placeholder data so your team can now wire APIs and state management without rethinking routes."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => (
          <article key={page.href} className="glass px-5 py-5">
            <h2 className="text-lg font-semibold">{page.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{page.description}</p>
            <Link
              href={page.href}
              className="mt-4 inline-block rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-strong)]"
            >
              Open Page
            </Link>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
