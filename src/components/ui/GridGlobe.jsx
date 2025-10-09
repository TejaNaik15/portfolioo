import React, { useEffect, useRef } from 'react';

const GridGlobe = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    if (globeRef.current) {
      // Simple rotation animation
      const animate = () => {
        if (globeRef.current) {
          globeRef.current.style.transform = `rotateY(${Date.now() * 0.05}deg)`;
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {/* Globe Container */}
      <div className="relative w-40 h-40">
        {/* Globe Base */}
        <div 
          ref={globeRef}
          className="w-full h-full rounded-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 relative overflow-hidden shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #4facfe 0%, #00f2fe 50%, #1e3c72 100%)',
            boxShadow: '0 0 50px rgba(79, 172, 254, 0.3), inset -20px -20px 50px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Continents/Land masses */}
          <div className="absolute top-4 left-6 w-8 h-6 bg-green-600 rounded-full opacity-80"></div>
          <div className="absolute top-8 right-4 w-6 h-4 bg-green-700 rounded-full opacity-70"></div>
          <div className="absolute bottom-6 left-8 w-10 h-5 bg-green-600 rounded-full opacity-75"></div>
          <div className="absolute bottom-8 right-6 w-5 h-3 bg-green-700 rounded-full opacity-80"></div>
          <div className="absolute top-12 left-12 w-4 h-3 bg-green-600 rounded-full opacity-70"></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 rounded-full border border-white/20"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-white/10 transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 transform -translate-y-1/2"></div>
          
          {/* Atmosphere glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        
        {/* Orbital rings */}
        <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-2 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export { GridGlobe };