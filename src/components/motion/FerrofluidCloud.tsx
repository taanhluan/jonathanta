import { useEffect, useRef, useState, type RefObject } from 'react';
import { ferroFragment, ferroVertex } from './ferrofluidShaders';
import { buildFerrofluidGeometry } from './ferrofluidGeometry';

/** Continuous magnetic surface with per-pixel metallic reflections; no photo/video texture. */
export default function FerrofluidCloud({ section, paused, viewScale = 14, sceneProgress }: { section: RefObject<HTMLElement>; paused: boolean; viewScale?: number; sceneProgress?: RefObject<{ value: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const clock = useRef(0);
  const wake = useRef(() => {});
  const [revision, setRevision] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => { pausedRef.current = paused; wake.current(); }, [paused]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = section.current;
    if (!canvas || !host) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'high-performance' });
    if (!gl) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shaders: WebGLShader[] = [];
    const compile = (kind: number, source: string) => {
      const shader = gl.createShader(kind);
      if (!shader) throw new Error('Cannot allocate shader');
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'Shader compilation failed');
      return shader;
    };
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let indexBuffer: WebGLBuffer | null = null;
    try {
      program = gl.createProgram();
      if (!program) throw new Error('Cannot allocate program');
      gl.attachShader(program, compile(gl.VERTEX_SHADER, ferroVertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, ferroFragment)); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Program link failed');
      gl.useProgram(program);
      const geometry = buildFerrofluidGeometry(window.innerWidth < 700 || viewScale < 5);
      const indexed = !!gl.getExtension('OES_element_index_uint');
      let vertices = geometry.positions;
      if (!indexed) {
        // A non-indexed path keeps older WebGL devices functional.
        vertices = new Float32Array(geometry.indices.length * 2);
        geometry.indices.forEach((index, offset) => {
          vertices[offset * 2] = geometry.positions[index * 2];
          vertices[offset * 2 + 1] = geometry.positions[index * 2 + 1];
        });
      }
      const count = geometry.indices.length;
      buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      if (indexed) {
        indexBuffer = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);
      }
      const surface = gl.getAttribLocation(program, 'aSurface'); gl.enableVertexAttribArray(surface); gl.vertexAttribPointer(surface, 2, gl.FLOAT, false, 8, 0);
      const uniforms = Object.fromEntries(['uTime','uAspect','uProgress','uZoom','uMagnet','uPulse'].map(name => [name, gl.getUniformLocation(program!, name)]));
      gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
      gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      let raf = 0, disposed = false, visible = true, last = 0, firstFrame = true;
      let progress = 0;
      const magnet = { x: 0, z: 0, strength: 0, targetX: 0, targetZ: 0, targetStrength: 0 };
      const pulse = { x: 0, z: 0, time: -100 };
      const draw = (ms: number) => {
        raf = 0;
        if (disposed || !visible || document.hidden || gl.isContextLost()) { last = 0; return; }
        const delta = last ? Math.min(.05, (ms - last) / 1000) : 0; last = ms;
        const frozen = pausedRef.current || reduced.matches;
        if (!frozen) clock.current += delta;
        const follow = 1 - Math.exp(-delta * 9);
        if (!frozen) {
          magnet.x += (magnet.targetX - magnet.x) * follow; magnet.z += (magnet.targetZ - magnet.z) * follow;
          magnet.strength += (magnet.targetStrength - magnet.strength) * follow;
        }
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniform1f(uniforms.uTime, clock.current);
        const sceneValue = sceneProgress?.current?.value ?? progress;
        gl.uniform1f(uniforms.uProgress, reduced.matches ? 0 : sceneValue);
        gl.uniform1f(uniforms.uZoom, viewScale);
        gl.uniform3f(uniforms.uMagnet, magnet.x, magnet.z, reduced.matches ? 0 : magnet.strength);
        gl.uniform3f(uniforms.uPulse, pulse.x, pulse.z, pulse.time);
        if (indexed) gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_INT, 0);
        else gl.drawArrays(gl.TRIANGLES, 0, count);
        if (firstFrame) { setReady(true); firstFrame = false; }
        if (!frozen) raf = requestAnimationFrame(draw);
      };
      const schedule = () => { if (!disposed && !raf) raf = requestAnimationFrame(draw); };
      wake.current = () => { last = 0; schedule(); };
      const resize = () => {
        const rect = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(rect.width * dpr)); canvas.height = Math.max(1, Math.round(rect.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform1f(uniforms.uAspect, rect.width / Math.max(1, rect.height)); schedule();
      };
      const scroll = () => {
        const rect = host.getBoundingClientRect();
        progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, host.offsetHeight - window.innerHeight))); schedule();
      };
      const locate = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width * 2 - 1;
        const y = 1 - (event.clientY - rect.top) / rect.height * 2;
        // Intersect a camera ray with the horizontal pool, then undo its model rotation.
        const cp = Math.cos(.85 + progress * .13), sp = Math.sin(.85 + progress * .13);
        const screenX = x * (rect.width / rect.height) / viewScale;
        const screenY = (y - .06) / viewScale;
        const rayX = .91308894 * screenX + .40776045 * screenY;
        const rayY = -.40776045 * screenX + .91308894 * screenY;
        const distance = 8.9 * sp / Math.max(.15, sp - cp * rayY);
        const wx = rayX * distance, wz = 8.9 * cp - distance * (cp + sp * rayY);
        const angle = clock.current * .025 + progress * .62;
        magnet.targetX = Math.max(-4.8, Math.min(4.8, Math.cos(angle) * wx - Math.sin(angle) * wz));
        magnet.targetZ = Math.max(-4.8, Math.min(4.8, Math.sin(angle) * wx + Math.cos(angle) * wz));
        magnet.targetStrength = 1;
      };
      const move = (event: PointerEvent) => { if (!(event.target as HTMLElement).closest('a,button')) { locate(event); schedule(); } };
      const leave = () => { magnet.targetStrength = 0; schedule(); };
      const press = (event: PointerEvent) => {
        if ((event.target as HTMLElement).closest('a,button') || pausedRef.current || reduced.matches) return;
        locate(event); pulse.x = magnet.targetX; pulse.z = magnet.targetZ; pulse.time = clock.current; schedule();
      };
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) schedule(); else { cancelAnimationFrame(raf); raf = 0; last = 0; }
      }); observer.observe(host);
      const lost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(raf); raf = 0; setReady(false); };
      const restored = () => setRevision(value => value + 1);
      canvas.addEventListener('webglcontextlost', lost); canvas.addEventListener('webglcontextrestored', restored);
      host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave); host.addEventListener('pointerdown', press);
      window.addEventListener('resize', resize); window.addEventListener('scroll', scroll, { passive: true });
      document.addEventListener('visibilitychange', schedule); reduced.addEventListener('change', schedule);
      resize(); scroll();
      return () => {
        disposed = true; cancelAnimationFrame(raf); observer.disconnect(); wake.current = () => {};
        canvas.removeEventListener('webglcontextlost', lost); canvas.removeEventListener('webglcontextrestored', restored);
        host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); host.removeEventListener('pointerdown', press);
        window.removeEventListener('resize', resize); window.removeEventListener('scroll', scroll);
        document.removeEventListener('visibilitychange', schedule); reduced.removeEventListener('change', schedule);
        gl.deleteBuffer(buffer); gl.deleteBuffer(indexBuffer); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader));
      };
    } catch (error) {
      console.error('Ferrofluid renderer:', error);
      gl.deleteBuffer(buffer); gl.deleteBuffer(indexBuffer); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader));
      setReady(false);
    }
  }, [section, revision, viewScale, sceneProgress]);
  return <><canvas ref={canvasRef} className="ferrofluid-canvas" aria-hidden="true"/><span className="ferrofluid-hint">{ready ? 'MOVE TO ATTRACT · CLICK TO PULSE' : 'FERROFLUID / MAGNETIC LANDSCAPE'}</span></>;
}
