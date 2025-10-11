import React, { useState, useEffect } from 'react';
import Particles from '../components/Particles';
import TiltedCard from '../components/TiltedCard';

const About = () => {
  const [terminalText, setTerminalText] = useState('');
  const fullText = `$ whoami
teja@developer:~$ Teja Naik

$ cat about_me.md
# Teja Naik - Full Stack Developer

**Age:** 22 years old
**Location:** India 
**Status:** Passionate Developer & Problem Solver

## What I Do:
-  Build scalable web applications
-  Turn ideas into digital reality
-  Focus on clean, efficient code
-  Create user-friendly experiences

## My Journey:
Started coding at 18, thought HTML was a programming language,
now I argue with semicolons for a living! 

$ ls current_projects/
ai-content-generator/  portfolio/  ai-resume-analyzer/

$ echo "Fun Fact"
I have a better relationship with my code editor
than with my alarm clock! ss

$ git status
On branch: caffeine-driven-development
Commits: "Fixed bug" x247, "It works on my machine" x89
Status: Turning coffee into features since 2021!

$ _`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative py-20 bg-primary-dark text-white overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={120} speed={0.08} particleBaseSize={60} sizeRandomness={1} />
      </div>
      <div className="relative z-10 container mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#00dfd8]">
          About <span className="text-white light:text-black">Me</span>
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <TiltedCard 
                  imageSrc="/assets/TINKU.png"
                  altText="Teja Naik"
                  captionText="Teja Naik - MERN Developer"
                  containerHeight="400px"
                  imageHeight="350px"
                  imageWidth="300px"
                  scaleOnHover={1.05}
                  rotateAmplitude={12}
                  showMobileWarning={false}
                />
              </div>
            </div>

            
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
                  
                  <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-t-lg">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-gray-400 text-sm font-mono">About Him</div>
                    <div className="w-12"></div>
                  </div>
                  
                  
                  <div className="p-6 font-mono text-sm leading-relaxed">
                    <pre className="text-green-400 whitespace-pre-wrap">
                      {terminalText}
                      <span className="animate-pulse">|</span>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#00dfd8] to-[#0066cc] p-6 rounded-2xl shadow-2xl max-w-2xl text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-xl font-semibold text-white mb-2">
                "I speak fluent JavaScript, but now I'm learning to speak to humans"
              </p>
              <div className="text-sm text-gray-200 opacity-80">
                - Still debugging social interactions 🐛
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
