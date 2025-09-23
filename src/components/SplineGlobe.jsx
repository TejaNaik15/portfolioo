import React, { useEffect, useRef, useState } from 'react';

const SplineGlobe = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        const app = new Application(containerRef.current);

        // Create style element to hide watermark
        const style = document.createElement('style');
        style.textContent = `
          .spline-watermark,
          [data-spline-watermark],
          #watermark,
          div[style*="spline"] { 
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            visibility: hidden !important;
            z-index: -9999 !important;
            clip: rect(0 0 0 0) !important;
            width: 1px !important;
            height: 1px !important;
            margin: -1px !important;
            overflow: hidden !important;
          }
        `;
        document.head.appendChild(style);

        // Function to clean up watermarks
        const removeWatermark = () => {
          document.querySelectorAll('*').forEach(el => {
            if (
              el.textContent === 'Built with Spline' ||
              el.className?.includes('watermark') ||
              el.id?.includes('watermark') ||
              el.getAttribute('data-spline-watermark')
            ) {
              el.remove();
            }
          });
        };

        // Load the scene with custom options
        await app.load('https://prod.spline.design/JF69T2bLQMDBkHX7/scene.splinecode', {
          credentials: 'omit',
          mode: 'no-cors',
          scene: {
            background: { r: 0, g: 0, b: 0, a: 0 },
            exposure: 1,
            shadowIntensity: 1
          }
        });

        // Apply theme colors and effects
        const scene = app.scene;
        if (scene) {
          scene.traverse((object) => {
            if (object.material) {
              // Make everything transparent initially
              object.material.transparent = true;
              object.material.opacity = 0.9;
              
              // Apply theme colors
              if (object.material.color) {
                object.material.color.set('#945DD6'); // Purple
              }
              if (object.material.emissive) {
                object.material.emissive.set('#13ADC7'); // Light blue
                object.material.emissiveIntensity = 1.2;
              }
              
              // Add metallic effect
              object.material.metalness = 0.9;
              object.material.roughness = 0.2;
              object.material.envMapIntensity = 1.5;
              
              // Add glow effect
              if (object.material.toneMapped !== undefined) {
                object.material.toneMapped = false;
              }
            }
          });

          // Force background to be transparent
          scene.background = null;
        }

        // Set up watermark removal observers
        const observer = new MutationObserver(removeWatermark);
        observer.observe(document.body, { 
          childList: true, 
          subtree: true 
        });
        
        // Periodic cleanup
        const interval = setInterval(removeWatermark, 100);
        
        setIsLoaded(true);

        return () => {
          observer.disconnect();
          clearInterval(interval);
          style.remove();
          app.dispose();
        };

      } catch (error) {
        console.error('Failed to load Spline scene:', error);
      }
    };

    loadSpline();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          position: 'relative',
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-accent-blue border-r-accent-purple rounded-full animate-spin" />
        </div>
      )}
    </>
  );
};

export default SplineGlobe;