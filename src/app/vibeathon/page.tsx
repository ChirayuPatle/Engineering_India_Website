"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Clock,
  Award,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function VibeathonPage() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const target = new Date("2026-04-09T12:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, mins, secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAccordion = (index: number) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  const copyCommand = () => {
    navigator.clipboard?.writeText(
      "9 April 2026, 12:00 PM — CSE Lab 1 & 2, YCCE",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f5f5f0",
        color: "#0a0a0a",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* HERO SECTION */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#f5f5f0",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "center center",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 120% 60% at 50% 100%, #f5f5f0 30%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245,200,0,0.08) 0%, transparent 60%)",
          }}
        />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:flex-row lg:gap-20"
        >
          <div className="min-w-0 flex-1 text-center lg:text-left">
            <a
              href="#about"
              className="mb-6 inline-flex items-center gap-2 rounded border-[1.5px] border-[#b0b0aa] bg-[#e2e2dc] px-3 py-1.5 text-xs font-semibold text-[#1f2937] no-underline sm:mb-7 sm:text-sm"
            >
              🏫 Engineering India YCCE × YCCE ACM Chapter 🎓
            </a>
            <h1 className="mb-5 text-3xl font-black leading-tight tracking-[-2px] text-black sm:text-4xl lg:text-5xl xl:text-7xl">
              <span className="text-black">Vibe-A-Thon!</span>
            </h1>
            <p className="mb-6 max-w-full text-sm leading-relaxed text-[#374151] sm:mb-8 sm:max-w-[520px] sm:text-base">
              A Vibe Coding hackathon presented by Engineering India YCCE in
              collaboration with YCCE ACM Student Chapter. Build, compete, win.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded border-2 border-black bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black shadow-[4px_4px_0_#000] transition-all hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] sm:w-auto sm:px-6 sm:text-base"
              >
                🚀 Register Now
              </a>
              <div className="flex w-full max-w-full items-center gap-2 rounded border-2 border-black bg-black py-2.5 text-xs text-white shadow-[4px_4px_0_#000] sm:max-w-[260px] sm:px-6">
                <div className="flex-1 whitespace-nowrap">
                  <span className="text-blue-400">Date</span>
                  <span>: </span>
                  <span className="text-green-400">9 April 2026</span>
                </div>
                <span
                  className="flex-shrink-0 cursor-pointer text-gray-400 transition-colors hover:text-white"
                  onClick={copyCommand}
                >
                  {copied ? "✓" : "📋"}
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex hidden w-80 flex-shrink-0 items-center justify-center px-8 lg:flex">
            <div className="flex w-full items-center justify-center">
              <div className="relative mx-auto flex w-[280px] flex-col items-center justify-center gap-0">
                <span className="block animate-pulse text-center text-[160px] leading-none">
                  🏆
                </span>
                <span className="absolute right-2.5 top-2.5 animate-spin text-xl text-yellow-400">
                  ✦
                </span>
                <span
                  className="absolute left-1.5 top-[70px] animate-spin text-sm text-yellow-400"
                  style={{ animationDelay: "-2s" }}
                >
                  ✦
                </span>
                <span
                  className="absolute bottom-[80px] right-1.5 animate-spin text-lg text-yellow-400"
                  style={{ animationDelay: "-1s" }}
                >
                  ✦
                </span>
                {/* <div className="mt-6 bg-yellow-400 border-2 border-black rounded px-5.5 py-2.5 font-black text-base shadow-[6px_6px_0_#000] whitespace-nowrap text-black tracking-[-0.5px] animate-pulse">
                  ₹2000+ Prize Pool
                </div> */}
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* CARDS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
        id="details"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {[
            {
              icon: "🏆",
              title: "Prize Pool",
              value: "₹2000+",
              meta: "Total prizes for top teams",
              primary: true,
            },
            {
              icon: "👥",
              title: "Team Size",
              value: "2",
              meta: "Members per team",
              outlined: true,
            },
            {
              icon: "🔓",
              title: "Eligibility",
              value: "Open to All",
              meta: "Any student can participate",
              small: true,
            },
            {
              icon: "💰",
              title: "Entry Fee",
              value: "₹100",
              meta: "Per team registration",
              primary: true,
            },
            {
              icon: "📅",
              title: "Date & Time",
              value: "9th April 2026",
              meta: "12:00 PM Onwards",
              outlined: true,
              small: true,
            },
            {
              icon: "📍",
              title: "Venue",
              value: "Lab 1 & 2",
              meta: "Ground Floor, CSE Dept, YCCE",
              small: true,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded border-2 border-black bg-white shadow-[6px_6px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:transform hover:shadow-[8px_8px_0_#000]"
            >
              <div className="p-4 pb-0">
                <span className="mb-2 block text-2xl">{card.icon}</span>
                <h3 className="mb-1 text-xl font-bold">{card.title}</h3>
              </div>
              <div className="p-4">
                <div
                  className={`text-3xl font-black tracking-[-1px] ${card.primary ? "text-yellow-400" : card.outlined ? "text-black" : ""} ${card.small ? "text-[22px]" : ""}`}
                >
                  {card.value}
                </div>
                <div className="text-sm font-medium text-[#374151]">
                  {card.meta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <hr className="m-0 border-2 border-b-0 border-l-0 border-r-0 border-t-2 border-black" />

      {/* COUNTDOWN SECTION */}
      <div
        className="border-b-2 border-t-2 border-black bg-black py-8 text-white sm:py-12"
        id="schedule"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="sm:px-auto mx-auto max-w-6xl px-4 text-center"
        >
          <div className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-gray-400 sm:text-sm">
            ⏰ Time Remaining
          </div>
          <h2 className="mb-6 text-xl font-black tracking-[-1px] sm:mb-9 sm:text-2xl lg:text-4xl">
            Event starts <span className="text-yellow-400">9th April 2026</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.mins },
              { label: "Seconds", value: countdown.secs },
            ].map((unit, index) => (
              <div
                key={index}
                className="min-w-[80px] rounded border-2 border-[#333] bg-[#1a1a1a] px-4 py-4 shadow-[4px_4px_0_#f5c800] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:transform hover:shadow-[6px_6px_0_#f5c800] sm:min-w-[100px] sm:px-7 sm:py-5"
              >
                <span className="block font-mono text-3xl font-black leading-none tracking-[-2px] text-yellow-400 sm:text-5xl">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <div className="mt-1.5 text-xs font-semibold uppercase tracking-[2px] text-gray-400">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FEATURES / ABOUT SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-t-2 border-black px-6 py-16"
        id="about"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1">
            <h2 className="mb-6 text-2xl font-black leading-tight tracking-[-1.5px] sm:text-3xl lg:text-4xl">
              What is <span className="text-black">Vibe-A-Thon?</span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-[#374151]">
              Vibe-A-Thon is a 24-hour hackathon where creativity meets
              competition. Build innovative solutions, learn new skills, and
              compete for amazing prizes.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-2 text-base text-[#374151]">
                <span className="flex-shrink-0 font-bold text-black">→</span>
                24-hour coding marathon with mentorship
              </li>
              <li className="flex items-center gap-2 text-base text-[#374151]">
                <span className="flex-shrink-0 font-bold text-black">→</span>
                Team up in pairs and compete for prizes.
              </li>
              <li className="flex items-center gap-2 text-base text-[#374151]">
                <span className="flex-shrink-0 font-bold text-black">→</span>
                Organized by Engineering India YCCE & ACM.
              </li>
            </ul>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded border-2 border-black bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black shadow-[4px_4px_0_#000] transition-all hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] sm:w-auto sm:px-6 sm:text-base"
            >
              Join Vibe →
            </a>
          </div>

          <div className="flex-shrink-0">
            <div className="overflow-x-auto rounded border-2 border-black bg-black p-4 font-mono text-xs leading-[1.8] text-gray-300 shadow-[6px_6px_0_#000] sm:p-5 sm:text-sm">
              <div>
                <span className="text-gray-500">{`// Vibe-A-Thon 2026`}</span>
              </div>
              <div>
                <span className="text-pink-400">const</span> hackathon = {"{"}
              </div>
              <div>
                &nbsp;&nbsp;<span className="text-pink-400">name</span>:{" "}
                <span className="text-yellow-400">"Vibe-A-Thon"</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="text-pink-400">year</span>:{" "}
                <span className="text-blue-400">2026</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="text-pink-400">teamSize</span>:{" "}
                <span className="text-blue-400">2</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="text-pink-400">prize</span>:{" "}
                <span className="text-yellow-400">"₹2000+"</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="text-pink-400">fee</span>:{" "}
                <span className="text-yellow-400">"₹100"</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="text-pink-400">vibe</span>:{" "}
                <span className="text-green-400">true</span>
              </div>
              <div>{"};"}</div>
              <br />
              <div>
                <span className="text-pink-400">hackathon</span>.
                <span className="text-green-400">start</span>();
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <hr className="m-0 border-2 border-b-0 border-l-0 border-r-0 border-t-2 border-black" />

      {/* ACCORDION / FAQ SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
        id="faq"
      >
        <h2 className="mb-6 text-center text-2xl font-black leading-tight tracking-[-1.5px] sm:mb-8 sm:text-3xl lg:text-5xl">
          Frequently Asked <span className="text-black">Questions</span>
        </h2>
        <div className="mx-auto flex max-w-[680px] flex-col gap-3">
          {[
            {
              question: "Who can participate?",
              answer:
                "Vibe-A-Thon is open to all students! You don't need any specific background — just a laptop, a teammate, and will to build something cool.",
            },
            {
              question: "What should we build?",
              answer:
                "Anything you can vibe-code! Web apps, tools, games — theme will be revealed on day of event. Come prepared and stay creative.",
            },
            {
              question: "How is judging done?",
              answer:
                "Projects will be evaluated on creativity, execution, and presentation. A panel of judges from Engineering India YCCE and ACM will assess all submissions.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded border-2 border-black bg-white shadow-[4px_4px_0_#000] transition-all hover:shadow-[6px_6px_0_#000]"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent p-3.5 text-left text-sm font-semibold"
              >
                {item.question}
                <span
                  className="text-xs transition-transform"
                  style={{
                    transform:
                      accordionOpen === index
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                >
                  ▾
                </span>
              </button>
              <div
                className="overflow-hidden bg-[#fafaf8] px-4 text-sm text-[#374151] transition-all duration-300"
                style={{
                  maxHeight: accordionOpen === index ? "200px" : "0px",
                  paddingTop: accordionOpen === index ? "12px" : "0px",
                  paddingBottom: accordionOpen === index ? "16px" : "0px",
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <hr className="m-0 border-2 border-b-0 border-l-0 border-r-0 border-t-2 border-black" />

      {/* STATS SECTION */}
      <section className="relative overflow-hidden border-t-2 border-black px-6 py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute animate-pulse text-yellow-400"
            style={{ top: "10%", left: "8%", animationDelay: "0s" }}
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <svg
            className="absolute animate-pulse text-yellow-400"
            style={{ top: "15%", right: "12%", animationDelay: "1s" }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <svg
            className="absolute animate-pulse text-yellow-400"
            style={{ bottom: "20%", left: "15%", animationDelay: "0.5s" }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <svg
            className="absolute animate-pulse text-yellow-400"
            style={{ bottom: "15%", right: "8%", animationDelay: "1.5s" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <svg
            className="absolute animate-pulse text-yellow-400"
            style={{ top: "50%", left: "4%", animationDelay: "2s" }}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <svg
            className="absolute animate-pulse text-yellow-400"
            style={{ top: "30%", right: "4%", animationDelay: "0.8s" }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mx-auto max-w-6xl text-center"
        >
          <h2 className="text-3xl font-black leading-tight tracking-[-1.5px] lg:text-5xl">
            A <span className="text-black">Growing</span> Community of Builders.
          </h2>
          <div className="mx-auto mt-12 grid max-w-[640px] grid-cols-1 gap-12 md:grid-cols-2">
            <div className="text-left">
              <div className="mb-2 text-lg font-semibold">Prize Pool</div>
              <div className="text-6xl font-black leading-none tracking-[-4px] text-black lg:text-8xl">
                ₹2K+
              </div>
            </div>
            <div className="text-left">
              <div className="mb-2 text-lg font-semibold">Team Slots</div>
              <div className="text-6xl font-black leading-none tracking-[-4px] text-black lg:text-8xl">
                50+
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COORDINATORS SECTION */}
      <div
        className="border-t-2 border-black bg-yellow-400 px-6 py-16"
        id="contact"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl text-center"
        >
          <h2 className="text-3xl font-black leading-tight tracking-[-1px] lg:text-5xl">
            Event Coordinators
          </h2>
          <p className="mt-2 text-base">
            Reach out to us for any queries about Vibe-A-Thon 2026.
          </p>
          <div className="mx-auto mt-9 grid max-w-[700px] grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Parth Dehare", phone: "82638 43834", avatar: "👨‍💻" },
              {
                name: "Priyanshu Kayarkar",
                phone: "93736 90752",
                avatar: "👨‍💻",
              },
              { name: "Tiya Banerjee", phone: "97668 06793", avatar: "👩‍💻" },
            ].map((coord, index) => (
              <div
                key={index}
                className="rounded border-2 border-black bg-[#f5f5f0] p-5 text-center shadow-[4px_4px_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:transform hover:shadow-[6px_6px_0_#000]"
              >
                <div className="w-13 h-13 mx-auto mb-2.5 flex items-center justify-center overflow-hidden rounded-full border-2 border-black bg-black text-2xl">
                  {coord.avatar}
                </div>
                <div className="mb-1 text-sm font-bold">{coord.name}</div>
                <div className="font-mono text-sm text-[#374151]">
                  {coord.phone}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="mt-9 flex gap-3.5 justify-center flex-wrap">
            <a href="tel:8263843834" className="bg-transparent text-black border-2 border-black rounded px-4 py-2.5 font-bold text-sm flex items-center gap-2 shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all whitespace-nowrap">
              📞 Call Parth
            </a>
            <a href="tel:9373690752" className="bg-black text-white border-2 border-black rounded px-4 py-2.5 font-bold text-sm flex items-center gap-2 shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all whitespace-nowrap">
              📞 Call Priyanshu
            </a>
          </div> */}
        </motion.div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-t-2 border-black px-6 py-16"
        id="register"
      >
        <div className="lg:gap-15 mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row">
          <div className="w-full flex-1 text-center lg:text-left">
            <h1 className="mb-4 text-3xl font-black leading-tight tracking-[-2px] sm:text-4xl lg:text-6xl">
              Register for
              <br />
              <span className="text-black">Vibe-A-Thon</span>
              <br />
              2026 🚀
            </h1>
            <p className="mx-auto mb-6 max-w-[500px] text-sm text-[#374151] sm:mb-7 sm:text-base lg:mx-0">
              Pay ₹100, form a team of 2, and show up on April 9th. That's all
              it takes to compete for ₹2000+ in prizes.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded border-2 border-black bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black shadow-[4px_4px_0_#000] transition-all hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] sm:w-auto sm:px-6 sm:text-base"
              >
                🎮 Register Now!
              </a>
              <a
                href="tel:8263843834"
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded border-2 border-black bg-transparent px-4 py-2.5 text-sm font-bold text-black shadow-[4px_4px_0_#000] transition-all hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] sm:w-auto"
              >
                Contact Us
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-7 lg:justify-start">
              <span className="inline-flex items-center rounded bg-[#e2e2dc] px-2.5 py-1 text-xs font-semibold text-[#374151]">
                Open to All
              </span>
              <span className="inline-flex items-center rounded border-[1.5px] border-black bg-yellow-400 px-2.5 py-1 text-xs font-semibold text-black">
                ₹2000+ Prize
              </span>
              <span className="inline-flex items-center rounded bg-black px-2.5 py-1 text-xs font-semibold text-white">
                9 April 2026
              </span>
              <span className="inline-flex items-center rounded border-[1.5px] border-black px-2.5 py-1 text-xs font-semibold text-black">
                Team of 2
              </span>
            </div>
          </div>
          <div className="mt-0 w-full rounded border-2 border-black bg-black p-4 font-mono text-xs leading-[2] text-gray-400 shadow-[8px_8px_0_#000] sm:p-6 sm:text-sm lg:w-auto lg:flex-shrink-0">
            <div className="text-gray-500">$</div>
            <div>
              <span className="text-green-400">register</span>(
              <span className="text-yellow-400">"Vibe-A-Thon"</span>)
            </div>
            <br />
            <div>
              <span className="text-blue-400">✓</span> Team registered
            </div>
            <div>
              <span className="text-blue-400">✓</span> Fee: ₹100
            </div>
            <div>
              <span className="text-blue-400">✓</span> Date: 9 Apr 2026
            </div>
            <div>
              <span className="text-blue-400">✓</span> Venue: CSE Lab 1 & 2
            </div>
            <br />
            <div className="text-green-400">🚀 Ready to vibe!</div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
