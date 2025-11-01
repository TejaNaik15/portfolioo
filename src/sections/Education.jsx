import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from '../components/Particles';
import TitleHeader from '../components/TitleHeader';
import GlowCard from '../components/GlowCard';

const educationCards = [
  {
    title: 'CMR Institute of Technology',
    date: '2021 – 2025',
    review: 'Pursuing B.Tech in Artificial Intelligence & Data Science with focus on modern web technologies and machine learning.',
    logoPath: '/assets/NAIK.png',
    imgPath: '/assets/NAIK.png',
    subjects: ['Web Development', 'Data Structures', 'Machine Learning', 'DBMS', 'Operating Systems']
  },
  {
    title: 'Sri Chaitanya Junior College',
    date: '2019 – 2021',
    review: 'Completed Intermediate in Mathematics, Physics, Chemistry with strong foundation in analytical thinking.',
    logoPath: '/assets/NAIK.png',
    imgPath: '/assets/NAIK.png',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Problem Solving']
  },
  {
    title: 'Montessori High School, Khammam',
    date: 'Up to 2019',
    review: 'Completed SSC with excellence in academics and active participation in extracurricular activities.',
    logoPath: '/assets/NAIK.png',
    imgPath: '/assets/NAIK.png',
    subjects: ['Academic Excellence', 'Leadership', 'Extracurriculars']
  }
];

const Education = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.timeline-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card) => {
      card.style.transform = 'translateX(-100px)';
      card.style.opacity = '0';
      card.style.transition = 'all 0.8s ease-out';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      className="relative min-h-screen bg-primary-dark text-white px-4 md:px-8 py-16 overflow-hidden scroll-mt-28 md:scroll-mt-40"
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
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <TitleHeader
          title="Educational Journey"
          sub="🎓 My Academic Background"
        />
        
        <div className="mt-16 md:mt-32 relative">
          <div className="relative z-50 xl:space-y-20 space-y-10">
            {educationCards.map((card, index) => (
              <div key={card.title} className="flex flex-col xl:flex-row gap-8 xl:gap-12">
                <div className="xl:w-2/6">
                  <GlowCard card={card} index={index}>
                    <div className="flex justify-center items-center h-16">
                      <div className="text-4xl">
                        🎓
                      </div>
                    </div>
                  </GlowCard>
                </div>
                
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="relative mr-6 md:mr-8">
                      <div className="w-1 h-full bg-gradient-to-b from-accent-blue to-accent-purple rounded-full" />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-blue rounded-full border-2 border-primary-dark" />
                    </div>
                    
                    <motion.div 
                      className="timeline-card flex gap-6 md:gap-8 relative z-20"
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-2xl">
                          📚
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h1 className="font-semibold text-2xl md:text-3xl text-white mb-2">
                          {card.title}
                        </h1>
                        <p className="mb-4 text-accent-blue font-medium">
                          🗓️ {card.date}
                        </p>
                        <p className="text-text-muted mb-4">
                          {card.review}
                        </p>
                        <p className="text-accent-purple italic mb-3">
                          Key Subjects/Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {card.subjects.map((subject, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm border border-accent-blue/30"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;