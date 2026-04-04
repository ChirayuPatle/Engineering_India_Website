"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  Clock,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import Container from "@/components/landing/container";
import { motion } from "motion/react";
import { FloatingCloud } from "@/components/landing/FloatingCloud";

interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  date: string;
  registrationDeadline: string;
  venue: string;
  category: string;
  registrationFee: number;
  teamSize: string;
  prizes: string;
  registrationLink: string;
}

const events: Event[] = [
  {
    id: "ai-workshop",
    title: "AI Workshop ✨",
    subtitle: "⚡ INNOVATE WORKSHOP 2025 – Skill Up. Stand Out. Succeed. ⚡",
    description:
      "Turn curiosity into capability! Join this hands-on workshop to learn from industry experts about real-world AI applications and emerging trends. Explore Agentic AI, Generative AI, Intelligent Automation, and work with Azure AI, Python frameworks, and ML pipelines.",
    icon: Code,
    date: "Nov 01, 2025",
    registrationDeadline: "Oct 31, 2025",
    venue: "Old CCC Seminar Hall, YCCE Campus",
    category: "Workshop",
    registrationFee: 60,
    teamSize: "Individual",
    prizes: "Participation Certificate",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScP85Ev2P5va6rUaPx81aJTvApdC8XTcNBIwSmPxQDJ8FxwkQ/viewform",
  },
  {
    id: "hackathon",
    title: "HACKATHON 2025",
    subtitle: "",
    description:
      "Unleash your creativity and technical prowess in our flagship hackathon! A 24-hour journey of building, coding, and innovating to solve real-world problems.",
    icon: Code,
    date: "Nov 01, 2025",
    registrationDeadline: "CLOSED",
    venue: "YCCE, Nagpur",
    category: "Hackathon",
    registrationFee: 300,
    teamSize: "2-4 members",
    prizes: "worth ₹13,000",
    registrationLink: "/events/hackathon",
  },
  {
    id: "ideathon",
    title: "⚡ IDEATHON – StartupWave ⚡",
    subtitle: "",
    description:
      "A thrilling Ideathon where creativity meets innovation! Dive into brainstorming, designing, and pitching groundbreaking ideas that solve real-world problems. Think. Create. Revolutionize.",
    icon: Code,
    date: "Nov 01, 2025",
    registrationDeadline: "Limited Slots",
    venue: "IT Department, YCCE",
    category: "Ideathon",
    registrationFee: 269,
    teamSize: "Up to 6 members",
    prizes: "worth ₹10,000",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfcnZKYUT4ShdMc16rmpw9d50Q0e4OUcTmA-99YHQIiKEPwyA/viewform",
  },
  {
    id: "treasure-hunt",
    title: "🗝️ Treasure Hunt – Decode. Discover. Dominate. 🔍",
    subtitle: "",
    description:
      "An electrifying quest packed with mystery, logic, and excitement! Follow the trail of riddles, puzzles, and hidden hints scattered across the campus. Think fast. Move smart. Hunt harder.",
    icon: Code,
    date: "Nov 01, 2025",
    registrationDeadline: "Limited Slots",
    venue: "YCCE Campus",
    category: "Adventure",
    registrationFee: 250,
    teamSize: "3-5 members",
    prizes: "worth ₹2,500",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScRvth2ZZr3alsOYSLi7yoMKQTAHdfPfNoqhuD3pghTCEpibQ/viewform",
  },
];

export default function PrarambhPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0F1B40] text-white selection:bg-[#D4EBFF] selection:text-[#0F1B40]">
      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#9A8EB8] via-[#6183B1] to-[#0F1B40] px-4 pb-24 pt-32 text-center">
        <div className="container relative z-20 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex justify-center"
          >
            <div className="group relative">
              <div className="absolute inset-0 bg-[#D4EBFF] opacity-20 blur-[120px] transition-opacity duration-1000 group-hover:opacity-40" />
              <Image
                src="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpfeU5o0XrTM2A4iGtHSU9JzXjlhanE7L0yQkV"
                alt="Prarambh 2025"
                width={800}
                height={400}
                className="relative z-10 h-auto w-full max-w-4xl object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-xl">
              <Sparkles className="h-5 w-5 text-[#D4EBFF]" />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-white">
                The Beginning of Brilliance
              </span>
            </div>

            <h1 className="font-fraunces text-4xl font-bold leading-tight md:text-7xl lg:text-8xl">
              Where Ideas Transform <br />
              Into <span className="italic text-[#D4EBFF]">Reality</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/70 md:text-xl">
              Join the most awaited technology festival of the year. Prarambh
              2025 brings you a curated set of challenges to test your limits.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 pt-10 sm:flex-row">
              <Button
                size="xl"
                variant="premium"
                onClick={() =>
                  document
                    .getElementById("events")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-2xl px-10 py-8 text-lg"
              >
                Explore Events
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>

              <Link href="/dashboard">
                <Button
                  size="xl"
                  className="rounded-2xl border border-white/10 bg-white/5 px-10 py-8 text-lg backdrop-blur-md hover:bg-white/10"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <FloatingCloud
          top="5%"
          left="-10%"
          speed={0.4}
          cloudNum={1}
          opacity="opacity-30"
          scale={1.5}
        />
        <FloatingCloud
          top="20%"
          left="80%"
          speed={0.5}
          cloudNum={2}
          opacity="opacity-20"
          scale={1.2}
        />
      </section>

      {/* Stats Section */}
      <section className="relative z-20 bg-[#0F1B40] py-24">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Prizes", value: "₹25K+", icon: Trophy },
              { label: "Participants", value: "1000+", icon: Users },
              { label: "Events", value: "4 Flagship", icon: Zap },
              { label: "Days", value: "02 Full", icon: Calendar },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center rounded-[40px] border border-white/5 bg-white/[0.02] p-8 text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4EBFF]/20 bg-[#D4EBFF]/10">
                  <stat.icon className="h-6 w-6 text-[#D4EBFF]" />
                </div>
                <h4 className="mb-1 text-3xl font-bold text-white">
                  {stat.value}
                </h4>
                <p className="text-sm font-bold uppercase tracking-widest text-white/40">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="relative z-20 overflow-hidden bg-[#0F1B40] py-32"
      >
        <Container>
          <div className="mb-24 text-center">
            <h2 className="font-fraunces mb-6 text-5xl font-bold md:text-7xl">
              Featured Events
            </h2>
            <div className="mx-auto mb-8 h-1.5 w-24 rounded-full bg-[#D4EBFF] shadow-[0_0_20px_rgba(212,235,255,0.5)]" />
            <p className="mx-auto max-w-2xl font-sans text-xl leading-relaxed text-white/50">
              Carefully crafted competition tiers for every skill level. Select
              your arena and prepare for the battle of brains.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <Card className="flex h-full flex-col overflow-hidden rounded-[50px] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-[#D4EBFF]/30 hover:bg-white/[0.08]">
                  <CardHeader className="p-10 pb-6">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#D4EBFF]/20 bg-[#D4EBFF]/10">
                        <event.icon className="h-8 w-8 text-[#D4EBFF]" />
                      </div>
                      <div
                        className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${
                          event.registrationDeadline === "CLOSED"
                            ? "border border-pink-500/20 bg-pink-500/10 text-pink-500"
                            : "border border-[#D4EBFF]/20 bg-[#D4EBFF]/10 text-[#D4EBFF]"
                        }`}
                      >
                        {event.category}
                      </div>
                    </div>
                    <CardTitle className="font-fraunces text-3xl font-bold leading-tight text-white transition-colors group-hover:text-[#D4EBFF] md:text-4xl">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-8 px-10">
                    <p className="line-clamp-3 font-sans text-lg font-medium leading-relaxed text-white/60">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                          <DollarSign className="h-3 w-3" /> Fees
                        </div>
                        <p className="text-2xl font-bold text-white">
                          ₹{event.registrationFee}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                          <Clock className="h-3 w-3" /> Status
                        </div>
                        <p
                          className={`text-xl font-bold ${event.registrationDeadline === "CLOSED" ? "text-pink-500" : "text-[#D4EBFF]"}`}
                        >
                          {event.registrationDeadline}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-white/5 pt-6">
                      <div className="flex items-center gap-3 text-white/70">
                        <MapPin className="h-5 w-5 text-[#D4EBFF]/50" />
                        <span className="text-sm font-medium">
                          {event.venue}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <Trophy className="h-5 w-5 text-[#D4EBFF]/50" />
                        <span className="text-sm font-medium">
                          Prizes {event.prizes}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-10 pt-4">
                    <Button
                      className={`h-16 w-full rounded-3xl text-lg font-bold transition-all duration-500 ${
                        event.registrationDeadline === "CLOSED"
                          ? "cursor-not-allowed border border-white/10 bg-white/5 text-white/20"
                          : "bg-[#D4EBFF] text-[#0F1B40] shadow-[0_10px_30px_rgba(212,235,255,0.2)] hover:scale-105"
                      }`}
                      disabled={event.registrationDeadline === "CLOSED"}
                      onClick={() => {
                        if (event.registrationDeadline === "CLOSED") return;
                        if (event.registrationLink.startsWith("http")) {
                          window.open(event.registrationLink, "_blank");
                        } else {
                          router.push(event.registrationLink);
                        }
                      }}
                    >
                      {event.registrationDeadline === "CLOSED" ? (
                        "Registrations Closed"
                      ) : (
                        <span className="flex items-center gap-2">
                          Register Now <ArrowRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>

        <FloatingCloud
          top="10%"
          left="90%"
          speed={0.4}
          cloudNum={4}
          opacity="opacity-10"
          scale={2}
        />
      </section>

      {/* Footer CTA */}
      <section className="relative z-20 bg-[#0F1B40] py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[60px] bg-gradient-to-r from-[#6183B1] to-[#9A8EB8] p-12 text-center md:p-24"
          >
            <div className="relative z-10 space-y-8">
              <h3 className="font-fraunces text-4xl font-bold text-white md:text-6xl">
                Ready to make history?
              </h3>
              <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-white/80">
                Be part of the legacy. Join Engineering India YCCE and
                let&apos;s innovate together.
              </p>
              <div className="flex flex-col items-center justify-center gap-6 pt-6 sm:flex-row">
                <Button
                  variant="premium"
                  size="xl"
                  className="rounded-2xl border-none px-10"
                >
                  Join Our Community
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="rounded-2xl border-white/20 bg-white/10 px-10 text-white hover:bg-white/20"
                >
                  View All Events
                </Button>
              </div>
            </div>

            <div className="absolute right-0 top-0 p-12 opacity-10">
              <Star className="h-64 w-64 text-white" />
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
