import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CoconutModel } from './CoconutModel';
import { SceneLighting } from './SceneLighting';
import { FallbackPoster } from './FallbackPoster';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { useWebGLAvailable } from '../../hooks/useWebGLAvailable';

interface DeconstructedCanvasProps {
  explodeProgress: number;
  inView?: boolean;
}

export const DeconstructedCanvas: React.FC<DeconstructedCanvasProps> = ({
  explodeProgress,
  inView = true,
}) => {
  const hasWebGL = useWebGLAvailable();

  if (!hasWebGL) {
    return (
      <div className="w-80 h-80 flex items-center justify-center">
        <FallbackPoster title="Anatomi Kelapa Dekonstruksi" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <CanvasErrorBoundary title="Anatomi Kelapa Dekonstruksi">
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <SceneLighting />
          <Suspense fallback={null}>
            <CoconutModel isHero={false} explodeProgress={explodeProgress} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};
