import { PageShell } from "@/app/components/page-shell";

export default function MentorDashboardPage() {
  return (
    <PageShell
      title="Mentor dashboard"
      subtitle="Keep your profile current, publish slots, and act on student bookings quickly."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Open Slots", "8"],
          ["Pending Requests", "4"],
          ["Accepted Sessions", "15"],
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
