import Link from "next/link";
import { PageShell } from "@/app/components/page-shell";

export default function LoginPage() {
  return (
    <PageShell
      title="Welcome back"
      subtitle="Login with your email and password. This form is currently UI-only and ready for API integration with POST /auth/login."
    >
      <section className="glass max-w-xl px-5 py-6">
        <form className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm text-[var(--muted)]">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-[var(--muted)]">Password</span>
            <input
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
            />
          </label>

          <button
            type="button"
            className="w-full rounded-xl bg-[var(--brand)] px-4 py-2.5 font-medium text-white hover:bg-[var(--brand-strong)]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--muted)]">
          New to Synect?{" "}
          <Link href="/auth/signup" className="font-medium text-[var(--brand-strong)]">
            Create an account
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
