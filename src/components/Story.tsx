"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const timelineEvents = [
  {
    year: "March 2021",
    title: "How We Met",
    description: "It all started with a simple 'Hello' at a mutual friend's party. We talked for hours, oblivious to the world around us. That evening sparked a connection that would change our lives forever.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczNCoZQQ-q1xmQZPexfroUF0oEv578ifMGWgsDHHPqXfhjqGVZgAwIQE4G-TIiSSphyC-wYthfOODW4SWTPjcLHVPs5fi8EDIgL2JMvTxjO3kRNPVdlChU8oKxcOE7A5yJKxeZW14Ts7625EgRD4e6WJmA=w578-h869-s-no-gm?authuser=0",
  },
  {
    year: "December 2023",
    title: "The Proposal",
    description: "Under a sky full of stars during our trip to the mountains, Aditya got down on one knee. With tears of joy and a heart full of love, Priya said 'Yes!'.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczPmtLkKZsd7HZ_9bESPy6QKz4ks_Q16vA6YkJOxx539WmYEfcjguarYt_uNGbm1bVe_JBNBvonE_-CdmSXKj97pO_FqqDYja-WdwX71JD4YUeAoXgvjn5oE2M7fw1SlcJWdgnSRPiuTBM-hqqJ7NcHr3w=w578-h869-s-no-gm?authuser=0",
  },
  {
    year: "December 2026",
    title: "The Wedding",
    description: "We are thrilled to invite you to celebrate our love as we take our vows and start this beautiful new chapter together.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczOnvuZGCy4m2oKkqW-ckGhN7BpefPdvJLeljoRzoX3gXnPGgZudYBFpQmmHxhOTTdqjpCQ33W6vX03WqosnOZkZsJiQQTwOq_3InvWrpseJo0u8cHviAqBdisn25KUDVO1XyFTnJlotwqb8dkuVLI5-3w=w578-h869-s-no-gm?authuser=0",
  }
];

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-[#F9ECEC] relative overflow-hidden" id="story" ref={containerRef}>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 pointer-events-none" />

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center mb-32"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-[#8C7625] text-xs font-semibold">Our Journey</span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#5A1818] mt-4 mb-6 tracking-tight">How It All Began</h2>
          <div className="w-[1px] h-16 bg-[#CFB53B] mx-auto" />
        </motion.div>

        <div className="flex flex-col space-y-32 md:space-y-48">
          {timelineEvents.map((event, index) => (
            <StoryBlock key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryBlock({ event, index }: { event: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center">
      {/* Background Image Parallax */}
      <div className={`absolute top-0 ${isEven ? 'left-0 md:w-3/4' : 'right-0 md:w-3/4'} w-full h-full overflow-hidden rounded-[2rem] md:rounded-[4rem]`}>
        <motion.img
          style={{ scale: scaleImg }}
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating Text Block */}
      <motion.div
        style={{ y: yText, opacity }}
        className={`relative z-10 w-[90%] md:w-[40%] bg-white/80 md:bg-white/60 backdrop-blur-xl p-8 md:p-16 rounded-3xl shadow-2xl border border-white/40 ${
          isEven ? "md:ml-auto md:-mr-12" : "md:mr-auto md:-ml-12"
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[#CFB53B]" />
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#8C7625] font-semibold">{event.year}</span>
        </div>
        <h3 className="font-serif text-4xl md:text-5xl text-[#5A1818] mb-6 tracking-tight leading-tight">
          {event.title}
        </h3>
        <p className="font-sans text-[#5A1818] text-base md:text-lg leading-relaxed font-light">
          {event.description}
        </p>
      </motion.div>
    </div>
  );
}
