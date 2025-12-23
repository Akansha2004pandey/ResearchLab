import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { PersonCard } from '@/components/PersonCard';
import { people, categoryLabels, Person } from '@/data/people';

const categoryOrder: Person['category'][] = ['faculty', 'phd', 'masters', 'undergrad', 'staff', 'alumni'];

export default function PeoplePage() {
  const pi = people.find(p => p.id === 'pi-1');
  const groupedPeople = categoryOrder.reduce<Record<Person['category'], Person[]>>((acc, category) => {
    acc[category] = people.filter(p => p.category === category && p.id !== 'pi-1');
    return acc;
  }, {} as Record<Person['category'], Person[]>);

  return (
    <Layout>
      <PageHeader
        title="Our Team"
        subtitle="Meet the researchers, students, and staff who make our work possible."
      />

      {/* Principal Investigator */}
      {pi && (
        <Section>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            Principal Investigator
          </h2>
          <PersonCard person={pi} featured />
        </Section>
      )}

      {/* Other Categories */}
      {categoryOrder.map((category) => {
        const members = groupedPeople[category];
        if (!members || members.length === 0) return null;

        return (
          <Section key={category} className="border-t border-border">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              {categoryLabels[category]}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((person, idx) => (
                <div
                  key={person.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </Section>
        );
      })}
    </Layout>
  );
}
