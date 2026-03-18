interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="hero-gradient relative overflow-hidden border-b border-border/70">
      <div className="mesh-overlay absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="container relative mx-auto px-4 py-12 lg:px-8 lg:py-20">
        <div className="max-w-5xl animate-fade-in-up">
          <h1 className="font-heading text-[clamp(2rem,6vw,5.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-foreground mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-3xl text-base md:text-xl text-muted-foreground">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
