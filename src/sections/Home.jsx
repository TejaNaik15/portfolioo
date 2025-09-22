import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import ProfileCard from '../components/ProfileCard';
import SocialIcons from '../components/SocialIcons';
import ShinyText from '../components/ShinyText';
import AnimatedName from '../components/AnimatedName.jsx';
import { BorderBeam } from '@/components/magicui/border-beam.jsx';
import { MusicToggle } from '@/components/magicui/music-toggle.jsx';
import Particles from '../components/Particles';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler.jsx';

const Home = () => {
  const typeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    const tl = gsap.timeline({ repeat: -1 });
    const phrases = [
      'Web Development',
      'Frontend Development',
      'Backend Development',
    ];
    phrases.forEach((p) => {
      tl.to(typeRef.current, { duration: 1.2, text: p, ease: 'none' })
        .to(typeRef.current, { duration: 0.8, text: p + ' ', ease: 'none', repeat: 2, yoyo: true })
        .to(typeRef.current, { duration: 0.8, text: '', ease: 'none', delay: 0.4 });
    });
    gsap.fromTo(
      headingRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <section id="home" className="relative bg-primary-dark min-h-screen flex items-center text-white overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0">
        <Particles className="w-full h-full" interactive={true} moveParticlesOnHover={true} alphaParticles={true} particleCount={160} speed={0.1} particleBaseSize={70} sizeRandomness={1} />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 ref={headingRef} className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hi, I am<br />
            <span>
              <AnimatedName text="Keloth Teja Naik" />
            </span>
          </h1>
           <p ref={subRef} className="text-lg md:text-2xl text-text-muted">
            I'm into <span className="text-white"><span ref={typeRef} className="typing-gradient border-r-2 border-white pr-1" /></span>
          </p>
          <ShinyText text="I’m a passionate MERN Stack Developer specializing in building modern, responsive, and scalable web applications." speed={6} className="text-2xl md:text-3xl mb-2" />
         
          <div className="flex items-center gap-6 pt-2">
            <SocialIcons type="linkedin" link="https://www.linkedin.com/in/teja-naik-0b3021282" />
            <SocialIcons type="email" link="tinkuteja740@gmail.com" />
            <SocialIcons type="github" link="https://github.com/TejaNaik15" />
          </div>
          <div className="flex items-center gap-3">
            <a href="#contact" className="relative inline-block bg-accent-blue text-white px-6 py-3 rounded-full text-lg hover:bg-white/20 border border-accent-blue/40 transition-colors duration-300 overflow-hidden">
              <span className="relative z-10">Let’s Talk</span>
              <span className="absolute inset-0 rounded-full pointer-events-none" aria-hidden>
                <BorderBeam duration={8} size={120} colors={["#13ADC7","#945DD6","#FF3C78"]} />
              </span>
            </a>
            <AnimatedThemeToggler />
            <MusicToggle />
          </div>
        </div>
        <div id="profile-home-slot" className="md:justify-self-end min-h-[360px]" />
      </div>
    </section>
  );
};

export default Home;
