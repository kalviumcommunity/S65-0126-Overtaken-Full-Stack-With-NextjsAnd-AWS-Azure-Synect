import { PageShell } from "@/app/components/page-shell";

export default function SignupPage() {
  return (
    <PageShell
      title="Create your Synect account"
      subtitle="Choose your role and create your account. Ready for backend integration with POST /auth/signup."
    >
      <section className="glass max-w-2xl px-5 py-6">
        <form className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm text-[var(--muted)]">Email</span>
            <input
              type="email"
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-[var(--muted)]">Password</span>
            <input
              type="password"
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-[var(--muted)]">Confirm Password</span>
            <input
              type="password"
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm text-[var(--muted)]">Role</span>
            <select className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2">
              <option>STUDENT</option>
              <option>MENTOR</option>
              <option>ADMIN</option>
            </select>
          </label>

          <button
            type="button"
            className="md:col-span-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 font-medium text-white hover:opacity-95"
          >
            Create Account
          </button>
        </form>
      </section>
    </PageShell>
  );
}
