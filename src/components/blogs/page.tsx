"use client";

import { Heart, Share, Calendar, User, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

const getValidImageUrl = (url: string | undefined | null): string => {
  const placeholder = "/placeholder.png";
  if (!url) {
    return placeholder;
  }

  if (url.startsWith("//")) {
    url = "https:" + url;
  }

  if (url.startsWith("/")) {
    return url;
  }

  try {
    new URL(url);
    return url;
  } catch {
    console.error(`Invalid image URL provided: ${url}`);
    return placeholder;
  }
};

function BlogCard({
  text,
  imgurl,
  header,
}: {
  text: string;
  imgurl: string;
  header: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!text) return null;

  const fullText = text;
  const content = isExpanded ? fullText : fullText.slice(0, 180) + "...";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: header,
          text: fullText.slice(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  const imageUrl = getValidImageUrl(imgurl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative mt-8 flex flex-col overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:bg-white/[0.08]"
    >
      {/* Image Header */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <Image
          src={imageUrl}
          alt={header}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B40] via-transparent to-transparent opacity-60" />

        {/* Category/Date Tag */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-[#D4EBFF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F1B40]">
            EI Featured
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
            <Calendar className="h-3 w-3" />
            23 Mar 2025
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <h2 className="font-fraunces mb-6 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-[#D4EBFF] md:text-3xl lg:text-4xl">
          {header}
        </h2>

        <div
          className="prose prose-invert mb-8 max-w-none font-sans text-lg leading-relaxed text-white/60"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-auto flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <User className="h-5 w-5 text-white/60" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Engineering India</p>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Editorial Team
              </p>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="premium"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/5 text-[#D4EBFF] hover:bg-white/10"
            >
              {isExpanded ? "See Less" : "Read Full Story"}
              <ArrowRight
                className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? "-rotate-90" : ""}`}
              />
            </Button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 transition-colors ${
                  isLiked
                    ? "border-pink-500/20 bg-pink-500/10 text-pink-500"
                    : "bg-white/5 text-white/40 hover:text-white"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleShare}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40 transition-colors hover:text-white"
              >
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default BlogCard;
