import { type ReactNode, useState, useEffect } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarOpen && !isMobile ? "ml-[250px]" : "ml-0",
        )}
      >
        <DashboardHeader
          onSidebarOpenChange={(open) => setSidebarOpen(open)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
