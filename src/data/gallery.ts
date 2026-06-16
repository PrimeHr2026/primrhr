export type GalleryItem = {
  src: string;
  w: number;
  h: number;
  caption: string;
  category: "Corporate" | "Certification" | "Public" | "Compliance" | "Safety";
};

/**
 * Curated real training photos from Prime HR Academy programs.
 * Only genuine portfolio shots — graduations, in-house training, public
 * programs, safety and compliance sessions.
 */
export const gallery: GalleryItem[] = [
  { src: "/gallery/gallery-17.jpg", w: 912, h: 684, caption: "In-house HR training session", category: "Corporate" },
  { src: "/gallery/gallery-09.jpg", w: 879, h: 703, caption: "Certified participants — CHRP", category: "Certification" },
  { src: "/gallery/gallery-11.jpg", w: 1000, h: 750, caption: "Public training program", category: "Public" },
  { src: "/gallery/gallery-13.jpg", w: 1000, h: 750, caption: "Safety management training", category: "Safety" },
  { src: "/gallery/gallery-21.jpg", w: 1280, h: 960, caption: "Safety, Health & Environment program", category: "Safety" },
  { src: "/gallery/gallery-16.jpg", w: 912, h: 684, caption: "Participants with certificates", category: "Certification" },
  { src: "/gallery/gallery-19.jpg", w: 1280, h: 960, caption: "Public seminar — Employment Act & Payroll", category: "Public" },
  { src: "/gallery/gallery-14.jpg", w: 904, h: 720, caption: "Corporate group training", category: "Corporate" },
  { src: "/gallery/gallery-28.jpg", w: 519, h: 344, caption: "CHRP graduation group", category: "Certification" },
  { src: "/gallery/gallery-15.jpg", w: 1000, h: 750, caption: "Group training session", category: "Corporate" },
  { src: "/gallery/gallery-26.jpg", w: 618, h: 330, caption: "Corporate teambuilding", category: "Corporate" },
  { src: "/gallery/gallery-30.jpg", w: 480, h: 353, caption: "Team training session", category: "Corporate" },
  { src: "/gallery/gallery-27.jpg", w: 585, h: 339, caption: "In-house program", category: "Corporate" },
  { src: "/gallery/gallery-31.jpg", w: 575, h: 408, caption: "Group training program", category: "Public" },
];

export const galleryCategories = [
  "All",
  "Corporate",
  "Certification",
  "Public",
  "Safety",
] as const;
