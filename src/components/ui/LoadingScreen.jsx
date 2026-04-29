import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export function LoadingScreen({ isReady, onFinish }) {
  const [count, setCount] = useState(0);
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  useEffect(() => {
    // 1. Minimum 2.5 seconds ka buffer taaki user animation dekh sake
    const timer = setTimeout(() => {
      setMinimumTimePassed(true);
    }, 2500);

    // 2. Counter Animation (hamesha chalegi)
    const target = { value: 0 };
    const counterTl = gsap.to(target, {
      value: 100,
      duration: 2.2, // Counter ki speed yahan se control karein
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(target.value)),
    });

    return () => {
      clearTimeout(timer);
      counterTl.kill();
    };
  }, []);

  useEffect(() => {
    // 3. Exit Animation sirf tab hogi jab:
    // Page Ready ho gaya ho AND Minimum Time (2.5s) nikal chuka ho
    if (isReady && minimumTimePassed) {
      const exitTl = gsap.timeline({ onComplete: onFinish });
      
      exitTl.to('.loading-screen', {
        clipPath: 'inset(0 0 100% 0)', // Luxury slide up effect
        duration: 1.2,
        ease: 'expo.inOut',
      });
    }
  }, [isReady, minimumTimePassed, onFinish]);

  return (
    <div className="loading-screen fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden">
      
      <div className="text-center overflow-hidden gap-4">
        <div className="brand-logo overflow-hidden mb-4">
          <div className="w-32 md:w-40 mx-auto flex items-center justify-center text-xl md:text-2xl font-semibold text-slate-900">
            Dubai Mall
          </div>
        </div>
        <div className="overflow-hidden">
          <h2 className="text-sm  font-thin  text-slate-600 font-serif italic">
            A commercial stage for global brands.
          </h2>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 md:left-20 overflow-hidden">
        <span className="text-7xl md:text-9xl font-serif text-slate-900 tracking-tighter flex">
          {count.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Luxury Detail: Progress Bar at the bottom */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300" 
           style={{ width: `${count}%` }} 
      />
    </div>
  );
}