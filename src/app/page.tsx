"use client";

import { useEffect } from "react";
import AboutSection from "@/components/landing/aboutSection";
import Container from "@/components/landing/container";
import EventsGallery from "@/components/landing/eventGallery";
import Faq from "@/components/landing/faq";
import Feedback from "@/components/landing/feedback";
import Section from "@/components/landing/section";
import FeatureCarousel from "@/vcomponents/FeatureCarousel";
import Timeline from "@/vcomponents/Timeline";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ArrowRight, Building, Rocket, Users } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  useEffect(() => {
    if (!sessionStorage.getItem("animationPlayed")) {
      gsap.from(".header-letter", {
        y: 100,
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
      });

      gsap.from([".subtitle", ".cta-button"], {
        opacity: 0,
        y: 50,
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

      sessionStorage.setItem("animationPlayed", "true");
    }
  }, []);

  useEffect(() => {
    const handleRefresh = () => {
      // Remove animation flag on page refresh
      sessionStorage.removeItem("animationPlayed");
    };

    window.addEventListener("beforeunload", handleRefresh);
    return () => window.removeEventListener("beforeunload", handleRefresh);
  }, []);

useEffect(() => {



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

 

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: any) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy(); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="cursor pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 rounded-full bg-white mix-blend-difference lg:block"></div>

      <Section className="relative min-h-screen pb-16 pt-32">
        <Container className="min-h-screen w-full">
          <div className="z-50 mt-[4rem] flex min-h-screen flex-col items-center justify-center text-center">
            <h1
              className={`${bebasNeue.className} z-50 mb-6 flex gap-2 text-6xl font-extralight text-zinc-700 sm:text-5xl md:text-6xl lg:text-9xl lg:flex-row flex-col `}
            >
          
              <div>
                {"ENGINEERING".split("").map((letter, index) => (
                  <span key={index} className="header-letter">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </div>
              <span className="header-letter"> </span>
              <div className="flex">
                <span className="header-letter flex items-center justify-center rounded-bl-lg rounded-tl-lg bg-orange-400 px-4 text-8xl text-white">
                  IN
                </span>
                <span className="header-letter flex items-center justify-center border-2 px-4 text-8xl text-blue-500">
                  D
                </span>
                <span className="header-letter flex items-center justify-center rounded-br-lg rounded-tr-lg border-2 bg-green-500 px-4 text-8xl text-white">
                  IA
                </span>
              </div>
            </h1>

            <h2
              className={`subtitle ${bebasNeue.className} mb-8 rounded-lg bg-[#0094FF] px-10 py-1 text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-8xl`}
            >
              Ycce
            </h2>

            <p className="mx-auto mb-8 max-w-3xl text-base text-zinc-700 sm:text-lg md:text-xl">
              Engineering India: YCCE's hub for{" "}
              <Link href="/docs" className="text-[#0094FF] hover:underline">
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

            <p className="text-xs text-gray-400 sm:text-sm">Free Registration</p>

            <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-y-8 px-4 text-zinc-700 sm:grid-cols-3 sm:gap-x-8 sm:px-6">
              {[ 
                { icon: Rocket, count: "80+", label: "Passionate Engineers & Innovators" },
                { icon: Building, count: "20+", label: "Tech Workshops & Hackathons" },
                { icon: Users, count: "500+", label: "Community Members Strong" },
              ].map(({ icon: Icon, count, label }, index) => (
                <div key={index} className="stat-item flex flex-col items-center gap-y-2 text-center">
                  <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                  <div className="leading-snug">
                    <h1 className="text-2xl font-thin tracking-wide sm:text-3xl md:text-4xl">{count}</h1>
                    <p className="text-sm sm:text-base md:text-lg">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="trusted-by mt-16 w-full max-w-3xl text-center text-zinc-700">
              <h3 className="mb-6 text-lg font-semibold sm:text-xl md:text-2xl">TRUSTED BY</h3>
            </div>
          </div>
        </Container>
      </Section>

      {[AboutSection, FeatureCarousel, EventsGallery, Feedback, Timeline, Faq].map((Component, index) => (
        <Section key={index}>
          <div className="min-h-screen w-full">
            <Component />
          </div>
        </Section>
      ))}
    </>
  );
}
