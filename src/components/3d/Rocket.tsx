'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RocketProps {
  position?: [number, number, number];
  scale?: number;
  isLaunching?: boolean;
}

export function Rocket({ position = [0, -2, 0], scale = 0.5, isLaunching = true }: RocketProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const innerFlameRef = useRef<THREE.Mesh>(null);
  const launchProgress = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      if (isLaunching) {
        launchProgress.current = Math.min(launchProgress.current + 0.002, 1);
        groupRef.current.position.y = -2 + launchProgress.current * 4;
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      }
    }

    // Animate flame scale with flickering effect
    if (flameRef.current) {
      const flicker = 0.9 + Math.sin(state.clock.elapsedTime * 30) * 0.1 + Math.random() * 0.1;
      flameRef.current.scale.set(flicker, 1 + Math.random() * 0.3, flicker);
    }

    if (innerFlameRef.current) {
      const innerFlicker = 0.85 + Math.sin(state.clock.elapsedTime * 25) * 0.15;
      innerFlameRef.current.scale.set(innerFlicker, 1 + Math.random() * 0.2, innerFlicker);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Rocket Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 2, 32]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Nose Cone */}
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.3, 0.8, 32]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Fins */}
      {[0, 120, 240].map((rotation, index) => (
        <mesh
          key={index}
          position={[0, -0.8, 0]}
          rotation={[0, (rotation * Math.PI) / 180, 0]}
        >
          <boxGeometry args={[0.1, 0.6, 0.5]} />
          <meshStandardMaterial color="#6b21a8" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Window */}
      <mesh position={[0, 0.3, 0.35]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#06b6d4" 
          emissiveIntensity={0.3} 
        />
      </mesh>

      {/* Engine Base */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 0.4, 32]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Outer Flame (orange) */}
      <mesh ref={flameRef} position={[0, -1.8, 0]}>
        <coneGeometry args={[0.3, 1.5, 32]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.8} />
      </mesh>

      {/* Middle Flame (yellow-orange) */}
      <mesh position={[0, -1.75, 0]}>
        <coneGeometry args={[0.22, 1.2, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.85} />
      </mesh>

      {/* Inner Flame (bright yellow/white) */}
      <mesh ref={innerFlameRef} position={[0, -1.7, 0]}>
        <coneGeometry args={[0.12, 0.9, 32]} />
        <meshBasicMaterial color="#fef3c7" transparent opacity={0.95} />
      </mesh>

      {/* Core Flame (white hot) */}
      <mesh position={[0, -1.6, 0]}>
        <coneGeometry args={[0.05, 0.5, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={1} />
      </mesh>

      {/* Glow Effect */}
      <pointLight position={[0, -2, 0]} color="#f97316" intensity={2} distance={3} />
      <pointLight position={[0, -1.5, 0]} color="#fbbf24" intensity={1.5} distance={2.5} />
    </group>
  );
}

export default Rocket;
