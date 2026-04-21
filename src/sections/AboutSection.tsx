import { motion } from "framer-motion";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { aboutData } from "../data/portfolioData";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

export function AboutSection() {
  return (
    <SectionShell id="about">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <SectionIntro
          eyebrow={aboutData.eyebrow}
          title={aboutData.title}
          description="An executive-facing summary designed to communicate credibility, strategic composure, and outcome-focused delivery capability."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-8"
        >
          <ParallaxCard intensity={22}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-luxe">
              {aboutData.paragraphs.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={fadeUp}
                  className="text-base leading-8 text-smoke [&:not(:first-child)]:mt-5"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </ParallaxCard>
          <div className="grid gap-4 sm:grid-cols-3">
            {aboutData.pillars.map((pillar) => (
              <ParallaxCard key={pillar} intensity={14}>
                <motion.div
                  variants={fadeUp}
                  className="rounded-[1.5rem] border border-gold/20 bg-gradient-to-br from-gold/10 to-transparent p-5 text-sm leading-7 text-ivory"
                >
                  {pillar}
                </motion.div>
              </ParallaxCard>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
