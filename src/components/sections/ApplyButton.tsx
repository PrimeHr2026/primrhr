"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, FileText, CheckCircle2, AlertCircle } from "lucide-react";

const formats = ["In-house", "Public", "Online", "Not sure yet"];
const fieldClass =
  "h-11 w-full rounded-xl border border-mist bg-pearl px-4 text-sm text-navy placeholder:text-slate/70 outline-none focus:border-navy focus:bg-white";

export function ApplyButton({ serviceName }: { serviceName: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 200);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      service: serviceName,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      company: fd.get("company"),
      participants: fd.get("participants"),
      format: fd.get("format"),
      timeline: fd.get("timeline"),
      message: fd.get("message"),
    };
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not submit your application.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-navy-deep/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={close}
    >
      <div
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-7 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-deep">Apply</p>
            <h3 className="mt-1 text-xl font-bold text-navy">{serviceName}</h3>
          </div>
          <button onClick={close} aria-label="Close" className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate hover:bg-pearl">
            <X className="size-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="size-14 text-whatsapp" />
            <h4 className="mt-4 text-xl font-bold text-navy">Application received</h4>
            <p className="mt-2 max-w-sm text-sm text-slate">
              Thank you — our team will review your request and reach out within one business day.
            </p>
            <button onClick={close} className="mt-6 h-11 rounded-xl bg-navy px-6 font-semibold text-white hover:bg-navy-soft">Done</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <p className="text-sm text-slate">Tell us about your needs and we&apos;ll get back to you with a tailored, HRD Corp claimable proposal.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Full name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone / WhatsApp" type="tel" required />
              <Field name="company" label="Company" />
              <Field name="participants" label="No. of participants" />
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy">Preferred format</label>
                <select name="format" className={fieldClass}>
                  {formats.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
            <Field name="timeline" label="Preferred timeline / dates" />
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">Your requirements</label>
              <textarea name="message" rows={3} placeholder="Goals, topics, team background…" className="w-full rounded-xl border border-mist bg-pearl px-4 py-3 text-sm text-navy placeholder:text-slate/70 outline-none focus:border-navy focus:bg-white" />
            </div>

            {status === "error" && (
              <p className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="size-4 shrink-0" /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="h-12 w-full rounded-xl bg-amber font-bold text-navy transition-colors hover:bg-amber-deep hover:text-white disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-amber bg-amber/10 font-bold text-amber-deep transition-colors hover:bg-amber hover:text-navy"
      >
        <FileText className="size-4" /> Apply for this service
      </button>

      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-amber-deep">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-xl border border-mist bg-pearl px-4 text-sm text-navy placeholder:text-slate/70 outline-none focus:border-navy focus:bg-white"
      />
    </div>
  );
}
