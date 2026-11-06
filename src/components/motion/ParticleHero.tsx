import { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Pause, Play } from 'lucide-react';
import './particle-hero.css';
import FerrofluidCloud from './FerrofluidCloud';

/** An unobstructed live magnetic point-cloud surface. */
export default function ParticleHero() {
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  return <section id="intro" ref={section} className="cinematic-hero chapter" data-paused={paused} aria-label="Tạ Anh Luận — Complexity, meet clarity">
    <div className="cinematic-stage">
      <div className="ferrofluid-atmosphere"/><FerrofluidCloud section={section} paused={paused}/>
      <div className="cinematic-shade"/>
      <h1 className="cinematic-sr">Complexity, meet clarity.</h1>
      <div className="cinematic-bottom">
        <p>Human thinking.<br/>Product impact.</p>
        <div className="cinematic-links"><a href="#profile">Profile</a><a href="#work">Selected work</a><a href="#experience">Experience</a><a href="#expertise">Expertise</a><a href="#/dao-tao-ba">BA Mentoring</a><a href="Ta-Anh-Luan-CV.pdf" download>Download CV <Download size={13}/></a></div>
      </div>
      <div className="cinematic-controls"><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume ambient animation' : 'Pause ambient animation'} aria-pressed={paused}>{paused ? <Play size={12}/> : <Pause size={12}/>}</button><a href="#profile" aria-label="Scroll to discover my profile"><ArrowDown size={17}/></a></div>
      <a className="cinematic-role" href="#profile">Tạ Anh Luận · Product & Banking <ArrowUpRight size={13}/></a>
    </div>
  </section>;
}
