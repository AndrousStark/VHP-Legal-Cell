/**
 * Mock data for VHP Legal Cell — will be replaced by Payload CMS API calls.
 * All data is representative placeholder content.
 */

/* ─── Team Members ─── */
export interface TeamMember {
  id: number;
  slug: string;
  name: string;
  nameHi: string;
  designation: string;
  designationHi: string;
  level: "national" | "khetra" | "prant" | "court";
  khetraId?: string;
  photo?: string;
  bio: string;
  expertise: string[];
  cases: number;
  experience: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    slug: "dr-abhishek-atrey",
    name: "Dr. Abhishek Atrey",
    nameHi: "डॉ. अभिषेक आत्रेय",
    designation: "National Convenor",
    designationHi: "राष्ट्रीय संयोजक",
    level: "national",
    photo: "/images/dr-abhishek-atrey.jpg",
    bio: "Supreme Court Advocate and National Convenor of VHP Legal Cell. Dr. Atrey leads the nationwide legal advocacy for Hindu causes, coordinating teams across 12 Khetras and 35+ Prants.",
    expertise: ["Constitutional Law", "PIL", "Temple Rights", "Cow Protection"],
    cases: 500,
    experience: "25+ Years",
  },
  {
    id: 2,
    slug: "justice-retd-bk-sharma",
    name: "Justice (Retd.) B.K. Sharma",
    nameHi: "न्या. (से.नि.) बी.के. शर्मा",
    designation: "Patron",
    designationHi: "संरक्षक",
    level: "national",
    bio: "Former High Court Judge and senior patron of VHP Legal Cell. Provides judicial wisdom and strategic guidance to the organization.",
    expertise: ["Civil Law", "Constitutional Law", "Judicial Review"],
    cases: 300,
    experience: "35+ Years",
  },
  {
    id: 3,
    slug: "adv-ramesh-kumar",
    name: "Adv. Ramesh Kumar",
    nameHi: "अधि. रमेश कुमार",
    designation: "Vice President",
    designationHi: "उपाध्यक्ष",
    level: "national",
    bio: "Senior Supreme Court advocate and Vice President of VHP Legal Cell. Specializes in religious freedom cases and anti-conversion legislation.",
    expertise: ["Supreme Court", "Religious Freedom", "Anti-Conversion"],
    cases: 200,
    experience: "20+ Years",
  },
  {
    id: 4,
    slug: "adv-priya-sharma",
    name: "Adv. Priya Sharma",
    nameHi: "अधि. प्रिया शर्मा",
    designation: "Co-Convenor",
    designationHi: "सह-संयोजक",
    level: "national",
    bio: "Delhi High Court advocate and Co-Convenor. Handles gender justice, family law, and women's rights in the context of Hindu causes.",
    expertise: ["Family Law", "Women's Rights", "Delhi HC"],
    cases: 150,
    experience: "15+ Years",
  },
  {
    id: 5,
    slug: "adv-suresh-patel",
    name: "Adv. Suresh Patel",
    nameHi: "अधि. सुरेश पटेल",
    designation: "National Secretary",
    designationHi: "राष्ट्रीय सचिव",
    level: "national",
    bio: "Gujarat High Court advocate coordinating all Prant-level legal activities nationwide.",
    expertise: ["Gujarat HC", "RTI", "Land Disputes"],
    cases: 100,
    experience: "18+ Years",
  },
  {
    id: 6,
    slug: "adv-vikram-singh",
    name: "Adv. Vikram Singh",
    nameHi: "अधि. विक्रम सिंह",
    designation: "Khetra Convenor — Braj",
    designationHi: "क्षेत्र संयोजक — ब्रज",
    level: "khetra",
    khetraId: "braj-khetra",
    bio: "Allahabad High Court advocate. Leads legal initiatives across Uttar Pradesh including Gyanvapi, Mathura, and other landmark temple cases.",
    expertise: ["Allahabad HC", "Temple Cases", "Gyanvapi"],
    cases: 80,
    experience: "12+ Years",
  },
  {
    id: 7,
    slug: "adv-kavita-mishra",
    name: "Adv. Kavita Mishra",
    nameHi: "अधि. कविता मिश्रा",
    designation: "Khetra Convenor — Rajasthan",
    designationHi: "क्षेत्र संयोजक — राजस्थान",
    level: "khetra",
    khetraId: "rajasthan",
    bio: "Rajasthan High Court advocate specializing in cow protection laws and anti-conversion PILs in Rajasthan.",
    expertise: ["Rajasthan HC", "Cow Protection", "PIL"],
    cases: 60,
    experience: "10+ Years",
  },
  {
    id: 8,
    slug: "adv-mohan-das",
    name: "Adv. Mohan Das",
    nameHi: "अधि. मोहन दास",
    designation: "Khetra Convenor — Dakshin",
    designationHi: "क्षेत्र संयोजक — दक्षिण",
    level: "khetra",
    khetraId: "dakshin",
    bio: "Karnataka High Court advocate fighting for temple administration reform and religious freedom in South India.",
    expertise: ["Karnataka HC", "Temple Admin", "Religious Freedom"],
    cases: 45,
    experience: "14+ Years",
  },
  {
    id: 9,
    slug: "aniruddh-atrey",
    name: "Aniruddh Atrey",
    nameHi: "अनिरुद्ध आत्रेय",
    designation: "Director of Technology",
    designationHi: "प्रौद्योगिकी निदेशक",
    level: "national",
    photo: "/images/aniruddh-atrey.png",
    bio: "AI Engineer, Cybersecurity Specialist & Entrepreneur. M.S. in Computer Science from University of Florida. Leads VHP Legal Cell's digital transformation, technology strategy, and AI-driven legal automation.",
    expertise: ["AI/ML", "Cybersecurity", "Full-Stack", "Legal Tech"],
    cases: 0,
    experience: "6+ Years",
  },
];

/* ─── Cases ─── */
export interface CaseData {
  id: number;
  slug: string;
  title: string;
  titleHi: string;
  caseNumber: string;
  court: string;
  courtType: "supreme" | "high" | "district" | "tribunal";
  category: "temple" | "cow" | "conversion" | "religious-freedom" | "waqf" | "ucc" | "other";
  status: "filed" | "ongoing" | "won" | "lost" | "reserved" | "disposed";
  filedDate: string;
  nextHearing?: string;
  lawyer: string;
  state: string;
  khetraId: string;
  summary: string;
}

export const CASES: CaseData[] = [
  {
    id: 1, slug: "gyanvapi-survey", title: "Gyanvapi Mosque Survey Case", titleHi: "ज्ञानवापी मस्जिद सर्वेक्षण वाद",
    caseNumber: "SC/2022/PIL/4567", court: "Supreme Court of India", courtType: "supreme",
    category: "temple", status: "ongoing", filedDate: "2022-05-16", nextHearing: "2026-03-15",
    lawyer: "Adv. Vishnu Shankar Jain", state: "Uttar Pradesh", khetraId: "braj-khetra",
    summary: "Petition seeking archaeological survey of Gyanvapi mosque premises in Varanasi to establish the pre-existing temple structure.",
  },
  {
    id: 2, slug: "mathura-krishna-janmabhoomi", title: "Krishna Janmabhoomi Case", titleHi: "कृष्ण जन्मभूमि वाद",
    caseNumber: "AHC/2020/CS/1234", court: "Allahabad High Court", courtType: "high",
    category: "temple", status: "ongoing", filedDate: "2020-09-28", nextHearing: "2026-04-10",
    lawyer: "Adv. Hari Shankar Jain", state: "Uttar Pradesh", khetraId: "braj-khetra",
    summary: "Suit for restoration of entire 13.37 acres of Krishna Janmabhoomi complex in Mathura.",
  },
  {
    id: 3, slug: "cow-protection-rajasthan", title: "Cow Protection PIL — Rajasthan", titleHi: "गो संरक्षण जनहित याचिका — राजस्थान",
    caseNumber: "RHC/2024/PIL/789", court: "Rajasthan High Court", courtType: "high",
    category: "cow", status: "won", filedDate: "2024-01-15",
    lawyer: "Adv. Kavita Mishra", state: "Rajasthan", khetraId: "rajasthan",
    summary: "PIL seeking stricter enforcement of cow protection laws and ban on illegal cattle transport across state borders.",
  },
  {
    id: 4, slug: "anti-conversion-up", title: "Anti-Conversion Law Challenge", titleHi: "धर्मांतरण निरोध कानून चुनौती",
    caseNumber: "SC/2023/WP/5678", court: "Supreme Court of India", courtType: "supreme",
    category: "conversion", status: "ongoing", filedDate: "2023-03-10", nextHearing: "2026-03-28",
    lawyer: "Adv. Ramesh Kumar", state: "Delhi", khetraId: "delhi",
    summary: "Defending the constitutional validity of state anti-conversion laws challenged by various petitioners.",
  },
  {
    id: 5, slug: "temple-land-encroachment", title: "Temple Land Encroachment — Bengaluru", titleHi: "मंदिर भूमि अतिक्रमण — बेंगलुरु",
    caseNumber: "KHC/2025/CS/456", court: "Karnataka High Court", courtType: "high",
    category: "temple", status: "filed", filedDate: "2025-11-20", nextHearing: "2026-02-28",
    lawyer: "Adv. Mohan Das", state: "Karnataka", khetraId: "dakshin",
    summary: "Petition against illegal encroachment on ancient Shiva temple land in Bengaluru by commercial developers.",
  },
  {
    id: 6, slug: "waqf-act-challenge", title: "Waqf Act Amendment Challenge", titleHi: "वक़्फ अधिनियम संशोधन चुनौती",
    caseNumber: "SC/2024/WP/9012", court: "Supreme Court of India", courtType: "supreme",
    category: "waqf", status: "ongoing", filedDate: "2024-06-15", nextHearing: "2026-05-02",
    lawyer: "Dr. Abhishek Atrey", state: "Delhi", khetraId: "delhi",
    summary: "Challenging overreach of Waqf Board claiming Hindu temple properties as Waqf assets.",
  },
];

/* ─── News Articles ─── */
export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  titleHi: string;
  category: "press" | "media" | "article" | "vhp-update" | "court-update";
  excerpt: string;
  date: string;
  author: string;
  source: string;
  sourceUrl?: string;
  featured: boolean;
  image?: string;
  relatedActivitySlug?: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  /* ── Real News Coverage of VHP Legal Cell Events ── */
  {
    id: 1, slug: "30-judges-vhp-meet-wire",
    title: "30 Former Judges of Supreme Court, High Courts Attend Meet Organised by Vishwa Hindu Parishad",
    titleHi: "30 पूर्व न्यायाधीशों ने विश्व हिंदू परिषद की बैठक में भाग लिया",
    category: "press",
    excerpt: "30 retired Supreme Court and High Court judges participated in the VHP Legal Cell meet in Delhi. Union Law Minister Arjun Ram Meghwal attended. Discussed Varanasi/Mathura temple disputes, Waqf Amendment Bill, and religious conversions.",
    date: "2024-09-10", author: "The Wire Staff", source: "The Wire",
    sourceUrl: "https://m.thewire.in/article/communalism/30-former-judges-of-supreme-court-high-courts-attend-meet-organised-by-vishwa-hindu-parishad",
    featured: true, image: "/images/supreme-court.jpg",
    relatedActivitySlug: "retired-judges-meet-delhi-2024",
  },
  {
    id: 2, slug: "judges-vhp-waqf-indian-express",
    title: "Retired Judges, Former Bureaucrats Attend VHP Event on Waqf Amendment Bill",
    titleHi: "सेवानिवृत्त न्यायाधीश, पूर्व नौकरशाहों ने वक़्फ संशोधन विधेयक पर VHP कार्यक्रम में भाग लिया",
    category: "press",
    excerpt: "Retired judges and former bureaucrats attended a VHP event that discussed the Waqf Amendment Bill. The distinguished gathering included former Supreme Court and High Court judges who deliberated on legal protections for Hindu dharmic rights.",
    date: "2024-09-10", author: "Express News Service", source: "Indian Express",
    sourceUrl: "https://indianexpress.com/article/india/retired-judges-former-bureaucrats-attend-vhp-event-on-waqf-amendment-bill-9573458/",
    featured: true, image: "/images/india-people-art.jpg",
    relatedActivitySlug: "retired-judges-meet-delhi-2024",
  },
  {
    id: 3, slug: "judges-vhp-ndtv",
    title: "30 Retired Judges Attend VHP Meet, Discuss Waqf Amendment Bill",
    titleHi: "30 सेवानिवृत्त न्यायाधीशों ने VHP बैठक में भाग लिया, वक़्फ संशोधन विधेयक पर चर्चा",
    category: "press",
    excerpt: "In a significant gathering, 30 retired judges of the Supreme Court and High Courts attended a conference organized by the VHP Legal Cell in New Delhi to discuss Waqf Amendment Bill and religious conversion issues.",
    date: "2024-09-10", author: "NDTV News Desk", source: "NDTV",
    sourceUrl: "https://www.ndtv.com/india-news/30-retired-judges-attend-vhp-meet-discuss-waqf-amendment-bill-6559882",
    featured: false, image: "/images/supreme-court.jpg",
    relatedActivitySlug: "retired-judges-meet-delhi-2024",
  },
  {
    id: 4, slug: "hc-judge-vhp-event-ucc-wire",
    title: "Sitting Allahabad HC Judge Delivers Speech on UCC at VHP Event",
    titleHi: "इलाहाबाद HC के न्यायाधीश ने VHP कार्यक्रम में UCC पर भाषण दिया",
    category: "court-update",
    excerpt: "Justice Shekhar Kumar Yadav and Justice Dinesh Pathak participated in a VHP Legal Cell event at the Allahabad HC library hall. Dr. Abhishek Atrey was chief guest speaking on Waqf Amendment Bill. The event sparked a national debate.",
    date: "2024-12-08", author: "Omar Rashid", source: "The Wire",
    sourceUrl: "https://m.thewire.in/article/news/sitting-allahabad-high-court-judge-vhp-event-ucc",
    featured: true, image: "/images/golden-om.jpg",
    relatedActivitySlug: "prayagraj-legal-awareness-2024",
  },
  {
    id: 5, slug: "hc-judges-vhp-event-theprint",
    title: "Allahabad HC Judges Participate in VHP Event, Draw National Attention",
    titleHi: "इलाहाबाद HC के न्यायाधीशों ने VHP कार्यक्रम में भाग लिया, राष्ट्रीय ध्यान आकर्षित",
    category: "court-update",
    excerpt: "The event was held within the High Court premises, in the library hall of the Allahabad High Court. Dr. Abhishek Atrey, National Convenor of VHP Legal Cell, addressed the gathering on Waqf Amendment Act and religious conversion prevention.",
    date: "2024-12-08", author: "Apoorva Mandhani & Neelam Pandey", source: "ThePrint",
    sourceUrl: "https://theprint.in/india/allahabad-hc-judges-participate-in-vhp-event-draw-flak-for-gross-violation-of-secular-principles/2393492/",
    featured: false, image: "/images/rama-navami.jpg",
    relatedActivitySlug: "prayagraj-legal-awareness-2024",
  },
  {
    id: 6, slug: "justice-yadav-ucc-livelaw",
    title: "UCC Will Be A Reality Soon: Justice Shekhar Yadav at VHP Legal Cell Event",
    titleHi: "UCC जल्द ही वास्तविकता होगा: न्यायमूर्ति शेखर यादव, VHP विधि प्रकोष्ठ कार्यक्रम",
    category: "court-update",
    excerpt: "Justice Shekhar Kumar Yadav delivered a speech at VHP Legal Cell's event organized by Dr. Abhishek Atrey, discussing the constitutional necessity of the Uniform Civil Code and its implications for national harmony.",
    date: "2024-12-08", author: "Sparsh Upadhyay", source: "LiveLaw",
    sourceUrl: "https://www.livelaw.in/top-stories/allahabad-high-court-justice-shekhar-kumar-yadav-speech-triple-talaq-halala-uniform-civil-code-277679",
    featured: false, image: "/images/supreme-court.jpg",
    relatedActivitySlug: "prayagraj-legal-awareness-2024",
  },
  {
    id: 7, slug: "hc-judge-vhp-bar-bench",
    title: "Sitting Allahabad HC Judge Delivers Lecture on UCC at Vishva Hindu Parishad Event",
    titleHi: "इलाहाबाद HC न्यायाधीश ने विश्व हिंदू परिषद कार्यक्रम में UCC पर व्याख्यान दिया",
    category: "court-update",
    excerpt: "Bar and Bench reported that the event organized by VHP Legal Cell at the HC library hall featured discussions on the Waqf Board Act and Religious Conversion prevention, with Dr. Abhishek Atrey as chief guest.",
    date: "2024-12-08", author: "Ratna Singh", source: "Bar & Bench",
    sourceUrl: "https://www.barandbench.com/news/allahabad-high-court-judge-lecture-vishva-hindu-parishad-event",
    featured: false, image: "/images/golden-om.jpg",
    relatedActivitySlug: "prayagraj-legal-awareness-2024",
  },
  {
    id: 8, slug: "ayodhya-same-sex-resolution-opindia",
    title: "VHP Passes Resolution Against Same-Sex Marriage at Ayodhya National Meet",
    titleHi: "VHP ने अयोध्या राष्ट्रीय बैठक में समलैंगिक विवाह के विरुद्ध प्रस्ताव पारित किया",
    category: "press",
    excerpt: "VHP's Vidhi Prakoshtha (Legal Cell) unanimously passed a resolution opposing same-sex marriage recognition at a two-day national meet in Ayodhya. Over 500 advocates and retired judges from across India participated.",
    date: "2023-04-24", author: "OpIndia Staff", source: "OpIndia",
    sourceUrl: "https://www.opindia.com/2023/04/vhp-passes-resolution-against-same-sex-marriage/",
    featured: false, image: "/images/rama-navami.jpg",
    relatedActivitySlug: "ayodhya-national-meet-2023",
  },
  {
    id: 9, slug: "ayodhya-vhp-india-today",
    title: "VHP Opposes Supreme Court Hearing on Same-Sex Marriage",
    titleHi: "VHP ने समलैंगिक विवाह पर सुप्रीम कोर्ट की सुनवाई का विरोध किया",
    category: "press",
    excerpt: "India Today reported that VHP opposed the Supreme Court hearing petitions on same-sex marriage, calling it inappropriate haste. The resolution was passed at the Ayodhya national meet attended by 500+ advocates.",
    date: "2023-04-18", author: "India Today Web Desk", source: "India Today",
    sourceUrl: "https://www.indiatoday.in/law/story/same-sex-marriage-vhp-opposes-supreme-court-hearing-2360939-2023-04-18",
    featured: false, image: "/images/india-flag.jpg",
    relatedActivitySlug: "ayodhya-national-meet-2023",
  },
  {
    id: 10, slug: "kharge-legal-notice-tribune",
    title: "VHP Issues Legal Notice to Congress President Kharge for Defaming Bajrang Dal",
    titleHi: "VHP ने बजरंग दल की मानहानि के लिए कांग्रेस अध्यक्ष खड़गे को कानूनी नोटिस भेजा",
    category: "press",
    excerpt: "VHP Legal Cell sent a Rs 100 crore defamation notice to Congress President Mallikarjun Kharge for comparing Bajrang Dal with banned terror groups PFI and SIMI during Karnataka election campaign.",
    date: "2023-05-07", author: "PTI", source: "Tribune India",
    sourceUrl: "https://www.tribuneindia.com/news/nation/vhp-issues-legal-notice-to-congress-president-kharge-for-defaming-bajrang-dal-demands-rs-100-cr-compensation-505425",
    featured: false, image: "/images/india-flag.jpg",
  },
  {
    id: 11, slug: "judges-meet-scroll",
    title: "Ex-Judges Take Part in VHP Meet; Religious Conversions and Waqf Bill Among Topics",
    titleHi: "पूर्व न्यायाधीशों ने VHP बैठक में भाग लिया; धर्मांतरण और वक़्फ विधेयक चर्चा के विषय",
    category: "press",
    excerpt: "Scroll.in reported that ex-judges took part in the VHP Legal Cell's meet, with religious conversions and the Waqf Bill among the key topics of discussion at the Delhi gathering.",
    date: "2024-09-10", author: "Scroll Staff", source: "Scroll.in",
    sourceUrl: "https://scroll.in/latest/1073082/ex-judges-take-part-in-vhp-meet-religious-conversions-and-waqf-bill-among-topics-of-discussion",
    featured: false, image: "/images/india-people-art.jpg",
    relatedActivitySlug: "retired-judges-meet-delhi-2024",
  },
  {
    id: 12, slug: "mahakumbh-vhp-session-organiser",
    title: "Mahakumbh: VHP, Sants Bat for Temple Autonomy, Family Growth and Cultural Protection",
    titleHi: "महाकुम्भ: VHP, संत मंदिर स्वायत्तता, परिवार विकास और सांस्कृतिक सुरक्षा की वकालत",
    category: "vhp-update",
    excerpt: "VHP held a three-day meeting at Mahakumbh in Prayagraj. Representatives from 47 provinces across India participated discussing temple autonomy, Waqf Board powers, and demographic challenges.",
    date: "2025-01-30", author: "Organiser Correspondent", source: "Organiser",
    sourceUrl: "https://organiser.org/2025/01/30/275778/bharat/mahakumbh-vhp-sants-bat-for-temple-autonomy-family-growth-and-cultural-protection/",
    featured: false, image: "/images/temple-diyas.jpg",
    relatedActivitySlug: "mahakumbh-legal-session-2025",
  },
  {
    id: 13, slug: "alok-kumar-vhp-president",
    title: "Alok Kumar Elected VHP President, Bajrang Lal Bagra General Secretary",
    titleHi: "अलोक कुमार VHP अध्यक्ष निर्वाचित, बजरंग लाल बागड़ा महासचिव",
    category: "vhp-update",
    excerpt: "Senior advocate Alok Kumar was unanimously elected VHP president by approximately 400 office-bearers at Karsevakpuram in Ayodhya, succeeding Dr. R N Singh. Bajrang Lal Bagra was elected general secretary.",
    date: "2024-02-26", author: "PTI", source: "ThePrint",
    sourceUrl: "https://theprint.in/india/alok-kumar-elected-vhp-president-bajrang-lal-bagra-general-secretary/1979804/",
    featured: false, image: "/images/india-people-art.jpg",
  },
  {
    id: 14, slug: "kharge-notice-ndtv",
    title: "VHP Sends Legal Notice to Congress Chief Over Remarks on Bajrang Dal",
    titleHi: "VHP ने बजरंग दल पर टिप्पणियों को लेकर कांग्रेस प्रमुख को कानूनी नोटिस भेजा",
    category: "press",
    excerpt: "NDTV reported that VHP's Legal Cell demanded Rs 100 crore compensation from Congress President Kharge for comparing Bajrang Dal with banned organizations during the Karnataka election.",
    date: "2023-05-06", author: "NDTV News Desk", source: "NDTV",
    sourceUrl: "https://www.ndtv.com/india-news/vhp-sends-legal-notice-to-congress-chief-mallikarjun-kharge-over-remarks-on-bajrang-dal-3980574",
    featured: false, image: "/images/india-flag.jpg",
  },
];

/* ─── Judgments ─── */
export interface Judgment {
  id: number;
  slug: string;
  caseName: string;
  caseNameHi: string;
  court: string;
  date: string;
  category: "temple" | "cow" | "conversion" | "religious-freedom" | "historical" | "other";
  summary: string;
  pdfUrl?: string;
  keywords: string[];
  landmark: boolean;
}

export const JUDGMENTS: Judgment[] = [
  {
    id: 1, slug: "ayodhya-2019", caseName: "M Siddiq v. Mahant Suresh Das (Ayodhya)", caseNameHi: "एम. सिद्दीक बनाम महंत सुरेश दास (अयोध्या)",
    court: "Supreme Court of India", date: "2019-11-09", category: "temple",
    summary: "Unanimous 5-judge bench verdict granting the disputed site to Ram Lalla. The most significant temple case in Indian legal history.",
    keywords: ["Ayodhya", "Ram Mandir", "Title Suit"], landmark: true,
  },
  {
    id: 2, slug: "sabarimala-2018", caseName: "Indian Young Lawyers Association v. State of Kerala", caseNameHi: "इंडियन यंग लॉयर्स एसोसिएशन बनाम केरल राज्य",
    court: "Supreme Court of India", date: "2018-09-28", category: "religious-freedom",
    summary: "Judgment allowing women of all ages entry to Sabarimala temple. Referenced in subsequent review petitions.",
    keywords: ["Sabarimala", "Religious Freedom", "Article 25"], landmark: true,
  },
  {
    id: 3, slug: "cow-slaughter-mp-2020", caseName: "State of MP v. Mohammed Ismail", caseNameHi: "मध्य प्रदेश राज्य बनाम मोहम्मद इस्माइल",
    court: "Madhya Pradesh High Court", date: "2020-08-15", category: "cow",
    summary: "Upheld the constitutional validity of the MP Govansh Vadh Pratishedh (Sanshodhan) Adhiniyam, 2010.",
    keywords: ["Cow Protection", "MP High Court", "Constitutional Validity"], landmark: false,
  },
];

/* ─── Activities / Events ─── */
export interface ActivityData {
  id: number;
  slug: string;
  title: string;
  titleHi: string;
  type: "seminar" | "legal-clinic" | "shiksha-varg" | "rally" | "meeting" | "workshop" | "conference" | "outreach";
  status: "completed" | "upcoming" | "ongoing";
  date: string;
  endDate?: string;
  location: string;
  khetraId: string;
  description: string;
  attendees: number;
  organizer: string;
  image?: string;
  chiefGuest?: string;
  keyDignitaries?: string[];
  agenda?: string[];
  highlights?: string[];
  socialLinks?: { label: string; url: string }[];
  newsLinks?: { title: string; url: string; source: string; byline?: string; date?: string }[];
  outcome?: string;
}

export const ACTIVITIES: ActivityData[] = [
  /* ── Existing Events (Enhanced) ── */
  {
    id: 1, slug: "national-seminar-vigyan-bhawan-2026",
    title: "National Seminar at Vigyan Bhawan", titleHi: "विज्ञान भवन में राष्ट्रीय सेमिनार",
    type: "seminar", status: "completed", date: "2026-02-15", endDate: "2026-02-16",
    location: "Vigyan Bhawan, New Delhi", khetraId: "delhi",
    description: "Annual national seminar bringing together 250+ advocates to discuss legal strategy for upcoming cases across Supreme Court and High Courts.",
    attendees: 250, organizer: "National Legal Cell",
    image: "/images/india-people-art.jpg",
    chiefGuest: "Dr. Abhishek Atrey",
    keyDignitaries: ["Dr. Abhishek Atrey", "Senior Advocates from SC", "Khetra Convenors"],
    agenda: ["National case strategy review", "Regional activity reporting", "Temple case updates", "Anti-conversion law advocacy"],
    highlights: ["250+ advocates from across India", "Strategy for Gyanvapi and Mathura cases", "Annual coordination framework established"],
    outcome: "Annual strategy finalized for 2026. Regional targets set for all 12 Khetras.",
  },
  {
    id: 2, slug: "free-legal-clinic-varanasi",
    title: "Free Legal Clinic — Varanasi", titleHi: "मुफ्त कानूनी क्लिनिक — वाराणसी",
    type: "legal-clinic", status: "completed", date: "2026-02-05", endDate: "2026-02-07",
    location: "VHP Office, Varanasi", khetraId: "braj-khetra",
    description: "Three-day free legal consultation camp providing guidance on property rights, temple issues, and family law to 500+ citizens.",
    attendees: 500, organizer: "Braj Khetra",
    image: "/images/temple-diyas.jpg",
    chiefGuest: "Adv. Vikram Singh, Braj Khetra Convenor",
    agenda: ["Property rights consultation", "Temple dispute guidance", "Family law advice", "RTI application assistance"],
    highlights: ["500+ citizens received free legal consultation", "Focus on temple property rights", "Women's legal rights workshops"],
    outcome: "500+ citizens received free legal guidance. 50+ cases identified for further follow-up.",
  },
  {
    id: 3, slug: "shiksha-varg-jaipur-2026",
    title: "Prant Shiksha Varg — Jaipur", titleHi: "प्रांत शिक्षा वर्ग — जयपुर",
    type: "shiksha-varg", status: "completed", date: "2026-02-20", endDate: "2026-02-22",
    location: "Rajasthan University, Jaipur", khetraId: "rajasthan",
    description: "Three-day legal training program for 200+ advocates covering PIL drafting, case research, and court procedures.",
    attendees: 200, organizer: "Rajasthan Khetra",
    image: "/images/navratri-celebration.jpg",
    chiefGuest: "Adv. Kavita Mishra, Rajasthan Khetra Convenor",
    agenda: ["PIL drafting workshop", "Supreme Court procedure training", "Case research methodology", "Court documentation standards"],
    highlights: ["200+ advocates trained", "Hands-on PIL drafting workshop", "Expert sessions on SC procedures"],
    outcome: "200+ advocates trained in PIL drafting and court procedures.",
  },
  {
    id: 4, slug: "cow-protection-rally-bhopal",
    title: "Cow Protection Awareness Rally — Bhopal", titleHi: "गो संरक्षण जागरूकता रैली — भोपाल",
    type: "rally", status: "upcoming", date: "2026-03-15",
    location: "Lal Parade Ground, Bhopal", khetraId: "madhya-bharat",
    description: "Peaceful awareness rally demanding stricter enforcement of cow protection laws in Madhya Pradesh.",
    attendees: 0, organizer: "Madhya Bharat Khetra",
    image: "/images/india-flag.jpg",
    agenda: ["Peaceful awareness march", "Public addresses on cow protection laws", "Signature campaign for stricter enforcement"],
    highlights: ["Expected participation from across Madhya Pradesh", "Support from local VHP and Bajrang Dal units"],
  },
  {
    id: 5, slug: "temple-rights-workshop-bengaluru",
    title: "Temple Rights Workshop — Bengaluru", titleHi: "मंदिर अधिकार कार्यशाला — बेंगलुरु",
    type: "workshop", status: "upcoming", date: "2026-03-22", endDate: "2026-03-23",
    location: "ISKCON Auditorium, Bengaluru", khetraId: "dakshin",
    description: "Workshop on temple administration laws, government control of Hindu temples, and legal remedies available.",
    attendees: 0, organizer: "Dakshin Khetra",
    image: "/images/golden-om.jpg",
    agenda: ["Temple administration legal framework", "Government control of Hindu temples", "Legal remedies for temple committees", "Case studies from Karnataka"],
    highlights: ["Expert panels on temple administration reform", "Discussion on Karnataka temple law"],
  },
  {
    id: 6, slug: "khetra-meeting-ahmedabad",
    title: "Khetra Coordination Meeting — Ahmedabad", titleHi: "क्षेत्र समन्वय बैठक — अहमदाबाद",
    type: "meeting", status: "upcoming", date: "2026-04-05",
    location: "Gujarat Vidyapith, Ahmedabad", khetraId: "paschim",
    description: "Quarterly coordination meeting of Paschim Khetra to review ongoing cases and plan next quarter activities.",
    attendees: 0, organizer: "Paschim Khetra",
    image: "/images/rama-navami.jpg",
    agenda: ["Quarterly case review", "Budget allocation for legal activities", "New advocate onboarding", "Regional event planning"],
  },

  /* ── New Real Events ── */
  {
    id: 7, slug: "ayodhya-national-meet-2023",
    title: "National Advocates Meet — Ayodhya", titleHi: "राष्ट्रीय अधिवक्ता सम्मेलन — अयोध्या",
    type: "conference", status: "completed", date: "2023-04-17", endDate: "2023-04-18",
    location: "Ayodhya, Uttar Pradesh", khetraId: "braj-khetra",
    description: "Historic national meet of 500+ VHP Legal Cell advocates in Ayodhya. The conference passed a landmark resolution opposing same-sex marriage in the Supreme Court of India, reaffirming the organization's commitment to traditional Hindu family values and constitutional principles.",
    attendees: 500, organizer: "National Legal Cell",
    image: "/images/rama-navami.jpg",
    chiefGuest: "Dr. Abhishek Atrey, National Convenor",
    keyDignitaries: ["Dr. Abhishek Atrey", "Adv. Vishnu Shankar Jain", "Adv. Ashwini Kumar Upadhyay"],
    agenda: [
      "National strategy for upcoming Supreme Court cases",
      "Resolution on same-sex marriage",
      "Temple liberation movement updates",
      "Regional coordination and strengthening",
      "Waqf Amendment advocacy planning",
    ],
    highlights: [
      "500+ advocates from across India gathered",
      "Landmark resolution passed opposing same-sex marriage",
      "Strategy formulated for Gyanvapi and Mathura cases",
      "Coordination between 12 Khetras strengthened",
    ],
    socialLinks: [
      { label: "VHP Digital (X)", url: "https://x.com/VHPDigital/status/1650329745954066437" },
    ],
    newsLinks: [
      { title: "VHP passes resolution against same-sex marriage", url: "https://www.opindia.com/2023/04/vhp-passes-resolution-against-same-sex-marriage/", source: "OpIndia", byline: "OpIndia Staff", date: "2023-04-24" },
      { title: "VHP opposes SC hearing on same-sex marriage", url: "https://www.indiatoday.in/law/story/same-sex-marriage-vhp-opposes-supreme-court-hearing-2360939-2023-04-18", source: "India Today", byline: "India Today Web Desk", date: "2023-04-18" },
      { title: "VHP Legal Cell Passes Resolution Against Same-sex Marriage", url: "https://www.outlookindia.com/national/-same-sex-marriage-sc-s-haste-not-appropriate-could-lead-to-new-disputes-says-vhp-news-280830", source: "Outlook India", byline: "Outlook News Desk", date: "2023-04-24" },
      { title: "Same-sex marriage: VHP opposes", url: "https://www.hindustantimes.com/india-news/same-sex-marriage-vhp-opposes-101681819234174.html", source: "Hindustan Times", date: "2023-04-18" },
    ],
    outcome: "Resolution filed as intervention in Supreme Court opposing same-sex marriage. National coordination framework established for temple cases.",
  },
  {
    id: 8, slug: "retired-judges-meet-delhi-2024",
    title: "Distinguished Judges Conference — Delhi", titleHi: "विशिष्ट न्यायाधीश सम्मेलन — दिल्ली",
    type: "conference", status: "completed", date: "2024-09-15",
    location: "New Delhi", khetraId: "delhi",
    description: "A landmark conference attended by 30 retired Supreme Court and High Court judges, senior bureaucrats, and legal experts. The meet discussed critical issues including the Waqf Amendment Bill, religious conversions, and constitutional protections for Hindu dharmic rights.",
    attendees: 150, organizer: "National Legal Cell",
    image: "/images/supreme-court.jpg",
    chiefGuest: "Dr. Abhishek Atrey, National Convenor",
    keyDignitaries: [
      "30 Retired Supreme Court & High Court Judges",
      "Former Senior Bureaucrats",
      "Dr. Abhishek Atrey",
      "Senior VHP Leadership",
    ],
    agenda: [
      "Waqf Amendment Bill discussion",
      "Religious conversion prevention strategies",
      "Constitutional protections for Hindu rights",
      "Judicial perspective on temple liberation",
      "National security and legal framework",
    ],
    highlights: [
      "30 retired SC/HC judges attended",
      "Cross-party legal consensus on Waqf Amendment",
      "Framework established for anti-conversion advocacy",
      "Judicial wisdom applied to VHP Legal Cell strategy",
    ],
    newsLinks: [
      { title: "30 Former Judges of SC, HCs Attend Meet Organised by VHP", url: "https://m.thewire.in/article/communalism/30-former-judges-of-supreme-court-high-courts-attend-meet-organised-by-vishwa-hindu-parishad", source: "The Wire", byline: "The Wire Staff", date: "2024-09-10" },
      { title: "Retired Judges, Former Bureaucrats Attend VHP Event on Waqf Amendment Bill", url: "https://indianexpress.com/article/india/retired-judges-former-bureaucrats-attend-vhp-event-on-waqf-amendment-bill-9573458/", source: "Indian Express", byline: "Express News Service", date: "2024-09-10" },
      { title: "30 Retired Judges Attend VHP Meet, Discuss Waqf Amendment Bill", url: "https://www.ndtv.com/india-news/30-retired-judges-attend-vhp-meet-discuss-waqf-amendment-bill-6559882", source: "NDTV", byline: "NDTV News Desk", date: "2024-09-10" },
      { title: "Ex-Judges Take Part in VHP Meet; Religious Conversions and Waqf Bill Among Topics", url: "https://scroll.in/latest/1073082/ex-judges-take-part-in-vhp-meet-religious-conversions-and-waqf-bill-among-topics-of-discussion", source: "Scroll.in", byline: "Scroll Staff", date: "2024-09-10" },
      { title: "Ex-Judges VHP Meet Was Closed-Door Event: VHP President", url: "https://www.barandbench.com/news/mistake-on-part-of-law-ministry-to-tweet-vhp-judges-meet-it-was-a-closed-door-event-vhp-president", source: "Bar & Bench", byline: "Ratna Singh", date: "2024-09-16" },
    ],
    outcome: "Broad consensus among retired judges supporting Waqf Amendment. Strategy paper prepared for legal advocacy across courts.",
  },
  {
    id: 9, slug: "prayagraj-legal-awareness-2024",
    title: "Legal Awareness Session — Prayagraj", titleHi: "विधिक जागरूकता सत्र — प्रयागराज",
    type: "seminar", status: "completed", date: "2024-12-15",
    location: "Allahabad High Court Library Hall, Prayagraj", khetraId: "braj-khetra",
    description: "A high-profile legal awareness session held at the Allahabad High Court library hall. The event featured discussions on Uniform Civil Code, Waqf Amendment Act, and religious conversion prevention. The session gained national attention and sparked an important national debate on the role of judiciary and legal advocacy.",
    attendees: 200, organizer: "VHP Legal Cell, Braj Khetra",
    image: "/images/golden-om.jpg",
    chiefGuest: "Justice Shekhar Kumar Yadav, Allahabad HC",
    keyDignitaries: [
      "Justice Shekhar Kumar Yadav (Allahabad HC)",
      "Dr. Abhishek Atrey",
      "Multiple Allahabad HC Advocates",
    ],
    agenda: [
      "Uniform Civil Code — need and implementation",
      "Waqf Amendment Act analysis",
      "Religious conversion — causes and prevention",
      "Legal remedies for Hindu dharmic rights",
    ],
    highlights: [
      "Held at the Allahabad High Court library hall",
      "Sitting HC judge addressed the gathering",
      "Sparked national debate on judicial participation in legal awareness",
      "Comprehensive discussion on UCC implementation",
    ],
    newsLinks: [
      { title: "Sitting Allahabad HC Judge Delivers Speech on UCC at VHP Event", url: "https://m.thewire.in/article/news/sitting-allahabad-high-court-judge-vhp-event-ucc", source: "The Wire", byline: "Omar Rashid", date: "2024-12-08" },
      { title: "Allahabad HC Judges Participate in VHP Event", url: "https://theprint.in/india/allahabad-hc-judges-participate-in-vhp-event-draw-flak-for-gross-violation-of-secular-principles/2393492/", source: "ThePrint", byline: "Apoorva Mandhani & Neelam Pandey", date: "2024-12-08" },
      { title: "Sitting Allahabad HC Judge Delivers Lecture at VHP Event", url: "https://www.barandbench.com/news/allahabad-high-court-judge-lecture-vishva-hindu-parishad-event", source: "Bar & Bench", byline: "Ratna Singh", date: "2024-12-08" },
      { title: "UCC Will Be A Reality Soon: Justice Shekhar Yadav at VHP Event", url: "https://www.livelaw.in/top-stories/allahabad-high-court-justice-shekhar-kumar-yadav-speech-triple-talaq-halala-uniform-civil-code-277679", source: "LiveLaw", byline: "Sparsh Upadhyay", date: "2024-12-08" },
      { title: "Allahabad HC Judge VHP Event: NDTV Coverage", url: "https://www.ndtv.com/india-news/allahabad-high-court-judge-vhp-event-controversy-7183521", source: "NDTV", date: "2024-12-09" },
      { title: "CJI Takes Cognizance of HC Judge Speech at VHP Event", url: "https://www.livelaw.in/supreme-court/cji-sanjiv-khanna-cognizance-allahabad-hc-judge-vhp-event-278589", source: "LiveLaw", date: "2024-12-10" },
    ],
    outcome: "Event raised national awareness about UCC and Waqf Amendment. Supreme Court took cognizance of the growing debate on legal advocacy.",
  },
  {
    id: 10, slug: "mahakumbh-legal-session-2025",
    title: "VHP Legal Cell Session — Mahakumbh 2025", titleHi: "विहिप विधि प्रकोष्ठ सत्र — महाकुम्भ 2025",
    type: "conference", status: "completed", date: "2025-01-20", endDate: "2025-02-10",
    location: "Mahakumbh Mela, Prayagraj", khetraId: "braj-khetra",
    description: "VHP Legal Cell held special sessions during the historic Mahakumbh 2025 in Prayagraj. Advocates from across India participated in legal awareness camps for pilgrims, discussed pending temple cases, and coordinated strategy for upcoming Supreme Court hearings. The event was part of VHP's larger presence at the Mahakumbh.",
    attendees: 1000, organizer: "National Legal Cell",
    image: "/images/temple-diyas.jpg",
    chiefGuest: "Dr. Abhishek Atrey, National Convenor",
    keyDignitaries: [
      "Dr. Abhishek Atrey",
      "National VHP Leadership",
      "Advocates from 12 Khetras",
      "Legal experts and scholars",
    ],
    agenda: [
      "Legal awareness for Mahakumbh pilgrims",
      "Temple case strategy — Gyanvapi, Mathura, others",
      "Regional coordination meetings",
      "Free legal consultation camps",
      "Youth advocate recruitment",
    ],
    highlights: [
      "Held during the historic Mahakumbh 2025",
      "1000+ participants over multi-week duration",
      "Free legal consultations for pilgrims",
      "Strategy for 2025-26 court cases formulated",
    ],
    socialLinks: [
      { label: "VHP Digital (X)", url: "https://x.com/VHPDigital/status/1888632020592623789" },
    ],
    outcome: "Comprehensive 2025-26 legal strategy finalized. Free legal aid provided to 500+ pilgrims. Youth advocate network expanded across India.",
  },
];
