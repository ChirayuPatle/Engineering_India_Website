"use client";

import ModifiedCard from "@/components/modifiedCard";
import CardOragnaizer from "@/features/event/component/eventOrganizerCard";
import Gallery from "@/features/landing/components/gallery";
import LandingComponent from "@/features/landing/components/landing-component";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { title } from "process";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <main className="container w-full mx-auto px-6 h-screen flex items-center justify-center relative gap-12">
        {/* Background Blurs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-60 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute -bottom-[20%] left-1/4 w-[60%] h-[50%] bg-blue-400 rounded-full opacity-40 blur-3xl translate-x-[2%] translate-y-1/4" />
        <div className="absolute top-[40%] left-[40%] w-[70%] h-[50%] bg-blue-primary rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />

        {/* Left Content */}
       <LandingComponent/>

  

        {/* Right Side - Animated Image Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex-shrink-0"
        > 
        </motion.div>
      </main>

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
      
      <main className="container mx-auto px-x mt-12 min-h-screen relative gap-12 flex flex-wrap items-center  justify-center">
         <Gallery/>
      </main>
  
    </section>
  );
}
