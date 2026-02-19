import { PageShell } from "@/app/components/page-shell";

export default function StudentDashboardPage() {
  return (
    <PageShell
      title="Student dashboard"
      subtitle="One place to monitor internship progress and mentorship requests."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Applications", "12"],
          ["Active Internships", "2"],
          ["Pending Bookings", "3"],
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
