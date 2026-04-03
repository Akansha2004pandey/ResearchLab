import { useMemo, useState } from 'react';
import { getYear, parseISO } from 'date-fns';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { useTimeline } from '@/hooks/useLabData';
import { events as fallbackEvents, type LabEvent } from '@/data/events';
import { EventGalleryModal } from '@/components/timeline/EventGalleryModal';
import { TimelineItem } from '@/components/timeline/TimelineItem';
import { Skeleton } from '@/components/ui/skeleton';

function getEventYear(event: LabEvent) {
  try {
    return getYear(parseISO(event.date));
  } catch {
    return Number(event.date.slice(0, 4)) || new Date().getFullYear();
  }
}

export default function TimelinePage() {
  const { data: timelineData = [], isLoading } = useTimeline();
  const [selectedEvent, setSelectedEvent] = useState<LabEvent | null>(null);

  const timelineEvents = timelineData.length > 0 ? timelineData : fallbackEvents;

  const groupedByYear = useMemo(() => {
    const groups = timelineEvents.reduce<Record<number, LabEvent[]>>((acc, event) => {
      const year = getEventYear(event);
      if (!acc[year]) acc[year] = [];
      acc[year].push(event);
      return acc;
    }, {});

    return Object.entries(groups)
      .map(([year, items]) => ({
        year: Number(year),
        items: [...items].sort((a, b) => b.date.localeCompare(a.date)),
      }))
      .sort((a, b) => b.year - a.year);
  }, [timelineEvents]);

  return (
    <Layout>
      <PageHeader
        title="Lab Timeline"
        subtitle="A unified view of our conferences, workshops, seminars, and outreach activities. Click any event or the folder icon on the timeline to open its full-screen collage."
      />

      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute bottom-0 left-[11px] top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

              <div className="space-y-8">
                {groupedByYear.map((group) => (
                  <div key={group.year}>
                    <div className="mb-4 flex items-center md:justify-center">
                      <span className="ml-8 inline-flex rounded-full border border-border/70 bg-background px-3 py-1 text-sm font-medium text-foreground md:ml-0">
                        {group.year}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {group.items.map((event, index) => (
                        <TimelineItem
                          key={event.id}
                          event={event}
                          align={index % 2 === 0 ? 'left' : 'right'}
                          onOpen={() => setSelectedEvent(event)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <EventGalleryModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </Layout>
  );
}
