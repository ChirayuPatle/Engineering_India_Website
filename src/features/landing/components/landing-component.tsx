"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const LandingComponent = () => {
  return (
    <div className="relative z-10 text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
      >
        Engineering India, <br /> YCCE.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto"
      >
        Experience secure authentication, scalable databases, and robust cloud
        functions.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8"
      >
        <Link href="/auth/login">
          {/* <button className="px-8 py-4 bg-white rounded-full transition">
            Get Started
          </button> */}
          <button className="px-12 py-4 border border-zinc-300/60 hover:border-zinc-200 hover:bg-blue-400/20 text-white bg-white/10 gap-4 items-center justify-center p-3 rounded-full font-semibold transition">
            Get Started
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingComponent;
