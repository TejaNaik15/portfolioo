import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import Particles from '../components/Particles';
import ScrollTimeline from '../components/ScrollTimeline';

const educationEvents = [
  {
    year: '2021 – 2025',
    title: 'CMR Institute of Technology, Hyderabad',
    subtitle: 'B.Tech (Artificial Intelligence & Data Science)',
    description:
      'Coursework in Web Development, Data Structures, Algorithms, DBMS, Operating Systems, and ML. Built multiple MERN projects and led tech fests.',
  },
  {
    year: '2019 – 2021',
    title: 'Sri Chaitanya Junior College',
    subtitle: 'Intermediate (MPC)',
    description:
      'Focused on Mathematics and Physics fundamentals. Participated in science exhibitions and olympiads.',
  },
  {
    year: 'Up to 2019',
    title: 'Montessori High School, Khammam',
    subtitle: 'SSC',
    description:
      'Excelled in academics and extracurriculars; developed strong problem-solving foundations.',
  },
];

const Education = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen bg-primary-dark text-white px-6 py-16 md:px-8 flex flex-col items-center justify-center overflow-hidden scroll-mt-28 md:scroll-mt-40"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          className="w-full h-full"
          alphaParticles={true}
          particleCount={100}
          speed={0.08}
          particleBaseSize={60}
          sizeRandomness={1}
        />
      </div>
      <div className="relative container mx-auto w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-accent-blue text-center">Education</h1>
        <p className="text-center text-text-muted mb-10 max-w-2xl mx-auto">
          My education has been a journey of self‑discovery and growth. Highlights below.
        </p>

        <ScrollTimeline
          events={educationEvents}
          className="max-w-5xl mx-auto"
          parallaxIntensity={0.1}
          progressIndicator={true}
          progressLineWidth={3}
          progressLineCap="round"
        />
      </div>
    </section>
  );
};

export default Education;
