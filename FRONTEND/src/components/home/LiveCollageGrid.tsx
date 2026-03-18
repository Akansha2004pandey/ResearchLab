import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, BookMarked, Newspaper, Microscope } from 'lucide-react';
import type { ResearchArea } from '@/data/research';
import type { Publication } from '@/data/publications';
import type { LabEvent } from '@/data/events';
import type { NewsItem } from '@/data/news';
import { format, parseISO } from 'date-fns';

interface LiveCollageGridProps {
  researchAreas: ResearchArea[];
  publications: Publication[];
  events: LabEvent[];
  news: NewsItem[];
}

type Tile = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  kind: 'research' | 'publication' | 'event' | 'news';
  className: string;
};

const tilePattern = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
];

export function LiveCollageGrid({ researchAreas, publications, events, news }: LiveCollageGridProps) {
  const tiles: Tile[] = [
    ...researchAreas.slice(0, 2).map((item, index) => ({
      id: `research-${item.id}`,
      title: item.title,
      subtitle: item.shortDescription,
      href: '/research',
      kind: 'research' as const,
      className: tilePattern[index],
    })),
    ...publications.slice(0, 2).map((item, index) => ({
      id: `publication-${item.id}`,
      title: item.title,
      subtitle: `${item.venue} · ${item.year}`,
      href: '/publications',
      kind: 'publication' as const,
      className: tilePattern[index + 2],
    })),
    ...events.slice(0, 2).map((item, index) => ({
      id: `event-${item.id}`,
      title: item.title,
      subtitle: `${format(parseISO(item.date), 'MMM d, yyyy')} · ${item.venue}`,
      href: '/events',
      kind: 'event' as const,
      className: tilePattern[index + 4],
    })),
    ...news.slice(0, 2).map((item, index) => ({
      id: `news-${item.id}`,
      title: item.title,
      subtitle: `${format(parseISO(item.date), 'MMM d, yyyy')} · ${item.category}`,
      href: '/news',
      kind: 'news' as const,
      className: tilePattern[index + 6],
    })),
  ];

  const iconMap = {
    research: Microscope,
    publication: BookMarked,
    event: CalendarDays,
    news: Newspaper,
  } as const;

  return (
    <section className="py-14 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Live Content Grid</p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Research Collage</h2>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            A non-linear feed of papers, experiments, seminars, and updates from across the lab.
          </p>
        </div>

        <div className="lab-grid grid auto-rows-[160px] gap-4 md:grid-cols-4 md:auto-rows-[150px]">
          {tiles.map((tile, index) => {
            const Icon = iconMap[tile.kind];
            return (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className={tile.className}
              >
                <Link
                  to={tile.href}
                  className="noise-surface brutal-border group relative flex h-full flex-col justify-between overflow-hidden bg-card/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/15 blur-2xl transition-all duration-300 group-hover:bg-secondary/20" />
                  <div className="relative flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{tile.kind}</span>
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="relative">
                    <h3 className="font-heading line-clamp-2 text-lg font-semibold leading-tight tracking-tight text-foreground">
                      {tile.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{tile.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
