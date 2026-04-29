import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { VideoBlock } from "../../../components/shared/VideoBlock";
import { PremiumButton } from "../../../components/shared/PremiumButton";

/* 🎬 Animation System */
const createContainerVariants = (isReady) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: isReady ? 0.2 : 2.6,
    },
  },
});

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: [0.19, 1, 0.22, 1] },
  },
};

export function Hero({ isReady = false }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);

  /* 🔄 Rotating Words */
  const words = ["Ordinary.", "Expected.", "Typical.", "Conventional.", "Static."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  /* 🎬 Parallax */
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  /* 🎥 Video control */
  useEffect(() => {
    const handleScroll = () => {
      const shouldPlay = window.scrollY < window.innerHeight * 0.8;
      setIsPlaying(shouldPlay);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 🎥 Video */}
      <div className="absolute inset-0 z-0">
        <VideoBlock
          src="/assets/hero-video.mp4"
          poster="/assets/hero-poster.svg"
          className="w-full h-full object-cover"
          isPlaying={isPlaying}
          isMuted={isMuted}
        />
      </div>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* ✨ Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 text-center text-white max-w-6xl px-6"
      >
        <motion.div
          variants={createContainerVariants(isReady)}
          initial="hidden"
          animate={isReady ? "show" : "hidden"}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[10px] md:text-xs font-bold text-white/60"
          >
            A <span className="italic font-serif lowercase">Global</span> Icon
          </motion.span>

          {/* 🔥 HERO TEXT WITH ROTATING WORD */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-9xl font-serif leading-[0.9] tracking-tighter sm:mb-10"
          >
            Beyond the <br />
            
           <span className="italic font-light opacity-90 inline-block relative h-[1em] min-w-[8ch] text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                 className="absolute inset-0 flex items-center justify-center"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex justify-center">
            <p className="text-base md:text-lg text-white/70 max-w-xl font-sans leading-relaxed">
              Experience where global luxury and architectural scale converge to create a world-class commercial platform for brand growth.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-row justify-center gap-4"
          >
              <PremiumButton
              href="#opportunity"
              primaryText="Explore Leasing"
              secondaryText="View Opportunities"
              className="sm:px-8 px-4 sm:py-4 py-2 text-sm font-semibold"
            />

            <PremiumButton
              href="#retail"
              primaryText="Book a Tour"
              secondaryText="Discover Retail"
              className="sm:px-8 px-4 sm:py-4 py-2 text-sm font-semibold"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 🎮 Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-md bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>
    </section>
  );
}