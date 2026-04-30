import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { VideoBlock } from "../../../components/ui/VideoBlock";
import { PremiumButton } from "../../../components/ui/PremiumButton";

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
  const words = ["Ordinary.", "Expected.", "Typical.", "Conventional.", "Static."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

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
      <div className="absolute inset-0 z-0">
        <VideoBlock
          src="/assets/hero-video.mp4"
          className="w-full h-full object-cover "
          isPlaying={isPlaying}
          isMuted={isMuted}
          priority={true}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none backdrop-blur-[1.2px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

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
            style={{ willChange: "filter, transform, opacity" }}
            variants={fadeUp}
            className="inline-block text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-[0.5em] mb-8"
          >
            A <span className="italic font-serif lowercase">Global</span> Icon
          </motion.span>

          <motion.h1
            style={{ willChange: "filter, transform, opacity" }}
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-9xl font-serif leading-[0.9] tracking-tighter mb-12"
          >
            Beyond the <br />
            <span className="italic font-light opacity-90 inline-block relative h-[1.1em] min-w-[8ch] text-center">
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
                  style={{ willChange: "filter, transform, opacity" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} style={{ willChange: "filter, transform, opacity" }} className="flex justify-center">
            <p className="text-base md:text-lg text-white/70 max-w-xl font-sans leading-relaxed">
              Experience where global luxury and architectural scale converge to create a world-class commercial platform for brand growth.
            </p>
          </motion.div>

          <motion.div
            style={{ willChange: "filter, transform, opacity" }}
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

      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full border border-white/20 backdrop-blur-xl bg-white/5 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-700 group overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                transition={{ duration: 0.1 }}
              >
                <Pause size={20} fill="currentColor" className="stroke-none" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                transition={{ duration: 0.1 }}
              >
                <Play size={20} fill="currentColor" className=" stroke-none" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </section>
  );
}