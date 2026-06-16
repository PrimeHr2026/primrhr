import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SITE, whatsappLink } from "@/lib/site";

export function CtaBand({
  title = "Let's build success together",
  text = "Ready to develop your people? Tell us your goals and we'll design an HRD Corp claimable program around them.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {/* Background image */}
      <Image src="/brand/kl-night.jpg" alt="" fill className="object-cover opacity-40" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/88 to-navy-deep/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/40" />
      <div className="absolute inset-0 bg-grid opacity-[0.1]" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-amber/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-teal/12 blur-[120px]" />

      <div className="container-prime relative py-14 sm:py-16">
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <span className="mb-5 block h-1 w-12 rounded-full bg-amber" />
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-steel-light">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="amber" size="lg">Enquire now</Button>
            <Button href={whatsappLink("Hi Prime HR Academy")} external variant="whatsapp" size="lg">
              <MessageCircle className="size-5" /> WhatsApp
            </Button>
            <a href={`tel:${SITE.phoneRaw}`} className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 font-semibold text-white transition-colors hover:bg-white/5">
              <Phone className="size-5" /> Call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
