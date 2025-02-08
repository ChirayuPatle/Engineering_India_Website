"use client";


import { useRouter } from "next/navigation";
import ModifiedCard from "@/components/modifiedCard";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardOragnaizer from "@/features/event/component/eventOrganizerCard";
import Lenis from "@studio-freight/lenis";
import Gallery from "@/features/landing/components/gallery";
import LandingComponent from "@/features/landing/components/landing-component";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page() {
  const router = useRouter();
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
        trigger: ".page-1",
        start: "top top",
        end: "top bottom",
        scrub: 6,
        // markers:trueg
      },
      duration: 2,
      y: 90,
      opacity: 0,
      stagger: 0.3,
      ease: "power3",
    });
  }, []);
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <main className="container w-full mx-auto px-6 h-screen flex items-center justify-center relative gap-12">
        {/* Background Blurs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-60 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="fixed -bottom-[20%] left-1/4 w-[60%] h-[s0%] bg-blue-400 rounded-full opacity-40 blur-3xl translate-x-[2%] translate-y-1/4" />
        <div className="fixed top-[40%] left-[40%] w-[65%] h-[35%] bg-blue-primary rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />

    
        {/* Page-1 */}
       <LandingComponent/>

  
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex-shrink-0"
        > 
        </motion.div>
      </main>

    {/* Page-2 */}
      <main className={` mx-auto px-6 min-h-screen w-full relative gap-12 flex flex-wrap items-center  justify-center ${inter.className}`}>
     {/* <ModifiedCard title="Chirayu patle" description="Database head " content="" imagelink=""/> */}
     {/* <ModifiedCard title="Chirayu patle" description="Database head " content="" imagelink=""/> */}
     {/* <ModifiedCard title="Chirayu patle" description="Database head " content="" imagelink=""/> */}
     {/* <ModifiedCard title="Chirayu patle" description="Database head " content="" imagelink=""/> */}
     {/* <ModifiedCard title="Chirayu patle" description="Database head " content="" imagelink=""/> */}
     < CardOragnaizer/>
     < CardOragnaizer/>
     < CardOragnaizer/>
     < CardOragnaizer/>
     < CardOragnaizer/>
     < CardOragnaizer/> 
      </main>
      
          {/* Page-3 */}
      <main className="container mx-auto px-x mt-12 min-h-screen relative gap-12 flex flex-wrap items-center  justify-center">
         <Gallery/>
      </main>

      {/* Page-4 */}
      <main className={` mx-auto lg:p-24 p-10 min-h-screen w-full relative gap-12 ${inter.className}`}>
      <h1 className="text-4xl text-bold ">FAQ</h1>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-blue-primary text-lg lg:text-2xl">Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-blue-primary text-lg lg:text-2xl">Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-blue-primary text-xl lg:text-2xl">Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      </main>
<div/>
<div/>
    </section>
  );
}
