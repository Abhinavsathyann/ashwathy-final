import React, { useRef, useState } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Sparkles, Flower2, Heart, Bookmark } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { soundEffects } from '../utils/soundEffects';
import { gsap } from '../utils/gsapConfig';
import { PhotoItem } from './PhotoViewerModal';

interface ScrapbookSectionProps {
  onPhotoClick: (photo: PhotoItem) => void;
}

export const ScrapbookSection: React.FC<ScrapbookSectionProps> = ({ onPhotoClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const { scrapbook, recipient } = BIRTHDAY_CONFIG;

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

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

      tl.from('.scrap-eyebrow', {
        y: 15,
        opacity: 0,
        duration: 0.7,
      })
        .from('.scrap-heading', {
          y: 35,
          opacity: 0,
          duration: 1.0,
        }, '-=0.4')
        .from('.scrap-support', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.scrap-polaroid', {
          y: 35,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.4');
    },
    sectionRef,
    [isReduced]
  );

  return (
    <section
      ref={sectionRef}
      id="scrapbook-memories"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FFF9F4] via-[#F9E6D7]/20 to-[#FFF9F4] overflow-hidden"
    >
      {/* Background paper texture & botanical accent */}
      <div
        className="absolute top-10 left-10 w-48 h-48 opacity-10 pointer-events-none text-[#71384F]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 20C90 50 60 70 30 75C60 85 80 110 85 140C95 110 120 90 150 85C120 75 105 50 100 20Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="scrap-eyebrow inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-3">
            <Bookmark className="w-3.5 h-3.5 text-[#D6B77A]" />
            <span>{scrapbook.eyebrow}</span>
          </div>
          <div className="overflow-hidden mb-4">
            <h2 className="scrap-heading font-serif text-4xl sm:text-5xl lg:text-6xl text-[#30252B] font-normal">
              {scrapbook.heading}
            </h2>
          </div>
          <p className="scrap-support text-base sm:text-lg text-[#30252B]/75 font-serif italic max-w-xl mx-auto leading-relaxed">
            &ldquo;{scrapbook.supportingMessage}&rdquo;
          </p>
        </div>

        {/* Polaroid Scrapbook Grid with realistic tape & pin details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pt-4">
          {scrapbook.items.map((item, index) => {
            const rotStyle = isReduced ? {} : { transform: `rotate(${item.rotation}deg)` };

            return (
              <div
                key={item.id}
                className="scrap-polaroid group relative transition-transform duration-300 hover:rotate-0 hover:scale-103 hover:z-20"
                style={rotStyle}
              >
                {/* Washi Tape Accent at the top of each polaroid */}
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 opacity-85 z-20 shadow-xs pointer-events-none"
                  style={{
                    backgroundColor: item.tapeColor || '#D6B77A',
                    transform: `rotate(${index % 2 === 0 ? '-3deg' : '3deg'})`,
                  }}
                  aria-hidden="true"
                />

                {/* Polaroid Frame */}
                <div
                  onClick={() => {
                    soundEffects.playChime(830.61, 0.25, 0.07);
                    onPhotoClick({
                      id: item.id,
                      src: item.src,
                      alt: item.alt,
                      caption: item.label,
                      tag: item.tag,
                    });
                  }}
                  className="bg-[#FFF9F4] p-4 pb-6 border border-[#D79AAF]/35 shadow-md group-hover:shadow-xl transition-shadow duration-300 rounded-xs cursor-pointer flex flex-col"
                >
                  {/* Photo area */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F4DDE5]/30 border border-[#D79AAF]/20 rounded-xs">
                    {!failedImages[item.id] ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      />
                    ) : null}

                    {failedImages[item.id] && (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#F9E6D7]/40">
                        <Flower2 className="w-7 h-7 text-[#71384F] mb-1 opacity-80" />
                        <span className="font-serif italic text-sm text-[#30252B] mb-1">
                          {item.tag}
                        </span>
                        <span className="text-[10px] uppercase font-mono text-[#71384F]/60">
                          {item.src}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Polaroid Label Bottom */}
                  <div className="mt-4 flex flex-col items-center text-center">
                    <p
                      style={{ fontFamily: 'var(--font-script, "Alex Brush", cursive)' }}
                      className="text-2xl sm:text-2xl text-[#71384F] leading-tight select-none"
                    >
                      {item.label}
                    </p>

                    <div className="w-8 h-[1px] bg-[#D6B77A]/50 my-2" />

                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-sans text-[#30252B]/60 font-medium">
                      <span>{item.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{recipient.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
