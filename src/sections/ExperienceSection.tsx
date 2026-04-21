import { motion } from "framer-motion";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { experiences } from "../data/portfolioData";
import { fadeUp, viewportOnce } from "../utils/motion";

export function ExperienceSection() {
  return (
    <SectionShell id="experience">
      <SectionIntro
        eyebrow="Experience"
        title="Professional experience shaped around product clarity, banking process insight, and execution support."
        description="The timeline is structured so future edits can quickly swap placeholder periods with exact dates, titles, and outcomes."
      />
      <div className="relative mt-14 space-y-8 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-gold/70 before:via-white/20 before:to-transparent sm:before:left-1/2">
        {experiences.map((experience, index) => (
          <ParallaxCard
            key={`${experience.company}-${experience.role}`}
            intensity={index % 2 === 0 ? 24 : 18}
          >
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative grid gap-5 sm:grid-cols-2 sm:gap-10"
            >
              <div className={index % 2 === 0 ? "sm:text-right sm:pr-14" : "sm:order-2 sm:pl-14"}>
                <div className="inline-flex h-10 items-center rounded-full border border-gold/25 bg-gold/10 px-4 text-xs uppercase tracking-[0.25em] text-gold">
                  {experience.period}
                </div>
                <h3 className="mt-5 font-display text-4xl text-ivory">{experience.role}</h3>
                <p className="mt-2 text-lg text-gold">{experience.company}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.22em] text-smoke">
                  {experience.location}
                </p>
              </div>
              <div className={index % 2 === 0 ? "sm:pl-14" : "sm:order-1 sm:text-right sm:pr-14"}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-luxe">
                  <p className="text-base leading-8 text-smoke">{experience.summary}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-ivory/90">
                    {experience.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3 sm:justify-start">
                        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <span className="absolute left-3 top-4 h-5 w-5 rounded-full border border-gold bg-obsidian shadow-glow sm:left-1/2 sm:-ml-2.5" />
            </motion.article>
          </ParallaxCard>
        ))}
      </div>
    </SectionShell>
  );
}
