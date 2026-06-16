import {
  ClipboardList, Search, PencilRuler, FileCheck2, FolderCheck, Presentation, BarChart3, Award,
  Factory, Truck, HardHat, Building2, ShieldCheck, FlaskConical, UtensilsCrossed, Zap,
  type LucideIcon,
} from "lucide-react";

/* ---------- Stats (count-up) ---------- */
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 20, suffix: "+", label: "Years of training experience" },
  { value: 200, suffix: "+", label: "Organizations trained" },
  { value: 30, suffix: "+", label: "HRD Corp programs" },
  { value: 100, suffix: "%", label: "HRD Corp claimable" },
];

/* ---------- Work process (8 steps) ---------- */
export const workProcess: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: ClipboardList, title: "Client Inquiry", description: "You reach out with a training or consultancy need." },
  { icon: Search, title: "Needs Assessment", description: "We consult and assess your organizational requirements." },
  { icon: PencilRuler, title: "Program Design", description: "We design and customize the program to your goals." },
  { icon: FileCheck2, title: "Proposal & Approval", description: "We submit a clear proposal for your approval." },
  { icon: FolderCheck, title: "HRD Corp Documentation", description: "We handle the HRD Corp grant documentation for you." },
  { icon: Presentation, title: "Training Delivery", description: "Accredited trainers deliver an engaging experience." },
  { icon: BarChart3, title: "Assessment & Evaluation", description: "We measure learning outcomes and effectiveness." },
  { icon: Award, title: "Reporting & Certification", description: "You receive reporting and participant certification." },
];

/* ---------- Why choose us ---------- */
export const whyChooseUs: { title: string; description: string }[] = [
  { title: "HRD Corp Accredited Trainers", description: "Every program is delivered by accredited professionals, ensuring quality and claimable status." },
  { title: "20+ Years of Expertise", description: "Led by master trainer Ram.G, with deep experience across MNCs and blue-chip organizations." },
  { title: "Customized for Every Organization", description: "We tailor content to your industry, people and goals — never off-the-shelf." },
  { title: "Practical & Result-Oriented", description: "Real case studies, workplace application and measurable outcomes." },
  { title: "End-to-End HRD Corp Support", description: "We manage planning, documentation and claims so you can focus on your people." },
  { title: "Commitment to Quality", description: "A relentless focus on client satisfaction and workforce development impact." },
];

/* ---------- Clients (logos / names for marquee) ---------- */
export const clients: string[] = [
  "Perodua", "Toll Malaysia", "GDX", "Carrefour", "Giant", "Guardian",
  "Cold Storage", "Bafco Asia", "JVC", "UPM", "UKM", "MSU",
];

/* ---------- Popular programs (home) ---------- */
export const popularPrograms: { title: string; tag: string }[] = [
  { title: "Human Resource Management", tag: "HR" },
  { title: "Recruitment & Selection", tag: "HR" },
  { title: "Training & Talent Management", tag: "Development" },
  { title: "Payroll Management", tag: "Compliance" },
  { title: "Compensation & Benefits", tag: "HR" },
  { title: "KPI Management", tag: "Performance" },
  { title: "Safety Management", tag: "Safety" },
  { title: "Certified HR Professional (CHRP)", tag: "Certification" },
];

/* ---------- Vision & mission ---------- */
export const vision =
  "To become a leading training and consultancy provider that empowers organizations through knowledge, innovation, and continuous development.";

export const mission = [
  "Deliver impactful and practical learning solutions.",
  "Enhance organizational performance through strategic consultancy.",
  "Develop competent and future-ready talents.",
  "Create sustainable value for clients through continuous improvement.",
];

/* ---------- Industries we serve ---------- */
export const industries: { icon: LucideIcon; label: string }[] = [
  { icon: Factory, label: "Manufacturing" },
  { icon: Truck, label: "Logistics & Warehousing" },
  { icon: HardHat, label: "Construction" },
  { icon: Building2, label: "Corporate & HR" },
  { icon: ShieldCheck, label: "Security & Compliance" },
  { icon: FlaskConical, label: "Oil, Gas & Chemical" },
  { icon: UtensilsCrossed, label: "Hospitality & Retail" },
  { icon: Zap, label: "Energy & Utilities" },
];

/* ---------- Featured programmes (home grid, MEDSS-style) ---------- */
export const featuredPrograms: { title: string; tag: string; desc: string; href: string }[] = [
  { title: "Certified Human Resource Professional (CHRP)", tag: "Certification", desc: "Master all six core areas of HR in our flagship 5-day certification.", href: "/programs/chrp" },
  { title: "Employment Act 1955 & IR Act 1967", tag: "Compliance", desc: "Stay compliant with Malaysian labour and industrial relations law.", href: "/programs" },
  { title: "Mastering Domestic Inquiry", tag: "Compliance", desc: "Run a fair, defensible domestic inquiry and panel management process.", href: "/programs" },
  { title: "Leadership & Management Development", tag: "Leadership", desc: "Develop leaders who perform — beyond authority, with EQ and influence.", href: "/programs" },
  { title: "Payroll & Compensation Management", tag: "HR", desc: "Wages, OT, statutory deductions, KPI and performance management.", href: "/programs" },
  { title: "Safety Management", tag: "Safety", desc: "Workplace safety, hazard identification and compliance training.", href: "/programs" },
];
