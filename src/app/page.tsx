"use client";

import Gallery from "@/features/landing/components/gallery";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <main className="container mx-auto px-6 h-screen flex items-center justify-center relative gap-12">
        {/* Background Blurs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-60 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute -bottom-[20%] left-1/4 w-[60%] h-[s0%] bg-blue-400 rounded-full opacity-40 blur-3xl translate-x-[2%] translate-y-1/4" />
        <div className="absolute top-[40%] left-[40%] w-[65%] h-[35%] bg-blue-primary rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />

        {/* Left Content */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Engineering India | YCCE
          </h1>
          <p className="text-lg text-gray-600 mb-8">Club Tagline</p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/auth/login")}
              className="px-6 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
            <button className="px-6 py-3 text-blue-600 bg-blue-100 hover:bg-white border border-blue-600 rounded-full shadow-lg transition-colors">
              Discover events ➔
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex-shrink-0"
        ></motion.div>
      </main>
      <main className="min-h-screen"></main>
      <main className="container mx-auto px-6 h-screen flex items-center justify-center relative gap-12">
        <Gallery />
      </main>
    </section>
  );
}
