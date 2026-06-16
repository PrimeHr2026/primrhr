import type { Metadata } from "next";
import { Montserrat, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Shell } from "@/components/layout/Shell";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — HRD Corp Accredited Training & Consultancy`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "HRD Corp claimable training",
    "HR consultancy Malaysia",
    "CHRP Malaysia",
    "corporate training Malaysia",
    "leadership training",
    "HRD Corp accredited trainer",
    "Prime HR Academy",
    "Ram.G trainer",
  ],
  authors: [{ name: SITE.name }],
  creator: "Aurexis Solution",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Transforming Talent Into Organizational Success`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), websiteSchema()]),
          }}
        />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
