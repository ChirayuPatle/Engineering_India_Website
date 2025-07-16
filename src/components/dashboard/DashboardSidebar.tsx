"use client";

import { Button } from "@/components/ui/button";
// import { useUser } from "@/context/userContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Calendar,
  CreditCard,
  LogOut,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SidebarNavItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarNavItem({
  icon: Icon,
  title,
  path,
  active,
  onClick,
}: SidebarNavItemProps) {
  return (
    <Link href={path}>
      <Button
        variant="ghost"
        className={cn(
          "mb-1 w-full justify-start gap-2 pl-4 md:pl-8",
          active
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-muted",
        )}
        onClick={onClick}
      >
        <Icon className="h-5 w-5" />
        <span>{title}</span>
      </Button>
    </Link>
  );
}

interface DashboardSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DashboardSidebar({
  open,
  onOpenChange,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleNavigation = () => {
    if (isMobile) {
      onOpenChange(false);
    }
  };

  // const { loading, user } = useUser();

  const navItems = [
    { title: "Home", icon: BarChart3, path: "/dashboard" },
    { title: "Profile", icon: User, path: "/dashboard/profile" },
    { title: "All Events", icon: Calendar, path: "/dashboard/events" },
    {
      title: "My Registrations",
      icon: Users,
      path: "/dashboard/registrations",
    },
    { title: "Payments", icon: CreditCard, path: "/dashboard/payments" },
  ];

  const handleLogout = async () => {
    authClient
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        toast.error("Failed to logout");
      });
  };

  return (
    <>
      {isMobile && open && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => onOpenChange(false)}
        />
      )}

      <div
        className={cn(
          "fixed top-0 z-40 h-screen border-r bg-white transition-all duration-300 ease-in-out dark:bg-gray-900",
          "w-[250px]",
          isMobile && (open ? "left-0" : "-left-[250px]"),
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link href="/">
              <div className="flex items-center">
                <span className="text-lg font-semibold">
                  Engineering India | YCCE
                </span>
              </div>
            </Link>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="flex-1 overflow-auto py-4">
            <div className="space-y-1 px-3">
              {navItems.map((item) => (
                <SidebarNavItem
                  key={item.path}
                  icon={item.icon}
                  title={item.title}
                  path={item.path}
                  active={pathname === item.path}
                  onClick={handleNavigation}
                />
              ))}
            </div>
            {/* <div className="mt-4 px-3">
              <div className="flex w-full justify-center">
                <Link href="/dashboard/membership">
                  <Button
                    variant="default"
                    className="justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
                    onClick={handleNavigation}
                  >
                    <span>Join Membership</span>
                  </Button>
                </Link>
              </div>
            </div> */}
          </nav>

          <div className="border-t p-3">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
