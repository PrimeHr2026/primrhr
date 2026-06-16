/**
 * JSON-LD schema generators for SEO + AI search (AEO/GEO).
 * MEDSS shipped none of this — it's a key Prime HR upgrade.
 */
import { SITE } from "./site";

const ORG_ID = `${SITE.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "EducationalOrganization"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    slogan: SITE.tagline,
    description: SITE.description,
    foundingDate: SITE.founded,
    logo: `${SITE.url}/brand/primehr-logo.png`,
    image: `${SITE.url}/brand/kl-skyline.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.lat,
      longitude: SITE.address.lng,
    },
    areaServed: { "@type": "Country", name: "Malaysia" },
    knowsAbout: [
      "Human Resource Management",
      "HRD Corp Claimable Training",
      "Leadership Development",
      "Employment Act 1955",
      "Industrial Relations Act 1967",
      "Payroll Management",
      "Certified Human Resource Professional (CHRP)",
    ],
    sameAs: [SITE.social.whatsapp],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-MY",
  };
}

export function personSchema(p: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  credentials?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    worksFor: { "@id": ORG_ID },
    description: p.description,
    image: p.image ? `${SITE.url}${p.image}` : undefined,
    hasCredential: p.credentials?.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
  };
}

export function serviceSchema(s: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: `${SITE.url}${s.url}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Malaysia" },
    serviceType: "Corporate training and HR consultancy",
  };
}

export function courseSchema(c: {
  name: string;
  description: string;
  url: string;
  durationISO?: string; // e.g. "P5D"
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    url: `${SITE.url}${c.url}`,
    provider: { "@id": ORG_ID },
    educationalCredentialAwarded: c.name,
    inLanguage: "en-MY",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "online"],
      ...(c.durationISO ? { courseWorkload: c.durationISO } : {}),
      location: { "@type": "Country", name: "Malaysia" },
    },
    offers: {
      "@type": "Offer",
      category: "HRD Corp Claimable",
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
