"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/floatingNavbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  return pathname === "/" || pathname === "/events" ? <Navbar /> : null;
}
