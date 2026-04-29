import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { fadeUp, viewportOnce } from "../../utils/motion";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) {
  return (
    <motion.div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-4",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold/80 to-gold/20" />
        <p className="text-xs uppercase tracking-[0.35em] text-gold/80">{eyebrow}</p>
      </div>
      <h2
        className={cn(
          "font-display text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-8 text-smoke sm:text-lg",
            align === "center" ? "mx-auto" : "",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
