import React, { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { FaDownload, FaPhone, FaEnvelope } from 'react-icons/fa';
import Particles from '../components/Particles';
import { GridGlobe } from '../components/ui/GridGlobe';

const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-6 gap-4 mx-auto lg:grid-cols-5 md:grid-row-7 lg:gap-8 ${className || ''}`}
    >
      {children}
    </div>
  );
};

const BentoGridItem = ({
  id,
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}) => {
  const [copied, setCopied] = useState(false);
  
  const leftLists = ["NextJs", "ReactJs", "Typescript"];
  const rightLists = ["Golang", "NodeJs", "Docker"];

  const handleCopy = () => {
    const text = "tejanaik15@gmail.com";
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

  return (
    <div
      className={`row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 ${className || ''}`}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="absolute size-full">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div
          className={`absolute -bottom-5 right-0 ${
            id === 5 && "w-full opacity-80"
          }`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="size-full object-cover object-center"
            />
          )}
        </div>

        <div
          className={`group-hover/bento:scale-105 transition duration-300 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 ${titleClassName || ''}`}
        >
          <div className="z-10 font-sans text-sm font-extralight text-[#c1c2d3] md:max-w-32 md:text-xs lg:text-base">
            {description}
          </div>
          <div className="z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl text-white">
            {title}
          </div>

          {/* Profile Grid - ID 1 */}
          {id === 1 && (
            <div className="flex flex-col items-center justify-center mt-4">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-[#00dfd8]">
                <img
                  src="/assets/TEJANAIK.jpg"
                  alt="Teja Naik"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-4xl text-white flex items-center justify-center h-full">👤</span>';
                  }}
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 bg-[#161a31] hover:bg-[#1a1f3a] px-4 py-2 rounded-lg transition-colors"
                >
                  <FaEnvelope className="text-[#00dfd8]" />
                  <span className="text-sm text-white">{copied ? "Email Copied!" : "tejanaik15@gmail.com"}</span>
                </button>
                <div className="flex items-center justify-center gap-2 bg-[#161a31] px-4 py-2 rounded-lg">
                  <FaPhone className="text-[#00dfd8]" />
                  <span className="text-sm text-white">+91 1234567890</span>
                </div>
                <button
                  onClick={handleResumeDownload}
                  className="flex items-center justify-center gap-2 bg-[#00dfd8] hover:bg-[#00dfd8]/80 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaDownload className="text-white" />
                  <span className="text-sm text-white">Download Resume</span>
                </button>
              </div>
            </div>
          )}

          {/* Globe Grid - ID 2 */}
          {id === 2 && (
            <div className="flex flex-col items-center justify-center mt-4">
              <GridGlobe />
            </div>
          )}

          {/* Tech Stack Grid - ID 3 */}
          {id === 3 && (
            <div className="absolute -right-0 flex w-fit gap-1 lg:-right-0 lg:gap-3">
              <div className="flex flex-col gap-2 md:gap-3 lg:gap-3">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-80 lg:p-3 lg:text-base text-white"
                  >
                    {item}
                  </span>
                ))}
                <span className="rounded-lg bg-[#10132e] px-3 py-4 text-center lg:py-3" />
              </div>
              <div className="flex flex-col gap-2 md:gap-3 lg:gap-3">
                <span className="rounded-lg bg-[#10132e] px-3 py-4 text-center lg:py-3" />
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-80 lg:p-3 lg:text-base text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Passion Grid - ID 4 */}
          {id === 4 && (
            <div className="flex items-center justify-center mt-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💻</div>
                <p className="text-white font-medium">Tech enthusiast with a passion for development</p>
              </div>
            </div>
          )}

          {/* Contact Grid - ID 6 */}
          {id === 6 && (
            <div className="relative mt-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Do you want to start a project together?
                </h3>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 w-full bg-[#161a31] hover:bg-[#1a1f3a] px-6 py-3 rounded-lg transition-colors"
              >
                <IoCopyOutline className="text-white" />
                <span className="text-white">{copied ? "Email is Copied!" : "Copy my email"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const gridItems = [
  {
    id: 1,
    title: "Teja Naik",
    description: "Full Stack Developer",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm flexible across all time zones",
    description: "Available for remote collaboration",
    className: "lg:col-span-1 md:col-span-2 md:row-span-1",
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

const About = () => {
  return (
    <section id="about" className="relative py-20 bg-primary-dark text-white overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={120} speed={0.08} particleBaseSize={60} sizeRandomness={1} />
      </div>
      <div className="relative z-10 container mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#00dfd8]">
          About <span className="text-white">Me</span>
        </h2>
        <BentoGrid className="w-full">
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
