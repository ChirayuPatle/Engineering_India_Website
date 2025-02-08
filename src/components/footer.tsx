"use client";

import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  DiscIcon as Discord,
  Link2,
} from "lucide-react";
import { FaAddressBook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 px-16 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"></div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="w-20 h-20 bg-zinc-500 rounded-full "></div>

          {/* Copyright */}
          <div className="text-sm ">
            Copyright © {new Date().getFullYear()}, Engineering India YCCE
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-zinc-200 transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:text-zinc-200 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="hover:text-zinc-200 transition-colors">
              <FaInstagram className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <Link href="#" className="hover:text-zinc-200 transition-colors">
              <Link2 className="h-5 w-5" />
              <span className="sr-only">Other links</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
