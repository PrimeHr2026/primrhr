import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: { name: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep bg-grid text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-navy-soft/40 blur-3xl" />
      <div className="container-prime relative py-16 sm:py-20">
        <nav className="flex items-center gap-1.5 text-xs text-steel">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          {crumbs.map((c) => (
            <span key={c.href} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" />
              <Link href={c.href} className="hover:text-white transition-colors">{c.name}</Link>
            </span>
          ))}
        </nav>
        {eyebrow && (
          <div className="mt-6 flex items-center gap-3">
            <span className="h-0.5 w-6 rounded-full bg-amber" />
            <span className="eyebrow !text-blue-soft">{eyebrow}</span>
          </div>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-light">{intro}</p>}
      </div>
    </section>
  );
}
