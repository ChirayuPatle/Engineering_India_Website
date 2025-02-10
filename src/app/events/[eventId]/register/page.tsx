"use client";

import { RegistrationForm } from "@/features/event/component/registration-form/registrationPage";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      {/* Left Section: Only show on md and up */}
      <motion.div
        className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Event Illustration"
            fill
            className="object-cover"
          />
        </div>
        <motion.h2
          className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Welcome to Tech Conference 2024 🚀
        </motion.h2>
        <motion.p
          className="mt-2 text-base md:text-lg text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Join us for an unforgettable experience full of innovation, expert
          insights, and networking opportunities!
        </motion.p>
      </motion.div>

      {/* Right Section: Registration Form */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <RegistrationForm />
      </motion.div>
    </div>
  );
};

export default Page;
