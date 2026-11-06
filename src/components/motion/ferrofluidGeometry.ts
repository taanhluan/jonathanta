/** Hexagonal patches share the same boundary and sample every needle's exact apex. */
export function buildFerrofluidGeometry(mobile = false) {
  const slices = mobile ? 36 : 72;
  const radii = [.008, .016, .028, .045, .065, .09, .12, .155, .20, .25, .31, .38, .46, .55, .65, .76, .88, 1];
  const cellX = Math.PI * 2 / 22.4;
  const cellZ = Math.PI * 2 / 19.398969;
  const positions: number[] = [], indices: number[] = [];
  for (let ix = -19; ix <= 19; ix++) {
    for (let iz = -17; iz <= 17; iz++) {
      const cx = ix * cellX, cz = (iz + (ix & 1) * .5) * cellZ;
      if (cx * cx + cz * cz > 5.15 * 5.15) continue;
      const base = positions.length / 2;
      positions.push(cx, cz);
      for (const fraction of radii) {
        for (let slice = 0; slice < slices; slice++) {
          const angle = slice / slices * Math.PI * 2;
          const sector = Math.floor(angle / (Math.PI / 3));
          const outer = cellZ * .5 / Math.cos(angle - (sector + .5) * Math.PI / 3);
          positions.push(cx + Math.cos(angle) * outer * fraction, cz + Math.sin(angle) * outer * fraction);
        }
      }
      for (let slice = 0; slice < slices; slice++) indices.push(base, base + 1 + slice, base + 1 + (slice + 1) % slices);
      for (let ring = 0; ring < radii.length - 1; ring++) {
        const inner = base + 1 + ring * slices, outer = inner + slices;
        for (let slice = 0; slice < slices; slice++) {
          const next = (slice + 1) % slices;
          indices.push(inner + slice, outer + slice, outer + next, inner + slice, outer + next, inner + next);
        }
      }
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}
