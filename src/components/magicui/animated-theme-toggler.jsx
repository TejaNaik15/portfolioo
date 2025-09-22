import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext.jsx';

export const AnimatedThemeToggler = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-secondary-dark/70 backdrop-blur shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 ${className}`}
   >
      <span className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue opacity-50 blur-md" aria-hidden />
      <span className="absolute inset-[3px] rounded-full bg-primary-dark/80 border border-white/10" aria-hidden />
      <AnimatePresence initial={false} mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="relative z-10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#F4D03F" />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="relative z-10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="#F59E0B" />
              <g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2v2"/><path d="M12 20v2"/>
                <path d="M2 12h2"/><path d="M20 12h2"/>
                <path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/>
                <path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/>
              </g>
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default AnimatedThemeToggler;
