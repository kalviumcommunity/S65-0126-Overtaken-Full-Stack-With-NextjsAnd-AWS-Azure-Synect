"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PageShell } from "@/app/components/page-shell";
import { Button, Input } from "@/app/components";
import { apiFetch, swrFetcher } from "@/lib/api-client";
import { internshipSchema, type InternshipFormValues } from "@/lib/validation/internship";

type Internship = {
  id: string;
  company: string;
  roleTitle: string;
  status: "APPLIED" | "ACTIVE" | "COMPLETED";
};

export default function InternshipsPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const swrKey = useMemo(() => `/api/internships?page=${page}&limit=${limit}`, [page]);
  const { data, error, isLoading, mutate } = useSWR<Internship[]>(swrKey, swrFetcher);
  const internships: Internship[] = data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InternshipFormValues>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      company: "",
      roleTitle: "",
      status: "APPLIED",
      applicationLink: "",
      notes: "",
    },
  });

  const onSubmit = async (values: InternshipFormValues) => {
    setSubmitError(null);

    const optimisticItem: Internship = {
      id: `temp-${values.company}-${values.roleTitle}`,
      company: values.company,
      roleTitle: values.roleTitle,
      status: values.status,
    };

    try {
      await mutate(
        async () => {
          await apiFetch<Internship>("/api/internships", {
            method: "POST",
            body: JSON.stringify({
              company: values.company,
              roleTitle: values.roleTitle,
              status: values.status,
              applicationLink: values.applicationLink || undefined,
              notes: values.notes || undefined,
            }),
          });
          return swrFetcher<Internship[]>(swrKey);
        },
        {
          optimisticData: (current = []) => [optimisticItem, ...current],
          rollbackOnError: true,
          revalidate: true,
        },
      );

      reset();
    } catch (submitErr) {
      setSubmitError(
        submitErr instanceof Error ? submitErr.message : "Failed to create internship",
      );
    }
  };

  return (
    <PageShell
      title="Internship tracker"
      subtitle="This page uses SWR cache + revalidation and React Hook Form with Zod validation."
    >
      <section className="glass mb-4 px-5 py-5">
        <h2 className="text-lg font-semibold">Add internship</h2>
        <form className="mt-3 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Company"
            placeholder="Acme Labs"
            error={errors.company?.message}
            {...register("company")}
          />
          <Input
            label="Role Title"
            placeholder="Backend Intern"
            error={errors.roleTitle?.message}
            {...register("roleTitle")}
          />
          <label className="block">
            <span className="mb-1 block text-sm text-[var(--muted)]">Status</span>
            <select
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
              {...register("status")}
            >
              <option value="APPLIED">APPLIED</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </label>
          <Input
            label="Application Link"
            placeholder="https://company.com/jobs/..."
            error={errors.applicationLink?.message}
            {...register("applicationLink")}
          />

          <div className="md:col-span-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create Internship"}
            </Button>
          </div>

          {submitError ? <p className="md:col-span-2 text-sm text-red-600">{submitError}</p> : null}
        </form>
      </section>

      <section className="glass overflow-hidden">
        {isLoading ? (
          <p className="px-4 py-4 text-sm text-[var(--muted)]">Loading internships...</p>
        ) : null}
        {error ? (
          <p className="px-4 py-4 text-sm text-red-600">Failed to load internships.</p>
        ) : null}

        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface-strong)] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((row) => (
              <tr key={row.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">{row.company}</td>
                <td className="px-4 py-3">{row.roleTitle}</td>
                <td className="px-4 py-3">
                  <span className="pill">{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-[var(--line)] px-4 py-3">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-[var(--muted)]">Page {page}</span>
          <Button variant="secondary" onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
