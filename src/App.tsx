/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { FloatingDecorations } from './components/FloatingDecorations';
import { BirthdayHero } from './components/BirthdayHero';
import { PinnedStoryScene } from './components/PinnedStoryScene';
import { PhotoFeature } from './components/PhotoFeature';
import { PhotoGallery } from './components/PhotoGallery';
import { ScrapbookSection } from './components/ScrapbookSection';
import { BirthdayWishSection } from './components/BirthdayWishSection';
import { BalloonReleaseSection } from './components/BalloonReleaseSection';
import { BirthdayCakeSection } from './components/BirthdayCakeSection';
import { InteractiveGift } from './components/InteractiveGift';
import { ClosingScene } from './components/ClosingScene';
import { FooterSection } from './components/FooterSection';
import { PhotoViewerModal, type PhotoItem } from './components/PhotoViewerModal';
import { CelebrationModal } from './components/CelebrationModal';
import { UniverseCanvas } from './components/UniverseCanvas';
import { BottomDock } from './components/BottomDock';
import { BIRTHDAY_CONFIG } from './data/birthdayContent';

export default function App() {
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [viewerPhotoIndex, setViewerPhotoIndex] = useState<number | null>(null);

  // Combine gallery photos and scrapbook items into a viewer list
  const allViewerPhotos: PhotoItem[] = [
    ...BIRTHDAY_CONFIG.gallery.photos,
    ...BIRTHDAY_CONFIG.scrapbook.items.map((item) => ({
      id: item.id,
      src: item.src,
      alt: item.alt,
      caption: item.label,
      tag: item.tag,
    })),
  ];

  const handleOpenPhoto = (photo: PhotoItem) => {
    const idx = allViewerPhotos.findIndex((p) => p.id === photo.id);
    if (idx !== -1) {
      setViewerPhotoIndex(idx);
    } else {
      setViewerPhotoIndex(0);
    }
  };

  React.useEffect(() => {
    if (celebrationOpen || viewerPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [celebrationOpen, viewerPhotoIndex]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-[#30252B] selection:bg-[#F4DDE5] selection:text-[#71384F] relative font-sans overflow-x-hidden">
      {/* Scroll depth progress indicator */}
      <ScrollProgress />

      {/* 3D Celestial Stardust & Universe Canvas (Three.js WebGL) */}
      <UniverseCanvas />

      {/* Floating decorative elements layer (SVG balloons, stardust, twinkling stars) */}
      <FloatingDecorations />

      {/* Editorial Navigation */}
      <Navigation onOpenCelebration={() => setCelebrationOpen(true)} />

      {/* Main content sections in cinematic narrative & memory storytelling order */}
      <main>
        {/* Chapter I: Cinematic Portrait Hero — Aswathy's portrait is immediately visible */}
        <BirthdayHero />

        {/* Chapter II: Signature Pinned Story Scene (Desktop pin & scrub, mobile natural flow) */}
        <PinnedStoryScene />

        {/* Chapter III: Archival Photo Feature with mask reveal & editorial framing */}
        <PhotoFeature />

        {/* Feature 1 & 2: Cinematic Photo Gallery */}
        <PhotoGallery onPhotoClick={handleOpenPhoto} />

        {/* Feature 3: Scrapbook-Inspired Memory Section */}
        <ScrapbookSection onPhotoClick={handleOpenPhoto} />

        {/* Feature 5: The Birthday Letter Reveal */}
        <BirthdayWishSection />

        {/* Feature 2 (Phase 3): Floating Balloons & Skyward Release */}
        <BalloonReleaseSection />

        {/* Feature 3 (Phase 3): Birthday Cake & Candle Extinguishing */}
        <BirthdayCakeSection onTriggerCelebration={() => setCelebrationOpen(true)} />

        {/* Feature 1 (Phase 3): Interactive Magical Gift Box Unboxing */}
        <InteractiveGift />

        {/* Feature 6: Cinematic Closing Scene */}
        <ClosingScene onReturnTop={handleScrollToTop} />
      </main>

      {/* Minimal Footer */}
      <FooterSection />

      {/* Collapsible Celebration & Sound Controls Dock */}
      <BottomDock onOpenCelebration={() => setCelebrationOpen(true)} />

      {/* Feature 4: Interactive Photo Viewer Lightbox Modal */}
      <PhotoViewerModal
        photos={allViewerPhotos}
        currentIndex={viewerPhotoIndex}
        onClose={() => setViewerPhotoIndex(null)}
        onNavigate={(newIdx) => setViewerPhotoIndex(newIdx)}
      />

      {/* Grand Birthday Celebration Modal with Confetti */}
      <CelebrationModal
        isOpen={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
      />
    </div>
  );
}
