"use client";

import Navbar from "@/components/landing/navbar";
import ProfileHeader from "@/components/profile/profileHeader";
import SkillsSection from "@/components/profile/skillSection";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 pt-4">
        <div className="mx-auto max-w-7xl bg-white px-4 shadow-sm">
          <div className="flex flex-col">
            <ProfileHeader />

            <div className="px-8 py-6">
              <SkillsSection />

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Employment History
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
