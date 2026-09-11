import Image from "next/image";
import type { Metadata } from "next";
import {
  Compass, Target, BadgeCheck, ShieldCheck, Award, GraduationCap,
  Leaf, HardHat, Search, Settings2, FolderCheck, ClipboardCheck,
  Handshake, Layers, Headphones, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrgChart } from "@/components/sections/OrgChart";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { masterTrainer } from "@/data/team";
import { vision } from "@/data/site-content";
import { faqs } from "@/data/faqs";
import { SITE } from "@/lib/site";
import { JsonLd, personSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About — HRD Corp Accredited Training & Consultancy",
  description:
    "Prime HR Academy Malaysia is an HRD Corp accredited training, consultancy and organizational development company led by master trainer Ram.G. Our story, vision, accreditations, team and how we work.",
  alternates: { canonical: "/about" },
};

const quickFacts = [
  ["Founded", SITE.founded],
  ["Headquarters", `${SITE.address.city}, ${SITE.address.state}`],
  ["Domains", "HR · Leadership · Compliance · Safety"],
  ["Catalogue", "30+ HRD Corp Programs"],
  ["HRD Corp Reg.", SITE.hrdCorpRegNo],
];

const accreditations = [
  { icon: BadgeCheck, tag: "HRD CORP", title: "Accredited Training Provider", text: `Registered HRD Corp training provider (Reg. ${SITE.hrdCorpRegNo}).` },
  { icon: ShieldCheck, tag: "HRD CORP", title: "Claimable Programs", text: "Programs structured to be claimable under the HRD Corp levy scheme." },
  { icon: GraduationCap, tag: "TTT", title: "Certified Trainers", text: "Delivered by HRD Corp Train-the-Trainer (TTT) certified trainers." },
  { icon: Award, tag: "ISO", title: "ISO 9001:2015", title2: "Quality Management", text: "Quality management systems consultancy and training expertise." },
  { icon: Leaf, tag: "ISO", title: "ISO 14001", text: "Environmental management system advisory and training." },
  { icon: HardHat, tag: "ISO", title: "ISO 45001", text: "Occupational health & safety management expertise." },
];

const principles = [
  { n: "01", icon: Search, title: "Assess before we train", text: "Every engagement starts with a needs assessment and HRD Corp eligibility check — never an off-the-shelf module." },
  { n: "02", icon: Settings2, title: "Customize to your team", text: "Programs are tailored to your industry, people and goals, using real case studies and ready-to-use templates." },
  { n: "03", icon: FolderCheck, title: "Handle the paperwork", text: "We manage HRD Corp documentation, claims and reporting end-to-end so you can focus on your people." },
  { n: "04", icon: ClipboardCheck, title: "Measure & certify", text: "We evaluate learning outcomes and certify participants after every program — with reporting you can act on." },
];

const strengths = [
  { icon: Handshake, title: "Practical Delivery", text: "Real case studies, templates and workplace application — structured for measurable outcomes." },
  { icon: Layers, title: "HRD Corp Expertise", text: "Accredited trainers and full claim support under the levy scheme, across HR, leadership and compliance." },
  { icon: Headphones, title: "Flexible Formats", text: "In-house, public or online — tailored to your team, with responsive support throughout." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema({
            name: "Ram.G",
            jobTitle: "Managing Director & Master Trainer",
            description: masterTrainer.intro,
            credentials: masterTrainer.credentials,
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        ]}
      />

      {/* HERO + QUICK FACTS */}
      <section className="relative flex min-h-[34rem] items-center overflow-hidden bg-navy-deep text-white lg:min-h-[calc(100vh-6rem)]">
        <Image src="/gallery/gallery-24.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-navy-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/15" />
        <div className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-blue/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-amber/[0.08] blur-[130px]" />
        <div className="container-prime relative grid w-full items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-7 rounded-full bg-amber" />
              <span className="eyebrow !text-blue-soft">About Prime HR Academy</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              We turn{" "}
              <span className="relative whitespace-nowrap text-amber">
                talent
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-amber/40" />
              </span>{" "}
              into{" "}
              <span className="font-[family-name:var(--font-fraunces)] italic text-amber">
                organizational success.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-light">
              Prime HR Academy Malaysia is a professional training, consultancy and
              organizational development company — HRD Corp accredited, helping
              organizations build competent, productive and future-ready workforces.
            </p>
          </div>

          {/* Quick facts card — premium double-bezel */}
          <Reveal>
            <div className="rounded-[1.75rem] bg-white/[0.06] p-1.5 ring-1 ring-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
              <div className="rounded-[1.4rem] bg-white p-7 text-ink shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate">The quick facts</p>
                <dl className="mt-5 divide-y divide-mist">
                  {quickFacts.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 py-3.5">
                      <dt className="text-sm text-slate">{k}</dt>
                      <dd className="text-right text-sm font-bold text-navy">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION SPLIT */}
      <section className="grid lg:grid-cols-2">
        <Reveal className="relative overflow-hidden bg-amber p-10 text-navy sm:p-14 lg:p-16">
          <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-white/15 blur-2xl" />
          <Target className="relative size-10 text-navy" />
          <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.16em] text-navy/70">Mission</p>
          <p className="relative mt-3 text-2xl font-bold leading-snug text-navy sm:text-3xl">
            To deliver impactful, practical learning and strategic consultancy that develops
            competent, future-ready talent.
          </p>
          <div className="relative mt-7 flex flex-wrap gap-2">
            {["Practical", "Impactful", "Future-ready"].map((t) => (
              <span key={t} className="rounded-full bg-navy/10 px-3.5 py-1.5 text-xs font-semibold text-navy">{t}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="relative overflow-hidden bg-navy-deep bg-grid p-10 text-white sm:p-14 lg:p-16">
          <div className="pointer-events-none absolute -left-10 bottom-0 size-48 rounded-full bg-teal/15 blur-3xl" />
          <Compass className="relative size-10 text-teal" />
          <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.16em] text-steel">Vision</p>
          <p className="relative mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">{vision}</p>
          <div className="relative mt-7 flex flex-wrap gap-2">
            {["Leading", "Innovative", "Continuous"].map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-steel-light">{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* OUR STORY */}
      <section className="container-prime py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-6 rounded-full bg-amber" />
              <span className="eyebrow">Our story</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">Built to develop Malaysia&apos;s workforce</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-slate">
              <p>
                Prime HR Academy Malaysia is a professional training, consultancy and
                organizational development company dedicated to helping organizations
                enhance workforce capabilities and achieve sustainable business growth.
              </p>
              <p>
                We combine practical industry knowledge, proven methodologies and
                interactive learning to deliver measurable outcomes — supporting
                organizations as a trusted learning and development partner.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-mist py-6">
              {[["2023", "Established", "text-amber"], ["30+", "Programmes", "text-teal-deep"], ["200+", "Organizations", "text-amber"]].map(([v, l, c]) => (
                <div key={l}>
                  <p className={`font-[family-name:var(--font-montserrat)] text-3xl font-black ${c}`}>{v}</p>
                  <p className="text-xs text-slate">{l}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["HRD Corp Claimable", "Accredited Training Provider"].map((t) => (
                <span key={t} className="rounded-full bg-amber-soft px-3.5 py-1.5 text-xs font-bold text-amber-deep">{t}</span>
              ))}
            </div>
          </div>

          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-mist">
              <Image src="/gallery/gallery-11.jpg" alt="Prime HR Academy training program" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-mist bg-white px-5 py-4 shadow-[var(--shadow-navy)]">
              <Image src="/brand/hrdcorp.png" alt="HRD Corp" width={84} height={28} className="h-7 w-auto" />
              <span className="text-sm font-semibold text-navy">Accredited Provider</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BRAND PRESENCE — billboard visual */}
      <section className="container-prime py-16 sm:py-20">
        <Reveal className="overflow-hidden rounded-3xl ring-1 ring-mist">
          <div className="relative aspect-[2/1] w-full">
            <Image
              src="/promo/billboard.png"
              alt="Prime HR Academy Malaysia brand campaign visual"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Reveal>
        <p className="mt-4 text-center text-sm text-slate">
          Our brand, built for every channel — from digital to out-of-home.
        </p>
      </section>

      {/* ACCREDITATIONS & FRAMEWORKS */}
      <section className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute -right-40 top-1/4 size-[32rem] rounded-full bg-amber/[0.07] blur-[130px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 size-[30rem] rounded-full bg-teal/[0.06] blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
        <div className="container-prime relative">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-6 rounded-full bg-amber" />
            <span className="eyebrow !text-blue-soft">Accreditations &amp; frameworks</span>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
            Every program, claim and certificate. <span className="text-chrome">Backed by accreditation.</span>
          </h2>
          <div className="mt-7 flex items-center gap-4">
            <Image src="/brand/hrdcorp.png" alt="HRD Corp" width={120} height={40} className="h-9 w-auto rounded bg-white/90 px-2 py-1" />
            <p className="text-xs uppercase tracking-wider text-steel">Recognised by Pembangunan Sumber Manusia Berhad (HRD Corp)</p>
          </div>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accreditations.map((a, i) => {
              const Icon = a.icon;
              const amber = i % 2 === 0;
              return (
                <StaggerItem key={a.title} className="h-full">
                  <div className="h-full rounded-[1.5rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                    <div className="h-full rounded-[1.15rem] bg-gradient-to-b from-white/[0.06] to-transparent p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <div className="flex items-center justify-between">
                        <span className={`flex size-11 items-center justify-center rounded-xl ${amber ? "bg-amber/15 text-amber" : "bg-teal/15 text-teal"}`}><Icon className="size-5" /></span>
                        <span className="text-2xs font-bold uppercase tracking-wider text-steel">{a.tag}</span>
                      </div>
                      <h3 className="mt-4 font-bold text-white">{a.title}{a.title2 ? <span className="block text-steel-light">{a.title2}</span> : null}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-steel">{a.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* HOW WE ENGAGE */}
      <section className="container-prime py-20 sm:py-24">
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-6 rounded-full bg-amber" />
          <span className="eyebrow">How we engage</span>
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
          Four operating principles. <span className="font-[family-name:var(--font-fraunces)] italic text-teal-deep">Non-negotiable.</span>
        </h2>
        <Stagger className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = p.icon;
            const amber = i % 2 === 0;
            return (
              <StaggerItem key={p.n}>
                <div className="flex gap-5">
                  <span className={`font-[family-name:var(--font-montserrat)] text-4xl font-black ${amber ? "text-amber/30" : "text-teal/30"}`}>{p.n}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className={`size-5 ${amber ? "text-amber-deep" : "text-teal-deep"}`} />
                      <h3 className="font-bold text-navy">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{p.text}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ORGANIZATION / HIERARCHY (retained) */}
      <section className="bg-pearl py-20 sm:py-24">
        <div className="container-prime">
          <SectionHeading
            align="center"
            eyebrow="Our organization"
            title="The team behind Prime HR Academy"
            intro="A multi-disciplinary team of professional and certified HRD Corp trainers, led by master trainer Ram.G."
          />
          <OrgChart />
          <p className="mt-12 text-center text-sm text-slate">
            Led by <span className="font-semibold text-navy">Ram.G</span> — HRD Corp accredited master trainer with 20+ years across HR, leadership and industrial relations.
            <Link href="/programs" className="ml-1 inline-flex items-center gap-1 font-semibold text-teal-deep">See our programs <ArrowRight className="size-3.5" /></Link>
          </p>
        </div>
      </section>

      {/* OUR STRENGTHS */}
      <section className="container-prime py-20 sm:py-24">
        <SectionHeading eyebrow="Our strengths" title="A multi-disciplinary partner for every organization" />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {strengths.map((s, i) => {
            const Icon = s.icon;
            const amber = i % 2 === 0;
            return (
              <StaggerItem key={s.title}>
                <div className="group h-full rounded-2xl border border-mist bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-navy)]">
                  <span className={`flex size-12 items-center justify-center rounded-xl transition-colors ${amber ? "bg-amber-soft text-amber-deep group-hover:bg-amber group-hover:text-navy" : "bg-teal-soft text-teal-deep group-hover:bg-teal group-hover:text-white"}`}><Icon className="size-6" /></span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="bg-pearl py-20 sm:py-24">
        <div className="container-prime">
          <SectionHeading align="center" eyebrow="Common questions" title="Frequently asked questions" />
          <div className="mx-auto mt-10 grid max-w-5xl gap-x-6 md:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-mist py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span className="text-amber-deep transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Build a competent, future-ready workforce" text="Talk to us about your training or consultancy needs — we respond within one business day." />
    </>
  );
}
