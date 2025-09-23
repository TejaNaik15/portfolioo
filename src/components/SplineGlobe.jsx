import React, { useEffect, useRef } from 'react';

const SplineGlobe = () => {
  const canvasRef = useRef(null);
  const splineRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    const removeWatermarks = () => {
      // Remove all possible watermark elements
      const elements = document.querySelectorAll(
        '[data-spline-watermark], .spline-watermark, #watermark, [class*="watermark"], [style*="watermark"]'
      );
      elements.forEach(el => el.remove());

      // Also remove any elements with "Built with Spline" text
      document.querySelectorAll('*').forEach(el => {
        if (el.textContent === 'Built with Spline') {
          el.remove();
        }
      });
    };

    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        appRef.current = new Application(canvasRef.current);

        // Set up mutation observer to remove watermark as soon as it appears
        const observer = new MutationObserver((mutations) => {
          removeWatermarks();
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Load the scene
        await appRef.current.load('https://prod.spline.design/JF69T2bLQMDBkHX7/scene.splinecode');

        // Initial cleanup
        removeWatermarks();

        // Access the scene and modify materials
        if (appRef.current.scene) {
          appRef.current.scene.background = null;
          appRef.current.scene.traverse((object) => {
            if (object.material) {
              // Apply portfolio theme colors
              object.material.transparent = true;
              
              if (object.material.map) {
                // Adjust texture properties if present
                object.material.map.encoding = THREE.sRGBEncoding;
              }

              // Apply gradient colors
              if (object.material.color) {
                object.material.color.setStyle('#945DD6'); // Purple base
              }
              if (object.material.emissive) {
                object.material.emissive.setStyle('#13ADC7'); // Light blue glow
                object.material.emissiveIntensity = 0.8;
              }
              
              // Enhance material properties
              object.material.metalness = 0.8;
              object.material.roughness = 0.2;
              object.material.opacity = 0.9;
            }
          });
        }

        // Set up periodic cleanup
        const intervalId = setInterval(removeWatermarks, 100);
        return () => {
          clearInterval(intervalId);
          observer.disconnect();
        };

      } catch (error) {
        console.error('Error loading Spline:', error);
      }
    };

    loadSpline();

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
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
      <style jsx global>{`
        [data-spline-watermark], 
        .spline-watermark,
        #watermark,
        [class*="watermark"],
        [style*="watermark"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          position: absolute !important;
          z-index: -9999 !important;
        }
      `}</style>
    </div>
  );
};

export default SplineGlobe;