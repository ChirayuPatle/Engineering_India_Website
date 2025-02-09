"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { redirect, usePathname, useRouter } from "next/navigation";
import AuthContext from "@/context/auth-context";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Error from "next/error";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Events", link: "/events" },
  { name: "Contact", link: "/contact" },
];

const FloatingNavbar = ({ className = "" }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const authData = useContext(AuthContext);

  const isAuthenticated = authData?.isAuthenticated;

  if (isAuthenticated) {
    console.log(authData.user);
  }

  useEffect(() => {
    const whiteSection = document.getElementById("white-section");
    if (!whiteSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            setIsWhiteSection(true);
          } else {
            setIsWhiteSection(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(whiteSection);

    return () => {
      if (whiteSection) observer.unobserve(whiteSection);
    };
  }, []);

  if (pathname === "/auth/login") return null;
  if (pathname === "/dashboard") return null;
  const router = useRouter();

  const handleLogout = async () => {
    const response = await authData?.logout();
    if (response) {
      router.push("/");
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-sm py-4 px-8 sm:px-20 flex items-center justify-between ${className}`}
      >
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="./logo.png" className="size-14" alt="" />
          </div>
        </Link>
        <div className="hidden sm:flex items-center space-x-8">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className={` ${
                isWhiteSection ? "text-white" : "text-black/80"
              } hover:opacity-70`}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="flex items-center justify-center text-neutral-700 bg-neutral-300">
                    P
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <button
          className={`sm:hidden p-2 ${
            isWhiteSection ? "text-white" : "text-black/80"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            className="w-6 h-6"
          >
            <div className="h-0.5 bg-current mb-1"></div>
            <div className="h-0.5 bg-current mb-1"></div>
            <div className="h-0.5 bg-current"></div>
          </motion.div>
        </button>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="absolute top-full left-0 right-0 bg-white/95 shadow-sm sm:hidden"
          >
            <div className="flex flex-col space-y-4 py-4">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="text-gray-700 text-center hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </AnimatePresence>
  );
};

export default FloatingNavbar;
