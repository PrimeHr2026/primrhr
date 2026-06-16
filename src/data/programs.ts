export type FlagshipProgram = {
  slug: string;
  name: string;
  acronym?: string;
  duration: string;
  durationISO?: string;
  format: string;
  tagline: string;
  overview: string;
  modules: { title: string; points: string[] }[];
  audience: string[];
  methodology: string[];
  outcomes: string[];
};

export const flagshipPrograms: FlagshipProgram[] = [
  {
    slug: "chrp",
    name: "Certified Human Resource Professional",
    acronym: "CHRP",
    duration: "5-Day Certification",
    durationISO: "P5D",
    format: "In-House / Public / Online",
    tagline: "Master all six core areas of HR — from recruitment to compliance.",
    overview:
      "A complete, hands-on HR certification covering the full employee lifecycle and Malaysian labour law. Built for executives and managers stepping into HR leadership, delivered with real case studies and ready-to-use templates. HRD Corp claimable.",
    modules: [
      {
        title: "HR Leadership & Management",
        points: [
          "Leadership vs management, IQ/EQ/VQ/CQ",
          "HR in the 21st century & Industrial Revolution 4.0",
          "Management best practices & ISO standards",
        ],
      },
      {
        title: "Recruitment & Selection",
        points: [
          "Recruitment SOP, process & cost-per-hire",
          "Interview methodology & background checks",
          "Onboarding and exit interview process",
        ],
      },
      {
        title: "Training & Development",
        points: [
          "Training Needs Analysis & training calendar",
          "5 training evaluation methods",
          "HRD Corp claim & approval process",
        ],
      },
      {
        title: "Compensation & Benefits",
        points: [
          "Job structure, KPI & SMART goals",
          "Performance management & appraisals",
          "EPF / SOCSO / income tax & payroll process",
        ],
      },
      {
        title: "Employment Act 1955 & IR Act 1967",
        points: [
          "Contract of service, termination & misconduct",
          "Domestic inquiry & principles of natural justice",
          "Sexual harassment & constructive dismissal",
        ],
      },
      {
        title: "Payroll Management",
        points: [
          "Wages, OT and mandatory benefits",
          "Leave, notice period & termination calculations",
          "Payroll audit, reporting & reconciliation",
        ],
      },
    ],
    audience: [
      "Managers, new managers & senior executives",
      "HR executives, senior executives & assistant managers",
      "Anyone moving into a managerial or HR role",
    ],
    methodology: [
      "Interactive presentation",
      "Real case-study sharing",
      "Group review & reflections",
      "Best-practice templates",
      "Assignment for each module",
    ],
    outcomes: [
      "A holistic command of all 6 HR areas",
      "Confidence applying Malaysian Labour Law & IR",
      "A CHRP certificate signed by the trainer & provider",
    ],
  },
  {
    slug: "certified-professional-manager",
    name: "Certified Professional Manager",
    acronym: "CPM",
    duration: "5-Day Certification",
    durationISO: "P5D",
    format: "In-House / Public / Online",
    tagline: "Lead beyond authority — communication, EQ and decision-making mastery.",
    overview:
      "A management certification for current and aspiring leaders, focused on leadership beyond authority, collaborative intelligence, decision-making and compliance. HRD Corp claimable.",
    modules: [
      { title: "Management & Leadership", points: ["Beyond leadership", "High-performance culture"] },
      { title: "Communication & Presentation", points: ["Mastering communication", "Presentation skills"] },
      { title: "Emotional & Collaborative Intelligence", points: ["EQ at work", "Collaboration"] },
      { title: "Decision Making", points: ["Mastering decision-making skills"] },
      { title: "Internal Audit, KPI & Compliance", points: ["KPI strategy", "Compliance strategy"] },
    ],
    audience: ["Managers & new managers", "Senior executives", "Team leaders & supervisors"],
    methodology: ["Interactive presentation", "Case studies", "Group exercises", "Assignments"],
    outcomes: [
      "Lead teams with confidence and influence",
      "Sharper decision-making and communication",
      "A Certified Professional Manager credential",
    ],
  },
  {
    slug: "hr-leadership-diploma",
    name: "Professional Diploma in Human Resource & Leadership Management",
    acronym: "Diploma",
    duration: "1-Year Program",
    durationISO: "P1Y",
    format: "Online · monthly modules · mock exam per subject",
    tagline: "A full diploma in HR and business leadership — 18 subjects over one year.",
    overview:
      "A one-year professional diploma covering HR and business management end-to-end — from labour law and industrial relations to payroll, talent and finance management — delivered online with assignments, case studies and mock exams.",
    modules: [
      {
        title: "Foundations & Law",
        points: [
          "Fundamentals of Business & Leadership Management",
          "Labour Law 1955 & Industrial Relations Act 1967",
          "Union Management",
        ],
      },
      {
        title: "Core HR",
        points: [
          "Recruitment & Selection, Interviewing & Resume Writing",
          "Training & Development, Talent Management",
          "Compensation & Payroll Management",
        ],
      },
      {
        title: "Management & Skills",
        points: [
          "KPI, Code of Conduct & Finance Management",
          "Communication, Problem Solving & Presentation Skills",
          "Conflict Management & Sexual Harassment",
        ],
      },
    ],
    audience: ["HR professionals advancing their career", "Executives moving into HR leadership", "Graduates building HR credentials"],
    methodology: ["Online delivery", "Assignment & case-study presentation", "Mock exam per subject"],
    outcomes: [
      "A recognized professional diploma",
      "Deep command of HR, law and business management",
      "Career progression into HR leadership",
    ],
  },
];

export const getFlagship = (slug: string) =>
  flagshipPrograms.find((p) => p.slug === slug);

/* ---------- Catalog (filterable) ---------- */

export type CatalogCategory = {
  id: "leadership" | "hr-compliance" | "safety-ops" | "soft-skills";
  label: string;
  programmes: { title: string; description: string }[];
};

export const catalog: CatalogCategory[] = [
  {
    id: "leadership",
    label: "Leadership & Management",
    programmes: [
      { title: "Train the Trainer (HRDF Certified)", description: "Become an HRD Corp accredited trainer with proven delivery skills." },
      { title: "Executive Development Program", description: "Strategic thinking, leadership and management for executives." },
      { title: "Supervisor Development Program", description: "Equip front-line supervisors to lead teams effectively." },
      { title: "Emotional Intelligence & Leadership", description: "Lead with EQ — self-awareness, empathy and influence." },
      { title: "Team Building", description: "Build trust, collaboration and a high-performance culture." },
      { title: "Decision Making & Problem Solving", description: "Structured tools for better, faster decisions." },
    ],
  },
  {
    id: "hr-compliance",
    label: "HR & Compliance",
    programmes: [
      { title: "Human Resource Management", description: "End-to-end HR practice for managers and HR teams." },
      { title: "Recruitment & Selection", description: "Hire the right people with a structured, fair process." },
      { title: "Payroll Management", description: "Wages, OT, statutory deductions and payroll reporting." },
      { title: "Compensation & Benefits", description: "Pay structures, KPI and performance management." },
      { title: "Employment Act 1955 & IR Act 1967", description: "Stay compliant with Malaysian labour & industrial law." },
      { title: "Mastering Domestic Inquiry", description: "Run a fair, defensible domestic inquiry and panel." },
      { title: "Writing Employee Handbook", description: "Build a clear, compliant company handbook." },
      { title: "KPI Management", description: "Set, cascade and manage meaningful KPIs." },
    ],
  },
  {
    id: "safety-ops",
    label: "Safety & Operations",
    programmes: [
      { title: "Safety Management", description: "Workplace safety, hazard identification and compliance." },
      { title: "ISO 9001 / 14001", description: "Quality and environmental management systems." },
      { title: "Warehouse Management", description: "Efficient, compliant warehouse and inventory operations." },
      { title: "5S Management", description: "Workplace organization for productivity and quality." },
      { title: "Driver & Defensive Safety", description: "Defensive driving and driver safety training." },
    ],
  },
  {
    id: "soft-skills",
    label: "Communication & Soft Skills",
    programmes: [
      { title: "Customer Service Excellence", description: "Deliver service that builds loyalty and trust." },
      { title: "Mastering Communication & Presentation", description: "Confident, persuasive communication and presenting." },
      { title: "Resume Writing & Interview Skills", description: "Stand out in applications and interviews." },
      { title: "Conflict Management", description: "Resolve workplace conflict constructively." },
      { title: "Employer Expectations on Gen Z", description: "Bridge the generational gap in the workplace." },
    ],
  },
];
