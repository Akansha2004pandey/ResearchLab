export type NewsCategory = 'paper' | 'grant' | 'award' | 'media' | 'general';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: NewsCategory;
  description: string;
  image?: string;
  link?: string;
}

export const news: NewsItem[] = [
  {
    id: "news-1",
    title: "Paper Accepted at Nature Machine Intelligence",
    date: "2024-12-15",
    category: "paper",
    description: "Our paper 'Understanding Deep Learning Through the Lens of Optimization Geometry' has been accepted at Nature Machine Intelligence. This work provides new theoretical insights into why deep learning works.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop"
  },
  {
    id: "news-2",
    title: "₹2.5M NSF Grant Awarded for Trustworthy ML Research",
    date: "2024-11-20",
    category: "grant",
    description: "Dr. Vasquez has been awarded a major NSF grant to study the foundations of trustworthy machine learning over the next five years."
  },
  {
    id: "news-3",
    title: "Sarah Mitchell Receives Google PhD Fellowship",
    date: "2024-10-15",
    category: "award",
    description: "PhD student Sarah Mitchell has been selected for the prestigious Google PhD Fellowship in Machine Learning for her work on safe reinforcement learning.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop"
  },
  {
    id: "news-4",
    title: "Lab Research Featured in MIT Technology Review",
    date: "2024-09-30",
    category: "media",
    description: "Our work on AI for medical imaging was featured in MIT Technology Review's coverage of breakthrough AI applications in healthcare.",
    link: "#"
  },
  {
    id: "news-5",
    title: "Three Papers Accepted at NeurIPS 2024",
    date: "2024-09-15",
    category: "paper",
    description: "The lab will present three papers at NeurIPS 2024 covering topics in optimization, graph neural networks, and natural language understanding."
  },
  {
    id: "news-6",
    title: "Dr. Vasquez Named ACM Fellow",
    date: "2024-08-20",
    category: "award",
    description: "Dr. Elena Vasquez has been named an ACM Fellow for her contributions to machine learning theory and practice.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  },
  {
    id: "news-7",
    title: "New Partnership with Local Hospital for AI Diagnostics",
    date: "2024-07-10",
    category: "general",
    description: "We're excited to announce a new partnership with NSUT Research Hospital to develop and deploy AI diagnostic tools in clinical settings."
  },
  {
    id: "news-8",
    title: "Best Paper Award at CVPR 2024",
    date: "2024-06-20",
    category: "award",
    description: "David Kim's paper on self-supervised learning for medical imaging received a Best Paper Award at CVPR 2024.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop"
  },
  {
    id: "news-9",
    title: "Lab Hosts Successful ML Summer School",
    date: "2024-06-01",
    category: "general",
    description: "Over 100 students from around the world participated in our week-long machine learning summer school, featuring lectures and hands-on projects.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"
  },
  {
    id: "news-10",
    title: "Microsoft Research Grant for Responsible AI",
    date: "2024-05-15",
    category: "grant",
    description: "We've received a ₹400,000 grant from Microsoft Research to develop tools and frameworks for responsible AI development."
  }
];

export const newsCategoryLabels: Record<NewsCategory, string> = {
  paper: 'Paper Acceptance',
  grant: 'Grant',
  award: 'Award',
  media: 'Media Mention',
  general: 'Announcement'
};

export const newsCategoryColors: Record<NewsCategory, { bg: string; text: string }> = {
  paper: { bg: 'bg-blue-100', text: 'text-blue-700' },
  grant: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  award: { bg: 'bg-amber-100', text: 'text-amber-700' },
  media: { bg: 'bg-purple-100', text: 'text-purple-700' },
  general: { bg: 'bg-muted', text: 'text-muted-foreground' }
};
