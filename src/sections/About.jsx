import React, { useState, useEffect } from 'react';
import Particles from '../components/Particles';
import ProfileCard from '../components/ProfileCard';

const About = () => {
  const [terminalText, setTerminalText] = useState('');
  const fullText = `$ whoami
teja@developer:~$ Teja Naik

$ cat about_me.md
# Teja Naik - Full Stack Developer

**Age:** 22 years old
**Location:** India 🇮🇳
**Status:** Passionate Developer & Problem Solver

## What I Do:
- 🚀 Build scalable web applications
- 💡 Turn ideas into digital reality
- 🎯 Focus on clean, efficient code
- 🌟 Create user-friendly experiences

## My Journey:
Started coding at 18, fell in love with JavaScript,
now building full-stack applications with MERN.

$ ls current_projects/
portfolio/  e-commerce-app/  chat-application/

$ echo "Fun Fact"
I debug code faster than I debug my life! 😄

$ git status
On branch: continuous-learning
Commits: 1000+ problems solved
Status: Ready for new challenges!

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
            {/* Profile Card Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <ProfileCard 
                  name="Teja Naik" 
                  title="MERN Developer" 
                  handle="tejanaik"
                />
              </div>
            </div>

            {/* Terminal Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-t-lg">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-gray-400 text-sm font-mono">terminal</div>
                    <div className="w-12"></div>
                  </div>
                  
                  {/* Terminal Content */}
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

          {/* Funny Quote Section */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl shadow-2xl max-w-2xl text-center transform hover:scale-105 transition-transform duration-300">
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