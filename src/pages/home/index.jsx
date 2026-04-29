import React, { useEffect, useState, Suspense } from 'react';
import { ReadyContext } from '../../context/ReadyContext';
import { useLenis } from '../../hooks/useLenis';
import { Nav } from '../../layout/Nav';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { Footer } from '../../layout/Footer';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';

// Lazy load below-the-fold components to reduce initial JS bundle size
const HorizontalScroll = React.lazy(() => import('../../components/ui/HorizontalScroll').then(module => ({ default: module.HorizontalScroll })));
const Retail = React.lazy(() => import('./sections/Retail').then(module => ({ default: module.Retail })));
const Experience = React.lazy(() => import('./sections/Experience').then(module => ({ default: module.Experience })));
const Events = React.lazy(() => import('./sections/Events').then(module => ({ default: module.Events })));
const GlobalReach = React.lazy(() => import('./sections/GlobalReach').then(module => ({ default: module.GlobalReach })));
const Opportunity = React.lazy(() => import('./sections/Opportunity').then(module => ({ default: module.Opportunity })));
const FinalCTA = React.lazy(() => import('./sections/CTA').then(module => ({ default: module.FinalCTA })));

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [loaderFinished, setLoaderFinished] = useState(false);

  useLenis();

  useEffect(() => {
    sessionStorage.setItem('introSeen', 'true');
  }, []);

  useEffect(() => {
    let active = true;

    // We no longer rely on a small SVG to hide the loader.
    // Instead, we wait for the actual hero video to be ready enough to play.
    const videoElement = document.createElement('video');
    videoElement.src = '/assets/hero-video.mp4';
    videoElement.preload = 'auto'; // Load enough of the video to ensure a smooth start

    const handleReady = () => {
      if (active && !isReady) {
        setIsReady(true);
      }
    };

    // Fired when enough data is available that the media can be played
    videoElement.addEventListener('canplay', handleReady);
    
    // Fallback if there is an error loading the video (e.g. adblocker, broken path)
    videoElement.addEventListener('error', handleReady);

    // Fallback timeout (3 seconds) just in case the video takes too long to reach 'canplay' on slow mobile networks
    const timeout = setTimeout(() => {
      handleReady();
    }, 3000);

    return () => {
      active = false;
      videoElement.removeEventListener('canplay', handleReady);
      videoElement.removeEventListener('error', handleReady);
      clearTimeout(timeout);
    };
  }, [isReady]);

  const handleHideLoader = () => {
    setShowLoader(false);
    setLoaderFinished(true);
  };

  return (
    <ReadyContext.Provider value={{ isReady, setIsReady }}>
      <div className="min-h-screen bg-white">
        <Nav />
        <Hero isReady={loaderFinished} />
        <Stats isReady={loaderFinished} />

        <Suspense fallback={<div className="h-screen bg-white flex items-center justify-center"></div>}>
          <section className="bg-white">
            <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm leading-7 text-slate-500">
              Our scale isn’t just traffic — it is guaranteed brand exposure in a market built for premium conversion.
            </div>
          </section>

          <HorizontalScroll isReady={loaderFinished} />
          <Retail isReady={loaderFinished} />

          <section className="bg-[#fafafa]">
            <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm leading-7 text-slate-500">
              Every retail partnership here is designed to support long-term desirability, not just short-term footfall.
            </div>
          </section>

          <Experience isReady={loaderFinished} />

          <section className="bg-white">
            <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm leading-7 text-slate-500">
              Experiences here convert curiosity into premium spending through carefully designed guest journeys.
            </div>
          </section>

          <Events isReady={loaderFinished} />

          <section className="bg-[#fafafa]">
            <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm leading-7 text-slate-500">
              Our event platform is a direct channel for brand activation, audience impact, and strategic revenue.
            </div>
          </section>

          <GlobalReach isReady={loaderFinished} />
          <Opportunity isReady={loaderFinished} />
          <FinalCTA />
        </Suspense>

        <Footer />
      </div>
      {showLoader && <LoadingScreen isReady={isReady} onFinish={handleHideLoader} />}
    </ReadyContext.Provider>
  );
}
