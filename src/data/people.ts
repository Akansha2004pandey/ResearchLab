export interface Person {
  id: string;
  name: string;
  role: string;
  category: 'faculty' | 'phd' | 'masters' | 'undergrad' | 'staff' | 'alumni';
  image: string;
  bio: string;
  researchInterests: string[];
  email?: string;
  googleScholar?: string;
  linkedin?: string;
  website?: string;
  yearJoined?: number;
  yearLeft?: number;
  imageClassName?: string;
}

export const people: Person[] = [
  {
    id: "pi-1",
    name: "Dr. Ankur Gupta",
    role: "Principal Investigator & Professor",
    category: "faculty",
    image: "/professor-ankur-gupta-square.png",
    bio: "Dr. Gupta leads the lab with extensive experience in his field. His work focuses on developing novel algorithms for complex systems.",
    researchInterests: ["Machine Learning", "Artificial Intelligence", "Information Systems"],
    email: "ankur.gupta@nsut.ac.in",
    googleScholar: "https://scholar.google.com/citations?user=placeholder",
    linkedin: "https://www.linkedin.com/in/ankursynon/?originalSubdomain=in",
    website: "https://example.com/dr-ankur-gupta",
    yearJoined: 2010,
  },
  {
    id: "faculty-2",
    name: "Dr. Michael Chen",
    role: "Associate Professor",
    category: "faculty",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Specializes in natural language processing and computational linguistics with a focus on multilingual systems.",
    researchInterests: ["NLP", "Computational Linguistics", "Deep Learning"],
    email: "m.chen@nsut.ac.in",
    googleScholar: "https://scholar.google.com",
    yearJoined: 2015,
  },
  {
    id: "phd-1",
    name: "Sarah Mitchell",
    role: "PhD Candidate",
    category: "phd",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Researching reinforcement learning applications in robotics and autonomous systems.",
    researchInterests: ["Reinforcement Learning", "Robotics", "Control Systems"],
    email: "s.mitchell@nsut.ac.in",
    yearJoined: 2021,
  },
  {
    id: "phd-2",
    name: "James Wilson",
    role: "PhD Candidate",
    category: "phd",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Focused on graph neural networks and their applications in drug discovery.",
    researchInterests: ["Graph Neural Networks", "Bioinformatics", "Drug Discovery"],
    email: "j.wilson@nsut.ac.in",
    yearJoined: 2020,
  },
  {
    id: "phd-3",
    name: "Aisha Patel",
    role: "PhD Student",
    category: "phd",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Working on explainable AI and interpretable machine learning models.",
    researchInterests: ["Explainable AI", "Interpretability", "Fairness in ML"],
    email: "a.patel@nsut.ac.in",
    yearJoined: 2022,
  },
  {
    id: "masters-1",
    name: "David Kim",
    role: "Masters Student",
    category: "masters",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Exploring computer vision applications in medical imaging.",
    researchInterests: ["Computer Vision", "Medical Imaging", "CNNs"],
    email: "d.kim@nsut.ac.in",
    yearJoined: 2023,
  },
  {
    id: "masters-2",
    name: "Emily Rodriguez",
    role: "Masters Student",
    category: "masters",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    bio: "Researching federated learning and privacy-preserving machine learning.",
    researchInterests: ["Federated Learning", "Privacy", "Distributed Systems"],
    email: "e.rodriguez@nsut.ac.in",
    yearJoined: 2023,
  },
  {
    id: "undergrad-1",
    name: "Alex Thompson",
    role: "Research Assistant",
    category: "undergrad",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    bio: "Junior undergraduate student interested in AI ethics and responsible AI.",
    researchInterests: ["AI Ethics", "Responsible AI"],
    email: "a.thompson@nsut.ac.in",
    yearJoined: 2023,
  },
  {
    id: "staff-1",
    name: "Jennifer Lee",
    role: "Lab Manager",
    category: "staff",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    bio: "Manages day-to-day operations of the lab and coordinates research activities.",
    researchInterests: ["Research Administration", "Project Management"],
    email: "j.lee@nsut.ac.in",
    yearJoined: 2018,
  },
  {
    id: "alumni-1",
    name: "Dr. Robert Kumar",
    role: "Former PhD (Now at Google AI)",
    category: "alumni",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "Completed PhD in 2022 with thesis on transformer architectures. Now a Research Scientist at Google AI.",
    researchInterests: ["Transformers", "Large Language Models"],
    yearJoined: 2017,
    yearLeft: 2022,
  },
  {
    id: "alumni-2",
    name: "Dr. Lisa Wang",
    role: "Former PhD (Now at MIT)",
    category: "alumni",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop",
    bio: "Completed PhD in 2021 with groundbreaking work on meta-learning. Currently Assistant Professor at MIT.",
    researchInterests: ["Meta-Learning", "Few-Shot Learning"],
    yearJoined: 2016,
    yearLeft: 2021,
  },
];

export const categoryLabels: Record<Person['category'], string> = {
  faculty: 'Faculty',
  phd: 'PhD Students',
  masters: 'Masters Students',
  undergrad: 'Undergraduate Researchers',
  staff: 'Staff',
  alumni: 'Alumni',
};
