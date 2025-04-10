// components/auth/sign-out-button.tsx
"use client";

import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </Button>
  );
}
