import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa';
import Particles from '../components/ui/Particles';

const About = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [resumeDownloaded, setResumeDownloaded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleEmailCopy = () => {
    const text = "tinkuteja740@gmail.com";
    navigator.clipboard.writeText(text);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handlePhoneCopy = () => {
    const text = "+91 7569474682";
    navigator.clipboard.writeText(text);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleResumeDownload = () => {
    const resumeUrl = "/assets/resume.pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "Teja_Naik_Resume.pdf";
    link.click();
    setResumeDownloaded(true);
    setTimeout(() => setResumeDownloaded(false), 2000);
  };

  const handlePhotoHover = () => {
    if (!isRotating) {
      setIsRotating(true);
      setTimeout(() => setIsRotating(false), 1000);
    }
  };

  return (
    <section id="about" className="relative py-20 bg-primary-dark text-white overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={120} speed={0.08} particleBaseSize={60} sizeRandomness={1} />
      </div>
      <div className="relative z-10 container mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#00dfd8]">
          About <span className="text-white light:text-black">Me</span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center">
              <div 
                className={`w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-[#00dfd8] transition-transform duration-1000 ${isRotating ? 'rotate-360' : ''}`}
                onMouseEnter={handlePhotoHover}
              >
                <img
                  src="/assets/TEJANAIK.png"
                  alt="Teja Naik"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-6xl text-white flex items-center justify-center h-full">👤</span>';
                  }}
                />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-[#00dfd8]">Teja Naik</h3>
              <p className="text-xl text-gray-300 mb-6">Full Stack Developer</p>
              
              {/* Contact Buttons */}
              <div className="flex flex-col gap-4 w-full max-w-sm">
                <button
                  onClick={handleEmailCopy}
                  className="flex items-center justify-center gap-3 bg-[#161a31] hover:bg-[#1a1f3a] px-6 py-3 rounded-lg transition-colors"
                >
                  <FaEnvelope className="text-[#00dfd8]" />
                  <span className="text-white">{emailCopied ? "Email Copied!" : "tinkuteja740@gmail.com"}</span>
                </button>
                <button
                  onClick={handlePhoneCopy}
                  className="flex items-center justify-center gap-3 bg-[#161a31] hover:bg-[#1a1f3a] px-6 py-3 rounded-lg transition-colors"
                >
                  <FaPhone className="text-[#00dfd8]" />
                  <span className="text-white">{phoneCopied ? "Phone Copied!" : "+91 7569474682"}</span>
                </button>
                <button
                  onClick={handleResumeDownload}
                  className="flex items-center justify-center gap-3 bg-[#00dfd8] hover:bg-[#00dfd8]/80 px-6 py-3 rounded-lg transition-colors"
                >
                  <FaDownload className="text-white" />
                  <span className="text-white">{resumeDownloaded ? "Downloaded!" : "Download Resume"}</span>
                </button>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <div>
                <h4 className="text-2xl font-bold mb-4 text-[#00dfd8]">About Me</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a passionate Full Stack Developer with expertise in modern web technologies. 
                  I love creating innovative solutions and bringing ideas to life through code.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  With a strong foundation in both frontend and backend development, I'm always 
                  eager to learn new technologies and take on challenging projects.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4 text-[#00dfd8]">Tech Stack</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-lg font-semibold mb-2 text-white">Frontend</h5>
                    <div className="space-y-2">
                      {["React.js", "Next.js", "TypeScript"].map((tech, index) => (
                        <span key={index} className="inline-block bg-[#10132E] px-3 py-1 rounded-lg text-sm text-white mr-2 mb-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold mb-2 text-white">Backend</h5>
                    <div className="space-y-2">
                      {["Node.js", "Golang", "Docker"].map((tech, index) => (
                        <span key={index} className="inline-block bg-[#10132E] px-3 py-1 rounded-lg text-sm text-white mr-2 mb-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4 text-[#00dfd8]">What I Do</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Full Stack Web Development</li>
                  <li>• Responsive UI/UX Design</li>
                  <li>• API Development & Integration</li>
                  <li>• Database Design & Management</li>
                  <li>• Performance Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;