import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Send, RotateCcw, Cloud, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { launchConfetti } from '../utils/confetti';
import { soundEffects } from '../utils/soundEffects';

interface BalloonItem {
  id: number;
  color: string;
  highlight: string;
  width: number;
  height: number;
  stringLength: number;
  leftPercent: number;
  bottomOffset: number;
  floatDelay: string;
  floatDuration: string;
  rotation: number;
  driftX: number; // horizontal drift when released
}

const BALLOON_DATA: BalloonItem[] = [
  { id: 1, color: '#D79AAF', highlight: '#F4DDE5', width: 62, height: 78, stringLength: 85, leftPercent: 12, bottomOffset: 30, floatDelay: '0s', floatDuration: '6.5s', rotation: -3, driftX: -25 },
  { id: 2, color: '#D6B77A', highlight: '#FFF9F4', width: 72, height: 92, stringLength: 95, leftPercent: 20, bottomOffset: 70, floatDelay: '0.8s', floatDuration: '7.2s', rotation: 4, driftX: 15 },
  { id: 3, color: '#F4DDE5', highlight: '#FFF9F4', width: 56, height: 72, stringLength: 75, leftPercent: 29, bottomOffset: 20, floatDelay: '1.4s', floatDuration: '6.0s', rotation: -2, driftX: -10 },
  { id: 4, color: '#71384F', highlight: '#D79AAF', width: 66, height: 84, stringLength: 90, leftPercent: 38, bottomOffset: 85, floatDelay: '0.3s', floatDuration: '8.0s', rotation: 5, driftX: 20 },
  { id: 5, color: '#E9E3F4', highlight: '#FFF9F4', width: 60, height: 76, stringLength: 80, leftPercent: 48, bottomOffset: 40, floatDelay: '1.9s', floatDuration: '7.5s', rotation: -4, driftX: -15 },
  { id: 6, color: '#F9E6D7', highlight: '#FFF9F4', width: 70, height: 90, stringLength: 92, leftPercent: 58, bottomOffset: 95, floatDelay: '0.6s', floatDuration: '6.8s', rotation: 3, driftX: 30 },
  { id: 7, color: '#D79AAF', highlight: '#F4DDE5', width: 64, height: 80, stringLength: 85, leftPercent: 68, bottomOffset: 25, floatDelay: '1.1s', floatDuration: '7.0s', rotation: -5, driftX: -20 },
  { id: 8, color: '#D6B77A', highlight: '#FFF9F4', width: 68, height: 86, stringLength: 88, leftPercent: 78, bottomOffset: 75, floatDelay: '2.1s', floatDuration: '8.2s', rotation: 2, driftX: 18 },
  { id: 9, color: '#F4DDE5', highlight: '#FFF9F4', width: 58, height: 74, stringLength: 78, leftPercent: 86, bottomOffset: 35, floatDelay: '0.9s', floatDuration: '6.4s', rotation: -3, driftX: -12 },
];

export const BalloonReleaseSection: React.FC = () => {
  const [released, setReleased] = useState(false);
  const [animating, setAnimating] = useState(false);
  const isReduced = useReducedMotion();
  const { balloonScene } = BIRTHDAY_CONFIG;

  const handleRelease = () => {
    if (released || animating) return;
    setAnimating(true);
    soundEffects.playBalloonFloat();

    if (isReduced) {
      setReleased(true);
      setAnimating(false);
      return;
    }

    launchConfetti(window.innerWidth / 2, window.innerHeight * 0.7, 50);

    setTimeout(() => {
      setReleased(true);
      setAnimating(false);
    }, 2400);
  };

  const handleReset = () => {
    soundEffects.playChime(587.33, 0.35, 0.08);
    setReleased(false);
    setAnimating(false);
  };

  return (
    <section
      id="balloons-release"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FFF9F4] text-center overflow-hidden"
    >
      {/* Background Soft Sky Tint */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FFF9F4] via-[#F4DDE5]/20 to-[#FFF9F4] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-3">
          {balloonScene.eyebrow}
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#30252B] font-normal mb-4">
          {balloonScene.heading}
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#30252B]/70 font-sans max-w-lg mb-8 leading-relaxed">
          {balloonScene.subtext}
        </p>

        {/* Interaction Button */}
        <div className="mb-12 flex items-center justify-center gap-4 z-20">
          {!released && (
            <button
              onClick={handleRelease}
              disabled={animating}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#71384F] text-[#FFF9F4] text-xs uppercase tracking-widest font-semibold hover:bg-[#5a2a3e] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
            >
              <Send className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>{balloonScene.releasePrompt}</span>
            </button>
          )}

          {released && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D79AAF]/40 bg-[#FFF9F4] text-[#71384F] text-xs uppercase tracking-widest font-medium hover:bg-[#F4DDE5]/40 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>{balloonScene.replayLabel}</span>
            </button>
          )}
        </div>

        {/* Released Sky Message Card */}
        {released && (
          <div className="animate-in fade-in zoom-in-95 duration-500 max-w-md bg-[#FFF9F4] p-6 border border-[#D6B77A]/40 shadow-md rounded-xs my-6 z-20">
            <div className="flex items-center justify-center gap-2 text-[#D6B77A] mb-2">
              <Cloud className="w-4 h-4" />
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="font-serif italic text-2xl text-[#71384F] mb-1">
              &ldquo;{balloonScene.releasedMessage}&rdquo;
            </p>
            <p className="text-xs uppercase tracking-widest font-sans text-[#30252B]/60 mt-2">
              May every journey take you to greater heights
            </p>
          </div>
        )}

        {/* The Balloon Canopy Canvas */}
        <div className="relative w-full h-[320px] sm:h-[400px] border-b border-[#D79AAF]/25 overflow-hidden">
          {BALLOON_DATA.map((b) => {
            const isAscending = animating || released;
            return (
              <div
                key={b.id}
                className="absolute pointer-events-none transition-all"
                style={{
                  left: `${b.leftPercent}%`,
                  bottom: isAscending ? '130%' : `${b.bottomOffset}px`,
                  opacity: isAscending ? 0 : 0.95,
                  transform: isAscending
                    ? `translateX(${b.driftX * 1.5}px) scale(0.7) rotate(${b.rotation * 2}deg)`
                    : `rotate(${b.rotation}deg)`,
                  transitionDuration: isAscending ? (isReduced ? '0.3s' : '2.5s') : '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                  transitionDelay: isAscending ? `${(b.id % 4) * 0.12}s` : '0s',
                }}
              >
                <div
                  className={!isAscending && !isReduced ? 'animate-float-gentle' : ''}
                  style={{
                    animationDuration: b.floatDuration,
                    animationDelay: b.floatDelay,
                  }}
                >
                  <svg
                    width={b.width}
                    height={b.height + b.stringLength}
                    viewBox={`0 0 ${b.width} ${b.height + b.stringLength}`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="overflow-visible filter drop-shadow-sm"
                  >
                    <defs>
                      <radialGradient
                        id={`balloon-scene-grad-${b.id}`}
                        cx="35%"
                        cy="30%"
                        r="65%"
                        fx="30%"
                        fy="25%"
                      >
                        <stop offset="0%" stopColor={b.highlight} stopOpacity="0.95" />
                        <stop offset="60%" stopColor={b.color} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={b.color} stopOpacity="0.75" />
                      </radialGradient>
                    </defs>

                    {/* Balloon Body */}
                    <ellipse
                      cx={b.width / 2}
                      cy={b.height * 0.46}
                      rx={b.width * 0.44}
                      ry={b.height * 0.46}
                      fill={`url(#balloon-scene-grad-${b.id})`}
                    />

                    {/* Specular Highlight */}
                    <ellipse
                      cx={b.width * 0.35}
                      cy={b.height * 0.28}
                      rx={b.width * 0.12}
                      ry={b.height * 0.18}
                      fill="#FFFFFF"
                      fillOpacity="0.45"
                      transform={`rotate(-18 ${b.width * 0.35} ${b.height * 0.28})`}
                    />

                    {/* Balloon Knot */}
                    <path
                      d={`M${b.width / 2 - 3} ${b.height * 0.92} L${b.width / 2 + 3} ${b.height * 0.92} L${b.width / 2 + 5} ${b.height * 0.96} L${b.width / 2 - 5} ${b.height * 0.96} Z`}
                      fill={b.color}
                      fillOpacity="0.9"
                    />

                    {/* Curving Natural String */}
                    <path
                      d={`M${b.width / 2} ${b.height * 0.96} Q${b.width / 2 - 6} ${b.height + b.stringLength * 0.35}, ${b.width / 2 + 5} ${b.height + b.stringLength * 0.65} T${b.width / 2 - 1} ${b.height + b.stringLength}`}
                      stroke="#D79AAF"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeOpacity="0.6"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
