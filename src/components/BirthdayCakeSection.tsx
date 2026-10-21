import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Wind, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { launchConfetti } from '../utils/confetti';
import { soundEffects } from '../utils/soundEffects';

interface BirthdayCakeSectionProps {
  onTriggerCelebration?: () => void;
}

export const BirthdayCakeSection: React.FC<BirthdayCakeSectionProps> = ({
  onTriggerCelebration,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [animating, setAnimating] = useState(false);
  const isReduced = useReducedMotion();

  const { cakeScene, recipient } = BIRTHDAY_CONFIG;

  const handleBlowCandles = () => {
    if (!candlesLit || animating) return;
    setAnimating(true);
    soundEffects.playCandleBlowout();

    if (isReduced) {
      setCandlesLit(false);
      setAnimating(false);
      return;
    }

    setTimeout(() => {
      setCandlesLit(false);
      setAnimating(false);
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.55, 60);
    }, 600);
  };

  const handleRelight = () => {
    soundEffects.playChime(659.25, 0.4, 0.1);
    setCandlesLit(true);
    setAnimating(false);
  };

  return (
    <section
      id="birthday-cake"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF9F4] via-[#F9E6D7]/20 to-[#FFF9F4] text-center overflow-hidden"
    >
      {/* Ambient warm candlelight glow behind the cake */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-radial from-[#D6B77A]/35 via-[#F4DDE5]/20 to-transparent blur-3xl pointer-events-none transition-opacity duration-1000 -z-0 ${
          candlesLit ? 'opacity-100 scale-110' : 'opacity-20 scale-90'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-3">
          {cakeScene.eyebrow}
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#30252B] font-normal mb-4">
          {cakeScene.heading}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#30252B]/75 font-sans max-w-md mb-10 leading-relaxed">
          {cakeScene.subtext}
        </p>

        {/* Custom Tiered Birthday Cake SVG Illustration */}
        <div className="relative my-4 select-none">
          <svg
            width="280"
            height="260"
            viewBox="0 0 280 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-md mx-auto"
          >
            <defs>
              {/* Stand Gradient */}
              <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9F4" />
                <stop offset="100%" stopColor="#E9E3F4" />
              </linearGradient>

              {/* Bottom Tier Frosting */}
              <linearGradient id="tierBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F9E6D7" />
                <stop offset="50%" stopColor="#FFF9F4" />
                <stop offset="100%" stopColor="#F4DDE5" />
              </linearGradient>

              {/* Top Tier Frosting */}
              <linearGradient id="tierTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F4DDE5" />
                <stop offset="50%" stopColor="#FFF9F4" />
                <stop offset="100%" stopColor="#D79AAF" />
              </linearGradient>

              {/* Flame Radial Glow */}
              <radialGradient id="flameGrad" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FFEA79" />
                <stop offset="75%" stopColor="#D6B77A" />
                <stop offset="100%" stopColor="#71384F" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Cake Pedestal / Stand Base */}
            <path
              d="M100 240 L180 240 L160 220 L120 220 Z"
              fill="url(#standGrad)"
              stroke="#D79AAF"
              strokeWidth="1.2"
            />
            {/* Stand Plate */}
            <ellipse
              cx="140"
              cy="220"
              rx="115"
              ry="16"
              fill="#FFF9F4"
              stroke="#D6B77A"
              strokeWidth="1.5"
            />

            {/* Bottom Tier Cake Base */}
            <path
              d="M45 160 C45 155, 235 155, 235 160 L235 205 C235 218, 45 218, 45 205 Z"
              fill="url(#tierBottomGrad)"
              stroke="#D79AAF"
              strokeWidth="1.2"
            />
            {/* Bottom Tier Decorative Scalloped Icing */}
            <path
              d="M45 165 Q60 176, 75 165 Q90 176, 105 165 Q120 176, 135 165 Q150 176, 165 165 Q180 176, 195 165 Q210 176, 225 165 Q235 174, 235 165"
              stroke="#71384F"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Top Tier Cake Base */}
            <path
              d="M75 110 C75 106, 205 106, 205 110 L205 158 C205 168, 75 168, 75 158 Z"
              fill="url(#tierTopGrad)"
              stroke="#D79AAF"
              strokeWidth="1.2"
            />
            {/* Top Tier Scalloped Icing */}
            <path
              d="M75 115 Q90 124, 105 115 Q120 124, 135 115 Q150 124, 165 115 Q180 124, 195 115 Q205 122, 205 115"
              stroke="#71384F"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Botanical decorative sugar berries on cake border */}
            <circle cx="85" cy="115" r="3.5" fill="#71384F" />
            <circle cx="115" cy="118" r="3.5" fill="#D6B77A" />
            <circle cx="140" cy="118" r="4" fill="#71384F" />
            <circle cx="165" cy="118" r="3.5" fill="#D6B77A" />
            <circle cx="195" cy="115" r="3.5" fill="#71384F" />

            {/* Candle 1 (Left) */}
            <g transform="translate(100, 70)">
              <rect x="-3" y="0" width="6" height="38" rx="2" fill="#FFF9F4" stroke="#D79AAF" strokeWidth="1" />
              {/* Spiral Stripe */}
              <path d="M-3 10 L3 16 M-3 22 L3 28" stroke="#D6B77A" strokeWidth="1.5" />
              {/* Wick */}
              <line x1="0" y1="0" x2="0" y2="-6" stroke="#71384F" strokeWidth="1.2" />

              {/* Flame */}
              <g
                style={{
                  transition: 'all 0.5s ease-out',
                  transform: candlesLit ? 'scale(1)' : 'scale(0)',
                  opacity: candlesLit ? 1 : 0,
                  transformOrigin: '0px -14px',
                }}
              >
                <path
                  d="M0 -22 C-5 -16, -4 -10, 0 -6 C4 -10, 5 -16, 0 -22 Z"
                  fill="url(#flameGrad)"
                  className={candlesLit && !isReduced ? 'animate-pulse-soft' : ''}
                />
              </g>

              {/* Smoke puff when blown out */}
              <g
                style={{
                  transition: 'all 0.8s ease-out',
                  opacity: !candlesLit ? 0.6 : 0,
                  transform: !candlesLit ? 'translateY(-12px)' : 'translateY(0px)',
                }}
              >
                <path
                  d="M0 -8 Q-4 -16, 2 -22 T-1 -30"
                  stroke="#D79AAF"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  fill="none"
                />
              </g>
            </g>

            {/* Candle 2 (Center - Slightly taller) */}
            <g transform="translate(140, 64)">
              <rect x="-3.5" y="0" width="7" height="44" rx="2" fill="#FFF9F4" stroke="#D79AAF" strokeWidth="1" />
              <path d="M-3.5 12 L3.5 18 M-3.5 26 L3.5 32" stroke="#71384F" strokeWidth="1.5" />
              <line x1="0" y1="0" x2="0" y2="-6" stroke="#71384F" strokeWidth="1.2" />

              {/* Flame */}
              <g
                style={{
                  transition: 'all 0.5s ease-out',
                  transform: candlesLit ? 'scale(1.15)' : 'scale(0)',
                  opacity: candlesLit ? 1 : 0,
                  transformOrigin: '0px -15px',
                }}
              >
                <path
                  d="M0 -24 C-6 -17, -5 -10, 0 -6 C5 -10, 6 -17, 0 -24 Z"
                  fill="url(#flameGrad)"
                  className={candlesLit && !isReduced ? 'animate-pulse-soft' : ''}
                  style={{ animationDelay: '0.4s' }}
                />
              </g>

              {/* Smoke puff */}
              <g
                style={{
                  transition: 'all 0.9s ease-out',
                  opacity: !candlesLit ? 0.7 : 0,
                  transform: !candlesLit ? 'translateY(-14px)' : 'translateY(0px)',
                }}
              >
                <path
                  d="M0 -8 Q3 -16, -2 -24 T2 -32"
                  stroke="#D6B77A"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  fill="none"
                />
              </g>
            </g>

            {/* Candle 3 (Right) */}
            <g transform="translate(180, 70)">
              <rect x="-3" y="0" width="6" height="38" rx="2" fill="#FFF9F4" stroke="#D79AAF" strokeWidth="1" />
              <path d="M-3 10 L3 16 M-3 22 L3 28" stroke="#D6B77A" strokeWidth="1.5" />
              <line x1="0" y1="0" x2="0" y2="-6" stroke="#71384F" strokeWidth="1.2" />

              {/* Flame */}
              <g
                style={{
                  transition: 'all 0.5s ease-out',
                  transform: candlesLit ? 'scale(1)' : 'scale(0)',
                  opacity: candlesLit ? 1 : 0,
                  transformOrigin: '0px -14px',
                }}
              >
                <path
                  d="M0 -22 C-5 -16, -4 -10, 0 -6 C4 -10, 5 -16, 0 -22 Z"
                  fill="url(#flameGrad)"
                  className={candlesLit && !isReduced ? 'animate-pulse-soft' : ''}
                  style={{ animationDelay: '0.8s' }}
                />
              </g>

              {/* Smoke puff */}
              <g
                style={{
                  transition: 'all 0.8s ease-out',
                  opacity: !candlesLit ? 0.6 : 0,
                  transform: !candlesLit ? 'translateY(-12px)' : 'translateY(0px)',
                }}
              >
                <path
                  d="M0 -8 Q-3 -16, 2 -22 T-1 -30"
                  stroke="#D79AAF"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  fill="none"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 z-20">
          {candlesLit && (
            <button
              onClick={handleBlowCandles}
              disabled={animating}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#71384F] text-[#FFF9F4] text-xs uppercase tracking-widest font-semibold hover:bg-[#5a2a3e] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
            >
              <Wind className="w-4 h-4 text-[#D6B77A]" />
              <span>{cakeScene.blowPrompt}</span>
            </button>
          )}

          {!candlesLit && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D79AAF]/40 bg-[#FFF9F4] text-[#71384F] text-xs uppercase tracking-widest font-medium hover:bg-[#F4DDE5]/40 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D6B77A]" />
                <span>{cakeScene.relightPrompt}</span>
              </button>

              {onTriggerCelebration && (
                <button
                  onClick={onTriggerCelebration}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#71384F] text-[#FFF9F4] text-xs uppercase tracking-widest font-semibold hover:bg-[#5a2a3e] active:scale-95 transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
                  <span>Grand Celebration</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Wish Revealed Card */}
        {!candlesLit && (
          <div className="animate-in fade-in zoom-in-95 duration-700 max-w-lg bg-[#FFF9F4] p-8 border border-[#D6B77A]/40 shadow-lg rounded-xs my-8 z-20 text-center">
            <div className="flex items-center justify-center gap-2 text-[#71384F] mb-3">
              <Heart className="w-4 h-4 text-[#D79AAF] fill-[#D79AAF]" />
              <span className="text-xs uppercase tracking-widest font-sans font-semibold">
                Wish Granted
              </span>
              <Heart className="w-4 h-4 text-[#D79AAF] fill-[#D79AAF]" />
            </div>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#30252B] leading-snug mb-4">
              &ldquo;{cakeScene.wishMessage}&rdquo;
            </p>

            <div className="w-12 h-[1px] bg-[#D6B77A] mx-auto my-3" />

            <p className="text-xs uppercase tracking-widest font-sans text-[#71384F]/70">
              For {recipient.name} · With Endless Warmth
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
