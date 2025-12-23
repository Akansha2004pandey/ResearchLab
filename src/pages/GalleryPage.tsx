import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { galleryImages, galleryCategoryLabels, GalleryCategory, GalleryImage } from '@/data/gallery';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterType = GalleryCategory | 'all';

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'conference', label: 'Conferences' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'lab', label: 'Lab Activities' },
  { value: 'outreach', label: 'Outreach' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') return galleryImages;
    return galleryImages.filter(img => img.category === activeFilter);
  }, [activeFilter]);

  const currentIndex = selectedImage
    ? filteredImages.findIndex(img => img.id === selectedImage.id)
    : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Photo Gallery"
        subtitle="Moments from conferences, workshops, lab activities, and outreach events."
      />

      <Section>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, idx) => (
            <div
              key={image.id}
              className="break-inside-avoid group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm text-background font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-background/80 hover:text-background transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 p-2 text-background/80 hover:text-background transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}
          {currentIndex < filteredImages.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 p-2 text-background/80 hover:text-background transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] w-full animate-scale-in">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-background/90">{selectedImage.caption}</p>
              <p className="text-sm text-background/60 mt-1">
                {galleryCategoryLabels[selectedImage.category]} • {selectedImage.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
