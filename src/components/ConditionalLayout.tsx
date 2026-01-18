"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <div className="mx-auto flex w-full">
          <Navbar />
        </div>
      )}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}
