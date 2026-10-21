import React, { useState, useEffect, useRef } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Sparkles, Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenCelebration?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenCelebration }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isScrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 40;
          if (isPastThreshold !== isScrolledRef.current) {
            isScrolledRef.current = isPastThreshold;
            setScrolled(isPastThreshold);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCelebrateClick = () => {
    setMobileMenuOpen(false);
    if (onOpenCelebration) {
      onOpenCelebration();
    } else {
      scrollTo('birthday-cake');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFF9F4]/90 backdrop-blur-md border-b border-[#D79AAF]/20 shadow-xs py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            onClick={() => scrollTo('prologue')}
            className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F] rounded-sm"
          >
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#30252B] group-hover:text-[#71384F] transition-colors whitespace-nowrap shrink-0">
              {BIRTHDAY_CONFIG.recipient.name.toUpperCase()}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#D6B77A] hidden sm:inline-block font-sans font-medium whitespace-nowrap">
              
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#30252B]/75">
            <button
              onClick={() => scrollTo('prologue')}
              className="hover:text-[#71384F] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Prologue
            </button>
            <button
              onClick={() => scrollTo('celebration')}
              className="hover:text-[#71384F] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Celebration
            </button>
            <button
              onClick={() => scrollTo('portrait')}
              className="hover:text-[#71384F] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Portrait
            </button>
            <button
              onClick={() => scrollTo('moments-gallery')}
              className="hover:text-[#71384F] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollTo('scrapbook-memories')}
              className="hover:text-[#71384F] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Scrapbook
            </button>
            <button
              onClick={() => scrollTo('letter')}
              className="hover:text-[#71384F] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              The Letter
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCelebrateClick}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFF9F4] bg-[#71384F] hover:bg-[#58273c] active:scale-95 transition-all shadow-xs rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F] whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>Celebrate</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#30252B] hover:text-[#71384F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F] rounded-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[60px] bg-[#FFF9F4]/98 backdrop-blur-lg border-b border-[#D79AAF]/30 shadow-md p-6 z-30 md:hidden animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-1 text-center">
            <button
              onClick={() => scrollTo('prologue')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Prologue
            </button>
            <button
              onClick={() => scrollTo('celebration')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Celebration
            </button>
            <button
              onClick={() => scrollTo('story')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Story Moment
            </button>
            <button
              onClick={() => scrollTo('portrait')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Portrait Feature
            </button>
            <button
              onClick={() => scrollTo('moments-gallery')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Photo Gallery
            </button>
            <button
              onClick={() => scrollTo('scrapbook-memories')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Memory Scrapbook
            </button>
            <button
              onClick={() => scrollTo('letter')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              A Little Note
            </button>
            <button
              onClick={() => scrollTo('balloons-release')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Floating Balloons
            </button>
            <button
              onClick={() => scrollTo('birthday-cake')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Birthday Cake
            </button>
            <button
              onClick={() => scrollTo('gift-surprise')}
              className="min-h-[44px] py-2 px-3 text-base font-serif text-[#30252B] hover:text-[#71384F] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#71384F]"
            >
              Magical Gift Box
            </button>
            <button
              onClick={handleCelebrateClick}
              className="mt-2 min-h-[44px] py-2.5 px-6 text-xs uppercase tracking-wider font-semibold text-[#FFF9F4] bg-[#71384F] rounded-full flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
            >
              <Sparkles className="w-4 h-4 text-[#D6B77A]" />
              Grand Celebration
            </button>
          </div>
        </div>
      )}
    </>
  );
};
