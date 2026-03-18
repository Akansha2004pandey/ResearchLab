import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, BrainCircuit, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/people', label: 'People' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/funding', label: 'Funding' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin/login', label: 'Admin' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEscape);
    };
  }, [isOpen]);

  return (
    <>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-50">
        <div className="container mx-auto px-4 pt-4 lg:px-8 lg:pt-6">
          <div className="pointer-events-auto flex items-center justify-between gap-2">
            <Link
              to="/"
              className={cn(
                'group inline-flex items-center gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300',
                scrolled
                  ? 'border-border bg-background/85 shadow-card'
                  : 'border-border/60 bg-background/55'
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <BrainCircuit className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block">
                <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
                  Artificial Intelligence Lab
                </span>
                <span className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  NSUT Delhi
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                className={cn(
                  'group rounded-full border px-5 font-heading text-sm tracking-wide backdrop-blur-xl',
                  isOpen ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background/70'
                )}
                onClick={() => setIsOpen((v) => !v)}
              >
                <span className="mr-2">Menu</span>
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-40"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="noise-surface brutal-border absolute left-0 top-0 flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-background px-6 py-24 md:px-10"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.26em] text-muted-foreground">Explore</p>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.03 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'group flex items-center justify-between rounded-xl px-3 py-2 transition-colors',
                        location.pathname === link.href ? 'bg-accent text-foreground' : 'hover:bg-muted/65 text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <span className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">{link.label}</span>
                      <ArrowUpRight className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-12 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                <div className="rounded-xl border border-border/70 bg-card/80 p-4">
                  <p className="font-medium text-foreground">Research collaborations</p>
                  <p className="mt-1">Open for funded projects, research internships, and industry pilots.</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-card/80 p-4">
                  <p className="font-medium text-foreground">Contact</p>
                  <p className="mt-1">ankur.gupta@nsut.ac.in</p>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
