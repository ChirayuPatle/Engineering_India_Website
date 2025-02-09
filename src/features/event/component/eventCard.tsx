"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowUpRight, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface EventsProps {
  id: string;
  title: string;
  image: string;
  isOnline: boolean;
  isFree: boolean;
  registeredCount?: number;
  daysLeft?: number;
  isAward?: boolean;
  nominateEnabled?: boolean;
  voteEnabled?: boolean;
}

const events: EventsProps[] = [
  {
    id: "67a30cfb002282355559",
    title: "L'Oréal Brandstorm 2025",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tWflU8cUaDj9jTdUp0NrCgAJHIHSU0.png",
    isOnline: true,
    isFree: true,
    daysLeft: 8,
  },
  {
    id: "67a30cfb002282355555",
    title: "The World's First Upskilling Internship",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tWflU8cUaDj9jTdUp0NrCgAJHIHSU0.png",
    isOnline: true,
    isFree: true,
    registeredCount: 86739,
    daysLeft: 15,
  },
  {
    id: "67a30cfb002282355556",
    title: "CreaTech 2025",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tWflU8cUaDj9jTdUp0NrCgAJHIHSU0.png",
    isOnline: true,
    isFree: true,
    registeredCount: 6283,
    daysLeft: 5,
  },
  {
    id: "67a30cfb002282355557",
    title: "OutThink 2025",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tWflU8cUaDj9jTdUp0NrCgAJHIHSU0.png",
    isOnline: true,
    isFree: true,
    registeredCount: 3853,
    daysLeft: 5,
  },
  {
    id: "67a30cfb002282355558",
    title: "Unstop Talent Awards 2025",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tWflU8cUaDj9jTdUp0NrCgAJHIHSU0.png",
    isOnline: true,
    isFree: true,
    isAward: true,
    nominateEnabled: true,
    voteEnabled: true,
  },
];

export function EventCard() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Explore Our Events
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <motion.div
            onClick={() => router.push(`/events/${event.id}`)}
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden cursor-pointer group shadow-lg border border-gray-100"
          >
            <div className="relative">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(event.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(event.id)
                      ? "fill-red-500 stroke-red-500"
                      : "stroke-gray-600"
                  }`}
                />
              </motion.button>
            </div>

            <div className="p-4">
              <div className="flex gap-2 mb-3">
                {event.isOnline && (
                  <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                    Online
                  </span>
                )}
                {event.isFree && (
                  <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                    Free
                  </span>
                )}
                {event.isAward && (
                  <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                    Awards
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-lg mb-4">{event.title}</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {event.registeredCount && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.registeredCount.toLocaleString()} Registered
                      </span>
                    </div>
                  )}
                  {event.daysLeft && (
                    <div className="text-sm text-gray-600">
                      {event.daysLeft} days left
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full group-hover:scale-[1.1] bg-gray-100"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>

              {(event.nominateEnabled || event.voteEnabled) && (
                <div className="mt-4 flex gap-2">
                  {event.nominateEnabled && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm"
                    >
                      <Trophy className="w-4 h-4" />
                      Nominate Now
                    </motion.button>
                  )}
                  {event.voteEnabled && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm"
                    >
                      Vote Now
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
