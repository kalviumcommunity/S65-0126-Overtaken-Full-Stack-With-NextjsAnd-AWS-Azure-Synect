import { PageShell } from "@/app/components/page-shell";

const rows = [
  { company: "Acme Labs", role: "Backend Intern", status: "APPLIED" },
  { company: "Northwind", role: "Product Intern", status: "ACTIVE" },
  { company: "Rocketbyte", role: "Web Intern", status: "COMPLETED" },
];

export default function InternshipsPage() {
  return (
    <PageShell
      title="Internship tracker"
      subtitle="This page maps to /internships endpoints for create, list, update, and delete actions."
    >
      <section className="glass mb-4 px-5 py-5">
        <h2 className="text-lg font-semibold">Add internship</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input
            placeholder="Company"
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
          />
          <input
            placeholder="Role title"
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
          />
        </div>
      </section>

      <section className="glass overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface-strong)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.company} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">{row.company}</td>
                <td className="px-4 py-3">{row.role}</td>
                <td className="px-4 py-3">
                  <span className="pill">{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  );
}
