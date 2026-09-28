"use client";

import { motion } from "motion/react";

const hexagons = [
  { x: 5, y: 10, size: 90 },
  { x: 20, y: 25, size: 60 },
  { x: 40, y: 15, size: 120 },
  { x: 65, y: 20, size: 80 },
  { x: 85, y: 10, size: 100 },

  { x: 10, y: 55, size: 110 },
  { x: 30, y: 70, size: 75 },
  { x: 50, y: 45, size: 130 },
  { x: 75, y: 60, size: 90 },
  { x: 90, y: 75, size: 70 },

  { x: 15, y: 85, size: 80 },
  { x: 45, y: 85, size: 120 },
  { x: 70, y: 90, size: 100 },
];


export default function HolographicHexField() {
  return (
    <div
      className="
      pointer-events-none
      absolute
      inset-0
      overflow-hidden
      opacity-70
      "
    >

      {/* Large Floating Hexagons */}

      {hexagons.map((hex,index)=>(

        <motion.div

          key={index}

          className="
          absolute

          border-2
          border-cyan-300/40

          bg-cyan-400/10

          shadow-[0_0_50px_rgba(34,211,238,0.35)]

          "

          style={{

            left:`${hex.x}%`,
            top:`${hex.y}%`,

            width:`${hex.size}px`,
            height:`${hex.size}px`,

            clipPath:
            "polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)"

          }}


          animate={{

            y:[
              0,
              -120,
              0
            ],

            rotate:[
              0,
              180,
              360
            ],

            scale:[
              1,
              1.15,
              1
            ],

            opacity:[
              0.3,
              1,
              0.3
            ]

          }}


          transition={{

            duration:10 + index,

            repeat:Infinity,

            ease:"easeInOut",

            delay:index*0.4

          }}

        />

      ))}




      {/* Central Holographic Core */}

      <motion.div

        className="
        absolute

        left-1/2
        top-1/2

        h-[900px]
        w-[900px]

        -translate-x-1/2
        -translate-y-1/2

        rounded-full

        bg-cyan-400/20

        blur-[180px]

        "

        animate={{

          scale:[
            1,
            1.3,
            1
          ]

        }}

        transition={{

          duration:12,

          repeat:Infinity,

          ease:"easeInOut"

        }}

      />



      {/* Rotating Giant Hex Frame */}

      <motion.div

        className="
        absolute

        left-1/2
        top-1/2

        h-[700px]
        w-[700px]

        -translate-x-1/2
        -translate-y-1/2

        border-2
        border-cyan-300/20

        shadow-[0_0_100px_rgba(34,211,238,0.2)]

        "

        style={{

          clipPath:
          "polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)"

        }}


        animate={{
          rotate:360
        }}

        transition={{
          duration:60,
          repeat:Infinity,
          ease:"linear"
        }}

      />



    </div>
  );
}