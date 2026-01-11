"use client";

import { useScroll, useTransform, motion, useSpring } from "motion/react";
import { useRef } from "react";

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cloudXRaw = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["0%", "-6%", "-10%", "-12%"],
  );
  const cloudYRaw = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-8%", "-15%"],
  );

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };
  const cloudX = useSpring(cloudXRaw, springConfig);
  const cloudY = useSpring(cloudYRaw, springConfig);

  return (
    <div ref={containerRef} className="w-full overflow-visible">
      <div className="relative z-10 min-h-screen w-full bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#C6B8CC]">
        <motion.div
          style={{
            x: cloudX,
            y: cloudY,
          }}
          className="absolute -bottom-[55%] -left-[30%] z-20 h-screen will-change-transform"
          transition={{ type: "tween", ease: "easeOut" }}
        >
          <motion.img
            src="./landing/clouds/4.png"
            className="w-[110%]"
            alt="cloud"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-0 min-h-screen w-full bg-gradient-to-b from-[#C6B8CC] via-[#9A8EB8] to-[#6183B1]">
        <div className="absolute -bottom-[25%]"></div>
      </div>

      <div className="relative z-0 min-h-screen w-full bg-gradient-to-b from-[#C6B8CC] via-[#9A8EB8] to-[#6183B1]">
        <div className="absolute -bottom-[25%]"></div>
      </div>
    </div>
  );
};

export default LandingPage;
