import React from 'react';
import { motion } from 'framer-motion';


const BoxReveal = ({
  children,
  boxColor = '#00dfd8', 
  duration = 0.6,
  delay = 0,
  className = '',
  direction = 'ltr', 
  overlayStyle = {}, 
}) => {
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.28, delay: delay + duration * 0.5 }}
        style={{ willChange: 'opacity' }}
      >
        {children}
      </motion.div>

      
      <motion.span
        aria-hidden
        className="absolute inset-0 block"
        initial={{ x: '0%' }}
        whileInView={{ x: direction === 'rtl' ? '-110%' : '110%' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ ease: 'easeInOut', duration, delay }}
        style={{ backgroundColor: boxColor, zIndex: 10, willChange: 'transform', ...overlayStyle }}
      />
    </div>
  );
};

export default BoxReveal;
