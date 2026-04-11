import { useMemo, useState } from 'react';
import { getYear, parseISO } from 'date-fns';
import { FolderOpen } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { useTimeline } from '@/hooks/useLabData';
import { events as fallbackEvents, type LabEvent } from '@/data/events';
import { EventGalleryModal } from '@/components/timeline/EventGalleryModal';
import { TimelineItem } from '@/components/timeline/TimelineItem';
import { Skeleton } from '@/components/ui/skeleton';

const TIMELINE_START_DATE = '2023-02-01';

function includeInTimeline(eventDate: string) {
  return eventDate >= TIMELINE_START_DATE;
}

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

  const timelineEvents = (timelineData.length > 0 ? timelineData : fallbackEvents)
    .filter((event) => includeInTimeline(event.date));

  const eventFolders = useMemo(
    () => timelineEvents.map((event) => ({
      event,
      cover: event.images[0] || event.posterImage || '',
      count: event.images.length > 0 ? event.images.length : event.posterImage ? 1 : 0,
    })),
    [timelineEvents]
  );

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
            <div className="space-y-10">
              <section>
                <h2 className="mb-4 text-lg font-medium text-foreground">Event folders</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {eventFolders.map(({ event, cover, count }) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {cover ? (
                        <img src={cover} alt={event.title} className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                      ) : (
                        <div className="flex h-44 w-full items-center justify-center bg-muted/60">
                          <FolderOpen className="h-10 w-10 text-primary" />
                        </div>
                      )}

                      <div className="p-4">
                        <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                          <FolderOpen className="h-3 w-3" />
                          Folder
                        </div>
                        <h3 className="line-clamp-2 text-base font-medium text-foreground">{event.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{event.date} • {count} photo{count === 1 ? '' : 's'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="relative">
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
              </section>
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
