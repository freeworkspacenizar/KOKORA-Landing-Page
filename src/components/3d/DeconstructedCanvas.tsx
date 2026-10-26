import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CoconutModel } from './CoconutModel';
import { SceneLighting } from './SceneLighting';
import { FallbackPoster } from './FallbackPoster';

interface DeconstructedCanvasProps {
  explodeProgress: number;
}

export const DeconstructedCanvas: React.FC<DeconstructedCanvasProps> = ({
  explodeProgress,
}) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SceneLighting />
        <Suspense fallback={null}>
          <CoconutModel isHero={false} explodeProgress={explodeProgress} />
        </Suspense>
      </Canvas>

      {/* Fallback for no-script or fallback mode */}
      <noscript>
        <FallbackPoster title="Anatomi Kelapa Dekonstruksi" />
      </noscript>
    </div>
  );
};
