"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { EventCard } from "@/components/events/eventCard";
import { useEvents } from "@/context/eventContext";
import { TriangleAlert, Loader2 } from "lucide-react";
import { FloatingCloud } from "@/components/landing/FloatingCloud";

function EventCardSkeleton() {
  return (
    <div className="h-[450px] animate-pulse rounded-[32px] border border-white/10 bg-white/5 p-3">
      <div className="mb-6 aspect-[16/10] w-full rounded-[24px] bg-white/10" />
      <div className="space-y-4 px-5">
        <div className="h-8 w-3/4 rounded-lg bg-white/10" />
        <div className="h-4 w-1/2 rounded-lg bg-white/10" />
        <div className="h-20 w-full rounded-xl bg-white/10" />
        <div className="h-12 w-full rounded-xl bg-white/10" />
      </div>
    </div>
  );
}

export default function EventsPage() {
  const { events, loading, error } = useEvents();

  return (
    <main className="relative w-full overflow-hidden bg-[#0F1B40]">
      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#0F1B40] px-4 pb-20 pt-40 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl"
        >
          <h1 className="font-fraunces mb-6 text-4xl font-bold md:text-7xl">
            Our <span className="text-[#D4EBFF]">Events</span>
          </h1>
          <p className="mx-auto max-w-xl font-sans text-white/70">
            A celebration of innovation, technical excellence, and social
            responsibility within the engineering community.
          </p>
        </motion.div>

        <FloatingCloud
          top="20%"
          left="5%"
          speed={0.5}
          cloudNum={1}
          opacity="opacity-30"
        />
        <FloatingCloud
          top="40%"
          left="80%"
          speed={0.8}
          cloudNum={2}
          opacity="opacity-20"
          scale={0.8}
        />
      </section>

      {/* Events Grid */}
      <section className="relative z-20 -mt-10 px-4 py-24 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-[32px] border border-red-400/20 bg-red-400/5 p-12 text-center text-red-200 backdrop-blur-md"
            >
              <TriangleAlert className="mb-6 h-16 w-16 text-red-400" />
              <h2 className="font-fraunces text-2xl font-semibold">
                Oops! Something went wrong.
              </h2>
              <p className="mt-2 max-w-sm text-red-200/60">
                We couldn't load the events. Please try again later.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Hardcoded Hackathon 2025 Event */}
              <Link href="/events/hackathon">
                <EventCard
                  title="HACKATHON 2025"
                  date={new Date("2025-11-01")}
                  location="YCCE, Nagpur"
                  description="Unleash your creativity and technical prowess in our flagship 24-hour hackathon! Build innovative solutions, collaborate with talented developers."
                  imageUrl="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpfeU5o0XrTM2A4iGtHSU9JzXjlhanE7L0yQkV"
                />
              </Link>

              {/* Dynamic events from database */}
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/events/${event.id}`}>
                    <EventCard
                      title={event.name}
                      date={new Date(event.startDate || Date.now())}
                      location={event.location || "TBA"}
                      description={
                        event.description || "No description available."
                      }
                      imageUrl={event.bannerImage?.trim() || "/notfound.svg"}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="mt-12 py-20 text-center">
              <h3 className="font-fraunces text-2xl text-white/40">
                No more events found
              </h3>
            </div>
          )}
        </div>

        {/* Clouds only in Hero Section */}
      </section>
    </main>
  );
}
