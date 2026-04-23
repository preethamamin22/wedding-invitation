"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const events = [
  {
    title: "Haldi",
    date: "Dec 13, 2026",
    time: "10:00 AM",
    venue: "The Grand Villa, Jaipur",
    description: "A vibrant morning of colors, laughter, and blessings as we kick off our wedding celebrations.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Mehendi",
    date: "Dec 13, 2026",
    time: "4:00 PM",
    venue: "The Royal Gardens, Jaipur",
    description: "An evening filled with beautiful henna designs, music, dancing, and delicious food under the stars.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Wedding",
    date: "Dec 14, 2026",
    time: "7:00 PM",
    venue: "Palace Courtyard, Jaipur",
    description: "The momentous occasion where we exchange vows and promise each other a lifetime of love.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  },
  {
    title: "Reception",
    date: "Dec 15, 2026",
    time: "8:00 PM",
    venue: "Grand Ballroom, Jaipur",
    description: "A glamorous night to celebrate our union with friends, family, and loved ones.",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
  }
];

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-32 bg-[#FCF9F2] relative overflow-hidden" id="events" ref={containerRef}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center mb-24"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-[#A68F3A] text-xs font-semibold">The Schedule</span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#4A4A4A] mt-4 mb-6 tracking-tight">Festivities</h2>
          <div className="w-[1px] h-16 bg-[#D4AF37] mx-auto" />
        </motion.div>

        <div className="space-y-32">
          {events.map((event, index) => (
            <EventItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventItem({ event, index }: { event: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
      <motion.div 
        style={{ opacity }}
        className="w-full lg:w-1/2 h-[60vh] lg:h-[80vh] relative overflow-hidden rounded-[2rem]"
      >
        <motion.img 
          style={{ y: yImage, scale: 1.1 }}
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover origin-bottom"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
      
      <motion.div 
        style={{ opacity }}
        className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="font-serif text-6xl md:text-8xl text-[#F9ECEC] -ml-2 -mt-4 opacity-50 absolute -z-10">{index + 1}</span>
          <span className="font-sans tracking-[0.2em] text-[#D4AF37] text-sm font-semibold uppercase">{event.date}</span>
        </div>
        
        <h3 className="font-serif text-4xl md:text-5xl text-[#4A4A4A] mb-8 tracking-tight">{event.title}</h3>
        
        <div className="flex flex-col space-y-4 mb-8 border-l border-[#D4AF37] pl-6 py-2">
          <div className="flex items-center text-[#4A4A4A]">
            <span className="font-sans text-xs uppercase tracking-widest w-20 text-[#A68F3A]">Time</span>
            <span className="font-sans text-base">{event.time}</span>
          </div>
          <div className="flex items-center text-[#4A4A4A]">
            <span className="font-sans text-xs uppercase tracking-widest w-20 text-[#A68F3A]">Venue</span>
            <span className="font-sans text-base">{event.venue}</span>
          </div>
        </div>
        
        <p className="font-sans text-[#7A7A7A] text-lg leading-relaxed font-light">
          {event.description}
        </p>
      </motion.div>
    </div>
  );
}
