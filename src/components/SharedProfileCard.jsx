import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfileCard from './ProfileCard';

gsap.registerPlugin(ScrollTrigger);

const getSlot = (id) => document.getElementById(id);

const SharedProfileCard = () => {
  const [container] = useState(() => document.createElement('div'));
  const [mounted, setMounted] = useState(false);
  const currentSlot = useRef(null);

  useEffect(() => {
    
    const home = getSlot('profile-home-slot');
    const aboutSlot = getSlot('profile-about-slot');
    const aboutSection = document.getElementById('about');
    if (!home || !aboutSection || !aboutSlot) return;

    currentSlot.current = home;
    home.appendChild(container);
    setMounted(true);

    const flyTo = (target) => {
      if (!target || target === currentSlot.current) return;
      const start = container.getBoundingClientRect();
      const end = target.getBoundingClientRect();

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const endOffscreen = end.bottom < 0 || end.top > viewportH || end.right < 0 || end.left > viewportW;
      const startOffscreen = start.bottom < 0 || start.top > viewportH || start.right < 0 || start.left > viewportW;
      if (endOffscreen || startOffscreen) {
        target.appendChild(container);
        container.style.visibility = '';
        currentSlot.current = target;
        return;
      }

      
      const ghost = container.cloneNode(true);
      Object.assign(ghost.style, {
        position: 'fixed',
        left: `${start.left}px`,
        top: `${start.top}px`,
        width: `${start.width}px`,
        height: `${start.height}px`,
        zIndex: 1000,
        pointerEvents: 'none',
        willChange: 'transform, filter',
        backfaceVisibility: 'hidden'
      });
      (document.querySelector('#root') || document.body).appendChild(ghost);
      container.style.visibility = 'hidden';


      const dx = end.left - start.left;
      const dy = end.top - start.top;
      const duration = 1.2;

      // Create curved path that stays within viewport
      const midX = dx * 0.5;
      const midY = dy * 0.5 - 100; // Arc upward
      
      const tl = gsap.timeline({
        onComplete: () => {
          target.appendChild(container);
          container.style.visibility = '';
          ghost.remove();
          currentSlot.current = target;
        }
      });

      // Smooth fade out and in animation with scale
      tl.set(ghost, {
        transformOrigin: 'center center'
      })
      .to(ghost, {
        opacity: 0,
        scale: 0.3,
        rotation: 360,
        filter: 'brightness(2) blur(5px)',
        duration: duration * 0.4,
        ease: 'power2.in'
      })
      .set(ghost, {
        x: dx,
        y: dy,
        rotation: 0,
        filter: 'brightness(2) blur(5px)'
      })
      .to(ghost, {
        opacity: 1,
        scale: 1,
        filter: 'brightness(1) blur(0px)',
        duration: duration * 0.6,
        ease: 'back.out(1.7)'
      });
    };

    const toAbout = () => flyTo(aboutSlot);
    const toHome = () => flyTo(home);

    const st = ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top 75%',
      end: 'top 25%',
      onEnter: () => toAbout(),
      onLeaveBack: () => toHome(),
    });

    
    return () => { st.kill(); };
  }, [container]);

  if (!mounted) return null;
  return createPortal(
    <div className="w-full max-w-sm">
      <ProfileCard name="Teja Naik" title="MERN Developer" handle="tejanaik" />
    </div>,
    container
  );
};

export default SharedProfileCard;
