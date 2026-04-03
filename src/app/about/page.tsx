"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FloatingCloud } from "@/components/landing/FloatingCloud";
import { siteConfig } from "@/lib/constants";

const OfferItem = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
  >
    <h3 className="font-fraunces mb-3 text-xl font-semibold text-white md:text-2xl">
      {title}
    </h3>
    <p className="font-sans text-sm leading-relaxed text-white/60">
      {description}
    </p>
  </motion.div>
);

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[#0F1B40]">
      {/* Clouds only in Hero Section */}

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#0F1B40] px-4 pb-20 pt-40 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl"
        >
          <h1 className="font-fraunces mb-6 text-4xl font-bold md:text-7xl">
            About <span className="text-[#D4EBFF]">{siteConfig.name}</span>{" "}
            <br />
            <span className="text-2xl font-normal text-[#D4EBFF] md:text-4xl">
              &quot;at YCCE&quot;
            </span>
          </h1>
          <p className="mx-auto max-w-xl font-sans text-white/70">
            &quot;Engineering India is not just a club but a thought process.&quot;
          </p>
        </motion.div>
        <FloatingCloud
          top="20%"
          left="5%"
          speed={0.5}
          cloudNum={1}
          opacity="opacity-30"
        />
        <FloatingCloud
          top="40%"
          left="80%"
          speed={0.8}
          cloudNum={2}
          opacity="opacity-20"
          scale={0.8}
        />
      </section>

      {/* Story Section */}
      <section className="relative z-20 px-4 py-24 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-fraunces text-3xl font-semibold text-white md:text-4xl">
                Our Motive
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-white/70 md:text-base">
                <p>
                  Welcome to Engineering India YCCE, established in 2022,
                  harnessing the power of youth to build a better India. We've
                  grown to over 250 members, fostering a community where
                  technical skills meet social awareness.
                </p>
                <p>
                  Our motive is to{" "}
                  <span className="font-bold text-[#D4EBFF]">
                    "Think Nationally, Act Locally"
                  </span>
                  . We celebrate our Indian heritage through culturally infused
                  events and collaborative projects, creating a space where
                  innovation and tradition harmoniously build a brighter future.
                </p>
                <p>
                  Beyond learning and collaboration, we empower young engineers
                  to directly address local challenges through innovative,
                  sustainable projects.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-[3rem] border-[12px] border-white/5 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                alt="Students collaborating"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B40]/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="relative z-20 bg-gradient-to-b from-transparent to-[#1D317D]/30 px-4 py-24 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-fraunces mb-4 text-3xl font-semibold text-white md:text-5xl">
              What We Offer
            </h2>
            <p className="mx-auto max-w-xl text-white/50">
              Empowering engineers through technical excellence, leadership, and
              social impact.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Team Building",
                description:
                  "Connect with coordinators and get the opportunity to work with them in a high-impact environment.",
              },
              {
                title: "Self Development",
                description:
                  "Collaborating and working with a dynamic team enhances your soft skills and leadership traits.",
              },
              {
                title: "Workshops & Training",
                description:
                  "Regular hands-on sessions covering the latest technologies and progressive engineering concepts.",
              },
              {
                title: "Networking Events",
                description:
                  "Connect with industry professionals, esteemed alumni, and fellow technology enthusiasts.",
              },
              {
                title: "Project Collaboration",
                description:
                  "Work on real-world projects and build a robust professional portfolio with fellow members.",
              },
              {
                title: "Social Work",
                description:
                  "Empowers youth to use their engineering skills for impactful social work within their communities.",
              },
            ].map((item, i) => (
              <OfferItem key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>

        {/* Clouds moved behind all content */}
      </section>

      {/* Community Image */}
      <section className="relative z-20 px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[21/9] overflow-hidden rounded-[3rem] border-[12px] border-white/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b?w=1200&h=600&fit=crop"
              alt="Community"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
