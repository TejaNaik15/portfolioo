import React from 'react';

// Smooth scroll helper function
const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const offsetTop = element.offsetTop;
    window.scrollTo({
      top: offsetTop - offset,
      behavior: 'smooth'
    });
  }
};

export const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  smoothScrollTo(targetId);
};

export default smoothScrollTo;