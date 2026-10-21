import { useState, useCallback, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface TiltOptions {
  maxTilt?: number; // max tilt degrees (e.g. 8)
  perspective?: number; // CSS perspective px (e.g. 1000)
  scale?: number; // slight scale on hover (e.g. 1.02)
}

/**
 * use3DTilt: Ultra-smooth 60/120fps 3D card tilt & specular reflection on hover
 * Optimized with cached bounding box and requestAnimationFrame throttling to prevent layout thrashing
 */
export function use3DTilt({
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
}: TiltOptions = {}) {
  const isReduced = useReducedMotion();
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const isHovered = useRef(false);
  const cachedRect = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    isHovered.current = true;
    cachedRect.current = e.currentTarget.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isReduced || !isHovered.current) return;

      const rect = cachedRect.current || e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        setTiltStyle({
          transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transition: 'transform 0.08s ease-out',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        });

        setGlareStyle({
          opacity: 0.18,
          background: `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 65%)`,
          transition: 'opacity 0.15s ease-out',
        });
      });
    },
    [isReduced, maxTilt, perspective, scale]
  );

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    cachedRect.current = null;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      transformStyle: 'preserve-3d',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.3s ease-out',
    });
  }, [perspective]);

  return {
    tiltProps: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: tiltStyle,
    },
    glareProps: {
      style: glareStyle,
    },
  };
}
