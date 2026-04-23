"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Apple-like smooth elegant spring
  const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as any };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FCF9F2] px-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-pattern.png')] opacity-5 mix-blend-multiply" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...transition }}
              className="relative z-10 flex flex-col items-center text-center p-12 max-w-lg w-full"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#D4AF37]/30 rounded-full scale-[1.5] opacity-20 pointer-events-none"
              />
              
              <p className="font-sans tracking-[0.3em] uppercase text-xs mb-6 text-[#7A7A7A]">You are cordially invited</p>
              
              <h2 className="font-serif text-5xl md:text-6xl mb-8 text-[#D4AF37] tracking-tight">Aditya & Priya</h2>
              
              <p className="font-sans font-light mb-12 text-[#4A4A4A] text-sm md:text-base opacity-80 max-w-sm">
                Join us in celebrating our journey of love, surrounded by blessings, family, and lifelong memories.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="bg-[#4A4A4A] text-white px-10 py-4 rounded-full font-sans text-sm tracking-[0.1em] uppercase hover:bg-[#D4AF37] transition-all duration-500 shadow-lg"
              >
                Enter the Celebration
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section ref={containerRef} className="relative w-full h-[110vh] overflow-hidden flex items-center justify-center -mt-[10vh]">
        {/* Parallax Background */}
        <motion.div 
          style={{ y, scale: 1.1 }}
          className="absolute inset-0 z-0 origin-top"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCF9F2] via-transparent to-transparent z-20 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-20 h-[50vh] w-full" />
          <Image
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
            alt="Couple romantic photo"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Cinematic Hero Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-30 flex flex-col items-center justify-center text-center px-4 pt-32 w-full h-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, ...transition }}
            className="overflow-hidden mb-6"
          >
            <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-xs md:text-sm">
              The Wedding Celebration of
            </p>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={isOpen ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 1.6, ...transition }}
            className="font-serif text-7xl md:text-9xl text-white mb-6 tracking-tight drop-shadow-2xl"
          >
            Aditya
            <span className="block text-4xl md:text-7xl text-[#D4AF37] italic font-light my-2 md:-my-4">&</span>
            Priya
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : {}}
            transition={{ delay: 2.2, duration: 2 }}
            className="w-[1px] h-24 bg-gradient-to-b from-[#D4AF37] to-transparent mb-8"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.6, ...transition }}
            className="font-sans text-xl md:text-2xl text-white/90 font-light tracking-wide uppercase text-shadow-sm"
          >
            December 15, 2026
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
