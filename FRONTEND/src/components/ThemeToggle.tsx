import { useTheme } from 'next-themes';
import { MoonStar, SunMedium } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isNoir = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isNoir ? 'theme-aurora' : 'dark')}
      aria-label={isNoir ? 'Switch to Aurora theme' : 'Switch to Noir theme'}
      className="inline-flex h-9 w-14 items-center border border-border/70 bg-background/90 p-1 rounded-full"
    >
      <span
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300',
          isNoir ? 'translate-x-6' : 'translate-x-0'
        )}
      >
        {isNoir ? <MoonStar className="h-3.5 w-3.5" /> : <SunMedium className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}
