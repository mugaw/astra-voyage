'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarsProps {
  count?: number;
  size?: number;
}

export function Stars({ count = 5000, size = 0.01 }: StarsProps) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      // Color - mix of white, cyan, and purple
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        // White
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else if (colorChoice < 0.8) {
        // Cyan
        colors[i3] = 0.13;
        colors[i3 + 1] = 0.83;
        colors[i3 + 2] = 0.93;
      } else {
        // Purple
        colors[i3] = 0.48;
        colors[i3 + 1] = 0.23;
        colors[i3 + 2] = 0.93;
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particlesPosition.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default Stars;
