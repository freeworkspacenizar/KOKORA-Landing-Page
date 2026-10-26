import React from 'react';

export const SceneLighting: React.FC = () => {
  return (
    <>
      {/* Warm Tropical Key Light */}
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2}
        color="#FFF6E5"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Deep Forest Fill Light */}
      <directionalLight
        position={[-6, -2, -3]}
        intensity={0.8}
        color="#173F32"
      />

      {/* Fresh Lime Rim Light */}
      <spotLight
        position={[0, 8, -5]}
        intensity={2.8}
        color="#B9D957"
        angle={0.6}
        penumbra={0.8}
      />

      {/* Direct Sun Glisten on Water Pool & Ice */}
      <pointLight
        position={[0.8, 3.2, 1.6]}
        intensity={1.4}
        color="#FFFFFF"
        distance={10}
      />

      {/* Ambient Hemisphere Light */}
      <hemisphereLight
        args={['#F5F0E5', '#0D241C', 0.9]}
      />
    </>
  );
};
