import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { ResearchCard } from '@/components/ResearchCard';
import { researchAreas } from '@/data/research';

export default function ResearchPage() {
  return (
    <Layout>
      <PageHeader
        title="Research"
        subtitle="Our research spans multiple areas of artificial intelligence and machine learning, from theoretical foundations to real-world applications."
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {researchAreas.map((area, idx) => (
            <div
              key={area.id}
              className="animate-fade-in-up"
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
