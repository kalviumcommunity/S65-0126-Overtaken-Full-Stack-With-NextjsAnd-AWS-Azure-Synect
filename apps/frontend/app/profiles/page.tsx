import { PageShell } from "@/app/components/page-shell";

export default function ProfilesPage() {
  return (
    <PageShell
      title="Profiles"
      subtitle="Unified profile screen for student and mentor roles. Switch fields based on role from /auth/me in the next integration pass."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="glass px-5 py-5">
          <h2 className="text-lg font-semibold">Student Profile</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>Full name</li>
            <li>University</li>
            <li>Program</li>
            <li>Graduation year</li>
            <li>Bio</li>
          </ul>
        </article>
        <article className="glass px-5 py-5">
          <h2 className="text-lg font-semibold">Mentor Profile</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>Full name</li>
            <li>Expertise</li>
            <li>Bio</li>
            <li>Session style</li>
            <li>Experience highlights</li>
          </ul>
        </article>
      </section>
    </PageShell>
  );
}
