import React, { useState, useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Camera, Flower2 } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { use3DTilt } from '../hooks/use3DTilt';
import { gsap } from '../utils/gsapConfig';

export const PhotoFeature: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(BIRTHDAY_CONFIG.portrait.imagePath);
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  // Listen to any custom photo preview stored in session
  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem('aswathy_custom_hero_photo');
      if (saved) {
        setCurrentSrc(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const { portrait } = BIRTHDAY_CONFIG;
  const { tiltProps, glareProps } = use3DTilt({ maxTilt: 7, scale: 1.015 });

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

      tl.from('.photo-header-tag', {
        y: 15,
        opacity: 0,
        duration: 0.7,
      })
        .from('.photo-header-title', {
          y: 35,
          opacity: 0,
          duration: 0.9,
        }, '-=0.4')
        .from('.photo-header-desc', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.photo-frame-back', {
          rotation: 0,
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
        }, '-=0.4')
        .from('.photo-mat-main', {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power4.out',
        }, '-=0.6')
        .from('.photo-image-mask', {
          clipPath: 'inset(10% 10% 10% 10%)',
          scale: 1.08,
          duration: 1.2,
          ease: 'power3.inOut',
        }, '-=0.8')
        .from('.photo-narrative', {
          x: 30,
          opacity: 0,
          duration: 0.9,
        }, '-=0.7');

      // Subtle parallax on the back frame
      gsap.to('.photo-frame-back', {
        y: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    },
    sectionRef,
    [isReduced]
  );

  return (
    <section
      ref={sectionRef}
      id="portrait"
      className="relative py-24 sm:py-32 px-6 sm:px-12 bg-[#FFF9F4] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header: Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="photo-header-tag text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-3">
            {portrait.tagLabel}
          </p>
          <div className="overflow-hidden">
            <h2 className="photo-header-title font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#30252B] mb-4">
              {portrait.captionTitle}
            </h2>
          </div>
          <p className="photo-header-desc text-sm sm:text-base text-[#30252B]/70 font-sans leading-relaxed">
            {portrait.captionDescription}
          </p>
        </div>

        {/* Layered Editorial Photo Framing */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Main Photo Mat / Card */}
          <div className="relative group w-full max-w-md sm:max-w-lg">
            {/* Background Layer: Offset decorative frame with Parallax */}
            <div
              className="photo-frame-back absolute -inset-2.5 sm:-inset-4 bg-gradient-to-tr from-[#D6B77A]/25 via-[#F4DDE5]/30 to-[#FFF9F4] rounded-sm transform rotate-1 transition-transform duration-500 group-hover:rotate-0 -z-10 border border-[#D6B77A]/30"
              aria-hidden="true"
            />

            {/* Middle Layer: Secondary offset matting in blush */}
            <div
              className="absolute -inset-1 sm:-inset-2 bg-[#FFF9F4] rounded-sm transform -rotate-1 transition-transform duration-500 group-hover:rotate-0 -z-5 border border-[#D79AAF]/25 shadow-sm"
              aria-hidden="true"
            />

            {/* Primary Mat Frame with 3D Tilt */}
            <div
              {...tiltProps}
              className="photo-mat-main relative bg-[#FFF9F4] p-4 sm:p-6 border border-[#D79AAF]/30 shadow-lg rounded-xs overflow-hidden"
            >
              {/* Dynamic 3D Glare Sheen */}
              <div
                {...glareProps}
                className="absolute inset-0 pointer-events-none z-20"
                aria-hidden="true"
              />

              {/* Image / Fallback Container with strict 3:4 portrait aspect ratio */}
              <div className="photo-image-mask relative aspect-[3/4] w-full overflow-hidden bg-[#F4DDE5]/20 border border-[#D79AAF]/20 rounded-xs flex flex-col items-center justify-center text-center p-8">
                {/* Real Image (when provided at configured path) */}
                {!imageError && (
                  <img
                    src={currentSrc}
                    alt={`${BIRTHDAY_CONFIG.recipient.name}'s Portrait`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      if (currentSrc.endsWith('.jpg')) {
                        const fallbackSvg = currentSrc.replace('.jpg', '.svg');
                        if (currentSrc !== fallbackSvg) {
                          setCurrentSrc(fallbackSvg);
                          return;
                        }
                      }
                      setImageError(true);
                    }}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}

                {/* Intentional Editorial Fallback Placeholder (when image is missing or loading) */}
                {(!imageLoaded || imageError) && (
                  <div className="flex flex-col items-center justify-center max-w-xs z-10">
                    <div className="w-16 h-16 rounded-full border border-[#D6B77A]/50 bg-[#FFF9F4] flex items-center justify-center mb-6 shadow-xs text-[#71384F]">
                      <Flower2 className="w-8 h-8 text-[#71384F]" />
                    </div>

                    <p className="font-serif italic text-2xl sm:text-3xl text-[#30252B] leading-snug mb-4">
                      &ldquo;{portrait.fallbackQuote}&rdquo;
                    </p>

                    <div className="w-12 h-[1px] bg-[#D6B77A] my-3" />

                    <p className="text-xs uppercase tracking-widest font-sans text-[#71384F]/70 font-medium">
                      {portrait.fallbackSubtext}
                    </p>

                    {/* Helpful subtle badge for the user / developer */}
                    <div className="mt-6 flex items-center gap-1.5 text-[11px] text-[#30252B]/60 font-mono bg-stone-100/80 px-2.5 py-1 rounded-sm border border-stone-200/60">
                      <Camera className="w-3 h-3 text-[#71384F]" />
                      <span>{portrait.imagePath}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mat Inscription footer */}
              <div className="mt-4 pt-3 border-t border-[#D79AAF]/20 flex items-center justify-between text-xs text-[#30252B]/65 font-sans">
                <span className="font-serif italic text-sm text-[#71384F]">
                  {BIRTHDAY_CONFIG.recipient.name}
                </span>
                <span className="tracking-widest uppercase text-[10px]">
                  Archival Portrait · 2026
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Side Narrative */}
          <div className="photo-narrative max-w-md lg:max-w-sm flex flex-col justify-center text-left">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#D6B77A] mb-3">
              Reflection
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#30252B] font-light mb-5 leading-tight">
              Grace in every quiet second.
            </h3>
            <p className="text-[#30252B]/80 font-serif text-lg leading-relaxed mb-6">
              Some people enter a room and bring an unmistakable calm. Your kindness, laughter, and authentic self inspire everyone around you.
            </p>
            <div className="p-4 bg-[#F4DDE5]/30 border border-[#D79AAF]/30 rounded-xs">
              <p className="text-xs font-sans text-[#71384F] leading-relaxed">
                <strong>Photo Note:</strong> This frame is ready to showcase Aswathy's picture. Simply drop your favorite portrait into{' '}
                <code className="text-[#71384F] font-mono text-[11px]">/public/images/aswathy-portrait.jpg</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
