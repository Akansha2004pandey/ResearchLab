import { cn } from '@/lib/utils';

interface ImageCollageProps {
  images: string[];
  title: string;
  onImageClick?: (image: string) => void;
  variant?: 'compact' | 'immersive';
}

const collagePattern = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
];

const immersivePattern = [
  'col-span-12 md:col-span-8 md:row-span-2',
  'col-span-6 md:col-span-4 row-span-1',
  'col-span-6 md:col-span-4 row-span-1',
  'col-span-12 md:col-span-5 row-span-1',
  'col-span-12 md:col-span-7 row-span-1',
  'col-span-6 md:col-span-4 row-span-1',
  'col-span-6 md:col-span-4 row-span-1',
  'col-span-12 md:col-span-8 md:row-span-2',
];

export function ImageCollage({ images, title, onImageClick, variant = 'compact' }: ImageCollageProps) {
  const safeImages = images.filter(Boolean);

  if (safeImages.length === 0) {
    return (
      <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-10 text-center text-sm text-muted-foreground">
        No images available for this event yet.
      </div>
    );
  }

  if (variant === 'immersive' && safeImages.length === 1) {
    return (
      <button
        type="button"
        onClick={() => onImageClick?.(safeImages[0])}
        className="group relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card text-left"
      >
        <img
          src={safeImages[0]}
          alt={`${title} image 1`}
          className="h-[65vh] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </button>
    );
  }

  if (variant === 'immersive') {
    return (
      <div className="grid grid-cols-12 auto-rows-[110px] gap-3 sm:auto-rows-[140px] lg:auto-rows-[170px] xl:auto-rows-[200px]">
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => onImageClick?.(image)}
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-border/70 bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
              immersivePattern[index % immersivePattern.length]
            )}
          >
            <img
              src={image}
              alt={`${title} image ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent opacity-70" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 auto-rows-[100px] gap-2 md:auto-rows-[120px]">
      {safeImages.map((image, index) => (
        <button
          key={`${image}-${index}`}
          type="button"
          onClick={() => onImageClick?.(image)}
          className={cn(
            'group relative overflow-hidden rounded-lg border border-border/70 bg-card text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
            collagePattern[index % collagePattern.length]
          )}
        >
          <img
            src={image}
            alt={`${title} image ${index + 1}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}
