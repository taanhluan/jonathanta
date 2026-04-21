import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type ParallaxCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  scaleAmount?: number;
};

export function ParallaxCard({
  children,
  className,
  intensity = 18,
  scaleAmount = 0.018,
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [intensity, 0, -intensity]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 - scaleAmount, 1, 1 - scaleAmount],
  );

  return (
    <motion.div ref={ref} style={{ y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
