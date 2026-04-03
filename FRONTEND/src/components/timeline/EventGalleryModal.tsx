import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Images } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { LabEvent, eventTypeLabels } from '@/data/events';
import { ImageCollage } from './ImageCollage';
import { cn } from '@/lib/utils';

interface EventGalleryModalProps {
  event: LabEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

function safeDate(value: string) {
  try {
    return format(parseISO(value), 'MMMM d, yyyy');
  } catch {
    return value;
  }
}

export function EventGalleryModal({ event, isOpen, onClose }: EventGalleryModalProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveImage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const onEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        if (activeImage) {
          setActiveImage(null);
          return;
        }
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', onEscape);
    }

    return () => window.removeEventListener('keydown', onEscape);
  }, [activeImage, isOpen, onClose]);

  const images = useMemo(() => {
    if (!event) return [];
    if (event.images.length > 0) return event.images;
    return event.posterImage ? [event.posterImage] : [];
  }, [event]);

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-[60] overflow-hidden bg-background"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-border/70 bg-background/95 backdrop-blur-md">
                <div className="mx-auto flex w-full max-w-[1480px] items-start justify-between gap-4 px-4 py-4 md:px-8 md:py-5">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                      <Images className="h-3.5 w-3.5" />
                      <span>{eventTypeLabels[event.type]}</span>
                    </div>
                    <h3 className="text-balance text-2xl font-semibold text-foreground md:text-4xl">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{safeDate(event.date)}{event.venue ? ` · ${event.venue}` : ''}</p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close event gallery"
                    title="Close"
                    className="rounded-full border border-border/70 bg-background p-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-[1480px] px-4 py-4 md:px-8 md:py-6">
                  <p className="mb-4 max-w-5xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {event.fullDescription || event.description}
                  </p>

                  <ImageCollage
                    images={images}
                    title={event.title}
                    onImageClick={setActiveImage}
                    variant="immersive"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {activeImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/80 p-4"
                onClick={() => setActiveImage(null)}
              >
                <img
                  src={activeImage}
                  alt={`${event.title} enlarged`}
                  className={cn('max-h-[88vh] max-w-[92vw] rounded-xl border border-border/70 bg-background object-contain')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
