import React, { useEffect, useRef } from 'react';
import './SmoothCursor.css';

const hasFinePointer = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;

const SmoothCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (!hasFinePointer()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let down = false;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };

    const loop = () => {
      cursor.current.x += (pos.current.x - cursor.current.x) * 0.18;
      cursor.current.y += (pos.current.y - cursor.current.y) * 0.18;
      ring.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    const onDown = () => { down = true; ring.classList.add('is-down'); };
    const onUp = () => { down = false; ring.classList.remove('is-down'); };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!hasFinePointer()) return null;

  return (
    <div className="cursor-root">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
};

export default SmoothCursor;
