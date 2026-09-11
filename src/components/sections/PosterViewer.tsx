"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { clsx } from "@/lib/clsx";

export function PosterViewer({
  src,
  alt,
  w,
  h,
  className,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

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
    <>
      <button
        onClick={() => setOpen(true)}
        className={clsx(
          "group relative block w-full overflow-hidden rounded-3xl ring-1 ring-mist transition-shadow hover:shadow-[var(--shadow-navy)]",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
          sizes="(max-width:1024px) 100vw, 480px"
        />
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-navy shadow-lg">
            <ZoomIn className="size-3.5" /> Click to enlarge
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X className="size-6" />
          </button>
          <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            className="max-h-[90vh] w-auto rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
