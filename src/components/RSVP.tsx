"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function RSVP() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-24 bg-[#FCF9F2] relative" id="rsvp" ref={ref}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20" />
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#D4AF37]/20"
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl text-[#4A4A4A] mb-4">Are you attending?</h2>
            <p className="font-sans text-[#7A7A7A]">Please RSVP by November 1st, 2026</p>
          </div>

          {!isSubmitted ? (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div>
                <label className="block font-sans text-sm text-[#4A4A4A] mb-2">Full Name(s)</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FCF9F2] border border-[#E6D0D0] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                  placeholder="John & Jane Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm text-[#4A4A4A] mb-2">Attending?</label>
                  <select
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FCF9F2] border border-[#E6D0D0] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors appearance-none"
                  >
                    <option value="yes">Joyfully Accepts</option>
                    <option value="no">Regretfully Declines</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-sans text-sm text-[#4A4A4A] mb-2">Number of Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    disabled={formData.attending === "no"}
                    className="w-full px-4 py-3 bg-[#FCF9F2] border border-[#E6D0D0] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors appearance-none disabled:opacity-50"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm text-[#4A4A4A] mb-2">Message for the Couple (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#FCF9F2] border border-[#E6D0D0] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors resize-none"
                  placeholder="Leave your wishes here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D4AF37] text-white font-sans uppercase tracking-[0.1em] rounded-lg hover:bg-[#E7C665] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
              >
                Send RSVP
              </button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-[#F9ECEC] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="font-serif text-3xl text-[#4A4A4A] mb-2">Thank You!</h3>
              <p className="font-sans text-[#7A7A7A]">
                {formData.attending === "yes" 
                  ? "We can't wait to celebrate with you!" 
                  : "We will miss you, thank you for letting us know."}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
