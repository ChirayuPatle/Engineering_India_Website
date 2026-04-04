"use client";
import React from "react";
import { motion } from "framer-motion";

const navLink =
  "text-black font-medium text-sm no-underline hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px] transition-all";

export default function VibeathonFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t-2 border-black bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* 2-column grid */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          {/* Col 1 — Brand */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-black">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border-2 border-black bg-yellow-400 text-sm shadow-[2px_2px_0_#000]">
                🏆
              </div>
              Vibe-A-Thon
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-[#374151]">
              A 2026 hackathon presented by Engineering India YCCE in
              collaboration with YCCE ACM Student Chapter. Build, compete, win.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="mb-4 text-base font-bold tracking-tight">
              Quick Links
            </h4>
            <ul className="flex list-none flex-col gap-3">
              {[
                { label: "About", href: "#about" },
                { label: "Details", href: "#details" },
                { label: "Schedule", href: "#schedule" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={navLink}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-10 border-t-2 border-black pt-6 text-center text-sm font-medium text-black">
          © 2026 Engineering India YCCE. Made with ❤️ for builders.
        </div>
      </div>
    </motion.footer>
  );
}
