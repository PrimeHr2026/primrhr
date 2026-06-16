import { clients } from "@/data/site-content";

export function ClientMarquee({ label = "Trusted by organizations across Malaysia" }: { label?: string }) {
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-mist bg-pearl py-8">
      <p className="container-prime mb-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate">
        {label}
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12" style={{ ["--marquee-duration" as string]: "42s" }}>
          {row.map((c, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-[family-name:var(--font-montserrat)] text-xl font-bold text-navy/35 transition-colors hover:text-navy/70"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
