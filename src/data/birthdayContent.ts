/**
 * Centralized Configuration for Aswathy's Birthday Experience
 * 
 * To replace the portrait with an actual photograph:
 * Place your image file at "/images/aswathy-portrait.jpg" (in the public directory),
 * or update the `imagePath` property below to point to your image file.
 * The layout and animations will automatically adapt seamlessly.
 */

export interface BirthdayConfig {
  recipient: {
    name: string;
    fullName: string;
    initials: string;
    pronouns: string;
  };
  siteMeta: {
    title: string;
    subtitle: string;
    edition: string;
  };
  opening: {
    eyebrow: string;
    title: string;
    supportingText: string;
    buttonText: string;
    scrollHint: string;
  };
  hero: {
    kicker: string;
    greeting: string;
    name: string;
    supportingMessage: string;
    badgeText: string;
  };
  portrait: {
    imagePath: string;
    fallbackQuote: string;
    fallbackSubtext: string;
    captionTitle: string;
    captionDescription: string;
    tagLabel: string;
  };
  letter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signoff: string;
    postscript?: string;
  };
  teaser: {
    heading: string;
    supportingText: string;
    badge: string;
    subNote: string;
    giftPrompt: string;
  };
  storyScene: {
    chapterTag: string;
    stages: Array<{
      eyebrow: string;
      quote: string;
      subtext: string;
    }>;
  };
  interactiveGift: {
    eyebrow: string;
    heading: string;
    prompt: string;
    openingNotice: string;
    messageSalutation: string;
    messageBody: string;
    messageClosing: string;
    replayLabel: string;
  };
  balloonScene: {
    eyebrow: string;
    heading: string;
    subtext: string;
    releasePrompt: string;
    releasedMessage: string;
    replayLabel: string;
  };
  cakeScene: {
    eyebrow: string;
    heading: string;
    subtext: string;
    blowPrompt: string;
    wishMessage: string;
    relightPrompt: string;
  };
  grandCelebration: {
    headline: string;
    supportingMessage: string;
    buttonLabel: string;
    closeLabel: string;
  };
  gallery: {
    eyebrow: string;
    heading: string;
    supportingText: string;
    photos: Array<{
      id: string;
      src: string;
      alt: string;
      caption: string;
      layout: 'featured' | 'tall' | 'wide' | 'polaroid' | 'standard';
      objectPosition?: string;
      date?: string;
      rotation?: number;
      tag?: string;
    }>;
  };
  scrapbook: {
    eyebrow: string;
    heading: string;
    supportingMessage: string;
    items: Array<{
      id: string;
      src: string;
      alt: string;
      label: string;
      tag: string;
      note: string;
      rotation: number;
      tapeColor?: string;
    }>;
  };
  letterReveal: {
    eyebrow: string;
    heading: string;
    supportingText: string;
    actionPrompt: string;
    closePrompt: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    closingWish: string;
    signoff: string;
  };
  closingScene: {
    eyebrow: string;
    headline: string;
    supportingText: string;
    finalBirthdayMessage: string;
    returnTopLabel: string;
  };
  footer: {
    message: string;
    year: string;
    dedication: string;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipient: {
    name: "Aswathy",
    fullName: "Aswathy",
    initials: "A",
    pronouns: "her",
  },
  siteMeta: {
    title: "ASWATHY — A LITTLE UNIVERSE OF HAPPINESS",
    subtitle: "A digital birthday celebration",
    edition: "Birthday Edition · 2026",
  },
  opening: {
    eyebrow: "A LITTLE SOMETHING JUST FOR YOU",
    title: "For Aswathy.",
    supportingText: "Some people make the world feel a little more beautiful just by being in it.",
    buttonText: "Enter Your Little World",
    scrollHint: "Scroll down to discover",
  },
  hero: {
    kicker: "A CELEBRATION OF YOUR RADIANCE",
    greeting: "Happy Birthday",
    name: "Aswathy",
    supportingMessage: "Today, the world gets another reason to smile.",
    badgeText: "A Special Chapter Begins",
  },
  portrait: {
    // Easily replace with your own image in public/images/aswathy-portrait.jpg
    imagePath: "/images/aswathy-portrait.jpg",
    fallbackQuote: "A face that deserves a thousand beautiful memories.",
    fallbackSubtext: "Curated with love · Reserved for Aswathy's portrait",
    captionTitle: "The Light You Bring",
    captionDescription: "Soft, vibrant, and effortlessly brightening every space you enter.",
    tagLabel: "Portrait Feature",
  },
  letter: {
    salutation: "Dear Aswathy,",
    paragraphs: [
      "I hope this new chapter brings you the kind of happiness that stays long after the celebrations are over, the kind of moments that become beautiful memories, and countless little reasons to smile.",
      "May you find courage in new beginnings, warmth in the people around you, and magic in the ordinary moments that make life special.",
      "Today is all about celebrating you and the beautiful person you are.",
    ],
    closing: "Happy Birthday, Aswathy. May your world always hold a little extra magic.",
    signoff: "With fondest wishes & warmest thoughts,",
    postscript: "P.S. Keep smiling — the universe looks good with your joy in it.",
  },
  teaser: {
    heading: "But wait... there's a little more magic.",
    supportingText: "This is only the beginning.",
    badge: "Phase 2 Cinematic Edition",
    subNote: "Interactive surprises, sweet keepsakes, and musical celebrations are quietly being prepared.",
    giftPrompt: "Hover over the gift box to feel the anticipation",
  },
  storyScene: {
    chapterTag: "CHAPTER II · THE STORY OF YOUR LIGHT",
    stages: [
      {
        eyebrow: "MOMENT I · PRESENCE",
        quote: "Every year brings quiet changes...",
        subtext: "...yet your warmth remains steady, grounding everyone who knows you.",
      },
      {
        eyebrow: "MOMENT II · RADIANCE",
        quote: "A light that brightens the simplest days.",
        subtext: "In the gentle way you listen, the laughter you spark, and the joy you cultivate.",
      },
      {
        eyebrow: "MOMENT III · CELEBRATION",
        quote: "Today, we celebrate all that you are.",
        subtext: "May this upcoming year unfold with tenderness, adventure, and boundless happiness.",
      },
    ],
  },
  interactiveGift: {
    eyebrow: "A SURPRISE FROM THE HEART",
    heading: "A Little Surprise, Wrapped With Care",
    prompt: "Open your little surprise",
    openingNotice: "Unwrapping something special just for you...",
    messageSalutation: "Dear Aswathy,",
    messageBody: "If happiness could be wrapped in a little box, I would fill this one with endless smiles, beautiful memories, and all the wonderful things you deserve.",
    messageClosing: "May this birthday be the beginning of something truly lovely.",
    replayLabel: "Wrap gift again",
  },
  balloonScene: {
    eyebrow: "CHAPTER III · DREAMS IN FLIGHT",
    heading: "Send Your Wishes To The Sky",
    subtext: "Every balloon carries a quiet birthday wish for your upcoming year — lightness, joy, and dreams taking flight.",
    releasePrompt: "Release the balloons",
    releasedMessage: "May your dreams always find the sky.",
    replayLabel: "Gather balloons back",
  },
  cakeScene: {
    eyebrow: "CHAPTER IV · A SACRED TRADITION",
    heading: "One little wish, just for you.",
    subtext: "Close your eyes, make a wish, and let this moment be yours.",
    blowPrompt: "Blow out the candles",
    wishMessage: "May the year ahead bring you beautiful surprises, unexpected happiness, and countless reasons to smile.",
    relightPrompt: "Relight the candles",
  },
  grandCelebration: {
    headline: "Happy Birthday, Aswathy!",
    supportingMessage: "May your world always be filled with love, laughter, beautiful moments, and a little extra magic.",
    buttonLabel: "Celebrate Aswathy",
    closeLabel: "Return to celebration",
  },
  gallery: {
    eyebrow: "CHAPTER V · TIMELESS FRAMES",
    heading: "A collection of little moments.",
    supportingText: "Some photographs hold more than a moment. They hold a feeling you want to keep.",
    photos: [
      {
        id: "gallery-portrait",
        src: "/images/aswathy-portrait.jpg",
        alt: "Portrait of Aswathy",
        caption: "A moment worth keeping — radiant, calm, and genuine.",
        layout: "featured",
        tag: "Archival Centerpiece",
        date: "Special Chapter",
        rotation: 0,
      },
      {
        id: "gallery-01",
        src: "/images/gallery-1.jpg",
        alt: "Aswathy smiling warmly",
        caption: "A smile that gently brightens every corner of the room.",
        layout: "tall",
        tag: "Radiance",
        date: "Memory I",
        rotation: 1,
      },
      {
        id: "gallery-02",
        src: "/images/gallery-2.jpg",
        alt: "Golden hour reflection",
        caption: "Soft light, gentle laughter, and the beauty of quiet happiness.",
        layout: "wide",
        tag: "Golden Hour",
        date: "Memory II",
        rotation: -1,
      },
      {
        id: "gallery-03",
        src: "/images/gallery-3.jpg",
        alt: "Candid grace",
        caption: "Unfiltered elegance and an unmistakable spirit of kindness.",
        layout: "tall",
        tag: "Grace",
        date: "Memory III",
        rotation: 1.5,
      },
      {
        id: "gallery-04",
        src: "/images/gallery-4.jpg",
        alt: "Polaroid keepsake",
        caption: "One for the memory book — timeless and forever treasured.",
        layout: "polaroid",
        tag: "Keepsake",
        date: "Memory IV",
        rotation: -2,
      },
    ],
  },
  scrapbook: {
    eyebrow: "CHAPTER VI · MEMORY JOURNAL",
    heading: "Little things. Beautiful feelings.",
    supportingMessage: "Not every beautiful thing needs a grand occasion. Sometimes, the smallest moments become the ones we treasure most.",
    items: [
      {
        id: "scrap-1",
        src: "/images/scrapbook-1.jpg",
        alt: "Scrapbook moment of happiness",
        label: "A moment worth keeping.",
        tag: "Radiant Smile",
        note: "Preserved with gentle affection",
        rotation: -2,
        tapeColor: "#D6B77A",
      },
      {
        id: "scrap-2",
        src: "/images/scrapbook-2.jpg",
        alt: "Scrapbook golden hour",
        label: "A little piece of happiness.",
        tag: "Simple Joy",
        note: "Pure warmth and quiet laughter",
        rotation: 2.5,
        tapeColor: "#D79AAF",
      },
      {
        id: "scrap-3",
        src: "/images/scrapbook-3.jpg",
        alt: "Scrapbook treasured milestone",
        label: "One for the memory book.",
        tag: "Milestone",
        note: "Treasured through the changing seasons",
        rotation: -1.8,
        tapeColor: "#71384F",
      },
      {
        id: "scrap-4",
        src: "/images/scrapbook-4.jpg",
        alt: "Scrapbook preserved warmth",
        label: "A beautiful moment, preserved.",
        tag: "Golden Heart",
        note: "Unwavering kindness and warmth",
        rotation: 2,
        tapeColor: "#D6B77A",
      },
    ],
  },
  letterReveal: {
    eyebrow: "CHAPTER VII · WORDS FROM THE HEART",
    heading: "A little letter for you.",
    supportingText: "Because some wishes deserve more than just a few words.",
    actionPrompt: "Read your little letter",
    closePrompt: "Fold letter back",
    salutation: "Dear Aswathy,",
    paragraphs: [
      "On your birthday, I hope life gives you more reasons to smile than you can count, more beautiful moments than you expect, and more happiness than words can describe.",
      "May the coming year bring you exciting beginnings, quiet moments of peace, unexpected adventures, and people who remind you how special you are.",
      "I hope you continue finding beauty in little things, strength in difficult moments, and joy in the dreams you choose to follow.",
      "May you always have something to look forward to, someone to laugh with, and countless memories that make you smile long after the moment has passed.",
      "Today is a little reminder that you deserve kindness, happiness, and all the wonderful things life has yet to bring.",
    ],
    closing: "Happy Birthday, Aswathy.",
    closingWish: "May this new chapter be one of your most beautiful yet.",
    signoff: "With all my warmest thoughts,",
  },
  closingScene: {
    eyebrow: "FINALE · THE NEXT HORIZON",
    headline: "And just like that, another beautiful chapter begins.",
    supportingText: "May your next trip around the sun be filled with little wonders, wonderful people, and memories worth keeping.",
    finalBirthdayMessage: "Happy Birthday, Aswathy.",
    returnTopLabel: "Return to beginning",
  },
  footer: {
    message: "Made with a little extra love, just for Aswathy.",
    year: "2026",
    dedication: "Crafted exclusively for Aswathy's special day",
  },
};
