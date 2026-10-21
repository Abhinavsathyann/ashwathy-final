import React, { useState, useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Sparkles, Gift } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from '../utils/gsapConfig';

export const TeaserSection: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();
  const { teaser } = BIRTHDAY_CONFIG;

  useGsapContext(
    () => {
      if (isReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out', duration: 0.9 },
      });

      tl.from('.teaser-badge', {
        y: 15,
        opacity: 0,
        duration: 0.7,
      })
        .from('.teaser-heading', {
          y: 35,
          opacity: 0,
          duration: 1.0,
        }, '-=0.4')
        .from('.teaser-support', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.teaser-gift-wrap', {
          scale: 0.85,
          y: 30,
          opacity: 0,
          duration: 1.1,
          ease: 'back.out(1.5)',
        }, '-=0.5')
        .from('.teaser-note', {
          y: 15,
          opacity: 0,
          duration: 0.7,
        }, '-=0.4');

      // Slow breathing glow
      gsap.to('.teaser-glow', {
        scale: 1.15,
        opacity: 0.7,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    sectionRef,
    [isReduced]
  );

  return (
    <section
      ref={sectionRef}
      id="teaser"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF9F4] via-[#F4DDE5]/30 to-[#FFF9F4] text-center overflow-hidden"
    >
      {/* Soft glowing halo in background */}
      <div
        className="teaser-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-[#D6B77A]/20 via-[#F4DDE5]/35 to-transparent blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        {/* Subtle Phase tag */}
        <p className="teaser-badge text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#71384F] mb-3">
          {teaser.badge}
        </p>

        {/* Heading */}
        <div className="overflow-hidden mb-4">
          <h2 className="teaser-heading font-serif text-3xl sm:text-5xl lg:text-6xl text-[#30252B] font-normal">
            {teaser.heading}
          </h2>
        </div>

        {/* Supporting text */}
        <p className="teaser-support text-lg sm:text-xl text-[#71384F] font-serif italic mb-10">
          &ldquo;{teaser.supportingText}&rdquo;
        </p>

        {/* Decorative Gift Box Illustration with gentle floating motion & hover feedback */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`teaser-gift-wrap relative cursor-pointer transition-transform duration-500 my-4 ${
            hovered && !isReduced ? '-translate-y-2 scale-105' : ''
          }`}
          aria-label="Decorative gift box preview"
        >
          {/* Subtle floating sparkle on hover */}
          <div
            className={`absolute -top-4 -right-4 text-[#D6B77A] transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <Sparkles className="w-6 h-6" />
          </div>

          <svg
            width="140"
            height="140"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-md"
          >
            <defs>
              <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9F4" />
                <stop offset="100%" stopColor="#F4DDE5" />
              </linearGradient>
              <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F4DDE5" />
                <stop offset="100%" stopColor="#D79AAF" />
              </linearGradient>
            </defs>

            {/* Gift Box Base */}
            <rect
              x="30"
              y="65"
              width="100"
              height="75"
              rx="4"
              fill="url(#boxGrad)"
              stroke="#D79AAF"
              strokeWidth="1.5"
            />

            {/* Vertical Ribbon */}
            <rect
              x="72"
              y="65"
              width="16"
              height="75"
              fill="#71384F"
            />
            <rect
              x="78"
              y="65"
              width="4"
              height="75"
              fill="#D6B77A"
            />

            {/* Box Lid */}
            <rect
              x="24"
              y="50"
              width="112"
              height="20"
              rx="3"
              fill="url(#lidGrad)"
              stroke="#71384F"
              strokeWidth="1.5"
            />
            {/* Lid vertical ribbon */}
            <rect
              x="72"
              y="50"
              width="16"
              height="20"
              fill="#71384F"
            />

            {/* Ribbon Bow Left Loop */}
            <path
              d="M80 50 C65 25, 40 30, 48 45 C55 58, 75 52, 80 50 Z"
              fill="#71384F"
              stroke="#D6B77A"
              strokeWidth="1"
            />

            {/* Ribbon Bow Right Loop */}
            <path
              d="M80 50 C95 25, 120 30, 112 45 C105 58, 85 52, 80 50 Z"
              fill="#71384F"
              stroke="#D6B77A"
              strokeWidth="1"
            />

            {/* Center knot */}
            <circle cx="80" cy="50" r="6" fill="#D6B77A" />
          </svg>
        </div>

        {/* Explanatory Teaser Note */}
        <div className="teaser-note flex flex-col items-center">
          <p className="text-xs uppercase tracking-widest text-[#71384F]/75 font-sans font-medium mt-4">
            {teaser.giftPrompt}
          </p>

          <p className="text-sm text-[#30252B]/60 font-sans max-w-md mt-2">
            {teaser.subNote}
          </p>
        </div>
      </div>
    </section>
  );
};
