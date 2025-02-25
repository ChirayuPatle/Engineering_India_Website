"use client";

import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <motion.h1
            className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center flex-col leading-[0 ] ">
            <h1
              className={`${bebasNeue.className} mb-6  text-6xl font-extralight text-zinc-700 sm:text-5xl md:text-6xl lg:text-8xl z-50 flex items-center justify-center flex-col lg:flex-row  gap-2 `}
            >
              <div> 
              {"ENGINEERING".split("").map((letter, index) => (
                <span key={index} className="header-letter">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
              </div>
                <span className="header-letter">  </span>
                <div className="flex">
                  
              <span className="header-letter  rounded-tl-lg   rounded-bl-lg  text-[5rem] px-4 flex items-center justify-center bg-orange-400 text-white">IN</span>
              <span className="header-letter  border-2 px-4 text-blue-500 text-[5rem] flex items-center justify-center ">D</span>
              <span className="header-letter  rounded-tr-lg   rounded-br-lg text-[5rem]   border-2 px-4 bg-green-500 text-white flex items-center justify-center  ">AI</span>
                </div>
            </h1>
            <h2
              className={`subtitle ${bebasNeue.className} -mt-6 lg:-mt-10 ml-8   mb-2 w-52 rounded-lg  px-10 py-1 text-6xl font-semibold text-blue-800 sm:text-4xl md:text-5xl lg:text-7xl`}
            >
              Ycce
            </h2>
            </div>

          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where minimal design meets floral artistry. We craft elegant
            experiences that inspire and elevate your space.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="https://www.flowersandsaints.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button"
            >
              Explore Our Work
            </a>
            <a
              href="https://www.flowersandsaints.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 text-foreground"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
        <motion.div
          className="mx-auto mt-16 lg:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-SW6QDQbcVuwPgb6a2CYtYmRbsJa4k1.png"
              alt="Flowers & Saints design concept"
              width={600}
              height={600}
              className="w-[500px] rounded-2xl shadow-xl ring-1 ring-gray-900/10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
