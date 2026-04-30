import { motion } from 'framer-motion';

export function PremiumButton({
  primaryText = "Become a Partner",
  secondaryText = "Get the Deck",
  href = "#",
  className = "",
}) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      className={`group relative px-12 py-5 bg-gray-800 text-white text-center overflow-hidden rounded-full inline-block ${className}`}
    >
      {/* 1. The White Background Overlay (Slide-up effect) */}
      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />

      {/* 2. Primary Text (Slides up and disappears) */}
      <span className="relative z-10 block text-[10px] font-bold  transition-transform duration-500 group-hover:-translate-y-full">
        {primaryText}
      </span>

      {/* 3. Secondary Text (Slides up from bottom to center) */}
      <span className="absolute inset-0 z-20 flex items-center justify-center text-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-[10px] font-bold ">
        {secondaryText}
      </span>
    </motion.a>
  );
}
