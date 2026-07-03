"use client";

import BlogCard from "@/components/blogs/page";
import {
  TriangleAlert,
  Search,
  Sparkles,
  Newspaper,
  ArrowLeft,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { motion } from "motion/react";
import { FloatingCloud } from "@/components/landing/FloatingCloud";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BlogItem {
  img: string;
  fulltext: string;
  header: string;
}

const fetchBlogData = async (): Promise<BlogItem[]> => {
  const res = await fetch("/api/blog");
  if (!res.ok) {
    throw new Error("Failed to fetch blog data.");
  }
  const data = await res.json();
  return data as BlogItem[];
};

const BlogCardSkeleton = () => (
  <div className="mb-8 rounded-[40px] border border-white/10 bg-white/5 p-8 md:p-12">
    <Skeleton className="mb-8 h-64 w-full rounded-2xl bg-white/10" />
    <Skeleton className="mb-4 h-10 w-3/4 bg-white/10" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-full bg-white/10" />
      <Skeleton className="h-4 w-5/6 bg-white/10" />
    </div>
  </div>
);

const Blog = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: blogContainer,
    isLoading,
    isError,
  } = useQuery<BlogItem[]>({
    queryKey: ["blogData"],
    queryFn: fetchBlogData,
  });

  const filteredBlogs = blogContainer?.filter(
    (blog) =>
      blog.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.fulltext.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[#0F1B40] text-white selection:bg-[#D4EBFF] selection:text-[#0F1B40]">
      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#0F1B40] px-4 pb-24 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container relative z-20 mx-auto max-w-4xl"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-[#D4EBFF]" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Latest from EI
            </span>
          </div>

          <h1 className="font-fraunces mb-6 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
            Our Insights & <br />
            <span className="italic text-[#D4EBFF]">Stories</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/70">
            Explore the latest updates, technical deep-dives, and community
            stories from the Engineering India YCCE chapter.
          </p>

          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-5 pl-14 pr-8 text-white backdrop-blur-xl transition-all placeholder:text-white/30 focus:border-[#D4EBFF] focus:bg-white/10 focus:outline-none"
            />
          </div>
        </motion.div>

        <FloatingCloud
          top="10%"
          left="5%"
          speed={0.5}
          cloudNum={1}
          opacity="opacity-20"
        />
        <FloatingCloud
          top="30%"
          left="85%"
          speed={0.8}
          cloudNum={2}
          opacity="opacity-15"
          scale={0.8}
        />
      </section>

      {/* Blog Content */}
      <section className="relative z-20 -mt-10 px-4">
        <div className="container mx-auto flex max-w-7xl flex-col items-start gap-12 lg:flex-row">
          {/* Main Feed */}
          <div className="order-2 w-full flex-1 lg:order-1">
            {isLoading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-[40px] border border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl"
              >
                <TriangleAlert className="mb-6 h-16 w-16 text-pink-500" />
                <h2 className="font-fraunces mb-4 text-3xl font-bold">
                  Offline for maintenance
                </h2>
                <p className="mb-8 max-w-md text-white/60">
                  We're currently having trouble loading the blog feed. Please
                  try again in a few minutes.
                </p>
                <Button
                  variant="premium"
                  onClick={() => window.location.reload()}
                >
                  Retry Loading
                </Button>
              </motion.div>
            ) : filteredBlogs && filteredBlogs.length > 0 ? (
              <div className="pb-20">
                {filteredBlogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    text={blog.fulltext || ""}
                    imgurl={blog.img || ""}
                    header={blog.header || ""}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[40px] border border-dashed border-white/10 p-20 text-center">
                <Newspaper className="mb-6 h-16 w-16 text-white/20" />
                <h3 className="mb-2 text-2xl font-bold text-white">
                  No results found
                </h3>
                <p className="text-white/40">
                  Try searching for a different topic or keyword.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="order-1 w-full space-y-8 lg:sticky lg:top-24 lg:order-2 lg:w-[400px]">
            {/* About EI Blogs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <h3 className="font-fraunces mb-4 flex items-center gap-3 text-2xl font-bold text-white">
                <Newspaper className="h-6 w-6 text-[#D4EBFF]" />
                EI Publications
              </h3>
              <p className="mb-6 leading-relaxed text-white/60">
                Engineering India Blogs is our digital corner for sharing
                knowledge, documenting projects, and celebrating the engineering
                spirit at YCCE.
              </p>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Image
                    src="/image/logo.png"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <p className="font-bold text-white">YCCE Official Club</p>
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    Est. 2024
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-[40px] border border-white/10 bg-[#D4EBFF] p-8 text-[#0F1B40]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F1B40]/10">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-fraunces mb-4 text-2xl font-bold">
                Stay Notified
              </h3>
              <p className="mb-8 font-medium text-[#0F1B40]/70">
                Get the latest articles and event invites directly in your
                inbox.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full rounded-2xl border-none bg-white px-6 py-4 text-[#0F1B40] placeholder:text-[#0F1B40]/30 focus:outline-none"
                />
                <Button className="w-full rounded-2xl bg-[#0F1B40] py-6 font-bold text-white hover:bg-[#0F1B40]/90">
                  Subscribe Now
                </Button>
              </div>
            </motion.div>

            {/* Featured Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <h3 className="font-fraunces mb-6 text-sm text-xl font-bold uppercase tracking-wider text-white opacity-60">
                Resources
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Submission Guide", href: "#" },
                  { name: "Community Guidelines", href: "#" },
                  { name: "Archive 2024", href: "#" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl p-4 text-white/80 transition-colors hover:bg-white/5"
                  >
                    <span className="font-bold">{item.name}</span>
                    <ArrowUpRight className="h-5 w-5 text-white/20 transition-colors group-hover:text-[#D4EBFF]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* Background Decor */}
      <FloatingCloud
        top="70%"
        left="-5%"
        speed={0.4}
        cloudNum={3}
        opacity="opacity-10"
        scale={1.5}
      />
      <FloatingCloud
        top="85%"
        left="90%"
        speed={0.6}
        cloudNum={4}
        opacity="opacity-10"
        scale={1.2}
      />
    </main>
  );
};

export default Blog;
