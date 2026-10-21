import React, { useRef, useState, useEffect } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Sparkles, Heart, Camera, ChevronDown, Upload, RefreshCw } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGsapContext } from '../hooks/useGsapContext';
import { soundEffects } from '../utils/soundEffects';
import { gsap } from '../utils/gsapConfig';

export const BirthdayHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const isReduced = useReducedMotion();
  const { recipient, hero, portrait } = BIRTHDAY_CONFIG;

  // Responsive desktop detection for pinned sequence with debouncing
  useEffect(() => {
    let timer: number;
    const checkViewport = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const next = window.innerWidth >= 1024 && window.innerHeight >= 650;
        setIsDesktop((prev) => (prev !== next ? next : prev));
      }, 150);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  // Retrieve any previously uploaded photo preview from session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('aswathy_custom_hero_photo');
      if (saved) {
        setCustomImageSrc(saved);
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          setCustomImageSrc(result);
          setImageError(false);
          setImageLoaded(true);
          try {
            sessionStorage.setItem('aswathy_custom_hero_photo', result);
          } catch {
            // Ignore
          }
          soundEffects.playChime(784, 0.3, 0.1);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const activeImageSrc = customImageSrc || portrait.imagePath;

  // GSAP Entrance & Multi-Stage ScrollTrigger Choreography
  useGsapContext(
    () => {
      if (isReduced) return;

      const container = containerRef.current;
      const pinWrapper = pinWrapperRef.current;
      if (!container || !pinWrapper) return;

      // ==========================================
      // 1. CINEMATIC LOAD REVEAL (plays on page open)
      // ==========================================
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.1 },
      });

      // Background ambient glow blooms gently
      entranceTl
        .fromTo(
          '.hero-bg-glow',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
          0
        )
        // Eyebrow label reveals with delicate tracking
        .fromTo(
          '.hero-eyebrow-pill',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.2
        )
        // Centerpiece portrait reveals smoothly with soft mask and scale down from 1.04 -> 1.0
        .fromTo(
          '.hero-portrait-frame',
          {
            scale: 1.04,
            opacity: 0,
            y: 20,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            force3D: true,
          },
          0.3
        )
        // "ASWATHY" typography reveals with silky staggered character upward sweep
        .fromTo(
          '.hero-char-span',
          {
            y: 60,
            opacity: 0,
            rotateX: -20,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.045,
            duration: 1.1,
            ease: 'power4.out',
          },
          0.4
        )
        // Subtitle "Today, the world celebrates you." glides up softly
        .fromTo(
          '.hero-subtitle-line',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          0.65
        )
        // Floating sparkles and botanical accents
        .fromTo(
          '.hero-sparkle-icon',
          { scale: 0, rotation: -45, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(2)' },
          0.7
        )
        // Scroll discovery cue fades in
        .fromTo(
          '.hero-scroll-cue',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.9
        );

      // ==========================================
      // 2. SIGNATURE MULTI-STAGE SCROLLTRIGGER SEQUENCE
      // ==========================================
      if (isDesktop) {
        // Desktop scrubbed pinned sequence: Stage 1 -> Stage 2 -> Stage 3 -> Stage 4
        const masterScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=140%',
            pin: pinWrapper,
            scrub: 0.7,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });

        // STAGE 1: Floating Portrait with Gentle Parallax
        masterScrollTl
          .to('.hero-portrait-frame', {
            y: -25,
            ease: 'none',
            duration: 0.35,
            force3D: true,
          }, 0)
          .to('.hero-drifting-particles', {
            y: -50,
            ease: 'none',
            duration: 0.35,
            force3D: true,
          }, 0)
          .to('.hero-scroll-cue', {
            opacity: 0,
            y: 12,
            duration: 0.2,
            ease: 'power2.in',
          }, 0.05);

        // STAGE 2: Transformation into Intimate Editorial Composition
        masterScrollTl
          // Initial center text transitions out softly
          .to('.hero-center-titles', {
            opacity: 0,
            y: -35,
            duration: 0.35,
            ease: 'power2.inOut',
            force3D: true,
          }, 0.25)
          // Background warms with blush gradient glow
          .to('.hero-stage2-glow', {
            opacity: 0.85,
            scale: 1.1,
            duration: 0.45,
            ease: 'power2.out',
            force3D: true,
          }, 0.25)
          // Portrait smoothly transitions into intimate editorial framing with subtle perspective depth
          .to('.hero-portrait-wrapper', {
            xPercent: -22,
            scale: 0.92,
            rotation: -1.2,
            duration: 0.5,
            ease: 'power3.inOut',
            force3D: true,
          }, 0.25)
          .to('.hero-portrait-glow', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          }, 0.25);

        // STAGE 3: Narrative Reveal (Unfurls birthday celebration message seamlessly)
        masterScrollTl
          .fromTo(
            '.hero-narrative-panel',
            {
              opacity: 0,
              x: 40,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: 'power3.out',
              force3D: true,
            },
            0.45
          )
          .fromTo(
            '.hero-narrative-kicker',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', force3D: true },
            0.55
          )
          .fromTo(
            '.hero-narrative-title',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', force3D: true },
            0.6
          )
          .fromTo(
            '.hero-narrative-quote',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', force3D: true },
            0.65
          )
          .fromTo(
            '.hero-celebration-badge',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)', force3D: true },
            0.7
          );

        // STAGE 4: Elegant Release (softly prepares transition to Chapter II)
        masterScrollTl.to(
          pinWrapper,
          {
            opacity: 0.95,
            ease: 'none',
            duration: 0.15,
          },
          0.85
        );
      } else {
        // Mobile & Touch: Fluid natural scroll parallax without sticky pins
        gsap.to('.hero-portrait-frame', {
          y: -18,
          scale: 0.98,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.0,
          },
        });

        gsap.to('.hero-mobile-narrative', {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: '.hero-mobile-narrative',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    },
    containerRef,
    [isReduced, isDesktop]
  );

  const handleScrollExplore = () => {
    soundEffects.playChime(659.25, 0.4, 0.1);
    const storyEl = document.getElementById('story') || document.getElementById('portrait');
    if (storyEl) {
      const headerOffset = 65;
      const elementPosition = storyEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  const nameLetters = recipient.name.toUpperCase().split('');

  return (
    <section
      ref={containerRef}
      id="prologue"
      className="relative bg-[#FFF9F4] text-[#30252B] overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="relative w-full min-h-[100svh] flex flex-col justify-between items-center px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden"
      >
        {/* Soft Ivory & Blush Radial Glow Background */}
        <div
          className="hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[700px] sm:h-[950px] rounded-full bg-gradient-to-tr from-[#F4DDE5]/45 via-[#F9E6D7]/40 to-[#E9E3F4]/30 blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Stage 2 Warm Blush Transform Glow */}
        <div
          className="hero-stage2-glow absolute inset-0 bg-gradient-to-br from-[#FFF9F4] via-[#F4DDE5]/30 to-[#F9E6D7]/25 pointer-events-none -z-10 opacity-0 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* Ambient Drifting Particles Layer */}
        <div
          className="hero-drifting-particles absolute inset-0 pointer-events-none -z-5 overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle Champagne Stardust */}
          <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-[#D6B77A]/50 blur-[0.5px] animate-float-gentle" />
          <div
            className="absolute top-[28%] right-[14%] w-2.5 h-2.5 rounded-full bg-[#D79AAF]/40 blur-[0.5px] animate-float-gentle"
            style={{ animationDelay: '1.5s' }}
          />
          <div
            className="absolute top-[65%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#D6B77A]/45 blur-[0.5px] animate-float-gentle"
            style={{ animationDelay: '3.1s' }}
          />
          <div
            className="absolute top-[72%] right-[10%] w-2 h-2 rounded-full bg-[#F4DDE5]/70 blur-[0.5px] animate-float-gentle"
            style={{ animationDelay: '2.2s' }}
          />

          {/* Tiny Golden Sparkle SVGs */}
          <svg
            className="absolute top-[15%] right-[22%] w-4 h-4 text-[#D6B77A] opacity-60 animate-pulse-soft"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
          <svg
            className="absolute top-[52%] left-[16%] w-3 h-3 text-[#D79AAF] opacity-50 animate-pulse-soft"
            style={{ animationDelay: '2.5s' }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        {/* Hidden File Input for Live Photo Upload / Testing */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCustomPhotoUpload}
          aria-label="Upload custom portrait for preview"
        />

        {/* ========================================================
            TOP ZONE: EYEBROW & LUXURY SUB-DECK
           ======================================================== */}
        <header className="relative z-10 text-center w-full max-w-4xl mx-auto pt-2">
          <div className="hero-eyebrow-pill inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#FFF9F4]/80 border border-[#D6B77A]/40 shadow-2xs backdrop-blur-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A] animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-sans font-semibold text-[#71384F]">
              A LITTLE UNIVERSE OF HAPPINESS
            </span>
            <Sparkles className="w-3 h-3 text-[#D6B77A]" />
          </div>
        </header>

        {/* ========================================================
            CENTER STAGE: ASWATHY'S PORTRAIT & CINEMATIC COMPOSITION
           ======================================================== */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 my-auto py-2">
          {/* Portrait Anchor Wrapper */}
          <div className="hero-portrait-wrapper relative flex flex-col items-center justify-center shrink-0 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-[420px] transition-all duration-300">
            {/* Soft Ambient Halo behind portrait */}
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-tr from-[#D6B77A]/20 via-[#F4DDE5]/30 to-[#D79AAF]/20 blur-xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Main Archival Portrait Card */}
            <div className="hero-portrait-frame relative w-full aspect-[3/4] rounded-2xl p-3 sm:p-4 bg-[#FFF9F4] border border-[#D79AAF]/35 shadow-xl will-change-transform transition-transform duration-500 overflow-hidden flex flex-col">
              {/* GPU-composited Glow Overlay for Stage 2 Editorial Transformation */}
              <div
                className="hero-portrait-glow absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500 ring-1 ring-[#D6B77A]/60 shadow-[0_30px_60px_-15px_rgba(113,56,79,0.25)] -z-0"
                aria-hidden="true"
              />

              {/* Inner Double-Mat Bevel Border */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#F4DDE5]/30 via-[#FFF9F4] to-[#F9E6D7]/25 border border-[#D6B77A]/30 flex flex-col z-10">
                {/* 1. Real Image Element (Primary Star) */}
                {!imageError ? (
                  <img
                    src={activeImageSrc}
                    alt={`${recipient.name}'s Portrait`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      // Attempt fallback to the SVG version if JPG was missing
                      if (activeImageSrc.endsWith('.jpg')) {
                        const fallbackSvg = activeImageSrc.replace('.jpg', '.svg');
                        if (activeImageSrc !== fallbackSvg) {
                          setCustomImageSrc(fallbackSvg);
                          return;
                        }
                      }
                      setImageError(true);
                    }}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ) : null}

                {/* 2. Bespoke Editorial Fallback Placeholder (when image file is not found) */}
                {(!imageLoaded || imageError) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-gradient-to-b from-[#FFF9F4] via-[#F4DDE5]/20 to-[#FFF9F4] z-10">
                    {/* Top Decorative Seal */}
                    <div className="w-full flex items-center justify-between text-[10px] tracking-widest uppercase font-sans text-[#71384F]/60">
                      <span>Archival Mat</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
                      <span>{BIRTHDAY_CONFIG.siteMeta.edition}</span>
                    </div>

                    {/* Central Cameo Monogram */}
                    <div className="my-auto flex flex-col items-center">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#D6B77A]/60 bg-[#FFF9F4] flex items-center justify-center shadow-sm p-1 mb-4">
                        <div className="w-full h-full rounded-full border border-dashed border-[#D79AAF]/50 flex items-center justify-center bg-gradient-to-tr from-[#F4DDE5]/40 to-[#FFF9F4]">
                          <span className="font-serif italic text-4xl sm:text-5xl text-[#71384F]">
                            {recipient.initials}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif italic text-2xl sm:text-3xl text-[#30252B] mb-2">
                        {recipient.name}
                      </h3>

                      <p className="font-serif text-sm sm:text-base text-[#71384F]/85 italic max-w-[240px] leading-relaxed mb-4">
                        &ldquo;{portrait.fallbackQuote}&rdquo;
                      </p>

                      <div className="w-10 h-[1px] bg-[#D6B77A] my-2" />

                      <p className="text-[11px] uppercase tracking-wider text-[#71384F]/70 font-sans font-medium">
                        {portrait.fallbackSubtext}
                      </p>
                    </div>

                    {/* Helpful Photo Upload / Notice Pill */}
                    <div className="w-full pt-3 border-t border-[#D79AAF]/20 flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#71384F]/10 hover:bg-[#71384F]/20 text-[#71384F] text-xs font-sans font-medium transition-colors cursor-pointer"
                        title="Click to preview your own photo immediately"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#71384F]" />
                        <span>Preview Your Photo</span>
                      </button>
                      <span className="text-[10px] text-[#30252B]/50 font-mono">
                        /public{portrait.imagePath}
                      </span>
                    </div>
                  </div>
                )}

                {/* Delicate Inset Vignette & Gold Frame Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-xl border border-[#D6B77A]/30 shadow-inner"
                  aria-hidden="true"
                />

                {/* Subtle Archival Tag at Bottom of Portrait Frame */}
                <div className="absolute bottom-2.5 inset-x-3 z-20 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#FFF9F4]/90 backdrop-blur-xs border border-[#D79AAF]/25 shadow-xs text-[#30252B]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
                    <span className="font-serif italic text-xs sm:text-sm text-[#71384F] font-medium">
                      {recipient.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-sans text-[#71384F]/75">
                    Centerpiece
                  </span>
                </div>
              </div>
            </div>

            {/* Optional Reset Button if user uploaded custom photo preview */}
            {customImageSrc && (
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setCustomImageSrc(null);
                    sessionStorage.removeItem('aswathy_custom_hero_photo');
                  }}
                  className="text-[11px] text-[#71384F]/70 hover:text-[#71384F] flex items-center gap-1 transition-colors cursor-pointer font-sans"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset photo</span>
                </button>
              </div>
            )}
          </div>

          {/* ========================================================
              INITIAL VIEW: CENTER / RIGHT EDITORIAL HEADLINE
             ======================================================== */}
          <div className="hero-center-titles flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-xl lg:max-w-2xl min-w-0">
            {/* Elegant Subtitle Greeting */}
            <div className="overflow-hidden mb-2">
              <p className="hero-subtitle-line font-serif italic text-2xl sm:text-3xl lg:text-4xl font-light text-[#71384F] tracking-wide">
                Today, the world celebrates you.
              </p>
            </div>

            {/* Signature Oversized Name: "ASWATHY" */}
            <div className="relative my-1 sm:my-2 overflow-hidden py-1 max-w-full">
              <h1 className="font-serif text-[clamp(2.5rem,7.5vw,4.5rem)] sm:text-[clamp(3.75rem,8vw,5.5rem)] lg:text-[clamp(4.25rem,5.8vw,6.25rem)] xl:text-[clamp(5.25rem,6.8vw,7.5rem)] font-normal tracking-tight text-[#30252B] leading-[0.92] select-none flex flex-nowrap whitespace-nowrap justify-center lg:justify-start">
                {nameLetters.map((char, index) => (
                  <span
                    key={index}
                    className="hero-char-span inline-block will-change-transform"
                  >
                    {char}
                  </span>
                ))}
              </h1>

              {/* Gold Accent Sparkle */}
              <div
                className={`hero-sparkle-icon absolute -top-1 -right-2 sm:-top-2 sm:-right-4 text-[#D6B77A] ${
                  isReduced ? '' : 'animate-pulse-soft'
                }`}
              >
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>

            {/* Hairline Divider with Tiny Heart */}
            <div className="flex items-center gap-3 my-4 w-44 justify-center lg:justify-start">
              <div className="h-[1px] flex-1 bg-[#D6B77A]/60" />
              <Heart className="w-3.5 h-3.5 text-[#D79AAF] fill-[#D79AAF]" />
              <div className="h-[1px] flex-1 bg-[#D6B77A]/60" />
            </div>

            {/* Poetic Supporting Lead */}
            <p className="text-base sm:text-lg lg:text-xl text-[#30252B]/85 font-serif font-light leading-relaxed max-w-md">
              &ldquo;Some people make the world feel a little more beautiful just by being in it. Today is a celebration of all your warmth, your grace, and your smile.&rdquo;
            </p>

            {/* Quick Metadata Ribbons */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs uppercase tracking-widest text-[#71384F]/70 font-sans">
              <span className="px-2.5 py-1 rounded-sm bg-[#F4DDE5]/40 border border-[#D79AAF]/25">
                Special Edition
              </span>
              <span aria-hidden="true">·</span>
              <span className="px-2.5 py-1 rounded-sm bg-[#F9E6D7]/40 border border-[#D6B77A]/25">
                Infinite Joy
              </span>
              <span aria-hidden="true">·</span>
              <span className="px-2.5 py-1 rounded-sm bg-[#E9E3F4]/40 border border-[#D79AAF]/25">
                2026
              </span>
            </div>
          </div>

          {/* ========================================================
              STAGE 3 NARRATIVE PANEL (Unfurls on scroll on Desktop)
             ======================================================== */}
          {isDesktop && (
            <div
              id="celebration"
              className="hero-narrative-panel absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 max-w-lg w-full text-left opacity-0 pointer-events-none"
            >
              <div className="hero-narrative-kicker flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#D6B77A]" />
                <span className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#71384F]">
                  {hero.kicker}
                </span>
              </div>

              <div className="overflow-hidden mb-3">
                <h2 className="hero-narrative-title font-serif text-4xl lg:text-5xl font-light text-[#30252B] leading-tight">
                  {hero.greeting},{' '}
                  <span className="italic font-normal text-[#71384F]">
                    {recipient.name}
                  </span>
                </h2>
              </div>

              <p className="hero-narrative-quote text-lg lg:text-xl text-[#30252B]/80 font-serif leading-relaxed mb-6">
                &ldquo;{hero.supportingMessage}&rdquo;
              </p>

              <div className="p-5 rounded-xl bg-[#FFF9F4]/80 border border-[#D6B77A]/35 shadow-sm backdrop-blur-xs mb-6">
                <p className="text-sm font-sans text-[#71384F] leading-relaxed">
                  Every chapter in your life has added warmth and brightness to the people lucky enough to know you. May this birthday be filled with quiet wonder and boundless happiness.
                </p>
              </div>

              <div className="hero-celebration-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#D6B77A] bg-[#FFF9F4] shadow-xs">
                <Sparkles className="w-4 h-4 text-[#D6B77A]" />
                <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#71384F]">
                  {hero.badgeText}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            MOBILE SCROLL NARRATIVE COMPONENT (Natural flow)
           ======================================================== */}
        {!isDesktop && (
          <div
            id="celebration"
            className="hero-mobile-narrative w-full max-w-lg text-center mt-8 pt-8 border-t border-[#D79AAF]/25"
          >
            <p className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#71384F] mb-2">
              {hero.kicker}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#30252B] mb-3">
              {hero.greeting}, <span className="italic text-[#71384F]">{recipient.name}</span>
            </h2>
            <p className="text-base text-[#30252B]/80 font-serif italic mb-4">
              &ldquo;{hero.supportingMessage}&rdquo;
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6B77A]/40 bg-[#FFF9F4] text-xs uppercase tracking-widest text-[#71384F] font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>{hero.badgeText}</span>
            </div>
          </div>
        )}

        {/* ========================================================
            BOTTOM ZONE: MINIMAL SCROLL DISCOVERY INDICATOR
           ======================================================== */}
        <footer className="hero-scroll-cue relative z-10 w-full flex justify-center pt-2">
          <button
            onClick={handleScrollExplore}
            className="group flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-[#71384F]/60 hover:text-[#71384F] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F] rounded-full p-2"
            aria-label="Scroll gently to unfurl the story"
          >
            <span className="text-[10px] font-sans font-medium tracking-[0.25em]">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-[#D6B77A]/60 flex items-start justify-center p-1 group-hover:border-[#71384F] transition-colors">
              <div
                className={`w-1 h-2 bg-[#71384F] rounded-full ${
                  isReduced ? '' : 'animate-bounce'
                }`}
              />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#D6B77A] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </footer>
      </div>
    </section>
  );
};
