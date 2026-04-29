import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useReady } from "../../context/ReadyContext";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "stats", label: "Scale" },
  { id: "retail", label: "Retail" },
  { id: "experience", label: "Experience" },
  { id: "events", label: "Events" },
  { id: "reach", label: "Reach" },
  { id: "opportunity", label: "Opportunity" },
];

export function Nav() {
  const { isReady } = useReady();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);

      // FIX: Agar mobile menu open hai, toh nav hide nahi honi chahiye
      if (open) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]); // Added 'open' dependency to track state in scroll handler

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset calculation taaki heading nav ke piche na chhup jaye
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] flex justify-center p-6 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl flex flex-col items-center pointer-events-auto"
      >
        {/* MAIN PILL */}
        <div
          className={`w-full flex items-center justify-between px-6 md:px-12 py-3 rounded-full transition-all duration-500 border border-slate-200/50 ${
            scrolled 
              ? "bg-white/80 backdrop-blur-2xl shadow-lg shadow-black/5" 
              : "bg-white/70 backdrop-blur-xl"
          }`}
        >
          {/* LOGO */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex-shrink-0 transition-transform active:scale-95 text-sm md:text-base text-slate-900 font-sans font-semibold tracking-tight"
            aria-label="Dubai Mall Home"
          >
            Dubai Mall
          </button>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink label={item.label} onClick={() => scrollToSection(item.id)} />
              </li>
            ))}
          </ul>

          {/* MOBILE HAMBURGER */}
          <button
  onClick={() => setOpen(!open)}
  aria-label="Toggle Menu"
  className="md:hidden w-10 h-10 flex items-center justify-center relative z-50"
>
  <div className="relative w-5 h-5 flex items-center justify-center">
    
    {/* TOP LINE */}
    <span
      className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out origin-center
      ${open ? "rotate-45" : "-translate-y-2"}`}
    />

    {/* MIDDLE LINE */}
    <span
      className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out
      ${open ? "opacity-0" : "opacity-100"}`}
    />

    {/* BOTTOM LINE */}
    <span
      className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out origin-center
      ${open ? "-rotate-45" : "translate-y-2"}`}
    />

  </div>
</button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-4 w-full bg-white/95 backdrop-blur-2xl rounded-[32px] border border-black/5 shadow-2xl overflow-hidden origin-top"
            >
              <div className="p-8 flex flex-col gap-6">
                {NAV_ITEMS.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-2xl font-serif text-slate-900 flex justify-between items-center group active:opacity-50 transition-opacity"
                  >
                    {item.label}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "30px" }}
                      className="h-[1px] bg-slate-200" 
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

function NavLink({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative py-1 text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:text-black transition-colors group"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
    </button>
  );
}