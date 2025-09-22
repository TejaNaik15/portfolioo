import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = (options = {}, dependencies = []) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Add relative positioning for proper scroll offset calculation
    el.style.position = 'relative';

    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 85%',
            end: options.end || 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      
      const children = Array.from(el.children || []);
      if (children.length) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 24, rotateX: -6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: options.start || 'top 80%',
              end: options.end || 'top 25%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [options, ...dependencies]);

  return ref;
};

export default useScrollReveal;
