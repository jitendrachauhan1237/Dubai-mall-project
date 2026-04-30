import { motion } from "framer-motion";

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] text-white overflow-hidden">
      {/* TOP CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-16 px-6 py-24 mx-auto max-w-7xl md:grid-cols-3"
      >
        <motion.div variants={itemVariants}>
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-6 font-bold">
            Leasing & Partnerships
          </p>
          <p className="mb-8 text-sm leading-relaxed text-slate-400 font-light">
            Reach the commercial team for brand placement, sponsorship, and
            event opportunities at Dubai Mall.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:leasing@thedubaimall.com"
              className="block text-sm text-slate-300 hover:text-white transition-colors duration-300"
            >
              leasing@thedubaimall.com
            </a>
            <p className="text-sm text-slate-300 font-light">+971 4 000 0000</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-6 font-bold">
            Quick links
          </p>
          <ul className="space-y-4">
            {["Opportunity", "Events", "Reach"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="group relative text-sm text-slate-400 hover:text-white transition-colors duration-500 font-light"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-6 font-bold">
            Credibility
          </p>
          <p className="text-sm leading-relaxed text-slate-400 font-light italic">
            "Dubai Mall Commercial Partnerships — a global brand platform built
            for premium retail, lifestyle, and live experiences."
          </p>
          <div className="mt-8 h-[1px] w-12 bg-slate-800" />
        </motion.div>
      </motion.div>
      {/* BOTTOM BAR */}
      <div className="px-6 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between font-semibold items-center gap-4">
          <p className="text-[9px]  text-slate-500 ">
            © 2026 Emaar Properties PJSC
          </p>
          <div className="flex gap-8">
            <p className="text-[9px]  text-slate-500  hover:text-slate-400 cursor-pointer transition-colors">
              Privacy Policy
            </p>
            <p className="text-[9px]  text-slate-500  hover:text-slate-400 cursor-pointer transition-colors">
              Terms of Service
            </p>
          </div>
        </div>
      </div>
      {/* FULL WIDTH IMAGE WITH SUBTLE REVEAL */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden"
      >
        <img
          src="/assets/footer-asset.webp"
          alt="Dubai Mall - Premium Retail Destination"
          className="w-full h-auto object-cover opacity-80 grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
        />
      </motion.div>
    </footer>
  );
}
