export interface ResearchArea {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  methodology: string;
  contributions: string[];
  relatedPublications: string[];
  icon: string;
  image: string;
}

export const researchAreas: ResearchArea[] = [
  {
    id: "ml-foundations",
    title: "Machine Learning Foundations",
    shortDescription: "Developing theoretical frameworks and novel algorithms for modern machine learning.",
    fullDescription: "Our research in machine learning foundations focuses on understanding the fundamental principles that govern learning algorithms. We investigate optimization landscapes, generalization bounds, and the theoretical underpinnings of deep learning.",
    methodology: "We combine rigorous mathematical analysis with extensive empirical studies to develop and validate new theoretical frameworks. Our approach includes convex optimization, statistical learning theory, and information-theoretic methods.",
    contributions: [
      "Novel convergence guarantees for non-convex optimization",
      "Improved generalization bounds for deep neural networks",
      "New understanding of implicit regularization in gradient descent"
    ],
    relatedPublications: ["pub-1", "pub-2", "pub-5"],
    icon: "Brain",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop"
  },
  {
    id: "nlp-understanding",
    title: "Natural Language Understanding",
    shortDescription: "Building AI systems that truly comprehend and generate human language.",
    fullDescription: "Our NLP research pushes the boundaries of how machines understand and generate human language. We work on semantic understanding, discourse analysis, and multilingual processing to create more intelligent language systems.",
    methodology: "We leverage transformer architectures, knowledge graphs, and cognitive linguistics to develop models that capture the nuances of human communication. Our methods include self-supervised learning, multi-task learning, and neural-symbolic integration.",
    contributions: [
      "State-of-the-art multilingual translation models",
      "Novel approaches to common-sense reasoning",
      "Efficient fine-tuning methods for large language models"
    ],
    relatedPublications: ["pub-3", "pub-6"],
    icon: "MessageSquare",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop"
  },
  {
    id: "computer-vision",
    title: "Computer Vision & Perception",
    shortDescription: "Teaching machines to see and interpret the visual world.",
    fullDescription: "Our computer vision research addresses fundamental challenges in visual perception, from object recognition to scene understanding. We develop algorithms that enable machines to interpret visual information with human-like capability.",
    methodology: "We employ convolutional neural networks, vision transformers, and generative models. Our research combines supervised learning with self-supervised and weakly-supervised approaches to reduce annotation requirements.",
    contributions: [
      "Breakthrough results in medical image analysis",
      "Novel architectures for video understanding",
      "Efficient models for edge deployment"
    ],
    relatedPublications: ["pub-4", "pub-7"],
    icon: "Eye",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop"
  },
  {
    id: "ai-robotics",
    title: "AI for Robotics",
    shortDescription: "Bridging artificial intelligence with real-world robotic systems.",
    fullDescription: "We develop AI algorithms that enable robots to perceive, reason, and act in complex real-world environments. Our research spans manipulation, navigation, and human-robot interaction.",
    methodology: "We integrate reinforcement learning, imitation learning, and model-based control with advanced perception systems. Our robots learn through simulation and real-world experience.",
    contributions: [
      "Sample-efficient robot learning algorithms",
      "Safe reinforcement learning frameworks",
      "Novel approaches to sim-to-real transfer"
    ],
    relatedPublications: ["pub-8"],
    icon: "Bot",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
  },
  {
    id: "responsible-ai",
    title: "Responsible AI & Ethics",
    shortDescription: "Ensuring AI systems are fair, transparent, and beneficial to society.",
    fullDescription: "Our responsible AI research addresses critical challenges in deploying AI systems ethically. We study fairness, accountability, transparency, and the societal implications of AI technologies.",
    methodology: "We combine technical approaches with insights from social sciences, philosophy, and law. Our research includes algorithmic auditing, interpretability methods, and participatory design.",
    contributions: [
      "Frameworks for fairness evaluation in ML systems",
      "Novel interpretability techniques for complex models",
      "Guidelines for responsible AI deployment"
    ],
    relatedPublications: ["pub-9"],
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
  },
  {
    id: "healthcare-ai",
    title: "AI for Healthcare",
    shortDescription: "Transforming healthcare through intelligent diagnostic and treatment systems.",
    fullDescription: "We develop AI solutions for healthcare that assist clinicians in diagnosis, treatment planning, and patient monitoring. Our research prioritizes clinical utility, safety, and interpretability.",
    methodology: "We work closely with clinical partners to develop and validate our methods. Our approaches include medical image analysis, clinical NLP, and predictive modeling using electronic health records.",
    contributions: [
      "FDA-approved diagnostic AI systems",
      "Novel biomarkers discovered through machine learning",
      "Clinical decision support tools deployed in hospitals"
    ],
    relatedPublications: ["pub-10"],
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
  }
];
