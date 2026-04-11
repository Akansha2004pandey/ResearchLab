import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { Award, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { useNews } from '@/hooks/useLabData';
import { news as fallbackNews } from '@/data/news';

function formatDate(value: string) {
  try {
    return format(parseISO(value), 'MMM d, yyyy');
  } catch {
    return value;
  }
}

export default function AwardsPage() {
  const { data: news = [] } = useNews();
  const items = news.length > 0 ? news : fallbackNews;

  const awards = useMemo(
    () => items.filter((item) => item.category === 'award').sort((a, b) => b.date.localeCompare(a.date)),
    [items]
  );

  return (
    <Layout>
      <PageHeader
        title="Awards and Recognition"
        subtitle="Major honors, recognitions, and achievements from the lab and its members."
      />

      <Section>
        {awards.length === 0 ? (
          <p className="text-muted-foreground">Awards will appear here as they are announced.</p>
        ) : (
          <div className="space-y-4">
            {awards.map((award) => (
              <article key={award.id} className="exp-card p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-700">
                    <Award className="h-3.5 w-3.5" />
                    Award
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(award.date)}</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground">{award.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{award.description}</p>

                {award.link && (
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Read more
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </Section>
    </Layout>
  );
}
