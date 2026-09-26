"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Hexagon = {
  x: string;
  y: string;
  s: number;
  d: number;
};

type Node = [number, number];

export default function BlueprintBackground() {
  const [cursor, setCursor] = useState({
    x: -1000,
    y: -1000,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const getGlow = (x: number, y: number) => {
    const distance = Math.sqrt(
      Math.pow(cursor.x - x, 2) +
        Math.pow(cursor.y - y, 2)
    );

    const radius = 220;

    if (distance > radius) return 0;

    return 1 - distance / radius;
  };


  const hexagons: Hexagon[] = [
    { x: "12%", y: "18%", s: 170, d: 0 },
    { x: "82%", y: "15%", s: 220, d: 2 },
    { x: "68%", y: "72%", s: 260, d: 4 },
    { x: "20%", y: "75%", s: 190, d: 1 },
    { x: "46%", y: "40%", s: 130, d: 3 },
  ];


  const nodes: Node[] = [
    [180, 160],
    [340, 160],
    [480, 250],
    [690, 250],
    [830, 180],
    [260, 420],
    [470, 420],
    [690, 420],
    [920, 520],
    [590, 600],
  ];


  const circuitPaths = [
    "M180 160 H340 V250 H480",
    "M480 250 H690 V180 H830",
    "M340 160 V420 H470",
    "M470 420 H690 V520 H920",
    "M260 420 H590 V600",
    "M690 250 V420",
  ];


  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#07152E]">

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >

        <defs>

          <pattern
            id="smallGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="#66E3FF"
              strokeWidth="0.4"
              opacity="0.08"
            />
          </pattern>


          <pattern
            id="grid"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <rect width="200" height="200" fill="url(#smallGrid)" />

            <path
              d="M200 0H0V200"
              fill="none"
              stroke="#66E3FF"
              strokeWidth="0.8"
              opacity="0.12"
            />
          </pattern>


          <filter id="glow">
            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

        </defs>


        {/* Blueprint Grid */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
        />


        {/* Circuit Lines */}
        {circuitPaths.map((path, i) => (
          <g key={i}>

            <path
              d={path}
              fill="none"
              stroke="#4FC3F7"
              strokeWidth="2"
              opacity="0.18"
            />


            <path
              d={path}
              fill="none"
              stroke="#66E3FF"
              strokeWidth="2"
              strokeDasharray="8 14"
              filter="url(#glow)"
              opacity={
                0.25 +
                getGlow(
                  200 + i * 120,
                  180 + i * 70
                ) *
                0.75
              }
            >

              <animate
                attributeName="stroke-dashoffset"
                values="0;-44"
                dur="7s"
                repeatCount="indefinite"
              />

            </path>

          </g>
        ))}



        {/* Reactive Nodes */}
        {nodes.map(([cx, cy], i) => {

          const glow = getGlow(cx, cy);

          return (
            <g key={i}>

              <motion.circle
                cx={cx}
                cy={cy}
                r={4 + glow * 3}
                fill="#66E3FF"
                filter="url(#glow)"
                opacity={0.5 + glow * 0.5}
                animate={{
                  opacity:[
                    0.5 + glow * 0.5,
                    1,
                    0.5 + glow * 0.5,
                  ],
                }}
                transition={{
                  duration:2.5,
                  repeat:Infinity,
                }}
              />


              <circle
                cx={cx}
                cy={cy}
                r={12 + glow * 12}
                fill="none"
                stroke="#66E3FF"
                strokeWidth="1"
                opacity={
                  0.15 + glow * 0.5
                }
              />

            </g>
          );
        })}

      </svg>



      {/* Reactive Floating Hexagons */}
      {hexagons.map((hex, i) => {
        const screenWidth =
          typeof window !== "undefined"
            ? window.innerWidth
            : 1920;

        const screenHeight =
          typeof window !== "undefined"
            ? window.innerHeight
            : 1080;

        // Hexagon center position
        const hexX =
          (screenWidth * parseFloat(hex.x)) / 100 +
          hex.s / 2;

        const hexY =
          (screenHeight * parseFloat(hex.y)) / 100 +
          hex.s / 2;


        const glow = getGlow(hexX, hexY);


        return (
          <motion.svg
            key={i}
            className="absolute"
            width={hex.s}
            height={hex.s}
            style={{
              left: hex.x,
              top: hex.y,

              filter: `
                drop-shadow(
                  0 0 ${10 + glow * 60}px
                  rgba(
                    102,
                    227,
                    255,
                    ${0.3 + glow * 0.7}
                  )
                )
              `,
            }}

            animate={{
              y: [0, -18, 0],
              rotate: [0, 6, 0],
            }}

            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            {/* Outer Hexagon */}
            <polygon
              points="
              50,5
              95,28
              95,72
              50,95
              5,72
              5,28
              "

              fill={
                `rgba(
                  102,
                  227,
                  255,
                  ${0.04 + glow * 0.25}
                )`
              }

              stroke="#66E3FF"

              strokeWidth={
                2 + glow * 2
              }

              strokeOpacity={
                0.35 + glow * 0.65
              }

            />


            {/* Inner Engineering Layer */}
            <polygon
              points="
              50,20
              80,35
              80,65
              50,80
              20,65
              20,35
              "

              fill="none"

              stroke="#66E3FF"

              strokeWidth="1"

              strokeOpacity={
                0.2 + glow * 0.8
              }
            />


            {/* Activation Core */}
            {glow > 0.05 && (
              <circle
                cx="50"
                cy="50"
                r={
                  8 + glow * 18
                }
                fill="#66E3FF"
                opacity={
                  glow * 0.25
                }
                filter="url(#glow)"
              />
            )}

          </motion.svg>
        );
      })}


      {/* Scanner */}
      <motion.div
        className="absolute top-0 h-full w-px"
        style={{
          background:
            "linear-gradient(to bottom,transparent,rgba(102,227,255,.2),transparent)",
          boxShadow:
            "0 0 8px rgba(102,227,255,.12)",
          opacity:0.25,
        }}
        animate={{
          left:["-10%","110%"],
        }}
        transition={{
          duration:24,
          repeat:Infinity,
          ease:"linear",
        }}
      />

    </div>
  );
}