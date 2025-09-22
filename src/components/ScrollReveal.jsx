import React, { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Lightweight className merge utility to avoid external dependency
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const sizeClasses = {
  sm: 'text-lg md:text-xl',
  md: 'text-xl md:text-2xl lg:text-3xl',
  lg: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
  xl: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
  '2xl': 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const variantClasses = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  primary: 'text-primary',
};

function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  staggerDelay = 0.05,
  threshold = 0.5,
  duration = 0.8,
  springConfig = { damping: 25, stiffness: 100, mass: 1 },
  size = 'lg',
  align = 'left',
  variant = 'default',
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: threshold, once: false });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotation = useTransform(scrollYProgress, [0, 0.5, 1], [baseRotation, 0, 0]);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text
      .split(/(\s+)/)
      .map((part, index) => ({
        value: part,
        isSpace: /^\s+$/.test(part) && part.length > 0,
        originalIndex: index,
      }))
      .filter((item) => item.value.length > 0);
  }, [children]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { ...springConfig, duration },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate: rotation }}
      className={cn('my-3 md:my-4 transform-gpu', containerClassName)}
    >
      <motion.p
        className={cn(
          'leading-relaxed font-medium md:font-semibold',
          sizeClasses[size],
          alignClasses[align],
          variantClasses[variant],
          'text-text-muted',
          textClassName
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {splitText.map((item) =>
          item.isSpace ? (
            <span key={`space-${item.originalIndex}`}>{item.value}</span>
          ) : (
            <motion.span key={`word-${item.originalIndex}`} className="inline-block" variants={wordVariants}>
              {item.value}
            </motion.span>
          )
        )}
      </motion.p>
    </motion.div>
  );
}

export default ScrollReveal;
