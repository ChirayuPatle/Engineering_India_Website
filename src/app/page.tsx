"use client";
import AboutSection from "@/components/landing/aboutSection";
import Container from "@/components/landing/container";
import EventsGallery from "@/components/landing/eventGallery";
import Faq from "@/components/landing/faq";
import Feedback from "@/components/landing/feedback";
import Magzine from "@/components/landing/magzine";
import Section from "@/components/landing/section";
import Timeline from "@/components/ui/Timeline";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Rocket, Users, Sparkles } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

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
    gsap.to(".circle", {
      rotate: 360,
      repeat: -1,
      duration: 5,
      ease: "none",
    });
  }, []);

  return (
    <>
      {/* Announcement Marquee */}

      <Section className="relative min-h-screen pb-16 pt-32">
        <div className="absolute top-0 z-0 min-h-screen w-full bg-transparent">
          {/* upper - part */}
          <div className="relative z-0 h-72 w-96">
            <div className="absolute right-32 top-24 z-10 h-32 w-32 scale-50 lg:right-16 lg:scale-100">
              <Image
                onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
                  e.currentTarget.classList.add("loaded")
                }
                className="circle"
                src="./star-1.svg"
                width={128}
                height={128}
                alt="Star"
              />
            </div>
            <div className="absolute z-0 scale-[70%] lg:scale-100">
              <Image
                onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
                  e.currentTarget.classList.add("loaded")
                }
                className="circle"
                src="./star-2.svg"
                width={200}
                height={200}
                alt="Star"
              />
            </div>
          </div>
          {/* uppper - part end  */}
          <div className="relative -right-20 z-0 h-72 w-full scale-50 md:right-0 md:scale-100">
            <div className="absolute right-32 top-48 z-10 h-32 w-32">
              <Image
                onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
                  e.currentTarget.classList.add("loaded")
                }
                className="circle"
                src="./star-1.svg"
                width={128}
                height={128}
                alt="Star"
              />
            </div>
            <div className="absolute right-0 z-0">
              <Image
                onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
                  e.currentTarget.classList.add("loaded")
                }
                className="circle"
                src="./star-2.svg"
                width={200}
                height={200}
                alt="Star"
              />
            </div>
          </div>
        </div>

        <Container className="z-100 min-h-screen w-full">
          <div className="z-50 mt-[4rem] flex min-h-screen flex-col items-center justify-center text-center">
            <h1
              className={`${bebasNeue.className} z-50 mb-6 flex flex-col gap-2 text-6xl font-extralight text-zinc-700 sm:text-5xl md:text-6xl lg:flex-row lg:text-9xl`}
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

            <p className="z-20 mx-auto mb-8 max-w-3xl text-base text-zinc-700 sm:text-lg md:text-xl">
              Engineering India: YCCE's hub for{" "}
              <Link href="/team" className="text-[#0094FF] hover:underline">
                creative engineers
              </Link>{" "}
              . We build, learn, and innovate.
            </p>

            {/* Prarambh CTA Button */}
            <div className="z-20 mb-8">
              <Button
                size="sm"
                className="group bg-black text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-900 hover:shadow-xl sm:text-base"
                asChild
              >
                <Link
                  href="/prarambh"
                  className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-6"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="whitespace-nowrap text-xs sm:text-sm">
                    Register for Prarambh 2025
                  </span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:ml-2 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-y-8 px-4 text-zinc-700 sm:grid-cols-3 sm:gap-x-8 sm:px-6">
              {[
                {
                  icon: Rocket,
                  count: "80+",
                  label: "Passionate Engineers & Innovators",
                },
                {
                  icon: Building,
                  count: "10+",
                  label: "Tech Workshops & Hackathons",
                },
                {
                  icon: Users,
                  count: "200+",
                  label: "Community Members Strong",
                },
              ].map(({ icon: Icon, count, label }, index) => (
                <div
                  key={index}
                  className="stat-item flex flex-col items-center gap-y-2 text-center"
                >
                  <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                  <div className="leading-snug">
                    <h1 className="text-2xl font-thin tracking-wide sm:text-3xl md:text-4xl">
                      {count}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {[AboutSection, EventsGallery, Timeline, Magzine, Faq, Feedback].map(
        (Component, index) => (
          <Section key={index}>
            <div className="min-h-screen w-full">
              <Component />
            </div>
          </Section>
        ),
      )}
    </>
  );
}
