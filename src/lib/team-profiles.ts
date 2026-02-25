/**
 * Enhanced team profile data for key VHP Legal Cell members.
 * Used on the detailed profile pages (pillars/[slug]).
 */

export interface ProfileEducation {
  degree: string;
  institution: string;
  year?: string;
  extra?: string;
}

export interface ProfileExperience {
  role: string;
  org: string;
  period?: string;
  detail?: string;
}

export interface ProfilePublication {
  title: string;
  source: string;
  year: string;
}

export interface ProfileCertification {
  name: string;
  issuer: string;
}

export interface ProfileSkillCategory {
  category: string;
  items: string[];
}

export interface ProfileLink {
  label: string;
  url: string;
  icon: "web" | "linkedin" | "email" | "phone" | "github" | "instagram" | "whatsapp";
}

export interface ProfileStat {
  value: string;
  label: string;
}

export interface EnhancedProfile {
  slug: string;
  name: string;
  nameHi: string;
  title: string;
  titleHi: string;
  subtitle?: string;
  photo?: string;
  bio: string[];
  education: ProfileEducation[];
  experience: ProfileExperience[];
  empanelments?: string[];
  practiceAreas: string[];
  paLabel: string;
  books?: ProfilePublication[];
  articles?: ProfilePublication[];
  publications?: ProfilePublication[];
  mediaAppearances?: { show: string; channel: string; dates: string }[];
  speakingEngagements?: string[];
  achievements?: string[];
  certifications?: ProfileCertification[];
  skills?: ProfileSkillCategory[];
  links: ProfileLink[];
  stats: ProfileStat[];
}

export const ENHANCED_PROFILES: EnhancedProfile[] = [
  {
    slug: "dr-abhishek-atrey",
    name: "Dr. Abhishek Atrey",
    nameHi: "डॉ. अभिषेक आत्रेय",
    title: "National Convenor, VHP Legal Cell",
    titleHi: "राष्ट्रीय संयोजक, विहिप विधि प्रकोष्ठ",
    subtitle: "Advocate-on-Record, Supreme Court of India",
    photo: "/images/dr-abhishek-atrey.jpg",
    bio: [
      "Dr. Abhishek Atrey is a distinguished Supreme Court Advocate and Advocate-on-Record who has been at the forefront of legal advocacy for Hindu dharmic causes for nearly three decades. As the National Convenor of VHP Legal Cell (Vidhi Prakoshtha), he leads India's largest Hindu legal advocacy network, coordinating teams across 12 Khetras and 35+ Prants.",
      "Enrolled as an Advocate in 1997 and designated as Advocate-on-Record in 2006, Dr. Atrey has represented the Government of India, State Governments, public sector undertakings, and significant institutions in landmark proceedings before the Supreme Court, High Courts, National Green Tribunal, and various tribunals across India.",
      "A prolific legal scholar, he has authored 3 books, published 20+ articles in leading legal journals, and made over 30 appearances on national television channels including Rajya Sabha TV, Sansad TV, and APN News, providing expert commentary on constitutional and legal matters of national importance.",
    ],
    education: [
      { degree: "LL.D. (Doctor of Laws)", institution: "University", year: "2012", extra: "Doctoral research in law" },
      { degree: "LL.M. (Master of Laws)", institution: "University", year: "1999" },
      { degree: "LL.B. (Bachelor of Laws)", institution: "University", year: "1997" },
      { degree: "B.Sc. (Bachelor of Science)", institution: "University", year: "1992" },
    ],
    experience: [
      { role: "National Convenor", org: "VHP Legal Cell (Vidhi Prakoshtha)", detail: "Leading India's largest Hindu legal advocacy network across 12 Khetras and 35+ Prants" },
      { role: "Advocate-on-Record", org: "Supreme Court of India", period: "Since 2006", detail: "Designated AoR practicing constitutional, civil, and public interest litigation" },
      { role: "'A' Panel Counsel for Government of India", org: "Supreme Court of India", period: "Since 2014", detail: "Senior panel representing the Union of India" },
      { role: "Standing Counsel for Govt. of Uttarakhand", org: "Supreme Court of India", detail: "Representing the State in all matters before the apex court" },
      { role: "Standing Counsel for MoEFCC", org: "National Green Tribunal", period: "2015–2018", detail: "Ministry of Environment, Forest & Climate Change" },
      { role: "Panel Counsel", org: "Association of Indian Universities", period: "Since 2020", detail: "For Supreme Court of India and High Court of Delhi" },
      { role: "Senior Panel Counsel", org: "CAQM (Commission for Air Quality Management)", period: "Since 2022", detail: "Delhi High Court and National Green Tribunal" },
      { role: "Vice President", org: "Supreme Court Young Lawyer's Forum", detail: "Organizing felicitation programs for Hon'ble Judges" },
      { role: "Coordinator", org: "Adhivakta Parishad, Supreme Court", period: "2016–2018", detail: "Conducted study circles on different legal topics" },
      { role: "President", org: "Dard Se Hamdard Tak (NGO)", detail: "Welfare of poor prisoners in India" },
    ],
    empanelments: [
      "Standing Counsel for Govt. of Uttarakhand in Supreme Court",
      "'A' Panel Counsel for Government of India in Supreme Court (since 2014)",
      "Standing Counsel for MoEFCC in National Green Tribunal (2015–2018)",
      "Panel Counsel for Association of Indian Universities — SC & Delhi HC (since 2020)",
      "Senior Panel Counsel for CAQM — Delhi HC & NGT (since 2022)",
    ],
    practiceAreas: [
      "Constitutional Law",
      "Public Interest Litigation (PIL)",
      "Environmental Law & NGT",
      "Government Litigation",
      "Temple Rights & Religious Freedom",
      "Criminal Law",
      "Civil Litigation",
      "Waqf & Property Law",
      "Air Quality & Environmental Regulation",
      "University & Education Law",
    ],
    paLabel: "Areas of Practice",
    books: [
      {
        title: "Law of Writs, Practice & Procedure",
        source: "Kamal Publishers (Lawman), New Delhi",
        year: "August 2014",
      },
      {
        title: "Law of Witnesses: Role of Witnesses in Criminal Justice System, A Need to Reform",
        source: "Kamal Publishers (Lawman), New Delhi — Foreword by Hon'ble Mr. Justice T.S. Thakur, Judge, Supreme Court of India",
        year: "March 2015",
      },
      {
        title: "Yadein (यादें) — Hindi Poems",
        source: "Hindi Poetry Collection",
        year: "2019",
      },
    ],
    articles: [
      { title: "A Himalayan Task — on Uniform Civil Code", source: "India Legal Magazine", year: "June 2023" },
      { title: "Separation of Powers — States and Union Territories", source: "India Legal Magazine", year: "April 2023" },
      { title: "No Set Formula for Bail", source: "India Legal Magazine", year: "March 2023" },
      { title: "Tussle for Power — Delhi Government and LG", source: "India Legal Magazine", year: "January 2023" },
      { title: "Age of Consent", source: "India Legal Magazine", year: "January 2023" },
      { title: "A Matter of Choice", source: "India Legal Magazine", year: "November 2022" },
      { title: "Judging the Judges", source: "India Legal Magazine", year: "October 2022" },
      { title: "Waqf Act — Playing with the Constitution", source: "Dainik Jagran Newspaper", year: "October 2022" },
      { title: "China's Land Border Law: A Serious Concern for India", source: "India Legal Live", year: "January 2022" },
      { title: "Anti Conversion Laws and their Constitutionality", source: "India Legal Live", year: "January 2021" },
      { title: "Farm Laws 2020: Beginning of a New Era", source: "India Legal Live", year: "January 2021" },
      { title: "Contempt of Most Powerful Court @ Re.1", source: "India Legal Live", year: "September 2020" },
      { title: "Law of Contempt Versus Independence of Judiciary", source: "India Legal Live", year: "August 2020" },
      { title: "Dilution of Labour Laws: Is this the Package", source: "India Legal Live", year: "May 2020" },
      { title: "Risky Business: Doctrine of Frustration", source: "India Legal Live", year: "May 2020" },
      { title: "Framework and Challenges to CAA and NRC", source: "India Legal Live", year: "January 2020" },
      { title: "Important Judgments of Supreme Court: An Analysis", source: "Nyay Pravah", year: "Oct–Dec 2018" },
      { title: "Ecology and Environment: Crisis and Remedies", source: "Nyay Pravah", year: "Apr–Jun 2017" },
      { title: "Finance Act, 2017: A Fight for Supremacy", source: "Nyay Pravah", year: "Jul–Sep 2017" },
    ],
    mediaAppearances: [
      { show: "Desh Deshantar", channel: "Rajya Sabha TV / Sansad TV", dates: "2018–2021 (6+ appearances)" },
      { show: "Law of the Land", channel: "Rajya Sabha TV", dates: "2018–2019 (5+ appearances)" },
      { show: "Big Picture", channel: "Rajya Sabha TV", dates: "January 2019" },
      { show: "Nyay Chakra", channel: "Lok Sabha TV", dates: "February 2019" },
      { show: "Aapka Kanoon", channel: "Rajya Sabha TV", dates: "December 2019" },
      { show: "Policy Watch", channel: "Rajya Sabha TV", dates: "November 2020" },
      { show: "Aaj Ki Charcha", channel: "Rajya Sabha TV", dates: "2020–2021" },
      { show: "Bills and Acts", channel: "Sansad TV", dates: "2022–2023" },
      { show: "Loktantra", channel: "APN News", dates: "2020–2021 (7+ appearances)" },
      { show: "Legal Helpline", channel: "APN News", dates: "2021 (6+ appearances)" },
      { show: "Mudda", channel: "APN News", dates: "July 2021" },
      { show: "Murder Mystery", channel: "News India", dates: "January 2023" },
    ],
    speakingEngagements: [
      "Guest Speaker — BPS Girls University (2012, 2013, 2014) — Annual Teachers Training Program",
      "Speaker — Seminar on Ecology, Environment & Role of Lawyers — Srinagar, J&K (2016)",
      "Chief Guest — IPEM College, Ghaziabad — Law Day Lecture on Environmental Threats (2016)",
      "Main Speaker — Uttarakhand Judicial Academy, Nainital — Environmental Laws for Trainee Judges (2018)",
      "Chairperson — Seminar on Consumer Affairs — MMH College, Ghaziabad (2016)",
      "Judge — National Moot Court Competitions — IP University, Delhi (2014, 2015, 2016)",
      "Judge — National Moot Court Competition — DME College, Noida (2018)",
      "Judge — National Moot Court Competition — Aligarh Muslim University (2018)",
      "Guest Speaker — Kamkus College of Law, Ghaziabad (2017)",
      "Speaker — Environmental Seminar — Guwahati, Assam (2017)",
      "Chief Guest — Electoral Reforms Seminar — CCS University, Meerut (2018)",
      "Speaker — Chartered Accountants Study Circle — RTI Act (2019)",
      "Guest Speaker — North East Green Summit — IIT Guwahati (2019)",
      "Chairperson — International Seminar — SOA University, Bhubaneswar (2019)",
      "Chief Guest — Asmita College of Law, Mumbai — World Environment Day (2021)",
      "Guest of Honor — Noida International University Orientation (2021)",
      "Guest Speaker — Vishwa Samvad Kendra Conclave — Gautam Budh University (2023)",
    ],
    achievements: [
      "Awarded 'Nyaymurti Prem Shankar Gupt Hindi Sahitya Samman' by Akhil Bhartiya Hindi Vidhi Pratishthan (2021)",
      "Drafted Municipal Bye-Laws for NOIDA Authority",
      "Published 3 books on law including foreword by Justice T.S. Thakur of Supreme Court",
      "Published 20+ articles in leading legal journals and national newspapers",
      "30+ television appearances as legal expert on national channels",
      "Represented Government of India in landmark environmental and constitutional cases",
    ],
    links: [
      { label: "Email", url: "mailto:abhishekatrey@gmail.com", icon: "email" },
      { label: "Chamber Email", url: "mailto:abhishek@atreychambers.com", icon: "email" },
      { label: "Phone", url: "tel:+919810047556", icon: "phone" },
      { label: "Atrey Chambers", url: "https://www.atreychambers.com", icon: "web" },
    ],
    stats: [
      { value: "29+", label: "Years of Practice" },
      { value: "AoR", label: "Supreme Court" },
      { value: "500+", label: "Cases Argued" },
      { value: "3", label: "Books Authored" },
      { value: "20+", label: "Articles Published" },
      { value: "30+", label: "TV Appearances" },
    ],
  },
  {
    slug: "aniruddh-atrey",
    name: "Aniruddh Atrey",
    nameHi: "अनिरुद्ध आत्रेय",
    title: "Director of Technology",
    titleHi: "प्रौद्योगिकी निदेशक",
    subtitle: "AI Engineer | Cybersecurity Specialist | Entrepreneur",
    photo: "/images/aniruddh-atrey.png",
    bio: [
      "Aniruddh Atrey is a technology entrepreneur, AI engineer, and cybersecurity specialist with 6+ years of experience building systems that protect, automate, and scale. He holds a Master of Science in Computer Science from the University of Florida and 18+ professional certifications from Stanford, Google, Cisco, EC-Council, IBM, and ISO.",
      "As Co-Founder & COO of F1Jobs.io and Founder & CTO of MetaMinds, he has architected AI systems with 95% precision, secured 50+ government web assets for the Ministry of Defence of India at INNEFU Labs (DRDO), and shipped production platforms at Arlo Technologies with 99.9% availability.",
      "At VHP Legal Cell, he leads technology strategy, digital infrastructure, cybersecurity, and AI-driven legal automation — driving the organization's digital transformation to empower legal advocacy across India.",
    ],
    education: [
      { degree: "M.S. in Computer Science", institution: "University of Florida, USA", year: "2023–2024", extra: "Network Security, Machine Learning, Advanced Data Structures" },
      { degree: "B.Tech in Computer Science & Engineering", institution: "Amity University, India", year: "2019–2023", extra: "Exchange Programme at Amity University Dubai" },
    ],
    experience: [
      { role: "Co-Founder & COO", org: "F1Jobs.io (NeuraScribe Inc)", period: "Austin, Texas", detail: "Career acceleration platform for global tech workforce" },
      { role: "Founder & CTO", org: "MetaMinds", detail: "AI automation startup — RAG pipelines, LLM orchestration, AI agents" },
      { role: "Data Science Engineer", org: "SaveLIFE Foundation", period: "New Delhi", detail: "Road safety data science pipelines across India" },
      { role: "Cybersecurity Engineer", org: "INNEFU Labs (DRDO)", detail: "Secured 50+ government web assets for Ministry of Defence" },
      { role: "Software Engineer", org: "Arlo Technologies", detail: "AI-driven IoT solutions, 99.9% availability" },
      { role: "Hackathon Judge & Chief Guest", org: "Geeta University" },
    ],
    practiceAreas: [
      "AI/ML Engineering & Data Science",
      "Cybersecurity & VAPT",
      "Full-Stack Development",
      "Cloud Architecture & DevOps",
      "Legal Tech & Automation",
      "UI/UX Design & Brand Identity",
    ],
    paLabel: "Areas of Expertise",
    certifications: [
      { name: "Machine Learning Specialization", issuer: "Stanford University" },
      { name: "Cybersecurity Professional Certificate", issuer: "Google" },
      { name: "CCNA Enterprise Networking", issuer: "Cisco" },
      { name: "Ethical Hacking Essentials", issuer: "EC-Council" },
      { name: "ISO/IEC 27001 Information Security", issuer: "SkillFront" },
      { name: "Elements of AI", issuer: "University of Helsinki" },
      { name: "Python Essentials", issuer: "Cisco" },
      { name: "Data Science Certificate", issuer: "IBM" },
      { name: "Deep Learning Specialization", issuer: "DeepLearning.AI" },
      { name: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services" },
      { name: "Network Defense Essentials", issuer: "EC-Council" },
      { name: "Digital Forensics Essentials", issuer: "EC-Council" },
      { name: "Introduction to Cybersecurity", issuer: "Cisco" },
      { name: "Google IT Support Professional", issuer: "Google" },
      { name: "HackerRank Problem Solving", issuer: "HackerRank" },
      { name: "Blockchain Fundamentals", issuer: "UC Berkeley" },
      { name: "Full-Stack Web Development", issuer: "Meta" },
      { name: "Agile Project Management", issuer: "Google" },
    ],
    publications: [
      { title: "Real-Time Temperature Based Food Recommendation using AI", source: "IEEE Xplore, 14th ICCCNT, IIT-Delhi", year: "2023" },
      { title: "Urban Digital Twins for Sustainability: Singapore & Indian Smart Cities", source: "IEEE Xplore, 2nd Global AI Summit", year: "2025" },
      { title: "Perspective of Cyber Security and Ethical Hacking with VAET", source: "Book Chapter — Big Data Analytics Framework for Smart Grids", year: "2023" },
    ],
    skills: [
      { category: "AI / Machine Learning", items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "RAG Pipelines", "LLM Fine-tuning", "AI Agents", "Computer Vision", "NLP"] },
      { category: "Cybersecurity", items: ["VAPT", "OWASP Top 10", "Penetration Testing", "SIEM (Splunk)", "MITRE ATT&CK", "Incident Response", "Ethical Hacking"] },
      { category: "Full-Stack Development", items: ["React", "Next.js", "Angular", "Django", "FastAPI", "Node.js", "SpringBoot", "PostgreSQL", "MongoDB", "Redis", "GraphQL"] },
      { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Serverless"] },
      { category: "Design", items: ["Figma", "Three.js", "GSAP", "UI/UX Design", "Brand Identity"] },
    ],
    achievements: [
      "50+ Government web assets secured for Ministry of Defence (DRDO)",
      "500+ hours of AI-processed data at 95% precision",
      "99% deployment success rate across 80+ production deployments",
      "Clients across 10+ countries — USA, UK, Europe, Singapore, Australia, Dubai",
      "3 IEEE / Book Chapter publications",
      "18+ professional certifications from Stanford, Google, Cisco, IBM",
      "2025 Webby Awards Winner — Best Home Page",
      "GSAP Site of the Month — Oct & Nov 2024",
    ],
    links: [
      { label: "Portfolio", url: "https://aniruddhatrey.com", icon: "web" },
      { label: "LinkedIn", url: "https://linkedin.com/in/aniruddhatrey", icon: "linkedin" },
      { label: "MetaMinds", url: "https://metaminds.firm.in", icon: "web" },
      { label: "F1Jobs.io", url: "https://f1jobs.io", icon: "web" },
      { label: "GitHub", url: "https://github.com/AndrousStark", icon: "github" },
      { label: "Instagram", url: "https://instagram.com/theaniruddhatrey", icon: "instagram" },
      { label: "Email", url: "mailto:atreyaniruddh@gmail.com", icon: "email" },
      { label: "WhatsApp", url: "https://wa.me/919319788556", icon: "whatsapp" },
    ],
    stats: [
      { value: "50+", label: "Govt Assets Secured" },
      { value: "18+", label: "Certifications" },
      { value: "3", label: "IEEE Publications" },
      { value: "10+", label: "Countries Served" },
      { value: "M.S.", label: "University of Florida" },
      { value: "6+", label: "Years Experience" },
    ],
  },
];

/** Look up an enhanced profile by slug */
export function getEnhancedProfile(slug: string): EnhancedProfile | undefined {
  return ENHANCED_PROFILES.find((p) => p.slug === slug);
}
