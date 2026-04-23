"use client";

import { MessageCircle } from "lucide-react";

export default function Footer() {
  const handleShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("You are invited to Aditya and Priya's Wedding Celebration! View details here: ");
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
  };

  return (
    <footer className="bg-white py-16 text-center border-t border-[#E6D0D0]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <div className="w-16 h-16 mx-auto mb-6 opacity-80">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="#D4AF37"/>
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-[#4A4A4A] mb-4">With Best Compliments From</h3>
          <p className="font-sans text-[#7A7A7A] mb-2 font-semibold">Mr. Sharma & Mrs. Sharma</p>
          <p className="font-sans text-[#7A7A7A] mb-2 font-semibold">Mr. Verma & Mrs. Verma</p>
          <p className="font-sans text-[#7A7A7A] italic mt-4">And All Family & Friends</p>
        </div>

        <button 
          onClick={handleShare}
          className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white rounded-full font-sans mb-12 hover:bg-[#128C7E] transition-colors shadow-md"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Share on WhatsApp
        </button>

        <p className="font-serif text-3xl text-[#D4AF37] mb-2">Aditya & Priya</p>
        <p className="font-sans text-sm text-[#7A7A7A] uppercase tracking-widest">
          We look forward to celebrating with you
        </p>
      </div>
    </footer>
  );
}
