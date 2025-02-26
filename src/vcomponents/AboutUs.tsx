"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="bg-gray-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.h2
          className="mb-8 text-center text-5xl font-black text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-4 text-3xl font-bold text-white">
              We are Creative Innovators
            </h3>
            <p className="mb-6 text-gray-300">
              At CreativeAgency, we blend cutting-edge technology with artistic
              vision to create digital experiences that captivate and inspire.
              Our team of passionate designers, developers, and strategists work
              tirelessly to push the boundaries of what's possible in the
              digital realm.
            </p>
            <p className="text-gray-300">
              With a focus on innovation and user-centric design, we've helped
              countless brands transform their digital presence and connect with
              their audience in meaningful ways.
            </p>
          </motion.div>
          <motion.div
            className="relative h-96"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 rotate-3 transform rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="absolute inset-0 flex -rotate-3 transform items-center justify-center rounded-lg bg-gray-800">
              <p className="text-2xl font-bold text-white">
                Creative Team at Work
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
