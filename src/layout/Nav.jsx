import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useReady } from "../context/ReadyContext";

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
  }, [open]);

  const scrollToSection = (id) => {
    setOpen(false);
    
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
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
    }, 10);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] flex justify-center p-6 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center w-full max-w-4xl pointer-events-auto"
      >
        <div
          className={`w-full flex items-center justify-between px-6 md:px-12 py-3 rounded-full transition-all duration-500 border border-slate-200/50 ${
            scrolled
              ? "shadow-lg backdrop-blur-2xl bg-white/80 shadow-black/5"
              : "backdrop-blur-xl bg-white/70"
          }`}
        >
          <button
            onClick={() => scrollToSection("hero")}
            className="flex-shrink-0 font-sans text-sm font-semibold tracking-tight transition-transform active:scale-95 md:text-base text-slate-900"
            aria-label="Dubai Mall Home"
          >
            Dubai Mall
          </button>

          <ul className="hidden gap-8 items-center md:flex lg:gap-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink label={item.label} onClick={() => scrollToSection(item.id)} />
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            className="flex relative z-50 justify-center items-center w-10 h-10 md:hidden"
          >
            <div className="flex relative justify-center items-center w-5 h-5">
              <span
                className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out origin-center ${
                  open ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out origin-center ${
                  open ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-4 w-full bg-white/95 backdrop-blur-2xl rounded-[32px] border border-black/5 shadow-2xl overflow-hidden origin-top"
            >
              <div className="flex flex-col gap-6 p-8">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="flex justify-between items-center font-serif text-2xl transition-opacity text-slate-900 group active:opacity-50"
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
      className="relative py-1 text-sm font-semibold text-slate-900 hover:text-black transition-colors group"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
    </button>
  );
}