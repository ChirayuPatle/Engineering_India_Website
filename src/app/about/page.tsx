"use client";

import { Typography } from "@/components/ui/typography";
import { siteConfig } from "@/lib/constants";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 mt-[2rem] sm:px-6 lg:px-8">
        {/* <div className="my-[4rem]"></div> */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <Typography variant="h1" className="mb-6">
              About {siteConfig.name}
            </Typography>
            <Typography className="mb-4">
              Welcome to {siteConfig.name}, where technology meets community. We
              are a passionate group of students and tech enthusiasts dedicated
              to exploring and advancing technology together.
            </Typography>
            <Typography className="mb-4">
              Our mission is to create an inclusive environment where members
              can learn, collaborate, and grow their technical skills while
              building meaningful connections with fellow tech enthusiasts.
            </Typography>
            <Typography className="mb-4">
              Founded in 2024, we've grown into a vibrant community of over 500
              members, hosting regular workshops, hackathons, and networking
              events that bring together students, professionals, and industry
              experts.
            </Typography>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src="https://res.cloudinary.com/priyanshukayarkar/image/upload/v1740506794/WhatsApp_Image_2025-02-25_at_11.35.13_PM_fxxfc9.jpg"
              alt="Students collaborating"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16">
          <Typography variant="h2" className="mb-8">
            What We Offer
          </Typography>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Team Building",
                description:
                  "Connect with coordinators and get the opportunity to work with them.",
              },
              {
                title: "Self Development",
                description:
                  "Collaborating and Working with a team enhances your soft skills.",
              },
              {
                title: "Workshops & Training",
                description:
                  "Regular hands-on sessions covering the latest technologies and programming concepts.",
              },
              {
                title: "Networking Events",
                description:
                  "Connect with industry professionals and fellow tech enthusiasts.",
              },
              {
                title: "Project Collaboration",
                description:
                  "Work on real-world projects and build your portfolio with other members.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="cursor-pointer rounded-lg border bg-card p-6 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-2 hover:-rotate-1 hover:scale-105 hover:bg-blue-700 hover:text-white hover:shadow-2xl"
              >
                <Typography variant="h3" className="mb-2">
                  {item.title}
                </Typography>
                <Typography className="">{item.description}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-8 h-[400px] overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
            alt="Students collaborating"
            fill
            className="object-cover"
          />
        </div>
      </main>
    </>
  );
}
