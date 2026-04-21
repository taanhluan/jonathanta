type StatPillProps = {
  value: string;
  label: string;
};

export function StatPill({ value, label }: StatPillProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-5 shadow-luxe backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-gold/70 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.32em] text-gold/75">Focus</span>
      </div>
      <p className="font-display text-3xl text-gold sm:text-4xl">{value}</p>
      <p className="mt-3 text-sm leading-7 text-smoke">{label}</p>
    </div>
  );
}
