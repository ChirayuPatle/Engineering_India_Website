"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Heart,
  Link2,
  LogOut,
  Menu,
  Share2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/libs/utils";
import type React from "react"; // Added import for React

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  {
    title: "Events Registered",
    icon: Calendar,
    href: "/dashboard/events",
  },
  {
    title: "Payment Details",
    icon: CreditCard,
    href: "/dashboard/payments",
  },
  {
    title: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    title: "Liked Events",
    icon: Heart,
    href: "/dashboard/liked",
  },
  {
    title: "Social Links",
    icon: Link2,
    href: "/dashboard/social",
  },
  {
    title: "Share Profile",
    icon: Share2,
    href: "/dashboard/share",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedItem, setSelectedItem] = useState("Events Registered");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden md:flex w-64 flex-col fixed inset-y-0"
      >
        <div className="flex flex-col flex-1 min-h-0 bg-card border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <ScrollArea className="mt-5 flex-1">
              <nav className="flex-1 px-2 space-y-1">
                {navItems.map((item) => (
                  <Button
                    key={item.title}
                    variant={
                      selectedItem === item.title ? "secondary" : "ghost"
                    }
                    className={cn(
                      "w-full justify-start gap-2",
                      selectedItem === item.title && "bg-secondary"
                    )}
                    onClick={() => setSelectedItem(item.title)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                ))}
              </nav>
            </ScrollArea>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2 mt-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 flex flex-col pt-5 pb-4">
                <div className="flex items-center flex-shrink-0 px-4">
                  <h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <ScrollArea className="mt-5 flex-1">
                  <nav className="flex-1 px-2 space-y-1">
                    {navItems.map((item) => (
                      <Button
                        key={item.title}
                        variant={
                          selectedItem === item.title ? "secondary" : "ghost"
                        }
                        className={cn(
                          "w-full justify-start gap-2",
                          selectedItem === item.title && "bg-secondary"
                        )}
                        onClick={() => setSelectedItem(item.title)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Button>
                    ))}
                  </nav>
                </ScrollArea>
              </div>
              <div className="flex-shrink-0 flex border-t p-4">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
