import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Configure smooth defaults
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  // Enable lag smoothing to avoid jumps during heavy scroll frames
  gsap.ticker.lagSmoothing(500, 33);
}

export { gsap, ScrollTrigger };
