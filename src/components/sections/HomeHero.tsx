"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BadgeCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const heroStats = [
  { v: "30+", l: "HRD Corp Programmes", c: "text-amber" },
  { v: "4", l: "Core Service Pillars", c: "text-teal" },
  { v: "200+", l: "Organizations Trained", c: "text-amber" },
];

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-deep text-white lg:flex lg:h-[calc(100vh-6rem)] lg:min-h-[600px] lg:flex-col">
      {/* Right-side photo */}
      <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <Image src="/gallery/gallery-23.jpg" alt="Prime HR Academy training in session" fill priority className="object-cover" sizes="55vw" />
      </motion.div>
      {/* Overlays: dark left → reveal photo right */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy-deep/30 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-1/4 size-96 rounded-full bg-blue/20 blur-3xl" />

      <div className="container-prime relative flex w-full flex-col lg:h-full">
        <div className="grid flex-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-6">
          {/* Left */}
          <div className="max-w-2xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-steel-light backdrop-blur"
            >
              <BadgeCheck className="size-4 text-amber" />
              HRD CORP ACCREDITED TRAINING PROVIDER
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.08 }}
              className="mt-5 text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
            >
              Transforming Talent Into{" "}
              <span className="relative whitespace-nowrap text-amber">
                Organizational
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded bg-amber/40" />
              </span>{" "}
              Success
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.16 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-steel-light lg:text-lg"
            >
              HRD Corp claimable HR, leadership and compliance training and consultancy —
              led by master trainer Ram.G, with 20+ years developing Malaysia&apos;s workforce.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.24 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/contact" variant="amber" size="lg">
                Send an enquiry <ArrowRight className="size-5" />
              </Button>
              <Button href="/programs" variant="secondary" size="lg" className="!border-white/25 !text-white hover:!bg-white/5">
                Explore programs
              </Button>
            </motion.div>
          </div>

          {/* Right — "your partner" glass card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="lg:justify-self-end"
          >
            <div className="max-w-sm rounded-3xl border border-white/15 bg-navy-deep/70 p-7 shadow-2xl backdrop-blur-xl">
              <ShieldCheck className="size-9 text-teal" />
              <h2 className="mt-4 text-xl font-bold text-white">Your partner for training &amp; consultancy</h2>
              <p className="mt-3 text-sm leading-relaxed text-steel-light">
                From HR advisory and certification to compliance and leadership — we deliver
                structured, HRD Corp claimable solutions and handle the paperwork end-to-end.
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <Image src="/brand/hrdcorp.png" alt="HRD Corp accredited" width={96} height={32} className="h-7 w-auto rounded bg-white/90 px-1.5 py-1" />
                <span className="text-xs text-steel">Accredited Training Provider · Reg. 202303233220</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Inline stat bar */}
        <div className="relative grid grid-cols-3 gap-4 border-t border-white/10 py-5 lg:py-6">
          {heroStats.map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <p className={`font-[family-name:var(--font-montserrat)] text-2xl font-black sm:text-3xl ${s.c}`}>{s.v}</p>
              <p className="mt-0.5 text-xs text-steel sm:text-sm">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
