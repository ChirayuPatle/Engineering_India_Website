"use client";
import { cn } from "@/libs/utils";
import Image from "next/image";

interface CardProps {
  imageUrl?: string;
  name: string;
  post: string;
}

export default function HeadsCard({ imageUrl, name, post }: CardProps) {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-72 w-72 md:max-w-sm md:h-80 rounded-md shadow-xl max-w-sm mx-auto backgroundImage p-4",
          "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black/30 opacity-70"></div>

        <div className="text content flex flex-col justify-end h-full">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {name}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {post}
          </p>
        </div>
      </div>
    </div>
  );
}
