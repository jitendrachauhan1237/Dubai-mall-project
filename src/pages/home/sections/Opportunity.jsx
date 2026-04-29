import { motion } from 'framer-motion';
import { PremiumButton } from '../../../components/shared/PremiumButton';

const opportunities = [
  {
    title: 'Retail Leasing',
    tag: 'Expansion',
    description: 'Establish your presence in the global epicenter of luxury and commerce.',
    buttonText: 'Request Brochure',
  },
  {
    title: 'Brand Partnerships',
    tag: 'Collaboration',
    description: 'Craft immersive experiences that resonate with a high-net-worth global audience.',
    buttonText: 'Propose Partnership',
  },
  {
    title: 'Event Hosting',
    tag: 'Venues',
    description: "From private galas to global product launches in Dubai's most iconic spaces.",
    buttonText: 'Explore Venues',
  },
];

export function Opportunity({ isReady = false }) {
  return (
    <section id="opportunity" className="py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2 className="text-5xl md:text-8xl font-serif leading-none tracking-tighter mb-8">
              Grow With <br /> The Icon
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Join an ecosystem where premium retail, sponsorship and immersive events convert attention into revenue.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/60 list-disc list-inside max-w-xl">
              <li>Premium audience exposure across retail, dining and entertainment zones.</li>
              <li>Flexible engagement models for leasing, sponsorship and event activations.</li>
              <li>Direct connection to an international premium visitor base.</li>
            </ul>
            <PremiumButton
              href="mailto:leasing@thedubaimall.com"
              primaryText="Partner With Us"
              secondaryText="Contact Leasing"
              className="mt-10 text-sm"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[10px] font-bold tracking-[0.5em] text-white/30 uppercase border-b border-white/10 pb-2"
          >
            Business Solutions 2026
          </motion.div>
        </div>

        {/* Opportunity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-[32px] overflow-hidden">
          {opportunities.map((opp, index) => (
            <div 
              key={opp.title}
              className="bg-[#0a0a0a] p-10 md:p-14 flex flex-col justify-between group hover:bg-white transition-colors duration-700 ease-[0.16, 1, 0.3, 1]"
            >
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-black/40 transition-colors">
                  {opp.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif mt-6 mb-8 text-white group-hover:text-black transition-colors leading-tight">
                  {opp.title}
                </h3>
                <p className="text-white/50 group-hover:text-black/60 transition-colors font-light leading-relaxed mb-12">
                  {opp.description}
                </p>
              </div>

              {/* Custom High-End Button */}
              <PremiumButton
                href="#contact"
                primaryText={opp.buttonText}
                secondaryText="Contact Leasing"
                className="w-full text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}