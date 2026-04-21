import { motion, useScroll, useTransform } from "framer-motion";

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const layerSlow = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const layerFast = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div style={{ y: layerSlow }} className="absolute inset-0 bg-hero-radial" />
      <motion.div style={{ y: layerFast }} className="absolute inset-0 bg-mesh-luxury opacity-90" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.72, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-8%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-bronze/10 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-12%] left-[30%] h-80 w-80 rounded-full bg-white/5 blur-3xl"
      />
      <div className="absolute inset-x-[20%] top-[-10%] h-[28rem] bg-gradient-to-b from-gold/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute inset-x-[30%] top-0 h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_25%,transparent_75%,rgba(184,148,90,0.04))] opacity-30" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="cinema-grain absolute inset-0 opacity-[0.06]" />
      <div className="cinema-vignette absolute inset-0" />
    </div>
  );
}
