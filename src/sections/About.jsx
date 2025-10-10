import React, { useState } from 'react';
import Particles from '../components/Particles';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';

const About = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = "tinkuteja740@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResumeDownload = () => {
    const resumeUrl = "/assets/resume.pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "Teja_Naik_Resume.pdf";
    link.click();
  };



  const gridItems = [
    {
      id: 1,
      title: "About Me",
      description: "Hi, I'm Teja Naik, a 22-year-old passionate Full Stack Developer with expertise in the MERN stack. I love creating innovative solutions and bringing ideas to life through clean, efficient code.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 2,
      title: "I'm flexible across all time zones",
      description: "Available for remote collaboration worldwide",
      className: "lg:col-span-3 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My tech stack",
      description: "I constantly try to improve",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for development",
      description: "Building innovative solutions",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 6,
      title: "",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-primary-dark text-white overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={120} speed={0.08} particleBaseSize={60} sizeRandomness={1} />
      </div>
      <div className="relative z-10 container mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#00dfd8]">
          About <span className="text-white light:text-black">Me</span>
        </h2>
        
        <BentoGrid className="w-full max-w-7xl mx-auto">
          {gridItems.map((item, i) => (
            <BentoGridItem
              id={item.id}
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default About;