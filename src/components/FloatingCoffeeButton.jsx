import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoffee } from 'react-icons/fa';

const COFFEE_URL ='https://buymeacoffee.com/tejanaik15';

const FloatingCoffeeButton = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const footerEl = document.getElementById('footer');
    const heroEl = document.getElementById('home');
    const observers = [];

    if (footerEl) {
      const footerObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setFooterVisible(entry.isIntersecting));
      }, { root: null, threshold: 0.01 });
      footerObs.observe(footerEl);
      observers.push(footerObs);
    }

    if (heroEl) {
      const heroObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setHeroVisible(entry.isIntersecting));
      }, { root: null, threshold: 0.2 });
      heroObs.observe(heroEl);
      observers.push(heroObs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = !footerVisible && !heroVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="coffee"
          href={COFFEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-50 right-3 bottom-3 md:right-5 md:bottom-5 group"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          aria-label="Buy me a coffee"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue blur-lg opacity-50 group-hover:opacity-80"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full bg-secondary-dark/90 backdrop-blur border border-white/10 shadow-xl hover:shadow-2xl transition-shadow">
              <FaCoffee className="text-accent-yellow w-4 h-4 md:w-5 md:h-5" />
              <span className="text-white font-semibold text-sm md:text-base">Buy me a coffee</span>
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCoffeeButton;
