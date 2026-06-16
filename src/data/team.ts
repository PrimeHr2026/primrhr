export type TeamMember = {
  name: string;
  role: string;
  specialty: string;
};

export const masterTrainer = {
  name: "Ram.G",
  fullName: "Murugan Raman",
  role: "Managing Director & Master Trainer",
  experience: "20+ years",
  intro:
    "Ram.G is an HRD Corp accredited master trainer with over two decades of experience in HR, leadership and industrial relations across blue-chip and multinational organizations.",
  credentials: [
    "Certified Human Resource Practitioner (USM Malaysia)",
    "Master of Business Administration (HR)",
    "Bachelor in Business Administration (Hons)",
    "Certified DISC Trainer & Facilitator",
    "Certified NLP Practitioner",
    "Certified Train the Trainer by HRDF (TTT — HRD Corp)",
    "Certified Investors in People (IIP, UK)",
    "Harrison Assessment Certified",
    "Certified ISO 9001 / 14001 / 18001",
    "Qualified Trainer — Kirkpatrick Model Evaluation",
    "Leadership trainer on IQ, EQ and CQ",
  ],
  clients: [
    "JVC", "Carrefour", "Giant", "Guardian", "Cold Storage", "Bafco Asia", "Toll",
    "Perodua", "GDX", "UPM", "UKM", "MSU",
  ],
};

export const team: TeamMember[] = [
  { name: "Ram.G", role: "Managing Director", specialty: "Master Trainer · HR & Leadership" },
  { name: "Suja", role: "Business Development Director", specialty: "Partnerships & Growth" },
  { name: "Sally", role: "Customer Service", specialty: "Customer Service & Communication Skills" },
  { name: "Evelyn / Dr. Nitya", role: "Safety & ISO Lead", specialty: "Safety · ISO 9001/14001/45001 · CPR" },
  { name: "Natasha", role: "Compliance", specialty: "HRD Corp Records & Compliance" },
  { name: "Rahul", role: "Technology", specialty: "AI & Technology · MS Excel · Cyber Security" },
  { name: "Vicknes", role: "Safety Trainer", specialty: "Driver Safety & Defensive Training" },
  { name: "Sam", role: "Operations Trainer", specialty: "Warehouse Management & Compliance" },
  { name: "Thileg", role: "Sales Coach", specialty: "Sales & Project Management" },
  { name: "Vasu", role: "Leadership Trainer", specialty: "Emotional Intelligence · Leadership · Team Building" },
];

/** Organization hierarchy (from the official org chart). */
export const orgChart: { tier: string; members: TeamMember[] }[] = [
  {
    tier: "Leadership",
    members: [{ name: "Ram.G", role: "Managing Director & Master Trainer", specialty: "HR · Leadership · Industrial Relations" }],
  },
  {
    tier: "Business Development",
    members: [{ name: "Suja", role: "Business Development Director", specialty: "Partnerships & Client Growth" }],
  },
  {
    tier: "Function Leads",
    members: [
      { name: "Sally", role: "Customer Service", specialty: "Customer Service & Communication Skills" },
      { name: "Evelyn / Dr. Nitya", role: "Safety & ISO", specialty: "Safety · ISO 9001/14001/45001 · CPR" },
      { name: "Natasha", role: "Compliance", specialty: "HRD Corp Records & Compliance" },
      { name: "Rahul", role: "Technology", specialty: "AI & Technology · MS Excel · Cyber Security" },
    ],
  },
  {
    tier: "Professional & Certified HRD Corp Trainers",
    members: [
      { name: "Vicknes", role: "Safety Trainer", specialty: "Driver Safety & Defensive Training" },
      { name: "Sam", role: "Operations Trainer", specialty: "Warehouse Management & Compliance" },
      { name: "Thileg", role: "Sales Coach", specialty: "Sales & Project Management" },
      { name: "Vasu", role: "Leadership Trainer", specialty: "EQ · Leadership · Team Building" },
    ],
  },
];
