import React, { useEffect, useRef } from 'react';

export const BorderBeam = ({
  duration = 8,
  size = 140,
  colors = ['#13ADC7', '#945DD6', '#FF3C78'],
  className = 'border-beam',
  rotate = true,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--beam-size', `${size}px`);
    el.style.setProperty('--beam-duration', `${duration}s`);
    el.style.setProperty('--beam-colors', colors.join(','));
  }, [duration, size, colors]);

  return (
    <span
      ref={ref}
      className={`block ${className}`}
      style={{
        maskImage:
          'radial-gradient(var(--beam-size) var(--beam-size) at 0 0, black 20%, transparent 60%), linear-gradient(black, black)',
        WebkitMaskImage:
          'radial-gradient(var(--beam-size) var(--beam-size) at 0 0, black 20%, transparent 60%), linear-gradient(black, black)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        background: `conic-gradient(from 0deg, ${colors.join(',')})`,
        animation: rotate ? 'border-beam-rotate var(--beam-duration) linear infinite' : 'none'
      }}
      aria-hidden
      
      
    />
  );
};

export default BorderBeam;
