import { PageShell } from "@/app/components/page-shell";

const slots = [
  { mentor: "Ananya Sharma", time: "Sat, 10:00 - 10:30", status: "OPEN" },
  { mentor: "Rohit Kumar", time: "Sat, 14:00 - 14:30", status: "OPEN" },
  { mentor: "Pooja Verma", time: "Sun, 17:30 - 18:00", status: "OPEN" },
];

export default function AvailabilityPage() {
  return (
    <PageShell
      title="Mentor availability"
      subtitle="Students browse open slots here. Mentors can manage personal slots from the same route based on role logic later."
    >
      <section className="glass overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface-strong)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">Mentor</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.time} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">{slot.mentor}</td>
                <td className="px-4 py-3">{slot.time}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Book Slot
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  );
}
