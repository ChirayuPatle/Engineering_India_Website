"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardCheck, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";

export default function Footer() {
  const { scrollYProgress } = useScroll();

  return (
    <footer className="relative z-20 w-full overflow-hidden bg-[#FCFAF2] px-4 py-24 sm:px-6 md:px-8">
      <div className="container relative mx-auto max-w-7xl">
        <div className="relative z-10 grid grid-cols-1 items-end gap-20 lg:grid-cols-2">
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="flex h-[3.0rem] w-[3.0rem] items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <img
                  src="/logo1.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-[#1D317D]">
                Engineering India
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1D317D]/40">
                  Connect
                </h4>
                <ul className="space-y-2">
                  {[
                    {
                      name: "Instagram",
                      href: "https://instagram.com/engineering_india_ycce",
                    },
                    {
                      name: "LinkedIn",
                      href: "https://linkedin.com/company/engineering-india-ycce",
                    },
                    { name: "Twitter", href: "#" },
                    { name: "Facebook", href: "#" },
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#1D317D] transition-colors hover:text-[#4F6D9A]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1D317D]/40">
                  General
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: "About Us", href: "#about" },
                    { name: "Events", href: "#events" },
                    { name: "Journey", href: "#journey" },
                    { name: "Team", href: "/team" },
                    { name: "Blogs", href: "/blog" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-[#1D317D] transition-colors hover:text-[#4F6D9A]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1D317D]/40">
                  Support
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: "Contact", href: "#contact" },
                    { name: "FAQ", href: "#faq" },
                    { name: "Privacy Policy", href: "/privacy" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-[#1D317D] transition-colors hover:text-[#4F6D9A]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-10 lg:text-right">
            <div className="max-w-md lg:ml-auto">
              <p className="font-fraunces mb-6 text-lg font-medium italic leading-relaxed text-[#1D317D]">
                "Empowering engineers to think nationally and act locally for a
                sustainable future."
              </p>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Button
                  variant="premium"
                  className="rounded-full border-none bg-[#1D317D] px-8 text-white hover:bg-[#2B416C]"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#1D317D]/10 pt-10 text-[10px] font-medium uppercase tracking-widest text-[#1D317D]/40 sm:flex-row sm:justify-between">
              <p>
                © {new Date().getFullYear()} Engineering India YCCE. All rights
                reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-[#1D317D]"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-[#1D317D]"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements for footer */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0.9, 1], ["20%", "-20%"]) }}
        className="pointer-events-none absolute -bottom-10 left-[-5%] w-[30%] opacity-[0.08]"
      >
        <img src="/landing/clouds/1.png" alt="" />
      </motion.div>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0.9, 1], ["-10%", "10%"]) }}
        className="pointer-events-none absolute right-[-10%] top-10 w-[40%] opacity-[0.05]"
      >
        <img src="/landing/clouds/2.png" alt="" />
      </motion.div>
    </footer>
  );
}
