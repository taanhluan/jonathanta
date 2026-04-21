import { AnimatePresence, motion } from "framer-motion";
import { Compass, X } from "lucide-react";
import { useEffect, useState } from "react";
import { sections } from "../../data/portfolioData";
import { cn } from "../../utils/cn";

type JourneyPanelProps = {
  activeId: string;
};

export function JourneyPanel({ activeId }: JourneyPanelProps) {
  const [open, setOpen] = useState(false);

  const currentIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId),
  );
  const currentSection = sections[currentIndex] ?? sections[0];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="fixed bottom-8 left-4 z-40 hidden xl:block">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle journey navigation"
          className={cn(
            "group inline-flex items-center gap-3 rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-300",
            open
              ? "border-gold/30 bg-graphite/90 text-ivory shadow-theater"
              : "border-white/10 bg-black/45 text-smoke shadow-luxe hover:border-gold/20 hover:text-ivory",
          )}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
            {open ? <X size={16} /> : <Compass size={16} />}
          </span>
          <span className="text-left">
            <span className="block text-[10px] uppercase tracking-[0.32em] text-gold/75">
              Journey
            </span>
            <span className="block text-sm uppercase tracking-[0.22em]">
              {String(currentIndex + 1).padStart(2, "0")} {currentSection.label}
            </span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 w-[18rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/70 p-4 shadow-theater backdrop-blur-xl"
          >
            <div className="mb-3 flex items-end justify-between border-b border-white/10 pb-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-gold/75">
                  Current Scene
                </p>
                <p className="mt-2 font-display text-4xl text-ivory">
                  {String(currentIndex + 1).padStart(2, "0")}
                </p>
              </div>
              <p className="text-sm uppercase tracking-[0.24em] text-gold">
                {currentSection.label}
              </p>
            </div>

            <nav className="space-y-2">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition-all",
                    activeId === section.id
                      ? "bg-gold/12 text-ivory"
                      : "text-smoke hover:bg-white/[0.04] hover:text-ivory",
                  )}
                >
                  <span className="font-display text-lg text-gold/85">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="uppercase tracking-[0.18em]">{section.label}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
