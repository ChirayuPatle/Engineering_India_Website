"use client";
import { Heart, MessageCircle, Share } from "lucide-react";
import React, { useState } from "react";

// Accepting props properly
function BlogCard({ text, imgurl,header }: { text: string; imgurl: string ,header:string}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null; // Handle case when text is undefined

  const fullText = text;
  // Truncate content
  const content = isExpanded ? fullText : fullText.slice(0, 180) + "...";

  // Handle Share Button Click
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: {header},
          text: fullText.slice(0, 100) + "...", // Short preview of the text
          url: window.location.href, // Current page URL
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <div className="mt-5 w-full rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-800">{header}</h1>
        <p className="text-zinc-400 text-sm">23 Mar 9:00 PM</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {content}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 ml-1 hover:underline"
        >
          {isExpanded ? "See Less" : "Read More"}
        </button>
      </p>

      {/* Image */}
      <div className="w-full mt-4 rounded-xl overflow-hidden">
        <img
          src={imgurl || ""}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Divider */}
      <hr className="border-gray-200 my-4" />

      {/* Actions */}
      <div className="flex justify-between text-gray-700">
        <button className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-gray-200 rounded-md transition duration-200">
          <Heart />
          <span className="hidden md:inline">Likes</span>
        </button>
        <button className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-gray-200 rounded-md transition duration-200">
          <MessageCircle />
          <span className="hidden md:inline">Comments</span>
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-2 flex items-center justify-center gap-2 hover:bg-gray-200 rounded-md transition duration-200"
        >
          <Share />
          <span className="hidden md:inline">Share</span>
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
