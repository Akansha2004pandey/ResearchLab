import { LabEvent, eventTypeColors, eventTypeLabels } from '@/data/events';
import { X, Calendar, MapPin, Clock, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface EventModalProps {
  event: LabEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!event || !isOpen) return null;

  const colors = eventTypeColors[event.type];
  const formattedDate = format(parseISO(event.date), 'MMMM d, yyyy');
  const endDateFormatted = event.endDate ? format(parseISO(event.endDate), 'MMMM d, yyyy') : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        {event.posterImage && (
          <div className="relative h-48 sm:h-64">
            <img
              src={event.posterImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className={cn('p-6', !event.posterImage && 'pt-12')}>
          {/* Badge */}
          <span className={cn('inline-block px-3 py-1 text-sm font-medium rounded-full mb-4', colors.bg, colors.text)}>
            {eventTypeLabels[event.type]}
          </span>

          {/* Title */}
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            {event.title}
          </h2>

          {/* Meta */}
          <div className="grid gap-3 mb-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span>
                {formattedDate}
                {endDateFormatted && ` – ${endDateFormatted}`}
              </span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{event.venue}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>{event.time}</span>
              </div>
            )}
            {event.speaker && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="w-5 h-5 text-primary" />
                <span>
                  {event.speaker}
                  {event.speakerAffiliation && `, ${event.speakerAffiliation}`}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none text-muted-foreground mb-6">
            <p>{event.fullDescription || event.description}</p>
          </div>

          {/* Actions */}
          {event.registrationUrl && event.status === 'upcoming' && (
            <Button asChild className="w-full sm:w-auto">
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                Register Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
