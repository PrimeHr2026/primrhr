import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle, Phone, Mail, MapPin, Clock, Globe, ChevronRight, ArrowUpRight,
  ClipboardList, PhoneCall, FileCheck2, Navigation,
} from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE, whatsappLink } from "@/lib/site";
import { faqs } from "@/data/faqs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Enquire About HRD Corp Claimable Training",
  description:
    "Get in touch with Prime HR Academy Malaysia. Enquire about HRD Corp claimable training and consultancy, or WhatsApp us directly. Based in Subang Jaya, Selangor.",
  alternates: { canonical: "/contact" },
};

const fullAddress = `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.postcode} ${SITE.address.city}, ${SITE.address.state}`;
const mapsQuery = encodeURIComponent(fullAddress);
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: SITE.phone, href: whatsappLink("Hi Prime HR Academy") },
  { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
];

const steps = [
  { n: "01", icon: ClipboardList, title: "Submit your enquiry", text: "Fill in the form with your requirement, service area and contact details." },
  { n: "02", icon: PhoneCall, title: "We review & call back", text: "A Prime HR consultant reviews your needs and contacts you within one business day." },
  { n: "03", icon: FileCheck2, title: "We propose a solution", text: "We tailor an HRD Corp claimable training or consultancy proposal to your needs." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
          faqSchema(faqs),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-blue/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-amber/[0.08] blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="container-prime relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-steel">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="font-semibold text-amber">Contact</span>
            </nav>
            <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s work together.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-light">
              Send an enquiry about HRD Corp claimable training, consultancy or workplace
              compliance support. We respond within one business day.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2 text-sm font-bold text-navy">
              <span className="size-1.5 rounded-full bg-navy" /> Responds within one business day
            </span>
          </div>

          {/* Reach us directly card */}
          <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-1.5 ring-1 ring-white/10">
            <div className="rounded-[1.4rem] bg-white/[0.03] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-steel">Reach us directly</p>
              <div className="mt-5 space-y-2.5">
                {channels.map((c) => {
                  const Icon = c.icon;
                  const ext = c.href.startsWith("http");
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-amber/40 hover:bg-white/[0.06]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber">
                        <Icon className="size-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-steel">{c.label}</span>
                        <span className="block text-sm font-semibold text-white">{c.value}</span>
                      </span>
                      <ArrowUpRight className="size-4 text-steel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS BAND — light orange */}
      <section className="bg-[#FDECD6]">
        <div className="container-prime grid gap-8 py-12 sm:py-14 md:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="flex gap-4">
                <span className="font-[family-name:var(--font-montserrat)] text-3xl font-black text-amber-deep">{s.n}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-amber-deep" />
                    <h3 className="font-bold text-navy">{s.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/70">{s.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="container-prime py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Send an enquiry</h2>
            <p className="mt-2 text-slate">Fill in the form below and a Prime HR consultant will be in touch within one business day.</p>
            <div className="mt-8"><ContactForm /></div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-7">
            <a href={whatsappLink("Hi Prime HR Academy")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-navy-deep p-5 text-white transition-transform hover:-translate-y-0.5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-whatsapp text-white"><MessageCircle className="size-6" /></span>
              <span>
                <span className="block font-bold">Chat on WhatsApp</span>
                <span className="block text-sm text-steel-light">Fastest way to reach us</span>
              </span>
            </a>

            <SidebarBlock icon={Phone} label="Phone">
              <a href={`tel:${SITE.phoneRaw}`} className="block font-semibold text-navy hover:text-blue">{SITE.phone}</a>
            </SidebarBlock>

            <SidebarBlock icon={Mail} label="Email">
              <a href={`mailto:${SITE.email}`} className="block font-semibold text-navy hover:text-blue">{SITE.email}</a>
            </SidebarBlock>

            <SidebarBlock icon={Clock} label="Business hours">
              <div className="flex justify-between text-sm text-ink"><span>Mon – Fri</span><span className="font-semibold text-navy">9:00 AM – 6:00 PM</span></div>
              <div className="flex justify-between text-sm text-ink"><span>Saturday</span><span className="text-slate">Closed</span></div>
              <div className="flex justify-between text-sm text-ink"><span>Sunday</span><span className="text-slate">Closed</span></div>
            </SidebarBlock>

            <SidebarBlock icon={MapPin} label="Office address">
              <p className="text-sm leading-relaxed text-ink">
                {SITE.address.line1}<br />{SITE.address.line2}<br />{SITE.address.postcode} {SITE.address.city}, {SITE.address.state}
              </p>
            </SidebarBlock>

            <SidebarBlock icon={Globe} label="Follow & connect">
              <a href={whatsappLink("Hi Prime HR Academy")} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-navy hover:text-blue">WhatsApp · {SITE.phone}</a>
              <a href={SITE.url} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-navy hover:text-blue">www.primehracademy.com</a>
            </SidebarBlock>
          </aside>
        </div>
      </section>

      {/* LOCATION + MAP */}
      <section className="container-prime pb-20 sm:pb-24">
        <div className="grid items-stretch overflow-hidden rounded-3xl border border-mist lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-navy-deep bg-grid p-9 text-white sm:p-11">
            <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-amber/15 blur-2xl" />
            <p className="eyebrow !text-blue-soft">Location</p>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">How to find us</h2>
            <p className="mt-5 font-semibold text-white">{SITE.address.line1}</p>
            <p className="mt-1 text-sm leading-relaxed text-steel-light">
              {SITE.address.line2}<br />{SITE.address.postcode} {SITE.address.city}, {SITE.address.state}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-steel-light">
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-amber" /> Subang Square Business Centre, SS 15</li>
              <li className="flex items-start gap-2.5"><Clock className="mt-0.5 size-4 shrink-0 text-amber" /> Open Mon – Fri, 9:00 AM – 6:00 PM</li>
            </ul>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-amber px-6 font-bold text-navy transition-colors hover:bg-amber-deep hover:text-white">
              <Navigation className="size-4" /> Get directions
            </a>
          </div>
          <div className="min-h-[320px]">
            <iframe
              title="Prime HR Academy location"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-pearl py-20 sm:py-24">
        <div className="container-prime grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Common questions</h2>
            <p className="mt-3 text-slate">Everything you need to know before reaching out.</p>
          </div>
          <div className="divide-y divide-mist">
            {faqs.map((f) => (
              <div key={f.q} className="flex gap-4 py-6 first:pt-0">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-soft text-sm font-black text-amber-deep">Q</span>
                <div>
                  <h3 className="font-bold text-navy">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SidebarBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-mist pt-6 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
        <Icon className="size-4 text-amber-deep" /> {label}
      </div>
      <div className="mt-2.5 space-y-1.5">{children}</div>
    </div>
  );
}
