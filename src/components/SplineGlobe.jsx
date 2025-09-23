import React, { useEffect, useRef } from 'react';

const SplineGlobe = () => {
  const canvasRef = useRef(null);
  const splineRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || splineRef.current) return;

    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        splineRef.current = new Application(canvasRef.current);

        // Apply custom styling to the container
        if (canvasRef.current) {
          const parent = canvasRef.current.parentElement;
          if (parent) {
            parent.style.background = 'transparent';
          }
          
          // Remove Spline watermark
          const watermarks = document.querySelectorAll('[data-spline-watermark]');
          watermarks.forEach(watermark => watermark.remove());
        }

        // Load and customize the scene
        await splineRef.current.load('https://prod.spline.design/JF69T2bLQMDBkHX7/scene.splinecode');
        
        // Get the scene and modify it
        const scene = splineRef.current.scene;
        
        // Set scene background to transparent
        if (scene) {
          scene.background = null;
          scene.traverse((object) => {
            if (object.material) {
              // Make materials transparent where needed
              object.material.transparent = true;
              
              // Apply theme colors
              if (object.material.color) {
                object.material.color.setStyle('#13ADC7'); // Light blue
              }
              if (object.material.emissive) {
                object.material.emissive.setStyle('#945DD6'); // Purple
              }
              
              // Adjust material properties for better visibility
              if (object.material.opacity !== undefined) {
                object.material.opacity = 0.8;
              }
            }
          });
        }

        // Remove watermark periodically (some versions of Spline re-add it)
        const removeWatermark = () => {
          const watermarks = document.querySelectorAll('[data-spline-watermark], .spline-watermark');
          watermarks.forEach(watermark => watermark.remove());
        };
        
        const intervalId = setInterval(removeWatermark, 100);
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error loading Spline:', error);
      }
    };

    loadSpline();

    return () => {
      if (splineRef.current) {
        splineRef.current.dispose();
      }
    };
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      background: 'transparent'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          borderRadius: '0.5rem'
        }}
      />
    </div>
  );
};

export default SplineGlobe;