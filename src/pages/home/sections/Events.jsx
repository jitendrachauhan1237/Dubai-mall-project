import { motion } from 'framer-motion';
import { PremiumButton } from '../../../components/ui/PremiumButton';

export function Events({ isReady = false }) {
  // Stats data array for cleaner JSX
  const EVENT_STATS = [
    { label: "Concerts", value: "12K+", desc: "Capacity for headline performances and globally relevant live experiences." },
    { label: "Brand activations", value: "320+", desc: "Annual experiences that connect premium brands with high-intent audiences." },
    { label: "Expo capability", value: "Flexible", desc: "Modular event spaces designed for press, hospitality, and premium shopper activations." }
  ];

  return (
    <section id="events" className="py-40 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-bold tracking-[0.8em] text-slate-400 uppercase mb-6 block">
              Events Platform
            </span>
            <h2 className="text-5xl md:text-8xl font-serif text-slate-900 tracking-tight leading-[0.95]">
              Headline impact. <br />
              <span className="italic text-slate-300">Measurable</span> conversion.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-base md:text-lg text-slate-500 font-light leading-relaxed"
          >
            Built to support major launches and sponsorship activations in an environment anchored by global retail.
          </motion.p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {EVENT_STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-[40px] border border-slate-200/60 bg-white p-10 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/40"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-slate-900 group-hover:w-1/3 transition-all duration-500" />
              
              <p className="text-[10px] uppercase tracking-[0.5em] text-slate-400 mb-8 font-bold">
                {stat.label}
              </p>
              
              <h3 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6 tracking-tighter">
                {stat.value}
              </h3>
              
              <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
                {stat.desc}
              </p>

              {/* Counter Label (Experience sync) */}
              <div className="absolute bottom-8 right-8 text-[10px] font-serif italic text-slate-200 group-hover:text-slate-400 transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reusable Premium CTA */}
        <div className="mt-32 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.4em] text-slate-400 uppercase mb-8">
            Explore Strategic Formats
          </p>
          <PremiumButton
            href="#opportunity"
            primaryText="Discover event formats"
            secondaryText="See Event Options"
            className="text-xs px-12 py-5"
          />
        </div>
      </div>
    </section>
  );
}
