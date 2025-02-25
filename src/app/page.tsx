"use client";

import Container from "@/components/landing/container";
import Section from "@/components/landing/section";
import gsap from "gsap";
import { ArrowRight, Building, Rocket, Users } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  useEffect(() => {
    // GSAP Animations
    gsap.from(".header-letter", {
      y: 100,
      scale: 0.6,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.2,
    });

    gsap.from(".subtitle", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 3,
      ease: "power2.out",
    });

    gsap.from(".cta-button", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 3,
      ease: "power2.out",
    });

    gsap.from(".stat-item", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 1,
      ease: "power2.out",
      stagger: 0.2,
    });

    gsap.from(".trusted-by", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 1.5,
      ease: "power2.out",
    });

    // GSAP Mouse Follower
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power1.out",
      });
    });

    return () => {
      // Cleanup to prevent GSAP memory leaks
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(follower);
    };
  }, []);

  return (
    <>
      <div className="cursor pointer-events-none fixed left-0 top-0 z-50 h-4 w-4 rounded-full bg-white mix-blend-difference"></div>
      <div className="cursor-follower pointer-events-none fixed left-0 top-0 z-50 h-12 w-12 rounded-full bg-white opacity-30 mix-blend-exclusion"></div>
      <Section className="relative min-h-screen pb-16 pt-32">
        {/* Mouse Follower */}

        <Container className="w-full">
          <div className="mt-[4rem] flex min-h-screen flex-col items-center justify-center text-center">
            <h1
              className={`${bebasNeue.className} mb-6 text-5xl font-extralight text-white sm:text-5xl md:text-6xl lg:text-9xl`}
            >
              {"ENGINEERING INDIA".split("").map((letter, index) => (
                <span key={index} className="header-letter">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>

            <h2
              className={`subtitle ${bebasNeue.className} mb-8 rounded-lg bg-white px-10 py-1 text-3xl font-semibold text-[#0094FF] sm:text-4xl md:text-5xl lg:text-8xl`}
            >
              Ycce
            </h2>

            <p className="mx-auto mb-8 max-w-3xl text-base text-gray-300 sm:text-lg md:text-xl">
              Engineering India: YCCE's hub for
              <Link href="/docs" className="text-[#0094FF] hover:underline">
                {" "}
                creative engineers
              </Link>{" "}
              . We build, learn, and innovate.
            </p>

            <Link
              href="/events"
              className="cta-button mb-6 inline-flex items-center rounded-lg bg-[#0094FF] px-6 py-2 text-base font-medium text-white transition-colors hover:bg-[#0094FF]/90 sm:text-lg md:px-8 md:py-3 md:text-xl"
            >
              GET STARTED
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <p className="text-xs text-gray-400 sm:text-sm">
              Free Registration
            </p>

            <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-y-8 px-4 text-white sm:grid-cols-3 sm:gap-x-8 sm:px-6">
              <div className="stat-item flex flex-col items-center gap-y-2 text-center">
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

              <div className="stat-item flex flex-col items-center gap-y-2 text-center">
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

              <div className="stat-item col-span-2 flex flex-col items-center gap-y-2 justify-self-center text-center sm:col-span-1">
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

            <div className="trusted-by mt-16 w-full max-w-3xl text-center text-white">
              <h3 className="mb-6 text-lg font-semibold sm:text-xl md:text-2xl">
                TRUSTED BY
              </h3>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        {" "}
        <div className="h-screen w-full"></div>{" "}
      </Section>
    </>
  );
}
