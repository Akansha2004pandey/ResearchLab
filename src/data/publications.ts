export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'workshop' | 'preprint' | 'patent';
  abstract?: string;
  pdfUrl?: string;
  doiUrl?: string;
  codeUrl?: string;
  bibtex?: string;
  featured?: boolean;
}

export const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Understanding Deep Learning Through the Lens of Optimization Geometry",
    authors: ["Elena Vasquez", "Sarah Mitchell", "James Wilson"],
    venue: "Nature Machine Intelligence",
    year: 2024,
    type: "journal",
    abstract: "We present a comprehensive analysis of the optimization landscape in deep neural networks, revealing new insights into why gradient descent succeeds in finding good solutions.",
    pdfUrl: "#",
    doiUrl: "https://doi.org/10.1038/example",
    featured: true,
    bibtex: `@article{vasquez2024understanding,
  title={Understanding Deep Learning Through the Lens of Optimization Geometry},
  author={Vasquez, Elena and Mitchell, Sarah and Wilson, James},
  journal={Nature Machine Intelligence},
  year={2024}
}`
  },
  {
    id: "pub-2",
    title: "Efficient Transformers: A Survey and Systematic Analysis",
    authors: ["Michael Chen", "Aisha Patel"],
    venue: "ACM Computing Surveys",
    year: 2024,
    type: "journal",
    abstract: "A comprehensive survey of efficient transformer architectures, analyzing trade-offs between computational cost and model performance.",
    pdfUrl: "#",
    doiUrl: "https://doi.org/10.1145/example",
    featured: true,
    bibtex: `@article{chen2024efficient,
  title={Efficient Transformers: A Survey and Systematic Analysis},
  author={Chen, Michael and Patel, Aisha},
  journal={ACM Computing Surveys},
  year={2024}
}`
  },
  {
    id: "pub-3",
    title: "Cross-Lingual Knowledge Transfer in Low-Resource Settings",
    authors: ["Michael Chen", "Emily Rodriguez", "Elena Vasquez"],
    venue: "ACL 2024",
    year: 2024,
    type: "conference",
    abstract: "We propose a novel method for transferring knowledge from high-resource to low-resource languages using minimal parallel data.",
    pdfUrl: "#",
    codeUrl: "https://github.com/example",
    featured: true,
    bibtex: `@inproceedings{chen2024crosslingual,
  title={Cross-Lingual Knowledge Transfer in Low-Resource Settings},
  author={Chen, Michael and Rodriguez, Emily and Vasquez, Elena},
  booktitle={Proceedings of ACL 2024},
  year={2024}
}`
  },
  {
    id: "pub-4",
    title: "Self-Supervised Learning for Medical Image Analysis: A Benchmark Study",
    authors: ["David Kim", "Elena Vasquez"],
    venue: "MICCAI 2024",
    year: 2024,
    type: "conference",
    abstract: "A comprehensive benchmark of self-supervised learning methods for medical imaging across multiple modalities.",
    pdfUrl: "#",
    codeUrl: "https://github.com/example",
    bibtex: `@inproceedings{kim2024selfsupervised,
  title={Self-Supervised Learning for Medical Image Analysis},
  author={Kim, David and Vasquez, Elena},
  booktitle={MICCAI 2024},
  year={2024}
}`
  },
  {
    id: "pub-5",
    title: "On the Generalization of Graph Neural Networks",
    authors: ["James Wilson", "Elena Vasquez"],
    venue: "NeurIPS 2023",
    year: 2023,
    type: "conference",
    abstract: "We provide new generalization bounds for graph neural networks that better capture their inductive bias.",
    pdfUrl: "#",
    doiUrl: "https://doi.org/10.neurips/example",
    bibtex: `@inproceedings{wilson2023generalization,
  title={On the Generalization of Graph Neural Networks},
  author={Wilson, James and Vasquez, Elena},
  booktitle={NeurIPS 2023},
  year={2023}
}`
  },
  {
    id: "pub-6",
    title: "Reasoning with Large Language Models: Capabilities and Limitations",
    authors: ["Aisha Patel", "Michael Chen"],
    venue: "EMNLP 2023",
    year: 2023,
    type: "conference",
    abstract: "An in-depth analysis of reasoning capabilities in large language models with novel evaluation benchmarks.",
    pdfUrl: "#",
    bibtex: `@inproceedings{patel2023reasoning,
  title={Reasoning with Large Language Models},
  author={Patel, Aisha and Chen, Michael},
  booktitle={EMNLP 2023},
  year={2023}
}`
  },
  {
    id: "pub-7",
    title: "Video Understanding with Temporal Transformers",
    authors: ["David Kim", "Sarah Mitchell"],
    venue: "CVPR 2023",
    year: 2023,
    type: "conference",
    abstract: "A novel transformer architecture designed specifically for long-form video understanding.",
    pdfUrl: "#",
    codeUrl: "https://github.com/example",
    bibtex: `@inproceedings{kim2023video,
  title={Video Understanding with Temporal Transformers},
  author={Kim, David and Mitchell, Sarah},
  booktitle={CVPR 2023},
  year={2023}
}`
  },
  {
    id: "pub-8",
    title: "Safe Reinforcement Learning for Robot Manipulation",
    authors: ["Sarah Mitchell", "Elena Vasquez"],
    venue: "ICRA 2023",
    year: 2023,
    type: "conference",
    abstract: "A framework for learning robot manipulation policies with formal safety guarantees.",
    pdfUrl: "#",
    bibtex: `@inproceedings{mitchell2023safe,
  title={Safe Reinforcement Learning for Robot Manipulation},
  author={Mitchell, Sarah and Vasquez, Elena},
  booktitle={ICRA 2023},
  year={2023}
}`
  },
  {
    id: "pub-9",
    title: "Fairness in Machine Learning: A Practitioner's Guide",
    authors: ["Aisha Patel", "Elena Vasquez", "Alex Thompson"],
    venue: "FAccT Workshop 2023",
    year: 2023,
    type: "workshop",
    abstract: "Practical guidelines and tools for implementing fairness considerations in ML systems.",
    pdfUrl: "#",
    bibtex: `@inproceedings{patel2023fairness,
  title={Fairness in Machine Learning: A Practitioner's Guide},
  author={Patel, Aisha and Vasquez, Elena and Thompson, Alex},
  booktitle={FAccT Workshop 2023},
  year={2023}
}`
  },
  {
    id: "pub-10",
    title: "Deep Learning for Early Cancer Detection: A Clinical Validation Study",
    authors: ["Elena Vasquez", "David Kim", "Clinical Partners"],
    venue: "Nature Medicine",
    year: 2022,
    type: "journal",
    abstract: "Clinical validation of a deep learning system for early cancer detection achieving expert-level performance.",
    pdfUrl: "#",
    doiUrl: "https://doi.org/10.1038/med-example",
    featured: true,
    bibtex: `@article{vasquez2022deep,
  title={Deep Learning for Early Cancer Detection},
  author={Vasquez, Elena and Kim, David and others},
  journal={Nature Medicine},
  year={2022}
}`
  },
  {
    id: "pub-11",
    title: "Federated Learning with Differential Privacy Guarantees",
    authors: ["Emily Rodriguez", "Michael Chen"],
    venue: "arXiv preprint",
    year: 2024,
    type: "preprint",
    abstract: "A novel approach to federated learning that provides strong differential privacy guarantees.",
    pdfUrl: "#",
    bibtex: `@article{rodriguez2024federated,
  title={Federated Learning with Differential Privacy Guarantees},
  author={Rodriguez, Emily and Chen, Michael},
  journal={arXiv preprint},
  year={2024}
}`
  },
  {
    id: "pub-12",
    title: "Method and System for Efficient Neural Network Inference",
    authors: ["Elena Vasquez", "Michael Chen"],
    venue: "US Patent Office",
    year: 2023,
    type: "patent",
    abstract: "A patented method for accelerating neural network inference on edge devices.",
    doiUrl: "#",
    bibtex: `@misc{vasquez2023patent,
  title={Method and System for Efficient Neural Network Inference},
  author={Vasquez, Elena and Chen, Michael},
  year={2023},
  note={US Patent}
}`
  }
];

export const publicationTypes: Record<Publication['type'], string> = {
  journal: 'Journal Articles',
  conference: 'Conference Papers',
  workshop: 'Workshop Papers',
  preprint: 'Preprints',
  patent: 'Patents'
};
