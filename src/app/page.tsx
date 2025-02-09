"use client";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContext, useEffect } from "react";

import Footer from "@/components/footer";
import BackgroundPaths from "@/features/landing/components/backgroundPath";
import FAQ from "@/features/landing/components/faqs";
import Feedback from "@/features/landing/components/feedback";
import HeadsCard from "@/features/landing/components/HeadsCard";
import ImageSlider from "@/features/landing/components/image-slider/ImageSlider";
import Loading from "./loading";
import AuthContext from "@/context/auth-context";
import { HeadsDetails } from "@/constant/events";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
    });
    const raf = (time: number): void => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      lenis.destroy();
    };
  }, []);

  const authContextData = useContext(AuthContext);
  const isAuthenticated = authContextData?.isAuthenticated;

  console.log(isAuthenticated);

  // console.log(isAuthenticated);

  return (
    <div className="relative bg-white/90 text-white overflow-x-hidden">
      <div className="space-y-2">
        <section className="w-full ">
          <BackgroundPaths title="Engineering India, YCCE" />
        </section>
        <section className="container mx-auto px-4 sm:px-6">
          <ImageSlider />
        </section>
        <section className="container mx-auto flex flex-col items-center justify-start px-4 sm:px-14">
          <h1 className="my-6 text-black/80 text-2xl md:text-7xl font-semibold  ">
            Our Heads
          </h1>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 items-center justify-center p-6 h-full ">
            {HeadsDetails.map((head) => {
              return (
                <HeadsCard
                  name={head.name}
                  post={head.post}
                  imageUrl={head.imageUrl}
                />
              );
            })}
          </div>
        </section>
        <section className="container w-full mx-auto flex flex-col items-center justify-start px-4 sm:px-14">
          <Feedback />
        </section>

        <section className="container mx-auto px-4 sm:px-6 py-12">
          <FAQ />
        </section>

        {/* Footer (white background) */}
        <Footer />
      </div>
    </div>
  );
}
