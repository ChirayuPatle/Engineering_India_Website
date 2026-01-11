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
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blog" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  //  ${
  //       scrolled
  //         ? "bg-background/80 shadow-sm backdrop-blur-md"
  //         : "bg-transparent"
  //     }

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
      className={`fixed left-1/2 top-4 z-50 mx-auto w-full max-w-4xl -translate-x-1/2 px-4 py-4 transition-all duration-300 lg:px-20`}
    >
      <div className="container mx-auto flex h-10 items-center justify-between rounded-3xl bg-white/20 px-6 py-10 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-[2.2rem] md:w-[3.0rem]">
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

        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-white/70 ${
                pathname === item.href
                  ? "font-semibold text-white"
                  : "text-white/90"
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
              <UserAvatar
                name={user.name}
                image={user.image}
                className="h-8 w-8"
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
                onClick={() => {
                  router.push("/dashboard");
                  setIsOpen(false);
                }}
                variant="ghost"
                className="relative h-8 w-8 rounded-full border-none outline-none"
              >
                <UserAvatar
                  name={user.name}
                  image={user.image}
                  className="h-8 w-8"
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
