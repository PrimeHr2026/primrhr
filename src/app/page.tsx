import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Award, Users, TrendingUp, Scale, HardHat, GraduationCap, Layers, BadgeCheck, MapPin, Star, type LucideIcon } from "lucide-react";
import { HomeHero } from "@/components/sections/HomeHero";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { ReviewForm } from "@/components/sections/ReviewForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { serviceCategories } from "@/data/services";
import { whyChooseUs, featuredPrograms, industries } from "@/data/site-content";
import { gallery } from "@/data/gallery";
import { whatsappLink, SITE } from "@/lib/site";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { faqs } from "@/data/faqs";

const bandStats: { v: string; l: string; c: string; icon: LucideIcon }[] = [
  { v: "30+", l: "HRD Corp Programmes", c: "text-amber", icon: GraduationCap },
  { v: "4", l: "Core Service Pillars", c: "text-teal", icon: Layers },
  { v: "HRD Corp", l: "Registered Provider", c: "text-amber", icon: BadgeCheck },
  { v: "Malaysia", l: "In-house · Public · Online", c: "text-teal", icon: MapPin },
];

const tagMeta: Record<string, { tag: string; bar: string; iconBg: string; icon: LucideIcon }> = {
  Certification: { tag: "bg-amber-soft text-amber-deep", bar: "bg-amber", iconBg: "bg-amber-soft text-amber-deep", icon: Award },
  HR: { tag: "bg-amber-soft text-amber-deep", bar: "bg-amber", iconBg: "bg-amber-soft text-amber-deep", icon: Users },
  Leadership: { tag: "bg-amber-soft text-amber-deep", bar: "bg-amber", iconBg: "bg-amber-soft text-amber-deep", icon: TrendingUp },
  Compliance: { tag: "bg-teal-soft text-teal-deep", bar: "bg-teal", iconBg: "bg-teal-soft text-teal-deep", icon: Scale },
  Safety: { tag: "bg-teal-soft text-teal-deep", bar: "bg-teal", iconBg: "bg-teal-soft text-teal-deep", icon: HardHat },
};
const fallbackMeta = { tag: "bg-amber-soft text-amber-deep", bar: "bg-amber", iconBg: "bg-amber-soft text-amber-deep", icon: Award };

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([{ name: "Home", url: "/" }])]} />
      <HomeHero />
      <ClientMarquee />

      {/* WHAT WE DO — amber panel + service rows */}
      <section className="container-prime py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-amber p-9 text-navy sm:p-11">
            <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-white/15 blur-2xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy/70">What we do</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-navy sm:text-4xl">
                Everything your organization needs — under one roof.
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-navy/80">
                From HR consultancy and certification to leadership and compliance —
                we design, deliver and certify HRD Corp claimable programs, and handle
                the paperwork end-to-end.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "HRD Corp claimable & accredited",
                  "In-house, public & online delivery",
                  "Fully customized to your team",
                  "End-to-end documentation support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-semibold text-navy">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-amber">
                      <Check className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/services" className="relative mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-bold text-white transition-transform hover:translate-x-0.5">
              See all services <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Stagger className="flex flex-col">
            {serviceCategories.map((c) => (
              <StaggerItem key={c.slug}>
                <Link href={`/services/${c.slug}`} className="group flex items-start gap-5 border-b border-mist py-6 transition-colors hover:bg-pearl">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy/[0.06] text-navy transition-colors group-hover:bg-amber group-hover:text-navy">
                    <c.icon className="size-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-navy">{c.title}</h3>
                      <ArrowUpRight className="size-5 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-deep" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.items.slice(0, 4).map((it) => (
                        <span key={it} className="rounded-full bg-pearl px-2.5 py-1 text-xs font-medium text-slate">{it}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-navy-deep bg-grid">
        <div className="container-prime grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
          {bandStats.map((s) => {
            const Icon = s.icon;
            const isAmber = s.c === "text-amber";
            return (
              <Reveal key={s.l} className="flex flex-col items-center border-white/10 px-2 text-center lg:border-l lg:first:border-l-0">
                <span className={`mb-3 flex size-11 items-center justify-center rounded-xl ${isAmber ? "bg-amber/15 text-amber" : "bg-teal/15 text-teal"}`}>
                  <Icon className="size-5" />
                </span>
                <p className={`font-[family-name:var(--font-montserrat)] text-2xl font-black sm:text-3xl ${s.c}`}>{s.v}</p>
                <p className="mt-1 text-xs text-steel sm:text-sm">{s.l}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE — bento */}
      <section className="container-prime py-20 sm:py-24">
        <SectionHeading align="center" eyebrow="Why Prime HR" title={<>Real expertise. <span className="text-teal-deep">Real results.</span></>} intro="We don't just run programmes — we deliver measurable outcomes across HR, leadership and compliance." />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {whyChooseUs.map((w, i) => (
            <StaggerItem key={w.title} className={i === 0 || i === 3 || i === 4 ? "md:col-span-2" : ""}>
              <div className={`flex h-full flex-col rounded-2xl border p-7 ${
                i === 0 ? "border-transparent bg-navy text-white" : i === 3 ? "border-transparent bg-amber-soft" : i === 4 ? "border-transparent bg-teal-soft" : "border-mist bg-white"
              }`}>
                <Check className={`size-6 ${i === 0 ? "text-amber" : i === 3 ? "text-amber-deep" : i === 4 ? "text-teal-deep" : "text-blue"}`} />
                <h3 className={`mt-4 text-lg font-bold ${i === 0 ? "text-white" : "text-navy"}`}>{w.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-steel-light" : "text-slate"}`}>{w.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Button href="/programs" variant="amber">View training programmes <ArrowRight className="size-4" /></Button>
        </div>
      </section>

      {/* FEATURED PROGRAMMES */}
      <section className="bg-pearl py-20 sm:py-24">
        <div className="container-prime">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Training programmes" title="HRD Corp claimable programmes across every discipline" />
            <Button href="/programs" variant="secondary">View all programmes</Button>
          </div>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((p) => {
              const m = tagMeta[p.tag] ?? fallbackMeta;
              const Icon = m.icon;
              return (
                <StaggerItem key={p.title}>
                  <Link href={p.href} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mist bg-white p-7 transition-all hover:-translate-y-1 hover:border-amber/40 hover:shadow-[var(--shadow-navy)]">
                    <span className={`absolute inset-x-0 top-0 h-1 ${m.bar}`} />
                    <div className="flex items-center justify-between">
                      <span className={`flex size-11 items-center justify-center rounded-xl ${m.iconBg}`}>
                        <Icon className="size-5" />
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${m.tag}`}>{p.tag}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold leading-snug text-navy">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{p.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                      Enquire <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* GALLERY — compact full-width light-orange section */}
      <section className="bg-[#FDECD6] py-14 sm:py-16">
        <div className="container-prime">
          <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-6 rounded-full bg-amber-deep" />
                <span className="eyebrow !text-amber-deep">Training gallery</span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">Training in action.</h2>
              <p className="mt-3 text-slate">
                From teambuilding to CHRP graduations and university talks — real impact across Malaysia.
              </p>
            </div>
            <Button href="/programs" className="!rounded-full">
              View full gallery <ArrowUpRight className="size-4" />
            </Button>
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.slice(10, 14).map((g) => (
              <StaggerItem key={g.src}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-navy)] ring-1 ring-amber/20">
                  <Image src={g.src} alt={g.caption} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-white">{g.caption}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Testimonials />

      {/* LEAVE A REVIEW */}
      <section className="container-prime py-20 sm:py-24">
        <Reveal className="overflow-hidden rounded-3xl border border-mist shadow-[var(--shadow-navy)] lg:grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative bg-navy-deep bg-grid p-9 text-white sm:p-11">
            <div className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full bg-amber/15 blur-3xl" />
            <span className="relative mb-4 block h-1 w-10 rounded-full bg-amber" />
            <p className="eyebrow !text-blue-soft">Share your experience</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white">Leave a review</h2>
            <p className="mt-4 text-steel-light">
              Trained with Prime HR Academy? We&apos;d love to hear from you. Approved reviews appear on our website.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-5 fill-amber text-amber" />
                ))}
              </div>
              <span className="text-sm text-steel">Loved by HR teams across Malaysia</span>
            </div>
          </div>
          <div className="bg-white p-7 sm:p-9">
            <ReviewForm bare />
          </div>
        </Reveal>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="bg-pearl py-20 sm:py-24">
        <div className="container-prime">
          <div className="grid items-end gap-6 lg:grid-cols-2">
            <SectionHeading eyebrow="Industries we serve" title="Built for the sectors that need it most" />
            <p className="text-slate lg:pb-2">From factory floors to corporate offices — Prime HR delivers training and consultancy across Malaysia's most demanding industries.</p>
          </div>
          <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {industries.map((ind, i) => {
              const isAmber = i % 2 === 0;
              return (
                <StaggerItem key={ind.label}>
                  <div className={`group flex flex-col items-center gap-3 rounded-2xl border border-mist bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-navy)] ${isAmber ? "hover:border-amber/40" : "hover:border-teal/40"}`}>
                    <span className={`flex size-12 items-center justify-center rounded-xl transition-colors ${isAmber ? "bg-amber-soft text-amber-deep group-hover:bg-amber group-hover:text-navy" : "bg-teal-soft text-teal-deep group-hover:bg-teal group-hover:text-white"}`}>
                      <ind.icon className="size-6" />
                    </span>
                    <p className="text-sm font-semibold text-navy">{ind.label}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-prime py-16 sm:py-20">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy-deep bg-grid px-7 py-12 sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-amber/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 size-60 rounded-full bg-blue/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="mb-5 block h-1 w-12 rounded-full bg-amber" />
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to train your team or strengthen compliance?</h2>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-steel-light">
                {["HRD Corp claimable", "In-house · Public · Online", "Response within 24 hours"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><Check className="size-4 text-amber" /> {b}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href={whatsappLink("Hi Prime HR Academy, I'd like to enquire about your HRD Corp claimable training.")} external variant="whatsapp" size="lg">
                <MessageCircle className="size-5" /> Contact on WhatsApp
              </Button>
              <Button href="/contact" variant="amber" size="lg">Send an enquiry</Button>
            </div>
          </div>
          <p className="relative mt-6 text-xs text-steel">Or call us at {SITE.phone}</p>
        </Reveal>
      </section>
    </>
  );
}
