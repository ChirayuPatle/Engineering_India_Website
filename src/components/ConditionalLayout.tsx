"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import VibeathonNavbar from "@/components/vibeathon/VibeathonNavbar";
import VibeathonFooter from "@/components/vibeathon/VibeathonFooter";
import { Marquee } from "./ui/marquee";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isVibeathonRoute = pathname?.startsWith("/vibeathon");

  return (
    <>
      {!isAdminRoute && !isVibeathonRoute && (
        <div className="mx-auto flex w-full">
          <div className="bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
            <Marquee speed="normal" className="p-2 text-white font-bold text-sm md:text-base">
              <span className="mx-4">🏆 VIBE-A-THON 2026 - 9th April 🏆</span>
              <span className="mx-4">💰 ₹2000+ Prize Pool 💰</span>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                👥 Register Now! 👥
              </a>
              <span className="mx-4">🚀 CSE Lab 1 & 2, YCCE 🚀</span>
              <span className="mx-4">📅 9th April 2026 - Don't Miss Out! 📅</span>
            </Marquee>
          </div>
          <Navbar />
        </div>
      )}
      {isVibeathonRoute && <VibeathonNavbar />}
      {children}
      {!isAdminRoute && !isVibeathonRoute && <Footer />}
      {isVibeathonRoute && <VibeathonFooter />}
    </>
  );
}
