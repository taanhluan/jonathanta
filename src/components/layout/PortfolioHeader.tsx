import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { contactData } from '../../data/portfolioData';
import './portfolio-header.css';

const links = [
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Selected work' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'contact', label: 'Contact' },
];

export default function PortfolioHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [overScene, setOverScene] = useState(true);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setOverScene((document.getElementById('intro')?.getBoundingClientRect().bottom ?? 0) > 90);
    const close = () => setOpen(false);
    const resize = () => { update(); if (window.innerWidth > 1100) close(); };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('hashchange', close);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', resize);
      window.removeEventListener('hashchange', close);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const focusOutside = (event: FocusEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    document.addEventListener('focusin', focusOutside);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('focusin', focusOutside);
    };
  }, [open]);

  return <header ref={header} className="portfolio-header" data-scene={overScene} data-open={open}>
    <a className="ph-brand" href="#intro" aria-label="Tạ Anh Luận — Home" onClick={() => setOpen(false)}>
      <span className="ph-monogram">TAL<span>.</span></span>
      <span className="ph-identity">Tạ Anh Luận<small>Business Analyst · Product Owner</small></span>
    </a>
    <div className="ph-actions">
      <a className="ph-contact" href={`mailto:${contactData.email}`} aria-label="Let’s talk — email Tạ Anh Luận"><span>Let’s talk</span><ArrowUpRight size={17}/></a>
      <button ref={toggle} type="button" className="ph-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="portfolio-navigation" onClick={() => setOpen(value => !value)}>
        {open ? <X size={20}/> : <Menu size={20}/>}
      </button>
    </div>
    <nav id="portfolio-navigation" className="ph-nav" aria-label="Main navigation">
      {links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? 'location' : undefined} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="ph-mentor" href="#/dao-tao-ba" onClick={() => setOpen(false)}>BA Mentoring <ArrowUpRight size={14}/></a>
    </nav>
  </header>;
}
