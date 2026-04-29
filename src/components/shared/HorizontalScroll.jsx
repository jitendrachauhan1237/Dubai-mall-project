import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useSpring } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Optimized Data: Added business-focused descriptions for the sales deck
const PANELS = [
  {
    id: 1,
    type: "intro",
    title: "The Dubai Mall",
    subtitle: "A GLOBAL ICON",
    description: "The world's most visited retail and entertainment destination, redefining the boundaries of global luxury.",
  },
  {
    id: 2,
    type: "image",
    title: "Fashion Avenue",
    url: "https://www.businessoutreach.in/wp-content/uploads/2024/03/Louis-Vuitton.webp",
    caption: "The Pinnacle of Luxury",
    description: "Home to 200+ flagship brands including Louis Vuitton, Chanel, and Cartier.",
  },
  {
    id: 3,
    type: "image",
    title: "Dubai Aquarium",
    url: "https://mcpprodcdn.azureedge.net/files/store/mainPicture/569f886a10c00.png.optimized.jpg",
    caption: "Immersion at Scale",
    description: "A 10-million liter marine world that attracts millions of families annually.",
  },
  {
    id: 4,
    type: "image",
    title: "The Human Waterfall",
    url: "https://i0.wp.com/www.edwud.com/wp-content/uploads/2025/08/human-waterfall-dubai-mall.jpg?fit=1400%2C933&ssl=1",
    caption: "Iconic Architecture",
    description: "A stunning 24-meter tall art installation, a meeting point for global travelers.",
  },
  {
    id: 5,
    type: "outro",
    title: "Elevate Your Brand",
    subtitle: "THE OPPORTUNITY",
    description: "Position your story at the center of the world. Step into a view that transcends horizons.",
  }
];

export function HorizontalScroll({ isReady = false }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // Framer Motion Progress Logic for the bottom bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!isReady) return;

    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let ctx = gsap.context(() => {
      const totalWidth = scrollEl.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;

      gsap.to(scrollEl, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section ref={containerRef} className="relative bg-white overflow-hidden">
      <div
        ref={scrollRef}
        className="flex h-screen items-center px-[10vw] gap-[8vw] md:gap-[12vw] will-change-transform transform-gpu"
      >
        {PANELS.map((panel) => (
          <PanelItem key={panel.id} panel={panel} />
        ))}

        {/* Spacer for a clean end-state */}
        <div className="flex-shrink-0 w-[15vw]" />
      </div>
    </section>
  );
}

function PanelItem({ panel }) {
  // Corrected logical check: intro or outro use the text layout
  const isTextPanel = panel.type === "intro" || panel.type === "outro";

  return (
    <div className="w-[85vw] md:w-[65vw] lg:w-[50vw] flex-shrink-0">
      {isTextPanel ? (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.6em] text-slate-400 uppercase mb-8 block">
            {panel.subtitle}
          </span>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-slate-900 leading-[0.9] mb-10 italic">
            {panel.title}
          </h2>
          <p className="text-lg md:text-2xl text-slate-500 font-light border-l-2 border-slate-900 pl-8 md:pl-12 max-w-md leading-relaxed">
            {panel.description}
          </p>
        </motion.div>
      ) : (
        <div className="group relative">
          {/* Image Container with Luxury Zoom & GPU Acceleration */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-2xl bg-slate-50 transform-gpu">
            <img
              src={panel.url}
              alt={panel.title}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full transition-transform duration-[2s] ease-out group-hover:scale-110"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
          </div>

          <div className="mt-10 transform-gpu">
            <h3 className="text-3xl md:text-4xl font-serif mb-3 text-slate-900 tracking-tight">
              {panel.title}
            </h3>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">
              {panel.caption}
            </p>
            {/* Business Connector Text (Point 2 of Audit) */}
            <p className="mt-4 text-sm text-slate-500 max-w-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {panel.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}