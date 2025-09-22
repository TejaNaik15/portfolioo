import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ShinyText from '../components/ShinyText';
import Particles from '../components/Particles';
import SocialIcons from '../components/SocialIcons';
import ScrollReveal from '../components/ScrollReveal';
import BoxReveal from '../components/BoxReveal';
import { BorderBeam } from '@/components/magicui/border-beam.jsx';

const About = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });
  const containerRef = sectionRef;

  const from = "'wght' 350, 'opsz' 14";
  const to = "'wght' 900, 'opsz' 72";

  return (
    <section id="about" ref={sectionRef} className="relative py-16 text-white px-4 bg-primary-dark overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={120} speed={0.08} particleBaseSize={60} sizeRandomness={1} />
      </div>
      <div className="relative z-10 container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div id="profile-about-slot" className="min-h-[320px] order-1 md:order-none" />
        <div className="order-2 md:order-none">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-accent-blue">About Me</h2>
          <div className="mb-6">
            <ShinyText text="A glimpse into who I am" speed={6} className="text-2xl md:text-3xl" />
          </div>
          <div className="space-y-3 text-text-muted leading-normal">
            <BoxReveal boxColor="#00dfd8" duration={0.6} delay={0} direction="ltr">
              <p className="max-w-prose text-base md:text-lg">
                I'm a passionate recent graduate embarking on my journey as a MERN stack developer. Currently honing my skills in <span className="font-semibold text-[#00dfd8]">MongoDB</span>, <span className="font-semibold text-[#00dfd8]">Express.js</span>, <span className="font-semibold text-[#00dfd8]">React</span>, and <span className="font-semibold text-[#00dfd8]">Node.js</span>, I'm also strengthening my foundation in <span className="font-semibold text-[#00dfd8]">Data Structures and Algorithms</span>.
              </p>
            </BoxReveal>
            <BoxReveal boxColor="#945DD6" duration={0.6} delay={0.15} direction="rtl" overlayStyle={{ background: 'linear-gradient(90deg, #945DD6 0%, #00dfd8 100%)' }}>
              <p className="max-w-prose text-base md:text-lg">
                As a fresher eager to make my mark in the tech world, I bring fresh perspectives, boundless enthusiasm, and a genuine love for problem-solving through code. I'm always excited to learn new technologies, collaborate on innovative projects, and contribute meaningfully to development teams.
              </p>
            </BoxReveal>
            <BoxReveal boxColor="#00dfd8" duration={0.6} delay={0.3} direction="ltr" overlayStyle={{ background: 'linear-gradient(90deg, #00dfd8 0%, rgba(0,223,216,0.6) 60%, transparent 100%)' }}>
              <p className="max-w-prose text-base md:text-lg">
                My goal is to build user-friendly applications that make a real difference while continuously growing as a developer. What truly drives me is the constant evolution of technology and the endless possibilities it brings.
              </p>
            </BoxReveal>
          </div>
          
          {/* Funny Quote Section */}
          <div className="mt-8 mb-6 p-4 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
            <p className="text-center text-xl md:text-2xl font-black text-accent-blue leading-relaxed">
              "I speak fluent JavaScript, but I'm still learning to communicate with humans." 
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/assets/resume.pdf"
              download
              className="relative inline-flex items-center gap-2 bg-accent-blue text-white px-6 py-3 rounded-full text-lg hover:bg-white/20 border border-accent-blue/40 transition-colors duration-300 overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1z"/><path d="M5 20a2 2 0 0 1-2-2v-2a1 1 0 1 1 2 0v2h14v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H5z"/></svg>
                 Resume
              </span>
              <span className="absolute inset-0 rounded-full pointer-events-none" aria-hidden>
                <BorderBeam duration={8} size={120} colors={["#13ADC7","#945DD6","#FF3C78"]} />
              </span>
            </a>
            <div className="flex items-center gap-3">
              <SocialIcons type="instagram" link="https://www.instagram.com/eren_yeager9_" />
              <SocialIcons type="twitter" link="https://x.com/TEJA_NAIKK" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
