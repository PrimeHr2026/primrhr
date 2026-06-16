"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { seedTestimonials, type Testimonial } from "@/data/testimonials";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

function Stars({ n = 5, size = "size-3.5" }: { n?: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, s) => (
        <Star key={s} className={`${size} ${s < n ? "fill-amber text-amber" : "text-white/15"}`} />
      ))}
    </div>
  );
}

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const ring = i % 2 === 0 ? "ring-amber/40" : "ring-teal/40";
  return (
    // Outer shell (double-bezel)
    <div className="group h-full rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:ring-white/20">
      {/* Inner core */}
      <figure className="relative flex h-full flex-col rounded-[1.4rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] sm:p-8">
        <div className="flex items-center justify-between">
          <Stars n={t.rating} />
          <span className="font-[family-name:var(--font-fraunces)] text-5xl leading-none text-white/10">”</span>
        </div>

        <blockquote className="mt-5 flex-1 font-[family-name:var(--font-fraunces)] text-[1.3rem] italic leading-snug text-white/95">
          {t.review}
        </blockquote>

        <figcaption className="mt-8 flex items-center gap-3.5 border-t border-white/[0.08] pt-5">
          <span className={`grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-white/20 to-white/5 font-[family-name:var(--font-montserrat)] text-sm font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ${ring}`}>
            {t.name.charAt(0).toUpperCase()}
          </span>
          <span>
            <span className="block font-semibold tracking-tight text-white">{t.name}</span>
            <span className="block text-sm text-steel">{[t.position, t.company].filter(Boolean).join(" · ")}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(seedTestimonials);

  useEffect(() => {
    let active = true;
    fetch("/api/reviews?approved=1")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // MEDSS behaviour: static grid up to 5 reviews, infinite marquee once there are more.
  const isMarquee = items.length > 5;

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white sm:py-28">
      {/* Ambient glowing orbs */}
      <div className="pointer-events-none absolute -left-40 top-0 size-[34rem] rounded-full bg-blue/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-amber/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[26rem] -translate-x-1/2 rounded-full bg-teal/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />

      <div className="container-prime relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-light">
            <span className="size-1.5 rounded-full bg-amber" /> Client feedback
          </span>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Trusted by organizations across Malaysia
          </h2>
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <Stars size="size-4" />
            <span className="text-sm text-steel-light">
              <b className="font-semibold text-white">5.0</b> · from HR teams across 200+ organizations
            </span>
          </div>
        </div>
      </div>

      {isMarquee ? (
        <div className="marquee-mask relative mt-16 overflow-hidden">
          <div
            className="animate-marquee flex w-max gap-6 px-6 hover:[animation-play-state:paused]"
            style={{ ["--marquee-duration" as string]: `${Math.max(items.length * 6, 36)}s` }}
          >
            {[...items, ...items].map((t, i) => (
              <div key={i} className="flex w-[340px] shrink-0 sm:w-[380px]">
                <TestimonialCard t={t} i={i % items.length} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container-prime relative">
          <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 6).map((t, i) => (
              <StaggerItem key={i} className="h-full">
                <TestimonialCard t={t} i={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}
    </section>
  );
}
