import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing the use of the ${SITE.name} website and services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Terms", href: "/terms" }]} title="Terms of Use" intro="The terms governing your use of this website and our services." />
      <article className="container-prime py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-8 text-slate leading-relaxed">
          <Section title="Use of this website">
            This website is provided for information about {SITE.name}'s training and consultancy services. Content may be updated at any time without notice.
          </Section>
          <Section title="Programs & HRD Corp claims">
            Program details, durations and content may be customized per engagement. HRD Corp claimable status is subject to HRD Corp eligibility, terms and approval. We provide documentation support but cannot guarantee claim approval, which rests with HRD Corp.
          </Section>
          <Section title="Intellectual property">
            All training materials, content and branding remain the property of {SITE.name} and may not be reproduced without permission.
          </Section>
          <Section title="Liability">
            We strive for accuracy but make no warranties regarding completeness. {SITE.name} is not liable for any loss arising from reliance on website content.
          </Section>
          <Section title="Contact">
            Questions about these terms? Contact us at {SITE.email} or {SITE.phone}.
          </Section>
          <p className="text-sm">Last updated: June 2026.</p>
        </div>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-navy">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}
