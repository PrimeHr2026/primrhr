"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const SESSION_KEY = "primehr_promo_popup_shown";
const SHOW_DELAY_MS = 700;

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-white shadow-[var(--shadow-navy-lg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-navy-deep/70 text-white backdrop-blur transition-colors hover:bg-navy-deep"
            >
              <X className="size-5" />
            </button>

            <div className="relative aspect-[2/3] w-full">
              <Image
                src="/promo/poster-people.png"
                alt="Prime HR Academy Malaysia — Building People, Stronger Organisations"
                fill
                priority
                className="object-cover"
                sizes="(max-width:640px) 100vw, 384px"
              />
            </div>

            <div className="flex flex-col gap-2.5 p-5 sm:flex-row">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-amber-deep hover:text-white"
              >
                Send an enquiry <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappLink("Hi Prime HR Academy, I'd like to know more about your training programmes.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-bold text-white transition-colors hover:brightness-95"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
