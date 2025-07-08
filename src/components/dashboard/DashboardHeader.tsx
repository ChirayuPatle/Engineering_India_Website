"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-user";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

export function DashboardHeader({
  sidebarOpen,
  onSidebarOpenChange,
}: DashboardHeaderProps) {
  const isMobile = useIsMobile();
  const { data: user } = useCurrentUser();
  const router = useRouter();

  console.log("USER\n\n", user);

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background px-4 md:px-6">
      <div className="flex h-full w-full items-center">
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

        {/* Title and User Banner */}
        <div className="mr-auto flex items-center gap-4">
          <div className="text-xl font-semibold md:hidden">Club Portal</div>
        </div>

        <form className="mr-auto hidden md:block">
          <div className="relative">{/* Search form content */}</div>
        </form>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="text-muted-foreground"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image || ""} alt={user?.name ?? ""} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
