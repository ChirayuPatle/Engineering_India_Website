"use client";

import { EventCard } from "@/components/events/eventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const allEvents = [
  {
    slug: "tech-talk-ai",
    title: "Tech Talk: Future of AI",
    date: "March 15, 2024",
    location: "Main Auditorium",
    description:
      "Join us for an exciting discussion about the future of AI and its impact on society.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    category: "Tech Talk",
  },
  {
    slug: "coding-workshop",
    title: "Coding Workshop",
    date: "March 20, 2024",
    location: "Computer Lab",
    description:
      "Learn the basics of web development in this hands-on workshop.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Workshop",
  },
  // {
  //   slug: "networking-night",
  //   title: "Networking Night",
  //   date: "March 25, 2024",
  //   location: "Student Center",
  //   description: "Connect with industry professionals and fellow students.",
  //   imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
  //   category: "Networking",
  // },
  {
    slug: "hackathon-2024",
    title: "Hackathon 2024",
    date: "April 1-3, 2024",
    location: "Innovation Hub",
    description:
      "48 hours of coding, creativity, and collaboration. Build something amazing!",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    category: "Hackathon",
  },
  {
    slug: "data-science-workshop",
    title: "Data Science Workshop",
    date: "April 10, 2024",
    location: "Room 201",
    description:
      "Introduction to data analysis and machine learning with Python.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    category: "Workshop",
  },
  {
    slug: "design-systems-talk",
    title: "Design Systems Talk",
    date: "April 15, 2024",
    location: "Design Lab",
    description:
      "Learn about creating and maintaining design systems at scale.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    category: "Tech Talk",
  },
];

const categories = ["All", "Tech Talk", "Workshop", "Networking", "Hackathon"];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* <Navigation /> */}
      <main className="container mx-auto px-4 mt-[2rem] py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Typography variant="h1" className="mb-6">
            Upcoming Events
          </Typography>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="hover:opacity-90"
            >
              <EventCard {...event} href={`/events/${event.slug}`} />
            </Link>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="mt-12 text-center">
            <Typography variant="h3" className="text-muted-foreground">
              No events found
            </Typography>
          </div>
        )}
      </main>
    </>
  );
}
