import Link from "next/link";

export default function NotFound() {
  return (
    <main className="glass px-6 py-8">
      <p className="pill">404</p>
      <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        The route you tried does not exist. Use the dashboard to continue.
      </p>
      <div className="mt-5">
        <Link
          href="/dashboard"
          className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-strong)]"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
