"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  ChevronDown,
  HelpCircle,
  Flag,
  Heart,
  Shield,
  Megaphone,
  GraduationCap,
  Lightbulb,
  Rocket,
  Sparkles,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ========== STATIC DATA (Moved outside to prevent OOM and re-render issues) ==========

const events = [
  {
    name: "Donation Drive",
    description:
      "Spreading joy through compassion. Food, clothing, and toys distributed to the community.",
    image:
      "https://res.cloudinary.com/priyanshukayarkar/image/upload/v1741540145/EI-Events/Donation%20Drive/Donation%20drive%20%28orphanage%29/Copy_of_IMG_0377_alioxw.jpg",
    date: "Jan 2024",
    participants: "40+ volunteers",
  },
  {
    name: "Ultimate Social Technocart",
    description:
      "Social hackathon tackling real-world challenges in collaboration with NGOs.",
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217526/UST-Home_page_rnhpsv.jpg",
    date: "Feb 2025",
    participants: "75+ participants",
  },
  {
    name: "Rangittalim",
    description:
      "Social initiative engaging slum children in education and cultural activities.",
    image:
      "https://res.cloudinary.com/priyanshukayarkar/image/upload/v1741540002/EI-Events/Rangittalim3/IMG20231022171239_nnmgko.jpg",
    date: "Aug 2024",
    participants: "70 volunteers",
  },
  {
    name: "Speech Competition",
    description: "Intercollegiate वाक् यज्ञः promoting ideas and teamwork.",
    image: "/image/Speech Compitaion.jpg",
    date: "Apr 2024",
    participants: "50+ students",
  },
  {
    name: "Abhyudhaya 24.0",
    description:
      "Self-defence workshop on Yeshti techniques empowering participants.",
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217795/abhudaya_tt2su2.jpg",
    date: "May 2023",
    participants: "60 participants",
  },
  {
    name: "Shivaji Jayanti",
    description:
      "Celebrating the legacy of Shivaji Maharaj with cultural programs.",
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743218190/Shivaji_Jayanti_rpkzzf.jpg",
    date: "Mar 2024",
    participants: "200+ attendees",
  },
];

const timelineEvents = [
  {
    year: "2022",
    date: "August 23",
    title: "Establishment of Engineering India, YCCE & Uttishtha Bharat",
    description:
      "Founded to promote technical and social engagement, Engineering India, YCCE hosted its first event, Uttishtha Bharat, celebrating 75 years of independence with inspiring speeches and a Tiranga Rally.",
    icon: Flag,
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217526/UST-Home_page_rnhpsv.jpg",
  },
  {
    year: "2023",
    date: "May 8-10",
    title: "Avyanna – Self-Defence Workshop",
    description:
      "A three-day workshop on Yeshti techniques and Prahar training empowered 60 participants with essential self-defense skills and awareness.",
    icon: Shield,
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217795/abhudaya_tt2su2.jpg",
  },
  {
    year: "2024",
    date: "January 3",
    title: "New Year Donation Drive",
    description:
      "Volunteers distributed food, clothing, and toys, spreading joy and fostering compassion in the community.",
    icon: Heart,
    image:
      "https://res.cloudinary.com/priyanshukayarkar/image/upload/v1741540145/EI-Events/Donation%20Drive/Donation%20drive%20%28orphanage%29/Copy_of_IMG_0377_alioxw.jpg",
  },
  {
    year: "2024",
    date: "March 2",
    title: "Shivaji Maharaj Jayanti Celebration",
    description:
      "Held at SDM Auditorium, this event featured Shivgoshna, Godhal dance, and an inspiring speech by Ram Wagh Sir, honoring Shivaji Maharaj's legacy and fostering pride.",
    icon: GraduationCap,
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743218190/Shivaji_Jayanti_rpkzzf.jpg",
  },
  {
    year: "2024",
    date: "April 27",
    title: "वाक् यज्ञः – Speech Competition",
    description:
      "An intercollegiate event where participants showcased their ideas. Winners were awarded certificates and cash prizes, promoting teamwork and a competitive spirit.",
    icon: Megaphone,
    image: "/image/Speech Compitaion.jpg",
  },
  {
    year: "2024",
    date: "August 10",
    title: "Rangeettalim 4.0",
    description:
      "Held at Omkar Nagar, Nagpur, this social initiative engaged slum children in education and cultural activities. With 70 volunteers, it fostered learning and community spirit.",
    icon: GraduationCap,
    image:
      "https://res.cloudinary.com/priyanshukayarkar/image/upload/v1741540002/EI-Events/Rangittalim3/IMG20231022171239_nnmgko.jpg",
  },
  {
    year: "2025",
    date: "February 10",
    title: "Ultimate Socio-Technocrat – Social Hackathon",
    description:
      "As part of YASH 25.0, this offline hackathon at YCCE saw 75+ participants tackle real-world issues in Slum Development, Women Empowerment, and Carbon Footprint. Collaborating with NGOs, participants presented innovative solutions, with judges selecting the best.",
    icon: Lightbulb,
    image:
      "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217526/UST-Home_page_rnhpsv.jpg",
  },
];

const faqs = [
  {
    question: "What is Engineering India, YCCE?",
    answer:
      "Engineering India, YCCE is a dynamic student-led organization at YCCE College, Nagpur, dedicated to fostering innovation, technical excellence, and social responsibility among engineering students.",
  },
  {
    question: "How can I join Engineering India?",
    answer:
      "You can join Engineering India by attending our recruitment drives at the beginning of each academic year or by reaching out to our team members.",
  },
  {
    question: "What types of events does Engineering India organize?",
    answer:
      "We organize a diverse range of events including technical workshops, hackathons, social initiatives, and cultural celebrations.",
  },
  {
    question: "Are the events open to all students?",
    answer:
      "Most of our events are open to all YCCE students. Some intercollegiate events are also open to students from other colleges.",
  },
];

// ========== SUB-COMPONENTS ==========

const CloudDecoration = ({
  className,
  speed = 0.2,
  reverse = false,
  scrollYProgress,
}: {
  className?: string;
  speed?: number;
  reverse?: boolean;
  scrollYProgress: any;
}) => {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reverse
      ? [`${speed * 100}%`, `-${speed * 100}%`]
      : [`-${speed * 100}%`, `${speed * 100}%`],
  );

  return (
    <motion.div
      style={{ y }}
      className={`pointer-events-none absolute z-10 select-none opacity-30 ${className}`}
    >
      <img
        src="/landing/clouds/4.png"
        alt=""
        className="h-auto w-full object-contain"
      />
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========

const LandingPageComplete = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeHelpIndex, setActiveHelpIndex] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState<number | null>(
    null,
  );

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
    <>
      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* HERO SECTION */}
        <div className="relative z-10 min-h-screen w-full bg-gradient-to-b from-[#6183B1] via-[#9A8EB8] to-[#C6B8CC]">
          <div className="relative z-50 flex min-h-screen flex-col items-center justify-center px-4 pb-20 text-center text-white">
            <h2 className="font-fraunces text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              ENGINEERING INDIA YCCE
            </h2>
            <p className="mt-2 text-xs italic text-white/80 sm:text-lg md:text-xl">
              "Think Nationally, Act Locally."
            </p>
            <div className="mt-8">
              <Button
                className="group relative z-50 h-12 px-8 font-bold"
                variant="default"
                size="lg"
              >
                <span className="text-sm font-bold text-[#193486] sm:text-lg">
                  Join Now
                </span>
                <ArrowRight
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  color="#193486"
                />
              </Button>
            </div>
          </div>
        </div>

        {/* HERO CLOUD */}
        <motion.div
          style={{ x: cloudX, y: cloudY }}
          className="pointer-events-none absolute -left-[60%] top-[60vh] z-30 h-[45vh] w-[200%] sm:h-[60vh] lg:h-[85vh]"
        >
          <img
            src="/landing/clouds/4.png"
            className="h-full w-full select-none object-contain object-bottom"
            alt="cloud"
          />
        </motion.div>

        <div className="z-15 relative hidden w-full bg-[#C6B8CC] sm:block sm:h-[30vh]" />

        {/* ABOUT SECTION */}
        <div className="relative z-20 min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#C6B8CC] via-[#9A8EB8] to-[#6183B1]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute left-10 top-[30%] z-30 max-w-2xl space-y-4 text-left sm:-translate-y-1/2"
          >
            <h3 className="font-fraunces text-2xl font-semibold text-white md:text-3xl">
              About Engineering India
            </h3>
            <p className="text-sm leading-relaxed text-white/75 sm:text-base">
              A dynamic student-led organization at YCCE College, Nagpur,
              dedicated to fostering innovation, technical excellence, and
              social responsibility.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-xl font-bold text-[#D4EBFF] md:text-2xl">
                  50+
                </p>
                <p className="text-xs text-white/70">Events</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#D4EBFF] md:text-2xl">
                  250+
                </p>
                <p className="text-xs text-white/70">Members</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#D4EBFF] md:text-2xl">
                  8+
                </p>
                <p className="text-xs text-white/70">Social Initiatives</p>
              </div>
            </div>
            <Button
              className="group h-11 px-6 font-bold text-white hover:bg-white/10"
              variant="outline"
            >
              <span>Learn More</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            style={{ y: fortY }}
            className="absolute bottom-0 right-0 z-10 h-full w-[65%]"
          >
            <img
              src="/landing/str/rajgad-fort-upt.png"
              className="absolute bottom-0 right-0 h-[85%] w-auto object-contain object-right-bottom"
              alt="Rajgad Fort"
            />
            <div
              className="pointer-events-none absolute -bottom-10 h-64 w-[200vw]"
              style={{
                background:
                  "linear-gradient(to top, #6183B1 0%, #6183B1 40%, transparent 100%)",
                left: "-100vw",
              }}
            />
          </motion.div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div className="relative z-20 w-full overflow-hidden bg-[#6183B1] px-4 py-20">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <h2 className="font-fraunces text-2xl font-semibold text-white md:text-4xl">
                How we build the future:
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Cards here represent the 3-card structure found in previous versions */}
              <div className="min-h-[400px] rounded-[32px] bg-[#1D317D] p-6 text-white">
                <h3 className="mb-3 text-lg font-medium">
                  1. Ideation & Planning
                </h3>
                <p className="text-xs opacity-80">
                  We start with a spark of an idea, brainstorming solutions to
                  real-world technical and social challenges.
                </p>
              </div>
              <div className="min-h-[400px] rounded-[32px] bg-[#FCFAF2] p-6 text-[#1D317D]">
                <h3 className="mb-3 text-lg font-medium">
                  2. Hands-on Execution
                </h3>
                <p className="text-xs opacity-80">
                  From coding hackathons to community donation drives, we put
                  our plans into action.
                </p>
              </div>
              <div className="min-h-[400px] rounded-[32px] bg-[#1D317D] p-6 text-white">
                <h3 className="mb-3 text-lg font-medium">3. Impact & Growth</h3>
                <p className="text-xs opacity-80">
                  We measure our success by the growth of our members and the
                  positive impact on our community.
                </p>
              </div>
            </div>
            <CloudDecoration
              scrollYProgress={scrollYProgress}
              className="-left-20 top-0 w-64"
              speed={0.1}
            />
            <CloudDecoration
              scrollYProgress={scrollYProgress}
              className="-right-32 bottom-20 w-72"
              speed={0.15}
              reverse
            />
          </div>
        </div>

        {/* OFFER SECTION */}
        <div className="relative z-20 w-full overflow-hidden bg-[#6183B1] px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-fraunces mb-10 text-center text-2xl font-semibold text-white">
              What we offer our members
            </h2>
            <div className="space-y-4">
              {[
                "Technical Excellence",
                "Social Responsibility",
                "Leadership Skills",
              ].map((title, i) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-white"
                >
                  <h3 className="text-xl font-medium">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EVENTS SECTION */}
        <div className="relative z-20 w-full overflow-hidden bg-[#6183B1] py-20">
          <div className="container mx-auto px-4">
            <h3 className="font-fraunces mb-10 text-center text-2xl font-semibold text-white">
              Our Events & Activities
            </h3>
            <div className="grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-6">
              {events.slice(0, 6).map((event, index) => (
                <motion.div
                  key={event.name}
                  className={`relative overflow-hidden rounded-3xl ${index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}`}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 text-white">
                    <h4 className="font-bold">{event.name}</h4>
                    <p className="text-[10px] opacity-70">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button
                className="h-12 px-8 font-bold text-[#193486]"
                variant="default"
              >
                View All Events
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="relative z-20 w-full overflow-hidden bg-[#6183B1] px-4 py-24">
          <div className="container mx-auto max-w-4xl text-white">
            <h2 className="font-fraunces mb-10 text-center text-2xl font-semibold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                >
                  <h4 className="text-lg font-medium">{faq.question}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEEDBACK SECTION */}
        <div className="relative z-20 w-full overflow-hidden bg-[#6183B1] px-4 pb-24 pt-12">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-[32px] border border-white/20 bg-white/10 p-10 text-white backdrop-blur-md">
              <h4 className="mb-6 text-center text-xl font-semibold">
                Feedback Form
              </h4>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-sm outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-sm outline-none"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-sm outline-none"
                />
                <Button
                  className="h-12 w-full font-bold text-[#193486]"
                  variant="default"
                >
                  Submit Feedback
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageComplete;
