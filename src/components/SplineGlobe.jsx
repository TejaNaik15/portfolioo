import React, { useEffect, useRef } from 'react';

const SplineGlobe = () => {
  const canvasRef = useRef(null);
  const splineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || splineRef.current) return;

    // Import Spline runtime dynamically
    import('@splinetool/runtime').then(({ Application }) => {
      splineRef.current = new Application(canvasRef.current);
      
      // Create a custom scene with your theme colors
      const sceneOptions = {
        backgroundColor: 'transparent',
        onLoad: () => {
          // Once loaded, modify materials to match your theme
          const scene = splineRef.current.scene;
          if (scene) {
            scene.traverse((object) => {
              if (object.material) {
                // Modify material colors to match your theme
                if (object.material.color) {
                  // Use your theme colors - blue and purple gradient
                  object.material.color.setHex(0x13ADC7); // Light blue color
                }
                if (object.material.emissive) {
                  object.material.emissive.setHex(0x945DD6); // Purple color
                }
              }
            });
          }
        }
      };

      splineRef.current.load('https://prod.spline.design/JF69T2bLQMDBkHX7/scene.splinecode', sceneOptions);
    }).catch(console.error);

    return () => {
      if (splineRef.current) {
        splineRef.current.dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '0.5rem',
          background: 'transparent'
        }}
      />
    </div>
  );
};

export default SplineGlobe;