import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    title: "The Underwater World",
    category: "Aquarium",
    image: "https://i.ytimg.com/vi/mIyQZpFnGhE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYBb2ItxAyEyLbY8MQgTJroz4SYQ",
  },
  {
    title: "A Glimpse of Prehistory",
    category: "The Dubai Dino",
    image: "https://www.shutterstock.com/image-photo/dubai-unites-arab-emirates-june-600nw-2341974243.jpg",
  },
  {
    title: "Choreographed Fountain",
    category: "Spectacle",
    image: "https://www.tboacademy.com/blog/wp-content/uploads/2024/02/FotoJet1-min-5.jpg",
  },
  {
    title: "Digital Art Sanctuary",
    category: "Arte Museum",
    image: "https://cdn.sanity.io/images/cxgd3urn/production/d44beb05dcab7f71d709d289cdfa0bfc86764ed4-2100x1048.jpg",
  },
  {
    title: "A Symphony of Water",
    category: "The Dubai Fountain",
    image: "https://www.dayoutdubai.ae/blog/wp-content/uploads/2019/12/1-1.jpg",
  }
  
];

export function Experience({ isReady = false }) {
  const sliderRef = useRef(null);
  const triggerRef = useRef(null);

useEffect(() => {
  if (!isReady) return;

  let ctx = gsap.context(() => {
    const slider = sliderRef.current;
    const items = gsap.utils.toArray(".experience-card");

    // Total width calculation (IMPORTANT)
    let totalWidth = 0;
    items.forEach((item) => {
      totalWidth += item.offsetWidth + 32; // gap-8 = 32px
    });

    // Infinite loop using pixel-based movement
    const loop = gsap.to(slider, {
      x: -totalWidth / 2, // move half because duplicated array
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    // Scroll velocity control
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const speed = 1 + Math.abs(velocity / 500);
        const direction = velocity > 0 ? 1 : -1;

        gsap.to(loop, {
          timeScale: direction * speed,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    ScrollTrigger.addEventListener("scrollEnd", () => {
      gsap.to(loop, { timeScale: 1, duration: 1 });
    });

  }, triggerRef);

  return () => ctx.revert();
}, [isReady]);

  return (
    <section id="experience" ref={triggerRef} className="py-40 bg-white overflow-hidden">
      <div className="px-6 mb-20 text-center">
        <motion.span className="text-[10px] font-bold tracking-[0.8em] text-slate-500 uppercase block mb-4">
          World Class Destinations
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-serif text-gray-800 tracking-tight">
          The <span className="italic text-slate-400">Experience</span> Loop
        </h2>
      </div>

      {/* Infinite Slider Wrapper */}
      <div className="relative flex whitespace-nowrap overflow-hidden py-10">
        <div ref={sliderRef} className="flex gap-8 px-4">
          {/* Double map to ensure enough items for the loop overlap */}
          {[...EXPERIENCES, ...EXPERIENCES].map((exp, index) => (
            <div 
              key={index} 
              className="experience-card flex-shrink-0 w-[300px] md:w-[500px] group relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:rounded-[32px] border border-white/10 isolate">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">
                    {exp.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white whitespace-normal">
                    {exp.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}