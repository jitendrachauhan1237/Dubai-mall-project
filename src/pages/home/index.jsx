import { useEffect, useState } from 'react';
import { ReadyContext } from '../../context/ReadyContext';
import { useLenis } from '../../hooks/useLenis';
import { Nav } from '../../components/shared/Nav';
import { LoadingScreen } from '../../components/shared/LoadingScreen';
import { Footer } from '../../components/shared/Footer';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { HorizontalScroll } from '../../components/shared/HorizontalScroll';
import { Retail } from './sections/Retail';
import { Experience } from './sections/Experience';
import { Events } from './sections/Events';
import { GlobalReach } from './sections/GlobalReach';
import { Opportunity } from './sections/Opportunity';
import { FinalCTA } from './sections/CTA';

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
    const poster = '/assets/hero-poster.svg';

    const posterLoader = new Image();
    posterLoader.src = poster;
    posterLoader.onload = posterLoader.onerror = () => {
      if (active) setIsReady(true);
    };

    return () => {
      active = false;
    };
  }, []);

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
        <Footer />
      </div>
      {showLoader && <LoadingScreen isReady={isReady} onFinish={handleHideLoader} />}
    </ReadyContext.Provider>
  );
}
