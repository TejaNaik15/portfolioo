import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { PinContainer } from '../components/Pin';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiExpress, SiTailwindcss, SiTypescript, SiJavascript, SiFirebase, SiVite } from 'react-icons/si';
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
    technologies: ['React Router v7', 'Typescript', 'Tailwind CSS'],
    githubLink: 'https://github.com/TejaNaik15/resume-analyzer-ai',
    liveDemoLink: 'https://resume-analyzer-ai-two.vercel.app/',
  },
  {
    id: 4,
    title: 'Career Change Suggestion Tool',
    description: 'The Career Change Suggestion tool is a whimsical web application designed to inspire users with creative and radically different career paths.',
    image: '/assets/career.png',
    technologies: ['React', 'Node.js', 'Express.js', 'Tailwind CSS'],
    githubLink: 'https://github.com/TejaNaik15/Career-Change-Suggestion-Tool',
    liveDemoLink: 'https://career-change-suggestion-tool-f.onrender.com/',
  },
  {
    id: 5,
    title: 'Cognify AI ChatBot',
    description: 'A Professional & elegant AI Chatbot built with framer motion, react.js and express.js.',
    image: '/assets/cogniify.png',
    technologies: ['React', 'Node.js', 'Tailwind CSS', 'Express.js'],
    githubLink: 'https://github.com/TejaNaik15/AI-Chatbot-MERN-APP',
    liveDemoLink: 'https://ai-chatbot-mern-app-frontend.onrender.com/',
  },
  {
    id: 6,
    title: 'ExpenseTracker',
    description: 'An expense tracking app with responsive design and smooth animations.',
    image: '/assets/expense.png',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    githubLink: 'https://github.com/TejaNaik15/ExpenseTracking',
    liveDemoLink: 'https://expense-tracking-two.vercel.app/',
  },
];

const getTechIcon = (tech) => {
  const iconProps = { size: 16, className: 'text-white' };
  switch (tech.toLowerCase()) {
    case 'react': return <SiReact {...iconProps} color="#61DAFB" />;
    case 'node.js': return <SiNodedotjs {...iconProps} color="#339933" />;
    case 'express.js': return <SiExpress {...iconProps} color="#ffffff" />;
    case 'tailwind css': return <SiTailwindcss {...iconProps} color="#06B6D4" />;
    case 'typescript': return <SiTypescript {...iconProps} color="#3178C6" />;
    case 'javascript': return <SiJavascript {...iconProps} color="#F7DF1E" />;
    case 'firebase': return <SiFirebase {...iconProps} color="#FFCA28" />;
    case 'vite': return <SiVite {...iconProps} color="#646CFF" />;
    case 'gsap': return <SiJavascript {...iconProps} color="#88CE02" />;
    case 'react router v7': return <SiReact {...iconProps} color="#CA4245" />;
    default: return <div className="w-4 h-4 bg-accent-blue rounded-full" />;
  }
};

const Projects = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });
  const [expandedId, setExpandedId] = useState(null);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 bg-primary-dark text-white overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={160} speed={0.1} particleBaseSize={70} sizeRandomness={1} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-accent-blue">
          A small selection of{' '}
          <span className="text-white">recent projects</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 max-w-7xl mx-auto">
          {projectsData.map(({ id, title, description, image, technologies, githubLink, liveDemoLink }) => (
            <div
              key={id}
              className="flex h-[32rem] w-full items-center justify-center sm:h-[41rem] lg:min-h-[32.5rem]"
            >
              <PinContainer
                title="GitHub"
                href={githubLink}
                icon={<FaGithub />}
              >
                <div className="relative mb-10 flex h-[30vh] w-full items-center justify-center overflow-hidden sm:h-[40vh] max-w-[500px]">
                  <div className="relative size-full overflow-hidden bg-[#13162d] lg:rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-purple-600/20" />
                  </div>
                  <img
                    src={image}
                    alt={title}
                    className="absolute bottom-0 z-10 w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <h1 className="line-clamp-1 text-base font-bold md:text-xl lg:text-2xl text-white">
                  {title}
                </h1>
                
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    expandedId === id ? 'h-auto' : 'h-16'
                  }`}
                >
                  <p
                    className="text-sm font-light lg:text-xl lg:font-normal text-gray-300 my-2"
                  >
                    {description}
                  </p>
                </div>
                
                <span
                  className="text-accent-blue cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleExpandClick(id)}
                >
                  {expandedId === id ? 'Show less' : 'More...'}
                </span>
                
                <div className="mb-3 mt-7 flex items-center justify-between">
                  <div className="flex items-center">
                    {technologies.map((tech, index) => (
                      <div
                        key={tech}
                        className="flex size-8 items-center justify-center rounded-full border border-white/[0.2] bg-black lg:size-10"
                        style={{ transform: `translateX(-${5 * index + 2}px)` }}
                        title={tech}
                      >
                        {getTechIcon(tech)}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <a 
                      href={liveDemoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent-blue flex text-sm md:text-xs lg:text-xl hover:text-white transition-colors"
                    >
                      Visit Site
                    </a>
                    <FaExternalLinkAlt className="ms-3 text-accent-blue" />
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
