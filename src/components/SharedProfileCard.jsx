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
      });
      (document.querySelector('#root') || document.body).appendChild(ghost);
      container.style.visibility = 'hidden';


      const dx = end.left - start.left;
      const dy = end.top - start.top;
      const distance = Math.hypot(dx, dy);
      const duration = Math.min(1.2, Math.max(0.6, distance / 900));

      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        onComplete: () => {
          target.appendChild(container);
          container.style.visibility = '';
          ghost.remove();
          currentSlot.current = target;
        }
      });

      tl.fromTo(
        ghost,
        { opacity: 1, transformOrigin: 'top left' },
        {
          x: dx,
          y: dy,
          opacity: 1,
          duration,
          ease: 'power1.inOut'
        }
      );
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
