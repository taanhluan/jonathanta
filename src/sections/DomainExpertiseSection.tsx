import { motion } from "framer-motion";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { expertiseAreas } from "../data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

export function DomainExpertiseSection() {
  return (
    <SectionShell id="expertise">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionIntro
          eyebrow="Banking & Product Domain Expertise"
          title="A domain narrative that blends banking fluency with product delivery judgment."
          description="Designed as a premium expertise landscape instead of a flat list, this section emphasizes the strategic value behind domain knowledge."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2"
        >
          {expertiseAreas.map((item) => {
            const Icon = item.icon;

            return (
              <ParallaxCard key={item.title} intensity={18}>
                <motion.div
                  variants={fadeUp}
                  className="rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-luxe"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-ivory">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-smoke">{item.detail}</p>
                </motion.div>
              </ParallaxCard>
            );
          })}
        </motion.div>
      </div>
    </SectionShell>
  );
}
