import { PageShell } from "@/app/components/page-shell";

const mentors = [
  { name: "Ananya Sharma", expertise: "Backend + APIs" },
  { name: "Rohit Kumar", expertise: "System Design" },
  { name: "Pooja Verma", expertise: "Interview Prep" },
];

export default function MentorsPage() {
  return (
    <PageShell
      title="Mentor directory"
      subtitle="Discover mentors and pick someone based on expertise and availability."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {mentors.map((mentor) => (
          <article key={mentor.name} className="glass px-5 py-5">
            <p className="pill">MENTOR</p>
            <h2 className="mt-2 text-lg font-semibold">{mentor.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{mentor.expertise}</p>
            <button
              type="button"
              className="mt-4 rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-strong)]"
            >
              View Slots
            </button>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
