"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Innovative Web Design",
    description: "Cutting-edge web experiences that captivate and convert.",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Intuitive and powerful apps for iOS and Android platforms.",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 3,
    name: "Brand Identity Design",
    description: "Memorable and impactful branding that tells your story.",
    image: "/placeholder.svg?height=600&width=600",
  },
];

export default function ProductShowcase() {
  const [currentProduct, setCurrentProduct] = useState(0);

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="overflow-hidden bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="section-title">Our Expertise</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct}
              className="flex flex-col items-center justify-between md:flex-row"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 md:mb-0 md:w-1/2">
                <h3 className="mb-4 text-3xl font-bold">
                  {products[currentProduct]?.name || "Product Name"}
                </h3>
                <p className="mb-8 text-xl text-gray-600">
                  {products[currentProduct]?.description ||
                    "Product Description"}
                </p>
                <button className="apple-button">Learn More</button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={products[currentProduct]?.image || "/placeholder.svg"}
                  alt={products[currentProduct]?.name || "Product"}
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg"
            onClick={prevProduct}
          >
            ←
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg"
            onClick={nextProduct}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
