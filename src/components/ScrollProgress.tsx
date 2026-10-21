import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let ticking = false;

    const updateMaxScroll = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const currentScroll = window.scrollY;
            const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
            barRef.current.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', updateMaxScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReduced]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-stone-200/40"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[#D79AAF] via-[#D6B77A] to-[#71384F] will-change-transform"
        style={{
          transform: 'scaleX(0)',
          transformOrigin: '0 50%',
        }}
      />
    </div>
  );
};
