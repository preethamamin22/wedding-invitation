"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const events = [
  {
    title: "Pre-wedding Reception & Haldi",
    date: "10-05-2024",
    time: "Evening",
    venue: "Main Hall, Kalyana Mantapa",
    description: "Please join us for an evening of joyous celebrations, music, and the traditional haldi ceremony filled with blessings and laughter.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMb_h3eq4U15w9m8Lr_NEmhUz3EJNduSW6htED7W6iAn5G4SmSjB7VHTaMbkKfhRAesFDQ24bGQb-ggpMOKxAlVDoqFL1-vugo4G_f_f_ozFBXKvWcRppXCNPYBu4dGVNDUh1EZYwUndrP_v-HmyZmsFA=w578-h869-s-no-gm?authuser=0",
  },
  {
    title: "The Wedding (Muhurta)",
    date: "13-05-2024",
    time: "Around 12:30 PM",
    venue: "Kalyana Mantapa",
    description: "The momentous occasion where we exchange vows and promise each other a lifetime of love under the blessings of our elders.",
    image: "https://lh3.googleusercontent.com/pw/AP1GczP44YMrB0z1yLr30TZ9SdBhv73vr2C6XNpjSltX5VulYgulnuEe6KNkOdaziEkfAwLIAOxjynaUs4inJeUZDESSC5u2O4_RFuWcC7r5_a_0qYvMFQrmwuCWKlP_TYRw_Zmjs6sKD-18kLOEOLZs-WUhhw=w1280-h851-s-no-gm?authuser=0",
  }
];

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-32 bg-[#FAF2F2] relative overflow-hidden" id="events" ref={containerRef}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CFB53B]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center mb-24"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-[#CFB53B] text-xs font-semibold">The Schedule</span>
          <h2 className="font-script text-6xl md:text-7xl lg:text-8xl text-[#5A1818] mt-4 mb-6">Ceremonies</h2>
          <div className="w-[1px] h-16 bg-[#CFB53B] mx-auto opacity-50" />
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
        className="w-full lg:w-1/2 h-[60vh] lg:h-[70vh] relative overflow-hidden rounded-[2rem] border-2 border-[#CFB53B]/20 shadow-xl p-2 bg-white"
      >
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
          <motion.img 
            style={{ y: yImage, scale: 1.1 }}
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover origin-bottom filter sepia-[0.2] brightness-90"
          />
        </div>
      </motion.div>
      
      <motion.div 
        style={{ opacity }}
        className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="font-serif text-6xl md:text-8xl text-[#E6D0D0] -ml-2 -mt-4 opacity-30 absolute -z-10">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-sans tracking-[0.2em] text-[#CFB53B] text-sm font-bold uppercase">{event.date}</span>
        </div>
        
        <h3 className="font-serif text-4xl md:text-5xl text-[#5A1818] mb-8 tracking-tight">{event.title}</h3>
        
        <div className="flex flex-col space-y-4 mb-8 border-l border-[#CFB53B]/50 pl-6 py-2">
          <div className="flex items-center text-[#5A1818]">
            <span className="font-sans text-xs uppercase tracking-[0.2em] w-24 text-[#CFB53B]">Time</span>
            <span className="font-sans text-base font-semibold">{event.time}</span>
          </div>
          <div className="flex items-center text-[#5A1818]">
            <span className="font-sans text-xs uppercase tracking-[0.2em] w-24 text-[#CFB53B]">Venue</span>
            <span className="font-sans text-base font-semibold">{event.venue}</span>
          </div>
        </div>
        
        <p className="font-serif italic text-[#5A1818]/80 text-lg leading-relaxed font-light">
          "{event.description}"
        </p>
      </motion.div>
    </div>
  );
}
