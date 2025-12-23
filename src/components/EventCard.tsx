import { LabEvent, eventTypeColors, eventTypeLabels } from '@/data/events';
import { Calendar, MapPin, Clock, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface EventCardProps {
  event: LabEvent;
  onViewDetails?: () => void;
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
  const colors = eventTypeColors[event.type];
  const formattedDate = format(parseISO(event.date), 'MMM d, yyyy');

  return (
    <div className="group p-5 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full', colors.bg, colors.text)}>
          {eventTypeLabels[event.type]}
        </span>
        <span className="text-sm text-muted-foreground">{formattedDate}</span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      {/* Meta */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{event.venue}</span>
        </div>
        {event.time && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{event.time}</span>
          </div>
        )}
        {event.speaker && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-3.5 h-3.5" />
            <span>{event.speaker}</span>
            {event.speakerAffiliation && (
              <span className="text-xs">({event.speakerAffiliation})</span>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
        {event.registrationUrl && event.status === 'upcoming' && (
          <Button size="sm" asChild>
            <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
              Register
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
