import React from 'react';
import LegacyGlobe from '@/components/Globe.jsx';

export const Globe = ({ className = '' }) => {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 ${className}`} aria-hidden>
      <div className="w-[520px] h-[520px] md:w-[640px] md:h-[640px]">
        <LegacyGlobe className="w-full h-full" />
      </div>
    </div>
  );
}; 


export default Globe;
