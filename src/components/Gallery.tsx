"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const photos = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939000140-5232742d4bc3?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621683419957-c81bcbeb972f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Adding subtle parallax to the entire section
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section className="py-32 bg-[#FCF9F2] relative overflow-hidden" id="gallery" ref={containerRef}>
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center mb-24"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-[#8C7625] text-xs font-semibold">Memories</span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#5A1818] mt-4 mb-6 tracking-tight">Gallery</h2>
          <div className="w-[1px] h-16 bg-[#CFB53B] mx-auto" />
        </motion.div>

        <motion.div style={{ y }} className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {photos.map((photo, index) => (
            <GalleryImage 
              key={photo} 
              photo={photo} 
              index={index} 
              onClick={() => setSelectedPhoto(photo)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} strokeWidth={1} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
              className="relative w-full max-w-6xl h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto}
                alt="Selected full screen"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryImage({ photo, index, onClick }: { photo: string, index: number, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Staggered parallax for masonry effect
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", index % 2 === 0 ? "5%" : "-5%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y: yImage }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-700"
      onClick={onClick}
    >
      <div className="relative w-full overflow-hidden" style={{ paddingTop: index % 2 === 0 ? '120%' : '140%' }}>
        <Image
          src={photo}
          alt={`Gallery image ${index + 1}`}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
          <span className="text-white font-sans tracking-[0.2em] text-xs uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
            View Image
          </span>
        </div>
      </div>
    </motion.div>
  );
}
