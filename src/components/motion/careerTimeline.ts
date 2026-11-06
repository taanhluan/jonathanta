export const CAREER_STEP_PX = 560;
export function careerFrame(progress: number, count: number) {
  const timeline = Math.max(0, Math.min(1, progress)) * count;
  const index = Math.min(count - 1, Math.floor(timeline));
  const local = timeline - index;
  const entrance = index === 0 ? 1 : Math.min(1, local / .2);
  const exit = index === count - 1 ? 0 : Math.max(0, (local - .8) / .2);
  const ease = (n: number) => n * n * (3 - 2 * n);
  return { index, opacity: ease(entrance) * (1 - ease(exit)), travel: (1 - ease(entrance)) * 100 - ease(exit) * 100 };
}
