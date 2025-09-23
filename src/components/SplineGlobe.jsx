import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineGlobe = () => {
  return (
    <div style={{
      width: '100%',
      height: '300px',
      background: 'transparent',
      position: 'relative',
      borderRadius: '0.5rem'
    }}>
      <Spline 
        scene="https://prod.spline.design/JF69T2bLQMDBkHX7/scene.splinecode"
        style={{
          width: '100%',
          height: '100%'
        }}
      />
      <style>{`
        .spline-watermark,
        [data-spline-watermark],
        #watermark,
        div[style*="spline"] { 
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}</style>
    </div>
  );
};

export default SplineGlobe;