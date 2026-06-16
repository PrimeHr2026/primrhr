import { orgChart, type TeamMember } from "@/data/team";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

function initials(name: string) {
  return name
    .replace(/Dr\.?|\//g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Node({ member, lead = false, amber = true }: { member: TeamMember; lead?: boolean; amber?: boolean }) {
  return (
    <div
      className={`group flex h-full flex-col items-center rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1 ${
        lead
          ? "border-transparent bg-navy text-white shadow-[var(--shadow-navy)]"
          : "border-mist bg-white hover:shadow-[var(--shadow-navy)]"
      }`}
    >
      <div
        className={`flex size-12 items-center justify-center rounded-xl font-[family-name:var(--font-montserrat)] text-base font-black ${
          lead
            ? "bg-amber text-navy"
            : amber
              ? "bg-amber-soft text-amber-deep"
              : "bg-teal-soft text-teal-deep"
        }`}
      >
        {initials(member.name)}
      </div>
      <p className={`mt-3 font-bold ${lead ? "text-white" : "text-navy"}`}>{member.name}</p>
      <p className={`text-sm font-semibold ${lead ? "text-amber" : amber ? "text-amber-deep" : "text-teal-deep"}`}>{member.role}</p>
      <p className={`mt-1.5 text-xs leading-relaxed ${lead ? "text-steel-light" : "text-slate"}`}>{member.specialty}</p>
    </div>
  );
}

export function OrgChart() {
  return (
    <div className="mt-12 flex flex-col items-center">
      {orgChart.map((tier, ti) => {
        const isLeadTier = ti === 0;
        return (
          <div key={tier.tier} className="flex w-full flex-col items-center">
            {/* connector */}
            {ti > 0 && <div className="h-8 w-px bg-mist" aria-hidden />}
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate">{tier.tier}</p>
            <Stagger
              className={`grid w-full gap-4 ${
                tier.members.length === 1
                  ? "max-w-sm grid-cols-1"
                  : tier.members.length <= 2
                    ? "max-w-2xl grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {tier.members.map((m, mi) => (
                <StaggerItem key={m.name} className="h-full">
                  <Node member={m} lead={isLeadTier} amber={mi % 2 === 0} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        );
      })}
    </div>
  );
}
