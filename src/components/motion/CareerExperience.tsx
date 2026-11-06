import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, MapPin, Pause, Play } from 'lucide-react';
import { experiences } from '../../data/portfolioData';
import FerrofluidCloud from './FerrofluidCloud';
import { CAREER_STEP_PX, careerFrame } from './careerTimeline';
import './career-experience.css';

export default function CareerExperience() {
  const section = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const fluidHost = useRef<HTMLDivElement>(null);
  const scene = useRef({ value: 0 });
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [light, setLight] = useState(() => document.documentElement.dataset.theme === 'light');
  useEffect(() => {
    const observer = new MutationObserver(() => setLight(document.documentElement.dataset.theme === 'light'));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  const [reduced, setReduced] = useState(false);
  const count = experiences.length;
  useEffect(() => {
    const host = section.current;
    if (!host) return;
    let raf = 0;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { setReduced(media.matches); schedule(); };
    const render = () => {
      raf = 0;
      const rect = host.getBoundingClientRect();
      const distance = Math.max(1, host.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      const frame = careerFrame(progress, count);
      scene.current.value = progress;
      if (activeRef.current !== frame.index) { activeRef.current = frame.index; setActive(frame.index); }
      const travel = media.matches ? 0 : frame.travel;
      for (const [el, direction] of [[visual.current, -1], [body.current, 1]] as const) {
        if (!el) continue;
        el.style.opacity = `${media.matches ? 1 : frame.opacity}`;
        el.style.transform = `translate3d(${travel * direction}px,${Math.abs(travel) * .12}px,0)`;
      }
      if (fluidHost.current) fluidHost.current.style.rotate = `${media.matches ? 0 : travel * -.08}deg`;
      host.style.setProperty('--career-progress', `${progress}`);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    media.addEventListener('change', preference); preference();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); media.removeEventListener('change', preference); };
  }, [count]);
  const go = (index: number) => {
    const host = section.current;
    if (!host) return;
    const next = Math.max(0, Math.min(count - 1, index));
    const distance = host.offsetHeight - window.innerHeight;
    const target = host.getBoundingClientRect().top + window.scrollY + (next + .45) / count * distance;
    window.scrollTo({ top: target, behavior: reduced ? 'instant' : 'smooth' });
  };
  const item = experiences[active];
  const year = item.period.match(/\d{4}/)?.[0] ?? item.period;
  const brand = /fpt/i.test(item.company) ? ['fpt.webp','FPT Software'] : /axon/i.test(item.company) ? ['axon.webp','Axon Active'] : /xebia/i.test(item.company) ? ['xebia.svg','Xebia'] : /amaris/i.test(item.company) ? ['amaris.png','Amaris Consulting'] : /innotech/i.test(item.company) ? ['innotech.png','Innotech'] : /maersk/i.test(item.company) ? ['maersk.svg','Maersk'] : /bic/i.test(item.company) ? ['bic-bank.png','BIC Bank'] : /jaccs/i.test(item.company) ? ['jaccs.png','JACCS'] : /home credit/i.test(item.company) ? ['home-credit.webp','Home Credit'] : null;
  return <section id="experience" ref={section} className="career-experience chapter" style={{ height: `calc(100svh + ${count * CAREER_STEP_PX}px)` }} aria-label="Career journey">
    <div className="career-pin">
      <div className="career-top"><span>03 / EXPERIENCE</span><span>CAREER JOURNEY <ArrowDown size={13}/></span></div>
      <div className="career-stage">
        <div ref={visual} className="career-visual">
          <div className="career-year">{year}<span>CHAPTER {String(active + 1).padStart(2, '0')}</span></div>
          {light ? <div className="career-identity" key={item.company}><div className="career-logo-panel">{brand ? <img className={/home credit/i.test(item.company)?'career-logo-white':''} src={`${import.meta.env.BASE_URL}logos/${brand[0]}`} alt={brand[1]} onError={event=>{event.currentTarget.hidden=true;event.currentTarget.parentElement?.setAttribute('data-unavailable','true')}}/> : null}<span className="career-brand-name">{brand ? brand[1] : 'Independent practice'}</span></div><div className="career-identity-rule"><span/></div><div className="career-identity-caption"><span>{item.period}</span><span>0{active+1} — {String(count).padStart(2,'0')}</span></div><p className="career-identity-note">{item.location}</p></div> : <div ref={fluidHost} className="career-fluid"><FerrofluidCloud section={fluidHost} paused={paused} viewScale={2.5} sceneProgress={scene}/></div>}
          <div className="career-visual-caption"><span>SHAPED BY EXPERIENCE</span>{!light && <button onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume career animation' : 'Pause career animation'} aria-pressed={paused}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button>}</div>
        </div>
        <div ref={body} className="career-copy">
          <div className="career-copy-scroll" key={active} tabIndex={0} role="region" aria-label={`${item.company} career milestone`}>
            <p className="career-period">{item.period}</p><h2>{item.company}</h2><h3>{item.role}</h3>
            <p className="career-place"><MapPin size={13}/>{item.location}</p>
            <p className="career-summary">{item.summary}</p>
            <ul>{item.responsibilities.slice(0, 3).map(text => <li key={text}>{text}</li>)}</ul>
          </div>
        </div>
      </div>
      <div className="career-bottom">
        <span className="career-count">{String(active + 1).padStart(2, '0')}<small> / {String(count).padStart(2, '0')}</small></span>
        <nav aria-label="Career milestones">{experiences.map((experience, index) => <button key={experience.company + experience.period} className={active === index ? 'active' : ''} onClick={() => go(index)} aria-label={`${experience.period}: ${experience.company}`} aria-current={active === index ? 'step' : undefined}><span/></button>)}</nav>
        <div className="career-controls"><button onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous milestone"><ArrowLeft size={17}/></button><button onClick={() => { if (active < count - 1) go(active + 1); else document.getElementById('work')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }); }} aria-label={active === count - 1 ? 'Continue to Selected Work' : 'Next milestone'}><ArrowRight size={17}/></button></div>
      </div>
      <div className="career-progress" aria-hidden="true"><span/></div>
    </div>
  </section>;
}
