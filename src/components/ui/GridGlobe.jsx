import React from 'react';

const GridGlobe = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#00dfd8] to-purple-600 flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-[#0c0e23] flex items-center justify-center">
          <div className="text-4xl animate-spin-slow">🌍</div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-[#00dfd8] opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
};

export { GridGlobe };