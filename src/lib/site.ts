/**
 * Single source of truth for Prime HR Academy Malaysia business facts.
 * Used across metadata, schema, header, footer, and contact.
 */
export const SITE = {
  name: "Prime HR Academy Malaysia",
  legalName: "HR Business Academy & Consultancy",
  shortName: "Prime HR Academy",
  tagline: "Transforming Talent Into Organizational Success.",
  url: "https://www.primehracademy.com",
  description:
    "Prime HR Academy Malaysia is an HRD Corp accredited training, consultancy and organizational development company — delivering HRD Corp claimable HR, leadership and compliance programs led by master trainer Ram.G.",
  email: "ramg@primehracademy.com",
  phone: "+60 19-237 1374",
  phoneRaw: "+60192371374",
  whatsapp: "60192371374",
  hrdCorpRegNo: "202303233220",
  trainerTtIdNote: "HRD Corp TTT Trainer ID 40586",
  founded: "2023",
  address: {
    line1: "Subang Square Business Centre",
    line2: "Jalan SS 15/3B, SS 15",
    city: "Subang Jaya",
    state: "Selangor",
    postcode: "47500",
    country: "Malaysia",
    countryCode: "MY",
    // approximate geo for Subang Jaya SS15
    lat: 3.0738,
    lng: 101.5851,
  },
  social: {
    whatsapp: "https://wa.me/60192371374",
  },
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Programs", href: "/programs" },
  { label: "Contact", href: "/contact" },
] as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
