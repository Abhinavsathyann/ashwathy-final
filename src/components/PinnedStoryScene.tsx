import React, { useRef, useState, useEffect } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Sparkles, Flower2, Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

export const PinnedStoryScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  const { storyScene, recipient, portrait } = BIRTHDAY_CONFIG;

  useEffect(() => {
    let timer: number;
    const checkWidth = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const next = window.innerWidth >= 768;
        setIsDesktop((prev) => (prev !== next ? next : prev));
      }, 150);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  useGsapContext(
    () => {
      if (isReduced || !isDesktop) return;

      const pinTarget = pinTargetRef.current;
      const container = containerRef.current;
      if (!pinTarget || !container) return;

      // Master scrubbed timeline for the pinned sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=130%',
          pin: pinTarget,
          scrub: 0.7,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      // Stage 1 -> Stage 2 transition
      tl.to('.scene-stage-1', {
        opacity: 0,
        y: -25,
        duration: 0.8,
        ease: 'power2.inOut',
        force3D: true,
      })
        .to('.scene-medallion', {
          scale: 1.06,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        }, '<')
        .fromTo(
          '.scene-stage-2',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', force3D: true },
          '-=0.2'
        )

        // Stage 2 -> Stage 3 transition
        .to('.scene-stage-2', {
          opacity: 0,
          y: -25,
          duration: 0.8,
          ease: 'power2.inOut',
          force3D: true,
        }, '+=0.3')
        .to('.scene-medallion', {
          scale: 1.12,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        }, '<')
        .fromTo(
          '.scene-stage-3',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', force3D: true },
          '-=0.2'
        );
    },
    containerRef,
    [isReduced, isDesktop]
  );

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative bg-[#FFF9F4] text-[#30252B] overflow-hidden"
    >
      {/* Desktop Pinned Scene Container */}
      <div
        ref={pinTargetRef}
        className="w-full min-h-screen flex flex-col justify-center items-center py-16 px-6 sm:px-12 relative"
      >
        {/* Soft background ambient gradients */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#FFF9F4] via-[#F4DDE5]/20 to-[#FFF9F4] pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#D6B77A]/15 via-transparent to-transparent blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Chapter Kicker */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#71384F]">
            {storyScene.chapterTag}
          </p>
          <div className="w-12 h-[1px] bg-[#D6B77A] mx-auto mt-3" />
        </div>

        {/* Central Composition Layout: Medallion + Dynamic Story Copy */}
        <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          {/* Visual Medallion / Centerpiece Lens */}
          <div className="relative shrink-0">
            {/* Outer decorative ring */}
            <div className="absolute -inset-3 rounded-full border border-dashed border-[#D6B77A]/50 animate-float-gentle pointer-events-none" />

            <div className="scene-medallion w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-[#FFF9F4] border-2 border-[#D79AAF]/40 shadow-md relative flex items-center justify-center overflow-hidden transition-all duration-500">
              {/* Inner artistic botanical seal */}
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#F4DDE5]/50 to-[#FFF9F4] flex flex-col items-center justify-center text-center p-4 border border-[#D79AAF]/20">
                <Flower2 className="w-8 h-8 text-[#71384F] mb-1 opacity-80" />
                <span className="font-serif italic text-2xl text-[#71384F]">
                  {recipient.name}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#D6B77A] font-sans font-medium mt-1">
                  Constellation
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#D6B77A] mt-2 opacity-60" />
              </div>
            </div>
          </div>

          {/* Evolving Story Copy Stages (Stacked on desktop for pin crossfade, regular flow on mobile) */}
          <div className="relative min-h-[180px] sm:min-h-[220px] max-w-lg w-full flex items-center">
            {/* STAGE 1 */}
            <div
              className={`scene-stage-1 ${
                isDesktop && !isReduced ? 'absolute inset-0 flex flex-col justify-center' : 'mb-8'
              }`}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B77A] font-sans font-semibold mb-2">
                <span>{storyScene.stages[0].eyebrow}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#30252B] font-light leading-snug mb-3">
                &ldquo;{storyScene.stages[0].quote}&rdquo;
              </h3>
              <p className="text-[#30252B]/75 font-serif text-base sm:text-lg leading-relaxed">
                {storyScene.stages[0].subtext}
              </p>
            </div>

            {/* STAGE 2 */}
            <div
              className={`scene-stage-2 ${
                isDesktop && !isReduced
                  ? 'absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none'
                  : 'mb-8'
              }`}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#71384F] font-sans font-semibold mb-2">
                <span>{storyScene.stages[1].eyebrow}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#30252B] font-light leading-snug mb-3">
                &ldquo;{storyScene.stages[1].quote}&rdquo;
              </h3>
              <p className="text-[#30252B]/75 font-serif text-base sm:text-lg leading-relaxed">
                {storyScene.stages[1].subtext}
              </p>
            </div>

            {/* STAGE 3 */}
            <div
              className={`scene-stage-3 ${
                isDesktop && !isReduced
                  ? 'absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none'
                  : ''
              }`}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B77A] font-sans font-semibold mb-2">
                <span>{storyScene.stages[2].eyebrow}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#30252B] font-light leading-snug mb-3">
                &ldquo;{storyScene.stages[2].quote}&rdquo;
              </h3>
              <p className="text-[#30252B]/75 font-serif text-base sm:text-lg leading-relaxed">
                {storyScene.stages[2].subtext}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue for pinned scene */}
        {isDesktop && !isReduced && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#71384F]/40 font-sans">
            <Heart className="w-3 h-3 text-[#D79AAF]" />
            <span>Scroll gently to unfurl the story</span>
          </div>
        )}
      </div>
    </section>
  );
};
