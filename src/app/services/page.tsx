import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { serviceCategories } from "@/data/services";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services — HR Consultancy, Training & Development",
  description:
    "HRD Corp claimable consultancy, training & development and organizational solutions from Prime HR Academy Malaysia — tailored to your organization.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
          ]),
          ...serviceCategories.map((c) =>
            serviceSchema({ name: c.title, description: c.tagline, url: `/services/${c.slug}` }),
          ),
        ]}
      />
      <PageHero
        eyebrow="Our services"
        crumbs={[{ name: "Services", href: "/services" }]}
        title="Solutions that build competent, future-ready organizations"
        intro="From consultancy to fully customized training and development — all HRD Corp claimable, all delivered by accredited trainers."
      />

      {/* Pillars */}
      <section className="container-prime py-20 sm:py-24">
        <Stagger className="grid gap-6 md:grid-cols-2">
          {serviceCategories.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/services/${c.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-mist bg-white p-8 transition-all hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-navy)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white transition-colors group-hover:bg-blue">
                      <Icon className="size-6" />
                    </span>
                    <ArrowRight className="size-5 text-slate transition-transform group-hover:translate-x-1 group-hover:text-blue" />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-navy">{c.title}</h2>
                  <p className="mt-2 text-slate">{c.tagline}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {c.items.slice(0, 6).map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-blue" /> {it}
                      </li>
                    ))}
                  </ul>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* HRD Corp callout */}
      <section className="bg-navy-deep bg-grid py-20 text-white sm:py-24">
        <div className="container-prime grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="HRD Corp claimable"
              title="We handle the paperwork. You develop your people."
              intro="Every program is structured for the HRD Corp levy scheme — and we support you end-to-end with planning, documentation, claims and reporting."
            />
            <div className="mt-8">
              <Button href="/contact" size="lg">Check your eligibility <ArrowRight className="size-5" /></Button>
            </div>
          </div>
          <Reveal className="grid gap-3 sm:grid-cols-2">
            {[
              "Accredited trainer delivery",
              "Customized to your needs",
              "Comprehensive materials",
              "Post-training evaluation",
              "Documentation & admin support",
              "Measurable outcomes & reporting",
            ].map((b) => (
              <div key={b} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-steel-light">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-amber" /> {b}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
