'use client';

import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { useResearchAreas } from '@/hooks/useLabData';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, GitBranch, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResearchBlockProps {
  layout: 'hero' | 'wide' | 'compact' | 'tall' | 'minimal';
  index: number;
}

export default function ResearchPage() {
  const { data: researchAreas = [], isLoading } = useResearchAreas();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Assign asymmetric layouts to research areas
  const layoutsMap = useMemo(
    () => ({
      0: 'hero',
      1: 'wide',
      2: 'tall',
      3: 'compact',
      4: 'minimal',
      5: 'wide',
    } as const),
    []
  );

  if (isLoading) {
    return (
      <Layout>
        <PageHeader title="Research" subtitle="Exploring intelligence and possibility." />
        <div className="px-4 py-12 md:px-8">
          <div className="grid gap-6 md:grid-cols-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="col-span-12 md:col-span-6 h-72 rounded-none" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Research" subtitle="Exploring intelligence and possibility." />

      <div className="px-4 py-12 md:px-8 bg-background">
        {/* Title Canvas */}
        <motion.div
          className="mb-20 space-y-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {/* Main Title Block */}
            <motion.div
              className="col-span-12 md:col-span-7 p-8 md:p-12 exp-card bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="space-y-4">
                <p className="text-xs md:text-sm uppercase tracking-widest text-primary font-semibold opacity-70">
                  Interdisciplinary Intelligence
                </p>
                <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase break-words">
                  Where Theory <br /> Meets Reality
                </h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed pt-4">
                  Six research verticals. One mission: pushing the boundaries of what machines can learn, understand,
                  and achieve.
                </p>
              </div>
            </motion.div>

            {/* Right Stats Block */}
            <motion.div
              className="col-span-12 md:col-span-5 grid grid-cols-2 gap-3 md:gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-6 exp-card bg-secondary/8 border border-secondary/30 flex flex-col justify-end">
                <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Active</div>
                <div className="text-3xl font-black">{researchAreas.length}</div>
                <div className="text-xs text-muted-foreground">Research Areas</div>
              </div>
              <div className="p-6 exp-card bg-primary/8 border border-primary/30 flex flex-col justify-end">
                <Zap className="w-5 h-5 mb-3 text-primary" />
                <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Focus</div>
                <div className="text-sm font-bold">AI Impact</div>
              </div>
            </motion.div>
          </div>

          {/* Grid Divider */}
          <div className="h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
        </motion.div>

        {/* Research Canvas - Asymmetric Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-5 auto-rows-max">
          <AnimatePresence mode="popLayout">
            {researchAreas.map((area, idx) => {
              const layout = layoutsMap[idx as keyof typeof layoutsMap] || 'compact';
              const isExpanded = expandedId === area.id;

              const colSpanMap = {
                hero: 'col-span-12 md:col-span-7',
                wide: 'col-span-12 md:col-span-5',
                tall: 'col-span-12 md:col-span-5 md:row-span-2',
                compact: 'col-span-12 md:col-span-3',
                minimal: 'col-span-12 md:col-span-2',
              };

              const heightMap = {
                hero: 'min-h-96',
                wide: 'min-h-64',
                tall: 'min-h-96',
                compact: 'min-h-48',
                minimal: 'min-h-40',
              };

              return (
                <motion.div
                  key={area.id}
                  className={cn(
                    'group cursor-pointer exp-card border overflow-hidden transition-all duration-300',
                    colSpanMap[layout],
                    heightMap[layout],
                    'hover:shadow-lg hover:z-10',
                    isExpanded ? 'fixed inset-0 md:inset-auto md:col-span-12 z-50' : '',
                    'bg-gradient-to-br from-background to-muted/30 border-primary/20'
                  )}
                  onClick={() => setExpandedId(isExpanded ? null : area.id)}
                  whileHover={{ scale: isExpanded ? 1 : 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Background Image Overlay */}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url('${area.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />

                  {/* Content */}
                  <div className="relative h-full p-5 md:p-6 flex flex-col justify-between z-10">
                    {isExpanded ? (
                      // Expanded state
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                          className="absolute top-4 right-4 text-xs uppercase font-bold text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Close
                        </button>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Research Area</p>
                          <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-4">{area.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{area.fullDescription}</p>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                            <GitBranch className="w-3 h-3" /> Methodology
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{area.methodology}</p>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                            <Target className="w-3 h-3" /> Key Contributions
                          </h4>
                          <ul className="space-y-2">
                            {area.contributions.map((contribution, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                {contribution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : (
                      // Collapsed state
                      <>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-primary/60 font-bold mb-2 group-hover:text-primary transition-colors">
                            Area {idx + 1}
                          </p>
                          <h3 className="text-lg md:text-xl font-black uppercase leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {area.title}
                          </h3>
                        </div>

                        <div className="space-y-3 pt-4">
                          <p className="text-xs text-muted-foreground line-clamp-2">{area.shortDescription}</p>
                          <div className="flex items-center gap-2 text-xs uppercase font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            Explore <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Border Accent */}
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ width: isExpanded ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Insights */}
        <motion.div
          className="mt-20 space-y-6 py-12 border-t border-primary/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Core Principles</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Rigor', desc: 'Mathematical foundations with empirical validation' },
                { label: 'Impact', desc: 'Research that translates to real applications' },
                { label: 'Ethics', desc: 'Responsible AI development and deployment' },
              ].map((principle, i) => (
                <motion.div
                  key={i}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="font-bold uppercase text-sm">{principle.label}</p>
                  <p className="text-sm text-muted-foreground">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
