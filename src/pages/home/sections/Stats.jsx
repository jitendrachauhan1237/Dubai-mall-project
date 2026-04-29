import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { PremiumButton } from '../../../components/shared/PremiumButton';

const stats = [
  { value: 100, label: 'Annual Visitors', suffix: 'M+' },
  { value: 1200, label: 'Retail Outlets', suffix: '+' },
  { value: 150, label: 'Cuisine Concepts', suffix: '+' },
  { value: 25, label: 'Legacy Years', suffix: '' },
];

export function Stats({ isReady = false }) {
  return (
    <section id="stats" className="py-32 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Subtle Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <span className="text-[10px] font-bold tracking-[0.5em] text-slate-400 uppercase mb-4">
            The Magnitude
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-slate-900 text-center tracking-tight">
            Scale & Impact
          </h2>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-slate-500 text-center leading-relaxed">
            Our scale isn’t just traffic — it’s guaranteed audience for your brand, primed for premium retail, sponsorship, and high-impact storytelling.
          </p>
          <div className="mt-8">
            <PremiumButton
              href="#opportunity"
              primaryText="See Audience Insights"
              secondaryText="View Insights"
              className="text-sm"
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} isReady={isReady} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index, isReady }) {
  const countRef = useRef(null);
  const blockRef = useRef(null);
  const inView = useInView(blockRef, { once: true, margin: '-120px 0px -120px 0px' });
  
  useEffect(() => {
    const node = countRef.current;
    if (!node || !isReady || !inView) return;

    const controls = animate(0, stat.value, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1], // Custom luxury expo ease
      onUpdate(value) {
        node.textContent = Math.round(value);
      },
      delay: index * 0.1,
    });

    return () => controls.stop();
  }, [stat.value, index, isReady, inView]);

  return (
    <motion.div 
      ref={blockRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isReady && inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
      <div className="flex items-baseline mb-2">
        <span 
          ref={countRef} 
          className="text-5xl md:text-7xl font-light tracking-tighter text-slate-900 font-mono"
        >
          0
        </span>
        <span className="text-2xl md:text-3xl font-serif text-slate-400 ml-1">
          {stat.suffix}
        </span>
      </div>
      
      {/* Decorative Line */}
      <div className="w-8 h-[1px] bg-slate-200 my-4 group-hover:w-16 group-hover:bg-black transition-all duration-700" />
      
      <p className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}