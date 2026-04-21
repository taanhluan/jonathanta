import { motion } from "framer-motion";
import { GraduationCap, Lightbulb, Users } from "lucide-react";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { learningData } from "../data/portfolioData";
import { fadeUp, viewportOnce } from "../utils/motion";

const groups = [
  {
    title: "Certifications",
    items: learningData.certifications,
    icon: GraduationCap,
  },
  {
    title: "Continuous Learning",
    items: learningData.learning,
    icon: Lightbulb,
  },
  {
    title: "Mentoring & Contribution",
    items: learningData.mentoring,
    icon: Users,
  },
];

export function LearningSection() {
  return (
    <SectionShell id="learning">
      <SectionIntro
        eyebrow="Certifications, Learning & Mentoring"
        title="Professional growth presented as an ongoing practice, not a static checklist."
        description="The credentials below are now populated from the current resume content, with LinkedIn linked as the profile source for further verification and future updates."
      />
      <div className="mt-12 grid gap-6 xl:grid-cols-3">
        {groups.map((group) => {
          const Icon = group.icon;

          return (
            <ParallaxCard key={group.title} intensity={20}>
              <motion.article
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-luxe"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 font-display text-3xl text-ivory">{group.title}</h3>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-smoke">
                  {group.items.map((item) => (
                    <li
                      key={typeof item === "string" ? item : item.title}
                      className="flex gap-3"
                    >
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-gold" />
                      {typeof item === "string" ? (
                        <span>{item}</span>
                      ) : (
                        <span>
                          <span className="text-ivory/95">{item.title}</span>
                          {item.meta ? (
                            <span className="block text-xs uppercase tracking-[0.22em] text-gold/70">
                              {item.meta}
                            </span>
                          ) : null}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {group.title === "Certifications" ? (
                  <a
                    href={learningData.credentialsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold transition-colors hover:border-gold/40 hover:bg-gold/15"
                  >
                    View LinkedIn Profile
                  </a>
                ) : null}
              </motion.article>
            </ParallaxCard>
          );
        })}
      </div>
    </SectionShell>
  );
}
