import { PageShell } from "@/app/components/page-shell";

const items = [
  { mentor: "Ananya Sharma", slot: "Sat 10:00", status: "PENDING" },
  { mentor: "Rohit Kumar", slot: "Sun 11:30", status: "ACCEPTED" },
  { mentor: "Pooja Verma", slot: "Mon 18:00", status: "REJECTED" },
];

export default function BookingsPage() {
  return (
    <PageShell
      title="Booking tracker"
      subtitle="Students monitor requests here, mentors approve or reject from their booking view."
    >
      <section className="grid gap-4">
        {items.map((item) => (
          <article
            key={`${item.mentor}-${item.slot}`}
            className="glass flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-sm text-[var(--muted)]">Mentor</p>
              <p className="font-semibold">{item.mentor}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.slot}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="pill">{item.status}</span>
              <button
                type="button"
                className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs"
              >
                View
              </button>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
