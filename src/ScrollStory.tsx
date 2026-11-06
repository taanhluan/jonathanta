import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, MousePointer2 } from 'lucide-react';
import './build-story.css';

const stages = [
  { label: 'DISCOVER', title: 'Start with the right question.', detail: 'Business needs. Customer expectations. Operational realities. Bring every perspective into the same conversation.', code: ['const problem = discover({', '  business, customer, operations', '});'], cards: ['Business need', 'Customer journey', 'Operational reality'], owner: 'BA', color: '#bd98f2' },
  { label: 'DEFINE', title: 'Give complexity a structure.', detail: 'Turn conversations into clear requirements, connected workflows and a backlog the whole team can work with.', code: ['const direction = define(problem);', 'align(stakeholders, direction);', 'prioritize(backlog);'], cards: ['Requirements', 'Process flows', 'Prioritized backlog'], owner: 'Product', color: '#f0bb87' },
  { label: 'DELIVER', title: 'Make direction actionable.', detail: 'Connect business intent with implementation. Refine together, validate assumptions and keep delivery moving.', code: ['while (team.isLearning) {', '  refine(); build(); validate();', '}'], cards: ['Shared understanding', 'Acceptance criteria', 'Delivery confidence'], owner: 'Delivery', color: '#a9d7be' },
];

function BuildBlock({ label, index, progress, reduced }: { label: string; index: number; progress: MotionValue<number>; reduced: boolean }) {
  const at = .16 + index * .19;
  const wire = useTransform(progress, [at - .12, at - .07, at, at + .055], [0, 1, 1, 0]);
  const opacity = useTransform(progress, [at, at + .055], [0, 1]);
  const y = useTransform(progress, [at, at + .07], [12, 0]);
  const scale = useTransform(progress, [at, at + .035, at + .07], [.97, 1.015, 1]);
  return <div className="build-slot">
    <motion.div className="build-wire" style={{ opacity: reduced ? 0 : wire }} aria-hidden="true"><i/><i/><i/><i/><span>0{index + 1} / {label}</span></motion.div>
    <motion.div className="build-card" style={reduced ? {} : { opacity, y, scale }}><span>0{index + 1}</span><strong>{label}</strong><Check size={16}/></motion.div>
  </div>;
}

function Frame({ index, progress, active, reduced }: { index: number; progress: MotionValue<number>; active: boolean; reduced: boolean }) {
  const stage = stages[index];
  const start = index / 3;
  const local = useTransform(progress, [start, start + 1 / 3], [0, 1]);
  const opacity = useTransform(progress, [start, start + .025, start + .305, start + 1 / 3], [index === 0 ? 1 : 0, 1, 1, index === 2 ? 1 : 0]);
  const y = useTransform(local, [0, .1, .92, 1], [index === 0 ? 0 : 30, 0, 0, index === 2 ? 0 : -24]);
  const cursorX = useTransform(local, [0, .16, .25, .35, .44, .54, .68, .84, 1], ['88%', '78%', '82%', '66%', '70%', '80%', '85%', '73%', '73%']);
  const cursorY = useTransform(local, [0, .16, .25, .35, .44, .54, .68, .84, 1], [5, 26, 32, 91, 97, 156, 180, 310, 310]);
  const press = useTransform(local, [0, .15, .16, .19, .34, .35, .38, .53, .54, .57, .83, .84, .87, 1], [1, 1, .78, 1, 1, .78, 1, 1, .78, 1, 1, .78, 1, 1]);
  const ring = useTransform(local, [0, .16, .17, .23, .35, .36, .42, .54, .55, .61, .84, .85, .91, 1], [0, 0, .8, 0, 0, .8, 0, 0, .8, 0, 0, .8, 0, 0]);
  const terminal = useTransform(local, [.6, .73], [0, 1]);
  const cta = useTransform(local, [.74, .81], [0, 1]);
  const ctaScale = useTransform(local, [.83, .84, .88], [1, .96, 1]);
  const count = useTransform(local, value => `${String(Math.min(3, Math.max(0, Math.floor((value - .16) / .19) + 1))).padStart(2, '0')} / 03`);
  return <motion.div className="build-frame" style={reduced ? {} : { opacity, y, pointerEvents: active ? 'auto' : 'none', visibility: active ? 'visible' : 'hidden' }} aria-hidden={!reduced && !active}>
    <div className="build-copy"><p className="kicker">0{index + 1} / {stage.label}</p><h2>{stage.title}</h2><p>{stage.detail}</p><span className="build-chapter">0{index + 1}<small> / 03</small></span></div>
    <div className="build-board" style={{ '--build-accent': stage.color } as React.CSSProperties}>
      <div className="build-board-top"><span>tal / product-workspace</span><span><i/> {reduced ? 'Complete' : 'Scroll to assemble'}</span></div>
      <div className="build-workspace"><div className="build-grid" aria-hidden="true"/>
        <div className="build-cards">{stage.cards.map((card, i) => <BuildBlock key={card} label={card} index={i} progress={local} reduced={reduced}/>)}</div>
        <motion.div className="build-terminal" style={{ opacity: reduced ? 1 : terminal }}><div><span>● ● ●</span><span>clarity.ts</span></div><pre>{stage.code.join('\n')}</pre><p>✓ {index === 2 ? 'Ready for the next iteration' : 'Turning ambiguity into shared direction'}</p></motion.div>
        <motion.div className="build-result" style={reduced ? {} : { opacity: cta, scale: ctaScale }}>{index === 2 ? <a href="#work" tabIndex={reduced || active ? 0 : -1}>Explore selected work <ArrowUpRight size={15}/></a> : <span><Check size={14}/> {index === 0 ? 'Problem framed' : 'Direction aligned'}</span>}</motion.div>
        {!reduced && <motion.div className="build-cursor" style={{ left: cursorX, top: cursorY, scale: press }} aria-hidden="true"><motion.i className="build-click" style={{ opacity: ring }}/><MousePointer2 size={27} fill="currentColor"/><b>{stage.owner}</b></motion.div>}
      </div>
      <div className="build-status"><span>{reduced ? 'Assembled' : 'Assembling the picture'}</span>{reduced ? <span>03 / 03</span> : <motion.span>{count}</motion.span>}</div>
    </div>
  </motion.div>;
}

export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = !!useReducedMotion();
  const [shortWindow, setShortWindow] = useState(() => window.matchMedia('(max-height: 649px), (max-width: 800px) and (max-height: 759px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-height: 649px), (max-width: 800px) and (max-height: 759px)');
    const update = () => setShortWindow(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const reduced = prefersReduced || shortWindow;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', value => setActive(Math.min(2, Math.floor(Math.max(0, value) * 3))));
  return <section ref={ref} className={`build-story${reduced ? ' build-static' : ''}`} aria-label="From complexity to clarity in three steps">
    <div className="build-sticky"><div className="build-heading"><span>THE WAY I WORK</span><span>Scroll to build the picture <ArrowDown size={14}/></span></div>
      <div className="build-stage">{stages.map((_, index) => <Frame key={index} index={index} progress={scrollYProgress} active={active === index} reduced={reduced}/>)}</div>
      <div className="build-track" aria-hidden="true"><motion.div style={{ scaleX: scrollYProgress }}/></div>
      <div className="build-labels">{stages.map((stage, index) => <span key={stage.label} className={active === index ? 'is-active' : ''} aria-current={active === index ? 'step' : undefined}>0{index + 1} / {stage.label}</span>)}</div>
    </div>
  </section>;
}
