import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Monitor, BadgeCheck, Check, Users, Lightbulb, Target } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { flagshipPrograms, getFlagship } from "@/data/programs";
import { JsonLd, breadcrumbSchema, courseSchema } from "@/lib/schema";

export function generateStaticParams() {
  return flagshipPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getFlagship(slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.acronym}) — HRD Corp Claimable`,
    description: p.overview,
    alternates: { canonical: `/programs/${p.slug}` },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getFlagship(slug);
  if (!p) notFound();

  return (
    <>
      <JsonLd
        data={[
          courseSchema({ name: p.name, description: p.overview, url: `/programs/${p.slug}`, durationISO: p.durationISO }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Programs", url: "/programs" },
            { name: p.acronym ?? p.name, url: `/programs/${p.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={p.acronym}
        crumbs={[
          { name: "Programs", href: "/programs" },
          { name: p.acronym ?? p.name, href: `/programs/${p.slug}` },
        ]}
        title={p.name}
        intro={p.tagline}
      />

      {/* Meta bar */}
      <div className="border-b border-mist bg-pearl">
        <div className="container-prime flex flex-wrap gap-6 py-5 text-sm">
          <span className="inline-flex items-center gap-2 text-navy"><Clock className="size-4 text-blue" /> {p.duration}</span>
          <span className="inline-flex items-center gap-2 text-navy"><Monitor className="size-4 text-blue" /> {p.format}</span>
          <span className="inline-flex items-center gap-2 font-bold text-amber-deep"><BadgeCheck className="size-4" /> HRD Corp Claimable</span>
        </div>
      </div>

      <section className="container-prime py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">Program overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">{p.overview}</p>

            <h3 className="mt-12 text-xl font-bold text-navy">Module breakdown</h3>
            <Stagger className="mt-5 space-y-4">
              {p.modules.map((m, i) => (
                <StaggerItem key={m.title}>
                  <div className="rounded-2xl border border-mist bg-white p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy font-[family-name:var(--font-montserrat)] text-sm font-black text-white">{i + 1}</span>
                      <h4 className="font-bold text-navy">{m.title}</h4>
                    </div>
                    <ul className="mt-3 grid gap-2 pl-12 sm:grid-cols-2">
                      {m.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-slate">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue" /> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Outcomes */}
            <h3 className="mt-12 text-xl font-bold text-navy">What you'll achieve</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {p.outcomes.map((o) => (
                <div key={o} className="rounded-2xl border border-mist bg-pearl p-5">
                  <Target className="size-5 text-blue" />
                  <p className="mt-3 text-sm text-ink">{o}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <Reveal>
            <div className="sticky top-24 space-y-5">
              <div className="rounded-3xl border border-mist bg-white p-7">
                <div className="flex items-center gap-2 text-navy">
                  <Users className="size-5 text-blue" />
                  <h3 className="font-bold">Who it's for</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {p.audience.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-slate">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-mist bg-white p-7">
                <div className="flex items-center gap-2 text-navy">
                  <Lightbulb className="size-5 text-blue" />
                  <h3 className="font-bold">Methodology</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {p.methodology.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-slate">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-navy-deep p-7 text-white">
                <p className="text-sm text-steel-light">Run this program in-house for your team, or join a public intake.</p>
                <Button href="/contact" className="mt-4 w-full">Enquire about {p.acronym}</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
