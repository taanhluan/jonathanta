import { AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type LuxuryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  primary?: boolean;
};

export function LuxuryButton({ className, primary, children, ...props }: LuxuryButtonProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm uppercase tracking-[0.25em] transition-all duration-500",
        primary
          ? "border border-gold bg-gold text-obsidian shadow-glow hover:-translate-y-0.5 hover:bg-ember"
          : "border border-white/12 bg-white/[0.03] text-ivory hover:-translate-y-0.5 hover:border-gold/45 hover:text-gold",
        className,
      )}
      {...props}
    >
      <span className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/10 blur-xl transition-transform duration-700 group-hover:translate-x-[270%]" />
      <span className="relative">{children}</span>
    </a>
  );
}
