import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/70 text-gold shadow-glow backdrop-blur-md sm:right-6"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
