"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { NAV, SITE, whatsappLink } from "@/lib/site";
import { serviceCategories } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="hidden bg-amber text-navy md:block">
        <div className="container-prime flex h-8 items-center justify-between text-xs font-medium">
          <p className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-navy" />
            HRD Corp Accredited Training Provider · Malaysia
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
              <Phone className="size-3.5" /> {SITE.phone}
            </a>
            <a href={whatsappLink(`Hi Prime HR Academy, I'd like to enquire about your training programs.`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
              <MessageCircle className="size-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={clsx(
          "border-b transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-mist shadow-[0_8px_30px_-18px_rgba(6,14,58,0.35)]"
            : "bg-white border-transparent",
        )}
      >
        <div className="container-prime flex items-center justify-between" style={{ height: scrolled ? 54 : 64 }}>
          <Link href="/" className="flex items-center" aria-label={SITE.name}>
            <Image
              src="/brand/primehr-logo.png"
              alt={SITE.name}
              width={170}
              height={66}
              priority
              className={clsx("w-auto transition-all duration-300", scrolled ? "h-8" : "h-9")}
            />
          </Link>

          {/* Desktop nav — bubble pill */}
          <nav className="hidden items-center gap-0.5 rounded-full bg-navy p-1 shadow-[0_10px_30px_-16px_rgba(6,14,58,0.6)] lg:flex">
            {NAV.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href="/services"
                    className={clsx(
                      "flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                      pathname.startsWith("/services")
                        ? "bg-white text-navy shadow-sm"
                        : "text-steel-light hover:bg-white/10 hover:text-white",
                    )}
                  >
                    Services
                    <ChevronDown className={clsx("size-4 transition-transform", servicesOpen && "rotate-180")} />
                  </Link>
                  <AnimatedDropdown open={servicesOpen} />
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                    pathname === item.href
                      ? "bg-white text-navy shadow-sm"
                      : "text-steel-light hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/contact" size="sm" variant="amber" className="!rounded-full">Enquire now</Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="inline-flex size-11 items-center justify-center rounded-lg text-navy lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {/* Scroll progress */}
        <motion.div className="h-0.5 origin-left bg-gradient-to-r from-teal via-blue to-amber" style={{ scaleX: progress }} />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[54px] bottom-0 z-40 overflow-y-auto bg-white lg:hidden">
          <nav className="container-prime flex flex-col gap-1 py-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-mist py-3.5 text-lg font-semibold text-navy"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {serviceCategories.map((c) => (
                <Link key={c.slug} href={`/services/${c.slug}`} className="rounded-lg bg-pearl px-3 py-2.5 text-sm font-medium text-slate">
                  {c.shortTitle}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/contact" size="lg">Enquire now</Button>
              <Button href={whatsappLink("Hi Prime HR Academy")} external variant="whatsapp" size="lg">
                <MessageCircle className="size-5" /> WhatsApp us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function AnimatedDropdown({ open }: { open: boolean }) {
  return (
    <div
      className={clsx(
        "absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3 transition-all duration-200",
        open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1",
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-mist bg-white p-2 shadow-[var(--shadow-navy-lg)]">
        <div className="grid grid-cols-2 gap-1">
          {serviceCategories.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.slug} href={`/services/${c.slug}`} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-pearl">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-navy/[0.06] text-navy group-hover:bg-blue group-hover:text-white transition-colors">
                  <Icon className="size-4.5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy">{c.shortTitle}</span>
                  <span className="mt-0.5 block text-xs text-slate leading-snug">{c.tagline}</span>
                </span>
              </Link>
            );
          })}
        </div>
        <Link href="/services" className="mt-1 block rounded-xl bg-navy-deep px-4 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors">
          View all services →
        </Link>
      </div>
    </div>
  );
}
