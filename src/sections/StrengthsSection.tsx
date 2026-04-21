import { motion } from "framer-motion";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { strengths } from "../data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

export function StrengthsSection() {
  return (
    <SectionShell id="strengths">
      <SectionIntro
        eyebrow="Core Strengths"
        title="A capability mix built for high-trust banking and product delivery."
        description="These strengths are presented as a leadership-ready capability profile rather than a technical skills matrix."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5"
      >
        {strengths.map((strength, index) => {
          const Icon = strength.icon;

          return (
            <ParallaxCard key={strength.title} intensity={16 + (index % 3) * 4}>
              <motion.article
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-glow"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(184,162,122,0.10),transparent_45%,rgba(255,255,255,0.02))]" />
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                      <Icon size={20} />
                    </span>
                    <span className="font-display text-3xl text-white/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-ivory">{strength.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-smoke">{strength.description}</p>
                </div>
              </motion.article>
            </ParallaxCard>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
