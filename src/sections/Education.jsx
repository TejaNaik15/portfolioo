import React from 'react';
import ScrollStack from '../components/ScrollStack';
import Particles from '../components/Particles';

const educationCards = [
  {
    title: 'CMR Institute of Technology',
    subtitle: 'B.Tech (AI & Data Science) • 2021 – 2025',
    badge: 'Current',
    content: (
      <div className="w-full">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
          CMR Institute of Technology
        </h3>
        <p className="text-lg sm:text-xl text-accent-blue mb-2 md:mb-3 font-semibold">
          B.Tech (Artificial Intelligence & Data Science)
        </p>
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-3 md:mb-4">
          Coursework in Web Development, Data Structures, Algorithms, DBMS, Operating Systems, and ML. Built multiple MERN projects and led tech fests.
        </p>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {['Web Development', 'Data Structures', 'Machine Learning', 'DBMS'].map((skill) => (
            <span key={skill} className="px-2 md:px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-xs md:text-sm border border-accent-blue/30">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Sri Chaitanya Junior College',
    subtitle: 'Intermediate (MPC) • 2019 – 2021',
    badge: 'Completed',
    content: (
      <div className="w-full">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
          Sri Chaitanya Junior College
        </h3>
        <p className="text-lg sm:text-xl text-accent-purple mb-2 md:mb-3 font-semibold">
          Intermediate (Mathematics, Physics, Chemistry)
        </p>
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-3 md:mb-4">
          Focused on Mathematics and Physics fundamentals. Participated in science exhibitions and olympiads.
        </p>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {['Mathematics', 'Physics', 'Chemistry', 'Problem Solving'].map((subject) => (
            <span key={subject} className="px-2 md:px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-xs md:text-sm border border-accent-purple/30">
              {subject}
            </span>
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Montessori High School',
    subtitle: 'SSC • Up to 2019',
    badge: 'Foundation',
    content: (
      <div className="w-full">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
          Montessori High School, Khammam
        </h3>
        <p className="text-lg sm:text-xl text-accent-yellow mb-2 md:mb-3 font-semibold">
          Secondary School Certificate (SSC)
        </p>
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-3 md:mb-4">
          Excelled in academics and extracurriculars; developed strong problem-solving foundations.
        </p>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {['Academic Excellence', 'Extracurriculars', 'Leadership', 'Foundation'].map((achievement) => (
            <span key={achievement} className="px-2 md:px-3 py-1 bg-accent-yellow/20 text-accent-yellow rounded-full text-xs md:text-sm border border-accent-yellow/30">
              {achievement}
            </span>
          ))}
        </div>
      </div>
    )
  }
];

const Education = () => {
  return (
    <section
      id="education"
      className="relative min-h-screen bg-primary-dark text-white overflow-hidden scroll-mt-28 md:scroll-mt-40"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          className="w-full h-full"
          alphaParticles={true}
          particleCount={80}
          speed={0.05}
          particleBaseSize={40}
          sizeRandomness={1}
        />
      </div>
      
      <div className="relative z-10 py-16">
        <div className="text-center mb-12 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-accent-blue">
            Education
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            My education has been a journey of self‑discovery and growth. Highlights below.
          </p>
        </div>
        
        <ScrollStack
          cards={educationCards}
          backgroundColor="bg-primary-dark"
          cardHeight="60vh"
          sectionHeightMultiplier={2.2}
          className="education-scroll-stack"
        />
      </div>
    </section>
  );
};

export default Education;
