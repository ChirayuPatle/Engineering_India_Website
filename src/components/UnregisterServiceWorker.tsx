"use client";

import { useEffect } from "react";

export function UnregisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log("Service Worker unregistered successfully");
            }
          });
        }
      });
    }
  }, []);

  return null;
}
