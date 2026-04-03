import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-8 lg:py-12', className)}>
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
    <div className={cn('mb-6 lg:mb-8', align === 'center' && 'text-center', className)}>
      <h2 className="font-heading text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-tight text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
