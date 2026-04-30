import { PremiumButton } from '../../../components/ui/PremiumButton';

export function FinalCTA() {
  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto px-6 sm:text-center">
        <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-slate-400 mb-4 inline-block">
          Final Call
        </span>
        <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight mb-8">
          Ready to place your brand at the centre of global retail gravity?
        </h2>
        <p className="mx-auto max-w-3xl text-sm text-slate-400 leading-relaxed mb-12">
          This deck is the first step toward a tailored partnership that delivers visibility, premium conversion, and long-term brand impact.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <PremiumButton
            href="mailto:leasing@thedubaimall.com"
            primaryText="Contact Leasing"
            secondaryText="Start the conversation"
            className="text-sm"
          />
          <PremiumButton
            href="#opportunity"
            primaryText="Review opportunity"
            secondaryText="See the deck"
            className="text-sm"
          />
        </div>
      </div>
    </section>
  );
}
