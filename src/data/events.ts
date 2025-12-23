export type EventType = 'seminar' | 'workshop' | 'conference' | 'hackathon' | 'webinar' | 'outreach';

export interface LabEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  endDate?: string;
  time?: string;
  venue: string;
  description: string;
  fullDescription?: string;
  speaker?: string;
  speakerAffiliation?: string;
  posterImage?: string;
  registrationUrl?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

export const events: LabEvent[] = [
  {
    id: "event-1",
    title: "AI Safety and Alignment: Current Challenges",
    type: "seminar",
    date: "2025-01-15",
    time: "3:00 PM - 4:30 PM",
    venue: "Room 301, Computer Science Building",
    description: "A deep dive into the challenges of building safe and aligned AI systems.",
    fullDescription: "Join us for an in-depth seminar on AI safety and alignment. We'll explore current research directions, open problems, and practical approaches to building AI systems that behave as intended. The talk will cover topics including reward hacking, distributional shift, and value alignment.",
    speaker: "Dr. Stuart Armstrong",
    speakerAffiliation: "Future of Humanity Institute, Oxford",
    status: "upcoming",
    registrationUrl: "#"
  },
  {
    id: "event-2",
    title: "Annual ML Winter Workshop 2025",
    type: "workshop",
    date: "2025-01-20",
    endDate: "2025-01-22",
    venue: "University Conference Center",
    description: "Three-day intensive workshop on the latest advances in machine learning.",
    fullDescription: "Our flagship annual workshop brings together researchers from academia and industry to discuss cutting-edge developments in machine learning. Features keynote speeches, paper presentations, poster sessions, and networking events.",
    posterImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    status: "upcoming",
    registrationUrl: "#"
  },
  {
    id: "event-3",
    title: "NLP Hackathon: Building Language Applications",
    type: "hackathon",
    date: "2025-02-08",
    endDate: "2025-02-09",
    venue: "Innovation Hub, Building A",
    description: "48-hour hackathon focused on building practical NLP applications.",
    fullDescription: "Team up with fellow students and researchers to build innovative NLP applications. Prizes for best projects. Mentorship from lab members and industry sponsors available throughout the event.",
    posterImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    status: "upcoming",
    registrationUrl: "#"
  },
  {
    id: "event-4",
    title: "Webinar: Introduction to Graph Neural Networks",
    type: "webinar",
    date: "2025-01-10",
    time: "2:00 PM - 3:00 PM",
    venue: "Online (Zoom)",
    description: "Beginner-friendly introduction to graph neural networks and their applications.",
    fullDescription: "This webinar provides a gentle introduction to graph neural networks for those new to the field. We'll cover the basics of graph representation learning, popular GNN architectures, and real-world applications.",
    speaker: "James Wilson",
    speakerAffiliation: "Computational Intelligence Lab",
    status: "upcoming",
    registrationUrl: "#"
  },
  {
    id: "event-5",
    title: "AI for Social Good: Outreach Program",
    type: "outreach",
    date: "2025-01-25",
    time: "10:00 AM - 4:00 PM",
    venue: "Community Center, Downtown",
    description: "Bringing AI education to underserved communities through hands-on workshops.",
    fullDescription: "Part of our ongoing commitment to making AI accessible to all. Lab members will lead interactive workshops introducing basic AI concepts to high school students from underrepresented backgrounds.",
    status: "upcoming"
  },
  {
    id: "event-6",
    title: "Deep Learning in Healthcare Symposium",
    type: "conference",
    date: "2024-12-15",
    endDate: "2024-12-16",
    venue: "Medical School Auditorium",
    description: "Two-day symposium on applications of deep learning in healthcare.",
    fullDescription: "This symposium brought together clinicians, researchers, and industry partners to discuss the latest developments in AI for healthcare. Keynote speakers from leading medical AI companies shared insights on deployment challenges and success stories.",
    posterImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
    status: "past"
  },
  {
    id: "event-7",
    title: "Research Seminar: Advances in Reinforcement Learning",
    type: "seminar",
    date: "2024-12-05",
    time: "4:00 PM - 5:00 PM",
    venue: "Room 201, CS Building",
    description: "Overview of recent advances in reinforcement learning theory and practice.",
    speaker: "Sarah Mitchell",
    speakerAffiliation: "Computational Intelligence Lab",
    status: "past"
  },
  {
    id: "event-8",
    title: "Industry Panel: AI Careers and Opportunities",
    type: "webinar",
    date: "2024-11-20",
    time: "5:00 PM - 6:30 PM",
    venue: "Online (Zoom)",
    description: "Panel discussion with AI professionals from top tech companies.",
    fullDescription: "Alumni and industry partners discussed career paths in AI, sharing advice on breaking into the field and advancing your career. Topics included research vs. industry, startup vs. large company, and emerging roles in AI.",
    status: "past"
  },
  {
    id: "event-9",
    title: "Computer Vision Workshop: From Theory to Practice",
    type: "workshop",
    date: "2024-10-28",
    endDate: "2024-10-29",
    venue: "Engineering Building, Room 500",
    description: "Hands-on workshop covering modern computer vision techniques.",
    fullDescription: "Participants learned to implement state-of-the-art computer vision models, from classical techniques to modern deep learning approaches. The workshop included practical sessions on object detection, segmentation, and video analysis.",
    posterImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
    status: "past"
  },
  {
    id: "event-10",
    title: "PhD Open House 2024",
    type: "outreach",
    date: "2024-10-15",
    time: "9:00 AM - 5:00 PM",
    venue: "CS Department",
    description: "Open house for prospective PhD students interested in AI research.",
    fullDescription: "Prospective students met with current lab members, toured facilities, and learned about our research programs. The event included research presentations, Q&A sessions, and informal discussions over lunch.",
    status: "past"
  }
];

export const eventTypeColors: Record<EventType, { bg: string; text: string; border: string }> = {
  seminar: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  workshop: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  conference: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  hackathon: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  webinar: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
  outreach: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' }
};

export const eventTypeLabels: Record<EventType, string> = {
  seminar: 'Seminar',
  workshop: 'Workshop',
  conference: 'Conference',
  hackathon: 'Hackathon',
  webinar: 'Webinar',
  outreach: 'Outreach'
};
