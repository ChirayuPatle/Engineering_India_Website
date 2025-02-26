"use client";

import { Typography } from "@/components/ui/typography";
import { supabase } from "@/utils/supabase/client";
import { type UserMetadata } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<UserMetadata | null>(null);
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data) {
      setUser(data.user?.user_metadata ?? null);
      console.log(data.user?.user_metadata);
    } else {
      console.error("AUTH ERROR");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center rounded-lg bg-white p-8 text-black shadow">
          <img
            // src={user?.-}
            alt={String(user?.avatar_url)}
            className="mb-4 h-32 w-32 rounded-full object-cover"
          />
          <Typography variant="p" className="mb-2 text-2xl font-bold">
            {user?.full_name}
          </Typography>
          <Typography variant="p" className="mb-4 text-muted-foreground">
            {user?.email}
          </Typography>
          {/* <Typography variant="p" className="mb-6 text-center">
            {user.}
          </Typography> */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* <a
              href={user.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a> */}
            {/* <a
              href={user.socialProfiles.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              Instagram
            </a> */}
            {/* <a
              href={userDetails.socialProfiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:underline"
            >
              LinkedIn
            </a> */}
          </div>
        </div>
      </main>
    </div>
  );
}
