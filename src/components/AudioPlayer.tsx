"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt auto-play when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Auto-play prevented
            setIsPlaying(false);
            console.log("Autoplay prevented:", error);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder royalty free music
        loop
      />
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={togglePlay}
        className="fixed bottom-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gold/30 text-gold hover:bg-gold hover:text-white transition-colors duration-300"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </motion.button>
    </>
  );
}
