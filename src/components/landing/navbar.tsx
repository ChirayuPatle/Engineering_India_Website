"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Supabase auth state
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get current session
  useEffect(() => {
    const getCurrUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setIsMounted(true);
    };
    getCurrUser();
  }, []);

  // Handle signout
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
  };

  // Prevent hydration issues
  if (!isMounted) return null;
  // Optionally hide navbar on certain routes (e.g. /profile)
  if (pathname === "/profile") return null;

  return (
    <header
      className={`fixed top-0 z-50 w-full px-20 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">
            Engineering India
          </span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                pathname === item.href
                  ? "text-blue-600"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        (user.user_metadata &&
                          user.user_metadata.avatar_url) ||
                        "/default-avatar.png"
                      }
                      alt={
                        (user.user_metadata &&
                          user.user_metadata.full_name) ||
                        "User"
                      }
                    />
                    <AvatarFallback>
                        {(user.user_metadata as UserMetadata)?.full_name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {(user.user_metadata &&
                        user.user_metadata.full_name) ||
                        "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // Replace with your update profile logic if needed
                    console.log("Update Profile clicked");
                  }}
                >
                  Update Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="default">Auth</Button>
            </Link>
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
            <div className="pt-2">
              <ThemeToggle />
            </div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          (user.user_metadata &&
                            user.user_metadata.avatar_url) ||
                          "/default-avatar.png"
                        }
                        alt={(user.user_metadata && user.user_metadata.full_name) || "User"}
                      />
                      <AvatarFallback>
                        {(user.user_metadata as UserMetadata)?.full_name?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {(user.user_metadata &&
                          user.user_metadata.full_name) ||
                          "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      console.log("Update Profile clicked");
                    }}
                  >
                    Update Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full">
                  Auth
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
