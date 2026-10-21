import React, { useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from '../utils/gsapConfig';

export const FooterSection: React.FC = () => {
  const { footer } = BIRTHDAY_CONFIG;
  const footerRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  useGsapContext(
    () => {
      if (isReduced) return;

      gsap.from('.footer-content', {
        y: 25,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    footerRef,
    [isReduced]
  );

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-6 sm:px-12 bg-[#FFF9F4] text-center border-t border-[#D79AAF]/25"
    >
      <div className="footer-content max-w-2xl mx-auto flex flex-col items-center">
        {/* Delicate Heart Icon with subtle float */}
        <div className="mb-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#F4DDE5]/50 border border-[#D79AAF]/40">
          <Heart className="w-3.5 h-3.5 text-[#71384F] fill-[#71384F]" />
        </div>

        {/* Closing Message */}
        <p className="font-serif italic text-lg sm:text-xl text-[#30252B] mb-2">
          {footer.message}
        </p>

        {/* Dedication line */}
        <p className="text-xs uppercase tracking-widest font-sans text-[#71384F]/60">
          {footer.dedication} · {footer.year}
        </p>

        {/* Hairline anchor */}
        <div className="w-16 h-[1px] bg-[#D6B77A]/40 mt-8" />
      </div>
    </footer>
  );
};
