import Image from "next/image";
import { MoreVertical, Share, Edit2 } from "lucide-react";
import { type UserMetadata } from "@supabase/supabase-js";

interface ProfileHeaderProps {
  user?: UserMetadata | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  // Fallbacks in case user metadata is missing
  const profileName = user?.full_name || user?.name || "Amanda Smith";
  const profileImage = user?.avatar || "/placeholder.svg?height=128&width=128";
  const profileLocation = user?.location || "Los Angeles, United States";
  const profileStatus = user?.status || "Full-time";

  return (
    <div className="relative">
      {/* Gradient banner */}
      <div className="h-48 bg-gradient-to-r from-amber-200 to-rose-200"></div>
      <div className="absolute left-24 right-0 top-28 h-48">
        <div className="relative h-32 w-32">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              src={profileImage}
              alt={profileName}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <button
            className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 transform rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 focus:outline-none"
            // onClick handler here to trigger profile image change
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Profile picture with edit button */}

      {/* More options button */}
      <div className="absolute bottom-4 right-4">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <MoreVertical className="h-6 w-6" />
        </button>
      </div>

      {/* Profile details */}
      <div className="px-8 pb-6 pt-20">
        <h1 className="text-3xl font-bold text-gray-800">{profileName}</h1>

        <div className="mt-2 flex items-center text-gray-600">
          <span className="mr-2 text-sm">{user?.username || "@amanda21"}</span>
          <span className="mx-2 text-sm">•</span>
          <span className="text-sm">{profileStatus}</span>
        </div>

        <div className="mt-2 text-gray-600">
          <span>{profileLocation}</span>
        </div>

        <div className="mt-4">
          <p className="text-gray-700">
            {user?.bio ||
              "Passionate about crafting engaging user experiences and innovative designs. Always learning and growing."}
          </p>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Share className="mr-2 h-4 w-4" />
            Share profile
          </button>
        </div>
      </div>
    </div>
  );
}
