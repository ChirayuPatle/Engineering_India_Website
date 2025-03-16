"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { supabase } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
}

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

  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getCurrUser = async () => {
      setIsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      } finally {
        setIsLoading(false);
        setIsMounted(true);
      }
    };

    getCurrUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      router.push("/");
    }
  };

  if (!isMounted) return null;

  if (isLoading) return null;

  if (pathname?.startsWith("/dashboard")) return null;
  if (pathname?.startsWith("/events/")) return null;
  if (pathname?.startsWith("/auth")) return null;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all py-4 duration-300 lg:px-20 ${
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
        <img src="./logo1.png" className="w-[3.8rem]" alt="" />
          {/* <span className="text-2xl font-bold text-primary">
            Engineering India
          </span> */}
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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        user.user_metadata?.avatar_url || "/default-avatar.png"
                      }
                      alt={user.user_metadata?.full_name || "User"}
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
              {/* <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
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
              </DropdownMenuContent> */}
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="default">Login</Button>
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          user.user_metadata?.avatar_url ||
                          "/default-avatar.png"
                        }
                        alt={user.user_metadata?.full_name || "User"}
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
                {/* <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      Dashboard
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
                </DropdownMenuContent> */}
              </DropdownMenu>
            ) : (
              <Link href="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
