import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from './primitives';

// The hero's terminal: deploy as a container, flip one Russelfile line, deploy again as a microVM.
// Phase text matches `russel apply` output (see Deploy.tsx); columns are right-aligned like the CLI's `{:>10}`.

type Line = { at: number; node: React.ReactNode; cmd?: string };

const pad = (s: string) => s.padStart(10, ' ');
const CHAR_MS = 38;

const PHASES = {
  container: [
    ['resolve', 'Resolving source & Russelfile'],
    ['build', 'Building package'],
    ['create', 'Preparing container rootfs'],
    ['start', 'Starting rootless Podman container'],
    ['ready', 'Waiting for container service to be reachable'],
  ],
  microvm: [
    ['resolve', 'Resolving source & Russelfile'],
    ['build', 'Building package + ensuring kernel/busybox/modules'],
    ['create', 'Writing deploy config'],
    ['start', 'Setting up network + booting/restoring VM'],
    ['ready', 'Waiting for VM service to be reachable'],
  ],
} as const;

/** Lay the session out on a timeline: commands type out, output lines follow. */
function script(): { lines: Line[]; total: number } {
  const lines: Line[] = [];
  let t = 400;
  const cmd = (text: string) => {
    lines.push({ at: t, cmd: text, node: null });
    t += text.length * CHAR_MS + 450;
  };
  const out = (node: React.ReactNode, gap = 220) => {
    lines.push({ at: t, node });
    t += gap;
  };
  const deploy = (rt: 'container' | 'microvm', took: string) => {
    cmd('russel apply .');
    out(<span className="text-dimmer">{'  github.com/you/api'}</span>, 260);
    for (const [p, d] of PHASES[rt]) out(<span className="text-mute">{`${pad(p)}  · ${d}`}</span>, rt === 'microvm' ? 360 : 280);
    out(
      <span>
        {'  '}
        <span className="text-ok font-bold">✓</span> Deployed in <span className="text-fg font-bold">{took}</span>
        <span className="text-dimmer"> · </span>
        <span className={rt === 'microvm' ? 'text-vm' : 'text-ct'}>{rt}</span>
      </span>,
      1300,
    );
    out('', 0);
  };

  deploy('container', '812ms');
  out(<span className="text-dimmer"># Russelfile.toml</span>, 500);
  out(<span className="text-ct">- type = "container"</span>, 350);
  out(<span className="text-vm">+ type = "microvm"</span>, 900);
  out('', 0);
  deploy('microvm', '1.4s');
  cmd('russel ps');
  out(<span className="text-dimmer">{'  ID    RUNTIME   STATUS     STATE     PORTS       UPTIME'}</span>, 140);
  out(
    <span>
      {'  api   '}
      <span className="text-vm">microvm</span>
      {'   '}
      <span className="text-ok">deployed</span>
      {'   '}
      <span className="text-ok">running</span>
      {'   8080→3000   4s'}
    </span>,
    3200,
  );
  return { lines, total: t };
}

const SCRIPT = script();
const ROWS = 11;

/** Drag a window by its title bar, kept inside the nearest section. Double-click the bar to put it back. */
function useDrag(win: React.RefObject<HTMLElement | null>) {
  const pos = useRef({ x: 0, y: 0 });
  const set = (x: number, y: number) => {
    pos.current = { x, y };
    win.current?.style.setProperty('translate', `${x}px ${y}px`);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const el = win.current;
    if (!el || e.button !== 0) return;
    e.preventDefault();
    const handle = e.currentTarget;
    handle.setPointerCapture(e.pointerId);
    const r = el.getBoundingClientRect();
    const b = (el.closest('section') ?? document.body).getBoundingClientRect();
    const from = { px: e.clientX, py: e.clientY, ...pos.current };
    const pad = 8;
    const move = (ev: PointerEvent) => {
      const dx = Math.min(Math.max(ev.clientX - from.px, b.left + pad - r.left), b.right - pad - r.right);
      const dy = Math.min(Math.max(ev.clientY - from.py, b.top + 72 - r.top), b.bottom - pad - r.bottom);
      set(from.x + dx, from.y + dy);
    };
    const up = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
      handle.removeEventListener('pointercancel', up);
      el.dataset.dragging = '';
    };
    el.dataset.dragging = 'true';
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  };

  return { onPointerDown, onDoubleClick: () => set(0, 0) };
}

/** The hero's terminal window: plays the deploy session, and can be dragged around by its title bar. */
export const HeroTerminal: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const drag = useDrag(ref);
  const reduced = useReducedMotion();
  const [now, setNow] = useState(0);
  const start = useRef(0);

  useEffect(() => {
    if (reduced) {
      setNow(SCRIPT.total);
      return;
    }
    if (!seen) return;
    let raf = 0;
    start.current = performance.now();
    const tick = (ts: number) => {
      setNow(Math.max(0, ts - start.current) % SCRIPT.total);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduced]);

  const shown = SCRIPT.lines.filter((l) => l.at <= now);
  const last = shown[shown.length - 1];
  const typing = last?.cmd !== undefined && now - last.at < last.cmd.length * CHAR_MS;
  // one row stays free for the idle prompt
  const visible = shown.slice(-(ROWS - 1));

  return (
    <div
      ref={ref}
      className={`theme-dark group overflow-hidden rounded-[10px] border border-white/15 bg-[#0b0d0d]/80 font-mono shadow-[0_0_0_1px_rgba(0,0,0,.6),0_28px_70px_-18px_rgba(0,0,0,.85)] backdrop-blur-xl transition-shadow data-[dragging=true]:shadow-[0_0_0_1px_rgba(0,0,0,.6),0_40px_90px_-18px_rgba(0,0,0,.95)] ${className}`}
    >
      <div
        {...drag}
        title="Drag to move · double-click to reset"
        className="relative flex h-8 cursor-grab touch-none items-center border-b border-black/60 bg-gradient-to-b from-[#2a2c2d] to-[#202223] px-3 select-none group-data-[dragging=true]:cursor-grabbing"
      >
        <span className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="text-mute pointer-events-none absolute inset-x-20 truncate text-center text-[12px]">~/api — russel — zsh</span>
      </div>
      <div
        role="img"
        aria-label="Terminal: russel apply as a container, change one Russelfile line, apply again as a microVM"
        className="overflow-hidden px-4 py-3 text-[11.5px] leading-[1.7] text-[#d4d4d4]"
        style={{ height: `calc(${ROWS} * 1.7em + 1.5rem)` }}
      >
        {visible.map((l, i) => {
          const isLast = l === last;
          if (l.cmd !== undefined) {
            const n = isLast ? Math.min(l.cmd.length, Math.floor((now - l.at) / CHAR_MS)) : l.cmd.length;
            return (
              <div key={`${l.at}-${i}`} className="whitespace-pre">
                <span className="text-ok">❯ </span>
                <span className="text-fg">{l.cmd.slice(0, n)}</span>
                {isLast && (
                  <span className={`ml-px inline-block h-4 w-2 translate-y-0.5 bg-[#d4d4d4] ${typing ? '' : 'anim-blink'}`} />
                )}
              </div>
            );
          }
          return (
            <div key={`${l.at}-${i}`} className="min-h-[1.7em] overflow-hidden text-ellipsis whitespace-pre">
              {l.node}
            </div>
          );
        })}
        {last && last.cmd === undefined && (
          <div className="whitespace-pre">
            <span className="text-ok">❯ </span>
            <span className="anim-blink inline-block h-4 w-2 translate-y-0.5 bg-[#d4d4d4]" />
          </div>
        )}
      </div>
    </div>
  );
};
