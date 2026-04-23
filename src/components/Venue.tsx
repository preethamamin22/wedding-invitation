"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navigation } from "lucide-react";

export default function Venue() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-white" id="venue" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.2em] text-[#D4AF37] text-sm font-semibold">Location</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#4A4A4A] mt-2 mb-4">Getting There</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 space-y-6"
          >
            <div className="bg-[#FCF9F2] p-8 rounded-2xl border border-[#E6D0D0] shadow-sm">
              <h3 className="font-serif text-2xl text-[#4A4A4A] mb-4">Main Venue</h3>
              <p className="font-sans text-[#7A7A7A] mb-6">
                <strong>Palace Courtyard</strong><br />
                123 Heritage Road,<br />
                Near Royal Fort, Jaipur,<br />
                Rajasthan 302001
              </p>
              <a
                href="https://maps.google.com" // Placeholder map link
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#D4AF37] text-white font-sans rounded-full hover:bg-[#E7C665] transition-colors shadow-md"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </a>
            </div>
            
            <div className="bg-[#F9ECEC] p-8 rounded-2xl border border-[#E6D0D0] shadow-sm">
              <h3 className="font-serif text-xl text-[#4A4A4A] mb-2">Accommodation</h3>
              <p className="font-sans text-[#7A7A7A] text-sm leading-relaxed">
                Rooms have been reserved for our guests. Please let us know if you require accommodation during the RSVP process.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3 h-[500px] rounded-2xl overflow-hidden shadow-lg border-4 border-white"
          >
            {/* Embedded Google Map using a styled iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.23306263544!2d75.7196025686035!3d26.88514169999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.1) opacity(0.9)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
