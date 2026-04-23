"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom Ganesha SVG element
const GaneshaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 fill-[#CFB53B] mb-6">
    <path d="M50 0c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0 15c-6.8 0-12.7 4.1-15.6 10-2-3-5.4-5-9.4-5-6.1 0-11 4.9-11 11 0 4.3 2.5 8.1 6.2 9.9-.4 1.3-.7 2.7-.7 4.1 0 7.7 6.3 14 14 14v11c-8.3 0-15 6.7-15 15v10h43V70c0-8.3-6.7-15-15-15V44h-2c-6.1 0-11-4.9-11-11s4.9-11 11-11c5 0 9.2 3.3 10.5 7.9C52 26 53 25.4 54 25.1V22c0-3.9-3.1-7-7-7zm0 21c4.4 0 8 3.6 8 8v16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8c0 4.4-3.6 8-8 8H35V44c7.7 0 14-6.3 14-14 0-1.4-.3-2.8-.7-4.1 3.7-1.8 6.2-5.6 6.2-9.9 0-6.1-4.9-11-11-11-4 0-7.4 2-9.4 5-2.9-5.9-8.8-10-15.6-10z" />
  </svg>
);

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  // Transition settings for Apple-like smoothness
  const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as any };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1, backgroundColor: "#CFB53B" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#5A1818] overflow-hidden"
          >
            {/* Envelope Flap graphic */}
            <div className="absolute top-0 w-full h-1/2 bg-[#3A0C0C] opacity-30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -skew-y-6 origin-top" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...transition }}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Wax Seal */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#8C7625] to-[#E8D88E] shadow-[0_0_40px_rgba(207,181,59,0.5)] flex items-center justify-center border-4 border-[#8C7625] transition-transform duration-500 group-hover:scale-110">
                 <span className="font-script text-5xl text-[#5A1818]">A & P</span>
              </div>
              <p className="mt-8 font-sans uppercase tracking-[0.4em] text-sm text-[#E8D88E] animate-pulse">
                Tap to Reveal
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-[#FCF9F2]">
        
        {/* Subtle floral pattern background */}
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/pw/AP1GczP44YMrB0z1yLr30TZ9SdBhv73vr2C6XNpjSltX5VulYgulnuEe6KNkOdaziEkfAwLIAOxjynaUs4inJeUZDESSC5u2O4_RFuWcC7r5_a_0qYvMFQrmwuCWKlP_TYRw_Zmjs6sKD-18kLOEOLZs-WUhhw=w1280-h851-s-no-gm?authuser=0')] opacity-10 bg-cover bg-center pointer-events-none filter blur-sm grayscale" />

        {/* Falling Petals (CSS-based animation container) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {/* In a real project we could use framer-motion particles, using soft floating circles as a fallback in tailwind */}
           <motion.div animate={{y: [0, 800], x: [0, 50, -50, 0], rotate: 360}} transition={{repeat: Infinity, duration: 15, ease: "linear"}} className="absolute top-[-10%] left-[20%] w-4 h-4 bg-[#CFB53B]/20 rounded-full blur-[1px]" />
           <motion.div animate={{y: [0, 800], x: [0, -50, 50, 0], rotate: 360}} transition={{repeat: Infinity, duration: 20, delay: 2, ease: "linear"}} className="absolute top-[-10%] right-[30%] w-6 h-6 bg-[#5A1818]/10 rounded-full blur-[2px]" />
           <motion.div animate={{y: [0, 800], x: [0, 30, -30, 0], rotate: 360}} transition={{repeat: Infinity, duration: 18, delay: 5, ease: "linear"}} className="absolute top-[-10%] left-[60%] w-3 h-3 bg-[#CFB53B]/30 rounded-full blur-[1px]" />
        </div>

        {/* The Central Invitation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 1, ...transition }}
          className="relative z-10 bg-white/80 backdrop-blur-md rounded-tl-[60px] rounded-br-[60px] md:rounded-tl-[100px] md:rounded-br-[100px] p-8 md:p-16 lg:p-20 max-w-4xl w-full border-2 border-[#CFB53B]/50 shadow-2xl text-center flex flex-col items-center"
        >
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#CFB53B] opacity-50" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#CFB53B] opacity-50" />

          {/* Ganesha */}
          <motion.div
             initial={{ opacity: 0, filter: "blur(5px)" }}
             animate={isOpen ? { opacity: 1, filter: "blur(0px)" } : {}}
             transition={{ delay: 1.5, ...transition }}
          >
             <GaneshaIcon />
          </motion.div>

          <p className="font-serif italic text-sm md:text-base text-[#5A1818]/70 mb-8 max-w-lg">
            With the blessings of God and elders,
            <br />we are pleased to invite you to the wedding ceremony of:
          </p>

          <div className="flex flex-col items-center mb-10 text-[#5A1818]">
            <span className="font-sans text-xs uppercase tracking-[0.2em] mb-2 text-[#CFB53B]">Groom</span>
            <h1 className="font-script text-5xl md:text-7xl lg:text-8xl drop-shadow-sm truncate w-full">Chiranjivi Aditya</h1>
            
            <span className="font-serif text-3xl md:text-5xl my-4 md:my-6 italic text-[#CFB53B] opacity-80">weds</span>
            
            <span className="font-sans text-xs uppercase tracking-[0.2em] mb-2 text-[#CFB53B]">Bride</span>
            <h1 className="font-script text-5xl md:text-7xl lg:text-8xl drop-shadow-sm truncate w-full">Kumari Priya</h1>
          </div>

          <div className="w-[1px] h-12 bg-gradient-to-b from-[#CFB53B] to-transparent mb-8" />

          <div className="font-sans text-[#5A1818] tracking-widest text-sm md:text-base space-y-3 mb-10">
            <p className="uppercase font-semibold">13-05-2024 (Monday)</p>
            <p className="opacity-80">Muhurta: Around 12:30 PM</p>
            <p className="font-serif text-lg tracking-normal max-w-sm mx-auto mt-4 text-[#5A1818]">
              Kalyana Mantapa
            </p>
          </div>

          <p className="font-serif italic text-sm md:text-base text-[#5A1818]/80 max-w-md mx-auto leading-relaxed border-t border-[#CFB53B]/30 pt-8">
            We sincerely request you and your family to attend the wedding and bless the couple for a happy and prosperous married life.
          </p>
        </motion.div>
      </section>
    </>
  );
}
