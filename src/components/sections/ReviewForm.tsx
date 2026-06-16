"use client";

import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { clsx } from "@/lib/clsx";

export function ReviewForm({ bare = false }: { bare?: boolean }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      position: fd.get("position"),
      company: fd.get("company"),
      rating,
      review: fd.get("review"),
    };
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not submit your review.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-mist bg-white p-8 text-center">
        <CheckCircle2 className="size-12 text-whatsapp" />
        <h3 className="mt-4 text-xl font-bold text-navy">Thank you!</h3>
        <p className="mt-2 text-sm text-slate">Your review has been submitted and will appear once approved.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={bare ? "" : "rounded-2xl border border-mist bg-white p-7"}>
      <div className="grid gap-4 sm:grid-cols-3">
        <input name="name" required placeholder="Your name *" className="h-11 rounded-xl border border-mist bg-pearl px-4 text-sm outline-none focus:border-navy focus:bg-white" />
        <input name="position" placeholder="Position" className="h-11 rounded-xl border border-mist bg-pearl px-4 text-sm outline-none focus:border-navy focus:bg-white" />
        <input name="company" placeholder="Company" className="h-11 rounded-xl border border-mist bg-pearl px-4 text-sm outline-none focus:border-navy focus:bg-white" />
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        <span className="mr-2 text-sm font-semibold text-navy">Rating:</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <button key={i} type="button" onClick={() => setRating(i + 1)} onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} aria-label={`${i + 1} stars`}>
            <Star className={clsx("size-6 transition-colors", (hover || rating) > i ? "fill-blue text-blue" : "text-mist")} />
          </button>
        ))}
      </div>
      <textarea name="review" required rows={3} placeholder="Share your experience *" className="mt-4 w-full rounded-xl border border-mist bg-pearl px-4 py-3 text-sm outline-none focus:border-navy focus:bg-white" />
      {status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-navy px-7 text-sm font-semibold text-white transition-colors hover:bg-navy-soft disabled:opacity-60">
        {status === "submitting" ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
