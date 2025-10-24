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
import { Bebas_Neue } from "next/font/google";
import { ArrowRight, Code, Clock, DollarSign } from "lucide-react";
import Container from "@/components/landing/container";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

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
    id: "hackathon",
    title: "HACKATHON 2025",
    subtitle: "",
    description:
      "Unleash your creativity and technical prowess in our flagship hackathon!`",
    icon: Code,
    date: "Nov 01, 2025",
    registrationDeadline: "Oct 29, 2025",
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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Light Theme with Blue Gradients */}
      <section className="relative overflow-hidden bg-white py-20 text-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>

        {/* Blue Gradient Accents */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"></div>
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl"></div>

        <Container>
          <div className="relative z-10 mt-[10vh] text-center">
            {/* Prarambh Featured Image - Larger and Responsive */}
            <div className="mb-8 flex justify-center">
              <Image
                src="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpfeU5o0XrTM2A4iGtHSU9JzXjlhanE7L0yQkV"
                alt="Prarambh 2025"
                width={500}
                height={500}
                className="h-auto w-80 object-contain sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[700px]"
                priority
              />
            </div>

            {/* <h1
              className={`${bebasNeue.className} mb-6 text-5xl font-bold text-gray-900 md:text-7xl`}
            >
              The Beginning of Innovation
            </h1> */}
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
              Join Prarambh 2025 - Where Ideas Transform into Reality
              <br />
              <span className="font-semibold text-blue-600">
                The Beginning of Brilliance.
              </span>
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group bg-blue-600 text-white hover:bg-blue-700"
                asChild
              >
                <a href="#events">
                  View Events
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100"
                asChild
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </Container>

        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl"></div>
      </section>

      {/* Events Grid - Light Theme Design */}
      <section
        id="events"
        className="bg-gradient-to-b from-white to-blue-50/30 py-20"
      >
        <Container>
          <div className="mb-12 text-center">
            <h2
              className={`${bebasNeue.className} mb-4 text-5xl font-bold text-gray-900`}
            >
              Featured Events
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our flagship events. Limited seats available - Register now!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              return (
                <Card
                  key={event.id}
                  className="overflow-hidden border-2 border-blue-300 bg-white duration-300"
                >
                  <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white pb-4">
                    <CardTitle
                      className={`${bebasNeue.className} text-4xl font-bold text-gray-900`}
                    >
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-5 pt-6">
                    <p className="leading-relaxed text-gray-700">
                      {event.description}
                    </p>

                    {/* Fee and Deadline */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3 rounded-lg border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4">
                        <div className="rounded-full bg-blue-600 p-2">
                          <DollarSign className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">
                            Registration Fee
                          </p>
                          <p className="text-xl font-bold text-gray-900">
                            ₹{event.registrationFee}
                          </p>
                          <p className="text-xs text-gray-500">per team</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border-2 border-red-300 bg-gradient-to-br from-red-50 to-red-100/50 p-4">
                        <div className="rounded-full bg-red-600 p-2">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-red-600">
                            Registration Deadline
                          </p>
                          <p className="text-xl font-bold text-red-700">
                            {event.registrationDeadline}
                          </p>
                          <p className="text-xs text-red-500">Hurry up!</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-gray-50 pt-6">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                      size="lg"
                      onClick={() => {
                        if (event.registrationLink.startsWith("http")) {
                          window.open(event.registrationLink, "_blank");
                        } else {
                          router.push(event.registrationLink);
                        }
                      }}
                    >
                      Register Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
