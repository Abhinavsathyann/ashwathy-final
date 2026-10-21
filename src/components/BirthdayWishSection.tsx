import React, { useState, useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Feather, Heart, MailOpen, RotateCcw } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { use3DTilt } from '../hooks/use3DTilt';
import { soundEffects } from '../utils/soundEffects';
import { gsap } from '../utils/gsapConfig';

export const BirthdayWishSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();
  const { tiltProps, glareProps } = use3DTilt({ maxTilt: 7, scale: 1.01 });

  const { letterReveal, recipient } = BIRTHDAY_CONFIG;

  useGsapContext(
    () => {
      if (isReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: letterRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out', duration: 0.9 },
      });

      tl.from('.letter-header-tag', {
        y: 15,
        opacity: 0,
        duration: 0.7,
      })
        .from('.letter-header-title', {
          y: 35,
          opacity: 0,
          duration: 0.9,
        }, '-=0.4')
        .from('.letter-header-support', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.letter-card-container', {
          y: 35,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
        }, '-=0.4');
    },
    letterRef,
    [isReduced]
  );

  const handleToggleLetter = () => {
    soundEffects.playPaperUnfold();
    setIsOpen((prev) => !prev);
  };

  return (
    <section
      ref={letterRef}
      id="letter"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF9F4] via-[#F4DDE5]/20 to-[#FFF9F4] overflow-hidden"
    >
      {/* Background seal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#D79AAF]/15 pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="letter-header-tag inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-3">
            <Feather className="w-3.5 h-3.5 text-[#D6B77A]" />
            <span>{letterReveal.eyebrow}</span>
          </div>
          <div className="overflow-hidden mb-3">
            <h2 className="letter-header-title font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#30252B]">
              {letterReveal.heading}
            </h2>
          </div>
          <p className="letter-header-support text-base sm:text-lg text-[#30252B]/75 font-serif italic max-w-lg mx-auto">
            &ldquo;{letterReveal.supportingText}&rdquo;
          </p>
        </div>

        {/* Closed Envelope Teaser with 3D Tilt when not opened */}
        {!isOpen && (
          <div
            {...tiltProps}
            className="letter-card-container relative flex flex-col items-center justify-center p-8 sm:p-14 bg-[#FFF9F4] border border-[#D79AAF]/35 shadow-lg rounded-xs text-center max-w-xl mx-auto overflow-hidden"
          >
            {/* Specular glare overlay */}
            <div
              {...glareProps}
              className="absolute inset-0 pointer-events-none z-10"
              aria-hidden="true"
            />
            {/* Wax Seal Motif */}
            <div className="w-18 h-18 rounded-full bg-[#71384F] border-2 border-[#D6B77A] flex items-center justify-center shadow-md mb-6 transform hover:scale-105 transition-transform duration-300">
              <span className="font-serif italic text-2xl text-[#FFF9F4]">
                {recipient.initials}
              </span>
            </div>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#30252B] mb-3">
              A Personal Note For Aswathy
            </p>

            <p className="text-xs uppercase tracking-widest font-sans text-[#71384F]/75 mb-8">
              Folded with care · Ready when you are
            </p>

            <button
              onClick={handleToggleLetter}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#71384F] text-[#FFF9F4] text-xs uppercase tracking-widest font-semibold hover:bg-[#5a2a3e] active:scale-95 transition-all shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
            >
              <MailOpen className="w-4 h-4 text-[#D6B77A]" />
              <span>{letterReveal.actionPrompt}</span>
            </button>
          </div>
        )}

        {/* The Unfolded Letter: Refined Editorial Paper Treatment */}
        {isOpen && (
          <article className="animate-in fade-in zoom-in-95 duration-700 relative bg-[#FFF9F4] p-8 sm:p-14 lg:p-16 border border-[#D79AAF]/35 shadow-xl rounded-xs">
            {/* Postage Stamp Accent */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex flex-col items-end opacity-70">
              <div className="w-12 h-14 border border-dashed border-[#D79AAF] flex flex-col items-center justify-center p-1 bg-[#FFF9F4]">
                <Heart className="w-4 h-4 text-[#71384F]" />
                <span className="text-[9px] uppercase tracking-wider text-[#71384F] font-mono mt-1">2026</span>
              </div>
            </div>

            {/* Salutation */}
            <h3 className="font-serif text-3xl sm:text-4xl text-[#71384F] font-medium mb-8">
              {letterReveal.salutation}
            </h3>

            {/* Letter Body with Drop Cap on First Paragraph */}
            <div className="space-y-6 text-[#30252B]/90 font-serif text-lg sm:text-xl sm:leading-relaxed">
              {letterReveal.paragraphs.map((para, index) => {
                if (index === 0) {
                  return (
                    <p key={index} className="leading-relaxed">
                      <span className="float-left text-5xl sm:text-6xl font-serif font-light text-[#71384F] pr-3 pt-1 leading-none select-none">
                        {para.charAt(0)}
                      </span>
                      {para.slice(1)}
                    </p>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Subtle Hairline Divider */}
            <div className="my-10 flex items-center gap-4 opacity-50">
              <div className="h-[1px] flex-1 bg-[#D6B77A]" />
              <span className="text-xs font-serif italic text-[#D6B77A]">✦ ✦ ✦</span>
              <div className="h-[1px] flex-1 bg-[#D6B77A]" />
            </div>

            {/* Closing & Handwritten Inscription */}
            <div className="space-y-3">
              <p className="font-serif text-xl sm:text-2xl text-[#71384F] font-medium">
                {letterReveal.closing}
              </p>

              <p className="font-serif italic text-lg sm:text-xl text-[#30252B]/80 font-light">
                {letterReveal.closingWish}
              </p>

              <div className="pt-4 flex flex-col items-start">
                <span className="text-sm font-sans text-[#30252B]/60">
                  {letterReveal.signoff}
                </span>
                <span
                  style={{ fontFamily: 'var(--font-script, "Alex Brush", cursive)' }}
                  className="text-3xl sm:text-4xl text-[#71384F] mt-1 select-none"
                >
                  Always & Forever
                </span>
              </div>
            </div>

            {/* Action to fold back */}
            <div className="mt-12 pt-6 border-t border-[#D79AAF]/25 flex justify-end">
              <button
                onClick={handleToggleLetter}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans text-[#71384F]/70 hover:text-[#71384F] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{letterReveal.closePrompt}</span>
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
