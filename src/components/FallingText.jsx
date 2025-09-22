import React, { useEffect, useRef, useState } from 'react';
import './FallingText.css';

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  gravity = 0.6,
  fontSize = '1rem',
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);
  const rafRef = useRef(null);

  // Build the text spans
  useEffect(() => {
    if (!textRef.current) return;
    const words = String(text).split(' ');
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // Trigger logic
  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Lightweight physics (no dependencies)
  useEffect(() => {
    if (!effectStarted) return;
    const container = containerRef.current;
    const words = Array.from(textRef.current.querySelectorAll('.word'));
    const containerRect = container.getBoundingClientRect();

    // Prepare absolute positioning and initial velocities
    const items = words.map((el) => {
      const r = el.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      const x = r.left - containerRect.left + w / 2;
      const y = r.top - containerRect.top + h / 2;
      el.style.position = 'absolute';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = 'translate(-50%, -50%)';
      return {
        el,
        x,
        y,
        w,
        h,
        vx: (Math.random() - 0.5) * 50, // px/s
        vy: 0,
        ang: 0,
        vang: (Math.random() - 0.5) * 1, // rad/s
      };
    });

    const bg = container.querySelector('.falling-text-canvas');
    if (bg) bg.style.background = backgroundColor;

    let last = performance.now();
    const restitution = 0.6;

    const step = (now) => {
      const dt = Math.min(0.032, (now - last) / 1000); // clamp dt to avoid jumps
      last = now;
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 120);

      items.forEach((it) => {
        it.vy += gravity * 980 * dt; // gravity px/s^2 (980 ~ 1g)
        it.x += it.vx * dt;
        it.y += it.vy * dt;
        it.ang += it.vang * dt;

        // Collisions with walls
        const halfW = it.w / 2;
        const halfH = it.h / 2;
        // Floor
        if (it.y + halfH > height) {
          it.y = height - halfH;
          it.vy *= -restitution;
          it.vx *= 0.98;
        }
        // Ceiling
        if (it.y - halfH < 0) {
          it.y = halfH;
          it.vy *= -restitution;
        }
        // Left wall
        if (it.x - halfW < 0) {
          it.x = halfW;
          it.vx *= -restitution;
        }
        // Right wall
        if (it.x + halfW > width) {
          it.x = width - halfW;
          it.vx *= -restitution;
        }

        it.el.style.left = `${it.x}px`;
        it.el.style.top = `${it.y}px`;
        it.el.style.transform = `translate(-50%, -50%) rotate(${it.ang}rad)`;
      });

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [effectStarted, gravity, backgroundColor]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
