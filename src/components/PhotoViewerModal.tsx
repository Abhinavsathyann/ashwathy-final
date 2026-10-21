import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Flower2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag?: string;
  date?: string;
}

interface PhotoViewerModalProps {
  photos: PhotoItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < photos.length - 1) {
          soundEffects.playChime(784, 0.25, 0.06);
          onNavigate(currentIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          soundEffects.playChime(659.25, 0.25, 0.06);
          onNavigate(currentIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || !currentPhoto) return null;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewing modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#30252B]/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center z-10">
        {/* Top bar controls */}
        <div className="w-full flex items-center justify-between pb-3 text-[#FFF9F4]">
          <div className="text-xs uppercase tracking-widest font-sans font-medium text-[#D6B77A]">
            {currentPhoto.tag || 'Memory'} · {currentIndex + 1} of {photos.length}
          </div>
          <button
            onClick={onClose}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#FFF9F4]/70 hover:text-white rounded-full bg-black/25 hover:bg-black/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B77A]"
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame */}
        <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xs bg-[#FFF9F4] border border-[#D79AAF]/40 shadow-2xl p-2 sm:p-4">
          {!imageError ? (
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`max-h-[62vh] max-w-full object-contain rounded-xs transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : null}

          {/* Graceful Fallback Container if image does not exist yet */}
          {(!imageLoaded || imageError) && (
            <div className="w-full min-h-[300px] sm:min-h-[420px] flex flex-col items-center justify-center text-center p-8 bg-[#F4DDE5]/30 border border-[#D79AAF]/25">
              <div className="w-16 h-16 rounded-full border border-[#D6B77A]/50 bg-[#FFF9F4] flex items-center justify-center mb-4 text-[#71384F]">
                <Flower2 className="w-8 h-8 text-[#71384F]" />
              </div>
              <p className="font-serif italic text-2xl text-[#30252B] max-w-md mb-2">
                &ldquo;{currentPhoto.caption}&rdquo;
              </p>
              <p className="text-xs uppercase tracking-widest font-sans text-[#71384F]/70">
                Photo file ready: {currentPhoto.src}
              </p>
            </div>
          )}

          {/* Previous Arrow */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(currentIndex - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#30252B]/60 text-white hover:bg-[#71384F] transition-colors cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B77A]"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next Arrow */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(currentIndex + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#30252B]/60 text-white hover:bg-[#71384F] transition-colors cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B77A]"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Caption Card below */}
        <div className="w-full mt-3 px-4 py-3 bg-[#FFF9F4]/90 backdrop-blur-md rounded-xs border border-[#D79AAF]/30 text-center">
          <p className="font-serif text-base sm:text-lg text-[#30252B] italic">
            &ldquo;{currentPhoto.caption}&rdquo;
          </p>
          {currentPhoto.date && (
            <p className="text-[11px] uppercase tracking-widest font-sans text-[#71384F]/60 mt-1">
              {currentPhoto.date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
