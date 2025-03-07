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
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="w-full h-1 overflow-hidden bg-gray-200">
        <div className="h-full bg-primary animate-indeterminate" />
      </div>
    </div>
  );
}
