'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function VibeathonNavbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-100 bg-[#f5f5f0] border-b-2 border-black">
      
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2.5 text-black no-underline">
          <div className="w-8 h-8 bg-yellow-400 border-2 border-black rounded flex items-center justify-center text-base shadow-[2px_2px_0_#000]">
            🏆
          </div>
          <span className="font-black text-base">Vibe-A-Thon</span>
        </a>
        
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          <li><a href="#about" className="text-black font-medium text-sm no-underline hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px] transition-all">About</a></li>
          <li><a href="#details" className="text-black font-medium text-sm no-underline hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px] transition-all">Details</a></li>
          <li><a href="#schedule" className="text-black font-medium text-sm no-underline hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px] transition-all">Schedule</a></li>
          <li><a href="#faq" className="text-black font-medium text-sm no-underline hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px] transition-all">FAQ</a></li>
          <li><a href="#contact" className="text-black font-medium text-sm no-underline hover:underline hover:decoration-yellow-400 hover:decoration-[3px] hover:underline-offset-[3px] transition-all">Contact</a></li>
        </ul>
        
        <div className="flex gap-2.5 items-center">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black border-2 border-black rounded px-3 py-1.5 text-xs font-bold hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] inline-flex items-center gap-1 whitespace-nowrap"
          >
            Register ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
