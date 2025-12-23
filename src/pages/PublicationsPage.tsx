import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { PublicationCard } from '@/components/PublicationCard';
import { publications, publicationTypes, Publication } from '@/data/publications';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = Publication['type'] | 'all';

const tabs: { value: TabType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'journal', label: 'Journals' },
  { value: 'conference', label: 'Conferences' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'preprint', label: 'Preprints' },
  { value: 'patent', label: 'Patents' },
];

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPublications = useMemo(() => {
    let filtered = publications;

    if (activeTab !== 'all') {
      filtered = filtered.filter(p => p.type === activeTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.authors.some(a => a.toLowerCase().includes(query)) ||
          p.venue.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  // Group by year
  const publicationsByYear = useMemo(() => {
    const grouped: Record<number, Publication[]> = {};
    filteredPublications.forEach(pub => {
      if (!grouped[pub.year]) grouped[pub.year] = [];
      grouped[pub.year].push(pub);
    });
    return grouped;
  }, [filteredPublications]);

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <Layout>
      <PageHeader
        title="Publications"
        subtitle="Our research contributions to journals, conferences, workshops, and more."
      />

      <Section>
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  activeTab === tab.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative lg:ml-auto lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search publications..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results */}
        {years.length > 0 ? (
          <div className="space-y-8">
            {years.map(year => (
              <div key={year}>
                <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
                  <span>{year}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    ({publicationsByYear[year].length} publications)
                  </span>
                </h3>
                <div className="space-y-4">
                  {publicationsByYear[year].map((pub, idx) => (
                    <div
                      key={pub.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <PublicationCard publication={pub} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No publications found matching your criteria.</p>
          </div>
        )}
      </Section>
    </Layout>
  );
}
