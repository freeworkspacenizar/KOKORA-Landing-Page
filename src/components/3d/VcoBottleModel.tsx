import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VcoBottleModelProps {
  scale?: number;
  autoRotate?: boolean;
}

export const VcoBottleModel: React.FC<VcoBottleModelProps> = ({
  scale = 1.0,
  autoRotate = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.6, 0]}>
      {/* 1. Main Apothecary Glass Body */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.75, 1.8, 36]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.96}
          opacity={1}
          transparent
          roughness={0.05}
          ior={1.52}
          thickness={0.8}
          specularIntensity={1.2}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* 2. Glass Shoulder & Neck */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.75, 0.3, 36]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.95}
          transparent
          roughness={0.06}
          ior={1.52}
        />
      </mesh>
      <mesh position={[0, 2.3, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 36]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.95}
          transparent
          roughness={0.06}
          ior={1.52}
        />
      </mesh>

      {/* 3. Golden Virgin Coconut Oil Liquid Core */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.71, 0.71, 1.65, 32]} />
        <meshPhysicalMaterial
          color="#FFE9A8"
          transmission={0.85}
          transparent
          roughness={0.08}
          ior={1.46}
          thickness={1.2}
        />
      </mesh>

      {/* 4. Natural Coconut Wood Cap / Stopper */}
      <mesh position={[0, 2.55, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.4, 0.35, 32]} />
        <meshStandardMaterial
          color="#5C351F"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 5. Minimalist Paper Label Wrap */}
      <mesh position={[0, 0.95, 0.76]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.0, 1.2]} />
        <meshStandardMaterial
          color="#F5F0E5"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Studio Floor Shadow Receiver */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.5, 32]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
};
