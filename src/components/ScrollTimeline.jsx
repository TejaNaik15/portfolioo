import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';



const ScrollTimeline = ({
  events,
  className = '',
  parallaxIntensity = 0.1,
  progressIndicator = true,
  progressLineWidth = 3,
  progressLineCap = 'round',
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const progressHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.floor(v * events.length);
      if (idx !== activeIndex && idx >= 0 && idx < events.length) setActiveIndex(idx);
    });
    return () => unsub && unsub();
  }, [scrollYProgress, events.length, activeIndex]);

  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20, scale: 0.985 },
    whileInView: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
    }),
  }), []);

  return (
    <div ref={containerRef} className={cn('relative w-full overflow-visible', className)}>
  
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10 h-full" style={{ width: progressLineWidth }}>
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        {progressIndicator && (
          <>
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{ height: progressHeight, background: 'linear-gradient(to bottom, #13ADC7, #945DD6)', boxShadow: '0 0 14px rgba(148,93,214,0.42), 0 0 22px rgba(19,173,199,0.28)', borderRadius: progressLineCap === 'round' ? 9999 : 0, willChange: 'height' }}
            />
            
            <motion.div className="absolute z-20" style={{ top: progressHeight, left: '50%', translateX: '-50%', translateY: '-50%' }}>
              <motion.div
                className="rounded-full"
                style={{ width: 16, height: 16, background: 'radial-gradient(circle, rgba(148,93,214,0.8) 0%, rgba(19,173,199,0.5) 45%, rgba(19,173,199,0) 75%)', boxShadow: '0 0 12px 3px rgba(148,93,214,0.5), 0 0 22px 8px rgba(19,173,199,0.3)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </>
        )}
      </div>

      <div className="relative z-20">
        {events.map((event, index) => {
          const yOffset = useTransform(smoothProgress, [0, 1], [parallaxIntensity * 70, -parallaxIntensity * 70]);
          const desktopAlt = index % 2 === 0 ? 'lg:justify-start' : 'lg:flex-row-reverse lg:justify-start';
          return (
            <div key={`${event.title}-${index}`} className={cn('relative flex items-center mb-14 md:mb-20 py-2 flex-col lg:flex-row', desktopAlt)}>
              
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-30">
                <motion.div
                  className={cn('w-5 h-5 rounded-full border-4 bg-primary-dark flex items-center justify-center', index <= activeIndex ? 'border-accent-blue' : 'border-white/20')}
                  animate={index <= activeIndex ? { scale: [1, 1.18, 1], boxShadow: ['0 0 0px rgba(19,173,199,0)', '0 0 10px rgba(19,173,199,0.55)', '0 0 0px rgba(19,173,199,0)'] } : {}}
                  transition={{ duration: 0.85, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
              </div>

              
              <motion.div
                className={cn('relative z-30 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 transition-all duration-300 w-full lg:w-[calc(50%-44px)]', index % 2 === 0 ? 'lg:mr-[calc(50%+22px)]' : 'lg:ml-[calc(50%+22px)]', 'mt-10 lg:mt-0')}
                variants={cardVariants}
                custom={index}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: false, margin: '-100px' }}
                style={parallaxIntensity > 0 ? { y: yOffset, willChange: 'transform' } : undefined}
                whileHover={{ translateY: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.22)' }}
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="px-2 py-1 rounded-md bg-black/40 text-accent-blue text-sm font-semibold">
                      {event.year}
                    </div>
                    {event.subtitle && (
                      <span className="text-text-muted text-sm">{event.subtitle}</span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-text-muted mt-0.5 md:hidden">{event.subtitle}</p>
                  )}
                  <p className="text-text-muted mt-2 leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollTimeline;


function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

