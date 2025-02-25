"use client";

import { motion } from "framer-motion";

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
            <h1
              className={`z-50 mb-6 flex gap-2 text-5xl font-extralight text-zinc-700`}
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
                  AI
                </span>
              </div>
            </h1>

            <h2
              className={`subtitle mb-8 rounded-lg bg-[#0094FF] px-10 py-1 text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-8xl`}
            >
              Ycce
            </h2>
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
