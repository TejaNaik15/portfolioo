import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

const MusicContext = createContext({ isPlaying: false, toggleMusic: () => {} });

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef({ osc: [], gain: null });

  const startMusic = async () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return; // no audio
      audioCtxRef.current = new Ctx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') await ctx.resume();

    // Create gentle ambient chord (C major): C4, E4, G4
    const freqs = [261.63, 329.63, 392.00];
    const gain = ctx.createGain();
    gain.gain.value = 0.02; // low volume
    gain.connect(ctx.destination);
    nodesRef.current.gain = gain;

    nodesRef.current.osc = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(oscGain);
      oscGain.gain.value = 0.33; // mix
      oscGain.connect(gain);
      osc.start();
      return osc;
    });

    setIsPlaying(true);
  };

  const stopMusic = async () => {
    nodesRef.current.osc.forEach((o) => { try { o.stop(); } catch {} });
    nodesRef.current.osc = [];
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state !== 'closed') {
      try { await ctx.suspend(); } catch {}
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) stopMusic(); else startMusic();
  };

  const value = useMemo(() => ({ isPlaying, toggleMusic }), [isPlaying]);
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusic = () => useContext(MusicContext);
