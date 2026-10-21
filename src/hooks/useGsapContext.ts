import { useEffect, type RefObject } from 'react';
import { gsap } from '../utils/gsapConfig';

/**
 * A safe GSAP context hook that scopes selectors to a DOM element and cleans up
 * all timelines, animations, and ScrollTriggers on unmount or deps change.
 * Prevents React Strict Mode double-animation bugs, memory leaks, and TDZ errors.
 */
export function useGsapContext(
  callback: (ctx: gsap.Context) => void,
  scopeRef?: RefObject<HTMLElement | null> | HTMLElement | null,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Resolve the actual DOM element safely from RefObject or direct HTMLElement
    let scopeElement: HTMLElement | undefined = undefined;
    if (scopeRef) {
      if ('current' in scopeRef) {
        if (!scopeRef.current) return;
        scopeElement = scopeRef.current;
      } else {
        scopeElement = scopeRef;
      }
    }

    // GSAP context invokes the function synchronously passing the context as the first argument
    const ctx = gsap.context((self) => {
      try {
        callback(self);
      } catch (error) {
        console.warn('GSAP animation failed gracefully:', error);
      }
    }, scopeElement);

    return () => {
      try {
        ctx.revert();
      } catch (revertError) {
        console.warn('GSAP revert failed gracefully:', revertError);
      }
    };
  }, deps);
}
