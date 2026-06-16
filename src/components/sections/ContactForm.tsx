"use client";

import { useActionState } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { ok: false };

const interests = [
  "Consultancy Services",
  "Training & Development",
  "CHRP Certification",
  "Certified Professional Manager",
  "HR & Leadership Diploma",
  "HRD Corp Claimable Training",
  "Other",
];

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-mist bg-white p-10 text-center">
        <CheckCircle2 className="size-14 text-whatsapp" />
        <h3 className="mt-5 text-2xl font-bold text-navy">Message sent</h3>
        <p className="mt-2 max-w-sm text-slate">
          Thank you — we&apos;ve received your enquiry and will get back to you shortly.
          For anything urgent, WhatsApp us anytime.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-3xl border border-mist bg-white p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required error={state.fieldErrors?.name} />
        <Field label="Email" name="email" type="email" required error={state.fieldErrors?.email} />
        <Field label="Phone / WhatsApp" name="phone" type="tel" error={state.fieldErrors?.phone} />
        <Field label="Company" name="company" error={state.fieldErrors?.company} />
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-navy">I'm interested in</label>
        <select name="interest" className="h-12 w-full rounded-xl border border-mist bg-pearl px-4 text-ink outline-none transition-colors focus:border-navy focus:bg-white">
          <option value="">Select an option</option>
          {interests.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-navy">Message <span className="text-blue">*</span></label>
        <textarea name="message" required rows={5} placeholder="Tell us about your team and training goals…" className="w-full rounded-xl border border-mist bg-pearl px-4 py-3 text-ink outline-none transition-colors focus:border-navy focus:bg-white" />
        {state.fieldErrors?.message && <p className="mt-1.5 text-sm text-red-600">{state.fieldErrors.message}</p>}
      </div>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px]" aria-hidden />

      {state.error && (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" /> {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber font-bold text-navy transition-colors hover:bg-amber-deep hover:text-white disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {pending ? "Sending…" : (<>Send enquiry <Send className="size-4" /></>)}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-blue">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="h-12 w-full rounded-xl border border-mist bg-pearl px-4 text-ink outline-none transition-colors focus:border-navy focus:bg-white"
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
