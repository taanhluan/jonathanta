import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionIntro } from "../components/layout/SectionIntro";
import { SectionShell } from "../components/layout/SectionShell";
import { ParallaxCard } from "../components/ui/ParallaxCard";
import { experiences, experienceSceneEntries } from "../data/portfolioData";

type MergedExperience = {
  company: string;
  role: string;
  period?: string;
  location?: string;
  summary?: string;
  responsibilities?: string[];
};

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const mergedData = useMemo<MergedExperience[]>(
    () =>
      experienceSceneEntries.map((scene) => {
        const detail = experiences.find((experience) => {
          const sceneCompany = normalizeCompany(scene.company);
          const detailCompany = normalizeCompany(experience.company);

          return (
            sceneCompany.includes(detailCompany) || detailCompany.includes(sceneCompany)
          );
        });

        return { ...scene, ...(detail || {}) };
      }),
    [],
  );

  useEffect(() => {
    let rafId: number | null = null;

    const measure = () => {
      rafId = null;
      const viewportCenter = window.innerHeight * 0.5;
      let nextIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleMeasure = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [mergedData.length]);

  const activeExperience = mergedData[activeIndex] ?? mergedData[0];
  const activeSummary = activeExperience
    ? getExperienceSummary(activeExperience)
    : "";
  const activeHighlights = activeExperience
    ? getExperienceHighlights(activeExperience)
    : [];
  const activeSceneSignals = activeExperience
    ? getExperienceSceneSignals(activeExperience, activeIndex)
    : [];
  const isSceneFourActive = activeIndex === 3;
  const progressWidth = `${((activeIndex + 1) / Math.max(mergedData.length, 1)) * 100}%`;
  const railHeight = `${((activeIndex + 0.5) / Math.max(mergedData.length, 1)) * 100}%`;

  return (
    <SectionShell id="experience">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)] lg:self-start">
          <div className="flex h-full min-h-0 flex-col gap-5">
            <SectionIntro
              eyebrow="Experience"
              title="Career progression presented as a refined leadership journey."
              description="A clearer story from business analysis foundations to product ownership in banking and digital delivery environments."
              titleClassName="lg:text-5xl"
              descriptionClassName="mt-4 text-base leading-7"
            />

            <ParallaxCard intensity={12} className="min-h-0 flex-1">
              <motion.div
                key={`${activeExperience.company}-${activeExperience.role}`}
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[2.25rem] border p-6 shadow-theater backdrop-blur-xl lg:min-h-0 lg:p-7 ${
                  isSceneFourActive
                    ? "border-gold/24 bg-[linear-gradient(145deg,rgba(184,162,122,0.13),rgba(8,12,17,0.72)_36%,rgba(18,27,39,0.58))]"
                    : "border-white/10 bg-black/45"
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(184,162,122,0.12),transparent_36%,rgba(255,255,255,0.03))]" />
                {isSceneFourActive ? (
                  <>
                    <div className="absolute right-8 top-20 h-28 w-28 rounded-full border border-gold/15 bg-gold/[0.03]" />
                    <div className="absolute right-14 top-28 h-16 w-16 rounded-full border border-white/10" />
                    <div className="absolute bottom-28 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/24 to-transparent" />
                  </>
                ) : null}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

                <div className="relative flex h-full min-h-0 flex-col overflow-y-auto pr-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.34em] text-gold/75">
                        Active Experience
                      </p>
                      <p className="mt-3 font-display text-5xl leading-none text-ivory lg:text-[3.4rem]">
                        {String(activeIndex + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <div className="max-w-[52%] text-right sm:max-w-xs">
                      {activeExperience.period ? (
                        <p className="text-xs uppercase leading-relaxed tracking-[0.28em] text-gold/80">
                          {activeExperience.period}
                        </p>
                      ) : null}
                      {activeExperience.location ? (
                        <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.24em] text-smoke">
                          {activeExperience.location}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-7">
                    <p className="text-sm uppercase tracking-[0.24em] text-gold/80">
                      {activeExperience.company}
                    </p>
                    <h3 className="mt-3 font-display text-4xl leading-tight text-ivory lg:text-[2.7rem]">
                      {activeExperience.role}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-smoke lg:text-[1.02rem]">
                      {activeSummary}
                    </p>
                  </div>

                  {activeSceneSignals.length ? (
                    <div
                      className={`mt-5 grid gap-3 ${
                        isSceneFourActive ? "sm:grid-cols-3" : "sm:grid-cols-2"
                      }`}
                    >
                      {activeSceneSignals.map((signal) => (
                        <div
                          key={signal.label}
                          className="rounded-[1.1rem] border border-gold/14 bg-black/24 px-4 py-3"
                        >
                          <p className="text-[10px] uppercase tracking-[0.28em] text-gold/70">
                            {signal.label}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-ivory/86">
                            {signal.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-auto pt-5">
                    {!isSceneFourActive ? (
                      <>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-smoke">
                          Role Highlights
                        </p>
                        <div className="mt-4 grid gap-2.5">
                          {activeHighlights.map((item) => (
                            <div
                              key={item}
                              className="flex gap-3 rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-2.5"
                            >
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                              <p className="text-sm leading-6 text-ivory/88">{item}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}

                    <div
                      className={`${
                        isSceneFourActive ? "mt-5" : "mt-6"
                      } rounded-[1.4rem] border border-white/8 bg-black/35 p-4`}
                    >
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-smoke">
                        <span>Progress</span>
                        <span>
                          {String(activeIndex + 1).padStart(2, "0")}/
                          {String(mergedData.length).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-gold via-ember to-gold"
                          animate={{ width: progressWidth }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ParallaxCard>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-white/10 lg:block" />
          <motion.div
            className="absolute left-5 top-0 hidden w-px bg-gradient-to-b from-gold via-ember to-transparent lg:block"
            animate={{ height: railHeight }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-5 lg:space-y-3">
            {mergedData.map((experience, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(index - activeIndex);
              const isSceneFour = index === 3;

              return (
                <section
                  key={`${experience.company}-${experience.role}`}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  className="relative min-h-[42vh] pl-0 lg:min-h-[52vh] lg:pl-16"
                >
                  <div className="flex h-full items-center">
                    <button
                      type="button"
                      onClick={() => scrollToExperience(itemRefs.current[index])}
                      className="group w-full text-left"
                    >
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : distance === 1 ? 0.58 : 0.3,
                          scale: isActive ? 1 : 0.97,
                          x: isActive ? 0 : 18,
                        }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative overflow-hidden rounded-[2rem] border px-6 py-6 shadow-luxe transition-all lg:px-8 lg:py-7 ${
                          isActive && isSceneFour
                            ? "border-gold/34 bg-[linear-gradient(135deg,rgba(184,162,122,0.12),rgba(255,255,255,0.045)_42%,rgba(18,27,39,0.12))]"
                            : isActive
                            ? "border-gold/18 bg-white/[0.05]"
                            : "border-white/10 bg-white/[0.02] hover:border-gold/14 hover:bg-white/[0.035]"
                        }`}
                      >
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                        {isActive && isSceneFour ? (
                          <>
                            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
                            <div className="absolute right-8 top-8 h-20 w-20 rounded-full border border-gold/15 bg-gold/[0.025]" />
                          </>
                        ) : null}
                        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="font-display text-3xl text-white/14">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="h-px w-10 bg-gradient-to-r from-gold/70 to-transparent" />
                            </div>
                            <h4
                              className={`mt-4 font-display text-3xl leading-tight transition-colors lg:text-[2.1rem] ${
                                isActive ? "text-ivory" : "text-ivory/72"
                              }`}
                            >
                              {experience.role}
                            </h4>
                            <p className="mt-3 text-lg text-gold/90">{experience.company}</p>
                            {experience.location ? (
                              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-smoke">
                                {experience.location}
                              </p>
                            ) : null}
                          </div>

                          {experience.period ? (
                            <span
                              className={`inline-flex min-h-11 max-w-full items-center rounded-full border px-5 py-2 text-right text-xs uppercase leading-relaxed tracking-[0.26em] transition-colors lg:max-w-[17rem] ${
                                isActive
                                  ? "border-gold/30 bg-gold/10 text-gold"
                                  : "border-white/10 bg-black/20 text-smoke"
                              }`}
                            >
                              {experience.period}
                            </span>
                          ) : null}
                        </div>
                        {isActive ? (
                          <div className="relative mt-6 border-t border-white/10 pt-5">
                            <p className="max-w-2xl text-sm leading-6 text-smoke">
                              {getExperienceSummary(experience)}
                            </p>

                            {getExperienceHighlights(experience).length ? (
                              <div className="mt-4 grid gap-2">
                                {getExperienceHighlights(experience)
                                  .slice(0, 2)
                                  .map((item) => (
                                    <div
                                      key={item}
                                      className="flex gap-3 rounded-[1rem] border border-white/8 bg-black/20 px-4 py-2.5"
                                    >
                                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold/80" />
                                      <p className="text-sm leading-6 text-ivory/82">{item}</p>
                                    </div>
                                  ))}
                              </div>
                            ) : null}

                            {getExperienceSceneSignals(experience, index).length ? (
                              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                {getExperienceSceneSignals(experience, index).map((signal) => (
                                  <div key={signal.label}>
                                    <p className="text-[9px] uppercase tracking-[0.24em] text-gold/65">
                                      {signal.label}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-ivory/80">
                                      {signal.value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </motion.div>
                    </button>
                  </div>

                  <span
                    className={`absolute left-0 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all lg:block ${
                      isActive
                        ? "border-gold bg-gold shadow-glow"
                        : distance === 1
                          ? "border-gold/40 bg-gold/25"
                          : "border-white/12 bg-obsidian"
                    }`}
                    style={{ left: "1.25rem" }}
                  />
                </section>
              );
            })}
          </div>
        </div>
      </div>
      <div aria-hidden className="h-28 lg:h-44" />
    </SectionShell>
  );
}

function getExperienceSceneSignals(experience: MergedExperience, index: number) {
  if (index === 3) {
    return [
      { label: "Cadence", value: "Sprint rhythm, ceremonies, and release checkpoints" },
      { label: "Alignment", value: "Blockers, dependencies, and priorities made visible" },
      { label: "Leadership", value: "Shift from analysis support into delivery ownership" },
    ];
  }

  if (experience.role.toLowerCase().includes("product owner")) {
    return [
      { label: "Product", value: "Backlog clarity" },
      { label: "Stakeholders", value: "Business alignment" },
    ];
  }

  return [];
}

function normalizeCompany(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function scrollToExperience(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function getExperienceSummary(experience: MergedExperience) {
  if (experience.summary) {
    return experience.summary;
  }

  const role = experience.role.toLowerCase();

  if (role.includes("product owner")) {
    return `Led product-facing delivery and stakeholder alignment at ${experience.company}, strengthening the transition from structured analysis into ownership and outcome-focused execution.`;
  }

  if (role.includes("scrum") || role.includes("project manager")) {
    return `Drove execution discipline, team coordination, and agile delivery orchestration at ${experience.company}, building stronger cross-functional leadership capability.`;
  }

  if (role.includes("business analyst")) {
    return `Expanded business analysis depth at ${experience.company}, translating requirements, delivery realities, and stakeholder needs into clearer implementation direction.`;
  }

  if (role.includes("technical support")) {
    return `Built early delivery and systems perspective through hands-on technical support at ${experience.company}, forming a practical foundation for later business and product roles.`;
  }

  return `Contributed in a multidisciplinary role at ${experience.company}, adding to a broader progression across delivery, analysis, and product leadership.`;
}

function getExperienceHighlights(experience: MergedExperience) {
  if (experience.responsibilities?.length) {
    return experience.responsibilities.slice(0, 3);
  }

  const role = experience.role.toLowerCase();

  if (role.includes("product owner")) {
    return [
      "Strengthened product direction, prioritization, and stakeholder alignment.",
      "Balanced business intent with structured execution across delivery teams.",
      "Extended leadership presence across banking-focused transformation work.",
    ];
  }

  if (role.includes("scrum") || role.includes("project manager")) {
    return [
      "Improved delivery rhythm, team coordination, and agile execution discipline.",
      "Supported stakeholder communication and implementation momentum.",
      "Built stronger orchestration capability across cross-functional teams.",
    ];
  }

  if (role.includes("business analyst")) {
    return [
      "Deepened requirement analysis, process understanding, and delivery translation.",
      "Supported structured collaboration between business and implementation teams.",
      "Added stronger domain context and execution clarity to transformation work.",
    ];
  }

  return [
    "Contributed to practical delivery support and team coordination.",
    "Added business and product perspective within transformation-focused environments.",
    "Built experience that strengthened later analysis and leadership roles.",
  ];
}
