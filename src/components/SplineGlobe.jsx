import React, { useEffect, useRef } from 'react';

const SplineGlobe = () => {
  const canvasRef = useRef(null);
  const splineRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || splineRef.current) return;

    // Import Spline runtime dynamically
    import('@splinetool/runtime').then(({ Application }) => {
      splineRef.current = new Application(canvasRef.current);
      splineRef.current.load('https://prod.spline.design/JF69T2bLQMDBkHX7/scene.splinecode');
    }).catch(console.error);

    return () => {
      if (splineRef.current) {
        splineRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '0.5rem',
      }}
    />
  );
};

export default SplineGlobe;