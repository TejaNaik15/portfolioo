import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SpinningGlobe({ interactive = true }) {
  const group = useRef();
  const [dragging, setDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e) => {
    setDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerUp = useCallback(() => setDragging(false), []);

  const onPointerMove = useCallback((e) => {
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    if (!group.current) return;
    const factor = 0.005;
    if (interactive || dragging) {
      group.current.rotation.y += dx * factor;
      group.current.rotation.x += dy * factor;
      group.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, group.current.rotation.x));
    }
  }, [interactive, dragging]);

  useFrame((_, delta) => {
    if (!dragging && group.current) {
      group.current.rotation.y += delta * 0.2; // gentle idle spin
    }
  });

  return (
    <group ref={group} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerLeave={onPointerUp} onPointerMove={onPointerMove}>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial wireframe opacity={0.9} transparent color={"#ffffff"} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.52, 64, 64]} />
        <meshStandardMaterial wireframe opacity={0.35} transparent color={"#13ADC7"} />
      </mesh>
    </group>
  );
}

export default function Globe({ className = '' }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={0.5} />
        <SpinningGlobe interactive />
      </Canvas>
    </div>
  );
}
