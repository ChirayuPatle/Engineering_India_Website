"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import { usePathname } from "next/navigation";

const mobileMenuVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: "-100%", transition: { duration: 0.3 } },
};

export default function Navbar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/events", text: "Events" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact Us" },
  ];

  if (pathName === "/") {
    return (
      <header className="fixed inset-x-0 top-0 z-50 text-base">
        <nav className="container mx-auto mt-5 flex w-full max-w-[90%] items-center justify-between rounded-xl border border-zinc-800 bg-black/80 px-4 py-3 backdrop-blur-lg sm:max-w-[75%] md:py-2">
          <div className="flex flex-1 items-center space-x-4">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-600"
            >
              <h1>EI</h1>
            </Link>
          </div>

          {/* Center Section: Nav Links (visible on tablet and above) */}
          <div className="hidden flex-1 items-center justify-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6 2xl:space-x-8">
            {navLinks.map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-300 transition-colors hover:text-white"
              >
                {text}
              </Link>
            ))}
          </div>

          {/* Right Section: Auth Buttons (visible on tablet and above) + Hamburger (mobile only) */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="hidden lg:flex xl:space-x-4">
              <Link href="/login">
                <Button variant="neuOutline">LOGIN</Button>
              </Link>
              <Link href="/signup">
                <Button className="flex items-center text-sm font-medium">
                  GET STARTED
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40 flex min-h-screen backdrop-blur-sm lg:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                variants={mobileMenuVariants}
                onClick={(e) => e.stopPropagation()}
                className="relative mx-auto mt-16 h-[65%] w-[80%] rounded-2xl border border-zinc-800 bg-black/90 px-4 py-6 backdrop-blur-lg sm:h-[50%]"
              >
                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className="mb-4 block rounded-full bg-blue-600/10 px-4 py-1 text-center text-sm font-medium text-blue-500 transition-colors hover:bg-blue-600/20"
                >
                  We&apos;re hiring!
                </Link>

                <div className="flex flex-col items-center space-y-6">
                  {navLinks.map(({ href, text }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="text-base text-white transition-colors hover:text-gray-300"
                    >
                      {text}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center space-y-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="neuOutline"
                      className="sm:text w-36 text-sm"
                    >
                      LOGIN
                    </Button>
                  </Link>
                  <Link href="/get-started" onClick={() => setIsOpen(false)}>
                    <Button className="flex w-36 items-center text-sm font-medium">
                      GET STARTED
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  }

  return null;
}
