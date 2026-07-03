"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";

export default function Footer() {
  const { scrollYProgress } = useScroll();

  return (
    <footer className="relative z-20 w-full overflow-hidden bg-[#FCFAF2] px-4 py-24 sm:px-6 md:px-8">
      <div className="container relative mx-auto max-w-7xl">
        <div className="relative z-10 grid grid-cols-1 items-end gap-20 lg:grid-cols-2">
          <div className="flex flex-col items-center space-y-12 text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-[3.0rem] w-[3.0rem] items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-gray-800">EI</div>
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-[#1D317D]">
                Engineering India
              </h3>
            </div>

            <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-3">
              {/* Connect */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1D317D]/40">
                  Connect
                </h4>
                <ul className="space-y-2">
                  {[
                    {
                      name: "Instagram",
                      href: "https://www.instagram.com/engineering.india_ycce/",
                    },
                    {
                      name: "LinkedIn",
                      href: "https://linkedin.com/company/engineering-india-ycce",
                    },
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
              {/* General */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1D317D]/40">
                  General
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: "About Us", href: "/landing#about" },
                    { name: "Events", href: "/landing#events" },
                    { name: "Journey", href: "/landing#journey" },
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
              {/* Support (moved up) */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1D317D]/40">
                  Support
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: "Contact", href: "/contact" },
                    { name: "FAQ", href: "/landing#faq" },
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

          <div className="flex w-full flex-col items-center space-y-10 text-center lg:items-end lg:text-right">
            <div className="w-full max-w-md lg:ml-auto">
              <p className="font-fraunces mb-6 text-lg font-medium italic leading-relaxed text-[#1D317D]">
                "Empowering engineers to think nationally and act locally for a
                sustainable future."
              </p>
              <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
                <Link href="/contact">
                  <Button
                    variant="premium"
                    className="rounded-full border-none bg-[#1D317D] px-8 text-white hover:bg-[#2B416C]"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-4 border-t border-[#1D317D]/10 pt-10 text-[10px] font-medium uppercase tracking-widest text-[#1D317D]/40">
              <p className="w-full text-center text-[12px]">
                © {new Date().getFullYear()} Engineering India YCCE. All rights
                reserved.
                <br />
                <br />
                Developed by
                <a
                  href="https://www.linkedin.com/in/priyanshukayarkar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 font-bold capitalize text-[#1D317D] underline hover:text-blue-600"
                >
                  Priyanshu Kayarkar
                </a>
                ,
                <a
                  href="https://www.linkedin.com/in/chirayu-patle-a78502290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 font-bold capitalize text-[#1D317D] underline hover:text-blue-600"
                >
                  Chirayu Patle
                </a>
                ,
                <a
                  href="https://www.linkedin.com/in/muchkund-thote/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 font-bold capitalize text-[#1D317D] underline hover:text-blue-600"
                >
                  Muchkund Raje
                </a>{" "}
                and
                <a
                  href="https://www.linkedin.com/in/samyak-umathe-9b8a6a295/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 font-bold capitalize text-[#1D317D] underline hover:text-blue-600"
                >
                  Samyak Umathe
                </a>
              </p>
              <div className="flex w-full justify-center gap-6 lg:justify-end">
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
