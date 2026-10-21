import React, { useEffect } from 'react';
import { BIRTHDAY_CONFIG } from '../data/birthdayContent';
import { Sparkles, X, Heart } from 'lucide-react';
import { launchConfetti } from '../utils/confetti';
import { soundEffects } from '../utils/soundEffects';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { grandCelebration, recipient } = BIRTHDAY_CONFIG;

  useEffect(() => {
    if (isOpen) {
      soundEffects.playMagicalChord();
      // Launch double burst of festive confetti
      launchConfetti(window.innerWidth * 0.35, window.innerHeight * 0.4, 60);
      launchConfetti(window.innerWidth * 0.65, window.innerHeight * 0.4, 60);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Grand Birthday Celebration for Aswathy"
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#30252B]/60 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-[#FFF9F4] border border-[#D6B77A]/50 shadow-2xl rounded-xs p-8 sm:p-14 max-w-xl w-full text-center z-10 animate-in zoom-in-95 duration-400">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#30252B]/60 hover:text-[#71384F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F] rounded-full cursor-pointer transition-colors"
          aria-label={grandCelebration.closeLabel}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Golden Starburst Accent */}
        <div className="mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#F4DDE5]/60 border border-[#D6B77A]/50 flex items-center justify-center shadow-xs">
            <Sparkles className="w-8 h-8 text-[#D6B77A]" />
          </div>
        </div>

        {/* Headline */}
        <h3 className="font-serif text-4xl sm:text-5xl text-[#30252B] font-normal tracking-tight mb-4 leading-tight">
          {grandCelebration.headline}
        </h3>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="w-12 h-[1px] bg-[#D6B77A]" />
          <Heart className="w-3.5 h-3.5 text-[#71384F] fill-[#71384F]" />
          <div className="w-12 h-[1px] bg-[#D6B77A]" />
        </div>

        {/* Supporting Message */}
        <p className="font-serif italic text-lg sm:text-xl text-[#71384F] leading-relaxed mb-8">
          &ldquo;{grandCelebration.supportingMessage}&rdquo;
        </p>

        {/* Button to Dismiss */}
        <div className="flex items-center justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-[#71384F] text-[#FFF9F4] text-xs uppercase tracking-widest font-semibold hover:bg-[#5a2a3e] active:scale-95 transition-all shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71384F]"
          >
            {grandCelebration.closeLabel}
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] uppercase tracking-widest font-sans text-[#30252B]/40 mt-6">
          Dedicated to {recipient.fullName} · Birthday 2026
        </p>
      </div>
    </div>
  );
};
