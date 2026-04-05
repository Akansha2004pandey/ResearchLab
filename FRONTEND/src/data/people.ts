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

function textOnlyPerson(input: {
  id: string;
  name: string;
  role: string;
  category: Person['category'];
  bio: string;
  researchInterests: string[];
  yearJoined?: number;
  yearLeft?: number;
}): Person {
  return {
    ...input,
    image: '',
  };
}

export const people: Person[] = [
  {
    id: "pi-1",
    name: "Dr. Ankur Gupta",
    role: "Principal Investigator & Assistant Professor",
    category: "faculty",
    image: "/professor-ankur-gupta-square.png",
    bio: "Dr. Gupta leads the lab's research in microfluidics, AI, medical imaging, and intelligent transportation systems.",
    researchInterests: ["Microfluidics", "Machine Learning", "Deep Learning", "Computer Vision"],
    email: "ankur.gupta@nsut.ac.in",
    googleScholar: "https://scholar.google.com/citations?user=097-HeYAAAAJ&hl=en",
    linkedin: "https://www.linkedin.com/in/ankursynon",
    website: "https://ankursynon.github.io/",
    yearJoined: 2023,
  },
  textOnlyPerson({
    id: 'phd-md-imran-hussain',
    name: 'Md Imran Hussain',
    role: 'PhD Scholar',
    category: 'phd',
    bio: 'PhD researcher working on resilient AI methods for secure connected systems.',
    researchInterests: ['Resilient AI', 'Cyber-Physical Security'],
  }),
  textOnlyPerson({
    id: 'phd-purrnima-singh',
    name: 'Purrnima Singh',
    role: 'PhD Scholar',
    category: 'phd',
    bio: 'PhD researcher exploring machine learning methods for practical real-world deployment.',
    researchInterests: ['Machine Learning', 'Applied AI'],
  }),
  textOnlyPerson({
    id: 'fellow-yash-gupta',
    name: 'Yash Gupta',
    role: 'Project Fellow',
    category: 'staff',
    bio: 'Project fellow contributing to funded lab projects in AI and microfluidic design automation.',
    researchInterests: ['Microfluidics', 'Design Automation'],
  }),
  textOnlyPerson({
    id: 'intern-sarthak-agarwal',
    name: 'Sarthak Agarwal',
    role: 'Summer Intern',
    category: 'staff',
    bio: 'Summer intern supporting experimental AI pipelines and literature studies.',
    researchInterests: ['Machine Learning', 'Data Analysis'],
  }),
  textOnlyPerson({
    id: 'intern-varun-kumar',
    name: 'Varun Kumar',
    role: 'Summer Intern',
    category: 'staff',
    bio: 'Summer intern assisting research prototypes and benchmark experiments.',
    researchInterests: ['Applied AI', 'Research Prototyping'],
  }),
  textOnlyPerson({
    id: 'mtech-rajat-kumar-varshney',
    name: 'Rajat Kumar Varshney',
    role: 'M.Tech Scholar',
    category: 'masters',
    bio: 'M.Tech researcher working on advanced machine learning model development.',
    researchInterests: ['Machine Learning', 'Model Development'],
  }),
  textOnlyPerson({
    id: 'mtech-pankaj',
    name: 'Pankaj',
    role: 'M.Tech Scholar',
    category: 'masters',
    bio: 'M.Tech researcher contributing to AI algorithm implementation and evaluation.',
    researchInterests: ['Artificial Intelligence', 'Evaluation Methods'],
  }),
  textOnlyPerson({
    id: 'mtech-kuldeep-singh',
    name: 'Kuldeep Singh',
    role: 'M.Tech Scholar',
    category: 'masters',
    bio: 'M.Tech researcher focused on robust learning methods and deployment workflows.',
    researchInterests: ['Robust ML', 'Deployment'],
  }),
  textOnlyPerson({
    id: 'mtech-aditya-chouksey',
    name: 'Aditya Chouksey',
    role: 'M.Tech Scholar',
    category: 'masters',
    bio: 'M.Tech researcher supporting data-driven system design and optimization.',
    researchInterests: ['Optimization', 'Data-Driven Systems'],
  }),
  textOnlyPerson({
    id: 'btech-vansh-kakkar',
    name: 'Vansh Kakkar',
    role: 'B.Tech, 4th Year, CSAI',
    category: 'undergrad',
    bio: 'Undergraduate researcher working on AI-assisted healthcare applications.',
    researchInterests: ['Healthcare AI', 'Computer Vision'],
  }),
  textOnlyPerson({
    id: 'btech-madhav-arora',
    name: 'Madhav Arora',
    role: 'B.Tech, 4th Year, CSAI',
    category: 'undergrad',
    bio: 'Undergraduate researcher contributing to deep learning experiments.',
    researchInterests: ['Deep Learning', 'Medical AI'],
  }),
  textOnlyPerson({
    id: 'btech-ocean-lakra',
    name: 'Ocean Lakra',
    role: 'B.Tech, 4th Year, CSE',
    category: 'undergrad',
    bio: 'Undergraduate researcher exploring practical ML deployment techniques.',
    researchInterests: ['ML Deployment', 'Software Systems'],
  }),
  textOnlyPerson({
    id: 'btech-aniket-negi',
    name: 'Aniket Negi',
    role: 'B.Tech, 3rd Year, Mechanical',
    category: 'undergrad',
    bio: 'Undergraduate researcher supporting interdisciplinary AI engineering tasks.',
    researchInterests: ['Interdisciplinary AI', 'Engineering Applications'],
  }),
  textOnlyPerson({
    id: 'btech-ayush-thakur',
    name: 'Ayush Thakur',
    role: 'B.Tech, 3rd Year, CSE',
    category: 'undergrad',
    bio: 'Undergraduate researcher assisting with data preparation and model training.',
    researchInterests: ['Data Pipelines', 'Model Training'],
  }),
  textOnlyPerson({
    id: 'btech-deepak',
    name: 'Deepak',
    role: 'B.Tech, 3rd Year, CSAI',
    category: 'undergrad',
    bio: 'Undergraduate researcher working on foundational AI and analytics tasks.',
    researchInterests: ['Artificial Intelligence', 'Analytics'],
  }),
  textOnlyPerson({
    id: 'btech-harshdip-saha',
    name: 'Harshdip Saha',
    role: 'B.Tech, 3rd Year, CSAI',
    category: 'undergrad',
    bio: 'Undergraduate researcher supporting experimentation and baseline studies.',
    researchInterests: ['Experimentation', 'Baseline Models'],
  }),
  textOnlyPerson({
    id: 'btech-harshanth-raja',
    name: 'Harshanth Raja',
    role: 'B.Tech, 4th Year, CSE',
    category: 'undergrad',
    bio: 'Undergraduate researcher focused on practical implementation and evaluation.',
    researchInterests: ['Implementation', 'Evaluation'],
  }),
  textOnlyPerson({
    id: 'btech-sameeksha-ahlawat',
    name: 'Sameeksha Ahlawat',
    role: 'B.Tech Undergraduate Researcher',
    category: 'undergrad',
    bio: 'Undergraduate researcher contributing to ongoing AI project tasks.',
    researchInterests: ['Applied AI', 'Project Development'],
  }),
  textOnlyPerson({
    id: 'btech-vyshnavi-kotha',
    name: 'Vyshnavi Kotha',
    role: 'B.Tech Undergraduate Researcher',
    category: 'undergrad',
    bio: 'Undergraduate researcher working on model benchmarking and analysis.',
    researchInterests: ['Benchmarking', 'Model Analysis'],
  }),
  textOnlyPerson({
    id: 'btech-harsh-gahlawat',
    name: 'Harsh Gahlawat',
    role: 'B.Tech Undergraduate Researcher',
    category: 'undergrad',
    bio: 'Undergraduate researcher assisting in research implementation workflows.',
    researchInterests: ['Research Implementation', 'Software Tooling'],
  }),
  textOnlyPerson({
    id: 'btech-kshitij-singh',
    name: 'Kshitij Singh',
    role: 'B.Tech Undergraduate Researcher',
    category: 'undergrad',
    bio: 'Undergraduate researcher supporting experimentation in lab projects.',
    researchInterests: ['Applied ML', 'Experiments'],
  }),
  textOnlyPerson({
    id: 'btech-gopal-kumar',
    name: 'Gopal Kumar',
    role: 'B.Tech Undergraduate Researcher',
    category: 'undergrad',
    bio: 'Undergraduate researcher focused on data processing and validation.',
    researchInterests: ['Data Engineering', 'Validation'],
  }),
  textOnlyPerson({
    id: 'btech-mohd-imaad',
    name: 'Mohd Imaad',
    role: 'B.Tech Undergraduate Researcher',
    category: 'undergrad',
    bio: 'Undergraduate researcher contributing to AI prototype development.',
    researchInterests: ['Prototyping', 'Applied AI'],
  }),
  textOnlyPerson({
    id: 'alumni-vinit-singroha',
    name: 'Vinit Singroha',
    role: 'Alumni',
    category: 'alumni',
    bio: 'Former lab member with contributions to AI-driven medical imaging projects.',
    researchInterests: ['Medical Imaging', 'Deep Learning'],
    yearLeft: 2025,
  }),
  textOnlyPerson({
    id: 'alumni-rithik-kumar',
    name: 'Rithik Kumar',
    role: 'Alumni',
    category: 'alumni',
    bio: 'Former lab member who worked on machine learning methods for healthcare.',
    researchInterests: ['Healthcare AI', 'Machine Learning'],
    yearLeft: 2025,
  }),
  textOnlyPerson({
    id: 'alumni-farhan-khan',
    name: 'Farhan Khan',
    role: 'Alumni',
    category: 'alumni',
    bio: 'Former lab member with interests in practical AI systems development.',
    researchInterests: ['AI Systems', 'Software Engineering'],
    yearLeft: 2025,
  }),
  textOnlyPerson({
    id: 'alumni-anant-kumar',
    name: 'Anant Kumar',
    role: 'Alumni',
    category: 'alumni',
    bio: 'Former lab member involved in research implementation and experimentation.',
    researchInterests: ['Modeling', 'Experimental AI'],
    yearLeft: 2025,
  }),
  textOnlyPerson({
    id: 'alumni-prasad-shivaji-ambekar',
    name: 'Prasad Shivaji Ambekar',
    role: 'Alumni',
    category: 'alumni',
    bio: 'Former lab member contributing to projects in computational intelligence.',
    researchInterests: ['Computational Intelligence', 'Applied ML'],
    yearLeft: 2025,
  }),
  textOnlyPerson({
    id: 'alumni-divyanshu-singh',
    name: 'Divyanshu Singh',
    role: 'Alumni',
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
  staff: 'Project Fellows & Summer Interns',
  alumni: 'Alumni',
};
