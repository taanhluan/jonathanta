import { useEffect, useRef } from 'react';
import './cursor-glow.css';

/** A decorative light follows the native pointer without intercepting input. */
export default function CursorGlow({ scope = '.portfolio-theme' }: { scope?: string }) {
  const halo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = halo.current;
    if (!element) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0, initialized = false, visible = false;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const draw = () => {
      raf = 0;
      if (!visible || !fine.matches) return;
      const follow = reduced.matches ? 1 : .26;
      x += (targetX - x) * follow; y += (targetY - y) * follow;
      element.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .1) raf = requestAnimationFrame(draw);
    };
    const hide = () => {
      visible = false; initialized = false; element.dataset.visible = 'false';
      cancelAnimationFrame(raf); raf = 0;
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType === 'touch') { hide(); return; }
      const target = event.target instanceof Element ? event.target : null;
      if (!target?.closest(scope)) { hide(); return; }
      targetX = event.clientX; targetY = event.clientY;
      if (!initialized) { x = targetX; y = targetY; initialized = true; }
      visible = true; element.dataset.visible = 'true';
      element.dataset.interactive = `${!!target.closest('a,button,input,textarea,select,[role="button"]')}`;
      element.dataset.pressed = `${event.buttons !== 0}`;
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    const press = () => { element.dataset.pressed = 'true'; };
    const release = () => { element.dataset.pressed = 'false'; };
    const visibility = () => { if (document.hidden) hide(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('pointerdown', press); window.addEventListener('pointerup', release);
    window.addEventListener('blur', hide); window.addEventListener('scroll', hide, { passive: true });
    document.addEventListener('visibilitychange', visibility); fine.addEventListener('change', hide);
    return () => {
      hide(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerout', leave);
      window.removeEventListener('pointerdown', press); window.removeEventListener('pointerup', release);
      window.removeEventListener('blur', hide); window.removeEventListener('scroll', hide);
      document.removeEventListener('visibilitychange', visibility); fine.removeEventListener('change', hide);
    };
  }, [scope]);
  return <div ref={halo} className="cursor-glow" data-visible="false" aria-hidden="true"><div className="cursor-glow-aura"/><div className="cursor-glow-core"/></div>;
}
