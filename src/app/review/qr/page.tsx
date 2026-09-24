import Image from "next/image";
import type { Metadata } from "next";
import { Star, Download, ScanLine, PencilLine, Send, Phone, Globe, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Review QR Code",
  description: "Scan to leave an honest review for Prime HR Academy Malaysia.",
  robots: { index: false, follow: false },
};

const steps = [
  { icon: ScanLine, title: "Scan", text: "Point your phone camera at the QR code" },
  { icon: PencilLine, title: "Write", text: "Fill in the review form on our website" },
  { icon: Send, title: "Submit", text: "Done in under a minute" },
];

const host = SITE.url.replace(/^https?:\/\/(www\.)?/, "");

export default function ReviewQrPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep bg-grid text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-blue/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-[32rem] rounded-full bg-amber/[0.14] blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[26rem] -translate-x-1/2 rounded-full bg-teal/[0.08] blur-[130px]" />

      {/* Top bar */}
      <header className="relative flex flex-wrap items-center justify-between gap-4 px-6 pt-6 sm:px-10 sm:pt-8 lg:px-16">
        <div className="rounded-2xl bg-white px-5 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          <Image src="/brand/primehr-logo.png" alt="Prime HR Academy Malaysia" width={604} height={235} className="h-14 w-auto sm:h-16" priority />
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-2 pr-4 backdrop-blur">
          <Image src="/brand/hrdcorp.png" alt="HRD Corp" width={96} height={32} className="h-7 w-auto rounded bg-white/90 px-1.5 py-1" />
          <span className="text-xs font-semibold tracking-wide text-steel-light">HRD Corp Accredited Training Provider</span>
        </div>
      </header>

      {/* Main */}
      <section className="relative grid flex-1 items-center gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-16">
        <div>
          <span className="block h-1 w-14 rounded-full bg-amber" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-blue-soft">We value your voice</p>
          <h1 className="mt-4 text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Leave us an <span className="relative whitespace-nowrap text-amber">honest<span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-amber/40" /></span> review
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-7 fill-amber text-amber sm:size-8" />
              ))}
            </div>
            <span className="text-sm text-steel">Loved by HR teams across Malaysia</span>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-light sm:text-xl">
            Trained with Prime HR Academy? Your feedback helps us keep improving — and helps other
            organizations choose the right training partner.
          </p>

          <ul className="mt-9 grid max-w-2xl gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-amber/15 text-amber">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-[family-name:var(--font-montserrat)] text-3xl font-black text-white/15">0{i + 1}</span>
                </div>
                <p className="mt-4 font-bold text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-steel">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* QR */}
        <div className="flex flex-col items-center">
          <div className="relative rounded-[2rem] bg-white p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] sm:p-8">
            <span className="absolute left-3 top-3 size-8 rounded-tl-2xl border-l-4 border-t-4 border-amber" />
            <span className="absolute right-3 top-3 size-8 rounded-tr-2xl border-r-4 border-t-4 border-amber" />
            <span className="absolute bottom-3 left-3 size-8 rounded-bl-2xl border-b-4 border-l-4 border-amber" />
            <span className="absolute bottom-3 right-3 size-8 rounded-br-2xl border-b-4 border-r-4 border-amber" />
            {/* Static QR asset; the image optimizer adds nothing here */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/review/review-qr.png" alt={`QR code linking to the review section at ${host}`} width={1320} height={1320} className="size-64 sm:size-80 xl:size-96" />
          </div>
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.22em] text-steel-light">Scan to leave a review</p>
          <p className="mt-2 rounded-full bg-white/10 px-6 py-2.5 text-lg font-extrabold text-white ring-1 ring-white/15 sm:text-xl">{host}</p>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="relative border-t border-white/10 bg-navy-deep/60 px-6 py-5 backdrop-blur sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm text-steel-light">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <span className="inline-flex items-center gap-2"><Phone className="size-4 text-amber" /> {SITE.phone}</span>
            <span className="inline-flex items-center gap-2"><Globe className="size-4 text-amber" /> {host}</span>
            <span className="inline-flex items-center gap-2"><Mail className="size-4 text-amber" /> {SITE.email}</span>
          </div>
          <span className="font-bold uppercase tracking-[0.2em] text-white/80">Inspire <span className="text-amber">•</span> Empower <span className="text-amber">•</span> Transform</span>
        </div>
      </footer>

      {/* Download helpers — faint until hovered so they stay out of screenshots */}
      <div className="absolute bottom-20 right-4 z-10 flex gap-2 opacity-0 transition-opacity hover:opacity-100 focus-within:opacity-100 print:hidden sm:right-6">
        <a href="/review/review-qr.png" download className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-navy shadow-lg">
          <Download className="size-3.5" /> PNG
        </a>
        <a href="/review/review-qr.svg" download className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-navy shadow-lg">
          <Download className="size-3.5" /> SVG
        </a>
      </div>
    </main>
  );
}
