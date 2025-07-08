"use client";

import { usePathname } from "next/navigation";
import { Marquee } from "@/components/magicui/marquee";
import Link from "next/link";

const protectedRoutes = ["/dashboard", "/profile", "/auth"];

export default function MarqueeWrapper() {
  const pathname = usePathname();

  const showMarquee = !protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!showMarquee) {
    return null;
  }

  return (
    <Link href="/dashboard/membership">
      <Marquee className="fixed top-0 z-[100] bg-blue-600 py-2 text-white">
        <span className="mx-4 font-semibold">
          🚀 Membership Drive 2025 is now open! Click here to join the team.
        </span>
      </Marquee>
    </Link>
  );
}
