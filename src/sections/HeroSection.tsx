import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, CornerRightDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { SectionShell } from "../components/layout/SectionShell";
import { LuxuryButton } from "../components/ui/LuxuryButton";
import { StatPill } from "../components/ui/StatPill";
import { heroData } from "../data/portfolioData";
import { fadeUp, staggerContainer } from "../utils/motion";

export function HeroSection() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const auraScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <SectionShell id="hero" className="min-h-screen pt-28 lg:pt-36">
      <div ref={sceneRef} className="relative">
        <motion.div
          style={{ scale: auraScale }}
          className="pointer-events-none absolute left-[-8%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="pointer-events-none absolute inset-x-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />

        <div className="grid items-end gap-16 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            style={{ y: contentY }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              variants={fadeUp}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <Sparkles size={14} />
              </span>
              <span className="text-[11px] uppercase tracking-[0.34em] text-smoke">
                {heroData.openingLabel}
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mb-6 text-xs uppercase tracking-[0.38em] text-gold/80"
            >
              {heroData.nativeName}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl font-display text-6xl leading-[0.92] text-ivory sm:text-7xl lg:text-[7.5rem]"
            >
              {heroData.name}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.24em] text-smoke"
            >
              <span>{heroData.title}</span>
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span>Banking & Digital Transformation</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-3xl font-display text-3xl italic leading-tight text-ivory/90 sm:text-4xl"
            >
              {heroData.sceneTitle}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-smoke sm:text-xl"
            >
              {heroData.statement}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              {heroData.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-smoke"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-4">
              {heroData.ctas.map((cta) => (
                <LuxuryButton
                  key={cta.label}
                  href={cta.href}
                  primary={cta.primary}
                  download={cta.download}
                >
                  {cta.label}
                </LuxuryButton>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 rounded-[1.8rem] border border-white/10 bg-black/35 p-5 shadow-luxe backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <CornerRightDown size={16} className="text-gold" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
                  Executive Context
                </p>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-smoke">
                {heroData.contextRibbon}
              </p>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#about"
              className="mt-14 inline-flex items-center gap-3 text-sm uppercase tracking-[0.26em] text-smoke transition-colors hover:text-gold"
            >
              Scroll for profile narrative
              <ArrowDownRight size={18} />
            </motion.a>
          </motion.div>

          <motion.div
            style={{ y: panelY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -left-8 top-10 hidden h-32 w-32 rounded-full border border-gold/20 bg-gold/8 blur-[2px] lg:block" />
            <div className="absolute -right-10 bottom-12 hidden h-36 w-36 rounded-full border border-white/10 bg-white/[0.03] lg:block" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-6 shadow-theater">
              <div className="absolute inset-0 bg-luminous-panel" />
              <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:36px_36px]" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

              <div className="relative space-y-5">
                <div className="rounded-[1.8rem] border border-white/10 bg-black/45 p-6">
                  <div className="grid gap-6 sm:grid-cols-[1.05fr_0.95fr] sm:items-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                        Opening Frame
                      </p>
                      <p className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl">
                        Strategic product leadership with banking domain depth.
                      </p>
                    </div>
                    <div className="mx-auto w-full max-w-[14rem]">
                      <div className="relative overflow-hidden rounded-[1.6rem] border border-gold/20 bg-black/40 shadow-glow aspect-[4/5]">
                        <img
                          src={heroData.portrait.src}
                          alt={heroData.portrait.alt}
                          className="h-full w-full object-cover object-top"
                          loading="eager"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,5,5,0.05)_38%,rgba(5,5,5,0.58)_100%)]" />
                        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
                      </div>
                      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.24em] text-smoke">
                        {heroData.portrait.caption}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
                  <div className="rounded-[1.6rem] border border-white/10 bg-black/40 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold/75">
                      Operating Lens
                    </p>
                    <div className="mt-5 space-y-4">
                      {heroData.operatingLens.map((item) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 rounded-full bg-gold" />
                          <p className="text-sm leading-7 text-smoke">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-gold/20 bg-gradient-to-br from-gold/10 via-transparent to-black/20 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold/75">
                      Delivery Arc
                    </p>
                    <div className="mt-5 space-y-5">
                      {heroData.deliveryArc.map((item) => (
                        <div key={item.step} className="grid grid-cols-[auto_1fr] gap-4">
                          <span className="font-display text-2xl text-gold">{item.step}</span>
                          <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-ivory/90">
                              {item.title}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-smoke">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {heroData.metrics.map((metric) => (
                    <StatPill key={metric.label} value={metric.value} label={metric.label} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
