import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Sparkles, RotateCcw, Heart, Gift as GiftIcon } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { launchConfetti } from '../utils/confetti';
import { soundEffects } from '../utils/soundEffects';
import { use3DTilt } from '../hooks/use3DTilt';

type GiftState = 'closed' | 'opening' | 'opened';

export const InteractiveGift: React.FC = () => {
  const [giftState, setGiftState] = useState<GiftState>('closed');
  const isReduced = useReducedMotion();
  const { interactiveGift, recipient } = BIRTHDAY_CONFIG;
  const { tiltProps, glareProps } = use3DTilt({ maxTilt: 6, scale: 1.01 });

  const handleOpenGift = () => {
    if (giftState !== 'closed') return;

    soundEffects.playMagicalChord();

    if (isReduced) {
      setGiftState('opened');
      return;
    }

    setGiftState('opening');
    // Launch a delicate burst of celebration confetti
    setTimeout(() => {
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.45, 60);
    }, 450);

    setTimeout(() => {
      setGiftState('opened');
    }, 900);
  };

  const handleResetGift = () => {
    soundEffects.playPaperUnfold();
    setGiftState('closed');
  };

  return (
    <section
      id="gift-surprise"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF9F4] via-[#F4DDE5]/25 to-[#FFF9F4] text-center overflow-hidden"
    >
      {/* Background radial halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-[#D6B77A]/25 via-[#F4DDE5]/40 to-transparent blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow kicker */}
        <p className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-3">
          {interactiveGift.eyebrow}
        </p>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#30252B] font-normal mb-4">
          {interactiveGift.heading}
        </h2>

        <p className="text-sm sm:text-base text-[#30252B]/70 font-sans max-w-md mb-10">
          {giftState === 'closed'
            ? interactiveGift.prompt
            : giftState === 'opening'
            ? interactiveGift.openingNotice
            : 'Unwrapped with love, especially for you.'}
        </p>

        {/* Interactive Gift Box Assembly */}
        <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex flex-col items-center justify-center my-4">
          {/* Internal Glow visible during/after opening */}
          <div
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#D6B77A]/40 blur-2xl transition-all duration-700 pointer-events-none ${
              giftState !== 'closed' ? 'opacity-100 scale-125' : 'opacity-0 scale-75'
            }`}
          />

          {/* Emerged Gift Message Card with 3D Tilt */}
          <div
            {...tiltProps}
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#FFF9F4] border border-[#D79AAF]/40 shadow-xl p-6 sm:p-8 rounded-xs text-left transition-all duration-700 z-20 overflow-hidden ${
              giftState === 'opened'
                ? 'opacity-100 translate-y-[-45%] scale-100 pointer-events-auto'
                : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
            }`}
          >
            {/* Specular glare sheen */}
            <div
              {...glareProps}
              className="absolute inset-0 pointer-events-none z-10"
              aria-hidden="true"
            />
            {/* Small stamp accent */}
            <div className="flex items-center justify-between border-b border-[#D79AAF]/25 pb-3 mb-4">
              <span className="text-xs uppercase tracking-widest font-sans font-medium text-[#71384F]">
                A Keepsake For You
              </span>
              <Heart className="w-3.5 h-3.5 text-[#D79AAF] fill-[#D79AAF]" />
            </div>

            <h4 className="font-serif text-xl sm:text-2xl text-[#71384F] font-medium mb-3">
              {interactiveGift.messageSalutation}
            </h4>

            <p className="font-serif text-base sm:text-lg text-[#30252B]/85 leading-relaxed mb-4">
              {interactiveGift.messageBody}
            </p>

            <p className="font-serif italic text-sm sm:text-base text-[#71384F] leading-relaxed">
              {interactiveGift.messageClosing}
            </p>

            <div className="mt-4 pt-3 border-t border-[#D79AAF]/20 flex items-center justify-between text-xs text-[#30252B]/60 font-sans">
              <span className="font-serif italic text-sm text-[#71384F]">For {recipient.name}</span>
              <span className="font-mono text-[10px] uppercase">Birthday 2026</span>
            </div>
          </div>

          {/* SVG Box & Lid Graphic */}
          <div
            onClick={handleOpenGift}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenGift();
              }
            }}
            tabIndex={giftState === 'closed' ? 0 : -1}
            role="button"
            aria-label={interactiveGift.prompt}
            className={`relative cursor-pointer transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F] rounded-lg select-none ${
              giftState === 'closed' ? 'hover:scale-105 active:scale-98 animate-float-gentle' : ''
            }`}
          >
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-lg"
            >
              <defs>
                <linearGradient id="boxBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9F4" />
                  <stop offset="100%" stopColor="#F4DDE5" />
                </linearGradient>
                <linearGradient id="boxLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4DDE5" />
                  <stop offset="100%" stopColor="#D79AAF" />
                </linearGradient>
                <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#71384F" />
                  <stop offset="50%" stopColor="#D6B77A" />
                  <stop offset="100%" stopColor="#71384F" />
                </linearGradient>
              </defs>

              {/* Box Body */}
              <rect
                x="35"
                y="85"
                width="130"
                height="95"
                rx="4"
                fill="url(#boxBodyGrad)"
                stroke="#D79AAF"
                strokeWidth="1.5"
              />

              {/* Vertical Ribbon on Box Body */}
              <rect
                x="88"
                y="85"
                width="24"
                height="95"
                fill="url(#ribbonGrad)"
              />

              {/* Horizontal Ribbon on Box Body */}
              <rect
                x="35"
                y="125"
                width="130"
                height="16"
                fill="url(#ribbonGrad)"
                opacity="0.9"
              />

              {/* Lid & Bow Group with Opening Animation */}
              <g
                style={{
                  transformOrigin: '40px 65px',
                  transition: isReduced ? 'none' : 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform:
                    giftState === 'closed'
                      ? 'translate(0px, 0px) rotate(0deg)'
                      : 'translate(-35px, -55px) rotate(-28deg)',
                }}
              >
                {/* Lid Base */}
                <rect
                  x="28"
                  y="66"
                  width="144"
                  height="24"
                  rx="3"
                  fill="url(#boxLidGrad)"
                  stroke="#71384F"
                  strokeWidth="1.5"
                />

                {/* Lid Ribbon */}
                <rect
                  x="88"
                  y="66"
                  width="24"
                  height="24"
                  fill="url(#ribbonGrad)"
                />

                {/* Bow Left Loop */}
                <path
                  d="M100 66 C80 35, 50 40, 60 58 C70 74, 95 68, 100 66 Z"
                  fill="#71384F"
                  stroke="#D6B77A"
                  strokeWidth="1.2"
                />

                {/* Bow Right Loop */}
                <path
                  d="M100 66 C120 35, 150 40, 140 58 C130 74, 105 68, 100 66 Z"
                  fill="#71384F"
                  stroke="#D6B77A"
                  strokeWidth="1.2"
                />

                {/* Bow Ribbon Ends */}
                <path
                  d="M92 68 Q80 82, 70 92"
                  stroke="#71384F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M108 68 Q120 82, 130 92"
                  stroke="#71384F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Bow Knot */}
                <circle cx="100" cy="66" r="7" fill="#D6B77A" />
              </g>
            </svg>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          {giftState === 'closed' && (
            <button
              onClick={handleOpenGift}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#71384F] text-[#FFF9F4] text-xs uppercase tracking-widest font-semibold hover:bg-[#5a2a3e] active:scale-95 transition-all shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
            >
              <GiftIcon className="w-4 h-4 text-[#D6B77A]" />
              <span>{interactiveGift.prompt}</span>
            </button>
          )}

          {giftState === 'opened' && (
            <button
              onClick={handleResetGift}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D79AAF]/40 bg-[#FFF9F4] text-[#71384F] text-xs uppercase tracking-widest font-medium hover:bg-[#F4DDE5]/40 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>{interactiveGift.replayLabel}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
