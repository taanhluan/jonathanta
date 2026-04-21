import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useMemo, useRef } from "react";
import { sections } from "../../data/portfolioData";
import { cn } from "../../utils/cn";

type SectionShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, children, className }: SectionShellProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.72]);
  const glowY = useTransform(scrollYProgress, [0, 0.5, 1], [110, 0, -90]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.4, 0.16]);
  const beamX = useTransform(scrollYProgress, [0, 0.5, 1], [-32, 38, -14]);
  const scene = useMemo(
    () => sections.findIndex((section) => section.id === id) + 1,
    [id],
  );

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28", className)}
    >
      <motion.div
        aria-hidden
        style={{ scaleX: lineScale }}
        className="pointer-events-none absolute inset-x-4 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent sm:inset-x-6 lg:inset-x-8"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
      />
      <motion.div
        aria-hidden
        style={{ y: glowY, opacity: glowOpacity }}
        className="pointer-events-none absolute right-[8%] top-20 hidden h-40 w-40 rounded-full bg-gold/8 blur-3xl lg:block"
      />
      <motion.div
        aria-hidden
        style={{ x: beamX }}
        className="pointer-events-none absolute inset-y-20 left-[12%] hidden w-px bg-gradient-to-b from-transparent via-white/12 to-transparent lg:block"
      />
      <div className="mx-auto flex max-w-8xl justify-end">
        <div className="hidden items-center gap-3 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-smoke lg:inline-flex">
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
          Scene {String(scene).padStart(2, "0")}
        </div>
      </div>
      <div className="mx-auto max-w-8xl">{children}</div>
    </section>
  );
}
