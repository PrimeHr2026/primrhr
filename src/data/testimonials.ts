export type Testimonial = {
  name: string;
  position?: string;
  company?: string;
  rating: number;
  review: string;
};

/** Seed testimonials (from CHRP program feedback). Replaced by approved live reviews when available. */
export const seedTestimonials: Testimonial[] = [
  {
    name: "Lintik",
    company: "Kuching, Sarawak",
    rating: 5,
    review: "Truly understand now the importance of HR — well delivered, Ram.G.",
  },
  {
    name: "Faizur",
    company: "Malaysia",
    rating: 5,
    review: "A very good program for executives and above. 100% recommended.",
  },
  {
    name: "Ginie",
    company: "Kuala Lumpur",
    rating: 5,
    review: "Committed trainer. The examples shown were mind-blowing. All the best.",
  },
];
