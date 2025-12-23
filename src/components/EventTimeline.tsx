import { useState } from 'react';
import { LabEvent, eventTypeColors, eventTypeLabels } from '@/data/events';
import { format, parseISO, getYear } from 'date-fns';
import { cn } from '@/lib/utils';
import { EventModal } from './EventModal';

interface EventTimelineProps {
  events: LabEvent[];
}

export function EventTimeline({ events }: EventTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<LabEvent | null>(null);

  // Group events by year
  const eventsByYear = events.reduce<Record<number, LabEvent[]>>((acc, event) => {
    const year = getYear(parseISO(event.date));
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  const years = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

        {years.map((year, yearIndex) => (
          <div key={year} className="relative">
            {/* Year Marker */}
            <div className="flex items-center gap-4 mb-8">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                <span className="text-xs font-bold text-primary-foreground">{year.toString().slice(-2)}</span>
              </div>
              <div className="ml-16 md:ml-0 md:absolute md:left-1/2 md:translate-x-6">
                <span className="font-heading text-2xl font-bold text-foreground">{year}</span>
              </div>
            </div>

            {/* Events */}
            <div className="space-y-6 mb-12">
              {eventsByYear[year].map((event, eventIndex) => {
                const isLeft = eventIndex % 2 === 0;
                const colors = eventTypeColors[event.type];
                const formattedDate = format(parseISO(event.date), 'MMM d');

                return (
                  <div
                    key={event.id}
                    className={cn(
                      'relative flex items-start',
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    )}
                    style={{ animationDelay: `${eventIndex * 0.1}s` }}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary mt-2 z-10" />

                    {/* Card */}
                    <div
                      className={cn(
                        'ml-12 md:ml-0 md:w-[calc(50%-2rem)] cursor-pointer',
                        isLeft ? 'md:pr-8' : 'md:pl-8'
                      )}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="group p-4 rounded-xl border border-border bg-card hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', colors.bg, colors.text)}>
                            {eventTypeLabels[event.type]}
                          </span>
                          <span className="text-xs text-muted-foreground">{formattedDate}</span>
                        </div>
                        <h4 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
