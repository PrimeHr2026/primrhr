import Image from "next/image";
import { clientLogos } from "@/data/site-content";

export function ClientMarquee({ label = "Trusted by organizations across Malaysia" }: { label?: string }) {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="border-y border-mist bg-white py-9">
      <p className="container-prime mb-8 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate">
        {label}
      </p>
      <div className="marquee-mask overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center gap-12 sm:gap-16"
          style={{ ["--marquee-duration" as string]: "44s" }}
        >
          {row.map((c, i) => (
            <Image
              key={i}
              src={c.src}
              alt={c.name}
              width={c.w}
              height={150}
              className="h-8 w-auto shrink-0 object-contain transition-transform duration-300 hover:scale-105 sm:h-9"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
