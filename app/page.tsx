'use client'; 

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react'; // เพิ่ม useState

// Component สำหรับหัวข้อแต่ละส่วน
const SectionHeading = ({ children, gradientColor }: { children: React.ReactNode, gradientColor: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <h2 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradientColor}`}>
      {children}
    </h2>
    <div className={`h-[2px] flex-grow bg-gradient-to-r ${gradientColor}`}></div>
  </div>
);

// Component สำหรับ Card
const GlowCard = ({ children, gradientColor = "from-teal-400/50 to-purple-400/50" }: { children: React.ReactNode, gradientColor?: string }) => (
  <div className="relative group">
    <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${gradientColor} blur-lg opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 transition-all duration-300 group-hover:border-neutral-700">
      {children}
    </div>
  </div>
);

export default function Home() {
  // --- States สำหรับระบบ Contact ---
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
        setShowPopup(true); // แสดง Pop-up
        setMessage("");     // รีเซ็ตเฉพาะช่อง Message
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
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-sans p-6 md:p-12 lg:p-20 selection:bg-teal-400 selection:text-neutral-950 pt-24">
      
      <div className="space-y-32"> 

        {/* Hero Section */}
        <motion.section id="home" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center scroll-mt-32">
          <div className="md:col-span-8 space-y-6">
            <span className="inline-block bg-neutral-800 border border-neutral-700 px-4 py-1 rounded-full text-sm text-neutral-400">"A passion for creating..."</span>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">Hi, I'm <span className="text-white">Mongkol Wan</span></h1>
            <p className="text-xl text-neutral-400 max-w-2xl">A passionate and enthusiastic fresh graduate programmer, eager to learn various tasks with dedication.</p>
            <div className="flex gap-4 pt-4">
              <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-neutral-200 transition">Download CV</button>
              <a href="#work" className="border border-neutral-700 px-8 py-3 rounded-xl font-bold text-neutral-300 hover:border-white hover:text-white transition flex items-center">Explore My Projects</a>
            </div>
          </div>
          <div className="md:col-span-4 relative group flex justify-center">
            <div className="absolute -inset-px rounded-[30px] bg-gradient-to-r from-teal-400 to-purple-400 blur-xl opacity-50 group-hover:opacity-100 transition animate-pulse-slow mt-20"></div>
            <div className="relative bg-neutral-900 border-2 border-neutral-800 rounded-[30px] p-8 w-[350px] space-y-4 mt-20 text-center">
              <h3 className="text-2xl font-bold">Mongkol Wan</h3>
              <p className="text-teal-400 text-sm">Programmer</p>
              <div className="relative aspect-square overflow-hidden rounded-[20px] bg-black border border-neutral-800">
                <Image src="/Mongkol1.jpg" alt="Mongkol" fill className="object-cover" />
              </div>
              <a href="#contact" className="block mt-4">
                <button className="bg-neutral-800 border border-neutral-700 text-white text-sm px-6 py-2 rounded-full hover:bg-neutral-700 transition-colors w-full">Contact Me</button>
              </a>
            </div>
          </div>
        </motion.section>

        {/* About Me Section */}
        <motion.section id="about" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="scroll-mt-32">
          <SectionHeading gradientColor="from-teal-400 to-emerald-400">About Me</SectionHeading>
          <GlowCard>
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-6 text-neutral-400">
                <p>I'm Mongkol Wan, Recent graduate with a strong interest in computer software and programming...</p>
                <div className="grid grid-cols-3 gap-6 pt-6 text-center">
                  <div><p className="text-5xl font-bold text-teal-400">1+</p><p className="text-neutral-500">Project finished</p></div>
                  <div><p className="text-5xl font-bold text-teal-400">0</p><p className="text-neutral-500">Years of experience</p></div>
                  <div><p className="text-5xl font-bold text-teal-400">3.20/4.00</p><p className="text-neutral-500">GPA</p></div>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden bg-black border border-neutral-800">
                  <Image src="/Mongkol1.jpg" alt="Mongkol" fill className="object-cover" />
                </div>
                <p className="mt-4 text-center font-bold">Junior Programmer</p>
              </div>
            </div>
          </GlowCard>
        </motion.section>

        {/* Tools & Technologies */}
        <motion.section id="skills" className="scroll-mt-32">
          <SectionHeading gradientColor="from-teal-400 to-purple-400">Tools & Technologies</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              { name: 'React JS', slug: 'react' },
              { name: 'Next JS', slug: 'nextdotjs' },
              { name: 'Tailwind CSS', slug: 'tailwindcss' },
              { name: 'Java', slug: 'openjdk' },
              { name: 'Node JS', slug: 'nodedotjs' },
              { name: 'C', slug: 'c' },
              { name: 'HTML', slug: 'html5' },
              { name: 'CSS', slug: 'css' },
              { name: 'Dart', slug: 'dart' },
              { name: 'Flutter', slug: 'flutter' },
            ].map((skill) => (
              <GlowCard key={skill.name}>
                <div className="text-center text-sm font-medium py-2 group">
                  <img src={`https://cdn.simpleicons.org/${skill.slug}`} alt={skill.name} className="h-10 w-10 mx-auto mb-3 object-contain group-hover:scale-110 transition duration-300" />
                  <span className="text-neutral-300 group-hover:text-white transition-colors">{skill.name}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* Project Section */}
        <motion.section id="work" className="scroll-mt-32">
          <SectionHeading gradientColor="from-emerald-400 to-teal-400">Project</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            <a href="https://github.com/HanniYaaa/Voice-Emotion-Recognition-Based-Transformer" target="_blank" rel="noopener noreferrer" className="block group">
              <GlowCard gradientColor="from-teal-400 to-emerald-400">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-2">
                    <h4 className="text-xl font-bold group-hover:text-teal-400 transition-colors">Voice Emotion Recognition</h4>
                    <p className="text-sm text-neutral-500">An app used to categorize basic emotions</p>
                    <div className="flex items-center gap-2 text-xs text-teal-400 font-mono mt-2"><span>View Project</span><span>↗</span></div>
                  </div>
                  <div className="relative aspect-square rounded-xl bg-black overflow-hidden border border-neutral-800">
                    <Image src="/voice.jpg" alt="Voice Project" fill className="object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                </div>
              </GlowCard>
            </a>
          </div>
        </motion.section>

        {/* Contact Section */}
        <section id="contact" className="py-20 scroll-mt-32 relative">
          <SectionHeading gradientColor="from-teal-400 to-emerald-400">Contact</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-teal-400 tracking-widest uppercase mb-2">Get in touch</h3>
                <h2 className="text-5xl font-bold text-white">Let's work <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">together</span></h2>
                <p className="text-neutral-400 mt-6 max-w-md">Have a project in mind? I'd love to hear about it.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-teal-400 transition-colors">📧</div>
                  <div><p className="text-xs text-neutral-500 tracking-wider">Email</p><p className="text-white">artee2547@gmail.com</p></div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                {[
                  { name: 'GitHub', url: 'https://github.com/HanniYaaa' },
                ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"            // <--- จุดสำคัญ: สั่งให้เปิดหน้าต่างใหม่
                  rel="noopener noreferrer"   // <--- เพื่อความปลอดภัยและความเร็ว
                  className="px-5 py-2 rounded-full border border-neutral-800 text-sm text-neutral-400 hover:border-teal-400 hover:text-white transition-all"
                >
                  {social.name} ↗
                </a>
                ))}
              </div>
            </div>

            <GlowCard gradientColor="from-teal-400 to-emerald-400">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">NAME</label>
                  <input type="text" name="name" required placeholder="Your name" className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">EMAIL</label>
                  <input type="email" name="email" required placeholder="your@email.com" className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">MESSAGE</label>
                  <textarea 
                    name="message" 
                    value={message} // คุมด้วย State
                    onChange={(e) => setMessage(e.target.value)} // เปลี่ยนค่าใน State
                    rows={4} 
                    required 
                    placeholder="Tell me about your project..." 
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </GlowCard>
          </div>

          {/* Pop-up Thank You */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-md p-4">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Thank you for sending us!</h3>
                <p className="text-neutral-400 text-sm mb-6">I have received your message and will get back to you shortly.</p>
                <button 
                  onClick={() => setShowPopup(false)} 
                  className="w-full bg-teal-400 text-black font-bold py-3 rounded-xl hover:bg-teal-300 transition-colors"
                >
                  OK
                </button>
              </motion.div>
            </div>
          )}
        </section>

        <footer className="text-center text-neutral-600 text-xs py-10 border-t border-neutral-800 mt-20">
          © 2026 Mongkol | All rights reserved
        </footer>
      </div>
    </main>
  );
}