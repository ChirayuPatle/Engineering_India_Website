"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the pathname changes, show the loader
    setLoading(true);
    // Hide loader after a short delay (adjust as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div className="h-1 w-full overflow-hidden bg-gray-200">
        <div className="animate-indeterminate h-full bg-primary" />
      </div>
    </div>
  );
}
