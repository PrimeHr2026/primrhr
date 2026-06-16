import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ApplyButton } from "@/components/sections/ApplyButton";
import { serviceCategories, getCategory } from "@/data/services";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.title} — HRD Corp Claimable`,
    description: c.overview,
    alternates: { canonical: `/services/${c.slug}` },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const Icon = c.icon;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: c.title, description: c.overview, url: `/services/${c.slug}` }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: c.shortTitle, url: `/services/${c.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Service"
        crumbs={[
          { name: "Services", href: "/services" },
          { name: c.shortTitle, href: `/services/${c.slug}` },
        ]}
        title={c.title}
        intro={c.tagline}
      />

      <section className="container-prime py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="flex size-14 items-center justify-center rounded-2xl bg-navy text-white"><Icon className="size-7" /></span>
            <h2 className="mt-6 text-2xl font-bold text-navy sm:text-3xl">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">{c.overview}</p>

            <h3 className="mt-10 text-lg font-bold text-navy">What's included</h3>
            <Stagger className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {c.items.map((it) => (
                <StaggerItem key={it}>
                  <p className="flex items-start gap-2 rounded-xl border border-mist bg-white p-3.5 text-sm text-ink">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue" /> {it}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Outcomes / sidebar */}
          <Reveal>
            <div className="sticky top-24 rounded-3xl border border-mist bg-pearl p-7">
              <h3 className="text-lg font-bold text-navy">What you gain</h3>
              <ul className="mt-4 space-y-3">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue" /> {o}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-navy-deep p-5 text-white">
                <p className="text-sm text-steel-light">HRD Corp claimable. Delivered in-house, public or online.</p>
                <Button href="/contact" className="mt-4 w-full">Enquire about this service <ArrowRight className="size-4" /></Button>
                <div className="mt-3"><ApplyButton serviceName={c.title} /></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
