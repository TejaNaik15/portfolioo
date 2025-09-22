import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ChromaGrid from '../components/ChromaGrid';
import { SiReact, SiNodedotjs, SiExpress, SiTailwindcss, SiTypescript, SiStyledcomponents, SiJavascript, SiFirebase, SiVite, SiReactrouter } from 'react-icons/si';
import Particles from '../components/Particles';

const projectsData = [
  {
    id: 1,
    title: 'AI-Powered Developer Assistant',
    description: 'This app allows users to chat with an AI assistant in real-time and store their chat history securely.',
    image: '/assets/Screenshot 2025-09-06 203810.png',
    technologies: ['React', 'Tailwind CSS', 'Firebase'],
    githubLink: 'https://github.com/TejaNaik15/CodeMentorAI',
    liveDemoLink: 'https://code-mentor-ai-neir.vercel.app/',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing projects, animations, and interactive UI components.',
    image: '/assets/Screenshot 2025-09-06 204252.png',
    technologies: ['React', 'Tailwind CSS', 'GSAP'],
    githubLink: 'https://github.com/TejaNaik15/React-Portfolio',
    liveDemoLink: 'https://react-portfolio-eight-sable.vercel.app/',
  },
  {
    id: 3,
    title: 'AI-Resume Analyzer',
    description: 'Upload your resume, analyze it, and view AI-driven insights such as scores, summaries, and improvement suggestions.',
    image: '/assets/Screenshot 2025-09-06 202225.png',
    technologies: ['React Router v7', 'Typescript', 'Tailwind CSS', 'Puter.js'],
    githubLink: 'https://github.com/TejaNaik15/resume-analyzer-ai',
    liveDemoLink: 'https://resume-analyzer-ai-two.vercel.app/',
  },
  {
    id: 4,
    title: 'Career Change Suggestion Tool',
    description: 'The Career Change Suggestion tool is a whimsical web application designed to inspire users with creative and radically different career paths based on their current job title.',
    image: '/assets/career.png',
    technologies: ['React', 'Node.js', 'Express.js','Tailwind CSS'],
    githubLink: 'https://github.com/TejaNaik15/Career-Change-Suggestion-Tool',
    liveDemoLink: 'https://career-change-suggestion-tool-f.onrender.com/',
  },
  {
    id: 5,
    title: 'Cognify AI ChatBot',
    description: 'A Professional & elegant AI Chatbot built with framer motion , react.js and ecpress.js.',
    image: '/assets/cogniify.png',
    technologies: ['React', 'Node.js', 'Tailwind CSS','Express.js'],
    githubLink: 'https://github.com/TejaNaik15/AI-Chatbot-MERN-APP',
    liveDemoLink: 'https://ai-chatbot-mern-app-frontend.onrender.com/',
  },
  {
    id: 6,
    title: 'ExpenseTracker',
    description: 'An expense tracking app with responsive design and smooth animations.',
    image: '/assets/expense.png',
    technologies: ['React', 'Tailwind CSS', 'Styled Components', 'Vite'],
    githubLink: 'https://github.com/TejaNaik15/ExpenseTracking',
    liveDemoLink: 'https://expense-tracking-two.vercel.app/',
  },
];

const colorPalette = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const techIconFor = (name) => {
  const key = String(name).toLowerCase();
  if (key.includes('react router')) return <SiReactrouter title="React Router" style={{ color: '#CA4245' }} />;
  if (key.includes('react')) return <SiReact title="React" style={{ color: '#61DAFB' }} />;
  if (key.includes('node')) return <SiNodedotjs title="Node.js" style={{ color: '#339933' }} />;
  if (key.includes('express')) return <SiExpress title="Express" style={{ color: '#000000' }} />;
  if (key.includes('tailwind')) return <SiTailwindcss title="Tailwind CSS" style={{ color: '#06B6D4' }} />;
  if (key.includes('typescript')) return <SiTypescript title="TypeScript" style={{ color: '#3178C6' }} />;
  if (key.includes('styled')) return <SiStyledcomponents title="Styled Components" style={{ color: '#DB7093' }} />;
  if (key.includes('gsap')) return <SiJavascript title="GSAP" style={{ color: '#88CE02' }} />;
  if (key.includes('firebase')) return <SiFirebase title="Firebase" style={{ color: '#FFCA28' }} />;
  if (key.includes('vite')) return <SiVite title="Vite" style={{ color: '#646CFF' }} />;
  if (key.includes('puter')) return <img src="https://puter.com/favicon.ico" alt="Puter.js" title="Puter.js" />;
  return null;
};

const Projects = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const items = projectsData.map((p, idx) => {
    const color = colorPalette[idx % colorPalette.length];
    const liveUrl = p.liveDemoLink && p.liveDemoLink !== '#' ? p.liveDemoLink : undefined;
    const codeUrl = p.githubLink && p.githubLink !== '#' ? p.githubLink : undefined;
    const techIcons = Array.isArray(p.technologies)
      ? p.technologies.map((t) => techIconFor(t)).filter(Boolean)
      : [];
    return {
      image: p.image,
      title: p.title,
      subtitle: p.description,
      handle: '',
      borderColor: color,
      gradient: `linear-gradient(145deg, ${color}, #000)`,
      liveUrl,
      codeUrl,
      url: liveUrl || codeUrl,
      techIcons,
    };
  });

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen bg-primary-dark text-white p-8 flex flex-col items-center justify-center overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={160} speed={0.1} particleBaseSize={70} sizeRandomness={1} />
      </div>
      <div className="relative container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-blue">My Projects</h1>
        <div className="flex justify-center">
          <ChromaGrid items={items} columns={3} rows={2} radius={280} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
