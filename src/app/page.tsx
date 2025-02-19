"use client";

import Container from "@/components/landing/container";
import Section from "@/components/landing/section";
import { ArrowRight, Building, Rocket, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Section className="min-h-screen pb-16 pt-32">
      <Container className="w-full">
        <div className="mt-[4rem] flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="mb-6 text-4xl font-extralight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Engineering India
          </h1>
          <h2 className="mb-8 text-3xl font-semibold text-[#0094FF] sm:text-4xl md:text-5xl lg:text-6xl">
            YCCE.
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-base text-gray-300 sm:text-lg md:text-xl">
            Engineering India: YCCE's hub for
            <Link href="/docs" className="text-[#0094FF] hover:underline">
              {" "}
              creative engineers
            </Link>{" "}
            .We build, learn, and innovate ,{" "}
          </p>

          <Link
            href="/get-started"
            className="mb-6 inline-flex items-center rounded-lg bg-[#0094FF] px-6 py-2 text-base font-medium text-white transition-colors hover:bg-[#0094FF]/90 sm:text-lg md:px-8 md:py-3 md:text-xl"
          >
            GET STARTED
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-xs text-gray-400 sm:text-sm">Free Registration</p>

          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-y-8 px-4 text-white sm:grid-cols-3 sm:gap-x-8 sm:px-6">
            {/* First item */}
            <div className="flex flex-col items-center gap-y-2 text-center">
              <Rocket className="h-10 w-10 text-zinc-200/80 sm:h-12 sm:w-12" />
              <div className="leading-snug">
                <h1 className="text-2xl font-thin tracking-wide sm:text-3xl md:text-4xl">
                  80+
                </h1>
                <p className="text-sm sm:text-base md:text-lg">
                  Passionate Engineers & Innovators
                </p>
              </div>
            </div>

            {/* Second item */}
            <div className="flex flex-col items-center gap-y-2 text-center">
              <Building className="h-10 w-10 text-zinc-200/80 sm:h-12 sm:w-12" />
              <div className="leading-snug">
                <h1 className="text-2xl font-thin tracking-wide sm:text-3xl md:text-4xl">
                  20+
                </h1>
                <p className="text-sm sm:text-base md:text-lg">
                  Tech Workshops & Hackathons
                </p>
              </div>
            </div>

            {/* Third item */}
            <div className="col-span-2 flex flex-col items-center gap-y-2 justify-self-center text-center sm:col-span-1">
              <Users className="h-10 w-10 text-zinc-200/80 sm:h-12 sm:w-12" />
              <div className="leading-snug">
                <h1 className="text-2xl font-thin tracking-wide sm:text-3xl md:text-4xl">
                  500+
                </h1>
                <p className="text-sm sm:text-base md:text-lg">
                  Community Members Strong
                </p>
              </div>
            </div>
          </div>

          {/* Community Description */}
          {/* <div className="mt-16 max-w-3xl text-center text-gray-300">
              <p className="mb-6 text-lg">
              Engineering India is a vibrant community of passionate engineers, innovators,
              and tech enthusiasts at YCCE. We foster creativity, collaboration, and
              technical excellence through hands-on projects, workshops, and hackathons.
              </p>
              <p className="text-lg">
              Join us in building the future of technology while developing essential
              skills and connecting with like-minded peers who share your drive for innovamaketion.
              </p>
            </div> */}

          <div className="mt-16 w-full max-w-3xl text-center text-white">
            <h3 className="mb-6 text-lg font-semibold sm:text-xl md:text-2xl">
              TRUSTED BY
            </h3>
          </div>
        </div>
      </Container>
      {/* <main className="pb-16 pt-32">
       
      </main> */}
    </Section>
  );
}
