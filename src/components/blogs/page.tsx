"use client";
import { Heart, MessageCircle, Share } from "lucide-react";
import React, { useState } from "react";

// Accepting props properly
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
 const [liketoggle, setliketoggle] = useState(false);
  if (!text) return null; // Handle case when text is undefined
  

  const fullText = text;
  // Truncate content
  const content = isExpanded ? fullText : fullText.slice(0, 180) + "...";

  // Handle Share Button Click
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: header,
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
    <div className="mt-5 w-full rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
    
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-800">{header}</h1>
        <p className="text-sm text-zinc-400">23 Mar 9:00 PM</p>
      </div>

      {/* Description */}
      <p className="leading-relaxed text-gray-600">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-1 text-blue-500 hover:underline"
        >
          {isExpanded ? "See Less" : "Read More"}
        </button>
      </p>

      {/* Image */}
      <div className="mt-4 w-full overflow-hidden rounded-xl">
        <img src={imgurl || ""} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-200" />

      {/* Actions */}
      <div onClick={()=>{setliketoggle((prev)=>!prev)}} className="flex justify-between text-gray-700">
        <button className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 transition duration-200 hover:bg-gray-200 `}>
          <Heart className={`${liketoggle ? "text-pink-600": "text-grey-100"}`} />
       
          <span className="hidden md:inline">Likes</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 transition duration-200 hover:bg-gray-200"
        >
          <Share />
          <span className="hidden md:inline">Share</span>
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
