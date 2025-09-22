import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_SRC = '/assets/call_your_name.mp3';

export const MusicToggle = ({ className = '' }) => {
  const audioRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(DEFAULT_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    const onCanPlay = () => setReady(true);
    audio.addEventListener('canplaythrough', onCanPlay, { once: true });
    return () => { audio.pause(); audioRef.current = null; };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };


  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-label="Toggle music"
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-secondary-dark/70 backdrop-blur shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink/60 ${className}`}
    >
      <span className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue opacity-40 blur-md" aria-hidden />
      <span className="absolute inset-[3px] rounded-full bg-primary-dark/80 border border-white/10" aria-hidden />
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.span key={playing ? 'pause' : 'play'} initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:.8 }} transition={{ type:'spring', stiffness:320, damping:18 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {playing ? (
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#F59E0B" />
              ) : (
                <path d="M8 5v14l11-7-11-7z" fill="#22C55E" />
              )}
            </svg>
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  );
};

export default MusicToggle;
