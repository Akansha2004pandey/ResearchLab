truncate table
  contact_messages,
  gallery_images,
  news,
  events,
  grants,
  publications,
  research_areas,
  people
restart identity;

-- ─────────────────────────────────────────────
-- PEOPLE  (real data from CV_Ankur.pdf)
-- ─────────────────────────────────────────────
insert into people (
  id, name, role, category, image, bio, research_interests,
  email, google_scholar, linkedin, website,
  year_joined, year_left, image_class_name, display_order
) values
(
  'pi-1',
  'Dr. Ankur Gupta',
  'Principal Investigator & Assistant Professor',
  'faculty',
  '/professor-ankur-gupta-square.png',
  'Dr. Ankur Gupta is an Assistant Professor in the Department of Computer Science & Engineering at Netaji Subhas University of Technology (NSUT), New Delhi. He holds a Ph.D. in CSE from IIT Roorkee (2021, CGPA 8.636/10) and an M.Tech in CSE from NIT Hamirpur (Gold Medalist, CGPA 9/10). His research spans Microfluidics & Lab-on-a-Chip design automation, Medical Imaging, Machine Learning, Deep Learning, Computer Vision, and Intelligent Transportation Systems. He is the PI of SERB and DST-JSPS funded projects, Co-PI of a DST SAMPARK grant, and has authored/co-authored 30+ publications in venues such as ACM TIST, IEEE Access, ACM ToIT, and Applied Intelligence.',
  ARRAY['Lab-on-a-chip', 'Microfluidics', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Medical Imaging', 'Intelligent Transportation Systems'],
  'ankur.gupta@nsut.ac.in',
  'https://scholar.google.com/citations?user=097-HeYAAAAJ&hl=en',
  'https://www.linkedin.com/in/ankursynon',
  'https://ankursynon.github.io/',
  2023, null, null, 1
),
(
  'fellow-1',
  'Mr. Yash Gupta',
  'Project Fellow (SERB SURE)',
  'staff',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop',
  'Project Fellow under the SERB SURE project. Working on AI-based pathfinding for microfluidic dilution on Programmable Microfluidic Devices (PMDs) and error recovery in MEDA biochips using deep reinforcement learning.',
  ARRAY['Microfluidics', 'Deep Reinforcement Learning', 'MEDA Biochips', 'Design Automation'],
  null, null, null, null,
  2024, null, null, 2
),
(
  'fellow-2',
  'Mr. Rahul Pal',
  'Project Fellow (SERB SURE)',
  'staff',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'Project Fellow under the SERB SURE project. Contributing to research in design automation for lab-on-a-chip microfluidic biochips.',
  ARRAY['Microfluidics', 'Lab-on-a-chip', 'Design Automation'],
  null, null, null, null,
  2026, null, null, 3
),
(
  'phd-1',
  'PhD Scholar 1',
  'PhD Candidate',
  'phd',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  'Doctoral researcher working on AI-driven design automation for digital microfluidic biochips, focusing on fault-tolerant architectures and error recovery algorithms.',
  ARRAY['Digital Microfluidics', 'Fault-Tolerant Design', 'Artificial Intelligence'],
  null, null, null, null,
  2023, null, null, 4
),
(
  'phd-2',
  'PhD Scholar 2',
  'PhD Candidate',
  'phd',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'Doctoral researcher investigating deep learning methods for medical image analysis, with applications to cardiovascular disease detection and brain tumor segmentation.',
  ARRAY['Deep Learning', 'Medical Imaging', 'Computer Vision', 'Cardiovascular Disease'],
  null, null, null, null,
  2023, null, null, 5
),
(
  'phd-3',
  'PhD Scholar 3',
  'PhD Student',
  'phd',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  'Doctoral researcher focusing on AI applications in intelligent transportation systems and connected autonomous vehicles.',
  ARRAY['Intelligent Transportation Systems', 'Connected Vehicles', 'AI Safety', 'Sensor Fusion'],
  null, null, null, null,
  2024, null, null, 6
),
(
  'mtech-1',
  'M.Tech Student 1',
  'M.Tech Student',
  'masters',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  'Masters student researching computer vision techniques for video capsule endoscopy abnormality detection.',
  ARRAY['Computer Vision', 'Medical Imaging', 'Deep Learning'],
  null, null, null, null,
  2024, null, null, 7
),
(
  'mtech-2',
  'M.Tech Student 2',
  'M.Tech Student',
  'masters',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  'Masters student working on secure cyber-physical systems and AI-driven intrusion detection for connected vehicles.',
  ARRAY['Cybersecurity', 'Connected Vehicles', 'Machine Learning'],
  null, null, null, null,
  2024, null, null, 8
),
(
  'undergrad-1',
  'B.Tech Research Intern',
  'Undergraduate Researcher',
  'undergrad',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  'Undergraduate researcher contributing to the lab''s projects in AI for healthcare and microfluidic biochip design.',
  ARRAY['Artificial Intelligence', 'Machine Learning'],
  null, null, null, null,
  2025, null, null, 9
);

-- Updated people roster (provided by lab)
delete from people where id <> 'pi-1';

update people
set
  role = 'Principal Investigator & Assistant Professor',
  image = '/professor-ankur-gupta-square.png',
  bio = 'Dr. Ankur Gupta leads the lab''s research in microfluidics, AI, medical imaging, and intelligent transportation systems.',
  research_interests = ARRAY['Microfluidics', 'Machine Learning', 'Deep Learning', 'Computer Vision'],
  year_joined = 2023,
  display_order = 1
where id = 'pi-1';

insert into people (
  id, name, role, category, image, bio, research_interests, display_order
) values
(
  'phd-md-imran-hussain',
  'Md Imran Hussain',
  'PhD Scholar',
  'phd',
  '',
  'PhD researcher working on resilient AI methods for secure connected systems.',
  ARRAY['Resilient AI', 'Cyber-Physical Security'],
  2
),
(
  'phd-purrnima-singh',
  'Purrnima Singh',
  'PhD Scholar',
  'phd',
  '',
  'PhD researcher exploring machine learning methods for practical real-world deployment.',
  ARRAY['Machine Learning', 'Applied AI'],
  3
),
(
  'fellow-yash-gupta',
  'Yash Gupta',
  'Project Fellow',
  'staff',
  '',
  'Project fellow contributing to funded lab projects in AI and microfluidic design automation.',
  ARRAY['Microfluidics', 'Design Automation'],
  4
),
(
  'intern-sarthak-agarwal',
  'Sarthak Agarwal',
  'Summer Intern',
  'staff',
  '',
  'Summer intern supporting experimental AI pipelines and literature studies.',
  ARRAY['Machine Learning', 'Data Analysis'],
  5
),
(
  'intern-varun-kumar',
  'Varun Kumar',
  'Summer Intern',
  'staff',
  '',
  'Summer intern assisting research prototypes and benchmark experiments.',
  ARRAY['Applied AI', 'Research Prototyping'],
  6
),
(
  'mtech-rajat-kumar-varshney',
  'Rajat Kumar Varshney',
  'M.Tech Scholar',
  'masters',
  '',
  'M.Tech researcher working on advanced machine learning model development.',
  ARRAY['Machine Learning', 'Model Development'],
  7
),
(
  'mtech-pankaj',
  'Pankaj',
  'M.Tech Scholar',
  'masters',
  '',
  'M.Tech researcher contributing to AI algorithm implementation and evaluation.',
  ARRAY['Artificial Intelligence', 'Evaluation Methods'],
  8
),
(
  'mtech-kuldeep-singh',
  'Kuldeep Singh',
  'M.Tech Scholar',
  'masters',
  '',
  'M.Tech researcher focused on robust learning methods and deployment workflows.',
  ARRAY['Robust ML', 'Deployment'],
  9
),
(
  'mtech-aditya-chouksey',
  'Aditya Chouksey',
  'M.Tech Scholar',
  'masters',
  '',
  'M.Tech researcher supporting data-driven system design and optimization.',
  ARRAY['Optimization', 'Data-Driven Systems'],
  10
),
(
  'btech-vansh-kakkar',
  'Vansh Kakkar',
  'B.Tech, 4th Year, CSAI',
  'undergrad',
  '',
  'Undergraduate researcher working on AI-assisted healthcare applications.',
  ARRAY['Healthcare AI', 'Computer Vision'],
  11
),
(
  'btech-madhav-arora',
  'Madhav Arora',
  'B.Tech, 4th Year, CSAI',
  'undergrad',
  '',
  'Undergraduate researcher contributing to deep learning experiments.',
  ARRAY['Deep Learning', 'Medical AI'],
  12
),
(
  'btech-ocean-lakra',
  'Ocean Lakra',
  'B.Tech, 4th Year, CSE',
  'undergrad',
  '',
  'Undergraduate researcher exploring practical ML deployment techniques.',
  ARRAY['ML Deployment', 'Software Systems'],
  13
),
(
  'btech-aniket-negi',
  'Aniket Negi',
  'B.Tech, 3rd Year, Mechanical',
  'undergrad',
  '',
  'Undergraduate researcher supporting interdisciplinary AI engineering tasks.',
  ARRAY['Interdisciplinary AI', 'Engineering Applications'],
  14
),
(
  'btech-ayush-thakur',
  'Ayush Thakur',
  'B.Tech, 3rd Year, CSE',
  'undergrad',
  '',
  'Undergraduate researcher assisting with data preparation and model training.',
  ARRAY['Data Pipelines', 'Model Training'],
  15
),
(
  'btech-deepak',
  'Deepak',
  'B.Tech, 3rd Year, CSAI',
  'undergrad',
  '',
  'Undergraduate researcher working on foundational AI and analytics tasks.',
  ARRAY['Artificial Intelligence', 'Analytics'],
  16
),
(
  'btech-harshdip-saha',
  'Harshdip Saha',
  'B.Tech, 3rd Year, CSAI',
  'undergrad',
  '',
  'Undergraduate researcher supporting experimentation and baseline studies.',
  ARRAY['Experimentation', 'Baseline Models'],
  17
),
(
  'btech-harshanth-raja',
  'Harshanth Raja',
  'B.Tech, 4th Year, CSE',
  'undergrad',
  '',
  'Undergraduate researcher focused on practical implementation and evaluation.',
  ARRAY['Implementation', 'Evaluation'],
  18
),
(
  'btech-sameeksha-ahlawat',
  'Sameeksha Ahlawat',
  'B.Tech Undergraduate Researcher',
  'undergrad',
  '',
  'Undergraduate researcher contributing to ongoing AI project tasks.',
  ARRAY['Applied AI', 'Project Development'],
  19
),
(
  'btech-vyshnavi-kotha',
  'Vyshnavi Kotha',
  'B.Tech Undergraduate Researcher',
  'undergrad',
  '',
  'Undergraduate researcher working on model benchmarking and analysis.',
  ARRAY['Benchmarking', 'Model Analysis'],
  20
),
(
  'btech-harsh-gahlawat',
  'Harsh Gahlawat',
  'B.Tech Undergraduate Researcher',
  'undergrad',
  '',
  'Undergraduate researcher assisting in research implementation workflows.',
  ARRAY['Research Implementation', 'Software Tooling'],
  21
),
(
  'btech-kshitij-singh',
  'Kshitij Singh',
  'B.Tech Undergraduate Researcher',
  'undergrad',
  '',
  'Undergraduate researcher supporting experimentation in lab projects.',
  ARRAY['Applied ML', 'Experiments'],
  22
),
(
  'btech-gopal-kumar',
  'Gopal Kumar',
  'B.Tech Undergraduate Researcher',
  'undergrad',
  '',
  'Undergraduate researcher focused on data processing and validation.',
  ARRAY['Data Engineering', 'Validation'],
  23
),
(
  'btech-mohd-imaad',
  'Mohd Imaad',
  'B.Tech Undergraduate Researcher',
  'undergrad',
  '',
  'Undergraduate researcher contributing to AI prototype development.',
  ARRAY['Prototyping', 'Applied AI'],
  24
),
(
  'alumni-vinit-singroha',
  'Vinit Singroha',
  'Alumni',
  'alumni',
  '',
  'Former lab member with contributions to AI-driven medical imaging projects.',
  ARRAY['Medical Imaging', 'Deep Learning'],
  25
),
(
  'alumni-rithik-kumar',
  'Rithik Kumar',
  'Alumni',
  'alumni',
  '',
  'Former lab member who worked on machine learning methods for healthcare.',
  ARRAY['Healthcare AI', 'Machine Learning'],
  26
),
(
  'alumni-farhan-khan',
  'Farhan Khan',
  'Alumni',
  'alumni',
  '',
  'Former lab member with interests in practical AI systems development.',
  ARRAY['AI Systems', 'Software Engineering'],
  27
),
(
  'alumni-anant-kumar',
  'Anant Kumar',
  'Alumni',
  'alumni',
  '',
  'Former lab member involved in research implementation and experimentation.',
  ARRAY['Modeling', 'Experimental AI'],
  28
),
(
  'alumni-prasad-shivaji-ambekar',
  'Prasad Shivaji Ambekar',
  'Alumni',
  'alumni',
  '',
  'Former lab member contributing to projects in computational intelligence.',
  ARRAY['Computational Intelligence', 'Applied ML'],
  29
),
(
  'alumni-divyanshu-singh',
  'Divyanshu Singh',
  'Alumni',
  'alumni',
  '',
  'Former lab member supporting AI model development and validation.',
  ARRAY['AI Models', 'Validation'],
  30
);

-- ─────────────────────────────────────────────
-- PUBLICATIONS  (real data from CV_Ankur.pdf)
-- ─────────────────────────────────────────────
insert into publications (
  id, title, authors, venue, year, type, abstract, pdf_url, doi_url, code_url, bibtex, featured, display_order
) values
(
  'pub-j1',
  'PHtNN: Prediction of Heart Disease Risk Using Twin Neural Network',
  ARRAY['Ankur Gupta', 'Rahul Kumar', 'Balasubramanian Raman', 'Harkirat Singh Arora'],
  'ACM Transactions on Intelligent Systems and Technology (TIST)',
  2026,
  'journal',
  'Proposes PHtNN, a twin neural network architecture for predicting the risk of heart disease. Accepted for publication in ACM TIST 2026.',
  null,
  null,
  null,
  null,
  true, 1
),
(
  'pub-j2',
  'Considering the Node Level in Error Correction for DMFBs',
  ARRAY['Koki Suzuki', 'Shigeru Yamashita', 'Hiroyuki Tomiyama', 'Ankur Gupta'],
  'Micromachines',
  2025,
  'journal',
  'Presents a node-level approach to error correction in Digital Microfluidic Biochips (DMFBs), improving fault tolerance and reliability of microfluidic operations.',
  null,
  'https://doi.org/10.3390/mi16091013',
  null,
  null,
  true, 2
),
(
  'pub-j3',
  'CAVE-Net: Classifying Abnormalities in Video Capsule Endoscopy',
  ARRAY['Ishita Harish', 'Saurav Mishra', 'Neha Bhadoria', 'Rithik Kumar', 'Madhav Arora', 'Syed Rameem Zahra', 'Ankur Gupta'],
  'arXiv preprint arXiv:2410.20231',
  2024,
  'preprint',
  'CAVE-Net is a deep learning framework designed to classify abnormalities detected in video capsule endoscopy images, enabling automated gastrointestinal disease diagnosis.',
  null,
  'https://doi.org/10.48550/arXiv.2410.20231',
  null,
  null,
  false, 3
),
(
  'pub-j4',
  'GAF-Net: Classifying Glioblastoma Histopathology Images Using an Attention-based Feature-aware Framework',
  ARRAY['Rithik Kumar', 'Vinit', 'Madhav Arora', 'Vansh Kakkar', 'Twinkle Dhingra', 'Syed Rameem Zahra', 'Ankur Gupta'],
  'BrainLes 2024, LNCS',
  2024,
  'conference',
  'GAF-Net employs an attention-based feature-aware framework to classify glioblastoma histopathology images, advancing automated brain tumor diagnosis.',
  null,
  null,
  null,
  null,
  false, 4
),
(
  'pub-j5',
  'C-CADZ: Computational Intelligence System for Coronary Artery Disease Detection Using Z-Alizadeh Sani Dataset',
  ARRAY['Ankur Gupta', 'Rahul Kumar', 'Harkirat Singh Arora', 'Balasubramanian Raman'],
  'Applied Intelligence',
  2022,
  'journal',
  'C-CADZ is a computational intelligence system that leverages machine learning and feature engineering on the Z-Alizadeh Sani dataset to detect coronary artery disease with high accuracy. [IF: 5.019]',
  null,
  'https://doi.org/10.1007/s10489-021-02467-3',
  null,
  null,
  true, 5
),
(
  'pub-j6',
  'IBRDM: An Intelligence Framework for Brain Tumor Classification Using Radiomics-and DWT Based Fusion',
  ARRAY['Rahul Kumar', 'Ankur Gupta', 'Harkirat Singh Arora', 'Balasubramanian Raman'],
  'ACM Transactions on Internet Technology (ToIT)',
  2021,
  'journal',
  'IBRDM fuses radiomics features with Discrete Wavelet Transform (DWT) based descriptors to build an intelligent framework for brain tumor classification. [IF: 3.989]',
  null,
  'https://doi.org/10.1145/3434775',
  null,
  null,
  true, 6
),
(
  'pub-j7',
  'CBSN: Comparative Measures of Normalization Techniques for Brain Tumor Segmentation Using SRCNet',
  ARRAY['Rahul Kumar', 'Ankur Gupta', 'Harkirat Singh Arora', 'Balasubramanian Raman'],
  'Multimedia Tools and Applications',
  2022,
  'journal',
  'Conducts a comparative study of normalization techniques within the SRCNet architecture for brain tumor segmentation, achieving state-of-the-art performance. [IF: 2.577]',
  null,
  'https://doi.org/10.1007/s11042-021-10565-0',
  null,
  null,
  false, 7
),
(
  'pub-j8',
  'MIFH: A Machine Intelligence Framework for Heart Disease Diagnosis',
  ARRAY['Ankur Gupta', 'Rahul Kumar', 'Harkirat Singh Arora', 'Balasubramanian Raman'],
  'IEEE Access',
  2020,
  'journal',
  'MIFH is a comprehensive machine intelligence framework that integrates multiple ML algorithms and feature selection methods for accurate heart disease diagnosis. [IF: 3.476]',
  null,
  'https://doi.org/10.1109/ACCESS.2019.2962755',
  null,
  null,
  true, 8
),
(
  'pub-j9',
  'CGHF: A Computational Decision Support System for Glioma Classification Using Hybrid Radiomics- and Stationary Wavelet-Based Features',
  ARRAY['Rahul Kumar', 'Ankur Gupta', 'Harkirat Singh Arora', 'Ganesh N. Pandian', 'Balasubramanian Raman'],
  'IEEE Access',
  2020,
  'journal',
  'CGHF combines hybrid radiomics and stationary wavelet-based features within a computational decision support framework for precise glioma classification. [IF: 3.476]',
  null,
  'https://doi.org/10.1109/ACCESS.2020.2989193',
  null,
  null,
  false, 9
),
(
  'pub-j10',
  'Architectural Design of Flow-based Microfluidic Biochips for Multi-Target Dilution of Biochemical Fluid',
  ARRAY['Nishant Kamal', 'Ankur Gupta', 'Ananya Singla', 'Shubham Tiwari', 'Sudip Roy', 'Bhargab Bhattacharya'],
  'ACM Transactions on Design Automation of Electronic Systems (TODAES)',
  2020,
  'journal',
  'Proposes architectural design methodologies for flow-based microfluidic biochips that enable efficient multi-target dilution of biochemical fluids. [IF: 1.447]',
  null,
  'https://doi.org/10.1145/3357604',
  null,
  null,
  false, 10
),
(
  'pub-j11',
  'Design Automation for Dilution of a Fluid using Programmable Microfluidic Device based Biochips',
  ARRAY['Ankur Gupta', 'Juinn-Dar Huang', 'Shigeru Yamashita', 'Sudip Roy'],
  'ACM Transactions on Design Automation of Electronic Systems (TODAES)',
  2019,
  'journal',
  'Presents design automation algorithms for fluid dilution operations on programmable microfluidic device-based biochips, enabling efficient biochemical assay preparation. [IF: 1.447]',
  null,
  'https://doi.org/10.1145/3306492',
  null,
  null,
  true, 11
),
(
  'pub-c1',
  'A Polynomial Time Routing Algorithm for MEDA Biochips based on Dijkstra''s Algorithm',
  ARRAY['Issei Nakamura', 'Shigeru Yamashita', 'Hiroyuki Tomiyama', 'Ankur Gupta'],
  '39th International Conference on VLSI Design (VLSID 2025), Pune, India',
  2026,
  'conference',
  'Proposes a polynomial-time routing algorithm for Micro-Electrode-Dot-Array (MEDA) biochips based on Dijkstra''s algorithm, significantly improving droplet routing efficiency.',
  null,
  null,
  null,
  null,
  false, 12
),
(
  'pub-c2',
  'CARES: A Context-Aware Resilience Enhancement System for Securing Critical and Non-Critical Components in Electric Connected Vehicles',
  ARRAY['Md Imran Hussain', 'Syed Rameem Zahra', 'Ankur Gupta'],
  'IEEE 17th International Conference on Computational Intelligence and Communication Networks (CICN 2025), NIT Goa',
  2025,
  'conference',
  'CARES proposes a context-aware resilience enhancement system that selectively secures critical and non-critical components in electric connected vehicles against cyber threats.',
  null,
  'https://doi.org/10.1109/CICN67655.2025.11368250',
  null,
  null,
  false, 13
),
(
  'pub-c3',
  'DMHZ: A Decision Support System based on Machine Computational Design for Heart Disease Diagnosis Using Z-Alizadeh Sani Dataset',
  ARRAY['Ankur Gupta', 'Harkirat Singh Arora', 'Rahul Kumar', 'Balasubramanian Raman'],
  '35th International Conference on Information Networking (ICOIN 2021), Jeju Island, Korea',
  2021,
  'conference',
  'DMHZ is a machine learning-based decision support system for heart disease diagnosis using the Z-Alizadeh Sani Dataset, achieving high diagnostic accuracy.',
  null,
  'https://doi.org/10.1109/ICOIN50884.2021.9333884',
  null,
  null,
  false, 14
),
(
  'pub-c4',
  'Fast Architecture-Level Synthesis of Fault-Tolerant Flow-Based Microfluidic Biochips',
  ARRAY['Wei-Lun Huang', 'Ankur Gupta', 'Sudip Roy', 'Tsung-Yi Ho', 'Paul Pop'],
  'IEEE Design Automation and Test in Europe (DATE 2017), Lausanne, Switzerland',
  2017,
  'conference',
  'Presents fast heuristic algorithms for architecture-level synthesis of fault-tolerant flow-based microfluidic biochips, ensuring reliable biochemical protocol execution.',
  null,
  'https://doi.org/10.23919/DATE.2017.7927262',
  null,
  null,
  false, 15
),
(
  'pub-c5',
  'Design Automation of Multiple-Demand Mixture Preparation using a k-Array Rotary Mixer on Digital Microfluidic Biochip',
  ARRAY['Satendra Kumar', 'Ankur Gupta', 'Sudip Roy', 'Bhargab B. Bhattacharya'],
  '34th IEEE International Conference on Computer Design (ICCD 2016), Phoenix, USA',
  2016,
  'conference',
  'Proposes design automation techniques for preparing complex biochemical mixtures using k-Array rotary mixers on digital microfluidic biochips.',
  null,
  'https://doi.org/10.1109/ICCD.2016.7753290',
  null,
  null,
  false, 16
),
(
  'pub-w1',
  'Loading Reagents on Programmable Microfluidic Devices',
  ARRAY['Satoru Maruyama', 'Ankur Gupta', 'Sudip Roy', 'Shigeru Yamashita'],
  '21st Workshop on Synthesis And System Integration of Mixed Information Technologies (SASIMI 2018)',
  2018,
  'workshop',
  'Addresses the problem of loading reagents on programmable microfluidic devices, proposing efficient scheduling and routing strategies. Received Outstanding Paper Award.',
  null,
  null,
  null,
  null,
  false, 17
),
(
  'pub-p1',
  'Hybrid Asynchronous Cryptographic System and Method for Securing Encrypted Connected Vehicles',
  ARRAY['Divyanshu Singh', 'Anant Kumar', 'Prasad Shivaji Ambekar', 'Ankur Gupta'],
  'Provisional Patent Application No. 202511063035, India',
  2025,
  'patent',
  'A hybrid asynchronous cryptographic system and method for securing communication between encrypted connected vehicles. Status: Patent Pending.',
  null,
  null,
  null,
  null,
  false, 18
),
(
  'pub-p2',
  'SmartMix: AI-based Pathfinding for Microfluidic Dilution on Programmable Microfluidic Devices (PMDs)',
  ARRAY['Yash Gupta', 'Ankur Gupta'],
  'Patent (India)',
  2025,
  'patent',
  'SmartMix is an AI-based pathfinding approach for optimizing microfluidic dilution operations on Programmable Microfluidic Devices. Status: Patent Pending.',
  null,
  null,
  null,
  null,
  false, 19
);

insert into research_areas (
  id, title, short_description, full_description, methodology, contributions, related_publication_ids, icon, image, display_order
) values
-- ─────────────────────────────────────────────
-- RESEARCH AREAS  (from CV research interests)
-- ─────────────────────────────────────────────
(
  'microfluidics',
  'Microfluidics & Lab-on-a-Chip',
  'Design automation for programmable digital microfluidic biochips and lab-on-a-chip systems.',
  'Our research in microfluidics focuses on developing design automation algorithms for lab-on-a-chip (LoC) systems, particularly Programmable Microfluidic Devices (PMDs) and Micro-Electrode-Dot-Array (MEDA) biochips. Our work addresses the full design stack: from fluid dilution and mixture preparation to fault-tolerant routing and error recovery.',
  'We combine EDA techniques, graph algorithms, and AI/reinforcement learning to solve NP-hard biochip design problems. Methods include Dijkstra-based routing, DRL-based error recovery, and automated synthesis frameworks validated through simulation and collaboration with Ritsumeikan University, Japan.',
  ARRAY['Design automation algorithms for MEDA biochip routing and dilution', 'Fault-tolerant architectures with error recovery using deep reinforcement learning', 'SmartMix: AI-based pathfinding for microfluidic dilution (Patent Pending)', 'Outstanding Paper Award at SASIMI 2018 for reagent loading on PMDs', 'Active bilateral projects funded by DST-JSPS (India-Japan collaboration)'],
  ARRAY['pub-j10', 'pub-j11', 'pub-c4', 'pub-c5', 'pub-w1', 'pub-p2', 'pub-j2', 'pub-c1'],
  'FlaskConical',
  'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=600&fit=crop',
  1
),
(
  'medical-imaging',
  'Medical Imaging & AI for Healthcare',
  'Deep learning frameworks for cardiovascular disease detection, brain tumor analysis, and endoscopy diagnosis.',
  'We develop intelligent systems that assist clinicians in diagnosing diseases through medical images. Our work spans cardiovascular disease prediction, brain tumor classification and segmentation, glioma detection, and video capsule endoscopy abnormality detection. We translate research into clinical decision-support tools and collaborate with clinical partners including Sir Ganga Ram Hospital, Delhi.',
  'Our approach integrates radiomics, wavelet-based features, attention mechanisms, and deep neural network architectures (CNNs, vision transformers). We benchmark on standard datasets including Z-Alizadeh Sani, BraTS, and capsule endoscopy datasets, and participate in international challenges at MICCAI.',
  ARRAY['C-CADZ for coronary artery disease detection (Applied Intelligence, IF 5.019)', 'MIFH heart disease diagnosis framework (IEEE Access, IF 3.476)', 'IBRDM brain tumor classification with DWT fusion (ACM ToIT, IF 3.989)', 'BraTS 2025 Challenge - 3rd place at MICCAI 2025 (Daejeon, Korea)', 'BraTS 2024 Challenge - 1st rank (validation) and 3rd (testing) at MICCAI 2024', 'MoU with Sir Ganga Ram Hospital, Delhi for joint AI-in-healthcare research'],
  ARRAY['pub-j1', 'pub-j3', 'pub-j4', 'pub-j5', 'pub-j6', 'pub-j7', 'pub-j8', 'pub-j9', 'pub-c3'],
  'HeartPulse',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  2
),
(
  'ml-deep-learning',
  'Machine Learning & Deep Learning',
  'Core ML and DL research including novel architectures, feature engineering, and applied AI systems.',
  'We investigate fundamental and applied machine learning problems, developing novel architectures and feature engineering pipelines. Our work includes twin neural networks, attention-based frameworks, ensemble methods, and swarm intelligence optimization techniques applied to real-world classification and prediction tasks.',
  'We use standard ML workflows combined with custom neural architectures, feature selection using genetic algorithms, and advanced normalization strategies. Models are validated on benchmark datasets and real clinical data. Code is developed primarily in Python with TensorFlow/PyTorch.',
  ARRAY['PHtNN twin neural network for heart disease risk prediction (ACM TIST 2026, accepted)', 'GAF-Net attention-based glioblastoma classification (BrainLes at MICCAI 2024)', 'FHO+: Advanced Swarm Intelligence via Fire Hawk Optimization (CRC Press 2025)', 'Applications spanning healthcare, biochip design, and transportation'],
  ARRAY['pub-j1', 'pub-j4', 'pub-j8', 'pub-c3'],
  'Brain',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
  3
),
(
  'computer-vision',
  'Computer Vision',
  'Visual intelligence systems for medical imaging, endoscopy, and histopathology analysis.',
  'Our computer vision research develops models for interpreting complex visual data in medical contexts. We build architectures for classifying pathological images, detecting tumors, and analyzing video capsule endoscopy sequences with the goal of reducing diagnostic errors and clinician workload.',
  'We employ CNNs, Vision Transformers, attention mechanisms, and multi-scale feature fusion. Datasets include capsule endoscopy recordings (MISAHUB), histopathology slides, and MRI volumes. We participate in international challenges including MICCAI BraTS and Capsule Vision.',
  ARRAY['CAVE-Net for video capsule endoscopy abnormality classification (arXiv 2024)', 'CBSN comprehensive normalization study for brain tumor segmentation', 'Capsule Vision 2024 Challenge - 6th rank among 150+ teams', 'BraTS Pathology Challenge 2024 - 1st rank (validation phase)'],
  ARRAY['pub-j3', 'pub-j4', 'pub-j6', 'pub-j7'],
  'Eye',
  'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=600&fit=crop',
  4
),
(
  'intelligent-transport',
  'Intelligent Transportation Systems',
  'AI-driven security and localization in connected and autonomous vehicles.',
  'We work on the intersection of AI and connected automotive systems, focusing on vehicle localization, sensor fusion, and cybersecurity of connected vehicles. Our research addresses threats to connected autonomous vehicle architectures and proposes AI-driven resilience mechanisms.',
  'We use Siamese networks for sensor fusion, multi-modal data from LiDAR, radar, and cameras for localization, and sequence models for anomaly detection. Security analyses follow established threat modelling frameworks for vehicular ad hoc networks.',
  ARRAY['CARES - context-aware resilience system for connected electric vehicles (IEEE CICN 2025)', 'Multi-modal sensor fusion with Siamese networks for vehicle localization (under review IEEE T-ITS)', 'Patent pending on hybrid asynchronous cryptographic system for connected vehicles'],
  ARRAY['pub-c2', 'pub-p1'],
  'Car',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
  5
),
(
  'design-automation',
  'EDA & Design Automation',
  'Electronic Design Automation methodologies for biochip synthesis and fault-tolerant system design.',
  'Our EDA research develops automated synthesis, placement, and routing tools for emerging computing substrates - primarily microfluidic biochips. We address challenges including architectural synthesis, fault-tolerance, and design space exploration, bridging VLSI design methodology with biochemistry.',
  'Techniques include graph-based algorithms, integer linear programming, and heuristic search for biochip synthesis. We implement and evaluate methods in C++ and Python, collaborating with Ritsumeikan University (Japan) and National Taiwan University on joint bilateral projects.',
  ARRAY['Fast architecture-level synthesis of fault-tolerant flow-based biochips at DATE 2017', 'k-Array rotary mixer design automation at ICCD 2016', 'DST-JSPS funded bilateral project on fault-tolerant MEDA biochip design (2024-2026)', 'SERB-funded project on design automation for lab-on-a-chip (2024-2027)'],
  ARRAY['pub-j10', 'pub-j11', 'pub-c1', 'pub-c4', 'pub-c5', 'pub-w1'],
  'Cpu',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
  6
);

insert into grants (
  id, title, agency, agency_logo, amount, start_date, end_date, pi, co_pis, description, status, display_order
) values
-- ─────────────────────────────────────────────
-- GRANTS  (real data from CV_Ankur.pdf)
-- ─────────────────────────────────────────────
(
  'grant-serb',
  'Development of Design Automation and Control Algorithms for Lab-on-a-chip based Programmable Microfluidic Biochips',
  'Science & Engineering Research Board (SERB), New Delhi',
  null,
  '₹23,02,580',
  '2024',
  '2027',
  'Dr. Ankur Gupta',
  ARRAY[]::text[],
  'This SERB-funded project focuses on developing design automation algorithms and control methodologies for lab-on-a-chip (LoC) systems based on programmable microfluidic biochips. The research aims to enable efficient, fault-tolerant, and automated biochemical assay execution on chip platforms.',
  'ongoing',
  1
),
(
  'grant-dstjsps',
  'Design automation for fault-tolerant sample preparation on microelectrode dot array-based digital microfluidic biochips',
  'Department of Science and Technology (DST) – JSPS Japan',
  null,
  '₹18,18,000',
  '2024',
  '2026',
  'Dr. Ankur Gupta',
  ARRAY[]::text[],
  'A bilateral India-Japan research project jointly funded by DST (India) and JSPS (Japan) in collaboration with Prof. Shigeru Yamashita at Ritsumeikan University, Osaka. The project develops fault-tolerant sample preparation algorithms for Micro-Electrode-Dot-Array (MEDA) biochips, including error detection and recovery strategies.',
  'ongoing',
  2
),
(
  'grant-sampark',
  'SAMPARK: Building Capacity for Sustainable Environment – Advanced Materials, Photonics, and System Design for a Clean Energy Transition',
  'Department of Science and Technology (DST), Government of India',
  null,
  '₹2,30,00,000',
  '2025',
  '2026',
  'Principal Investigator: IIT Delhi (Hub)',
  ARRAY['Dr. Ankur Gupta (Co-PI, NSUT Spoke)'],
  'SAMPARK is a large-scale DST-funded capacity-building initiative under the Hub-Spoke model (Hub: IIT Delhi; Spoke: NSUT). The project aims to build national capacity in advanced materials, photonics, and intelligent system design for clean energy transition. Dr. Gupta serves as Co-Principal Investigator at the NSUT Spoke.',
  'ongoing',
  3
),
(
  'grant-6gess',
  'Visiting Researcher – 6G Enabling Sustainable Society (6GESS) and DigiHealth Visitor Program',
  '6GESS Flagship, University of Oulu, Finland',
  null,
  '€4,300',
  '2025-11',
  '2025-11',
  'Dr. Ankur Gupta',
  ARRAY[]::text[],
  'Research mobility grant from the 6GESS Flagship program funding a one-month visit to Prof. Mariella Särestöniemi''s research unit at the University of Oulu, Finland. Objective: collaborative research on hybrid-intelligence imaging frameworks benchmarking physics-informed and AI/ML reconstruction algorithms for health-monitoring solutions.',
  'completed',
  4
),
(
  'grant-dstjsps-visit',
  'Visiting Scientist – Ritsumeikan University, Osaka (DST-JSPS Mobility)',
  'DST-JSPS Research Mobility Programme',
  null,
  '₹3,53,000',
  '2025-10',
  '2025-10',
  'Dr. Ankur Gupta',
  ARRAY[]::text[],
  'Research mobility grant funding a two-week visit to Prof. Shigeru Yamashita''s lab at Ritsumeikan University, Osaka, Japan. Collaborative research on fault-tolerant model development and error-recovery algorithms in MEDA biochips.',
  'completed',
  5
);

insert into events (
  id, title, type, date, end_date, time, venue, description, full_description, speaker, speaker_affiliation, poster_image, images, registration_url, status, display_order
) values
-- ─────────────────────────────────────────────
-- EVENTS  (real data from CV_Ankur.pdf)
-- ─────────────────────────────────────────────
(
  'event-vlsid2026',
  'Paper Presentation at VLSID 2026 – 39th International Conference on VLSI Design',
  'conference',
  '2026-01-03',
  '2026-01-07',
  null,
  'Pune, Maharashtra, India',
  'Dr. Gupta''s paper "A Polynomial Time Routing Algorithm for MEDA Biochips based on Dijkstra''s Algorithm" was presented at VLSID 2026.',
  'The 39th International Conference on VLSI Design (VLSID 2026) brings together researchers in VLSI and EDA. Dr. Gupta presented work on polynomial-time routing for MEDA biochips in collaboration with Ritsumeikan University, Japan.',
  'Dr. Ankur Gupta',
  'NSUT, New Delhi',
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  1
),
(
  'event-sasimi2025',
  'SASIMI 2025 – 26th Workshop on Synthesis And System Integration of Mixed Information Technologies',
  'workshop',
  '2025-10-09',
  '2025-10-10',
  null,
  'Nara, Japan',
  'Dr. Gupta served as Session Chair and presented three workshop papers on MEDA biochip routing, error recovery, and cyber-physical security at SASIMI 2025.',
  'Dr. Gupta chaired a session and co-authored three papers at SASIMI 2025 held in Nara, Japan. Topics covered include DRL-based error recovery in MEDA biochips, anomaly detection for cyber-physical attacks, and Dijkstra-based routing optimization.',
  'Dr. Ankur Gupta',
  'NSUT, New Delhi',
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  2
),
(
  'event-miccai2025',
  'BraTS 2025 Challenge at MICCAI 2025 (Daejeon, South Korea)',
  'conference',
  '2025-09-23',
  '2025-09-27',
  null,
  'Daejeon, Republic of Korea',
  'The lab team Nexus achieved 3rd place in the testing phase of the Brain Tumor Segmentation Lighthouse Challenge (BraTS 2025) at MICCAI 2025.',
  'Medical Image Computing and Computer Assisted Intervention (MICCAI) 2025 was held in Daejeon, South Korea. The lab-mentored team Nexus received the top performing badge in the validation phase and 3rd place in the final testing phase of the BraTS 2025 Lighthouse Challenge.',
  null,
  null,
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  3
),
(
  'event-fdp-aimi2025',
  'FDP on AI in Medical Imaging (AIMI) 2025 – Convener',
  'workshop',
  '2025-08-25',
  '2025-08-29',
  null,
  'Netaji Subhas University of Technology (NSUT), New Delhi',
  'Dr. Gupta convened the One Week Faculty Development Programme titled "AI in Medical Imaging (AIMI) 2025", organized by Electronics & ICT Academy, IIT Roorkee.',
  'Dr. Ankur Gupta served as Convener for this five-day FDP, bringing together faculty from institutions across India to explore AI techniques for medical image analysis. The programme was organized by the Electronics & ICT Academy, IIT Roorkee, and hosted at NSUT, New Delhi, on August 25–29, 2025.',
  null,
  null,
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  4
),
(
  'event-ai4humanity2025',
  'Delhi AI4Humanity Summit 2025 – Panel Discussion',
  'conference',
  '2025-02-19',
  null,
  null,
  'Netaji Subhas University of Technology (NSUT), New Delhi',
  'Dr. Gupta participated as a panellist at the Summit Inauguration of DELHI AI4HUMANITY SUMMIT 2025, organized by NSUT-IIF in collaboration with the Embassy of Israel in India.',
  'The Delhi AI4Humanity Summit 2025 was organized by Netaji Subhas University of Technology, Incubation and Innovation Foundation (NSUT-IIF) in collaboration with the Embassy of Israel in India. Dr. Gupta was invited as a panel member for the Summit Inauguration on February 19, 2025.',
  'Dr. Ankur Gupta',
  'NSUT, New Delhi',
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=900&fit=crop'
  ],
  'https://ai4humanitydelhi.in/',
  'past',
  5
),
(
  'event-miccai2024',
  'BraTS 2024 Challenge at MICCAI 2024 (Marrakesh, Morocco)',
  'conference',
  '2024-10-10',
  null,
  null,
  'Marrakesh, Morocco',
  'The lab team Devaratha achieved 1st rank in the validation phase and 3rd position in the testing phase of the Brain Tumor Segmentation Pathology Challenge (BraTS 2024) at MICCAI 2024.',
  'The lab-mentored team Devaratha participated in the BraTS 2024 Pathology Challenge at MICCAI 2024 in Marrakesh. The team secured 1st rank in the validation phase and 3rd position in the final testing phase – a remarkable achievement in the international AI medical imaging competition.',
  null,
  null,
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  6
),
(
  'event-fdp-aisep2025',
  'FDP on AI Securities and Ethics Practices (AISEP 2025) – Coordinator',
  'workshop',
  '2025-04-21',
  '2025-04-25',
  null,
  'Netaji Subhas University of Technology (NSUT), New Delhi',
  'Dr. Gupta coordinated the One Week Faculty Development Programme on "AI Securities and Ethics Practices (AISEP)", organized by Electronics & ICT Academy, IIT Roorkee, held at NSUT.',
  'A five-day faculty development programme covering AI security, ethical AI governance, and responsible deployment. Organised by the Electronics & ICT Academy, IIT Roorkee, and held at NSUT campus, New Delhi. Dr. Gupta served as Coordinator.',
  null,
  null,
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  7
),
(
  'event-icoin2021',
  'Paper Presentation at ICOIN 2021 – 35th International Conference on Information Networking',
  'conference',
  '2021-01-13',
  '2021-01-16',
  null,
  'Jeju Island, South Korea (Virtual)',
  'Dr. Gupta presented two papers at ICOIN 2021: DMHZ (heart disease diagnosis) and GRGE (glioma detection using radiomics).',
  'The 35th International Conference on Information Networking (ICOIN 2021) was held virtually from Jeju Island, South Korea. Dr. Gupta presented DMHZ, a machine learning decision support system for heart disease, and co-authored GRGE, a glioma classification system using GA features and extremely randomized trees. Conference attendance was supported by an Alumni Fund grant from IIT Roorkee.',
  'Dr. Ankur Gupta',
  'IIT Roorkee',
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  8
),
(
  'event-date2017',
  'Paper Presentation at DATE 2017 – IEEE Design Automation and Test in Europe',
  'conference',
  '2017-03-27',
  '2017-03-31',
  null,
  'Swisstech Convention Centre, Lausanne, Switzerland',
  'Co-authored paper on "Fast Architecture-Level Synthesis of Fault-Tolerant Flow-Based Microfluidic Biochips" presented at DATE 2017.',
  'The IEEE Design Automation and Test in Europe (DATE) 2017 conference was held at the Swisstech Convention Centre in Lausanne, Switzerland. The paper proposed fast heuristic algorithms for synthesizing fault-tolerant flow-based microfluidic biochips, co-authored with researchers from IIT Roorkee and Technical University of Denmark.',
  'Dr. Ankur Gupta',
  'IIT Roorkee',
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  9
),
(
  'event-aigrind2026',
  'Invited Judge – Delhi AI Grind, District and State Finals',
  'outreach',
  '2026-02-07',
  null,
  null,
  'Delhi (District and State Finals)',
  'Dr. Ankur Gupta served as Invited Judge at Delhi AI Grind District and State Finals, anchored by the Department of Education, Higher & Technical Education, Govt. of NCT of Delhi.',
  'The Delhi AI Grind is a government-led AI initiative by the Department of Education, GNCT Delhi, to foster AI literacy and student innovation. Dr. Gupta was invited as a judge for the District and State Finals held on February 07, 2026.',
  'Dr. Ankur Gupta',
  'NSUT, New Delhi',
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=900&fit=crop'
  ],
  null,
  'past',
  10
);

insert into news (
  id, title, date, category, description, image, link, display_order
) values
-- ─────────────────────────────────────────────
-- NEWS  (real news from CV_Ankur.pdf)
-- ─────────────────────────────────────────────
(
  'news-1',
  'PHtNN Paper Accepted at ACM Transactions on Intelligent Systems and Technology (TIST)',
  '2026-01-01',
  'paper',
  'Dr. Gupta''s paper "PHtNN: Prediction of Heart Disease Risk Using Twin Neural Network" has been accepted for publication in ACM TIST 2026.',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
  null,
  1
),
(
  'news-2',
  'Paper Presented at VLSID 2026 on Polynomial-Time MEDA Biochip Routing',
  '2026-01-03',
  'paper',
  'The paper "A Polynomial Time Routing Algorithm for MEDA Biochips based on Dijkstra''s Algorithm" was presented at the 39th VLSID Conference, Pune.',
  null,
  null,
  2
),
(
  'news-3',
  'Lab Team Achieves 3rd Place at BraTS 2025 Challenge, MICCAI 2025 – Daejeon',
  '2025-09-27',
  'award',
  'Team Nexus, mentored by Dr. Gupta, received the top performing badge in the validation phase and 3rd place in the testing phase of the Brain Tumor Segmentation Lighthouse Challenge (BraTS 2025) at MICCAI 2025, Daejeon, Korea.',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
  null,
  3
),
(
  'news-4',
  'Three Papers at SASIMI 2025, Nara, Japan',
  '2025-10-09',
  'paper',
  'Three lab papers on MEDA biochip routing, DRL-based error recovery, and cyber-physical anomaly detection were presented at SASIMI 2025 in Nara, Japan. Dr. Gupta also chaired a session.',
  null,
  null,
  4
),
(
  'news-5',
  'Dr. Gupta Visits University of Oulu, Finland as Visiting Researcher (6GESS)',
  '2025-11-02',
  'general',
  'Dr. Gupta visited the Research Unit of Health Sciences and Technology at the University of Oulu, Finland, under the 6G Enabling Sustainable Society (6GESS) and DigiHealth Visitor Program with a €4,300 research mobility grant.',
  'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=400&h=300&fit=crop',
  null,
  5
),
(
  'news-6',
  'Micromachines Paper Published on Error Correction in DMFBs',
  '2025-01-01',
  'paper',
  'The paper "Considering the Node Level in Error Correction for DMFBs" was published in Micromachines (2025, 16, 1013), co-authored with researchers from Ritsumeikan University, Japan.',
  null,
  'https://doi.org/10.3390/mi16091013',
  6
),
(
  'news-7',
  'SERB Grant Awarded for Lab-on-a-Chip Design Automation Research',
  '2024-01-01',
  'grant',
  'Dr. Gupta was awarded a SERB research grant of ₹23,02,580 for the project "Development of Design Automation and Control Algorithms for Lab-on-a-chip based Programmable Microfluidic Biochips" for the period 2024–2027.',
  null,
  null,
  7
),
(
  'news-8',
  'DST-JSPS Joint Bilateral Project Funded for MEDA Biochip Design',
  '2024-01-01',
  'grant',
  'Dr. Gupta received DST-JSPS bilateral funding of ₹18,18,000 for the project on fault-tolerant sample preparation on MEDA biochips, in collaboration with Ritsumeikan University, Japan.',
  null,
  null,
  8
),
(
  'news-9',
  'Lab Team Wins 1st Rank (Validation) and 3rd Place in BraTS 2024 Challenge, MICCAI 2024',
  '2024-10-10',
  'award',
  'Team Devaratha, mentored by Dr. Gupta, secured 1st rank in the validation phase and 3rd position in the testing phase at the BraTS 2024 Pathology Challenge at MICCAI 2024, Marrakesh, Morocco.',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
  null,
  9
),
(
  'news-10',
  'MoU Signed with Sir Ganga Ram Hospital for AI in Healthcare Research',
  '2025-12-29',
  'general',
  'An MoU was signed between Sir Ganga Ram Hospital, Delhi-NCR, and NSUT for knowledge exchange, joint certification programs, and interdisciplinary AI research in healthcare, with Dr. Gupta as MoU Champion.',
  null,
  null,
  10
);

insert into gallery_images (
  id, src, alt, caption, category, date, display_order
) values
-- ─────────────────────────────────────────────
-- GALLERY  (real captions from CV activities)
-- ─────────────────────────────────────────────
('img-1', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', 'VLSID 2026 conference presentation', 'Dr. Gupta presenting the MEDA biochip routing paper at VLSID 2026, Pune', 'conference', '2026-01', 1),
('img-2', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'MICCAI 2025 conference, Daejeon', 'Lab team at MICCAI 2025 in Daejeon, South Korea after BraTS 2025 Challenge results', 'conference', '2025-09', 2),
('img-3', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop', 'FDP on AI in Medical Imaging (AIMI) 2025', 'Faculty Development Programme on AI in Medical Imaging, NSUT (August 25–29, 2025)', 'workshop', '2025-08', 3),
('img-4', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', 'Lab research meeting', 'Weekly lab group meeting discussing ongoing projects in microfluidics and medical imaging', 'lab', '2025-07', 4),
('img-5', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'Collaboration with Ritsumeikan University', 'Collaborative session with Prof. Shigeru Yamashita''s NGC Lab, Ritsumeikan University, Japan', 'lab', '2025-10', 5),
('img-6', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop', 'Delhi AI Grind 2026 – Judging', 'Dr. Gupta serving as Judge at Delhi AI Grind District and State Finals, Feb 2026', 'outreach', '2026-02', 6),
('img-7', 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800&h=600&fit=crop', 'SASIMI 2025 session chair', 'Dr. Gupta as Session Chair at SASIMI 2025, Nara, Japan', 'conference', '2025-10', 7),
('img-8', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop', 'BraTS 2024 team celebration', 'Team Devaratha celebrating 1st rank (validation) at BraTS 2024, MICCAI, Marrakesh', 'lab', '2024-10', 8),
('img-9', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop', 'Delhi AI4Humanity Summit 2025', 'Dr. Gupta as panellist at the Delhi AI4Humanity Summit 2025 inauguration, NSUT', 'conference', '2025-02', 9),
('img-10', 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop', 'AI outreach programme for students', 'Engaging school students in AI workshops as part of the lab''s outreach activities', 'outreach', '2025-03', 10),
('img-11', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop', 'FDP on AI Securities and Ethics (AISEP 2025)', 'Coordinating the five-day FDP on AI Securities and Ethics Practices, NSUT, April 2025', 'workshop', '2025-04', 11),
('img-12', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop', 'Lab computing infrastructure', 'High-performance computing setup used for large-scale deep learning experiments', 'lab', '2025-01', 12);
