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
  github?: string;
  twitter?: string;
  yearJoined?: number;
  yearLeft?: number;
  imageClassName?: string;
}

const avatarFor = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dbeafe&color=1e3a8a&size=256`;

function member(input: Omit<Person, 'image'> & { image?: string }): Person {
  return {
    ...input,
    image: input.image ?? avatarFor(input.name),
  };
}

export const people: Person[] = [
  member({
    id: 'pi-1',
    name: 'Dr. Ankur Gupta',
    role: 'Principal Investigator & Assistant Professor',
    category: 'faculty',
    image: '/professor-ankur-gupta-square.png',
    bio: 'Leads lab research in microfluidics, AI, medical imaging, and intelligent transportation systems.',
    researchInterests: ['Microfluidics', 'Machine Learning', 'Deep Learning', 'Computer Vision'],
    email: 'ankur.gupta@nsut.ac.in',
    googleScholar: 'https://scholar.google.com/citations?user=097-HeYAAAAJ',
    linkedin: 'https://www.linkedin.com/in/ankursynon',
    website: 'https://ankursynon.github.io/',
    github: 'https://github.com/ankursynon',
    twitter: 'https://x.com/ankursynon',
    yearJoined: 2023,
  }),

  member({
    id: 'phd-md-imran-hussain',
    name: 'Md Imran Hussain',
    role: 'PhD Scholar',
    category: 'phd',
    bio: 'Research focus: resilience for secure connected and cyber-physical systems.',
    researchInterests: ['Resilient AI', 'Cyber-Physical Security'],
  }),
  member({
    id: 'phd-purrnima-singh',
    name: 'Purrnima Singh',
    role: 'PhD Scholar',
    category: 'phd',
    bio: 'Research focus: practical machine learning systems and deployment.',
    researchInterests: ['Machine Learning', 'Applied AI'],
  }),

  member({
    id: 'fellow-yash-gupta',
    name: 'Yash Gupta',
    role: 'Project Fellow',
    category: 'staff',
    bio: 'Contributes to funded projects in AI and microfluidic design automation.',
    researchInterests: ['Microfluidics', 'Design Automation'],
  }),
  member({
    id: 'intern-sarthak-agarwal',
    name: 'Sarthak Agarwal',
    role: 'Summer Intern',
    category: 'staff',
    bio: 'Supports experimental pipelines and model benchmarking.',
    researchInterests: ['Machine Learning', 'Data Analysis'],
  }),
  member({
    id: 'intern-varun-kumar',
    name: 'Varun Kumar',
    role: 'Summer Intern',
    category: 'staff',
    bio: 'Assists with research prototypes and experiment execution.',
    researchInterests: ['Applied AI', 'Research Prototyping'],
  }),

  member({
    id: 'mtech-amol',
    name: 'Amol',
    role: 'M.Tech Scholar',
    category: 'masters',
    bio: 'Works on model development and evaluation pipelines.',
    researchInterests: ['Machine Learning', 'Model Evaluation'],
  }),
  member({
    id: 'mtech-aditya-chouksey',
    name: 'Aditya Chouksey',
    role: 'M.Tech Scholar',
    category: 'masters',
    bio: 'Works on optimization and AI system implementation.',
    researchInterests: ['Optimization', 'AI Systems'],
  }),

  member({
    id: 'btech-vansh-kakkar',
    name: 'Vansh Kakkar',
    role: 'B.Tech (4th Year, CSAI • Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher in AI-assisted healthcare applications.',
    researchInterests: ['Healthcare AI', 'Computer Vision'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-madhav-arora',
    name: 'Madhav Arora',
    role: 'B.Tech (4th Year, CSAI • Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher contributing to deep learning studies.',
    researchInterests: ['Deep Learning', 'Medical AI'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-ocean-lakra',
    name: 'Ocean Lakra',
    role: 'B.Tech (4th Year, CSE • Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher exploring practical ML deployment.',
    researchInterests: ['ML Deployment', 'Software Systems'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-aniket-negi',
    name: 'Aniket Negi',
    role: 'B.Tech (3rd Year, Mechanical • Class of 2027)',
    category: 'undergrad',
    bio: 'Undergraduate researcher on interdisciplinary AI engineering tasks.',
    researchInterests: ['Interdisciplinary AI', 'Engineering Applications'],
    yearLeft: 2027,
  }),
  member({
    id: 'btech-ayush-thakur',
    name: 'Ayush Thakur',
    role: 'B.Tech (3rd Year, CSE • Class of 2027)',
    category: 'undergrad',
    bio: 'Undergraduate researcher assisting model training and validation.',
    researchInterests: ['Data Pipelines', 'Model Training'],
    yearLeft: 2027,
  }),
  member({
    id: 'btech-deepak',
    name: 'Deepak',
    role: 'B.Tech (3rd Year, CSAI • Class of 2027)',
    category: 'undergrad',
    bio: 'Undergraduate researcher supporting AI analytics tasks.',
    researchInterests: ['Artificial Intelligence', 'Analytics'],
    yearLeft: 2027,
  }),
  member({
    id: 'btech-harshdip-saha',
    name: 'Harshdip Saha',
    role: 'B.Tech (3rd Year, CSAI • Class of 2027)',
    category: 'undergrad',
    bio: 'Undergraduate researcher focused on baseline model studies.',
    researchInterests: ['Experimentation', 'Baseline Models'],
    yearLeft: 2027,
  }),
  member({
    id: 'btech-harshanth-raja',
    name: 'Harshanth Raja',
    role: 'B.Tech (4th Year, CSE • Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher focused on implementation and evaluation.',
    researchInterests: ['Implementation', 'Evaluation'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-sameeksha-ahlawat',
    name: 'Sameeksha Ahlawat',
    role: 'B.Tech Undergraduate Researcher (Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher contributing to ongoing AI project tasks.',
    researchInterests: ['Applied AI', 'Project Development'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-vyshnavi-kotha',
    name: 'Vyshnavi Kotha',
    role: 'B.Tech Undergraduate Researcher (Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher working on model benchmarking and analysis.',
    researchInterests: ['Benchmarking', 'Model Analysis'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-harsh-gahlawat',
    name: 'Harsh Gahlawat',
    role: 'B.Tech Undergraduate Researcher (Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher assisting implementation workflows.',
    researchInterests: ['Research Implementation', 'Software Tooling'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-kshitij-singh',
    name: 'Kshitij Singh',
    role: 'B.Tech Undergraduate Researcher (Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher supporting experiments across lab projects.',
    researchInterests: ['Applied ML', 'Experiments'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-gopal-kumar',
    name: 'Gopal Kumar',
    role: 'B.Tech Undergraduate Researcher (Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher focused on data processing and validation.',
    researchInterests: ['Data Engineering', 'Validation'],
    yearLeft: 2026,
  }),
  member({
    id: 'btech-mohd-imaad',
    name: 'Mohd Imaad',
    role: 'B.Tech Undergraduate Researcher (Class of 2026)',
    category: 'undergrad',
    bio: 'Undergraduate researcher contributing to AI prototype development.',
    researchInterests: ['Prototyping', 'Applied AI'],
    yearLeft: 2026,
  }),

  member({
    id: 'alumni-vinit-singroha',
    name: 'Vinit Singroha',
    role: 'B.Tech Alumni (Class of 2024)',
    category: 'alumni',
    bio: 'Former lab member with contributions to AI-driven medical imaging projects.',
    researchInterests: ['Medical Imaging', 'Deep Learning'],
    yearLeft: 2024,
  }),
  member({
    id: 'alumni-rithik-kumar',
    name: 'Rithik Kumar',
    role: 'B.Tech Alumni (Class of 2024)',
    category: 'alumni',
    bio: 'Former lab member who worked on machine learning methods for healthcare.',
    researchInterests: ['Healthcare AI', 'Machine Learning'],
    yearLeft: 2024,
  }),
  member({
    id: 'alumni-farhan-khan',
    name: 'Farhan Khan',
    role: 'M.Tech Alumni (Class of 2024)',
    category: 'alumni',
    bio: 'Former lab member with interests in practical AI systems development.',
    researchInterests: ['AI Systems', 'Software Engineering'],
    yearLeft: 2024,
  }),
  member({
    id: 'alumni-anant-kumar',
    name: 'Anant Kumar',
    role: 'B.Tech Alumni (Class of 2025)',
    category: 'alumni',
    bio: 'Former lab member involved in research implementation and experimentation.',
    researchInterests: ['Modeling', 'Experimental AI'],
    yearLeft: 2025,
  }),
  member({
    id: 'alumni-prasad-shivaji-ambekar',
    name: 'Prasad Shivaji Ambekar',
    role: 'M.Tech Alumni (Class of 2025)',
    category: 'alumni',
    bio: 'Former lab member contributing to projects in computational intelligence.',
    researchInterests: ['Computational Intelligence', 'Applied ML'],
    yearLeft: 2025,
  }),
  member({
    id: 'alumni-divyanshu-singh',
    name: 'Divyanshu Singh',
    role: 'PhD Alumni (Class of 2025)',
    category: 'alumni',
    bio: 'Former lab member supporting AI model development and validation.',
    researchInterests: ['AI Models', 'Validation'],
    yearLeft: 2025,
  }),
];

export const categoryLabels: Record<Person['category'], string> = {
  faculty: 'Faculty',
  phd: 'PhD',
  masters: 'M.Tech',
  undergrad: 'B.Tech Undergrads',
  staff: 'Project Fellows & Interns',
  alumni: 'Alumni',
};