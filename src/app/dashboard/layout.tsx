"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/page-loader";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-background">
      <PageLoader />
      <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarOpen && !isMobile ? "ml-[250px]" : "ml-0",
        )}
      >
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onSidebarOpenChange={setSidebarOpen}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
