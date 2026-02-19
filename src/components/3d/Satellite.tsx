'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SatelliteProps {
  position?: [number, number, number];
  scale?: number;
}

export function Satellite({ position = [2, 0, 0], scale = 0.3 }: SatelliteProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around
      const time = state.clock.elapsedTime * 0.5;
      groupRef.current.position.x = Math.cos(time) * 3;
      groupRef.current.position.z = Math.sin(time) * 3;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      groupRef.current.rotation.y = time;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.4]} />
        <meshStandardMaterial color="#1e40af" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.4]} />
        <meshStandardMaterial color="#1e40af" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Glow */}
      <pointLight color="#22d3ee" intensity={0.5} distance={2} />
    </group>
  );
}

export default Satellite;
