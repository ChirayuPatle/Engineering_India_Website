"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

const LandingPage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cloudX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "-5%"] : ["0%", "-12%"],
  );
  const cloudY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "8%"] : ["0%", "15%"],
  );

  const fortY = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    isMobile ? ["15%", "-5%"] : ["20%", "-10%"],
  );

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden">
      <div className="relative z-10 min-h-screen w-full bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#C6B8CC]">
        <div className="relative z-50 flex min-h-screen flex-col items-center justify-center px-4 pb-20 text-center text-white sm:mb-0 sm:px-6 md:px-8">
          <h2 className="font-fraunces xxs:text-3xl xs:text-4xl max-w-[90vw] text-2xl font-semibold leading-tight sm:max-w-none sm:text-4xl">
            ENGINEERING INDIA YCCE
          </h2>
          <p className="xs:text-sm font-fraunces xs:max-w-xs mt-2 max-w-[85vw] text-xs italic tracking-tight text-white/80 sm:mt-3 sm:max-w-sm sm:text-base md:max-w-md md:text-lg lg:text-xl">
            "Think Nationaly, Act Locally."
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4 md:mt-8">
            <Button
              className="group relative z-50 h-10 px-4 font-bold sm:h-12 sm:px-6 md:px-8"
              variant="premium"
              size="xl"
            >
              <span className="text-sm font-bold text-[#193486] sm:text-base md:text-lg">
                Join Now
              </span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                strokeWidth={2.5}
                color="#193486"
              />
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        style={{
          x: cloudX,
          y: cloudY,
        }}
        className="xxs:top-[58vh] xxs:-left-[55%] xxs:h-[48vh] xxs:w-[180%] xs:top-[55vh] xs:-left-[50%] xs:h-[52vh] xs:w-[170%] pointer-events-none absolute -left-[60%] top-[60vh] z-30 h-[45vh] w-[200%] pb-16 sm:-left-[45%] sm:top-[50vh] sm:h-[60vh] sm:w-[150%] sm:pb-0 md:-left-[38%] md:top-[45vh] md:h-[70vh] md:w-[130%] lg:-left-[32%] lg:top-[40vh] lg:h-[85vh] lg:w-[115%] xl:-left-[28%] xl:top-[35vh] xl:h-screen xl:w-[110%]"
      >
        <img
          src="/landing/clouds/4.png"
          className="h-full w-full select-none object-contain object-bottom"
          alt="cloud"
          loading="eager"
          draggable="false"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
      </motion.div>

      <div className="z-15 relative hidden w-full bg-gradient-to-b from-[#C6B8CC] to-[#C6B8CC] sm:block sm:h-[30vh]" />

      <div className="relative z-20 min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#C6B8CC] via-[#9A8EB8] to-[#6183B1]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute left-4 right-4 top-16 z-30 space-y-2 text-center sm:right-auto sm:top-[30%] sm:w-[45%] sm:-translate-y-1/2 sm:space-y-3 sm:text-left md:left-10 md:max-w-xl md:space-y-4 lg:left-14 lg:max-w-2xl xl:left-20"
        >
          <h3 className="font-fraunces xxs:text-3xl xs:text-4xl max-w-[90vw] text-2xl font-semibold leading-tight text-white sm:max-w-none sm:text-4xl">
            About Engineering India
          </h3>
          <p className="text-xs leading-relaxed text-white/75 sm:text-sm md:text-base lg:text-lg">
            A dynamic student-led organization at YCCE College, Nagpur,
            dedicated to fostering innovation, technical excellence, and social
            responsibility among engineering students.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2 sm:justify-start sm:gap-6 md:gap-8 md:pt-4">
            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-[#D4EBFF] sm:text-3xl md:text-4xl">
                50+
              </p>
              <p className="text-[10px] text-white/70 sm:text-xs md:text-sm">
                Events Organized
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-[#D4EBFF] sm:text-3xl md:text-4xl">
                250+
              </p>
              <p className="text-[10px] text-white/70 sm:text-xs md:text-sm">
                Student Members
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-[#D4EBFF] sm:text-3xl md:text-4xl">
                8+
              </p>
              <p className="text-[10px] text-white/70 sm:text-xs md:text-sm">
                Social Initiatives
              </p>
            </div>
          </div>

          <div className="pt-2 sm:pt-4 md:pt-6">
            <Button
              className="group h-8 border-white/50 px-3 font-bold text-white hover:bg-white/10 sm:h-10 sm:px-5 md:h-11 md:px-6"
              variant="premium"
              size="sm"
            >
              <span className="text-xs sm:text-sm md:text-base">
                Learn More
              </span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          style={{ y: fortY }}
          className="absolute bottom-0 right-[-20%] z-10 h-full w-[100%] sm:right-0 sm:w-[65%] md:w-[60%] lg:w-[62%]"
        >
          <img
            src="/landing/str/rajgad-fort-upt.png"
            className="absolute bottom-0 right-0 h-[65%] w-auto max-w-none object-contain object-right-bottom sm:h-[85%] md:h-[90%] lg:h-[95%]"
            alt="Rajgad Fort - The Crown Jewel of Maratha Empire"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 70%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 70%, transparent 100%)",
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-8 -right-[50%] z-20 h-48 sm:-bottom-10 sm:h-56 md:h-64 lg:h-72 xl:h-80"
            style={{
              background:
                "linear-gradient(to top, #6183B1 0%, #6183B1 40%, transparent 100%)",
              left: "-100vw",
              width: "200vw",
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-20 min-h-screen w-full bg-[#6183B1]">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"></div>
      </div>
    </div>
  );
};

export default LandingPage;
