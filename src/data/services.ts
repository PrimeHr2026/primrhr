import { Briefcase, GraduationCap, Layers, BadgeCheck, type LucideIcon } from "lucide-react";

export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  tagline: string;
  overview: string;
  items: string[];
  /** richer detail used on the category page */
  outcomes: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "consultancy",
    title: "Consultancy Services",
    shortTitle: "Consultancy",
    icon: Briefcase,
    tagline: "Identify challenges, implement improvements, achieve operational excellence.",
    overview:
      "Our consultancy services help organizations diagnose people and process challenges, then implement practical improvements that lift operational effectiveness and long-term performance.",
    items: [
      "Human Resource Advisory",
      "Organizational Development",
      "Performance Improvement Strategies",
      "Talent Management Framework",
      "HR Policies & Procedures",
      "Succession Planning",
      "Employee Relations",
      "Strategic Workforce Planning",
      "Learning & Development Strategy",
    ],
    outcomes: [
      "Clear, compliant HR policies and procedures",
      "A talent and succession framework aligned to business goals",
      "Stronger employee relations and workforce planning",
    ],
  },
  {
    slug: "training-development",
    title: "Training & Development",
    shortTitle: "Training",
    icon: GraduationCap,
    tagline: "Improve competencies, leadership effectiveness and workplace productivity.",
    overview:
      "Comprehensive learning solutions — delivered by HRD Corp accredited trainers — designed to raise employee competency, leadership effectiveness and day-to-day productivity.",
    items: [
      "Leadership & Management Development",
      "Communication & Interpersonal Skills",
      "Customer Service Excellence",
      "Team Building Programs",
      "Performance Management",
      "Workplace Compliance & Governance",
      "Employee Engagement & Motivation",
      "Business & Professional Skills",
      "Customized In-House Training Programs",
    ],
    outcomes: [
      "Practical, workplace-ready skills with measurable outcomes",
      "Interactive, adult-learning delivery and real case studies",
      "Programs tailored to your organization's needs",
    ],
  },
  {
    slug: "development-solutions",
    title: "Development Solutions",
    shortTitle: "Development",
    icon: Layers,
    tagline: "Build strong foundations for long-term organizational growth.",
    overview:
      "Structured development initiatives that help organizations build the capabilities, culture and roadmaps needed for sustainable, long-term growth.",
    items: [
      "Competency Framework Development",
      "Leadership Development Programs",
      "Training Needs Analysis (TNA)",
      "Organizational Capability Assessment",
      "Corporate Culture Enhancement",
      "Change Management Programs",
      "Employee Development Roadmaps",
    ],
    outcomes: [
      "A competency framework mapped to roles and growth",
      "Evidence-based training needs analysis",
      "Change and culture programs that stick",
    ],
  },
  {
    slug: "hrd-corp-claimable",
    title: "HRD Corp Claimable Training",
    shortTitle: "HRD Corp",
    icon: BadgeCheck,
    tagline: "Maximize workforce development through the HRD Corp levy scheme.",
    overview:
      "We support employers under the HRD Corp levy scheme end-to-end — planning, implementation, documentation and delivery — so you can develop your people while we manage the learning experience.",
    items: [
      "Structured and practical training programs",
      "Professional delivery by accredited trainers",
      "Customized solutions based on organizational needs",
      "Comprehensive training materials and resources",
      "Interactive and engaging learning methodologies",
      "Post-training evaluation and reporting",
      "Support on training documentation and administration",
      "Measurable learning outcomes and workforce development impact",
    ],
    outcomes: [
      "Smooth HRD Corp grant application and approval support",
      "Full training documentation handled for you",
      "Claimable, accredited programs with reporting",
    ],
  },
];

export const getCategory = (slug: string) =>
  serviceCategories.find((c) => c.slug === slug);
