'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  spread?: number;
  size?: number;
}

export function Particles({ count = 200, spread = 15, size = 0.05 }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position - spread in a sphere
      const radius = Math.random() * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return { positions, velocities };
  }, [count, spread]);

  useFrame(() => {
    if (points.current) {
      const positionArray = points.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        positionArray[i3] += velocities[i3];
        positionArray[i3 + 1] += velocities[i3 + 1];
        positionArray[i3 + 2] += velocities[i3 + 2];

        // Wrap around
        const dist = Math.sqrt(
          positionArray[i3] ** 2 + 
          positionArray[i3 + 1] ** 2 + 
          positionArray[i3 + 2] ** 2
        );
        
        if (dist > spread) {
          const scale = -spread / dist;
          positionArray[i3] *= scale;
          positionArray[i3 + 1] *= scale;
          positionArray[i3 + 2] *= scale;
        }
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default Particles;
