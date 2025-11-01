import React from 'react';

const BallCanvas = ({ icon }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-secondary-dark/30 backdrop-blur-sm rounded-full border border-white/10 hover:border-accent-blue/50 transition-all duration-300 group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      <img 
        src={icon} 
        alt="skill" 
        className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
        style={{
          filter: /github|express/i.test(icon) ? 'invert(1) brightness(1.2)' : 'none'
        }}
      />
    </div>
  );
};

export default BallCanvas;