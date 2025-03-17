"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration issues
  if (!isMounted) return null;

  // Skip rendering footer on certain pages
  if (pathName?.startsWith("/dashboard")) return null;
  if (pathName?.startsWith("/auth")) return null;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 text-center sm:py-24 lg:px-8">
        {/* Brand Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo1.png"
            alt="Brand Logo"
            width={50} // Adjust size as needed
            height={50}
            priority
          />
        </div>

        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {["About", "Events", "Blog", "Contact"].map((item) => (
            <div key={item} className="pb-6">
              <Link
                href={`/${item.toLowerCase()}`}
                rel="noopener noreferrer"
                className="text-sm leading-6 text-muted-foreground hover:text-foreground"
              >
                {item}
              </Link>
            </div>
          ))}
        </nav>

        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          Designed & Developed with ❤️ by{" "}
          <Link
            target="_blank"
            className="underline hover:text-blue-600"
            href="https://github.com/Priyanshudotdev"
          >
            Priyanshu Kayarkar
          </Link>
          {" , "}
          <Link
            target="_blank"
            className="underline hover:text-blue-600"
            href="https://github.com/ChirayuPatle"
          >
            Chirayu Patle
          </Link>
          {" , "}
          <Link
            target="_blank"
            className="underline hover:text-blue-600"
            href="https://github.com/Muchkundraje"
          >
            Muchkundraje Thote
          </Link>{" "}
          &{" "}
          <Link
            target="_blank"
            className="underline hover:text-blue-600"
            href="https://www.linkedin.com/in/samyak-umathe-9b8a6a295/"
          >
            Samyak Umathe
          </Link>
        </p>
      </div>
    </footer>
  );
}
