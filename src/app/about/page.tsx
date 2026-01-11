"use client";

import { Typography } from "@/components/ui/typography";
import { siteConfig } from "@/lib/constants";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-16 pt-24 sm:px-8 lg:px-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-12">
        <div>
          <Typography variant="h2" className="mb-6 font-bold">
            About {siteConfig.name} | YCCE
          </Typography>
          <Typography className="mb-4">
            Welcome to Engineering India YCCE, established in 2022, harnessing
            the power of youth to build a better India. We've grown to over 250
            members, fostering a community where technical skills meet social
            awareness.
          </Typography>
          <Typography className="mb-4">
            Beyond learning and collaboration, we empower young engineers to
            directly address local challenges through innovative, sustainable
            projects.
          </Typography>
          <Typography className="mb-4">
            Our motive is to "Think Nationally, Act Locally". We celebrate our
            Indian heritage through culturally infused events and collaborative
            projects, creating a space where innovation and tradition
            harmoniously build a brighter future.
          </Typography>
          <Typography className="mb-4">
            We conduct workshops and initiatives that tackle real-world issues,
            cultivating socially responsible leaders. By connecting technical
            expertise with community needs through mentorship and practical
            projects, we are building a generation of youth who are not just
            engineers, but agents of positive change for India's future.
          </Typography>
          <Typography className="mb-4 italic text-gray-700">
            "Engineering India is not just a club but a thought process."
          </Typography>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border shadow-md">
          <Image
            src="https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/IMG_6124%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvSU1HXzYxMjQgKDEpLmpwZyIsImlhdCI6MTc0MzA5NzMwNSwiZXhwIjoyMDU4NDU3MzA1fQ.RJUntXH9XN5nhLN91rJCsX4EgQpEvvlWPle5VU2kQTA"
            alt="Students collaborating"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg border shadow-md">
        <Image
          src="https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/aboutpage.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvYWJvdXRwYWdlLkpQRyIsImlhdCI6MTc0MzE3OTc2MiwiZXhwIjoyMDU4NTM5NzYyfQ.AJPbrx-_EfKnLs0R_EhE2KeLXMfXrRSzUGCXdmJzr_M"
          alt="Students collaborating"
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-16 text-center">
        <Typography variant="h2" className="mb-8 font-bold">
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
                "Collaborating and working with a team enhances your soft skills.",
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
            {
              title: "Social Work",
              description:
                "Empowers youth to use their engineering skills for impactful social work projects within their communities.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="cursor-pointer rounded-lg border bg-white p-6 shadow-lg transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:bg-gray-900 hover:text-white hover:shadow-xl"
            >
              <Typography variant="h3" className="mb-2 font-semibold">
                {item.title}
              </Typography>
              <Typography>{item.description}</Typography>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
