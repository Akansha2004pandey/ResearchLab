export type GalleryCategory = 'conference' | 'workshop' | 'lab' | 'outreach';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  date: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "img-1",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    alt: "Conference presentation",
    caption: "Dr. Vasquez presenting our latest research at NeurIPS 2024",
    category: "conference",
    date: "2024-12"
  },
  {
    id: "img-2",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    alt: "Team at conference",
    caption: "Lab team at ICML 2024 in Vienna",
    category: "conference",
    date: "2024-07"
  },
  {
    id: "img-3",
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    alt: "Workshop session",
    caption: "Hands-on workshop on deep learning fundamentals",
    category: "workshop",
    date: "2024-10"
  },
  {
    id: "img-4",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    alt: "Lab meeting",
    caption: "Weekly lab meeting discussing recent papers",
    category: "lab",
    date: "2024-11"
  },
  {
    id: "img-5",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    alt: "Team collaboration",
    caption: "Collaborative research session with visiting scholars",
    category: "lab",
    date: "2024-09"
  },
  {
    id: "img-6",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
    alt: "Outreach event",
    caption: "AI for Social Good workshop with high school students",
    category: "outreach",
    date: "2024-08"
  },
  {
    id: "img-7",
    src: "https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800&h=600&fit=crop",
    alt: "Poster session",
    caption: "Poster session at our annual workshop",
    category: "workshop",
    date: "2024-01"
  },
  {
    id: "img-8",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    alt: "Lab celebration",
    caption: "Celebrating multiple paper acceptances",
    category: "lab",
    date: "2024-06"
  },
  {
    id: "img-9",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    alt: "Conference talk",
    caption: "Michael Chen keynote at ACL 2024",
    category: "conference",
    date: "2024-08"
  },
  {
    id: "img-10",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    alt: "Outreach teaching",
    caption: "Teaching coding to underrepresented students",
    category: "outreach",
    date: "2024-05"
  },
  {
    id: "img-11",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    alt: "Workshop presentation",
    caption: "Computer vision workshop demonstration",
    category: "workshop",
    date: "2024-10"
  },
  {
    id: "img-12",
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
    alt: "Lab equipment",
    caption: "Our new GPU cluster for large-scale experiments",
    category: "lab",
    date: "2024-03"
  }
];

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  conference: 'Conferences',
  workshop: 'Workshops',
  lab: 'Lab Activities',
  outreach: 'Outreach'
};
