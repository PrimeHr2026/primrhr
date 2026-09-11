"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFab } from "./WhatsAppFab";
import { PromoPopup } from "@/components/sections/PromoPopup";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/admin");

  if (bare) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <PromoPopup />
    </>
  );
}
