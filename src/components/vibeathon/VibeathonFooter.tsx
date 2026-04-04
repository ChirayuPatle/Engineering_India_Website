'use client';
import React from 'react';
import { motion } from 'framer-motion';

const navLink = "text-black font-medium text-sm no-underline hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px] transition-all";

export default function VibeathonFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border-t-2 border-black"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Col 1 — Brand */}
          <div>
            <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 border-2 border-black rounded flex items-center justify-center text-sm shadow-[2px_2px_0_#000] flex-shrink-0">
                🏆
              </div>
              Vibe-A-Thon
            </h3>
            <p className="text-sm text-[#374151] leading-relaxed max-w-xs">
              A 2026 hackathon presented by Engineering India YCCE in collaboration with YCCE ACM Student Chapter. Build, compete, win.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4 tracking-tight">Quick Links</h4>
            <ul className="list-none flex flex-col gap-3">
              {[
                { label: 'About',    href: '#about'    },
                { label: 'Details',  href: '#details'  },
                { label: 'Schedule', href: '#schedule' },
                { label: 'FAQ',      href: '#faq'      },
                { label: 'Contact',  href: '#contact'  },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={navLink}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider + copyright */}
        <div className="border-t-2 border-black mt-10 pt-6 text-center text-sm font-medium text-black">
          © 2026 Engineering India YCCE. Made with ❤️ for builders.
        </div>

      </div>
    </motion.footer>
  );
}