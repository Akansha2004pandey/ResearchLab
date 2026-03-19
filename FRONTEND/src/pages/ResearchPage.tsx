import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { ResearchCard } from '@/components/ResearchCard';
import { useResearchAreas } from '@/hooks/useLabData';
import { Skeleton } from '@/components/ui/skeleton';

export default function ResearchPage() {
  const { data: researchAreas = [], isLoading } = useResearchAreas();

  return (
    <Layout>
      <PageHeader
        title="Research"
        subtitle="Our research spans multiple areas of artificial intelligence and machine learning, from theoretical foundations to real-world applications."
      />

      <Section>
        {isLoading && (
          <div className="grid grid-cols-12 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="col-span-12 md:col-span-6 h-72 rounded-none" />
            ))}
          </div>
        )}
        <div className="grid grid-cols-12 gap-8">
          {researchAreas.map((area, idx) => (
            <div
              key={area.id}
              className="animate-fade-in-up col-span-12 md:col-span-6"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <ResearchCard area={area} />
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
