import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-gradient-to-r from-gold via-ember to-gold shadow-[0_0_28px_rgba(184,162,122,0.55)]"
      />
    </div>
  );
}
