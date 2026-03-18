import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-12 lg:py-16', className)}>
      <div className="container mx-auto px-4 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle, className, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 lg:mb-12', align === 'center' && 'text-center', className)}>
      <h2 className="font-heading text-[clamp(1.7rem,3.2vw,3.2rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
