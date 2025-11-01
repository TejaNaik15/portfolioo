import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import Particles from '../components/Particles';
import TitleHeader from '../components/TitleHeader';
import { BallCanvas } from '../components/canvas';

const cdn = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const Skills = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const techStackIcons = useMemo(() => [
    { id: 'html5', name: 'HTML5', img: cdn('html5/html5-original.svg'), url: 'https://developer.mozilla.org/docs/Web/HTML' },
    { id: 'css3', name: 'CSS3', img: cdn('css3/css3-original.svg'), url: 'https://developer.mozilla.org/docs/Web/CSS' },
    { id: 'javascript', name: 'JavaScript', img: cdn('javascript/javascript-original.svg'), url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
    { id: 'typescript', name: 'TypeScript', img: cdn('typescript/typescript-original.svg'), url: 'https://www.typescriptlang.org' },
    { id: 'react', name: 'React', img: cdn('react/react-original.svg'), url: 'https://react.dev' },
    { id: 'nodejs', name: 'Node.js', img: cdn('nodejs/nodejs-original.svg'), url: 'https://nodejs.org' },
    { id: 'java', name: 'Java', img: cdn('java/java-original.svg'), url: 'https://www.oracle.com/java/' },
    { id: 'mongodb', name: 'MongoDB', img: cdn('mongodb/mongodb-original.svg'), url: 'https://mongodb.com' },
    { id: 'express', name: 'Express.js', img: cdn('express/express-original.svg'), url: 'https://expressjs.com' },
    { id: 'tailwind', name: 'Tailwind CSS', img: cdn('tailwindcss/tailwindcss-original.svg'), url: 'https://tailwindcss.com' },
    { id: 'nextjs', name: 'Next.js', img: cdn('nextjs/nextjs-original.svg'), url: 'https://nextjs.org' },
    { id: 'git', name: 'Git', img: cdn('git/git-original.svg'), url: 'https://git-scm.com' },
    { id: 'github', name: 'GitHub', img: cdn('github/github-original.svg'), url: 'https://github.com' },
    { id: 'bootstrap', name: 'Bootstrap', img: cdn('bootstrap/bootstrap-original.svg'), url: 'https://getbootstrap.com' },
    { id: 'vite', name: 'Vite', img: cdn('vite/vite-original.svg'), url: 'https://vitejs.dev' },
    { id: 'c', name: 'C Programming', img: cdn('c/c-original.svg'), url: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
    { id: 'python', name: 'Python', img: cdn('python/python-original.svg'), url: 'https://python.org' },
    { id: 'firebase', name: 'Firebase', img: cdn('firebase/firebase-plain.svg'), url: 'https://firebase.google.com' },
    { id: 'reactrouter', name: 'React Router', img: cdn('reactrouter/reactrouter-plain.svg'), url: 'https://reactrouter.com' },
    { id: 'figma', name: 'Figma', img: cdn('figma/figma-original.svg'), url: 'https://www.figma.com' },
  ], []);


  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen bg-primary-dark text-white px-4 md:px-8 py-16 flex flex-col items-center justify-center overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles 
          className="w-full h-full" 
          alphaParticles={true} 
          particleCount={window.innerWidth <= 768 ? 100 : 300} 
          speed={0.05} 
          particleSpread={10}
          particleBaseSize={window.innerWidth <= 768 ? 40 : 60} 
          sizeRandomness={1}
          moveParticlesOnHover={window.innerWidth > 768}
          particleHoverFactor={1.1}
          particleColors={['#00dfd8', '#945DD6', '#ffffff']}
          interactive={window.innerWidth > 768}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
          {techStackIcons.slice(0, 8).map((technology, index) => (
            <motion.div 
              className="w-16 h-16 md:w-20 md:h-20" 
              key={technology.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05 }}
            >
              <BallCanvas icon={technology.img} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
