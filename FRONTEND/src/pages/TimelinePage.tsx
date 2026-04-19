import { useMemo, useState } from 'react';
import { getYear, parseISO } from 'date-fns';
import { FileImage, FolderOpen } from 'lucide-react';
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
      previews: (event.images.length > 0 ? event.images : event.posterImage ? [event.posterImage] : []).slice(0, 3),
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
        title="Lab Timeline & Gallery"
        subtitle="Browse event folders to open full-screen collages, then explore the timeline for the chronological record of lab activities."
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
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-medium text-foreground">Gallery folders</h2>
                  <p className="text-xs text-muted-foreground">Click any folder to open collage</p>
                </div>

                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max gap-4">
                    {eventFolders.map(({ event, previews, count }) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      title={event.title}
                      aria-label={`Open collage for ${event.title}`}
                      className="group w-36 flex-shrink-0 text-left"
                    >
                      <div className="relative h-24">
                        <div className="absolute left-3 top-0 h-6 w-16 rounded-t-lg border border-border/70 bg-card" />
                        <div className="absolute inset-x-0 bottom-0 top-4 overflow-hidden rounded-xl border border-border/70 bg-card p-2 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                          {previews.length > 0 ? (
                            <div className="relative h-full">
                              {previews.map((preview, index) => (
                                <div
                                  key={`${event.id}-preview-${index}`}
                                  className="absolute h-12 w-10 overflow-hidden rounded-md border border-border/70 bg-background shadow"
                                  style={{
                                    left: `${10 + index * 24}px`,
                                    top: `${8 + index * 2}px`,
                                    transform: `rotate(${index === 0 ? -7 : index === 1 ? -2 : 4}deg)`,
                                  }}
                                >
                                  <img src={preview} alt="" className="h-full w-full object-cover" />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <FolderOpen className="h-8 w-8 text-primary" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <FileImage className="h-3.5 w-3.5" />
                        <span>{count} file{count === 1 ? '' : 's'}</span>
                      </div>
                    </button>
                    ))}
                  </div>
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
