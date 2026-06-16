import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Design System (internal)",
  robots: { index: false, follow: false },
};

const swatches = [
  ["navy", "#14276B", "Primary"],
  ["navy-deep", "#060E3A", "Deepest / footer"],
  ["navy-soft", "#24408C", "Hover"],
  ["blue", "#2E5BC0", "Azure accent"],
  ["blue-soft", "#5A86D6", "Light accent"],
  ["steel", "#9AA7C2", "Metallic"],
  ["steel-light", "#E6EAF2", "Silver wash"],
  ["ink", "#0F172A", "Body text"],
  ["slate", "#475569", "Secondary text"],
  ["mist", "#E2E8F0", "Borders"],
  ["pearl", "#F6F8FC", "Section bg"],
  ["whatsapp", "#25D366", "WhatsApp"],
];

export default function DesignSystem() {
  return (
    <main className="container-prime py-16 space-y-16">
      <header className="space-y-3">
        <p className="eyebrow">Internal · delete before launch</p>
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Prime HR — Design System
        </h1>
        <p className="text-slate max-w-[60ch]">
          Navy + metallic chrome/steel + azure. No yellow. Tokens are the source
          of truth.
        </p>
      </header>

      {/* Logo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Logo</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="rounded-2xl border border-mist bg-white p-8">
            <Image src="/brand/primehr-logo.png" alt="Prime HR Academy Malaysia" width={260} height={101} />
          </div>
          <div className="rounded-2xl bg-navy-deep p-8 bg-grid">
            <Image src="/brand/primehr-logo-trans.png" alt="Prime HR on dark" width={260} height={101} />
          </div>
          <div className="rounded-2xl border border-mist bg-white p-8">
            <Image src="/brand/hrdcorp.png" alt="HRD Corp" width={150} height={51} />
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Colour tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {swatches.map(([name, hex, role]) => (
            <div key={name} className="rounded-xl overflow-hidden border border-mist">
              <div className="h-20" style={{ background: hex }} />
              <div className="p-3 bg-white">
                <p className="font-semibold text-sm text-navy">{name}</p>
                <p className="text-xs text-slate">{hex}</p>
                <p className="text-2xs text-slate mt-1">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Typography</h2>
        <div className="space-y-3 rounded-2xl border border-mist bg-white p-8">
          <p className="eyebrow">Eyebrow · Inter 600</p>
          <h1 className="text-5xl md:text-6xl font-black">
            Transforming <span className="text-chrome bg-navy-deep px-2 rounded">Talent</span>
          </h1>
          <h2 className="text-3xl font-extrabold">Heading — Montserrat 800</h2>
          <p className="font-[family-name:var(--font-fraunces)] italic text-2xl text-navy-soft">
            “Transforming Talent Into Organizational Success.”
          </p>
          <p className="text-slate max-w-[65ch] leading-relaxed">
            Body — Inter 400. Prime HR Academy Malaysia is a professional
            training, consultancy and organizational development company,
            HRD Corp accredited, helping organizations build competent,
            future-ready workforces.
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4 rounded-2xl border border-mist bg-white p-8">
          <Button variant="primary">Enquire now</Button>
          <Button variant="secondary">View programs</Button>
          <Button variant="ghost">Learn more</Button>
          <Button variant="whatsapp" href={whatsappLink("Hi Prime HR")} external>
            WhatsApp us
          </Button>
        </div>
      </section>

      {/* Cards + gallery sample */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Cards &amp; imagery</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 7, 12, 20].map((n) => (
            <figure
              key={n}
              className="group rounded-2xl overflow-hidden border border-mist bg-white transition-shadow hover:shadow-[var(--shadow-navy)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`/gallery/gallery-${String(n).padStart(2, "0")}.jpg`}
                  alt="Training session"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" />
              </div>
              <figcaption className="p-4 text-sm font-medium text-navy">
                Training in action
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Dark band */}
      <section className="rounded-3xl bg-navy-deep bg-grid p-10 text-white">
        <p className="eyebrow !text-blue-soft">Dark section</p>
        <h2 className="text-3xl font-extrabold text-white mt-2">
          <span className="text-chrome">Chrome</span> on navy with steel hairline
        </h2>
        <div className="hairline my-6 max-w-xs" />
        <p className="text-steel-light max-w-[60ch]">
          Dark bands use navy-deep with a subtle grid. Steel and azure accents
          pop here. Stat numbers can take the chrome gradient.
        </p>
      </section>
    </main>
  );
}
