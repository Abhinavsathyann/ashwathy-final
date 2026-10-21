import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronDown, ChevronUp, Compass, Heart } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface BottomDockProps {
  onOpenCelebration: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({ onOpenCelebration }) => {
  const [isMuted, setIsMuted] = useState(soundEffects.getIsMuted());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEffects.subscribe((muted) => {
      setIsMuted(muted);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle collapse with 'h' or 'H' if not in an input
      if (
        (e.key === 'h' || e.key === 'H') &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        setIsCollapsed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleSound = () => {
    soundEffects.toggleMute();
  };

  const navChapters = [
    { label: 'Prologue', id: 'intro' },
    { label: 'Hero', id: 'celebration' },
    { label: 'Her Light', id: 'story' },
    { label: 'Portrait', id: 'portrait' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Scrapbook', id: 'scrapbook' },
    { label: 'Letter', id: 'letter' },
    { label: 'Balloons', id: 'balloons' },
    { label: 'Cake & Wish', id: 'cake' },
    { label: 'Surprise Gift', id: 'gift' },
  ];

  const handleScrollTo = (id: string) => {
    setShowNavMenu(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const elPos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: elPos,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[min(940px,94vw)] transition-all duration-500 ease-out flex flex-col items-center"
      style={{
        transform: `translateX(-50%) translateY(${isCollapsed ? 'calc(100% - 24px)' : '0'})`,
      }}
    >
      {/* Collapse / Expand Tab attached to top edge */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Show celebration dock' : 'Hide celebration dock (Zen Mode)'}
        title={isCollapsed ? 'Show celebration dock (H)' : 'Zen Mode: Hide dock (H)'}
        className="mb-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/90 backdrop-blur-md border border-[#D6B77A]/30 text-[#71384F] hover:text-[#30252B] hover:border-[#D6B77A] text-[11px] font-sans font-medium flex items-center gap-1.5 shadow-sm transition-all cursor-pointer min-h-[30px]"
      >
        {isCollapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5 text-[#D6B77A]" />
            <span>Show Dock</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5 text-[#D6B77A]" />
            <span>Zen Mode</span>
          </>
        )}
      </button>

      {/* Main Dock Container */}
      <nav
        aria-label="Celebration Controls"
        className="relative bg-[#FFF9F4]/95 backdrop-blur-xl border border-[#D6B77A]/35 rounded-2xl px-3 py-2 shadow-xl shadow-[#71384F]/5 flex items-center gap-2 sm:gap-3 text-xs font-sans text-[#30252B]"
      >
        {/* Navigation Chapter Menu Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNavMenu(!showNavMenu)}
            aria-expanded={showNavMenu}
            aria-label="Chapter Menu"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/70 hover:bg-[#F4DDE5]/40 border border-[#D6B77A]/25 text-[#71384F] font-medium transition-colors cursor-pointer min-h-[44px]"
          >
            <Compass className="w-4 h-4 text-[#D6B77A]" />
            <span className="hidden sm:inline">Chapters</span>
          </button>

          {/* Chapters Dropdown */}
          {showNavMenu && (
            <div className="absolute bottom-full mb-3 left-0 bg-[#FFF9F4] border border-[#D6B77A]/40 rounded-xl shadow-2xl p-2 w-48 max-h-72 overflow-y-auto flex flex-col gap-1 z-50">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#71384F]/70 border-b border-[#D6B77A]/20">
                Aswathy's Story
              </div>
              {navChapters.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => handleScrollTo(chap.id)}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-[#F4DDE5]/50 text-[#30252B] transition-colors cursor-pointer"
                >
                  {chap.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Audio / Celestial Chimes Soundscape Toggle */}
        <button
          onClick={handleToggleSound}
          aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          title={isMuted ? 'Turn Sound On for subtle crystal chimes' : 'Turn Sound Off'}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer min-h-[44px] ${
            !isMuted
              ? 'bg-[#71384F] text-[#FFF9F4] border-[#71384F]'
              : 'bg-white/70 hover:bg-[#F4DDE5]/40 text-[#71384F] border-[#D6B77A]/25'
          }`}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-4 h-4 text-[#D6B77A]" />
              <span className="font-medium hidden sm:inline">Sound: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 opacity-60" />
              <span className="font-medium hidden sm:inline">Sound: Off</span>
            </>
          )}
        </button>

        {/* Subtle Separator */}
        <div className="w-[1px] h-6 bg-[#D6B77A]/30 hidden sm:block" />

        {/* Aswathy Dedication Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2 text-[#71384F]/75 font-serif italic text-sm">
          <Heart className="w-3.5 h-3.5 fill-[#D79AAF] text-[#D79AAF]" />
          <span>For Aswathy</span>
        </div>

        {/* Celebrate Aswathy Trigger */}
        <button
          onClick={() => {
            soundEffects.playMagicalChord();
            onOpenCelebration();
          }}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#D79AAF] to-[#71384F] text-[#FFF9F4] font-medium shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 text-[#D6B77A]" />
          <span>Celebrate</span>
        </button>
      </nav>
    </div>
  );
};
