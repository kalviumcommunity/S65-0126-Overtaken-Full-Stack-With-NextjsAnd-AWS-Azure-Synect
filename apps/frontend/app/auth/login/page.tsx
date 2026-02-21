"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PageShell } from "@/app/components/page-shell";
import { Button, Input } from "@/app/components";
import { apiFetch } from "@/lib/api-client";
import { setAccessToken } from "@/lib/auth-session";
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth";

export default function LoginPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);

    try {
      const response = await apiFetch<{ accessToken: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      setAccessToken(response.accessToken);

      const nextPath =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("next")
          : null;
      router.push(nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard");
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to login");
    }
  };

  return (
    <PageShell
      title="Welcome back"
      subtitle="Login with your email and password to continue to your dashboard."
    >
      <section className="glass max-w-xl px-5 py-6">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            type="password"
            label="Password"
            placeholder="********"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {submitError ? <p className="mt-3 text-sm text-red-600">{submitError}</p> : null}

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
