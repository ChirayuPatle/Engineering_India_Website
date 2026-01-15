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
    <div ref={containerRef} className="relative w-full overflow-hidden">
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

      <div className="relative z-20 min-h-screen w-full overflow-hidden bg-[#6183B1]">
        <div className="container mx-auto overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24">
          <div className="mb-8 text-center sm:mb-12 md:mb-16">
            <h3 className="font-fraunces xxs:text-3xl xs:text-4xl text-2xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Our Events & Activities
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/75 sm:mt-4 sm:text-sm md:text-base lg:text-lg">
              A glimpse of the various events, workshops, and social initiatives
              organized by Engineering India.
            </p>
          </div>

          {/* Circular Events Layout */}
          <div className="relative mx-auto flex items-center justify-center overflow-visible">
            {/* Container for circular layout - Made bigger */}
            <div className="relative h-[450px] w-[450px] sm:h-[550px] sm:w-[550px] md:h-[680px] md:w-[680px] lg:h-[800px] lg:w-[800px]">
              {/* Outer decorative ring - events sit exactly on this */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/25" />

              {/* Middle decorative ring */}
              <div className="absolute inset-[18%] rounded-full border border-white/15" />

              {/* Inner decorative ring */}
              <div className="absolute inset-[32%] rounded-full border border-white/10" />

              {/* Connecting lines from center to events */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <line
                    key={angle}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + 50 * Math.cos((angle - 90) * (Math.PI / 180))}%`}
                    y2={`${50 + 50 * Math.sin((angle - 90) * (Math.PI / 180))}%`}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                ))}
              </svg>

              {/* Center - Statue of Unity with Circle Background */}
              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                {/* Outer glow effect */}
                <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#5a7a7a]/50 via-[#6b8a8a]/40 to-[#4a6a6a]/30 blur-2xl sm:h-[240px] sm:w-[240px] md:h-[300px] md:w-[300px] lg:h-[360px] lg:w-[360px]" />

                {/* Circle background behind statue */}
                <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#5a7a7a] via-[#6b8a8a] to-[#4a6a6a] shadow-2xl sm:h-[200px] sm:w-[200px] md:h-[260px] md:w-[260px] lg:h-[320px] lg:w-[320px]" />

                {/* Clouds behind the statue */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Cloud 1 - Left side */}
                  <div className="absolute -left-[60px] top-[10px] h-[40px] w-[80px] rounded-full bg-white/20 blur-md sm:-left-[80px] sm:top-[20px] sm:h-[50px] sm:w-[100px] md:-left-[100px] md:h-[60px] md:w-[120px] lg:-left-[120px] lg:h-[70px] lg:w-[140px]" />
                  {/* Cloud 2 - Right side */}
                  <div className="absolute -right-[50px] top-[0px] h-[35px] w-[70px] rounded-full bg-white/15 blur-md sm:-right-[70px] sm:h-[45px] sm:w-[90px] md:-right-[90px] md:h-[55px] md:w-[110px] lg:-right-[110px] lg:h-[65px] lg:w-[130px]" />
                  {/* Cloud 3 - Bottom left */}
                  <div className="absolute -left-[40px] top-[40px] h-[30px] w-[60px] rounded-full bg-white/25 blur-lg sm:-left-[50px] sm:top-[50px] sm:h-[40px] sm:w-[80px] md:-left-[70px] md:top-[60px] md:h-[50px] md:w-[100px] lg:-left-[90px] lg:top-[70px] lg:h-[55px] lg:w-[110px]" />
                  {/* Cloud 4 - Bottom right */}
                  <div className="absolute -right-[35px] top-[35px] h-[28px] w-[55px] rounded-full bg-white/20 blur-lg sm:-right-[45px] sm:top-[45px] sm:h-[35px] sm:w-[70px] md:-right-[60px] md:top-[55px] md:h-[45px] md:w-[90px] lg:-right-[80px] lg:top-[65px] lg:h-[50px] lg:w-[100px]" />
                  {/* Cloud 5 - Top center-left */}
                  <div className="absolute -left-[20px] -top-[30px] h-[25px] w-[50px] rounded-full bg-white/15 blur-md sm:-left-[30px] sm:-top-[40px] sm:h-[35px] sm:w-[70px] md:-left-[40px] md:-top-[50px] md:h-[40px] md:w-[80px] lg:-left-[50px] lg:-top-[60px] lg:h-[45px] lg:w-[90px]" />
                  {/* Cloud 6 - Top center-right */}
                  <div className="bg-white/18 absolute -right-[15px] -top-[25px] h-[22px] w-[45px] rounded-full blur-md sm:-right-[25px] sm:-top-[35px] sm:h-[30px] sm:w-[60px] md:-right-[35px] md:-top-[45px] md:h-[35px] md:w-[70px] lg:-right-[45px] lg:-top-[55px] lg:h-[40px] lg:w-[80px]" />
                </div>

                {/* Inner subtle ring */}
                <div className="absolute left-1/2 top-1/2 h-[155px] w-[155px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[195px] sm:w-[195px] md:h-[255px] md:w-[255px] lg:h-[315px] lg:w-[315px]" />

                {/* Statue of Unity Image - NOT cropped, displayed as-is */}
                <img
                  src="./unity.png"
                  alt="Statue of Unity - Engineering India"
                  className="relative z-10 h-[170px] w-auto max-w-[170px] object-contain drop-shadow-2xl sm:h-[210px] sm:max-w-[210px] md:h-[280px] md:max-w-[280px] lg:h-[340px] lg:max-w-[340px]"
                />
              </div>

              {/* Event Items positioned around the circle with actual images */}
              {[
                {
                  name: "Donation Drive",
                  image:
                    "https://res.cloudinary.com/priyanshukayarkar/image/upload/v1741540145/EI-Events/Donation%20Drive/Donation%20drive%20%28orphanage%29/Copy_of_IMG_0377_alioxw.jpg",
                  angle: 0,
                },
                {
                  name: "Ultimate Social Technocart",
                  image:
                    "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217526/UST-Home_page_rnhpsv.jpg",
                  angle: 60,
                },
                {
                  name: "Rangittalim",
                  image:
                    "https://res.cloudinary.com/priyanshukayarkar/image/upload/v1741540002/EI-Events/Rangittalim3/IMG20231022171239_nnmgko.jpg",
                  angle: 120,
                },
                {
                  name: "Speech Competition",
                  image: "/image/Speech Compitaion.jpg",
                  angle: 180,
                },
                {
                  name: "Abhyudhaya 24.0",
                  image:
                    "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217795/abhudaya_tt2su2.jpg",
                  angle: 240,
                },
                {
                  name: "Shivaji Jayanti",
                  image:
                    "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743218190/Shivaji_Jayanti_rpkzzf.jpg",
                  angle: 300,
                },
              ].map((event, index) => {
                // Calculate position based on angle (starting from top, going clockwise)
                const angleRad = ((event.angle - 90) * Math.PI) / 180;
                // Position events exactly on the outer circle edge (50% = on the border)
                const radiusPercent = 50;
                const x = 50 + radiusPercent * Math.cos(angleRad);
                const y = 50 + radiusPercent * Math.sin(angleRad);

                return (
                  <motion.div
                    key={event.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    className="group absolute z-30"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="flex cursor-pointer flex-col items-center transition-all duration-300 hover:scale-110">
                      {/* Event Image */}
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-white/40 shadow-lg transition-all duration-300 group-hover:border-white/70 group-hover:shadow-xl sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="h-full w-full object-cover"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
                      </div>
                      {/* Event Name */}
                      <span className="mt-1.5 max-w-[80px] truncate whitespace-nowrap rounded-full bg-white/15 px-2 py-0.5 text-center text-[6px] font-medium text-white backdrop-blur-sm sm:mt-2 sm:max-w-[100px] sm:px-2.5 sm:text-[7px] md:max-w-[120px] md:px-3 md:py-1 md:text-[9px] lg:max-w-[140px] lg:text-[11px]">
                        {event.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
