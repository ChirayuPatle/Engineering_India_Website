"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

interface ClassNameArgs {
  [key: number]: string | boolean | undefined;
}

const cn = (...classes: any[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const FloatingNavbar = ({ className }: { className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
    setLastScrollY(currentScrollY);
  });

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Team", link: "/team" },
    { name: "Events", link: "/events" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex w-screen h-[4rem] fixed inset-x-0 mx-auto backdrop-blur-[5px] z-[5000] px-20 py-4 items-center font-space justify-between ",
          className
        )}
      >
        <Link href="/">
          <h1 className="cursor-pointer text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.500),theme(colors.blue.500),theme(colors.indigo.300),theme(colors.blue.400),theme(colors.indigo.500))] bg-[length:200%_auto] backdrop-blur-sm mt-3 ml-0">
            <div className="w-10 h-10 bg-blue-600"></div>
          </h1>
        </Link>

        <div className="hidden sm:flex items-center space-x-12 ml-auto">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className="relative text-gray-700 items-center flex space-x-1 hover:text-blue-600"
            >
              <span className="text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden text-gray-700 p-2 ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            className="w-6 h-5 flex flex-col justify-between"
          >
            <motion.span className="w-full h-[1.5px] bg-gray-700"></motion.span>
            <motion.span className="w-full h-[1.5px] bg-gray-700"></motion.span>
            <motion.span className="w-full h-[1.5px] bg-gray-700"></motion.span>
          </motion.div>
        </button>

        {isMenuOpen && (
          <motion.div className="absolute top-[4rem] h-screen left-0 right-0 bg-white/20 backdrop-blur-lg sm:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={navItem.link}
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sm">{navItem.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNavbar;
