import Link from "next/link";
import { PageShell } from "@/app/components/page-shell";
import { Button, Input } from "@/app/components";

export default function LoginPage() {
  return (
    <PageShell
      title="Welcome back"
      subtitle="Login with your email and password. This form is currently UI-only and ready for API integration with POST /api/auth/login."
    >
      <section className="glass max-w-xl px-5 py-6">
        <form className="space-y-4">
          <Input type="email" label="Email" placeholder="you@example.com" />
          <Input type="password" label="Password" placeholder="********" />

          <Button type="button" fullWidth>
            Sign In
          </Button>
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
