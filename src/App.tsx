
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

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

import BackgroundMusic from './components/BackgroundMusic';

import {
  PhotoViewerModal,
  type PhotoItem,
} from './components/PhotoViewerModal';

import { CelebrationModal } from './components/CelebrationModal';
import { UniverseCanvas } from './components/UniverseCanvas';
import { BottomDock } from './components/BottomDock';

import { BIRTHDAY_CONFIG } from './data/birthdayContent';
import { FlowerGiftIntro } from './components/FlowerGiftIntro';

export default function App() {
  // Flower intro state
  const [flowerReceived, setFlowerReceived] = useState(false);

  // Birthday website interaction states
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [viewerPhotoIndex, setViewerPhotoIndex] = useState<number | null>(
    null
  );

  // Combine gallery photos and scrapbook items for the photo viewer
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

  // Open a photo in the viewer
  const handleOpenPhoto = (photo: PhotoItem) => {
    const index = allViewerPhotos.findIndex(
      (item) => item.id === photo.id
    );

    setViewerPhotoIndex(index !== -1 ? index : 0);
  };

  // Lock scrolling while the flower intro or a modal is open
  useEffect(() => {
    const shouldLockScroll =
      !flowerReceived ||
      celebrationOpen ||
      viewerPhotoIndex !== null;

    document.body.style.overflow = shouldLockScroll ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [flowerReceived, celebrationOpen, viewerPhotoIndex]);

  // Return to the top of the birthday website
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Called when the recipient accepts the flower
  const handleReceiveFlower = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    setFlowerReceived(true);
  };

  return (
    <>
      {/* Keep music mounted during the intro and main website */}
      <BackgroundMusic />

      {/* Show only the flower intro until the flower is received */}
      {!flowerReceived ? (
        <FlowerGiftIntro onReceive={handleReceiveFlower} />
      ) : (
        /* Main birthday website mounts after the flower is received */
        <div className="min-h-screen relative overflow-x-hidden bg-[#FFF9F4] font-sans text-[#30252B] selection:bg-[#F4DDE5] selection:text-[#71384F]">
          {/* Scroll depth progress indicator */}
          <ScrollProgress />

          {/* 3D Celestial Stardust & Universe Canvas */}
          <UniverseCanvas />

          {/* Floating decorative elements */}
          <FloatingDecorations />

          {/* Main navigation */}
          <Navigation
            onOpenCelebration={() => setCelebrationOpen(true)}
          />

          {/* Main birthday website sections */}
          <main>
            {/* Chapter I: Cinematic Portrait Hero */}
            <BirthdayHero />

            {/* Chapter II: Pinned Story Scene */}
            <PinnedStoryScene />

            {/* Chapter III: Archival Photo Feature */}
            <PhotoFeature />

            {/* Photo Gallery */}
            <PhotoGallery onPhotoClick={handleOpenPhoto} />

            {/* Scrapbook Memories */}
            <ScrapbookSection onPhotoClick={handleOpenPhoto} />

            {/* Birthday Letter */}
            <BirthdayWishSection />

            {/* Floating Balloons */}
            <BalloonReleaseSection />

            {/* Birthday Cake and Celebration */}
            <BirthdayCakeSection
              onTriggerCelebration={() => setCelebrationOpen(true)}
            />

            {/* Interactive Magical Gift */}
            <InteractiveGift />

            {/* Cinematic Closing Scene */}
            <ClosingScene onReturnTop={handleScrollToTop} />
          </main>

          {/* Website Footer */}
          <FooterSection />

          {/* Celebration and Sound Controls */}
          <BottomDock
            onOpenCelebration={() => setCelebrationOpen(true)}
          />

          {/* Photo Viewer Modal */}
          <PhotoViewerModal
            photos={allViewerPhotos}
            currentIndex={viewerPhotoIndex}
            onClose={() => setViewerPhotoIndex(null)}
            onNavigate={(newIndex) => setViewerPhotoIndex(newIndex)}
          />

          {/* Birthday Celebration Modal */}
          <CelebrationModal
            isOpen={celebrationOpen}
            onClose={() => setCelebrationOpen(false)}
          />
        </div>
      )}
    </>
  );
}
