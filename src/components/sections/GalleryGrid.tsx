"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery, galleryCategories } from "@/data/gallery";
import { clsx } from "@/lib/clsx";

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const items = gallery.filter((g) => filter === "All" || g.category === filter);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % items.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, items.length]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setActive(null);
            }}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === cat ? "bg-navy text-white" : "border border-mist bg-white text-slate hover:border-navy/30 hover:text-navy",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Uniform grid */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-mist transition-shadow hover:shadow-[var(--shadow-navy)]"
          >
            <Image
              src={g.src}
              alt={g.caption}
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-3 text-left text-xs font-semibold text-white">
              {g.caption}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && items[active] && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur" onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setActive(null)} aria-label="Close">
            <X className="size-6" />
          </button>
          <button className="absolute left-3 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8" onClick={(e) => { e.stopPropagation(); setActive((a) => (a! - 1 + items.length) % items.length); }} aria-label="Previous">
            <ChevronLeft className="size-6" />
          </button>
          <figure className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={items[active].src} alt={items[active].caption} width={items[active].w} height={items[active].h} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-steel-light">{items[active].caption}</figcaption>
          </figure>
          <button className="absolute right-3 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8" onClick={(e) => { e.stopPropagation(); setActive((a) => (a! + 1) % items.length); }} aria-label="Next">
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}
