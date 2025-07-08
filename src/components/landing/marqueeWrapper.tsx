"use client";

import CustomMarquee from "@/components/ui/CustomMarquee";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import Link from "next/link";

const protectedRoutes = ["/dashboard", "/profile", "/auth"];

export default function MarqueeWrapper() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const showMarquee = !protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!showMarquee) {
    return null;
  }

  return (
    <Link href="/dashboard/membership">
      <CustomMarquee
        className="fixed top-0 z-[100] bg-blue-600 text-white"
        repeat={isMobile ? 2 : 4}
      >
        <span className="font-semibold">
          🚀 Membership Drive 2025 is now open! Click here to join the team.
        </span>
      </CustomMarquee>
    </Link>
  );
}
