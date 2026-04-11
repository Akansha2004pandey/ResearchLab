import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { PersonCard } from '@/components/PersonCard';
import { categoryLabels, Person } from '@/data/people';
import { usePeople } from '@/hooks/useLabData';
import { Skeleton } from '@/components/ui/skeleton';

const categoryOrder: Person['category'][] = ['faculty', 'phd', 'staff', 'masters', 'undergrad', 'alumni'];

export default function PeoplePage() {
  const { data: people = [], isLoading } = usePeople();
  const pi = people.find(p => p.id === 'pi-1');

  const renderPersonGrid = (members: Person[]) => (
    <div className="grid grid-cols-12 gap-6">
      {members.map((person, idx) => (
        <div
          key={person.id}
          className="animate-fade-in-up col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          <PersonCard person={person} />
        </div>
      ))}
    </div>
  );

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

      {isLoading && (
        <Section>
          <div className="grid grid-cols-12 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="col-span-12 md:col-span-6 lg:col-span-3 h-64 rounded-none" />
            ))}
          </div>
        </Section>
      )}

      {/* Principal Investigator */}
      {!isLoading && pi && (
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

        if (category === 'staff') {
          const projectFellows = members.filter((person) => !person.role.toLowerCase().includes('intern'));
          const interns = members.filter((person) => person.role.toLowerCase().includes('intern'));

          return (
            <Section key={category} className="border-t border-border/70">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                {categoryLabels[category]}
              </h2>

              {projectFellows.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-medium text-foreground">Project Fellows</h3>
                  {renderPersonGrid(projectFellows)}
                </div>
              )}

              {interns.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-foreground">Interns</h3>
                  {renderPersonGrid(interns)}
                </div>
              )}
            </Section>
          );
        }

        if (category === 'alumni') {
          const groupedByYear = members.reduce<Record<string, Person[]>>((acc, person) => {
            const year = person.yearLeft ?? person.yearJoined ?? 0;
            const key = year > 0 ? String(year) : 'Year not specified';
            if (!acc[key]) acc[key] = [];
            acc[key].push(person);
            return acc;
          }, {});

          const sortedYears = Object.keys(groupedByYear).sort((a, b) => {
            if (a === 'Year not specified') return 1;
            if (b === 'Year not specified') return -1;
            return Number(b) - Number(a);
          });

          return (
            <Section key={category} className="border-t border-border/70">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                {categoryLabels[category]}
              </h2>

              <div className="space-y-8">
                {sortedYears.map((year) => (
                  <div key={year}>
                    <h3 className="mb-4 text-lg font-medium text-foreground">
                      {year === 'Year not specified' ? year : `Class of ${year}`}
                    </h3>
                    {renderPersonGrid(groupedByYear[year])}
                  </div>
                ))}
              </div>
            </Section>
          );
        }

        return (
          <Section key={category} className="border-t border-border/70">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
              {categoryLabels[category]}
            </h2>
            {renderPersonGrid(members)}
          </Section>
        );
      })}
    </Layout>
  );
}
