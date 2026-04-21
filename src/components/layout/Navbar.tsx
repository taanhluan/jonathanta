import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { sections } from "../../data/portfolioData";
import { cn } from "../../utils/cn";

type NavbarProps = {
  activeId: string;
};

export function Navbar({ activeId }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto flex max-w-8xl items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all sm:px-6",
          scrolled
            ? "border-gold/15 bg-graphite/80 shadow-theater"
            : "border-white/8 bg-white/[0.03]",
        )}
      >
        <a href="#hero" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-lg text-gold">
            TL
          </span>
          <div>
            <p className="font-display text-xl text-ivory">Ta Anh Luan</p>
            <p className="text-xs uppercase tracking-[0.25em] text-smoke">
              Principal BA / Product Owner
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                activeId === section.id
                  ? "bg-gold text-obsidian shadow-glow"
                  : "text-smoke hover:text-ivory",
              )}
            >
              {activeId === section.id ? (
                <span className="absolute inset-x-4 -bottom-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              ) : null}
              {section.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ivory lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-8xl rounded-3xl border border-white/10 bg-black/90 p-4 shadow-luxe backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm transition-colors",
                  activeId === section.id
                    ? "bg-gold text-obsidian"
                    : "bg-white/[0.03] text-smoke hover:text-ivory",
                )}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
