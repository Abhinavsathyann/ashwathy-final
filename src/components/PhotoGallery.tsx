import React, { useRef, useState } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Camera, Maximize2, Flower2, Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { soundEffects } from '../utils/soundEffects';
import { gsap } from '../utils/gsapConfig';
import { PhotoItem } from './PhotoViewerModal';

interface PhotoGalleryProps {
  onPhotoClick: (photo: PhotoItem) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onPhotoClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [customHeroPhoto, setCustomHeroPhoto] = useState<string | null>(null);

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem('aswathy_custom_hero_photo');
      if (saved) setCustomHeroPhoto(saved);
    } catch {
      // Ignore
    }
  }, []);

  const { gallery } = BIRTHDAY_CONFIG;

  const handlePhotoSelect = (photo: PhotoItem) => {
    soundEffects.playChime(784, 0.25, 0.07);
    const resolvedPhoto = (photo.id === 'gallery-portrait' && customHeroPhoto) 
      ? { ...photo, src: customHeroPhoto }
      : photo;
    onPhotoClick(resolvedPhoto);
  };

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

      tl.from('.gallery-eyebrow', {
        y: 15,
        opacity: 0,
        duration: 0.7,
      })
        .from('.gallery-title', {
          y: 35,
          opacity: 0,
          duration: 1.0,
        }, '-=0.4')
        .from('.gallery-support', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from('.gallery-card', {
          y: 40,
          opacity: 0,
          scale: 0.96,
          stagger: 0.15,
          duration: 1.0,
          ease: 'power3.out',
        }, '-=0.4');
    },
    sectionRef,
    [isReduced]
  );

  return (
    <section
      ref={sectionRef}
      id="moments-gallery"
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FFF9F4] overflow-hidden"
    >
      {/* Decorative ambient background radial glow */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-[#F4DDE5]/30 to-transparent blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="gallery-eyebrow text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-3">
            {gallery.eyebrow}
          </p>
          <div className="overflow-hidden mb-4">
            <h2 className="gallery-title font-serif text-4xl sm:text-5xl lg:text-6xl text-[#30252B] font-normal">
              {gallery.heading}
            </h2>
          </div>
          <p className="gallery-support text-base sm:text-lg text-[#30252B]/75 font-serif italic max-w-lg mx-auto">
            &ldquo;{gallery.supportingText}&rdquo;
          </p>
        </div>

        {/* Asymmetrical Editorial Composition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Card 1: Large Featured Portrait (Span 7) */}
          <div className="gallery-card md:col-span-7 group relative">
            <div
              onClick={() => handlePhotoSelect(gallery.photos[0])}
              className="relative cursor-pointer bg-[#FFF9F4] p-3 sm:p-5 border border-[#D79AAF]/35 shadow-md hover:shadow-xl transition-all duration-500 rounded-xs overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4DDE5]/30 rounded-xs">
                {!failedImages[gallery.photos[0].id] ? (
                  <img
                    src={customHeroPhoto || gallery.photos[0].src}
                    alt={gallery.photos[0].alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (!customHeroPhoto && gallery.photos[0].src.endsWith('.jpg')) {
                        const fallbackSvg = gallery.photos[0].src.replace('.jpg', '.svg');
                        setCustomHeroPhoto(fallbackSvg);
                        return;
                      }
                      handleImageError(gallery.photos[0].id);
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  />
                ) : null}

                {/* Fallback container */}
                {failedImages[gallery.photos[0].id] && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F4DDE5]/40">
                    <Flower2 className="w-10 h-10 text-[#71384F] mb-3 opacity-80" />
                    <p className="font-serif italic text-2xl text-[#30252B] mb-2">
                      &ldquo;{gallery.photos[0].caption}&rdquo;
                    </p>
                    <span className="text-xs uppercase tracking-widest text-[#71384F]/70 font-sans">
                      {gallery.photos[0].src}
                    </span>
                  </div>
                )}

                {/* View Zoom Badge */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#30252B]/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Mat Label */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#30252B]/70 font-sans">
                <span className="font-serif italic text-base text-[#71384F]">
                  {gallery.photos[0].tag}
                </span>
                <span className="uppercase tracking-widest text-[11px]">
                  {gallery.photos[0].caption}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5): Stack of Supporting Tall & Polaroid */}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* Card 2: Vertical Editorial Supporting Photo */}
            <div className="gallery-card group relative">
              <div
                onClick={() => handlePhotoSelect(gallery.photos[1])}
                className="relative cursor-pointer bg-[#FFF9F4] p-3 sm:p-4 border border-[#D79AAF]/35 shadow-md hover:shadow-xl transition-all duration-500 rounded-xs"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4DDE5]/30 rounded-xs">
                  {!failedImages[gallery.photos[1].id] ? (
                    <img
                      src={gallery.photos[1].src}
                      alt={gallery.photos[1].alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(gallery.photos[1].id)}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                  ) : null}

                  {failedImages[gallery.photos[1].id] && (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F9E6D7]/40">
                      <Heart className="w-8 h-8 text-[#71384F] mb-2 opacity-80" />
                      <p className="font-serif italic text-xl text-[#30252B] mb-2">
                        &ldquo;{gallery.photos[1].caption}&rdquo;
                      </p>
                      <span className="text-[11px] uppercase tracking-widest text-[#71384F]/70 font-mono">
                        {gallery.photos[1].src}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#30252B]/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#30252B]/70 font-sans">
                  <span className="font-serif italic text-sm text-[#71384F]">
                    {gallery.photos[1].tag}
                  </span>
                  <span className="text-[11px] tracking-widest uppercase">
                    {gallery.photos[1].date}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Overlapping Polaroid Keepsake Frame with Washi Tape */}
            <div className="gallery-card group relative sm:-rotate-1 sm:translate-x-2 transition-transform duration-300 hover:rotate-0">
              {/* Decorative Washi Tape element */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#D6B77A]/70 backdrop-blur-xs border-y border-[#D6B77A] transform -rotate-2 z-20 shadow-xs pointer-events-none"
                aria-hidden="true"
              />

              <div
                onClick={() => handlePhotoSelect(gallery.photos[4])}
                className="relative cursor-pointer bg-[#FFF9F4] p-4 pb-6 border border-[#D79AAF]/40 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-xs"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#F4DDE5]/30 border border-[#D79AAF]/20">
                  {!failedImages[gallery.photos[4].id] ? (
                    <img
                      src={gallery.photos[4].src}
                      alt={gallery.photos[4].alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(gallery.photos[4].id)}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                  ) : null}

                  {failedImages[gallery.photos[4].id] && (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#E9E3F4]/40">
                      <Camera className="w-8 h-8 text-[#71384F] mb-2 opacity-80" />
                      <p className="font-serif italic text-lg text-[#30252B] mb-2">
                        &ldquo;{gallery.photos[4].caption}&rdquo;
                      </p>
                      <span className="text-[10px] uppercase font-mono text-[#71384F]/70">
                        {gallery.photos[4].src}
                      </span>
                    </div>
                  )}
                </div>

                {/* Handwritten-style caption on Polaroid bottom */}
                <div className="mt-4 text-center">
                  <p
                    style={{ fontFamily: 'var(--font-script, "Alex Brush", cursive)' }}
                    className="text-2xl text-[#71384F]"
                  >
                    A beautiful memory, forever
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[#30252B]/50 font-sans mt-0.5">
                    Polaroid Edition · {BIRTHDAY_CONFIG.recipient.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Supporting Wide & Tall Photos */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mt-8 items-center">
          {/* Card 4: Wide Landscape Frame (Span 7) */}
          <div className="gallery-card md:col-span-7 group relative">
            <div
              onClick={() => handlePhotoSelect(gallery.photos[2])}
              className="relative cursor-pointer bg-[#FFF9F4] p-3 sm:p-4 border border-[#D79AAF]/35 shadow-md hover:shadow-xl transition-all duration-500 rounded-xs"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F4DDE5]/30 rounded-xs">
                {!failedImages[gallery.photos[2].id] ? (
                  <img
                    src={gallery.photos[2].src}
                    alt={gallery.photos[2].alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(gallery.photos[2].id)}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                ) : null}

                {failedImages[gallery.photos[2].id] && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F9E6D7]/40">
                    <Flower2 className="w-8 h-8 text-[#D6B77A] mb-2" />
                    <p className="font-serif italic text-xl text-[#30252B] mb-1">
                      &ldquo;{gallery.photos[2].caption}&rdquo;
                    </p>
                    <span className="text-[11px] uppercase tracking-widest text-[#71384F]/70 font-mono">
                      {gallery.photos[2].src}
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#30252B]/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[#30252B]/70 font-sans">
                <span className="font-serif italic text-sm text-[#71384F]">
                  {gallery.photos[2].tag}
                </span>
                <span className="text-[11px] tracking-widest uppercase">
                  {gallery.photos[2].date}
                </span>
              </div>
            </div>
          </div>

          {/* Card 5: Graceful Reflection Tall Card (Span 5) */}
          <div className="gallery-card md:col-span-5 group relative">
            <div
              onClick={() => handlePhotoSelect(gallery.photos[3])}
              className="relative cursor-pointer bg-[#FFF9F4] p-3 sm:p-4 border border-[#D79AAF]/35 shadow-md hover:shadow-xl transition-all duration-500 rounded-xs"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4DDE5]/30 rounded-xs">
                {!failedImages[gallery.photos[3].id] ? (
                  <img
                    src={gallery.photos[3].src}
                    alt={gallery.photos[3].alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(gallery.photos[3].id)}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                ) : null}

                {failedImages[gallery.photos[3].id] && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4DDE5]/40">
                    <Heart className="w-8 h-8 text-[#71384F] mb-2 opacity-80" />
                    <p className="font-serif italic text-xl text-[#30252B] mb-1">
                      &ldquo;{gallery.photos[3].caption}&rdquo;
                    </p>
                    <span className="text-[11px] uppercase tracking-widest text-[#71384F]/70 font-mono">
                      {gallery.photos[3].src}
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#30252B]/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[#30252B]/70 font-sans">
                <span className="font-serif italic text-sm text-[#71384F]">
                  {gallery.photos[3].tag}
                </span>
                <span className="text-[11px] tracking-widest uppercase">
                  {gallery.photos[3].date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
