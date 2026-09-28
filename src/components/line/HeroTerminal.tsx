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
const ROWS = 17;

export const HeroTerminal: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
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
      className="theme-dark bg-night overflow-hidden rounded-[10px] border border-black/10 font-mono shadow-[0_30px_70px_-30px_rgba(20,35,60,0.6)]"
      aria-label="Terminal: russel apply as a container, change one Russelfile line, apply again as a microVM"
      role="img"
    >
      <div className="bg-raise relative flex h-9 items-center px-3.5">
        <span className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="text-mute pointer-events-none absolute inset-x-24 truncate text-center text-[12px]">~/api — russel</span>
      </div>
      <div
        className="overflow-hidden px-5 py-4 text-[12.5px] leading-[1.7] text-[#d4d4d4]"
        style={{ height: `calc(${ROWS} * 1.7em + 2rem)` }}
        aria-hidden
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
