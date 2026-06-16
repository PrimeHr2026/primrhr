import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Clock, Monitor, BadgeCheck, Check, GraduationCap, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProgramCatalog } from "@/components/sections/ProgramCatalog";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { flagshipPrograms } from "@/data/programs";
import { JsonLd, breadcrumbSchema, courseSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Programs & Training Gallery — CHRP, Leadership & Compliance",
  description:
    "Explore Prime HR Academy's HRD Corp claimable programs — including the flagship CHRP certification, Certified Professional Manager and a 1-year HR & Leadership Diploma.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Programs", url: "/programs" },
          ]),
          ...flagshipPrograms.map((p) =>
            courseSchema({ name: p.name, description: p.overview, url: `/programs/${p.slug}`, durationISO: p.durationISO }),
          ),
        ]}
      />
      {/* HERO */}
      <section className="relative flex min-h-[34rem] flex-col justify-center overflow-hidden bg-navy-deep text-white lg:min-h-[calc(100vh-6rem)]">
        <Image src="/gallery/gallery-19.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-navy-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/30" />
        <div className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-blue/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-10 size-[30rem] rounded-full bg-amber/[0.08] blur-[130px]" />

        <div className="container-prime relative flex flex-1 items-center py-16 sm:py-20">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-1.5 text-xs text-steel">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="font-semibold text-amber">Programs &amp; Portfolio</span>
            </nav>
            <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
              HRD Corp claimable<br className="hidden sm:block" /> programs &amp; portfolio
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-light">
              From flagship HR certifications to leadership, compliance and safety —
              delivered in-house, public or online by HRD Corp accredited trainers.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#flagship" variant="amber" size="lg">View programs <ArrowRight className="size-5" /></Button>
              <Button href="/contact" variant="secondary" size="lg" className="!border-white/25 !text-white hover:!bg-white/5">Enquire now</Button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-navy-deep/40 backdrop-blur-sm">
          <div className="container-prime grid grid-cols-2 gap-6 py-7 lg:grid-cols-4">
            {[
              { v: "200+", l: "Organizations Trained", c: "text-amber" },
              { v: "30+", l: "HRD Corp Programmes", c: "text-teal" },
              { v: "4", l: "Core Service Pillars", c: "text-amber" },
              { v: "20+", l: "Years of Experience", c: "text-teal" },
            ].map((s) => (
              <div key={s.l} className="text-center sm:text-left">
                <p className={`font-[family-name:var(--font-montserrat)] text-3xl font-black sm:text-4xl ${s.c}`}>{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-steel sm:text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section id="flagship" className="container-prime scroll-mt-24 py-20 sm:py-24">
        <SectionHeading eyebrow="Flagship certifications" title="Our signature certification programs" />
        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {flagshipPrograms.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/programs/${p.slug}`} className="group flex h-full flex-col rounded-3xl border border-mist bg-white p-7 transition-all hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-navy)]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{p.acronym}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-soft px-2.5 py-1 text-xs font-bold text-amber-deep"><BadgeCheck className="size-3.5" /> Claimable</span>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-snug text-navy">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{p.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate">
                  <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5 text-blue" /> {p.duration}</span>
                  <span className="inline-flex items-center gap-1.5"><Monitor className="size-3.5 text-blue" /> {p.format}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                  View program <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Certified & accredited trainers */}
      <section className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute -right-40 top-0 size-[34rem] rounded-full bg-amber/[0.08] blur-[130px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 size-[30rem] rounded-full bg-teal/[0.07] blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="container-prime relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-7 rounded-full bg-amber" />
              <span className="eyebrow !text-blue-soft">Certified &amp; accredited</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Delivered by certified trainers — <span className="text-chrome">in-house, not outsourced.</span>
            </h2>
            <p className="mt-5 max-w-xl text-steel-light">
              Every Prime HR program is delivered by HRD Corp accredited trainers from our own
              in-house team. Participants graduate with recognized credentials — led by master
              trainer Ram.G, an HRD Corp accredited trainer.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "HRD Corp Accredited Trainer (TTT)",
                "Trainer ID 40586 · valid 2024–2027",
                "In-house certified training team",
                "Recognized graduation credentials",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-steel-light">
                  <Check className="mt-0.5 size-4 shrink-0 text-amber" /> {t}
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="amber" className="mt-8 !rounded-full">Talk to our team</Button>
          </div>

          <Reveal className="relative mx-auto w-full max-w-sm lg:mr-0">
            <div className="rounded-[1.5rem] bg-white p-3 shadow-[var(--shadow-navy-lg)] ring-1 ring-white/15">
              <Image
                src="/gallery/gallery-06.jpg"
                alt="HRD Corp Certificate of Accreditation — Murugan Raman (Ram.G)"
                width={529}
                height={747}
                className="w-full rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-48 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-navy-deep sm:block">
              <div className="relative aspect-[4/3]">
                <Image src="/gallery/gallery-28.jpg" alt="CHRP graduation group" fill className="object-cover" sizes="200px" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 to-transparent p-2.5 text-[11px] font-semibold text-white">
                  <GraduationCap className="mr-1 inline size-3.5 text-amber" /> CHRP graduation
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-pearl py-20 sm:py-24">
        <div className="container-prime">
          <SectionHeading eyebrow="Full catalog" title="Browse programs by category" intro="A selection of our most-requested programs. Every program can be customized and run in-house." />
          <div className="mt-10">
            <ProgramCatalog />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-prime py-20 sm:py-24">
        <SectionHeading eyebrow="Training gallery" title="Real programs, real organizations" intro="A look at our trainers in action — from corporate teambuilding to certification graduations and university talks." />
        <div className="mt-10">
          <GalleryGrid />
        </div>
      </section>

      {/* Coach on Campus */}
      <section className="container-prime pb-20 sm:pb-24">
        <Reveal className="grid items-stretch overflow-hidden rounded-3xl border border-mist bg-white shadow-[var(--shadow-navy)] lg:grid-cols-2">
          <div className="relative min-h-[260px] lg:min-h-full">
            <Image src="/gallery/coach-on-campus.jpg" alt="Coach on Campus — MSU students" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 to-transparent lg:bg-gradient-to-r" />
          </div>
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-7 rounded-full bg-teal" />
              <span className="eyebrow !text-teal-deep">Coach on Campus</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">Engaging the next generation</h2>
            <p className="mt-4 leading-relaxed text-slate">
              Beyond corporate training, Prime HR brings HR insight and career readiness to
              universities — preparing students for employer expectations in the Gen&nbsp;Z
              workplace through our <span className="font-semibold text-navy">Coach on Campus</span> talks.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["MSU", "UPM", "UKM"].map((u) => (
                <span key={u} className="rounded-full bg-teal-soft px-3.5 py-1.5 text-xs font-bold text-teal-deep">{u}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand title="Bring any program in-house" text="Tell us your team and goals — we'll tailor an HRD Corp claimable program and handle the paperwork." />
    </>
  );
}
