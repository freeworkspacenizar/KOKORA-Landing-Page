import React, { useRef, useMemo } from 'react';
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
  const rimRef = useRef<THREE.Group>(null);
  const meatRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  const capRef = useRef<THREE.Group>(null);
  const strawRef = useRef<THREE.Group>(null);
  const iceRef = useRef<THREE.Group>(null);

  // 1. Organic Green Young Coconut Body Profile (LatheGeometry)
  const huskGeo = useMemo(() => {
    const points = [
      new THREE.Vector2(0.001, -1.25), // bottom center
      new THREE.Vector2(0.52, -1.20),  // rounded base
      new THREE.Vector2(0.92, -0.98),  // lower curve
      new THREE.Vector2(1.22, -0.55),  // lower belly
      new THREE.Vector2(1.32, -0.10),  // max belly width
      new THREE.Vector2(1.28, 0.35),   // upper belly
      new THREE.Vector2(1.12, 0.70),   // shoulder
      new THREE.Vector2(0.94, 0.84),   // knife-trimmed shoulder edge
    ];
    const geo = new THREE.LatheGeometry(points, 42);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 2. Knife-Trimmed Fibrous Husk Rim (Pangkasan Sabut Muda)
  const trimGeo = useMemo(() => {
    const points = [
      new THREE.Vector2(0.94, 0.84),
      new THREE.Vector2(0.80, 0.865),
      new THREE.Vector2(0.64, 0.88),
    ];
    const geo = new THREE.LatheGeometry(points, 36);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 3. Soft White Coconut Meat Ring & Inner Cavity (Daging Kelapa Muda)
  const meatGeo = useMemo(() => {
    const points = [
      new THREE.Vector2(0.65, 0.88),
      new THREE.Vector2(0.58, 0.875),
      new THREE.Vector2(0.53, 0.82),
      new THREE.Vector2(0.50, 0.68),
      new THREE.Vector2(0.001, 0.64),
    ];
    const geo = new THREE.LatheGeometry(points, 36);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 4. White Flexible Bent Straw (Sedotan Kelapa Muda)
  const { strawGeo, bendRings } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.08, 0.50, -0.05),
      new THREE.Vector3(0.16, 0.88, -0.02),
      new THREE.Vector3(0.24, 1.25, 0.04),
      new THREE.Vector3(0.30, 1.45, 0.10),
      new THREE.Vector3(0.54, 1.72, 0.22),
    ]);
    const geo = new THREE.TubeGeometry(curve, 48, 0.04, 16, false);

    // Positions for accordion corrugated rings along the flexible bend
    const rings = [
      { pos: [0.27, 1.35, 0.06] as [number, number, number], rot: [0.3, -0.2, -0.3] as [number, number, number] },
      { pos: [0.29, 1.41, 0.08] as [number, number, number], rot: [0.35, -0.2, -0.35] as [number, number, number] },
      { pos: [0.32, 1.48, 0.11] as [number, number, number], rot: [0.4, -0.2, -0.42] as [number, number, number] },
      { pos: [0.37, 1.54, 0.14] as [number, number, number], rot: [0.45, -0.2, -0.5] as [number, number, number] },
    ];

    return { strawGeo: geo, bendRings: rings };
  }, []);

  // 5. Water Droplets on Green Skin (Bulir Embun Segar)
  const droplets = useMemo(() => {
    const list: { pos: [number, number, number]; scale: number }[] = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      const phi = (i * 137.5 * Math.PI) / 180;
      const t = i / count;
      const y = THREE.MathUtils.lerp(-0.85, 0.65, t);

      // Approximate radius at height y
      let r = 1.28;
      if (y < -0.2) {
        r = 0.90 + (y + 1.2) * 0.40;
      } else if (y > 0.2) {
        r = 1.30 - (y - 0.2) * 0.38;
      }

      const x = Math.cos(phi) * (r + 0.02);
      const z = Math.sin(phi) * (r + 0.02);
      const scale = 0.018 + (i % 4) * 0.007;
      list.push({ pos: [x, y, z], scale });
    }
    return list;
  }, []);

  // Frame Loop for idle rotation and liquid shimmer
  useFrame((state, delta) => {
    if (isHero && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
    }

    // Liquid surface subtle specular ripple
    if (waterRef.current) {
      const ripple = Math.sin(state.clock.elapsedTime * 2.5) * 0.008;
      waterRef.current.position.y = 0.74 + ripple;
    }

    // Exploded interpolation for Section 03 pinned scroll
    const p = THREE.MathUtils.clamp(explodeProgress, 0, 1);

    if (huskRef.current) {
      huskRef.current.position.x = THREE.MathUtils.lerp(0, -2.4, p);
      huskRef.current.position.y = THREE.MathUtils.lerp(0, 0.3, p);
      huskRef.current.position.z = THREE.MathUtils.lerp(0, -0.2, p);
      huskRef.current.rotation.z = THREE.MathUtils.lerp(0, 0.28, p);
    }

    if (rimRef.current) {
      rimRef.current.position.x = THREE.MathUtils.lerp(0, -0.8, p);
      rimRef.current.position.y = THREE.MathUtils.lerp(0, 1.7, p);
      rimRef.current.position.z = THREE.MathUtils.lerp(0, 0.4, p);
      rimRef.current.rotation.x = THREE.MathUtils.lerp(0, -0.35, p);
    }

    if (meatRef.current) {
      meatRef.current.position.x = THREE.MathUtils.lerp(0, 1.4, p);
      meatRef.current.position.y = THREE.MathUtils.lerp(0, -1.0, p);
      meatRef.current.position.z = THREE.MathUtils.lerp(0, 0.3, p);
      meatRef.current.rotation.y = THREE.MathUtils.lerp(0, 0.45, p);
    }

    if (waterRef.current) {
      waterRef.current.position.x = THREE.MathUtils.lerp(0, 2.3, p);
      waterRef.current.position.y = THREE.MathUtils.lerp(0.74, 0.8, p);
      waterRef.current.position.z = THREE.MathUtils.lerp(0, 0.9, p);
      const scale = THREE.MathUtils.lerp(1.0, 1.35 + Math.sin(state.clock.elapsedTime * 2) * 0.05, p);
      waterRef.current.scale.set(scale, scale, scale);
    }

    if (capRef.current) {
      capRef.current.position.x = THREE.MathUtils.lerp(0.46, 0.8, p);
      capRef.current.position.y = THREE.MathUtils.lerp(0.96, 2.3, p);
      capRef.current.position.z = THREE.MathUtils.lerp(0.18, 0.5, p);
      capRef.current.rotation.x = THREE.MathUtils.lerp(0.35, 0.7, p);
      capRef.current.rotation.z = THREE.MathUtils.lerp(-0.65, -0.2, p);
    }

    if (strawRef.current) {
      strawRef.current.position.y = THREE.MathUtils.lerp(0, 1.8, p);
      strawRef.current.position.x = THREE.MathUtils.lerp(0, 0.3, p);
      strawRef.current.rotation.z = THREE.MathUtils.lerp(0, 0.2, p);
    }

    if (iceRef.current) {
      iceRef.current.position.x = THREE.MathUtils.lerp(0, -1.2, p);
      iceRef.current.position.z = THREE.MathUtils.lerp(0, 0.8, p);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} dispose={null}>
      {/* =========================================================
          1. KULIT LUAR HIJAU & EMBUN (Outer Green Husk & Dew Drops)
          ========================================================= */}
      <group ref={huskRef}>
        {/* Main Green Husk Body */}
        <mesh geometry={huskGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#589B27"
            roughness={0.32}
            metalness={0.02}
            clearcoat={0.65}
            clearcoatRoughness={0.18}
            reflectivity={0.6}
            sheen={0.4}
            sheenColor={new THREE.Color('#98D13F')}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 3D Water Droplets Clinging to Green Skin */}
        {droplets.map((d, index) => (
          <mesh key={index} position={d.pos} scale={d.scale}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.96}
              ior={1.333}
              roughness={0.03}
              clearcoat={1.0}
              transparent
              opacity={0.92}
            />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          2. PANGKASAN SABUT MUDA (Knife-Trimmed Fibrous Rim)
          ========================================================= */}
      <group ref={rimRef}>
        <mesh geometry={trimGeo} castShadow receiveShadow>
          <meshStandardMaterial
            color="#E0D1B4"
            roughness={0.85}
            metalness={0.04}
            bumpScale={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Shell Ring Border */}
        <mesh position={[0, 0.87, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.63, 0.66, 36]} />
          <meshStandardMaterial color="#6B4B2A" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================
          3. DAGING KELAPA MUDA KERUK (Soft Silky White Endosperm)
          ========================================================= */}
      <group ref={meatRef}>
        <mesh geometry={meatGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#FCFAF5"
            roughness={0.36}
            metalness={0.02}
            clearcoat={0.35}
            clearcoatRoughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* =========================================================
          4. AIR KELAPA ISOTONIK MURNI (Pure Glistening Coconut Water)
          ========================================================= */}
      <mesh ref={waterRef} position={[0, 0.74, 0]} castShadow>
        {explodeProgress > 0.05 ? (
          // In exploded view: spherical floating water bubble
          <sphereGeometry args={[0.78, 36, 36]} />
        ) : (
          // In assembled view: liquid meniscus cylinder filling the cavity
          <cylinderGeometry args={[0.54, 0.50, 0.16, 36]} />
        )}
        <meshPhysicalMaterial
          color="#D8F4EE"
          transmission={0.94}
          opacity={0.88}
          transparent
          roughness={0.04}
          ior={1.333}
          thickness={1.4}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* =========================================================
          5. TUTUP PANGKASAN KELAPA (Trimmed Conical Husk Cap)
          ========================================================= */}
      <group
        ref={capRef}
        position={[0.46, 0.96, 0.18]}
        rotation={[0.35, 0.2, -0.65]}
      >
        {/* Green top of the trimmed cap */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <coneGeometry args={[0.38, 0.32, 24]} />
          <meshPhysicalMaterial
            color="#589B27"
            roughness={0.34}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </mesh>
        {/* Pale sliced fibrous base of the cap */}
        <mesh position={[0, 0.01, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.36, 0.06, 24]} />
          <meshStandardMaterial color="#E0D1B4" roughness={0.85} />
        </mesh>
        {/* Soft white coconut meat slice attached under the cap */}
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.30, 0.28, 0.03, 24]} />
          <meshStandardMaterial color="#FCFAF5" roughness={0.38} />
        </mesh>
      </group>

      {/* =========================================================
          6. SEDOTAN PUTIH BERTEKSTUR LEKUK (White Flexible Straw)
          ========================================================= */}
      <group ref={strawRef}>
        <mesh geometry={strawGeo} castShadow>
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.2}
            metalness={0.05}
            clearcoat={0.7}
            transmission={0.12}
          />
        </mesh>
        {/* Corrugated Accordion Flexible Rings */}
        {bendRings.map((ring, idx) => (
          <mesh key={idx} position={ring.pos} rotation={ring.rot}>
            <torusGeometry args={[0.044, 0.007, 10, 20]} />
            <meshStandardMaterial color="#F0F0F0" roughness={0.25} />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          7. BONGKAHAN ES KRISTAL SEGAR (Crystal Ice Cubes at Base)
          ========================================================= */}
      <group ref={iceRef}>
        {/* Ice Cube 1 */}
        <mesh
          position={[-1.35, -1.15, 0.55]}
          rotation={[0.15, 0.55, -0.1]}
          scale={[0.36, 0.34, 0.36]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#EAF8FA"
            transmission={0.95}
            ior={1.31}
            roughness={0.06}
            thickness={0.6}
            clearcoat={1.0}
            transparent
            opacity={0.88}
          />
        </mesh>
        {/* Ice Cube 2 */}
        <mesh
          position={[-0.98, -1.22, 1.05]}
          rotation={[-0.25, 0.4, 0.2]}
          scale={[0.30, 0.28, 0.30]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#EAF8FA"
            transmission={0.95}
            ior={1.31}
            roughness={0.06}
            thickness={0.5}
            clearcoat={1.0}
            transparent
            opacity={0.88}
          />
        </mesh>
      </group>
    </group>
  );
};
