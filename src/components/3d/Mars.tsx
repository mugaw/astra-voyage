'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MarsProps {
  position?: [number, number, number];
  scale?: number;
}

export function Mars({ position = [3, 1, -2], scale = 0.6 }: MarsProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Mars base color
    const gradient = ctx.createRadialGradient(256, 128, 0, 256, 128, 256);
    gradient.addColorStop(0, '#c2410c');
    gradient.addColorStop(0.5, '#9a3412');
    gradient.addColorStop(1, '#7c2d12');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Add craters and terrain
    ctx.fillStyle = '#7f1d1d';
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 20 + 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add lighter regions
    ctx.fillStyle = 'rgba(251, 146, 60, 0.3)';
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 40 + 20, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar caps
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.ellipse(256, 20, 80, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(256, 236, 60, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshBasicMaterial
          color="#ef4444"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default Mars;
