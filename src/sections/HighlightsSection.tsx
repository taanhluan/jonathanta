import { motion } from "framer-motion";
import { achievementCards, highlights } from "../data/portfolioData";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

export function HighlightsSection() {
  return (
    <SectionShell id="highlights">
      <SectionIntro
        eyebrow="Achievements & Highlights"
        title="Signals of credibility, delivery strength, and leadership presence."
        description="This final narrative layer reinforces executive brand positioning through concise but high-trust highlights."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2"
        >
          {highlights.map((highlight) => (
            <ParallaxCard key={highlight.label} intensity={14}>
              <motion.div
                variants={fadeUp}
                className="rounded-[2rem] border border-gold/20 bg-gradient-to-br from-gold/10 via-white/[0.02] to-transparent p-7 shadow-luxe"
              >
                <p className="font-display text-4xl text-ivory">{highlight.value}</p>
                <p className="mt-4 text-sm leading-7 text-smoke">{highlight.label}</p>
              </motion.div>
            </ParallaxCard>
          ))}
        </motion.div>
        <ParallaxCard intensity={22}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-luxe"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Spotlight Statements</p>
            <div className="mt-8 space-y-4">
              {achievementCards.map((card) => (
                <motion.div
                  key={card}
                  variants={fadeUp}
                  className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 text-base leading-8 text-ivory/90"
                >
                  {card}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ParallaxCard>
      </div>
    </SectionShell>
  );
}
