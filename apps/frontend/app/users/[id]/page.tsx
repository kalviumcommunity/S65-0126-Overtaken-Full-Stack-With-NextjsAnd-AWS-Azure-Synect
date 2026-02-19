import { PageShell } from "@/app/components/page-shell";

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageShell
      title="Dynamic user profile route"
      subtitle="This page demonstrates Next.js dynamic routing using /users/[id]."
    >
      <section className="glass px-5 py-6">
        <p className="text-sm text-[var(--muted)]">User ID from route params</p>
        <p className="mt-1 font-mono text-lg">{id}</p>
      </section>
    </PageShell>
  );
}
