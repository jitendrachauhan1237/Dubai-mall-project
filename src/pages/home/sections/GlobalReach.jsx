import { motion } from 'framer-motion';
import { PremiumButton } from '../../../components/shared/PremiumButton';

export function GlobalReach({ isReady = false }) {
  const REACH_STATS = [
    { 
      label: "Airport access", 
      value: "30 min", 
      desc: "Direct proximity to the city’s primary global gateway improves arrival frequency.",
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
    },
    { 
      label: "Tourist inflow", 
      value: "80M+", 
      desc: "Yearly international arrivals create a continuous pipeline of premium consumers.",
      icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" 
    },
    { 
      label: "Regional catchment", 
      value: "20M", 
      desc: "A premium audience base within a two-hour travel radius that supports growth.",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
    }
  ];

  return (
    <section id="reach" className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="text-[10px] font-bold tracking-[0.8em] text-slate-400 uppercase mb-6 block">
              Global Connectivity
            </span>
            <h2 className="text-6xl md:text-8xl font-serif text-slate-900 tracking-tight leading-[0.95]">
              The world arrives here. <br />
              <span className="italic text-slate-300">Your brand</span> is ready.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm"
          >
            <div className="h-[1px] w-20 bg-slate-900 mb-8" />
            <p className="text-base text-slate-500 font-light leading-relaxed">
              Dubai Mall is the strategic geographic anchor for brands seeking undisputed international relevance.
            </p>
          </motion.div>
        </div>

        {/* Reach Grid */}
        <div className="grid gap-1 md:grid-cols-3 bg-slate-100 border border-slate-100 rounded-[42px] overflow-hidden">
          {REACH_STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative bg-white p-12 md:p-16 flex flex-col justify-between min-h-[400px] transition-colors hover:bg-[#fafafa]"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-12 font-bold transition-colors group-hover:text-slate-900">
                  {stat.label}
                </p>
                <h3 className="text-6xl md:text-7xl font-serif text-slate-900 mb-6 tracking-tighter">
                  {stat.value}
                </h3>
              </div>

              <div>
                <div className="w-12 h-[1px] bg-slate-200 mb-6 group-hover:w-full transition-all duration-700" />
                <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              {/* Background Accent Icon (Subtle) */}
              <div className="absolute top-12 right-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                <svg width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path d={stat.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.4em] text-slate-400 uppercase mb-8">
            Strategic Expansion
          </p>
          <PremiumButton
            href="#opportunity"
            primaryText="Align with the reach strategy"
            secondaryText="See Global Reach"
            className="text-xs px-12 py-5"
          />
        </div>
      </div>
    </section>
  );
}