import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]} title="Privacy Policy" intro="How we collect, use and protect the information you share with us." />
      <article className="container-prime prose-prime py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-8 text-slate leading-relaxed">
          <Section title="Information we collect">
            When you submit an enquiry, we collect the details you provide — such as your name, email, phone number, company and message — solely to respond to your request and provide our training and consultancy services.
          </Section>
          <Section title="How we use your information">
            We use your information to respond to enquiries, prepare proposals, deliver services, and where relevant, support HRD Corp claim documentation. We do not sell your data to third parties.
          </Section>
          <Section title="Data retention">
            We retain enquiry and client information only as long as necessary to provide our services and meet legal and HRD Corp record-keeping obligations.
          </Section>
          <Section title="Your rights">
            You may request access to, correction of, or deletion of your personal information at any time by contacting us at {SITE.email}.
          </Section>
          <Section title="Contact">
            For any privacy questions, contact {SITE.name} at {SITE.email} or {SITE.phone}.
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
