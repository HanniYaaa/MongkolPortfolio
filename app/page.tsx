'use client'; 

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Component สำหรับหัวข้อแต่ละส่วน - ปรับขนาด Text ให้ Responsive
const SectionHeading = ({ children, gradientColor }: { children: React.ReactNode, gradientColor: string }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-12">
    <h2 className={`text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradientColor}`}>
      {children}
    </h2>
    <div className={`h-[2px] flex-grow bg-gradient-to-r ${gradientColor}`}></div>
  </div>
);

// Component สำหรับ Card
const GlowCard = ({ children, gradientColor = "from-teal-400/50 to-purple-400/50" }: { children: React.ReactNode, gradientColor?: string }) => (
  <div className="relative group w-full">
    <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${gradientColor} blur-lg opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-5 md:p-6 transition-all duration-300 group-hover:border-neutral-700">
      {children}
    </div>
  </div>
);

export default function Home() {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkopnykn", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setShowPopup(true);
        setMessage("");
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem connecting to the server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-sans p-4 sm:p-8 md:p-12 lg:p-20 selection:bg-teal-400 selection:text-neutral-950 pt-28 md:pt-32">
      
      <div className="space-y-24 md:space-y-32 max-w-7xl mx-auto"> 

        {/* Hero Section - ปรับเป็น Stack แนวตั้งในมือถือ */}
        <motion.section 
          id="home" 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="flex flex-col-reverse md:grid md:grid-cols-12 gap-8 md:gap-12 items-center scroll-mt-40 pt-10 md:pt-0"
        >
          <div className="md:col-span-8 space-y-6 text-center md:text-left">
            <span className="inline-block bg-neutral-800 border border-neutral-700 px-4 py-1 rounded-full text-xs md:text-sm text-neutral-400">
              "A passion for creating..."
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              Hi, I'm <span className="text-white">Mongkol Wan</span>
            </h1>
            <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              A passionate and enthusiastic fresh graduate programmer, eager to learn various tasks with dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-neutral-200 transition text-sm md:text-base">
                Download CV
              </button>
              <a href="#work" className="border border-neutral-700 px-8 py-3 rounded-xl font-bold text-neutral-300 hover:border-white hover:text-white transition flex items-center justify-center text-sm md:text-base">
                Explore My Projects
              </a>
            </div>
          </div>

          <div className="md:col-span-4 relative group flex justify-center w-full">
            <div className="absolute -inset-px rounded-[30px] bg-gradient-to-r from-teal-400 to-purple-400 blur-xl opacity-50 animate-pulse-slow"></div>
            <div className="relative bg-neutral-900 border-2 border-neutral-800 rounded-[30px] p-6 sm:p-8 w-full max-w-[320px] space-y-4 text-center">
              <h3 className="text-xl md:text-2xl font-bold">Mongkol Wan</h3>
              <p className="text-teal-400 text-sm">Programmer</p>
              <div className="relative aspect-square overflow-hidden rounded-[20px] bg-black border border-neutral-800">
                <Image src="/Mongkol1.jpg" alt="Mongkol" fill className="object-cover" priority />
              </div>
              <a href="#contact" className="block mt-4">
                <button className="bg-neutral-800 border border-neutral-700 text-white text-xs sm:text-sm px-6 py-2 rounded-full hover:bg-neutral-700 transition-colors w-full uppercase font-bold tracking-widest">
                  Contact Me
                </button>
              </a>
            </div>
          </div>
        </motion.section>

        {/* About Me Section - ปรับ Grid stats ให้เรียงใหม่ในมือถือ */}
        <motion.section id="about" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="scroll-mt-32">
  <SectionHeading gradientColor="from-teal-400 to-emerald-400">About Me</SectionHeading>
  <GlowCard>
    <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-8 space-y-6 text-neutral-400 text-sm md:text-base">
        <p className="leading-relaxed text-center md:text-left">
          I'm Mongkol Wan, Recent graduate with a strong interest in computer software and programming. Familiar with various computer applications and basic programming concepts.
        </p>
        
        {/* ส่วนที่ปรับปรุง: ใช้ grid-cols-1 เป็นค่าเริ่มต้น (มือถือ) และเป็น md:grid-cols-3 (คอม) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 pt-4 text-center">
          
          <div className="bg-black/20 p-4 rounded-xl border border-neutral-800/50 flex flex-col justify-center">
            <p className="text-3xl md:text-5xl font-bold text-teal-400">1+</p>
            <p className="text-[10px] md:text-xs text-neutral-500 uppercase mt-1 tracking-widest">Project finished</p>
          </div>

          <div className="bg-black/20 p-4 rounded-xl border border-neutral-800/50 flex flex-col justify-center">
            <p className="text-3xl md:text-5xl font-bold text-teal-400">0</p>
            <p className="text-[10px] md:text-xs text-neutral-500 uppercase mt-1 tracking-widest">Exp Years</p>
          </div>

          <div className="bg-black/20 p-4 rounded-xl border border-neutral-800/50 flex flex-col justify-center">
            {/* ปรับ text-2xl สำหรับมือถือ และ md:text-5xl สำหรับคอม เพื่อให้ "3.20/4.00" ไม่ล้นขอบ */}
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-teal-400 whitespace-nowrap">
              3.20 / 4.00
            </p>
            <p className="text-[10px] md:text-xs text-neutral-500 uppercase mt-1 tracking-widest">GPA</p>
          </div>

        </div>
      </div>
      
      <div className="md:col-span-4 flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-[180px] md:h-[180px] rounded-full overflow-hidden bg-black border-2 border-neutral-800 shadow-2xl">
          <Image src="/Mongkol1.jpg" alt="Mongkol" fill className="object-cover" />
        </div>
        <p className="mt-4 text-center font-bold text-sm md:text-base text-white">Junior Programmer</p>
      </div>
    </div>
  </GlowCard>
</motion.section>

        {/* Tools & Technologies - ปรับ Grid columns ให้พอดีมือถือ */}
        <motion.section id="skills" className="scroll-mt-32">
          <SectionHeading gradientColor="from-teal-400 to-purple-400">Skills</SectionHeading>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
            {[
              { name: 'React', slug: 'react' },
              { name: 'Next', slug: 'nextdotjs' },
              { name: 'Tailwind', slug: 'tailwindcss' },
              { name: 'Java', slug: 'openjdk' },
              { name: 'Node', slug: 'nodedotjs' },
              { name: 'C', slug: 'c' },
              { name: 'HTML', slug: 'html5' },
              { name: 'CSS', slug: 'css' },
              { name: 'Dart', slug: 'dart' },
              { name: 'Flutter', slug: 'flutter' },
            ].map((skill) => (
              <GlowCard key={skill.name}>
                <div className="text-center group">
                  <div className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 flex items-center justify-center">
                    <img src={`https://cdn.simpleicons.org/${skill.slug}`} alt={skill.name} className="h-full w-full object-contain group-hover:scale-110 transition duration-300" />
                  </div>
                  <span className="text-[10px] md:text-xs text-neutral-300 font-medium block truncate">{skill.name}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* Project Section - ปรับ Layout ใน Card ให้ Stack ในมือถือ */}
        <motion.section id="work" className="scroll-mt-32">
          <SectionHeading gradientColor="from-emerald-400 to-teal-400">Project</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <a href="https://github.com/HanniYaaa/Voice-Emotion-Recognition-Based-Transformer" target="_blank" rel="noopener noreferrer" className="block group w-full">
              <GlowCard gradientColor="from-teal-400 to-emerald-400">
                <div className="flex flex-col-reverse sm:flex-row gap-6 items-center">
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <h4 className="text-lg md:text-xl font-bold group-hover:text-teal-400 transition-colors leading-snug">
                      Voice Emotion Recognition
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-500">An app used to categorize basic emotions using Transformer model</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] md:text-xs text-teal-400 font-mono mt-2">
                      <span>View Project</span><span>↗</span>
                    </div>
                  </div>
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-black overflow-hidden border border-neutral-800 shrink-0">
                    <Image src="/voice.jpg" alt="Voice Project" fill className="object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                </div>
              </GlowCard>
            </a>
          </div>
        </motion.section>

        {/* Contact Section - ปรับ Layout ให้สมดุล */}
        <section id="contact" className="py-10 md:py-20 scroll-mt-32 relative">
          <SectionHeading gradientColor="from-teal-400 to-emerald-400">Contact</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 mt-8 md:mt-12">
            <div className="space-y-6 md:space-y-8 text-center md:text-left">
              <div>
                <h3 className="text-xs md:text-sm font-bold text-teal-400 tracking-widest uppercase mb-2">Get in touch</h3>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Let's work <span className="italic text-teal-400">together</span></h2>
                <p className="text-neutral-400 mt-4 text-sm md:text-base max-w-md mx-auto md:mx-0 leading-relaxed">
                  Have a project in mind? I'd love to hear about it. Let's build something great.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-4 group bg-neutral-900/50 p-3 rounded-2xl border border-neutral-800 w-fit">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-lg">📧</div>
                  <div className="text-left">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Email</p>
                    <p className="text-sm md:text-base text-white font-medium">artee2547@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/HanniYaaa" target="_blank" rel="noopener noreferrer" 
                     className="px-6 py-2 rounded-full border border-neutral-800 text-xs md:text-sm text-neutral-400 hover:border-teal-400 hover:text-white transition-all bg-neutral-900/30">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>

            <GlowCard gradientColor="from-teal-400 to-emerald-400">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest ml-1 font-bold">Name</label>
                  <input type="text" name="name" required placeholder="Your name" className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400 transition-colors" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest ml-1 font-bold">Email</label>
                  <input type="email" name="email" required placeholder="your@email.com" className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400 transition-colors" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest ml-1 font-bold">Message</label>
                  <textarea 
                    name="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4} 
                    required 
                    placeholder="Tell me about your project..." 
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400 transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-extrabold py-3.5 md:py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-xs md:text-sm uppercase tracking-widest"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </GlowCard>
          </div>

          {/* Pop-up Thank You - ปรับขนาดให้พอดีมือถือ */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-md p-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Thank you!</h3>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">I have received your message and will get back to you shortly.</p>
                <button 
                  onClick={() => setShowPopup(false)} 
                  className="w-full bg-teal-400 text-black font-bold py-3 rounded-xl hover:bg-teal-300 transition-colors uppercase text-xs tracking-widest"
                >
                  OK
                </button>
              </motion.div>
            </div>
          )}
        </section>

        <footer className="text-center text-neutral-600 text-[10px] md:text-xs py-10 border-t border-neutral-800 mt-10">
          © 2026 Mongkol | All rights reserved
        </footer>
      </div>
    </main>
  );
}