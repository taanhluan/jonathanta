import { useEffect, useRef, type ReactNode } from 'react';
import './site-build.css';
import { buildFrame, buildProgress } from './siteBuildProgress';

const owners = [ ['TAL', '#b64d3e'], ['Product', '#346aff'], ['BA', '#6f51b8'], ['Dev', '#258465'], ['QA', '#bd742d'] ];
const targets = [
  '.training-promo > *', '.section-number', '.profile-layout h2', '.profile-portrait', '.profile-copy > div',
  '.work-intro > *', '.case',
  '.expertise-head h2', '.expertise-grid > article', '.proof-row > div', '.credentials',
  '.contact-copy > *', '.contact-meta > div', '.contact-section footer',
].join(',');
/** Build the real page in place: measure its blocks, then place them with five named cursors. */
export default function SiteBuild({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let teardown = () => {};
    const setup = () => {
      teardown();
      if (media.matches) return;
      const blocks = Array.from(host.querySelectorAll<HTMLElement>(targets));
      const overlay = document.createElement('div');
      overlay.className = 'site-build-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      const cursors = owners.map(([name, color]) => {
        const el = document.createElement('div');
        el.className = 'site-build-cursor';
        el.style.setProperty('--cursor-color', color);
        el.innerHTML = `<i></i><svg width="26" height="30" viewBox="0 0 34 38"><path d="M2 2 L2 32 L10 24 L16 36 L22 33 L16 21 L28 21 Z" fill="${color}" stroke="#fff" stroke-width="2"/></svg><span>${name}</span>`;
        overlay.appendChild(el);
        return { el };
      });
      document.body.appendChild(overlay);
      const records = blocks.map((block, index) => {
        const wire = document.createElement('div');
        wire.className = 'site-build-wire';
        wire.innerHTML = '<i></i><i></i><i></i><b></b>';
        overlay.appendChild(wire);
        const metric = block.matches('.intro-facts > div') ? block.querySelector('strong') : null;
        const original = metric?.textContent || '';
        block.classList.add('site-build-scrub');
        return { block, wire, owner: index % owners.length, metric, original,
          numeric: /^\d+\+?$/.test(original),
          index,
        };
      });
      let raf = 0;
      let disposed = false;
      let focused: HTMLElement | null = null;
      const render = () => {
        raf = 0;
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const remaining = document.documentElement.scrollHeight - vh - window.scrollY;
        const ending = Math.max(0, Math.min(1, 1 - remaining / Math.min(220, vh * .25)));
        const candidates = new Map<number, { p: number; x: number; y: number }>();
        // Every body frame is determined by its scroll position, in either direction.
        const measured = records.map(record => ({ record, rect: record.block.getBoundingClientRect() }));
        measured.forEach(({ record, rect }) => {
          const { block, wire, owner } = record;
          const stagger = record.index % 3 * 14;
          let p = Math.max(buildProgress(rect.top, vh, stagger), ending);
          if (focused && block.contains(focused)) p = 1;
          const frame = buildFrame(p);
          block.style.setProperty('--build-opacity', `${.055 + frame.content * .945}`);
          // Keep the layout and measurements fixed; content reveal uses opacity only.
          if (record.metric && record.numeric) {
            record.metric.textContent = `${Math.round(parseInt(record.original, 10) * frame.count)}${record.original.endsWith('+') ? '+' : ''}`;
          }
          const visible = rect.bottom > 75 && rect.top < vh;
          wire.style.display = visible && p > 0 && p < 1 ? 'block' : 'none';
          if (!visible || p <= 0 || p >= 1) return;
          Object.assign(wire.style, { left: `${rect.left - 3}px`, top: `${Math.max(78, rect.top - 3)}px`, width: `${rect.width + 6}px`, height: `${Math.max(0, rect.bottom + 3 - Math.max(78, rect.top - 3))}px`, opacity: `${frame.wire}`, clipPath: 'none' });
          wire.querySelector('b')!.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)}`;
          // A cursor follows the closest block to the placement point on its own lane.
          const current = candidates.get(owner);
          if (!current || Math.abs(p - .54) < Math.abs(current.p - .54)) {
            candidates.set(owner, { p,
              x: Math.min(vw - 85, rect.left + rect.width * .65),
              y: Math.max(95, Math.min(vh - 55, rect.top + Math.min(rect.height * .55, 150))),
            });
          }
        });
        cursors.forEach((cursor, index) => {
          const target = candidates.get(index);
          if (!target) { cursor.el.style.opacity = '0'; return; }
          const frame = buildFrame(target.p);
          const homeX = vw * (.12 + index * .16);
          const homeY = vh - 55;
          const x = homeX + (target.x - homeX) * frame.travel;
          const y = homeY + (target.y - homeY) * frame.travel - Math.sin(frame.travel * Math.PI) * 35;
          Object.assign(cursor.el.style, { opacity: `${frame.cursor}`, transform: `translate3d(${x}px,${y}px,0) scale(${1 - frame.press * .18})` });
          cursor.el.style.setProperty('--click', `${frame.press}`);
        });
      };
      const schedule = () => { if (!disposed && !raf) raf = requestAnimationFrame(render); };
      const focus = (event: FocusEvent) => { focused = event.target as HTMLElement; schedule(); };
      const blur = () => { focused = null; schedule(); };
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      host.addEventListener('focusin', focus);
      host.addEventListener('focusout', blur);
      const resize = new ResizeObserver(schedule);
      resize.observe(host);
      document.fonts.ready.then(schedule);
      schedule();
      teardown = () => {
        disposed = true;
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        host.removeEventListener('focusin', focus);
        host.removeEventListener('focusout', blur);
        resize.disconnect(); cancelAnimationFrame(raf); overlay.remove();
        records.forEach(record => {
          record.block.classList.remove('site-build-scrub');
          record.block.style.removeProperty('--build-opacity');
          if (record.metric && record.numeric) record.metric.textContent = record.original;
        });
      };
    };
    setup();
    media.addEventListener('change', setup);
    return () => { media.removeEventListener('change', setup); teardown(); };
  }, []);
  return <div ref={root} className="site-build">{children}</div>;
}
