"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/ui/Footer";
import AnnouncementMarquee from "@/components/landing/marquee";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <AnnouncementMarquee />}
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}
