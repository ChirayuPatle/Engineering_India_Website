"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  Code, 
  Zap, 
  Award,
  ChevronRight,
  Menu,
  X,
  Star,
  Target,
  Lightbulb,
  Rocket,
  Timer,
  Gift,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

export default function VibeathonPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Prizes", href: "#prizes" },
    { name: "Rules", href: "#rules" },
    { name: "Judging", href: "#judging" },
    { name: "Timeline", href: "#timeline" },
    { name: "FAQ", href: "#faq" },
    { name: "Register", href: "#register" },
  ];

  const stats = [
    { number: "3", label: "Hours to Build", icon: Timer },
    { number: "2", label: "Team Members", icon: Users },
    { number: "AI", label: "Tools Allowed", icon: Zap },
    { number: "₹2000", label: "Total Prize Pool", icon: Trophy },
  ];

  const steps = [
    {
      number: "1",
      title: "Form Your Team",
      description: "Gather 2 innovative minds. Register and prepare to compete.",
      icon: Users,
    },
    {
      number: "2",
      title: "Build Your Prototype",
      description: "Use any AI/vibe coding tool to build a complete working solution in just 3 hours.",
      icon: Code,
    },
    {
      number: "3",
      title: "Present & Win",
      description: "Showcase your solution via PPT. Impress the judges and claim your prize!",
      icon: Award,
    },
  ];

  const rules = [
    { icon: "👥", title: "Teams of 2 members", description: "No solo or larger teams allowed" },
    { icon: "🤖", title: "Any AI tool allowed", description: "Cursor, Bolt, v0, Claude, ChatGPT, and more" },
    { icon: "💻", title: "Must build working prototype", description: "Functional demo required" },
    { icon: "📊", title: "PPT presentation mandatory", description: "Present your solution to judges" },
    { icon: "🚫", title: "No pre-built projects", description: "Start from scratch during the event" },
    { icon: "⏱️", title: "3 hour time limit", description: "Build fast, build smart" },
  ];

  const criteria = [
    { points: "30", label: "Functionality", percentage: 30 },
    { points: "25", label: "Innovation & Creativity", percentage: 25 },
    { points: "20", label: "UI/UX Design", percentage: 20 },
    { points: "15", label: "PPT & Pitch Quality", percentage: 15 },
    { points: "10", label: "Use of AI Tools", percentage: 10 },
  ];

  const timeline = [
    {
      time: "🎯",
      title: "Registration & Check-in",
      description: "Teams arrive, laptops set up, last-minute questions answered.",
    },
    {
      time: "🚀",
      title: "Problem Statement Release",
      description: "Welcome address, problem revealed. Clock starts now.",
    },
    {
      time: "⚡",
      title: "3-Hour Build Phase",
      description: "Code, create, and build your working prototype. AI tools go brr.",
    },
    {
      time: "📤",
      title: "Submission Deadline",
      description: "All builds submitted. PPT ready. No changes after this point.",
    },
    {
      time: "🎤",
      title: "PPT Presentations",
      description: "Each team gets 2 minutes to pitch and demo their prototype.",
    },
    {
      time: "🏆",
      title: "Results & Prize Distribution",
      description: "Winners announced, prizes awarded, certificates distributed.",
    },
  ];

  const faqs = [
    {
      question: "Who can participate?",
      answer: "Students from all colleges and all branches are welcome! Whether you're from CSE, ECE, Mechanical, or any other department — if you love building things, this is for you.",
    },
    {
      question: "What is the team size?",
      answer: "Each team must have exactly 2 members. Solo participation and teams larger than 2 are not allowed.",
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop with charger, your college ID, and your creative mindset. Make sure your AI tools are logged in before the event starts!",
    },
    {
      question: "Which AI tools are allowed?",
      answer: "Any and all AI tools are allowed — Cursor, Bolt.new, v0 by Vercel, Lovable, Claude, ChatGPT, GitHub Copilot, Gemini, and more. The more creative your usage, the better!",
    },
    {
      question: "Will internet be provided?",
      answer: "Yes! High-speed internet will be provided at the venue. Having a backup mobile hotspot is always a good idea too.",
    },
    {
      question: "What is the registration fee?",
      answer: "₹100 per team (₹50 per person). Payment via GPay. Upload your payment screenshot in the registration form to confirm your spot.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Tricolor Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 flex">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-green-600"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
        scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/90"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-500">VIBE</span>
              <span className="text-2xl font-bold text-blue-900">-A-</span>
              <span className="text-2xl font-bold text-green-600">THON</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-orange-500 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        {/* Pixel Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #ddd 1px, transparent 1px),
              linear-gradient(to bottom, #ddd 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge className="bg-orange-100 text-orange-700 border-orange-300 px-4 py-2 text-sm font-semibold">
              🚀 Engineering India YCCE × ACM YCCE presents
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
          >
            <span className="text-orange-500">VIBE</span>
            <span className="text-blue-900">-A-</span>
            <span className="text-green-600">THON</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-blue-900 mb-12"
          >
            Code the Vibe. Own the Era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12 text-gray-700"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>9th April 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span>Lab 1 & 2, CSE Ground Floor, YCCE</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span>3 Hours</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg transform hover:scale-105 transition-transform"
              asChild
            >
              <a href="#register">Register Your Team →</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold px-8 py-4 text-lg transform hover:scale-105 transition-transform"
              asChild
            >
              <a href="#about">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-green-100 text-green-700 mb-4">what is this</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              What is VIBE-A-THON?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                VIBE-A-THON is a <span className="font-bold text-orange-500">3-hour vibe coding contest</span> where teams of 2 build a complete working prototype end-to-end using cutting-edge AI tools.
              </p>
              <p className="text-lg leading-relaxed">
                Harness the power of <span className="font-bold text-orange-500">AI-assisted development</span> — from Cursor and Bolt to Claude and ChatGPT. Bring your ideas to life faster than ever, then present your creation via a compelling PPT presentation.
              </p>
              <p className="text-lg leading-relaxed">
                Organized by <span className="font-bold text-orange-500">Engineering India YCCE in association with ACM YCCE</span> — open to all students.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 border-l-4 border-l-orange-500 transform hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-6 h-6 text-orange-500" />
                    <span className="text-3xl font-black text-orange-500">{stat.number}</span>
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-green-100 text-green-700 mb-4">the process</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-8 text-center border-t-4 border-t-orange-500 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-orange-500 opacity-5 text-9xl font-black flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-6">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-green-100 text-green-700 mb-4">the goodies</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Prize Pool
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-block border-4 border-orange-500 rounded-full px-12 py-6">
              <p className="text-3xl md:text-4xl font-black text-orange-500">
                Total Prize Pool — ₹2000 + Goodies
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 font-medium"
          >
            All participants receive a participation certificate ✨
          </motion.p>
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-green-100 text-green-700 mb-4">the law</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Rules & Regulations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <Card className="p-6 border-l-4 border-l-green-600 flex items-start gap-4">
                  <div className="text-3xl">{rule.icon}</div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">{rule.title}</h4>
                    <p className="text-gray-600 text-sm">{rule.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section id="judging" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-green-100 text-green-700 mb-4">how we score</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Judging Criteria
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {criteria.map((criterion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 0.95 }}
              >
                <Card className="p-6 text-center min-w-[160px] max-w-[200px]">
                  <div className="text-3xl font-black text-orange-500 mb-2">{criterion.points}</div>
                  <p className="font-medium text-blue-900 mb-4">{criterion.label}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${criterion.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-green-600"
                    ></motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-green-100 text-green-700 mb-4">the schedule</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Event Timeline
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-green-600"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-5/12">
                  <Card className="p-6 transform hover:scale-105 transition-transform">
                    <div className="text-2xl mb-2">{item.time}</div>
                    <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </Card>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-6 h-6 bg-white border-4 border-orange-500 rounded-full"></div>
                </div>
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Badge className="bg-green-100 text-green-700 mb-4">got questions?</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-blue-900">{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-orange-500 transform transition-transform ${
                        activeFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 bg-orange-50 border-l-4 border-l-orange-500">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="py-20 px-4 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #f97316 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, #16a34a 0%, transparent 50%)
            `
          }}></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 text-center border-t-4 border-t-orange-500">
              <h2 className="text-4xl font-black text-blue-900 mb-4">Ready to Vibe?</h2>
              <p className="text-xl text-green-600 font-medium mb-8">
                Register your team and get ready to code the future!
              </p>

              <div className="mb-8">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-6 text-xl transform hover:scale-105 transition-transform"
                  asChild
                >
                  <a
                    href="https://forms.gle/QRo9oGebussrUfa86"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now →
                  </a>
                </Button>
                <p className="text-green-600 font-semibold mt-4 text-lg">
                  Entry Fee: ₹100 per team
                </p>
                <p className="text-gray-600 mt-2">
                  📅 09 April 2026 · 📍 Ground Floor Lab 1 & 2, CSE Dept, YCCE
                </p>
              </div>

              <div className="text-gray-600 text-sm">
                <p className="mb-2">
                  Questions? Contact us at{" "}
                  <a
                    href="mailto:dehareparth@gmail.com"
                    className="text-green-600 hover:underline"
                  >
                    dehareparth@gmail.com
                  </a>
                </p>
                <p>
                  Or call:{" "}
                  <a href="tel:+918263843834" className="text-green-600 hover:underline">
                    +91 8263843834
                  </a>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4 border-t-4 border-t-orange-500">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl font-black mb-2">VIBE-A-THON</div>
          <p className="text-blue-200 mb-2">
            Engineering India YCCE in association with ACM Student Chapter, YCCE
          </p>
          <p className="text-blue-300 italic mb-4">"Code the Vibe. Own the Era."</p>
          <p className="text-blue-400 text-sm mb-4">© 2026 VIBE-A-THON. All rights reserved.</p>
          <p className="text-blue-400">
            Made with ☕ by Engineering India × ACM YCCE
          </p>
        </div>
      </footer>
    </div>
  );
}
