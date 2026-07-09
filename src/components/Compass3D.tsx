'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import type * as THREE from 'three';

function CompassRing() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ring.current) return;
    const t = state.clock.getElapsedTime();
    ring.current.rotation.z = t * 0.15;
    ring.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });
  return (
    <group>
      {/* outer ring */}
      <mesh ref={ring}>
        <torusGeometry args={[1.8, 0.02, 32, 200]} />
        <meshStandardMaterial
          color="#c9a24a"
          emissive="#8f6b1f"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* compass points */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[0, 0, 0]}>
          <coneGeometry args={[0.18, 0.9, 4]} />
          <meshStandardMaterial
            color="#e6c987"
            emissive="#c9a24a"
            emissiveIntensity={0.4}
            metalness={1}
            roughness={0.2}
          />
        </mesh>
      ))}
      {/* center diamond */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.4, 0.08]} />
        <meshStandardMaterial
          color="#e6c987"
          emissive="#8f6b1f"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export function Compass3D({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} color="#f4ecdd" />
        <pointLight position={[-3, -2, 3]} intensity={0.8} color="#c9a24a" />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
            <CompassRing />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
