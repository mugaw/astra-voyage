'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthProps {
  position?: [number, number, number];
  scale?: number;
}

export function Earth({ position = [0, 0, 0], scale = 1 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Create textures procedurally
  const textures = useMemo(() => {
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 512;
    earthCanvas.height = 256;
    const ctx = earthCanvas.getContext('2d')!;

    // Create gradient for Earth
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#1e40af');
    gradient.addColorStop(0.3, '#1e3a8a');
    gradient.addColorStop(0.5, '#3b82f6');
    gradient.addColorStop(0.7, '#1e3a8a');
    gradient.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Add land masses (simplified)
    ctx.fillStyle = '#22c55e';
    // North America
    ctx.beginPath();
    ctx.ellipse(120, 80, 40, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    // South America
    ctx.beginPath();
    ctx.ellipse(140, 170, 20, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    // Africa
    ctx.beginPath();
    ctx.ellipse(270, 130, 25, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    // Europe/Asia
    ctx.beginPath();
    ctx.ellipse(320, 70, 80, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    // Australia
    ctx.beginPath();
    ctx.ellipse(420, 170, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    const earthTexture = new THREE.CanvasTexture(earthCanvas);

    // Cloud texture
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 512;
    cloudCanvas.height = 256;
    const cloudCtx = cloudCanvas.getContext('2d')!;
    cloudCtx.fillStyle = 'transparent';
    cloudCtx.fillRect(0, 0, 512, 256);
    cloudCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 100; i++) {
      cloudCtx.beginPath();
      cloudCtx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 30 + 10, 0, Math.PI * 2);
      cloudCtx.fill();
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);

    return { earthTexture, cloudTexture };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={textures.earthTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshStandardMaterial
          map={textures.cloudTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default Earth;
