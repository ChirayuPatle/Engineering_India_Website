"use client";
import React, { useEffect } from "react";
import { TimelineDemo } from "@/features/event/component/timeline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardOragnaizer from "@/features/event/component/eventOrganizerCard";
import Lenis from "@studio-freight/lenis";
import Gallery from "@/features/landing/components/gallery";

function EventInfo() {
  gsap.registerPlugin(ScrollTrigger);
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

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    gsap.from(".card", {
      scrollTrigger: {
        trigger: ".page3",
        start: "top 30%",
        end: "top bottom",
        scrub: 6,
      },
      duration: 1.2,
      y: 80,
      opacity: 0,
      stagger: 0.2,
      ease: "power3",
    });
  }, []);

  return (
    <>
      <div className="page1 min-h-screen lg:h-screen w-full">
        <div className="h-full w-full flex flex-col-reverse lg:flex-row items-center justify-center">
          <div className="h-full w-full lg:w-1/2 py-14 lg:px-20 px-6 lg:mt-32">
            <h1 className="text-5xl text-green-600">Youth Parliament</h1>
            <h2 className="text-4xl mt-3 font-bold">Description</h2>
            <p className="w-full mt-6">
              Weekend UX, is a UI/UX Design Academy in Delhi involved in User
              Experience and User Interface Training and Consulting...
            </p>
          </div>

          <div className="h-full w-full lg:w-1/2 flex justify-center lg:items-start items-center py-10 lg:py-0 relative ">
            <div className="h-[26rem] w-80 bg-blue-400 rounded-lg lg:mt-20"></div>
            {/* <div className="h-20 w-40 absolute  bg-red-600 top-0 rounded-md"></div> */}
          </div>
        </div>
      </div>

      <div className="page2 w-full">
        <TimelineDemo />
      </div>

      <div className="page3 w-full min-h-screen">
        <div className="text-center text-6xl font-bold">
          <h1>Our Organizers</h1>
        </div>
        <div className="min-h-full w-full p-10">
          <div className="flex flex-wrap items-start justify-center gap-10 mt-10">
            <CardOragnaizer />
            <CardOragnaizer />
            <CardOragnaizer />
            <CardOragnaizer />
            <CardOragnaizer />
            <CardOragnaizer />
          </div>
        </div>
      </div>

      <div className="page4 w-full min-h-screen">
        <Gallery />
      </div>
    </>
  );
}

export default EventInfo;
