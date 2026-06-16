"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, Check, Trash2, LogOut, Eye, EyeOff, MessageCircle, Phone, Mail, Users, Clock, Building2 } from "lucide-react";

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

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"applications" | "reviews">("applications");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (res.ok) setAuthed(true);
    else setError("Invalid credentials");
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

  if (authed === null) return <div className="grid min-h-screen place-items-center bg-pearl text-slate">Loading…</div>;

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-navy-deep bg-grid p-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-navy">Prime HR Admin</h1>
          <p className="mt-1 text-sm text-slate">Applications &amp; reviews</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="mt-6 h-12 w-full rounded-xl border border-mist bg-pearl px-4 outline-none focus:border-navy focus:bg-white" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="mt-3 h-12 w-full rounded-xl border border-mist bg-pearl px-4 outline-none focus:border-navy focus:bg-white" />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button type="submit" className="mt-5 h-12 w-full rounded-xl bg-navy font-semibold text-white hover:bg-navy-soft">Sign in</button>
        </form>
      </div>
    );
  }

  const newApps = apps.filter((a) => a.status === "new");
  const pendingReviews = reviews.filter((r) => !r.approved);

  return (
    <div className="min-h-screen bg-pearl">
      <header className="border-b border-mist bg-white">
        <div className="container-prime flex h-16 items-center justify-between">
          <h1 className="font-[family-name:var(--font-montserrat)] text-lg font-black text-navy">Prime HR — Admin</h1>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm font-semibold text-slate hover:text-navy"><LogOut className="size-4" /> Sign out</button>
        </div>
        <div className="container-prime flex gap-1 pb-px">
          <Tab active={tab === "applications"} onClick={() => setTab("applications")} label="Applications" count={newApps.length} />
          <Tab active={tab === "reviews"} onClick={() => setTab("reviews")} label="Reviews" count={pendingReviews.length} />
        </div>
      </header>

      <main className="container-prime py-10">
        {loading && <p className="text-slate">Loading…</p>}

        {/* Applications */}
        {!loading && tab === "applications" && (
          apps.length === 0 ? (
            <Empty label="No applications yet." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {apps.map((a) => (
                <ApplicationCard key={a.id} a={a} onStatus={(s) => setAppStatus(a.id, s)} onDelete={() => removeApp(a.id)} />
              ))}
            </div>
          )
        )}

        {/* Reviews */}
        {!loading && tab === "reviews" && (
          reviews.length === 0 ? (
            <Empty label="No reviews yet." />
          ) : (
            <>
              {pendingReviews.length > 0 && (
                <Section title={`Pending approval (${pendingReviews.length})`}>
                  {pendingReviews.map((r) => <ReviewCard key={r.id} r={r} onApprove={() => patchReview(r.id, true)} onDelete={() => removeReview(r.id)} />)}
                </Section>
              )}
              {reviews.filter((r) => r.approved).length > 0 && (
                <Section title={`Approved (${reviews.filter((r) => r.approved).length})`}>
                  {reviews.filter((r) => r.approved).map((r) => <ReviewCard key={r.id} r={r} onUnapprove={() => patchReview(r.id, false)} onDelete={() => removeReview(r.id)} />)}
                </Section>
              )}
            </>
          )
        )}
      </main>
    </div>
  );
}

function Tab({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button onClick={onClick} className={`relative flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-pearl text-navy" : "text-slate hover:text-navy"}`}>
      {label}
      {count > 0 && <span className="rounded-full bg-amber px-1.5 text-xs font-bold text-navy">{count}</span>}
    </button>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="rounded-xl border border-mist bg-white p-6 text-slate">{label} (If you expect data, ensure <code>MONGODB_URI</code> is configured.)</p>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
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
    <div className="flex h-full flex-col rounded-2xl border border-mist bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-navy">{a.name}</p>
          <p className="text-sm font-medium text-amber-deep">{a.service}</p>
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
        <a href={waLink(a.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-1.5 text-xs font-semibold text-white"><MessageCircle className="size-3.5" /> WhatsApp</a>
        <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Mail className="size-3.5" /> Email</a>
        <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-lg border border-mist px-3 py-1.5 text-xs font-semibold text-navy"><Phone className="size-3.5" /> Call</a>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-mist pt-3">
        <span className="text-xs text-slate">Mark:</span>
        {(["new", "contacted", "closed"] as const).map((s) => (
          <button key={s} onClick={() => onStatus(s)} disabled={a.status === s} className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${a.status === s ? "cursor-default opacity-40" : "bg-navy/[0.06] text-navy hover:bg-navy/10"}`}>{s}</button>
        ))}
        <button onClick={onDelete} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600"><Trash2 className="size-3.5" /> Delete</button>
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
    <div className="rounded-2xl border border-mist bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-navy">{r.name}</p>
          <p className="text-xs text-slate">{[r.position, r.company].filter(Boolean).join(" · ")}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={i < r.rating ? "size-4 fill-amber text-amber" : "size-4 text-mist"} />)}
        </div>
      </div>
      <p className="mt-3 text-sm text-ink">“{r.review}”</p>
      <div className="mt-4 flex gap-2">
        {onApprove && <button onClick={onApprove} className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-1.5 text-xs font-semibold text-white"><Check className="size-3.5" /> Approve</button>}
        {onUnapprove && <button onClick={onUnapprove} className="inline-flex items-center gap-1.5 rounded-lg bg-navy/10 px-3 py-1.5 text-xs font-semibold text-navy"><EyeOff className="size-3.5" /> Unapprove</button>}
        <button onClick={onDelete} className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"><Trash2 className="size-3.5" /> Delete</button>
        {r.approved && <span className="ml-auto inline-flex items-center gap-1 text-xs text-whatsapp"><Eye className="size-3.5" /> Live</span>}
      </div>
    </div>
  );
}
