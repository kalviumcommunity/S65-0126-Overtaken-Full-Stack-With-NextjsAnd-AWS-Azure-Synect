"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PageShell } from "@/app/components/page-shell";
import { Button, Input } from "@/app/components";
import { apiFetch } from "@/lib/api-client";
import { setAccessToken } from "@/lib/auth-session";
import { signupSchema, type SignupFormValues } from "@/lib/validation/auth";

export default function SignupPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setSubmitError(null);

    try {
      const response = await apiFetch<{ accessToken: string }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          role: values.role,
        }),
      });

      setAccessToken(response.accessToken);
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to signup");
    }
  };

  return (
    <PageShell
      title="Create your Synect account"
      subtitle="Choose your role, create your account, and start using Synect immediately."
    >
      <section className="glass max-w-2xl px-5 py-6">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:col-span-2">
            <Input
              type="email"
              label="Email"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <Input
            type="password"
            label="Password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            type="password"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm text-[var(--muted)]">Role</span>
            <select
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
              {...register("role")}
            >
              <option>STUDENT</option>
              <option>MENTOR</option>
              <option>ADMIN</option>
            </select>
            {errors.role?.message ? (
              <span className="mt-1 block text-xs text-red-600">{errors.role.message}</span>
            ) : null}
          </label>

          <Button type="submit" variant="accent" className="md:col-span-2" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {submitError ? <p className="mt-3 text-sm text-red-600">{submitError}</p> : null}
      </section>
    </PageShell>
  );
}
