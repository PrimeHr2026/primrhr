import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { serviceCategories } from "@/data/services";
import { flagshipPrograms } from "@/data/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/services", "/programs", "/contact", "/privacy-policy", "/terms"];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const c of serviceCategories) {
    entries.push({ url: `${SITE.url}/services/${c.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const p of flagshipPrograms) {
    entries.push({ url: `${SITE.url}/programs/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }

  return entries;
}
