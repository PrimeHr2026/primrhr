import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { SITE, NAV, whatsappLink } from "@/lib/site";
import { serviceCategories } from "@/data/services";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="relative mt-auto bg-navy-deep bg-grid text-steel-light">
      <div className="h-px bg-gradient-to-r from-transparent via-steel to-transparent" />
      <div className="container-prime grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div>
          <div className="font-[family-name:var(--font-montserrat)] leading-none">
            <span className="block text-2xl font-black tracking-tight text-chrome">PRIME HR</span>
            <span className="mt-1 block text-sm font-bold tracking-[0.2em] text-steel">ACADEMY MALAYSIA</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel">
            {SITE.tagline} An HRD Corp accredited training, consultancy and organizational development company.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
            <Image src="/brand/hrdcorp.png" alt="HRD Corp accredited" width={96} height={32} className="h-7 w-auto opacity-95" />
            <span className="text-xs text-steel">Accredited Provider</span>
          </div>
        </div>

        {/* Quick links */}
        <nav>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-steel transition-colors hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/services/${c.slug}`} className="text-steel transition-colors hover:text-white">{c.shortTitle}</Link>
              </li>
            ))}
            <li><Link href="/programs" className="text-steel transition-colors hover:text-white">Programs &amp; Gallery</Link></li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-blue-soft" />
              <span className="text-steel">{SITE.address.line1}, {SITE.address.line2}, {SITE.address.postcode} {SITE.address.city}, {SITE.address.state}</span>
            </li>
            <li>
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-3 text-steel hover:text-white transition-colors">
                <Phone className="size-4 text-blue-soft" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-steel hover:text-white transition-colors">
                <Mail className="size-4 text-blue-soft" /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink("Hi Prime HR Academy")} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 rounded-lg bg-whatsapp/90 px-3.5 py-2 font-semibold text-white hover:bg-whatsapp transition-colors">
                <MessageCircle className="size-4" /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-prime flex flex-col items-center justify-between gap-3 py-6 text-xs text-steel md:flex-row">
          <p>© {year} {SITE.name}. All rights reserved. · HRD Corp Reg. {SITE.hrdCorpRegNo}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>Built by Aurexis Solution</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
