import { PageShell } from "@/app/components/page-shell";

export default function AdminDashboardPage() {
  return (
    <PageShell
      title="Admin dashboard"
      subtitle="Track platform health, user growth, and pending moderation actions."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Total Users", "231"],
          ["Active Mentors", "48"],
          ["Pending Reports", "2"],
        ].map(([label, value]) => (
          <article key={label} className="glass px-5 py-5">
            <p className="text-sm text-[var(--muted)]">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
