import { motion } from "framer-motion";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { caseStudies } from "../data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

export function CaseStudiesSection() {
  return (
    <SectionShell id="case-studies" className="relative z-20 bg-obsidian">
      <SectionIntro
        eyebrow="Selected Case Studies"
        title="Executive-style narratives that show how analysis and product discipline create delivery momentum."
        description="These case studies are written as polished placeholders inspired by the profile direction and can be updated later with exact business outcomes."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 grid gap-6 xl:grid-cols-2"
      >
        {caseStudies.map((study, index) => (
          <ParallaxCard key={study.title} intensity={20 + (index % 2) * 6}>
            <motion.article
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/25 hover:shadow-glow"
            >
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(184,162,122,0.12),transparent_36%,rgba(255,255,255,0.03))] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-6 top-5 font-display text-6xl text-white/5">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Case Study</p>
                <h3 className="mt-5 font-display text-4xl leading-tight text-ivory">{study.title}</h3>
                <div className="mt-8 space-y-5 text-sm leading-7">
                  <div>
                    <p className="uppercase tracking-[0.24em] text-smoke">Context</p>
                    <p className="mt-2 text-ivory/90">{study.context}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.24em] text-smoke">Challenge</p>
                    <p className="mt-2 text-ivory/90">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.24em] text-smoke">My Role & Actions</p>
                    <p className="mt-2 text-ivory/90">{study.actions}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.24em] text-smoke">Outcome</p>
                    <p className="mt-2 text-ivory/90">{study.outcome}</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {study.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-gold/20 bg-gold/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-gold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/60 via-white/10 to-transparent" />
              </div>
            </motion.article>
          </ParallaxCard>
        ))}
      </motion.div>
    </SectionShell>
  );
}
