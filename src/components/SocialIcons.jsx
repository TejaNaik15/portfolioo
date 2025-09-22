import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const SocialIcons = ({ type, link }) => {
  let IconComponent;
  let ariaLabel;

  switch (type) {
    case 'github':
      IconComponent = FaGithub;
      ariaLabel = 'GitHub';
      break;
    case 'linkedin':
      IconComponent = FaLinkedin;
      ariaLabel = 'LinkedIn';
      break;
    case 'twitter':
      IconComponent = FaTwitter;
      ariaLabel = 'Twitter';
      break;
    case 'instagram':
      IconComponent = FaInstagram;
      ariaLabel = 'Instagram';
      break;
    case 'email':
      IconComponent = FaEnvelope;
      ariaLabel = 'Email';
      link = `mailto:${link}`; 
      break;
    default:
      return null;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon text-white hover:text-accent-blue transition-colors duration-300 text-3xl transform transition-transform hover:-translate-y-0.5"
      aria-label={ariaLabel}
    >
      <IconComponent />
    </a>
  );
};

export default SocialIcons;
