import React, { useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { ArrowDown, Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { soundEffects } from '../utils/soundEffects';
import { gsap } from '../utils/gsapConfig';

interface IntroSectionProps {
  onEnter: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  useGsapContext(
    () => {
      if (isReduced) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.0 },
      });

      tl.from('.intro-glow', {
        scale: 0.85,
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out',
      })
        .from('.intro-emblem', {
          y: 20,
          opacity: 0,
          duration: 0.9,
        }, '-=1.2')
        .from('.intro-eyebrow', {
          y: 15,
          opacity: 0,
          duration: 0.8,
        }, '-=0.7')
        .from('.intro-title-line', {
          y: 50,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
        }, '-=0.6')
        .from('.intro-divider', {
          scaleX: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.6')
        .from('.intro-quote', {
          y: 20,
          opacity: 0,
          duration: 0.9,
        }, '-=0.5')
        .from('.intro-cta', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.intro-scroll-indicator', {
          opacity: 0,
          duration: 0.8,
        }, '-=0.3');
    },
    containerRef,
    [isReduced]
  );

  const handleEnter = () => {
    soundEffects.playChime(659.25, 0.4, 0.1);
    onEnter();
  };

  return (
    <section
      ref={containerRef}
      id="prologue"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-12 pt-20 pb-16 bg-[#FFF9F4] bg-grain overflow-hidden"
    >
      {/* Decorative ambient background radial glow */}
      <div
        className="intro-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#F4DDE5]/40 via-[#F9E6D7]/30 to-[#E9E3F4]/20 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Subtle decorative monogram emblem */}
        <div
          className={`intro-emblem mb-8 flex items-center justify-center w-14 h-14 rounded-full border border-[#D79AAF]/30 bg-[#FFF9F4]/80 shadow-xs ${
            isReduced ? '' : 'transition-transform duration-700 hover:scale-105'
          }`}
        >
          <span className="font-serif italic text-xl text-[#71384F]">
            {BIRTHDAY_CONFIG.recipient.initials}
          </span>
        </div>

        {/* Eyebrow */}
        <p className="intro-eyebrow text-xs sm:text-sm uppercase tracking-[0.25em] font-sans font-medium text-[#71384F]/80 mb-4">
          {BIRTHDAY_CONFIG.opening.eyebrow}
        </p>

        {/* Main Title with Masked Line Reveal */}
        <div className="overflow-hidden mb-6">
          <h1 className="intro-title-line font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#30252B] leading-[1.05]">
            {BIRTHDAY_CONFIG.opening.title}
          </h1>
        </div>

        {/* Hairline Divider with Small Heart */}
        <div className="intro-divider flex items-center gap-4 w-48 mb-8 origin-center">
          <div className="h-[1px] flex-1 bg-[#D79AAF]" />
          <Heart className="w-3.5 h-3.5 text-[#D79AAF] fill-[#D79AAF] shrink-0" />
          <div className="h-[1px] flex-1 bg-[#D79AAF]" />
        </div>

        {/* Supporting Text */}
        <p className="intro-quote text-lg sm:text-xl lg:text-2xl text-[#30252B]/80 font-serif italic max-w-xl mb-10 leading-relaxed">
          &ldquo;{BIRTHDAY_CONFIG.opening.supportingText}&rdquo;
        </p>

        {/* Clear Primary Action Button */}
        <div className="intro-cta">
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#71384F] text-[#FFF9F4] text-sm uppercase tracking-widest font-semibold hover:bg-[#5a2a3e] active:scale-98 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9F4]"
          >
            <span>{BIRTHDAY_CONFIG.opening.buttonText}</span>
            <ArrowDown className="w-4 h-4 text-[#D6B77A] group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* Downward scroll indicator */}
      <div className="intro-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={handleEnter}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#30252B]/40 hover:text-[#71384F] transition-colors cursor-pointer group"
          aria-label="Scroll to birthday celebration"
        >
          <span className="font-sans font-medium">{BIRTHDAY_CONFIG.opening.scrollHint}</span>
          <div className="w-5 h-8 rounded-full border border-[#D79AAF]/50 flex items-start justify-center p-1">
            <div
              className={`w-1 h-2 bg-[#71384F] rounded-full ${
                isReduced ? '' : 'animate-bounce'
              }`}
            />
          </div>
        </button>
      </div>
    </section>
  );
};
