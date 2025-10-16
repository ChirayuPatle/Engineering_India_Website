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
  const data = await res.json() as { registration: any };
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
      description: "Registration portal goes live. All tracks and problem statements are shared with participants. Teams can start brainstorming ideas." 
    },
    { 
      time: "25th Oct", 
      activity: "Round 1 - PPT Submission Window Opens", 
      description: "Teams can start submitting their PowerPoint presentations online through the official website. Use the provided template to present your innovative solution." 
    },
    { 
      time: "28th Oct, 12:00 PM", 
      activity: "Round 1 Submission Deadline", 
      description: "Final deadline for PPT submissions. Late submissions will not be accepted. Ensure your presentation is uploaded before noon." 
    },
    { 
      time: "29th Oct", 
      activity: "Round 1 Results Announced", 
      description: "Top 20 teams will be shortlisted based on innovation, creativity, feasibility, and presentation quality. Selected teams will receive confirmation emails." 
    },
    { 
      time: "1st Nov, 9:00 AM", 
      activity: "Round 2 - Final Hackathon Begins", 
      description: "Shortlisted teams report to YCCE for the onsite hackathon. Develop your prototype and prepare for final presentations.", 
      location: "AIML Lab, YCCE" 
    },
    { 
      time: "1st Nov, 3:00 PM", 
      activity: "Final Presentations & Results", 
      description: "Teams will build and present their working prototypes to the judging panel. Winners will be announced and prizes will be distributed.", 
      location: "YCCE, Nagpur" 
    },
  ];

const faqs = [
    {
        question: "Who can participate in the hackathon?",
        answer: "The hackathon is open to all undergraduate engineering students. Teams can have 2-4 members.",
    },
    {
        question: "What is the registration fee?",
        answer: "The registration fee is ₹300 per team (not per person). This covers both rounds of the competition.",
    },
    {
        question: "How many rounds are there?",
        answer: "There are 2 rounds: Round 1 is an online PPT submission where you present your idea. Top 20 teams advance to Round 2, which is an onsite hackathon at YCCE where you'll build your prototype.",
    },
    {
        question: "Can we use AI tools like ChatGPT or GitHub Copilot?",
        answer: "Yes! Participants are allowed to use AI tools for idea development, coding assistance, or design. We encourage using modern tools to enhance productivity.",
    },
    {
        question: "What should we bring for Round 2?",
        answer: "Participants should bring their own laptops with necessary software pre-installed. Internet access will be provided at the venue.",
    },
    {
        question: "How will teams be judged?",
        answer: "In Round 1, teams will be judged on innovation, creativity, practical feasibility, and presentation quality. In Round 2, judges will evaluate functionality, technical depth, presentation skills, and problem-solving approach.",
    },
    {
        question: "What is the prize distribution?",
        answer: "The total prize pool is worth ₹13,000, with internship opportunities for top performers.",
    },
    {
        question: "When will problem statements be shared?",
        answer: "Problem statements and tracks will be shared on 17th October when registration opens.",
    },
    {
        question: "Is the event online or offline?",
        answer: "It's a hybrid event. Round 1 (PPT submission) is completely online. Round 2 (final hackathon) is onsite at YCCE, Nagpur.",
    },
    {
        question: "What if we miss the submission deadline?",
        answer: "Late submissions will not be accepted. Please ensure your PPT is submitted before 28th October, 12:00 PM.",
    },
];

const aboutContent = `## About the Hackathon

The **Engineering India Hackathon 2025** is a two-round competition designed to inspire innovation, creativity, and real-world problem-solving among budding engineers. Participants will tackle carefully curated problem statements across multiple tracks such as **FinTech, EdTech, AI & Blockchain, Sustainable Development, and Open Innovation**, building impactful and feasible solutions.

This hackathon is not just about coding — it’s about transforming ideas into tangible projects that can create meaningful change. Along with exciting rewards, the top-performing teams will also get a **chance to earn exclusive Internship and PPO opportunities** through our partner organizations and industry collaborators.

---

## Event Structure

### **Round 1 – Online PPT Submission**
Participants will receive a set of **tracks and problem statements on 15th October**. Each team must choose one problem statement and submit a **PowerPoint Presentation (PPT)** using the official template provided.

**Submission Mode:** Online (via Engineering India Official Website)

**Judging Criteria:**
- Innovation and originality of the idea  
- Creativity in problem-solving  
- Practical feasibility  
- Presentation quality and clarity  

---

### **Round 2 – Onsite Hackathon (Final Round)**

**Venue:** AIML Lab, YCCE  
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
    { id: "prizes", label: "Prizes", icon: Trophy },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "faq", label: "FAQs", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/events")}
            className="hover:bg-gray-100 text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Event Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Event Header Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Event Info */}
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Category Badge */}
                  <Badge className="mb-2 sm:mb-3 bg-black hover:bg-gray-900 text-white border-0 text-xs sm:text-sm">
                    Hackathon
                  </Badge>

                  {/* Event Title */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    HACKATHON 2025
                  </h1>

                  {/* Event Metadata */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-black flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">Nov 01, 2025</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-black flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">YCCE, Nagpur</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-black flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">₹300 per team</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Registration Status Card - Only visible on small screens */}
              <div className="lg:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  {isRegistered ? "Registration Status" : "Register for Event"}
                </h2>
                
                {/* Registration Status or Deadline */}
                {isRegistered ? (
                  <div className="mb-4 p-4 bg-green-50 rounded-lg border-2 border-green-500">
                    <div className="flex items-center gap-2 text-green-700 mb-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-semibold uppercase text-green-800">You're Registered!</span>
                    </div>
                    <p className="text-green-700 font-medium text-sm mt-2">
                      Team: <span className="font-bold">{registration?.teamName}</span>
                    </p>
                    <Badge className="mt-2 bg-green-600 hover:bg-green-700 text-white border-0">
                      {registration?.status === "verified" ? "Payment Verified" : 
                       registration?.status === "rejected" ? "Payment Rejected" : 
                       "Payment Pending"}
                    </Badge>
                  </div>
                ) : (
                  <div className="mb-4 p-4 bg-black rounded-lg border-2 border-black">
                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                      <Clock className="h-4 w-4 text-white" />
                      <span className="text-xs font-semibold uppercase text-white">Registration Deadline</span>
                    </div>
                    <p className="text-white font-bold text-lg">Oct 28, 2025</p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Entry Fee</p>
                    <p className="text-lg font-bold text-black">₹300</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Prize Pool</p>
                    <p className="text-lg font-bold text-black">₹13,000</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Reg. Ends</p>
                    <p className="text-lg font-bold text-black">Oct 28</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Event Date</p>
                    <p className="text-lg font-bold text-gray-900">Nov 1</p>
                  </div>
                </div>

                {/* Action Button */}
                {isLoadingRegistration ? (
                  <Button 
                    size="lg" 
                    className="w-full bg-gray-300 text-gray-600 font-semibold h-11 shadow-md cursor-not-allowed"
                    disabled
                  >
                    Loading...
                  </Button>
                ) : isRegistered ? (
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11 shadow-md"
                    onClick={handleRegister}
                  >
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    View Registration
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-full bg-black hover:bg-gray-900 text-white font-semibold h-11 shadow-md"
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                )}
              </div>

              {/* Tabs Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <div className="flex gap-0 overflow-x-auto scrollbar-hide">
                    {tabItems.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 sm:px-6 py-2.5 sm:py-4 font-medium text-xs sm:text-sm whitespace-nowrap transition-all border-b-2 flex-shrink-0",
                            activeTab === tab.id
                              ? "text-black border-black bg-gray-50"
                              : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50"
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
                        <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({node: _node, ...props}) => <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-4 sm:mt-6 mb-3 sm:mb-4" {...props} />,
                              h2: ({node: _node, ...props}) => <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-4 sm:mt-5 mb-2 sm:mb-3" {...props} />,
                              h3: ({node: _node, ...props}) => <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-3 sm:mt-4 mb-2" {...props} />,
                              p: ({node: _node, ...props}) => <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4" {...props} />,
                              a: ({node: _node, ...props}) => <a className="text-black hover:underline font-medium break-words" target="_blank" rel="noopener noreferrer" {...props} />,
                              ul: ({node: _node, ...props}) => <ul className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base" {...props} />,
                              ol: ({node: _node, ...props}) => <ol className="list-decimal ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base" {...props} />,
                              li: ({node: _node, ...props}) => <li className="text-gray-700 leading-relaxed" {...props} />,
                              blockquote: ({node: _node, ...props}) => <blockquote className="border-l-2 sm:border-l-4 border-black pl-3 sm:pl-4 italic text-gray-600 my-3 sm:my-4 text-sm sm:text-base" {...props} />,
                              code: ({node: _node, inline, ...props}: any) => 
                                inline ? (
                                  <code className="bg-gray-100 text-black px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono" {...props} />
                                ) : (
                                  <code className="block bg-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm font-mono overflow-x-auto text-gray-900" {...props} />
                                ),
                              strong: ({node: _node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                              em: ({node: _node, ...props}) => <em className="italic text-gray-700" {...props} />,
                              hr: ({node: _node, ...props}) => <hr className="my-4 sm:my-6 border-gray-300" {...props} />,
                            }}
                          >
                            {aboutContent}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-black transition-colors">
                          <Award className="h-6 w-6 sm:h-8 sm:w-8 text-black mb-2 sm:mb-3" />
                          <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">Open to All</h3>
                          <p className="text-xs sm:text-sm text-gray-700">All undergraduate engineering students are welcome to participate.</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-black transition-colors">
                          <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-black mb-2 sm:mb-3" />
                          <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">Exciting Rewards</h3>
                          <p className="text-xs sm:text-sm text-gray-700">Winners receive cash prizes and certificates of participation.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prizes Tab */}
                  {activeTab === "prizes" && (
                    <div className="space-y-4 sm:space-y-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Prizes & Rewards</h2>
                      
                      {/* Additional Info */}
                      <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">Total Prize Pool: <span className="text-black">₹13,000</span></h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                                Every participant will receive a <strong className="text-gray-900">Certificate of Participation</strong>. 
                            </p>
                            
                            {/* VectorTek Labs Opportunity Card */}
                            <div className="mt-3 sm:mt-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-purple-300">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1 flex flex-wrap items-center gap-2">
                                            Internship Opportunity
                                            <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-0 text-xs">Exclusive</Badge>
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                            Top performers will get the opportunity to intern with <strong className="text-purple-700">VectorTek Labs</strong>, a startup. 
                                            Outstanding interns may receive a <strong className="text-purple-700">Pre-Placement Offer (PPO)</strong>!
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
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Event Timeline</h2>
                      
                      {/* Timeline Cards - Mobile Optimized */}
                      <div className="relative">
                        {/* Vertical Line - Hidden on mobile, visible on larger screens */}
                        <div className="hidden sm:block absolute left-6 top-8 bottom-8 w-0.5 bg-gray-300"></div>
                        
                        <div className="space-y-4 sm:space-y-6">
                          {timeline.map((item, index) => {
                            // Highlight key milestones with black color
                            const isKeyMilestone = index === 0 || index === 3 || index === 5 || index === 7;
                            
                            return (
                              <div key={index} className="relative sm:pl-16">
                                {/* Timeline Dot - Smaller on mobile */}
                                <div className={cn(
                                  "absolute left-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold shadow-lg z-10 border-2 text-sm sm:text-base",
                                  isKeyMilestone 
                                    ? "bg-black border-black text-white" 
                                    : "bg-white border-gray-300 text-gray-600"
                                )}>
                                  {index + 1}
                                </div>
                                
                                {/* Timeline Card */}
                                <div className={cn(
                                  "ml-10 sm:ml-0 rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm sm:shadow-md hover:shadow-lg transition-all",
                                  isKeyMilestone
                                    ? "bg-gray-50 border-l-2 sm:border-l-4 border-black"
                                    : "bg-white border-l-2 sm:border-l-4 border-gray-200"
                                )}>
                                  <div className="flex flex-col gap-2 mb-2 sm:mb-3">
                                    <Badge className={cn(
                                      "w-fit font-semibold text-xs",
                                      isKeyMilestone
                                        ? "bg-black hover:bg-gray-900 text-white border-0"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                                    )}>
                                      <Clock className="h-3 w-3 mr-1" />
                                      {item.time}
                                    </Badge>
                                    {item.location && (
                                      <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 font-medium">
                                        <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        {item.location}
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">{item.activity}</h3>
                                  {item.description && (
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{item.description}</p>
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
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                      </div>
                      
                      {/* FAQ Accordion - Mobile Optimized */}
                      <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
                        {faqs.map((faq, index) => {
                          // Highlight important FAQs (first 3) with black
                          const isImportant = index < 3;
                          
                          return (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                              className={cn(
                                "rounded-lg sm:rounded-xl border px-3 sm:px-6 shadow-sm hover:shadow-md transition-all overflow-hidden",
                                isImportant
                                  ? "bg-gray-50 border-gray-300 hover:border-black"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                              )}
                            >
                              <AccordionTrigger className="text-left font-bold text-gray-900 hover:no-underline py-3 sm:py-5 text-sm sm:text-base">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <span className={cn(
                                    "flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold",
                                    isImportant
                                      ? "bg-black text-white"
                                      : "bg-gray-100 text-gray-700"
                                  )}>
                                    Q{index + 1}
                                  </span>
                                  <span className="flex-1 pr-2">{faq.question}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-700 pt-1 sm:pt-2 pb-3 sm:pb-5 pl-8 sm:pl-10 pr-2 sm:pr-4 leading-relaxed text-xs sm:text-sm">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>

                      {/* Help Section */}
                      <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 mt-6 sm:mt-8">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-900">Still have questions?</h3>
                            <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                              Feel free to reach out to our organizers. We're here to help!
                            </p>
                            <div className="space-y-2 sm:space-y-3">
                              {/* Priyanshu Kayarkar */}
                              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-300">
                                <p className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Priyanshu Kayarkar</p>
                                <div className="flex flex-wrap gap-2">
                                  <a 
                                    href="https://wa.me/919373690752" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex"
                                  >
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0 font-semibold shadow-sm text-xs sm:text-sm">
                                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                      </svg>
                                      WhatsApp
                                    </Button>
                                  </a>
                                  <a 
                                    href="tel:+917559425066"
                                    className="inline-flex"
                                  >
                                    <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold shadow-sm text-xs sm:text-sm">
                                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                      </svg>
                                      Call
                                    </Button>
                                  </a>
                                </div>
                              </div>

                              {/* Muchkundraje Thote */}
                              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-300">
                                <p className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Muchkundraje Thote</p>
                                <div className="flex flex-wrap gap-2">
                                  <a 
                                    href="https://wa.me/919096830986" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex"
                                  >
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0 font-semibold shadow-sm text-xs sm:text-sm">
                                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                      </svg>
                                      WhatsApp
                                    </Button>
                                  </a>
                                  <a 
                                    href="tel:+919096830986"
                                    className="inline-flex"
                                  >
                                    <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold shadow-sm text-xs sm:text-sm">
                                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {isRegistered ? "Registration Status" : "Register for Event"}
                </h2>
                
                {/* Registration Status or Deadline */}
                {isRegistered ? (
                  <div className="mb-5 p-4 bg-green-50 rounded-lg border-2 border-green-500">
                    <div className="flex items-center gap-2 text-green-700 mb-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-semibold uppercase text-green-800">You're Registered!</span>
                    </div>
                    <p className="text-green-700 font-medium text-sm mt-2">
                      Team: <span className="font-bold">{registration?.teamName}</span>
                    </p>
                    <Badge className="mt-2 bg-green-600 hover:bg-green-700 text-white border-0">
                      {registration?.status === "verified" ? "Payment Verified" : 
                       registration?.status === "rejected" ? "Payment Rejected" : 
                       "Payment Pending"}
                    </Badge>
                  </div>
                ) : (
                  <div className="mb-5 p-4 bg-black rounded-lg border-2 border-black">
                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                      <Clock className="h-4 w-4 text-white" />
                      <span className="text-xs font-semibold uppercase text-white">Registration Deadline</span>
                    </div>
                    <p className="text-white font-bold text-lg">Oct 28, 2025</p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Entry Fee</span>
                    <span className="text-lg font-bold text-black">₹300</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Prize Pool Worth</span>
                    <span className="text-lg font-bold text-black">₹13,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Registration Ends</span>
                    <span className="text-lg font-bold text-black">Oct 28</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Event Date</span>
                    <span className="text-lg font-bold text-gray-900">Nov 1</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {isLoadingRegistration ? (
                    <Button 
                      size="lg" 
                      className="w-full bg-gray-300 text-gray-600 font-semibold h-12 shadow-md cursor-not-allowed"
                      disabled
                    >
                      Loading...
                    </Button>
                  ) : isRegistered ? (
                    <Button 
                      size="lg" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12 shadow-md"
                      onClick={handleRegister}
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      View Registration
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      className="w-full bg-black hover:bg-gray-900 text-white font-semibold h-12 shadow-md"
                      onClick={handleRegister}
                    >
                      Register Now
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 hover:bg-gray-50 text-gray-900"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>

                {/* Organizer Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Organized by</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">EI</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Engineering India Club</p>
                      <p className="text-xs text-gray-500">YCCE - Technical Team</p>
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
