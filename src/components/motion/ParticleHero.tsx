import { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Pause, Play } from 'lucide-react';
import './particle-hero.css';
import FerrofluidCloud from './FerrofluidCloud';

/** Portfolio introduction over a live ferrofluid surface. */
export default function ParticleHero() {
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  return <section id="intro" ref={section} className="cinematic-hero chapter" data-paused={paused} aria-label="Tạ Anh Luận — Complexity, meet clarity">
    <div className="cinematic-stage">
      <div className="ferrofluid-atmosphere"/><FerrofluidCloud section={section} paused={paused}/>
      <div className="cinematic-shade"/>
      <div className="hero-positioning">
        <p className="hero-eyebrow">Tạ Anh Luận / Jonathan Ta</p>
        <h1>Banking complexity.<br/><em>Clear product direction.</em></h1>
        <p className="hero-role">Lead Business Analyst · Product Owner</p>
        <p className="hero-summary">Connecting business needs, stakeholder priorities, and technology delivery across digital banking, payments, and core banking integration.</p>
        <div className="hero-actions"><a href="#experience">Explore experience <ArrowUpRight size={16}/></a><a href="Ta-Anh-Luan-CV.pdf" download>Download CV <Download size={16}/></a></div>
      </div>
      <div className="cinematic-controls"><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume ambient animation' : 'Pause ambient animation'} aria-pressed={paused}>{paused ? <Play size={12}/> : <Pause size={12}/>}</button><a href="#profile" aria-label="Scroll to discover my profile"><ArrowDown size={17}/></a></div>
    </div>
  </section>;
}
