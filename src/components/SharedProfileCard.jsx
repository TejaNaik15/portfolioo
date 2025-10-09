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
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
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
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      });
      (document.querySelector('#root') || document.body).appendChild(ghost);
      container.style.opacity = '0';
      container.style.transform = 'scale(0.8)';
      container.style.transition = 'none';


      const dx = end.left - start.left;
      const dy = end.top - start.top;
      const duration = 1.5;

      // Create smooth curved path animation
      const controlX = dx * 0.5 + (dx > 0 ? -150 : 150); // Curve to the side
      const controlY = dy * 0.3 - 80; // Slight upward arc
      
      const tl = gsap.timeline({
        onComplete: () => {
          target.appendChild(container);
          container.style.opacity = '1';
          container.style.transform = 'scale(1)';
          container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          ghost.remove();
          currentSlot.current = target;
        }
      });

      // Smooth visible curved movement
      tl.set(ghost, {
        transformOrigin: 'center center',
        scale: 1,
        rotation: 0
      })
      .to(ghost, {
        x: controlX,
        y: controlY,
        scale: 0.8,
        rotation: dx > 0 ? 15 : -15,
        duration: duration * 0.5,
        ease: 'power2.out'
      })
      .to(ghost, {
        x: dx,
        y: dy,
        scale: 1,
        rotation: 0,
        duration: duration * 0.5,
        ease: 'power2.inOut'
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
