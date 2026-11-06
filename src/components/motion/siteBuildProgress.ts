const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => { n = clamp(n); return n * n * (3 - 2 * n); };

/** Position is the only input: the same position renders the same frame in either direction. */
export function buildProgress(top: number, viewport: number, stagger = 0) {
  return clamp((viewport * .94 - top - stagger) / Math.min(280, viewport * .36));
}
export function buildFrame(progress: number) {
  const p = clamp(progress);
  return {
    content: ease((p - .48) / .4),
    wire: (1 - ease((p - .7) / .3)),
    travel: ease(p / .5),
    press: clamp(1 - Math.abs(p - .54) / .09),
    cursor: ease(p / .1) * (1 - ease((p - .85) / .15)),
    count: ease((p - .48) / .52),
  };
}
