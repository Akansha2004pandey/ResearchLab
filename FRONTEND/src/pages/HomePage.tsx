import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useResearchAreas, usePublications, usePeople, useGrants, useEvents, useNews } from '@/hooks/useLabData';
import { ArrowRight } from 'lucide-react';

type BlockType = 'manifesto' | 'research' | 'project' | 'publication' | 'people' | 'news' | 'event' | 'cta';

type CanvasBlock = {
  id: string;
  type: BlockType;
  title: string;
  subtitle: string;
  href: string;
  meta?: string;
  image?: string;
  className: string;
  accent?: 'blue' | 'pink' | 'dark';
};

function parseGrantAmount(amount?: string): number {
  if (!amount) return 0;
  const clean = amount.replace(/[^\d.]/g, '');
  const value = Number.parseFloat(clean);
  return Number.isFinite(value) ? value : 0;
}

function accentClass(accent?: CanvasBlock['accent']) {
  if (accent === 'pink') return 'before:bg-secondary/20';
  if (accent === 'dark') return 'before:bg-foreground/10';
  return 'before:bg-primary/20';
}

const blockPattern = [
  'col-span-12 md:col-span-7 lg:col-span-8 row-span-2',
  'col-span-12 md:col-span-5 lg:col-span-4 row-span-1',
  'col-span-12 md:col-span-6 lg:col-span-4 row-span-1',
  'col-span-12 md:col-span-6 lg:col-span-4 row-span-1',
  'col-span-12 md:col-span-4 lg:col-span-3 row-span-1',
  'col-span-12 md:col-span-8 lg:col-span-5 row-span-1',
  'col-span-12 md:col-span-4 lg:col-span-3 row-span-1',
  'col-span-12 md:col-span-8 lg:col-span-4 row-span-1',
  'col-span-12 md:col-span-6 lg:col-span-4 row-span-1',
  'col-span-12 md:col-span-6 lg:col-span-4 row-span-1',
  'col-span-12 md:col-span-6 lg:col-span-4 row-span-1',
  'col-span-12 md:col-span-5 lg:col-span-4 row-span-2',
  'col-span-12 md:col-span-7 lg:col-span-8 row-span-1',
];

export default function HomePage() {
  const { data: researchAreas = [] } = useResearchAreas();
  const { data: publications = [] } = usePublications();
  const { data: people = [] } = usePeople();
  const { data: grants = [] } = useGrants();
  const { data: events = [] } = useEvents();
  const { data: news = [] } = useNews();
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const totalFunding = grants.reduce((sum, grant) => sum + parseGrantAmount(grant.amount), 0);
  const activeGrants = grants.filter((grant) => grant.status === 'ongoing').length;
  const lead = people.find((member) => member.category === 'faculty') ?? people[0];

  const featuredProjects = useMemo(
    () =>
      researchAreas.slice(0, 3).map((area, idx) => ({
        id: `project-${area.id}`,
        title: area.title,
        subtitle: area.shortDescription,
        meta: ['ML', 'CV', 'NLP', 'Robotics'][idx % 4],
      })),
    [researchAreas]
  );

  const blocks: CanvasBlock[] = useMemo(() => {
    const set: CanvasBlock[] = [
      {
        id: 'manifesto',
        type: 'manifesto',
        title: 'INTELLIGENCE MUST SURVIVE REALITY.',
        subtitle:
          'We build AI that performs under uncertainty, adapts to low-resource environments, and remains accountable when deployed in public systems.',
        href: '/research',
        meta: 'NSUT AI LAB MANIFESTO',
        className: blockPattern[0],
        accent: 'dark',
      },
      {
        id: 'metrics',
        type: 'project',
        title: `${publications.length} papers · ${people.length} researchers`,
        subtitle: `${activeGrants} active grants | ${totalFunding > 0 ? `₹${(totalFunding / 10000000).toFixed(1)}Cr` : 'Funding in progress'}`,
        href: '/funding',
        meta: 'LIVE FOOTPRINT',
        className: blockPattern[1],
        accent: 'blue',
      },
    ];

    researchAreas.slice(0, 3).forEach((item, idx) => {
      set.push({
        id: `research-${item.id}`,
        type: 'research',
        title: item.title,
        subtitle: item.shortDescription,
        href: '/research',
        meta: 'RESEARCH STREAM',
        className: blockPattern[2 + idx],
        accent: idx % 2 === 0 ? 'blue' : 'pink',
      });
    });

    featuredProjects.forEach((project, idx) => {
      set.push({
        id: project.id,
        type: 'project',
        title: project.title,
        subtitle: project.subtitle,
        href: '/research',
        meta: `PROJECT · ${project.meta}`,
        className: blockPattern[4 + idx],
        accent: idx % 2 === 0 ? 'pink' : 'blue',
      });
    });

    publications.slice(0, 3).forEach((item, idx) => {
      set.push({
        id: `publication-${item.id}`,
        type: 'publication',
        title: item.title,
        subtitle: `${item.venue} · ${item.year}`,
        href: '/publications',
        meta: 'PUBLICATION',
        className: blockPattern[7 + idx],
        accent: 'dark',
      });
    });

    events.slice(0, 2).forEach((item, idx) => {
      set.push({
        id: `event-${item.id}`,
        type: 'event',
        title: item.title,
        subtitle: `${format(parseISO(item.date), 'MMM d, yyyy')} · ${item.venue}`,
        href: '/events',
        meta: 'EVENT',
        className: blockPattern[(8 + idx) % blockPattern.length],
        accent: 'blue',
      });
    });

    news.slice(0, 2).forEach((item, idx) => {
      set.push({
        id: `news-${item.id}`,
        type: 'news',
        title: item.title,
        subtitle: `${format(parseISO(item.date), 'MMM d, yyyy')} · ${item.category}`,
        href: '/news',
        meta: 'NEWS SIGNAL',
        className: blockPattern[(9 + idx) % blockPattern.length],
        accent: 'pink',
      });
    });

    while (set.length < 12) {
      const idx = set.length;
      set.push({
        id: `pulse-${idx}`,
        type: 'project',
        title: `Lab Pulse ${idx - 1}`,
        subtitle: 'Continuous experiments across language, vision, and responsible AI deployment tracks.',
        href: '/research',
        meta: 'SYSTEM UPDATE',
        className: blockPattern[idx % blockPattern.length],
        accent: idx % 2 === 0 ? 'blue' : 'pink',
      });
    }

    if (lead) {
      set.push({
        id: `lead-${lead.id}`,
        type: 'people',
        title: lead.name,
        subtitle: lead.role,
        href: '/people',
        meta: 'FACULTY LEAD',
        image: lead.image,
        className: blockPattern[11],
        accent: 'dark',
      });
    }

    set.push({
      id: 'cta',
      type: 'cta',
      title: 'JOIN THE SYSTEM',
      subtitle: 'Collaborate, apply, or deploy research with us.',
      href: '/contact',
      meta: 'OPEN CALL',
      className: blockPattern[12],
      accent: 'pink',
    });

    return set;
  }, [researchAreas, publications, featuredProjects, events, news, lead, people, activeGrants, totalFunding]);

  const symbolByType: Record<BlockType, string> = {
    manifesto: '::',
    research: '//',
    project: '[]',
    publication: 'PP',
    people: 'GR',
    news: 'NW',
    event: 'EV',
    cta: '->',
  };

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden px-4 pb-20 pt-24 md:px-6 lg:px-10 lg:pt-28">
        <div className="pointer-events-none absolute -left-20 top-20 h-[360px] w-[360px] rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-[35%] h-[320px] w-[320px] rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 mesh-overlay opacity-30" />

        <div className="mx-auto max-w-[1600px]">
          <div className="relative mb-6">
            <p className="font-heading text-[clamp(2.2rem,7vw,6.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.03em] text-foreground">
              Artificial Intelligence Lab
            </p>
            <p className="mt-2 max-w-xl text-sm uppercase tracking-[0.24em] text-muted-foreground">
              Netaji Subhas University of Technology · Delhi
            </p>
            <div className="absolute right-0 top-1 hidden xl:block">
              <Button variant="outline" className="rounded-none border-foreground/20 bg-background/70" asChild>
                <Link to="/research">
                  Explore Research
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative grid grid-flow-dense auto-rows-[125px] grid-cols-12 gap-3 md:auto-rows-[138px] lg:auto-rows-[148px]">
            {blocks.map((block, index) => {
              const symbol = symbolByType[block.type];
              const isActive = activeBlockId === block.id;

              return (
                <motion.article
                  key={block.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  onMouseEnter={() => setActiveBlockId(block.id)}
                  onMouseLeave={() => setActiveBlockId(null)}
                  className={`${block.className} relative overflow-hidden`}
                >
                  <Link
                    to={block.href}
                    className={`noise-surface brutal-border group relative flex h-full flex-col justify-between border border-border/80 bg-card/85 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${accentClass(block.accent)}`}
                  >
                    <div className="relative z-[1] flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{block.meta}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{symbol}</span>
                    </div>

                    <div className="relative z-[1] mt-2">
                      <h2
                        className={`font-heading font-semibold tracking-tight text-foreground ${
                          block.type === 'manifesto' ? 'text-[clamp(1.3rem,3vw,3.2rem)] leading-[0.9]' : 'text-[clamp(1rem,2vw,1.6rem)] leading-tight'
                        }`}
                      >
                        {block.title}
                      </h2>

                      <AnimatePresence>
                        {(isActive || block.type === 'manifesto') && (
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.22 }}
                            className="mt-2 line-clamp-4 text-sm text-muted-foreground"
                          >
                            {block.subtitle}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {block.image && (
                      <img
                        src={block.image}
                        alt={block.title}
                        className="absolute bottom-3 right-3 h-20 w-20 rounded-sm object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                      />
                    )}

                    <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:bg-secondary/20" />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button className="rounded-none" asChild>
              <Link to="/contact">Join Lab</Link>
            </Button>
            <Button variant="outline" className="rounded-none border-foreground/20" asChild>
              <Link to="/people">Meet People</Link>
            </Button>
            <Button variant="outline" className="rounded-none border-foreground/20" asChild>
              <Link to="/publications">Scattered Publications</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
