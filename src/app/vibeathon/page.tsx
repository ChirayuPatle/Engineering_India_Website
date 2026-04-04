"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock, Users, Trophy, Code, Zap, Award, Calendar, MapPin, Phone, Mail, Shield, Palette, Lightbulb, FileText, Wand2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VibeathonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Event Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold">Engineering India YCCE × ACM YCCE presents</span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              VIBE-A-THON
            </h1>

            {/* Tagline */}
            <p className="text-2xl md:text-3xl font-bold mb-8 text-purple-200">
              Code the Vibe. Own the Era.
            </p>

            {/* Event Details */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>9th April 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>Lab 1 & 2, CSE Ground Floor, YCCE</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>3 Hours</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                Register Your Team
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/20"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"
        />
      </section>

      {/* What is VIBE-A-THON */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What is VIBE-A-THON?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <p className="text-xl md:text-2xl text-center mb-8 text-purple-100">
              VIBE-A-THON is a 3-hour vibe coding contest where teams of 2 build a complete working prototype end-to-end using cutting-edge AI tools.
            </p>
            <p className="text-lg text-center mb-8 text-purple-200">
              Harness the power of AI-assisted development — from Cursor and Bolt to Claude and ChatGPT. Bring your ideas to life faster than ever, then present your creation via a compelling PPT presentation.
            </p>
            <p className="text-lg text-center text-purple-300">
              Organized by Engineering India YCCE in association with ACM YCCE — open to all students.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-5xl font-black text-purple-400 mb-2">3</div>
                <div className="text-lg font-semibold">Hours to Build</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-pink-400 mb-2">2</div>
                <div className="text-lg font-semibold">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-400 mb-2">AI</div>
                <div className="text-lg font-semibold">Tools Allowed</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-yellow-400 mb-2">₹2000</div>
                <div className="text-lg font-semibold">Total Prize Pool</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Form Your Team</h3>
              <p className="text-purple-200">
                Gather 2 innovative minds. Register and prepare to compete.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Build Your Prototype</h3>
              <p className="text-purple-200">
                Use any AI/vibe coding tool to build a complete working solution in just 3 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Present & Win</h3>
              <p className="text-purple-200">
                Showcase your solution via PPT. Impress the judges and claim your prize!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Prize Pool
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
          >
            <div className="text-6xl font-black mb-4">₹2000 + Goodies</div>
            <p className="text-xl text-purple-200 mb-8">Total Prize Pool</p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>All participants receive a participation certificate ✨</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rules & Regulations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Teams of 2 members", desc: "No solo or larger teams allowed" },
              { icon: Wand2, title: "Any AI tool allowed", desc: "Cursor, Bolt, v0, Claude, ChatGPT, and more" },
              { icon: Code, title: "Must build working prototype", desc: "Functional demo required" },
              { icon: FileText, title: "PPT presentation mandatory", desc: "Present your solution to judges" },
              { icon: Shield, title: "No pre-built projects", desc: "Start from scratch during the event" },
              { icon: Clock, title: "3 hour time limit", desc: "Build fast, build smart" },
            ].map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <rule.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{rule.title}</h3>
                    <p className="text-purple-200 text-sm">{rule.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Judging Criteria
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { score: 30, title: "Functionality", color: "from-blue-600 to-cyan-600" },
              { score: 25, title: "Innovation & Creativity", color: "from-purple-600 to-pink-600" },
              { score: 20, title: "UI/UX Design", color: "from-green-600 to-emerald-600" },
              { score: 15, title: "PPT & Pitch Quality", color: "from-orange-600 to-red-600" },
              { score: 10, title: "Use of AI Tools", color: "from-indigo-600 to-purple-600" },
            ].map((criteria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${criteria.color} rounded-full flex items-center justify-center text-2xl font-black`}>
                      {criteria.score}
                    </div>
                    <h3 className="text-xl font-bold">{criteria.title}</h3>
                  </div>
                  <div className="w-32 bg-white/10 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${criteria.score * 3.3}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${criteria.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Event Timeline
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { time: "Registration & Check-in", desc: "Teams arrive, laptops set up, last-minute questions answered." },
              { time: "Problem Statement Release", desc: "Welcome address, problem revealed. Clock starts now." },
              { time: "3-Hour Build Phase", desc: "Code, create, and build your working prototype. AI tools go brr." },
              { time: "Submission Deadline", desc: "All builds submitted. PPT ready. No changes after this point." },
              { time: "PPT Presentations", desc: "Each team gets 2 minutes to pitch and demo their prototype." },
              { time: "Results & Prize Distribution", desc: "Winners announced, prizes awarded, certificates distributed." },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-lg font-black">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{event.time}</h3>
                  <p className="text-purple-200">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Who can participate?",
                a: "Students from all colleges and all branches are welcome! Whether you're from CSE, ECE, Mechanical, or any other department — if you love building things, this is for you."
              },
              {
                q: "What is the team size?",
                a: "Each team must have exactly 2 members. Solo participation and teams larger than 2 are not allowed."
              },
              {
                q: "What should I bring?",
                a: "Bring your laptop with charger, your college ID, and your creative mindset. Make sure your AI tools are logged in before the event starts!"
              },
              {
                q: "Which AI tools are allowed?",
                a: "Any and all AI tools are allowed — Cursor, Bolt.new, v0 by Vercel, Lovable, Claude, ChatGPT, GitHub Copilot, Gemini, and more. The more creative your usage, the better!"
              },
              {
                q: "Will internet be provided?",
                a: "Yes! High-speed internet will be provided at the venue. Having a backup mobile hotspot is always a good idea too."
              },
              {
                q: "What is the registration fee?",
                a: "₹100 per team (₹50 per person). Payment via GPay. Upload your payment screenshot in the registration form to confirm your spot."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-3 text-purple-300">{faq.q}</h3>
                <p className="text-purple-200">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Vibe?
            </h2>
            <p className="text-xl mb-8 text-purple-200">
              Register your team and get ready to code the future!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 mx-auto mb-8"
            >
              Register Now →
            </motion.button>

            <div className="text-purple-300">
              <p className="mb-2">Entry Fee: ₹100 per team</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>09 April 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ground Floor Lab 1 & 2, CSE Dept, YCCE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              VIBE-A-THON
            </h3>
            <p className="text-purple-300 mb-4">
              Engineering India YCCE in association with ACM Student Chapter, YCCE
            </p>
            <p className="text-purple-400 italic">"Code the Vibe. Own the Era."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h4 className="font-bold mb-2">Questions?</h4>
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <Mail className="w-4 h-4" />
                <span>dehareparth@gmail.com</span>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-2">Call Us</h4>
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <Phone className="w-4 h-4" />
                <span>+91 8263843834</span>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-2">Venue</h4>
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <MapPin className="w-4 h-4" />
                <span>Lab 1 & 2, CSE Ground Floor, YCCE</span>
              </div>
            </div>
          </div>

          <div className="text-center text-purple-400 text-sm">
            <p>© 2026 VIBE-A-THON. All rights reserved.</p>
            <p className="mt-2">Made with ☕ by Engineering India × ACM YCCE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
