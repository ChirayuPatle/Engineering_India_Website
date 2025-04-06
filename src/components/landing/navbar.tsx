"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

const navItems = [
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blog" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/events/") ||
    pathname?.startsWith("/auth")
  ) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full py-4 transition-all duration-300 lg:px-20 ${
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-10 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-[2.2rem] md:w-[3.0rem]">
            <img
              src="./logo1.png"
              className="h-full w-full object-cover"
              alt="Logo"
            />
          </div>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-neutral-600 ${
                pathname === item.href
                  ? "font-semibold text-neutral-950"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {isPending ? null : user ? (
            <Button
              onClick={() => router.push("/dashboard")}
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                />
                <AvatarFallback>
                  {user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button
              onClick={() => authClient.signIn.social({ provider: "google" })}
              variant="default"
            >
              Login
            </Button>
          )}
        </nav>

        <div className="flex md:hidden">
          <Button
            variant="default"
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 bg-background px-4 py-6 shadow-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isPending ? null : user ? (
              <Button
                onClick={() => router.push("/dashboard")}
                variant="ghost"
                className="relative h-8 w-8 rounded-full border-none outline-none"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>
                    {user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button
                onClick={() => authClient.signIn.social({ provider: "google" })}
                variant="default"
                className="w-full"
              >
                Login with Google
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
