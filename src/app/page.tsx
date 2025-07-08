"use client";
import AboutSection from "@/components/landing/aboutSection";
import Container from "@/components/landing/container";
import EventsGallery from "@/components/landing/eventGallery";
import Faq from "@/components/landing/faq";
import Feedback from "@/components/landing/feedback";
import magzine from "@/components/landing/magzine";
import Section from "@/components/landing/section";
import Timeline from "@/components/ui/Timeline";
import { ArrowRight, Building, Rocket, Users } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  // useEffect(() => {
  //   if (!sessionStorage.getItem("animationPlayed")) {
  //     gsap.from(".header-letter", {
  //       y: 100,
  //       scale: 0.6,
  //       opacity: 0,
  //       duration: 1,
  //       ease: "back.out(1.7)",
  //       stagger: 0.2,
  //     });

  //     gsap.from([".subtitle", ".cta-button"], {
  //       opacity: 0,
  //       y: 50,
  //       duration: 1,
  //       delay: 3,
  //       ease: "power2.out",
  //     });

  //     gsap.from(".stat-item", {
  //       opacity: 0,
  //       y: 40,
  //       duration: 1,
  //       delay: 1,
  //       ease: "power2.out",
  //       stagger: 0.2,
  //     });

  //     gsap.from(".trusted-by", {
  //       opacity: 0,
  //       y: 40,
  //       duration: 1,
  //       delay: 1.5,
  //       ease: "power2.out",
  //     });

  //     sessionStorage.setItem("animationPlayed", "true");
  //   }
  // }, []);

  // useEffect(() => {
  //   const handleRefresh = () => {
  //     // Remove animation flag on page refresh
  //     sessionStorage.removeItem("animationPlayed");
  //   };

  //   window.addEventListener("beforeunload", handleRefresh);
  //   return () => window.removeEventListener("beforeunload", handleRefresh);
  // }, []);

  // useEffect(() => {
  //   const cursor = document.querySelector(".cursor");
  //   const follower = document.querySelector(".cursor-follower");

  //   document.addEventListener("mousemove", (e) => {
  //     gsap.to(cursor, {
  //       x: e.clientX,
  //       y: e.clientY,
  //       duration: 0.3,
  //       ease: "power3",
  //     });
  //     gsap.to(follower, {
  //       x: e.clientX,
  //       y: e.clientY,
  //       duration: 0.4,
  //       ease: "power1.out",
  //     });
  //   });

  //   gsap.to(".circle", {
  //     rotate: 360,
  //     repeat: -1,
  //     duration: 5,
  //     // yoyo:true,
  //     ease: "none",
  //   });

  //   return () => {
  //     // Cleanup to prevent GSAP memory leaks
  //     gsap.killTweensOf(cursor);
  //     gsap.killTweensOf(follower);
  //   };
  // }, []);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     smoothWheel: true,
  //   });

  //   const raf = (time: any) => {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   };

  //   requestAnimationFrame(raf);
  //   return () => lenis.destroy();
  // }, []);
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 rounded-full bg-white mix-blend-difference lg:block"></div>

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
            <Link
              href="/events"
              className="{cta-button} z-50 mb-6 inline-flex cursor-pointer items-center rounded-lg bg-[#0094FF] px-6 py-2 text-base font-medium text-white transition-colors hover:bg-[#0094FF]/90 sm:text-lg md:px-8 md:py-3 md:text-xl"
            >
              GET STARTED
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

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

      {[AboutSection, EventsGallery, Timeline, magzine, Faq, Feedback].map(
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
