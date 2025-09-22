import React from 'react';
import { motion } from 'framer-motion';

const spring = { type: 'spring', stiffness: 600, damping: 18 };

const Letter = ({ ch, idx }) => (
  <motion.span
    whileHover={{ y: -6, scale: 1.12, rotate: -6, color: '#2563eb' }}
    transition={spring}
    className="inline-block cursor-default will-change-transform name-gradient"
    style={{ transitionProperty: 'transform, color' }}
  >
    {ch}
  </motion.span>
);

const AnimatedName = ({ text }) => {
  const letters = text.split('');
  return (
    <span className="inline-flex flex-wrap gap-x-1">
      {letters.map((ch, i) => (
        ch === ' ' ? (
          <span key={`s-${i}`} className="w-1" />
        ) : (
          <Letter key={i} ch={ch} idx={i} />
        )
      ))}
    </span>
  );
};

export default AnimatedName;
