export interface Grant {
  id: string;
  title: string;
  agency: string;
  agencyLogo?: string;
  amount?: string;
  startDate: string;
  endDate: string;
  pi: string;
  coPIs?: string[];
  description: string;
  status: 'ongoing' | 'completed';
}

export const grants: Grant[] = [
  {
    id: "grant-1",
    title: "Foundations of Trustworthy Machine Learning",
    agency: "National Science Foundation",
    agencyLogo: "https://www.nsf.gov/images/logos/NSF_4-Color_bitmap_Logo.png",
    amount: "$2,500,000",
    startDate: "2023-09",
    endDate: "2028-08",
    pi: "Dr. Elena Vasquez",
    coPIs: ["Dr. Michael Chen"],
    description: "A comprehensive research program investigating the theoretical foundations of trustworthy machine learning, including robustness, fairness, and interpretability.",
    status: "ongoing"
  },
  {
    id: "grant-2",
    title: "AI-Powered Medical Imaging for Early Disease Detection",
    agency: "National Institutes of Health",
    agencyLogo: "https://upload.wikimedia.org/wikipedia/commons/3/33/NIH_logo.svg",
    amount: "$1,800,000",
    startDate: "2022-06",
    endDate: "2026-05",
    pi: "Dr. Elena Vasquez",
    description: "Developing and validating AI systems for early detection of cancer and other diseases using medical imaging data.",
    status: "ongoing"
  },
  {
    id: "grant-3",
    title: "Next-Generation Natural Language Understanding",
    agency: "DARPA",
    amount: "$3,200,000",
    startDate: "2023-01",
    endDate: "2026-12",
    pi: "Dr. Michael Chen",
    coPIs: ["Dr. Elena Vasquez"],
    description: "Advancing the state of the art in natural language understanding with a focus on reasoning, common sense, and multilingual capabilities.",
    status: "ongoing"
  },
  {
    id: "grant-4",
    title: "Industry Partnership: Scalable AI Systems",
    agency: "Google Research",
    amount: "$500,000",
    startDate: "2024-01",
    endDate: "2025-12",
    pi: "Dr. Elena Vasquez",
    description: "Collaborative research on developing more efficient and scalable AI systems for real-world deployment.",
    status: "ongoing"
  },
  {
    id: "grant-5",
    title: "Responsible AI Development Framework",
    agency: "Microsoft Research",
    amount: "$400,000",
    startDate: "2023-06",
    endDate: "2024-12",
    pi: "Dr. Elena Vasquez",
    coPIs: ["Dr. Michael Chen"],
    description: "Developing frameworks and tools for responsible AI development in industry settings.",
    status: "ongoing"
  },
  {
    id: "grant-6",
    title: "Deep Learning for Scientific Discovery",
    agency: "Department of Energy",
    amount: "$1,500,000",
    startDate: "2020-09",
    endDate: "2023-08",
    pi: "Dr. Elena Vasquez",
    description: "Applied deep learning to accelerate scientific discovery in materials science and physics simulations.",
    status: "completed"
  },
  {
    id: "grant-7",
    title: "Privacy-Preserving Machine Learning",
    agency: "NSF CAREER Award",
    amount: "$600,000",
    startDate: "2018-03",
    endDate: "2023-02",
    pi: "Dr. Michael Chen",
    description: "Investigated methods for training machine learning models while preserving data privacy.",
    status: "completed"
  },
  {
    id: "grant-8",
    title: "Robust Vision Systems for Autonomous Vehicles",
    agency: "Toyota Research Institute",
    amount: "$750,000",
    startDate: "2019-01",
    endDate: "2022-12",
    pi: "Dr. Elena Vasquez",
    description: "Developed robust computer vision systems capable of operating in adverse weather and lighting conditions.",
    status: "completed"
  }
];

export const fundingAgencies = [
  { name: "National Science Foundation", logo: "https://www.nsf.gov/images/logos/NSF_4-Color_bitmap_Logo.png" },
  { name: "National Institutes of Health", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/NIH_logo.svg" },
  { name: "DARPA", logo: "" },
  { name: "Google Research", logo: "" },
  { name: "Microsoft Research", logo: "" },
  { name: "Department of Energy", logo: "" },
  { name: "Toyota Research Institute", logo: "" }
];
