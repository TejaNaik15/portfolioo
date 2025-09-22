import React from 'react';
import SocialIcons from './SocialIcons'; 

const SocialWrapper = () => {
  const socialLinks = [
    { type: 'github', link: 'https://github.com/TejaNaik15' },
    { type: 'linkedin', link: 'https://www.linkedin.com/in/teja-naik-0b3021282' },
    { type: 'instagram', link: 'https://www.instagram.com/eren_yeager9_' },
    { type: 'email', link: 'tinkuteja740@gmail.com' },
  ];

  return (
    <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 text-3xl">
      {socialLinks.map((social, index) => (
        <SocialIcons key={index} type={social.type} link={social.link} />
      ))}
    </div>
  );
};

export default SocialWrapper;
