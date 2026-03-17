import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeader } from '@/components/Section';
import { EventCard } from '@/components/EventCard';
import { EventTimeline } from '@/components/EventTimeline';
import { EventModal } from '@/components/EventModal';
import { events, LabEvent } from '@/data/events';
import { cn } from '@/lib/utils';

type ViewType = 'upcoming' | 'ongoing' | 'past';

const viewTabs: { value: ViewType; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past Events' },
];

export default function EventsPage() {
  const [activeView, setActiveView] = useState<ViewType>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<LabEvent | null>(null);
  const [showTimeline, setShowTimeline] = useState(true);

  const filteredEvents = events.filter(e => {
    if (activeView === 'upcoming') return e.status === 'upcoming' || e.status === 'ongoing';
    return e.status === 'past';
  });

  return (
    <Layout>
      <PageHeader
        title="Events"
        subtitle="Join us for seminars, workshops, conferences, and more."
      />

      <Section>
        {/* View Toggles */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {viewTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveView(tab.value)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  activeView === tab.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeView === 'past' && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowTimeline(true)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  showTimeline
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                )}
              >
                Timeline
              </button>
              <button
                onClick={() => setShowTimeline(false)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  !showTimeline
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                )}
              >
                Grid
              </button>
            </div>
          )}
        </div>

        {/* Events Display */}
        {filteredEvents.length > 0 ? (
          activeView === 'past' && showTimeline ? (
            <EventTimeline events={filteredEvents} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, idx) => (
                <div
                  key={event.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <EventCard
                    event={event}
                    onViewDetails={() => setSelectedEvent(event)}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {activeView === 'upcoming'
                ? 'No upcoming events at the moment. Check back soon!'
                : 'No past events to display.'}
            </p>
          </div>
        )}
      </Section>

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </Layout>
  );
}
