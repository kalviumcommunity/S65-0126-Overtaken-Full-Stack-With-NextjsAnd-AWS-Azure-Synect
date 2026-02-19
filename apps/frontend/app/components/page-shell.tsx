type PageShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <main>
      <section className="glass mb-4 px-5 py-6 md:px-8">
        <p className="pill mb-3">Synect MVP</p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-[var(--muted)] md:text-base">{subtitle}</p>
      </section>
      {children}
    </main>
  );
}
