"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Share2,
  ArrowLeft,
  Target,
  Zap,
  Award,
  DollarSign,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useQuery } from "@tanstack/react-query";

const fetchHackathonRegistration = async (): Promise<any> => {
  const res = await fetch("/api/hackathon/my-registration");
  if (!res.ok) {
    if (res.status === 401) return null;
    throw new Error("Failed to fetch hackathon registration.");
  }
  const data = (await res.json()) as { registration: any };
  return data.registration;
};

export default function HackathonPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("about");

  const { data: registration, isLoading: isLoadingRegistration } = useQuery({
    queryKey: ["hackathonRegistration"],
    queryFn: fetchHackathonRegistration,
  });

  const isRegistered = !!registration;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "HACKATHON 2025 - Engineering India Club",
          text: "Join us for an exciting hackathon event!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleRegister = () => {
    if (isRegistered) {
      router.push("/dashboard");
    } else {
      router.push("/events/hackathon/register");
    }
  };

  const timeline = [
    {
      time: "17th Oct",
      activity: "Registration Opens & Problem Statements Shared",
      description:
        "Registration portal goes live. All tracks and problem statements are shared with participants. Teams can start brainstorming ideas.",
    },
    {
      time: "25th Oct",
      activity: "Round 1 - PPT Submission Window Opens",
      description:
        "Teams can start submitting their PowerPoint presentations online through the official website. Use the provided template to present your innovative solution.",
    },
    {
      time: "29th Oct, 12:00 PM",
      activity: "Round 1 Submission Deadline",
      description:
        "Final deadline for PPT submissions. Late submissions will not be accepted. Ensure your presentation is uploaded before noon.",
    },
    {
      time: "30th Oct",
      activity: "Round 1 Results Announced",
      description:
        "Top 20 teams will be shortlisted based on innovation, creativity, feasibility, and presentation quality. Selected teams will receive confirmation emails.",
    },
    {
      time: "1st Nov, 9:00 AM",
      activity: "Round 2 - Final Hackathon Begins",
      description:
        "Shortlisted teams report to YCCE for the onsite hackathon. Develop your prototype and prepare for final presentations.",
      location: "AIML Lab, YCCE",
    },
    {
      time: "1st Nov, 3:00 PM",
      activity: "Final Presentations & Results",
      description:
        "Teams will build and present their working prototypes to the judging panel. Winners will be announced and prizes will be distributed.",
      location: "YCCE, Nagpur",
    },
  ];

  const faqs = [
    {
      question: "Who can participate in the hackathon?",
      answer:
        "The hackathon is open to all undergraduate engineering students. Teams can have 2-4 members.",
    },
    {
      question: "What is the registration fee?",
      answer:
        "The registration fee is ₹300 per team (not per person). This covers both rounds of the competition.",
    },
    {
      question: "How many rounds are there?",
      answer:
        "There are 2 rounds: Round 1 is an online PPT submission where you present your idea. Top 20 teams advance to Round 2, which is an onsite hackathon at YCCE where you'll build your prototype.",
    },
    {
      question: "Can we use AI tools like ChatGPT or GitHub Copilot?",
      answer:
        "Yes! Participants are allowed to use AI tools for idea development, coding assistance, or design. We encourage using modern tools to enhance productivity.",
    },
    {
      question: "What should we bring for Round 2?",
      answer:
        "Participants should bring their own laptops with necessary software pre-installed. Internet access will be provided at the venue.",
    },
    {
      question: "How will teams be judged?",
      answer:
        "In Round 1, teams will be judged on innovation, creativity, practical feasibility, and presentation quality. In Round 2, judges will evaluate functionality, technical depth, presentation skills, and problem-solving approach.",
    },
    {
      question: "What is the prize distribution?",
      answer:
        "The total prize pool is worth ₹13,000, with internship opportunities for top performers.",
    },
    {
      question: "When will problem statements be shared?",
      answer:
        "Problem statements and tracks will be shared on 17th October when registration opens.",
    },
    {
      question: "Is the event online or offline?",
      answer:
        "It's a hybrid event. Round 1 (PPT submission) is completely online. Round 2 (final hackathon) is onsite at YCCE, Nagpur.",
    },
    {
      question: "What if we miss the submission deadline?",
      answer:
        "Late submissions will not be accepted. Please ensure your PPT is submitted before 29th October, 12:00 PM.",
    },
  ];

  const aboutContent = `## About the Hackathon

The **Engineering India Hackathon 2025** is a two-round competition designed to inspire innovation, creativity, and real-world problem-solving among budding engineers. Participants will tackle carefully curated problem statements across multiple tracks such as **FinTech, EdTech, AI & Blockchain, Sustainable Development, and Open Innovation**, building impactful and feasible solutions.

This hackathon is not just about coding — it’s about transforming ideas into tangible projects that can create meaningful change. Along with exciting rewards, the top-performing teams will also get a **chance to earn exclusive Internship and PPO opportunities** through our partner organizations and industry collaborators.

---

## Event Structure

### **Round 1 – Online PPT Submission**
**End Date:** 29th October

Results will be out on **30th October**

Participants will receive a set of **tracks and problem statements on 15th October**. Each team must choose one problem statement and submit a **PowerPoint Presentation (PPT)** using the official template provided.

**Submission Mode:** Online (via Engineering India Official Website)

**Judging Criteria:**
- Innovation and originality of the idea  
- Creativity in problem-solving  
- Practical feasibility  
- Presentation quality and clarity  

---

### **Round 2 – Onsite Hackathon (Final Round)**

**Venue:** YCCE, Nagpur  
**Date:** 1st November  

Shortlisted teams will be invited to YCCE for the final onsite round, where they will develop a working prototype or solution based on their Round 1 idea.

**Final Evaluation Criteria:**
- Functionality and technical implementation  
- Innovation and technical depth  
- Presentation and communication skills  
- Problem-solving approach  

---

## Rules & Regulations

**Team Composition:**  
Each team must have a minimum of **2 members** and a maximum of **4 members**.

**Eligibility:**  
Open to all **undergraduate engineering students** across any branch or college.

**Original Work:**  
All submitted ideas and projects must be **original**. Any form of plagiarism will result in **disqualification**.

**Use of AI Tools:**  
Participants are allowed to use AI tools (such as **ChatGPT, GitHub Copilot**, or similar) for ideation, coding, or design assistance.

**Hardware & Software Requirements:**  
Teams should bring their own laptops and ensure all required software and tools are pre-installed.

**Code of Conduct:**  
Participants are expected to maintain discipline, professionalism, and integrity throughout the event.

**Judging & Decisions:**  
All decisions made by the judges will be **final and binding**.

---

## Rewards and Recognition

🏆 **Exciting Prizes, Certificates & Internship Opportunities**  
Top-performing teams will be awarded **cash prizes, certificates, and goodies**.  
In addition, outstanding participants will have a chance to receive **Internship offers and PPO opportunities** from partnering organizations, based on their skills and project performance.  

All shortlisted teams will receive **participation certificates** recognizing their contribution and innovation.

---

## Why Participate?

- Gain **hands-on experience** in solving real-world technical challenges  
- Collaborate and network with **like-minded innovators**  
- Showcase your skills to **mentors, judges, and recruiters**  
- Earn potential **Internship and PPO opportunities** through your performance  
- Win **exciting prizes, certificates, and recognition**  

---

**Think. Build. Innovate.**  
Join us at **Engineering India Hackathon 2025** — where ideas meet opportunity!
`;

  const tabItems = [
    { id: "about", label: "About", icon: Target },
    { id: "problem-statement", label: "Problem Statement", icon: FileText },
    { id: "prizes", label: "Prizes", icon: Trophy },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "faq", label: "FAQs", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/events")}
            className="text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Event Details (2/3 width) */}
            <div className="space-y-6 lg:col-span-2">
              {/* Event Header Card */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Event Info */}
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Category Badge */}
                  <Badge className="mb-2 border-0 bg-black text-xs text-white hover:bg-gray-900 sm:mb-3 sm:text-sm">
                    Hackathon
                  </Badge>

                  {/* Event Title */}
                  <h1 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
                    HACKATHON 2025
                  </h1>

                  {/* Event Metadata */}
                  <div className="mb-4 flex flex-wrap gap-3 border-b border-gray-200 pb-4 sm:mb-6 sm:gap-4 sm:pb-6">
                    <div className="flex items-center gap-1.5 text-gray-700 sm:gap-2">
                      <Calendar className="h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" />
                      <span className="text-xs font-medium sm:text-sm">
                        Nov 01, 2025
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-700 sm:gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" />
                      <span className="text-xs font-medium sm:text-sm">
                        YCCE, Nagpur
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-700 sm:gap-2">
                      <DollarSign className="h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" />
                      <span className="text-xs font-medium sm:text-sm">
                        ₹300 per team
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Registration Status Card - Only visible on small screens */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm lg:hidden">
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                  {isRegistered ? "Registration Status" : "Register for Event"}
                </h2>

                {/* Registration Status or Deadline */}
                {isRegistered ? (
                  <div
                    className={`mb-4 rounded-lg border-2 p-4 ${
                      registration?.status === "verified"
                        ? "border-green-500 bg-green-50"
                        : registration?.status === "rejected"
                          ? "border-red-500 bg-red-50"
                          : "border-yellow-500 bg-yellow-50"
                    }`}
                  >
                    <div
                      className={`mb-1 flex items-center gap-2 ${
                        registration?.status === "verified"
                          ? "text-green-700"
                          : registration?.status === "rejected"
                            ? "text-red-700"
                            : "text-yellow-700"
                      }`}
                    >
                      <CheckCircle2
                        className={`h-5 w-5 ${
                          registration?.status === "verified"
                            ? "text-green-600"
                            : registration?.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold uppercase ${
                          registration?.status === "verified"
                            ? "text-green-800"
                            : registration?.status === "rejected"
                              ? "text-red-800"
                              : "text-yellow-800"
                        }`}
                      >
                        You're Registered!
                      </span>
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        registration?.status === "verified"
                          ? "text-green-700"
                          : registration?.status === "rejected"
                            ? "text-red-700"
                            : "text-yellow-700"
                      }`}
                    >
                      Team:{" "}
                      <span className="font-bold">
                        {registration?.teamName}
                      </span>
                    </p>

                    {/* Status Badge */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-600">
                        Status:
                      </span>
                      <Badge
                        className={`border-0 text-white ${
                          registration?.status === "verified"
                            ? "bg-green-600 hover:bg-green-700"
                            : registration?.status === "rejected"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-yellow-600 hover:bg-yellow-700"
                        }`}
                      >
                        {registration?.status === "verified"
                          ? "✓ Verified"
                          : registration?.status === "rejected"
                            ? "✗ Rejected"
                            : "⏳ Pending Verification"}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 rounded-lg border-2 border-black bg-black p-4">
                    <div className="mb-1 flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4 text-white" />
                      <span className="text-xs font-semibold uppercase text-white">
                        Registration Deadline
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">Oct 29, 2025</p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="mb-4 grid grid-cols-2 gap-3 border-b border-gray-200 pb-4">
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="mb-1 text-xs text-gray-600">Entry Fee</p>
                    <p className="text-lg font-bold text-black">₹300</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="mb-1 text-xs text-gray-600">
                      Prize Pool Worth
                    </p>
                    <p className="text-lg font-bold text-black">₹13,000</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="mb-1 text-xs text-gray-600">Reg. Ends</p>
                    <p className="text-lg font-bold text-black">Oct 29</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="mb-1 text-xs text-gray-600">Event Date</p>
                    <p className="text-lg font-bold text-gray-900">Nov 1</p>
                  </div>
                </div>

                {/* Action Button */}
                {isLoadingRegistration ? (
                  <Button
                    size="lg"
                    className="h-11 w-full cursor-not-allowed bg-gray-300 font-semibold text-gray-600 shadow-md"
                    disabled
                  >
                    Loading...
                  </Button>
                ) : isRegistered ? (
                  <Button
                    size="lg"
                    className="h-11 w-full bg-green-600 font-semibold text-white shadow-md hover:bg-green-700"
                    onClick={handleRegister}
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    View Registration
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="h-11 w-full bg-black font-semibold text-white shadow-md hover:bg-gray-900"
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                )}

                {/* Rulebook Section - Mobile */}
                <div className="mt-4 rounded-lg border-2 border-purple-600 bg-gradient-to-br from-purple-50 to-blue-50 p-3 shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-gray-900">
                        📖 Official Rulebook
                      </h3>
                      <p className="text-[10px] text-gray-600">Must read!</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="h-9 w-full bg-purple-600 font-semibold text-white shadow-sm hover:bg-purple-700"
                  >
                    <a
                      href="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpDuf8FEqCMnKOdXvABaVlJfIyukFmYtgz1wpZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="text-xs">Download PDF</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <div className="scrollbar-hide flex gap-0 overflow-x-auto">
                    {tabItems.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-medium transition-all sm:px-6 sm:py-4 sm:text-sm",
                            activeTab === tab.id
                              ? "border-black bg-gray-50 text-black"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          )}
                        >
                          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* About Tab */}
                  {activeTab === "about" && (
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <div className="prose prose-gray prose-sm sm:prose-base max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ node: _node, ...props }) => (
                                <h1
                                  className="mb-3 mt-4 text-xl font-bold text-gray-900 sm:mb-4 sm:mt-6 sm:text-2xl"
                                  {...props}
                                />
                              ),
                              h2: ({ node: _node, ...props }) => (
                                <h2
                                  className="mb-2 mt-4 text-lg font-bold text-gray-900 sm:mb-3 sm:mt-5 sm:text-xl"
                                  {...props}
                                />
                              ),
                              h3: ({ node: _node, ...props }) => (
                                <h3
                                  className="mb-2 mt-3 text-base font-bold text-gray-900 sm:mt-4 sm:text-lg"
                                  {...props}
                                />
                              ),
                              p: ({ node: _node, ...props }) => (
                                <p
                                  className="mb-3 text-sm leading-relaxed text-gray-700 sm:mb-4 sm:text-base"
                                  {...props}
                                />
                              ),
                              a: ({ node: _node, ...props }) => (
                                <a
                                  className="break-words font-medium text-black hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                />
                              ),
                              ul: ({ node: _node, ...props }) => (
                                <ul
                                  className="mb-3 ml-4 list-disc space-y-1.5 text-sm sm:mb-4 sm:ml-6 sm:space-y-2 sm:text-base"
                                  {...props}
                                />
                              ),
                              ol: ({ node: _node, ...props }) => (
                                <ol
                                  className="mb-3 ml-4 list-decimal space-y-1.5 text-sm sm:mb-4 sm:ml-6 sm:space-y-2 sm:text-base"
                                  {...props}
                                />
                              ),
                              li: ({ node: _node, ...props }) => (
                                <li
                                  className="leading-relaxed text-gray-700"
                                  {...props}
                                />
                              ),
                              blockquote: ({ node: _node, ...props }) => (
                                <blockquote
                                  className="my-3 border-l-2 border-black pl-3 text-sm italic text-gray-600 sm:my-4 sm:border-l-4 sm:pl-4 sm:text-base"
                                  {...props}
                                />
                              ),
                              code: ({ node: _node, inline, ...props }: any) =>
                                inline ? (
                                  <code
                                    className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs text-black sm:px-1.5 sm:text-sm"
                                    {...props}
                                  />
                                ) : (
                                  <code
                                    className="block overflow-x-auto rounded-lg bg-gray-100 p-3 font-mono text-xs text-gray-900 sm:p-4 sm:text-sm"
                                    {...props}
                                  />
                                ),
                              strong: ({ node: _node, ...props }) => (
                                <strong
                                  className="font-semibold text-gray-900"
                                  {...props}
                                />
                              ),
                              em: ({ node: _node, ...props }) => (
                                <em
                                  className="italic text-gray-700"
                                  {...props}
                                />
                              ),
                              hr: ({ node: _node, ...props }) => (
                                <hr
                                  className="my-4 border-gray-300 sm:my-6"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {aboutContent}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-black sm:p-5">
                          <Award className="mb-2 h-6 w-6 text-black sm:mb-3 sm:h-8 sm:w-8" />
                          <h3 className="mb-1 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg">
                            Open to All
                          </h3>
                          <p className="text-xs text-gray-700 sm:text-sm">
                            All undergraduate engineering students are welcome
                            to participate.
                          </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-black sm:p-5">
                          <Trophy className="mb-2 h-6 w-6 text-black sm:mb-3 sm:h-8 sm:w-8" />
                          <h3 className="mb-1 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg">
                            Exciting Rewards
                          </h3>
                          <p className="text-xs text-gray-700 sm:text-sm">
                            Winners receive cash prizes and certificates of
                            participation.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Problem Statement Tab */}
                  {activeTab === "problem-statement" && (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Header */}
                      <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3 md:mb-8">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-black shadow-lg sm:h-10 sm:w-10 md:h-12 md:w-12">
                          <FileText className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-3xl">
                          Problem Statement
                        </h2>
                      </div>

                      {/* Highlighted Download Section */}
                      <div className="relative overflow-hidden rounded-lg border-2 border-black bg-gray-50 p-4 shadow-lg sm:rounded-xl sm:p-6 md:p-8">
                        <div className="relative space-y-3 sm:space-y-4">
                          {/* Download Button */}
                          <div className="pt-1 sm:pt-2">
                            <Button
                              asChild
                              size="lg"
                              className="h-12 w-full bg-black text-sm font-bold text-white shadow-md transition-all hover:bg-gray-900 hover:shadow-lg sm:h-14 sm:text-base md:h-16 md:text-lg"
                            >
                              <a
                                href="https://ebqqc80v6n.ufs.sh/f/JM14HErelurp3COQ4GZreWwRDjVmTxH78Zg9h2SoLPzfYcnO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 sm:gap-3"
                              >
                                <Download className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                <span className="truncate">
                                  Download Problem Statement PDF
                                </span>
                                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Rulebook Section - NEW */}
                      <div className="relative overflow-hidden rounded-lg border-2 border-purple-600 bg-gradient-to-br from-purple-50 to-blue-50 p-4 shadow-lg sm:rounded-xl sm:p-6 md:p-8">
                        <div className="relative space-y-3 sm:space-y-4">
                          {/* Rulebook Header */}
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600 shadow-md sm:h-12 sm:w-12">
                              <FileText className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base font-bold text-gray-900 sm:text-lg md:text-xl">
                                📖 Official Hackathon Rulebook
                              </h3>
                              <p className="text-xs text-gray-600 sm:text-sm">
                                Complete rules, guidelines & submission format
                              </p>
                            </div>
                          </div>

                          {/* Download Button */}
                          <div className="pt-1 sm:pt-2">
                            <Button
                              asChild
                              size="lg"
                              className="h-12 w-full bg-purple-600 text-sm font-bold text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg sm:h-14 sm:text-base md:h-16 md:text-lg"
                            >
                              <a
                                href="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpDuf8FEqCMnKOdXvABaVlJfIyukFmYtgz1wpZ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 sm:gap-3"
                              >
                                <Download className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                <span className="truncate">
                                  Download Rulebook PDF
                                </span>
                                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                              </a>
                            </Button>
                          </div>

                          {/* Important Notice */}
                          <div className="rounded-lg border border-purple-300 bg-white p-3 sm:p-4">
                            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                              <strong className="text-purple-700">
                                ⚠️ Important:
                              </strong>{" "}
                              All participants must read and follow the official
                              rulebook. It contains detailed information about
                              submission formats, judging criteria, code of
                              conduct, and disqualification policies.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Important Information */}
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base font-bold text-gray-900 sm:text-lg md:text-xl">
                          📋 What's Inside the Problem Statement?
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                          {/* Card 1 */}
                          <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all hover:border-black hover:shadow-md sm:p-4">
                            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 sm:h-10 sm:w-10">
                              <Target className="h-4 w-4 text-black sm:h-5 sm:w-5" />
                            </div>
                            <h4 className="mb-1.5 text-sm font-bold text-gray-900 sm:mb-2 sm:text-base">
                              Multiple Tracks
                            </h4>
                            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                              FinTech, EdTech, AI & Blockchain, Sustainable
                              Development, and Open Innovation tracks
                            </p>
                          </div>

                          {/* Card 2 */}
                          <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all hover:border-black hover:shadow-md sm:p-4">
                            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 sm:h-10 sm:w-10">
                              <CheckCircle2 className="h-4 w-4 text-black sm:h-5 sm:w-5" />
                            </div>
                            <h4 className="mb-1.5 text-sm font-bold text-gray-900 sm:mb-2 sm:text-base">
                              Detailed Requirements
                            </h4>
                            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                              Complete problem descriptions with specific
                              requirements and evaluation criteria
                            </p>
                          </div>

                          {/* Card 3 */}
                          <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all hover:border-black hover:shadow-md sm:p-4">
                            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 sm:h-10 sm:w-10">
                              <Trophy className="h-4 w-4 text-black sm:h-5 sm:w-5" />
                            </div>
                            <h4 className="mb-1.5 text-sm font-bold text-gray-900 sm:mb-2 sm:text-base">
                              Judging Criteria
                            </h4>
                            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                              Clear guidelines on how solutions will be
                              evaluated and scored
                            </p>
                          </div>

                          {/* Card 4 */}
                          <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all hover:border-black hover:shadow-md sm:p-4">
                            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 sm:h-10 sm:w-10">
                              <Award className="h-4 w-4 text-black sm:h-5 sm:w-5" />
                            </div>
                            <h4 className="mb-1.5 text-sm font-bold text-gray-900 sm:mb-2 sm:text-base">
                              Submission Guidelines
                            </h4>
                            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                              Step-by-step instructions for Round 1 PPT
                              submission and Round 2 prototype presentation
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Important Notes */}
                      <div className="rounded-lg border-l-4 border-black bg-gray-50 p-3 sm:p-4 md:p-6">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-black sm:h-8 sm:w-8">
                            <Zap className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="mb-1.5 text-sm font-bold text-gray-900 sm:mb-2 sm:text-base">
                              Important Notes
                            </h4>
                            <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
                              <li className="flex items-start gap-1.5 sm:gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black sm:mt-1.5"></span>
                                <span className="leading-relaxed">
                                  Each team must choose ONE problem statement
                                  from the provided tracks
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5 sm:gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black sm:mt-1.5"></span>
                                <span className="leading-relaxed">
                                  Read the problem statement carefully before
                                  starting your solution
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5 sm:gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black sm:mt-1.5"></span>
                                <span className="leading-relaxed">
                                  Use the PPT template provided (available in
                                  your dashboard after registration)
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5 sm:gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black sm:mt-1.5"></span>
                                <span className="leading-relaxed">
                                  Submission deadline for Round 1: 29th October,
                                  12:00 PM
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Need Help Section */}
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 md:p-6">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black sm:h-10 sm:w-10">
                            <Award className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="mb-1.5 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg">
                              Need Clarification?
                            </h4>
                            <p className="mb-2 text-xs leading-relaxed text-gray-700 sm:mb-3 sm:text-sm">
                              If you have any questions about the problem
                              statements or need clarification on requirements,
                              feel free to reach out to our organizers.
                            </p>
                            <p className="text-xs font-medium text-gray-900 sm:text-sm">
                              Join our WhatsApp community (available after
                              registration) for quick support!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prizes Tab */}
                  {activeTab === "prizes" && (
                    <div className="space-y-4 sm:space-y-6">
                      <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
                        Prizes & Rewards
                      </h2>

                      {/* Additional Info */}
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:rounded-xl sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black sm:h-12 sm:w-12">
                            <Trophy className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                          </div> */}
                          <div className="min-w-0 flex-1">
                            <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
                              Total Prize Pool Worth:{" "}
                              <span className="text-black">₹13,000</span>
                            </h3>
                            <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:mb-4 sm:text-base">
                              Every participant will receive a{" "}
                              <strong className="text-gray-900">
                                Certificate of Participation
                              </strong>
                              .
                            </p>

                            {/* VectorTek Labs Opportunity Card */}
                            <div className="mt-3 rounded-lg border border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 p-3 sm:mt-4 sm:p-4">
                              <div className="flex items-start gap-2 sm:gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600 sm:h-10 sm:w-10">
                                  <Award className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="mb-1 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-900 sm:text-base">
                                    Internship Opportunity
                                    <Badge className="border-0 bg-purple-600 text-xs text-white hover:bg-purple-700">
                                      Exclusive
                                    </Badge>
                                  </h4>
                                  <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                                    Top performers will get the opportunity to
                                    intern with{" "}
                                    <strong className="text-purple-700">
                                      VectorTek Labs
                                    </strong>
                                    , a startup. Outstanding interns may receive
                                    a{" "}
                                    <strong className="text-purple-700">
                                      Pre-Placement Offer (PPO)
                                    </strong>
                                    !
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline Tab */}
                  {activeTab === "timeline" && (
                    <div className="space-y-4 sm:space-y-6">
                      <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
                        Event Timeline
                      </h2>

                      {/* Timeline Cards - Mobile Optimized */}
                      <div className="relative">
                        {/* Vertical Line - Hidden on mobile, visible on larger screens */}
                        <div className="absolute bottom-8 left-6 top-8 hidden w-0.5 bg-gray-300 sm:block"></div>

                        <div className="space-y-4 sm:space-y-6">
                          {timeline.map((item, index) => {
                            // Highlight key milestones with black color
                            const isKeyMilestone =
                              index === 0 ||
                              index === 3 ||
                              index === 5 ||
                              index === 7;

                            return (
                              <div key={index} className="relative sm:pl-16">
                                {/* Timeline Dot - Smaller on mobile */}
                                <div
                                  className={cn(
                                    "absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold shadow-lg sm:h-12 sm:w-12 sm:text-base",
                                    isKeyMilestone
                                      ? "border-black bg-black text-white"
                                      : "border-gray-300 bg-white text-gray-600",
                                  )}
                                >
                                  {index + 1}
                                </div>

                                {/* Timeline Card */}
                                <div
                                  className={cn(
                                    "ml-10 rounded-lg p-3 shadow-sm transition-all hover:shadow-lg sm:ml-0 sm:rounded-xl sm:p-5 sm:shadow-md",
                                    isKeyMilestone
                                      ? "border-l-2 border-black bg-gray-50 sm:border-l-4"
                                      : "border-l-2 border-gray-200 bg-white sm:border-l-4",
                                  )}
                                >
                                  <div className="mb-2 flex flex-col gap-2 sm:mb-3">
                                    <Badge
                                      className={cn(
                                        "w-fit text-xs font-semibold",
                                        isKeyMilestone
                                          ? "border-0 bg-black text-white hover:bg-gray-900"
                                          : "border-0 bg-gray-100 text-gray-700 hover:bg-gray-200",
                                      )}
                                    >
                                      <Clock className="mr-1 h-3 w-3" />
                                      {item.time}
                                    </Badge>
                                    {item.location && (
                                      <span className="flex items-center gap-1 text-xs font-medium text-gray-600 sm:text-sm">
                                        <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        {item.location}
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="mb-1 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg">
                                    {item.activity}
                                  </h3>
                                  {item.description && (
                                    <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FAQ Tab */}
                  {activeTab === "faq" && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-black sm:h-10 sm:w-10">
                          <Zap className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          Frequently Asked Questions
                        </h2>
                      </div>

                      {/* FAQ Accordion - Mobile Optimized */}
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-3 sm:space-y-4"
                      >
                        {faqs.map((faq, index) => {
                          // Highlight important FAQs (first 3) with black
                          const isImportant = index < 3;

                          return (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                              className={cn(
                                "overflow-hidden rounded-lg border px-3 shadow-sm transition-all hover:shadow-md sm:rounded-xl sm:px-6",
                                isImportant
                                  ? "border-gray-300 bg-gray-50 hover:border-black"
                                  : "border-gray-200 bg-white hover:border-gray-300",
                              )}
                            >
                              <AccordionTrigger className="py-3 text-left text-sm font-bold text-gray-900 hover:no-underline sm:py-5 sm:text-base">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <span
                                    className={cn(
                                      "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-7 sm:w-7 sm:text-sm",
                                      isImportant
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-700",
                                    )}
                                  >
                                    Q{index + 1}
                                  </span>
                                  <span className="flex-1 pr-2">
                                    {faq.question}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pb-3 pl-8 pr-2 pt-1 text-xs leading-relaxed text-gray-700 sm:pb-5 sm:pl-10 sm:pr-4 sm:pt-2 sm:text-sm">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>

                      {/* Help Section */}
                      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:mt-8 sm:rounded-xl sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black shadow-md sm:h-12 sm:w-12">
                            <Award className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                          </div> */}
                          <div className="min-w-0 flex-1">
                            <h3 className="mb-1 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg">
                              Still have questions?
                            </h3>
                            <p className="mb-3 text-xs text-gray-700 sm:mb-4 sm:text-sm">
                              Feel free to reach out to our organizers. We're
                              here to help!
                            </p>
                            <div className="space-y-2 sm:space-y-3">
                              {/* Priyanshu Kayarkar */}
                              <div className="rounded-lg border border-gray-300 bg-white p-3 sm:p-4">
                                <p className="mb-2 text-sm font-semibold text-gray-900 sm:text-base">
                                  Priyanshu Kayarkar
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <a
                                    href="https://wa.me/919373690752"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      className="border-0 bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-green-700 sm:text-sm"
                                    >
                                      <svg
                                        className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                      </svg>
                                      WhatsApp
                                    </Button>
                                  </a>
                                  <a
                                    href="tel:+917559425066"
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-gray-300 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:text-sm"
                                    >
                                      <svg
                                        className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                      </svg>
                                      Call
                                    </Button>
                                  </a>
                                </div>
                              </div>

                              {/* Muchkundraje Thote */}
                              <div className="rounded-lg border border-gray-300 bg-white p-3 sm:p-4">
                                <p className="mb-2 text-sm font-semibold text-gray-900 sm:text-base">
                                  Muchkundraje Thote
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <a
                                    href="https://wa.me/919096830986"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      className="border-0 bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-green-700 sm:text-sm"
                                    >
                                      <svg
                                        className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                      </svg>
                                      WhatsApp
                                    </Button>
                                  </a>
                                  <a
                                    href="tel:+919096830986"
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-gray-300 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:text-sm"
                                    >
                                      <svg
                                        className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                      </svg>
                                      Call
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Registration Card (1/3 width) - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:col-span-1 lg:block">
              <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  {isRegistered ? "Registration Status" : "Register for Event"}
                </h2>

                {/* Registration Status or Deadline */}
                {isRegistered ? (
                  <div
                    className={`mb-5 rounded-lg border-2 p-4 ${
                      registration?.status === "verified"
                        ? "border-green-500 bg-green-50"
                        : registration?.status === "rejected"
                          ? "border-red-500 bg-red-50"
                          : "border-yellow-500 bg-yellow-50"
                    }`}
                  >
                    <div
                      className={`mb-1 flex items-center gap-2 ${
                        registration?.status === "verified"
                          ? "text-green-700"
                          : registration?.status === "rejected"
                            ? "text-red-700"
                            : "text-yellow-700"
                      }`}
                    >
                      <CheckCircle2
                        className={`h-5 w-5 ${
                          registration?.status === "verified"
                            ? "text-green-600"
                            : registration?.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold uppercase ${
                          registration?.status === "verified"
                            ? "text-green-800"
                            : registration?.status === "rejected"
                              ? "text-red-800"
                              : "text-yellow-800"
                        }`}
                      >
                        You're Registered!
                      </span>
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        registration?.status === "verified"
                          ? "text-green-700"
                          : registration?.status === "rejected"
                            ? "text-red-700"
                            : "text-yellow-700"
                      }`}
                    >
                      Team:{" "}
                      <span className="font-bold">
                        {registration?.teamName}
                      </span>
                    </p>

                    {/* Status Badge */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-600">
                        Status:
                      </span>
                      <Badge
                        className={`border-0 text-white ${
                          registration?.status === "verified"
                            ? "bg-green-600 hover:bg-green-700"
                            : registration?.status === "rejected"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-yellow-600 hover:bg-yellow-700"
                        }`}
                      >
                        {registration?.status === "verified"
                          ? "✓ Verified"
                          : registration?.status === "rejected"
                            ? "✗ Rejected"
                            : "⏳ Pending Verification"}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5 rounded-lg border-2 border-black bg-black p-4">
                    <div className="mb-1 flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4 text-white" />
                      <span className="text-xs font-semibold uppercase text-white">
                        Registration Deadline
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">Oct 29, 2025</p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="mb-6 space-y-3 border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Entry Fee</span>
                    <span className="text-lg font-bold text-black">₹300</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Prize Pool Worth
                    </span>
                    <span className="text-lg font-bold text-black">
                      ₹13,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Registration Ends
                    </span>
                    <span className="text-lg font-bold text-black">Oct 29</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Event Date</span>
                    <span className="text-lg font-bold text-gray-900">
                      Nov 1
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {isLoadingRegistration ? (
                    <Button
                      size="lg"
                      className="h-12 w-full cursor-not-allowed bg-gray-300 font-semibold text-gray-600 shadow-md"
                      disabled
                    >
                      Loading...
                    </Button>
                  ) : isRegistered ? (
                    <Button
                      size="lg"
                      className="h-12 w-full bg-green-600 font-semibold text-white shadow-md hover:bg-green-700"
                      onClick={handleRegister}
                    >
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      View Registration
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="h-12 w-full bg-black font-semibold text-white shadow-md hover:bg-gray-900"
                      onClick={handleRegister}
                    >
                      Register Now
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-900 hover:bg-gray-50"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </div>

                {/* Rulebook Section - Prominent */}
                <div className="mt-6 rounded-lg border-2 border-purple-600 bg-gradient-to-br from-purple-50 to-blue-50 p-4 shadow-md">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-gray-900">
                        📖 Official Rulebook
                      </h3>
                      <p className="text-xs text-gray-600">
                        Must read before registration
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="h-10 w-full bg-purple-600 font-semibold text-white shadow-sm hover:bg-purple-700"
                  >
                    <a
                      href="https://ebqqc80v6n.ufs.sh/f/JM14HErelurpDuf8FEqCMnKOdXvABaVlJfIyukFmYtgz1wpZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>

                {/* Organizer Info */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <p className="mb-3 text-sm text-gray-600">Organized by</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black shadow-sm">
                      <span className="text-sm font-bold text-white">EI</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Engineering India Club
                      </p>
                      <p className="text-xs text-gray-500">
                        YCCE - Technical Team
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
