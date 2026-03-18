import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DynamicHeroProps {
  publicationCount: number;
  peopleCount: number;
  researchCount: number;
}

export function DynamicHero({ publicationCount, peopleCount, researchCount }: DynamicHeroProps) {
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);

  const smoothX = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const smoothY = useSpring(cursorY, { stiffness: 80, damping: 18 });

  const floatX = useTransform(smoothX, [0, 1], [-22, 22]);
  const floatY = useTransform(smoothY, [0, 1], [-18, 18]);

  const nodes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        x: ((index * 37) % 100) + '%',
        y: ((index * 19) % 100) + '%',
        size: 3 + (index % 4),
        delay: index * 0.08,
      })),
    []
  );

  return (
    <section
      className="hero-gradient relative min-h-[94vh] overflow-hidden"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        cursorX.set(x);
        cursorY.set(y);
      }}
    >
      <div className="mesh-overlay absolute inset-0 opacity-30" />
      <motion.div style={{ x: floatX, y: floatY }} className="hero-orb pointer-events-none absolute left-[6%] top-[10%] h-[340px] w-[340px]" />
      <motion.div style={{ x: floatY, y: floatX }} className="hero-orb pointer-events-none absolute bottom-[4%] right-[5%] h-[290px] w-[290px] opacity-70" />

      <div className="pointer-events-none absolute inset-0">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full bg-primary/85"
            style={{
              left: node.x,
              top: node.y,
              width: `${node.size * 2}px`,
              height: `${node.size * 2}px`,
            }}
            animate={{ opacity: [0.22, 0.85, 0.22], scale: [1, 1.45, 1] }}
            transition={{ duration: 4 + (node.id % 4), delay: node.delay, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}
      </div>

      <div className="container relative mx-auto flex min-h-[94vh] items-center px-4 pb-12 pt-24 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">NSUT AI Research System</span>
            </div>

            <h1 className="font-heading text-balance text-4xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-6xl xl:text-7xl">
              We prototype intelligence
              <span className="gradient-text block">for systems that must work in the wild.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              From multilingual models to vision-driven autonomy and responsible deployment, our lab treats research as a living practice: design, test, publish, and deploy in loops.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-none px-8" asChild>
                <Link to="/research">
                  Explore Research
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none border-foreground/20 px-8" asChild>
                <Link to="/contact">Join Lab</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="noise-surface brutal-border grid gap-3 bg-card/70 p-5 backdrop-blur-md"
          >
            {[
              { label: 'Publications', value: publicationCount },
              { label: 'Researchers', value: peopleCount },
              { label: 'Research domains', value: researchCount },
            ].map((metric) => (
              <div key={metric.label} className="flex items-end justify-between border-b border-border/70 py-3 last:border-b-0">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</span>
                <span className="font-heading text-3xl font-semibold tracking-tight text-foreground">{metric.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
