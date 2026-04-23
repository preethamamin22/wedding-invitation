"use client";

import { MessageCircle } from "lucide-react";

export default function Footer() {
  const handleShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("You are invited to Chiranjivi Aditya and Kumari Priya's Wedding Ceremony. Please join us!");
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  };

  return (
    <footer className="bg-white py-20 text-center border-t-4 border-[#CFB53B]/20 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/floral-pattern.png')] opacity-10" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/floral-pattern.png')] opacity-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[#CFB53B] mx-auto mb-10" />
        
        <h2 className="font-script text-5xl md:text-6xl text-[#5A1818] mb-8">With Best Compliments</h2>
        
        <div className="font-serif italic text-lg text-[#5A1818]/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          We eagerly await your presence to shower your blessings on the newly wedded couple.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <span className="font-sans uppercase tracking-[0.2em] text-[#CFB53B] text-xs font-bold block mb-4">Groom's Family</span>
            <p className="font-sans text-[#5A1818] font-bold text-lg">Mr. & Mrs. Groom's Parents</p>
            <p className="font-sans text-[#5A1818]/80 text-sm">And all relatives & friends</p>
          </div>
          
          <div className="space-y-4">
            <span className="font-sans uppercase tracking-[0.2em] text-[#CFB53B] text-xs font-bold block mb-4">Bride's Family</span>
            <p className="font-sans text-[#5A1818] font-bold text-lg">Mr. & Mrs. Bride's Parents</p>
            <p className="font-sans text-[#5A1818]/80 text-sm">And all relatives & friends</p>
          </div>
        </div>

        <button 
          onClick={handleShare}
          className="inline-flex items-center px-8 py-4 bg-[#CFB53B] text-white rounded-full font-sans text-sm tracking-[0.1em] uppercase mb-16 hover:bg-[#8C7625] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <MessageCircle className="w-5 h-5 mr-3" />
          Share Invitation
        </button>

        <div className="w-24 h-[1px] bg-[#CFB53B]/50 mx-auto mb-8" />
        
        <p className="font-script text-4xl text-[#CFB53B] mb-2">Aditya & Priya</p>
        <p className="font-sans text-xs text-[#5A1818]/60 uppercase tracking-[0.3em]">
          Thank you
        </p>
      </div>
    </footer>
  );
}
