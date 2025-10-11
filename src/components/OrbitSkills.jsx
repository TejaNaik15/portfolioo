import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const OrbitSkills = ({
  items = [],
  ringSizes = [48, 56, 64], 
  ringSpeeds = [18, 26, 34], 
}) => {
  const containerRef = useRef(null);
  const starCanvasRef = useRef(null);
  const ringRefs = useRef([]);
  const [size, setSize] = useState(600);
  const ringColors = ['#00dfd8', '#9ca3af', '#945DD6']; 

  const rings = useMemo(() => {
    
    const R = 3;
    const per = Math.ceil(items.length / R) || 1;
    return [
      items.slice(0, per),
      items.slice(per, per * 2),
      items.slice(per * 2, per * 3),
    ];
  }, [items]);

  useEffect(() => {
  
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize(Math.min(rect.width, rect.height));
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);


    let rafId;
    const ctx = starCanvasRef.current ? starCanvasRef.current.getContext('2d') : null;
    let stars = [];
    const initStars = () => {
      if (!ctx || !starCanvasRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth, clientHeight } = starCanvasRef.current;
      starCanvasRef.current.width = clientWidth * dpr;
      starCanvasRef.current.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
      const count = Math.floor((clientWidth * clientHeight) / 8000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        r: Math.random() * 1.5 + 0.3,
        v: Math.random() * 0.15 + 0.05,
        a: Math.random() * 0.4 + 0.2,
      }));
    };
    const draw = () => {
      if (!ctx || !starCanvasRef.current) return;
      const { clientWidth, clientHeight } = starCanvasRef.current;
      ctx.clearRect(0, 0, clientWidth, clientHeight);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      stars.forEach((s) => {
        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.v;
        if (s.y > clientHeight + 2) s.y = -2;
      });
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };
    initStars();
    draw();

    
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

  
    ringRefs.current.forEach((el, idx) => {
      if (!el) return;
      const duration = ringSpeeds[idx] || ringSpeeds[ringSpeeds.length - 1] || 28;
      const clockwise = idx % 2 === 0; 
      gsap.to(el, {
        rotate: clockwise ? 360 : -360,
        duration,
        ease: 'none',
        repeat: -1,
      });

      
      const anchors = el.querySelectorAll('a');
      gsap.to(anchors, {
        y: idx % 2 === 0 ? 6 : -6,
        duration: 2.2 + idx * 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.1, from: 'random' },
      });
    });

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
      ringRefs.current.forEach((el) => el && gsap.killTweensOf(el));
    };
  }, [rings.length]);

  
  const renderRing = (items, radius, index) => {
    const angleStep = (2 * Math.PI) / items.length;
    return (
      <div
        key={index}
        ref={(el) => (ringRefs.current[index] = el)}
        className="absolute inset-0"
        style={{
          transformOrigin: '50% 50%',
          filter: `drop-shadow(0 0 10px ${ringColors[index] || '#ffffff20'}) drop-shadow(0 0 20px ${ringColors[index] || '#ffffff10'})`,
        }}
      >
        {items.map((it, i) => {
          const angle = i * angleStep;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const sizePx = ringSizes[index] || ringSizes[ringSizes.length - 1] || 56;
          const needsInvert = /github|express|react router/i.test(it.label || '');
          return (
            <a
              key={`${it.label}-${i}`}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute block -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/30 ring-1 ring-white/10 backdrop-blur hover:bg-white/10 transition"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              title={it.label}
            >
              
              <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100" style={{
                boxShadow: `0 0 14px ${(ringColors[index] || '#00dfd8')}55, 0 0 28px ${(ringColors[index] || '#945DD6')}40`
              }} />
              <img
                src={it.src}
                alt={it.label}
                className="object-contain"
                style={{
                  height: sizePx,
                  width: sizePx,
                  padding: Math.max(6, Math.round(sizePx * 0.15)),
                  filter: needsInvert ? 'invert(1) brightness(1.2)' : 'none',
                }}
              />
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative mx-auto flex w-full items-center justify-center">
      
      <div className="orbit-surface relative aspect-square w-[92vw] max-w-[900px] sm:w-[85vw] md:w-[70vw] lg:w-[60vw]">
        
        <canvas ref={starCanvasRef} className="absolute inset-0 h-full w-full rounded-full" />
        
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,223,216,0.12),rgba(148,93,214,0.06)_45%,transparent_70%)]" />
        
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-400/40 to-purple-500/40 ring-1 ring-white/10" />
    
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: 'var(--orbitRing)' }} />
          <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: 'var(--orbitRing)' }} />
          <div className="absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: 'var(--orbitRing)' }} />
        </div>
        
        {renderRing(rings[0], size * 0.25, 0)}
        {renderRing(rings[1], size * 0.34, 1)}
        {renderRing(rings[2], size * 0.42, 2)}
      </div>
    </div>
  );
};

export default OrbitSkills;
