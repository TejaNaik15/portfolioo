import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const Ball = ({ imgUrl }) => {
  const [decal, setDecal] = useState(null);
  const meshRef = useRef();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imgUrl,
      (texture) => setDecal(texture),
      undefined,
      (error) => console.warn('Texture loading failed:', error)
    );
  }, [imgUrl]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#13ADC7"
          roughness={0.1}
          metalness={0.8}
        />
        {decal && (
          <meshBasicMaterial
            map={decal}
            transparent
            opacity={0.9}
          />
        )}
      </mesh>
    </>
  );
};

const ErrorFallback = ({ icon }) => (
  <div className="w-full h-full flex items-center justify-center bg-secondary-dark/50 rounded-full border border-accent-blue/30">
    <img 
      src={icon} 
      alt="skill" 
      className="w-12 h-12 object-contain"
      style={{
        filter: /github|express/i.test(icon) ? 'invert(1) brightness(1.2)' : 'none'
      }}
    />
  </div>
);

const BallCanvas = ({ icon }) => {
  const [hasError, setHasError] = useState(false);
  const canvasRef = useRef();
  const timeoutRef = useRef();

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  useEffect(() => {
    // Set timeout to fallback if canvas doesn't load
    timeoutRef.current = setTimeout(() => {
      setHasError(true);
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Cleanup WebGL context
      if (canvasRef.current) {
        try {
          const canvas = canvasRef.current.querySelector('canvas');
          if (canvas) {
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl && gl.getExtension('WEBGL_lose_context')) {
              gl.getExtension('WEBGL_lose_context').loseContext();
            }
          }
        } catch (e) {
          console.warn('WebGL cleanup failed:', e);
        }
      }
    };
  }, []);

  if (hasError) {
    return <ErrorFallback icon={icon} />;
  }

  return (
    <div ref={canvasRef} className="w-full h-full">
      <Canvas
        frameloop="always"
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        onError={handleError}
        onCreated={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }}
      >
        <Suspense fallback={null}>
          <Ball imgUrl={icon} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BallCanvas;