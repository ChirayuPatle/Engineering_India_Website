"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowUpRight, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";

// Updated interface for event objects.
export interface EventsProps {
  id: string;
  title: string;
  imgUrl: string[]; // We'll display the first image from this array.
  isOnline: boolean;
  isFree: boolean;
  registeredCount?: number;
  daysLeft?: number;
  isAward?: boolean;
  nominateEnabled?: boolean;
  voteEnabled?: boolean;
}

interface EventCardProps {
  events: EventsProps[];
}

export function EventCard({ events }: EventCardProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Responsive grid:
          - 1 column on extra-small devices,
          - 2 columns on small devices,
          - 3 columns on medium devices (minimum 3 cards per row),
          - 4 columns on large devices.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            onClick={() => router.push(`/events/${event.id}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden cursor-pointer group shadow-lg border border-gray-100"
          >
            {/* Image container with a neutral background */}
            <div className="relative bg-gray-100">
              <Image
                src={event.imgUrl[0] || "/placeholder.svg"}
                alt={event.title}
                width={400}
                height={200}
                // Use object-contain so the entire image is visible (note: letterboxing may occur)
                className="w-full h-48 object-contain"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(event.id);
                }}
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
                  {event.registeredCount !== undefined && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.registeredCount.toLocaleString()} Registered
                      </span>
                    </div>
                  )}
                  {event.daysLeft !== undefined && (
                    <div className="text-sm text-gray-600">
                      {event.daysLeft} days left
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100"
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
