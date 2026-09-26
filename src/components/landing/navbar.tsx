"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  // { name: "VIBE-A-THON", href: "/vibeathon" },
  { name: "Team", href: "/team" },
  { name: "Blogs", href: "/blog" },
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
  className="fixed left-1/2 top-10 z-50 w-full max-w-5xl -translate-x-1/2 px-5 transition-all duration-500"
>
      <div
  className={`mx-auto flex h-[72px] items-center justify-between rounded-full border px-8 transition-all duration-500 backdrop-blur-2xl ${
    scrolled
      ? "border-cyan-400/20 bg-[#081221]/90 shadow-[0_15px_50px_rgba(0,0,0,.45)]"
      : "border-white/10 bg-[#07111F]/45"
  }`}
>
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-12 transition-transform duration-300 hover:scale-110 hover:rotate-2 md:w-14">
            <Image
              src="/logo1.png"
              className="h-full w-full object-cover"
              alt="Logo"
              width={50}
              height={50}
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative text-sm font-medium tracking-wide transition-all duration-300 ${
                pathname === item.href
                  ? "text-cyan-300"
                  : "text-slate-200 hover:text-cyan-300"
              }`}
            >
              {item.name}

              <span
                className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-cyan-400 transition-all duration-300 ${
                  pathname === item.href
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {isPending ? null : user ? (
            <Button
              onClick={() => router.push("/dashboard")}
              variant="premium"
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-0"
            >
              <UserAvatar
                name={user.name}
                image={user.image}
                className="h-full w-full"
              />
            </Button>
          ) : (
            <Button
              onClick={
                // () => authClient.signIn.social({ provider: "google" })
                () => {
                  router.push("/auth");
                }
              }
              variant="premium"
              size={"lg"}
              className="rounded-full px-7 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/30"
              >
              Login
            </Button>
          )}
        </nav>

        <div className="flex md:hidden">
          <Button
            variant="premium"
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 md:hidden">
          <div className="flex flex-col space-y-5 rounded-3xl border border-white/10 bg-[#081221]/95 px-6 py-8 backdrop-blur-2xl">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-colors hover:text-white/70 ${
                  pathname === item.href
                    ? "font-semibold text-white"
                    : "text-white/90"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isPending ? null : user ? (
              <Button
                onClick={() => {
                  router.push("/dashboard");
                  setIsOpen(false);
                }}
                variant="premium"
                className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-0"
              >
                <UserAvatar
                  name={user.name}
                  image={user.image}
                  className="h-full w-full"
                />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  router.push("/auth");
                  // authClient.signIn.social({ provider: "google" });
                  // setIsOpen(false);
                }}
                variant="premium"
                size={"lg"}
                className="w-full hover:scale-100"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
