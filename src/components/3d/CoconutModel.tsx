import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface CoconutModelProps {
  explodeProgress?: number; // 0 = fully assembled whole, 1 = fully exploded
  isHero?: boolean;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const CoconutModel: React.FC<CoconutModelProps> = ({
  explodeProgress = 0,
  isHero = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const huskRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Group>(null);
  const meatRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Smooth frame loop for idle rotation
  useFrame((state, delta) => {
    if (isHero && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }

    // Exploded interpolation
    const p = THREE.MathUtils.clamp(explodeProgress, 0, 1);

    if (huskRef.current) {
      huskRef.current.position.x = THREE.MathUtils.lerp(0, -2.4, p);
      huskRef.current.position.y = THREE.MathUtils.lerp(0, 0.5, p);
      huskRef.current.position.z = THREE.MathUtils.lerp(0, -0.2, p);
      huskRef.current.rotation.z = THREE.MathUtils.lerp(0, 0.35, p);
    }

    if (shellRef.current) {
      shellRef.current.position.x = THREE.MathUtils.lerp(0, -0.7, p);
      shellRef.current.position.y = THREE.MathUtils.lerp(0, 1.6, p);
      shellRef.current.position.z = THREE.MathUtils.lerp(0, 0.5, p);
      shellRef.current.rotation.x = THREE.MathUtils.lerp(0, -0.4, p);
    }

    if (meatRef.current) {
      meatRef.current.position.x = THREE.MathUtils.lerp(0, 1.4, p);
      meatRef.current.position.y = THREE.MathUtils.lerp(0, -1.0, p);
      meatRef.current.position.z = THREE.MathUtils.lerp(0, 0.3, p);
      meatRef.current.rotation.y = THREE.MathUtils.lerp(0, 0.5, p);
    }

    if (waterRef.current) {
      waterRef.current.position.x = THREE.MathUtils.lerp(0, 2.4, p);
      waterRef.current.position.y = THREE.MathUtils.lerp(0, 0.8, p);
      waterRef.current.position.z = THREE.MathUtils.lerp(0, 1.0, p);
      const scale = THREE.MathUtils.lerp(0.85, 1.05 + Math.sin(state.clock.elapsedTime * 2) * 0.04, p);
      waterRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 1. KULIT LUAR & SABUT (Outer Husk & Fibers) */}
      <group ref={huskRef}>
        {/* Main Husk Shape (Hemisphere shell) */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.5, 36, 36, 0, Math.PI * 1.5, 0, Math.PI]} />
          <meshStandardMaterial
            color="#5A351D"
            roughness={0.92}
            metalness={0.05}
            bumpScale={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Additional decorative fiber rings */}
        <mesh position={[0, 0, 0]} rotation={[0.2, 0.1, 0]}>
          <torusGeometry args={[1.48, 0.06, 16, 48]} />
          <meshStandardMaterial color="#3D2111" roughness={0.95} />
        </mesh>
      </group>

      {/* 2. TEMPURUNG (Hard Shell) */}
      <group ref={shellRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.25, 32, 32]} />
          <meshStandardMaterial
            color="#2A160C"
            roughness={0.78}
            metalness={0.15}
            bumpScale={0.05}
          />
        </mesh>

        {/* Three coconut eyes */}
        <mesh position={[0.3, 0.9, 0.6]} rotation={[0.4, 0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
          <meshBasicMaterial color="#120904" />
        </mesh>
        <mesh position={[-0.3, 0.9, 0.6]} rotation={[0.4, -0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
          <meshBasicMaterial color="#120904" />
        </mesh>
        <mesh position={[0, 1.05, 0.4]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
          <meshBasicMaterial color="#0A0502" />
        </mesh>
      </group>

      {/* 3. DAGING KELAPA (White Meat / Endosperm) */}
      <group ref={meatRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.05, 32, 32]} />
          <meshStandardMaterial
            color="#FCFAF5"
            roughness={0.25}
            metalness={0.02}
          />
        </mesh>
      </group>

      {/* 4. AIR KELAPA (Coconut Water Core) */}
      <mesh ref={waterRef} castShadow>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshPhysicalMaterial
          color="#B5E4F8"
          transmission={0.92}
          opacity={0.88}
          transparent
          roughness={0.05}
          ior={1.333}
          thickness={1.5}
        />
      </mesh>
    </group>
  );
};
