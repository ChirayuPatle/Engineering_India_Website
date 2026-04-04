'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Clock, Award, Mail, Phone, ArrowRight } from 'lucide-react';

export default function VibeathonPage() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const target = new Date('2026-04-09T12:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
    navigator.clipboard?.writeText('9 April 2026, 12:00 PM — CSE Lab 1 & 2, YCCE');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0', color: '#0a0a0a', fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden" style={{ 
        backgroundColor: '#f5f5f0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundPosition: 'center center'
      }}>
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          background: 'radial-gradient(ellipse 120% 60% at 50% 100%, #f5f5f0 30%, transparent 70%)'
        }} />
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245,200,0,0.08) 0%, transparent 60%)'
        }} />
        
        <motion.section 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-20"
        >
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <a href="#about" className="inline-flex items-center gap-2 bg-[#e2e2dc] text-[#1f2937] rounded px-3 py-1.5 text-xs sm:text-sm font-semibold mb-6 sm:mb-7 border-[1.5px] border-[#b0b0aa] no-underline">
              🏫 Engineering India YCCE × YCCE ACM Chapter 🎓
            </a>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight tracking-[-2px] mb-5 text-black">
              <span className="text-black">Vibe-A-Thon!</span>
            </h1>
            <p className="text-sm sm:text-base text-[#374151] mb-6 sm:mb-8 max-w-full sm:max-w-[520px] leading-relaxed">
              A Vibe Coding hackathon presented by Engineering India YCCE in collaboration with YCCE ACM Student Chapter. Build, compete, win.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black border-2 border-black rounded px-4 sm:px-6 py-2.5 font-bold text-sm sm:text-base flex items-center gap-2 shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all whitespace-nowrap w-full sm:w-auto justify-center"
              >
                🚀 Register Now
              </a>
              <div className="flex items-center bg-black text-white rounded w-full sm:px-6 py-2.5 text-xs max-w-full sm:max-w-[260px] gap-2 shadow-[4px_4px_0_#000] border-2 border-black">
                <div className="flex-1 whitespace-nowrap">
                  <span className="text-blue-400">Date</span>
                  <span>: </span>
                  <span className="text-green-400">9 April 2026</span>
                </div>
                <span 
                  className="text-gray-400 cursor-pointer hover:text-white transition-colors flex-shrink-0"
                  onClick={copyCommand}
                >
                  {copied ? '✓' : '📋'}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-shrink-0 px-8 w-80 relative flex items-center justify-center">
            <div className="w-full flex items-center justify-center">
              <div className="w-[280px] relative mx-auto flex flex-col items-center justify-center gap-0">
                <span className="text-[160px] leading-none block text-center animate-pulse">🏆</span>
                <span className="absolute top-2.5 right-2.5 text-yellow-400 text-xl animate-spin">✦</span>
                <span className="absolute top-[70px] left-1.5 text-yellow-400 text-sm animate-spin" style={{ animationDelay: '-2s' }}>✦</span>
                <span className="absolute bottom-[80px] right-1.5 text-yellow-400 text-lg animate-spin" style={{ animationDelay: '-1s' }}>✦</span>
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
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12" 
        id="details"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            { icon: '🏆', title: 'Prize Pool', value: '₹2000+', meta: 'Total prizes for top teams', primary: true },
            { icon: '👥', title: 'Team Size', value: '2', meta: 'Members per team', outlined: true },
            { icon: '🔓', title: 'Eligibility', value: 'Open to All', meta: 'Any student can participate', small: true },
            { icon: '💰', title: 'Entry Fee', value: '₹100', meta: 'Per team registration', primary: true },
            { icon: '📅', title: 'Date & Time', value: '9th April 2026', meta: '12:00 PM Onwards', outlined: true, small: true },
            { icon: '📍', title: 'Venue', value: 'Lab 1 & 2', meta: 'Ground Floor, CSE Dept, YCCE', small: true },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border-2 border-black rounded transition-all hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[6px_6px_0_#000] hover:shadow-[8px_8px_0_#000] overflow-hidden"
            >
              <div className="p-4 pb-0">
                <span className="text-2xl mb-2 block">{card.icon}</span>
                <h3 className="text-xl font-bold mb-1">{card.title}</h3>
              </div>
              <div className="p-4">
                <div className={`text-3xl font-black tracking-[-1px] ${card.primary ? 'text-yellow-400' : card.outlined ? 'text-black' : ''} ${card.small ? 'text-[22px]' : ''}`}>
                  {card.value}
                </div>
                <div className="text-sm text-[#374151] font-medium">{card.meta}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <hr className="border-2 border-black border-t-2 border-l-0 border-r-0 border-b-0 m-0" />

      {/* COUNTDOWN SECTION */}
      <div className="bg-black text-white border-t-2 border-b-2 border-black py-8 sm:py-12" id="schedule">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 sm:px-auto text-center"
        >
          <div className="text-xs sm:text-sm font-semibold tracking-[2px] uppercase text-gray-400 mb-3">⏰ Time Remaining</div>
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black mb-6 sm:mb-9 tracking-[-1px]">
            Event starts <span className="text-yellow-400">9th April 2026</span>
          </h2>
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.mins },
              { label: 'Seconds', value: countdown.secs },
            ].map((unit, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] border-2 border-[#333] rounded px-4 sm:px-7 py-4 sm:py-5 min-w-[80px] sm:min-w-[100px] shadow-[4px_4px_0_#f5c800] transition-all hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f5c800]"
              >
                <span className="text-3xl sm:text-5xl font-black font-mono text-yellow-400 leading-none tracking-[-2px] block">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <div className="text-xs uppercase tracking-[2px] text-gray-400 mt-1.5 font-semibold">
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
        className="border-t-2 border-black py-16 px-6" 
        id="about"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-1.5px] leading-tight mb-6">
              What is <span className="text-black">Vibe-A-Thon?</span>
            </h2>
            <p className="text-base text-[#374151] mb-6 leading-relaxed">
              Vibe-A-Thon is a 24-hour hackathon where creativity meets competition. Build innovative solutions, learn new skills, and compete for amazing prizes.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="text-base text-[#374151] flex items-center gap-2">
                <span className="text-black font-bold flex-shrink-0">→</span>
                24-hour coding marathon with mentorship
              </li>
              <li className="text-base text-[#374151] flex items-center gap-2">
                <span className="text-black font-bold flex-shrink-0">→</span>
                Team up in pairs and compete for prizes.
              </li>
              <li className="text-base text-[#374151] flex items-center gap-2">
                <span className="text-black font-bold flex-shrink-0">→</span>
                Organized by Engineering India YCCE & ACM.
              </li>
            </ul>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black border-2 border-black rounded px-4 sm:px-6 py-2.5 font-bold text-sm sm:text-base items-center gap-2 shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all whitespace-nowrap w-full sm:w-auto justify-center inline-flex"
            >
              Join Vibe →
            </a>
          </div>

          <div className="flex-shrink-0">
            <div className="bg-black border-2 border-black rounded p-4 sm:p-5 shadow-[6px_6px_0_#000] font-mono text-xs sm:text-sm text-gray-300 leading-[1.8] overflow-x-auto">
              <div><span className="text-gray-500">{`// Vibe-A-Thon 2026`}</span></div>
              <div><span className="text-pink-400">const</span> hackathon = {'{'}</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">name</span>: <span className="text-yellow-400">"Vibe-A-Thon"</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">year</span>: <span className="text-blue-400">2026</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">teamSize</span>: <span className="text-blue-400">2</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">prize</span>: <span className="text-yellow-400">"₹2000+"</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">fee</span>: <span className="text-yellow-400">"₹100"</span>,</div>
              <div>&nbsp;&nbsp;<span className="text-pink-400">vibe</span>: <span className="text-green-400">true</span></div>
              <div>{'};'}</div>
              <br />
              <div><span className="text-pink-400">hackathon</span>.<span className="text-green-400">start</span>();</div>
            </div>
          </div>
        </div>
      </motion.section>

      <hr className="border-2 border-black border-t-2 border-l-0 border-r-0 border-b-0 m-0" />

      {/* ACCORDION / FAQ SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12" 
        id="faq"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-[-1.5px] leading-tight mb-6 sm:mb-8 text-center">
          Frequently Asked <span className="text-black">Questions</span>
        </h2>
        <div className="max-w-[680px] flex flex-col gap-3 mx-auto">
          {[
            {
              question: "Who can participate?",
              answer: "Vibe-A-Thon is open to all students! You don't need any specific background — just a laptop, a teammate, and will to build something cool."
            },
            {
              question: "What should we build?",
              answer: "Anything you can vibe-code! Web apps, tools, games — theme will be revealed on day of event. Come prepared and stay creative."
            },
            {
              question: "How is judging done?",
              answer: "Projects will be evaluated on creativity, execution, and presentation. A panel of judges from Engineering India YCCE and ACM will assess all submissions."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black rounded overflow-hidden shadow-[4px_4px_0_#000] transition-all hover:shadow-[6px_6px_0_#000]"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-3.5 font-semibold text-sm border-none bg-transparent cursor-pointer text-left"
              >
                {item.question}
                <span className="text-xs transition-transform" style={{ transform: accordionOpen === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▾
                </span>
              </button>
              <div 
                className="overflow-hidden transition-all duration-300 bg-[#fafaf8] text-sm text-[#374151] px-4"
                style={{ 
                  maxHeight: accordionOpen === index ? '200px' : '0px',
                  paddingTop: accordionOpen === index ? '12px' : '0px',
                  paddingBottom: accordionOpen === index ? '16px' : '0px'
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <hr className="border-2 border-black border-t-2 border-l-0 border-r-0 border-b-0 m-0" />

      {/* STATS SECTION */}
      <section className="border-t-2 border-black py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute text-yellow-400 animate-pulse" style={{ top: '10%', left: '8%', animationDelay: '0s' }} width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          <svg className="absolute text-yellow-400 animate-pulse" style={{ top: '15%', right: '12%', animationDelay: '1s' }} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          <svg className="absolute text-yellow-400 animate-pulse" style={{ bottom: '20%', left: '15%', animationDelay: '0.5s' }} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          <svg className="absolute text-yellow-400 animate-pulse" style={{ bottom: '15%', right: '8%', animationDelay: '1.5s' }} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          <svg className="absolute text-yellow-400 animate-pulse" style={{ top: '50%', left: '4%', animationDelay: '2s' }} width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          <svg className="absolute text-yellow-400 animate-pulse" style={{ top: '30%', right: '4%', animationDelay: '0.8s' }} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto text-center relative z-20"
        >
          <h2 className="text-3xl lg:text-5xl font-black tracking-[-1.5px] leading-tight">
            A <span className="text-black">Growing</span> Community of Builders.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[640px] mx-auto mt-12">
            <div className="text-left">
              <div className="text-lg font-semibold mb-2">Prize Pool</div>
              <div className="text-6xl lg:text-8xl font-black tracking-[-4px] leading-none text-black">₹2K+</div>
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold mb-2">Team Slots</div>
              <div className="text-6xl lg:text-8xl font-black tracking-[-4px] leading-none text-black">50+</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COORDINATORS SECTION */}
      <div className="bg-yellow-400 border-t-2 border-black py-16 px-6" id="contact">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-3xl lg:text-5xl font-black tracking-[-1px] leading-tight">Event Coordinators</h2>
          <p className="text-base mt-2">
            Reach out to us for any queries about Vibe-A-Thon 2026.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[700px] mx-auto mt-9">
            {[
              { name: 'Parth Dehare', phone: '82638 43834', avatar: '👨‍💻' },
              { name: 'Priyanshu Kayarkar', phone: '93736 90752', avatar: '👨‍💻' },
              { name: 'Tiya Banerjee', phone: '97668 06793', avatar: '👩‍💻' },
            ].map((coord, index) => (
              <div
                key={index}
                className="bg-[#f5f5f0] border-2 border-black rounded p-5 shadow-[4px_4px_0_#000] transition-all hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] text-center"
              >
                <div className="w-13 h-13 bg-black border-2 border-black rounded-full mx-auto mb-2.5 flex items-center justify-center text-2xl overflow-hidden">
                  {coord.avatar}
                </div>
                <div className="text-sm font-bold mb-1">{coord.name}</div>
                <div className="font-mono text-sm text-[#374151]">{coord.phone}</div>
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
  className="py-16 px-6 border-t-2 border-black" 
  id="register"
>
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-15 items-center">
    <div className="flex-1 text-center lg:text-left w-full">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-[-2px] leading-tight mb-4">
        Register for<br />
        <span className="text-black">Vibe-A-Thon</span><br />
        2026 🚀
      </h1>
      <p className="text-sm sm:text-base text-[#374151] mb-6 sm:mb-7 max-w-[500px] mx-auto lg:mx-0">
        Pay ₹100, form a team of 2, and show up on April 9th. That's all it takes to compete for ₹2000+ in prizes.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSdXvYBE2zzEtiPJVAyICJgp99GXXQ3IKFnNfZOJmj2QiK0snw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black border-2 border-black rounded px-4 sm:px-6 py-2.5 font-bold text-sm sm:text-base shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all whitespace-nowrap w-full sm:w-auto"
        >
          🎮 Register Now!
        </a>
        <a 
          href="tel:8263843834" 
          className="inline-flex items-center justify-center bg-transparent text-black border-2 border-black rounded px-4 py-2.5 font-bold text-sm shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all whitespace-nowrap w-full sm:w-auto"
        >
          Contact Us
        </a>
      </div>
      <div className="mt-6 sm:mt-7 flex flex-wrap gap-2.5 justify-center lg:justify-start">
        <span className="inline-flex items-center bg-[#e2e2dc] text-[#374151] rounded px-2.5 py-1 text-xs font-semibold">Open to All</span>
        <span className="inline-flex items-center bg-yellow-400 text-black border-[1.5px] border-black rounded px-2.5 py-1 text-xs font-semibold">₹2000+ Prize</span>
        <span className="inline-flex items-center bg-black text-white rounded px-2.5 py-1 text-xs font-semibold">9 April 2026</span>
        <span className="inline-flex items-center border-[1.5px] border-black text-black rounded px-2.5 py-1 text-xs font-semibold">Team of 2</span>
      </div>
    </div>
    <div className="w-full lg:w-auto lg:flex-shrink-0 mt-0 bg-black border-2 border-black rounded p-4 sm:p-6 shadow-[8px_8px_0_#000] font-mono text-xs sm:text-sm text-gray-400 leading-[2]">
      <div className="text-gray-500">$</div>
      <div><span className="text-green-400">register</span>(<span className="text-yellow-400">"Vibe-A-Thon"</span>)</div>
      <br />
      <div><span className="text-blue-400">✓</span> Team registered</div>
      <div><span className="text-blue-400">✓</span> Fee: ₹100</div>
      <div><span className="text-blue-400">✓</span> Date: 9 Apr 2026</div>
      <div><span className="text-blue-400">✓</span> Venue: CSE Lab 1 & 2</div>
      <br />
      <div className="text-green-400">🚀 Ready to vibe!</div>
    </div>
  </div>
</motion.section>

      </div>
  );
}
