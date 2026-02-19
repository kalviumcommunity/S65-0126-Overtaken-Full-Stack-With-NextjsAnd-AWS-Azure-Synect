import { PageShell } from "@/app/components/page-shell";
import { Button, Input } from "@/app/components";

export default function SignupPage() {
  return (
    <PageShell
      title="Create your Synect account"
      subtitle="Choose your role and create your account. Ready for backend integration with POST /api/auth/signup."
    >
      <section className="glass max-w-2xl px-5 py-6">
        <form className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input type="email" label="Email" />
          </div>

          <Input type="password" label="Password" />

          <Input type="password" label="Confirm Password" />

          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm text-[var(--muted)]">Role</span>
            <select className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2">
              <option>STUDENT</option>
              <option>MENTOR</option>
              <option>ADMIN</option>
            </select>
          </label>

          <Button type="button" variant="accent" className="md:col-span-2">
            Create Account
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
