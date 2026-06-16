"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { catalog } from "@/data/programs";
import { clsx } from "@/lib/clsx";

export function ProgramCatalog() {
  const [active, setActive] = useState(catalog[0].id);
  const current = catalog.find((c) => c.id === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {catalog.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              active === c.id ? "bg-navy text-white" : "border border-mist bg-white text-slate hover:border-navy/30 hover:text-navy",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {current.programmes.map((p) => (
            <div key={p.title} className="rounded-2xl border border-mist bg-white p-6 transition-shadow hover:shadow-[var(--shadow-navy)]">
              <h3 className="font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{p.description}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
