import React, { useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import Particles from '../components/Particles';
import OrbitSkills from '../components/OrbitSkills';

const cdn = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const Skills = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const items = useMemo(() => [
    { id: 'html5', name: 'HTML5', img: cdn('html5/html5-original.svg'), height: 280, url: 'https://developer.mozilla.org/docs/Web/HTML' },
    { id: 'css3', name: 'CSS3', img: cdn('css3/css3-original.svg'), height: 260, url: 'https://developer.mozilla.org/docs/Web/CSS' },
    { id: 'javascript', name: 'JavaScript', img: cdn('javascript/javascript-original.svg'), height: 300, url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
    { id: 'typescript', name: 'TypeScript', img: cdn('typescript/typescript-original.svg'), height: 280, url: 'https://www.typescriptlang.org' },
    { id: 'react', name: 'React', img: cdn('react/react-original.svg'), height: 320, url: 'https://react.dev' },
    { id: 'nodejs', name: 'Node.js', img: cdn('nodejs/nodejs-original.svg'), height: 260, url: 'https://nodejs.org' },
    { id: 'java', name: 'Java', img: cdn('java/java-original.svg'), height: 300, url: 'https://www.oracle.com/java/' },
    { id: 'mongodb', name: 'MongoDB', img: cdn('mongodb/mongodb-original.svg'), height: 300, url: 'https://mongodb.com' },
    { id: 'express', name: 'Express.js', img: cdn('express/express-original.svg'), height: 260, url: 'https://expressjs.com' },
    { id: 'tailwind', name: 'Tailwind CSS', img: cdn('tailwindcss/tailwindcss-original.svg'), height: 280, url: 'https://tailwindcss.com' },
    { id: 'nextjs', name: 'Next.js', img: cdn('nextjs/nextjs-original.svg'), height: 300, url: 'https://nextjs.org' },
    { id: 'git', name: 'Git', img: cdn('git/git-original.svg'), height: 260, url: 'https://git-scm.com' },
    { id: 'github', name: 'GitHub', img: cdn('github/github-original.svg'), height: 260, url: 'https://github.com' },
    { id: 'bootstrap', name: 'Bootstrap', img: cdn('bootstrap/bootstrap-original.svg'), height: 260, url: 'https://getbootstrap.com' },
    { id: 'vite', name: 'Vite', img: cdn('vite/vite-original.svg'), height: 260, url: 'https://vitejs.dev' },
    { id: 'c', name: 'C Programming', img: cdn('c/c-original.svg'), height: 240, url: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
    { id: 'python', name: 'Python', img: cdn('python/python-original.svg'), height: 300, url: 'https://python.org' },
    { id: 'firebase', name: 'Firebase', img: cdn('firebase/firebase-plain.svg'), height: 260, url: 'https://firebase.google.com' },
    { id: 'reactrouter', name: 'React Router', img: cdn('reactrouter/reactrouter-plain.svg'), height: 240, url: 'https://reactrouter.com' },
    { id: 'figma', name: 'Figma', img: cdn('figma/figma-original.svg'), height: 260, url: 'https://www.figma.com' },
  ], []);


  const images = useMemo(() => items.map((it) => ({ src: it.img, label: it.name, href: it.url })), [items]);

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen bg-primary-dark text-white p-4 md:p-8 flex flex-col items-center justify-center transition-opacity-transform overflow-hidden scroll-mt-28 md:scroll-mt-40 will-change-scroll">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles 
          className="w-full h-full" 
          alphaParticles={true} 
          particleCount={window.innerWidth <= 768 ? 150 : 500} 
          speed={0.1} 
          particleSpread={15}
          particleBaseSize={window.innerWidth <= 768 ? 50 : 80} 
          sizeRandomness={1}
          moveParticlesOnHover={window.innerWidth > 768}
          particleHoverFactor={1.2}
          particleColors={['#00dfd8', '#945DD6', '#ffffff']}
          interactive={window.innerWidth > 768}
        />
      </div>

      <div className="relative z-10 container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-blue">My Skills</h1>
        
        <div className="mx-auto w-full">
          <OrbitSkills
            items={images}
            ringSizes={[44, 54, 64]} 
            ringSpeeds={[16, 22, 30]} 
          />
        </div>

        
        <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-3 gap-3 px-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {items.map((it) => (
            <a
              key={it.id}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-legend-item group flex min-w-0 items-center gap-2 rounded-lg p-2 ring-1 transition"
            >
              <img src={it.img} alt={it.name} className="h-6 w-6 flex-shrink-0 object-contain" />
              <span className="skill-legend-label truncate text-[10px] sm:text-xs" title={it.name}>{it.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
