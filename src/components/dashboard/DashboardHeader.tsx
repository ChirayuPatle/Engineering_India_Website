"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

export function DashboardHeader({
  sidebarOpen,
  onSidebarOpenChange,
}: DashboardHeaderProps) {
  const isMobile = useIsMobile();

  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background px-4 md:px-6">
      {/* 
        Main row container: ensures that on all screen sizes, 
        everything is in one horizontal row.
      */}
      <div className="flex h-full w-full items-center">
        {/* Mobile menu button (hidden on md and above) */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            className="mr-2 md:hidden"
            onClick={() => onSidebarOpenChange(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Title for mobile only, hidden on larger screens */}
        <div className="mr-auto text-xl font-semibold md:hidden">
          Club Portal
        </div>

        {/* Search form: hidden on mobile, visible on md and above */}
        <form className="mr-auto hidden md:block">
          <div className="relative">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
            {/* <Input
              type="search"
              placeholder="Search..."
              className="rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            /> */}
          </div>
        </form>

        {/* Right-aligned actions: theme, notifications, avatar */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="text-muted-foreground"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* User avatar with dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full pr-2">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback> */}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
