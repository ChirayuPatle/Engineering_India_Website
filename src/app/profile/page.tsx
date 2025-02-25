"use client";

import React from "react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

const userData = {
  fullName: "Varis Rana",
  email: "varis3@gmail.com",
  avatarUrl: "/default-avatar.png", // Replace with actual avatar URL or fallback image
  bio: "I am a passionate developer focused on building event-driven applications. I love coding and coffee.",
  socialProfiles: {
    facebook: "https://facebook.com/varisrana",
    instagram: "https://instagram.com/varisrana",
    linkedin: "https://linkedin.com/in/varisrana",
  },
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/">
            <Typography variant="h2" className="text-green-600">
              Engineering India
            </Typography>
          </Link>
          <div>
            <Link href="/profile/edit">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center rounded-lg bg-white p-8 shadow">
          <img
            src={userData.avatarUrl}
            alt={userData.fullName}
            className="mb-4 h-32 w-32 rounded-full object-cover"
          />
          <Typography variant="h1" className="mb-2 text-2xl font-bold">
            {userData.fullName}
          </Typography>
          <Typography variant="p" className="mb-4 text-muted-foreground">
            {userData.email}
          </Typography>
          <Typography variant="p" className="mb-6 text-center">
            {userData.bio}
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={userData.socialProfiles.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
            <a
              href={userData.socialProfiles.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              Instagram
            </a>
            <a
              href={userData.socialProfiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
