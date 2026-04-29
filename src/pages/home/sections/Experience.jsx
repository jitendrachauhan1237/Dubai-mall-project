import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PremiumButton } from '../../../components/ui/PremiumButton';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    title: "The Underwater World",
    category: "Aquarium",
    description: "Witness the majesty of 33,000 marine animals in one of the world's largest suspended tanks.",
    image: "https://i.ytimg.com/vi/mIyQZpFnGhE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYBb2ItxAyEyLbY8MQgTJroz4SYQ",
    id: "aquarium"
  },
  {
    title: "Culinary Excellence",
    category: "Dining",
    description: "A symphony of global flavors, from the heritage of the Middle East to Michelin-starred innovations.",
    image: "https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208320.jpg?semt=ais_rp_50_assets&w=740&q=80",
    id: "dining"
  },
  {
    title: "Digital Art Sanctuary",
    category: "Entertainment",
    description: "Lose yourself in immersive digital landscapes where art transcends the physical frame.",
    image: "https://cdn.sanity.io/images/cxgd3urn/production/d44beb05dcab7f71d709d289cdfa0bfc86764ed4-2100x1048.jpg",
    id: "attractions"
  }
];

export function Experience({ isReady = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;

    let ctx = gsap.context(() => {
      // Reveal blocks with clipPath
      gsap.utils.toArray('.exp-block').forEach((block) => {
        gsap.fromTo(block, 
          { 
            clipPath: 'inset(15% 10% 15% 10% round 40px)', 
            opacity: 0, 
            y: 80 
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 40px)',
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Hardware-accelerated Parallax (OLD LOGIC RESTORED)
        gsap.to(block.querySelector('.parallax-img'), {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section id="experience" ref={containerRef} className="py-40 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Sales Deck UI */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.8em] text-slate-400 uppercase mb-6"
          >
            Engagement at Scale
          </motion.span>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="text-6xl md:text-8xl font-serif text-slate-900 leading-none tracking-tight"
          >
            The Collection <br /> <span className="italic text-slate-300">of Experiences</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="h-[1px] w-40 bg-slate-200 my-10 origin-center"
          />
          <motion.p
            className="max-w-2xl text-base md:text-lg text-slate-500 font-light leading-relaxed"
          >
            Beyond retail, we offer anchor destinations that drive <span className="text-slate-900 font-medium">98% visitor circulation</span> across all levels.
          </motion.p>
        </div>

        {/* Experience Blocks */}
        <div className="space-y-32">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="exp-block relative group cursor-pointer">
              {/* Added 'isolate' and mask to fix corner clipping */}
              <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-[40px] transform-gpu isolate"
                   style={{ maskImage: 'linear-gradient(white, white)', WebkitMaskImage: 'linear-gradient(white, white)' }}>
                
                {/* Parallax Image Container (OLD LOGIC) */}
                <div className="parallax-img absolute inset-0 h-[120%] w-full will-change-transform">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  />
                </div>
                
                {/* Modern Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-20">
                  <div className="max-w-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="text-white/60 text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                      {exp.category}
                    </span>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-none">
                      {exp.title}
                    </h3>
                    <div className="h-[2px] w-0 group-hover:w-20 bg-white/50 transition-all duration-700 mb-6" />
                    <p className="text-white/70 text-sm md:text-xl font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Counter Label (Glassmorphism) */}
                <div className="absolute top-10 right-10 w-16 h-16 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-sm font-serif italic">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Reusable Premium CTA */}
        <div className="mt-32 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.4em] text-slate-400 uppercase mb-8">
            Interested in Partnership?
          </p>
          <PremiumButton
            href="#opportunity"
            primaryText="Become a Partner"
            secondaryText="Get the Deck"
            className="text-xs px-12 py-5"
          />
        </div>
      </div>
    </section>
  );
}
