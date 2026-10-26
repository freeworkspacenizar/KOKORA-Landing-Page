import { useState, useEffect } from 'react';

export function useWebGLAvailable(): boolean {
  const [isAvailable, setIsAvailable] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsAvailable(!!gl);
    } catch {
      setIsAvailable(false);
    }
  }, []);

  return isAvailable;
}
