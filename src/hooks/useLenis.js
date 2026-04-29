import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from '../lib/gsap';

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ticker
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger on scroll
    lenis.on('scroll', () => {
      gsap.ticker.tick();
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenisRef.current;
}