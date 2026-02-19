"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const protectedPrefixes = [
  "/dashboard",
  "/profiles",
  "/internships",
  "/mentors",
  "/availability",
  "/bookings",
  "/users",
];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isProtectedRoute = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return (
    <>
      <Header />
      <div className="app-shell">
        {isProtectedRoute ? (
          <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
            <Sidebar />
            <main>{children}</main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </div>
    </>
  );
}
