import { format, parseISO } from 'date-fns';
import { FolderOpen } from 'lucide-react';
import { LabEvent, eventTypeLabels } from '@/data/events';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  event: LabEvent;
  align: 'left' | 'right';
  onOpen: () => void;
}

function safeDate(value: string) {
  try {
    return format(parseISO(value), 'MMM d, yyyy');
  } catch {
    return value;
  }
}

export function TimelineItem({ event, align, onOpen }: TimelineItemProps) {
  return (
    <div
      className={cn(
        'relative pl-8 md:w-1/2 md:pl-0',
        align === 'left' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${event.title} collage`}
        title="Open collage"
        className={cn(
          'absolute top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-sm transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground',
          align === 'left' ? 'left-[-5px] md:left-auto md:right-[-16px]' : 'left-[-5px] md:left-[-16px]'
        )}
      >
        <FolderOpen className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onOpen}
        className="w-full rounded-xl border border-border/70 bg-card p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
            {eventTypeLabels[event.type]}
          </span>
          <span className="text-xs text-muted-foreground">{safeDate(event.date)}</span>
        </div>

        <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        <p className="mt-2 text-xs text-primary">Open gallery</p>
      </button>
    </div>
  );
}
