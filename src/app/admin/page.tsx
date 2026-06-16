"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Star, Check, Trash2, LogOut, Eye, EyeOff, MessageCircle, Phone, Mail,
  Users, Clock, Building2, FileText, Inbox, Lock,
} from "lucide-react";

type Review = {
  id: string;
  name: string;
  position?: string;
  company?: string;
  rating: number;
  review: string;
  approved: boolean;
  createdAt: string;
};

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  participants?: string;
  format?: string;
  timeline?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

function waLink(phone: string) {
  let p = phone.replace(/[^\d]/g, "");
  if (p.startsWith("0")) p = "60" + p.slice(1);
  return `https://wa.me/${p}`;
}

const inputClass =
  "h-12 w-full rounded-xl border border-mist bg-pearl px-4 text-navy placeholder:text-slate/70 outline-none transition-colors focus:border-navy focus:bg-white";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"applications" | "reviews">("applications");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [r, a] = await Promise.all([
      fetch("/api/reviews", { cache: "no-store" }).then((x) => x.json()).catch(() => []),
      fetch("/api/applications", { cache: "no-store" }).then((x) => x.json()).catch(() => []),
    ]);
    setReviews(Array.isArray(r) ? r : []);
    setApps(Array.isArray(a) ? a : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setAuthed(Boolean(d.authed))).catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSigningIn(true);
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    setSigningIn(false);
    if (res.ok) setAuthed(true);
    else setError("Invalid email or password.");
  }
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
  }
  async function patchReview(id: string, approved: boolean) {
    await fetch(`/api/reviews/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ approved }) });
    load();
  }
  async function removeReview(id: string) {
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    load();
  }
  async function setAppStatus(id: string, status: Application["status"]) {
    await fetch(`/api/applications/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }
  async function removeApp(id: string) {
    if (!confirm("Delete this application?")) return;
    await fetch(`/api/applications/${id}`, { method: "DELETE" });
    load();
  }

  if (authed === null) {
    return <div className="grid min-h-screen place-items-center bg-navy-deep text-steel">Loading…</div>;
  }

  /* ---------------- LOGIN ---------------- */
  if (!authed) {
    return (
      <div className="relative grid min-h-screen place-items-center overflow-hidden bg-navy-deep p-4">
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-blue/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-amber/[0.1] blur-[130px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.07] blur-[120px]" />

        <div className="relative w-full max-w-sm">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-white px-5 py-3 shadow-lg">
              <Image src="/brand/primehr-logo.png" alt="Prime HR Academy" width={150} height={58} className="h-10 w-auto" priority />
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white/[0.06] p-1.5 ring-1 ring-white/10 shadow-2xl">
            <form onSubmit={login} className="rounded-[1.4rem] bg-white p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-deep">
                <Lock className="size-3" /> Admin
              </span>
              <h1 className="mt-4 text-2xl font-extrabold text-navy">Sign in</h1>
              <p className="mt-1 text-sm text-slate">Manage applications &amp; reviews</p>

              <div className="mt-6 space-y-3">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" autoComplete="username" className={inputClass} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="current-password" className={inputClass} />
              </div>

              {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

              <button type="submit" disabled={signingIn} className="mt-5 h-12 w-full rounded-xl bg-amber font-bold text-navy transition-colors hover:bg-amber-deep hover:text-white disabled:opacity-60">
                {signingIn ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
          <p className="mt-5 text-center text-xs text-steel">Prime HR Academy Malaysia · Secure admin area</p>
        </div>
      </div>
    );
  }

  /* ---------------- DASHBOARD ---------------- */
  const newApps = apps.filter((a) => a.status === "new");
  const pendingReviews = reviews.filter((r) => !r.approved);
  const approvedReviews = reviews.filter((r) => r.approved);

  const stats = [
    { icon: FileText, label: "Applications", value: apps.length, tint: "amber" as const },
    { icon: Inbox, label: "New / unhandled", value: newApps.length, tint: "amber" as const },
    { icon: Star, label: "Reviews", value: reviews.length, tint: "teal" as const },
    { icon: Clock, label: "Pending approval", value: pendingReviews.length, tint: "teal" as const },
  ];

  return (
    <div className="min-h-screen bg-pearl">
      <header className="sticky top-0 z-10 border-b border-mist bg-white/90 backdrop-blur">
        <div className="container-prime flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/brand/primehr-logo.png" alt="Prime HR" width={130} height={50} className="h-8 w-auto" />
            <span className="hidden font-[family-name:var(--font-montserrat)] text-sm font-black uppercase tracking-wide text-slate sm:inline">Admin</span>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate transition-colors hover:bg-pearl hover:text-navy">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="container-prime py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl border border-mist bg-white p-5">
                <div className={`flex size-10 items-center justify-center rounded-xl ${s.tint === "amber" ? "bg-amber-soft text-amber-deep" : "bg-teal-soft text-teal-deep"}`}>
                  <Icon className="size-5" />
                </div>
                <p className="mt-3 font-[family-name:var(--font-montserrat)] text-3xl font-black text-navy">{s.value}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-slate">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="mt-8 inline-flex rounded-full border border-mist bg-white p-1">
          <Tab active={tab === "applications"} onClick={() => setTab("applications")} label="Applications" count={newApps.length} />
          <Tab active={tab === "reviews"} onClick={() => setTab("reviews")} label="Reviews" count={pendingReviews.length} />
        </div>

        <div className="mt-6">
          {loading && <p className="text-slate">Loading…</p>}

          {!loading && tab === "applications" && (
            apps.length === 0 ? <Empty label="No applications yet." /> : (
              <div className="grid gap-4 lg:grid-cols-2">
                {apps.map((a) => <ApplicationCard key={a.id} a={a} onStatus={(st) => setAppStatus(a.id, st)} onDelete={() => removeApp(a.id)} />)}
              </div>
            )
          )}

          {!loading && tab === "reviews" && (
            reviews.length === 0 ? <Empty label="No reviews yet." /> : (
              <>
                {pendingReviews.length > 0 && (
                  <Section title={`Pending approval (${pendingReviews.length})`}>
                    {pendingReviews.map((r) => <ReviewCard key={r.id} r={r} onApprove={() => patchReview(r.id, true)} onDelete={() => removeReview(r.id)} />)}
                  </Section>
                )}
                {approvedReviews.length > 0 && (
                  <Section title={`Approved & live (${approvedReviews.length})`}>
                    {approvedReviews.map((r) => <ReviewCard key={r.id} r={r} onUnapprove={() => patchReview(r.id, false)} onDelete={() => removeReview(r.id)} />)}
                  </Section>
                )}
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}

function Tab({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${active ? "bg-navy text-white shadow-sm" : "text-slate hover:text-navy"}`}>
      {label}
      {count > 0 && <span className={`rounded-full px-1.5 text-xs font-bold ${active ? "bg-amber text-navy" : "bg-amber-soft text-amber-deep"}`}>{count}</span>}
    </button>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-mist bg-white p-12 text-center">
      <Inbox className="mx-auto size-8 text-mist" />
      <p className="mt-3 font-semibold text-navy">{label}</p>
      <p className="mt-1 text-sm text-slate">New submissions from the website will appear here.</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate">{title}</h2>
      <div className="grid gap-4 lg:grid-cols-2">{children}</div>
    </section>
  );
}

const statusStyle: Record<Application["status"], string> = {
  new: "bg-amber-soft text-amber-deep",
  contacted: "bg-teal-soft text-teal-deep",
  closed: "bg-navy/10 text-navy",
};

function ApplicationCard({ a, onStatus, onDelete }: { a: Application; onStatus: (s: Application["status"]) => void; onDelete: () => void }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-mist bg-white p-6 transition-shadow hover:shadow-[var(--shadow-navy)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-navy">{a.name}</p>
          <p className="text-sm font-semibold text-amber-deep">{a.service}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${statusStyle[a.status]}`}>{a.status}</span>
      </div>

      <div className="mt-4 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        <Detail icon={Mail}>{a.email}</Detail>
        <Detail icon={Phone}>{a.phone}</Detail>
        {a.company && <Detail icon={Building2}>{a.company}</Detail>}
        {a.participants && <Detail icon={Users}>{a.participants} pax</Detail>}
        {(a.format || a.timeline) && <Detail icon={Clock}>{[a.format, a.timeline].filter(Boolean).join(" · ")}</Detail>}
      </div>

      {a.message && <p className="mt-3 rounded-xl bg-pearl p-3 text-sm text-ink">{a.message}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={waLink(a.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95"><MessageCircle className="size-3.5" /> WhatsApp</a>
        <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-soft"><Mail className="size-3.5" /> Email</a>
        <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-lg border border-mist px-3 py-1.5 text-xs font-semibold text-navy hover:bg-pearl"><Phone className="size-3.5" /> Call</a>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-mist pt-3">
        <span className="text-xs text-slate">Status:</span>
        {(["new", "contacted", "closed"] as const).map((s) => (
          <button key={s} onClick={() => onStatus(s)} disabled={a.status === s} className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${a.status === s ? "cursor-default bg-navy text-white" : "bg-navy/[0.06] text-navy hover:bg-navy/10"}`}>{s}</button>
        ))}
        <button onClick={onDelete} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"><Trash2 className="size-3.5" /> Delete</button>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-ink">
      <Icon className="size-4 shrink-0 text-slate" /> {children}
    </span>
  );
}

function ReviewCard({ r, onApprove, onUnapprove, onDelete }: { r: Review; onApprove?: () => void; onUnapprove?: () => void; onDelete: () => void }) {
  return (
    <div className="rounded-2xl border border-mist bg-white p-6 transition-shadow hover:shadow-[var(--shadow-navy)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-navy">{r.name}</p>
          <p className="text-xs text-slate">{[r.position, r.company].filter(Boolean).join(" · ")}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={i < r.rating ? "size-4 fill-amber text-amber" : "size-4 text-mist"} />)}
        </div>
      </div>
      <p className="mt-3 text-sm italic text-ink">“{r.review}”</p>
      <div className="mt-4 flex gap-2 border-t border-mist pt-3">
        {onApprove && <button onClick={onApprove} className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-1.5 text-xs font-semibold text-white hover:brightness-95"><Check className="size-3.5" /> Approve &amp; publish</button>}
        {onUnapprove && <button onClick={onUnapprove} className="inline-flex items-center gap-1.5 rounded-lg bg-navy/10 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy/15"><EyeOff className="size-3.5" /> Unpublish</button>}
        <button onClick={onDelete} className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"><Trash2 className="size-3.5" /> Delete</button>
        {r.approved && <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-whatsapp"><Eye className="size-3.5" /> Live</span>}
      </div>
    </div>
  );
}
