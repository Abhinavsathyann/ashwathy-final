import React, { useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { soundEffects } from '../utils/soundEffects';
import { gsap } from '../utils/gsapConfig';

interface ClosingSceneProps {
  onReturnTop: () => void;
}

export const ClosingScene: React.FC<ClosingSceneProps> = ({ onReturnTop }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  const { closingScene, recipient } = BIRTHDAY_CONFIG;

  useGsapContext(
    () => {
      if (isReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out', duration: 1.0 },
      });

      tl.from('.closing-eyebrow', {
        y: 15,
        opacity: 0,
        duration: 0.7,
      })
        .from('.closing-heading', {
          y: 40,
          opacity: 0,
          duration: 1.1,
        }, '-=0.4')
        .from('.closing-support', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.closing-medallion', {
          scale: 0.9,
          opacity: 0,
          duration: 0.9,
        }, '-=0.4')
        .from('.closing-final-msg', {
          y: 25,
          opacity: 0,
          duration: 0.9,
        }, '-=0.4');
    },
    sectionRef,
    [isReduced]
  );

  return (
    <section
      ref={sectionRef}
      id="closing-finale"
      className="relative py-32 sm:py-44 px-6 sm:px-12 bg-gradient-to-b from-[#FFF9F4] via-[#F4DDE5]/30 to-[#FFF9F4] text-center overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#D6B77A]/20 via-[#F4DDE5]/30 to-transparent blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <p className="closing-eyebrow text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-4">
          {closingScene.eyebrow}
        </p>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <h2 className="closing-heading font-serif text-4xl sm:text-6xl lg:text-7xl text-[#30252B] font-normal tracking-tight leading-[1.1]">
            {closingScene.headline}
          </h2>
        </div>

        {/* Supporting text */}
        <p className="closing-support text-lg sm:text-2xl text-[#30252B]/80 font-serif italic max-w-xl mx-auto mb-10 leading-relaxed">
          &ldquo;{closingScene.supportingText}&rdquo;
        </p>

        {/* Central Floral Emblem */}
        <div className="closing-medallion relative my-6">
          <div className="w-20 h-20 rounded-full border border-[#D6B77A] bg-[#FFF9F4] flex items-center justify-center shadow-sm">
            <Heart className="w-8 h-8 text-[#71384F] fill-[#F4DDE5]" />
          </div>
          <div
            className={`absolute -top-2 -right-2 text-[#D6B77A] ${
              isReduced ? '' : 'animate-pulse-soft'
            }`}
          >
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Final Birthday Message in Oversized Serif */}
        <div className="closing-final-msg my-4">
          <p className="font-serif italic text-3xl sm:text-5xl text-[#71384F] font-normal tracking-wide">
            {closingScene.finalBirthdayMessage}
          </p>

          <p className="text-xs uppercase tracking-widest font-sans text-[#D6B77A] font-medium mt-3">
            To A Remarkable Life & An Infinite Journey Ahead
          </p>
        </div>

        {/* Return to Top Button */}
        <div className="mt-12">
          <button
            onClick={() => {
              soundEffects.playChime(880, 0.4, 0.1);
              onReturnTop();
            }}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#D79AAF]/40 bg-[#FFF9F4] text-[#30252B] text-xs uppercase tracking-widest font-medium hover:bg-[#F4DDE5]/40 hover:text-[#71384F] active:scale-95 transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#D6B77A] group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span>{closingScene.returnTopLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
