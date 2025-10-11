import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const Column = ({ images, y }) => {
  return (
    <motion.div
      className="relative flex h-full w-1/3 sm:w-1/4 min-w-[140px] sm:min-w-[180px] md:min-w-[200px] flex-col gap-4 sm:gap-6"
      style={{ y }}
    >
      {images.map((it, i) => {
        const src = typeof it === 'string' ? it : it.src;
        const label = typeof it === 'string' ? '' : it.label || '';
        const href = typeof it === 'string' ? undefined : it.href;
        return (
          <div key={i} className="group relative aspect-square w-full overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/5">
          
            <a href={href} target={href ? '_blank' : undefined} rel={href ? 'noopener noreferrer' : undefined} aria-label={label || 'skill'} className="absolute inset-0">
            
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-transparent" />
              <img src={src} alt={label || 'image'} className="pointer-events-none h-full w-full object-contain p-4 sm:p-6" />
            </a>
            {label && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 shadow-lg">
                {label}
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};


const Skiper30 = ({ images = [] }) => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  const { height, width } = dimension;
  const isSmall = width < 640; 
  const f1 = isSmall ? 0.6 : 1.0;  
  const f2 = isSmall ? 0.9 : 1.6;
  const f3 = isSmall ? 0.5 : 0.9;
  const f4 = isSmall ? 0.8 : 1.4;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * f1]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * f2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * f3]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * f4]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const pool = images.length ? images : [];
  
  const cols = 4;
  const perCol = Math.ceil(pool.length / cols);
  const col1 = pool.slice(0, perCol);
  const col2 = pool.slice(perCol, perCol * 2);
  const col3 = pool.slice(perCol * 2, perCol * 3);
  const col4 = pool.slice(perCol * 3, perCol * 4);

  return (
    <section className="w-full bg-gradient-to-b from-transparent via-black/40 to-black text-white">
      <div ref={gallery} className="relative box-border flex h-[120vh] sm:h-[130vh] md:h-[150vh] gap-4 sm:gap-6 overflow-hidden px-4 sm:px-6 md:px-8 py-8">
        <Column images={col1} y={y} />
        <Column images={col2} y={y2} />
        <Column images={col3} y={y3} />
        <Column images={col4} y={y4} />
      </div>
    </section>
  );
};

export default Skiper30;
