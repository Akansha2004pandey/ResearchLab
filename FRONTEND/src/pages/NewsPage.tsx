import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { news, newsCategoryLabels, newsCategoryColors, NewsCategory } from '@/data/news';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

type FilterType = NewsCategory | 'all';

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paper', label: 'Papers' },
  { value: 'grant', label: 'Grants' },
  { value: 'award', label: 'Awards' },
  { value: 'media', label: 'Media' },
  { value: 'general', label: 'Announcements' },
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredNews = useMemo(() => {
    if (activeFilter === 'all') return news;
    return news.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <Layout>
      <PageHeader
        title="News & Announcements"
        subtitle="Stay updated with our latest achievements, publications, and events."
      />

      <Section>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* News List */}
        {filteredNews.length > 0 ? (
          <div className="space-y-6">
            {filteredNews.map((item, idx) => {
              const colors = newsCategoryColors[item.category];
              return (
                <div
                  key={item.id}
                  className="group flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {item.image && (
                    <div className="w-full md:w-48 h-40 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full', colors.bg, colors.text)}>
                        {newsCategoryLabels[item.category]}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {format(parseISO(item.date), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-primary hover:underline"
                      >
                        Read more →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news found for this category.</p>
          </div>
        )}
      </Section>
    </Layout>
  );
}
