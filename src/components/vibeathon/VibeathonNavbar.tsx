"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function VibeathonNavbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="z-100 sticky top-0 border-b-2 border-black bg-[#f5f5f0]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          className="flex items-center gap-2.5 text-black no-underline"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded border-2 border-black bg-yellow-400 text-base shadow-[2px_2px_0_#000]">
          <Image
            src="/logo2.png"
            alt="Logo"
            className="h-full w-full object-cover"
            width={50}
            height={50}
          />
            
          </div>
          <span className="text-base font-black">Vibe-A-Thon</span>
        </a>

        <ul className="m-0 hidden list-none items-center gap-6 p-0 md:flex">
          <li>
            <a
              href="#about"
              className="text-sm font-medium text-black no-underline transition-all hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px]"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#details"
              className="text-sm font-medium text-black no-underline transition-all hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px]"
            >
              Details
            </a>
          </li>
          <li>
            <a
              href="#schedule"
              className="text-sm font-medium text-black no-underline transition-all hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px]"
            >
              Schedule
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="text-sm font-medium text-black no-underline transition-all hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px]"
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-sm font-medium text-black no-underline transition-all hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px]"
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap rounded border-2 border-black bg-yellow-400 px-3 py-1.5 text-xs font-bold text-black shadow-[2px_2px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:transform hover:shadow-[3px_3px_0_#000]"
          >
            Register ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
