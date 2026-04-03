interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="hero-gradient relative overflow-hidden border-b border-border/60">
      <div className="container relative mx-auto px-4 py-7 lg:px-8 lg:py-10">
        <div className="max-w-5xl animate-fade-in-up">
          <h1 className="font-heading text-[clamp(1.9rem,4.2vw,3.6rem)] font-semibold leading-tight text-foreground mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
